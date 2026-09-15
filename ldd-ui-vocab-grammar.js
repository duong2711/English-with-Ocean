/* =============================================================
   LDD ENGLISH — VOCABULARY + GRAMMAR HUB v2
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
        enhanceMyVocabFilters();
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

    function enhanceMyVocabFilters() {
        const panel = document.getElementById('myvocab-panel');
        const list = document.getElementById('myvocab-list');
        if (!panel || !list || panel.querySelector('.ldd-myvocab-filters')) return;

        injectMyVocabFilterStyles();

        const toolbar = document.createElement('div');
        toolbar.className = 'ldd-myvocab-filters';
        toolbar.setAttribute('aria-label', 'Lọc kho từ vựng');
        toolbar.innerHTML =
            '<button type="button" class="ldd-myvocab-filter is-active" data-vocab-filter="all" aria-pressed="true">Tất cả <span data-filter-count="all">0</span></button>' +
            '<button type="button" class="ldd-myvocab-filter" data-vocab-filter="learned" aria-pressed="false">✓ Đã học <span data-filter-count="learned">0</span></button>' +
            '<button type="button" class="ldd-myvocab-filter" data-vocab-filter="unlearned" aria-pressed="false">Chưa học <span data-filter-count="unlearned">0</span></button>' +
            '<button type="button" class="ldd-myvocab-filter" data-vocab-filter="unpronounced" aria-pressed="false">🎤 Chưa phát âm <span data-filter-count="unpronounced">0</span></button>';

        const empty = document.createElement('div');
        empty.className = 'ldd-myvocab-filter-empty';
        empty.hidden = true;
        empty.textContent = 'Không có từ nào trong bộ lọc này.';

        list.parentNode.insertBefore(toolbar, list);
        list.parentNode.insertBefore(empty, list);

        let activeFilter = 'all';

        function getItems() {
            return Array.from(list.querySelectorAll('.myvocab-item'));
        }

        function getState(item) {
            const learned = item.classList.contains('myvocab-item-learned');
            const unpronounced = !!item.querySelector('.myvocab-pron-missing-badge');
            return { learned: learned, unpronounced: unpronounced };
        }

        function matchesFilter(item, filter) {
            const state = getState(item);
            if (filter === 'learned') return state.learned;
            if (filter === 'unlearned') return !state.learned;
            if (filter === 'unpronounced') return state.unpronounced;
            return true;
        }

        function refreshFilters() {
            const items = getItems();
            const counts = {
                all: items.length,
                learned: 0,
                unlearned: 0,
                unpronounced: 0
            };

            items.forEach(function (item) {
                const state = getState(item);
                if (state.learned) counts.learned += 1;
                else counts.unlearned += 1;
                if (state.unpronounced) counts.unpronounced += 1;
            });

            Object.keys(counts).forEach(function (key) {
                const out = toolbar.querySelector('[data-filter-count="' + key + '"]');
                if (out) out.textContent = String(counts[key]);
            });

            let visibleCount = 0;
            items.forEach(function (item) {
                const show = matchesFilter(item, activeFilter);
                item.hidden = !show;
                item.classList.toggle('ldd-myvocab-filtered-out', !show);
                if (show) visibleCount += 1;
            });

            empty.hidden = !(items.length > 0 && visibleCount === 0);
        }

        toolbar.addEventListener('click', function (event) {
            const button = event.target.closest('[data-vocab-filter]');
            if (!button) return;

            activeFilter = button.dataset.vocabFilter || 'all';
            toolbar.querySelectorAll('[data-vocab-filter]').forEach(function (btn) {
                const active = btn === button;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            refreshFilters();
        });

        new MutationObserver(function () {
            refreshFilters();
        }).observe(list, { childList: true, subtree: true });

        refreshFilters();
    }

    function injectMyVocabFilterStyles() {
        if (document.getElementById('ldd-myvocab-filter-style')) return;
        const style = document.createElement('style');
        style.id = 'ldd-myvocab-filter-style';
        style.textContent =
            '.ldd-myvocab-filters{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 16px;padding:8px;border:1px solid var(--border);border-radius:14px;background:var(--surface-2);box-shadow:var(--shadow-xs)}' +
            '.ldd-myvocab-filter{appearance:none;border:1px solid transparent;border-radius:10px;padding:8px 11px;background:transparent;color:var(--text-muted);font:inherit;font-size:.75rem;font-weight:750;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:background .15s,border-color .15s,color .15s,transform .15s}' +
            '.ldd-myvocab-filter:hover{background:#fff;border-color:var(--border-strong);color:var(--text);transform:translateY(-1px)}' +
            '.ldd-myvocab-filter.is-active{background:#fff;border-color:var(--primary);color:var(--primary-dark);box-shadow:0 3px 10px rgba(79,110,247,.1)}' +
            '.ldd-myvocab-filter span{min-width:22px;padding:2px 6px;border-radius:999px;background:var(--primary-light);color:var(--primary-dark);font-size:.66rem;font-weight:800;text-align:center}' +
            '.ldd-myvocab-filter-empty{margin:0 0 14px;padding:18px;border:1px dashed var(--border-strong);border-radius:12px;background:var(--surface-2);color:var(--text-muted);font-size:.8rem;text-align:center}' +
            '.myvocab-item.ldd-myvocab-filtered-out{display:none!important}' +
            '@media(max-width:560px){.ldd-myvocab-filters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.ldd-myvocab-filter{justify-content:space-between;width:100%;padding:8px 10px;font-size:.72rem}}';
        document.head.appendChild(style);
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
