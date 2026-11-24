/* LDD English — user-initiated Zalo verification. No background listener or UID input. */
(function(){
'use strict';
if(window.__lddZaloSelfLink)return;window.__lddZaloSelfLink=true;
const base='https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/ldd-zalo-self-link';
const anon="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ";
const key='sb-ywqbaksmmtvwbojcgsdd-auth-token';
const teacher='https://zalo.me/0988007529';
function token(){
 for(const name of ['localStorage','sessionStorage']){
  try{const x=JSON.parse(window[name].getItem(key)||'null');const s=x?.access_token?x:x?.currentSession?.access_token?x.currentSession:x?.session?.access_token?x.session:Array.isArray(x)?x[0]:null;if(s?.access_token)return s.access_token;}catch{}
 }
 return '';
}
async function request(action,signal,consent=false){
 const auth=token();if(!auth)throw Error('unauthorized');
 return fetch(base,{method:'POST',cache:'no-store',credentials:'omit',headers:{'Content-Type':'application/json','Authorization':'Bearer '+auth,'apikey':anon},body:JSON.stringify({action,consent}),signal});
}
const messages={
 linked:'Đã liên kết Zalo. Bạn sẽ nhận lời nhắc nếu lâu không vào web.',
 unlinked:'Chưa liên kết Zalo.',
 busy:'Có một lượt xác minh khác đang diễn ra. Bạn thử lại sau khoảng 1 phút nhé.',
 expired:'Mã đã hết hạn. Bạn có thể tạo mã mới.',
 connection_failed:'Chưa kết nối được Zalo. Vui lòng thử lại hoặc liên hệ giáo viên.',
 uid_in_use:'Zalo này đã được liên kết với tài khoản khác. Vui lòng liên hệ giáo viên.',
 admin_required:'Tài khoản đã có liên kết khác. Hãy liên hệ giáo viên để đổi UID.',
 unavailable:'Chưa thể xác minh. Vui lòng thử lại sau.',
 unauthorized:'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.',
 cancelled:'Đã hủy xác minh.'
};
function init(){
 const modal=document.getElementById('profile-modal');
 const box=modal?.querySelector('.profile-modal-box');
 const opener=document.getElementById('open-profile-btn');
 if(!box||!opener||document.getElementById('ldd-zalo-link-card'))return;
 const section=document.createElement('section');section.id='ldd-zalo-link-card';section.hidden=true;
 section.style.cssText='margin:12px 0;padding:16px;border:1px solid rgba(128,128,128,.28);border-radius:14px;display:none;overflow-wrap:anywhere;';
 section.innerHTML='<h3 style="margin:0 0 8px;font-size:1rem">Nhắc nhở qua Zalo</h3><p data-zalo-status role="status" aria-live="polite" style="margin:0 0 10px"></p><div data-zalo-controls><label style="display:flex;align-items:flex-start;gap:8px;margin:8px 0;font-size:.9rem"><input type="checkbox" data-zalo-consent><span>Tôi đồng ý nhận tối đa hai lời nhắc Zalo mỗi đợt vắng học (nếu chưa đủ tuổi, đã có sự đồng ý của phụ huynh). Có thể yêu cầu giáo viên ngừng gửi bất cứ lúc nào.</span></label><button type="button" data-zalo-start style="padding:9px 14px;border-radius:10px;background:#1769c2;color:white;border:0;cursor:pointer;font-weight:600" disabled>Liên kết Zalo</button></div><div data-zalo-codebox hidden style="margin-top:12px"><p style="font-size:.9rem;margin:0 0 8px">Sao chép mã và gửi nguyên văn vào cuộc trò chuyện Zalo với giáo viên. Không gửi mã cho người khác.</p><code data-zalo-code style="display:block;padding:10px;border:1px dashed currentColor;border-radius:8px;user-select:all;word-break:break-all"></code><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button type="button" data-zalo-copy style="padding:8px;border-radius:8px">Sao chép mã</button><a data-zalo-open target="_blank" rel="noopener noreferrer" style="padding:8px;color:#1769c2;font-weight:600">Mở Zalo giáo viên</a><button type="button" data-zalo-cancel style="padding:8px;border-radius:8px">Hủy</button></div><small data-zalo-timer></small></div>';
 const anchor=box.querySelector('.ldd-profile-identity-grid')||box.querySelector('.profile-avatar-section')||box.querySelector('h3');
 if(anchor)anchor.insertAdjacentElement('afterend',section);else box.append(section);
 const statusEl=section.querySelector('[data-zalo-status]'),controls=section.querySelector('[data-zalo-controls]'),check=section.querySelector('[data-zalo-consent]'),start=section.querySelector('[data-zalo-start]'),codebox=section.querySelector('[data-zalo-codebox]'),codeEl=section.querySelector('[data-zalo-code]'),copy=section.querySelector('[data-zalo-copy]'),cancel=section.querySelector('[data-zalo-cancel]'),timerEl=section.querySelector('[data-zalo-timer]');
 section.querySelector('[data-zalo-open]').href=teacher;
 let busy=false,active=null,clock=null,linked=false,serial=0;
 function show(value){section.hidden=!value;section.style.display=value?'block':'none';}
 function sync(){start.disabled=busy||!check.checked;controls.hidden=linked;}
 function clearCode(){codebox.hidden=true;codeEl.textContent='';timerEl.textContent='';if(clock)clearInterval(clock);clock=null;}
 function finish(state){
  busy=false;clearCode();linked=state==='linked';statusEl.textContent=messages[state]||messages.unavailable;sync();
 }
 async function refresh(){
  if(busy)return;
  const n=++serial;show(false);
  try{
   const res=await request('status');const data=await res.json();
   if(n!==serial||busy)return;
   if(data.status==='not_student'||data.status==='unauthorized')return;
   if(!['linked','unlinked'].includes(data.status))return;
   show(true);finish(data.status);
  }catch{}
 }
 opener.addEventListener('click',e=>{if(e.isTrusted)void refresh();});
 check.addEventListener('change',sync);
 copy.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(codeEl.textContent);copy.textContent='Đã sao chép';setTimeout(()=>copy.textContent='Sao chép mã',1200);}
  catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(codeEl);selection.removeAllRanges();selection.addRange(range);copy.textContent='Hãy sao chép mã đã chọn';}
 });
 cancel.addEventListener('click',()=>{if(active)active.abort();});
 document.getElementById('profile-modal-close')?.addEventListener('click',()=>{if(active)active.abort();});
 start.addEventListener('click',async()=>{
  if(busy||!check.checked||linked)return;
  busy=true;++serial;sync();statusEl.textContent='Đang kết nối Zalo…';
  active=new AbortController();const signal=active.signal;
  let finalState='unavailable';let receivedFinal=false;
  try{
   const res=await request('start',signal,true);
   if(!res.headers.get('content-type')?.includes('application/x-ndjson')){
    finalState=(await res.json()).status;return;
   }
   if(!res.body)throw Error('no stream');
   const reader=res.body.getReader();const decoder=new TextDecoder();let buf='';
   function handle(event){
    if(event.status==='connecting')return;
    if(event.status==='ready'&&/^LDD-[A-F0-9]{24}$/.test(event.code)){
     codeEl.textContent=event.code;codebox.hidden=false;statusEl.textContent='Đang chờ mã xác minh từ Zalo…';
     const deadline=Date.now()+Math.max(0,Number(event.seconds)||0)*1000;
     const tick=()=>{timerEl.textContent='Mã hết hạn sau '+Math.max(0,Math.ceil((deadline-Date.now())/1000))+' giây.';};
     tick();if(clock)clearInterval(clock);clock=setInterval(tick,1000);return;
    }
    receivedFinal=true;finalState=event.status;
   }
   while(true){const x=await reader.read();buf+=decoder.decode(x.value||new Uint8Array(),{stream:!x.done});let i;
    while((i=buf.indexOf('\n'))!==-1){const line=buf.slice(0,i);buf=buf.slice(i+1);if(line.trim())handle(JSON.parse(line));}
    if(x.done)break;
   }
   if(!receivedFinal)finalState='unavailable';
  }catch{finalState=signal.aborted?'cancelled':'connection_failed';}
  finally{active=null;finish(finalState);if(finalState==='cancelled')setTimeout(()=>{if(!busy)void refresh();},400);}
 });
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!busy&&section.style.display!=='none'&&getComputedStyle(modal).display!=='none')void refresh();});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
