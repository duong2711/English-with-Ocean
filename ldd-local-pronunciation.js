/* LDD English — Local Pronunciation bridge v1
   Fixed-script speaking recordings go directly to the teacher laptop when available.
   No audio is stored in Supabase for successful local-AI scoring.
   Unsupported/offline cases keep the existing teacher-grading upload flow. */
(function () {
    'use strict';

    const SUPABASE_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const AUTO_TYPES = new Set(['ls1_qa', 'ls1_opener', 'ls2_shadow']);
    const RUNTIME_TTL = 60 * 1000;
    const POLL_MS = 1800;
    const POLL_MAX_MS = 5 * 60 * 1000;

    let patched = false;
    let runtime = { url: '', at: 0 };

    function getToken() {
        try {
            const raw = localStorage.getItem('sb-' + SUPABASE_REF + '-auth-token');
            if (!raw) return null;
            const value = JSON.parse(raw);
            return value && (value.access_token ||
                (value.currentSession && value.currentSession.access_token) ||
                (Array.isArray(value) && value[0] && value[0].access_token)) || null;
        } catch (_) { return null; }
    }

    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function makeJobId() {
        if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID().replace(/-/g, '');
        const a = new Uint8Array(16);
        crypto.getRandomValues(a);
        return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
    }

    async function fetchWithTimeout(url, options, timeoutMs) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs || 5000);
        try {
            return await fetch(url, Object.assign({}, options || {}, { signal: controller.signal }));
        } finally {
            clearTimeout(timer);
        }
    }

    async function runtimeUrl(force) {
        if (!force && Date.now() - runtime.at < RUNTIME_TTL) return runtime.url;
        const token = getToken();
        const headers = { apikey: SUPABASE_ANON_KEY, Accept: 'application/json' };
        if (token) headers.Authorization = 'Bearer ' + token;
        try {
            const url = SUPABASE_URL + '/rest/v1/ldd_runtime_config?select=value&key=eq.pronunciation_server_url&limit=1';
            const response = await fetch(url, { headers: headers, cache: 'no-store' });
            const rows = response.ok ? await response.json() : [];
            runtime = { url: rows && rows[0] && rows[0].value ? String(rows[0].value).replace(/\/$/, '') : '', at: Date.now() };
        } catch (_) {
            runtime = { url: '', at: Date.now() };
        }
        return runtime.url;
    }

    async function healthy(url) {
        if (!url) return false;
        try {
            const response = await fetchWithTimeout(url + '/health', { cache: 'no-store' }, 2500);
            if (!response.ok) return false;
            const data = await response.json();
            return !!(data && data.ok && data.configured);
        } catch (_) { return false; }
    }

    async function findServer() {
        let url = await runtimeUrl(false);
        if (url && await healthy(url)) return url;
        runtime.at = 0;
        url = await runtimeUrl(true);
        return url && await healthy(url) ? url : '';
    }

    async function enqueue(url, token, jobId, opts, blob, mime) {
        const form = new FormData();
        form.append('audio', blob, 'recording.' + ((mime || '').includes('mp4') ? 'mp4' : (mime || '').includes('ogg') ? 'ogg' : 'webm'));
        form.append('item_type', String(opts.itemType || ''));
        form.append('item_key', String(opts.itemKey || ''));
        form.append('item_label', String(opts.itemLabel || ''));
        form.append('client_job_id', jobId);
        const response = await fetchWithTimeout(url + '/v1/jobs', {
            method: 'POST', headers: { Authorization: 'Bearer ' + token }, body: form
        }, 15000);
        let data = null;
        try { data = await response.json(); } catch (_) {}
        if (!response.ok) {
            const err = new Error((data && data.detail) || ('HTTP ' + response.status));
            err.status = response.status;
            throw err;
        }
        return data;
    }

    async function getJob(url, token, jobId) {
        const response = await fetchWithTimeout(url + '/v1/jobs/' + encodeURIComponent(jobId), {
            headers: { Authorization: 'Bearer ' + token }, cache: 'no-store'
        }, 6000);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
    }

    async function pollJob(initialUrl, token, jobId, statusEl) {
        let url = initialUrl;
        let misses = 0;
        const deadline = Date.now() + POLL_MAX_MS;
        while (Date.now() < deadline) {
            await sleep(POLL_MS);
            try {
                const job = await getJob(url, token, jobId);
                misses = 0;
                if (job.status === 'done') return job;
                if (job.status === 'error') {
                    const err = new Error(job.error || 'Máy chấm không xử lý được bài.');
                    err.jobFailed = true;
                    throw err;
                }
                if (statusEl) {
                    if (job.status === 'processing') statusEl.textContent = '🤖 Đang chấm phát âm trên máy giáo viên...';
                    else if (job.status === 'paused') statusEl.textContent = '💤 Máy giáo viên đang bận — bài đã nằm trong hàng chờ.';
                    else statusEl.textContent = '⏳ Bài đã vào hàng chờ chấm tự động...';
                }
            } catch (err) {
                if (err.jobFailed) throw err;
                misses++;
                if (misses >= 3) {
                    runtime.at = 0;
                    const fresh = await runtimeUrl(true);
                    if (fresh) url = fresh;
                    misses = 0;
                }
            }
        }
        const err = new Error('Bài đã được nhận nhưng chưa chấm xong. Máy sẽ tiếp tục xử lý nền.');
        err.pending = true;
        throw err;
    }

    async function manualFallback(originalSubmit, originalLoad, opts, blob, mime, message) {
        if (opts.statusEl) opts.statusEl.textContent = message || '☁️ Máy chấm đang offline — chuyển sang giảng viên chấm.';
        await originalSubmit({ itemType: opts.itemType, itemKey: opts.itemKey, itemLabel: opts.itemLabel, blob: blob, mime: mime });
        if (opts.statusEl) opts.statusEl.textContent = '✅ Đã gửi cho giảng viên chấm.';
        if (opts.commentsEl) originalLoad(opts.commentsEl, opts.itemType, opts.itemKey);
    }

    function patchSpeakingGrading() {
        if (patched || !window.speakingGrading || typeof window.speakingGrading.attachSubmitUI !== 'function') return false;
        const grading = window.speakingGrading;
        const originalSubmit = grading.submit;
        const originalLoad = grading.loadComments;
        if (typeof originalSubmit !== 'function' || typeof originalLoad !== 'function') return false;

        grading.attachSubmitUI = function (opts) {
            opts = opts || {};
            const sendBtn = opts.sendBtn;
            if (!sendBtn || sendBtn.dataset.lddLocalScorer === '1') return;
            sendBtn.dataset.lddLocalScorer = '1';
            sendBtn.disabled = true;
            let pendingJobId = null;

            sendBtn.addEventListener('click', async function () {
                const blob = opts.getBlob ? opts.getBlob() : null;
                const mime = opts.getMime ? opts.getMime() : (blob && blob.type);
                if (!blob) {
                    if (opts.statusEl) opts.statusEl.textContent = '❌ Bạn chưa ghi âm.';
                    return;
                }
                sendBtn.disabled = true;
                try {
                    if (!AUTO_TYPES.has(String(opts.itemType || ''))) {
                        await manualFallback(originalSubmit, originalLoad, opts, blob, mime);
                        return;
                    }
                    const token = getToken();
                    if (!token) throw new Error('Phiên đăng nhập không còn hợp lệ.');
                    const server = await findServer();
                    if (!server) {
                        await manualFallback(originalSubmit, originalLoad, opts, blob, mime);
                        return;
                    }

                    pendingJobId = pendingJobId || makeJobId();
                    if (opts.statusEl) opts.statusEl.textContent = '📤 Đang gửi thẳng tới máy chấm...';
                    let accepted;
                    try {
                        accepted = await enqueue(server, token, pendingJobId, opts, blob, mime);
                    } catch (err) {
                        if (err && err.status === 422) {
                            pendingJobId = null;
                            await manualFallback(originalSubmit, originalLoad, opts, blob, mime, '☁️ Bài này chuyển sang giảng viên chấm.');
                            return;
                        }
                        await sleep(800);
                        accepted = await enqueue(server, token, pendingJobId, opts, blob, mime);
                    }

                    if (accepted && accepted.status === 'done') {
                        const r = accepted.result || {};
                        pendingJobId = null;
                        if (opts.statusEl) opts.statusEl.textContent = '🤖 Đã chấm: ' + (r.score == null ? 'xong' : r.score + '/100');
                        if (opts.commentsEl) originalLoad(opts.commentsEl, opts.itemType, opts.itemKey);
                        return;
                    }

                    if (opts.statusEl) opts.statusEl.textContent = '⏳ Đã nhận bài — đang xếp hàng chấm tự động...';
                    const job = await pollJob(server, token, pendingJobId, opts.statusEl);
                    const result = job.result || {};
                    pendingJobId = null;
                    if (opts.statusEl) opts.statusEl.textContent = '🤖 Điểm tự động: ' + (result.score == null ? 'đã chấm' : result.score + '/100');
                    if (opts.commentsEl) originalLoad(opts.commentsEl, opts.itemType, opts.itemKey);
                    document.dispatchEvent(new CustomEvent('ldd:today-refresh'));
                } catch (err) {
                    console.warn('[LDD Local Pronunciation]', err);
                    if (err && err.jobFailed) {
                        pendingJobId = null;
                        try {
                            await manualFallback(originalSubmit, originalLoad, opts, blob, mime, '⚠️ Máy chấm lỗi — chuyển sang giảng viên chấm.');
                            return;
                        } catch (fallbackErr) {
                            err = fallbackErr;
                        }
                    }
                    if (opts.statusEl) {
                        opts.statusEl.textContent = err && err.pending
                            ? '⏳ Bài đã nằm trên máy chấm và sẽ tiếp tục xử lý nền.'
                            : '⚠️ Mất kết nối máy chấm. Bấm Gửi lại để nối tiếp đúng bài này.';
                    }
                    sendBtn.disabled = false;
                    return;
                }
                sendBtn.disabled = false;
            });

            if (opts.commentsEl) originalLoad(opts.commentsEl, opts.itemType, opts.itemKey);
        };

        patched = true;
        window.LDDLocalPronunciation = {
            version: '1.0',
            supportedTypes: Array.from(AUTO_TYPES),
            getServerUrl: function () { return runtimeUrl(true); },
            isPatched: function () { return patched; }
        };
        return true;
    }

    function decorateAutoFeedback() {
        document.querySelectorAll('.phonam-feedback-text').forEach(function (el) {
            if ((el.textContent || '').includes('🤖 Máy chấm local')) {
                el.textContent = (el.textContent || '').replace(/^💬\s*Giảng viên:\s*/i, '');
                el.classList.add('ldd-auto-score-feedback');
            }
        });
    }

    if (!patchSpeakingGrading()) {
        const timer = setInterval(function () {
            if (patchSpeakingGrading()) clearInterval(timer);
        }, 100);
        setTimeout(function () { clearInterval(timer); }, 15000);
    }
    new MutationObserver(decorateAutoFeedback).observe(document.documentElement, { childList: true, subtree: true });
    decorateAutoFeedback();
})();
