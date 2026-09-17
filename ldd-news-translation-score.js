/* LDD English — News translation diligence scoring v1
   Reuses the existing ai-proxy request instead of making a second AI call.
   Rules per sentence: good +1, weak 0, nonsense/blank -1.
   The backend locks the first score per user/article/sentence to prevent farming. */
(function () {
    'use strict';

    if (window.__lddNewsTranslationScoreV1) return;
    window.__lddNewsTranslationScoreV1 = true;

    const AI_PROXY_MARKER = '/functions/v1/ai-proxy';
    const NEWS_PROMPT_MARKER = 'đang chấm bài dịch Anh-Việt';
    const originalFetch = window.fetch.bind(window);
    let currentArticleId = null;

    function getSentenceIndex() {
        const el = document.getElementById('news-sentence-progress');
        const text = (el && el.textContent) || '';
        const m = text.match(/Câu\s+(\d+)\s*\/\s*\d+/i);
        return m ? Math.max(0, Number(m[1]) - 1) : null;
    }

    function currentTranslation() {
        const el = document.getElementById('news-translate-textarea');
        return el ? String(el.value || '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';
    }

    function rememberArticleFromClick(target) {
        const card = target && target.closest ? target.closest('.news-card[data-article-id]') : null;
        if (!card) return;
        const id = Number(card.dataset.articleId);
        if (Number.isInteger(id) && id > 0) {
            currentArticleId = id;
            try { sessionStorage.setItem('ldd:news-current-article-id', String(id)); } catch (_) {}
        }
    }

    document.addEventListener('click', function (event) {
        rememberArticleFromClick(event.target);

        const btn = event.target && event.target.closest ? event.target.closest('#news-translate-submit-btn') : null;
        if (!btn) return;

        // Legacy handler refuses empty input before it can reach AI. A zero-width placeholder
        // passes that local check but is stripped again before the structured request is sent,
        // so the server records a true blank translation and assigns -1 exactly once.
        const textarea = document.getElementById('news-translate-textarea');
        if (textarea && !String(textarea.value || '').trim()) textarea.value = '\u200B';
    }, true);

    try {
        const saved = Number(sessionStorage.getItem('ldd:news-current-article-id'));
        if (Number.isInteger(saved) && saved > 0) currentArticleId = saved;
    } catch (_) {}

    function isNewsTranslationPrompt(prompt) {
        return typeof prompt === 'string' && prompt.indexOf(NEWS_PROMPT_MARKER) !== -1;
    }

    function urlOf(input) {
        return typeof input === 'string' ? input : (input && input.url) || '';
    }

    window.fetch = async function (input, init) {
        const url = urlOf(input);
        if (!url.includes(AI_PROXY_MARKER) || !init || String(init.method || 'GET').toUpperCase() !== 'POST') {
            return originalFetch(input, init);
        }

        let parsed = null;
        try { parsed = JSON.parse(init.body || '{}'); } catch (_) {}
        if (!parsed || !isNewsTranslationPrompt(parsed.prompt)) return originalFetch(input, init);

        const sentenceIndex = getSentenceIndex();
        if (!Number.isInteger(currentArticleId) || currentArticleId <= 0 || !Number.isInteger(sentenceIndex)) {
            console.warn('[LDD news score] Không xác định được article/sentence; dùng AI cũ và không ghi điểm.');
            return originalFetch(input, init);
        }

        const nextInit = Object.assign({}, init, {
            body: JSON.stringify({
                task: 'grade_news_translation',
                article_id: currentArticleId,
                sentence_index: sentenceIndex,
                translation: currentTranslation()
            })
        });

        const response = await originalFetch(input, nextInit);
        if (response.ok) {
            try {
                const data = await response.clone().json();
                if (data && data.result && data.result.awarded_now) {
                    document.dispatchEvent(new CustomEvent('ldd:today-refresh'));
                }
            } catch (_) {}
        }
        return response;
    };

    window.LDDNewsTranslationScore = {
        version: '1.0',
        getArticleId: function () { return currentArticleId; },
        getSentenceIndex: getSentenceIndex
    };
})();
