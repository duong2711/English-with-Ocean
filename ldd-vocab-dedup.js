/* LDD English — vocabulary de-duplication + multi-sense cards v1
   Invariant: one user + one normalized English word = one DB row/card.
   New meanings are merged into user_vocabulary.senses through a server RPC.
   Existing legacy scalar fields remain for old quiz code; this layer renders senses cleanly. */
(function () {
    'use strict';

    if (window.__lddVocabDedupV1) return;
    window.__lddVocabDedupV1 = true;

    const previousFetch = window.fetch.bind(window);
    const REST_PREFIX = 'https://ywqbaksmmtvwbojcgsdd.supabase.co/rest/v1/';
    const TABLE_MARKER = '/rest/v1/user_vocabulary';
    const RPC_URL = REST_PREFIX + 'rpc/upsert_user_vocabulary_sense';
    const rowsById = new Map();
    const rowsByNorm = new Map();

    function normalizeWord(value) {
        return String(value || '').toLowerCase().trim().replace(/\s+/g, ' ');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function requestUrl(input) {
        return typeof input === 'string' ? input : ((input && input.url) || '');
    }

    function requestMethod(input, init) {
        return String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    }

    function requestHeaders(input, init) {
        try {
            return new Headers((init && init.headers) || (input && input.headers) || undefined);
        } catch (_) {
            return new Headers();
        }
    }

    function parseBody(init) {
        try {
            if (!init || typeof init.body !== 'string') return null;
            return JSON.parse(init.body);
        } catch (_) {
            return null;
        }
    }

    function cacheRow(row) {
        if (!row || row.id == null) return;
        rowsById.set(String(row.id), row);
        const norm = normalizeWord(row.word_norm || row.word);
        if (norm) rowsByNorm.set(norm, row);
    }

    function cacheRows(value) {
        if (Array.isArray(value)) value.forEach(cacheRow);
        else if (value && typeof value === 'object') cacheRow(value);
    }

    function invalidateVocabCache() {
        try {
            if (window.LDDEgress && typeof window.LDDEgress.invalidate === 'function') {
                window.LDDEgress.invalidate('user_vocabulary');
            }
        } catch (_) {}
    }

    function asRpcArgs(row) {
        return {
            p_word: row.word || row.word_norm || '',
            p_word_type: row.word_type || null,
            p_meaning: row.meaning || null,
            p_usage_note: row.usage_note || null,
            p_example_en: row.example_en || null,
            p_example_vi: row.example_vi || null,
            p_phonetic: row.phonetic || null,
            p_source_title: row.source_title || null
        };
    }

    async function mergeOneVocabularyRow(row, originalHeaders) {
        const headers = new Headers();
        ['authorization', 'apikey', 'x-client-info'].forEach(function (name) {
            const value = originalHeaders.get(name);
            if (value) headers.set(name, value);
        });
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const resp = await previousFetch(RPC_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(asRpcArgs(row)),
            cache: 'no-store'
        });
        if (!resp.ok) {
            const text = await resp.text().catch(function () { return ''; });
            throw new Error(text || ('Vocabulary merge RPC failed: ' + resp.status));
        }
        return await resp.json();
    }

    function successInsertResponse(row) {
        return new Response(JSON.stringify(row), {
            status: 201,
            headers: { 'Content-Type': 'application/vnd.pgrst.object+json' }
        });
    }

    function mergedDuplicateResponse() {
        return new Response(JSON.stringify({
            code: '23505',
            details: 'The word already existed and the new meaning/context was merged into its canonical card.',
            hint: null,
            message: 'duplicate key value violates unique constraint "user_vocabulary_one_word_idx"'
        }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async function interceptVocabularyInsert(input, init) {
        const body = parseBody(init);
        const rows = Array.isArray(body) ? body : (body && typeof body === 'object' ? [body] : []);
        if (!rows.length) return previousFetch(input, init);

        const headers = requestHeaders(input, init);
        const results = [];
        try {
            for (const row of rows) results.push(await mergeOneVocabularyRow(row, headers));
        } catch (err) {
            console.warn('[LDD vocab] Merge RPC unavailable; falling back to direct INSERT.', err);
            return previousFetch(input, init);
        }

        invalidateVocabCache();
        let anyCreated = false;
        let lastRow = null;
        results.forEach(function (result) {
            if (result && result.row) {
                cacheRow(result.row);
                lastRow = result.row;
            }
            if (result && result.created === true) anyCreated = true;
        });

        document.dispatchEvent(new CustomEvent('ldd:vocab-senses-updated', {
            detail: { rows: results.map(function (r) { return r && r.row; }).filter(Boolean) }
        }));

        // The legacy save function unshifts every successful INSERT into its private array.
        // For an existing word, return a 23505-shaped response AFTER the server merged the sense,
        // so the old code does not create a duplicate in memory. New words still look like normal INSERTs.
        if (rows.length === 1 && results[0] && results[0].created !== true) {
            queueMicrotask(decorateAllCards);
            return mergedDuplicateResponse();
        }
        if (rows.length === 1 && lastRow) return successInsertResponse(lastRow);

        const createdRows = results.map(function (r) { return r && r.row; }).filter(Boolean);
        return new Response(JSON.stringify(createdRows), {
            status: anyCreated ? 201 : 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    window.fetch = async function lddVocabularyFetch(input, init) {
        const url = requestUrl(input);
        const method = requestMethod(input, init);

        if (url.includes(TABLE_MARKER) && method === 'POST') {
            return interceptVocabularyInsert(input, init);
        }

        const response = await previousFetch(input, init);
        if (url.includes(TABLE_MARKER) && method === 'GET' && response.ok) {
            try {
                const data = await response.clone().json();
                cacheRows(data);
                queueMicrotask(decorateAllCards);
            } catch (_) {}
        }
        return response;
    };

    function senseSignature(senses) {
        try { return JSON.stringify(senses || []); } catch (_) { return ''; }
    }

    function renderSense(sense, index, total) {
        const type = String((sense && sense.word_type) || '').trim();
        const meaning = String((sense && sense.meaning) || '').trim();
        const usage = String((sense && sense.usage_note) || '').trim();
        const exampleEn = String((sense && sense.example_en) || '').trim();
        const exampleVi = String((sense && sense.example_vi) || '').trim();
        const source = String((sense && sense.source_title) || '').trim();
        const label = total > 1 ? ('Nghĩa ' + (index + 1)) : 'Nghĩa';

        return '<section class="ldd-vocab-sense">' +
            '<div class="ldd-vocab-sense-head"><strong>' + escapeHtml(label) + '</strong>' +
                (type ? '<span class="ldd-vocab-sense-type">' + escapeHtml(type) + '</span>' : '') +
            '</div>' +
            (meaning ? '<div class="ldd-vocab-sense-meaning">' + escapeHtml(meaning) + '</div>' : '') +
            (usage ? '<div class="ldd-vocab-sense-usage"><strong>Ngữ cảnh / cách dùng:</strong> ' + escapeHtml(usage) + '</div>' : '') +
            (exampleEn ? '<div class="ldd-vocab-sense-example"><div>📌 ' + escapeHtml(exampleEn) + '</div>' +
                (exampleVi ? '<div>→ ' + escapeHtml(exampleVi) + '</div>' : '') + '</div>' : '') +
            (source ? '<div class="ldd-vocab-sense-source">📰 Gặp trong bài: ' + escapeHtml(source) + '</div>' : '') +
        '</section>';
    }

    function decorateCard(card) {
        if (!card) return;
        const id = String(card.dataset.vocabId || '');
        const row = rowsById.get(id);
        if (!row || !Array.isArray(row.senses) || !row.senses.length) return;

        const senses = row.senses.filter(function (s) { return s && typeof s === 'object' && Object.keys(s).length; });
        if (!senses.length) return;
        const signature = senseSignature(senses);
        if (card.dataset.lddSenseSignature === signature) return;
        card.dataset.lddSenseSignature = signature;

        card.querySelectorAll(':scope > .myvocab-meaning, :scope > .myvocab-usage, :scope > .myvocab-example, :scope > .myvocab-source, :scope > .ldd-vocab-senses').forEach(function (el) {
            el.remove();
        });

        const wrap = document.createElement('div');
        wrap.className = 'ldd-vocab-senses';
        wrap.innerHTML = senses.map(function (sense, index) {
            return renderSense(sense, index, senses.length);
        }).join('');

        const hint = card.querySelector(':scope > .myvocab-practice-hint, :scope > .myvocab-review-hint');
        if (hint) card.insertBefore(wrap, hint);
        else card.appendChild(wrap);

        let badge = card.querySelector('.ldd-vocab-sense-count');
        if (senses.length > 1) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'ldd-vocab-sense-count';
                const top = card.querySelector('.myvocab-item-top');
                if (top) top.insertBefore(badge, top.querySelector('.myvocab-delete-btn'));
            }
            badge.textContent = senses.length + ' nghĩa';
        } else if (badge) {
            badge.remove();
        }
    }

    function decorateAllCards() {
        document.querySelectorAll('#myvocab-list .myvocab-item[data-vocab-id]').forEach(decorateCard);
    }

    function installStyle() {
        if (document.getElementById('ldd-vocab-senses-style')) return;
        const style = document.createElement('style');
        style.id = 'ldd-vocab-senses-style';
        style.textContent = [
            '.ldd-vocab-senses{display:grid;gap:10px;margin-top:8px}',
            '.ldd-vocab-sense{padding:11px 12px;border:1px solid rgba(127,140,141,.22);border-radius:12px;background:rgba(255,255,255,.55)}',
            '.ldd-vocab-sense-head{display:flex;align-items:center;gap:8px;margin-bottom:5px;font-size:.85rem}',
            '.ldd-vocab-sense-type,.ldd-vocab-sense-count{display:inline-flex;align-items:center;padding:2px 7px;border-radius:999px;background:rgba(52,152,219,.10);font-size:.75rem;font-weight:700}',
            '.ldd-vocab-sense-meaning{font-weight:700;margin-bottom:5px}',
            '.ldd-vocab-sense-usage{font-size:.9rem;line-height:1.45;margin-top:4px}',
            '.ldd-vocab-sense-example{margin-top:7px;padding:8px 10px;border-left:3px solid rgba(52,152,219,.35);font-size:.9rem;line-height:1.45}',
            '.ldd-vocab-sense-source{margin-top:6px;font-size:.78rem;opacity:.72}',
            '.ldd-vocab-sense-count{margin-left:auto;background:rgba(46,204,113,.12)}'
        ].join('');
        document.head.appendChild(style);
    }

    function patchVocabTapList() {
        if (!window.vocabTap || window.vocabTap.__lddSensePatched || typeof window.vocabTap.getList !== 'function') return;
        const oldGetList = window.vocabTap.getList.bind(window.vocabTap);
        window.vocabTap.getList = function () {
            const source = oldGetList() || [];
            const seen = new Set();
            const out = [];
            source.forEach(function (row) {
                const norm = normalizeWord(row && (row.word_norm || row.word));
                if (!norm || seen.has(norm)) return;
                seen.add(norm);
                out.push(rowsByNorm.get(norm) || row);
            });
            return out;
        };
        window.vocabTap.__lddSensePatched = true;
    }

    installStyle();
    patchVocabTapList();

    const observer = new MutationObserver(function () {
        decorateAllCards();
        patchVocabTapList();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    document.addEventListener('ldd:vocab-senses-updated', function (event) {
        const rows = event && event.detail && event.detail.rows;
        cacheRows(rows || []);
        decorateAllCards();
    });

    window.LDDVocabDedup = {
        version: '1.0',
        normalizeWord: normalizeWord,
        getCachedRow: function (id) { return rowsById.get(String(id)) || null; },
        getCachedByWord: function (word) { return rowsByNorm.get(normalizeWord(word)) || null; },
        decorate: decorateAllCards
    };
})();
