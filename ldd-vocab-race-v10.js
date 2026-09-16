/* =============================================================
   LDD ENGLISH — VOCAB RACE v11 · CONTINUOUS STEERING
   Fix: rapid left/right no longer reparents cars between lanes.
   Cars live directly on the track and only their horizontal target changes.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';

    if (!window.supabase || !window.supabase.createClient) return;

    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { detectSessionInUrl: false }
    });

    let installedTrack = null;
    let stableRoundLabel = '';
    let suppressLaneAppends = 0;
    let roomId = null;
    let roomRound = -1;
    let playerChannel = null;
    let syncing = false;

    function currentRoundLabel() {
        const el = document.getElementById('vocab-race-round');
        return el ? String(el.textContent || '').trim() : '';
    }

    function gameIsPlaying() {
        const game = document.getElementById('vocab-race-game');
        return !!game && game.style.display !== 'none';
    }

    function nativeInnerHTMLDescriptor() {
        let proto = Element.prototype;
        while (proto) {
            const d = Object.getOwnPropertyDescriptor(proto, 'innerHTML');
            if (d && d.get && d.set) return d;
            proto = Object.getPrototypeOf(proto);
        }
        return null;
    }

    function installStableTrack() {
        const track = document.getElementById('vocab-race-track');
        if (!track || track === installedTrack || track.dataset.v10Stable === '1') return;

        const htmlDescriptor = nativeInnerHTMLDescriptor();
        if (!htmlDescriptor) return;

        const nativeAppendChild = Node.prototype.appendChild;
        stableRoundLabel = currentRoundLabel();

        try {
            Object.defineProperty(track, 'innerHTML', {
                configurable: true,
                enumerable: false,
                get: function () {
                    return htmlDescriptor.get.call(this);
                },
                set: function (value) {
                    const next = String(value == null ? '' : value);
                    const roundLabel = currentRoundLabel();
                    const hasCompleteTrack = this.querySelectorAll(':scope > .vocab-race-lane').length === 5;
                    const sameRound = !!roundLabel && roundLabel === stableRoundLabel;

                    if (next === '' && gameIsPlaying() && hasCompleteTrack && sameRound) {
                        suppressLaneAppends = 5;
                        return;
                    }

                    suppressLaneAppends = 0;
                    htmlDescriptor.set.call(this, next);
                    if (roundLabel) stableRoundLabel = roundLabel;
                }
            });

            Object.defineProperty(track, 'appendChild', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: function (node) {
                    if (suppressLaneAppends > 0 && node && node.classList && node.classList.contains('vocab-race-lane')) {
                        suppressLaneAppends -= 1;
                        return node;
                    }
                    return nativeAppendChild.call(this, node);
                }
            });

            track.dataset.v10Stable = '1';
            installedTrack = track;
        } catch (_) {}
    }

    function findCar(userId) {
        const track = document.getElementById('vocab-race-track');
        if (!track) return null;
        return Array.from(track.querySelectorAll('.vocab-race-car')).find(function (el) {
            return String(el.dataset.user || '') === String(userId || '');
        }) || null;
    }

    function laneElement(lane) {
        const track = document.getElementById('vocab-race-track');
        if (!track) return null;
        const n = Math.max(0, Math.min(4, Number(lane == null ? 2 : lane)));
        return track.querySelector('.vocab-race-lane[data-lane="' + n + '"]');
    }

    function laneCenterX(lane) {
        const track = document.getElementById('vocab-race-track');
        const target = laneElement(lane);
        if (!track || !target) return null;
        const tr = track.getBoundingClientRect();
        const lr = target.getBoundingClientRect();
        const x = lr.left - tr.left + (lr.width / 2);
        return Number.isFinite(x) ? x : null;
    }

    function installOverlayMotion(car, lane) {
        const track = document.getElementById('vocab-race-track');
        if (!track || !car) return;

        const targetX = laneCenterX(lane);
        if (!Number.isFinite(targetX)) return;

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const alreadyOverlay = car.parentElement === track && car.dataset.v11Overlay === '1';

        if (!alreadyOverlay) {
            const before = car.getBoundingClientRect();
            const tr = track.getBoundingClientRect();
            const startX = before.left - tr.left + (before.width / 2);

            track.appendChild(car);
            car.dataset.v11Overlay = '1';
            car.style.setProperty('position', 'absolute', 'important');
            car.style.setProperty('right', 'auto', 'important');
            car.style.setProperty('transform', 'translateX(-50%)', 'important');
            car.style.setProperty('left', (Number.isFinite(startX) ? startX : targetX).toFixed(2) + 'px', 'important');
            car.style.setProperty('transition', 'none', 'important');
            void car.offsetWidth;

            requestAnimationFrame(function () {
                car.style.setProperty(
                    'transition',
                    reduceMotion
                        ? 'left .08s linear, bottom .72s cubic-bezier(.22,.61,.36,1), opacity .42s ease, filter .42s ease'
                        : 'left .24s cubic-bezier(.22,.61,.36,1), bottom .72s cubic-bezier(.22,.61,.36,1), opacity .42s ease, filter .42s ease',
                    'important'
                );
                car.style.setProperty('left', targetX.toFixed(2) + 'px', 'important');
            });
            return;
        }

        car.style.setProperty('left', targetX.toFixed(2) + 'px', 'important');
    }

    function moveCarWithoutRebuild(car, lane) {
        installOverlayMotion(car, lane);
    }

    function applyPlayerState(p) {
        if (!p || !p.user_id) return;
        const car = findCar(p.user_id);
        if (!car) return;

        moveCarWithoutRebuild(car, p.lane == null ? 2 : Number(p.lane));

        const eliminated = Number(p.answered_round) === Number(roomRound);
        car.classList.toggle('is-eliminated', eliminated);
        const timer = car.querySelector('.vocab-race-car-timer');
        if (timer) timer.textContent = eliminated ? 'LOẠI' : 'READY';
    }

    async function syncRoomAndPlayers() {
        if (syncing || !gameIsPlaying()) return;
        syncing = true;
        try {
            const result = await sb.auth.getSession();
            const session = result && result.data && result.data.session;
            if (!session || !session.user) return;

            const playerResult = await sb.from('vocab_race_players')
                .select('room_id,joined_at')
                .eq('user_id', session.user.id)
                .order('joined_at', { ascending: false })
                .limit(1);

            const rows = playerResult.data || [];
            if (!rows.length) return;
            const nextRoomId = rows[0].room_id;

            if (String(nextRoomId) !== String(roomId)) {
                if (playerChannel) {
                    try { sb.removeChannel(playerChannel); } catch (_) {}
                    playerChannel = null;
                }
                roomId = nextRoomId;
                playerChannel = sb.channel('race-v11-players-' + roomId)
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'vocab_race_players',
                        filter: 'room_id=eq.' + roomId
                    }, function (payload) {
                        if (payload && payload.new) applyPlayerState(payload.new);
                    })
                    .subscribe();
            }

            const roomResult = await sb.from('vocab_race_rooms')
                .select('round_index,status')
                .eq('id', roomId)
                .maybeSingle();
            if (roomResult.data) roomRound = Number(roomResult.data.round_index);

            const allPlayers = await sb.from('vocab_race_players')
                .select('user_id,lane,answered_round')
                .eq('room_id', roomId);
            (allPlayers.data || []).forEach(applyPlayerState);
        } catch (_) {
        } finally {
            syncing = false;
        }
    }

    function syncOwnCarFromLabel() {
        const label = document.getElementById('vocab-race-own-lane');
        const car = document.querySelector('#vocab-race-track .vocab-race-car.is-me');
        if (!label || !car) return;
        const match = String(label.textContent || '').match(/(\d+)/);
        if (!match) return;
        moveCarWithoutRebuild(car, Number(match[1]) - 1);
    }

    function observeLaneLabel() {
        const label = document.getElementById('vocab-race-own-lane');
        if (!label || label.dataset.v10Observed === '1') return;
        label.dataset.v10Observed = '1';
        new MutationObserver(syncOwnCarFromLabel).observe(label, {
            childList: true,
            characterData: true,
            subtree: true
        });
    }

    function maintain() {
        installStableTrack();
        observeLaneLabel();
        syncOwnCarFromLabel();
    }

    new MutationObserver(maintain).observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('resize', function () {
        requestAnimationFrame(syncOwnCarFromLabel);
    }, { passive: true });

    setInterval(maintain, 250);
    setInterval(syncRoomAndPlayers, 900);
    maintain();
})();