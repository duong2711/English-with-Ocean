/* =============================================================
   LDD ENGLISH — UI UPGRADE v5.11
   Non-destructive DOM enhancement + low-egress bootstrap.
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
        installTestCenterNavigationGuard();
        observeCustomTestRows();
        enhanceLearningRoadmaps();
        enhanceReadingLab();
        initAboutMeModal();
        linkifyLoginZaloNumber();
    });

    function ensureUpgradeAssets() {
        ensureStylesheet('ldd-roadmap-news-style', 'ldd-ui-roadmap-news.css?v=2.4');
        ensureStylesheet('ldd-vocab-grammar-style', 'ldd-ui-vocab-grammar.css?v=1');
        ensureStylesheet('ldd-home-phonetics-style', 'ldd-ui-home-phonetics.css?v=4.1');
        ensureStylesheet('ldd-timers-style', 'ldd-ui-timers.css?v=2.1');
        ensureStylesheet('ldd-student-grade-style', 'ldd-student-grade.css?v=1');
        ensureStylesheet('ldd-vocab-race-style', 'ldd-vocab-race.css?v=3');

        // Load first. Dynamic scripts are async by default, so ensureScript sets async=false
        // to preserve insertion order and let all helper modules benefit from the guard.
        ensureScript('ldd-egress-guard-script', 'ldd-egress-guard.js?v=1');
        ensureScript('ldd-vocab-dedup-script', 'ldd-vocab-dedup.js?v=1');
        ensureScript('ldd-pronunciation-fix-script', 'ldd-pronunciation-fix.js?v=3');
        ensureScript('ldd-vocab-grammar-script', 'ldd-ui-vocab-grammar.js?v=3');
        ensureScript('ldd-home-phonetics-script', 'ldd-ui-home-phonetics.js?v=9.0');
        ensureScript('ldd-student-grade-script', 'ldd-student-grade.js?v=2');
        ensureScript('ldd-thcs-vocab-reset-script', 'ldd-thcs-vocab-reset.js?v=3');
        ensureScript('ldd-fast-progress-script', 'ldd-fast-progress.js?v=1');
        ensureScript('ldd-vocab-race-script', 'ldd-vocab-race.js?v=23-failover');
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
        script.async = false;
        script.src = src;
        document.body.appendChild(script);
    }

    function linkifyLoginZaloNumber() {
        const auth = document.getElementById('auth-container');
        if (!auth) return;

        const phone = '0988007529';
        const zaloUrl = 'https://zalo.me/0988007529';

        function linkify(root) {
            if (!root) return;

            const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (node) {
                        if (!node.nodeValue || !node.nodeValue.includes(phone)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        const parent = node.parentElement;
                        if (!parent || parent.closest('a, script, style, textarea, input')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);

            nodes.forEach(function (node) {
                const text = node.nodeValue;
                const parts = text.split(phone);
                if (parts.length < 2) return;

                const frag = document.createDocumentFragment();
                parts.forEach(function (part, index) {
                    if (part) frag.appendChild(document.createTextNode(part));
                    if (index < parts.length - 1) {
                        const link = document.createElement('a');
                        link.href = zaloUrl;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.className = 'login-zalo-inline-link';
                        link.textContent = phone;
                        link.setAttribute('aria-label', 'Liên hệ Zalo ' + phone);
                        frag.appendChild(link);
                    }
                });
                node.replaceWith(frag);
            });
        }

        linkify(auth);

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'characterData') {
                    linkify(mutation.target.parentNode);
                    return;
                }
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        linkify(node.parentNode);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        linkify(node);
                    }
                });
            });
        });

        observer.observe(auth, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function initAboutMeModal() {
        const modal = document.getElementById('about-me-modal');
        const openBtn = document.getElementById('about-me-open-btn');
        const closeBtn = document.getElementById('about-me-close-btn');
        const homeBtn = document.getElementById('about-linkbio-home-btn');
        const galleryLightbox = document.getElementById('about-gallery-lightbox');
        const galleryImage = document.getElementById('about-gallery-lightbox-image');
        const galleryClose = document.getElementById('about-gallery-lightbox-close');
        const galleryPrev = document.getElementById('about-gallery-prev');
        const galleryNext = document.getElementById('about-gallery-next');
        const galleryButtons = Array.from(document.querySelectorAll('[data-about-gallery-index]'));
        const galleryItems = galleryButtons.map(function (btn) {
            const img = btn.querySelector('img');
            return img ? { src: img.src, alt: img.alt || 'Ảnh giới thiệu' } : null;
        }).filter(Boolean);
        let galleryIndex = 0;
        if (!modal || !openBtn || !closeBtn) return;

        function openModal() {
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('about-me-open');
            window.setTimeout(function () { closeBtn.focus(); }, 0);
        }

        function closeGallery() {
            if (!galleryLightbox) return;
            galleryLightbox.classList.remove('is-open');
            galleryLightbox.setAttribute('aria-hidden', 'true');
            if (galleryImage) {
                galleryImage.removeAttribute('src');
                galleryImage.alt = '';
            }
        }

        function renderGalleryImage() {
            if (!galleryItems.length || !galleryImage) return;
            const item = galleryItems[galleryIndex];
            galleryImage.src = item.src;
            galleryImage.alt = item.alt;
            if (galleryLightbox) galleryLightbox.scrollTop = 0;
        }

        function openGallery(index) {
            if (!galleryLightbox || !galleryItems.length) return;
            galleryIndex = Math.max(0, Math.min(galleryItems.length - 1, Number(index) || 0));
            renderGalleryImage();
            galleryLightbox.classList.add('is-open');
            galleryLightbox.setAttribute('aria-hidden', 'false');
            galleryLightbox.scrollTop = 0;
            if (galleryClose) galleryClose.focus();
        }

        function closeModal() {
            closeGallery();
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('about-me-open');
            openBtn.focus();
        }

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        modal.querySelectorAll('[data-about-close]').forEach(function (el) {
            el.addEventListener('click', closeModal);
        });

        if (homeBtn) {
            homeBtn.addEventListener('click', function () {
                closeModal();
                if (window.LDDNavigation && typeof window.LDDNavigation.goToTab === 'function') {
                    window.LDDNavigation.goToTab('tab-trang-chu');
                } else {
                    const tab = document.querySelector('.main-tab-btn[data-main-target="tab-trang-chu"]');
                    if (tab) tab.click();
                }
            });
        }

        galleryButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                openGallery(parseInt(btn.dataset.aboutGalleryIndex || '0', 10));
            });
        });
        if (galleryClose) galleryClose.addEventListener('click', closeGallery);
        if (galleryLightbox) {
            galleryLightbox.querySelectorAll('[data-gallery-close]').forEach(function (el) {
                el.addEventListener('click', closeGallery);
            });
        }
        if (galleryPrev) {
            galleryPrev.addEventListener('click', function () {
                if (!galleryItems.length) return;
                galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
                renderGalleryImage();
            });
        }
        if (galleryNext) {
            galleryNext.addEventListener('click', function () {
                if (!galleryItems.length) return;
                galleryIndex = (galleryIndex + 1) % galleryItems.length;
                renderGalleryImage();
            });
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && galleryLightbox && galleryLightbox.classList.contains('is-open')) {
                closeGallery();
                return;
            }
            if (event.key === 'ArrowLeft' && galleryLightbox && galleryLightbox.classList.contains('is-open') && galleryItems.length) {
                galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
                renderGalleryImage();
                return;
            }
            if (event.key === 'ArrowRight' && galleryLightbox && galleryLightbox.classList.contains('is-open') && galleryItems.length) {
                galleryIndex = (galleryIndex + 1) % galleryItems.length;
                renderGalleryImage();
                return;
            }
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    function enhanceTestCenter() {
        const tab = document.getElementById('tab-kiem-tra');
        const grid = document.getElementById('kiemtra-folder-grid');
        if (!tab || !grid) return;
        addTestHero(tab, grid);
        enhanceFolderCards(grid);
    }

    const TEST_CENTER_VIEW_IDS = [
        'vocab-own-test-panel',
        'ctest-panel',
        'ielts-sample-panel',
        'ilt-panel',
        'irt-panel'
    ];

    const TEST_CENTER_ROOT_CARDS = new Set([
        'vocab-test-folder',
        'ielts-sample-folder-card',
        'ctest-folder-card'
    ]);

    function resetTestCenterViews(options) {
        options = options || {};
        const grid = document.getElementById('kiemtra-folder-grid');

        TEST_CENTER_VIEW_IDS.forEach(function (id) {
            const panel = document.getElementById(id);
            if (panel) panel.style.display = 'none';
        });

        // Modal "sẵn sàng" có thể nằm fixed bên ngoài flow của panel.
        ['ilt-ready-modal', 'irt-ready-modal'].forEach(function (id) {
            const modal = document.getElementById(id);
            if (modal) modal.style.display = 'none';
        });

        if (grid) grid.style.display = options.showGrid === false ? 'none' : '';
    }

    function installTestCenterNavigationGuard() {
        const tab = document.getElementById('tab-kiem-tra');
        const grid = document.getElementById('kiemtra-folder-grid');
        if (!tab || !grid || tab.dataset.lddTestNavGuard === '1') return;
        tab.dataset.lddTestNavGuard = '1';

        // Chỉ bắt các folder đã có module thật; các card placeholder lớp 6–12/chuyển cấp
        // chưa có handler thì không can thiệp để tránh bấm vào bị màn hình trắng.
        tab.addEventListener('click', function (event) {
            const card = event.target.closest('#kiemtra-folder-grid > .folder-card');
            if (!card || !TEST_CENTER_ROOT_CARDS.has(card.id)) return;
            resetTestCenterViews({ showGrid: false });
        }, true);

        window.LDDTestNavigation = Object.assign({}, window.LDDTestNavigation || {}, {
            resetToRoot: function () {
                resetTestCenterViews({ showGrid: true });
                return true;
            },
            openFolder: function (cardId) {
                if (!TEST_CENTER_ROOT_CARDS.has(cardId)) return false;
                const card = document.getElementById(cardId);
                if (!card || !grid.contains(card)) return false;
                resetTestCenterViews({ showGrid: true });
                card.click();
                return true;
            }
        });
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


    function renderNewsNonTranslateMeta(text) {
        if (!text) return;

        const anchor = text.querySelector('.ldd-news-meta-anchor[data-meta]');
        let box = document.getElementById('ldd-news-nontranslate-meta');

        if (!anchor) {
            if (box) box.remove();
            return;
        }

        const packed = String(anchor.getAttribute('data-meta') || '');
        if (!packed) {
            if (box) box.remove();
            return;
        }

        let meta = null;
        try {
            meta = JSON.parse(decodeURIComponent(packed));
        } catch (err) {
            console.warn('[LDD news meta] Không đọc được metadata ngoài phần dịch.', err);
            if (box) box.remove();
            return;
        }

        if (!box) {
            box = document.createElement('div');
            box.id = 'ldd-news-nontranslate-meta';
            box.className = 'ldd-news-nontranslate-meta';
            text.insertAdjacentElement('afterend', box);
        }

        if (box.dataset.metaSignature === packed) return;
        box.dataset.metaSignature = packed;
        box.replaceChildren();

        const words = Array.isArray(meta.difficultWords) ? meta.difficultWords : [];
        if (words.length) {
            const wordsLine = document.createElement('p');
            wordsLine.className = 'ldd-news-difficult-words';

            const label = document.createElement('strong');
            label.textContent = 'Difficult words: ';
            wordsLine.appendChild(label);

            words.forEach(function (item, index) {
                if (index) wordsLine.appendChild(document.createTextNode(', '));

                const word = document.createElement('strong');
                word.textContent = String((item && item.word) || '').trim();
                wordsLine.appendChild(word);

                const meaning = String((item && item.meaning) || '').trim();
                if (meaning) wordsLine.appendChild(document.createTextNode(' (' + meaning + ')'));
            });

            wordsLine.appendChild(document.createTextNode('.'));
            box.appendChild(wordsLine);
        }

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
            renderNewsNonTranslateMeta(text);
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