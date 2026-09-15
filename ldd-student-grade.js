/* =============================================================
   LDD ENGLISH — STUDENT GRADE ASSIGNMENT v1
   - Teacher can assign/clear a learner grade (1-12).
   - Learners use the assigned grade as the default for grade filters.
   - Home countdowns only show THCS/THPT units in the learner grade.
   - Expired/reset-ready countdowns stay visible, move to the top and are clickable.
   Requires student_grade_assignments table (see diligence_scores_grade_level_setup.sql).
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmNlc2UiLCJyZWYiOiJ5d3FiYWtzbW10dndib2pjZ3NkZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgyMTY3NzUwLCJleHAiOjIwOTc3NDM3NTB9.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const TEACHER_EMAIL = 'lddbaiu@gmail.com';
    const DAY_MS = 86400000;
    const TABLE = 'student_grade_assignments';

    let activeToken = null;
    let ownGrade = null;
    let ownProfileLoaded = false;
    let ownProfileError = false;
    let countdownState = null;
    let countdownBusy = false;
    let gradeDefaultsAppliedFor = null;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        installTeacherUi();
        bindGradeAwareEntryPoints();
        watchSession();
        setInterval(watchSession, 1200);
        setInterval(function () {
            if (!document.hidden && getToken() && !isTeacher()) refreshOwnGrade(true);
        }, 45000);
        setInterval(tickGradeCountdowns, 1000);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden && getToken() && !isTeacher()) refreshOwnGrade(true);
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
    function userEmail() { return String(jwtPayload().email || '').trim().toLowerCase(); }
    function isTeacher() { return userEmail() === TEACHER_EMAIL; }

    async function rest(table, select, params, opts) {
        const token = getToken();
        if (!token) return { ok: false, status: 401, data: [] };
        const qs = new URLSearchParams();
        if (select) qs.set('select', select);
        Object.keys(params || {}).forEach(function (key) {
            if (params[key] !== null && params[key] !== undefined) qs.set(key, params[key]);
        });
        const options = opts || {};
        const headers = {
            apikey: SUPABASE_ANON_KEY,
            Authorization: 'Bearer ' + token,
            Accept: 'application/json'
        };
        if (options.body !== undefined) headers['Content-Type'] = 'application/json';
        if (options.prefer) headers.Prefer = options.prefer;
        try {
            const response = await fetch(SUPABASE_URL + '/rest/v1/' + table + (qs.toString() ? '?' + qs.toString() : ''), {
                method: options.method || 'GET',
                headers: headers,
                body: options.body === undefined ? undefined : JSON.stringify(options.body)
            });
            let data = [];
            if (response.status !== 204) {
                try { data = await response.json(); } catch (e) { data = []; }
            }
            return { ok: response.ok, status: response.status, data: data, response: response };
        } catch (err) {
            return { ok: false, status: 0, data: [], error: err };
        }
    }

    function watchSession() {
        const token = getToken();
        if (token && token !== activeToken) {
            activeToken = token;
            ownGrade = null;
            ownProfileLoaded = false;
            ownProfileError = false;
            countdownState = null;
            gradeDefaultsAppliedFor = null;
            syncTeacherUi();
            if (!isTeacher()) refreshOwnGrade(false);
        } else if (!token && activeToken) {
            activeToken = null;
            ownGrade = null;
            ownProfileLoaded = false;
            countdownState = null;
            gradeDefaultsAppliedFor = null;
            syncTeacherUi();
        }
        syncTeacherUi();
    }

    async function refreshOwnGrade(silent) {
        const email = userEmail();
        if (!email || isTeacher()) return;

        const result = await rest(TABLE, 'email,user_id,display_name,grade_level', { email: 'eq.' + email, limit: '1' });
        if (!result.ok) {
            ownProfileError = true;
            ownProfileLoaded = true;
            ownGrade = null;
            if (!silent) console.warn('[LDD Grade] Chưa thể tải khối lớp. Hãy chạy diligence_scores_grade_level_setup.sql trong Supabase.');
            return;
        }

        let row = Array.isArray(result.data) ? result.data[0] : null;
        if (!row) {
            await registerLearner(email);
            const retry = await rest(TABLE, 'email,user_id,display_name,grade_level', { email: 'eq.' + email, limit: '1' });
            row = retry.ok && Array.isArray(retry.data) ? retry.data[0] : null;
        }

        const previous = ownGrade;
        ownGrade = normalizeGrade(row && row.grade_level);
        ownProfileLoaded = true;
        ownProfileError = false;

        if (ownGrade !== previous || gradeDefaultsAppliedFor !== ownGrade) {
            applyGradeDefaults();
            document.dispatchEvent(new CustomEvent('ldd:student-grade-changed', { detail: { grade: ownGrade } }));
        }
        await refreshCountdownData();
    }

    async function registerLearner(email) {
        const displayEl = document.getElementById('account-display-name');
        const displayName = displayEl ? String(displayEl.textContent || '').trim() : '';
        await rest(TABLE, null, {}, {
            method: 'POST',
            prefer: 'resolution=ignore-duplicates,return=minimal',
            body: {
                email: email,
                user_id: userId(),
                display_name: displayName || null,
                grade_level: null,
                updated_at: new Date().toISOString()
            }
        });
    }

    function normalizeGrade(value) {
        const n = Number(value);
        return Number.isInteger(n) && n >= 1 && n <= 12 ? n : null;
    }

    function applyGradeDefaults() {
        if (!ownGrade || isTeacher()) return;
        const grade = ownGrade;
        gradeDefaultsAppliedFor = grade;

        // Liên từ: đây là filter khối lớp hiện có của hệ thống.
        const conj = document.getElementById('conj-grade-slider');
        if (conj && Number(conj.value) !== grade && grade >= Number(conj.min || 1) && grade <= Number(conj.max || 12)) {
            conj.value = String(grade);
            conj.dispatchEvent(new Event('input', { bubbles: true }));
            conj.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Lộ trình THCS 6-9 / THPT 10-12: chọn sẵn đúng khối nếu có.
        const thcsBtn = document.querySelector('#thcs-grade-tabs-nav .grade-tab-btn[data-grade-target="grade-panel-' + grade + '"]');
        if (thcsBtn && !thcsBtn.classList.contains('active')) thcsBtn.click();
        const thptBtn = document.querySelector('#thpt-grade-tabs-nav .thpt-grade-tab-btn[data-thpt-grade-target="grade-panel-' + grade + '"]');
        if (thptBtn && !thptBtn.classList.contains('active')) thptBtn.click();

        // Hỗ trợ các filter khối lớp bổ sung trong tương lai nếu dùng id/name có grade/lop/khoi.
        document.querySelectorAll('select[data-grade-filter], input[type="range"][data-grade-filter]').forEach(function (el) {
            setGenericGradeControl(el, grade);
        });
    }

    function setGenericGradeControl(el, grade) {
        if (!el || el.disabled) return;
        if (el.tagName === 'SELECT') {
            const has = Array.from(el.options || []).some(function (o) { return Number(o.value) === grade; });
            if (!has) return;
        } else {
            const min = Number(el.min || 1), max = Number(el.max || 12);
            if (grade < min || grade > max) return;
        }
        if (Number(el.value) === grade) return;
        el.value = String(grade);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function bindGradeAwareEntryPoints() {
        document.addEventListener('click', function (event) {
            if (!ownGrade || isTeacher()) return;
            const thcsFolder = event.target.closest && event.target.closest('#thcs-folder-card');
            if (!thcsFolder) return;
            setTimeout(function () { openAssignedVocabGrade(ownGrade); }, 80);
        }, false);

        // Nếu các grade tab được dựng lại động, áp lại default khi chúng xuất hiện.
        const observer = new MutationObserver(function () {
            if (ownGrade && !isTeacher()) {
                setTimeout(function () {
                    const g = ownGrade;
                    const thcsBtn = document.querySelector('#thcs-grade-tabs-nav .grade-tab-btn[data-grade-target="grade-panel-' + g + '"]');
                    const thptBtn = document.querySelector('#thpt-grade-tabs-nav .thpt-grade-tab-btn[data-thpt-grade-target="grade-panel-' + g + '"]');
                    if (thcsBtn && !thcsBtn.classList.contains('active')) thcsBtn.click();
                    if (thptBtn && !thptBtn.classList.contains('active')) thptBtn.click();
                }, 40);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function openAssignedVocabGrade(grade) {
        const grid = document.getElementById('thcs-grade-grid');
        if (!grid || window.getComputedStyle(grid).display === 'none') return false;
        const cards = Array.from(grid.querySelectorAll('.thcs-grade-card'));
        const wanted = cards.find(function (card) {
            const title = card.querySelector('.kid-title');
            return title && Number((title.textContent || '').replace(/\D/g, '')) === Number(grade);
        });
        if (wanted && !wanted.classList.contains('locked')) {
            wanted.click();
            return true;
        }
        return false;
    }

    // ========================= TEACHER UI =========================
    function installTeacherUi() {
        ensureTeacherModal();
        syncTeacherUi();
        const account = document.getElementById('account-area');
        if (account) new MutationObserver(syncTeacherUi).observe(account, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    function syncTeacherUi() {
        const menu = document.getElementById('account-menu');
        if (!menu) return;
        let btn = document.getElementById('teacher-grade-manager-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'teacher-grade-manager-btn';
            btn.className = 'account-menu-item account-menu-item-teacher ldd-grade-manager-open';
            btn.textContent = '🎓 Khối lớp học viên';
            const imp = document.getElementById('teacher-impersonate-btn');
            if (imp && imp.nextSibling) menu.insertBefore(btn, imp.nextSibling);
            else menu.appendChild(btn);
            btn.addEventListener('click', function () {
                if (!isTeacher()) return;
                menu.classList.remove('open');
                openTeacherModal();
            });
        }
        btn.style.display = getToken() && isTeacher() ? '' : 'none';
    }

    function ensureTeacherModal() {
        if (document.getElementById('ldd-grade-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'ldd-grade-modal';
        modal.className = 'ldd-grade-modal-overlay';
        modal.style.display = 'none';
        modal.innerHTML =
            '<div class="ldd-grade-modal" role="dialog" aria-modal="true" aria-labelledby="ldd-grade-modal-title">' +
                '<div class="ldd-grade-modal-head"><div><span class="ldd-grade-kicker">Giảng viên</span><h3 id="ldd-grade-modal-title">🎓 Gán khối lớp cho học viên</h3><p>Khối lớp được dùng làm mặc định cho các bộ lọc lớp và Countdown THCS/THPT. Có thể để trống.</p></div><button type="button" id="ldd-grade-modal-close" class="ldd-grade-close" aria-label="Đóng">×</button></div>' +
                '<div class="ldd-grade-add-row"><input type="email" id="ldd-grade-add-email" placeholder="Email tài khoản học viên"><select id="ldd-grade-add-select">' + gradeOptions(null) + '</select><button type="button" id="ldd-grade-add-btn">Thêm / lưu</button></div>' +
                '<div class="ldd-grade-toolbar"><input type="search" id="ldd-grade-search" placeholder="Tìm theo email hoặc tên..."><span id="ldd-grade-summary"></span></div>' +
                '<div id="ldd-grade-status" class="ldd-grade-status"></div>' +
                '<div id="ldd-grade-list" class="ldd-grade-list"><p class="ldd-grade-empty">Đang tải...</p></div>' +
            '</div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', function (e) { if (e.target === modal) closeTeacherModal(); });
        document.getElementById('ldd-grade-modal-close').addEventListener('click', closeTeacherModal);
        document.getElementById('ldd-grade-search').addEventListener('input', filterTeacherRows);
        document.getElementById('ldd-grade-add-btn').addEventListener('click', addOrSaveTeacherAccount);
    }

    function gradeOptions(selected) {
        let html = '<option value="">— Chưa gán —</option>';
        for (let g = 1; g <= 12; g++) html += '<option value="' + g + '"' + (Number(selected) === g ? ' selected' : '') + '>Lớp ' + g + '</option>';
        return html;
    }

    async function openTeacherModal() {
        ensureTeacherModal();
        const modal = document.getElementById('ldd-grade-modal');
        modal.style.display = 'flex';
        document.body.classList.add('ldd-grade-modal-open');
        await loadTeacherRows();
    }

    function closeTeacherModal() {
        const modal = document.getElementById('ldd-grade-modal');
        if (modal) modal.style.display = 'none';
        document.body.classList.remove('ldd-grade-modal-open');
    }

    async function loadTeacherRows() {
        const list = document.getElementById('ldd-grade-list');
        const status = document.getElementById('ldd-grade-status');
        if (!list || !isTeacher()) return;
        list.innerHTML = '<p class="ldd-grade-empty">Đang tải danh sách...</p>';
        if (status) status.textContent = '';
        const result = await rest(TABLE, 'email,user_id,display_name,grade_level,updated_at', { order: 'display_name.asc,email.asc' });
        if (!result.ok) {
            list.innerHTML = '<div class="ldd-grade-error"><strong>Chưa có bảng khối lớp trên Supabase.</strong><span>Hãy chạy file <code>diligence_scores_grade_level_setup.sql</code> một lần trong SQL Editor rồi mở lại cửa sổ này.</span></div>';
            return;
        }
        const rows = (Array.isArray(result.data) ? result.data : []).filter(function (r) { return String(r.email || '').toLowerCase() !== TEACHER_EMAIL; });
        renderTeacherRows(rows);
    }

    function renderTeacherRows(rows) {
        const list = document.getElementById('ldd-grade-list');
        const summary = document.getElementById('ldd-grade-summary');
        if (!list) return;
        if (summary) summary.textContent = rows.length + ' tài khoản';
        list.innerHTML = '';
        if (!rows.length) {
            list.innerHTML = '<p class="ldd-grade-empty">Chưa có học viên trong danh sách. Có thể thêm bằng email ở phía trên; học viên đăng nhập lần đầu cũng sẽ tự xuất hiện.</p>';
            return;
        }
        rows.forEach(function (row) {
            const item = document.createElement('div');
            item.className = 'ldd-grade-row';
            item.dataset.search = (String(row.display_name || '') + ' ' + String(row.email || '')).toLowerCase();
            const identity = document.createElement('div');
            identity.className = 'ldd-grade-identity';
            const avatar = document.createElement('span');
            avatar.className = 'ldd-grade-avatar';
            avatar.textContent = (String(row.display_name || row.email || '?').trim()[0] || '?').toUpperCase();
            const copy = document.createElement('span');
            copy.innerHTML = '<strong></strong><small></small>';
            copy.querySelector('strong').textContent = row.display_name || String(row.email || '').split('@')[0] || 'Học viên';
            copy.querySelector('small').textContent = row.email || '—';
            identity.appendChild(avatar); identity.appendChild(copy);

            const select = document.createElement('select');
            select.className = 'ldd-grade-select';
            select.innerHTML = gradeOptions(row.grade_level);
            select.value = row.grade_level == null ? '' : String(row.grade_level);
            const saved = document.createElement('span');
            saved.className = 'ldd-grade-saved';
            saved.textContent = row.grade_level ? 'Lớp ' + row.grade_level : 'Chưa gán';
            select.addEventListener('change', async function () {
                const original = saved.textContent;
                select.disabled = true;
                saved.textContent = 'Đang lưu...';
                const grade = normalizeGrade(select.value);
                const ok = await saveGrade(row.email, grade);
                saved.textContent = ok ? (grade ? 'Lớp ' + grade : 'Đã bỏ gán') : original;
                saved.classList.toggle('is-ok', ok);
                select.disabled = false;
            });
            item.appendChild(identity); item.appendChild(select); item.appendChild(saved);
            list.appendChild(item);
        });
        filterTeacherRows();
    }

    async function saveGrade(email, grade) {
        email = String(email || '').trim().toLowerCase();
        if (!email || email === TEACHER_EMAIL || !isTeacher()) return false;
        const result = await rest(TABLE, null, { email: 'eq.' + email }, {
            method: 'PATCH',
            prefer: 'return=minimal',
            body: { grade_level: grade, updated_at: new Date().toISOString(), updated_by: userEmail() }
        });
        if (!result.ok) {
            const status = document.getElementById('ldd-grade-status');
            if (status) status.textContent = 'Không thể lưu khối lớp. Kiểm tra SQL/RLS của student_grade_assignments.';
        }
        return result.ok;
    }

    async function addOrSaveTeacherAccount() {
        if (!isTeacher()) return;
        const emailEl = document.getElementById('ldd-grade-add-email');
        const gradeEl = document.getElementById('ldd-grade-add-select');
        const btn = document.getElementById('ldd-grade-add-btn');
        const status = document.getElementById('ldd-grade-status');
        const email = String(emailEl && emailEl.value || '').trim().toLowerCase();
        const grade = normalizeGrade(gradeEl && gradeEl.value);
        if (!email || !email.includes('@')) { if (status) status.textContent = 'Nhập email học viên hợp lệ.'; return; }
        if (email === TEACHER_EMAIL) { if (status) status.textContent = 'Không gắn khối lớp cho tài khoản giáo viên.'; return; }
        btn.disabled = true;
        if (status) status.textContent = 'Đang lưu...';
        const result = await rest(TABLE, 'email', { on_conflict: 'email' }, {
            method: 'POST',
            prefer: 'resolution=merge-duplicates,return=representation',
            body: { email: email, grade_level: grade, updated_at: new Date().toISOString(), updated_by: userEmail() }
        });
        btn.disabled = false;
        if (!result.ok) {
            if (status) status.textContent = 'Không thể lưu. Hãy chạy file SQL thiết lập bảng trước.';
            return;
        }
        if (emailEl) emailEl.value = '';
        if (gradeEl) gradeEl.value = '';
        if (status) status.textContent = '✓ Đã lưu ' + email + (grade ? ' · Lớp ' + grade : ' · Chưa gán khối');
        await loadTeacherRows();
    }

    function filterTeacherRows() {
        const input = document.getElementById('ldd-grade-search');
        const q = String(input && input.value || '').trim().toLowerCase();
        document.querySelectorAll('#ldd-grade-list .ldd-grade-row').forEach(function (row) {
            row.style.display = !q || String(row.dataset.search || '').includes(q) ? '' : 'none';
        });
    }

    // ==================== GRADE-AWARE COUNTDOWN ====================
    async function refreshCountdownData() {
        if (countdownBusy || !getToken() || isTeacher()) return;
        countdownBusy = true;
        try {
            const today = new Date().toISOString().slice(0, 10);
            const results = await Promise.all([
                rest('kid_topic_progress', 'topic_key,times_completed,completed_at', {}),
                rest('thcs_unit_progress', 'grade,unit_id,completed,times_completed,completed_at', ownGrade ? { grade: 'eq.' + ownGrade } : {}),
                rest('vocab_weekly_tests', 'id,created_at,status', { order: 'created_at.desc', limit: '1' }),
                rest('conj_practice_sessions', 'id,session_date', { session_date: 'eq.' + today })
            ]);
            countdownState = {
                kid: results[0].ok ? results[0].data : [],
                thcs: results[1].ok ? results[1].data : [],
                vocab: results[2].ok ? results[2].data : [],
                conj: results[3].ok ? results[3].data : []
            };
            renderGradeCountdowns();
        } finally {
            countdownBusy = false;
        }
    }

    function resetTarget(at, times) {
        const n = Number(times || 0);
        const days = n <= 1 ? 7 : (n === 2 ? 14 : null);
        const start = Date.parse(at || '');
        return days && Number.isFinite(start) ? start + days * DAY_MS : null;
    }

    function nextUtcDay() {
        const d = new Date();
        return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0, 0);
    }

    function buildGradeCountdowns() {
        if (!countdownState) return [];
        const now = Date.now();
        const items = [];
        (countdownState.kid || []).forEach(function (r) {
            const t = resetTarget(r.completed_at, r.times_completed);
            if (!t) return;
            items.push({ title: 'Vận dụng · ' + prettyKey(r.topic_key), note: t <= now ? 'Đã đến hạn ôn lại' : 'Reset tiến độ sau', target: t, kind: 'reset', action: { type: 'kid', key: r.topic_key } });
        });
        (countdownState.thcs || []).forEach(function (r) {
            if (!r.completed) return;
            if (ownGrade && Number(r.grade) !== Number(ownGrade)) return;
            const t = resetTarget(r.completed_at, r.times_completed);
            if (!t) return;
            items.push({ title: 'Lớp ' + r.grade + ' · ' + unitLabel(r.unit_id), note: t <= now ? 'Đã đến hạn ôn lại Unit' : 'Reset tiến độ sau', target: t, kind: 'reset', action: { type: 'thcs', grade: Number(r.grade), unitId: r.unit_id } });
        });
        const vt = (countdownState.vocab || [])[0];
        if (vt && vt.status !== 'pending' && vt.created_at) {
            const t = Date.parse(vt.created_at) + 2 * DAY_MS;
            if (Number.isFinite(t)) items.push({ title: 'Kiểm tra từ vựng của tôi', note: t <= now ? 'Bài tiếp theo đã đến hạn' : 'Bài tiếp theo mở sau', target: t, kind: 'unlock', action: { type: 'vocab-test' } });
        }
        if ((countdownState.conj || []).length >= 2) {
            const t = nextUtcDay();
            items.push({ title: 'Luyện tập Liên từ', note: t <= now ? 'Đã reset lượt luyện tập' : 'Reset 2 lượt/ngày sau', target: t, kind: 'reset', action: { type: 'conj' } });
        }
        items.forEach(function (x) { x.ready = x.target <= now; });
        items.sort(function (a, b) {
            if (a.ready !== b.ready) return a.ready ? -1 : 1;
            return a.target - b.target;
        });
        return items.slice(0, 12);
    }

    function renderGradeCountdowns() {
        if (!countdownState || isTeacher()) return;
        const host = document.getElementById('ldd-home-timer-list');
        if (!host) return;
        const items = buildGradeCountdowns();
        host.innerHTML = '';
        if (!items.length) {
            host.innerHTML = '<p class="ldd-home-live-empty">Hiện chưa có mục nào đang chờ reset hoặc mở theo thời gian' + (ownGrade ? ' cho Lớp ' + ownGrade : '') + '.</p>';
            return;
        }
        items.forEach(function (item) {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'ldd-home-timer-row ldd-grade-timer-row' + (item.ready ? ' ldd-grade-ready' : '');
            row.dataset.targetMs = String(item.target);
            row.innerHTML = '<span class="ldd-home-timer-icon">' + (item.ready ? '✓' : (item.kind === 'reset' ? '↻' : '🔒')) + '</span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value" data-countdown></span>';
            row.querySelector('strong').textContent = item.title;
            row.querySelector('small').textContent = item.note;
            const value = row.querySelector('[data-countdown]');
            value.textContent = item.ready ? 'LÀM NGAY' : formatRemaining(item.target - Date.now());
            row.addEventListener('click', function () { navigateCountdownItem(item); });
            host.appendChild(row);
        });
    }

    function tickGradeCountdowns() {
        if (!getToken() || isTeacher() || !countdownState) return;
        // Re-render mỗi giây để mục vừa hết thời gian lập tức đổi sang LÀM NGAY và nhảy lên đầu.
        renderGradeCountdowns();
    }

    function formatRemaining(ms) {
        const sec = Math.max(0, Math.floor(ms / 1000));
        const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
        const hh = String(h).padStart(2, '0'), mm = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
        return d > 0 ? d + ' ngày ' + hh + ':' + mm + ':' + ss : hh + ':' + mm + ':' + ss;
    }

    function prettyKey(key) { return String(key || 'Chủ đề').replace(/[-_]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
    function unitLabel(id) {
        const raw = String(id == null ? '' : id);
        const m = raw.match(/(\d+)(?!.*\d)/);
        return m ? 'Unit ' + m[1] : (raw || 'Unit');
    }

    function navigateCountdownItem(item) {
        const action = item && item.action;
        if (!action) return;
        if (action.type === 'kid') {
            goTab('tab-tu-vung', function () {
                clickId('kid-folder-card');
                setTimeout(function () {
                    const key = norm(action.key);
                    const card = Array.from(document.querySelectorAll('#kid-topic-grid .kid-topic-card')).find(function (c) {
                        const t = c.querySelector('.kid-title');
                        return t && (norm(t.textContent) === key || norm(t.textContent).includes(key) || key.includes(norm(t.textContent)));
                    });
                    if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.click(); }
                }, 120);
            });
        } else if (action.type === 'thcs') {
            goTab('tab-tu-vung', function () {
                clickId('thcs-folder-card');
                setTimeout(function () {
                    if (!openAssignedVocabGrade(action.grade)) return;
                    setTimeout(function () {
                        const num = unitNumber(action.unitId);
                        const card = Array.from(document.querySelectorAll('#thcs-unit-grid .thcs-unit-card')).find(function (c) {
                            const t = c.querySelector('.kid-title');
                            const m = t && String(t.textContent || '').match(/Unit\s+(\d+)/i);
                            return m && Number(m[1]) === num;
                        });
                        if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.click(); }
                    }, 140);
                }, 120);
            });
        } else if (action.type === 'vocab-test') {
            goTab('tab-kiem-tra', function () { clickId('vocab-test-folder'); });
        } else if (action.type === 'conj') {
            goTab('tab-tu-vung', function () { clickId('conj-folder-card'); });
        }
    }

    function unitNumber(id) {
        const m = String(id == null ? '' : id).match(/(\d+)(?!.*\d)/);
        return m ? Number(m[1]) : NaN;
    }

    function goTab(tabId, after) {
        if (window.LDDNavigation && typeof window.LDDNavigation.goToTab === 'function') window.LDDNavigation.goToTab(tabId);
        else {
            const btn = document.querySelector('.main-tab-btn[data-main-target="' + tabId + '"]');
            if (btn) btn.click();
        }
        if (typeof after === 'function') setTimeout(after, 80);
    }
    function clickId(id) { const el = document.getElementById(id); if (el) el.click(); }
    function norm(s) {
        return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    }

    window.LDDStudentGrade = {
        getGrade: function () { return ownGrade; },
        refresh: function () { return refreshOwnGrade(false); },
        applyDefaults: applyGradeDefaults
    };
})();
