/* LDD English — pronunciation reliability patch v1
   - Applies only to cloudflare-pronounce-score requests.
   - Rejects truly near-silent clips locally before they spend a Workers AI request.
   - Surfaces server/local NO_SPEECH as "không nghe rõ", never as a 0% attempt.
   - Does not touch speaking-practice recordings or Supabase audio storage. */
(function () {
    'use strict';

    if (window.__lddPronunciationFixV1) return;
    window.__lddPronunciationFixV1 = true;

    const nativeFetch = window.fetch.bind(window);
    const ENDPOINT_MARKER = '/functions/v1/cloudflare-pronounce-score';
    const SILENCE_MESSAGE = '🎤 Chưa nghe rõ giọng nói — hãy nói gần micro hơn và đọc lại.';
    let lastNoSpeechAt = 0;

    function markNoSpeech() {
        lastNoSpeechAt = Date.now();
        queueMicrotask(rewriteStatusIfNeeded);
    }

    function base64ToArrayBuffer(base64) {
        const clean = String(base64 || '').replace(/^data:[^,]+,/, '');
        const binary = atob(clean);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes.buffer;
    }

    async function isClearlySilent(base64) {
        if (!base64 || base64.length < 200) return true;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return false;

        let ctx = null;
        try {
            ctx = new AudioCtx();
            const buffer = await ctx.decodeAudioData(base64ToArrayBuffer(base64).slice(0));
            if (!buffer || !buffer.length || !buffer.numberOfChannels) return true;

            const sampleRate = buffer.sampleRate || 44100;
            const frameSize = Math.max(64, Math.round(sampleRate * 0.02)); // 20ms
            let peak = 0;
            let maxFrameRms = 0;

            // Down-mix logically by checking the loudest sample across channels.
            for (let start = 0; start < buffer.length; start += frameSize) {
                const end = Math.min(buffer.length, start + frameSize);
                let sumSq = 0;
                let count = 0;
                for (let i = start; i < end; i += 2) { // sample every other point; enough for silence detection
                    let sample = 0;
                    for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
                        const v = Math.abs(buffer.getChannelData(ch)[i] || 0);
                        if (v > sample) sample = v;
                    }
                    if (sample > peak) peak = sample;
                    sumSq += sample * sample;
                    count++;
                }
                if (count) {
                    const rms = Math.sqrt(sumSq / count);
                    if (rms > maxFrameRms) maxFrameRms = rms;
                }
            }

            // Intentionally conservative: only block audio that is essentially empty/muted.
            // Quiet real speech should still be sent to the server rescue pass.
            return maxFrameRms < 0.0045 && peak < 0.02;
        } catch (_) {
            // Browser cannot decode this MediaRecorder format -> do not block; let server decide.
            return false;
        } finally {
            if (ctx) {
                try { await ctx.close(); } catch (_) {}
            }
        }
    }

    function localNoSpeechResponse() {
        return new Response(JSON.stringify({
            error: 'Không nghe thấy giọng nói. Hãy nói gần micro hơn và đọc lại.',
            code: 'NO_SPEECH',
            retryable: true,
            local: true
        }), {
            status: 422,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    function requestUrl(input) {
        if (typeof input === 'string') return input;
        if (input && typeof input.url === 'string') return input.url;
        return '';
    }

    function parsePronunciationBody(init) {
        try {
            if (!init || typeof init.body !== 'string') return null;
            const body = JSON.parse(init.body);
            if (!body || typeof body.audio !== 'string') return null;
            return body;
        } catch (_) {
            return null;
        }
    }

    window.fetch = async function lddPronunciationFetch(input, init) {
        const url = requestUrl(input);
        if (!url.includes(ENDPOINT_MARKER)) return nativeFetch(input, init);

        const body = parsePronunciationBody(init);
        if (body) {
            try {
                if (await isClearlySilent(body.audio)) {
                    markNoSpeech();
                    return localNoSpeechResponse();
                }
            } catch (_) {}
        }

        const response = await nativeFetch(input, init);
        try {
            if (response.status === 422) {
                const data = await response.clone().json();
                if (data && data.code === 'NO_SPEECH') markNoSpeech();
            }
        } catch (_) {}
        return response;
    };

    function rewriteStatusIfNeeded() {
        if (Date.now() - lastNoSpeechAt > 3500) return;
        const nodes = document.querySelectorAll('.word-lookup-pronounce-status, .vocab-weekly-pron-status');
        nodes.forEach(function (el) {
            const text = String(el.textContent || '');
            if (
                text.includes('Có lỗi khi chấm phát âm') ||
                text.includes('Không thể chấm phát âm lúc này') ||
                text.includes('bỏ qua, sẽ tính lại')
            ) {
                el.textContent = SILENCE_MESSAGE;
                el.classList.add('word-lookup-pronounce-wrong');
            }
        });
    }

    const observer = new MutationObserver(rewriteStatusIfNeeded);
    observer.observe(document.documentElement, {
        childList: true,
        characterData: true,
        subtree: true
    });

    window.LDDPronunciationFix = {
        version: '1.0',
        endpoint: ENDPOINT_MARKER,
        getLastNoSpeechAt: function () { return lastNoSpeechAt; }
    };
})();
