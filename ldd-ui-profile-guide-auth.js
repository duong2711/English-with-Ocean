/* =============================================================
   LDD ENGLISH — LEADERBOARD + PROFILE + GUIDE + AUTH UI v1
   Non-destructive DOM enhancement. No Supabase calls.
   ============================================================= */
(function () {
    'use strict';

    function ready(fn) {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    ready(function () {
        enhanceAuthWindow();
        enhanceProfileModal();
        enhanceWebsiteGuide();
        enhanceLandingLeaderboard();
    });

    /* =========================================================
       AUTH WINDOW
       ========================================================= */
    function enhanceAuthWindow() {
        const auth = document.getElementById('auth-container');
        if (!auth || auth.dataset.lddAuthEnhanced === '1') return;
        auth.dataset.lddAuthEnhanced = '1';
        auth.classList.add('ldd-auth-shell');

        const formPanel = document.createElement('section');
        formPanel.className = 'ldd-auth-form-panel';

        Array.from(auth.childNodes).forEach(function (node) {
            formPanel.appendChild(node);
        });

        const brand = document.createElement('aside');
        brand.className = 'ldd-auth-brand-panel';
        brand.innerHTML =
            '<div class="ldd-auth-brand-logo">LDD</div>' +
            '<h2>Học mỗi ngày,<br>tiến bộ có dấu vết.</h2>' +
            '<p>Một nơi để học, luyện tập và theo dõi hành trình tiếng Anh của bạn theo cách gọn gàng hơn.</p>' +
            '<div class="ldd-auth-benefits">' +
                authBenefit('Aa', 'Từ vựng & ngữ pháp theo từng phần') +
                authBenefit('✓', 'Bài kiểm tra, thành tựu & điểm chăm chỉ') +
                authBenefit('★', 'Học qua nội dung thực tế và giải trí') +
            '</div>';

        auth.appendChild(brand);
        auth.appendChild(formPanel);

        const title = formPanel.querySelector('h2');
        if (title) title.textContent = 'Chào mừng trở lại';

        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        if (email) email.placeholder = 'Email đăng nhập';
        if (password) password.placeholder = 'Mật khẩu';
    }

    function authBenefit(icon, text) {
        return '<div class="ldd-auth-benefit">' +
            '<span class="ldd-auth-benefit-icon" aria-hidden="true">' + icon + '</span>' +
            '<span>' + text + '</span>' +
        '</div>';
    }

    /* =========================================================
       PROFILE MODAL
       ========================================================= */
    function enhanceProfileModal() {
        const modal = document.getElementById('profile-modal');
        if (!modal) return;
        const box = modal.querySelector('.profile-modal-box');
        if (!box || box.dataset.lddProfileEnhanced === '1') return;
        box.dataset.lddProfileEnhanced = '1';

        const oldTitle = Array.from(box.children).find(function (el) { return el.tagName === 'H3'; });

        const hero = document.createElement('section');
        hero.className = 'ldd-profile-hero';
        hero.innerHTML =
            '<div class="ldd-profile-hero-kicker">Learning Profile</div>' +
            '<h3>Hồ sơ học tập của <span data-ldd-profile-name>bạn</span></h3>' +
            '<p>Ảnh đại diện, thời gian đồng hành, thành tựu và bảng xếp hạng chăm chỉ được gom vào một nơi.</p>';

        if (oldTitle) oldTitle.insertAdjacentElement('afterend', hero);
        else box.insertBefore(hero, box.firstChild);

        const avatar = box.querySelector('.profile-avatar-section');
        const fields = Array.from(box.querySelectorAll(':scope > .profile-field'));
        if (avatar && fields.length) {
            const identity = document.createElement('div');
            identity.className = 'ldd-profile-identity-grid';

            const fieldsCard = document.createElement('div');
            fieldsCard.className = 'ldd-profile-fields-card';

            avatar.parentNode.insertBefore(identity, avatar);
            identity.appendChild(avatar);
            fields.forEach(function (field) { fieldsCard.appendChild(field); });
            identity.appendChild(fieldsCard);
        }

        const nameSource = document.getElementById('account-display-name');
        const nameOutput = hero.querySelector('[data-ldd-profile-name]');
        const syncName = function () {
            if (!nameOutput) return;
            const raw = nameSource ? String(nameSource.textContent || '').trim() : '';
            nameOutput.textContent = raw && raw !== 'Học viên' ? raw : 'bạn';
        };
        if (nameSource) {
            new MutationObserver(syncName).observe(nameSource, { childList: true, characterData: true, subtree: true });
        }
        syncName();
    }

    /* =========================================================
       WEBSITE GUIDE
       ========================================================= */
    function enhanceWebsiteGuide() {
        const tab = document.getElementById('tab-huong-dan');
        const grid = document.getElementById('huongdan-folder-grid');
        if (!tab || !grid || tab.dataset.lddGuideEnhanced === '1') return;
        tab.dataset.lddGuideEnhanced = '1';

        const pageTitle = Array.from(tab.children).find(function (el) { return el.tagName === 'H2'; });

        const hero = document.createElement('section');
        hero.className = 'ldd-guide-hero';
        hero.innerHTML =
            '<div class="ldd-guide-kicker">LDD Help Center</div>' +
            '<h2>Hướng dẫn sử dụng website</h2>' +
            '<p>Nếu chưa biết bắt đầu từ đâu, hãy xem cách học, hỏi trong khu trao đổi hoặc liên hệ admin. Bên dưới là đường đi nhanh tới 4 khu vực chính.</p>';

        if (pageTitle) pageTitle.insertAdjacentElement('afterend', hero);
        else tab.insertBefore(hero, tab.firstChild);

        const cards = [
            { id: 'huongdan-cachhoc-card', icon: '📘', title: 'Cách học trên web', sub: 'Xem luồng học, cách luyện và cách theo dõi tiến độ.' },
            { id: 'huongdan-chat-card', icon: '💬', title: 'Trao đổi học tập', sub: 'Hỏi bài, trao đổi nội dung và nhận hỗ trợ khi học.' },
            { id: 'huongdan-admin-card', icon: '☎️', title: 'Liên hệ admin Dương', sub: 'Báo lỗi tài khoản, nội dung hoặc vấn đề kỹ thuật.' }
        ];

        cards.forEach(function (cfg) {
            const card = document.getElementById(cfg.id);
            if (!card || card.dataset.lddGuideCard === '1') return;
            card.dataset.lddGuideCard = '1';

            Array.from(card.childNodes).forEach(function (node) {
                if (node.nodeType === Node.TEXT_NODE) node.remove();
            });

            const icon = document.createElement('span');
            icon.className = 'ldd-guide-card-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = cfg.icon;

            const title = document.createElement('span');
            title.className = 'ldd-guide-card-title';
            title.textContent = cfg.title;

            const sub = document.createElement('span');
            sub.className = 'ldd-guide-card-sub';
            sub.textContent = cfg.sub;

            card.insertBefore(icon, card.firstChild);
            card.appendChild(title);
            card.appendChild(sub);
        });

        const quick = document.createElement('section');
        quick.className = 'ldd-guide-start';
        quick.innerHTML =
            '<div class="ldd-guide-start-head">' +
                '<div><h3>Bắt đầu nhanh</h3><p>4 khu vực chính trên landing page.</p></div>' +
            '</div>' +
            '<div class="ldd-guide-steps">' +
                guideStep('01', 'Từ vựng', 'Học chủ đề, flashcard, từ đã lưu và bài đọc.', 'tab-tu-vung') +
                guideStep('02', 'Ngữ pháp', 'Chọn bài, xem tài liệu rồi luyện tập.', 'tab-ngu-phap') +
                guideStep('03', 'Giải trí', 'Học mà chơi qua các hoạt động tương tác.', 'tab-giai-tri') +
                guideStep('04', 'Kiểm tra', 'Làm bài được giao và xem kết quả.', 'tab-kiem-tra') +
            '</div>';
        grid.insertAdjacentElement('afterend', quick);

        quick.querySelectorAll('[data-ldd-guide-target]').forEach(function (button) {
            button.addEventListener('click', function () {
                openMainTab(button.dataset.lddGuideTarget);
            });
        });
    }

    function guideStep(num, title, sub, target) {
        return '<button type="button" class="ldd-guide-step" data-ldd-guide-target="' + target + '">' +
            '<span class="ldd-guide-step-num">' + num + '</span>' +
            '<strong>' + title + '</strong>' +
            '<span>' + sub + '</span>' +
        '</button>';
    }

    /* =========================================================
       LANDING TOP 3 — mirrors the EXISTING profile leaderboard.
       We intentionally reuse the current leaderboard source so the
       ranking formula / Supabase logic remains exactly the same.
       ========================================================= */
    function enhanceLandingLeaderboard() {
        const dashboard = document.querySelector('#tab-phien-am .ldd-home-dashboard');
        const source = document.getElementById('profile-leaderboard-list');
        if (!dashboard || !source || document.getElementById('ldd-home-leaderboard')) return;

        const section = document.createElement('section');
        section.id = 'ldd-home-leaderboard';
        section.className = 'ldd-home-leaderboard';
        section.innerHTML =
            '<div class="ldd-home-leaderboard-head">' +
                '<div>' +
                    '<div class="ldd-home-leaderboard-kicker">Hall of effort</div>' +
                    '<h3>🔥 Top 3 điểm chăm chỉ</h3>' +
                    '<p>Cùng một bảng điểm đang dùng trong Hồ sơ — không tạo cách tính mới.</p>' +
                '</div>' +
                '<button type="button" class="ldd-leaderboard-open-btn">Xem bảng đầy đủ →</button>' +
            '</div>' +
            '<div class="ldd-top3-grid" data-ldd-top3-grid>' +
                '<div class="ldd-top3-loading">Đang tải bảng xếp hạng...</div>' +
            '</div>';

        dashboard.insertAdjacentElement('afterend', section);

        const openFull = section.querySelector('.ldd-leaderboard-open-btn');
        if (openFull) {
            openFull.addEventListener('click', function () {
                const btn = document.getElementById('open-profile-btn');
                if (btn) btn.click();
            });
        }

        const sync = function () { syncTop3FromProfile(source, section); };
        new MutationObserver(sync).observe(source, { childList: true, subtree: true, characterData: true });
        sync();
        scheduleLeaderboardPrefetch(source, sync);
    }

    function syncTop3FromProfile(source, section) {
        const grid = section.querySelector('[data-ldd-top3-grid]');
        if (!grid) return;

        let rows = Array.from(source.querySelectorAll('.leaderboard-row')).filter(function (row) {
            return !row.classList.contains('leaderboard-row-excluded');
        });

        rows = rows.map(function (row, index) {
            const rankNode = row.querySelector('.leaderboard-rank');
            const nameNode = row.querySelector('.leaderboard-name');
            const scoreNode = row.querySelector('.leaderboard-score');
            const rankText = rankNode ? String(rankNode.textContent || '').trim() : String(index + 1);
            const parsedRank = parseInt(rankText.replace(/\D/g, ''), 10);
            return {
                rank: Number.isFinite(parsedRank) ? parsedRank : index + 1,
                name: nameNode ? cleanName(nameNode.textContent) : 'Học viên',
                score: scoreNode ? String(scoreNode.textContent || '').trim() : '',
                isMe: row.classList.contains('is-me') || !!row.querySelector('.leaderboard-me-tag')
            };
        }).sort(function (a, b) { return a.rank - b.rank; }).slice(0, 3);

        if (!rows.length) {
            const loading = source.querySelector('.profile-ach-loading');
            const message = loading ? String(loading.textContent || '').trim() : '';
            grid.innerHTML = '<div class="ldd-top3-loading">' + escapeHtml(message || 'Chưa có dữ liệu xếp hạng.') + '</div>';
            return;
        }

        const medals = ['🥇', '🥈', '🥉'];
        grid.innerHTML = rows.map(function (item, index) {
            const rank = index + 1;
            return '<article class="ldd-top3-card rank-' + rank + (item.isMe ? ' is-me' : '') + '">' +
                '<div class="ldd-top3-rank"><span class="ldd-top3-medal">' + medals[index] + '</span><span class="ldd-top3-rank-label">Top ' + rank + '</span></div>' +
                '<strong class="ldd-top3-name" title="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</strong>' +
                '<span class="ldd-top3-score">' + escapeHtml(item.score || 'Điểm chăm chỉ') + '</span>' +
                (item.isMe ? '<span class="ldd-top3-me">Bạn</span>' : '') +
            '</article>';
        }).join('');
    }

    function cleanName(text) {
        return String(text || '')
            .replace(/\(Bạn\)/gi, '')
            .replace(/\bBạn\b/gi, '')
            .replace(/\s+/g, ' ')
            .trim() || 'Học viên';
    }

    function scheduleLeaderboardPrefetch(source, sync) {
        if (source.querySelector('.leaderboard-row')) return;

        const account = document.getElementById('account-area');
        const openBtn = document.getElementById('open-profile-btn');
        const closeBtn = document.getElementById('profile-modal-close');
        const modal = document.getElementById('profile-modal');
        if (!account || !openBtn || !closeBtn || !modal) return;

        let prefetched = false;
        let prefetching = false;
        let closeTimer = null;

        const stopPrefetch = function () {
            if (!prefetching) return;
            prefetching = false;
            modal.classList.remove('ldd-profile-prefetching');
            if (closeTimer) clearTimeout(closeTimer);
            if (window.getComputedStyle(modal).display !== 'none') closeBtn.click();
            sync();
        };

        const sourceObserver = new MutationObserver(function () {
            sync();
            if (prefetching && source.querySelector('.leaderboard-row')) stopPrefetch();
        });
        sourceObserver.observe(source, { childList: true, subtree: true, characterData: true });

        openBtn.addEventListener('click', function (event) {
            if (event.isTrusted && prefetching) {
                prefetching = false;
                if (closeTimer) clearTimeout(closeTimer);
                modal.classList.remove('ldd-profile-prefetching');
            }
        }, true);

        const tryPrefetch = function () {
            if (prefetched || prefetching || source.querySelector('.leaderboard-row')) return;
            if (window.getComputedStyle(account).display === 'none') return;
            if (window.getComputedStyle(modal).display !== 'none') return;

            prefetched = true;
            prefetching = true;
            modal.classList.add('ldd-profile-prefetching');
            openBtn.click();
            closeTimer = setTimeout(stopPrefetch, 5000);
        };

        new MutationObserver(function () {
            if (!prefetched && window.getComputedStyle(account).display !== 'none') {
                setTimeout(tryPrefetch, 900);
            }
        }).observe(account, { attributes: true, attributeFilter: ['style', 'class'] });

        setTimeout(tryPrefetch, 1200);
    }

    function openMainTab(target) {
        const trigger = document.querySelector('.main-tab-btn[data-main-target="' + target + '"]');
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

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();
