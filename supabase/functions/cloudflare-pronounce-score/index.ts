import { createClient } from 'npm:@supabase/supabase-js@2';

const CF_ACCOUNT_ID = Deno.env.get('CF_ACCOUNT_ID') || '';
const CF_API_TOKEN = Deno.env.get('CF_API_TOKEN') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';

// cloudflare_speech_usage counts actual Whisper inferences, including rescue passes.
// 4,200 short ~2.7s inferences stay below the current 10k-neuron free allocation with headroom.
const MAX_FREE_INFERENCES_PER_DAY = 4200;
const MODEL = '@cf/openai/whisper-large-v3-turbo';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

class CloudflareAIError extends Error {
  status: number;
  cfCode: number | null;
  appCode: string;
  constructor(message: string, status: number, cfCode: number | null, appCode: string) {
    super(message);
    this.name = 'CloudflareAIError';
    this.status = status;
    this.cfCode = cfCode;
    this.appCode = appCode;
  }
}

function classifyCloudflareError(status: number, cfCode: number | null): string {
  if (status === 429 && cfCode === 3036) return 'CF_NEURONS_EXHAUSTED';
  if (status === 429 && cfCode === 3040) return 'CF_CAPACITY';
  if (status === 429) return 'CF_RATE_LIMIT';
  if (status === 408) return 'CF_TIMEOUT';
  return 'CF_AI_ERROR';
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

function normalizeForMatch(s: string): string {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '');
}

function pairScore(a: string, b: string): number {
  if (!a || !b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return Math.round(Math.max(0, 1 - dist / maxLen) * 100);
}


/** Loose word-recognition rule used only for single-word repairs in Dịch câu.
 * Prefer >=90% similarity, and tolerate 1-2 character ASR mistakes for short
 * learner words. Never match more than one spoken word or very short words loosely.
 */
function wordRetryMatch(target: string, transcript: string): {
  accepted: boolean; similarity: number; editDistance: number;
} {
  const rawTokens = String(transcript || '').trim().split(/\s+/).filter(Boolean);
  const expected = normalizeForMatch(target);
  const heard = rawTokens.length === 1 ? normalizeForMatch(rawTokens[0]) : '';
  if (!expected || !heard || rawTokens.length !== 1)
    return { accepted: false, similarity: 0, editDistance: -1 };
  const distance = levenshtein(expected, heard);
  const similarity = pairScore(expected, heard);
  const allowedEdits = expected.length >= 5 ? 2 : expected.length >= 3 ? 1 : 0;
  return {
    accepted: similarity >= 90 || distance <= allowedEdits,
    similarity, editDistance: distance,
  };
}

function candidatesFromTranscript(transcript: string): string[] {
  const words = String(transcript || '').split(/\s+/).map(normalizeForMatch).filter(Boolean);
  const whole = normalizeForMatch(transcript);
  if (whole) words.push(whole);
  return Array.from(new Set(words));
}

function bestMatch(target: string, transcript: string): { score: number; candidate: string } {
  const a = normalizeForMatch(target);
  if (!a) return { score: 0, candidate: '' };
  let bestScore = 0;
  let bestCandidate = '';
  for (const b of candidatesFromTranscript(transcript)) {
    const score = pairScore(a, b);
    if (score > bestScore || (score === bestScore && !bestCandidate)) {
      bestScore = score;
      bestCandidate = b;
    }
  }
  return { score: bestScore, candidate: bestCandidate };
}


function sentenceWords(s: string): string[] {
  const expanded = String(s || '').toLowerCase().normalize('NFKC')
    .replace(/[’‘]/g, "'")
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not')
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\b(you|we|they)'re\b/g, '$1 are')
    .replace(/\b(he|she|it|that|there|what|who)'s\b/g, '$1 is')
    .replace(/\b(i|you|we|they)'ve\b/g, '$1 have')
    .replace(/\b(i|you|he|she|we|they|it)'ll\b/g, '$1 will')
    .replace(/[^a-z0-9]+/g, ' ').trim();
  return expanded ? expanded.split(/\s+/) : [];
}

// Ordered word-error-rate alignment. Never award full sentence credit for just one word.
function sentenceMatch(target: string, transcript: string): {
  score: number; candidate: string; total: number; heard: number;
  correct: number; missing: string[]; wrong: string[]; extra: string[];
} {
  const expected = sentenceWords(target);
  const spoken = sentenceWords(transcript);
  const n = expected.length, m = spoken.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = expected[i - 1] === spoken[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j - 1] + cost, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
    }
  }
  const missing: string[] = [], wrong: string[] = [], extra: string[] = [];
  let correct = 0, i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && expected[i - 1] === spoken[j - 1] && dp[i][j] === dp[i - 1][j - 1]) {
      correct++; i--; j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      wrong.unshift(expected[i - 1]); i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      missing.unshift(expected[i - 1]); i--;
    } else {
      extra.unshift(spoken[j - 1]); j--;
    }
  }
  return {
    score: Math.max(0, Math.round(100 * (1 - dp[n][m] / Math.max(1, n, m)))),
    candidate: transcript, total: n, heard: m, correct,
    missing: missing.slice(0, 20), wrong: wrong.slice(0, 20), extra: extra.slice(0, 20),
  };
}

