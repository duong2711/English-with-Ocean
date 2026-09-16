/* =============================================================
   LDD ENGLISH — UI UPGRADE v5.5
   Non-destructive DOM enhancement. No Supabase calls.
   Load AFTER scriptphonetics.js.
   ============================================================= */
(function () {
    'use strict';

    function onReady(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    onReady(function () {
        document.body.classList.add('ldd-ui-v2');
        ensureUpgradeAssets();
        enhanceTestCenter();
        observeCustomTestRows();
        enhanceLearningRoadmaps();
        enhanceReadingLab();
    });

    function ensureUpgradeAssets() {
        ensureStylesheet('ldd-roadmap-news-style', 'ldd-ui-roadmap-news.css?v=2');
        ensureStylesheet('ldd-vocab-grammar-style', 'ldd-ui-vocab-grammar.css?v=1');
        ensureStylesheet('ldd-home-phonetics-style', 'ldd-ui-home-phonetics.css?v=4.1');
        // Giữ stylesheet timer vì Trang chủ mới dùng lại giao diện Countdown + Leaderboard.
        // JS timer cũ không còn nạp: ldd-ui-today.js đảm nhiệm dữ liệu Home để tránh gọi trùng.
        ensureStylesheet('ldd-timers-style', 'ldd-ui-timers.css?v=2.1');
        ensureStylesheet('ldd-student-grade-style', 'ldd-student-grade.css?v=1');
        ensureStylesheet('ldd-vocab-race-style', 'ldd-vocab-race.css?v=1');
        ensureScript('ldd-vocab-grammar-script', 'ldd-ui-vocab-grammar.js?v=2');
        ensureScript('ldd-home-phonetics-script', 'ldd-ui-home-phonetics.js?v=8.5');
        ensureScript('ldd-student-grade-script', 'ldd-student-grade.js?v=2');
        ensureScript('ldd-thcs-vocab-reset-script', 'ldd-thcs-vocab-reset.js?v=3');
        ensureScript('ldd-fast-progress-script', 'ldd-fast-progress.js?v=1');
    }

    function ensureStylesheet(id, href) {
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

    function enhanceTestCenter() {
        const tab = document.getElementById('tab-kiem-tra');
        const grid = document.getElementById('kiemtra-folder-grid');
        if (!tab || !grid) return;
        addTestHero(tab, grid);
        enhanceFolderCards(grid);
    }

    function addTestHero(tab, grid) {
        if (tab.querySelector('.ldd-test-hero')) return;
        const oldTitle = Array.from(tab.children).find(function (el) { return el.tagName === 'H2'; });
        if (!oldTitle) return;

        const hero = document.createElement('section');
        hero.className = 'ldd-test-hero';

        const copy = document.createElement('div');
        copy.className = 'ldd-test-hero-copy';

        const kicker = document.createElement('div');
        kicker.className = 'ldd-test-hero-kicker';
        kicker.textContent = 'LDD Learning Center';

        const desc = document.createElement('p');
        desc.textContent = 'Luyện tập, làm bài được giao và theo dõi các nội dung kiểm tra trong một nơi.';

        copy.appendChild(kicker);
        copy.appendChild(oldTitle);
        copy.appendChild(desc);

        const stat = document.createElement('div');
        stat.className = 'ldd-hero-stat';
        stat.innerHTML = '<strong class="ldd-hero-stat-value" id="ldd-pending-test-count">0</strong>' +
                         '<span class="ldd-hero-stat-label">bài đang chờ</span>';

        hero.appendChild(copy);
        hero.appendChild(stat);
        grid.parentNode.insertBefore(hero, grid);

        const badges = [
            document.getElementById('ctest-folder-badge'),
            document.getElementById('vocab-test-folder-badge')
        ].filter(Boolean);

        const updatePending = function () {
            let total = 0;
            badges.forEach(function (badge) {
                const style = window.getComputedStyle(badge);
                if (style.display === 'none') return;
                const n = parseInt((badge.textContent || '').replace(/\D/g, ''), 10);
                if (Number.isFinite(n)) total += n;
                else if (badge.textContent.trim()) total += 1;
            });
            const out = document.getElementById('ldd-pending-test-count');
            if (out) out.textContent = String(total);
        };

        badges.forEach(function (badge) {
            new MutationObserver(updatePending).observe(badge, {
                childList: true,
                characterData: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        });
        updatePending();
    }

    function enhanceFolderCards(grid) {
        const configs = [
            { id: 'vocab-test-folder', icon: 'Aa', title: 'Từ vựng', subtitle: 'Ôn luyện và kiểm tra vốn từ', kind: 'vocab' },
            { index: 1, icon: '6–12', title: 'Đề thi lớp 6–12', subtitle: 'Bài luyện theo từng khối lớp', kind: 'school' },
            { index: 2, icon: 'TH', title: 'Chuyển cấp THCS/THPT', subtitle: 'Luyện đề theo mục tiêu chuyển cấp', kind: 'school' },
            { id: 'ielts-sample-folder-card', icon: 'IELTS', title: 'Đề minh họa IELTS', subtitle: 'Làm quen cấu trúc bài thi IELTS', kind: 'ielts' },
            { id: 'ctest-folder-card', icon: '✓', title: 'Bài kiểm tra riêng', subtitle: 'Bài giáo viên giao và kết quả', kind: 'private' }
        ];

        const cards = Array.from(grid.querySelectorAll(':scope > .folder-card'));
        configs.forEach(function (cfg) {
            const card = cfg.id ? document.getElementById(cfg.id) : cards[cfg.index];
            if (!card || card.dataset.lddEnhanced === '1') return;

            card.dataset.lddEnhanced = '1';
            card.dataset.lddKind = cfg.kind;

            Array.from(card.childNodes).forEach(function (node) {
                if (node.nodeType === Node.TEXT_NODE) node.remove();
            });

            const icon = document.createElement('span');
            icon.className = 'ldd-folder-card-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = cfg.icon;

            const copy = document.createElement('span');
            copy.className = 'ldd-folder-card-copy';

            const title = document.createElement('span');
            title.className = 'ldd-folder-card-title';
            title.textContent = cfg.title;

            const subtitle = document.createElement('span');
            subtitle.className = 'ldd-folder-card-subtitle';
            subtitle.textContent = cfg.subtitle;

            copy.appendChild(title);
            copy.appendChild(subtitle);

            card.insertBefore(icon, card.firstChild);
            const firstBadge = Array.from(card.children).find(function (el) {
                return el.classList && el.classList.contains('tab-badge-count');
            });
            if (firstBadge) card.insertBefore(copy, firstBadge);
            else card.appendChild(copy);
        });
    }

    function observeCustomTestRows() {
        const container = document.getElementById('ctest-list-container');
        if (!container) return;

        const decorate = function () {
            container.querySelectorAll('.ctest-test-row').forEach(function (row) {
                let status = 'neutral';
                if (row.querySelector('.ctest-status-draft')) status = 'draft';
                if (row.querySelector('.ctest-status-in-progress')) status = 'progress';
                if (row.querySelector('.ctest-status-submitted')) status = 'submitted';

                const text = (row.textContent || '').toLowerCase();
                if (text.includes('đang giao bài')) status = 'published';
                row.dataset.lddStatus = status;
            });
        };

        new MutationObserver(decorate).observe(container, { childList: true, subtree: true });
        decorate();
    }

    function enhanceLearningRoadmaps() {
        const roadmaps = [
            { id: 'tab-mat-goc', icon: '01', kicker: 'Lộ trình nền tảng', desc: 'Đi từng bước từ phiên âm, từ vựng và ngữ pháp để xây lại nền tiếng Anh thật chắc.', badge: 'Bắt đầu từ nền tảng' },
            { id: 'tab-thi-thcs', icon: '6–9', kicker: 'Lộ trình THCS', desc: 'Ôn theo khối lớp, bám chủ điểm trọng tâm và luyện lại kiến thức theo từng chặng.', badge: 'Theo chương trình THCS' },
            { id: 'tab-thi-thpt', icon: '10+', kicker: 'Lộ trình THPT', desc: 'Hệ thống kiến thức theo lớp và mục tiêu thi, ưu tiên phần cần dùng thật trong bài kiểm tra.', badge: 'Theo chương trình THPT' },
            { id: 'tab-di-lam', icon: 'PRO', kicker: 'English for Work', desc: 'Tập trung nghe, nói, đọc và viết trong các tình huống công việc thực tế.', badge: 'Ứng dụng thực tế' },
            { id: 'tab-ielts', icon: 'IELTS', kicker: 'IELTS Roadmap', desc: 'Chia mục tiêu thành từng chặng rõ ràng để biết mình đang học gì và vì sao cần học phần đó.', badge: 'Theo từng chặng' }
        ];

        roadmaps.forEach(function (cfg) {
            const tab = document.getElementById(cfg.id);
            if (!tab) return;
            tab.classList.add('ldd-roadmap-page');
            if (tab.querySelector('.ldd-roadmap-hero')) return;

            const title = Array.from(tab.children).find(function (el) { return el.tagName === 'H2'; });
            if (!title) return;

            const hero = document.createElement('section');
            hero.className = 'ldd-roadmap-hero';

            const icon = document.createElement('div');
            icon.className = 'ldd-roadmap-hero-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = cfg.icon;

            const copy = document.createElement('div');
            copy.className = 'ldd-roadmap-hero-copy';

            const kicker = document.createElement('div');
            kicker.className = 'ldd-roadmap-kicker';
            kicker.textContent = cfg.kicker;

            const desc = document.createElement('p');
            desc.textContent = cfg.desc;

            copy.appendChild(kicker);
            copy.appendChild(title);
            copy.appendChild(desc);

            const badge = document.createElement('span');
            badge.className = 'ldd-roadmap-hero-badge';
            badge.innerHTML = '<span aria-hidden="true">◎</span>' + cfg.badge;

            hero.appendChild(icon);
            hero.appendChild(copy);
            hero.appendChild(badge);
            tab.insertBefore(hero, tab.firstChild);
        });
    }

    function enhanceReadingLab() {
        const panel = document.getElementById('news-panel');
        if (panel) addNewsHero(panel);

        const grid = document.getElementById('news-cards-grid');
        if (grid) {
            const decorate = function () { decorateNewsCards(grid); };
            new MutationObserver(decorate).observe(grid, { childList: true, subtree: true });
            decorate();
        }

        enhanceArticleMeta();
    }

    function addNewsHero(panel) {
        if (panel.querySelector('.ldd-news-hero')) return;
        const header = panel.querySelector('.grammar-panel-header');
        if (!header) return;

        const hero = document.createElement('section');
        hero.className = 'ldd-news-hero';
        hero.innerHTML =
            '<div class="ldd-news-hero-icon" aria-hidden="true">📰</div>' +
            '<div class="ldd-news-hero-copy">' +
                '<div class="ldd-news-hero-kicker">LDD Reading Lab</div>' +
                '<h4>Đọc báo để học tiếng Anh</h4>' +
                '<p>Đọc nội dung thật, chạm từ để tra nghĩa, luyện dịch và kiểm tra mức độ hiểu bài ngay trong cùng một luồng học.</p>' +
                '<div class="ldd-news-hero-chips">' +
                    '<span class="ldd-news-hero-chip">Đọc hiểu</span>' +
                    '<span class="ldd-news-hero-chip">Từ vựng</span>' +
                    '<span class="ldd-news-hero-chip">Luyện dịch</span>' +
                '</div>' +
            '</div>';

        header.insertAdjacentElement('afterend', hero);
    }

    function decorateNewsCards(grid) {
        grid.querySelectorAll('.news-card').forEach(function (card) {
            if (card.dataset.lddNewsEnhanced === '1') return;
            card.dataset.lddNewsEnhanced = '1';

            const cta = document.createElement('span');
            cta.className = 'ldd-news-card-cta';
            cta.innerHTML = '<span>Đọc & luyện bài</span><span class="ldd-news-card-cta-arrow" aria-hidden="true">→</span>';
            card.appendChild(cta);
        });
    }

    function enhanceArticleMeta() {
        const panel = document.getElementById('news-article-panel');
        const text = document.getElementById('news-article-text');
        if (!panel || !text) return;

        let meta = panel.querySelector('.ldd-reading-meta');
        if (!meta) {
            meta = document.createElement('div');
            meta.className = 'ldd-reading-meta';
            meta.innerHTML =
                '<span class="ldd-reading-meta-chip" data-reading-time>⏱ 1 phút đọc</span>' +
                '<span class="ldd-reading-meta-chip">🔎 Chạm từ để tra nghĩa</span>' +
                '<span class="ldd-reading-meta-chip">✍️ Luyện dịch bên dưới</span>';

            const header = panel.querySelector('.grammar-panel-header');
            if (header) header.insertAdjacentElement('afterend', meta);
            else panel.insertBefore(meta, panel.firstChild);
        }

        const update = function () {
            const raw = (text.textContent || '').trim();
            const words = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
            const minutes = Math.max(1, Math.ceil(words / 180));
            const timeChip = meta.querySelector('[data-reading-time]');
            if (timeChip) timeChip.textContent = '⏱ ' + minutes + ' phút đọc';
            meta.classList.toggle('is-visible', words > 0);
        };

        new MutationObserver(update).observe(text, { childList: true, characterData: true, subtree: true });
        update();
    }
})();
