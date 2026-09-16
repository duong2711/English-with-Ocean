/* =============================================================
   LDD ENGLISH — FAST PROGRESS UI v2
   - Shows Podcast + Vận dụng incomplete badges immediately after login.
   - Does NOT require opening/closing either folder first.
   - Podcast Stage 1 completion updates optimistically as soon as Stage 2 unlocks.
   ============================================================= */
(function () {
    'use strict';

    const REF = 'ywqbaksmmtvwbojcgsdd';
    const API_URL = 'https://' + REF + '.supabase.co';
    const DAY = 86400000;

    let currentPodcastId = null;
    let stage2Node = null;
    let stage2WasLocked = true;
    let renderTimer = null;
    let tokenSeen = null;
    let busy = false;
    let anonKeyPromise = null;

    let podcastRows = [];
    let podcastProgress = [];
    let kidRows = [];

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    function getToken() {
        try {
            const raw = localStorage.getItem('sb-' + REF + '-auth-token');
            if (!raw) return null;
            const value = JSON.parse(raw);
            return value && (value.access_token ||
                (value.currentSession && value.currentSession.access_token) ||
                (Array.isArray(value) && value[0] && value[0].access_token)) || null;
        } catch (e) {
            return null;
        }
    }

    function getUserId() {
        const token = getToken();
        if (!token) return null;
        try {
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            return (JSON.parse(atob(part)) || {}).sub || null;
        } catch (e) {
            return null;
        }
    }

    /* Reuse the already-public anon key from an existing same-origin JS asset.
       This avoids duplicating credentials in this helper module. */
    function loadAnonKey() {
        if (anonKeyPromise) return anonKeyPromise;
        anonKeyPromise = fetch('ldd-thcs-vocab-reset.js?v=3', { cache: 'force-cache' })
            .then(function (r) { return r.ok ? r.text() : ''; })
            .then(function (text) {
                const match = text.match(/SUPABASE_ANON_KEY\s*=\s*['\"]([^'\"]+)['\"]/);
                return match ? match[1] : null;
            })
            .catch(function () { return null; });
        return anonKeyPromise;
    }

    async function query(table, select, params) {
        const token = getToken();
        const key = await loadAnonKey();
        if (!token || !key) return [];

        const q = new URLSearchParams();
        q.set('select', select || '*');
        Object.keys(params || {}).forEach(function (name) {
            if (params[name] !== null && params[name] !== undefined) q.set(name, params[name]);
        });

        try {
            const r = await fetch(API_URL + '/rest/v1/' + table + '?' + q.toString(), {
                headers: {
                    apikey: key,
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            });
            if (!r.ok) return [];
            const data = await r.json();
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function ensureStyle() {
        if (document.getElementById('ldd-fast-progress-style')) return;
        const style = document.createElement('style');
        style.id = 'ldd-fast-progress-style';
        style.textContent =
            '#podcast-folder-card,#kid-folder-card{position:relative}' +
            '.ldd-incomplete-number-badge{position:absolute;top:9px;right:9px;z-index:8;display:inline-flex;align-items:center;justify-content:center;min-width:25px;height:25px;padding:0 7px;border-radius:999px;background:#ef4444;color:#fff;font-size:12px;font-weight:800;line-height:1;box-shadow:0 2px 7px rgba(0,0,0,.16)}' +
            '.ldd-incomplete-number-badge.is-zero{background:#16a34a}' +
            '#podcast-grid .folder-card.ldd-podcast-stage1-complete{outline:2px solid rgba(22,163,74,.25)}' +
            '.ldd-podcast-complete-badge{display:inline-flex;align-items:center;gap:4px;margin-top:7px;padding:4px 8px;border-radius:999px;background:rgba(22,163,74,.12);color:#15803d;font-size:11px;font-weight:800}';
        document.head.appendChild(style);
    }

    function setFolderBadge(cardId, count, kind) {
        const card = document.getElementById(cardId);
        if (!card || count == null) return;

        let badge = card.querySelector('.ldd-incomplete-number-badge[data-kind="' + kind + '"]');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'ldd-incomplete-number-badge';
            badge.dataset.kind = kind;
            card.appendChild(badge);
        }

        const n = Math.max(0, Number(count || 0));
        badge.textContent = String(n);
        badge.title = n + ' mục chưa hoàn thành';
        badge.classList.toggle('is-zero', n === 0);
    }

    function podcastDoneKey(id) {
        const uid = getUserId();
        return uid && id ? 'ldd_podcast_stage1_done::' + uid + '::' + id : null;
    }

    function podcastTodayKey(id) {
        const uid = getUserId();
        return uid && id ? 'ldd_podcast_today_done::' + uid + '::' + id : null;
    }

    function isPodcastLocallyDone(id) {
        const key = podcastDoneKey(id);
        return !!key && localStorage.getItem(key) === '1';
    }

    function estimatePodcastBlankCount(pod) {
        const segments = Array.isArray(pod && pod.segments) ? pod.segments : [];
        if (!segments.length) return 0;

        let chunks = 0;
        let lines = 0;
        let words = 0;
        segments.forEach(function (seg, index) {
            const count = String((seg && seg.en) || '').trim().split(/\s+/).filter(Boolean).length;
            if (lines && (lines >= 6 || words + count > 80)) {
                chunks += 1;
                lines = 0;
                words = 0;
            }
            lines += 1;
            words += count;
            if (index === segments.length - 1 && lines) chunks += 1;
        });
        return Math.max(1, chunks * 4);
    }

    function podcastSavedCount(id) {
        const seen = new Set();
        (podcastProgress || []).forEach(function (row) {
            if (String(row.podcast_id) !== String(id) || Number(row.stage) !== 1) return;
            seen.add(String(row.segment_index) + ':' + String(row.blank_index));
        });
        return seen.size;
    }

    function isPodcastComplete(pod) {
        const id = String(pod.id);
        if (isPodcastLocallyDone(id)) return true;
        const expected = estimatePodcastBlankCount(pod);
        return expected > 0 && podcastSavedCount(id) >= expected;
    }

    function ensurePodcastCompleteBadge(card) {
        if (!card) return;
        card.classList.add('ldd-podcast-stage1-complete');
        let badge = card.querySelector('.ldd-podcast-complete-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'ldd-podcast-complete-badge';
            badge.textContent = '✓ Giai đoạn 1';
            card.appendChild(badge);
        }
    }

    function renderPodcastState() {
        if (podcastRows.length) {
            const incomplete = podcastRows.filter(function (pod) {
                return !isPodcastComplete(pod);
            }).length;
            setFolderBadge('podcast-folder-card', incomplete, 'podcast');
        }

        const byId = new Map(podcastRows.map(function (pod) {
            return [String(pod.id), pod];
        }));

        document.querySelectorAll('#podcast-grid .folder-card[data-id]').forEach(function (card) {
            const id = String(card.dataset.id || '');
            const pod = byId.get(id);
            const done = pod ? isPodcastComplete(pod) : isPodcastLocallyDone(id);
            if (done) ensurePodcastCompleteBadge(card);
            else {
                card.classList.remove('ldd-podcast-stage1-complete');
                const badge = card.querySelector('.ldd-podcast-complete-badge');
                if (badge) badge.remove();
            }
        });
    }

    function topicTotal() {
        try {
            if (typeof KID_TOPICS !== 'undefined' && Array.isArray(KID_TOPICS)) return KID_TOPICS.length;
        } catch (e) {}
        const cards = document.querySelectorAll('#kid-topic-grid .kid-topic-card');
        return cards.length || 0;
    }

    function topicResetTarget(row) {
        const count = Number(row && row.times_completed || 0);
        if (count >= 3) return Infinity;
        const days = count === 1 ? 7 : (count === 2 ? 14 : null);
        const start = Date.parse(row && row.completed_at || '');
        return days && Number.isFinite(start) ? start + days * DAY : null;
    }

    function renderKidState() {
        const total = topicTotal();
        if (!total) return;

        const now = Date.now();
        let completed = 0;
        (kidRows || []).forEach(function (row) {
            const count = Number(row.times_completed || 0);
            if (count >= 3) {
                completed += 1;
                return;
            }
            const target = topicResetTarget(row);
            if (count >= 1 && target && target > now) completed += 1;
        });

        setFolderBadge('kid-folder-card', Math.max(0, total - completed), 'kid');
    }

    async function refreshData() {
        if (busy || !getToken() || !getUserId()) return;
        busy = true;
        try {
            const uid = getUserId();
            const result = await Promise.all([
                query('podcast_content', 'id,title,segments', { order: 'id.asc' }),
                query('podcast_fill_progress', 'podcast_id,segment_index,blank_index,stage', { user_id: 'eq.' + uid }),
                query('kid_topic_progress', 'topic_key,times_completed,completed_at', {})
            ]);

            podcastRows = result[0] || [];
            podcastProgress = result[1] || [];
            kidRows = result[2] || [];

            renderPodcastState();
            renderKidState();
        } finally {
            busy = false;
        }
    }

    function markCurrentPodcastDone() {
        if (!currentPodcastId) return;
        const doneKey = podcastDoneKey(currentPodcastId);
        if (doneKey) localStorage.setItem(doneKey, '1');
        const todayKey = podcastTodayKey(currentPodcastId);
        if (todayKey) localStorage.setItem(todayKey, new Date().toISOString().slice(0, 10));

        const card = document.querySelector('#podcast-grid .folder-card[data-id="' + CSS.escape(String(currentPodcastId)) + '"]');
        ensurePodcastCompleteBadge(card);

        /* Update the folder badge immediately, before any network refresh. */
        renderPodcastState();
        document.dispatchEvent(new CustomEvent('ldd:today-refresh'));
        setTimeout(refreshData, 300);
    }

    function bindStage2() {
        const node = document.getElementById('podcast-stage2-btn');
        if (!node) {
            stage2Node = null;
            stage2WasLocked = true;
            return;
        }
        if (node === stage2Node) return;

        stage2Node = node;
        stage2WasLocked = node.classList.contains('pod-stage-locked');

        const observer = new MutationObserver(function () {
            if (!document.contains(node)) {
                observer.disconnect();
                if (stage2Node === node) stage2Node = null;
                return;
            }
            const locked = node.classList.contains('pod-stage-locked');
            if (stage2WasLocked && !locked) markCurrentPodcastDone();
            stage2WasLocked = locked;
        });

        observer.observe(node, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true
        });
    }

    function scheduleRender() {
        clearTimeout(renderTimer);
        renderTimer = setTimeout(function () {
            bindStage2();
            renderPodcastState();
            renderKidState();
        }, 20);
    }

    function watchSession() {
        const token = getToken();
        if (token && token !== tokenSeen) {
            tokenSeen = token;
            setTimeout(refreshData, 0);
        } else if (!token && tokenSeen) {
            tokenSeen = null;
            podcastRows = [];
            podcastProgress = [];
            kidRows = [];
        }
    }

    function installObservers() {
        document.addEventListener('click', function (event) {
            const card = event.target.closest && event.target.closest('#podcast-grid .folder-card[data-id]');
            if (card) {
                currentPodcastId = String(card.dataset.id || '');
                setTimeout(bindStage2, 0);
                setTimeout(bindStage2, 100);
            }
        }, true);

        new MutationObserver(function (mutations) {
            let relevant = false;
            for (const mutation of mutations) {
                const target = mutation.target && mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
                if (!target || !target.closest) continue;
                if (
                    target.closest('#podcast-grid') ||
                    target.closest('#kid-topic-grid') ||
                    target.closest('#podcast-folder-card') ||
                    target.closest('#kid-folder-card') ||
                    target.id === 'podcast-stage2-btn' ||
                    target.closest('#podcast-stage2-btn')
                ) {
                    relevant = true;
                    break;
                }
            }
            if (relevant) scheduleRender();
        }).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    ready(function () {
        ensureStyle();
        installObservers();
        watchSession();
        bindStage2();
        scheduleRender();

        setInterval(watchSession, 1200);
        setInterval(function () {
            if (!document.hidden && getToken()) refreshData();
        }, 30000);

        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) refreshData();
        });
        document.addEventListener('ldd:today-refresh', function () {
            scheduleRender();
        });
        document.addEventListener('ldd:thcs-vocab-reset', function () {
            scheduleRender();
        });
    });

    window.LDDFastProgress = {
        refresh: refreshData,
        render: scheduleRender,
        markPodcastDone: markCurrentPodcastDone
    };
})();
