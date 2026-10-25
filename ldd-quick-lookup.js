/* LDD English — quick lookup with animated bird.
   Reuses the site's authenticated AI dictionary, pronunciation gate, and vocabulary saver.
   No independent AI request, Supabase read, or additional media download. */
(function () {
    'use strict';
    if (window.__lddQuickLookupBirdV1) return;
    window.__lddQuickLookupBirdV1 = true;

    const BIRD = '<svg class="ldd-quick-bird-svg" viewBox="0 0 196 162" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse class="ldd-quick-bird-shadow" cx="98" cy="146" rx="47" ry="8" fill="#5c7ac4" opacity=".13"/>' +
        '<g class="ldd-quick-bird-body">' +
        '<path class="ldd-quick-bird-tail" d="M119 112Q149 119 158 140Q136 137 111 123Z" fill="#2764c9"/>' +
        '<path d="M54 53Q77 24 123 41Q158 62 145 112Q134 141 92 134Q55 129 46 95Q40 70 54 53Z" fill="#278bdf"/>' +
        '<path d="M65 95Q82 76 121 90Q142 106 126 130Q97 144 72 123Z" fill="#e1f6ff"/>' +
        '<g class="ldd-quick-bird-wing"><path d="M63 82Q25 64 22 97Q24 124 74 119Q94 109 63 82Z" fill="#1261c2"/>' +
        '<path d="M36 97Q58 104 76 103" fill="none" stroke="#6dc2f2" stroke-width="5" stroke-linecap="round"/></g>' +
        '<path d="M54 61Q38 48 45 31Q56 39 64 49" fill="#1d74d6"/>' +
        '<path d="M61 49Q55 30 64 22Q69 38 72 46" fill="#48afea"/>' +
        '<ellipse cx="111" cy="74" rx="17" ry="18" fill="#fff"/>' +
        '<circle cx="116" cy="75" r="8" fill="#203659"/>' +
        '<circle cx="119" cy="71" r="3" fill="#fff"/>' +
        '<path d="M132 84Q166 78 169 91Q163 107 132 105Z" fill="#ff962f"/>' +
        '<path d="M133 104Q158 107 166 96Q161 118 134 115Z" fill="#ef6e25"/>' +
        '<circle cx="102" cy="104" r="7" fill="#ff9d9d" opacity=".67"/>' +
        '<path d="M72 132L67 140M85 133L83 141" stroke="#e88930" stroke-width="4" stroke-linecap="round"/>' +
        '</g><g class="ldd-quick-bird-sparkles" fill="#f1af47"><path d="M29 46L32 38L35 46L43 49L35 52L32 60L29 52L21 49Z"/><circle cx="162" cy="52" r="4"/></g>' +
        '</svg>';

    function init() {
        const account = document.getElementById('account-area');
        if (!account || document.getElementById('ldd-quick-lookup-trigger')) return;

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.id = 'ldd-quick-lookup-trigger';
        trigger.className = 'ldd-quick-lookup-trigger';
        trigger.title = 'Tra từ và cụm từ bằng AI';
        trigger.setAttribute('aria-label', 'Mở tra cứu từ vựng');
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<circle cx="10.8" cy="10.8" r="6.7" stroke="currentColor" stroke-width="2" />' +
            '<path d="m16 16 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        account.insertBefore(trigger, account.firstElementChild);

        const overlay = document.createElement('div');
        overlay.id = 'ldd-quick-lookup-overlay';
        overlay.className = 'ldd-quick-lookup-overlay';
        overlay.hidden = true;
        overlay.innerHTML =
            '<section class="ldd-quick-lookup-dialog" role="dialog" aria-modal="true" aria-labelledby="ldd-quick-lookup-title">' +
              '<button type="button" class="ldd-quick-lookup-close" aria-label="Đóng tra cứu" title="Đóng">×</button>' +
              '<div class="ldd-quick-lookup-bird" aria-hidden="true">' + BIRD + '</div>' +
              '<h2 id="ldd-quick-lookup-title">Bạn muốn tra từ gì?</h2>' +
              '<p class="ldd-quick-lookup-subtitle">Tra nghĩa AI · Luyện phát âm · Tự lưu từ mới</p>' +
              '<form id="ldd-quick-lookup-form" autocomplete="off">' +
                '<label class="ldd-quick-lookup-label" for="ldd-quick-lookup-input">Từ hoặc cụm từ tiếng Anh</label>' +
                '<div class="ldd-quick-lookup-input-row">' +
                  '<input id="ldd-quick-lookup-input" type="text" inputmode="text" maxlength="100" placeholder="Ví dụ: take care of" spellcheck="false" />' +
                  '<button class="ldd-quick-lookup-submit" type="submit">Tìm kiếm</button>' +
                '</div>' +
                '<p id="ldd-quick-lookup-message" class="ldd-quick-lookup-message" role="status" aria-live="polite"></p>' +
              '</form>' +
            '</section>';
        document.body.appendChild(overlay);

        const input = overlay.querySelector('#ldd-quick-lookup-input');
        const form = overlay.querySelector('#ldd-quick-lookup-form');
        const message = overlay.querySelector('#ldd-quick-lookup-message');
        const closeButton = overlay.querySelector('.ldd-quick-lookup-close');
        let priorFocus = null;

        function hide(restoreFocus) {
            overlay.hidden = true;
            document.body.classList.remove('ldd-quick-lookup-open');
            trigger.setAttribute('aria-expanded', 'false');
            if (restoreFocus && priorFocus && typeof priorFocus.focus === 'function') priorFocus.focus();
        }

        function open(term, invalid) {
            priorFocus = document.activeElement;
            input.value = term || '';
            input.removeAttribute('aria-invalid');
            message.textContent = '';
            overlay.hidden = false;
            document.body.classList.add('ldd-quick-lookup-open');
            trigger.setAttribute('aria-expanded', 'true');
            input.focus();
            if (invalid) showInvalidInput();
        }

        function showInvalidInput() {
            message.textContent = 'Gõ sai, vui lòng nhập lại.';
            input.setAttribute('aria-invalid', 'true');
            input.focus();
            input.select();
        }

        trigger.addEventListener('click', function () { open(); });

        // A real-word check runs in the existing AI dictionary. For an invalid
        // term its popup is dismissed and we bring back the editable bird input.
        document.addEventListener('ldd:quick-lookup-invalid', function (event) {
            const term = event.detail && event.detail.query;
            open(typeof term === 'string' ? term : '', true);
            priorFocus = trigger;
        });
        closeButton.addEventListener('click', function () { hide(true); });
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) hide(true);
        });
        input.addEventListener('input', function () {
            message.textContent = '';
            input.removeAttribute('aria-invalid');
        });

        overlay.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                hide(true);
            }
            if (event.key === 'Tab') {
                const elements = Array.from(overlay.querySelectorAll('button, input'))
                    .filter(function (el) { return !el.disabled; });
                const first = elements[0], last = elements[elements.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault(); last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault(); first.focus();
                }
            }
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const word = input.value.replace(/\s+/g, ' ').trim();
            // Permit normal English words, contractions and hyphenated phrases;
            // reject Vietnamese accents, numbers, emoji, and stray punctuation
            // locally, before issuing any AI or database request.
            const englishTerm = /^[A-Za-z]+(?:['’-][A-Za-z]+)*(?: [A-Za-z]+(?:['’-][A-Za-z]+)*)*$/;
            if (!word || word.length > 100 || word.split(' ').length > 12 ||
                !englishTerm.test(word)) {
                showInvalidInput();
                return;
            }
            // The site handles authentication, AI, auto-save, duplicate detection and
            // the microphone requirement in its existing non-exam word-lookup flow.
            if (typeof window.lddExamLookupWord !== 'function' ||
                !document.getElementById('word-lookup-popup')) {
                message.textContent = 'Từ điển đang khởi tạo. Vui lòng thử lại.';
                return;
            }

            const context = document.createElement('div');
            context.dataset.vocabContext = word;
            context.dataset.vocabSource = 'Tra cứu nhanh';
            const token = document.createElement('span');
            token.className = 'tappable-word ldd-quick-lookup-source';
            token.dataset.word = word;
            context.appendChild(token);

            try {
                const operation = window.lddExamLookupWord(token);
                // The lookup handler opens the existing AI result popup synchronously.
                // Hide the animated bird only after the lookup popup was invoked.
                hide(false);
                if (operation && typeof operation.catch === 'function') {
                    operation.catch(function (error) {
                        console.error('[LDD quick lookup]', error);
                    });
                }
            } catch (error) {
                console.error('[LDD quick lookup]', error);
                message.textContent = 'Không thể mở tra cứu lúc này. Vui lòng thử lại.';
            }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
