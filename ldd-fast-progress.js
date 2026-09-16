/* =============================================================
   LDD ENGLISH — FAST PROGRESS UI v1
   DOM-only enhancement: no extra Supabase requests.
   - Podcast Stage 1 completion appears immediately.
   - Podcast folder badge = podcasts not yet finished Stage 1.
   - Vận dụng folder badge = topic cards not currently completed.
   ============================================================= */
(function () {
    'use strict';

    let currentPodcastId = null;
    let stage2Node = null;
    let stage2WasLocked = true;
    let renderTimer = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    function getUserId() {
        try {
            const ref = 'ywqbaksmmtvwbojcgsdd';
            const raw = localStorage.getItem('sb-' + ref + '-auth-token');
            if (!raw) return null;
            const value = JSON.parse(raw);
            const token = value && (value.access_token || (value.currentSession && value.currentSession.access_token) || (Array.isArray(value) && value[0] && value[0].access_token));
            if (!token) return null;
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            return (JSON.parse(atob(part)) || {}).sub || null;
        } catch (e) {
            return null;
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

    function applyLocalPodcastState() {
        document.querySelectorAll('#podcast-grid .folder-card[data-id]').forEach(function (card) {
            const id = String(card.dataset.id || '');
            if (isPodcastLocallyDone(id)) ensurePodcastCompleteBadge(card);
        });
    }

    function renderPodcastBadge() {
        const cards = Array.from(document.querySelectorAll('#podcast-grid .folder-card[data-id]'));
        if (!cards.length) return;
        applyLocalPodcastState();
        const incomplete = cards.filter(function (card) {
            return !card.classList.contains('ldd-podcast-stage1-complete');
        }).length;
        setFolderBadge('podcast-folder-card', incomplete, 'podcast');
    }

    function renderKidBadge() {
        const cards = Array.from(document.querySelectorAll('#kid-topic-grid .kid-topic-card'));
        if (!cards.length) return;
        const incomplete = cards.filter(function (card) {
            return !card.classList.contains('completed');
        }).length;
        setFolderBadge('kid-folder-card', incomplete, 'kid');
    }

    function markCurrentPodcastDone() {
        if (!currentPodcastId) return;
        const doneKey = podcastDoneKey(currentPodcastId);
        if (doneKey) localStorage.setItem(doneKey, '1');
        const todayKey = podcastTodayKey(currentPodcastId);
        if (todayKey) localStorage.setItem(todayKey, new Date().toISOString().slice(0, 10));

        const card = document.querySelector('#podcast-grid .folder-card[data-id="' + CSS.escape(String(currentPodcastId)) + '"]');
        ensurePodcastCompleteBadge(card);
        renderPodcastBadge();

        // Let the existing Today dashboard refresh its own cached state too.
        document.dispatchEvent(new CustomEvent('ldd:today-refresh'));
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
            renderPodcastBadge();
            renderKidBadge();
        }, 20);
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
        bindStage2();
        scheduleRender();
        setTimeout(scheduleRender, 300);
        setTimeout(scheduleRender, 1000);
        document.addEventListener('ldd:today-refresh', scheduleRender);
        document.addEventListener('ldd:thcs-vocab-reset', scheduleRender);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) scheduleRender();
        });
    });

    window.LDDFastProgress = {
        refresh: scheduleRender,
        markPodcastDone: markCurrentPodcastDone
    };
})();
