/* LDD English — user-initiated Zalo verification. No background listener or UID input. */
(function(){
'use strict';
if(window.__lddZaloSelfLink)return;window.__lddZaloSelfLink=true;
const base='https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/ldd-zalo-official';
const anon="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ";
const key='sb-ywqbaksmmtvwbojcgsdd-auth-token';
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
const messages={conflict:'Tài khoản Zalo đã liên kết ở nơi khác. Hãy liên hệ giáo viên.',not_configured:'Bot chưa được cấu hình.',
 linked:'Đã liên kết Zalo. Bạn sẽ nhận lời nhắc nếu lâu không vào web.',
 unlinked:'Chưa liên kết Zalo.',
 busy:'Bạn vừa tạo mã. Hãy thử lại sau 30 giây.',
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
 section.innerHTML='<h3 style="margin:0 0 8px;font-size:1rem">Nhắc nhở qua Zalo</h3><p data-zalo-status role="status" aria-live="polite" style="margin:0 0 10px;font-size:.9rem"></p><div data-zalo-controls><label style="display:flex;align-items:flex-start;gap:8px;margin:8px 0;font-size:.88rem"><input type="checkbox" data-zalo-consent><span>Đồng ý nhận tối đa 2 lời nhắc mỗi đợt vắng học (học viên chưa đủ tuổi cần phụ huynh đồng ý).</span></label><button type="button" data-zalo-start style="padding:10px 14px;border-radius:10px;background:#1769c2;color:white;border:0;cursor:pointer;font-weight:600" disabled>Liên kết Zalo</button></div><div data-zalo-codebox hidden><code data-zalo-code style="display:block;padding:10px;border:1px dashed currentColor;border-radius:8px;user-select:all;word-break:break-all;font-size:.85rem"></code><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button type="button" data-zalo-copy style="padding:10px 14px;border:0;border-radius:10px;background:#1769c2;color:white;font-weight:600;cursor:pointer">1. Sao chép mã</button><a data-zalo-open href="https://chat.zalo.me/" target="_blank" rel="noopener noreferrer" style="padding:10px 14px;border:1px solid #1769c2;border-radius:10px;color:#1769c2;font-weight:600;text-decoration:none">2. Mở Zalo</a></div><p style="font-size:.85rem;margin:8px 0">Tìm <strong>bot.QRpTrGvX</strong>, dán mã vào chat riêng rồi gửi.</p><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><small data-zalo-timer></small><button type="button" data-zalo-cancel style="padding:4px 8px;border:0;background:transparent;color:inherit;cursor:pointer;font-size:.8rem">Hủy</button></div></div>';
 const anchor=box.querySelector('.ldd-profile-identity-grid')||box.querySelector('.profile-avatar-section')||box.querySelector('h3');
 if(anchor)anchor.insertAdjacentElement('afterend',section);else box.append(section);
 const statusEl=section.querySelector('[data-zalo-status]'),controls=section.querySelector('[data-zalo-controls]'),check=section.querySelector('[data-zalo-consent]'),start=section.querySelector('[data-zalo-start]'),codebox=section.querySelector('[data-zalo-codebox]'),codeEl=section.querySelector('[data-zalo-code]'),copy=section.querySelector('[data-zalo-copy]'),cancel=section.querySelector('[data-zalo-cancel]'),timerEl=section.querySelector('[data-zalo-timer]');

 let busy=false,active=null,clock=null,linked=false,serial=0;
 function show(value){section.hidden=!value;section.style.display=value?'block':'none';}
 function sync(){start.disabled=busy||!check.checked;controls.hidden=linked||(busy&&!codebox.hidden);}
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
 opener.addEventListener('click',e=>{if(e.isTrusted){if(busy)void verify();else void refresh();}});
 check.addEventListener('change',sync);
 copy.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(codeEl.textContent);copy.textContent='✓ Đã sao chép';setTimeout(()=>copy.textContent='1. Sao chép mã',1600);}
  catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(codeEl);selection.removeAllRanges();selection.addRange(range);copy.textContent='Hãy sao chép mã đã chọn';}
 });
 let deadline=0,polling=false,lastPoll=0;
 async function verify(){
  if(polling||!busy||codebox.hidden||document.hidden)return;
  polling=true;lastPoll=Date.now();
  try{const d=await (await request('status')).json();if(d.status==='linked')finish('linked');}catch{}finally{polling=false;}
 }

 cancel.addEventListener('click',async()=>{if(active)active.abort();try{await request('cancel');}catch{}finish('cancelled');});
 start.addEventListener('click',async()=>{
  if(busy||!check.checked||linked)return;
  busy=true;++serial;sync();statusEl.textContent='Đang tạo mã xác minh…';
  active=new AbortController();
  try{
   const d=await (await request('start',active.signal,true)).json();
   if(d.status!=='ready'||!/^LDD-[A-F0-9]{24}$/.test(d.code)){finish(d.status);return;}
   codeEl.textContent=d.code;codebox.hidden=false;deadline=Date.now()+Math.min(600,Number(d.seconds)||600)*1000;
   statusEl.textContent='Sao chép mã, mở Zalo rồi dán và gửi. Hệ thống tự xác nhận.';sync();
   const tick=()=>{const left=Math.ceil((deadline-Date.now())/1000);if(left<=0){finish('expired');return;}timerEl.textContent='Còn '+Math.floor(left/60)+':'+String(left%60).padStart(2,'0')+'.';if(!document.hidden&&getComputedStyle(modal).display!=='none'&&Date.now()-lastPoll>=15000)void verify();};
   lastPoll=Date.now();tick();clock=setInterval(tick,1000);
  }catch{finish('connection_failed');}finally{active=null;}
 });
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&section.style.display!=='none'&&getComputedStyle(modal).display!=='none'){if(busy)void verify();else void refresh();}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
