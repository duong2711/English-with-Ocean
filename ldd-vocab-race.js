/* =============================================================
   LDD ENGLISH — VOCAB RACE v2
   Real-time multiplayer 2–4 học viên / 20 lượt.
   Cơ chế: chọn làn -> bấm ĂN TỪ; chướng ngại vật đồng bộ theo thời gian.
   Requires: vocab_race_setup.sql + vocab_race_v2_migration.sql
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const TEACHER_EMAIL = 'lddbaiu@gmail.com';
    const ROUND_SECONDS = 20;
    const OBSTACLE_SPAWN_MS = 5000;
    const OBSTACLE_WARNING_MS = 2000;
    const OBSTACLE_FALL_MS = 4000;
    const OBSTACLE_IMPACT_MS = 3200;
    const MAX_OBSTACLE_WAVE = 3;
    const PLAYER_COLORS = ['#4f6ef7', '#ef4444', '#10b981', '#f59e0b'];

    if (!window.supabase || !window.supabase.createClient) return;
    const raceSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    let session = null;
    let me = null;
    let room = null;
    let players = [];
    let roomChannel = null;
    let playerChannel = null;
    let tickHandle = null;
    let refreshTimer = null;
    let claimPending = false;
    let timeoutPending = false;
    let lastResultKey = '';
    let charging = null;
    const resolvedObstacleKeys = new Set();

    const $ = (id) => document.getElementById(id);
    const esc = (v) => String(v == null ? '' : v).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(async function () {
        ensureGameUI();
        bindStaticEvents();
        const { data } = await raceSb.auth.getSession();
        session = data && data.session;
        await syncIdentity();
        setInterval(syncSession, 1600);
    });

    async function syncSession() {
        const { data } = await raceSb.auth.getSession();
        const next = data && data.session;
        const prevId = session && session.user && session.user.id;
        const nextId = next && next.user && next.user.id;
        session = next;
        if (prevId !== nextId) {
            await syncIdentity();
            if (!nextId) leaveLocalRoom();
        }
    }

    async function syncIdentity() {
        if (!session || !session.user) { me = null; return; }
        const user = session.user;
        const display = (($('account-display-name') || {}).textContent || '').trim();
        me = {
            id: user.id,
            email: String(user.email || '').toLowerCase(),
            name: display && display !== 'Học viên'
                ? display
                : (user.user_metadata && (user.user_metadata.display_name || user.user_metadata.full_name || user.user_metadata.name))
                    || String(user.email || '').split('@')[0] || 'Học viên'
        };
    }

    function ensureGameUI() {
        const grid = $('entertainment-folder-grid');
        if (!grid || $('vocab-race-folder-card')) return;

        const card = document.createElement('div');
        card.className = 'folder-card vocab-race-folder-card';
        card.id = 'vocab-race-folder-card';
        card.innerHTML = '<span class="vocab-race-card-icon">🏎️</span><span><strong>Đua xe từ vựng</strong><small>2–4 người · 20 lượt · Real-time</small></span>';
        grid.appendChild(card);

        const panel = document.createElement('section');
        panel.id = 'vocab-race-panel';
        panel.className = 'vocab-race-panel';
        panel.style.display = 'none';
        panel.innerHTML = `
            <div class="grammar-panel-header vocab-race-panel-head">
                <button type="button" class="grammar-back-btn" id="vocab-race-back-btn">← Quay lại</button>
                <div><h3>🏎️ Đua xe từ vựng</h3><p>Chọn làn, né chướng ngại vật và bấm <b>ĂN TỪ</b> trước đối thủ.</p></div>
            </div>
            <div id="vocab-race-status" class="vocab-race-status"></div>

            <div id="vocab-race-entry" class="vocab-race-entry">
                <div class="vocab-race-entry-card vocab-race-create-card">
                    <span class="vocab-race-entry-icon">🏁</span><h4>Tạo phòng mới</h4>
                    <p>Hệ thống lấy ngẫu nhiên 20 từ từ mục <b>Vận dụng</b>.</p>
                    <button type="button" id="vocab-race-create-btn" class="vocab-race-primary">Tạo phòng</button>
                </div>
                <div class="vocab-race-entry-card">
                    <span class="vocab-race-entry-icon">🔑</span><h4>Vào phòng</h4>
                    <p>Nhập mã 6 ký tự do chủ phòng gửi.</p>
                    <div class="vocab-race-code-row"><input id="vocab-race-code-input" maxlength="6" autocomplete="off" placeholder="VD: A1B2C3"><button type="button" id="vocab-race-join-btn">Vào</button></div>
                </div>
            </div>

            <div id="vocab-race-lobby" class="vocab-race-lobby" style="display:none;">
                <div class="vocab-race-lobby-top">
                    <div><span class="vocab-race-kicker">Mã phòng</span><strong id="vocab-race-room-code" class="vocab-race-room-code">------</strong></div>
                    <button type="button" id="vocab-race-copy-code" class="vocab-race-secondary">Sao chép mã</button>
                </div>
                <div id="vocab-race-roster" class="vocab-race-roster"></div>
                <div class="vocab-race-lobby-actions">
                    <button type="button" id="vocab-race-leave-btn" class="vocab-race-secondary">Rời phòng</button>
                    <button type="button" id="vocab-race-start-btn" class="vocab-race-primary">Bắt đầu 20 lượt</button>
                </div>
                <p id="vocab-race-lobby-hint" class="vocab-race-hint">Cần 2–4 học viên để bắt đầu.</p>
            </div>

            <div id="vocab-race-game" class="vocab-race-game" style="display:none;">
                <div class="vocab-race-hud">
                    <div class="vocab-race-round"><span>Lượt</span><strong id="vocab-race-round">1/20</strong></div>
                    <div class="vocab-race-meaning"><span>Nghĩa tiếng Việt</span><strong id="vocab-race-meaning">—</strong></div>
                    <div class="vocab-race-round-clock" id="vocab-race-round-clock">20.0s</div>
                </div>
                <div id="vocab-race-event" class="vocab-race-event" aria-live="polite"></div>
                <div id="vocab-race-track" class="vocab-race-track"></div>
                <div class="vocab-race-controls">
                    <button type="button" id="vocab-race-left" class="vocab-race-steer" aria-label="Rẽ trái">←<span>Trái</span></button>
                    <div class="vocab-race-control-center">
                        <strong id="vocab-race-own-lane">Làn 3</strong>
                        <button type="button" id="vocab-race-eat" class="vocab-race-eat-btn">⚡ ĂN TỪ</button>
                        <small id="vocab-race-action-hint">Chọn làn rồi bấm ĂN TỪ</small>
                    </div>
                    <button type="button" id="vocab-race-right" class="vocab-race-steer" aria-label="Rẽ phải">→<span>Phải</span></button>
                </div>
                <div id="vocab-race-score-strip" class="vocab-race-score-strip"></div>
            </div>

            <div id="vocab-race-finish" class="vocab-race-finish" style="display:none;">
                <div class="vocab-race-trophy">🏆</div><h3>Kết thúc 20 lượt</h3>
                <p>Hạng 1 nhận <b>+20 điểm chăm chỉ</b>. Khi bằng điểm: ít sai hơn → tổng thời gian kích hoạt thấp hơn.</p>
                <div id="vocab-race-ranking" class="vocab-race-ranking"></div>
                <div class="vocab-race-finish-actions"><button type="button" id="vocab-race-replay-btn" class="vocab-race-primary">Chơi lại cùng phòng</button><button type="button" id="vocab-race-finish-leave" class="vocab-race-secondary">Rời phòng</button></div>
            </div>`;
        grid.insertAdjacentElement('afterend', panel);
    }

    function bindStaticEvents() {
        const card = $('vocab-race-folder-card');
        if (!card) return;
        card.addEventListener('click', openPanel);
        $('vocab-race-back-btn').addEventListener('click', closePanel);
        $('vocab-race-create-btn').addEventListener('click', createRoom);
        $('vocab-race-join-btn').addEventListener('click', joinRoom);
        $('vocab-race-code-input').addEventListener('keydown', e => { if (e.key === 'Enter') joinRoom(); });
        $('vocab-race-code-input').addEventListener('input', e => { e.target.value = String(e.target.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0,6); });
        $('vocab-race-copy-code').addEventListener('click', copyRoomCode);
        $('vocab-race-leave-btn').addEventListener('click', leaveRoom);
        $('vocab-race-finish-leave').addEventListener('click', leaveRoom);
        $('vocab-race-start-btn').addEventListener('click', startRoom);
        $('vocab-race-replay-btn').addEventListener('click', replayRoom);
        $('vocab-race-left').addEventListener('click', () => steer(-1));
        $('vocab-race-right').addEventListener('click', () => steer(1));
        $('vocab-race-eat').addEventListener('click', eatWord);
        document.addEventListener('keydown', e => {
            if (!$('vocab-race-panel') || $('vocab-race-panel').style.display === 'none' || !room || room.status !== 'playing') return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); steer(-1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); steer(1); }
            if ((e.key === ' ' || e.key === 'Enter') && document.activeElement && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault(); eatWord();
            }
        });
    }

    async function openPanel() {
        await syncIdentity();
        const grid = $('entertainment-folder-grid');
        const panel = $('vocab-race-panel');
        if (grid) grid.style.display = 'none';
        panel.style.display = 'block';
        if (!me) { setStatus('Bạn cần đăng nhập để chơi.', 'error'); return; }
        if (me.email === TEACHER_EMAIL) {
            setStatus('Tài khoản giáo viên không tham gia phòng đua. Hãy dùng tài khoản học viên.', 'info');
            $('vocab-race-entry').style.display = 'none';
            return;
        }
        setStatus('Tạo phòng mới hoặc nhập mã phòng để tham gia.', 'neutral');
        await restoreRoom();
    }

    function closePanel() {
        $('vocab-race-panel').style.display = 'none';
        const grid = $('entertainment-folder-grid');
        if (grid) grid.style.display = '';
    }

    function setStatus(text, type) {
        const el = $('vocab-race-status');
        if (!el) return;
        el.textContent = text || '';
        el.className = 'vocab-race-status ' + (type ? 'is-' + type : '');
        el.style.display = text ? '' : 'none';
    }

    async function waitForVocabAPI() {
        for (let i = 0; i < 30; i++) {
            if (window.kidTopicsAPI && typeof window.kidTopicsAPI.getTopics === 'function') return true;
            await sleep(120);
        }
        return false;
    }

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    async function buildQuestionBank() {
        const ok = await waitForVocabAPI();
        if (!ok) throw new Error('Không đọc được dữ liệu mục Vận dụng. Hãy tải lại trang.');
        const topics = window.kidTopicsAPI.getTopics() || [];
        const map = new Map();
        topics.forEach(topic => (topic.words || []).forEach(w => {
            const en = String((w && (w.en || w.word)) || '').trim();
            const vi = String((w && (w.vi || w.meaning)) || '').trim();
            if (!en || !vi) return;
            const key = en.toLowerCase();
            if (!map.has(key)) map.set(key, { en, vi });
        }));
        const pool = Array.from(map.values());
        if (pool.length < 20) throw new Error('Mục Vận dụng chưa có đủ 20 từ hợp lệ.');
        return shuffle(pool).slice(0, 20).map((word, idx) => {
            const distractors = shuffle(pool.filter(x => x.en.toLowerCase() !== word.en.toLowerCase())).slice(0, 4);
            const options = shuffle([word].concat(distractors));
            return {
                no: idx + 1,
                vi: word.vi,
                answer: word.en,
                options: options.map(x => x.en),
                correct_index: options.findIndex(x => x.en === word.en)
            };
        });
    }

    async function createRoom() {
        if (!me) await syncIdentity();
        if (!me || me.email === TEACHER_EMAIL) return;
        const btn = $('vocab-race-create-btn');
        btn.disabled = true;
        setStatus('Đang lấy 20 từ từ mục Vận dụng...', 'info');
        try {
            const questions = await buildQuestionBank();
            const { data, error } = await raceSb.rpc('vocab_race_create_room', { p_questions: questions, p_display_name: me.name });
            if (error) throw error;
            room = Array.isArray(data) ? data[0] : data;
            if (!room || !room.id) throw new Error('Không tạo được phòng.');
            await attachRoom(room.id);
            setStatus('Đã tạo phòng. Gửi mã cho 1–3 học viên khác.', 'success');
        } catch (err) { setStatus(translateError(err), 'error'); }
        finally { btn.disabled = false; }
    }

    async function joinRoom() {
        if (!me) await syncIdentity();
        if (!me || me.email === TEACHER_EMAIL) return;
        const code = String($('vocab-race-code-input').value || '').trim().toUpperCase();
        if (code.length !== 6) { setStatus('Mã phòng phải gồm 6 ký tự.', 'error'); return; }
        const btn = $('vocab-race-join-btn');
        btn.disabled = true;
        try {
            const { data, error } = await raceSb.rpc('vocab_race_join_room', { p_code: code, p_display_name: me.name });
            if (error) throw error;
            room = Array.isArray(data) ? data[0] : data;
            await attachRoom(room.id);
            setStatus('Đã vào phòng ' + room.code + '.', 'success');
        } catch (err) { setStatus(translateError(err), 'error'); }
        finally { btn.disabled = false; }
    }

    async function restoreRoom() {
        if (!me || room) return;
        const { data, error } = await raceSb.from('vocab_race_players').select('room_id,joined_at').eq('user_id', me.id).order('joined_at', { ascending: false }).limit(4);
        if (error || !data || !data.length) return;
        for (const p of data) {
            const { data: r } = await raceSb.from('vocab_race_rooms').select('*').eq('id', p.room_id).maybeSingle();
            if (r && ['lobby', 'playing', 'finished'].includes(r.status)) { await attachRoom(r.id); return; }
        }
    }

    async function attachRoom(roomId) {
        unsubscribe();
        room = room && room.id === roomId ? room : null;
        roomChannel = raceSb.channel('vocab-race-room-v2-' + roomId)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'vocab_race_rooms', filter: 'id=eq.' + roomId }, scheduleRefresh)
            .subscribe();
        playerChannel = raceSb.channel('vocab-race-players-v2-' + roomId)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'vocab_race_players', filter: 'room_id=eq.' + roomId }, scheduleRefresh)
            .subscribe();
        if (!tickHandle) tickHandle = setInterval(tick, 100);
        await refreshRoom(roomId);
    }

    function scheduleRefresh() {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => room && refreshRoom(room.id), 45);
    }

    async function refreshRoom(roomId) {
        const [r1, r2] = await Promise.all([
            raceSb.from('vocab_race_rooms').select('*').eq('id', roomId).maybeSingle(),
            raceSb.from('vocab_race_players').select('*').eq('room_id', roomId).order('slot', { ascending: true })
        ]);
        if (!r1.data) { leaveLocalRoom(); return; }
        const oldRound = room && room.round_index;
        room = r1.data;
        players = r2.data || [];
        if (oldRound !== room.round_index) {
            claimPending = false;
            timeoutPending = false;
            charging = null;
        }
        render();
    }

    async function startRoom() {
        if (!room) return;
        const btn = $('vocab-race-start-btn');
        btn.disabled = true;
        const { error } = await raceSb.rpc('vocab_race_start_room', { p_room: room.id });
        btn.disabled = false;
        if (error) setStatus(translateError(error), 'error');
        else { setStatus('', 'neutral'); await refreshRoom(room.id); }
    }

    async function replayRoom() {
        if (!room || room.host_user_id !== (me && me.id)) return;
        const { error } = await raceSb.rpc('vocab_race_reset_room', { p_room: room.id });
        if (error) setStatus(translateError(error), 'error');
        else await refreshRoom(room.id);
    }

    async function leaveRoom() {
        if (!room) { leaveLocalRoom(); return; }
        if (room.status === 'playing') { setStatus('Không thể rời phòng khi trận đang diễn ra.', 'error'); return; }
        const { error } = await raceSb.rpc('vocab_race_leave_room', { p_room: room.id });
        if (error) { setStatus(translateError(error), 'error'); return; }
        leaveLocalRoom();
    }

    function leaveLocalRoom() {
        unsubscribe();
        room = null; players = []; claimPending = false; timeoutPending = false; charging = null; resolvedObstacleKeys.clear();
        if ($('vocab-race-entry')) $('vocab-race-entry').style.display = me && me.email !== TEACHER_EMAIL ? 'grid' : 'none';
        if ($('vocab-race-lobby')) $('vocab-race-lobby').style.display = 'none';
        if ($('vocab-race-game')) $('vocab-race-game').style.display = 'none';
        if ($('vocab-race-finish')) $('vocab-race-finish').style.display = 'none';
        if (me && me.email !== TEACHER_EMAIL) setStatus('Tạo phòng mới hoặc nhập mã phòng để tham gia.', 'neutral');
    }

    function unsubscribe() {
        [roomChannel, playerChannel].forEach(ch => { if (ch) try { raceSb.removeChannel(ch); } catch (e) {} });
        roomChannel = playerChannel = null;
    }

    function myPlayer() { return players.find(p => me && String(p.user_id) === String(me.id)) || null; }
    function isEliminated(p) { return !!(p && room && Number(p.answered_round) === Number(room.round_index)); }

    function render() {
        if (!room) return;
        $('vocab-race-entry').style.display = 'none';
        $('vocab-race-lobby').style.display = room.status === 'lobby' ? 'block' : 'none';
        $('vocab-race-game').style.display = room.status === 'playing' ? 'block' : 'none';
        $('vocab-race-finish').style.display = room.status === 'finished' ? 'block' : 'none';
        if (room.status === 'lobby') renderLobby();
        if (room.status === 'playing') renderGame();
        if (room.status === 'finished') renderFinish();
    }

    function renderLobby() {
        $('vocab-race-room-code').textContent = room.code;
        const host = room.host_user_id === (me && me.id);
        $('vocab-race-start-btn').style.display = host ? '' : 'none';
        $('vocab-race-start-btn').disabled = players.length < 2 || players.length > 4;
        $('vocab-race-lobby-hint').textContent = players.length < 2 ? 'Đang chờ thêm ít nhất 1 học viên...' : (host ? 'Đủ người. Bạn có thể bắt đầu.' : 'Đang chờ chủ phòng bắt đầu.');
        const hostEl = $('vocab-race-roster');
        hostEl.innerHTML = '';
        for (let slot = 1; slot <= 4; slot++) {
            const p = players.find(x => Number(x.slot) === slot);
            const row = document.createElement('div');
            row.className = 'vocab-race-roster-row' + (p && me && p.user_id === me.id ? ' is-me' : '');
            row.innerHTML = '<span class="vocab-race-roster-dot" style="--race-color:' + PLAYER_COLORS[slot - 1] + '"></span><span><strong>' +
                (p ? esc(p.display_name || p.email || ('Học viên ' + slot)) : 'Chỗ trống') + '</strong><small>' +
                (p ? (p.user_id === room.host_user_id ? 'Chủ phòng' : 'Học viên ' + slot) : 'Đang chờ...') +
                '</small></span>' + (p && me && p.user_id === me.id ? '<b>Bạn</b>' : '');
            hostEl.appendChild(row);
        }
    }

    function currentQuestion() {
        const list = Array.isArray(room.questions) ? room.questions : [];
        return list[room.round_index] || null;
    }

    function renderGame() {
        const q = currentQuestion();
        if (!q) return;
        $('vocab-race-round').textContent = (room.round_index + 1) + '/20';
        $('vocab-race-meaning').textContent = q.vi || '—';
        buildTrack(q);
        renderScoreStrip();
        updateOwnControls();
        renderEvent();
        updateObstacleVisuals();
    }

    function hideOtherCarsForMe() {
        const lr = room && room.last_result || {};
        return !!(me && String(lr.hide_user_id || '') === String(me.id) && Number(lr.hide_round) === Number(room.round_index));
    }

    function buildTrack(q) {
        const track = $('vocab-race-track');
        track.innerHTML = '';
        const stealth = hideOtherCarsForMe();
        for (let lane = 0; lane < 5; lane++) {
            const laneEl = document.createElement('div');
            laneEl.className = 'vocab-race-lane';
            laneEl.dataset.lane = lane;
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'vocab-race-option';
            option.textContent = (q.options || [])[lane] || '—';
            option.addEventListener('click', () => chooseLane(lane));
            laneEl.appendChild(option);

            const road = document.createElement('div');
            road.className = 'vocab-race-road';
            laneEl.appendChild(road);

            const warning = document.createElement('div');
            warning.className = 'vocab-race-obstacle-warning';
            warning.innerHTML = '<span>⚠️</span><b>—</b>';
            laneEl.appendChild(warning);

            const obstacle = document.createElement('div');
            obstacle.className = 'vocab-race-obstacle';
            obstacle.innerHTML = '<span>🚧</span>';
            laneEl.appendChild(obstacle);

            players.filter(p => Number(p.lane) === lane).forEach(p => {
                if (!stealth || (me && String(p.user_id) === String(me.id))) laneEl.appendChild(makeCar(p));
            });
            track.appendChild(laneEl);
        }
        players.filter(p => p.lane === null || p.lane === undefined).forEach(p => {
            if (stealth && (!me || String(p.user_id) !== String(me.id))) return;
            const laneEl = track.querySelector('[data-lane="2"]');
            if (laneEl) laneEl.appendChild(makeCar(p));
        });
    }

    function makeCar(p) {
        const car = document.createElement('div');
        const mine = me && String(p.user_id) === String(me.id);
        const eliminated = isEliminated(p);
        const isCharging = mine && charging && charging.round === room.round_index && Date.now() < charging.until;
        car.className = 'vocab-race-car slot-' + p.slot + (mine ? ' is-me' : '') + (eliminated ? ' is-eliminated' : '') + (isCharging ? ' is-charging' : '');
        car.style.setProperty('--race-color', PLAYER_COLORS[(Number(p.slot) || 1) - 1]);
        car.dataset.user = p.user_id;
        car.style.bottom = '10%';
        car.innerHTML = '<span class="vocab-race-car-timer">' + (eliminated ? 'LOẠI' : 'READY') + '</span><span class="vocab-race-car-body">🏎️</span><span class="vocab-race-car-name">' + esc(shortName(p.display_name || p.email || ('P' + p.slot))) + '</span>';
        return car;
    }

    function shortName(s) { s = String(s || ''); return s.length > 11 ? s.slice(0, 10) + '…' : s; }

    function renderScoreStrip() {
        const host = $('vocab-race-score-strip');
        host.innerHTML = '';
        players.slice().sort((a, b) => b.score - a.score || a.wrong_count - b.wrong_count || Number(a.total_activation_ms) - Number(b.total_activation_ms)).forEach((p, i) => {
            const el = document.createElement('div');
            el.className = 'vocab-race-mini-score' + (me && p.user_id === me.id ? ' is-me' : '') + (isEliminated(p) ? ' is-eliminated' : '');
            el.innerHTML = '<span style="--race-color:' + PLAYER_COLORS[(Number(p.slot) || 1) - 1] + '"></span><strong>#' + (i + 1) + ' ' + esc(shortName(p.display_name || p.email)) + '</strong><b>' + p.score + 'đ</b><small>' + (isEliminated(p) ? 'Đã bị loại vòng này' : p.wrong_count + ' sai') + '</small>';
            host.appendChild(el);
        });
    }

    function renderEvent() {
        const box = $('vocab-race-event');
        const lr = room.last_result || {};
        const key = JSON.stringify(lr);
        let text = '🏁 Chọn làn đúng, né chướng ngại vật rồi bấm ĂN TỪ.';
        let cls = '';
        if (lr.type === 'correct') {
            const p = players.find(x => String(x.user_id) === String(lr.winner_user_id));
            text = '✅ ' + (p ? (p.display_name || p.email) : 'Một xe') + ' ăn từ đầu tiên!';
            cls = ' is-success';
        } else if (lr.type === 'wrong') {
            const p = players.find(x => String(x.user_id) === String(lr.user_id));
            text = '❌ ' + (p ? (p.display_name || p.email) : 'Một xe') + ' chọn sai và bị loại ở vòng này.';
            cls = ' is-warn';
        } else if (lr.type === 'obstacle_hit') {
            text = '💥 Có xe đâm chướng ngại vật và bị loại ở vòng này!';
            cls = ' is-danger';
        } else if (lr.type === 'all_eliminated') {
            text = '↩️ Không còn xe nào trong vòng — chuyển sang từ tiếp theo.';
            cls = ' is-warn';
        } else if (lr.type === 'finished') {
            text = '🏁 Trận đấu đã kết thúc.';
        }
        box.textContent = text;
        box.className = 'vocab-race-event' + cls;
        if (key !== lastResultKey) lastResultKey = key;
    }

    function renderFinish() {
        const ranking = (room.last_result && Array.isArray(room.last_result.ranking))
            ? room.last_result.ranking
            : players.slice().sort((a, b) => b.score - a.score || a.wrong_count - b.wrong_count || Number(a.total_activation_ms) - Number(b.total_activation_ms));
        const host = $('vocab-race-ranking');
        host.innerHTML = '';
        ranking.forEach((p, i) => {
            const el = document.createElement('div');
            el.className = 'vocab-race-rank-row rank-' + (i + 1) + (me && String(p.user_id) === String(me.id) ? ' is-me' : '');
            el.innerHTML = '<span class="vocab-race-rank-no">' + (['🥇', '🥈', '🥉'][i] || ('#' + (i + 1))) + '</span><span><strong>' + esc(p.display_name || ('Học viên ' + p.slot)) + (me && String(p.user_id) === String(me.id) ? ' (Bạn)' : '') + '</strong><small>' + p.wrong_count + ' lần sai · ' + Math.round(Number(p.total_activation_ms || 0)) + ' ms kích hoạt</small></span><b>' + p.score + ' điểm</b>';
            host.appendChild(el);
        });
        $('vocab-race-replay-btn').style.display = room.host_user_id === (me && me.id) ? '' : 'none';
    }

    function updateOwnControls() {
        const p = myPlayer();
        if (!p) return;
        const lane = (p.lane === null || p.lane === undefined) ? 2 : Number(p.lane);
        const eliminated = isEliminated(p);
        $('vocab-race-own-lane').textContent = 'Làn ' + (lane + 1);
        $('vocab-race-action-hint').textContent = eliminated
            ? 'Bạn đã bị loại — chờ vòng tiếp theo'
            : claimPending
                ? 'Xe đang lao lên...'
                : obstacleDangerText(lane) || 'Chọn làn rồi bấm ĂN TỪ';
        $('vocab-race-left').disabled = eliminated || claimPending || lane <= 0;
        $('vocab-race-right').disabled = eliminated || claimPending || lane >= 4;
        $('vocab-race-eat').disabled = eliminated || claimPending;
    }

    async function chooseLane(lane) {
        const p = myPlayer();
        if (!room || room.status !== 'playing' || !p || isEliminated(p) || claimPending) return;
        lane = Math.max(0, Math.min(4, Number(lane)));
        if (Number(p.lane) === lane) return;
        const { error } = await raceSb.rpc('vocab_race_set_lane', { p_room: room.id, p_lane: lane, p_round: Number(room.round_index) });
        if (error) setStatus(translateError(error), 'error');
        else scheduleRefresh();
    }

    async function steer(delta) {
        const p = myPlayer();
        if (!p || !room || room.status !== 'playing' || isEliminated(p) || claimPending) return;
        const cur = (p.lane === null || p.lane === undefined) ? 2 : Number(p.lane);
        const next = Math.max(0, Math.min(4, cur + delta));
        if (next !== cur) await chooseLane(next);
    }

    async function eatWord() {
        const p = myPlayer();
        if (!p || !room || room.status !== 'playing' || isEliminated(p) || claimPending) return;
        const lane = (p.lane === null || p.lane === undefined) ? 2 : Number(p.lane);
        const roundAtCall = Number(room.round_index);
        claimPending = true;
        charging = { round: roundAtCall, lane, until: Date.now() + 650 };
        updateOwnControls();
        markChargingCar();
        await sleep(430);
        if (!room || Number(room.round_index) !== roundAtCall) { claimPending = false; charging = null; return; }
        const { error } = await raceSb.rpc('vocab_race_claim_lane', { p_room: room.id, p_lane: lane, p_round: roundAtCall });
        if (error && !String(error.message || '').includes('already_answered') && !String(error.message || '').includes('round_timeout') && !String(error.message || '').includes('game_not_playing')) {
            setStatus(translateError(error), 'error');
        } else if (!error) {
            setStatus('', 'neutral');
        }
        claimPending = false;
        charging = null;
        scheduleRefresh();
    }

    function markChargingCar() {
        const p = myPlayer();
        if (!p) return;
        const car = document.querySelector('#vocab-race-track .vocab-race-car[data-user="' + CSS.escape(String(p.user_id)) + '"]');
        if (car) car.classList.add('is-charging');
    }

    function baseSeed() {
        if (!room || !room.id) return 0;
        const hex = String(room.id).replace(/-/g, '').slice(0, 8);
        const n = parseInt(hex, 16);
        return Number.isFinite(n) ? (n >>> 0) : 0;
    }

    function obstacleLanes(wave) {
        const seed = baseSeed();
        const round = Number(room && room.round_index || 0);
        const laneA = (seed + round * 7 + wave * 3) % 5;
        const offset = 1 + ((Math.floor(seed / 5) + round + wave) % 4);
        const laneB = (laneA + offset) % 5;
        return [laneA, laneB];
    }

    function roundElapsedMs() {
        const start = Date.parse(room && room.round_started_at || '');
        return Number.isFinite(start) ? Math.max(0, Date.now() - start) : 0;
    }

    function obstacleState() {
        const elapsed = roundElapsedMs();
        let warning = null;
        let falling = null;
        for (let wave = 1; wave <= MAX_OBSTACLE_WAVE; wave++) {
            const spawnAt = wave * OBSTACLE_SPAWN_MS;
            if (elapsed >= spawnAt - OBSTACLE_WARNING_MS && elapsed < spawnAt) {
                warning = { wave, lanes: obstacleLanes(wave), remaining: spawnAt - elapsed };
            }
            if (elapsed >= spawnAt && elapsed < spawnAt + OBSTACLE_FALL_MS) {
                falling = { wave, lanes: obstacleLanes(wave), progress: (elapsed - spawnAt) / OBSTACLE_FALL_MS };
            }
        }
        return { elapsed, warning, falling };
    }

    function obstacleDangerText(lane) {
        const state = obstacleState();
        if (state.falling && state.falling.lanes.includes(lane)) return '🚧 Chướng ngại vật đang rơi ở làn này!';
        if (state.warning && state.warning.lanes.includes(lane)) return '⚠️ Chướng ngại vật sau ' + (state.warning.remaining / 1000).toFixed(1) + 's';
        return '';
    }

    function updateObstacleVisuals() {
        const track = $('vocab-race-track');
        if (!track || !room || room.status !== 'playing') return;
        const state = obstacleState();
        track.querySelectorAll('.vocab-race-lane').forEach(laneEl => {
            const lane = Number(laneEl.dataset.lane);
            const warningEl = laneEl.querySelector('.vocab-race-obstacle-warning');
            const obstacleEl = laneEl.querySelector('.vocab-race-obstacle');
            laneEl.classList.remove('is-obstacle-warning', 'is-obstacle-active');
            if (warningEl) warningEl.classList.remove('is-visible');
            if (obstacleEl) obstacleEl.classList.remove('is-visible');

            if (state.warning && state.warning.lanes.includes(lane)) {
                laneEl.classList.add('is-obstacle-warning');
                if (warningEl) {
                    warningEl.classList.add('is-visible');
                    const b = warningEl.querySelector('b');
                    if (b) b.textContent = (state.warning.remaining / 1000).toFixed(1) + 's';
                }
            }
            if (state.falling && state.falling.lanes.includes(lane)) {
                laneEl.classList.add('is-obstacle-active');
                if (obstacleEl) {
                    obstacleEl.classList.add('is-visible');
                    const progress = Math.max(0, Math.min(1, state.falling.progress));
                    const travel = Math.max(120, laneEl.clientHeight - 140);
                    obstacleEl.style.top = (84 + progress * travel) + 'px';
                    obstacleEl.style.transform = 'translateX(-50%) rotate(' + ((progress - 0.5) * 8).toFixed(1) + 'deg)';
                }
            }
        });
    }

    async function resolveObstacleImpacts() {
        if (!room || room.status !== 'playing') return;
        const elapsed = roundElapsedMs();
        for (let wave = 1; wave <= MAX_OBSTACLE_WAVE; wave++) {
            const impactAt = wave * OBSTACLE_SPAWN_MS + OBSTACLE_IMPACT_MS;
            if (elapsed < impactAt) continue;
            const key = room.id + ':' + room.round_index + ':' + wave;
            if (resolvedObstacleKeys.has(key)) continue;
            resolvedObstacleKeys.add(key);
            const { error } = await raceSb.rpc('vocab_race_resolve_obstacle', { p_room: room.id, p_round: Number(room.round_index), p_wave: wave });
            if (error && !String(error.message || '').includes('already_processed') && !String(error.message || '').includes('game_not_playing')) {
                resolvedObstacleKeys.delete(key);
                if (String(error.message || '').includes('vocab_race_resolve_obstacle')) setStatus('Cần chạy vocab_race_v2_migration.sql trong Supabase SQL Editor.', 'error');
            }
            scheduleRefresh();
        }
    }

    function tick() {
        if (!room || room.status !== 'playing') return;
        const start = Date.parse(room.round_started_at || '');
        if (!Number.isFinite(start)) return;
        const remain = Math.max(0, ROUND_SECONDS * 1000 - (Date.now() - start));
        const clock = $('vocab-race-round-clock');
        if (clock) {
            clock.textContent = (remain / 1000).toFixed(1) + 's';
            clock.classList.toggle('is-danger', remain <= 5000);
        }
        updateObstacleVisuals();
        updateOwnControls();
        resolveObstacleImpacts();
        if (remain <= 0) resolveTimeout();
    }

    async function resolveTimeout() {
        if (timeoutPending || !room) return;
        timeoutPending = true;
        const { error } = await raceSb.rpc('vocab_race_resolve_timeout', { p_room: room.id });
        timeoutPending = false;
        if (error && !String(error.message || '').includes('game_not_playing')) setStatus(translateError(error), 'error');
        scheduleRefresh();
    }

    async function copyRoomCode() {
        if (!room) return;
        try { await navigator.clipboard.writeText(room.code); setStatus('Đã sao chép mã phòng ' + room.code + '.', 'success'); }
        catch (e) { setStatus('Mã phòng: ' + room.code, 'info'); }
    }

    function translateError(err) {
        const raw = String((err && err.message) || err || '').toLowerCase();
        const map = {
            'room_not_found': 'Không tìm thấy phòng này.',
            'room_full': 'Phòng đã đủ 4 người.',
            'room_already_started': 'Phòng đã bắt đầu.',
            'need_2_to_4_players': 'Cần từ 2 đến 4 học viên.',
            'host_only': 'Chỉ chủ phòng được thao tác.',
            'teacher_cannot_play': 'Tài khoản giáo viên không tham gia trò chơi.',
            'need_exactly_20_questions': 'Nguồn Vận dụng phải tạo đủ đúng 20 câu.',
            'cannot_leave_during_game': 'Không thể rời phòng khi trận đang diễn ra.',
            'already_answered': 'Bạn đã bị loại hoặc đã hành động ở vòng này.',
            'game_not_playing': 'Ván chơi chưa bắt đầu hoặc đã kết thúc.',
            'round_timeout': 'Vòng này đã hết thời gian.',
            'invalid_lane': 'Làn không hợp lệ.'
        };
        for (const k in map) if (raw.includes(k)) return map[k];
        if (raw.includes('vocab_race_resolve_obstacle') || raw.includes('schema cache')) return 'Cần chạy vocab_race_v2_migration.sql trong Supabase SQL Editor.';
        if (raw.includes('vocab_race') || raw.includes('does not exist')) return 'Database Đua xe từ vựng chưa đúng phiên bản. Hãy chạy vocab_race_setup.sql rồi vocab_race_v2_migration.sql.';
        return (err && err.message) ? err.message : 'Có lỗi xảy ra.';
    }
})();