/* LDD English — Vocab Race v11: host can end an active race immediately. */
(function () {
    'use strict';

    if (window.__lddVocabRaceHostEndV11) return;
    window.__lddVocabRaceHostEndV11 = true;

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    if (!window.supabase || !window.supabase.createClient) return;

    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let currentHostRoomId = null;
    let ending = false;
    let refreshPending = false;
    let lastFinishedRoomId = null;

    function $(id) { return document.getElementById(id); }

    function installStyle() {
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
        if (!tools) {
            tools = document.createElement('div');
            tools.id = 'vocab-race-host-tools';
            tools.className = 'vocab-race-host-tools';
            tools.style.display = 'none';
            tools.innerHTML = '<button type="button" id="vocab-race-host-end-btn" class="vocab-race-host-end-btn">⏹ Kết thúc trò chơi</button>';
            const hud = game.querySelector('.vocab-race-hud');
            if (hud && hud.parentNode) hud.insertAdjacentElement('afterend', tools);
            else game.insertBefore(tools, game.firstChild);
            const btn = $('vocab-race-host-end-btn');
            if (btn) btn.addEventListener('click', endGameNow);
        }
        return tools;
    }

    function gameVisible() {
        const game = $('vocab-race-game');
        return !!(game && game.style.display !== 'none' && getComputedStyle(game).display !== 'none');
    }

    async function getUser() {
        const { data } = await sb.auth.getSession();
        return data && data.session && data.session.user ? data.session.user : null;
    }

    async function resolveHostRoom() {
        const user = await getUser();
        if (!user) return null;
        const { data, error } = await sb.from('vocab_race_rooms')
            .select('id,status,host_user_id,created_at')
            .eq('host_user_id', user.id)
            .eq('status', 'playing')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
        if (error) throw error;
        return data || null;
    }

    async function refreshHostControl() {
        if (refreshPending) return;
        refreshPending = true;
        try {
            installStyle();
            const tools = ensureButton();
            if (!tools) return;
            if (!gameVisible()) {
                tools.style.display = 'none';
                currentHostRoomId = null;
                return;
            }
            const room = await resolveHostRoom();
            currentHostRoomId = room && room.id ? room.id : null;
            tools.style.display = currentHostRoomId ? 'flex' : 'none';
            const btn = $('vocab-race-host-end-btn');
            if (btn && !ending) {
                btn.disabled = false;
                btn.textContent = '⏹ Kết thúc trò chơi';
            }
        } catch (err) {
            console.warn('[Vocab Race] Không xác định được quyền kết thúc phòng:', err && err.message ? err.message : err);
        } finally {
            refreshPending = false;
        }
    }

    async function endGameNow() {
        if (ending) return;
        if (!currentHostRoomId) {
            await refreshHostControl();
            if (!currentHostRoomId) return;
        }

        const ok = window.confirm('Kết thúc trò chơi ngay bây giờ? Bảng xếp hạng hiện tại sẽ được chốt cho tất cả người chơi.');
        if (!ok) return;

        const btn = $('vocab-race-host-end-btn');
        ending = true;
        if (btn) {
            btn.disabled = true;
            btn.textContent = '⏳ Đang kết thúc...';
        }

        try {
            const roomId = currentHostRoomId;
            const { error } = await sb.rpc('vocab_race_end_room_host', { p_room: roomId });
            if (error) throw error;
            lastFinishedRoomId = roomId;
            currentHostRoomId = null;
            const tools = $('vocab-race-host-tools');
            if (tools) tools.style.display = 'none';
            markHostEndedHeading();
        } catch (err) {
            console.error('[Vocab Race] Kết thúc phòng thất bại:', err);
            window.alert('Không thể kết thúc trò chơi lúc này. Hãy thử lại.');
            if (btn) {
                btn.disabled = false;
                btn.textContent = '⏹ Kết thúc trò chơi';
            }
        } finally {
            ending = false;
        }
    }

    function markHostEndedHeading() {
        const finish = $('vocab-race-finish');
        if (!finish) return;
        const title = finish.querySelector('h3');
        if (title) title.textContent = 'Chủ phòng đã kết thúc trò chơi';
    }

    async function updateFinishedHeadingForAnyPlayer() {
        const finish = $('vocab-race-finish');
        if (!finish || finish.style.display === 'none' || getComputedStyle(finish).display === 'none') return;
        if (lastFinishedRoomId) {
            markHostEndedHeading();
            return;
        }
        try {
            const user = await getUser();
            if (!user) return;
            const { data: memberships, error: pe } = await sb.from('vocab_race_players')
                .select('room_id,joined_at')
                .eq('user_id', user.id)
                .order('joined_at', { ascending: false })
                .limit(8);
            if (pe || !memberships || !memberships.length) return;
            const ids = memberships.map(function (x) { return x.room_id; }).filter(Boolean);
            const { data: rooms, error: re } = await sb.from('vocab_race_rooms')
                .select('id,status,last_result,ended_at')
                .in('id', ids)
                .eq('status', 'finished')
                .order('ended_at', { ascending: false })
                .limit(1);
            if (re || !rooms || !rooms.length) return;
            const result = rooms[0].last_result || {};
            const roundResult = result.round_result || {};
            if (roundResult.type === 'host_ended') {
                lastFinishedRoomId = rooms[0].id;
                markHostEndedHeading();
            }
        } catch (_) {}
    }

    function bindObservers() {
        const game = $('vocab-race-game');
        const finish = $('vocab-race-finish');
        if (game) {
            new MutationObserver(function () {
                setTimeout(refreshHostControl, 40);
            }).observe(game, { attributes: true, attributeFilter: ['style', 'class'] });
        }
        if (finish) {
            new MutationObserver(function () {
                setTimeout(updateFinishedHeadingForAnyPlayer, 60);
            }).observe(finish, { attributes: true, attributeFilter: ['style', 'class'] });
        }
    }

    function boot(attempt) {
        attempt = attempt || 0;
        if (!$('vocab-race-game')) {
            if (attempt < 80) setTimeout(function () { boot(attempt + 1); }, 125);
            return;
        }
        installStyle();
        ensureButton();
        bindObservers();
        refreshHostControl();
        updateFinishedHeadingForAnyPlayer();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(0); });
    else boot(0);

    window.LDDVocabRaceHostEnd = {
        version: '11.0',
        refresh: refreshHostControl
    };
})();
