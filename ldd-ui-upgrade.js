/* =============================================================
   LDD ENGLISH — UI UPGRADE v1
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
        enhanceTestCenter();
        observeCustomTestRows();
    });

    function enhanceTestCenter() {
        const tab = document.getElementById('tab-kiem-tra');
        const grid = document.getElementById('kiemtra-folder-grid');
        if (!tab || !grid) return;

        addTestHero(tab, grid);
        enhanceFolderCards(grid);
    }

    function addTestHero(tab, grid) {
        if (tab.querySelector('.ldd-test-hero')) return;
        const oldTitle = Array.from(tab.children).find(el => el.tagName === 'H2');
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

            // Remove only direct text nodes; preserve badges and any existing child controls.
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

                // Teacher's "Đang giao bài" currently shares the submitted visual class.
                const text = (row.textContent || '').toLowerCase();
                if (text.includes('đang giao bài')) status = 'published';
                row.dataset.lddStatus = status;
            });
        };

        new MutationObserver(decorate).observe(container, { childList: true, subtree: true });
        decorate();
    }
})();
