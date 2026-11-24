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
    let refreshAfterCurrent = false;
    let refreshQueued = null;
    let latestState = null;
    let currentPodcastId = null;

    let feedbackOwner = null;
    let feedbackVersion = 0;
    let feedbackBusy = false;
    let feedbackNext = 0;

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
        // Wrap watchSession so the egress guard does not mistake this lightweight
        // auth/session watcher for a dashboard polling callback and throttle it to 5 minutes.
        setInterval(function () { watchSession(); }, 1200);
        bindSessionUiWatcher();
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

    function learnerComment(rows) {
        // One or two answers are too little evidence for a strength or a weakness.
        const usable = rows.map(row => ({category: row.category, topic: row.topic,
            right: Number(row.correct_count), total: Number(row.item_count)}))
            .filter(row => row.total >= 3 && row.right >= 0 && row.right <= row.total);
        const rate = row => (row.right + 1) / (row.total + 2);
        usable.sort((a,b) => rate(b) - rate(a) || b.total - a.total || a.topic.localeCompare(b.topic, 'vi'));
        const strong = usable.find(row => row.right / row.total >= 0.75);
        const weak = usable.slice().reverse().find(row => row.total - row.right >= 2 && row.right / row.total <= 0.65);
        const lines = [];
        if (strong) lines.push(['Em làm tốt', strong.category + ' · ' + strong.topic + ' (' + strong.right + '/' + strong.total + ' mục đúng).']);
        if (weak) lines.push(['Em nên ôn', weak.category + ' · ' + weak.topic + ' (' + (weak.total - weak.right) + '/' + weak.total + ' mục sai).']);
        if (!lines.length) {
            const sample = usable[0];
            if (sample) lines.push(['Đang luyện', sample.topic + ' (' + sample.right + '/' + sample.total + ' mục đúng).']);
            else lines.push(['', rows.length ? 'Cần thêm câu đã chấm cùng chủ điểm để nhận xét chính xác hơn.' : 'Nhận xét sẽ xuất hiện khi có kết quả đã chấm đủ để đối chiếu.']);
        }
        return lines;
    }

    function syncLearningFeedback(token) {
        let panel = document.getElementById('ldd-home-study-feedback');
        if (feedbackOwner !== token) {
            feedbackOwner = token;
            feedbackVersion++;
            feedbackBusy = false;
            feedbackNext = 0;
            if (panel) { panel.remove(); panel = null; }
        }
        const tools = document.querySelector('#tab-trang-chu.active .ldd-home-dashboard .ldd-home-tools');
        if (!token || !tools || document.hidden) return;
        // Keep the existing feedback panel directly under the four home actions.
        // Moving the DOM node preserves its loaded feedback and avoids a second request.
        if (panel && panel.parentElement !== tools) tools.appendChild(panel);
        if (feedbackBusy || Date.now() < feedbackNext) return;
        if (!panel) {
            panel = document.createElement('section');
            panel.id = 'ldd-home-study-feedback';
            panel.innerHTML = '<h3>Nhận xét từ bài kiểm tra</h3><div aria-live="polite">Đang xem kết quả của em…</div>';
            tools.appendChild(panel);
        }
        const body = panel.querySelector('div');
        const version = feedbackVersion;
        feedbackBusy = true;
        fetch(SUPABASE_URL + '/rest/v1/rpc/my_private_test_feedback', {
            method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json' }, body: '{}', cache: 'no-store'
        }).then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        }).then(rows => {
            if (version !== feedbackVersion || token !== getToken()) return;
            const lines = learnerComment(rows);
            body.replaceChildren();
            lines.forEach(([label, value]) => {
                const line = document.createElement('p');
                if (label) {
                    const emphasis = document.createElement('strong');
                    emphasis.textContent = label + ': ';
                    line.appendChild(emphasis);
                }
                line.appendChild(document.createTextNode(value));
                body.appendChild(line);
            });
            feedbackNext = Date.now() + 300000;
        }).catch(() => {
            if (version !== feedbackVersion || token !== getToken()) return;
            body.textContent = 'Chưa tải được nhận xét. Trang sẽ tự thử lại.';
            feedbackNext = Date.now() + 30000;
        }).finally(() => { if (version === feedbackVersion) feedbackBusy = false; });
    }

    function watchSession() {
        const token = getToken();
        if (token && token !== activeToken) {
            activeToken = token;
            latestState = null;
            window.LDDOciCandidateSnapshot = null;
            window.dispatchEvent(new CustomEvent('ldd:oci-candidates', { detail: null }));
            renderToday(null);
            // A fresh login should not inherit a dashboard cache from the previous session.
            if (window.LDDEgress && typeof window.LDDEgress.clear === 'function') {
                window.LDDEgress.clear();
            }
            queueRefresh(0);
        } else if (!token && activeToken) {
            activeToken = null;
            latestState = null;
            refreshAfterCurrent = false;
            window.LDDOciCandidateSnapshot = null;
            window.dispatchEvent(new CustomEvent('ldd:oci-candidates', { detail: null }));
            renderToday(null);
            renderLive(null);
        }
        ensureTodayHost();
        ensureLivePanel();
        syncLearningFeedback(token);
    }

    function bindSessionUiWatcher() {
        const account = document.getElementById('account-area');
        if (!account || account.dataset.lddTodaySessionWatch === '1') return;
        account.dataset.lddTodaySessionWatch = '1';
        new MutationObserver(function () {
            // Login/logout updates #account-area immediately. Re-check the auth token now,
            // then the 1.2s watcher below catches the rare case where storage updates a beat later.
            watchSession();
        }).observe(account, { attributes: true, attributeFilter: ['style', 'class'] });
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
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(function () { controller.abort(); }, 12000) : null;
        try {
            const response = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + qs.toString(), {
                headers: { apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + token, Accept: 'application/json' },
                signal: controller ? controller.signal : undefined
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.warn('[LDD Today] ' + table + ': ' + (err && err.message ? err.message : err));
            return Object.assign([], { lddFailed: true });
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
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
        const requestToken = getToken();
        if (!requestToken) return;
        if (refreshing) {
            refreshAfterCurrent = true;
            return;
        }
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

            state.progressReliable = result.slice(0, 9).every(rows => !rows.lddFailed);
            state.vocabTestPending = await getVocabTestPending();
            state.customTestCount = badgeCount(document.getElementById('ctest-folder-badge'));

            // Ignore results that finished after the user logged out or switched session.
            if (getToken() !== requestToken) {
                refreshAfterCurrent = !!getToken();
                return;
            }
            latestState = state;

            await reconcileIpa(state);
            if (getToken() !== requestToken) return;
            computePodcastState(state);
            publishOciCandidates(state, uid);
            renderToday(state);
            renderLive(state);
            installVocabPoorFilter();
            decoratePodcastCards(state);
        } finally {
            refreshing = false;
            if (refreshAfterCurrent && getToken()) {
                refreshAfterCurrent = false;
                queueRefresh(0);
            } else {
                refreshAfterCurrent = false;
            }
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

    // Reuse the dashboard's existing authenticated data rather than making
    // Oci repeat requests for read/listen history. Send only minimum metadata.
    // Lightweight single-article preview; no all-articles content download.
    window.LDDOciNewsPreview = async function (articleId, expectedUid) {
        const id = String(articleId || '');
        if (!/^\d+$/.test(id) || !getToken() || userId() !== expectedUid) return null;
        const rows = await query('news_articles', 'id,title,thumb', { id: 'eq.' + id, limit: '1' });
        if (userId() !== expectedUid) return null;
        return rows[0] || null;
    };

    function publishOciCandidates(state, uid) {
        const readIds = new Set((state.reads || []).map(row => String(row.article_id)));
        const listeningIds = new Set((state.podcastProgress || []).map(row => String(row.podcast_id)));
        const articles = (state.articles || [])
            .filter(row => !readIds.has(String(row.id)))
            .map(row => String(row.id)).reverse();
        const podcasts = (state.podcasts || [])
            .filter(row => !listeningIds.has(String(row.id)) && !(state.podcastInfo || {})[String(row.id)]?.complete)
            .map(row => ({
                id: String(row.id),
                title: String(row.title || ''),
                // Keep the data passed to the mascot small; only an excerpt.
                opening: (Array.isArray(row.segments) ? row.segments : [])
                    .slice(0, 4).map(seg => ({
                        en: String(seg?.en || '').slice(0, 170),
                        vi: String(seg?.vi || '').slice(0, 170)
                    }))
            })).reverse();
        const snapshot = { uid: String(uid), articles, podcasts };
        window.LDDOciCandidateSnapshot = snapshot;
        window.dispatchEvent(new CustomEvent('ldd:oci-candidates', { detail: snapshot }));
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
                side.innerHTML = '<div id="ldd-today-tasks" class="ldd-today-tasks"></div>';
                dashboard.appendChild(side);
            }
            host = side.querySelector('#ldd-today-tasks');
        }
        return host;
    }

    // A day is marked only when the learner has a saved activity.
    function activityWeek(state, now) {
        const dayKey = date => date.toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });
        const today = dayKey(now);
        const days = Array.from({ length: 7 }, (_, index) => {
            const date = new Date(Date.parse(today + 'T12:00:00+07:00') - (6 - index) * DAY_MS);
            return { key: dayKey(date), label: ['CN','T2','T3','T4','T5','T6','T7'][date.getUTCDay()], active: false };
        });
        const weekStart = Date.parse(days[0].key + 'T00:00:00+07:00');
        const recorded = new Set();
        function mark(value) {
            const stamp = Date.parse(value);
            if (stamp >= weekStart && stamp <= now.getTime()) recorded.add(dayKey(new Date(stamp)));
        }
        state.reads.forEach(row => mark(row.read_at));
        state.comments.forEach(row => mark(row.created_at));
        state.podcastProgress.forEach(row => mark(row.created_at));
        days.forEach(day => { day.active = recorded.has(day.key); });
        return days;
    }

    function buildStudyWeek(days) {
        const section = document.createElement('section');
        section.className = 'ldd-study-week';
        section.innerHTML = '<h3>7 ngày vừa qua</h3><div class="ldd-study-days"></div><p></p>';
        const strip = section.querySelector('.ldd-study-days');
        days.forEach((day, index) => {
            const cell = document.createElement('span');
            cell.className = day.active ? 'has-activity' : '';
            cell.innerHTML = '<b aria-hidden="true"></b><small></small>';
            cell.querySelector('b').textContent = day.active ? '✓' : '·';
            cell.querySelector('small').textContent = index === 6 ? 'Nay' : day.label;
            cell.setAttribute('aria-label', day.key + (day.active ? ' có luyện tập' : ' chưa ghi nhận'));
            cell.setAttribute('role', 'img');
            strip.appendChild(cell);
        });
        const count = days.filter(day => day.active).length;
        section.querySelector('p').textContent = count
            ? count + '/7 ngày có đọc báo, luyện podcast hoặc ghi âm IPA.'
            : 'Đọc một bài báo, luyện podcast hoặc ghi âm IPA để đánh dấu ngày học.';
        return section;
    }

    // Daily plan is isolated by learner and day. Keep finished items in the
    // denominator even when the pending-task list no longer contains them.
    let dailyPlanMemory = null;
    function dailyProgress(state, active, completed, raw) {
        const key = 'ldd_daily_plan_v1::' + userId() + '::' + state.day;
        let plan = dailyPlanMemory && dailyPlanMemory.key === key ? dailyPlanMemory.items : {};
        try { const saved = JSON.parse(localStorage.getItem(key) || 'null'); if (saved && typeof saved === 'object') plan = saved; } catch (_) {}
        const pending = new Map(active.map(item => [item.target, item]));
        const done = new Map(completed.map(item => [item.target, item]));
        if (state.progressReliable !== false) {
            pending.forEach((item, target) => {
                if (!plan[target]) plan[target] = { item: item, goal: item.count, initial: raw[target], done: false };
                const entry = plan[target];
                if (Object.prototype.hasOwnProperty.call(raw, target)) {
                    // Count the reduction in outstanding items, not a guessed number of clicks.
                    if (!Number.isFinite(entry.initial)) entry.initial = raw[target];
                    const remaining = Math.max(0, Math.min(raw[target], entry.goal, entry.goal - Math.max(0, entry.initial - raw[target])));
                    if (remaining === 0) entry.done = true;
                    else if (!entry.done) item.count = remaining;
                } else {
                    entry.done = false;
                }
                if (entry.done) {
                    const i = active.indexOf(item);
                    if (i >= 0) active.splice(i, 1);
                    if (!done.has(target)) completed.push(entry.item);
                }
            });
            done.forEach((item, target) => { plan[target] = { item: item, done: true }; });
            Object.keys(plan).forEach(target => {
                const entry = plan[target];
                if (!pending.has(target) && !done.has(target)) {
                    entry.done = true;
                    if (!completed.some(item => item.target === target)) completed.push(entry.item);
                }
            });
            dailyPlanMemory = { key: key, items: plan };
            try {
                localStorage.setItem(key, JSON.stringify(plan));
                // Only keep the current day's snapshot for this account.
                const prefix = 'ldd_daily_plan_v1::' + userId() + '::';
                for (let i = localStorage.length - 1; i >= 0; i--) {
                    const name = localStorage.key(i);
                    if (name && name.startsWith(prefix) && name !== key) localStorage.removeItem(name);
                }
            } catch (_) {}
        }
        const total = new Set([...active, ...completed].map(item => item.target)).size;
        return { done: completed.length, total: total, reliable: state.progressReliable !== false };
    }

    let lastCompanionMilestone = '';
    function buildStudyMascot(progress) {
        const total = progress.total, done = Math.min(progress.done, total);
        const percent = total ? Math.floor(done * 100 / total) : 0;
        const level = !total || !progress.reliable ? 0 : percent === 100 ? 4 : percent >= 75 ? 3 : percent >= 50 ? 2 : percent >= 25 ? 1 : 0;
        const messages = ['Bắt đầu nhé!', 'Khởi đầu tốt lắm!', 'Được nửa chặng rồi!', 'Sắp hoàn thành rồi!', 'Hoàn thành hôm nay!'];
        const node = document.createElement('div');
        node.className = 'ldd-study-companion';
        node.dataset.milestone = String(level);
        const milestoneKey = userId() + ':' + todayIso() + ':' + level;
        if (progress.reliable && milestoneKey !== lastCompanionMilestone) {
            node.classList.add('is-animating');
            lastCompanionMilestone = milestoneKey;
        }
        node.innerHTML = `
            <svg class="ldd-companion-owl" viewBox="0 0 136 116" aria-hidden="true" focusable="false">
                <ellipse cx="68" cy="107" rx="37" ry="5" fill="#102d4e" opacity=".42"/>
                <g class="ldd-owl-body">
                    <path d="M36 29 31 8 55 22M100 29 105 8 81 22" fill="#66d6d0" stroke="#17405d" stroke-width="3" stroke-linejoin="round"/>
                    <path d="M29 54C9 59 13 88 38 88L43 67M107 54C127 59 123 88 98 88L93 67" fill="#48b5bd" stroke="#17405d" stroke-width="3"/>
                    <path class="ldd-owl-wing" d="M99 61Q124 62 119 35Q116 26 110 36L99 49" fill="#80e4d5" stroke="#17405d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <ellipse cx="68" cy="65" rx="39" ry="42" fill="#68d7d0" stroke="#17405d" stroke-width="3"/>
                    <ellipse cx="68" cy="78" rx="25" ry="24" fill="#c6f6e6"/>
                    <circle cx="52" cy="48" r="19" fill="#fffaf0"/><circle cx="84" cy="48" r="19" fill="#fffaf0"/>
                    <g class="ldd-owl-eyes"><circle cx="54" cy="48" r="6" fill="#19365a"/><circle cx="82" cy="48" r="6" fill="#19365a"/><circle cx="56" cy="46" r="2" fill="white"/><circle cx="84" cy="46" r="2" fill="white"/></g>
                    <g class="ldd-owl-happy" fill="none" stroke="#19365a" stroke-width="3.5" stroke-linecap="round"><path d="M46 49q7-11 14 0M76 49q7-11 14 0"/></g>
                    <path d="m61 58 7 9 7-9z" fill="#ffd47b" stroke="#b9793a" stroke-width="1.5"/>
                    <path d="M44 102h15M77 102h15" stroke="#ffd47b" stroke-width="7" stroke-linecap="round"/>
                    <g class="ldd-owl-book" stroke="#19365a" stroke-width="2" stroke-linejoin="round"><path d="M41 75q15-5 27 5 12-10 27-5v21q-15-4-27 5-12-9-27-5z" fill="#fff0ae"/><path d="M68 80v21" fill="none"/></g>
                    <g class="ldd-owl-pencil"><path d="m83 92 15-25 5 3-15 25-6 4z" fill="#ffd47b" stroke="#19365a" stroke-width="1.5"/></g>
                </g>
                <g class="ldd-owl-stars" fill="#ffe596"><path d="m17 23 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z"/><path d="m117 6 2 5 6 1-4 4 1 6-5-3-5 3 1-6-4-4 6-1z"/><circle cx="126" cy="62" r="3"/><circle cx="11" cy="65" r="2.5"/></g>
                <g class="ldd-owl-check"><circle cx="107" cy="91" r="13" fill="#fff0ae" stroke="#19365a" stroke-width="2"/><path d="m101 91 4 4 7-9" fill="none" stroke="#19725d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
            </svg>
            <div class="ldd-companion-ring" role="progressbar" aria-label="Tiến độ việc hôm nay" aria-valuemin="0" aria-valuemax="100">
                <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="5"/><circle class="ldd-companion-fill" cx="32" cy="32" r="27" fill="none" stroke="#fff0ae" stroke-width="5" stroke-linecap="round" pathLength="100" transform="rotate(-90 32 32)"/></svg>
                <strong></strong>
            </div>
            <span class="ldd-companion-count"></span><span class="ldd-companion-message"></span>`;
        const ring = node.querySelector('.ldd-companion-ring');
        if (progress.reliable) ring.setAttribute('aria-valuenow', String(percent));
        ring.setAttribute('aria-valuetext', progress.reliable ? done + '/' + total + ' đầu việc hoàn thành' : 'Đang cập nhật tiến độ');
        node.querySelector('.ldd-companion-fill').setAttribute('stroke-dasharray', percent + ' 100');
        ring.querySelector('strong').textContent = progress.reliable && total ? done + '/' + total : '—';
        node.querySelector('.ldd-companion-count').textContent = progress.reliable && total ? 'Việc đã hoàn thành' : '';
        node.querySelector('.ldd-companion-message').textContent = !progress.reliable ? 'Đang cập nhật' : !total ? 'Chưa có nhiệm vụ' : messages[level];
        return node;
    }

    // Every displayed task is one step on the companion's daily progress ring.
    function dailyRequirement(item) {
        const n = item.count;
        switch (item.target) {
            case 'vocab-poor': return 'Luyện lại ' + n + ' từ, đạt từ 60% trở lên';
            case 'vocab-unpronounced': return 'Hoàn thành phát âm ' + n + ' từ chưa luyện';
            case 'ipa': return 'Hoàn thành ghi âm ' + n + ' âm IPA chưa luyện';
            case 'news': return 'Đọc xong 1 bài báo';
            case 'tests': return 'Hoàn thành ' + n + ' bài kiểm tra được giao';
            case 'vocabtest': return 'Hoàn thành bài kiểm tra từ vựng';
            case 'conj': return 'Hoàn thành 1 lượt luyện liên từ';
            case 'podcast': return 'Hoàn thành giai đoạn 1 của 1 podcast';
            default: return item.note;
        }
    }

    function buildNextTask(item, progress) {
        const box = document.createElement('section');
        box.className = 'ldd-study-next ldd-study-next-with-companion';
        const copy = document.createElement('div');
        copy.className = 'ldd-study-next-copy';
        copy.innerHTML = '<small></small><h3></h3><p></p>';
        const assigned = item && item.target === 'tests';
        copy.querySelector('small').textContent = assigned ? 'Giáo viên giao' : 'Việc hôm nay';
        copy.querySelector('h3').textContent = item ? item.title : progress.total && progress.reliable ? 'Hoàn thành rồi!' : 'Không có nhiệm vụ đang chờ';
        copy.querySelector('p').textContent = item ? dailyRequirement(item) + '.' : 'Em có thể luyện thêm theo sở thích.';
        if (item) {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = assigned ? 'Xem bài được giao →' : 'Bắt đầu luyện →';
            button.addEventListener('click', () => navigateToday(item.target));
            copy.appendChild(button);
            const hint = document.createElement('span');
            hint.className = 'ldd-daily-progress-hint';
            hint.textContent = 'Hoàn thành mỗi mục (kể cả các mục bên dưới) để tăng 1 việc.';
            copy.appendChild(hint);
        }
        box.append(copy, buildStudyMascot(progress));
        return box;
    }

    function renderToday(state) {
        const host = ensureTodayHost();
        if (!host) return;
        if (!getToken() || !state) {
            delete host.dataset.tasksSignature;
            host.innerHTML = getToken() ? '<div class="ldd-today-loading">Đang tải việc học hôm nay…</div>' : '<div class="ldd-today-loading">Đăng nhập để xem nhiệm vụ hôm nay.</div>';
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
        const conjDoneToday = (state.conjToday || []).length > 0;
        const podcastDoneToday = !!state.podcastCompletedToday;

        const activeTasks = [];
        const completedTasks = [];

        function place(item, done) {
            if (done && !item.count) return;
            if (done) completedTasks.push(item);
            else activeTasks.push(item);
        }

        place(
            dailyTask('vocab-poor', '🎯', 'Tập lại phát âm',
                Math.min(DAILY_POOR_TARGET, poor), 'từ',
                'Ưu tiên từ có điểm phát âm gần nhất dưới 60%'),
            poor <= 0
        );

        place(
            dailyTask('vocab-unpronounced', '🎤', 'Từ chưa phát âm',
                Math.min(DAILY_UNPRONOUNCED_TARGET, unpronounced), 'từ',
                'Hoàn thành tối đa 10 từ trong hôm nay'),
            unpronounced <= 0
        );

        place(
            dailyTask('ipa', '🔤', 'Luyện phiên âm IPA',
                Math.min(DAILY_IPA_TARGET, state.ipaUnrecorded || 0), 'âm',
                'Mỗi ngày luyện tối đa 5 âm chưa ghi âm'),
            (state.ipaUnrecorded || 0) <= 0
        );

        if (unreadArticles > 0 || readToday) {
            place(
                dailyTask('news', '📰', 'Đọc bài báo', 1, 'bài',
                    readToday ? 'Đã đọc bài hôm nay' : 'Đọc 1 bài là hoàn thành'),
                readToday
            );
        }

        if (state.customTestCount > 0) {
            activeTasks.push(dailyTask('tests', '📝', 'Bài kiểm tra được giao',
                state.customTestCount, 'bài', 'Mở danh sách bài cần làm'));
        }

        if (state.vocabTestPending) {
            activeTasks.push(dailyTask('vocabtest', '📒', 'Kiểm tra từ vựng',
                1, 'bài', 'Bài kiểm tra đang sẵn sàng'));
        }

        place(
            dailyTask('conj', '🔗', 'Luyện tập liên từ', 1, 'lượt',
                conjDoneToday ? 'Đã hoàn thành lượt luyện hôm nay' : 'Hoàn thành 1 lượt hôm nay'),
            conjDoneToday
        );

        if (state.podcastIncomplete > 0 || podcastDoneToday) {
            place(
                dailyTask('podcast', '🎧', 'Nghe Podcast', 1, 'bài',
                    podcastDoneToday ? 'Đã hoàn thành Giai đoạn 1 hôm nay' : 'Hoàn thành Giai đoạn 1 của 1 bài'),
                podcastDoneToday
            );
        }

        const progress = dailyProgress(state, activeTasks, completedTasks, { 'vocab-poor': poor, 'vocab-unpronounced': unpronounced, ipa: state.ipaUnrecorded || 0 });
        const days = activityWeek(state, new Date());
        const priority = activeTasks.find(item => item.target === 'tests')
            || activeTasks.find(item => item.target === 'vocabtest')
            || activeTasks[0];
        const signature = JSON.stringify([activeTasks, completedTasks, days, progress]);
        if (host.dataset.tasksSignature === signature) return;
        host.dataset.tasksSignature = signature;
        host.innerHTML = '';

        const overview = document.createElement('div');
        overview.className = 'ldd-study-overview';
        overview.appendChild(buildNextTask(priority, progress));
        overview.appendChild(buildStudyWeek(days));
        host.appendChild(overview);

        const activeGrid = document.createElement('div');
        activeGrid.className = 'ldd-today-primary ldd-today-mission-grid';
        if (!activeTasks.length) {
            activeGrid.innerHTML = '<div class="ldd-today-all-done">✓ Không còn nhiệm vụ nào đang chờ.</div>';
        } else {
            activeTasks.filter(item => item !== priority).forEach(function (item) {
                activeGrid.appendChild(buildMissionCard(item, false));
            });
        }
        if (activeGrid.childElementCount) {
            host.appendChild(activeGrid);
        }

        if (completedTasks.length) {
            const completedWrap = document.createElement('div');
            completedWrap.className = 'ldd-today-completed-wrap';

            const heading = document.createElement('div');
            heading.className = 'ldd-today-completed-title';
            heading.innerHTML = '<span>Đã hoàn thành</span><small>' + completedTasks.length + ' đầu việc</small>';
            completedWrap.appendChild(heading);

            const completedGrid = document.createElement('div');
            completedGrid.className = 'ldd-today-mission-grid ldd-today-completed-grid';
            completedTasks.forEach(function (item) {
                completedGrid.appendChild(buildMissionCard(item, true));
            });
            completedWrap.appendChild(completedGrid);
            host.appendChild(completedWrap);
        }
    }

    function buildMissionCard(item, done) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'ldd-daily-mission' + (done ? ' is-done' : '');
        button.dataset.todayTarget = item.target;
        if (!done) button.setAttribute('aria-label', item.title + '. ' + dailyRequirement(item) + '. Hoàn thành để tăng 1 việc.');
        button.innerHTML =
            '<span class="ldd-daily-mission-icon"></span>' +
            '<span class="ldd-daily-mission-copy"><strong></strong><small></small></span>' +
            '<span class="ldd-daily-mission-goal"></span>' +
            '<span class="ldd-daily-mission-arrow">→</span>';

        button.querySelector('.ldd-daily-mission-icon').textContent = item.icon;
        button.querySelector('strong').textContent = item.title;
        button.querySelector('small').textContent = done ? 'Đã tính vào tiến độ hôm nay' : dailyRequirement(item);
        button.querySelector('.ldd-daily-mission-goal').textContent = done
            ? '✓ Xong'
            : item.count + ' ' + item.unit;
        button.addEventListener('click', function () { navigateToday(item.target); });
        return button;
    }

    function dailyTask(target, icon, title, count, unit, note) {
        return {
            target: target,
            icon: icon,
            title: title,
            count: count,
            unit: unit,
            note: note
        };
    }

    function task(target, icon, title, count, note) { return { target: target, icon: icon, title: title, count: count, note: note }; }

    function navigateToday(target) {
        if (target === 'ipa') return navigateAndAct('tab-phien-am', function () { scrollToEl(document.querySelector('.ipa-chart')); });
        if (target === 'news') return navigateAndAct('tab-tu-vung', function () { openVocabFolder('news-folder-card'); });
        if (target === 'tests') return navigateAndAct('tab-kiem-tra', function () { openTestFolder('ctest-folder-card'); });
        if (target === 'conj') return navigateAndAct('tab-tu-vung', function () { openVocabFolder('conj-folder-card'); });
        if (target === 'vocabtest') return navigateAndAct('tab-kiem-tra', function () { openTestFolder('vocab-test-folder'); });
        if (target === 'podcast') return navigateAndAct('tab-tu-vung', function () { openVocabFolder('podcast-folder-card'); });
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
    function openVocabFolder(cardId) {
        if (window.LDDVocabNavigation && typeof window.LDDVocabNavigation.openFolder === 'function') {
            if (window.LDDVocabNavigation.openFolder(cardId)) return true;
        }
        const card = document.getElementById(cardId);
        if (card) { card.click(); return true; }
        return false;
    }
    function openTestFolder(cardId) {
        if (window.LDDTestNavigation && typeof window.LDDTestNavigation.openFolder === 'function') {
            if (window.LDDTestNavigation.openFolder(cardId)) return true;
        }
        const card = document.getElementById(cardId);
        if (card) { card.click(); return true; }
        return false;
    }
    function scrollToEl(el) { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

    function openVocabFilter(filter) {
        navigateAndAct('tab-tu-vung', function () {
            openVocabFolder('myvocab-folder-card');
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
            delete rankHost.dataset.rankSignature;
            rankHost.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem bảng xếp hạng.</p>';
            return;
        }
        if (window.LDDStudentGrade && window.LDDStudentGrade.renderHomeTimers) {
            window.LDDStudentGrade.renderHomeTimers(state);
        } else {
            renderCountdowns(timerHost, buildCountdowns(state));
        }
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
        if (!host) return;

        // Reconcile countdown rows instead of clearing the whole host.
        // The THCS reset module owns .ldd-thcs-vocab-reset-ready rows; keeping
        // those nodes intact prevents the two modules from removing/re-adding
        // each other's content on every dashboard refresh.
        const existing = new Map();
        host.querySelectorAll('[data-ldd-live-countdown="1"]').forEach(function (row) {
            existing.set(row.dataset.countdownKey || '', row);
        });

        const used = new Set();
        items.forEach(function (item) {
            const key = String(item.kind || '') + '|' + String(item.title || '');
            let row = existing.get(key);
            if (!row) {
                row = document.createElement('div');
                row.className = 'ldd-home-timer-row';
                row.dataset.lddLiveCountdown = '1';
                row.dataset.countdownKey = key;
                row.innerHTML = '<span class="ldd-home-timer-icon"></span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value" data-countdown></span>';
            }

            row.dataset.targetMs = String(item.target);
            row.dataset.timerKind = item.kind || '';
            row.querySelector('.ldd-home-timer-icon').textContent = item.kind === 'reset' ? '↻' : '🔒';
            row.querySelector('strong').textContent = item.title;
            row.querySelector('small').textContent = item.note;
            host.appendChild(row);
            used.add(key);
        });

        existing.forEach(function (row, key) {
            if (!used.has(key)) row.remove();
        });

        const hasReadyRows = !!host.querySelector('.ldd-thcs-vocab-reset-ready');
        let empty = host.querySelector(':scope > .ldd-home-live-empty');
        if (items.length || hasReadyRows) {
            if (empty) empty.remove();
        } else if (!empty) {
            empty = document.createElement('p');
            empty.className = 'ldd-home-live-empty';
            empty.textContent = 'Hiện chưa có mục nào đang chờ reset hoặc mở theo thời gian.';
            host.appendChild(empty);
        }

        tickCountdowns();
    }

    function tickCountdowns() {
        if (document.hidden) return;
        document.querySelectorAll('#tab-trang-chu [data-target-ms] [data-countdown]').forEach(function (out) {
            const row = out.closest('[data-target-ms]');
            if (!row) return;
            const diff = Number(row.dataset.targetMs) - Date.now();
            const nextText = diff > 0 ? formatDuration(diff) : 'Đã tới hạn';
            // Avoid needless text mutations/layout work when another refresh
            // calls tickCountdowns() inside the same second.
            if (out.textContent !== nextText) out.textContent = nextText;
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
        const signature = JSON.stringify([userId(), rows]);
        if (host.dataset.rankSignature === signature) return;
        host.dataset.rankSignature = signature;
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