function transcriptAgreement(a: string, b: string): number {
  return pairScore(normalizeForMatch(a), normalizeForMatch(b));
}

async function callWhisper(audioBase64: string, rescue = false, sentence = false, fastScreen = false): Promise<{ text: string; wordCount: number | null }> {
  const body = rescue
    ? {
        audio: audioBase64,
        task: 'transcribe',
        language: 'en',
        vad_filter: false,
        beam_size: fastScreen ? 1 : 5,
        condition_on_previous_text: false,
        no_speech_threshold: 0.90,
        log_prob_threshold: -2.0,
        hallucination_silence_threshold: 1.5,
        initial_prompt: sentence ? 'A student is reading one complete English sentence aloud. Transcribe only audible words.' : 'A student is saying one short English word clearly.',
      }
    : {
        audio: audioBase64,
        task: 'transcribe',
        language: 'en',
        vad_filter: true,
        beam_size: fastScreen ? 1 : 5,
        condition_on_previous_text: false,
        no_speech_threshold: 0.72,
        log_prob_threshold: -1.5,
        hallucination_silence_threshold: 1.0,
        initial_prompt: sentence ? 'A student is reading one complete English sentence aloud. Transcribe only audible words.' : 'A student is saying one short English word clearly.',
      };

  const resp = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${MODEL}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const result = await resp.json().catch(() => ({}));
  if (!resp.ok || result?.success === false) {
    const rawCode = Number(result?.errors?.[0]?.code);
    const cfCode = Number.isFinite(rawCode) ? rawCode : null;
    const msg = result?.errors?.[0]?.message || `Cloudflare AI lỗi (${resp.status})`;
    throw new CloudflareAIError(msg, resp.status, cfCode, classifyCloudflareError(resp.status, cfCode));
  }
  const payload = result?.result || {};
  const wordCount = Number(payload?.transcription_info?.word_count);
  return {
    text: String(payload?.text || '').trim(),
    wordCount: Number.isFinite(wordCount) ? wordCount : null,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS_HEADERS });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  try {
    if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
      return jsonResponse({ error: 'Chưa cấu hình CF_ACCOUNT_ID / CF_API_TOKEN cho Edge Function này.', code: 'CF_CONFIG_ERROR' }, 500);
    }
    if (!SUPABASE_URL || !ANON_KEY || !SERVICE_ROLE_KEY) {
      return jsonResponse({ error: 'Thiếu cấu hình Supabase cho Edge Function.', code: 'SERVER_CONFIG_ERROR' }, 500);
    }

    const authHeader = req.headers.get('Authorization') || '';
    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return jsonResponse({ error: 'Vui lòng đăng nhập lại.' }, 401);
    }

    const supabaseAuth = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser();
    if (userErr || !userData?.user) return jsonResponse({ error: 'Vui lòng đăng nhập lại.' }, 401);

    const body = await req.json().catch(() => ({}));
    const word = String(body?.word || '').trim();
    const sentenceMode = body?.mode === 'sentence';
    const fastSentenceScreen = sentenceMode && body?.quick_check === true;
    // Only the Dịch câu single-word repair step requests an extra Whisper retry.
    const strictWordRetry = !sentenceMode && body?.retry_word === true;
    if (word.length > (sentenceMode ? 500 : 160)) return jsonResponse({ error: 'Nội dung cần chấm quá dài.' }, 400);
    if (sentenceMode && (sentenceWords(word).length < 2 || sentenceWords(word).length > 60)) return jsonResponse({ error: 'Độ dài câu không hợp lệ.' }, 400);
    const audioBase64 = String(body?.audio || '');
    if (!word) return jsonResponse({ error: 'Thiếu từ cần chấm.' }, 400);
    if (!audioBase64) return jsonResponse({ error: 'Thiếu dữ liệu ghi âm.' }, 400);
    if (audioBase64.length > 3_000_000) return jsonResponse({ error: 'Đoạn ghi âm quá dài.' }, 400);

    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const today = new Date().toISOString().slice(0, 10);
    const { data: usageRow } = await supabaseAdmin
      .from('cloudflare_speech_usage')
      .select('request_count')
      .eq('usage_date', today)
      .maybeSingle();

    const currentCount = usageRow?.request_count || 0;
    if (currentCount >= MAX_FREE_INFERENCES_PER_DAY) {
      return jsonResponse({
        error: 'Đã chạm ngưỡng Workers AI miễn phí an toàn hôm nay. Hệ thống sẽ chuyển sang Speech AI dự phòng.',
        code: 'CF_FREE_BUDGET_GUARD',
        retryable: true,
      }, 429);
    }

    let inferenceCount = 1;
    const first = await callWhisper(audioBase64, false, sentenceMode, fastSentenceScreen);
    const firstNorm = normalizeForMatch(first.text);
    // Fast sentence screening only transcribes audio; no detailed word-error alignment.
    const firstMatch = fastSentenceScreen ? { score: 0, candidate: first.text }
      : (sentenceMode ? sentenceMatch(word, first.text) : bestMatch(word, first.text));
    let bestTranscript = first.text;
    let bestMatchResult = firstMatch;
    let rescued = false;
    let insufficientEvidence = !firstNorm;
    let uncertainEvidence = false;
    let secondText = '';

    // Don't select a more flattering pass for an audible sentence read incorrectly.
    // Short words like "hobby" can be transcribed as a similar-sounding single word.
    // Retry one time with alternate VAD/decoding if the first result is not exact.
    // Keep multiword/extra-word utterances strict: do not rescue them into a pass.
    const firstWordCount = String(first.text || '').trim().split(/\s+/).filter(Boolean).length;
    const shouldRescue = !fastSentenceScreen && (!firstNorm ||
      (!sentenceMode && (firstMatch.score <= 25 ||
        (strictWordRetry && firstWordCount === 1 &&
          !wordRetryMatch(word, first.text).accepted))));
    if (shouldRescue && currentCount + 1 < MAX_FREE_INFERENCES_PER_DAY) {
      try {
        const second = await callWhisper(audioBase64, true, sentenceMode);
        inferenceCount = 2;
        rescued = true;
        secondText = second.text;
        const secondNorm = normalizeForMatch(second.text);
        const secondMatch = sentenceMode ? sentenceMatch(word, second.text) : bestMatch(word, second.text);

        // Prefer a passing single-word result even when the previous transcript
        // contained extra words and bestMatch() liked one of its tokens.
        const firstWordAccepted = strictWordRetry && wordRetryMatch(word, bestTranscript).accepted;
        const secondWordAccepted = strictWordRetry && wordRetryMatch(word, second.text).accepted;
        if ((secondWordAccepted && !firstWordAccepted) ||
            (!firstWordAccepted && (secondMatch.score > bestMatchResult.score || !firstNorm))) {
          bestMatchResult = secondMatch;
          bestTranscript = second.text;
        }

        if (!firstNorm && !secondNorm) {
          insufficientEvidence = true;
        } else if (Math.max(firstMatch.score, secondMatch.score) <= 25 && (!firstNorm || !secondNorm)) {
          insufficientEvidence = true;
        } else {
          insufficientEvidence = false;
        }

        if (firstNorm && secondNorm && Math.max(firstMatch.score, secondMatch.score) <= 25) {
          const agreement = transcriptAgreement(firstMatch.candidate || first.text, secondMatch.candidate || second.text);
          if (agreement < 50) uncertainEvidence = true;
        }
      } catch (rescueErr) {
        console.warn('pronunciation rescue failed:', rescueErr);
        insufficientEvidence = !firstNorm;
      }
    } else {
      insufficientEvidence = !firstNorm;
    }

    await supabaseAdmin.from('cloudflare_speech_usage').upsert(
      {
        usage_date: today,
        request_count: currentCount + inferenceCount,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'usage_date' },
    );

    if (insufficientEvidence || !normalizeForMatch(bestTranscript)) {
      return jsonResponse({
        error: 'Không nghe rõ giọng nói. Hãy nói gần micro hơn và đọc lại.',
        code: 'NO_SPEECH',
        retryable: true,
        rescued,
      }, 422);
    }

    if (uncertainEvidence) {
      return jsonResponse({
        error: 'Máy nghe chưa chắc từ bạn vừa đọc. Hãy đọc lại một lần nữa, rõ và gần micro hơn.',
        code: 'UNCERTAIN_SPEECH',
        retryable: true,
        rescued: true,
      }, 422);
    }

    const sentenceGrade = sentenceMode && !fastSentenceScreen ? sentenceMatch(word, bestTranscript) : null;
    const retryGrade = strictWordRetry ? wordRetryMatch(word, bestTranscript) : null;
    return jsonResponse({
      // Preserve the measured ASR similarity separately from the lenient pass rule.
      score: fastSentenceScreen ? undefined : (retryGrade ? retryGrade.similarity :
        (sentenceGrade ? sentenceGrade.score : bestMatchResult.score)),
      accepted: retryGrade ? retryGrade.accepted : undefined,
      edit_distance: retryGrade ? retryGrade.editDistance : undefined,
      transcript: bestTranscript,
      rescued,
      scoring: fastSentenceScreen ? 'asr-sentence-screen-v1' : (sentenceMode ? 'asr-sentence-wer-v1' : 'asr-word-match-v5'),
      mode: sentenceMode ? 'sentence' : 'word',
      word_feedback: sentenceGrade ? {
        total: sentenceGrade.total,
        heard: sentenceGrade.heard,
        correct: sentenceGrade.correct,
        missing: sentenceGrade.missing,
        wrong: sentenceGrade.wrong,
        extra: sentenceGrade.extra,
      } : undefined,
      model: MODEL,
      diagnostics: fastSentenceScreen ? undefined : {
        first_heard: first.text,
        second_heard: secondText || null,
      },
    });
  } catch (err) {
    console.error('cloudflare-pronounce-score error:', err);
    if (err instanceof CloudflareAIError) {
      const outwardStatus = err.status === 408 ? 408 : (err.status === 429 ? 429 : 502);
      return jsonResponse({
        error: err.message || 'Cloudflare Workers AI đang lỗi.',
        code: err.appCode,
        cloudflare_code: err.cfCode,
        retryable: true,
      }, outwardStatus);
    }
    return jsonResponse({
      error: 'Có lỗi máy chủ khi chấm phát âm, vui lòng thử lại.',
      code: 'SERVER_ERROR',
      retryable: true,
    }, 500);
  }
});