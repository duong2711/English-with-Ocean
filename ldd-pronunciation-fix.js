/* LDD English — vocabulary pronunciation router v3
   Primary: Cloudflare Workers AI / whisper-large-v3-turbo.
   Fallback: free browser SpeechRecognition when Cloudflare quota/capacity/network/ASR fails.
   Applies to:
   - word lookup pronunciation gate
   - weekly vocabulary pronunciation step
   - Kid flashcards
   - THCS/THPT flashcards
   Keeps the false-0 protection from v2 and never touches speaking-practice uploads. */
(function () {
    'use strict';

    if (window.__lddPronunciationFixV3) return;
    window.__lddPronunciationFixV3 = true;

    const nativeFetch = window.fetch.bind(window);
    const ENDPOINT_URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/cloudflare-pronounce-score';
    const ENDPOINT_MARKER = '/functions/v1/cloudflare-pronounce-score';
    const PROGRESS_MARKER = '/rest/v1/vocab_word_progress';
    const SUPABASE_REF = 'ywqbaksmmtvwbojcgsdd';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
    const RETRY_WINDOW_MS = 10000;
    const RECORD_MS = 2700;
    const PASS_SCORE = 60;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    const NO_SPEECH_MESSAGE = '🎤 Chưa nghe rõ giọng nói — hãy nói gần micro hơn và đọc lại.';
    const UNCERTAIN_MESSAGE = '🎤 Máy nghe chưa chắc từ bạn vừa đọc — hãy đọc lại rõ hơn. Lượt này không tính điểm.';
    const TEMP_MESSAGE = '⚠️ Chưa chấm được phát âm lúc này — hãy thử lại. Lượt này không tính điểm.';

    let retryUntil = 0;
    let lastRetryMessage = '';
    let lastRetryCode = '';
    let blockedFalseZeroWrites = 0;
    let fallbackUses = 0;
    let activeGateRecorder = null;
    let activeGateStream = null;
    let activeGateSpeech = null;
    let legacySpeechSession = null;

    function delay(ms) {
        return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

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

    function normalizeWord(s) {
        return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');
    }

    function levenshtein(a, b) {
        a = String(a || '');
        b = String(b || '');
        if (!a.length) return b.length;
        if (!b.length) return a.length;
        const row = new Array(b.length + 1);
        for (let j = 0; j <= b.length; j++) row[j] = j;
        for (let i = 1; i <= a.length; i++) {
            let prev = row[0];
            row[0] = i;
            for (let j = 1; j <= b.length; j++) {
                const old = row[j];
                row[j] = a[i - 1] === b[j - 1]
                    ? prev
                    : 1 + Math.min(prev, row[j], row[j - 1]);
                prev = old;
            }
        }
        return row[b.length];
    }

    function pairScore(a, b) {
        if (!a || !b) return 0;
        const maxLen = Math.max(a.length, b.length);
        return Math.round(Math.max(0, 1 - levenshtein(a, b) / maxLen) * 100);
    }

    function bestSpeechScore(target, transcript) {
        const goal = normalizeWord(target);
        if (!goal) return 0;
        const raw = String(transcript || '').trim();
        const candidates = raw.split(/\s+/).map(normalizeWord).filter(Boolean);
        const whole = normalizeWord(raw);
        if (whole) candidates.push(whole);
        let best = 0;
        Array.from(new Set(candidates)).forEach(function (candidate) {
            best = Math.max(best, pairScore(goal, candidate));
        });
        return best;
    }

    function browserIsMatch(transcript, target) {
        const goal = normalizeWord(target);
        if (!goal) return false;
        const score = bestSpeechScore(target, transcript);
        const threshold = goal.length <= 4 ? 80 : (goal.length <= 7 ? 72 : 65);
        return score >= threshold;
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
                        sample = Math.max(sample, Math.abs(buffer.getChannelData(ch)[i] || 0));
                    }
                    peak = Math.max(peak, sample);
                    sumSq += sample * sample;
                    count++;
                }
                if (count) maxFrameRms = Math.max(maxFrameRms, Math.sqrt(sumSq / count));
            }
            return maxFrameRms < 0.0045 && peak < 0.02;
        } catch (_) {
            return false;
        } finally {
            if (ctx) {
                try { await ctx.close(); } catch (_) {}
            }
        }
    }

    function requestUrl(input) {
        if (typeof input === 'string') return input;
        return input && typeof input.url === 'string' ? input.url : '';
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

    function jsonResponse(body, status, extraHeaders) {
        return new Response(JSON.stringify(body), {
            status: status,
            headers: Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {})
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

    function containsZeroPronScore(value) {
        if (Array.isArray(value)) return value.some(containsZeroPronScore);
        if (!value || typeof value !== 'object') return false;
        return Object.prototype.hasOwnProperty.call(value, 'pron_score') && Number(value.pron_score) === 0;
    }

    function shouldSuppressFalseZero(input, init) {
        if (!retryActive()) return false;
        const url = requestUrl(input);
        if (!url.includes(PROGRESS_MARKER)) return false;
        const method = requestMethod(input, init);
        if (!['POST', 'PATCH', 'PUT'].includes(method)) return false;
        return containsZeroPronScore(parseJsonBody(init));
    }

    function extractTokenFromValue(value) {
        if (!value) return '';
        try {
            const parsed = typeof value === 'string' ? JSON.parse(value) : value;
            if (parsed && typeof parsed.access_token === 'string') return parsed.access_token;
            if (parsed && parsed.currentSession && typeof parsed.currentSession.access_token === 'string') return parsed.currentSession.access_token;
            if (parsed && parsed.session && typeof parsed.session.access_token === 'string') return parsed.session.access_token;
        } catch (_) {}
        return '';
    }

    function getAccessToken() {
        const preferredKey = 'sb-' + SUPABASE_REF + '-auth-token';
        const stores = [window.localStorage, window.sessionStorage];
        for (const store of stores) {
            try {
                const direct = extractTokenFromValue(store.getItem(preferredKey));
                if (direct) return direct;
                for (let i = 0; i < store.length; i++) {
                    const key = store.key(i) || '';
                    if (!key.includes(SUPABASE_REF) || !key.includes('auth')) continue;
                    const token = extractTokenFromValue(store.getItem(key));
                    if (token) return token;
                }
            } catch (_) {}
        }
        return '';
    }

    function startSpeechSession() {
        if (!SR) return null;
        let recognition;
        try { recognition = new SR(); } catch (_) { return null; }
        let latest = '';
        let settled = false;
        let resolvePromise;
        const promise = new Promise(function (resolve) { resolvePromise = resolve; });
        function finish(value) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolvePromise(String(value || latest || '').trim());
        }
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;
        recognition.onresult = function (event) {
            let heard = '';
            for (let i = event.resultIndex || 0; i < event.results.length; i++) {
                if (event.results[i] && event.results[i][0]) heard += ' ' + (event.results[i][0].transcript || '');
            }
            if (heard.trim()) latest = heard.trim();
            const last = event.results[event.results.length - 1];
            if (last && last.isFinal) finish(latest);
        };
        recognition.onerror = function () { finish(latest); };
        recognition.onend = function () { finish(latest); };
        const timer = setTimeout(function () {
            try { recognition.stop(); } catch (_) {}
            finish(latest);
        }, 4500);
        try {
            recognition.start();
        } catch (_) {
            clearTimeout(timer);
            return null;
        }
        return {
            recognition: recognition,
            promise: promise,
            getTranscript: function () { return latest; },
            stop: function () {
                try { recognition.stop(); } catch (_) {}
                finish(latest);
            },
            abort: function () {
                try { recognition.abort(); } catch (_) {}
                finish(latest);
            }
        };
    }

    async function waitSpeechTranscript(session, timeoutMs) {
        if (!session) return '';
        const current = String(session.getTranscript ? session.getTranscript() : '').trim();
        if (current) return current;
        const result = await Promise.race([
            session.promise.catch(function () { return ''; }),
            delay(timeoutMs || 900).then(function () { return ''; })
        ]);
        return String(result || (session.getTranscript ? session.getTranscript() : '') || '').trim();
    }

    function shouldFallbackStatus(status, data) {
        const code = String(data && data.code || '');
        if (status === 408 || status === 422 || status === 429 || status >= 500) return true;
        return ['NO_SPEECH', 'UNCERTAIN_SPEECH', 'CF_NEURONS_EXHAUSTED', 'CF_CAPACITY', 'CF_AI_ERROR', 'CF_FREE_BUDGET_GUARD'].includes(code);
    }

    async function synthesizeSpeechFallback(targetWord, session, reason) {
        const transcript = await waitSpeechTranscript(session, 1000);
        if (!transcript) return null;
        const score = bestSpeechScore(targetWord, transcript);
        fallbackUses++;
        console.info('[LDD pronunciation] Browser SpeechRecognition fallback:', reason || 'cloud-error', 'heard=', transcript, 'score=', score);
        return jsonResponse({
            score: score,
            transcript: transcript,
            fallback: 'browser_speech_recognition',
            scoring: 'web-speech-fallback-v1'
        }, 200, { 'X-LDD-Pronunciation-Fallback': 'browser-speech' });
    }

    document.addEventListener('click', function (event) {
        const target = event.target && event.target.closest ? event.target.closest('#word-lookup-mic-btn, .vocab-weekly-pron-mic-btn') : null;
        if (!target) return;
        if (legacySpeechSession && legacySpeechSession.abort) legacySpeechSession.abort();
        legacySpeechSession = startSpeechSession();
    }, true);

    window.fetch = async function lddPronunciationFetch(input, init) {
        const url = requestUrl(input);

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
            const fallback = body ? await synthesizeSpeechFallback(body.word, legacySpeechSession, 'network') : null;
            if (fallback) {
                clearRetryable();
                legacySpeechSession = null;
                return fallback;
            }
            markRetryable('NETWORK_ERROR', TEMP_MESSAGE);
            throw err;
        }

        if (response.ok) {
            clearRetryable();
            if (legacySpeechSession && legacySpeechSession.abort) legacySpeechSession.abort();
            legacySpeechSession = null;
            return response;
        }

        let data = null;
        try { data = await response.clone().json(); } catch (_) {}

        if (body && shouldFallbackStatus(response.status, data)) {
            const fallback = await synthesizeSpeechFallback(body.word, legacySpeechSession, (data && data.code) || ('http-' + response.status));
            if (fallback) {
                clearRetryable();
                legacySpeechSession = null;
                return fallback;
            }
        }

        if (data && data.retryable === true) {
            const code = String(data.code || 'RETRY');
            const message = code === 'UNCERTAIN_SPEECH' ? UNCERTAIN_MESSAGE : (code === 'NO_SPEECH' ? NO_SPEECH_MESSAGE : TEMP_MESSAGE);
            markRetryable(code, message);
        } else {
            markRetryable('SCORING_ERROR', TEMP_MESSAGE);
        }
        return response;
    };

    function chooseMimeType() {
        if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return '';
        const options = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
        for (const type of options) if (MediaRecorder.isTypeSupported(type)) return type;
        return '';
    }

    function blobToDataUrl(blob) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () { resolve(String(reader.result || '')); };
            reader.onerror = function () { reject(reader.error || new Error('read-error')); };
            reader.readAsDataURL(blob);
        });
    }

    async function recordGateClip() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
            throw Object.assign(new Error('unsupported'), { code: 'unsupported' });
        }
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
            });
        } catch (err) {
            const name = String(err && err.name || '');
            const code = name === 'NotAllowedError' ? 'denied' : (name === 'NotFoundError' ? 'no-mic' : 'error');
            throw Object.assign(err || new Error(code), { code: code });
        }
        activeGateStream = stream;
        const mimeType = chooseMimeType();
        const chunks = [];
        const recorder = mimeType ? new MediaRecorder(stream, { mimeType: mimeType }) : new MediaRecorder(stream);
        activeGateRecorder = recorder;
        return await new Promise(function (resolve, reject) {
            let timer = null;
            recorder.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
            recorder.onerror = function () { clearTimeout(timer); reject(new Error('record-error')); };
            recorder.onstop = function () {
                clearTimeout(timer);
                const type = recorder.mimeType || mimeType || (chunks[0] && chunks[0].type) || 'audio/webm';
                const blob = new Blob(chunks, { type: type });
                resolve({ blob: blob, mimeType: type });
            };
            recorder.start();
            timer = setTimeout(function () {
                try { if (recorder.state !== 'inactive') recorder.stop(); } catch (_) {}
            }, RECORD_MS);
        }).finally(function () {
            if (stream) stream.getTracks().forEach(function (t) { try { t.stop(); } catch (_) {} });
            if (activeGateStream === stream) activeGateStream = null;
            if (activeGateRecorder === recorder) activeGateRecorder = null;
        });
    }

    async function callCloudflareDirect(targetWord, clip) {
        const token = getAccessToken();
        if (!token) throw Object.assign(new Error('Vui lòng đăng nhập lại.'), { status: 401, code: 'AUTH' });
        const audio = await blobToDataUrl(clip.blob);
        if (await isClearlySilent(audio)) {
            throw Object.assign(new Error('no-speech'), { status: 422, code: 'NO_SPEECH', retryable: true });
        }
        let response;
        try {
            response = await nativeFetch(ENDPOINT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'apikey': SUPABASE_ANON_KEY
                },
                body: JSON.stringify({ word: targetWord, audio: audio, mimeType: clip.mimeType })
            });
        } catch (err) {
            throw Object.assign(err || new Error('network'), { code: 'NETWORK', status: 0 });
        }
        const data = await response.json().catch(function () { return {}; });
        if (!response.ok || data.error) {
            throw Object.assign(new Error(data.error || ('Cloudflare pronunciation HTTP ' + response.status)), {
                status: response.status,
                code: data.code || 'CF_ERROR',
                retryable: data.retryable === true
            });
        }
        return data;
    }

    function stopGate() {
        if (activeGateSpeech && activeGateSpeech.abort) activeGateSpeech.abort();
        activeGateSpeech = null;
        if (activeGateRecorder) {
            try { if (activeGateRecorder.state !== 'inactive') activeGateRecorder.stop(); } catch (_) {}
            activeGateRecorder = null;
        }
        if (activeGateStream) {
            activeGateStream.getTracks().forEach(function (t) { try { t.stop(); } catch (_) {} });
            activeGateStream = null;
        }
    }

    async function finishGateFromSpeech(targetWord, callbacks, speechSession, errorCode) {
        const transcript = await waitSpeechTranscript(speechSession, 1100);
        if (!transcript) {
            callbacks.onError && callbacks.onError(errorCode || 'no-speech');
            return;
        }
        fallbackUses++;
        if (browserIsMatch(transcript, targetWord)) callbacks.onMatch && callbacks.onMatch(transcript);
        else callbacks.onMismatch && callbacks.onMismatch(transcript);
    }

    async function gateListen(targetWord, callbacks) {
        callbacks = callbacks || {};
        stopGate();

        const canCloud = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
        if (!canCloud && !SR) {
            callbacks.onError && callbacks.onError('unsupported');
            callbacks.onEnd && callbacks.onEnd();
            return;
        }

        if (!canCloud) {
            const speechOnly = startSpeechSession();
            activeGateSpeech = speechOnly;
            try {
                await finishGateFromSpeech(targetWord, callbacks, speechOnly, 'unsupported');
            } finally {
                if (activeGateSpeech === speechOnly) activeGateSpeech = null;
                callbacks.onEnd && callbacks.onEnd();
            }
            return;
        }

        let speechSession = null;
        try {
            const clipPromise = recordGateClip();
            speechSession = startSpeechSession();
            activeGateSpeech = speechSession;
            const clip = await clipPromise;

            try {
                const result = await callCloudflareDirect(targetWord, clip);
                if (speechSession && speechSession.abort) speechSession.abort();
                const score = Math.max(0, Math.min(100, Math.round(Number(result.score) || 0)));
                const heard = String(result.transcript || '');
                if (score >= PASS_SCORE) callbacks.onMatch && callbacks.onMatch(heard);
                else callbacks.onMismatch && callbacks.onMismatch(heard);
            } catch (cfErr) {
                const status = Number(cfErr && cfErr.status || 0);
                const code = String(cfErr && cfErr.code || '');
                const fallbackEligible = status === 0 || status === 408 || status === 422 || status === 429 || status >= 500 ||
                    ['NO_SPEECH', 'UNCERTAIN_SPEECH', 'CF_NEURONS_EXHAUSTED', 'CF_CAPACITY', 'CF_AI_ERROR', 'CF_FREE_BUDGET_GUARD', 'NETWORK'].includes(code);
                if (fallbackEligible && SR) {
                    await finishGateFromSpeech(targetWord, callbacks, speechSession, status === 422 ? 'no-speech' : 'network');
                } else {
                    callbacks.onError && callbacks.onError(status === 401 ? 'error' : 'network');
                }
            }
        } catch (err) {
            const code = String(err && err.code || 'error');
            if (SR && ['denied', 'no-mic', 'unsupported'].indexOf(code) === -1) {
                if (!speechSession) speechSession = startSpeechSession();
                await finishGateFromSpeech(targetWord, callbacks, speechSession, code);
            } else {
                callbacks.onError && callbacks.onError(code);
            }
        } finally {
            if (speechSession && speechSession.abort) speechSession.abort();
            if (activeGateSpeech === speechSession) activeGateSpeech = null;
            callbacks.onEnd && callbacks.onEnd();
        }
    }

    window.pronounceGate = {
        supported: !!((navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder) || SR),
        primary: 'cloudflare-workers-ai',
        fallback: SR ? 'browser-speech-recognition' : null,
        listen: function (targetWord, callbacks) { gateListen(targetWord, callbacks); },
        stop: stopGate,
        isMatch: browserIsMatch
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
    observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });

    window.LDDPronunciationFix = {
        version: '3.0',
        endpoint: ENDPOINT_MARKER,
        primary: 'cloudflare-workers-ai',
        fallback: SR ? 'browser-speech-recognition' : null,
        passScore: PASS_SCORE,
        isRetryActive: retryActive,
        getLastRetryCode: function () { return lastRetryCode; },
        getBlockedFalseZeroWrites: function () { return blockedFalseZeroWrites; },
        getFallbackUses: function () { return fallbackUses; }
    };
})();
