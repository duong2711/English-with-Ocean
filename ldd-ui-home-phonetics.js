/* =============================================================
   LDD ENGLISH — HOME + PHONETICS UI v8.4
   Dedicated Home tab + Pronunciation Studio.
   ============================================================= */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        ensureTabHistoryAssets();
        ensureTodayAssets();
        enhanceHomeAndPhonetics();
    });

    function ensureTabHistoryAssets() {
        ensureStyle('ldd-tab-history-style', 'ldd-tab-history.css?v=2');
        ensureScript('ldd-tab-history-script', 'ldd-tab-history.js?v=3');
    }

    function ensureTodayAssets() {
        ensureStyle('ldd-today-style', 'ldd-ui-today.css?v=1');
        ensureScript('ldd-today-script', 'ldd-ui-today.js?v=1');
    }

    function ensureStyle(id, href) {
        if (document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function ensureScript(id, src) {
        if (document.getElementById(id)) return;
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    }

    function enhanceHomeAndPhonetics() {
        const phoneticsTab = document.getElementById('tab-phien-am');
        if (!phoneticsTab) return;
        const homeTab = ensureHomeTab(phoneticsTab);
        addHomeDashboard(homeTab);
        addPhoneticsHeading(phoneticsTab);
        ensureHomeHeaderButton();
        bindHomeCompatibility(homeTab);

        const active = document.querySelector('.main-tab-content.active');
        const hasLddHistory = !!(history.state && history.state.lddNav === true);
        if (isLoggedIn() && !hasLddHistory && (!active || active.id === 'tab-phien-am')) activateHomeDirect();
    }

    function isLoggedIn() {
        const account = document.getElementById('account-area');
        return !!(account && window.getComputedStyle(account).display !== 'none');
    }

    function ensureHomeTab(phoneticsTab) {
        let home = document.getElementById('tab-trang-chu');
        if (!home) {
            home = document.createElement('div');
            home.id = 'tab-trang-chu';
            home.className = 'main-tab-content ldd-home-page';
            phoneticsTab.parentNode.insertBefore(home, phoneticsTab);
        }
        const oldDashboard = phoneticsTab.querySelector('.ldd-home-dashboard');
        if (oldDashboard && !home.contains(oldDashboard)) home.appendChild(oldDashboard);
        return home;
    }

    function ensureHomeHeaderButton() {
        const nav = document.getElementById('header-tabs-nav');
        if (!nav || document.getElementById('ldd-home-main-tab')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'ldd-home-main-tab';
        btn.className = 'header-tab-btn main-tab-btn ldd-home-main-tab';
        btn.dataset.mainTarget = 'tab-trang-chu';
        btn.textContent = 'Trang chủ';
        btn.addEventListener('click', function () {
            if (!isLoggedIn()) return;
            activateHomeDirect();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        nav.insertBefore(btn, nav.firstChild);
    }

    function bindHomeCompatibility(homeTab) {
        if (homeTab.dataset.lddCompatBound === '1') return;
        homeTab.dataset.lddCompatBound = '1';

        document.addEventListener('click', function (event) {
            const btn = event.target.closest('.main-tab-btn[data-main-target]');
            if (btn && btn.dataset.mainTarget !== 'tab-trang-chu') homeTab.classList.remove('active');
        }, true);

        const account = document.getElementById('account-area');
        if (account) {
            const sync = function () {
                const loggedIn = window.getComputedStyle(account).display !== 'none';
                if (!loggedIn) {
                    homeTab.classList.remove('active');
                    return;
                }
                const hasLddHistory = !!(history.state && history.state.lddNav === true);
                const active = document.querySelector('.main-tab-content.active');
                if (!hasLddHistory && (!active || active.id === 'tab-phien-am')) activateHomeDirect();
            };
            new MutationObserver(sync).observe(account, { attributes: true, attributeFilter: ['style', 'class'] });
            sync();
        }
    }

    function activateHomeDirect() {
        document.querySelectorAll('.main-tab-content').forEach(function (panel) {
            panel.classList.toggle('active', panel.id === 'tab-trang-chu');
        });
        document.querySelectorAll('.main-tab-btn[data-main-target]').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.mainTarget === 'tab-trang-chu');
        });
        document.querySelectorAll('.main-tab-dropdown-btn').forEach(function (btn) { btn.classList.remove('active'); });
    }

    function addHomeDashboard(tab) {
        if (tab.querySelector('.ldd-home-dashboard')) return;
        const dashboard = document.createElement('section');
        dashboard.className = 'ldd-home-dashboard';
        dashboard.innerHTML =
            '<div class="ldd-home-main">' +
                '<div class="ldd-home-kicker">LDD English · Học cùng Ocean</div>' +
                '<h2 class="ldd-home-title">Chào <strong data-ldd-home-name>Học viên</strong> 👋</h2>' +
                '<p class="ldd-home-desc">Đây là Trang chủ học tập của bạn. Xem việc cần làm hôm nay, mở nhanh khu vực học và theo dõi tiến độ ngay tại đây.</p>' +
                '<div class="ldd-home-actions">' +
                    actionHtml('Aa', 'Từ vựng', 'Ôn & vận dụng', 'tab-tu-vung', 'vocab') +
                    actionHtml('G', 'Ngữ pháp', 'Học & luyện bài', 'tab-ngu-phap') +
                    actionHtml('★', 'Giải trí', 'Học mà chơi', 'tab-giai-tri') +
                    actionHtml('✓', 'Kiểm tra', 'Bài được giao', 'tab-kiem-tra', 'tests') +
                '</div>' +
            '</div>' +
            '<aside class="ldd-home-side ldd-today-shell">' +
                '<div class="ldd-home-side-title">Hôm nay</div>' +
                '<div id="ldd-today-tasks" class="ldd-today-tasks"><div class="ldd-today-loading">Đang tải nhiệm vụ...</div></div>' +
            '</aside>';
        tab.appendChild(dashboard);
        dashboard.querySelectorAll('[data-ldd-target]').forEach(function (button) {
            button.addEventListener('click', function () { openMainTab(button.dataset.lddTarget); });
        });
        bindName(dashboard);
        bindActionBadges(dashboard);
    }

    function actionHtml(icon, title, subtitle, target, badgeKey) {
        return '<button type="button" class="ldd-home-action" data-ldd-target="' + target + '">' +
            '<span class="ldd-home-action-icon" aria-hidden="true">' + icon + '</span>' +
            '<span class="ldd-home-action-title">' + title + '</span>' +
            '<span class="ldd-home-action-sub">' + subtitle + '</span>' +
            (badgeKey ? '<span class="ldd-home-action-badge" data-home-action-badge="' + badgeKey + '" hidden>0</span>' : '') +
        '</button>';
    }

    function bindActionBadges(dashboard) {
        const configs = {
            vocab: ['myvocab-folder-badge', 'news-folder-badge'],
            tests: ['ctest-folder-badge', 'vocab-test-folder-badge']
        };

        Object.keys(configs).forEach(function (key) {
            const out = dashboard.querySelector('[data-home-action-badge="' + key + '"]');
            if (!out) return;
            const sources = configs[key].map(function (id) { return document.getElementById(id); }).filter(Boolean);

            const update = function () {
                let total = 0;
                sources.forEach(function (badge) {
                    if (window.getComputedStyle(badge).display === 'none') return;
                    const raw = String(badge.textContent || '').trim();
                    const n = parseInt(raw.replace(/\D/g, ''), 10);
                    total += Number.isFinite(n) ? n : (raw ? 1 : 0);
                });
                out.textContent = total > 99 ? '99+' : String(total);
                out.hidden = total <= 0;
                const card = out.closest('.ldd-home-action');
                if (card) card.classList.toggle('has-badge', total > 0);
            };

            sources.forEach(function (badge) {
                new MutationObserver(update).observe(badge, {
                    childList: true,
                    characterData: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
            });
            update();
        });
    }

    function openMainTab(target) {
        if (window.LDDNavigation && typeof window.LDDNavigation.goToTab === 'function') {
            window.LDDNavigation.goToTab(target);
            return;
        }
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + target + '"]');
        if (trigger) trigger.click();
        else document.querySelectorAll('.main-tab-content').forEach(function (el) { el.classList.toggle('active', el.id === target); });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function bindName(dashboard) {
        const source = document.getElementById('account-display-name');
        const output = dashboard.querySelector('[data-ldd-home-name]');
        if (!output) return;
        const update = function () {
            const raw = source ? (source.textContent || '').trim() : '';
            output.textContent = raw && raw !== 'Học viên' ? raw : 'bạn';
        };
        if (source) new MutationObserver(update).observe(source, { childList: true, characterData: true, subtree: true });
        update();
    }

    function addPhoneticsHeading(tab) {
        if (tab.querySelector('.ldd-phonetics-heading')) return;
        const guide = document.getElementById('guide-display');
        const chart = tab.querySelector('.ipa-chart');
        if (!guide && !chart) return;
        const heading = document.createElement('div');
        heading.className = 'ldd-phonetics-heading';
        heading.innerHTML = '<div class="ldd-phonetics-heading-copy"><h2>Pronunciation Studio</h2><p>Chọn một âm IPA, xem khẩu hình, nghe hướng dẫn rồi ghi âm để luyện lại.</p></div><span class="ldd-phonetics-badge">IPA · Video · Ghi âm</span>';
        tab.insertBefore(heading, guide || chart);
    }
})();
