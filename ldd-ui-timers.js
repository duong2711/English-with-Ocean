/* =============================================================
   LDD ENGLISH — LANDING RESET / UNLOCK COUNTDOWN UI v2
   - Hiện countdown tập trung ngay trên landing page sau đăng nhập.
   - Giữ timer nhỏ ở các card học tập khi người học mở module tương ứng.
   - Hiện lại bảng xếp hạng chăm chỉ trên landing page (không di chuyển/xóa bảng trong Hồ sơ).
   - Tự phát hiện session sau khi đăng nhập, không phải chờ 60 giây.
   - Chỉ đọc dữ liệu; không thay đổi điểm, tiến độ hay rule mở khóa/reset.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const DAY_MS = 24 * 60 * 60 * 1000;
    const VOCAB_TEST_INTERVAL_MS = 2 * DAY_MS;
    const SERVER_REFRESH_MS = 45 * 1000;

    let kidRows = [];
    let thcsRows = [];
    let vocabRows = [];
    let conjRows = [];
    let leaderboardRows = [];
    let lastToken = null;
    let lastServerRefreshAt = 0;
    let refreshPromise = null;
    let decorateTimer = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        ensureLandingPanel();
        observeDynamicContent();
        scheduleRefresh(80, true);
        setInterval(tickAllTimers, 1000);
        setInterval(function () {
            if (document.visibilityState === 'visible') refreshAll(true);
        }, SERVER_REFRESH_MS);
        setInterval(checkSessionChanged, 1500);
        checkSessionChanged();
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                ensureLandingPanel();
                refreshAll(true);
            }
        });
    });

    function checkSessionChanged() {
        const token = getAccessToken();
        if (token && token !== lastToken) {
            lastToken = token;
            lastServerRefreshAt = 0;
            ensureLandingPanel();
            refreshAll(true);
        } else if (!token && lastToken) {
            lastToken = null;
            kidRows = [];
            thcsRows = [];
            vocabRows = [];
            conjRows = [];
            leaderboardRows = [];
            renderLanding();
        } else if (token) {
            ensureLandingPanel();
        }
    }

    function getAccessToken() {
        try {
            const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.access_token === 'string') return parsed.access_token;
            if (parsed && parsed.currentSession && typeof parsed.currentSession.access_token === 'string') return parsed.currentSession.access_token;
            if (Array.isArray(parsed) && parsed[0] && typeof parsed[0].access_token === 'string') return parsed[0].access_token;
        } catch (e) {}
        return null;
    }

    function getCurrentUserId() {
        const token = getAccessToken();
        if (!token) return null;
        try {
            let payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (payload.length % 4) payload += '=';
            return JSON.parse(atob(payload)).sub || null;
        } catch (e) {
            return null;
        }
    }

    async function restSelect(table, select, query) {
        const token = getAccessToken();
        if (!token) return [];
        const params = new URLSearchParams();
        params.set('select', select);
        Object.keys(query || {}).forEach(function (key) {
            const value = query[key];
            if (Array.isArray(value)) value.forEach(function (v) { params.append(key, v); });
            else params.set(key, value);
        });
        const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + params.toString(), {
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        });
        if (!res.ok) throw new Error(table + ': HTTP ' + res.status);
        return await res.json();
    }

    async function safeSelect(table, select, query) {
        try {
            const rows = await restSelect(table, select, query);
            return Array.isArray(rows) ? rows : [];
        } catch (err) {
            console.warn('[LDD landing] Không đọc được ' + table + ':', err.message);
            return [];
        }
    }

    function ensureLandingPanel() {
        const dashboard = document.querySelector('#tab-phien-am .ldd-home-dashboard');
        if (!dashboard) {
            setTimeout(ensureLandingPanel, 250);
            return null;
        }
        let panel = dashboard.querySelector('#ldd-home-live-panel');
        if (panel) return panel;
        panel = document.createElement('section');
        panel.id = 'ldd-home-live-panel';
        panel.className = 'ldd-home-live-panel';
        panel.innerHTML =
            '<div class="ldd-home-live-card ldd-home-timers-card">' +
                '<div class="ldd-home-live-head">' +
                    '<div><span class="ldd-home-live-kicker">Sắp tới</span><h3>⏱ Reset & mở khóa</h3></div>' +
                    '<span class="ldd-home-live-note">Cập nhật tự động</span>' +
                '</div>' +
                '<div id="ldd-home-timer-list" class="ldd-home-timer-list"><p class="ldd-home-live-empty">Đang tải thời gian...</p></div>' +
            '</div>' +
            '<div class="ldd-home-live-card ldd-home-rank-card">' +
                '<div class="ldd-home-live-head">' +
                    '<div><span class="ldd-home-live-kicker">Thi đua</span><h3>🔥 Bảng xếp hạng chăm chỉ</h3></div>' +
                    '<span class="ldd-home-live-note">Top 10</span>' +
                '</div>' +
                '<div id="ldd-home-leaderboard" class="ldd-home-leaderboard"><p class="ldd-home-live-empty">Đang tải bảng xếp hạng...</p></div>' +
            '</div>';
        dashboard.appendChild(panel);
        return panel;
    }

    function observeDynamicContent() {
        new MutationObserver(function (mutations) {
            let relevant = false;
            for (const m of mutations) {
                if (m.target && m.target.closest && m.target.closest('#ldd-home-live-panel')) continue;
                relevant = true;
                break;
            }
            if (!document.getElementById('ldd-home-live-panel')) ensureLandingPanel();
            if (relevant) scheduleRefresh(180, false);
        }).observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'data-reset-at', 'data-expires-at', 'data-unlock-at', 'data-opens-at', 'data-available-at']
        });
    }

    function scheduleRefresh(delay, forceServer) {
        clearTimeout(decorateTimer);
        decorateTimer = setTimeout(function () { refreshAll(!!forceServer); }, delay || 0);
    }

    async function refreshAll(forceServer) {
        ensureLandingPanel();
        decorateGenericTimers();
        decorateConjunctionDailyResetFromDom();
        if (!getAccessToken()) {
            renderLanding();
            return;
        }
        const now = Date.now();
        if (forceServer || !lastServerRefreshAt || now - lastServerRefreshAt > SERVER_REFRESH_MS) {
            if (!refreshPromise) refreshPromise = loadServerRows().finally(function () { refreshPromise = null; });
            await refreshPromise;
        }
        decorateKidResetTimers();
        decorateThcsResetTimers();
        decorateVocabUnlockTimer();
        renderLanding();
        tickAllTimers();
    }

    async function loadServerRows() {
        if (!getAccessToken()) return;
        const todayIso = new Date().toISOString().slice(0, 10);
        const results = await Promise.all([
            safeSelect('kid_topic_progress', 'topic_key,times_completed,completed_at', {}),
            safeSelect('thcs_unit_progress', 'grade,unit_id,completed,times_completed,completed_at', {}),
            safeSelect('vocab_weekly_tests', 'id,created_at,status', { order: 'created_at.desc', limit: '1' }),
            safeSelect('conj_practice_sessions', 'id,session_date', { session_date: 'eq.' + todayIso }),
            safeSelect('diligence_scores', 'user_id,display_name,avatar_url,diligence_score,excluded', { excluded: 'eq.false', order: 'diligence_score.desc', limit: '10' })
        ]);
        kidRows = results[0];
        thcsRows = results[1];
        vocabRows = results[2];
        conjRows = results[3];
        leaderboardRows = results[4];
        lastServerRefreshAt = Date.now();
    }

    function expireDays(timesCompleted) {
        const n = Number(timesCompleted || 0);
        if (n <= 1) return 7;
        if (n === 2) return 14;
        return null;
    }

    function slugifyTopic(text) {
        return String(text || 'topic').trim().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'topic';
    }

    function topicLabelFromKey(key) {
        const raw = String(key || '').replace(/-/g, ' ').trim();
        return raw ? raw.replace(/\b\w/g, function (c) { return c.toUpperCase(); }) : 'Chủ đề từ vựng';
    }

    function decorateKidResetTimers() {
        const grid = document.getElementById('kid-topic-grid');
        if (!grid || !kidRows.length) return;
        const byKey = new Map(kidRows.map(function (r) { return [String(r.topic_key || ''), r]; }));
        grid.querySelectorAll('.kid-topic-card.completed').forEach(function (card) {
            const title = card.querySelector('.kid-title');
            if (!title) return;
            const row = byKey.get(slugifyTopic(title.textContent));
            if (!row || !row.completed_at) { removeTimer(card, 'kid-reset'); return; }
            const days = expireDays(row.times_completed);
            if (days == null) { removeTimer(card, 'kid-reset'); return; }
            const completedMs = Date.parse(row.completed_at);
            if (!Number.isFinite(completedMs)) return;
            setTimer(card, 'kid-reset', 'reset', completedMs + days * DAY_MS, 'Ôn lại sau');
        });
    }

    function currentThcsGrade() {
        const title = document.getElementById('thcs-grade-panel-title');
        const m = title && String(title.textContent || '').match(/Lớp\s+(\d+)/i);
        return m ? Number(m[1]) : null;
    }

    function unitNumberFromCard(card) {
        const title = card.querySelector('.kid-title');
        const m = title && String(title.textContent || '').match(/Unit\s+(\d+)/i);
        return m ? Number(m[1]) : null;
    }

    function unitIdMatchesNumber(unitId, number) {
        const raw = String(unitId == null ? '' : unitId).toLowerCase();
        if (raw === String(number) || raw === 'u' + number || raw === 'unit' + number || raw === 'unit-' + number) return true;
        const m = raw.match(/(\d+)$/);
        return !!(m && Number(m[1]) === number);
    }

    function decorateThcsResetTimers() {
        const grid = document.getElementById('thcs-unit-grid');
        const grade = currentThcsGrade();
        if (!grid || !grade || !thcsRows.length) return;
        grid.querySelectorAll('.thcs-unit-card.completed').forEach(function (card) {
            const unitNumber = unitNumberFromCard(card);
            if (!unitNumber) return;
            const row = thcsRows.find(function (r) {
                return Number(r.grade) === grade && r.completed && unitIdMatchesNumber(r.unit_id, unitNumber);
            });
            if (!row || !row.completed_at) { removeTimer(card, 'thcs-reset'); return; }
            const days = expireDays(row.times_completed);
            if (days == null) { removeTimer(card, 'thcs-reset'); return; }
            const completedMs = Date.parse(row.completed_at);
            if (!Number.isFinite(completedMs)) return;
            setTimer(card, 'thcs-reset', 'reset', completedMs + days * DAY_MS, 'Ôn lại sau');
        });
    }

    function decorateVocabUnlockTimer() {
        const folder = document.getElementById('vocab-test-folder');
        const statusHost = document.getElementById('vocab-own-test-status');
        const latest = vocabRows && vocabRows[0];
        if (!latest || latest.status === 'pending' || !latest.created_at) {
            if (folder) removeTimer(folder, 'vocab-unlock');
            if (statusHost) removeTimer(statusHost, 'vocab-unlock');
            return;
        }
        const createdMs = Date.parse(latest.created_at);
        if (!Number.isFinite(createdMs)) return;
        const target = createdMs + VOCAB_TEST_INTERVAL_MS;
        if (target <= Date.now()) return;
        if (folder) setTimer(folder, 'vocab-unlock', 'unlock', target, 'Bài mới mở sau');
        if (statusHost) setTimer(statusHost, 'vocab-unlock', 'unlock', target, 'Mở sau');
    }

    function nextUtcDayBoundary() {
        const now = new Date();
        return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0);
    }

    function decorateConjunctionDailyResetFromDom() {
        const status = document.getElementById('conj-practice-daily-status');
        if (!status) return;
        const text = (status.textContent || '').toLowerCase();
        if (text.includes('đã luyện đủ') || text.includes('quay lại vào ngày mai')) {
            setTimer(status, 'conj-daily-reset', 'reset', nextUtcDayBoundary(), 'Reset lượt sau');
        } else {
            removeTimer(status, 'conj-daily-reset');
        }
    }

    function buildLandingTimers() {
        const now = Date.now();
        const items = [];
        kidRows.forEach(function (row) {
            if (!row.completed_at) return;
            const days = expireDays(row.times_completed);
            if (days == null) return;
            const completedMs = Date.parse(row.completed_at);
            if (!Number.isFinite(completedMs)) return;
            const target = completedMs + days * DAY_MS;
            if (target > now) items.push({ kind: 'reset', title: 'Vận dụng · ' + topicLabelFromKey(row.topic_key), label: 'Reset tiến độ sau', target: target });
        });
        thcsRows.forEach(function (row) {
            if (!row.completed || !row.completed_at) return;
            const days = expireDays(row.times_completed);
            if (days == null) return;
            const completedMs = Date.parse(row.completed_at);
            if (!Number.isFinite(completedMs)) return;
            const target = completedMs + days * DAY_MS;
            if (target <= now) return;
            const unitRaw = String(row.unit_id == null ? '' : row.unit_id);
            const match = unitRaw.match(/(\d+)$/);
            items.push({ kind: 'reset', title: 'Lớp ' + row.grade + ' · Unit ' + (match ? match[1] : unitRaw), label: 'Reset tiến độ sau', target: target });
        });
        const latest = vocabRows && vocabRows[0];
        if (latest && latest.status !== 'pending' && latest.created_at) {
            const target = Date.parse(latest.created_at) + VOCAB_TEST_INTERVAL_MS;
            if (Number.isFinite(target) && target > now) items.push({ kind: 'unlock', title: 'Kiểm tra từ vựng của tôi', label: 'Bài tiếp theo mở sau', target: target });
        }
        if (conjRows.length >= 2) {
            const target = nextUtcDayBoundary();
            if (target > now) items.push({ kind: 'reset', title: 'Luyện tập Liên từ', label: 'Reset 2 lượt/ngày sau', target: target });
        }
        const seen = new Set();
        return items.filter(function (item) {
            const sig = item.kind + '|' + item.title + '|' + item.target;
            if (seen.has(sig)) return false;
            seen.add(sig);
            return true;
        }).sort(function (a, b) { return a.target - b.target; });
    }

    function renderLanding() {
        const panel = ensureLandingPanel();
        if (!panel) return;
        const timerList = panel.querySelector('#ldd-home-timer-list');
        const board = panel.querySelector('#ldd-home-leaderboard');
        if (!getAccessToken()) {
            if (timerList) timerList.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem thời gian reset và mở khóa.</p>';
            if (board) board.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem bảng xếp hạng.</p>';
            return;
        }
        renderLandingTimers(timerList, buildLandingTimers());
        renderLandingLeaderboard(board);
    }

    function renderLandingTimers(host, items) {
        if (!host) return;
        host.innerHTML = '';
        if (!items.length) {
            const empty = document.createElement('p');
            empty.className = 'ldd-home-live-empty';
            empty.textContent = 'Hiện chưa có mục nào đang chờ reset hoặc mở theo thời gian.';
            host.appendChild(empty);
            return;
        }
        items.slice(0, 8).forEach(function (item) {
            const row = document.createElement('div');
            row.className = 'ldd-home-timer-row';
            row.dataset.timerKind = item.kind;
            row.dataset.targetMs = String(item.target);
            row.innerHTML = '<span class="ldd-home-timer-icon" aria-hidden="true">' + (item.kind === 'reset' ? '↻' : '🔒') + '</span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value" data-landing-countdown></span>';
            row.querySelector('strong').textContent = item.title;
            row.querySelector('small').textContent = item.label;
            host.appendChild(row);
            renderLandingTimerRow(row);
        });
    }

    function renderLandingLeaderboard(host) {
        if (!host) return;
        host.innerHTML = '';
        if (!leaderboardRows.length) {
            const empty = document.createElement('p');
            empty.className = 'ldd-home-live-empty';
            empty.textContent = 'Chưa có dữ liệu xếp hạng.';
            host.appendChild(empty);
            return;
        }
        const me = getCurrentUserId();
        const medals = ['🥇', '🥈', '🥉'];
        leaderboardRows.forEach(function (row, index) {
            const item = document.createElement('div');
            item.className = 'ldd-home-rank-row' + (me && row.user_id === me ? ' is-me' : '');
            const rank = document.createElement('span');
            rank.className = 'ldd-home-rank-pos';
            rank.textContent = medals[index] || String(index + 1);
            const avatar = document.createElement('span');
            avatar.className = 'ldd-home-rank-avatar';
            const name = String(row.display_name || 'Học viên');
            if (row.avatar_url) {
                const img = document.createElement('img');
                img.src = row.avatar_url;
                img.alt = '';
                img.loading = 'lazy';
                avatar.appendChild(img);
            } else {
                avatar.textContent = name.trim() ? name.trim().charAt(0).toUpperCase() : '?';
            }
            const nameEl = document.createElement('span');
            nameEl.className = 'ldd-home-rank-name';
            nameEl.textContent = name + (me && row.user_id === me ? ' (Bạn)' : '');
            const score = document.createElement('strong');
            score.className = 'ldd-home-rank-score';
            score.textContent = Math.round(Number(row.diligence_score || 0)) + ' điểm';
            item.appendChild(rank);
            item.appendChild(avatar);
            item.appendChild(nameEl);
            item.appendChild(score);
            host.appendChild(item);
        });
    }

    function decorateGenericTimers() {
        const configs = [
            { attr: 'data-reset-at', kind: 'reset', label: 'Reset sau' },
            { attr: 'data-expires-at', kind: 'reset', label: 'Reset sau' },
            { attr: 'data-unlock-at', kind: 'unlock', label: 'Mở sau' },
            { attr: 'data-opens-at', kind: 'unlock', label: 'Mở sau' },
            { attr: 'data-available-at', kind: 'unlock', label: 'Mở sau' }
        ];
        configs.forEach(function (cfg) {
            document.querySelectorAll('[' + cfg.attr + ']').forEach(function (el) {
                if (el.closest('#ldd-home-live-panel')) return;
                const target = Date.parse(el.getAttribute(cfg.attr) || '');
                if (!Number.isFinite(target)) return;
                setTimer(el, 'generic-' + cfg.attr, cfg.kind, target, el.getAttribute('data-timer-label') || cfg.label);
            });
        });
    }

    function setTimer(host, key, kind, targetMs, label) {
        if (!host || !Number.isFinite(targetMs)) return;
        let chip = Array.from(host.children || []).find(function (child) {
            return child.classList && child.classList.contains('ldd-timer-chip') && child.dataset.lddTimerKey === key;
        });
        if (!chip) {
            chip = document.createElement('span');
            chip.className = 'ldd-timer-chip';
            chip.dataset.lddTimerKey = key;
            host.appendChild(chip);
        }
        chip.dataset.timerKind = kind;
        chip.dataset.targetMs = String(targetMs);
        chip.dataset.timerLabel = label || (kind === 'reset' ? 'Reset sau' : 'Mở sau');
        chip.title = (kind === 'reset' ? 'Thời điểm reset: ' : 'Thời điểm mở: ') + formatTargetTime(targetMs);
        renderTimerChip(chip);
    }

    function removeTimer(host, key) {
        if (!host) return;
        Array.from(host.children || []).forEach(function (child) {
            if (child.classList && child.classList.contains('ldd-timer-chip') && child.dataset.lddTimerKey === key) child.remove();
        });
    }

    function tickAllTimers() {
        document.querySelectorAll('.ldd-timer-chip[data-target-ms]').forEach(renderTimerChip);
        document.querySelectorAll('.ldd-home-timer-row[data-target-ms]').forEach(renderLandingTimerRow);
    }

    function renderTimerChip(chip) {
        const target = Number(chip.dataset.targetMs);
        if (!Number.isFinite(target)) return;
        const remaining = target - Date.now();
        const kind = chip.dataset.timerKind || 'unlock';
        const label = chip.dataset.timerLabel || (kind === 'reset' ? 'Reset sau' : 'Mở sau');
        chip.classList.toggle('is-urgent', remaining > 0 && remaining <= 60 * 60 * 1000);
        chip.classList.toggle('is-expired', remaining <= 0);
        if (remaining <= 0) {
            chip.innerHTML = '<span>' + (kind === 'reset' ? '↻' : '✓') + '</span><span>' + (kind === 'reset' ? 'Đến hạn ôn lại' : 'Đã tới giờ mở') + '</span>';
            return;
        }
        chip.innerHTML = '<span>' + (kind === 'reset' ? '↻' : '🔒') + '</span><span>' + escapeHtml(label) + '</span><strong class="ldd-timer-detail">' + formatRemaining(remaining) + '</strong>';
    }

    function renderLandingTimerRow(row) {
        const target = Number(row.dataset.targetMs);
        const out = row.querySelector('[data-landing-countdown]');
        if (!out || !Number.isFinite(target)) return;
        const remaining = target - Date.now();
        row.classList.toggle('is-urgent', remaining > 0 && remaining <= 60 * 60 * 1000);
        if (remaining <= 0) {
            out.textContent = row.dataset.timerKind === 'reset' ? 'Đến hạn' : 'Đã mở';
            if (!row.dataset.expiredRefresh) {
                row.dataset.expiredRefresh = '1';
                setTimeout(function () { refreshAll(true); }, 1500);
            }
        } else {
            out.textContent = formatRemaining(remaining);
        }
    }

    function formatRemaining(ms) {
        let total = Math.max(0, Math.floor(ms / 1000));
        const days = Math.floor(total / 86400);
        total -= days * 86400;
        const hours = Math.floor(total / 3600);
        total -= hours * 3600;
        const minutes = Math.floor(total / 60);
        const seconds = total - minutes * 60;
        const clock = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        return days > 0 ? days + ' ngày ' + clock : clock;
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function formatTargetTime(ms) {
        try { return new Date(ms).toLocaleString('vi-VN'); } catch (e) { return ''; }
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
})();
