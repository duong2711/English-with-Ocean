/* =============================================================
   LDD ENGLISH — VOCAB RACE v1
   Đua xe từ vựng Real-time Multiplayer 2–4 học viên / 20 lượt.
   Nguồn câu hỏi: window.kidTopicsAPI (mục Vận dụng).
   Requires: vocab_race_setup.sql
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYXNlIiwicmVmIjoieXdxYmFrc21tdHZ3Ym9qY2dzZGQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4MjE2Nzc1MCwiZXhwIjoyMDk3NzQzNzUwfQ.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const TEACHER_EMAIL = 'lddbaiu@gmail.com';
    const ROUND_SECONDS = 20;
    const HOLD_MS = 6000;
    const PLAYER_COLORS = ['#4f6ef7', '#ef4444', '#10b981', '#f59e0b'];

    if (!window.supabase || !window.supabase.createClient) return;
    const raceSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    let session = null;
    let me = null;
    let room = null;
    let players = [];
    let claims = [];
    let roomChannel = null;
    let playerChannel = null;
    let claimChannel = null;
    let tickHandle = null;
    let claimPending = false;
    let timeoutPending = false;
    let blockedLaneKey = '';
    let refreshTimer = null;
    let lastResultKey = '';

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
            name: display && display !== 'Học viên' ? display : (user.user_metadata && (user.user_metadata.display_name || user.user_metadata.full_name || user.user_metadata.name)) || String(user.email || '').split('@')[0] || 'Học viên'
        };
    }

    function ensureGameUI() {
        const tab = $('tab-giai-tri');
        const grid = $('entertainment-folder-grid');
        if (!tab || !grid || $('vocab-race-folder-card')) return;

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
                <div><h3>🏎️ Đua xe từ vựng</h3><p>Giữ đúng làn 6 giây để ăn từ. Mỗi trận đúng 20 lượt.</p></div>
            </div>

            <div id="vocab-race-status" class="vocab-race-status"></div>

            <div id="vocab-race-entry" class="vocab-race-entry">
                <div class="vocab-race-entry-card vocab-race-create-card">
                    <span class="vocab-race-entry-icon">🏁</span>
                    <h4>Tạo phòng mới</h4>
                    <p>Hệ thống lấy ngẫu nhiên 20 từ từ mục <b>Vận dụng</b>.</p>
                    <button type="button" id="vocab-race-create-btn" class="vocab-race-primary">Tạo phòng</button>
                </div>
                <div class="vocab-race-entry-card">
                    <span class="vocab-race-entry-icon">🔑</span>
                    <h4>Vào phòng</h4>
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
                    <div class="vocab-race-control-center"><strong id="vocab-race-own-lane">Làn 3</strong><small id="vocab-race-hold-hint">Giữ làn 6.0s</small></div>
                    <button type="button" id="vocab-race-right" class="vocab-race-steer" aria-label="Rẽ phải">→<span>Phải</span></button>
                </div>
                <div id="vocab-race-score-strip" class="vocab-race-score-strip"></div>
            </div>

            <div id="vocab-race-finish" class="vocab-race-finish" style="display:none;">
                <div class="vocab-race-trophy">🏆</div>
                <h3>Kết thúc 20 lượt</h3>
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
        document.addEventListener('keydown', e => {
            if (!$('vocab-race-panel') || $('vocab-race-panel').style.display === 'none' || !room || room.status !== 'playing') return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); steer(-1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); steer(1); }
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
        for (let i=0;i<30;i++) {
            if (window.kidTopicsAPI && typeof window.kidTopicsAPI.getTopics === 'function') return true;
            await sleep(120);
        }
        return false;
    }

    function shuffle(arr) {
        const a = arr.slice();
        for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
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
        const picked = shuffle(pool).slice(0,20);
        return picked.map((word, idx) => {
            const distractors = shuffle(pool.filter(x => x.en.toLowerCase() !== word.en.toLowerCase())).slice(0,4);
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
        } catch (err) {
            setStatus(translateError(err), 'error');
        } finally { btn.disabled = false; }
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
        const { data, error } = await raceSb.from('vocab_race_players').select('room_id,joined_at').eq('user_id',me.id).order('joined_at',{ascending:false}).limit(4);
        if (error || !data || !data.length) return;
        for (const p of data) {
            const { data: r } = await raceSb.from('vocab_race_rooms').select('*').eq('id',p.room_id).maybeSingle();
            if (r && (r.status === 'lobby' || r.status === 'playing' || r.status === 'finished')) { await attachRoom(r.id); return; }
        }
    }

    async function attachRoom(roomId) {
        unsubscribe();
        room = room && room.id === roomId ? room : null;
        roomChannel = raceSb.channel('vocab-race-room-' + roomId)
            .on('postgres_changes',{event:'*',schema:'public',table:'vocab_race_rooms',filter:'id=eq.'+roomId},scheduleRefresh)
            .subscribe();
        playerChannel = raceSb.channel('vocab-race-players-' + roomId)
            .on('postgres_changes',{event:'*',schema:'public',table:'vocab_race_players',filter:'room_id=eq.'+roomId},scheduleRefresh)
            .subscribe();
        claimChannel = raceSb.channel('vocab-race-claims-' + roomId)
            .on('postgres_changes',{event:'*',schema:'public',table:'vocab_race_lane_claims',filter:'room_id=eq.'+roomId},scheduleRefresh)
            .subscribe();
        if (!tickHandle) tickHandle = setInterval(tick,100);
        await refreshRoom(roomId);
    }

    function scheduleRefresh() {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => room && refreshRoom(room.id), 45);
    }

    async function refreshRoom(roomId) {
        const [r1,r2,r3] = await Promise.all([
            raceSb.from('vocab_race_rooms').select('*').eq('id',roomId).maybeSingle(),
            raceSb.from('vocab_race_players').select('*').eq('room_id',roomId).order('slot',{ascending:true}),
            raceSb.from('vocab_race_lane_claims').select('*').eq('room_id',roomId).order('claimed_at',{ascending:false}).limit(12)
        ]);
        if (!r1.data) { leaveLocalRoom(); return; }
        const oldRound = room && room.round_index;
        room = r1.data;
        players = r2.data || [];
        claims = r3.data || [];
        if (oldRound !== room.round_index) { claimPending=false; timeoutPending=false; blockedLaneKey=''; }
        render();
    }

    async function startRoom() {
        if (!room) return;
        const btn = $('vocab-race-start-btn'); btn.disabled = true;
        const { error } = await raceSb.rpc('vocab_race_start_room',{p_room:room.id});
        btn.disabled = false;
        if (error) setStatus(translateError(error),'error'); else { setStatus('', 'neutral'); await refreshRoom(room.id); }
    }

    async function replayRoom() {
        if (!room || room.host_user_id !== (me && me.id)) return;
        await raceSb.rpc('vocab_race_reset_room',{p_room:room.id});
        await refreshRoom(room.id);
    }

    async function leaveRoom() {
        if (!room) { leaveLocalRoom(); return; }
        if (room.status === 'playing') { setStatus('Không thể rời phòng khi trận đang diễn ra.', 'error'); return; }
        const id=room.id;
        const { error } = await raceSb.rpc('vocab_race_leave_room',{p_room:id});
        if (error) { setStatus(translateError(error),'error'); return; }
        leaveLocalRoom();
    }

    function leaveLocalRoom() {
        unsubscribe(); room=null; players=[]; claims=[]; claimPending=false; timeoutPending=false; blockedLaneKey='';
        $('vocab-race-entry').style.display = me && me.email !== TEACHER_EMAIL ? 'grid' : 'none';
        $('vocab-race-lobby').style.display='none'; $('vocab-race-game').style.display='none'; $('vocab-race-finish').style.display='none';
        if (me && me.email !== TEACHER_EMAIL) setStatus('Tạo phòng mới hoặc nhập mã phòng để tham gia.','neutral');
    }

    function unsubscribe() {
        [roomChannel,playerChannel,claimChannel].forEach(ch => { if (ch) try { raceSb.removeChannel(ch); } catch(e){} });
        roomChannel=playerChannel=claimChannel=null;
    }

    function myPlayer() { return players.find(p => me && String(p.user_id)===String(me.id)) || null; }

    function render() {
        if (!room) return;
        $('vocab-race-entry').style.display='none';
        $('vocab-race-lobby').style.display = room.status==='lobby' ? 'block':'none';
        $('vocab-race-game').style.display = room.status==='playing' ? 'block':'none';
        $('vocab-race-finish').style.display = room.status==='finished' ? 'block':'none';
        if (room.status==='lobby') renderLobby();
        if (room.status==='playing') renderGame();
        if (room.status==='finished') renderFinish();
    }

    function renderLobby() {
        $('vocab-race-room-code').textContent = room.code;
        const host = room.host_user_id === (me && me.id);
        $('vocab-race-start-btn').style.display = host ? '' : 'none';
        $('vocab-race-start-btn').disabled = players.length<2 || players.length>4;
        $('vocab-race-lobby-hint').textContent = players.length<2 ? 'Đang chờ thêm ít nhất 1 học viên...' : (host ? 'Đủ người. Bạn có thể bắt đầu.' : 'Đang chờ chủ phòng bắt đầu.');
        const hostEl=$('vocab-race-roster'); hostEl.innerHTML='';
        for(let slot=1;slot<=4;slot++) {
            const p=players.find(x=>Number(x.slot)===slot);
            const row=document.createElement('div'); row.className='vocab-race-roster-row'+(p&&me&&p.user_id===me.id?' is-me':'');
            row.innerHTML='<span class="vocab-race-roster-dot" style="--race-color:'+PLAYER_COLORS[slot-1]+'"></span><span><strong>'+(p?esc(p.display_name||p.email||('Học viên '+slot)):'Chỗ trống')+'</strong><small>'+(p?(p.user_id===room.host_user_id?'Chủ phòng':'Học viên '+slot):'Đang chờ...')+'</small></span>'+(p&&me&&p.user_id===me.id?'<b>Bạn</b>':'');
            hostEl.appendChild(row);
        }
    }

    function currentQuestion() {
        const list = Array.isArray(room.questions) ? room.questions : [];
        return list[room.round_index] || null;
    }

    function renderGame() {
        const q=currentQuestion(); if(!q) return;
        $('vocab-race-round').textContent=(room.round_index+1)+'/20';
        $('vocab-race-meaning').textContent=q.vi || '—';
        buildTrack(q);
        renderScoreStrip();
        updateOwnControls();
        renderEvent();
    }

    function buildTrack(q) {
        const track=$('vocab-race-track'); track.innerHTML='';
        for(let lane=0;lane<5;lane++) {
            const laneEl=document.createElement('div'); laneEl.className='vocab-race-lane'; laneEl.dataset.lane=lane;
            const option=document.createElement('div'); option.className='vocab-race-option'; option.textContent=(q.options||[])[lane]||'—';
            option.addEventListener('click',()=>chooseLane(lane));
            laneEl.appendChild(option);
            const road=document.createElement('div'); road.className='vocab-race-road'; laneEl.appendChild(road);
            players.filter(p=>Number(p.lane)===lane).forEach(p=> laneEl.appendChild(makeCar(p,lane)));
            track.appendChild(laneEl);
        }
        // Xe chưa có lane (hiếm khi vừa chuyển vòng) hiện ở làn giữa để không biến mất.
        players.filter(p=>p.lane===null||p.lane===undefined).forEach(p=>{
            const laneEl=track.querySelector('[data-lane="2"]'); if(laneEl) laneEl.appendChild(makeCar(p,2));
        });
    }

    function makeCar(p,lane) {
        const car=document.createElement('div');
        const mine=me&&p.user_id===me.id;
        const answered=Number(p.answered_round)===Number(room.round_index);
        car.className='vocab-race-car slot-'+p.slot+(mine?' is-me':'')+(answered?' is-answered':'');
        car.style.setProperty('--race-color',PLAYER_COLORS[(Number(p.slot)||1)-1]);
        car.dataset.user=p.user_id;
        const hold=holdRemaining(p);
        car.innerHTML='<span class="vocab-race-car-timer">'+(answered?'✓':hold>0?(hold/1000).toFixed(1)+'s':'GO')+'</span><span class="vocab-race-car-body">🏎️</span><span class="vocab-race-car-name">'+esc(shortName(p.display_name||p.email||('P'+p.slot)))+'</span>';
        const lr=room.last_result||{};
        const at=Date.parse(lr.at||'');
        if(Number.isFinite(at)&&Date.now()-at<1600&&lr.type==='correct'&&String(lr.winner_user_id)!==String(p.user_id)) car.classList.add('is-retreating');
        return car;
    }

    function shortName(s) { s=String(s||''); return s.length>11?s.slice(0,10)+'…':s; }

    function renderScoreStrip() {
        const host=$('vocab-race-score-strip'); host.innerHTML='';
        players.slice().sort((a,b)=>b.score-a.score||a.wrong_count-b.wrong_count||Number(a.total_activation_ms)-Number(b.total_activation_ms)).forEach((p,i)=>{
            const el=document.createElement('div'); el.className='vocab-race-mini-score'+(me&&p.user_id===me.id?' is-me':'');
            el.innerHTML='<span style="--race-color:'+PLAYER_COLORS[(Number(p.slot)||1)-1]+'"></span><strong>#'+(i+1)+' '+esc(shortName(p.display_name||p.email))+'</strong><b>'+p.score+'đ</b><small>'+p.wrong_count+' sai</small>';
            host.appendChild(el);
        });
    }

    function renderEvent() {
        const box=$('vocab-race-event'); const lr=room.last_result||{}; const key=JSON.stringify(lr);
        if(!lr.type){ box.textContent=room.collision_enabled?'💥 Hút xe đang bật ở vòng này.':'🛡️ Vòng này chưa kích hoạt hút xe.'; box.className='vocab-race-event'; return; }
        let text='';
        if(lr.type==='correct') {
            const p=players.find(x=>String(x.user_id)===String(lr.winner_user_id));
            text='✅ '+(p?(p.display_name||p.email):'Một xe')+' ăn đúng đầu tiên!';
        } else if(lr.type==='all_wrong') text='↩️ Tất cả chọn sai — xe đã được xếp lại cùng hàng, vòng mới tắt hút.';
        else if(lr.type==='finished') text='🏁 Trận đấu đã kết thúc.';
        box.textContent=text; box.className='vocab-race-event '+(lr.type==='correct'?'is-success':lr.type==='all_wrong'?'is-warn':'');
        if(key!==lastResultKey){lastResultKey=key;}
        const recentCollision=claims.find(c=>c.collision_victim && Date.now()-Date.parse(c.claimed_at)<1800);
        if(recentCollision){const victim=players.find(x=>String(x.user_id)===String(recentCollision.collision_victim));box.textContent='💥 HÚT XE! '+(victim?(victim.display_name||victim.email):'Đối thủ')+' bị văng và -1 điểm chăm chỉ.';box.className='vocab-race-event is-danger';}
    }

    function renderFinish() {
        const ranking=(room.last_result&&Array.isArray(room.last_result.ranking))?room.last_result.ranking:players.slice().sort((a,b)=>b.score-a.score||a.wrong_count-b.wrong_count||Number(a.total_activation_ms)-Number(b.total_activation_ms));
        const host=$('vocab-race-ranking'); host.innerHTML='';
        ranking.forEach((p,i)=>{
            const el=document.createElement('div'); el.className='vocab-race-rank-row rank-'+(i+1)+(me&&String(p.user_id)===String(me.id)?' is-me':'');
            el.innerHTML='<span class="vocab-race-rank-no">'+(['🥇','🥈','🥉'][i]||('#'+(i+1)))+'</span><span><strong>'+esc(p.display_name||('Học viên '+p.slot))+(me&&String(p.user_id)===String(me.id)?' (Bạn)':'')+'</strong><small>'+p.wrong_count+' lần sai · '+Math.round(Number(p.total_activation_ms||0))+' ms kích hoạt</small></span><b>'+p.score+' điểm</b>';
            host.appendChild(el);
        });
        const hostMe=room.host_user_id===(me&&me.id); $('vocab-race-replay-btn').style.display=hostMe?'':'none';
    }

    function holdRemaining(p) {
        if(!p||!p.lane_entered_at||Number(p.answered_round)===Number(room.round_index)) return 0;
        return Math.max(0,HOLD_MS-(Date.now()-Date.parse(p.lane_entered_at)));
    }

    function updateOwnControls() {
        const p=myPlayer(); if(!p)return;
        const lane=(p.lane===null||p.lane===undefined)?2:Number(p.lane);
        $('vocab-race-own-lane').textContent='Làn '+(lane+1);
        const answered=Number(p.answered_round)===Number(room.round_index);
        const rem=holdRemaining(p);
        const key=room.round_index+':'+lane;
        $('vocab-race-hold-hint').textContent=answered?'Đã ăn từ ở lượt này':(blockedLaneKey===key?'Làn này đã bị chiếm — hãy đổi làn':rem>0?'Giữ làn '+(rem/1000).toFixed(1)+'s':'Đang lao lên ăn từ...');
        $('vocab-race-left').disabled=answered||lane<=0;
        $('vocab-race-right').disabled=answered||lane>=4;
    }

    async function chooseLane(lane) {
        const p=myPlayer(); if(!room||room.status!=='playing'||!p||Number(p.answered_round)===Number(room.round_index))return;
        lane=Math.max(0,Math.min(4,Number(lane)));
        if(Number(p.lane)===lane)return;
        blockedLaneKey=''; claimPending=false;
        const {error}=await raceSb.rpc('vocab_race_set_lane',{p_room:room.id,p_lane:lane});
        if(error)setStatus(translateError(error),'error');
        else scheduleRefresh();
    }

    async function steer(delta) {
        const p=myPlayer(); if(!p||!room||room.status!=='playing')return;
        const cur=(p.lane===null||p.lane===undefined)?2:Number(p.lane);
        const next=Math.max(0,Math.min(4,cur+delta));
        if(next===cur)return;
        await chooseLane(next);
    }

    function tick() {
        if(!room||room.status!=='playing')return;
        const start=Date.parse(room.round_started_at||''); if(!Number.isFinite(start))return;
        const remain=Math.max(0,ROUND_SECONDS*1000-(Date.now()-start));
        const clock=$('vocab-race-round-clock'); if(clock){clock.textContent=(remain/1000).toFixed(1)+'s';clock.classList.toggle('is-danger',remain<=5000);}
        updateCarTimers(); updateOwnControls();
        const p=myPlayer();
        if(remain<=0){resolveTimeout();return;}
        if(!p||Number(p.answered_round)===Number(room.round_index)||p.lane===null||p.lane===undefined)return;
        const rem=holdRemaining(p), key=room.round_index+':'+p.lane;
        if(rem<=0&&!claimPending&&blockedLaneKey!==key)claimLane(Number(p.lane));
    }

    function updateCarTimers() {
        document.querySelectorAll('#vocab-race-track .vocab-race-car').forEach(car=>{
            const p=players.find(x=>String(x.user_id)===String(car.dataset.user)); if(!p)return;
            const el=car.querySelector('.vocab-race-car-timer'); if(!el)return;
            if(Number(p.answered_round)===Number(room.round_index))el.textContent='✓';
            else {const r=holdRemaining(p);el.textContent=r>0?(r/1000).toFixed(1)+'s':'GO';}
        });
    }

    async function claimLane(lane) {
        claimPending=true;
        const roundAtCall=room&&room.round_index;
        const {error}=await raceSb.rpc('vocab_race_claim_lane',{p_room:room.id,p_lane:lane});
        if(error){
            const msg=String(error.message||'');
            if(msg.includes('lane_taken')){blockedLaneKey=roundAtCall+':'+lane;setStatus('Làn '+(lane+1)+' đã có xe ăn trước. Hãy đổi làn!','error');}
            else if(!msg.includes('already_answered')&&!msg.includes('round_timeout')&&!msg.includes('game_not_playing'))setStatus(translateError(error),'error');
        } else setStatus('', 'neutral');
        claimPending=false; scheduleRefresh();
    }

    async function resolveTimeout() {
        if(timeoutPending||!room)return; timeoutPending=true;
        await raceSb.rpc('vocab_race_resolve_timeout',{p_room:room.id});
        timeoutPending=false; scheduleRefresh();
    }

    async function copyRoomCode() {
        if(!room)return;
        try{await navigator.clipboard.writeText(room.code);setStatus('Đã sao chép mã phòng '+room.code+'.','success');}
        catch(e){setStatus('Mã phòng: '+room.code,'info');}
    }

    function translateError(err) {
        const raw=String((err&&err.message)||err||'').toLowerCase();
        const map={
            'room_not_found':'Không tìm thấy phòng này.',
            'room_full':'Phòng đã đủ 4 người.',
            'room_already_started':'Phòng đã bắt đầu.',
            'need_2_to_4_players':'Cần từ 2 đến 4 học viên.',
            'host_only':'Chỉ chủ phòng được thao tác.',
            'teacher_cannot_play':'Tài khoản giáo viên không tham gia trò chơi.',
            'need_exactly_20_questions':'Nguồn Vận dụng phải tạo đủ đúng 20 câu.',
            'cannot_leave_during_game':'Không thể rời phòng khi trận đang diễn ra.',
            'hold_not_finished':'Bạn phải giữ làn đủ 6 giây.',
            'lane_taken':'Làn này đã có xe ăn trước.',
            'game_not_playing':'Ván chơi chưa bắt đầu hoặc đã kết thúc.'
        };
        for(const k in map)if(raw.includes(k))return map[k];
        if(raw.includes('vocab_race')||raw.includes('does not exist')||raw.includes('schema cache'))return 'Chưa cài database cho Đua xe từ vựng. Hãy chạy file vocab_race_setup.sql trong Supabase SQL Editor.';
        return (err&&err.message)?err.message:'Có lỗi xảy ra.';
    }
})();
