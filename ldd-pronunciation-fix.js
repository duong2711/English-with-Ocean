/* LDD English — pronunciation reliability patch v2
   - Applies only to Cloudflare single-word pronunciation grading.
   - Rejects truly near-silent clips locally before spending a Workers AI request.
   - Treats NO_SPEECH / UNCERTAIN_SPEECH / temporary scoring errors as retryable, not 0%.
   - Prevents the legacy caller from persisting pron_score=0 after a retryable grading failure.
   - Does not touch speaking-practice recordings or Supabase audio storage. */
(function () {
    'use strict';

    if (window.__lddPronunciationFixV2) return;
    window.__lddPronunciationFixV2 = true;

    const nativeFetch = window.fetch.bind(window);
    const ENDPOINT_MARKER = '/functions/v1/cloudflare-pronounce-score';
    const PROGRESS_MARKER = '/rest/v1/vocab_word_progress';
    const RETRY_WINDOW_MS = 10000;
    const NO_SPEECH_MESSAGE = '🎤 Chưa nghe rõ giọng nói — hãy nói gần micro hơn và đọc lại.';
    const UNCERTAIN_MESSAGE = '🎤 Máy nghe chưa chắc từ bạn vừa đọc — hãy đọc lại rõ hơn. Lượt này không tính điểm.';
    const TEMP_MESSAGE = '⚠️ Chưa chấm được phát âm lúc này — hãy thử lại. Lượt này không tính điểm.';

    let retryUntil = 0;
    let lastRetryMessage = '';
    let lastRetryCode = '';
    let blockedFalseZeroWrites = 0;

    function retryActive() {
        return Date.now() < retryUntil;
    }

    function markRetryable(code, message) {
        retryUntil = Date.now() + RETRY_WINDOW_MS;
        lastRetryCode = String(code || 'RETRY');
        lastRetryMessage = message || (lastRetryCode === 'UNCERTAIN_SPEECH' ? UNCERTAIN_MESSAGE : NO_SPEECH_MESSAGE);
        queueMicrotask(rewriteStatusIfNeeded);
    }

    function clearRetryable() {
        retryUntil = 0;
        lastRetryCode = '';
        lastRetryMessage = '';
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
            const frameSize = Math.max(64, Math.round(sampleRate * 0.02));
            let peak = 0;
            let maxFrameRms = 0;

            for (let start = 0; start < buffer.length; start += frameSize) {
                const end = Math.min(buffer.length, start + frameSize);
                let sumSq = 0;
                let count = 0;
                for (let i = start; i < end; i += 2) {
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

            // Deliberately conservative: only reject effectively muted/empty recordings.
            // Quiet real speech still goes to the server, which has a second rescue pass.
            return maxFrameRms < 0.0045 && peak < 0.02;
        } catch (_) {
            // Some browsers cannot decode their MediaRecorder container with AudioContext.
            // Do not reject in that case; let Whisper decide.
            return false;
        } finally {
            if (ctx) {
                try { await ctx.close(); } catch (_) {}
            }
        }
    }

    function jsonResponse(body, status) {
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    function localNoSpeechResponse() {
        return jsonResponse({
            error: 'Không nghe thấy giọng nói. Hãy nói gần micro hơn và đọc lại.',
            code: 'NO_SPEECH',
            retryable: true,
            local: true
        }, 422);
    }

    function suppressedProgressResponse() {
        return new Response('[]', {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'X-LDD-Pronunciation-Suppressed': 'false-zero'
            }
        });
    }

    function requestUrl(input) {
        if (typeof input === 'string') return input;
        if (input && typeof input.url === 'string') return input.url;
        return '';
    }

    function requestMethod(input, init) {
        return String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    }

    function parseJsonBody(init) {
        try {
            if (!init || typeof init.body !== 'string') return null;
            return JSON.parse(init.body);
        } catch (_) {
            return null;
        }
    }

    function parsePronunciationBody(init) {
        const body = parseJsonBody(init);
        if (!body || typeof body.audio !== 'string') return null;
        return body;
    }

    function containsZeroPronScore(value) {
        if (Array.isArray(value)) return value.some(containsZeroPronScore);
        if (!value || typeof value !== 'object') return false;
        if (Object.prototype.hasOwnProperty.call(value, 'pron_score') && Number(value.pron_score) === 0) return true;
        return false;
    }

    function shouldSuppressFalseZero(input, init) {
        if (!retryActive()) return false;
        const url = requestUrl(input);
        if (!url.includes(PROGRESS_MARKER)) return false;
        const method = requestMethod(input, init);
        if (!['POST', 'PATCH', 'PUT'].includes(method)) return false;
        return containsZeroPronScore(parseJsonBody(init));
    }

    window.fetch = async function lddPronunciationFetch(input, init) {
        const url = requestUrl(input);

        // Final safety net for the old caller: a retryable/no-speech result must never
        // become pron_score=0 in vocab_word_progress.
        if (shouldSuppressFalseZero(input, init)) {
            blockedFalseZeroWrites++;
            console.info('[LDD pronunciation] Blocked false pron_score=0 after', lastRetryCode || 'retryable error');
            queueMicrotask(rewriteStatusIfNeeded);
            return suppressedProgressResponse();
        }

        if (!url.includes(ENDPOINT_MARKER)) return nativeFetch(input, init);

        const body = parsePronunciationBody(init);
        if (body) {
            try {
                if (await isClearlySilent(body.audio)) {
                    markRetryable('NO_SPEECH', NO_SPEECH_MESSAGE);
                    return localNoSpeechResponse();
                }
            } catch (_) {}
        }

        let response;
        try {
            response = await nativeFetch(input, init);
        } catch (err) {
            markRetryable('NETWORK_ERROR', TEMP_MESSAGE);
            throw err;
        }

        try {
            if (response.ok) {
                // A real successful grading result (including a legitimate score 0)
                // cancels any previous retry window, so valid low scores are not hidden.
                clearRetryable();
            } else {
                let data = null;
                try { data = await response.clone().json(); } catch (_) {}
                if (data && data.retryable === true) {
                    const code = String(data.code || 'RETRY');
                    const message = code === 'UNCERTAIN_SPEECH' ? UNCERTAIN_MESSAGE : NO_SPEECH_MESSAGE;
                    markRetryable(code, message);
                } else {
                    // Authentication/quota/server failures are also not pronunciation evidence.
                    // Never let legacy error handling turn those failures into a 0% attempt.
                    markRetryable('SCORING_ERROR', TEMP_MESSAGE);
                }
            }
        } catch (_) {}

        return response;
    };

    function rewriteStatusIfNeeded() {
        if (!retryActive()) return;
        const message = lastRetryMessage || TEMP_MESSAGE;
        const nodes = document.querySelectorAll('.word-lookup-pronounce-status, .vocab-weekly-pron-status');
        nodes.forEach(function (el) {
            const text = String(el.textContent || '');
            const looksLikeLegacyFailure =
                text.includes('Có lỗi khi chấm phát âm') ||
                text.includes('Không thể chấm phát âm lúc này') ||
                text.includes('bỏ qua, sẽ tính lại') ||
                /(^|\s)0\s*%/.test(text) ||
                /(^|\s)0\s*\/\s*100/.test(text) ||
                /(^|\s)0\s*điểm/i.test(text);

            if (looksLikeLegacyFailure) {
                el.textContent = message;
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
        version: '2.0',
        endpoint: ENDPOINT_MARKER,
        isRetryActive: retryActive,
        getLastRetryCode: function () { return lastRetryCode; },
        getBlockedFalseZeroWrites: function () { return blockedFalseZeroWrites; }
    };
})();
