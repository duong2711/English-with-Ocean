/* LDD English — shared game lifecycle v1
   Low-egress room presence for Lô tô + Đua xe:
   - pause when a real participant leaves the game/tab
   - 10 min partial-presence wait + 1 min confirmation
   - 5 min empty-room expiry
   - sparse 45s heartbeat only while the player is visibly inside the room
*/
(function () {
    'use strict';

    if (window.__LDDGameLifecycleV1) return;
    window.__LDDGameLifecycleV1 = true;

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const HEARTBEAT_MS = 45000;

    if (!window.supabase || !window.supabase.createClient) return;
    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    let currentUser = null;
    const contexts = {
        loto: {
            game: 'loto',
            roomKey: '1',
            panelId: 'loto-panel',
            state: null,
            participant: false,
            lastSentVisible: null,
            lastSentAt: 0,
            deadlineTimer: null
        },
        race: {
            game: 'race',
            roomKey: null,
            panelId: 'vocab-race-panel',
            state: null,
            participant: false,
            lastSentVisible: null,
            lastSentAt: 0,
            deadlineTimer: null
        }
    };

    function sameId(a, b) {
        return !!a && !!b && String(a) === String(b);
    }

    function isBotLotoId(id) {
        return id === '00000000-0000-4000-8000-000000000001' ||
               id === '00000000-0000-4000-8000-000000000002' ||
               id === '00000000-0000-4000-8000-000000000003';
    }

    function panelVisible(ctx) {
        if (document.hidden) return false;
        if (typeof document.hasFocus === 'function' && !document.hasFocus()) return false;
        const panel = document.getElementById(ctx.panelId);
        if (!panel || !panel.isConnected) return false;
        const style = window.getComputedStyle(panel);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        // getClientRects() also becomes empty when ANY ancestor tab/folder is display:none.
        // This catches moving from Giải trí to another LDD English tab even when the game
        // panel itself still has display:block.
        return panel.getClientRects().length > 0;
    }

    function shouldBeVisible(ctx) {
        return !!(currentUser && ctx.participant && ctx.roomKey && panelVisible(ctx));
    }

    function clearDeadlineTimer(ctx) {
        if (ctx.deadlineTimer) {
            clearTimeout(ctx.deadlineTimer);
            ctx.deadlineTimer = null;
        }
    }

    function parseTime(value) {
        const t = Date.parse(value || '');
        return Number.isFinite(t) ? t : 0;
    }

    function formatRemaining(ms) {
        ms = Math.max(0, ms || 0);
        const total = Math.ceil(ms / 1000);
        const m = Math.floor(total / 60);
        const s = total % 60;
        return m > 0 ? (m + ':' + String(s).padStart(2, '0')) : (s + ' giây');
    }

    function ensureStyles() {
        if (document.getElementById('ldd-game-lifecycle-style')) return;
        const style = document.createElement('style');
        style.id = 'ldd-game-lifecycle-style';
        style.textContent = [
            '.ldd-game-lifecycle-overlay{position:absolute;inset:0;z-index:9998;display:none;place-items:center;background:rgba(9,16,32,.72);backdrop-filter:blur(4px);padding:18px;pointer-events:auto}',
            '.ldd-game-lifecycle-card{width:min(520px,calc(100vw - 32px));background:#fff;border-radius:18px;padding:22px;box-shadow:0 22px 70px rgba(0,0,0,.28);text-align:center;color:#172033}',
            '.ldd-game-lifecycle-card h3{margin:0 0 8px;font-size:1.25rem}',
            '.ldd-game-lifecycle-card p{margin:0 0 12px;line-height:1.55}',
            '.ldd-game-lifecycle-clock{font-size:1.7rem;font-weight:900;margin:8px 0 14px;font-variant-numeric:tabular-nums}',
            '.ldd-game-lifecycle-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}',
            '.ldd-game-lifecycle-actions button{border:0;border-radius:12px;padding:11px 16px;font-weight:800;cursor:pointer}',
            '.ldd-game-lifecycle-keep{background:#2563eb;color:#fff}',
            '.ldd-game-lifecycle-close{background:#fee2e2;color:#991b1b}',
            '.ldd-game-lifecycle-note{font-size:.82rem;opacity:.7;margin-top:8px}',
            '#loto-panel,#vocab-race-panel{position:relative}',
            'body.ldd-game-lifecycle-block-keys .loto-panel input,body.ldd-game-lifecycle-block-keys .vocab-race-panel input{caret-color:transparent}'
        ].join('');
        document.head.appendChild(style);
    }

    function ensureOverlay(ctx) {
        ensureStyles();
        const panel = document.getElementById(ctx.panelId);
        if (!panel) return null;
        const id = 'ldd-game-lifecycle-overlay-' + ctx.game;
        let overlay = document.getElementById(id);
        if (overlay) return overlay;
        overlay = document.createElement('div');
        overlay.id = id;
        overlay.className = 'ldd-game-lifecycle-overlay';
        overlay.innerHTML =
            '<div class="ldd-game-lifecycle-card">' +
                '<h3 class="ldd-game-lifecycle-title">⏸ Trò chơi đang tạm dừng</h3>' +
                '<p class="ldd-game-lifecycle-text"></p>' +
                '<div class="ldd-game-lifecycle-clock">--</div>' +
                '<div class="ldd-game-lifecycle-actions" style="display:none">' +
                    '<button type="button" class="ldd-game-lifecycle-keep">Tiếp tục chờ</button>' +
                    '<button type="button" class="ldd-game-lifecycle-close">Đóng phòng</button>' +
                '</div>' +
                '<div class="ldd-game-lifecycle-note">Khi đủ người quay lại, ván chơi tiếp tục đúng thời điểm đã dừng.</div>' +
            '</div>';
        panel.appendChild(overlay);

        overlay.querySelector('.ldd-game-lifecycle-keep').addEventListener('click', async function () {
            const btn = this;
            btn.disabled = true;
            try {
                await touch(ctx, true, true);
                const { error } = await sb.rpc('game_lifecycle_keep_waiting', {
                    p_game_type: ctx.game,
                    p_room_key: String(ctx.roomKey)
                });
                if (error) throw error;
            } catch (e) {
                console.warn('[Game lifecycle] keep waiting failed:', e && e.message ? e.message : e);
            } finally {
                btn.disabled = false;
            }
        });

        overlay.querySelector('.ldd-game-lifecycle-close').addEventListener('click', async function () {
            const btn = this;
            btn.disabled = true;
            try {
                const { error } = await sb.rpc('game_lifecycle_close_now', {
                    p_game_type: ctx.game,
                    p_room_key: String(ctx.roomKey)
                });
                if (error) throw error;
            } catch (e) {
                console.warn('[Game lifecycle] close failed:', e && e.message ? e.message : e);
                btn.disabled = false;
            }
        });
        return overlay;
    }

    function lifecycleState(ctx) {
        return String(ctx.state && ctx.state.lifecycle_state || 'active');
    }

    function lifecycleDeadline(ctx) {
        const state = ctx.state || {};
        if (state.lifecycle_state === 'confirm_wait') return parseTime(state.lifecycle_confirm_deadline);
        return parseTime(state.lifecycle_deadline);
    }

    function scheduleDeadlinePulse(ctx) {
        clearDeadlineTimer(ctx);
        if (!ctx.participant || !ctx.roomKey || !shouldBeVisible(ctx)) return;
        const state = lifecycleState(ctx);
        if (state !== 'paused_one' && state !== 'confirm_wait') return;
        const at = lifecycleDeadline(ctx);
        if (!at) return;
        const wait = Math.max(250, at - Date.now() + 250);
        ctx.deadlineTimer = setTimeout(function () {
            ctx.deadlineTimer = null;
            touch(ctx, true, true);
        }, wait);
    }

    function renderOverlay(ctx) {
        const overlay = ensureOverlay(ctx);
        if (!overlay) return;
        const state = lifecycleState(ctx);
        const title = overlay.querySelector('.ldd-game-lifecycle-title');
        const text = overlay.querySelector('.ldd-game-lifecycle-text');
        const clock = overlay.querySelector('.ldd-game-lifecycle-clock');
        const actions = overlay.querySelector('.ldd-game-lifecycle-actions');

        if (!ctx.participant || state === 'active') {
            overlay.style.display = 'none';
            scheduleDeadlinePulse(ctx);
            return;
        }

        if (state === 'closed') {
            overlay.style.display = panelVisible(ctx) ? 'grid' : 'none';
            title.textContent = '🔒 Phòng đã đóng';
            text.textContent = 'Phòng đã được đóng do không còn hoạt động.';
            clock.textContent = '';
            actions.style.display = 'none';
            clearDeadlineTimer(ctx);
            return;
        }

        if (!panelVisible(ctx)) {
            overlay.style.display = 'none';
            scheduleDeadlinePulse(ctx);
            return;
        }

        overlay.style.display = 'grid';
        actions.style.display = state === 'confirm_wait' ? 'flex' : 'none';

        if (state === 'paused_empty') {
            title.textContent = '⏸ Tạm dừng — mọi người đã rời phòng';
            text.textContent = 'Nếu không ai quay lại, phòng sẽ tự đóng sau thời gian còn lại.';
        } else if (state === 'paused_one') {
            title.textContent = '⏸ Tạm dừng — đang chờ người chơi quay lại';
            text.textContent = 'Có người đã chuyển tab, đóng web, đăng xuất hoặc mất kết nối. Ván chơi được giữ nguyên.';
        } else if (state === 'confirm_wait') {
            title.textContent = '❓ Bạn còn muốn tiếp tục chờ không?';
            text.textContent = 'Nếu không có phản hồi trong 1 phút, phòng sẽ tự đóng.';
        } else {
            title.textContent = '⏸ Trò chơi đang tạm dừng';
            text.textContent = 'Đang chờ đồng bộ trạng thái phòng.';
        }

        const at = lifecycleDeadline(ctx);
        clock.textContent = at ? formatRemaining(at - Date.now()) : 'Đang chờ...';
        scheduleDeadlinePulse(ctx);
    }

    async function touch(ctx, visible, force) {
        if (!currentUser || !ctx.participant || !ctx.roomKey) return;
        const now = Date.now();
        if (!force && ctx.lastSentVisible === visible && now - ctx.lastSentAt < HEARTBEAT_MS - 3000) return;
        ctx.lastSentVisible = visible;
        ctx.lastSentAt = now;
        try {
            const { error } = await sb.rpc('game_presence_touch', {
                p_game_type: ctx.game,
                p_room_key: String(ctx.roomKey),
                p_visible: !!visible
            });
            if (error && !/not_participant/i.test(String(error.message || ''))) {
                console.warn('[Game lifecycle] presence update failed:', error.message || error);
            }
        } catch (_) {}
    }

    function applyLotoState(state) {
        const ctx = contexts.loto;
        ctx.state = state || null;
        window.LDDLotoState = state || null;
        const uid = currentUser && currentUser.id;
        ctx.participant = !!(uid && state && (
            (sameId(state.admin_id, uid) && !isBotLotoId(state.admin_id)) ||
            (sameId(state.player1_id, uid) && !isBotLotoId(state.player1_id)) ||
            (sameId(state.player2_id, uid) && !isBotLotoId(state.player2_id))
        ));
        if (!ctx.participant) {
            ctx.lastSentVisible = null;
            ctx.lastSentAt = 0;
            clearDeadlineTimer(ctx);
        }
        renderOverlay(ctx);
        if (ctx.participant) touch(ctx, shouldBeVisible(ctx), true);
    }

    function applyRaceState(state) {
        const ctx = contexts.race;
        const oldKey = ctx.roomKey;
        ctx.state = state || null;
        ctx.roomKey = state && state.id ? String(state.id) : null;
        ctx.participant = !!ctx.roomKey;
        if (oldKey !== ctx.roomKey) {
            ctx.lastSentVisible = null;
            ctx.lastSentAt = 0;
            clearDeadlineTimer(ctx);
        }
        renderOverlay(ctx);
        if (ctx.participant) touch(ctx, shouldBeVisible(ctx), true);
    }

    function syncVisibility(force) {
        [contexts.loto, contexts.race].forEach(function (ctx) {
            if (!ctx.participant || !ctx.roomKey) return;
            const visible = shouldBeVisible(ctx);
            touch(ctx, visible, !!force);
            renderOverlay(ctx);
        });
    }

    function markAllAway() {
        [contexts.loto, contexts.race].forEach(function (ctx) {
            if (ctx.participant && ctx.roomKey) touch(ctx, false, true);
        });
    }

    function bindStateEvents() {
        document.addEventListener('ldd:loto-state', function (e) {
            applyLotoState(e.detail || null);
        });
        document.addEventListener('ldd:vocab-race-room', function (e) {
            applyRaceState(e.detail || null);
        });

        if (window.LDDLotoState) applyLotoState(window.LDDLotoState);
        if (window.LDDVocabRaceRoomState) applyRaceState(window.LDDVocabRaceRoomState);
    }

    function bindVisibility() {
        document.addEventListener('visibilitychange', function () {
            syncVisibility(true);
        });
        window.addEventListener('blur', function () {
            syncVisibility(true);
        });
        window.addEventListener('focus', function () {
            syncVisibility(true);
        });

        window.addEventListener('pagehide', markAllAway, { capture: true });

        document.addEventListener('click', function (event) {
            const target = event.target && event.target.closest
                ? event.target.closest('#logout-btn, [data-action="logout"]')
                : null;
            if (target) markAllAway();
        }, true);

        // Internal navigation can hide a game panel without changing the browser tab.
        setInterval(function () {
            syncVisibility(false);
        }, 1000);

        // Sparse network heartbeat. No high-frequency database polling.
        setInterval(function () {
            [contexts.loto, contexts.race].forEach(function (ctx) {
                if (shouldBeVisible(ctx)) touch(ctx, true, true);
            });
        }, HEARTBEAT_MS);

        setInterval(function () {
            renderOverlay(contexts.loto);
            renderOverlay(contexts.race);
        }, 1000);

        document.addEventListener('keydown', function (event) {
            const blocked = [contexts.loto, contexts.race].some(function (ctx) {
                const state = lifecycleState(ctx);
                return ctx.participant && panelVisible(ctx) && state !== 'active' && state !== 'closed';
            });
            if (!blocked) return;
            const target = event.target;
            if (target && target.closest && target.closest('.ldd-game-lifecycle-overlay')) return;
            event.preventDefault();
            event.stopPropagation();
        }, true);
    }

    async function boot() {
        ensureStyles();
        const { data } = await sb.auth.getSession();
        currentUser = data && data.session && data.session.user ? data.session.user : null;
        bindStateEvents();
        bindVisibility();

        sb.auth.onAuthStateChange(function (event, nextSession) {
            if (event === 'SIGNED_OUT') markAllAway();
            currentUser = nextSession && nextSession.user ? nextSession.user : null;
            if (!currentUser) {
                contexts.loto.participant = false;
                contexts.race.participant = false;
                renderOverlay(contexts.loto);
                renderOverlay(contexts.race);
            } else {
                if (window.LDDLotoState) applyLotoState(window.LDDLotoState);
                if (window.LDDVocabRaceRoomState) applyRaceState(window.LDDVocabRaceRoomState);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }

    window.LDDGameLifecycle = {
        version: '1.0',
        refresh: function () { syncVisibility(true); },
        markAllAway: markAllAway
    };
})();