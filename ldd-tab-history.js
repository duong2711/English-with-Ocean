/* =============================================================
   LDD ENGLISH — MAIN TAB HISTORY NAVIGATION v3
   Back / Home / Forward + browser history.
   New browsing contexts and explicit logins start at Home.
   ============================================================= */
(function () {
    'use strict';

    const STORAGE_MAX_INDEX = 'ldd_tab_history_max_v3';
    const CONTEXT_STARTED_KEY = 'ldd_home_context_started_v1';
    const FORCE_HOME_KEY = 'ldd_force_home_after_login_v1';
    const TAB_LABELS = {
        'tab-trang-chu': 'Trang chủ',
        'tab-phien-am': 'Phiên âm',
        'tab-tu-vung': 'Từ vựng',
        'tab-ngu-phap': 'Ngữ pháp',
        'tab-mat-goc': 'Mất gốc',
        'tab-thi-thcs': 'THCS',
        'tab-thi-thpt': 'THPT',
        'tab-di-lam': 'Đi làm',
        'tab-ielts': 'IELTS',
        'tab-luyen-nghe': 'Nghe',
        'tab-luyen-noi': 'Nói',
        'tab-luyen-doc': 'Đọc',
        'tab-luyen-viet': 'Viết',
        'tab-kiem-tra': 'Kiểm tra',
        'tab-giai-tri': 'Giải trí',
        'tab-lich-hoc': 'Lịch học',
        'tab-huong-dan': 'Hướng dẫn'
    };

    let currentIndex = 0;
    let maxIndex = 0;
    let pendingNavigation = null;
    let restoringHistory = false;
    let scrollTimer = null;
    let wasLoggedIn = false;
    let freshContext = false;

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }
    ready(init);

    function init() {
        const header = document.getElementById('site-header');
        if (!header || document.getElementById('ldd-tab-history-nav')) return;
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

        freshContext = sessionStorage.getItem(CONTEXT_STARTED_KEY) !== '1';
        sessionStorage.setItem(CONTEXT_STARTED_KEY, '1');

        createHistoryControls(header);
        initialiseHistoryState();
        bindTabClicks();
        bindBrowserHistory();
        bindScrollMemory();
        bindLoginIntent();
        bindLoginVisibility();
        exposeNavigationApi();
        updateControls();
    }

    function createHistoryControls(header) {
        const nav = document.createElement('div');
        nav.id = 'ldd-tab-history-nav';
        nav.className = 'ldd-tab-history-nav';
        nav.setAttribute('aria-label', 'Điều hướng học tập');
        nav.innerHTML =
            '<button type="button" id="ldd-tab-back" class="ldd-tab-history-btn" aria-label="Quay lại" title="Quay lại"><span aria-hidden="true">←</span></button>' +
            '<button type="button" id="ldd-tab-home" class="ldd-tab-history-btn ldd-tab-home-btn" aria-label="Trang chủ" title="Trang chủ"><span aria-hidden="true">⌂</span></button>' +
            '<button type="button" id="ldd-tab-forward" class="ldd-tab-history-btn" aria-label="Đi tới" title="Đi tới"><span aria-hidden="true">→</span></button>' +
            '<span id="ldd-tab-current" class="ldd-tab-current" aria-live="polite"></span>';

        const logo = header.querySelector('.header-logo');
        if (logo && logo.nextSibling) header.insertBefore(nav, logo.nextSibling);
        else if (logo) logo.insertAdjacentElement('afterend', nav);
        else header.insertBefore(nav, header.firstChild);

        document.getElementById('ldd-tab-back').addEventListener('click', function () {
            if (currentIndex <= 0) return;
            rememberCurrentScroll();
            history.back();
        });
        document.getElementById('ldd-tab-forward').addEventListener('click', function () {
            if (currentIndex >= maxIndex) return;
            rememberCurrentScroll();
            history.forward();
        });
        document.getElementById('ldd-tab-home').addEventListener('click', function () {
            goToTab('tab-trang-chu');
        });
    }

    function initialiseHistoryState() {
        const activeTab = getActiveTabId() || (validTab('tab-trang-chu') ? 'tab-trang-chu' : 'tab-phien-am');
        const state = history.state;
        if (state && state.lddNav === true && validTab(state.lddTab)) {
            currentIndex = Number.isFinite(state.lddIndex) ? state.lddIndex : 0;
            const storedMax = parseInt(sessionStorage.getItem(STORAGE_MAX_INDEX) || '', 10);
            maxIndex = Number.isFinite(storedMax) ? Math.max(storedMax, currentIndex) : currentIndex;
            if (state.lddTab !== activeTab) restoreTab(state.lddTab, Number.isFinite(state.lddScrollY) ? state.lddScrollY : 0);
        } else {
            currentIndex = 0;
            maxIndex = 0;
            sessionStorage.setItem(STORAGE_MAX_INDEX, '0');
            history.replaceState({ lddNav: true, lddTab: activeTab, lddIndex: 0, lddScrollY: window.scrollY || 0 }, '', window.location.href);
        }
    }

    function bindTabClicks() {
        document.addEventListener('click', function (event) {
            if (restoringHistory) return;
            const button = event.target.closest('.main-tab-btn[data-main-target]');
            if (!button) return;
            const target = button.dataset.mainTarget;
            if (!validTab(target)) return;
            pendingNavigation = { target: target, fromTab: getActiveTabId(), scrollY: window.scrollY || 0 };
        }, true);

        document.addEventListener('click', function (event) {
            if (restoringHistory) return;
            const button = event.target.closest('.main-tab-btn[data-main-target]');
            if (!button || !pendingNavigation) return;
            const nav = pendingNavigation;
            pendingNavigation = null;
            queueMicrotask(function () {
                if (restoringHistory) return;
                const activeNow = getActiveTabId();
                if (!validTab(nav.target) || nav.target === nav.fromTab || activeNow !== nav.target) {
                    updateControls();
                    return;
                }
                pushTabState(nav.target, nav.scrollY);
            });
        }, false);
    }

    function pushTabState(target, oldScrollY) {
        replaceCurrentState({ lddScrollY: Number.isFinite(oldScrollY) ? oldScrollY : (window.scrollY || 0) });
        const nextIndex = currentIndex + 1;
        history.pushState({ lddNav: true, lddTab: target, lddIndex: nextIndex, lddScrollY: 0 }, '', window.location.href);
        currentIndex = nextIndex;
        maxIndex = nextIndex;
        sessionStorage.setItem(STORAGE_MAX_INDEX, String(maxIndex));
        updateControls();
    }

    function bindBrowserHistory() {
        window.addEventListener('popstate', function (event) {
            const state = event.state;
            if (!state || state.lddNav !== true || !validTab(state.lddTab)) return;
            currentIndex = Number.isFinite(state.lddIndex) ? state.lddIndex : 0;
            const storedMax = parseInt(sessionStorage.getItem(STORAGE_MAX_INDEX) || '', 10);
            if (Number.isFinite(storedMax)) maxIndex = Math.max(storedMax, currentIndex);
            restoreTab(state.lddTab, Number.isFinite(state.lddScrollY) ? state.lddScrollY : 0);
            updateControls();
        });
    }

    function bindScrollMemory() {
        window.addEventListener('scroll', function () {
            if (restoringHistory) return;
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(rememberCurrentScroll, 120);
        }, { passive: true });
        window.addEventListener('pagehide', rememberCurrentScroll);
    }

    function bindLoginIntent() {
        const form = document.getElementById('login-form');
        const google = document.getElementById('google-login-btn');
        if (form) form.addEventListener('submit', markHomeAfterLogin, true);
        if (google) google.addEventListener('click', markHomeAfterLogin, true);
    }

    function markHomeAfterLogin() {
        sessionStorage.setItem(FORCE_HOME_KEY, '1');
    }

    function bindLoginVisibility() {
        const accountArea = document.getElementById('account-area');
        const nav = document.getElementById('ldd-tab-history-nav');
        if (!nav) return;

        const refresh = function () {
            const loggedIn = !accountArea || window.getComputedStyle(accountArea).display !== 'none';
            nav.classList.toggle('is-visible', loggedIn);

            const explicitLogin = sessionStorage.getItem(FORCE_HOME_KEY) === '1';
            const becameLoggedIn = loggedIn && !wasLoggedIn;
            if (becameLoggedIn && (freshContext || explicitLogin)) {
                sessionStorage.removeItem(FORCE_HOME_KEY);
                freshContext = false;
                resetToHome({ smooth: false });
            }
            wasLoggedIn = loggedIn;
        };

        if (accountArea) new MutationObserver(refresh).observe(accountArea, { attributes: true, attributeFilter: ['style', 'class'] });
        refresh();
    }

    function goToTab(tabId, options) {
        options = options || {};
        if (!validTab(tabId)) return false;
        const from = getActiveTabId();
        if (from === tabId) {
            if (options.scrollTop !== false) window.scrollTo({ top: 0, behavior: options.smooth === false ? 'auto' : 'smooth' });
            updateControls();
            return true;
        }

        const oldScroll = window.scrollY || 0;
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + cssEscape(tabId) + '"]');
        if (trigger) {
            trigger.click();
        } else {
            activatePanelDirect(tabId);
            if (!options.noHistory) pushTabState(tabId, oldScroll);
        }
        if (options.scrollTop !== false) requestAnimationFrame(function () { window.scrollTo({ top: 0, behavior: options.smooth === false ? 'auto' : 'smooth' }); });
        return true;
    }

    function resetToHome(options) {
        options = options || {};
        if (!validTab('tab-trang-chu')) return false;
        restoringHistory = true;
        pendingNavigation = null;
        currentIndex = 0;
        maxIndex = 0;
        sessionStorage.setItem(STORAGE_MAX_INDEX, '0');
        activatePanelDirect('tab-trang-chu');
        history.replaceState({ lddNav: true, lddTab: 'tab-trang-chu', lddIndex: 0, lddScrollY: 0 }, '', window.location.href);
        window.scrollTo({ top: 0, left: 0, behavior: options.smooth ? 'smooth' : 'auto' });
        requestAnimationFrame(function () {
            restoringHistory = false;
            updateControls();
        });
        return true;
    }

    function exposeNavigationApi() {
        window.LDDNavigation = Object.assign({}, window.LDDNavigation || {}, {
            goToTab: goToTab,
            home: function () { return goToTab('tab-trang-chu'); },
            resetToHome: resetToHome,
            getActiveTab: getActiveTabId
        });
    }

    function restoreTab(tabId, scrollY) {
        restoringHistory = true;
        pendingNavigation = null;
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + cssEscape(tabId) + '"]');
        if (trigger && tabId !== 'tab-trang-chu') trigger.click();
        else activatePanelDirect(tabId);
        requestAnimationFrame(function () {
            window.scrollTo({ top: Math.max(0, scrollY || 0), left: 0, behavior: 'auto' });
            requestAnimationFrame(function () {
                restoringHistory = false;
                updateControls();
            });
        });
    }

    function activatePanelDirect(tabId) {
        document.querySelectorAll('.main-tab-content').forEach(function (panel) {
            panel.classList.toggle('active', panel.id === tabId);
        });
        document.querySelectorAll('.main-tab-btn[data-main-target]').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.mainTarget === tabId);
        });
        document.querySelectorAll('.main-tab-dropdown-btn').forEach(function (btn) { btn.classList.remove('active'); });
    }

    function rememberCurrentScroll() {
        const state = history.state;
        if (!state || state.lddNav !== true) return;
        replaceCurrentState({ lddTab: getActiveTabId() || state.lddTab, lddScrollY: window.scrollY || 0 });
    }

    function replaceCurrentState(changes) {
        const oldState = history.state && history.state.lddNav === true ? history.state : {};
        history.replaceState(Object.assign({}, oldState, changes, {
            lddNav: true,
            lddIndex: Number.isFinite(oldState.lddIndex) ? oldState.lddIndex : currentIndex
        }), '', window.location.href);
    }

    function updateControls() {
        const back = document.getElementById('ldd-tab-back');
        const forward = document.getElementById('ldd-tab-forward');
        const home = document.getElementById('ldd-tab-home');
        const current = document.getElementById('ldd-tab-current');
        const active = getActiveTabId();
        if (back) { back.disabled = currentIndex <= 0; back.setAttribute('aria-disabled', back.disabled ? 'true' : 'false'); }
        if (forward) { forward.disabled = currentIndex >= maxIndex; forward.setAttribute('aria-disabled', forward.disabled ? 'true' : 'false'); }
        if (home) home.classList.toggle('is-active', active === 'tab-trang-chu');
        if (current) current.textContent = TAB_LABELS[active] || 'LDD English';
    }

    function getActiveTabId() {
        const active = document.querySelector('.main-tab-content.active');
        return active ? active.id : null;
    }
    function validTab(tabId) {
        const el = tabId && document.getElementById(tabId);
        return !!(el && el.classList.contains('main-tab-content'));
    }
    function cssEscape(value) {
        if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
        return String(value).replace(/(["\\])/g, '\\$1');
    }
})();
