const assert = require('node:assert/strict');
const fs = require('node:fs');
const {stripTypeScriptTypes} = require('node:module');
const src = fs.readFileSync('scriptphonetics.js','utf8');
const helpers = src.slice(src.indexOf('        function thcsEncodeSentenceWav('), src.indexOf('        function thcsStartSentenceSpeaking('));
const gate = src.slice(src.indexOf('        function thcsSentenceGateWords('),src.indexOf('        // Voice Activity Detection:'));
const text = fs.readFileSync('supabase/functions/azure-pronounce-sentence/index.ts','utf8').replace(/^import.*\n/,'');
let handler, quota = true, calls = 0, config;
let user={id:'test'}, usageReads=0, usageRow={reserved_seconds:26,request_count:5};
let flatRest = false;
let transcript = 'I am a teacher.', wordScore = 95, errorType='None';
const env={SUPABASE_URL:'https://example.test',SUPABASE_ANON_KEY:'test',SUPABASE_SERVICE_ROLE_KEY:'test',AZURE_SPEECH_KEY:'test',AZURE_SPEECH_REGION:'southeastasia',AZURE_SPEECH_TIER:'F0',AZURE_SPEECH_ENABLED:'1'};
const createClient=()=>({auth:{getUser:async()=>({data:{user}})},from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>{usageReads++;return {data:usageRow};}})})}),rpc:async(_,args)=>{assert.ok(args.p_seconds<=26);return {data:quota}}});
const azureFetch=async(url, options)=>{
 calls++;config=JSON.parse(Buffer.from(options.headers['Pronunciation-Assessment'],'base64').toString());
 const assessment={AccuracyScore:95,PronScore:95};
 const Words=transcript.replace(/[.!]/g,'').split(' ').map(Word=>{
  const grade={AccuracyScore:wordScore,ErrorType:errorType};
  const phoneme={Phoneme:'a',...(flatRest?{AccuracyScore:wordScore}:{PronunciationAssessment:{AccuracyScore:wordScore}})};
  return {Word,Phonemes:[phoneme],...(flatRest?grade:{PronunciationAssessment:grade})};
 });
 return Response.json({RecognitionStatus:'Success',NBest:[{Display:transcript,Words,...(flatRest?assessment:{PronunciationAssessment:assessment})}]});
};
new Function('Deno','createClient','fetch',stripTypeScriptTypes(text))({env:{get:key=>env[key]},serve:h=>{handler=h}},createClient,azureFetch);
let frontendFetch;
let decodeCalls=0;
class AudioContext {async decodeAudioData(){decodeCalls++;return audio;} async close(){}}
const storage = new Map();
const localStorage={getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)};
const sb={auth:{getSession:async()=>({data:{session:{access_token:'test'}}})}};
const {encode,score,isCorrect,repairWords,quotaCheck,markQuota,skipActive} = new Function(
 'window','fetch','SUPABASE_URL','SUPABASE_ANON_KEY','sb',helpers+gate+
 ';return {repairWords:thcsSentenceRepairWords,encode:thcsEncodeSentenceWav,score:thcsScoreSentenceAudio,isCorrect:thcsSentenceIsFullyCorrect,quotaCheck:thcsAzureQuotaExhausted,markQuota:thcsMarkAzureQuotaSkipped,skipActive:thcsAzureQuotaSkipActive};')
 ({AudioContext,localStorage},(...args)=>frontendFetch(...args),'https://example.test','test',sb);
