/* LDD English — host end controller v12.
   Shares the core room snapshot and Supabase client; no independent REST reads,
   Auth client, room discovery or DOM-observer database polling. */
(function () {
    'use strict';
    if (window.__lddVocabRaceHostEndV12) return;
    window.__lddVocabRaceHostEndV12 = true;

    const $ = id => document.getElementById(id);
    let currentRoom = window.LDDVocabRaceRoomState || null;
    let ending = false;

    function ensureStyle() {
        if ($('ldd-vocab-race-v11-style')) return;
        const style = document.createElement('style');
        style.id = 'ldd-vocab-race-v11-style';
        style.textContent = [
            '.vocab-race-host-tools{display:flex;justify-content:flex-end;align-items:center;margin:8px 0 4px}',
            '.vocab-race-host-end-btn{border:1px solid rgba(220,38,38,.35);background:#fff1f2;color:#b91c1c;border-radius:10px;padding:9px 13px;font-weight:800;cursor:pointer;box-shadow:0 2px 8px rgba(185,28,28,.08)}',
            '.vocab-race-host-end-btn:hover{background:#ffe4e6}',
            '.vocab-race-host-end-btn:disabled{opacity:.55;cursor:not-allowed}',
            '@media(max-width:640px){.vocab-race-host-tools{justify-content:stretch}.vocab-race-host-end-btn{width:100%}}'
        ].join('');
        document.head.appendChild(style);
    }

    function ensureButton() {
        const game = $('vocab-race-game');
        if (!game) return null;
        let tools = $('vocab-race-host-tools');
        if (tools) return tools;
        tools = document.createElement('div');
        tools.id = 'vocab-race-host-tools';
        tools.className = 'vocab-race-host-tools';
        tools.style.display = 'none';
        tools.innerHTML = '<button type="button" id="vocab-race-host-end-btn" class="vocab-race-host-end-btn">⏹ Kết thúc trò chơi</button>';
        const hud = game.querySelector('.vocab-race-hud');
        if (hud) hud.insertAdjacentElement('afterend', tools);
        else game.insertBefore(tools, game.firstChild);
        $('vocab-race-host-end-btn').addEventListener('click', endGameNow);
        return tools;
    }

    function isActiveHost(state) {
        return !!(state && state.id && state.status === 'playing'
            && state.me_user_id && String(state.me_user_id) === String(state.host_user_id));
    }

    function isHostEnded(state) {
        if (!state || state.status !== 'finished') return false;
        const result = state.last_result || {};
        const event = result.round_result || result;
        return event.type === 'host_ended';
    }

    function refresh() {
        const tools = ensureButton();
        if (tools) tools.style.display = isActiveHost(currentRoom) && !ending ? 'flex' : 'none';
        const finish = $('vocab-race-finish');
        if (finish && currentRoom && currentRoom.status === 'finished') {
            const title = finish.querySelector('h3');
            if (title) title.textContent = isHostEnded(currentRoom)
                ? 'Chủ phòng đã kết thúc trò chơi'
                : 'Kết thúc 20 lượt';
        }
    }

    async function endGameNow() {
        const state = currentRoom;
        if (ending || !isActiveHost(state)) return;
        if (!window.confirm('Kết thúc trò chơi ngay bây giờ? Bảng xếp hạng hiện tại sẽ được chốt cho tất cả người chơi.')) return;
        const api = window.LDDVocabRaceAPI;
        if (!api || typeof api.endRoomHost !== 'function') {
            window.alert('Game chưa sẵn sàng. Vui lòng thử lại.');
            return;
        }
        ending = true;
        const btn = $('vocab-race-host-end-btn');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang kết thúc...'; }
        refresh();
        try {
            const { error } = await api.endRoomHost(state.id);
            if (error) throw error;
            // Server Realtime event updates every client; avoid an extra SELECT here.
        } catch (err) {
            console.error('[Vocab Race] Kết thúc phòng thất bại:', err);
            window.alert('Không thể kết thúc trò chơi lúc này. Hãy thử lại.');
        } finally {
            ending = false;
            if (btn) { btn.disabled = false; btn.textContent = '⏹ Kết thúc trò chơi'; }
            refresh();
        }
    }

    document.addEventListener('ldd:vocab-race-room', function (event) {
        currentRoom = event.detail || null;
        refresh();
    });

    function boot(attempt) {
        if (!$('vocab-race-game')) {
            if (attempt < 80) setTimeout(() => boot(attempt + 1), 125);
            return;
        }
        ensureStyle();
        currentRoom = window.LDDVocabRaceRoomState || currentRoom;
        refresh();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => boot(0));
    } else {
        boot(0);
    }

    window.LDDVocabRaceHostEnd = { version:'12.0', refresh };
})();
