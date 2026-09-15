/* =============================================================
   LDD ENGLISH — LANDING COUNTDOWN + LEADERBOARD UI v2.1
   Read-only UI layer: does not change progress, score or unlock rules.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const DAY_MS = 86400000;
    const VOCAB_INTERVAL_MS = 2 * DAY_MS;

    let state = { kid: [], thcs: [], vocab: [], conj: [], rank: [] };
    let activeToken = null;
    let refreshBusy = false;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        ensureLandingPanel();
        watchDom();
        checkSession();
        setInterval(checkSession, 1200);
        setInterval(tick, 1000);
        setInterval(function () {
            if (!document.hidden && getToken()) refreshData();
        }, 45000);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                ensureLandingPanel();
                refreshData();
            }
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

    function getUserId() {
        const token = getToken();
        if (!token) return null;
        try {
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            return JSON.parse(atob(part)).sub || null;
        } catch (e) {
            return null;
        }
    }

    function checkSession() {
        const token = getToken();
        if (token && token !== activeToken) {
            activeToken = token;
            refreshData();
        } else if (!token && activeToken) {
            activeToken = null;
            state = { kid: [], thcs: [], vocab: [], conj: [], rank: [] };
            renderLanding();
        }
        ensureLandingPanel();
    }

    async function query(table, select, params) {
        const token = getToken();
        if (!token) return [];
        const qs = new URLSearchParams();
        qs.set('select', select);
        Object.keys(params || {}).forEach(function (key) { qs.set(key, params[key]); });
        try {
            const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + qs.toString(), {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.warn('[LDD landing] ' + table + ':', err.message);
            return [];
        }
    }

    async function refreshData() {
        if (refreshBusy || !getToken()) return;
        refreshBusy = true;
        const today = new Date().toISOString().slice(0, 10);
        try {
            const rows = await Promise.all([
                query('kid_topic_progress', 'topic_key,times_completed,completed_at', {}),
                query('thcs_unit_progress', 'grade,unit_id,completed,times_completed,completed_at', {}),
                query('vocab_weekly_tests', 'id,created_at,status', { order: 'created_at.desc', limit: '1' }),
                query('conj_practice_sessions', 'id,session_date', { session_date: 'eq.' + today }),
                query('diligence_scores', 'user_id,display_name,avatar_url,diligence_score,excluded', {
                    excluded: 'eq.false', order: 'diligence_score.desc', limit: '10'
                })
            ]);
            state.kid = rows[0];
            state.thcs = rows[1];
            state.vocab = rows[2];
            state.conj = rows[3];
            state.rank = rows[4];
            decorateVisibleCards();
            renderLanding();
        } finally {
            refreshBusy = false;
        }
    }

    function ensureLandingPanel() {
        const dashboard = document.querySelector('#tab-phien-am .ldd-home-dashboard');
        if (!dashboard) return null;
        let panel = dashboard.querySelector('#ldd-home-live-panel');
        if (panel) return panel;

        panel = document.createElement('section');
        panel.id = 'ldd-home-live-panel';
        panel.className = 'ldd-home-live-panel';
        panel.innerHTML =
            '<div class="ldd-home-live-card">' +
                '<div class="ldd-home-live-head"><div><span class="ldd-home-live-kicker">Sắp tới</span><h3>⏱ Reset & mở khóa</h3></div><span class="ldd-home-live-note">Realtime</span></div>' +
                '<div id="ldd-home-timer-list" class="ldd-home-timer-list"><p class="ldd-home-live-empty">Đang tải...</p></div>' +
            '</div>' +
            '<div class="ldd-home-live-card">' +
                '<div class="ldd-home-live-head"><div><span class="ldd-home-live-kicker">Thi đua</span><h3>🔥 Bảng xếp hạng chăm chỉ</h3></div><span class="ldd-home-live-note">Top 10</span></div>' +
                '<div id="ldd-home-leaderboard" class="ldd-home-leaderboard"><p class="ldd-home-live-empty">Đang tải...</p></div>' +
            '</div>';
        dashboard.appendChild(panel);
        renderLanding();
        return panel;
    }

    function watchDom() {
        let timer = null;
        new MutationObserver(function (mutations) {
            let externalChange = false;
            for (const mutation of mutations) {
                const target = mutation.target && mutation.target.nodeType === 1 ? mutation.target : mutation.target.parentElement;
                if (target && target.closest && target.closest('#ldd-home-live-panel')) continue;
                externalChange = true;
                break;
            }
            if (!externalChange) return;
            clearTimeout(timer);
            timer = setTimeout(function () {
                ensureLandingPanel();
                decorateVisibleCards();
                decorateGenericTimers();
            }, 120);
        }).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'data-reset-at', 'data-expires-at', 'data-unlock-at', 'data-opens-at', 'data-available-at']
        });
    }

    function expireDays(times) {
        const n = Number(times || 0);
        if (n <= 1) return 7;
        if (n === 2) return 14;
        return null;
    }

    function futureTarget(completedAt, times) {
        const days = expireDays(times);
        if (days == null || !completedAt) return null;
        const start = Date.parse(completedAt);
        if (!Number.isFinite(start)) return null;
        return start + days * DAY_MS;
    }

    function nextUtcDay() {
        const d = new Date();
        return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0);
    }

    function labelTopic(key) {
        const raw = String(key || '').replace(/-/g, ' ').trim();
        return raw ? raw.replace(/\b\w/g, function (c) { return c.toUpperCase(); }) : 'Chủ đề từ vựng';
    }

    function buildTimers() {
        const now = Date.now();
        const items = [];

        state.kid.forEach(function (row) {
            const target = futureTarget(row.completed_at, row.times_completed);
            if (target && target > now) items.push({ kind: 'reset', title: 'Vận dụng · ' + labelTopic(row.topic_key), note: 'Reset tiến độ sau', target: target });
        });

        state.thcs.forEach(function (row) {
            if (!row.completed) return;
            const target = futureTarget(row.completed_at, row.times_completed);
            if (!target || target <= now) return;
            const raw = String(row.unit_id == null ? '' : row.unit_id);
            const m = raw.match(/(\d+)$/);
            items.push({ kind: 'reset', title: 'Lớp ' + row.grade + ' · Unit ' + (m ? m[1] : raw), note: 'Reset tiến độ sau', target: target });
        });

        const vocab = state.vocab[0];
        if (vocab && vocab.status !== 'pending' && vocab.created_at) {
            const target = Date.parse(vocab.created_at) + VOCAB_INTERVAL_MS;
            if (Number.isFinite(target) && target > now) items.push({ kind: 'unlock', title: 'Kiểm tra từ vựng của tôi', note: 'Bài tiếp theo mở sau', target: target });
        }

        if (state.conj.length >= 2) {
            const target = nextUtcDay();
            if (target > now) items.push({ kind: 'reset', title: 'Luyện tập Liên từ', note: 'Reset 2 lượt/ngày sau', target: target });
        }

        return items.sort(function (a, b) { return a.target - b.target; });
    }

    function renderLanding() {
        const panel = ensureLandingPanel();
        if (!panel) return;
        const timerHost = panel.querySelector('#ldd-home-timer-list');
        const rankHost = panel.querySelector('#ldd-home-leaderboard');
        if (!getToken()) {
            if (timerHost) timerHost.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem countdown.</p>';
            if (rankHost) rankHost.innerHTML = '<p class="ldd-home-live-empty">Đăng nhập để xem bảng xếp hạng.</p>';
            return;
        }
        renderTimers(timerHost, buildTimers());
        renderRank(rankHost);
    }

    function renderTimers(host, items) {
        if (!host) return;
        host.innerHTML = '';
        if (!items.length) {
            host.innerHTML = '<p class="ldd-home-live-empty">Hiện chưa có mục nào đang chờ reset hoặc mở theo thời gian.</p>';
            return;
        }
        items.slice(0, 8).forEach(function (item) {
            const row = document.createElement('div');
            row.className = 'ldd-home-timer-row';
            row.dataset.timerKind = item.kind;
            row.dataset.targetMs = String(item.target);
            row.innerHTML = '<span class="ldd-home-timer-icon">' + (item.kind === 'reset' ? '↻' : '🔒') + '</span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value" data-countdown></span>';
            row.querySelector('strong').textContent = item.title;
            row.querySelector('small').textContent = item.note;
            host.appendChild(row);
            renderLandingRow(row);
        });
    }

    function renderRank(host) {
        if (!host) return;
        host.innerHTML = '';
        if (!state.rank.length) {
            host.innerHTML = '<p class="ldd-home-live-empty">Chưa có dữ liệu xếp hạng.</p>';
            return;
        }
        const me = getUserId();
        const medals = ['🥇', '🥈', '🥉'];
        state.rank.forEach(function (row, index) {
            const item = document.createElement('div');
            item.className = 'ldd-home-rank-row' + (me && row.user_id === me ? ' is-me' : '');

            const pos = document.createElement('span');
            pos.className = 'ldd-home-rank-pos';
            pos.textContent = medals[index] || String(index + 1);

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
                avatar.textContent = name.trim() ? name.trim()[0].toUpperCase() : '?';
            }

            const who = document.createElement('span');
            who.className = 'ldd-home-rank-name';
            who.textContent = name + (me && row.user_id === me ? ' (Bạn)' : '');

            const score = document.createElement('strong');
            score.className = 'ldd-home-rank-score';
            score.textContent = Math.round(Number(row.diligence_score || 0)) + ' điểm';

            item.appendChild(pos);
            item.appendChild(avatar);
            item.appendChild(who);
            item.appendChild(score);
            host.appendChild(item);
        });
    }

    function decorateVisibleCards() {
        const kidMap = new Map(state.kid.map(function (r) { return [String(r.topic_key || ''), r]; }));
        document.querySelectorAll('#kid-topic-grid .kid-topic-card.completed').forEach(function (card) {
            const title = card.querySelector('.kid-title');
            if (!title) return;
            const key = slug(title.textContent);
            const row = kidMap.get(key);
            const target = row ? futureTarget(row.completed_at, row.times_completed) : null;
            if (target && target > Date.now()) setChip(card, 'kid-reset', 'reset', target, 'Ôn lại sau');
        });

        const gradeTitle = document.getElementById('thcs-grade-panel-title');
        const gm = gradeTitle && gradeTitle.textContent.match(/Lớp\s+(\d+)/i);
        const grade = gm ? Number(gm[1]) : null;
        if (grade) {
            document.querySelectorAll('#thcs-unit-grid .thcs-unit-card.completed').forEach(function (card) {
                const title = card.querySelector('.kid-title');
                const um = title && title.textContent.match(/Unit\s+(\d+)/i);
                if (!um) return;
                const num = Number(um[1]);
                const row = state.thcs.find(function (r) {
                    return Number(r.grade) === grade && r.completed && String(r.unit_id).match(new RegExp('(?:^|\\D)' + num + '$'));
                });
                const target = row ? futureTarget(row.completed_at, row.times_completed) : null;
                if (target && target > Date.now()) setChip(card, 'thcs-reset', 'reset', target, 'Ôn lại sau');
            });
        }

        const vocab = state.vocab[0];
        if (vocab && vocab.status !== 'pending' && vocab.created_at) {
            const target = Date.parse(vocab.created_at) + VOCAB_INTERVAL_MS;
            const folder = document.getElementById('vocab-test-folder');
            if (folder && target > Date.now()) setChip(folder, 'vocab-open', 'unlock', target, 'Bài mới mở sau');
        }
        decorateGenericTimers();
    }

    function slug(text) {
        return String(text || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    function decorateGenericTimers() {
        [
            ['data-reset-at', 'reset', 'Reset sau'],
            ['data-expires-at', 'reset', 'Reset sau'],
            ['data-unlock-at', 'unlock', 'Mở sau'],
            ['data-opens-at', 'unlock', 'Mở sau'],
            ['data-available-at', 'unlock', 'Mở sau']
        ].forEach(function (cfg) {
            document.querySelectorAll('[' + cfg[0] + ']').forEach(function (el) {
                if (el.closest('#ldd-home-live-panel')) return;
                const target = Date.parse(el.getAttribute(cfg[0]) || '');
                if (Number.isFinite(target)) setChip(el, 'generic-' + cfg[0], cfg[1], target, el.getAttribute('data-timer-label') || cfg[2]);
            });
        });
    }

    function setChip(host, key, kind, target, label) {
        let chip = Array.from(host.children || []).find(function (el) {
            return el.classList && el.classList.contains('ldd-timer-chip') && el.dataset.lddTimerKey === key;
        });
        if (!chip) {
            chip = document.createElement('span');
            chip.className = 'ldd-timer-chip';
            chip.dataset.lddTimerKey = key;
            host.appendChild(chip);
        }
        chip.dataset.timerKind = kind;
        chip.dataset.targetMs = String(target);
        chip.dataset.timerLabel = label;
        renderChip(chip);
    }

    function tick() {
        document.querySelectorAll('.ldd-timer-chip[data-target-ms]').forEach(renderChip);
        document.querySelectorAll('.ldd-home-timer-row[data-target-ms]').forEach(renderLandingRow);
    }

    function renderChip(chip) {
        const target = Number(chip.dataset.targetMs);
        const left = target - Date.now();
        const kind = chip.dataset.timerKind || 'unlock';
        if (!Number.isFinite(target)) return;
        chip.classList.toggle('is-urgent', left > 0 && left <= 3600000);
        chip.classList.toggle('is-expired', left <= 0);
        if (left <= 0) {
            chip.textContent = kind === 'reset' ? '↻ Đến hạn ôn lại' : '✓ Đã tới giờ mở';
        } else {
            chip.textContent = (kind === 'reset' ? '↻ ' : '🔒 ') + (chip.dataset.timerLabel || '') + ' · ' + formatLeft(left);
        }
    }

    function renderLandingRow(row) {
        const target = Number(row.dataset.targetMs);
        const left = target - Date.now();
        const out = row.querySelector('[data-countdown]');
        if (!out || !Number.isFinite(target)) return;
        row.classList.toggle('is-urgent', left > 0 && left <= 3600000);
        out.textContent = left <= 0 ? (row.dataset.timerKind === 'reset' ? 'Đến hạn' : 'Đã mở') : formatLeft(left);
        if (left <= 0 && !row.dataset.refreshQueued) {
            row.dataset.refreshQueued = '1';
            setTimeout(refreshData, 1400);
        }
    }

    function formatLeft(ms) {
        let sec = Math.max(0, Math.floor(ms / 1000));
        const days = Math.floor(sec / 86400); sec -= days * 86400;
        const h = Math.floor(sec / 3600); sec -= h * 3600;
        const m = Math.floor(sec / 60); const s = sec - m * 60;
        const clock = pad(h) + ':' + pad(m) + ':' + pad(s);
        return days ? days + ' ngày ' + clock : clock;
    }

    function pad(n) { return String(n).padStart(2, '0'); }
})();
