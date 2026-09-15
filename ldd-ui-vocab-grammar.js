/* =============================================================
   LDD ENGLISH — VOCABULARY + GRAMMAR HUB v1
   Non-destructive DOM enhancement. No Supabase calls.
   ============================================================= */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        enhanceVocabularyHub();
        enhanceGrammarHub();
    });

    function enhanceVocabularyHub() {
        const tab = document.getElementById('tab-tu-vung');
        const grid = document.getElementById('vocab-folder-grid');
        if (!tab || !grid) return;

        tab.classList.add('ldd-vocab-page');
        addVocabularyHero(tab, grid);
        decorateVocabularyCards(grid);
    }

    function addVocabularyHero(tab, grid) {
        if (tab.querySelector('.ldd-vocab-hero')) return;
        const title = Array.from(tab.children).find(function (el) { return el.tagName === 'H2'; });
        if (!title) return;

        const hero = document.createElement('section');
        hero.className = 'ldd-vocab-hero';

        const icon = document.createElement('div');
        icon.className = 'ldd-vocab-hero-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'Aa';

        const copy = document.createElement('div');
        copy.className = 'ldd-vocab-hero-copy';

        const kicker = document.createElement('div');
        kicker.className = 'ldd-vocab-hero-kicker';
        kicker.textContent = 'LDD Vocabulary Lab';

        const desc = document.createElement('p');
        desc.textContent = 'Học từ theo chủ đề, gom từ của riêng bạn, đọc tin và luyện dictation trong cùng một không gian.';

        copy.appendChild(kicker);
        copy.appendChild(title);
        copy.appendChild(desc);

        const stat = document.createElement('div');
        stat.className = 'ldd-vocab-hero-stat';
        const total = grid.querySelectorAll(':scope > .folder-card').length;
        stat.innerHTML = '<strong>' + total + '</strong><span>khu vực luyện từ</span>';

        hero.appendChild(icon);
        hero.appendChild(copy);
        hero.appendChild(stat);
        grid.parentNode.insertBefore(hero, grid);
    }

    function decorateVocabularyCards(grid) {
        const configs = [
            { id: 'myvocab-folder-card', icon: '★', title: 'Từ vựng của tôi', subtitle: 'Kho từ bạn đã lưu khi học và đọc bài', kind: 'mine' },
            { id: 'kid-folder-card', icon: '20', title: 'Vận dụng theo chủ đề', subtitle: '20 chủ đề để dùng từ trong ngữ cảnh', kind: 'topic' },
            { id: 'thcs-folder-card', icon: '6–12', title: 'THCS / THPT', subtitle: 'Từ vựng bám SGK Global Success', kind: 'school' },
            { id: 'conj-folder-card', icon: '↔', title: 'Liên từ', subtitle: 'Kết nối ý và câu tự nhiên hơn', kind: 'conj' },
            { id: 'news-folder-card', icon: 'NEWS', title: 'Tin ngắn', subtitle: 'Đọc báo, tra từ và luyện dịch thực tế', kind: 'news' },
            { id: 'podcast-folder-card', icon: '▶', title: 'Podcast dictation', subtitle: 'Nghe – chép chính tả – học từ qua âm thanh', kind: 'podcast' }
        ];

        configs.forEach(function (cfg) {
            const card = document.getElementById(cfg.id);
            if (!card || card.dataset.lddVocabEnhanced === '1') return;

            card.dataset.lddVocabEnhanced = '1';
            card.dataset.lddVocabKind = cfg.kind;

            Array.from(card.childNodes).forEach(function (node) {
                if (node.nodeType === Node.TEXT_NODE) node.remove();
            });

            const icon = document.createElement('span');
            icon.className = 'ldd-vocab-card-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = cfg.icon;

            const copy = document.createElement('span');
            copy.className = 'ldd-vocab-card-copy';
            copy.innerHTML = '<span class="ldd-vocab-card-title"></span><span class="ldd-vocab-card-subtitle"></span>';
            copy.querySelector('.ldd-vocab-card-title').textContent = cfg.title;
            copy.querySelector('.ldd-vocab-card-subtitle').textContent = cfg.subtitle;

            card.insertBefore(icon, card.firstChild);
            const badge = Array.from(card.children).find(function (el) {
                return el.classList && el.classList.contains('tab-badge-count');
            });
            if (badge) card.insertBefore(copy, badge);
            else card.appendChild(copy);
        });
    }

    function enhanceGrammarHub() {
        const tab = document.getElementById('tab-ngu-phap');
        const header = tab && tab.querySelector('.grammar-header');
        const grid = document.getElementById('grammar-folder-grid');
        if (!tab || !header || !grid) return;

        tab.classList.add('ldd-grammar-page');
        enhanceGrammarHeader(header);

        const decorate = function () { decorateGrammarCards(grid); };
        new MutationObserver(decorate).observe(grid, { childList: true, subtree: true });
        decorate();
    }

    function enhanceGrammarHeader(header) {
        if (header.classList.contains('ldd-grammar-hero')) return;
        header.classList.add('ldd-grammar-hero');

        const h2 = header.querySelector('h2');
        if (!h2) return;

        const icon = document.createElement('div');
        icon.className = 'ldd-grammar-hero-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'S+V';

        const copy = document.createElement('div');
        copy.className = 'ldd-grammar-hero-copy';

        const kicker = document.createElement('div');
        kicker.className = 'ldd-grammar-hero-kicker';
        kicker.textContent = 'LDD Grammar Lab';

        const desc = document.createElement('p');
        desc.textContent = 'Tìm nhanh chủ điểm, học theo từng bài và nhận biết ngay phần bạn đã hoàn thành.';

        h2.parentNode.insertBefore(icon, h2);
        h2.parentNode.insertBefore(copy, h2);
        copy.appendChild(kicker);
        copy.appendChild(h2);
        copy.appendChild(desc);
    }

    function decorateGrammarCards(grid) {
        const cards = grid.querySelectorAll('.grammar-folder-card, :scope > .folder-card');
        cards.forEach(function (card) {
            if (card.dataset.lddGrammarEnhanced === '1') return;
            if (card.classList.contains('grammar-loading-msg')) return;

            card.dataset.lddGrammarEnhanced = '1';

            const cta = document.createElement('span');
            cta.className = 'ldd-grammar-card-cta';
            cta.innerHTML = '<span>Mở bài học</span><span class="ldd-grammar-card-arrow" aria-hidden="true">→</span>';
            card.appendChild(cta);
        });
    }
})();
