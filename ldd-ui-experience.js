/* LDD English — additive learning experience layer.
   Uses tiny inlined Lucide-style icons (ISC); no extra CDN/network dependency.
   Preserves original tab navigation and existing study/test state. */
(function () {
    'use strict';
    if (window.LDDLearningExperience) return;

    const paths = {
        book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        grammar: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 16 4-9 4 9M9 13h6"/>',
        game: '<path d="M6 12h4m-2-2v4"/><path d="M15 12h.01M18 10h.01"/><path d="M7 6h10a5 5 0 0 1 4.8 3.6l.9 7.5a2.4 2.4 0 0 1-4 2.1l-2.2-2.2H7.5l-2.2 2.2a2.4 2.4 0 0 1-4-2.1l.9-7.5A5 5 0 0 1 7 6Z"/>',
        test: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6M9 10h6m-6 4h6m-6 4h3"/>',
        home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
        arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="m19 17 .5 1.5L21 19l-1.5.5L19 21l-.5-1.5L17 19l1.5-.5z"/>'
    };

    function icon(name) {
        return '<svg class="ldd-ux-icon" aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (paths[name] || paths.book) + '</svg>';
    }
    function make(tag, className, html) {
        const node = document.createElement(tag);
        node.className = className;
        if (html != null) node.innerHTML = html;
        return node;
    }
    function goTo(target) {
        if (target === 'tab-trang-chu') {
            const homeButton = document.getElementById('ldd-home-main-tab');
            if (homeButton) homeButton.click();
            window.scrollTo({top:0, behavior:'smooth'});
            return;
        }
        if (window.LDDNavigation && typeof window.LDDNavigation.goToTab === 'function') {
            window.LDDNavigation.goToTab(target);
            return;
        }
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + target + '"]');
        if (trigger) trigger.click();
    }

    function enhanceHome() {
        const tab = document.getElementById('tab-trang-chu');
        if (!tab) return null;
        const intro = tab.querySelector('.ldd-home-intro');
        if (!intro || intro.dataset.uxEnhanced) return tab;
        intro.dataset.uxEnhanced = '1';

        const title = intro.querySelector('.ldd-home-title');
        if (title) {
            const kicker = make('span', 'ldd-ux-kicker', icon('spark') + ' KHÔNG GIAN HỌC TẬP CỦA BẠN');
            intro.insertBefore(kicker, title);
            const copy = make('p', 'ldd-ux-intro-copy');
            copy.textContent = 'Chọn một nhiệm vụ nhỏ, hoàn thành từng bước và theo dõi sự tiến bộ của mình mỗi ngày.';
            title.insertAdjacentElement('afterend', copy);
        }

        const actions = make('div', 'ldd-ux-hero-actions');
        const next = make('button', 'ldd-ux-cta ldd-ux-cta-primary', icon('arrow') + '<span>Bắt đầu học</span>');
        next.type = 'button';
        next.addEventListener('click', function () {
            const priority = tab.querySelector('.ldd-study-next button');
            if (priority) priority.click();
            else goTo('tab-tu-vung');
        });
        const tests = make('button', 'ldd-ux-cta', icon('test') + '<span>Đến bài kiểm tra</span>');
        tests.type = 'button';
        tests.addEventListener('click', function () { goTo('tab-kiem-tra'); });
        actions.appendChild(next);
        actions.appendChild(tests);
        intro.appendChild(actions);

        const cards = [
            { name:'book', sub:'Ôn và ghi nhớ mỗi ngày' },
            { name:'grammar', sub:'Luyện ngữ pháp theo lớp' },
            { name:'game', sub:'Học mà chơi' },
            { name:'test', sub:'Bài được giao & kết quả' }
        ];
        tab.querySelectorAll('.ldd-home-action').forEach(function (card, index) {
            const config = cards[index];
            if (!config || card.dataset.uxEnhanced) return;
            card.dataset.uxEnhanced = '1';
            const glyph = card.querySelector('.ldd-home-action-icon');
            if (glyph) glyph.innerHTML = icon(config.name);
            const text = make('span', 'ldd-home-action-sub');
            text.textContent = config.sub;
            const badge = card.querySelector('.ldd-home-action-badge');
            if (badge) card.insertBefore(text, badge);
            else card.appendChild(text);
            card.insertAdjacentHTML('beforeend', '<span class="ldd-ux-card-arrow">' + icon('arrow') + '</span>');
        });
        return tab;
    }

    function makeDock(tab) {
        if (!tab || document.getElementById('ldd-ux-mobile-dock')) return;
        const dock = document.createElement('nav');
        dock.id = 'ldd-ux-mobile-dock';
        dock.setAttribute('aria-label', 'Lối tắt học tập trên điện thoại');

        [
            ['home', 'Trang chủ', 'tab-trang-chu'],
            ['book', 'Từ vựng', 'tab-tu-vung'],
            ['test', 'Kiểm tra', 'tab-kiem-tra'],
            ['game', 'Giải trí', 'tab-giai-tri']
        ].forEach(function (item) {
            const button = make('button', 'ldd-ux-dock-btn' + (item[2] === 'tab-trang-chu' ? ' is-current' : ''), icon(item[0]) + '<span>' + item[1] + '</span>');
            button.type = 'button';
            button.setAttribute('aria-label', item[1]);
            if (item[2] === 'tab-trang-chu') button.setAttribute('aria-current', 'page');
            button.addEventListener('click', function () { goTo(item[2]); });
            dock.appendChild(button);
        });
        document.body.appendChild(dock);

        const account = document.getElementById('account-area');
        function sync() {
            const loggedIn = !!account && getComputedStyle(account).display !== 'none';
            document.body.classList.toggle('ldd-ux-home-active', loggedIn && tab.classList.contains('active'));
        }
        new MutationObserver(sync).observe(tab, {attributes:true, attributeFilter:['class']});
        if (account) new MutationObserver(sync).observe(account, {attributes:true, attributeFilter:['style','class']});
        sync();
    }

    function keyboardCards() {
        document.querySelectorAll('#kiemtra-folder-grid > .folder-card, #vocab-folder-grid > .folder-card, #huongdan-folder-grid > .folder-card').forEach(function (card) {
            if (card.tagName === 'BUTTON' || card.tagName === 'A' || card.hidden || card.hasAttribute('tabindex')) return;
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('keydown', function (event) {
                if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
                event.preventDefault();
                card.click();
            });
        });
    }

    function start() {
        const tab = enhanceHome();
        if (tab) makeDock(tab);
        keyboardCards();
    }
    window.LDDLearningExperience = { refresh: start };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
    else start();
})();
