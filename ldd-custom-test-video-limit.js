(function () {
    'use strict';

    // This rule applies only to HV3's Global Success 4 Units 1–6 assessment.
    const SLOT_ID = 'ldd-hv3-look1-u8-player';
    const TEST_ID = 'a49908b3-160f-4701-b8cf-935d7e569f2a';
    const VIDEO_URL = 'https://f005.backblazeb2.com/file/lddenglish/Look1_unit8_video10.mp4';
    const MAX_PLAYS = 2;
    const STORAGE_KEY = 'ldd:custom-test-video-plays:' + TEST_ID + ':v1';
    const root = document.getElementById('ctest-take-sections');
    if (!root) return;

    function readCount() {
        try {
            const n = Number(localStorage.getItem(STORAGE_KEY));
            return Number.isFinite(n) ? Math.max(0, Math.min(MAX_PLAYS, Math.floor(n))) : 0;
        } catch (_) {
            return 0;
        }
    }
    function writeCount(value) {
        try {
            localStorage.setItem(STORAGE_KEY, String(value));
        } catch (_) {
            // Playback still follows the in-memory limit for the current page.
        }
    }
    let currentCount = readCount();

    function setup(slot) {
        if (slot.dataset.lookVideoReady === '1') return;
        slot.dataset.lookVideoReady = '1';
        slot.replaceChildren();

        const title = document.createElement('p');
        title.textContent = 'LOOK 1 – Unit 8, Video 10';
        title.style.fontWeight = '600';
        const status = document.createElement('p');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.style.margin = '6px 0';
        const video = document.createElement('video');
        video.src = VIDEO_URL;
        video.preload = 'metadata';
        video.controls = true;
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute('controlsList', 'nodownload noplaybackrate noremoteplayback');
        video.setAttribute('aria-label', 'Video bài nghe LOOK 1 Unit 8, tối đa hai lượt');
        video.style.width = '100%';
        video.style.maxWidth = '720px';
        video.style.borderRadius = '8px';
        video.style.display = 'block';
        video.style.backgroundColor = '#111';
        video.addEventListener('contextmenu', function (event) { event.preventDefault(); });

        slot.append(title, status, video);
        let playingThisTurn = false;
        let maxPosition = 0;
        let correctingSeek = false;
        let endedSecondTurn = false;

        function refreshStatus() {
            if (endedSecondTurn || (currentCount >= MAX_PLAYS && !playingThisTurn)) {
                status.textContent = 'Đã hết 2/2 lượt nghe. Bạn vẫn có thể trả lời các câu hỏi.';
                video.pause();
                video.controls = false;
                video.style.display = 'none';
                return;
            }
            status.textContent = playingThisTurn
                ? 'Đang phát lượt ' + currentCount + '/2. Có thể tạm dừng và tiếp tục, nhưng không thể tua lại.'
                : 'Đã dùng ' + currentCount + '/2 lượt. Nhấn Play để bắt đầu lượt tiếp theo.';
        }

        video.addEventListener('play', function () {
            if (!playingThisTurn) {
                // A play is consumed when it begins, even if the page is reloaded.
                currentCount = Math.max(currentCount, readCount());
                if (currentCount >= MAX_PLAYS) {
                    video.pause();
                    refreshStatus();
                    return;
                }
                currentCount += 1;
                writeCount(currentCount);
                playingThisTurn = true;
                maxPosition = 0;
            }
            refreshStatus();
        });

        video.addEventListener('seeking', function () {
            if (!playingThisTurn || correctingSeek) return;
            const target = video.currentTime;
            if (target < maxPosition - 0.85 || target > maxPosition + 1.5) {
                correctingSeek = true;
                try { video.currentTime = maxPosition; } catch (_) {}
                correctingSeek = false;
            }
        });

        video.addEventListener('timeupdate', function () {
            if (playingThisTurn && Number.isFinite(video.currentTime)) {
                maxPosition = Math.max(maxPosition, video.currentTime);
            }
        });

        video.addEventListener('ended', function () {
            playingThisTurn = false;
            if (currentCount >= MAX_PLAYS) endedSecondTurn = true;
            refreshStatus();
        });
        refreshStatus();
    }

    function refresh() {
        const slot = root.querySelector('#' + SLOT_ID);
        if (slot) setup(slot);
    }
    new MutationObserver(refresh).observe(root, { childList: true, subtree: true });
    refresh();
})();

