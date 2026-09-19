/* =============================================================
   LDD ENGLISH — VOCAB RACE v5
   2–4 học viên · 20 lượt · 30 giây/lượt
   - Chọn làn -> LAO LÊN ĂN TỪ
   - Chướng ngại vật mỗi 5 giây
   - Hết giờ: pause đồng bộ 6 giây rồi mới sang vòng tiếp
   - Mặt đường chuyển động bằng requestAnimationFrame trên mọi thiết bị
   - Đồng hồ dùng thời gian server Supabase để tránh lệch PC/tablet/mobile
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const TEACHER_EMAIL = 'lddbaiu@gmail.com';
    const ROUND_MS = 30000;
    const PAUSE_MS = 6000;
    const OBSTACLE_SPAWN_MS = 5000;
    const OBSTACLE_WARNING_MS = 2000;
    const OBSTACLE_FALL_MS = 4000;
    const OBSTACLE_IMPACT_MS = 3200;
    const MAX_OBSTACLE_WAVE = 5;
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
    let timeoutPending = false;
    let advancePending = false;
    let claimPending = false;
    let charging = null;
    let roadAnimationStarted = false;
    let clockOffsetMs = 0;
    let clockSyncPending = false;
    let lastClockSyncAt = 0;
    const resolvedObstacleKeys = new Set();

    const $ = id => document.getElementById(id);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const esc = v => String(v == null ? '' : v).replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
    const nowMs = () => Date.now() + clockOffsetMs;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(async function () {
        ensureGameUI();
        bindEvents();
        startRoadAnimation();
        const { data } = await raceSb.auth.getSession();
        session = data && data.session;
        await syncIdentity();
        await syncServerClock(true);
        setInterval(syncSession, 1600);
    });

    async function syncSession() {
        const { data } = await raceSb.auth.getSession();
        const next = data && data.session;
        const oldId = session && session.user && session.user.id;
        const newId = next && next.user && next.user.id;
        session = next;
        if (oldId !== newId) {
            await syncIdentity();
            if (newId) await syncServerClock(true);
            else leaveLocalRoom();
        }
    }

    async function syncIdentity() {
        if (!session || !session.user) { me = null; return; }
        const u = session.user;
        const display = (($('account-display-name') || {}).textContent || '').trim();
        me = {
            id: u.id,
            email: String(u.email || '').toLowerCase(),
            name: display && display !== 'Học viên'
                ? display
                : (u.user_metadata && (u.user_metadata.display_name || u.user_metadata.full_name || u.user_metadata.name))
                    || String(u.email || '').split('@')[0] || 'Học viên'
        };
    }

    async function syncServerClock(force) {
        if (!session || !session.user || clockSyncPending) return;
        if (!force && Date.now() - lastClockSyncAt < 9000) return;
        clockSyncPending = true;
        const t0 = Date.now();
        try {
            const { data, error } = await raceSb.rpc('vocab_race_server_time');
            const t1 = Date.now();
            if (!error && data) {
                const server = Date.parse(data);
                if (Number.isFinite(server)) clockOffsetMs = server - ((t0 + t1) / 2);
            }
            lastClockSyncAt = Date.now();
        } catch (_) {
            lastClockSyncAt = Date.now();
        } finally {
            clockSyncPending = false;
        }
    }

    function ensureGameUI() {
        const grid = $('entertainment-folder-grid');
        if (!grid || $('vocab-race-folder-card')) return;

        const card = document.createElement('div');
        card.id = 'vocab-race-folder-card';
        card.className = 'folder-card vocab-race-folder-card';
        card.innerHTML = '<span class="vocab-race-card-icon">🏎️</span><span><strong>Đua xe từ vựng</strong><small>2–4 người · 20 lượt · 30 giây/lượt</small></span>';
        grid.appendChild(card);

        const panel = document.createElement('section');
        panel.id = 'vocab-race-panel';
        panel.className = 'vocab-race-panel';
        panel.style.display = 'none';
        panel.innerHTML = `
            <div class="grammar-panel-header vocab-race-panel-head">
                <button type="button" class="grammar-back-btn" id="vocab-race-back-btn">← Quay lại</button>
                <div><h3>🏎️ Đua xe từ vựng</h3><p>Đổi làn để chọn đáp án, né chướng ngại vật và bấm <b>LAO LÊN ĂN TỪ</b>.</p></div>
            </div>
            <div id="vocab-race-status" class="vocab-race-status"></div>
            <div id="vocab-race-entry" class="vocab-race-entry">
                <div class="vocab-race-entry-card"><span class="vocab-race-entry-icon">🏁</span><h4>Tạo phòng mới</h4><p>Lấy ngẫu nhiên 20 từ từ mục <b>Vận dụng</b>.</p><button type="button" id="vocab-race-create-btn" class="vocab-race-primary">Tạo phòng</button></div>
                <div class="vocab-race-entry-card"><span class="vocab-race-entry-icon">🔑</span><h4>Vào phòng</h4><p>Nhập mã 6 ký tự do chủ phòng gửi.</p><div class="vocab-race-code-row"><input id="vocab-race-code-input" maxlength="6" autocomplete="off" placeholder="VD: A1B2C3"><button type="button" id="vocab-race-join-btn">Vào</button></div></div>
            </div>
            <div id="vocab-race-lobby" class="vocab-race-lobby" style="display:none">
                <div class="vocab-race-lobby-top"><div><span class="vocab-race-kicker">Mã phòng</span><strong id="vocab-race-room-code" class="vocab-race-room-code">------</strong></div><button type="button" id="vocab-race-copy-code" class="vocab-race-secondary">Sao chép mã</button></div>
                <div id="vocab-race-roster" class="vocab-race-roster"></div>
                <div class="vocab-race-lobby-actions"><button type="button" id="vocab-race-leave-btn" class="vocab-race-secondary">Rời phòng</button><button type="button" id="vocab-race-start-btn" class="vocab-race-primary">Bắt đầu 20 lượt</button></div>
                <p id="vocab-race-lobby-hint" class="vocab-race-hint">Cần 2–4 học viên để bắt đầu.</p>
            </div>
            <div id="vocab-race-game" class="vocab-race-game" style="display:none">
                <div class="vocab-race-hud"><div class="vocab-race-round"><span>Lượt</span><strong id="vocab-race-round">1/20</strong></div><div class="vocab-race-meaning"><span>Nghĩa tiếng Việt</span><strong id="vocab-race-meaning">—</strong></div><div class="vocab-race-round-clock" id="vocab-race-round-clock">30.0s</div></div>
                <div id="vocab-race-event" class="vocab-race-event" aria-live="polite"></div>
                <div id="vocab-race-track" class="vocab-race-track"></div>
                <div class="vocab-race-controls">
                    <button type="button" id="vocab-race-left" class="vocab-race-steer" aria-label="Chuyển sang làn trái">←<span>TRÁI</span></button>
                    <div class="vocab-race-control-center"><strong id="vocab-race-own-lane">Làn 3</strong><button type="button" id="vocab-race-eat" class="vocab-race-eat-btn">⚡ LAO LÊN ĂN TỪ</button><small id="vocab-race-action-hint">← Chọn làn → rồi bấm ĂN TỪ</small></div>
                    <button type="button" id="vocab-race-right" class="vocab-race-steer" aria-label="Chuyển sang làn phải">→<span>PHẢI</span></button>
                </div>
                <div id="vocab-race-score-strip" class="vocab-race-score-strip"></div>
                <div id="vocab-race-pause-overlay" class="vocab-race-pause-overlay" aria-live="assertive" style="display:none">
                    <div class="vocab-race-pause-card">
                        <span class="vocab-race-pause-icon">⏱️</span>
                        <strong>HẾT THỜI GIAN!</strong>
                        <p>Vòng tiếp theo bắt đầu sau</p>
                        <b id="vocab-race-pause-count">6</b>
                        <small>giây</small>
                    </div>
                </div>
            </div>
            <div id="vocab-race-finish" class="vocab-race-finish" style="display:none"><div class="vocab-race-trophy">🏆</div><h3>Kết thúc 20 lượt</h3><p>Hạng 1 nhận <b>+20 điểm chăm chỉ</b>.</p><div id="vocab-race-ranking" class="vocab-race-ranking"></div><div class="vocab-race-finish-actions"><button type="button" id="vocab-race-replay-btn" class="vocab-race-primary">Chơi lại cùng phòng</button><button type="button" id="vocab-race-finish-leave" class="vocab-race-secondary">Rời phòng</button></div></div>`;
        grid.insertAdjacentElement('afterend', panel);
    }

    function bindEvents() {
        const card = $('vocab-race-folder-card');
        if (!card) return;
        card.addEventListener('click', openPanel);
        $('vocab-race-back-btn').addEventListener('click', closePanel);
        $('vocab-race-create-btn').addEventListener('click', createRoom);
        $('vocab-race-join-btn').addEventListener('click', joinRoom);
        $('vocab-race-code-input').addEventListener('keydown', e => { if (e.key === 'Enter') joinRoom(); });
        $('vocab-race-code-input').addEventListener('input', e => { e.target.value = String(e.target.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6); });
        $('vocab-race-copy-code').addEventListener('click', copyRoomCode);
        $('vocab-race-leave-btn').addEventListener('click', leaveRoom);
        $('vocab-race-finish-leave').addEventListener('click', leaveRoom);
        $('vocab-race-start-btn').addEventListener('click', startRoom);
        $('vocab-race-replay-btn').addEventListener('click', replayRoom);
        $('vocab-race-left').addEventListener('click', () => steer(-1));
        $('vocab-race-right').addEventListener('click', () => steer(1));
        $('vocab-race-eat').addEventListener('click', eatWord);
        document.addEventListener('keydown', e => {
            if (!room || room.status !== 'playing' || isRoundPaused() || !$('vocab-race-panel') || $('vocab-race-panel').style.display === 'none') return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); steer(-1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); steer(1); }
            if ((e.key === ' ' || e.key === 'Enter') && (!document.activeElement || document.activeElement.tagName !== 'INPUT')) { e.preventDefault(); eatWord(); }
        });
    }

    async function openPanel() {
        await syncIdentity();
        const grid = $('entertainment-folder-grid');
        if (grid) grid.style.display = 'none';
        $('vocab-race-panel').style.display = 'block';
        if (!me) { setStatus('Bạn cần đăng nhập để chơi.', 'error'); return; }
        if (me.email === TEACHER_EMAIL) { $('vocab-race-entry').style.display = 'none'; setStatus('Tài khoản giáo viên không tham gia phòng đua.', 'info'); return; }
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

    function shuffle(a) {
        a = a.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
        return a;
    }

    async function buildQuestionBank() {
        for (let i = 0; i < 30 && !(window.kidTopicsAPI && typeof window.kidTopicsAPI.getTopics === 'function'); i++) await sleep(120);
        if (!(window.kidTopicsAPI && typeof window.kidTopicsAPI.getTopics === 'function')) throw new Error('Không đọc được dữ liệu mục Vận dụng.');
        const map = new Map();
        (window.kidTopicsAPI.getTopics() || []).forEach(t => (t.words || []).forEach(w => {
            const en = String((w && (w.en || w.word)) || '').trim();
            const vi = String((w && (w.vi || w.meaning)) || '').trim();
            if (en && vi && !map.has(en.toLowerCase())) map.set(en.toLowerCase(), { en, vi });
        }));
        const pool = Array.from(map.values());
        if (pool.length < 20) throw new Error('Mục Vận dụng chưa có đủ 20 từ hợp lệ.');
        return shuffle(pool).slice(0, 20).map((word, i) => {
            const options = shuffle([word].concat(shuffle(pool.filter(x => x.en.toLowerCase() !== word.en.toLowerCase())).slice(0, 4)));
            return { no:i+1, vi:word.vi, answer:word.en, options:options.map(x => x.en), correct_index:options.findIndex(x => x.en === word.en) };
        });
    }

    async function createRoom() {
        if (!me) await syncIdentity();
        if (!me || me.email === TEACHER_EMAIL) return;
        const btn = $('vocab-race-create-btn'); btn.disabled = true;
        setStatus('Đang lấy 20 từ...', 'info');
        try {
            const questions = await buildQuestionBank();
            const { data, error } = await raceSb.rpc('vocab_race_create_room', { p_questions:questions, p_display_name:me.name });
            if (error) throw error;
            room = Array.isArray(data) ? data[0] : data;
            await attachRoom(room.id);
            setStatus('Đã tạo phòng ' + room.code + '.', 'success');
        } catch (e) { setStatus(translateError(e), 'error'); }
        finally { btn.disabled = false; }
    }

    async function joinRoom() {
        if (!me) await syncIdentity();
        const code = String($('vocab-race-code-input').value || '').trim().toUpperCase();
        if (code.length !== 6) { setStatus('Mã phòng phải gồm 6 ký tự.', 'error'); return; }
        const btn = $('vocab-race-join-btn'); btn.disabled = true;
        try {
            const { data, error } = await raceSb.rpc('vocab_race_join_room', { p_code:code, p_display_name:me.name });
            if (error) throw error;
            room = Array.isArray(data) ? data[0] : data;
            await attachRoom(room.id);
        } catch (e) { setStatus(translateError(e), 'error'); }
        finally { btn.disabled = false; }
    }

    async function restoreRoom() {
        if (!me || room) return;
        const { data } = await raceSb.from('vocab_race_players').select('room_id,joined_at').eq('user_id', me.id).order('joined_at', { ascending:false }).limit(4);
        for (const p of (data || [])) {
            const { data:r } = await raceSb.from('vocab_race_rooms').select('*').eq('id', p.room_id).maybeSingle();
            if (r && ['lobby','playing','finished'].includes(r.status)) { await attachRoom(r.id); return; }
        }
    }

    async function attachRoom(id) {
        unsubscribe();
        await syncServerClock(true);
        roomChannel = raceSb.channel('race-room-v5-' + id).on('postgres_changes', { event:'*', schema:'public', table:'vocab_race_rooms', filter:'id=eq.' + id }, scheduleRefresh).subscribe();
        playerChannel = raceSb.channel('race-player-v5-' + id).on('postgres_changes', { event:'*', schema:'public', table:'vocab_race_players', filter:'room_id=eq.' + id }, applyRealtimePlayer).subscribe();
        if (!tickHandle) tickHandle = setInterval(tick, 100);
        await refreshRoom(id);
    }

    function scheduleRefresh() {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => room && refreshRoom(room.id), 45);
    }

    function applyRealtimePlayer(payload) {
        if (!payload) return;
        if (payload.eventType === 'DELETE' || !payload.new || !payload.new.user_id) {
            scheduleRefresh();
            return;
        }

        const incoming = payload.new;
        const index = players.findIndex(p => String(p.user_id) === String(incoming.user_id));
        if (index >= 0) players[index] = Object.assign({}, players[index], incoming);
        else players.push(incoming);
        players.sort((a, b) => Number(a.slot || 0) - Number(b.slot || 0));

        // Same round: move/update only this car. Never rebuild the track,
        // otherwise road/obstacle animation restarts and looks like a reset.
        if (room && room.status === 'playing') {
            syncCarDom(incoming, true);
            renderScores();
            updateControls();
        } else if (room && room.status === 'lobby') {
            renderLobby();
        }
    }

    async function refreshRoom(id) {
        const [rr, pp] = await Promise.all([
            raceSb.from('vocab_race_rooms').select('*').eq('id', id).maybeSingle(),
            raceSb.from('vocab_race_players').select('*').eq('room_id', id).order('slot')
        ]);
        if (!rr.data) { leaveLocalRoom(); return; }
        const oldRound = room && room.round_index;
        room = rr.data;
        players = pp.data || [];


        const roundChanged = oldRound !== room.round_index;
        if (roundChanged) {
            claimPending = false;
            timeoutPending = false;
            advancePending = false;
            charging = null;
        }

        // A new round/status needs a fresh track. Updates inside the same round
        // only patch cars/HUD so moving objects keep their current animation.
        const track = $('vocab-race-track');
        const trackReady = !!(track && track.querySelectorAll('.vocab-race-lane').length === 5);
        if (!roundChanged && room.status === 'playing' && trackReady) {
            syncAllCarsDom(false);
            renderScores();
            renderEvent();
            updateControls();
            updatePauseOverlay();
        } else {
            render();
        }
    }

    function unsubscribe() {
        [roomChannel, playerChannel].forEach(ch => { if (ch) try { raceSb.removeChannel(ch); } catch (_) {} });
        roomChannel = playerChannel = null;
    }

    function myPlayer() { return players.find(p => me && String(p.user_id) === String(me.id)) || null; }
    function isEliminated(p) { return !!(p && room && Number(p.answered_round) === Number(room.round_index)); }
    function currentQuestion() { return (Array.isArray(room && room.questions) ? room.questions : [])[room ? room.round_index : 0] || null; }

    function isRoundPaused() {
        const lr = room && room.last_result || {};
        const pauseType = lr.type === 'round_pause' || lr.type === 'timeout_pause';
        return !!(room && room.status === 'playing' && pauseType && Number(lr.round) === Number(room.round_index));
    }

    function pauseRemainingMs() {
        if (!isRoundPaused()) return 0;
        const until = Date.parse((room.last_result || {}).pause_until || '');
        return Number.isFinite(until) ? Math.max(0, until - nowMs()) : PAUSE_MS;
    }

    async function startRoom() {
        if (!room) return;
        const b = $('vocab-race-start-btn'); b.disabled = true;
        const { error } = await raceSb.rpc('vocab_race_start_room', { p_room:room.id });
        b.disabled = false;
        if (error) setStatus(translateError(error), 'error'); else { await syncServerClock(true); await refreshRoom(room.id); }
    }

    async function replayRoom() {
        if (!room || room.host_user_id !== (me && me.id)) return;
        const { error } = await raceSb.rpc('vocab_race_reset_room', { p_room:room.id });
        if (error) setStatus(translateError(error), 'error'); else await refreshRoom(room.id);
    }

    async function leaveRoom() {
        if (!room) return leaveLocalRoom();
        if (room.status === 'playing') { setStatus('Không thể rời phòng khi trận đang diễn ra.', 'error'); return; }
        const { error } = await raceSb.rpc('vocab_race_leave_room', { p_room:room.id });
        if (error) return setStatus(translateError(error), 'error');
        leaveLocalRoom();
    }

    function leaveLocalRoom() {
        unsubscribe();
        room = null; players = []; claimPending = false; timeoutPending = false; advancePending = false; charging = null; resolvedObstacleKeys.clear();
        if ($('vocab-race-entry')) $('vocab-race-entry').style.display = me && me.email !== TEACHER_EMAIL ? 'grid' : 'none';
        if ($('vocab-race-lobby')) $('vocab-race-lobby').style.display = 'none';
        if ($('vocab-race-game')) $('vocab-race-game').style.display = 'none';
        if ($('vocab-race-finish')) $('vocab-race-finish').style.display = 'none';
    }

    function render() {
        if (!room) return;
        $('vocab-race-entry').style.display = 'none';
        $('vocab-race-lobby').style.display = room.status === 'lobby' ? 'block' : 'none';
        $('vocab-race-game').style.display = room.status === 'playing' ? 'block' : 'none';
        $('vocab-race-finish').style.display = room.status === 'finished' ? 'block' : 'none';
        if (room.status === 'lobby') renderLobby();
        else if (room.status === 'playing') renderGame();
        else renderFinish();
    }

    function renderLobby() {
        $('vocab-race-room-code').textContent = room.code;
        const host = room.host_user_id === (me && me.id);
        $('vocab-race-start-btn').style.display = host ? '' : 'none';
        $('vocab-race-start-btn').disabled = players.length < 2 || players.length > 4;
        $('vocab-race-lobby-hint').textContent = players.length < 2 ? 'Đang chờ thêm ít nhất 1 học viên...' : (host ? 'Đủ người. Có thể bắt đầu.' : 'Đang chờ chủ phòng bắt đầu.');
        const out = $('vocab-race-roster'); out.innerHTML = '';
        for (let slot = 1; slot <= 4; slot++) {
            const p = players.find(x => Number(x.slot) === slot);
            const el = document.createElement('div');
            el.className = 'vocab-race-roster-row' + (p && me && p.user_id === me.id ? ' is-me' : '');
            el.innerHTML = '<span class="vocab-race-roster-dot" style="--race-color:' + PLAYER_COLORS[slot-1] + '"></span><span><strong>' + (p ? esc(p.display_name || p.email || ('Học viên ' + slot)) : 'Chỗ trống') + '</strong><small>' + (p ? (p.user_id === room.host_user_id ? 'Chủ phòng' : 'Học viên ' + slot) : 'Đang chờ...') + '</small></span>' + (p && me && p.user_id === me.id ? '<b>Bạn</b>' : '');
            out.appendChild(el);
        }
    }

    function hideOthers() {
        const lr = room && room.last_result || {};
        return !!(me && String(lr.hide_user_id || '') === String(me.id) && Number(lr.hide_round) === Number(room.round_index));
    }

    function renderGame() {
        const q = currentQuestion();
        if (!q) return;
        $('vocab-race-round').textContent = (room.round_index + 1) + '/20';
        $('vocab-race-meaning').textContent = q.vi || '—';
        buildTrack(q);
        renderScores();
        renderEvent();
        updateControls();
        updateObstacleVisuals();
        updatePauseOverlay();
    }

    function buildTrack(q) {
        const track = $('vocab-race-track');
        track.innerHTML = '';
        const stealth = hideOthers();
        for (let lane = 0; lane < 5; lane++) {
            const laneEl = document.createElement('div');
            laneEl.className = 'vocab-race-lane';
            laneEl.dataset.lane = lane;

            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'vocab-race-option';
            option.textContent = (q.options || [])[lane] || '—';
            option.addEventListener('click', () => chooseLane(lane));

            const road = document.createElement('div');
            road.className = 'vocab-race-road';
            road.innerHTML = '<span class="vocab-race-road-flow"></span><span class="vocab-race-road-texture"></span>';

            const warning = document.createElement('div');
            warning.className = 'vocab-race-obstacle-warning';
            warning.innerHTML = '<span>⚠️</span><b>CHƯỚNG NGẠI VẬT<br><em>—</em></b>';

            const obstacle = document.createElement('div');
            obstacle.className = 'vocab-race-obstacle';
            obstacle.innerHTML = '<span>🚧</span>';

            laneEl.append(option, road, warning, obstacle);
            players.filter(p => Number(p.lane) === lane).forEach(p => {
                if (!stealth || (me && String(p.user_id) === String(me.id))) laneEl.appendChild(makeCar(p));
            });
            track.appendChild(laneEl);
        }
        players.filter(p => p.lane == null).forEach(p => {
            if (!stealth || (me && String(p.user_id) === String(me.id))) {
                const lane = track.querySelector('[data-lane="2"]');
                if (lane) lane.appendChild(makeCar(p));
            }
        });
    }

    function findRaceCar(userId) {
        const track = $('vocab-race-track');
        if (!track) return null;
        return Array.from(track.querySelectorAll('.vocab-race-car')).find(car =>
            String(car.dataset.user || '') === String(userId || '')
        ) || null;
    }

    function updateCarPresentation(car, p) {
        if (!car || !p) return;
        const mine = me && String(p.user_id) === String(me.id);
        const eliminated = isEliminated(p);
        car.className = 'vocab-race-car slot-' + p.slot
            + (mine ? ' is-me' : '')
            + (eliminated ? ' is-eliminated' : '')
            + (mine && charging && charging.round === room.round_index && nowMs() < charging.until ? ' is-charging' : '');
        car.style.setProperty('--race-color', PLAYER_COLORS[(Number(p.slot) || 1) - 1]);
        const timer = car.querySelector('.vocab-race-car-timer');
        if (timer) timer.textContent = eliminated ? 'LOẠI' : 'READY';
        const name = car.querySelector('.vocab-race-car-name');
        if (name) name.textContent = shortName(p.display_name || p.email || ('P' + p.slot));
    }

    function syncCarDom(p, animate) {
        if (!p || !room || room.status !== 'playing') return;
        const track = $('vocab-race-track');
        if (!track) return;

        const isMine = me && String(p.user_id) === String(me.id);
        if (hideOthers() && !isMine) {
            const hiddenCar = findRaceCar(p.user_id);
            if (hiddenCar) hiddenCar.remove();
            return;
        }

        const laneNo = Math.max(0, Math.min(4, Number(p.lane == null ? 2 : p.lane)));
        const targetLane = track.querySelector('.vocab-race-lane[data-lane="' + laneNo + '"]');
        if (!targetLane) return;

        let car = findRaceCar(p.user_id);
        if (!car) {
            car = makeCar(p);
            targetLane.appendChild(car);
            return;
        }

        updateCarPresentation(car, p);
        if (car.parentElement === targetLane) return;

        const before = car.getBoundingClientRect();
        targetLane.appendChild(car);

        if (!animate) return;
        const after = car.getBoundingClientRect();
        const dx = before.left - after.left;
        const dy = before.top - after.top;
        if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;

        const moveToken = String((Number(car.dataset.moveToken || 0) + 1));
        car.dataset.moveToken = moveToken;
        car.style.setProperty('transition', 'none', 'important');
        car.style.setProperty(
            'transform',
            'translate(calc(-50% + ' + dx.toFixed(2) + 'px), ' + dy.toFixed(2) + 'px)',
            'important'
        );
        void car.offsetWidth;

        requestAnimationFrame(() => {
            if (car.dataset.moveToken !== moveToken) return;
            car.style.setProperty('transition', 'transform .24s cubic-bezier(.22,.61,.36,1), bottom .72s cubic-bezier(.22,.61,.36,1), opacity .42s ease, filter .42s ease', 'important');
            car.style.setProperty('transform', 'translateX(-50%)', 'important');
            setTimeout(() => {
                if (car.dataset.moveToken !== moveToken) return;
                car.style.removeProperty('transition');
                car.style.removeProperty('transform');
            }, 280);
        });
    }

    function syncAllCarsDom(animate) {
        if (!room || room.status !== 'playing') return;
        players.forEach(p => syncCarDom(p, !!animate));

        const ids = new Set(players.map(p => String(p.user_id)));
        const track = $('vocab-race-track');
        if (track) {
            track.querySelectorAll('.vocab-race-car').forEach(car => {
                if (!ids.has(String(car.dataset.user || ''))) car.remove();
            });
        }
    }

    function makeCar(p) {
        const mine = me && String(p.user_id) === String(me.id);
        const eliminated = isEliminated(p);
        const car = document.createElement('div');
        car.dataset.user = p.user_id;
        car.className = 'vocab-race-car slot-' + p.slot + (mine ? ' is-me' : '') + (eliminated ? ' is-eliminated' : '') + (mine && charging && charging.round === room.round_index && nowMs() < charging.until ? ' is-charging' : '');
        car.style.setProperty('--race-color', PLAYER_COLORS[(Number(p.slot) || 1) - 1]);
        car.innerHTML = '<span class="vocab-race-car-timer">' + (eliminated ? 'LOẠI' : 'READY') + '</span><span class="vocab-race-car-body">🏎️</span><span class="vocab-race-car-name">' + esc(shortName(p.display_name || p.email || ('P' + p.slot))) + '</span>';
        return car;
    }

    function shortName(s) { s = String(s || ''); return s.length > 11 ? s.slice(0,10) + '…' : s; }

    function renderScores() {
        const host = $('vocab-race-score-strip'); host.innerHTML = '';
        players.slice().sort((a,b) => b.score-a.score || a.wrong_count-b.wrong_count || Number(a.total_activation_ms)-Number(b.total_activation_ms)).forEach((p,i) => {
            const el = document.createElement('div');
            el.className = 'vocab-race-mini-score' + (me && p.user_id === me.id ? ' is-me' : '') + (isEliminated(p) ? ' is-eliminated' : '');
            el.innerHTML = '<span style="--race-color:' + PLAYER_COLORS[(Number(p.slot)||1)-1] + '"></span><strong>#' + (i+1) + ' ' + esc(shortName(p.display_name || p.email)) + '</strong><b>' + p.score + 'đ</b><small>' + (isEliminated(p) ? 'Bị loại vòng này' : p.wrong_count + ' sai') + '</small>';
            host.appendChild(el);
        });
    }

    function renderEvent() {
        const box = $('vocab-race-event');
        const lr = room.last_result || {};
        let text = '🏁 Chọn làn đúng rồi bấm LAO LÊN ĂN TỪ.';
        let cls = '';
        if (lr.type === 'timeout_pause' && Number(lr.round) === Number(room.round_index)) { text = '⏱️ HẾT GIỜ — tạm dừng 6 giây trước vòng tiếp theo.'; cls = ' is-warn'; }
        else if (lr.type === 'correct') { const p = players.find(x => String(x.user_id) === String(lr.winner_user_id)); text = '✅ ' + (p ? (p.display_name || p.email) : 'Một xe') + ' ăn từ đầu tiên!'; cls = ' is-success'; }
        else if (lr.type === 'wrong') { text = '❌ Có xe chọn sai và bị loại vòng này.'; cls = ' is-warn'; }
        else if (lr.type === 'obstacle_hit') { text = '💥 VA CHẠM! Có xe đâm chướng ngại vật và bị loại.'; cls = ' is-danger'; }
        else if (lr.type === 'all_eliminated') { text = '↩️ Không còn xe trong vòng — sang từ tiếp theo.'; cls = ' is-warn'; }
        else if (lr.type === 'finished') text = '🏁 Trận đấu đã kết thúc.';
        box.textContent = text;
        box.className = 'vocab-race-event' + cls;
    }

    function renderFinish() {
        const ranking = room.last_result && Array.isArray(room.last_result.ranking)
            ? room.last_result.ranking
            : players.slice().sort((a,b) => b.score-a.score || a.wrong_count-b.wrong_count || Number(a.total_activation_ms)-Number(b.total_activation_ms));
        const host = $('vocab-race-ranking'); host.innerHTML = '';
        ranking.forEach((p,i) => {
            const el = document.createElement('div');
            el.className = 'vocab-race-rank-row rank-' + (i+1) + (me && String(p.user_id) === String(me.id) ? ' is-me' : '');
            el.innerHTML = '<span class="vocab-race-rank-no">' + (['🥇','🥈','🥉'][i] || '#'+(i+1)) + '</span><span><strong>' + esc(p.display_name || ('Học viên '+p.slot)) + '</strong><small>' + p.wrong_count + ' lần sai</small></span><b>' + p.score + ' điểm</b>';
            host.appendChild(el);
        });
        $('vocab-race-replay-btn').style.display = room.host_user_id === (me && me.id) ? '' : 'none';
    }

    async function chooseLane(lane) {
        const p = myPlayer();
        if (!p || !room || room.status !== 'playing' || isRoundPaused() || isEliminated(p) || claimPending) return;
        lane = Math.max(0, Math.min(4, Number(lane)));
        const oldLane = p.lane == null ? 2 : Number(p.lane);
        if (lane === oldLane) return;
        p.lane = lane;
        syncCarDom(p, true);
        updateControls();
        const { error } = await raceSb.rpc('vocab_race_set_lane', { p_room:room.id, p_lane:lane, p_round:Number(room.round_index) });
        if (error) {
            p.lane = oldLane;
            syncCarDom(p, true);
            updateControls();
            setStatus(translateError(error), 'error');
        }
    }

    async function steer(delta) {
        const p = myPlayer();
        if (!p || isRoundPaused() || isEliminated(p) || claimPending) return;
        const cur = p.lane == null ? 2 : Number(p.lane);
        await chooseLane(Math.max(0, Math.min(4, cur + delta)));
    }

    function updateControls() {
        const p = myPlayer();
        if (!p) return;
        const lane = p.lane == null ? 2 : Number(p.lane);
        const eliminated = isEliminated(p);
        const paused = isRoundPaused();
        $('vocab-race-own-lane').textContent = 'Làn ' + (lane + 1);
        $('vocab-race-left').disabled = paused || eliminated || claimPending || lane <= 0;
        $('vocab-race-right').disabled = paused || eliminated || claimPending || lane >= 4;
        $('vocab-race-eat').disabled = paused || eliminated || claimPending;
        $('vocab-race-action-hint').textContent = paused ? '⏱️ Vòng đang tạm dừng' : eliminated ? 'Bạn bị loại — chờ vòng sau' : claimPending ? '🚀 Đang lao lên...' : obstacleDangerText(lane) || '← Chọn làn → rồi bấm ĂN TỪ';
    }

    async function eatWord() {
        const p = myPlayer();
        if (!p || !room || room.status !== 'playing' || isRoundPaused() || isEliminated(p) || claimPending) return;
        const lane = p.lane == null ? 2 : Number(p.lane);
        const roundAtCall = Number(room.round_index);
        claimPending = true;
        charging = { round:roundAtCall, lane, until:nowMs()+700 };
        updateControls();
        const car = document.querySelector('#vocab-race-track .vocab-race-car.is-me');
        if (car) car.classList.add('is-charging');
        await sleep(430);
        if (!room || Number(room.round_index) !== roundAtCall || isRoundPaused()) { claimPending = false; charging = null; return; }
        const { error } = await raceSb.rpc('vocab_race_claim_lane', { p_room:room.id, p_lane:lane, p_round:roundAtCall });
        if (error && !/already_answered|round_timeout|game_not_playing|stale_round/i.test(String(error.message || ''))) setStatus(translateError(error), 'error');
        claimPending = false;
        charging = null;
        scheduleRefresh();
    }

    function baseSeed() {
        const n = parseInt(String(room && room.id || '').replace(/-/g, '').slice(0,8), 16);
        return Number.isFinite(n) ? n >>> 0 : 0;
    }

    function obstacleLanes(wave) {
        const seed = baseSeed();
        const round = Number(room && room.round_index || 0);
        const a = (seed + round * 7 + wave * 3) % 5;
        const offset = 1 + ((Math.floor(seed / 5) + round + wave) % 4);
        return [a, (a + offset) % 5];
    }

    function elapsedMs() {
        const t = Date.parse(room && room.round_started_at || '');
        return Number.isFinite(t) ? Math.max(0, nowMs() - t) : 0;
    }

    function obstacleState() {
        if (isRoundPaused()) return { warning:null, falling:null };
        const elapsed = elapsedMs();
        let warning = null;
        let falling = null;
        for (let wave = 1; wave <= MAX_OBSTACLE_WAVE; wave++) {
            const spawn = wave * OBSTACLE_SPAWN_MS;
            if (elapsed >= spawn - OBSTACLE_WARNING_MS && elapsed < spawn) warning = { wave, lanes:obstacleLanes(wave), remaining:spawn-elapsed };
            if (elapsed >= spawn && elapsed < spawn + OBSTACLE_FALL_MS) falling = { wave, lanes:obstacleLanes(wave), progress:(elapsed-spawn)/OBSTACLE_FALL_MS };
        }
        return { warning, falling };
    }

    function obstacleDangerText(lane) {
        const s = obstacleState();
        if (s.falling && s.falling.lanes.includes(lane)) return '🚧 NGUY HIỂM: chướng ngại vật đang rơi ở làn này!';
        if (s.warning && s.warning.lanes.includes(lane)) return '⚠️ Làn này có chướng ngại vật sau ' + (s.warning.remaining/1000).toFixed(1) + 's';
        return '';
    }

    function updateObstacleVisuals() {
        const track = $('vocab-race-track');
        if (!track) return;
        const s = obstacleState();
        track.querySelectorAll('.vocab-race-lane').forEach(el => {
            const lane = Number(el.dataset.lane);
            const warn = el.querySelector('.vocab-race-obstacle-warning');
            const obs = el.querySelector('.vocab-race-obstacle');
            el.classList.remove('is-obstacle-warning','is-obstacle-active');
            if (warn) warn.classList.remove('is-visible');
            if (obs) obs.classList.remove('is-visible');
            if (s.warning && s.warning.lanes.includes(lane)) {
                el.classList.add('is-obstacle-warning');
                if (warn) { warn.classList.add('is-visible'); const em = warn.querySelector('em'); if (em) em.textContent = (s.warning.remaining/1000).toFixed(1) + 's'; }
            }
            if (s.falling && s.falling.lanes.includes(lane)) {
                el.classList.add('is-obstacle-active');
                if (obs) {
                    obs.classList.add('is-visible');
                    const start = 138;
                    const end = Math.max(start + 100, el.clientHeight - 95);
                    obs.style.top = (start + Math.min(1, Math.max(0, s.falling.progress)) * (end - start)) + 'px';
                }
            }
        });
    }

    async function resolveObstacleImpacts() {
        if (!room || isRoundPaused()) return;
        const elapsed = elapsedMs();
        for (let wave = 1; wave <= MAX_OBSTACLE_WAVE; wave++) {
            if (elapsed < wave * OBSTACLE_SPAWN_MS + OBSTACLE_IMPACT_MS) continue;
            const key = room.id + ':' + room.round_index + ':' + wave;
            if (resolvedObstacleKeys.has(key)) continue;
            resolvedObstacleKeys.add(key);
            const { error } = await raceSb.rpc('vocab_race_resolve_obstacle', { p_room:room.id, p_round:Number(room.round_index), p_wave:wave });
            if (error && !/already_processed|game_not_playing|stale_round/i.test(String(error.message || ''))) {
                resolvedObstacleKeys.delete(key);
                setStatus(translateError(error), 'error');
            }
            scheduleRefresh();
        }
    }

    function updatePauseOverlay() {
        const overlay = $('vocab-race-pause-overlay');
        const count = $('vocab-race-pause-count');
        if (!overlay || !count) return;
        if (!isRoundPaused()) { overlay.style.display = 'none'; return; }
        overlay.style.display = 'grid';
        const sec = Math.max(0, Math.ceil(pauseRemainingMs() / 1000));
        count.textContent = String(sec);
    }

    function tick() {
        if (!room || room.status !== 'playing') return;
        if (Date.now() - lastClockSyncAt > 10000) syncServerClock(false);

        if (isRoundPaused()) {
            const clock = $('vocab-race-round-clock');
            if (clock) { clock.textContent = '0.0s'; clock.classList.add('is-danger'); }
            updatePauseOverlay();
            updateControls();
            updateObstacleVisuals();
            if (pauseRemainingMs() <= 0) advanceAfterPause();
            return;
        }

        updatePauseOverlay();
        const start = Date.parse(room.round_started_at || '');
        if (!Number.isFinite(start)) return;
        const remain = Math.max(0, ROUND_MS - (nowMs() - start));
        const clock = $('vocab-race-round-clock');
        if (clock) {
            clock.textContent = (remain/1000).toFixed(1) + 's';
            clock.classList.toggle('is-danger', remain <= 5000);
        }
        updateObstacleVisuals();
        updateControls();
        resolveObstacleImpacts();
        if (remain <= 0) resolveTimeout();
    }

    async function resolveTimeout() {
        if (timeoutPending || !room || isRoundPaused()) return;
        timeoutPending = true;
        const roomId = room.id;
        const { data, error } = await raceSb.rpc('vocab_race_resolve_timeout', { p_room:roomId });
        timeoutPending = false;
        if (error && !/game_not_playing/i.test(String(error.message || ''))) setStatus(translateError(error), 'error');
        if (data && (data.type === 'round_pause' || data.type === 'timeout_pause') && room && room.id === roomId) room.last_result = data;
        await syncServerClock(true);
        await refreshRoom(roomId);
    }

    async function advanceAfterPause() {
        if (advancePending || !room || !isRoundPaused()) return;
        advancePending = true;
        const roomId = room.id;
        const roundAtCall = Number(room.round_index);
        const { data, error } = await raceSb.rpc('vocab_race_advance_after_pause', { p_room:roomId, p_round:roundAtCall });
        advancePending = false;
        if (error && !/game_not_playing|stale_round/i.test(String(error.message || ''))) setStatus(translateError(error), 'error');
        if (data && data.type === 'too_early') return;
        await syncServerClock(true);
        await refreshRoom(roomId);
    }

    function startRoadAnimation() {
        if (roadAnimationStarted) return;
        roadAnimationStarted = true;
        function frame(ts) {
            const offset = (ts * 0.16) % 96;
            const texture = (ts * 0.24) % 36;
            document.querySelectorAll('.vocab-race-road-flow').forEach(el => {
                el.style.transform = 'translate3d(-50%,' + (offset - 96).toFixed(1) + 'px,0)';
            });
            document.querySelectorAll('.vocab-race-road-texture').forEach(el => {
                el.style.transform = 'translate3d(0,' + (texture - 36).toFixed(1) + 'px,0)';
            });
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    async function copyRoomCode() {
        if (!room) return;
        try { await navigator.clipboard.writeText(room.code); setStatus('Đã sao chép mã ' + room.code + '.', 'success'); }
        catch (_) { setStatus('Mã phòng: ' + room.code, 'info'); }
    }

    function translateError(err) {
        const raw = String((err && err.message) || err || '').toLowerCase();
        const map = {
            room_not_found:'Không tìm thấy phòng.', room_full:'Phòng đã đủ 4 người.', room_already_started:'Phòng đã bắt đầu.',
            need_2_to_4_players:'Cần 2–4 học viên.', host_only:'Chỉ chủ phòng được thao tác.', teacher_cannot_play:'Tài khoản giáo viên không tham gia.',
            stale_round:'Vòng đã chuyển, hãy thử lại.', already_answered:'Bạn đã bị loại hoặc đã hành động vòng này.', round_timeout:'Vòng đã hết thời gian.',
            lane_changed:'Xe vừa đổi làn, hãy thử lại.', not_in_room:'Bạn không còn ở trong phòng này.'
        };
        for (const k in map) if (raw.includes(k)) return map[k];
        if (raw.includes('does not exist') || raw.includes('schema cache')) return 'Database Đua xe từ vựng chưa đúng phiên bản.';
        return (err && err.message) ? err.message : 'Có lỗi xảy ra.';
    }
})();