/* =============================================================
   LDD ENGLISH — AUTH SESSION GUARD v1
   Fixes stale Supabase access tokens during device verification.
   Scope: verify-device only. Device certificates/tokens are never deleted here.
   ============================================================= */
(function () {
    'use strict';

    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const AUTH_STORAGE_KEY = 'sb-' + SUPABASE_REF + '-auth-token';
    const VERIFY_DEVICE_URL = SUPABASE_URL + '/functions/v1/verify-device';

    if (window.__lddAuthSessionGuardInstalled) return;
    window.__lddAuthSessionGuardInstalled = true;

    const nativeFetch = window.fetch.bind(window);
    let refreshPromise = null;

    function parseStoredSession(raw) {
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.access_token) return parsed;
            if (parsed && parsed.currentSession && parsed.currentSession.access_token) return parsed.currentSession;
            if (parsed && parsed.session && parsed.session.access_token) return parsed.session;
            if (Array.isArray(parsed) && parsed[0] && parsed[0].access_token) return parsed[0];
        } catch (_) {}
        return null;
    }

    function readSessionRecord() {
        const stores = [
            { store: window.localStorage, name: 'localStorage' },
            { store: window.sessionStorage, name: 'sessionStorage' }
        ];
        for (const item of stores) {
            try {
                const raw = item.store.getItem(AUTH_STORAGE_KEY);
                const session = parseStoredSession(raw);
                if (session) return { store: item.store, raw: raw, session: session };
            } catch (_) {}
        }
        return null;
    }

    function jwtExpiryMs(token) {
        try {
            const part = String(token || '').split('.')[1];
            if (!part) return 0;
            const normalized = part.replace(/-/g, '+').replace(/_/g, '/');
            const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
            const payload = JSON.parse(atob(padded));
            return Number(payload.exp || 0) * 1000;
        } catch (_) {
            return 0;
        }
    }

    function tokenStillUsable(token, skewMs) {
        const exp = jwtExpiryMs(token);
        if (!exp) return !!token;
        return exp > Date.now() + (skewMs || 0);
    }

    function persistRefreshedSession(record, refreshed) {
        if (!record || !record.store || !refreshed || !refreshed.access_token) return;

        const merged = Object.assign({}, record.session || {}, refreshed);
        if (!merged.expires_at && merged.expires_in) {
            merged.expires_at = Math.floor(Date.now() / 1000) + Number(merged.expires_in || 0);
        }

        // Supabase v2 stores the session object directly for this project.
        // Preserve any unknown fields from the previous session for compatibility.
        try {
            record.store.setItem(AUTH_STORAGE_KEY, JSON.stringify(merged));
        } catch (_) {}

        // If another storage area already contains the same auth key, keep it in sync.
        const other = record.store === window.localStorage ? window.sessionStorage : window.localStorage;
        try {
            if (other.getItem(AUTH_STORAGE_KEY)) {
                other.setItem(AUTH_STORAGE_KEY, JSON.stringify(merged));
            }
        } catch (_) {}
    }

    async function refreshAccessToken(force) {
        if (refreshPromise) return refreshPromise;

        refreshPromise = (async function () {
            const before = readSessionRecord();
            if (!before || !before.session) return '';

            const oldAccessToken = String(before.session.access_token || '');
            const refreshToken = String(before.session.refresh_token || '');

            // Another Supabase client/tab may already have refreshed the session.
            if (!force && tokenStillUsable(oldAccessToken, 30000)) return oldAccessToken;
            if (!refreshToken) return '';

            let response;
            try {
                response = await nativeFetch(SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY
                    },
                    body: JSON.stringify({ refresh_token: refreshToken })
                });
            } catch (_) {
                return '';
            }

            const data = await response.json().catch(function () { return {}; });
            if (response.ok && data && data.access_token) {
                persistRefreshedSession(before, data);
                return String(data.access_token);
            }

            // Refresh tokens rotate. If another tab won the race, use the newer session
            // that it has already written instead of treating this as a logout.
            const after = readSessionRecord();
            const newer = after && after.session ? String(after.session.access_token || '') : '';
            if (newer && newer !== oldAccessToken && tokenStillUsable(newer, 5000)) return newer;
            return '';
        })();

        try {
            return await refreshPromise;
        } finally {
            refreshPromise = null;
        }
    }

    function requestUrl(input) {
        if (typeof input === 'string') return input;
        return input && typeof input.url === 'string' ? input.url : '';
    }

    function authHeaderFrom(input, init) {
        try {
            const headers = new Headers((init && init.headers) || (input && input.headers) || {});
            return headers.get('Authorization') || '';
        } catch (_) {
            return '';
        }
    }

    function withBearer(init, token) {
        const next = Object.assign({}, init || {});
        const headers = new Headers((init && init.headers) || {});
        headers.set('Authorization', 'Bearer ' + token);
        headers.set('apikey', SUPABASE_ANON_KEY);
        next.headers = headers;
        return next;
    }

    window.fetch = async function lddAuthSessionGuardFetch(input, init) {
        const url = requestUrl(input);
        if (!url.startsWith(VERIFY_DEVICE_URL)) {
            return nativeFetch(input, init);
        }

        // If the supplied JWT is already expired/near expiry, refresh before making
        // the device check so reload never flashes a false "session expired" error.
        const suppliedAuth = authHeaderFrom(input, init);
        const suppliedToken = suppliedAuth.replace(/^Bearer\s+/i, '').trim();
        if (suppliedToken && !tokenStillUsable(suppliedToken, 15000)) {
            const freshBefore = await refreshAccessToken(false);
            if (freshBefore) {
                return nativeFetch(input, withBearer(init, freshBefore));
            }
        }

        const first = await nativeFetch(input, init);
        if (first.status !== 401) return first;

        // A 401 from verify-device is treated as a stale-access-token signal first.
        // Refresh once, retry once, and only then let the caller decide the session is dead.
        const freshToken = await refreshAccessToken(true);
        if (!freshToken) return first;

        return nativeFetch(input, withBearer(init, freshToken));
    };
})();