(function () {
    'use strict';

    // This additional rule applies to HV3's Look 2 Unit 1 + Global Success 4 Unit 7 assessment.
    const SLOT_ID = 'ldd-hv3-look2-u1-player';
    const TEST_ID = '59672cdf-14c0-44bd-bfaa-0b05514a8590';
    const VIDEO_URL = 'https://f005.backblazeb2.com/file/lddenglish/e500988cb6bb5408ce5d8bf93acdfcf971026481-240p.mp4';
    const MAX_PLAYS = 2;
    const STORAGE_KEY = 'ldd:custom-test-video-plays:' + TEST_ID + ':v1';
    const root = document.getElementById('ctest-take-sections');
    if (!root) return;

    function readCount() {
        try {
            const n = Number(localStorage.getItem(STORAGE_KEY));
            return Number.isFinite(n) ? Math.max(0, Math.min(MAX_PLAYS, Math.floor(n))) : 0;
        } catch (_) {
            return 0;
        }
    }
    function writeCount(value) {
        try {
            localStorage.setItem(STORAGE_KEY, String(value));
        } catch (_) {
            // Playback still follows the in-memory limit for the current page.
        }
    }
    let currentCount = readCount();

    function setup(slot) {
        if (slot.dataset.lookVideoReady === '1') return;
        slot.dataset.lookVideoReady = '1';
        slot.replaceChildren();

        const title = document.createElement('p');
        title.textContent = 'LOOK 2 – Unit 1, Video 1';
        title.style.fontWeight = '600';
        const status = document.createElement('p');
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.style.margin = '6px 0';
        const video = document.createElement('video');
        video.src = VIDEO_URL;
        video.preload = 'metadata';
        video.controls = true;
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute('controlsList', 'nodownload noplaybackrate noremoteplayback');
        video.setAttribute('aria-label', 'Video bài nghe LOOK 2 Unit 1, tối đa hai lượt');
        video.style.width = '100%';
        video.style.maxWidth = '720px';
        video.style.borderRadius = '8px';
        video.style.display = 'block';
        video.style.backgroundColor = '#111';
        video.addEventListener('contextmenu', function (event) { event.preventDefault(); });

        slot.append(title, status, video);
        let playingThisTurn = false;
        let maxPosition = 0;
        let correctingSeek = false;
        let endedSecondTurn = false;

        function refreshStatus() {
            if (endedSecondTurn || (currentCount >= MAX_PLAYS && !playingThisTurn)) {
                status.textContent = 'Đã hết 2/2 lượt nghe. Bạn vẫn có thể trả lời các câu hỏi.';
                video.pause();
                video.controls = false;
                video.style.display = 'none';
                return;
            }
            status.textContent = playingThisTurn
                ? 'Đang phát lượt ' + currentCount + '/2. Có thể tạm dừng và tiếp tục, nhưng không thể tua lại.'
                : 'Đã dùng ' + currentCount + '/2 lượt. Nhấn Play để bắt đầu lượt tiếp theo.';
        }

        video.addEventListener('play', function () {
            if (!playingThisTurn) {
                // A play is consumed when it begins, even if the page is reloaded.
                currentCount = Math.max(currentCount, readCount());
                if (currentCount >= MAX_PLAYS) {
                    video.pause();
                    refreshStatus();
                    return;
                }
                currentCount += 1;
                writeCount(currentCount);
                playingThisTurn = true;
                maxPosition = 0;
            }
            refreshStatus();
        });

        video.addEventListener('seeking', function () {
            if (!playingThisTurn || correctingSeek) return;
            const target = video.currentTime;
            if (target < maxPosition - 0.85 || target > maxPosition + 1.5) {
                correctingSeek = true;
                try { video.currentTime = maxPosition; } catch (_) {}
                correctingSeek = false;
            }
        });

        video.addEventListener('timeupdate', function () {
            if (playingThisTurn && Number.isFinite(video.currentTime)) {
                maxPosition = Math.max(maxPosition, video.currentTime);
            }
        });

        video.addEventListener('ended', function () {
            playingThisTurn = false;
            if (currentCount >= MAX_PLAYS) endedSecondTurn = true;
            refreshStatus();
        });
        refreshStatus();
    }

    function refresh() {
        const slot = root.querySelector('#' + SLOT_ID);
        if (slot) setup(slot);
    }
    new MutationObserver(refresh).observe(root, { childList: true, subtree: true });
    refresh();
})();

