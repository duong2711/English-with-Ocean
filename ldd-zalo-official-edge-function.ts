import { createClient } from "npm:@supabase/supabase-js@2.57.4";
const url=Deno.env.get("SUPABASE_URL")||"";
const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")||"";
const bot=Deno.env.get("ZALO_BOT_TOKEN")||"";
const headers={apikey:key,authorization:"Bearer "+key,"content-type":"application/json"};
const admin=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
async function authorize(req:Request){
  const token=req.headers.get("x-ldd-cron-token")||"";
  if(!/^[0-9a-f]{64}$/.test(token))return false;
  const r=await fetch(url+"/rest/v1/ldd_zalo_cron_auth?id=eq.1&select=token_sha256",{headers,signal:AbortSignal.timeout(10000)});
  if(!r.ok)throw Error("auth");
  const expected=(await r.json())?.[0]?.token_sha256;
  if(typeof expected!=="string"||expected.length!==64)return false;
  const actual=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(token))),b=>b.toString(16).padStart(2,"0")).join("");
  let d=0;for(let i=0;i<64;i++)d|=expected.charCodeAt(i)^actual.charCodeAt(i);
  return d===0;
}

const originSet=new Set(["https://lddenglish.page","https://www.lddenglish.page","https://duong2711.github.io"]);
function cors(req:Request){const o=req.headers.get("origin")||"";return {"access-control-allow-origin":originSet.has(o)?o:"https://lddenglish.page","access-control-allow-headers":"authorization,apikey,content-type,x-client-info","access-control-allow-methods":"POST,OPTIONS","cache-control":"no-store","vary":"Origin"};}
function json(req:Request,x:unknown,s=200){return new Response(JSON.stringify(x),{status:s,headers:{...cors(req),"content-type":"application/json"}});}
async function hash(s:string){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,"0")).join("");}
async function zalo(method:string,body:Record<string,unknown>={}){
 if(!bot||!/^\d+:[A-Za-z0-9_-]+$/.test(bot))return {ok:false,http:0};
 try{const r=await fetch("https://bot-api.zaloplatforms.com/bot"+bot+"/"+method,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});const d=await r.json();return {ok:r.ok&&d?.ok===true,http:r.status,result:d?.result,error_code:typeof d?.error_code==="number"?d.error_code:null};}catch{return {ok:false,http:0};}
}
async function link(action:string,user:string|null=null,email:string|null=null,h:string|null=null,chat:string|null=null){
 const {data,error}=await admin.rpc("ldd_bot_link",{p_action:action,p_user:user,p_email:email,p_hash:h,p_chat:chat});if(error)throw Error("database");return data?.status||"unavailable";
}
async function webhookSecret(){return await hash("lddenglish-webhook-v1:"+bot);}
function same(a:string,b:string){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0;}
Deno.serve(async(req:Request)=>{
 try{
 if(req.method==="OPTIONS")return new Response(null,{headers:cors(req)});
 if(req.method!=="POST")return json(req,{status:"method_not_allowed"},405);
 if(!bot)return json(req,{status:"not_configured"},503);
 const secret=req.headers.get("x-bot-api-secret-token");
 if(secret!==null){
  if(!same(secret,await webhookSecret()))return json(req,{status:"forbidden"},403);
  const raw=await req.text();if(raw.length>65536)return json(req,{status:"ignored"});
  const b=JSON.parse(raw),event=b?.result?.event_name?b.result:b,m=event?.message;
  // One-time group demo only. No group enrollment or production reminder changes.
  if(event?.event_name==="message.text.received"&&m?.chat?.chat_type==="GROUP"){
   if(Date.now()>Date.parse("2026-11-24T17:19:41.650Z")||m?.from?.is_bot!==false||typeof m?.chat?.id!=="string"||typeof m?.text!=="string"||!/(?:^|\s)LDD-GROUP-A810F280B15A4BD998C3DDCEBE7AC007(?:\s|$)/.test(m.text.trim()))return json(req,{ok:true});
   const testKey="official-group-demo1-demo2-20261124";
   const claim=await fetch(url+"/rest/v1/ldd_zalo_self_test_once",{method:"POST",headers:{...headers,Prefer:"return=minimal"},body:JSON.stringify({test_key:testKey}),signal:AbortSignal.timeout(10000)});
   if(!claim.ok)return json(req,{ok:true});
   let sent=0;
   for(const name of ["Demo1","Demo2"]){
    const result=await zalo("sendMessage",{chat_id:m.chat.id,text:"[Thử nghiệm] Practice makes perfect! "+name+" đã lâu không lên web, hãy dành một ít thời gian để ôn tiếng Anh trên web nhé! https://lddenglish.page/"});
    if(result.ok)sent++;
    console.info("ldd_group_demo_result",name,result.ok,result.http,result.error_code);
   }
   await fetch(url+"/rest/v1/ldd_zalo_self_test_once?test_key=eq."+testKey,{method:"PATCH",headers:{...headers,Prefer:"return=minimal"},body:JSON.stringify({state:sent===2?"sent":"failed"}),signal:AbortSignal.timeout(10000)}).catch(()=>null);
   return json(req,{ok:true});
  }
  if(event?.event_name!=="message.text.received"||m?.chat?.chat_type!=="PRIVATE"||m?.from?.is_bot!==false||typeof m?.chat?.id!=="string"||m.chat.id!==m?.from?.id||typeof m?.text!=="string")return json(req,{ok:true});
  const code=m.text.trim();
  if(!/^LDD-[A-F0-9]{24}$/.test(code))return json(req,{ok:true});
  const status=await link("complete",null,null,await hash(code),m.chat.id);
  console.info("ldd_bot_link_result",status);
  if(status==="linked")await zalo("sendMessage",{chat_id:m.chat.id,text:"Đã đăng ký nhận lời nhắc học tập từ LDD English. Tối đa 2 tin mỗi đợt vắng học cho từng học viên. Nếu cần thay đổi việc nhận nhắc nhở, vui lòng liên hệ giảng viên."});
  return json(req,{ok:true});
 }
 if(req.headers.has("x-ldd-cron-token")){
  if(!await authorize(req))return json(req,{status:"forbidden"},403);
  const b=await req.json();
  if(b.action==="setup"){
   const me=await zalo("getMe");
   if(!me.ok)return json(req,{status:"bot_auth_failed",http:me.http,error_code:me.error_code},502);
   const w=await zalo("setWebhook",{url:url+"/functions/v1/ldd-zalo-official",secret_token:await webhookSecret()});
   return json(req,{status:w.ok?"ready":"webhook_failed",account_name:me.result?.account_name,account_type:me.result?.account_type,webhook_http:w.http},w.ok?200:502);
  }
  if(b.action==="dispatch"){
   // Never claim a reminder until the official bot is reachable.
   const me=await zalo("getMe");if(!me.ok)return json(req,{status:"bot_auth_failed",http:me.http},502);
   // Send newly assigned private tests first. The database queue is idempotent,
   // and reports each delivery so failed sends can be retried on a later cron run.
   const testClaim=await admin.rpc("ldd_bot_claim_test_notifications",{p_limit:20});
   if(!testClaim.error&&Array.isArray(testClaim.data)&&testClaim.data.length){
    let sent=0,failed=0,recorded=0;
    for(const item of testClaim.data){
     const result=await zalo("sendMessage",{chat_id:item.chat_id,text:item.message_text});
     const delivered=result.ok&&typeof result.result?.message_id==="string";
     const {data:reported,error:reportError}=await admin.rpc("ldd_bot_report_test_notification",{
      p_delivery_id:item.delivery_id,
      p_state:delivered?"sent":"failed"
     });
     if(delivered)sent++;else failed++;
     if(!reportError&&reported===true)recorded++;
    }
    return json(req,{status:failed===0?"test_notifications_sent":"test_notifications_partial",sent,failed,recorded},failed===0?200:502);
   }
   let photo:string|null=null;
   try{const {data,error}=await admin.storage.from("ldd-reminder-media").createSignedUrl("ldd-reminder-2.jpg",300);if(!error&&data?.signedUrl)photo=data.signedUrl;}catch{}
   const {data:r,error}=await admin.rpc("ldd_bot_claim_reminder",{p_image_ready:!!photo});
   if(error)return json(req,{status:"claim_failed"},502);
   if(!r)return json(req,{status:"no_eligible_student",sent:0});
   const result=r.stage===1?await zalo("sendMessage",{chat_id:r.chat_id,text:r.message_text}):photo?await zalo("sendPhoto",{chat_id:r.chat_id,photo}):{ok:false,http:0};
   const sent=result.ok&&typeof result.result?.message_id==="string";
   const report=await admin.from("ldd_bot_reminder_attempts").update({state:sent?"sent":"failed",reported_at:new Date().toISOString()}).eq("id",r.id).eq("state","claimed");
   return json(req,{status:sent?"sent":"send_failed",sent:sent?1:0,recorded:!report.error,stage:r.stage,http:result.http},sent&&!report.error?200:502);
  }
  return json(req,{status:"invalid"},400);
 }
 const origin=req.headers.get("origin")||"";
 if(origin&&!originSet.has(origin))return json(req,{status:"forbidden"},403);
 const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
 if(!token||token.length>8192)return json(req,{status:"unauthorized"},401);
 const {data:{user},error}=await admin.auth.getUser(token);
 if(error||!user||user.is_anonymous||!user.email_confirmed_at)return json(req,{status:"unauthorized"},401);
 const raw=await req.text();if(raw.length>1024)return json(req,{status:"invalid"},400);
 const b=JSON.parse(raw);
 if(["teacher_list","teacher_generate","teacher_cancel","teacher_disable","teacher_disable_contact"].includes(b?.action)){
  if((user.email||"").toLowerCase()!=="lddbaiu@gmail.com")return json(req,{status:"forbidden"},403);
  const action=b.action.slice(8);
  const student=action==="list"?null:b.student_id;
  if(action!=="list"&&(typeof student!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(student)))return json(req,{status:"invalid"},400);
  const code=action==="generate"?"LDD-"+Array.from(crypto.getRandomValues(new Uint8Array(12)),n=>n.toString(16).padStart(2,"0")).join("").toUpperCase():null;
  const contact=action==="disable_contact"?b.recipient_id:null;
  if(action==="disable_contact"&&(typeof contact!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(contact)))return json(req,{status:"invalid"},400);
  const {data,error}=await admin.rpc("ldd_bot_teacher_manage",{p_teacher:user.id,p_action:action,p_student:student,p_hash:code?await hash(code):contact});
  if(error)return json(req,{status:"unavailable"},503);
  if(data?.status==="forbidden")return json(req,{status:"forbidden"},403);
  return json(req,data?.status==="ready"?{...data,code}:data);
 }
 if(b?.action==="status")return json(req,{status:await link("status",user.id,user.email||"")});
 return json(req,{status:"teacher_managed"},403);
 }catch{return json(req,{status:"unavailable"},503);}
});