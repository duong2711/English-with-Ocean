/* LDD English — tra từ trong mọi bài kiểm tra, cùng trang, không tính vi phạm.
   Không gửi dữ liệu đến Supabase: tái sử dụng popup tra từ hiện tại của website.
   Bài kiểm tra HTML độc lập dùng dịch dự phòng với bộ nhớ đệm trong phiên. */
(function () {
    'use strict';
    var ROOTS = [
        '#ctest-take-sections', '#ctest-take-notes', '#ilt-take-body',
        '#irt-take-body', '#vocab-own-test-panel', '#vocab-weekly-test-overlay',
        '#news-quiz-questions', '#podcast-quiz-question', '#podcast-quiz-options',
        '#conj-practice-quiz', '[id$="-quiz-body"]', '[id$="-quiz-questions"]',
        '[id$="-quiz-options"]', '#quiz'
    ].join(', ');
    var SKIP = [
        'script', 'style', 'noscript', 'svg', 'math', 'input', 'textarea',
        'select', 'option', 'button', 'a', 'code', 'pre', '[contenteditable]',
        '.tappable-word', '.ldd-exam-lookup-word', '.word-lookup-popup',
        '.ldd-exam-lookup-modal'
    ].join(', ');
    var roots = [];
    var pending = new Set();
    var scheduled = false;
    var translations = new Map();
    var lookupSerial = 0;
    var fallbackModal = null;

    function injectStyle() {
        if (document.getElementById('ldd-exam-lookup-style')) return;
        var style = document.createElement('style');
        style.id = 'ldd-exam-lookup-style';
        style.textContent =
            '.ldd-exam-lookup-word{cursor:pointer;text-decoration:underline dotted;text-decoration-color:#6488c6;text-underline-offset:3px;border-radius:3px;touch-action:manipulation}' +
            '.ldd-exam-lookup-word:hover,.ldd-exam-lookup-word:focus{background:rgba(72,131,218,.14);outline:none}' +
            '.ldd-exam-lookup-modal{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.6);padding:16px}' +
            '.ldd-exam-lookup-dialog{position:relative;width:min(420px,100%);max-height:85vh;overflow:auto;background:#fff;color:#172033;padding:24px;border-radius:18px;box-shadow:0 18px 65px #0003;font:16px/1.6 system-ui,sans-serif}' +
            '.ldd-exam-lookup-dialog h3{margin:0 0 8px;font-size:24px;color:#2457a7}' +
            '.ldd-exam-lookup-dialog p{margin:8px 0}' +
            '.ldd-exam-lookup-close{float:right;border:0;background:#eff3fb;border-radius:9px;padding:4px 12px;font-size:22px;cursor:pointer}';
        document.head.appendChild(style);
    }

    // Chỉ thay các text node của đề, không gán lại innerHTML của form/đáp án.
    function wrapText(node) {
        if (!node || !node.parentNode || !node.parentElement) return;
        if (node.parentElement.closest(SKIP)) return;
        var original = node.nodeValue || '';
        if (!/[a-zA-Z]{2}/.test(original)) return;
        var pattern = /[A-Za-z]+(?:[-'\u2019][A-Za-z]+)*/g;
        var match;
        var offset = 0;
        var changed = false;
        var fragment = document.createDocumentFragment();
        while ((match = pattern.exec(original))) {
            var word = match[0];
            if (word.length === 1 && word !== 'I' && word !== 'a' && word !== 'A') continue;
            // Không tách một từ giữa tên biến hoặc ký hiệu kỹ thuật.
            if (match.index > 0 && /[A-Za-z0-9_]/.test(original.charAt(match.index - 1))) continue;
            if (pattern.lastIndex < original.length && /[A-Za-z0-9_]/.test(original.charAt(pattern.lastIndex))) continue;
            if (match.index > offset) fragment.appendChild(document.createTextNode(original.slice(offset, match.index)));
            var span = document.createElement('span');
            span.className = 'tappable-word ldd-exam-lookup-word';
            span.dataset.word = word;
            span.dataset.vocabContext = original.trim().slice(Math.max(0, match.index - 105), Math.min(original.length, pattern.lastIndex + 105)).trim();
            span.dataset.vocabSource = 'Bài kiểm tra';
            span.title = 'Tra nghĩa từ này — không tính vi phạm';
            span.textContent = word;
            fragment.appendChild(span);
            offset = pattern.lastIndex;
            changed = true;
        }
        if (!changed) return;
        if (offset < original.length) fragment.appendChild(document.createTextNode(original.slice(offset)));
        node.parentNode.replaceChild(fragment, node);
    }

    function scan(root) {
        if (!root || !root.isConnected) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!node.nodeValue || !/[A-Za-z]{2}/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
                return node.parentElement && !node.parentElement.closest(SKIP)
                    ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(wrapText);
    }

    function flush() {
        scheduled = false;
        var current = Array.from(pending);
        pending.clear();
        current.forEach(scan);
    }
    function queue(root) {
        pending.add(root);
        if (!scheduled) {
            scheduled = true;
            window.requestAnimationFrame(flush);
        }
    }

    function initRoots() {
        injectStyle();
        document.querySelectorAll(ROOTS).forEach(function (root) {
            if (roots.indexOf(root) !== -1) return;
            roots.push(root);
            root.classList.add('ldd-exam-lookup-root');
            new MutationObserver(function (records) {
                if (records.some(function (record) {
                    return record.type === 'childList' || record.type === 'characterData';
                })) queue(root);
            }).observe(root, { childList: true, subtree: true, characterData: true });
            queue(root);
        });
    }

    // Chỉ dành cho trang đề thi HTML độc lập, không có popup từ vựng của LDD.
    // Không yêu cầu mở tab hay điều hướng — tránh tạo tín hiệu vi phạm.
    function getFallbackModal() {
        if (fallbackModal) return fallbackModal;
        var overlay = document.createElement('div');
        overlay.className = 'ldd-exam-lookup-modal';
        overlay.style.display = 'none';
        overlay.innerHTML =
            '<section class="ldd-exam-lookup-dialog" role="dialog" aria-modal="true" aria-label="Tra từ tiếng Anh">' +
            '<button type="button" class="ldd-exam-lookup-close" aria-label="Đóng">×</button>' +
            '<h3 class="ldd-lookup-term"></h3><p class="ldd-lookup-meaning"></p>' +
            '<small>Tra từ ngay trong bài — không tính vi phạm.</small></section>';
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay || event.target.closest('.ldd-exam-lookup-close')) {
                overlay.style.display = 'none';
            }
        });
        document.body.appendChild(overlay);
        fallbackModal = overlay;
        return overlay;
    }

    async function fallbackLookup(word) {
        var modal = getFallbackModal();
        var seq = ++lookupSerial;
        modal.querySelector('.ldd-lookup-term').textContent = word;
        var meaningEl = modal.querySelector('.ldd-lookup-meaning');
        meaningEl.textContent = 'Đang tra nghĩa tiếng Việt…';
        modal.style.display = 'flex';
        var norm = word.toLowerCase();
        if (translations.has(norm)) {
            meaningEl.textContent = translations.get(norm);
            return;
        }
        try {
            var url = 'https://api.mymemory.translated.net/get?q=' +
                encodeURIComponent(word) + '&langpair=en%7Cvi';
            var response = await fetch(url, { referrerPolicy: 'no-referrer' });
            if (!response.ok) throw new Error('Dictionary unavailable');
            var data = await response.json();
            var translated = data && data.responseData && data.responseData.translatedText;
            if (!translated || data.responseStatus !== 200) throw new Error('No translation');
            translations.set(norm, translated);
            if (seq === lookupSerial) meaningEl.textContent = translated;
        } catch (_) {
            if (seq === lookupSerial) {
                meaningEl.textContent = 'Chưa lấy được nghĩa của từ này. Vui lòng kiểm tra kết nối rồi thử lại.';
            }
        }
    }

    function onWordClick(event) {
        var el = event.target && event.target.closest
            ? event.target.closest('.ldd-exam-lookup-word') : null;
        if (!el || !el.closest('.ldd-exam-lookup-root')) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (typeof window.lddExamLookupWord === 'function') {
            window.lddExamLookupWord(el);
        } else {
            fallbackLookup(el.dataset.word || el.textContent.trim());
        }
    }

    document.addEventListener('click', onWordClick, true);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRoots, { once: true });
    } else {
        initRoots();
    }
})();
