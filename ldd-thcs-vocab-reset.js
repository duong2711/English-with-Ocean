/* =============================================================
   LDD ENGLISH — THCS/THPT VOCAB RESET v2
   Applies the exact existing review cycle to vocabulary units:
   completion #1 -> reset after 7 days
   completion #2 -> reset after 14 days
   completion #3+ -> permanent completion (no more reset)
   Units are stored in thcs_unit_progress for grades 6-12.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const TEACHER_EMAIL = 'lddbaiu@gmail.com';
    const DAY_MS = 86400000;

    let lastToken = null;
    let rows = [];
    let syncing = false;
    let timerObserver = null;
    let timerHost = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    function getToken() {
        try {
            const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
            if (!raw) return null;
            const value = JSON.parse(raw);
            return value && (value.access_token || (value.currentSession && value.currentSession.access_token) || (Array.isArray(value) && value[0] && value[0].access_token)) || null;
        } catch (e) { return null; }
    }

    function payload() {
        const token = getToken();
        if (!token) return {};
        try {
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            return JSON.parse(atob(part)) || {};
        } catch (e) { return {}; }
    }

    function userId() { return payload().sub || null; }
    function email() { return String(payload().email || '').toLowerCase(); }
    function isTeacher() { return email() === TEACHER_EMAIL; }
    function assignedGrade() {
        try {
            const g = window.LDDStudentGrade && Number(window.LDDStudentGrade.getGrade());
            return Number.isInteger(g) && g >= 1 && g <= 12 ? g : null;
        } catch (e) { return null; }
    }

    async function request(method, table, params, body) {
        const token = getToken();
        if (!token) return { ok: false, data: [] };
        const qs = new URLSearchParams();
        Object.keys(params || {}).forEach(function (key) {
            const value = params[key];
            if (value !== null && value !== undefined) qs.set(key, value);
        });
        const headers = {
            apikey: SUPABASE_ANON_KEY,
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
        };
        if (body !== undefined) headers['Content-Type'] = 'application/json';
        try {
            const response = await fetch(SUPABASE_URL + '/rest/v1/' + table + (qs.toString() ? '?' + qs.toString() : ''), {
                method: method,
                headers: headers,
                body: body === undefined ? undefined : JSON.stringify(body)
            });
            let data = [];
            if (response.status !== 204) {
                try { data = await response.json(); } catch (e) {}
            }
            return { ok: response.ok, data: Array.isArray(data) ? data : [] };
        } catch (e) {
            return { ok: false, data: [] };
        }
    }

    function resetDelayDays(timesCompleted) {
        const count = Number(timesCompleted || 0);
        if (count === 1) return 7;
        if (count === 2) return 14;
        return null;
    }

    function resetTarget(row) {
        const days = resetDelayDays(row.times_completed);
        if (days == null) return null;
        const started = Date.parse(row.completed_at || '');
        return Number.isFinite(started) ? started + days * DAY_MS : null;
    }

    function unitNumber(value) {
        const match = String(value == null ? '' : value).match(/(\d+)(?!.*\d)/);
        return match ? Number(match[1]) : NaN;
    }

    async function sync() {
        if (syncing || !getToken() || isTeacher()) return;
        syncing = true;
        try {
            const uid = userId();
            if (!uid) return;
            const params = {
                select: 'user_id,grade,unit_id,flashcard_done,translate_done,story_done,completed,times_completed,completed_at',
                user_id: 'eq.' + uid,
                order: 'grade.asc,unit_id.asc'
            };
            const grade = assignedGrade();
            if (grade) params.grade = 'eq.' + grade;
            const result = await request('GET', 'thcs_unit_progress', params);
            if (!result.ok) return;
            rows = result.data || [];

            const now = Date.now();
            let changed = false;
            for (const row of rows) {
                const count = Number(row.times_completed || 0);
                const target = resetTarget(row);

                // Exact existing mechanism:
                // #1 resets after 7d, #2 after 14d, #3+ never resets again.
                if (Number(row.grade) < 6 || Number(row.grade) > 12 || !row.completed || count < 1 || count >= 3 || !target || target > now) continue;

                const patch = await request('PATCH', 'thcs_unit_progress', {
                    user_id: 'eq.' + uid,
                    grade: 'eq.' + row.grade,
                    unit_id: 'eq.' + row.unit_id
                }, {
                    flashcard_done: false,
                    translate_done: false,
                    story_done: false,
                    completed: false,
                    completed_at: null
                });
                if (patch.ok) {
                    // Keep times_completed, but clear every completion flag so the learner can
                    // genuinely finish all three parts again. completed_at is cleared in the DB;
                    // this in-memory row retains the old timestamp only to show "LÀM NGAY"
                    // until the next sync/reload.
                    row.flashcard_done = false;
                    row.translate_done = false;
                    row.story_done = false;
                    row.completed = false;
                    changed = true;
                }
            }

            renderReadyRows();
            decorateVisibleUnits();
            observeTimerList();
            if (changed) {
                document.dispatchEvent(new CustomEvent('ldd:today-refresh'));
                document.dispatchEvent(new CustomEvent('ldd:thcs-vocab-reset'));
            }
        } finally {
            syncing = false;
        }
    }

    function readyRows() {
        const now = Date.now();
        return (rows || []).filter(function (row) {
            const target = resetTarget(row);
            const count = Number(row.times_completed || 0);
            return !row.completed && count >= 1 && count <= 2 && target && target <= now;
        }).sort(function (a, b) { return resetTarget(a) - resetTarget(b); });
    }

    function observeTimerList() {
        const host = document.getElementById('ldd-home-timer-list');
        if (!host || host === timerHost) return;
        if (timerObserver) timerObserver.disconnect();
        timerHost = host;
        timerObserver = new MutationObserver(function () {
            if (!host.querySelector('.ldd-thcs-vocab-reset-ready') && readyRows().length) {
                setTimeout(renderReadyRows, 0);
            }
        });
        timerObserver.observe(host, { childList: true });
    }

    function renderReadyRows() {
        const host = document.getElementById('ldd-home-timer-list');
        if (!host) return;
        host.querySelectorAll('.ldd-thcs-vocab-reset-ready').forEach(function (el) { el.remove(); });
        const list = readyRows();
        for (let i = list.length - 1; i >= 0; i--) {
            const row = list[i];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'ldd-home-timer-row ldd-grade-timer-row ldd-grade-ready ldd-thcs-vocab-reset-ready';
            button.innerHTML = '<span class="ldd-home-timer-icon">✓</span>' +
                '<span class="ldd-home-timer-copy"><strong></strong><small>Đã reset · cần ôn lại từ vựng</small></span>' +
                '<span class="ldd-home-timer-value">LÀM NGAY</span>';
            button.querySelector('strong').textContent = 'Lớp ' + row.grade + ' · Unit ' + (Number.isFinite(unitNumber(row.unit_id)) ? unitNumber(row.unit_id) : row.unit_id);
            button.addEventListener('click', function () { navigateToUnit(Number(row.grade), row.unit_id); });
            host.insertBefore(button, host.firstChild);
        }
    }

    function visibleGrade() {
        const title = document.getElementById('thcs-grade-panel-title');
        const match = title && String(title.textContent || '').match(/Lớp\s+(\d+)/i);
        return match ? Number(match[1]) : null;
    }

    function decorateVisibleUnits() {
        const grade = visibleGrade();
        if (!grade) return;
        const list = readyRows().filter(function (row) { return Number(row.grade) === grade; });
        if (!list.length) return;
        list.forEach(function (row) {
            const wanted = unitNumber(row.unit_id);
            const card = Array.from(document.querySelectorAll('#thcs-unit-grid .thcs-unit-card')).find(function (el) {
                const title = el.querySelector('.kid-title');
                const match = title && String(title.textContent || '').match(/Unit\s+(\d+)/i);
                return match && Number(match[1]) === wanted;
            });
            if (!card) return;
            card.classList.remove('completed');
            card.classList.add('ldd-grade-ready-unit');
            const count = card.querySelector('.kid-count');
            if (count) count.textContent = '↻ Đến hạn ôn lại';
        });
    }

    function goToTab(tabId, callback) {
        if (window.LDDNavigation && typeof window.LDDNavigation.goToTab === 'function') {
            window.LDDNavigation.goToTab(tabId);
        } else {
            const trigger = document.querySelector('.main-tab-btn[data-main-target="' + tabId + '"]');
            if (trigger) trigger.click();
        }
        if (callback) setTimeout(callback, 100);
    }

    function openGradeCard(grade) {
        const card = Array.from(document.querySelectorAll('#thcs-grade-grid .thcs-grade-card')).find(function (el) {
            const title = el.querySelector('.kid-title');
            return title && Number(String(title.textContent || '').replace(/\D/g, '')) === Number(grade);
        });
        if (card && !card.classList.contains('locked')) {
            card.click();
            return true;
        }
        return false;
    }

    function navigateToUnit(grade, unitId) {
        goToTab('tab-tu-vung', function () {
            const folder = document.getElementById('thcs-folder-card');
            if (folder) folder.click();
            setTimeout(function () {
                if (!openGradeCard(grade)) return;
                setTimeout(function () {
                    const wanted = unitNumber(unitId);
                    const card = Array.from(document.querySelectorAll('#thcs-unit-grid .thcs-unit-card')).find(function (el) {
                        const title = el.querySelector('.kid-title');
                        const match = title && String(title.textContent || '').match(/Unit\s+(\d+)/i);
                        return match && Number(match[1]) === wanted;
                    });
                    if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.click();
                    }
                }, 180);
            }, 140);
        });
    }

    ready(function () {
        function watchSession() {
            const token = getToken();
            if (token && token !== lastToken) {
                lastToken = token;
                setTimeout(sync, 300);
            } else if (!token) {
                lastToken = null;
                rows = [];
            }
            observeTimerList();
            decorateVisibleUnits();
        }
        watchSession();
        setInterval(watchSession, 1200);
        setInterval(function () { if (!document.hidden) sync(); }, 30000);
        document.addEventListener('visibilitychange', function () { if (!document.hidden) sync(); });
        document.addEventListener('ldd:student-grade-changed', function () { setTimeout(sync, 100); });
        document.addEventListener('click', function (event) {
            if (event.target.closest && (event.target.closest('#thcs-folder-card') || event.target.closest('.thcs-grade-card'))) {
                setTimeout(decorateVisibleUnits, 250);
            }
        });
    });

    // Small public hook for other UI modules/tests; does not alter the reset rules.
    window.LDDThcsVocabReset = {
        refresh: sync,
        getResetDays: resetDelayDays
    };
})();
