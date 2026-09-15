/* =============================================================
   LDD ENGLISH — HOME + PHONETICS UI v5
   Non-destructive DOM enhancement. No Supabase calls.
   ============================================================= */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        ensureTabHistoryAssets();
        enhanceHomeAndPhonetics();
    });

    function ensureTabHistoryAssets() {
        if (!document.getElementById('ldd-tab-history-style')) {
            const link = document.createElement('link');
            link.id = 'ldd-tab-history-style';
            link.rel = 'stylesheet';
            link.href = 'ldd-tab-history.css?v=1';
            document.head.appendChild(link);
        }

        if (!document.getElementById('ldd-tab-history-script')) {
            const script = document.createElement('script');
            script.id = 'ldd-tab-history-script';
            script.src = 'ldd-tab-history.js?v=1';
            script.defer = true;
            document.body.appendChild(script);
        }
    }

    function enhanceHomeAndPhonetics() {
        const tab = document.getElementById('tab-phien-am');
        if (!tab) return;
        addHomeDashboard(tab);
        addPhoneticsHeading(tab);
    }

    function addHomeDashboard(tab) {
        if (tab.querySelector('.ldd-home-dashboard')) return;

        const dashboard = document.createElement('section');
        dashboard.className = 'ldd-home-dashboard';
        dashboard.innerHTML =
            '<div class="ldd-home-main">' +
                '<div class="ldd-home-kicker">LDD English · Học cùng Ocean</div>' +
                '<h2 class="ldd-home-title">Chào <strong data-ldd-home-name>Học viên</strong> 👋</h2>' +
                '<p class="ldd-home-desc">Chọn nội dung cần học hôm nay hoặc tiếp tục luyện phát âm ngay bên dưới. Các khu vực vẫn dùng đúng dữ liệu và tiến độ hiện tại của bạn.</p>' +
                '<div class="ldd-home-actions">' +
                    actionHtml('Aa', 'Từ vựng', 'Ôn & vận dụng', 'tab-tu-vung') +
                    actionHtml('G', 'Ngữ pháp', 'Học & luyện bài', 'tab-ngu-phap') +
                    actionHtml('→', 'Lộ trình', 'Học theo mục tiêu', 'tab-mat-goc') +
                    actionHtml('✓', 'Kiểm tra', 'Bài được giao', 'tab-kiem-tra') +
                '</div>' +
            '</div>' +
            '<aside class="ldd-home-side">' +
                '<div class="ldd-home-side-title">Hôm nay</div>' +
                '<div class="ldd-home-stat" data-home-stat="tests"><span class="ldd-home-stat-label">Bài cần làm</span><strong class="ldd-home-stat-value">0</strong></div>' +
                '<div class="ldd-home-stat" data-home-stat="news"><span class="ldd-home-stat-label">Tin mới</span><strong class="ldd-home-stat-value">0</strong></div>' +
                '<div class="ldd-home-stat is-good" data-home-stat="ipa"><span class="ldd-home-stat-label">IPA hoàn thành</span><strong class="ldd-home-stat-value">0</strong></div>' +
            '</aside>';

        tab.insertBefore(dashboard, tab.firstChild);

        dashboard.querySelectorAll('[data-ldd-target]').forEach(function (button) {
            button.addEventListener('click', function () {
                openMainTab(button.dataset.lddTarget);
            });
        });

        bindName(dashboard);
        bindDashboardStats(dashboard);
    }

    function actionHtml(icon, title, subtitle, target) {
        return '<button type="button" class="ldd-home-action" data-ldd-target="' + target + '">' +
            '<span class="ldd-home-action-icon" aria-hidden="true">' + icon + '</span>' +
            '<span class="ldd-home-action-title">' + title + '</span>' +
            '<span class="ldd-home-action-sub">' + subtitle + '</span>' +
        '</button>';
    }

    function openMainTab(target) {
        const selector = '.main-tab-btn[data-main-target="' + target + '"]';
        const trigger = document.querySelector(selector);
        if (trigger) {
            trigger.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        document.querySelectorAll('.main-tab-content').forEach(function (el) {
            el.classList.toggle('active', el.id === target);
        });
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

        if (source) {
            new MutationObserver(update).observe(source, { childList: true, characterData: true, subtree: true });
        }
        update();
    }

    function bindDashboardStats(dashboard) {
        const testOut = dashboard.querySelector('[data-home-stat="tests"] .ldd-home-stat-value');
        const testBox = dashboard.querySelector('[data-home-stat="tests"]');
        const newsOut = dashboard.querySelector('[data-home-stat="news"] .ldd-home-stat-value');
        const ipaOut = dashboard.querySelector('[data-home-stat="ipa"] .ldd-home-stat-value');
        const ipaLabel = dashboard.querySelector('[data-home-stat="ipa"] .ldd-home-stat-label');

        const watchTargets = [
            document.getElementById('ctest-folder-badge'),
            document.getElementById('vocab-test-folder-badge'),
            document.getElementById('news-folder-badge'),
            document.getElementById('phonam-grading-count'),
            document.getElementById('phonam-grading-panel')
        ].filter(Boolean);

        const update = function () {
            const tests = visibleBadgeNumber(document.getElementById('ctest-folder-badge')) +
                          visibleBadgeNumber(document.getElementById('vocab-test-folder-badge'));
            if (testOut) testOut.textContent = String(tests);
            if (testBox) testBox.classList.toggle('is-alert', tests > 0);

            const news = visibleBadgeNumber(document.getElementById('news-folder-badge'));
            if (newsOut) newsOut.textContent = String(news);

            const gradingPanel = document.getElementById('phonam-grading-panel');
            const gradingCount = numberFrom(document.getElementById('phonam-grading-count'));
            const gradingVisible = gradingPanel && window.getComputedStyle(gradingPanel).display !== 'none' && gradingCount > 0;

            if (gradingVisible) {
                if (ipaLabel) ipaLabel.textContent = 'Ghi âm chờ chấm';
                if (ipaOut) ipaOut.textContent = String(gradingCount);
            } else {
                const all = document.querySelectorAll('.ipa-symbol').length;
                const done = document.querySelectorAll('.ipa-symbol.completed').length;
                if (ipaLabel) ipaLabel.textContent = 'IPA hoàn thành';
                if (ipaOut) ipaOut.textContent = all ? (done + '/' + all) : String(done);
            }
        };

        watchTargets.forEach(function (node) {
            new MutationObserver(update).observe(node, {
                childList: true,
                characterData: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        });

        const ipaChart = document.querySelector('.ipa-chart');
        if (ipaChart) {
            new MutationObserver(update).observe(ipaChart, {
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        }
        update();
    }

    function visibleBadgeNumber(el) {
        if (!el) return 0;
        if (window.getComputedStyle(el).display === 'none') return 0;
        return numberFrom(el) || (String(el.textContent || '').trim() ? 1 : 0);
    }

    function numberFrom(el) {
        if (!el) return 0;
        const n = parseInt(String(el.textContent || '').replace(/\D/g, ''), 10);
        return Number.isFinite(n) ? n : 0;
    }

    function addPhoneticsHeading(tab) {
        if (tab.querySelector('.ldd-phonetics-heading')) return;
        const guide = document.getElementById('guide-display');
        const chart = tab.querySelector('.ipa-chart');
        if (!guide && !chart) return;

        const heading = document.createElement('div');
        heading.className = 'ldd-phonetics-heading';
        heading.innerHTML =
            '<div class="ldd-phonetics-heading-copy">' +
                '<h2>Pronunciation Studio</h2>' +
                '<p>Chọn một âm IPA, xem khẩu hình, nghe hướng dẫn rồi ghi âm để luyện lại.</p>' +
            '</div>' +
            '<span class="ldd-phonetics-badge">IPA · Video · Ghi âm</span>';

        const anchor = guide || chart;
        tab.insertBefore(heading, anchor);
    }
})();
