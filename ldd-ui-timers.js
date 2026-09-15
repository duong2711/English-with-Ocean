/* =============================================================
   LDD ENGLISH — RESET / UNLOCK COUNTDOWN UI v1
   - Hiện thời gian còn lại trước khi tiến độ tự reset.
   - Hiện thời gian còn lại trước khi bài định kỳ mở.
   - Tự nhận data-reset-at / data-unlock-at cho các module tương lai.
   - Chỉ đọc dữ liệu; không thay đổi tiến độ, điểm hay rule mở khóa.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const DAY_MS = 24 * 60 * 60 * 1000;
    const VOCAB_TEST_INTERVAL_MS = 2 * DAY_MS;
    const REFRESH_MS = 60 * 1000;

    let kidRows = [];
    let thcsRows = [];
    let lastServerRefreshAt = 0;
    let refreshPromise = null;
    let decorateTimer = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        observeDynamicContent();
        scheduleDecorate(120);
        setInterval(tickAllTimers, 1000);
        setInterval(function () {
            if (document.visibilityState === 'visible') refreshAll(true);
        }, REFRESH_MS);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) refreshAll(true);
        });
    });

    function getAccessToken() {
        try {
            const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.access_token === 'string') return parsed.access_token;
            if (parsed && parsed.currentSession && typeof parsed.currentSession.access_token === 'string') return parsed.currentSession.access_token;
            if (Array.isArray(parsed) && parsed[0] && typeof parsed[0].access_token === 'string') return parsed[0].access_token;
        } catch (e) { /* session chưa sẵn sàng */ }
        return null;
    }

    async function restSelect(table, select, extraQuery) {
        const token = getAccessToken();
        if (!token) return [];
        const params = new URLSearchParams();
        params.set('select', select);
        if (extraQuery) {
            Object.keys(extraQuery).forEach(function (key) {
                const value = extraQuery[key];
                if (Array.isArray(value)) value.forEach(function (v) { params.append(key, v); });
                else params.set(key, value);
            });
        }
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

    function observeDynamicContent() {
        const roots = [
            document.getElementById('kid-topic-grid'),
            document.getElementById('thcs-unit-grid'),
            document.getElementById('vocab-own-test-status'),
            document.getElementById('conj-practice-daily-status'),
            document.getElementById('kiemtra-folder-grid')
        ].filter(Boolean);

        roots.forEach(function (root) {
            new MutationObserver(function () { scheduleDecorate(80); })
                .observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'data-reset-at', 'data-unlock-at', 'data-opens-at', 'data-available-at'] });
        });

        new MutationObserver(function (mutations) {
            let relevant = false;
            for (const m of mutations) {
                if (m.type !== 'childList') continue;
                for (const node of m.addedNodes) {
                    if (node.nodeType === 1 && (node.matches('[data-reset-at],[data-unlock-at],[data-opens-at],[data-available-at]') || node.querySelector('[data-reset-at],[data-unlock-at],[data-opens-at],[data-available-at]'))) {
                        relevant = true;
                        break;
                    }
                }
                if (relevant) break;
            }
            if (relevant) scheduleDecorate(60);
        }).observe(document.body, { childList: true, subtree: true });
    }

    function scheduleDecorate(delay) {
        clearTimeout(decorateTimer);
        decorateTimer = setTimeout(function () { refreshAll(false); }, delay || 0);
    }

    async function refreshAll(forceServer) {
        decorateGenericTimers();
        decorateConjunctionDailyReset();

        const now = Date.now();
        if (forceServer || !lastServerRefreshAt || now - lastServerRefreshAt > REFRESH_MS) {
            if (!refreshPromise) {
                refreshPromise = loadServerRows().finally(function () { refreshPromise = null; });
            }
            await refreshPromise;
        }

        decorateKidResetTimers();
        decorateThcsResetTimers();
        await decorateVocabUnlockTimer();
        tickAllTimers();
    }

    async function loadServerRows() {
        if (!getAccessToken()) return;
        try {
            const results = await Promise.all([
                restSelect('kid_topic_progress', 'topic_key,times_completed,completed_at'),
                restSelect('thcs_unit_progress', 'grade,unit_id,completed,times_completed,completed_at')
            ]);
            kidRows = Array.isArray(results[0]) ? results[0] : [];
            thcsRows = Array.isArray(results[1]) ? results[1] : [];
            lastServerRefreshAt = Date.now();
        } catch (err) {
            console.warn('[LDD timer] Không tải được tiến độ để hiện countdown:', err.message);
        }
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

    async function decorateVocabUnlockTimer() {
        if (typeof window.checkVocabWeeklyTestState !== 'function' || !getAccessToken()) return;
        let state;
        try {
            state = await window.checkVocabWeeklyTestState();
        } catch (e) {
            return;
        }

        const folder = document.getElementById('vocab-test-folder');
        const statusHost = document.getElementById('vocab-own-test-status');
        if (!state || state.pendingTestId || !state.daysUntilNextTest) {
            if (folder) removeTimer(folder, 'vocab-unlock');
            if (statusHost) removeTimer(statusHost, 'vocab-unlock');
            return;
        }

        try {
            const rows = await restSelect('vocab_weekly_tests', 'created_at,status', {
                order: 'created_at.desc',
                limit: '1'
            });
            if (!rows || !rows.length || !rows[0].created_at) return;
            const createdMs = Date.parse(rows[0].created_at);
            if (!Number.isFinite(createdMs)) return;
            const target = createdMs + VOCAB_TEST_INTERVAL_MS;
            if (folder) setTimer(folder, 'vocab-unlock', 'unlock', target, 'Bài mới mở sau', onVocabTimerExpired);
            if (statusHost) setTimer(statusHost, 'vocab-unlock', 'unlock', target, 'Mở sau', onVocabTimerExpired);
        } catch (err) {
            console.warn('[LDD timer] Không lấy được mốc bài kiểm tra từ vựng:', err.message);
        }
    }

    function onVocabTimerExpired() {
        setTimeout(function () {
            if (typeof window.checkVocabWeeklyTestState === 'function') {
                window.checkVocabWeeklyTestState().then(function () { refreshAll(true); }).catch(function () {});
            }
        }, 1200);
    }

    function nextUtcDayBoundary() {
        const now = new Date();
        return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0);
    }

    function decorateConjunctionDailyReset() {
        const status = document.getElementById('conj-practice-daily-status');
        if (!status) return;
        const text = (status.textContent || '').toLowerCase();
        if (text.includes('đã luyện đủ') || text.includes('quay lại vào ngày mai')) {
            setTimer(status, 'conj-daily-reset', 'reset', nextUtcDayBoundary(), 'Reset lượt sau', function () {
                removeTimer(status, 'conj-daily-reset');
                status.textContent = 'Hôm nay đã luyện: 0/2 lượt.';
                const btn = document.getElementById('conj-practice-start-btn');
                if (btn) {
                    btn.style.display = 'inline-block';
                    btn.disabled = false;
                }
            });
        } else {
            removeTimer(status, 'conj-daily-reset');
        }
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
                const target = Date.parse(el.getAttribute(cfg.attr) || '');
                if (!Number.isFinite(target)) return;
                const custom = el.getAttribute('data-timer-label') || cfg.label;
                setTimer(el, 'generic-' + cfg.attr, cfg.kind, target, custom);
            });
        });
    }

    function setTimer(host, key, kind, targetMs, label, onExpired) {
        if (!host || !Number.isFinite(targetMs)) return;
        let chip = host.querySelector(':scope > .ldd-timer-chip[data-ldd-timer-key="' + cssEscape(key) + '"]');
        if (!chip) {
            chip = document.createElement('span');
            chip.className = 'ldd-timer-chip';
            chip.dataset.lddTimerKey = key;
            host.appendChild(chip);
        }
        chip.dataset.timerKind = kind;
        chip.dataset.targetMs = String(targetMs);
        chip.dataset.timerLabel = label || (kind === 'reset' ? 'Reset sau' : 'Mở sau');
        chip._lddOnExpired = onExpired || null;
        chip.title = (kind === 'reset' ? 'Thời điểm reset: ' : 'Thời điểm mở: ') + formatTargetTime(targetMs);
        renderTimerChip(chip);
    }

    function removeTimer(host, key) {
        if (!host) return;
        const chip = host.querySelector(':scope > .ldd-timer-chip[data-ldd-timer-key="' + cssEscape(key) + '"]');
        if (chip) chip.remove();
    }

    function cssEscape(value) {
        if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(String(value));
        return String(value).replace(/["\\]/g, '\\$&');
    }

    function tickAllTimers() {
        document.querySelectorAll('.ldd-timer-chip[data-target-ms]').forEach(renderTimerChip);
    }

    function renderTimerChip(chip) {
        const target = Number(chip.dataset.targetMs);
        if (!Number.isFinite(target)) return;
        const remaining = target - Date.now();
        const kind = chip.dataset.timerKind || 'unlock';
        const label = chip.dataset.timerLabel || (kind === 'reset' ? 'Reset sau' : 'Mở sau');

        chip.classList.toggle('is-urgent', remaining > 0 && remaining <= 60 * 60 * 1000);
        if (remaining <= 0) {
            chip.classList.add('is-expired');
            chip.innerHTML = kind === 'reset'
                ? '↻ <span>Đến hạn ôn lại</span>'
                : '✓ <span>Đã tới giờ mở</span>';
            if (chip.dataset.expiredHandled !== '1') {
                chip.dataset.expiredHandled = '1';
                const host = chip.parentElement;
                if (host) host.dispatchEvent(new CustomEvent('ldd:timer-expired', { bubbles: true, detail: { kind: kind, targetMs: target } }));
                if (typeof chip._lddOnExpired === 'function') chip._lddOnExpired();
            }
            return;
        }

        chip.classList.remove('is-expired');
        chip.dataset.expiredHandled = '0';
        const icon = kind === 'reset' ? '↻' : '🔒';
        chip.innerHTML = icon + ' <span>' + escapeHtml(label) + '</span> <span class="ldd-timer-detail">' + formatRemaining(remaining) + '</span>';
    }

    function formatRemaining(ms) {
        let seconds = Math.max(0, Math.ceil(ms / 1000));
        const days = Math.floor(seconds / 86400);
        seconds -= days * 86400;
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        const secs = seconds - minutes * 60;
        const clock = pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
        return days > 0 ? days + ' ngày ' + clock : clock;
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function formatTargetTime(ms) {
        try {
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            }).format(new Date(ms));
        } catch (e) {
            return new Date(ms).toLocaleString();
        }
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
})();
