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
 assert.equal(r.transcript,'hobby');assert.equal(r.score,100);assert.equal(r.accepted,true);
 assert.equal(cfCalls,1,'Exact word needs one inference');

 // Fuzzy check: a 1-2 letter transcription difference passes immediately.
 r=await(await send('hobby',['hoppy'],{retry_word:true})).json();
 assert.equal(r.transcript,'hoppy');assert.equal(r.accepted,true);
 assert.equal(r.edit_distance,2);assert.equal(cfCalls,1);
 assert.ok(r.score<90,'Original similarity should remain visible, not inflated to 90');
 r=await(await send('cooking',['looking'],{retry_word:true})).json();
 assert.equal(r.accepted,true);assert.equal(r.edit_distance,1);assert.equal(cfCalls,1);
 r=await(await send('cooking',['cookin'],{retry_word:true})).json();
 assert.equal(r.accepted,true);assert.equal(cfCalls,1);

 // Truly different words get one confirmation pass using the same recording.
 r=await(await send('hobby',['happy','happy'],{retry_word:true})).json();
 assert.equal(r.accepted,false,'Three character differences exceed the two-edit limit');
 assert.equal(cfCalls,2);
 r=await(await send('hobby',['coffee','hobby'],{retry_word:true})).json();
 assert.equal(r.accepted,true);assert.equal(r.transcript,'hobby');
 assert.equal(cfCalls,2);assert.equal(r.rescued,true);
 assert.equal(latestBody[0].vad_filter,true);assert.equal(latestBody[1].vad_filter,false);
 r=await(await send('hobby',['coffee','coffee'],{retry_word:true})).json();
 assert.equal(r.accepted,false);assert.equal(cfCalls,2);

 // Strict word count, even when the target appears inside the transcript.
 r=await(await send('hobby',['a hobby'],{retry_word:true})).json();
 assert.equal(r.accepted,false);assert.equal(cfCalls,1);
 r=await(await send('hobby',['hobby cooking'],{retry_word:true})).json();
 assert.equal(r.accepted,false);assert.equal(cfCalls,1);
 // Short one- or two-letter words must not accept unrelated near-spellings.
 r=await(await send('a',['i','i'],{retry_word:true})).json();
 assert.equal(r.accepted,false);
 r=await(await send('at',['am'],{retry_word:true})).json();
 assert.equal(r.accepted,false);
 // Other word practices still return their original score rather than fuzzy acceptance.
 r=await(await send('hobby',['happy'],{})).json();
 assert.equal(r.transcript,'happy');assert.equal(r.accepted,undefined);
 assert.equal(cfCalls,1);
 r=await(await send('I am a teacher.',['I am a teacher.'],{mode:'sentence',quick_check:true,retry_word:true})).json();
 assert.equal(cfCalls,1,'Fast sentence recognition must remain unchanged');
 assert.equal(r.scoring,'asr-sentence-screen-v1');
 assert.equal(r.accepted,undefined);
 assert.ok(lastUsage>0);
 console.log('PASS: word retry fuzzy 1-2 letters, rescue only for wrong words, block extra words, no sentence looseness');
})().catch(err=>{console.error(err);process.exitCode=1;});
