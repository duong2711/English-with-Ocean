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
            const kicker = make('span', 'ldd-ux-kicker', icon('spark') + ' HỌC TỪNG BƯỚC');
            intro.insertBefore(kicker, title);
            const copy = make('p', 'ldd-ux-intro-copy');
            copy.textContent = 'Bài giáo viên giao và những phần cần ôn được sắp xếp ngay bên dưới. Cứ bắt đầu từ việc quan trọng nhất.';
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
        const tests = make('button', 'ldd-ux-cta', icon('book') + '<span>Hướng dẫn sử dụng</span>');
        tests.type = 'button';
        tests.addEventListener('click', function () { goTo('tab-huong-dan'); });
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
        // Keep navigation familiar in main catalogs, but never float over an
        // active exercise, nested lesson, exam, video or multiplayer game.
        const rootGrids = {
            'tab-tu-vung': 'vocab-folder-grid',
            'tab-kiem-tra': 'kiemtra-folder-grid',
            'tab-giai-tri': 'entertainment-folder-grid'
        };
        const panels = Array.from(document.querySelectorAll('.main-tab-content'));
        function visibleRoot(id) {
            const grid = document.getElementById(rootGrids[id]);
            return !!grid && !grid.hidden && getComputedStyle(grid).display !== 'none' &&
                grid.getClientRects().length > 0;
        }
        function sync() {
            const loggedIn = !!account && getComputedStyle(account).display !== 'none';
            const active = panels.find(function (p) { return p.classList.contains('active'); });
            const target = active ? active.id : '';
            const safe = target === 'tab-trang-chu' || (rootGrids[target] && visibleRoot(target));
            document.body.classList.toggle('ldd-ux-home-active', !!loggedIn && !!safe);
            dock.querySelectorAll('.ldd-ux-dock-btn').forEach(function (button, index) {
                const current = [
                    'tab-trang-chu','tab-tu-vung','tab-kiem-tra','tab-giai-tri'
                ][index] === target;
                button.classList.toggle('is-current', current);
                if (current) button.setAttribute('aria-current', 'page');
                else button.removeAttribute('aria-current');
            });
        }
        const navigationObserver = new MutationObserver(sync);
        panels.forEach(function (panel) {
            navigationObserver.observe(panel, {attributes:true, attributeFilter:['class']});
        });
        Object.values(rootGrids).forEach(function (id) {
            const grid = document.getElementById(id);
            if (grid) navigationObserver.observe(grid, {attributes:true, attributeFilter:['style','class','hidden']});
        });
        if (account) new MutationObserver(sync).observe(account, {attributes:true, attributeFilter:['style','class']});
        sync();
    }

    // Keep the action the learner should do NEXT above generic course navigation.
    function prioritizeLearning(tab) {
        const dashboard = tab.querySelector('.ldd-home-dashboard');
        const side = tab.querySelector('.ldd-today-shell');
        const cards = tab.querySelector('.ldd-home-actions');
        if (!dashboard || !side || !cards || document.getElementById('ldd-ux-learning-shortcuts')) return;

        const shortcuts = document.createElement('section');
        shortcuts.className = 'ldd-ux-learning-shortcuts';
        shortcuts.id = 'ldd-ux-learning-shortcuts';
        shortcuts.setAttribute('aria-label', 'Khám phá các mục học tập');
        const heading = make('h2', 'ldd-ux-section-heading');
        heading.textContent = 'Học theo mục';
        shortcuts.appendChild(heading);
        shortcuts.appendChild(cards);
        side.insertAdjacentElement('afterend', shortcuts);
        const headCopy = side.querySelector('.ldd-today-head-copy');
        if (headCopy && !headCopy.querySelector('.ldd-ux-today-tip')) {
            const hint = make('p', 'ldd-ux-today-tip');
            hint.textContent = 'Ưu tiên bài được giao, sau đó chọn phần cần luyện thêm.';
            headCopy.appendChild(hint);
        }
    }

    let moreOpen = false;
    let completedOpen = false;
    let leaderboardOpen = false;

    // Progressive disclosure: no task is deleted or disabled. Hidden tasks
    // remain accessible through a clearly labeled keyboard-operable button.
    function simplifyDailyTasks(host) {
        if (!host) return;
        const weekTitle = host.querySelector('.ldd-study-week h3');
        if (weekTitle && weekTitle.textContent === '7 ngày vừa qua') {
            // Only reading, podcast and IPA-related activity currently feeds this chart.
            weekTitle.textContent = 'Đọc, nghe & ghi âm · 7 ngày';
        }
        const grid = host.querySelector('.ldd-today-primary.ldd-today-mission-grid');
        if (grid && grid.dataset.uxFolded !== '1') {
            grid.dataset.uxFolded = '1';
            const missions = Array.from(grid.children).filter(function (node) {
                return node.classList && node.classList.contains('ldd-daily-mission');
            });
            if (missions.length > 2) {
                const rest = make('div', 'ldd-ux-more-missions');
                rest.id = 'ldd-ux-more-missions';
                rest.hidden = !moreOpen;
                missions.slice(2).forEach(function (node) { rest.appendChild(node); });
                const button = make('button', 'ldd-ux-fold-button');
                button.type = 'button';
                button.setAttribute('aria-controls', rest.id);
                const count = missions.length - 2;
                function update() {
                    button.textContent = moreOpen ? 'Thu gọn nhiệm vụ' : 'Xem thêm ' + count + ' nhiệm vụ';
                    button.setAttribute('aria-expanded', String(moreOpen));
                    rest.hidden = !moreOpen;
                }
                button.addEventListener('click', function () { moreOpen = !moreOpen; update(); });
                grid.insertAdjacentElement('afterend', rest);
                rest.insertAdjacentElement('afterend', button);
                update();
            }
        }
        const completed = host.querySelector('.ldd-today-completed-wrap');
        if (completed && !completed.closest('.ldd-ux-completed-details')) {
            const originalTitle = completed.querySelector('.ldd-today-completed-title');
            const count = originalTitle && originalTitle.querySelector('small')
                ? originalTitle.querySelector('small').textContent : '';
            if (originalTitle) originalTitle.remove();
            const details = make('details', 'ldd-ux-completed-details');
            details.open = completedOpen;
            const summary = make('summary', 'ldd-ux-completed-summary');
            summary.textContent = '✓ Đã hoàn thành' + (count ? ' · ' + count : '');
            details.appendChild(summary);
            completed.parentNode.replaceChild(details, completed);
            details.appendChild(completed);
            details.addEventListener('toggle', function () { completedOpen = details.open; });
        }
    }

    function simplifyLeaderboard(dashboard) {
        const panel = dashboard.querySelector('#ldd-home-live-panel');
        if (!panel || panel.querySelector('.ldd-ux-leaderboard-details')) return;
        const items = Array.from(panel.children).filter(function (item) {
            return item.classList && item.classList.contains('ldd-home-live-card');
        });
        const leaderboard = items.find(function (item) { return !!item.querySelector('#ldd-home-leaderboard'); });
        if (!leaderboard) return;
        const details = make('details', 'ldd-ux-leaderboard-details');
        const summary = make('summary', 'ldd-ux-leaderboard-summary');
        summary.textContent = '🔥 Xem bảng xếp hạng chăm chỉ';
        details.open = leaderboardOpen;
        leaderboard.parentNode.replaceChild(details, leaderboard);
        details.appendChild(summary);
        details.appendChild(leaderboard);
        details.addEventListener('toggle', function () { leaderboardOpen = details.open; });
    }

    function observeStudentHome(tab) {
        if (tab.dataset.uxObserving) return;
        tab.dataset.uxObserving = '1';
        const dashboard = tab.querySelector('.ldd-home-dashboard');
        if (!dashboard) return;
        const host = dashboard.querySelector('#ldd-today-tasks');
        if (host) {
            simplifyDailyTasks(host);
            // Listen only for the daily dashboard replacing its direct children;
            // no body-wide observer or polling.
            new MutationObserver(function () { simplifyDailyTasks(host); })
                .observe(host, {childList:true});
        }
        simplifyLeaderboard(dashboard);
        new MutationObserver(function () { simplifyLeaderboard(dashboard); })
            .observe(dashboard, {childList:true});
    }

    function clarifyStudyChoices() {
        const vocabHeading = document.querySelector('#tab-tu-vung .ldd-vocab-hero h2') || document.querySelector('#tab-tu-vung > h2');
        if (vocabHeading && vocabHeading.textContent.trim() === 'Từ vựng theo chủ đề') {
            vocabHeading.textContent = 'Từ vựng';
        }
        const grid = document.getElementById('kiemtra-folder-grid');
        const assigned = document.getElementById('ctest-folder-card');
        if (!grid || !assigned || !grid.contains(assigned)) return;
        // The assigned test is the most relevant exam entry for enrolled learners.
        // Reorder AFTER legacy test-card decoration has finished.
        if (grid.firstElementChild !== assigned) grid.insertBefore(assigned, grid.firstElementChild);
        if (assigned.dataset.uxPriority !== '1') {
            assigned.dataset.uxPriority = '1';
            const label = make('span', 'ldd-ux-assigned-cue');
            label.textContent = 'BÀI GIÁO VIÊN GIAO';
            assigned.appendChild(label);
        }
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
        ['kiemtra-folder-grid', 'vocab-folder-grid', 'huongdan-folder-grid'].forEach(function (id) {
            const grid = document.getElementById(id);
            if (!grid || grid.dataset.uxKeyboardObserved) return;
            grid.dataset.uxKeyboardObserved = '1';
            new MutationObserver(keyboardCards).observe(grid, {childList:true});
        });
    }

    function start() {
        const tab = enhanceHome();
        if (tab) {
            prioritizeLearning(tab);
            makeDock(tab);
            observeStudentHome(tab);
        }
        clarifyStudyChoices();
        keyboardCards();
    }
    window.LDDLearningExperience = { refresh: start };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
    else start();
})();