const audio={duration:1,sampleRate:48000,numberOfChannels:2,getChannelData:()=>new Float32Array(48000).fill(0.25)};
(async()=>{
 const usageReq=(authorized=true)=>new Request('https://example.test?view=usage',{headers:authorized?{Authorization:'Bearer test'}:{}});
 assert.equal((await handler(usageReq(false))).status,401);
 assert.equal((await handler(usageReq())).status,403);assert.equal(usageReads,0);
 user={id:'teacher',email:'lddbaiu@gmail.com',email_confirmed_at:'2026-01-01'};
 let meter=await(await handler(usageReq())).json();assert.equal(meter.used_seconds,26);assert.equal(meter.remaining_seconds,14374);assert.equal(meter.request_count,5);assert.equal(calls,0);
 usageRow=null;meter=await(await handler(usageReq())).json();assert.equal(meter.remaining_seconds,14400);assert.equal(meter.request_count,0);
 user={id:'test'};
 const wav=encode(audio), bytes=Buffer.from(await wav.arrayBuffer());
 assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.readUInt32LE(24),16000);assert.equal(bytes.readUInt16LE(22),1);assert.equal(bytes.length,32044);assert.equal(bytes.readInt16LE(44),8192);
 assert.throws(()=>encode({...audio,duration:26}),/25/);
 const req=(word='I am a teacher.',audio=bytes.toString('base64'))=>new Request('https://example.test',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify({mode:'sentence',word,audio})});
 let result=await (await handler(req())).json();assert.equal(result.accepted,true);assert.equal(config.EnableProsodyAssessment,undefined);assert.equal(isCorrect('I am a teacher.',result.transcript,result.score,result.word_feedback,'azure'),true);
 flatRest=true;result=await(await handler(req())).json();assert.equal(result.accepted,true,'REST flat assessment must be accepted');assert.equal(result.word_scores[0].score,95);assert.equal(result.word_scores[0].phonemes[0].score,95);
 transcript='I am teacher.';result=await(await handler(req())).json();assert.equal(result.accepted,false);assert.equal(result.word_feedback.missing[0],'a');
 transcript='I am a teacher.';wordScore=50;result=await(await handler(req())).json();assert.equal(result.accepted,false);assert.ok(result.word_feedback.wrong.length);
 wordScore=95;transcript="I'm a teacher.";result=await(await handler(req("I'm a teacher."))).json();assert.equal(result.accepted,true,'Valid contractions must not require expanded Azure word count');
 transcript='teacher';
 const wordReq=()=>new Request('https://example.test',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify({mode:'word',word:'teacher',audio:bytes.toString('base64')})});
 result=await(await handler(wordReq())).json();assert.equal(result.accepted,true,'Single word retry accepted');
 wordScore=40;result=await(await handler(wordReq())).json();assert.equal(result.accepted,false,'Weak single word must not pass');wordScore=95;
 assert.deepEqual(repairWords('I am a teacher.',{word_feedback:{missing:[],wrong:['teacher']},word_scores:[{word:'I',score:95},{word:'teacher',score:40}]}),['teacher']);
 assert.deepEqual(repairWords("I'm a teacher.",{word_feedback:{missing:['am'],wrong:[]}}),["I'm"]);
 quota=false;const before=calls;assert.equal((await handler(req())).status,429);assert.equal(calls,before,'Quota denial must prevent Azure call');
 assert.equal((await handler(req('I am a teacher.','bad'))).status,422);

 // Shared quota visibility for any signed-in student; detailed usage remains teacher-only.
 const availabilityReq=(authorized=true)=>new Request('https://example.test?view=availability',
  {headers:authorized?{Authorization:'Bearer test'}:{}});
 assert.equal((await handler(availabilityReq(false))).status,401);
 usageRow={reserved_seconds:100,request_count:4};
 let availability=await(await handler(availabilityReq())).json();
 assert.equal(availability.quota_exhausted,false);
 assert.ok(availability.resets_at);
 assert.equal(calls,before,'Status GET cannot call Azure');
 usageRow={reserved_seconds:14399,request_count:200};
 availability=await(await handler(availabilityReq())).json();
 assert.equal(availability.quota_exhausted,true);
 user={id:'teacher',email:'lddbaiu@gmail.com',email_confirmed_at:'2026-01-01'};
 assert.equal((await handler(usageReq())).status,200,'Teacher meter still accessible');
 user={id:'test'};

 // Sentence recording skips Cloudflare/Whisper and posts directly to Azure once.
 const cloudflareURL='https://example.test/functions/v1/cloudflare-pronounce-score';
 const azureURL='https://example.test/functions/v1/azure-pronounce-sentence';
 const quotaURL=azureURL+'?view=availability';
 let urls=[];
 frontendFetch=async(url,options)=>{
  urls.push(url);assert.equal(url,azureURL,'No Whisper whole-sentence preflight');
  assert.equal(options.method,'POST');
  const payload=JSON.parse(options.body);
  assert.equal(payload.mode,'sentence');
  assert.equal(payload.mimeType,'audio/wav');
  assert.equal(Buffer.from(payload.audio,'base64').toString('ascii',0,4),'RIFF');
  return Response.json({code:'AZURE_LOCAL_MONTHLY_LIMIT'},{status:429});
 };
 await assert.rejects(()=>score(new Blob(['test']),'I am a teacher.',{access_token:'test'}),
  error=>error.code==='AZURE_LOCAL_MONTHLY_LIMIT');
 assert.deepEqual(urls,[azureURL]);

 // Technical failures are errors, not reasons to give free pronunciation credit.
 urls=[];frontendFetch=async(url,options)=>{
  urls.push(url);assert.equal(url,azureURL);assert.equal(options.method,'POST');
  return Response.json({code:'AZURE_NOT_CONFIGURED'},{status:503});
 };
 const decodeBefore=decodeCalls;
 await assert.rejects(()=>score(new Blob(['test']),'I am a teacher.',{access_token:'test'},false,audio),
  error=>error.code==='AZURE_NOT_CONFIGURED');
 assert.deepEqual(urls,[azureURL]);
 assert.equal(decodeCalls,decodeBefore,'No redundant audio decoding');

 // Azure is the sole judge of all sentence words, including omissions.
 urls=[];frontendFetch=async(url)=>{
  urls.push(url);assert.equal(url,azureURL);
  return Response.json({scoring:'azure-pronunciation-assessment-v1',transcript:'I am teacher.',score:75,accepted:false,
   word_feedback:{total:4,heard:3,correct:3,missing:['a'],wrong:[],extra:[]},
   word_scores:[{word:'I',score:95},{word:'teacher',score:50}]});
 };
 const sentenceResult=await score(new Blob(['test']),'I am a teacher.',{access_token:'test'});
 assert.equal(sentenceResult.source,'azure');assert.equal(sentenceResult.data.accepted,false);
 assert.deepEqual(urls,[azureURL]);

 // Quota status GET is authenticated, shared across students and cached as a monthly skip.
 urls=[];frontendFetch=async(url,options)=>{
  urls.push(url);assert.equal(url,quotaURL);assert.equal(options.method,'GET');
  return Response.json({quota_exhausted:true,resets_at:'2099-01-01T00:00:00.000Z',enabled:true});
 };
 assert.equal(await quotaCheck(),true);
 assert.deepEqual(urls,[quotaURL]);
 assert.equal(skipActive(),true);
 assert.ok(storage.size,'Quota block survives refresh');
 // Rate-limit skips are short-lived instead of becoming permanent monthly blocks.
 storage.clear();markQuota('AZURE_RATE_LIMIT');
 assert.ok(skipActive());
 assert.ok(Number(storage.values().next().value)-Date.now()<=5*60*1000+1000);
 let retryTranscript='teacher', retryScore=100, retryAccepted=true;
 urls=[];frontendFetch=async(url,options)=>{
  urls.push(url);assert.equal(options.method,'POST');
  assert.equal(JSON.parse(options.body).mode,'word');
  assert.equal(JSON.parse(options.body).retry_word,true);
  return Response.json({scoring:'asr-word-match-v5',transcript:retryTranscript,score:retryScore,accepted:retryAccepted});
 };
 let retry=await score(new Blob(['test']),'teacher',{access_token:'test'},true);
 assert.equal(retry.source,'whisper');assert.equal(retry.data.accepted,true);
 assert.equal(urls.length,1);assert.ok(urls[0].endsWith('cloudflare-pronounce-score'));
 // Backend can pass a near-match with a raw transcript score lower than 90.
 retryTranscript='hoppy';retryScore=60;retryAccepted=true;
 retry=await score(new Blob(['test']),'hobby',{access_token:'test'},true);
 assert.equal(retry.data.accepted,true);
 retryTranscript='coffee';retryScore=20;retryAccepted=false;
 assert.equal((await score(new Blob(['test']),'hobby',{access_token:'test'},true)).data.accepted,false);
 retryTranscript='a hobby';retryScore=100;retryAccepted=true;
 assert.equal((await score(new Blob(['test']),'hobby',{access_token:'test'},true)).data.accepted,false,
  'Extra words must never pass despite a falsely permissive server response');
 frontendFetch=async()=>Response.json({error:'Service unavailable'},{status:503});
 await assert.rejects(()=>score(new Blob(['test']),'teacher',{access_token:'test'},true),/Service unavailable/);
 console.log('PASS: Direct Azure sentences with monthly quota skip, PCM conversion, duration cap, exact words, weak-word rejection, contractions, quota guard, no Azure error fallback, direct Azure request, decoded audio reuse');
})().catch(error=>{console.error(error);process.exitCode=1});
