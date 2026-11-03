const assert = require('node:assert/strict');
const fs = require('node:fs');
const {stripTypeScriptTypes} = require('node:module');
const src = fs.readFileSync('scriptphonetics.js','utf8');
const helpers = src.slice(src.indexOf('        function thcsEncodeSentenceWav('), src.indexOf('        function thcsStartSentenceSpeaking('));
const gate = src.slice(src.indexOf('        function thcsSentenceGateWords('),src.indexOf('        // Voice Activity Detection:'));
const text = fs.readFileSync('supabase/functions/azure-pronounce-sentence/index.ts','utf8').replace(/^import.*\n/,'');
let handler, quota = true, calls = 0, config;
let transcript = 'I am a teacher.', wordScore = 95, errorType='None';
const env={SUPABASE_URL:'https://example.test',SUPABASE_ANON_KEY:'test',SUPABASE_SERVICE_ROLE_KEY:'test',AZURE_SPEECH_KEY:'test',AZURE_SPEECH_REGION:'southeastasia',AZURE_SPEECH_TIER:'F0',AZURE_SPEECH_ENABLED:'1'};
const createClient=()=>({auth:{getUser:async()=>({data:{user:{id:'test'}}})},rpc:async(_,args)=>{assert.ok(args.p_seconds<=26);return {data:quota}}});
const azureFetch=async(url, options)=>{calls++;config=JSON.parse(Buffer.from(options.headers['Pronunciation-Assessment'],'base64').toString());return Response.json({RecognitionStatus:'Success',NBest:[{Display:transcript,PronunciationAssessment:{AccuracyScore:95,PronScore:95},Words:transcript.replace(/[.!]/g,'').split(' ').map(Word=>({Word,PronunciationAssessment:{AccuracyScore:wordScore,ErrorType:errorType}}))}]})};
new Function('Deno','createClient','fetch',stripTypeScriptTypes(text))({env:{get:key=>env[key]},serve:h=>{handler=h}},createClient,azureFetch);
let frontendFetch;
class AudioContext {async decodeAudioData(){return audio;} async close(){}}
const {encode,score,isCorrect} = new Function('window','fetch','SUPABASE_URL','SUPABASE_ANON_KEY',helpers+gate+';return {encode:thcsEncodeSentenceWav,score:thcsScoreSentenceAudio,isCorrect:thcsSentenceIsFullyCorrect};')({AudioContext},(...args)=>frontendFetch(...args),'https://example.test','test');
const audio={duration:1,sampleRate:48000,numberOfChannels:2,getChannelData:()=>new Float32Array(48000).fill(0.25)};
(async()=>{
 const wav=encode(audio), bytes=Buffer.from(await wav.arrayBuffer());
 assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.readUInt32LE(24),16000);assert.equal(bytes.readUInt16LE(22),1);assert.equal(bytes.length,32044);assert.equal(bytes.readInt16LE(44),8192);
 assert.throws(()=>encode({...audio,duration:26}),/25/);
 const req=(word='I am a teacher.',audio=bytes.toString('base64'))=>new Request('https://example.test',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify({mode:'sentence',word,audio})});
 let result=await (await handler(req())).json();assert.equal(result.accepted,true);assert.equal(config.EnableProsodyAssessment,undefined);assert.equal(isCorrect('I am a teacher.',result.transcript,result.score,result.word_feedback,'azure'),true);
 transcript='I am teacher.';result=await(await handler(req())).json();assert.equal(result.accepted,false);assert.equal(result.word_feedback.missing[0],'a');
 transcript='I am a teacher.';wordScore=50;result=await(await handler(req())).json();assert.equal(result.accepted,false);assert.ok(result.word_feedback.wrong.length);
 wordScore=95;transcript="I'm a teacher.";result=await(await handler(req("I'm a teacher."))).json();assert.equal(result.accepted,true,'Valid contractions must not require expanded Azure word count');
 quota=false;const before=calls;assert.equal((await handler(req())).status,429);assert.equal(calls,before,'Quota denial must prevent Azure call');
 assert.equal((await handler(req('I am a teacher.','bad'))).status,422);
 // Azure enabled: convert audio, send authenticated request, never retry through ASR on quota/error.
 const whisperResult={transcript:'I am a teacher.',scoring:'asr-sentence-wer-v1',score:100,word_feedback:{total:4,heard:4,correct:4,missing:[],wrong:[],extra:[]}};
 let urls=[];frontendFetch=async(url,options)=>{urls.push(url);if(url.endsWith('cloudflare-pronounce-score'))return Response.json(whisperResult);if(options.method==='POST'){const payload=JSON.parse(options.body);assert.equal(payload.mimeType,'audio/wav');assert.equal(Buffer.from(payload.audio,'base64').toString('ascii',0,4),'RIFF');return Response.json({code:'AZURE_LOCAL_MONTHLY_LIMIT'},{status:429});}return Response.json({enabled:true});};
 await assert.rejects(()=>score(new Blob(['test']),'I am a teacher.',{access_token:'test'}),/hạn mức/);assert.equal(urls.length,3);assert.ok(urls[0].endsWith('cloudflare-pronounce-score'));assert.ok(urls.slice(1).every(u=>u.endsWith('azure-pronounce-sentence')));
 urls=[];frontendFetch=async(url,options)=>{urls.push(url);return options.method==='POST'?Response.json(whisperResult):Response.json({enabled:false});};
 assert.equal((await score(new Blob(['test']),'I am a teacher.',{access_token:'test'})).source,'whisper');assert.ok(urls[0].endsWith('cloudflare-pronounce-score'));
 urls=[];frontendFetch=async(url)=>{urls.push(url);return Response.json({...whisperResult,transcript:'I am teacher.',score:75,word_feedback:{total:4,heard:3,correct:3,missing:['a'],wrong:[],extra:[]}})};
 assert.equal((await score(new Blob(['test']),'I am a teacher.',{access_token:'test'})).source,'whisper');assert.equal(urls.length,1,'Wrong words must not consume Azure quota');
 console.log('PASS: PCM conversion, duration cap, exact words, weak-word rejection, contractions, quota guard, no Azure error fallback, disabled rollout');
})().catch(error=>{console.error(error);process.exitCode=1});
