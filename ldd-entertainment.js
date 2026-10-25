/* LDD Entertainment Library: one Games hub + Films + Dung/Duong comics.
   Uses existing game lifecycle and canonical THCS story data; no database polling. */
(function () {
    'use strict';
    if (window.__lddEntertainmentLibraryV1) return;
    window.__lddEntertainmentLibraryV1 = true;

    const GRADE_LIST = [6, 7, 8, 9, 10, 11, 12];
    const $ = (id) => document.getElementById(id);
    const getCatalog = () => window.LDDEntMediaCatalog || { movies: [], comics: [] };

    function gradeUnits(grade) {
        switch (Number(grade)) {
            case 6: return typeof GRADE6_UNITS !== 'undefined' ? GRADE6_UNITS : [];
            case 7: return typeof GRADE7_UNITS !== 'undefined' ? GRADE7_UNITS : [];
            case 8: return typeof GRADE8_UNITS !== 'undefined' ? GRADE8_UNITS : [];
            case 9: return typeof GRADE9_UNITS !== 'undefined' ? GRADE9_UNITS : [];
            case 10: return typeof GRADE10_UNITS !== 'undefined' ? GRADE10_UNITS : [];
            case 11: return typeof GRADE11_UNITS !== 'undefined' ? GRADE11_UNITS : [];
            case 12: return typeof GRADE12_UNITS !== 'undefined' ? GRADE12_UNITS : [];
            default: return [];
        }
    }

    function el(tag, cls, text) {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        if (typeof text === 'string') node.textContent = text;
        return node;
    }

    function safeAsset(value) {
        if (typeof value !== 'string' || !value.trim()) return '';
        try {
            const url = new URL(value, document.baseURI);
            if (url.protocol !== 'https:' && url.origin !== location.origin) return '';
            if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
            return url.href;
        } catch (_) { return ''; }
    }

    function section(id, title) {
        const view = el('section', 'ldd-ent-view ldd-ent-library-view');
        view.id = id;
        view.hidden = true;
        const top = el('div', 'grammar-panel-header ldd-ent-panel-heading');
        const back = el('button', 'grammar-back-btn', '← Giải trí');
        back.type = 'button';
        back.dataset.entBack = '';
        top.append(back, el('h3', '', title));
        view.append(top);
        return view;
    }

    function placeholder(message, detail) {
        const wrap = el('div', 'ldd-ent-empty');
        wrap.append(el('span', 'ldd-ent-empty-icon', '🎞️'), el('strong', '', message));
        if (detail) wrap.append(el('p', '', detail));
        return wrap;
    }

    function picture(src, alt, fallback) {
        const url = safeAsset(src);
        if (url) {
            const img = el('img', 'ldd-ent-thumb-image');
            img.src = url;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.alt = alt;
            img.addEventListener('error', function () {
                img.replaceWith(el('div', 'ldd-ent-cover-fallback', fallback));
            }, { once: true });
            return img;
        }
        return el('div', 'ldd-ent-cover-fallback', fallback);
    }


    // Merge per frame index: a partial teacher update must not remove other panels.
    function mergeComicFrames(unit, saved) {
        const byIndex = new Map((unit.storyFrames || []).map((frame, i) =>
            [i + 1, Object.assign({}, frame, { frame_index: i + 1 })]));
        (saved || []).forEach(function (frame) {
            const index = Number(frame.frame_index);
            if (!Number.isInteger(index) || index < 1) return;
            const base = byIndex.get(index) || {};
            byIndex.set(index, Object.assign({}, base, frame, {
                frame_index: index,
                content_html: frame.content_html || base.content_html || '',
                image_url: frame.image_url || base.image_url || ''
            }));
        });
        return Array.from(byIndex.values()).sort((a, b) => a.frame_index - b.frame_index);
    }

    function comicText(html) {
        const source = document.createElement('div');
        source.innerHTML = html || '';
        const fragment = document.createDocumentFragment();
        function append(node, target) {
            if (node.nodeType === 3) { target.append(document.createTextNode(node.textContent)); return; }
            if (node.nodeType !== 1 || /^(SCRIPT|STYLE|IFRAME|OBJECT|SVG|SOURCE-FOOTNOTE)$/.test(node.tagName)) return;
            if (node.tagName === 'BR') { target.append(document.createElement('br')); return; }
            const block = /^(P|DIV|LI)$/.test(node.tagName);
            const next = /^(B|STRONG)$/.test(node.tagName) ? document.createElement('strong') : target;
            if (next !== target) target.append(next);
            Array.from(node.childNodes).forEach(child => append(child, next));
            if (block) target.append(document.createElement('br'));
        }
        Array.from(source.childNodes).forEach(node => append(node, fragment));
        return fragment;
    }

    async function fetchComicFrames(grade, unit) {
        const project = 'ywqbaksmmtvwbojcgsdd';
        const apiKey = 'sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_';
        let token = '';
        try {
            const saved = JSON.parse(localStorage.getItem('sb-' + project + '-auth-token') || 'null');
            token = (saved && (saved.access_token || saved.currentSession?.access_token || saved[0]?.access_token)) || '';
        } catch (_) {}
        const headers = { apikey: apiKey };
        if (token) headers.Authorization = 'Bearer ' + token;
        const query = new URLSearchParams({
            select: 'frame_index,image_url,content_html,keywords',
            grade: 'eq.' + Number(grade), unit_id: 'eq.' + unit.id, order: 'frame_index.asc'
        });
        const response = await fetch('https://' + project + '.supabase.co/rest/v1/thcs_story_frames?' + query, {
            headers, cache: 'no-store'
        });
        if (!response.ok) throw Error('Không tải được truyện đã cập nhật (' + response.status + ')');
        const rows = await response.json();
        if (!Array.isArray(rows)) throw Error('Dữ liệu truyện không hợp lệ');
        return mergeComicFrames(unit, rows);
    }

    function init() {
        const tab = $('tab-giai-tri');
        const home = $('entertainment-folder-grid');
        const games = $('ldd-ent-games-panel');
        if (!tab || !home || !games || $('ldd-ent-movies-panel')) return;

        const movies = section('ldd-ent-movies-panel', '🎬 Phim ảnh');
        const comics = section('ldd-ent-comics-panel', '📚 Truyện tranh');
        games.insertAdjacentElement('afterend', movies);
        movies.insertAdjacentElement('afterend', comics);

        let currentView = 'root';
        let comicRequest = 0;
        let activeVideo = null;
        function releaseVideo() {
            if (!activeVideo) return;
            activeVideo.pause();
            activeVideo.removeAttribute('src');
            activeVideo.load();
            activeVideo = null;
        }
        function show(view) {
            comicRequest += 1;
            releaseVideo();
            currentView = view;
            home.style.display = view === 'root' ? '' : 'none';
            games.hidden = view !== 'games';
            movies.hidden = view !== 'movies';
            comics.hidden = view !== 'comics';
            if (view === 'comics') {
                document.dispatchEvent(new Event('ldd:ent-comics-visible'));
            }
        }
        $('ldd-ent-games-entry').addEventListener('click', function () { show('games'); });
        $('ldd-ent-movies-entry').addEventListener('click', function () {
            buildMovies(movies, (video) => { activeVideo = video; });
            show('movies');
        });
        $('ldd-ent-comics-entry').addEventListener('click', function () {
            show('comics');
            showSeriesLibrary();
        });
        $('ldd-ent-games-back').addEventListener('click', function () { show('root'); });
        movies.querySelector('[data-ent-back]').addEventListener('click', function () { show('root'); });
        comics.querySelector('[data-ent-back]').addEventListener('click', function () { show('root'); });

        // Returning to the parent tab always starts at its three-section hub.
        // Game-specific Back buttons remain handled by their existing modules.
        document.addEventListener('click', function (event) {
            const target = event.target.closest('[data-main-target="tab-giai-tri"]');
            if (target) show('root');
        }, true);
        const logout = $('logout-btn');
        if (logout) logout.addEventListener('click', function () { show('root'); });

        const comicBody = el('div', 'ldd-ent-comics-body');
        comics.append(comicBody);
        const films = el('div', 'ldd-ent-film-body');
        movies.append(films);

        function buildMovies(panel, onVideo) {
            const items = Array.isArray(getCatalog().movies) ? getCatalog().movies.slice() : [];
            const body = panel.querySelector('.ldd-ent-film-body');
            body.replaceChildren();
            const playerWrap = el('div', 'ldd-ent-player');
            playerWrap.hidden = true;
            body.append(playerWrap);
            if (!items.length) {
                body.append(placeholder('Chưa có video nào', 'Thư viện sẽ hiển thị video ngắn kèm thumbnail khi có phim được thêm vào.'));
                return;
            }
            const grid = el('div', 'ldd-ent-media-grid');
            items.sort((a, b) => Number(a.order || 0) - Number(b.order || 0)).forEach(function (item) {
                if (!item || !safeAsset(item.video_url)) return;
                const card = el('button', 'ldd-ent-media-card');
                card.type = 'button';
                const cover = el('div', 'ldd-ent-media-cover ldd-ent-film-cover');
                cover.append(picture(item.thumbnail_url, 'Ảnh bìa ' + item.title, '🎬'));
                if (item.duration) cover.append(el('span', 'ldd-ent-duration', String(item.duration)));
                card.append(cover, el('strong', '', String(item.title || 'Video ngắn')));
                if (item.description) card.append(el('small', '', String(item.description)));
                card.addEventListener('click', function () {
                    const url = safeAsset(item.video_url);
                    if (!url) return;
                    playerWrap.replaceChildren();
                    const video = el('video');
                    video.controls = true;
                    video.playsInline = true;
                    video.preload = 'metadata';
                    video.setAttribute('controlsList', 'nodownload');
                    const poster = safeAsset(item.thumbnail_url);
                    if (poster) video.poster = poster;
                    video.src = url;
                    const name = el('h4', '', String(item.title || 'Video'));
                    playerWrap.append(name, video);
                    playerWrap.hidden = false;
                    onVideo(video);
                    playerWrap.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                });
                grid.append(card);
            });
            if (!grid.children.length) body.append(placeholder('Chưa có video hợp lệ', 'Hãy thêm đường dẫn HTTPS đến các video ngắn.'));
            else body.append(grid);
        }

        function showSeriesLibrary() {
            comicRequest += 1;
            comicBody.replaceChildren();
            const list = Array.isArray(getCatalog().comics) ? getCatalog().comics : [];
            const grid = el('div', 'ldd-ent-media-grid');
            list.forEach(function (series) {
                const card = el('button', 'ldd-ent-media-card ldd-ent-comic-cover-card');
                card.type = 'button';
                const cover = el('div', 'ldd-ent-media-cover ldd-ent-comic-cover');
                cover.append(picture(series.thumbnail_url, 'Bìa truyện ' + series.title, 'Dung & Dương'));
                cover.append(el('span', 'ldd-ent-cover-mark', 'COMIC'));
                card.append(cover, el('strong', '', String(series.title || 'Truyện tranh')));
                card.append(el('small', '', 'Lớp 6–12 · ' + GRADE_LIST.reduce((n, g) =>
                    n + gradeUnits(g).filter(u => Array.isArray(u.storyFrames) && u.storyFrames.length).length, 0) + ' chương'));
                card.addEventListener('click', function () { showGrades(series); });
                grid.append(card);
            });
            if (grid.children.length) comicBody.append(grid);
            else comicBody.append(placeholder('Chưa có truyện', 'Bộ truyện sẽ xuất hiện ở đây khi có dữ liệu.'));
        }

        function showGrades(series, selectedGrade) {
            comicRequest += 1;
            comicBody.replaceChildren();
            const subhead = el('div', 'ldd-ent-series-header');
            const back = el('button', 'ldd-ent-inline-back', '← Danh sách bộ truyện');
            back.type = 'button';
            back.addEventListener('click', showSeriesLibrary);
            subhead.append(back, el('h4', '', String(series.title || 'Truyện tranh')));
            comicBody.append(subhead);
            const grades = el('div', 'ldd-ent-grade-tabs');
            grades.setAttribute('role', 'group');
            grades.setAttribute('aria-label', 'Chọn khối lớp');
            const chapters = el('div', 'ldd-ent-chapters-grid');
            const info = el('p', 'ldd-ent-library-note', 'Các chương lấy từ nội dung Unit đã có. Khi mở chương, ảnh và nội dung do giáo viên cập nhật vẫn được ưu tiên.');
            comicBody.append(grades, info, chapters);
            const list = Array.isArray(series.grades) ? series.grades : GRADE_LIST;
            function showGrade(grade) {
                grades.querySelectorAll('button').forEach(btn => {
                    const on = Number(btn.dataset.grade) === grade;
                    btn.classList.toggle('is-active', on);
                    btn.setAttribute('aria-pressed', String(on));
                });
                chapters.replaceChildren();
                const units = gradeUnits(grade).filter(u => Array.isArray(u.storyFrames) && u.storyFrames.length);
                units.forEach(function (unit) {
                    const chapter = el('button', 'ldd-ent-chapter-card');
                    chapter.type = 'button';
                    const poster = el('div', 'ldd-ent-chapter-poster');
                    const img = (unit.storyFrames || []).find(f => f.image_url && safeAsset(f.image_url));
                    const curatedPreview = getCatalog().chapter_thumbnails &&
                        getCatalog().chapter_thumbnails[grade + '/' + unit.id];
                    poster.append(picture(curatedPreview || (img && img.image_url), 'Unit ' + unit.number, '📖'));
                    poster.append(el('span', 'ldd-ent-chapter-counter', 'UNIT ' + unit.number));
                    chapter.append(poster);
                    const meta = el('div', 'ldd-ent-chapter-copy');
                    meta.append(el('strong', '', unit.titleVi || unit.title || 'Unit ' + unit.number),
                        el('small', '', unit.storyFrames.length + ' khung truyện · Lớp ' + grade));
                    chapter.append(meta);
                    chapter.addEventListener('click', function () {
                        showChapter(series, grade, unit);
                    });
                    chapters.append(chapter);
                });
                if (!units.length) chapters.append(placeholder('Chưa có chương', 'Khối lớp này chưa có dữ liệu truyện.'));
            }
            list.forEach(function (grade) {
                if (!GRADE_LIST.includes(Number(grade))) return;
                const btn = el('button', 'ldd-ent-grade-btn', 'Lớp ' + grade);
                btn.type = 'button';
                btn.dataset.grade = String(grade);
                btn.addEventListener('click', function () { showGrade(Number(grade)); });
                grades.append(btn);
            });
            showGrade(Number(selectedGrade || list[0] || 6));
        }


        async function showChapter(series, grade, unit) {
            const request = ++comicRequest;
            comicBody.replaceChildren();
            const reader = el('article', 'ldd-ent-comic-reader');
            const header = el('div', 'ldd-ent-reader-heading');
            const back = el('button', 'ldd-ent-inline-back', '← Danh sách Unit');
            back.type = 'button';
            back.addEventListener('click', () => showGrades(series, grade));
            const title = el('h4', '', 'Lớp ' + grade + ' · Unit ' + unit.number + ': ' + (unit.titleVi || unit.title));
            header.append(back, title);
            const status = el('p', 'ldd-ent-reader-status', 'Đang tải toàn bộ truyện…');
            status.setAttribute('role', 'status');
            const framesEl = el('div', 'ldd-ent-reader-frames');
            reader.append(header, status, framesEl);
            comicBody.append(reader);
            function render(frames) {
                framesEl.replaceChildren();
                frames.forEach(function (frame, index) {
                    const panel = el('section', 'ldd-ent-reader-frame');
                    panel.dataset.frameIndex = String(frame.frame_index);
                    panel.append(el('h5', '', 'Khung ' + frame.frame_index));
                    const url = safeAsset(frame.image_url);
                    if (url) {
                        const image = el('img', 'ldd-ent-reader-image');
                        image.src = url;
                        image.alt = 'Lớp ' + grade + ' – Unit ' + unit.number + ' – Khung ' + frame.frame_index;
                        image.loading = index === 0 ? 'eager' : 'lazy';
                        image.decoding = 'async';
                        image.addEventListener('error', function () {
                            image.replaceWith(el('p', 'ldd-ent-reader-image-note', 'Ảnh khung này chưa tải được.'));
                        }, { once: true });
                        panel.append(image);
                    } else {
                        panel.append(el('p', 'ldd-ent-reader-image-note', 'Khung này chưa có ảnh minh họa.'));
                    }
                    const text = el('div', 'ldd-ent-reader-text');
                    text.append(comicText(frame.content_html));
                    panel.append(text);
                    framesEl.append(panel);
                });
            }
            try {
                const frames = await fetchComicFrames(grade, unit);
                if (request !== comicRequest) return;
                render(frames);
                status.textContent = frames.length ? frames.length + ' khung truyện' : 'Unit này chưa có nội dung truyện.';
            } catch (error) {
                if (request !== comicRequest) return;
                render(mergeComicFrames(unit, []));
                status.textContent = 'Đang hiển thị bản gốc. Chưa tải được nội dung cập nhật.';
                const retry = el('button', 'ldd-ent-inline-back', 'Thử lại');
                retry.type = 'button';
                retry.addEventListener('click', () => showChapter(series, grade, unit));
                status.append(' ', retry);
                console.warn('[LDD comics]', error);
            }
        }

        show('root');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
