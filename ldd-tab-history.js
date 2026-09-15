/* =============================================================
   LDD ENGLISH — MAIN TAB HISTORY NAVIGATION v1
   Browser-like Back / Forward for visited main learning tabs.
   - Uses the existing .main-tab-btn click flow.
   - Supports browser Back / Forward buttons.
   - Restores scroll position for each history entry.
   - Does not touch Supabase or application data.
   ============================================================= */
(function () {
    'use strict';

    const STORAGE_MAX_INDEX = 'ldd_tab_history_max_v1';
    const TAB_LABELS = {
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

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(init);

    function init() {
        const header = document.getElementById('site-header');
        if (!header || document.getElementById('ldd-tab-history-nav')) return;

        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

        createHistoryControls(header);
        initialiseHistoryState();
        bindTabClicks();
        bindBrowserHistory();
        bindScrollMemory();
        bindLoginVisibility();
        updateControls();
    }

    function createHistoryControls(header) {
        const nav = document.createElement('div');
        nav.id = 'ldd-tab-history-nav';
        nav.className = 'ldd-tab-history-nav';
        nav.setAttribute('aria-label', 'Điều hướng lịch sử học tập');
        nav.innerHTML =
            '<button type="button" id="ldd-tab-back" class="ldd-tab-history-btn" aria-label="Quay lại tab trước" title="Quay lại tab trước">' +
                '<span aria-hidden="true">←</span>' +
            '</button>' +
            '<button type="button" id="ldd-tab-forward" class="ldd-tab-history-btn" aria-label="Đi tới tab sau" title="Đi tới tab sau">' +
                '<span aria-hidden="true">→</span>' +
            '</button>' +
            '<span id="ldd-tab-current" class="ldd-tab-current" aria-live="polite"></span>';

        const logo = header.querySelector('.header-logo');
        if (logo && logo.nextSibling) header.insertBefore(nav, logo.nextSibling);
        else if (logo) logo.insertAdjacentElement('afterend', nav);
        else header.insertBefore(nav, header.firstChild);

        const back = document.getElementById('ldd-tab-back');
        const forward = document.getElementById('ldd-tab-forward');

        back.addEventListener('click', function () {
            if (currentIndex <= 0) return;
            rememberCurrentScroll();
            history.back();
        });

        forward.addEventListener('click', function () {
            if (currentIndex >= maxIndex) return;
            rememberCurrentScroll();
            history.forward();
        });
    }

    function initialiseHistoryState() {
        const activeTab = getActiveTabId() || 'tab-phien-am';
        const state = history.state;

        if (state && state.lddNav === true && validTab(state.lddTab)) {
            currentIndex = Number.isFinite(state.lddIndex) ? state.lddIndex : 0;
            const storedMax = parseInt(sessionStorage.getItem(STORAGE_MAX_INDEX) || '', 10);
            maxIndex = Number.isFinite(storedMax) ? Math.max(storedMax, currentIndex) : currentIndex;

            // A reload should reopen the tab represented by the current browser entry.
            if (state.lddTab !== activeTab) {
                restoreTab(state.lddTab, Number.isFinite(state.lddScrollY) ? state.lddScrollY : 0);
            }
        } else {
            currentIndex = 0;
            maxIndex = 0;
            sessionStorage.setItem(STORAGE_MAX_INDEX, '0');
            history.replaceState({
                lddNav: true,
                lddTab: activeTab,
                lddIndex: 0,
                lddScrollY: window.scrollY || 0
            }, '', window.location.href);
        }
    }

    function bindTabClicks() {
        // Capture phase remembers where the learner was BEFORE the app changes tab.
        document.addEventListener('click', function (event) {
            if (restoringHistory) return;
            const button = event.target.closest('.main-tab-btn[data-main-target]');
            if (!button) return;

            const target = button.dataset.mainTarget;
            if (!validTab(target)) return;

            pendingNavigation = {
                target: target,
                fromTab: getActiveTabId(),
                scrollY: window.scrollY || 0
            };
        }, true);

        // Bubble phase runs after the site's existing tab click handler in normal use.
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

                // Save the position of the page being left.
                replaceCurrentState({ lddScrollY: nav.scrollY });

                // Pushing after going Back naturally discards the old Forward branch.
                const nextIndex = currentIndex + 1;
                history.pushState({
                    lddNav: true,
                    lddTab: nav.target,
                    lddIndex: nextIndex,
                    lddScrollY: window.scrollY || 0
                }, '', window.location.href);

                currentIndex = nextIndex;
                maxIndex = nextIndex;
                sessionStorage.setItem(STORAGE_MAX_INDEX, String(maxIndex));
                updateControls();
            });
        }, false);
    }

    function bindBrowserHistory() {
        window.addEventListener('popstate', function (event) {
            const state = event.state;
            if (!state || state.lddNav !== true || !validTab(state.lddTab)) {
                return;
            }

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
            if (scrollTimer) window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(function () {
                rememberCurrentScroll();
            }, 120);
        }, { passive: true });

        window.addEventListener('pagehide', rememberCurrentScroll);
    }

    function bindLoginVisibility() {
        const accountArea = document.getElementById('account-area');
        const nav = document.getElementById('ldd-tab-history-nav');
        if (!nav) return;

        const refresh = function () {
            let loggedIn = true;
            if (accountArea) loggedIn = window.getComputedStyle(accountArea).display !== 'none';
            nav.classList.toggle('is-visible', loggedIn);
        };

        if (accountArea) {
            new MutationObserver(refresh).observe(accountArea, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
        refresh();
    }

    function restoreTab(tabId, scrollY) {
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + cssEscape(tabId) + '"]');
        restoringHistory = true;
        pendingNavigation = null;

        if (trigger) {
            trigger.click();
        } else {
            // Safe fallback: only used if a visible tab has no matching navigation trigger.
            document.querySelectorAll('.main-tab-content').forEach(function (panel) {
                panel.classList.toggle('active', panel.id === tabId);
            });
        }

        requestAnimationFrame(function () {
            window.scrollTo({ top: Math.max(0, scrollY || 0), left: 0, behavior: 'auto' });
            requestAnimationFrame(function () {
                restoringHistory = false;
                updateControls();
            });
        });
    }

    function rememberCurrentScroll() {
        const state = history.state;
        if (!state || state.lddNav !== true) return;
        replaceCurrentState({
            lddTab: getActiveTabId() || state.lddTab,
            lddScrollY: window.scrollY || 0
        });
    }

    function replaceCurrentState(changes) {
        const oldState = history.state && history.state.lddNav === true ? history.state : {};
        const nextState = Object.assign({}, oldState, changes, {
            lddNav: true,
            lddIndex: Number.isFinite(oldState.lddIndex) ? oldState.lddIndex : currentIndex
        });
        history.replaceState(nextState, '', window.location.href);
    }

    function updateControls() {
        const back = document.getElementById('ldd-tab-back');
        const forward = document.getElementById('ldd-tab-forward');
        const current = document.getElementById('ldd-tab-current');
        const active = getActiveTabId();

        if (back) {
            back.disabled = currentIndex <= 0;
            back.setAttribute('aria-disabled', back.disabled ? 'true' : 'false');
        }
        if (forward) {
            forward.disabled = currentIndex >= maxIndex;
            forward.setAttribute('aria-disabled', forward.disabled ? 'true' : 'false');
        }
        if (current) current.textContent = TAB_LABELS[active] || 'LDD English';
    }

    function getActiveTabId() {
        const active = document.querySelector('.main-tab-content.active');
        return active ? active.id : null;
    }

    function validTab(tabId) {
        return !!tabId && !!document.getElementById(tabId) && document.getElementById(tabId).classList.contains('main-tab-content');
    }

    function cssEscape(value) {
        if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
        return String(value).replace(/(["\\])/g, '\\$1');
    }
})();
