/* =============================================================
   LDD ENGLISH — TODAY DASHBOARD v1
   - Actionable daily tasks on the dedicated Home page.
   - Syncs IPA visual completion with graded recordings.
   - Adds weak-pronunciation (<60%) vocabulary filter.
   - Decorates completed podcast Stage 1 cards.
   - Keeps countdown + diligence leaderboard on Home.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const DAY_MS = 86400000;
    const VOCAB_POOR_THRESHOLD = 60;
    const DAILY_POOR_TARGET = 10;
    const DAILY_UNPRONOUNCED_TARGET = 10;
    const DAILY_IPA_TARGET = 5;

    let activeToken = null;
    let refreshing = false;
    let refreshQueued = null;
    let latestState = null;
    let currentPodcastId = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        ensureTodayHost();
        ensureLivePanel();
        installVocabPoorFilter();
        bindDeepLinkHelpers();
        watchPodcastStageOne();
        watchSession();
        setInterval(watchSession, 1200);
        setInterval(function () { if (!document.hidden && getToken()) queueRefresh(0); }, 30000);
        setInterval(tickCountdowns, 1000);
        document.addEventListener('visibilitychange', function () { if (!document.hidden) queueRefresh(0); });
        document.addEventListener('ldd:today-refresh', function () { queueRefresh(100); });
        document.addEventListener('ldd:student-grade-changed', function () {
            if (latestState) renderLive(latestState);
        });
    });

    function getToken() {
        try {
            const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
            if (!raw) return null;
            const value = JSON.parse(raw);
            if (value && value.access_token) return value.access_token;
            if (value && value.currentSession && value.currentSession.access_token) return value.currentSession.access_token;
            if (Array.isArray(value) && value[0] && value[0].access_token) return value[0].access_token;
        } catch (e) {}
        return null;
    }

    function jwtPayload() {
        const token = getToken();
        if (!token) return {};
        try {
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            return JSON.parse(atob(part)) || {};
        } catch (e) { return {}; }
    }

    function userId() { return jwtPayload().sub || null; }
    function userEmail() { return String(jwtPayload().email || '').toLowerCase(); }
    function todayIso() { return new Date().toISOString().slice(0, 10); }

    function watchSession() {
        const token = getToken();
        if (token && token !== activeToken) {
            activeToken = token;
            queueRefresh(0);
        } else if (!token && activeToken) {
            activeToken = null;
            latestState = null;
            renderToday(null);
            renderLive(null);
        }
        ensureTodayHost();
        ensureLivePanel();
    }

    function queueRefresh(delay) {
        clearTimeout(refreshQueued);
        refreshQueued = setTimeout(refreshAll, delay == null ? 150 : delay);
    }

    async function query(table, select, params) {
        const token = getToken();
        if (!token) return [];
        const qs = new URLSearchParams();
        qs.set('select', select || '*');
        Object.keys(params || {}).forEach(function (key) {
            if (params[key] !== null && params[key] !== undefined) qs.set(key, params[key]);
        });
        try {
            const response = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + qs.toString(), {
                headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + token, Accept: 'application/json' }
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.warn('[LDD Today] ' + table + ': ' + err.message);
            return [];
        }
    }

    async function upsertIpaCompletion(symbol) {
        const token = getToken();
        const uid = userId();
        if (!token || !uid || !symbol) return false;
        try {
            const response = await fetch(SUPABASE_URL + '/rest/v1/ipa_completions?on_conflict=user_id%2Csymbol', {
                method: 'POST',
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    Prefer: 'resolution=merge-duplicates,return=minimal'
                },
                body: JSON.stringify({ user_id: uid, symbol: symbol, completed: true, updated_at: new Date().toISOString() })
            });
            return response.ok;
        } catch (e) { return false; }
    }

    async function refreshAll() {
        if (refreshing || !getToken()) return;
        refreshing = true;
        try {
            const uid = userId();
            const day = todayIso();
            if (!uid) return;

            const result = await Promise.all([
                query('comments', 'symbol,graded,is_correct,created_at,audio_url', { user_id: 'eq.' + uid, audio_url: 'not.is.null' }),
                query('ipa_completions', 'symbol,completed', { user_id: 'eq.' + uid }),
                query('user_vocabulary', 'id', { user_id: 'eq.' + uid }),
                query('vocab_word_progress', 'vocab_id,pron_score,pron_first_checked', { user_id: 'eq.' + uid }),
                query('news_articles', 'id', {}),
                query('news_reads', 'article_id,read_at', { user_id: 'eq.' + uid }),
                query('conj_practice_sessions', 'id,session_date', { user_id: 'eq.' + uid, session_date: 'eq.' + day }),
                query('podcast_content', 'id,title,segments,custom_phrases', { order: 'id.asc' }),
                query('podcast_fill_progress', 'podcast_id,segment_index,blank_index,stage,created_at', { user_id: 'eq.' + uid }),
                query('kid_topic_progress', 'topic_key,times_completed,completed_at', {}),
                query('thcs_unit_progress', 'grade,unit_id,completed,times_completed,completed_at', {}),
                query('vocab_weekly_tests', 'id,created_at,status', { order: 'created_at.desc', limit: '1' }),
                query('diligence_scores', 'user_id,display_name,avatar_url,diligence_score,excluded', { excluded: 'eq.false', order: 'diligence_score.desc', limit: '10' })
            ]);

            const state = {
                comments: result[0], completions: result[1], vocab: result[2], vocabProgress: result[3],
                articles: result[4], reads: result[5], conjToday: result[6], podcasts: result[7], podcastProgress: result[8],
                kid: result[9], thcs: result[10], vocabTests: result[11], rank: result[12], day: day
            };

            state.vocabTestPending = await getVocabTestPending();
            state.customTestCount = badgeCount(document.getElementById('ctest-folder-badge'));
            latestState = state;

            await reconcileIpa(state);
            computePodcastState(state);
            renderToday(state);
            renderLive(state);
            installVocabPoorFilter();
            decoratePodcastCards(state);
        } finally {
            refreshing = false;
        }
    }

    async function getVocabTestPending() {
        try {
            if (typeof window.checkVocabWeeklyTestState === 'function') {
                const status = await window.checkVocabWeeklyTestState();
                return !!(status && status.pendingTestId);
            }
        } catch (e) {}
        return badgeCount(document.getElementById('vocab-test-folder-badge')) > 0;
    }

    async function reconcileIpa(state) {
        const latest = {};
        (state.comments || []).forEach(function (row) {
            if (!row.symbol) return;
            const old = latest[row.symbol];
            if (!old || Date.parse(row.created_at || 0) > Date.parse(old.created_at || 0)) latest[row.symbol] = row;
        });
        const completedSet = new Set((state.completions || []).filter(function (r) { return r.completed; }).map(function (r) { return String(r.symbol); }));
        const sync = [];

        Object.keys(latest).forEach(function (symbol) {
            const row = latest[symbol];
            if (row.graded && row.is_correct !== false && !completedSet.has(String(symbol))) sync.push(symbol);
        });
        if (sync.length) {
            await Promise.all(sync.map(upsertIpaCompletion));
            sync.forEach(function (s) { completedSet.add(String(s)); });
        }

        document.querySelectorAll('.ipa-symbol[data-symbol]').forEach(function (card) {
            const symbol = String(card.dataset.symbol || '');
            const row = latest[symbol];
            const icon = card.querySelector('.completion-status-icon');
            card.classList.remove('completed', 'submitted', 'graded-done', 'needs-redo');
            if (!row) {
                if (icon) icon.textContent = '☐';
                return;
            }
            if (!row.graded) {
                card.classList.add('submitted');
                if (icon) icon.textContent = '⏳';
            } else if (row.is_correct === false) {
                card.classList.add('needs-redo');
                if (icon) icon.textContent = '!';
            } else {
                card.classList.add('completed');
                if (icon) icon.textContent = '✔';
            }
        });

        state.ipaRecorded = new Set((state.comments || []).map(function (r) { return String(r.symbol || ''); }).filter(Boolean));
        state.ipaTotal = document.querySelectorAll('.ipa-symbol[data-symbol]').length;
        state.ipaUnrecorded = Math.max(0, state.ipaTotal - state.ipaRecorded.size);
    }

    function computePodcastState(state) {
        const byPodcast = {};
        (state.podcastProgress || []).filter(function (r) { return Number(r.stage) === 1; }).forEach(function (r) {
            const key = String(r.podcast_id);
            if (!byPodcast[key]) byPodcast[key] = [];
            byPodcast[key].push(r);
        });
        state.podcastInfo = {};
        state.podcastIncomplete = 0;
        state.podcastCompletedToday = false;

        (state.podcasts || []).forEach(function (pod) {
            const key = String(pod.id);
            const rows = byPodcast[key] || [];
            const expected = estimatePodcastBlankCount(pod);
            const ratio = expected > 0 ? Math.min(1, rows.length / expected) : 0;
            const locallyDone = localPodcastDone(key);
            const complete = locallyDone || (expected > 0 && rows.length >= expected);
            const latestAt = rows.reduce(function (max, r) {
                const t = Date.parse(r.created_at || 0);
                return Number.isFinite(t) ? Math.max(max, t) : max;
            }, 0);
            const doneToday = complete && latestAt && new Date(latestAt).toISOString().slice(0, 10) === state.day;
            state.podcastInfo[key] = { expected: expected, done: rows.length, ratio: ratio, complete: complete, doneToday: !!doneToday };
            if (!complete) state.podcastIncomplete += 1;
            if (doneToday || localPodcastDoneToday(key)) state.podcastCompletedToday = true;
        });
    }

    function estimatePodcastBlankCount(pod) {
        const segments = Array.isArray(pod.segments) ? pod.segments : [];
        if (!segments.length) return 0;
        let chunks = 0, lines = 0, words = 0;
        segments.forEach(function (seg, idx) {
            const count = String((seg && seg.en) || '').trim().split(/\s+/).filter(Boolean).length;
            if (lines && (lines >= 6 || words + count > 80)) { chunks += 1; lines = 0; words = 0; }
            lines += 1;
            words += count;
            if (idx === segments.length - 1 && lines) chunks += 1;
        });
        return Math.max(1, chunks * 4);
    }

    function localPodcastDone(id) {
        const uid = userId();
        if (!uid) return false;
        return localStorage.getItem('ldd_podcast_stage1_done::' + uid + '::' + id) === '1';
    }
    function localPodcastDoneToday(id) {
        const uid = userId();
        if (!uid) return false;
        return localStorage.getItem('ldd_podcast_today_done::' + uid + '::' + id) === todayIso();
    }

    function ensureTodayHost() {
        const home = document.getElementById('tab-trang-chu');
        if (!home) return null;
        const dashboard = home.querySelector('.ldd-home-dashboard');
        if (!dashboard) return null;
        let host = dashboard.querySelector('#ldd-today-tasks');
        if (!host) {
            let side = dashboard.querySelector('.ldd-home-side');
            if (!side) {
                side = document.createElement('aside');
                side.className = 'ldd-home-side ldd-today-shell';
                side.innerHTML = '<div class="ldd-home-side-title">Hôm nay</div><div id="ldd-today-tasks" class="ldd-today-tasks"></div>';
                dashboard.appendChild(side);
            }
            host = side.querySelector('#ldd-today-tasks');
        }
        return host;
    }

    function renderToday(state) {
        const host = ensureTodayHost();
        if (!host) return;
        if (!getToken() || !state) {
            host.innerHTML = '<div class="ldd-today-loading">Đăng nhập để xem nhiệm vụ hôm nay.</div>';
            return;
        }

        const progressMap = new Map((state.vocabProgress || []).map(function (r) { return [String(r.vocab_id), r]; }));
        let unpronounced = 0, poor = 0;
        (state.vocab || []).forEach(function (v) {
            const p = progressMap.get(String(v.id));
            if (!p || !p.pron_first_checked) unpronounced += 1;
            else if (Number(p.pron_score || 0) < VOCAB_POOR_THRESHOLD) poor += 1;
        });

        const readIds = new Set((state.reads || []).map(function (r) { return String(r.article_id); }));
        const unreadArticles = (state.articles || []).filter(function (a) { return !readIds.has(String(a.id)); }).length;
        const readToday = (state.reads || []).some(function (r) { return String(r.read_at || '').slice(0, 10) === state.day; });

        const mainTasks = [
            dailyTask(
                'vocab-poor',
                '🎯',
                'Tập lại phát âm',
                Math.min(DAILY_POOR_TARGET, poor),
                DAILY_POOR_TARGET,
                poor,
                'từ',
                'Ưu tiên các từ có điểm phát âm gần nhất dưới 60%'
            ),
            dailyTask(
                'vocab-unpronounced',
                '🎤',
                'Từ chưa phát âm',
                Math.min(DAILY_UNPRONOUNCED_TARGET, unpronounced),
                DAILY_UNPRONOUNCED_TARGET,
                unpronounced,
                'từ',
                'Làm một nhóm nhỏ thay vì nhìn toàn bộ số từ còn lại'
            ),
            dailyTask(
                'ipa',
                '🔤',
                'Luyện phiên âm IPA',
                Math.min(DAILY_IPA_TARGET, state.ipaUnrecorded || 0),
                DAILY_IPA_TARGET,
                state.ipaUnrecorded || 0,
                'âm',
                'Mỗi ngày tập tối đa 5 âm chưa ghi âm'
            )
        ];

        const extras = [];
        if (unreadArticles > 0 && !readToday) extras.push(task('news', '📰', 'Đọc 1 bài báo', 1, 'Bổ sung'));
        if (state.customTestCount > 0) extras.push(task('tests', '📝', 'Bài kiểm tra', state.customTestCount, 'Được giao'));
        if ((state.conjToday || []).length === 0) extras.push(task('conj', '🔗', 'Liên từ', 1, '1 lượt'));
        if (state.vocabTestPending) extras.push(task('vocabtest', '📒', 'Kiểm tra từ vựng', 1, 'Sẵn sàng'));
        if (state.podcastIncomplete > 0 && !state.podcastCompletedToday) extras.push(task('podcast', '🎧', 'Podcast', 1, 'Giai đoạn 1'));

        host.innerHTML = '';

        const primary = document.createElement('div');
        primary.className = 'ldd-today-primary';
        mainTasks.forEach(function (item) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'ldd-daily-mission' + (item.available <= 0 ? ' is-done' : '');
            button.dataset.todayTarget = item.target;
            button.innerHTML =
                '<span class="ldd-daily-mission-icon"></span>' +
                '<span class="ldd-daily-mission-copy"><strong></strong><small></small></span>' +
                '<span class="ldd-daily-mission-goal"></span>' +
                '<span class="ldd-daily-mission-arrow">→</span>';
            button.querySelector('.ldd-daily-mission-icon').textContent = item.icon;
            button.querySelector('strong').textContent = item.title;
            button.querySelector('small').textContent = item.available > 0
                ? item.note
                : 'Hiện không còn mục nào cần làm ở phần này.';
            button.querySelector('.ldd-daily-mission-goal').textContent = item.available > 0
                ? item.count + ' ' + item.unit
                : '✓ Xong';
            button.addEventListener('click', function () { navigateToday(item.target); });
            primary.appendChild(button);
        });
        host.appendChild(primary);

        if (extras.length) {
            const extraWrap = document.createElement('div');
            extraWrap.className = 'ldd-today-extra-wrap';
            const label = document.createElement('div');
            label.className = 'ldd-today-extra-title';
            label.innerHTML = '<span>Nhắc thêm</span><small>Các việc khác chỉ hiện khi cần</small>';
            extraWrap.appendChild(label);

            const extraList = document.createElement('div');
            extraList.className = 'ldd-today-extras';
            extras.forEach(function (item) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'ldd-today-extra';
                button.dataset.todayTarget = item.target;
                button.innerHTML = '<span class="ldd-today-extra-icon"></span><span class="ldd-today-extra-label"></span><strong></strong>';
                button.querySelector('.ldd-today-extra-icon').textContent = item.icon;
                button.querySelector('.ldd-today-extra-label').textContent = item.title;
                button.querySelector('strong').textContent = item.count > 1 ? String(item.count) : item.note;
                button.addEventListener('click', function () { navigateToday(item.target); });
                extraList.appendChild(button);
            });
            extraWrap.appendChild(extraList);
            host.appendChild(extraWrap);
        }
    }

    function dailyTask(target, icon, title, count, goal, available, unit, note) {
        return {
            target: target,
            icon: icon,
            title: title,
            count: count,
            goal: goal,
            available: available,
            unit: unit,
            note: note
        };
    }

    function task(target, icon, title, count, note) { return { target: target, icon: icon, title: title, count: count, note: note }; }

    function navigateToday(target) {
        if (target === 'ipa') return navigateAndAct('tab-phien-am', function () { scrollToEl(document.querySelector('.ipa-chart')); });
        if (target === 'news') return navigateAndAct('tab-tu-vung', function () { clickEl('#news-folder-card'); });
        if (target === 'tests') return navigateAndAct('tab-kiem-tra', function () { clickEl('#ctest-folder-card'); });
        if (target === 'conj') return navigateAndAct('tab-tu-vung', function () { clickEl('#conj-folder-card'); });
        if (target === 'vocabtest') return navigateAndAct('tab-kiem-tra', function () { clickEl('#vocab-test-folder'); });
        if (target === 'podcast') return navigateAndAct('tab-tu-vung', function () { clickEl('#podcast-folder-card'); });
        if (target === 'vocab-unpronounced') return openVocabFilter('unpronounced');
        if (target === 'vocab-poor') return openVocabFilter('poor');
    }

    function navigateAndAct(tab, action) {
        if (window.LDDNavigation && window.LDDNavigation.goToTab) window.LDDNavigation.goToTab(tab);
        else {
            const btn = document.querySelector('.main-tab-btn[data-main-target="' + tab + '"]');
            if (btn) btn.click();
        }
        setTimeout(action, 180);
    }
    function clickEl(selector) { const el = document.querySelector(selector); if (el) el.click(); }
    function scrollToEl(el) { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

    function openVocabFilter(filter) {
        navigateAndAct('tab-tu-vung', function () {
            const card = document.getElementById('myvocab-folder-card');
            if (card) card.click();
            setTimeout(function () {
                installVocabPoorFilter();
                if (filter === 'poor') {
                    const btn = document.querySelector('[data-ldd-vocab-filter="poor"]');
                    if (btn) btn.click();
                } else {
                    const btn = document.querySelector('[data-vocab-filter="unpronounced"]');
                    if (btn) btn.click();
                }
                scrollToEl(document.querySelector('.ldd-myvocab-filters'));
            }, 220);
        });
    }

    function installVocabPoorFilter() {
        const toolbar = document.querySelector('.ldd-myvocab-filters');
        const list = document.getElementById('myvocab-list');
        if (!toolbar || !list) return;
        let btn = toolbar.querySelector('[data-ldd-vocab-filter="poor"]');
        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ldd-myvocab-filter ldd-vocab-poor-filter';
            btn.dataset.lddVocabFilter = 'poor';
            btn.innerHTML = '🎯 Phát âm &lt;60% <span data-ldd-poor-count>0</span>';
            toolbar.appendChild(btn);
            btn.addEventListener('click', function () {
                toolbar.querySelectorAll('.ldd-myvocab-filter').forEach(function (b) { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
                list.dataset.lddPoorActive = '1';
                applyPoorFilter(list, toolbar);
            });
            toolbar.addEventListener('click', function (e) {
                if (e.target.closest('[data-ldd-vocab-filter="poor"]')) return;
                if (e.target.closest('[data-vocab-filter]')) {
                    delete list.dataset.lddPoorActive;
                    setTimeout(function () { applyPoorFilter(list, toolbar); }, 0);
                }
            });
            new MutationObserver(function () { setTimeout(function () { applyPoorFilter(list, toolbar); }, 0); }).observe(list, { childList: true, subtree: true });
        }
        applyPoorFilter(list, toolbar);
    }

    function applyPoorFilter(list, toolbar) {
        const items = Array.from(list.querySelectorAll('.myvocab-item'));
        let count = 0;
        items.forEach(function (item) {
            const badge = item.querySelector('.myvocab-pron-badge');
            const m = badge && String(badge.textContent || '').match(/(\d+(?:\.\d+)?)\s*%/);
            const isPoor = !!m && Number(m[1]) < VOCAB_POOR_THRESHOLD;
            if (isPoor) count += 1;
            if (list.dataset.lddPoorActive === '1') {
                item.hidden = !isPoor;
                item.classList.toggle('ldd-myvocab-filtered-out', !isPoor);
            }
        });
        const out = toolbar.querySelector('[data-ldd-poor-count]');
        if (out) out.textContent = String(count);
    }

    function bindDeepLinkHelpers() {
        document.addEventListener('click', function (e) {
            const card = e.target.closest('#podcast-grid .folder-card[data-id]');
            if (card) currentPodcastId = String(card.dataset.id);
        }, true);
    }

    function watchPodcastStageOne() {
        const stage2 = document.getElementById('podcast-stage2-btn');
        if (!stage2) return;
        const inspect = function () {
            if (!currentPodcastId || stage2.classList.contains('pod-stage-locked')) return;
            const uid = userId();
            if (!uid) return;
            localStorage.setItem('ldd_podcast_stage1_done::' + uid + '::' + currentPodcastId, '1');
            localStorage.setItem('ldd_podcast_today_done::' + uid + '::' + currentPodcastId, todayIso());
            queueRefresh(250);
        };
        new MutationObserver(inspect).observe(stage2, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
        inspect();
    }

    function decoratePodcastCards(state) {
        if (!state || !state.podcastInfo) return;
        document.querySelectorAll('#podcast-grid .folder-card[data-id]').forEach(function (card) {
            const info = state.podcastInfo[String(card.dataset.id)];
            const done = !!(info && info.complete);
            card.classList.toggle('ldd-podcast-stage1-complete', done);
            let badge = card.querySelector('.ldd-podcast-complete-badge');
            if (done && !badge) {
                badge = document.createElement('span');
                badge.className = 'ldd-podcast-complete-badge';
                badge.textContent = '✓ Giai đoạn 1';
                card.appendChild(badge);
            } else if (!done && badge) badge.remove();
        });
    }

    function ensureLivePanel() {
        const dashboard = document.querySelector('#tab-trang-chu .ldd-home-dashboard');
        if (!dashboard) return null;
        let panel = dashboard.querySelector('#ldd-home-live-panel') || document.getElementById('ldd-home-live-panel');
        if (panel && !dashboard.contains(panel)) dashboard.appendChild(panel);
        if (panel) return panel;
        panel = document.createElement('section');
        panel.id = 'ldd-home-live-panel';
        panel.className = 'ldd-home-live-panel';
        panel.innerHTML =
            '<div class="ldd-home-live-card"><div class="ldd-home-live-head"><div><span class="ldd-home-live-kicker">Sắp tới</span><h3>⏱ Reset & mở khóa</h3></div><span class="ldd-home-live-note">Realtime</span></div><div id="ldd-home-timer-list" class="ldd-home-timer-list"><p class="ldd-home-live-empty">Đang tải...</p></div></div>' +
            '<div class="ldd-home-live-card"><div class="ldd-home-live-head"><div><span class="ldd-home-live-kicker">Thi đua</span><h3>🔥 Bảng xếp hạng chăm chỉ</h3></div><span class="ldd-home-live-note">Top 10</span></div><div id="ldd-home-leaderboard" class="ldd-home-leaderboard"><p class="ldd-home-live-empty">Đang tải...</p></div></div>';
        dashboard.appendChild(panel);
        return panel;
    }

    function renderLive(state) {
        const panel = ensureLivePanel();
        if (!panel) return;
        const timerHost = panel.querySelector('#ldd-home-timer-list');
        const rankHost = panel.querySelector('#ldd-home-leaderboard');
        if (!state) {
            timerHost.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem countdown.</p>';
            rankHost.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem bảng xếp hạng.</p>';
            return;
        }
        renderCountdowns(timerHost, buildCountdowns(state));
        renderRank(rankHost, state.rank || []);
    }

    function buildCountdowns(state) {
        const now = Date.now(), items = [];
        const grade = assignedGrade();
        (state.kid || []).forEach(function (r) {
            const t = resetTarget(r.completed_at, r.times_completed);
            if (t && t > now) items.push({ title: 'Vận dụng · ' + prettyKey(r.topic_key), note: 'Reset tiến độ sau', target: t, kind: 'reset' });
        });
        (state.thcs || []).forEach(function (r) {
            if (!grade || !r.completed || Number(r.grade) !== grade) return;
            const t = resetTarget(r.completed_at, r.times_completed);
            if (t) items.push({ title: 'Từ vựng THCS/THPT · Lớp ' + r.grade + ' · ' + unitLabel(r.unit_id), note: t <= now ? 'Đã reset · cần ôn lại Unit' : 'Thời gian còn lại trước khi reset', target: t, kind: 'reset', scope: 'thcs' });
        });
        const vt = (state.vocabTests || [])[0];
        if (vt && vt.status !== 'pending' && vt.created_at) {
            const t = Date.parse(vt.created_at) + 2 * DAY_MS;
            if (t > now) items.push({ title: 'Kiểm tra từ vựng', note: 'Bài tiếp theo mở sau', target: t, kind: 'unlock' });
        }
        if ((state.conjToday || []).length >= 2) {
            const d = new Date();
            const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
            items.push({ title: 'Luyện tập Liên từ', note: 'Reset lượt sau', target: t, kind: 'reset' });
        }
        items.sort(function (a, b) { return a.target - b.target; });
        const units = items.filter(function (item) { return item.scope === 'thcs'; });
        const other = items.filter(function (item) { return item.scope !== 'thcs'; });
        return units.concat(other.slice(0, Math.max(0, 8 - units.length)));
    }

    function resetTarget(at, times) {
        const n = Number(times || 0);
        const days = n === 1 ? 7 : (n === 2 ? 14 : null);
        const start = Date.parse(at || '');
        return days && Number.isFinite(start) ? start + days * DAY_MS : null;
    }
    function assignedGrade() {
        try {
            const grade = window.LDDStudentGrade && Number(window.LDDStudentGrade.getGrade());
            return Number.isInteger(grade) && grade >= 1 && grade <= 12 ? grade : null;
        } catch (e) { return null; }
    }
    function unitLabel(value) {
        const match = String(value == null ? '' : value).match(/(\d+)(?!.*\d)/);
        return match ? 'Unit ' + Number(match[1]) : String(value || 'Unit');
    }
    function prettyKey(key) { return String(key || 'Chủ đề').replace(/[-_]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }

    function renderCountdowns(host, items) {
        host.innerHTML = '';
        if (!items.length) {
            host.innerHTML = '<p class="ldd-home-live-empty">Hiện chưa có mục nào đang chờ reset hoặc mở theo thời gian.</p>';
            return;
        }
        items.forEach(function (item) {
            const row = document.createElement('div');
            row.className = 'ldd-home-timer-row';
            row.dataset.targetMs = String(item.target);
            row.innerHTML = '<span class="ldd-home-timer-icon">' + (item.kind === 'reset' ? '↻' : '🔒') + '</span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value" data-countdown></span>';
            row.querySelector('strong').textContent = item.title;
            row.querySelector('small').textContent = item.note;
            host.appendChild(row);
        });
        tickCountdowns();
    }

    function tickCountdowns() {
        document.querySelectorAll('#tab-trang-chu [data-target-ms] [data-countdown]').forEach(function (out) {
            const row = out.closest('[data-target-ms]');
            const diff = Number(row.dataset.targetMs) - Date.now();
            out.textContent = diff > 0 ? formatDuration(diff) : 'Đã tới hạn';
            row.classList.toggle('is-soon', diff > 0 && diff < 3600000);
        });
    }
    function formatDuration(ms) {
        let s = Math.max(0, Math.floor(ms / 1000));
        const d = Math.floor(s / 86400); s %= 86400;
        const h = Math.floor(s / 3600); s %= 3600;
        const m = Math.floor(s / 60); const sec = s % 60;
        return (d ? d + ' ngày ' : '') + pad(h) + ':' + pad(m) + ':' + pad(sec);
    }
    function pad(n) { return String(n).padStart(2, '0'); }

    function renderRank(host, rows) {
        host.innerHTML = '';
        if (!rows.length) { host.innerHTML = '<p class="ldd-home-live-empty">Chưa có dữ liệu xếp hạng.</p>'; return; }
        const me = userId(), medals = ['🥇', '🥈', '🥉'];
        rows.forEach(function (r, i) {
            const item = document.createElement('div');
            item.className = 'ldd-home-rank-row' + (me && String(r.user_id) === String(me) ? ' is-me' : '');
            const name = String(r.display_name || 'Học viên');
            item.innerHTML = '<span class="ldd-home-rank-pos"></span><span class="ldd-home-rank-avatar"></span><span class="ldd-home-rank-name"></span><strong class="ldd-home-rank-score"></strong>';
            item.querySelector('.ldd-home-rank-pos').textContent = medals[i] || String(i + 1);
            const avatar = item.querySelector('.ldd-home-rank-avatar');
            if (r.avatar_url) { const img = document.createElement('img'); img.src = r.avatar_url; img.alt = ''; img.loading = 'lazy'; avatar.appendChild(img); }
            else avatar.textContent = name.trim() ? name.trim()[0].toUpperCase() : '?';
            item.querySelector('.ldd-home-rank-name').textContent = name + (me && String(r.user_id) === String(me) ? ' (Bạn)' : '');
            item.querySelector('.ldd-home-rank-score').textContent = Math.round(Number(r.diligence_score || 0)) + ' điểm';
            host.appendChild(item);
        });
    }

    function badgeCount(el) {
        if (!el || window.getComputedStyle(el).display === 'none') return 0;
        const n = parseInt(String(el.textContent || '').replace(/\D/g, ''), 10);
        return Number.isFinite(n) ? n : (String(el.textContent || '').trim() ? 1 : 0);
    }
})();
