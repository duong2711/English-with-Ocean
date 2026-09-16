/* =============================================================
   LDD ENGLISH — EGRESS GUARD v1.4
   Goal: reduce Supabase egress without sacrificing correctness.
   - Dedupes identical in-flight REST GET requests.
   - Short-lived in-memory cache for safe/slow-changing GETs.
   - Never caches vocab race tables.
   - Any write invalidates cached GETs for the same table.
   - Noncritical dashboard polling is floored at 5 minutes.
   ============================================================= */
(function () {
    'use strict';

    if (window.LDDEgress && window.LDDEgress.version) return;

    const originalFetch = window.fetch.bind(window);
    const originalSetInterval = window.setInterval.bind(window);
    const SUPABASE_REST = 'https://ywqbaksmmtvwbojcgsdd.supabase.co/rest/v1/';
    const cache = new Map();
    const inflight = new Map();
    const POLL_FLOOR_MS = 5 * 60 * 1000;

    const TTL = {
        podcast_content: 6 * 60 * 60 * 1000,
        news_articles: 6 * 60 * 60 * 1000,
        diligence_scores: 5 * 60 * 1000,
        vocab_weekly_tests: 5 * 60 * 1000,
        conj_practice_sessions: 5 * 60 * 1000,
        kid_topic_progress: 2 * 60 * 1000,
        thcs_unit_progress: 2 * 60 * 1000,
        podcast_fill_progress: 2 * 60 * 1000,
        vocab_word_progress: 2 * 60 * 1000,
        user_vocabulary: 2 * 60 * 1000,
        news_reads: 2 * 60 * 1000,
        comments: 2 * 60 * 1000,
        ipa_completions: 2 * 60 * 1000
    };
    const DEFAULT_TTL = 60 * 1000;

    function tableFromUrl(url) {
        const text = String(url || '');
        if (!text.startsWith(SUPABASE_REST)) return null;
        const rest = text.slice(SUPABASE_REST.length);
        return decodeURIComponent((rest.split('?')[0] || '').split('/')[0] || '');
    }

    function isRaceTable(table) {
        return !!table && table.indexOf('vocab_race_') === 0;
    }

    function headersFrom(input, init) {
        try {
            return new Headers((init && init.headers) || (input && input.headers) || undefined);
        } catch (_) {
            return new Headers();
        }
    }

    function methodFrom(input, init) {
        return String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    }

    function urlFrom(input) {
        return typeof input === 'string' ? input : (input && input.url) || '';
    }

    function userKey(headers) {
        const auth = headers.get('authorization') || '';
        const token = auth.replace(/^Bearer\s+/i, '');
        if (!token) return 'anon';
        try {
            let part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (part.length % 4) part += '=';
            const payload = JSON.parse(atob(part)) || {};
            return String(payload.sub || payload.email || 'auth');
        } catch (_) {
            return 'auth';
        }
    }

    function cacheKey(url, headers) {
        return userKey(headers) + '|' + String(url) + '|range=' + (headers.get('range') || '');
    }

    function cloneStored(entry) {
        return new Response(entry.body, {
            status: entry.status,
            statusText: entry.statusText,
            headers: entry.headers
        });
    }

    function invalidate(table) {
        if (!table) {
            cache.clear();
            return;
        }
        for (const [key, entry] of cache.entries()) {
            if (entry.table === table) cache.delete(key);
        }
    }

    function ttlFor(table) {
        if (!table || isRaceTable(table)) return 0;
        return Object.prototype.hasOwnProperty.call(TTL, table) ? TTL[table] : DEFAULT_TTL;
    }

    function shouldThrottleInterval(fn, delay) {
        const ms = Number(delay);
        if (!Number.isFinite(ms) || ms <= 0 || ms >= POLL_FLOOR_MS || typeof fn !== 'function') return false;
        let source = '';
        try { source = Function.prototype.toString.call(fn); } catch (_) {}
        return source.indexOf('queueRefresh') !== -1 || source.indexOf('refreshData') !== -1;
    }

    window.setInterval = function (fn, delay) {
        const args = Array.prototype.slice.call(arguments, 2);
        const nextDelay = shouldThrottleInterval(fn, delay) ? POLL_FLOOR_MS : delay;
        return originalSetInterval.apply(window, [fn, nextDelay].concat(args));
    };

    async function guardedFetch(input, init) {
        const url = urlFrom(input);
        const table = tableFromUrl(url);
        if (!table) return originalFetch(input, init);

        const method = methodFrom(input, init);
        const headers = headersFrom(input, init);

        if (method !== 'GET' && method !== 'HEAD') {
            const response = await originalFetch(input, init);
            if (response && response.ok) invalidate(table);
            return response;
        }

        const requestedFresh = (init && init.cache === 'no-store') || headers.get('x-ldd-fresh') === '1';
        const ttl = requestedFresh ? 0 : ttlFor(table);
        if (!ttl) return originalFetch(input, init);

        const key = cacheKey(url, headers);
        const now = Date.now();
        const hit = cache.get(key);
        if (hit && now - hit.at < ttl) return cloneStored(hit);

        if (inflight.has(key)) return cloneStored(await inflight.get(key));

        const work = (async function () {
            const response = await originalFetch(input, init);
            const body = await response.clone().text();
            const type = String(response.headers.get('content-type') || '').toLowerCase();
            const cacheable = response.ok && (type.includes('application/json') || type.includes('application/vnd.pgrst'));
            const entry = {
                table: table,
                at: Date.now(),
                body: body,
                status: response.status,
                statusText: response.statusText,
                headers: Array.from(response.headers.entries()),
                cacheable: cacheable
            };
            if (cacheable) cache.set(key, entry);
            return entry;
        })();

        inflight.set(key, work);
        try {
            return cloneStored(await work);
        } finally {
            inflight.delete(key);
        }
    }

    window.fetch = guardedFetch;

    document.addEventListener('ldd:today-refresh', function () {
        ['comments','ipa_completions','user_vocabulary','vocab_word_progress','news_reads','conj_practice_sessions','podcast_fill_progress','kid_topic_progress','thcs_unit_progress','vocab_weekly_tests','diligence_scores'].forEach(invalidate);
    });
    document.addEventListener('ldd:thcs-vocab-reset', function () { invalidate('thcs_unit_progress'); });

    window.LDDEgress = {
        version: '1.4',
        invalidate: invalidate,
        clear: function () { cache.clear(); },
        stats: function () { return { cached: cache.size, inflight: inflight.size }; },
        policy: {
            pollFloorMs: POLL_FLOOR_MS,
            defaultTtlMs: DEFAULT_TTL,
            raceCached: false,
            tableTtlMs: Object.assign({}, TTL)
        }
    };
})();

/* Load the optional local pronunciation bridge after the core page has initialized. */
(function () {
    'use strict';
    if (document.getElementById('ldd-local-pronunciation-script')) return;
    const script = document.createElement('script');
    script.id = 'ldd-local-pronunciation-script';
    script.src = 'ldd-local-pronunciation.js?v=20260917-1';
    script.defer = true;
    document.body.appendChild(script);
})();
