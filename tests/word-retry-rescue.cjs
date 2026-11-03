const assert = require('node:assert/strict');
const fs = require('node:fs');
const {stripTypeScriptTypes} = require('node:module');
const src = fs.readFileSync('supabase/functions/cloudflare-pronounce-score/index.ts','utf8').replace(/^import[^\n]*\n/, '');
let handler, transcriptions=[], cfCalls=0, lastUsage=0, requestCount=0, latestBody=[];
const env={CF_ACCOUNT_ID:'test-account',CF_API_TOKEN:'test-token',SUPABASE_URL:'https://example.test',
 SUPABASE_ANON_KEY:'test-anon',SUPABASE_SERVICE_ROLE_KEY:'test-service'};
const Deno={env:{get:key=>env[key]||''},serve:fn=>{handler=fn;}};
const createClient=(url,key)=>key==='test-service'?{
 from:()=>({
  select:()=>({eq:()=>({maybeSingle:async()=>({data:{request_count:requestCount}})})}),
  upsert:async row=>{lastUsage=row.request_count;return {data:null,error:null};}
 })
}:{
 auth:{getUser:async()=>({data:{user:{id:'test-user'}}})}
};
const mockFetch=async(url,options)=>{
 assert.ok(url.includes('/ai/run/'),'Cloudflare model endpoint only');
 cfCalls++;
 const body=JSON.parse(options.body);latestBody.push(body);
 return Response.json({success:true,result:{text:transcriptions.shift()||''}});
};
new Function('Deno','createClient','fetch',stripTypeScriptTypes(src))(Deno,createClient,mockFetch);
const send=async(word,heard,opts={})=>{
 transcriptions=[...heard];cfCalls=0;latestBody=[];
 return handler(new Request('https://example.test/functions/v1/cloudflare-pronounce-score',
  {method:'POST',headers:{Authorization:'Bearer token'},body:JSON.stringify({word,audio:'sample',mode:'word',...opts})}));
};
(async()=>{
 let r=await(await send('hobby',['hobby'],{retry_word:true})).json();
 assert.equal(r.transcript,'hobby');assert.equal(r.score,100);assert.equal(cfCalls,1,'Correct word never needs extra inference');
 r=await(await send('hobby',['happy','hobby'],{retry_word:true})).json();
 assert.equal(r.transcript,'hobby');assert.equal(r.score,100);assert.equal(r.rescued,true);
 assert.equal(cfCalls,2,'Near-word mismatch should receive a second recognition');
 assert.equal(latestBody[0].vad_filter,true);assert.equal(latestBody[1].vad_filter,false);
 r=await(await send('cooking',['looking','cooking'],{retry_word:true})).json();
 assert.equal(r.transcript,'cooking');assert.equal(r.score,100);assert.equal(cfCalls,2);
 r=await(await send('hobby',['happy','happy'],{retry_word:true})).json();
 assert.notEqual(r.transcript,'hobby');assert.ok(r.score<100,'Two incorrect transcripts must not pass');
 r=await(await send('hobby',['a hobby','hobby'],{retry_word:true})).json();
 assert.equal(r.transcript,'a hobby');assert.equal(cfCalls,1,'Extra words remain a hard failure (no second inference)');
 r=await(await send('hobby',['happy','hobby'],{})).json();
 assert.equal(r.transcript,'happy');assert.equal(cfCalls,1,'Other word practices remain unchanged');
 r=await(await send('I am a teacher.',['I am a teacher.'],{mode:'sentence',quick_check:true,retry_word:true})).json();
 assert.equal(cfCalls,1,'Fast sentence recognition is not affected');
 assert.equal(r.scoring,'asr-sentence-screen-v1');
 assert.ok(lastUsage>0,'All attempted Whisper inferences must be counted');
 console.log('PASS word retry: near-word rescue, correct-word fast path, strict extra words, sentence isolation');
})().catch(err=>{console.error(err);process.exitCode=1;});
