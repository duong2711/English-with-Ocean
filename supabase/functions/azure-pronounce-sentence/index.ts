import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const SB_URL = Deno.env.get('SUPABASE_URL') || '';
const SB_ANON = Deno.env.get('SUPABASE_ANON_KEY') || '';
const SB_SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const AZURE_KEY = Deno.env.get('AZURE_SPEECH_KEY') || '';
const AZURE_REGION = Deno.env.get('AZURE_SPEECH_REGION') || '';
const AZURE_TIER = (Deno.env.get('AZURE_SPEECH_TIER') || '').toUpperCase();
const AZURE_ENABLED = Deno.env.get('AZURE_SPEECH_ENABLED') === '1';
const isReady = () => AZURE_ENABLED && AZURE_TIER === 'F0' && /^[a-z0-9-]{2,32}$/.test(AZURE_REGION) && !!AZURE_KEY;
const origins = new Set(['https://lddenglish.page', 'https://www.lddenglish.page', 'https://duong2711.github.io']);
function cors(request: Request): Record<string, string> {
  const origin = request.headers.get('origin') || '';
  return {
    ...(origins.has(origin) ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : {}),
    'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}
function response(req: Request, obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors(req), 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
function sentenceWords(s: string): string[] {
  const n = String(s || '').toLowerCase().replace(/[’‘]/g, "'")
    .replace(/\bcan't\b/g, 'can not').replace(/\bcannot\b/g, 'can not').replace(/\bwon't\b/g, 'will not')
    .replace(/n't\b/g, ' not').replace(/\bi'm\b/g, 'i am')
    .replace(/\b(you|we|they)'re\b/g, '$1 are').replace(/\b(he|she|it|that|there|what|who)'s\b/g, '$1 is')
    .replace(/\b(i|you|we|they)'ve\b/g, '$1 have')
    .replace(/\b(i|you|he|she|we|they|it)'ll\b/g, '$1 will')
    .replace(/[^a-z0-9]+/g, ' ').trim();
  return n ? n.split(/\s+/) : [];
}
function wordAlignment(reference: string, recognized: string) {
  const a = sentenceWords(reference), b = sentenceWords(recognized);
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
    dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  const missing: string[] = [], wrong: string[] = [], extra: string[] = [];
  let correct = 0, i = n, j = m;
  while (i || j) {
    if (i && j && a[i-1] === b[j-1] && dp[i][j] === dp[i-1][j-1]) { correct++; i--; j--; }
    else if (i && j && dp[i][j] === dp[i-1][j-1]+1) { wrong.unshift(a[--i]); j--; }
    else if (i && dp[i][j] === dp[i-1][j]+1) missing.unshift(a[--i]);
    else extra.unshift(b[--j]);
  }
  return { total: n, heard: m, correct, missing, wrong, extra };
}
function parseWav(s: string): { bytes: Uint8Array; seconds: number } {
  if (s.length > 1_500_000 || s.length < 200) throw new Error('INVALID_AUDIO');
  let bytes: Uint8Array;
  try { bytes = Uint8Array.from(atob(s), ch => ch.charCodeAt(0)); }
  catch { throw new Error('INVALID_AUDIO'); }
  if (bytes.length < 50 || bytes.length > 960044) throw new Error('INVALID_AUDIO');
  const dv = new DataView(bytes.buffer);
  const mark = (at: number, v: string) => String.fromCharCode(...bytes.slice(at,at+v.length))===v;
  if (!mark(0,'RIFF') || !mark(8,'WAVE') || !mark(12,'fmt ') || !mark(36,'data')
    || dv.getUint16(20,true)!==1 || dv.getUint16(22,true)!==1
    || dv.getUint32(24,true)!==16000 || dv.getUint16(34,true)!==16
    || dv.getUint32(40,true)+44!==bytes.length) throw new Error('INVALID_AUDIO');
  const seconds = dv.getUint32(40,true)/32000;
  if (seconds<0.35 || seconds>25) throw new Error('INVALID_AUDIO');
  return {bytes,seconds};
}
function base64Utf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin='';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors(req) });
  if (req.method !== 'GET' && req.method !== 'POST') return response(req, { error: 'Method not allowed' }, 405);
  if (req.method === 'GET') return response(req, { enabled: isReady(), provider: 'azure-pronunciation-assessment', max_audio_seconds: 25 });
  if (!isReady()) return response(req, { code: 'AZURE_NOT_CONFIGURED', retryable: true }, 503);
  const auth = req.headers.get('Authorization') || '';
  if (!auth.toLowerCase().startsWith('bearer ') || !SB_URL || !SB_ANON || !SB_SERVICE)
    return response(req, { code: 'NOT_AUTHENTICATED' }, 401);
  const client = createClient(SB_URL, SB_ANON);
  const {data: {user}, error} = await client.auth.getUser(auth.substring(7));
  if (error || !user || user.is_anonymous) return response(req, { code:'NOT_AUTHENTICATED' },401);
  const data = await req.json().catch(()=>null);
  const word = String(data?.word||'').trim();
  if (data?.mode !== 'sentence' || word.length > 500 || sentenceWords(word).length < 2
    || sentenceWords(word).length > 50 || !/^[A-Za-z0-9 ,.!?'’\-]+$/.test(word))
    return response(req, { code:'INVALID_SENTENCE' }, 422);
  let wav: {bytes: Uint8Array;seconds: number};
  try { wav = parseWav(String(data?.audio||'')); }
  catch { return response(req, { code:'INVALID_AUDIO', retryable:true },422); }

  // Atomic reservation before the Azure call. 4 hours/month is below the standard F0 5-hour allowance.
  const admin = createClient(SB_URL, SB_SERVICE);
  const {data: reserved, error: reserveError} = await admin.rpc('reserve_azure_pronunciation_seconds', { p_seconds: Math.ceil(wav.seconds)+1 });
  if (reserveError) return response(req, {code:'AZURE_QUOTA_GUARD_UNAVAILABLE',retryable:true},503);
  if (!reserved) return response(req,{code:'AZURE_LOCAL_MONTHLY_LIMIT',retryable:true},429);
  const config = {
    ReferenceText: word, GradingSystem:'HundredMark', Granularity:'Phoneme', Dimension:'Comprehensive',
    EnableMiscue:'True',
  };
  const url = 'https://' + AZURE_REGION + '.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed';
  let payload: any;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 22000);
    let result: Response;
    try {
      result = await fetch(url, {method:'POST', signal:controller.signal, headers:{
        'Ocp-Apim-Subscription-Key':AZURE_KEY, 'Accept':'application/json',
        'Content-Type':'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Pronunciation-Assessment':base64Utf8(JSON.stringify(config)),
      }, body:wav.bytes});
    } finally { clearTimeout(timeout); }
    if (!result.ok) {
      console.warn('Azure pronunciation failed HTTP status:',result.status);
      return response(req,{code:result.status===429?'AZURE_RATE_LIMIT':'AZURE_UNAVAILABLE',retryable:true},503);
    }
    payload = await result.json();
  } catch (e) {
    console.warn('Azure pronunciation network error:',String(e).slice(0,100));
    return response(req,{code:'AZURE_UNAVAILABLE',retryable:true},503);
  }
  const result = payload?.NBest?.[0];
  const pa = result?.PronunciationAssessment;
  if (payload?.RecognitionStatus !== 'Success' || !pa || !result) {
    return response(req,{code:'UNCERTAIN_SPEECH',retryable:true},422);
  }
  const transcript = String(result.Display||result.Lexical||payload.DisplayText||'').trim();
  const alignment = wordAlignment(word, transcript);
  const wordGrades = (Array.isArray(result.Words)?result.Words:[]).map((w:any)=>{
    const score = Number(w?.PronunciationAssessment?.AccuracyScore);
    const phonemes = (w.Phonemes||[]).map((p:any)=>({phoneme:String(p.Phoneme||''),score:Number(p?.PronunciationAssessment?.AccuracyScore)}));
    return {word:String(w.Word||''),score:Number.isFinite(score)?score:0,
      error_type:String(w?.PronunciationAssessment?.ErrorType||'None'),phonemes};
  });
  const weakWords = wordGrades.filter((w:any)=>w.score<65 || (w.error_type!=='None' && w.error_type!=='')).map((w:any)=>w.word);
  const accuracy = Number(pa.AccuracyScore||0), rawScore = Number(pa.PronScore||accuracy);
  const passed = alignment.missing.length===0 && alignment.wrong.length===0 && alignment.extra.length===0
    && alignment.correct===alignment.total && wordGrades.length>0
    && weakWords.length===0 && accuracy>=80 && rawScore>=80;
  return response(req,{
    mode:'sentence', scoring:'azure-pronunciation-assessment-v1',
    // Compatibility: existing Dịch câu gate expects a perfect content-validation score to advance.
    score:passed?100:Math.min(99,Math.max(0,Math.round(rawScore))),
    pronunciation_score:Math.round(rawScore), accuracy_score:accuracy,
    fluency_score:Number(pa.FluencyScore||0), completeness_score:Number(pa.CompletenessScore||0),
    transcript, accepted:passed,
    word_feedback:{...alignment,wrong:[...new Set([...alignment.wrong,...weakWords])].slice(0,30)},
    word_scores:wordGrades, retryable:false,
  });
});

