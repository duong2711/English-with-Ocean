/* LDD English — teacher-managed Zalo enrollment. */
(function(){
'use strict';
if(window.LDDZaloTeacher)return;
const base='https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/ldd-zalo-official';
const anon="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ";
const key='sb-ywqbaksmmtvwbojcgsdd-auth-token';

const botLink='https://chat.zalo.me/?c=7024061011203700252';
const teacherEmail='lddbaiu@gmail.com';
function token(){
 for(const store of ['localStorage','sessionStorage'])try{const x=JSON.parse(window[store].getItem(key)||'null');const s=x?.access_token?x:x?.currentSession?.access_token?x.currentSession:x?.session?.access_token?x.session:Array.isArray(x)?x[0]:null;if(s?.access_token)return s.access_token;}catch{}
 return '';
}
function isTeacher(){try{const p=token().split('.')[1].replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(atob(p.padEnd(Math.ceil(p.length/4)*4,'='))).email?.toLowerCase()===teacherEmail;}catch{return false;}}
async function request(action,id){
 const t=token();if(!t||!isTeacher())throw Error('forbidden');
 const r=await fetch(base,{method:'POST',cache:'no-store',credentials:'omit',headers:{'Content-Type':'application/json',Authorization:'Bearer '+t,apikey:anon},body:JSON.stringify({action:'teacher_'+action,student_id:id})});
 const d=await r.json();if(!r.ok)throw Error(d.status||'unavailable');return d;
}
let modal,list,summary,notice,search,rows=[],issued=new Map(),busy=new Set(),loading=false,poll=null,version=0,lastFocus=null;
const labels={linked:'Đã liên kết',pending:'Chờ gửi mã',disabled:'Đã tắt',unlinked:'Chưa liên kết',no_account:'Chưa có tài khoản'};
function el(tag,cls,txt){const x=document.createElement(tag);if(cls)x.className=cls;if(txt!=null)x.textContent=txt;return x;}
function btn(text,fn,cls=''){const b=el('button','ldd-zt-button '+cls,text);b.type='button';b.onclick=fn;return b;}
function note(t){notice.textContent=t||'';}
function expiry(t){return new Date(t).toLocaleString('vi-VN',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit',year:'numeric'});}
function showError(){note('Không thể thực hiện. Vui lòng thử lại hoặc kiểm tra kết nối.');}
function ensure(){
 if(modal)return;
 const style=el('style');style.textContent=`
 #ldd-zt-modal{position:fixed;inset:0;z-index:2147482000;background:rgba(12,20,35,.48);display:flex;align-items:center;justify-content:center;padding:14px;box-sizing:border-box}
 #ldd-zt-modal[hidden]{display:none!important}
 .ldd-zt-panel{background:var(--card-bg,var(--bg-color,#fff));color:var(--text-color,#182235);border:1px solid rgba(128,128,128,.24);border-radius:18px;width:min(720px,100%);max-height:88dvh;display:flex;flex-direction:column;padding:20px;gap:12px;box-shadow:0 16px 60px #0003;box-sizing:border-box;overflow:hidden}
 .ldd-zt-head,.ldd-zt-tools,.ldd-zt-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
 .ldd-zt-head{justify-content:space-between}.ldd-zt-head h3{margin:0;font-size:1.1rem}.ldd-zt-panel p{margin:0;font-size:.88rem;line-height:1.45}
 .ldd-zt-tools input{flex:1;min-width:130px;border:1px solid #8885;border-radius:10px;padding:10px;color:inherit;background:transparent}
 .ldd-zt-button{font:inherit;font-size:.84rem;padding:9px 12px;border-radius:9px;border:1px solid #8886;color:inherit;background:transparent;cursor:pointer}
 .ldd-zt-primary{background:#1769c2;color:white;border-color:#1769c2;font-weight:600}.ldd-zt-button:disabled{opacity:.5;cursor:default}
 .ldd-zt-list{overflow-y:auto;overscroll-behavior:contain;min-height:0;max-height:60dvh}
 .ldd-zt-row{border-top:1px solid #8883;padding:12px 0;display:flex;flex-wrap:wrap;gap:10px;align-items:center}
 .ldd-zt-identity{flex:1;min-width:150px;overflow-wrap:anywhere}.ldd-zt-identity strong,.ldd-zt-identity small{display:block}.ldd-zt-identity small{opacity:.7;font-size:.75rem;margin-top:3px}
 .ldd-zt-status{font-size:.8rem;margin-top:5px}.ldd-zt-linked{color:#16804a;font-weight:600}
 .ldd-zt-invite{flex:0 0 100%;box-sizing:border-box;border:1px solid #8884;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px}
 .ldd-zt-invite code{font-size:.82rem;overflow-wrap:anywhere;user-select:all}.ldd-zt-invite textarea{width:100%;box-sizing:border-box;resize:vertical;min-height:124px;background:transparent;color:inherit;border:1px solid #8885;border-radius:8px;padding:8px;font:inherit;font-size:.82rem;line-height:1.4}
 .ldd-zt-note{font-size:.83rem;min-height:1em;overflow-wrap:anywhere}.ldd-zt-summary{font-size:.85rem;opacity:.75}
 @media(max-width:480px){.ldd-zt-panel{padding:14px}.ldd-zt-row{align-items:flex-start}.ldd-zt-actions{width:100%}.ldd-zt-button{min-height:40px}}
 `;
 document.head.append(style);
 modal=el('div');modal.id='ldd-zt-modal';modal.hidden=true;
 const panel=el('section','ldd-zt-panel');panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','ldd-zt-title');
 const head=el('div','ldd-zt-head'),h=el('h3','','Quản lý nhắc nhở Zalo');h.id='ldd-zt-title';head.append(h,btn('Đóng',close));
 const intro=el('p','','Tạo mã riêng cho học viên, sao chép lời mời và gửi qua Zalo. Học viên hoặc phụ huynh chỉ cần mở chat bot rồi gửi mã.');
 const tools=el('div','ldd-zt-tools');search=el('input');search.type='search';search.placeholder='Tìm tên hoặc email học viên';search.setAttribute('aria-label',search.placeholder);search.oninput=render;
 tools.append(search,btn('Làm mới',()=>void refresh()));
 summary=el('div','ldd-zt-summary');notice=el('div','ldd-zt-note');notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');list=el('div','ldd-zt-list');
 panel.append(head,intro,tools,summary,notice,list);modal.append(panel);document.body.append(modal);
 modal.onclick=e=>{if(e.target===modal)close();};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!modal.hidden)void refresh();});
}
function close(){if(!modal)return;modal.hidden=true;version++;issued.clear();rows=[];busy.clear();loading=false;list.replaceChildren();note('');clearInterval(poll);poll=null;lastFocus?.focus();}
async function refresh(){
 if(!modal||modal.hidden||loading)return;
 if(!isTeacher()){close();return;}loading=true;const v=version;
 try{
  const d=await request('list');if(v!==version||modal.hidden)return;
  if(d.status!=='ok'||!Array.isArray(d.students))throw Error('list');
  rows=d.students;for(const r of rows){const inv=issued.get(r.user_id);if(inv&&(r.status!=='pending'||Date.parse(inv.expires_at)<=Date.now()||Date.parse(inv.expires_at)!==Date.parse(r.expires_at)))issued.delete(r.user_id);}
  render();
 }catch{if(v===version)showError();}finally{if(v===version)loading=false;}
}
function inviteText(name,code){return 'Để nhận lời nhắc học tiếng Anh của '+name+', em hoặc phụ huynh mở chat với bot LDD English:\n'+botLink+'\n\nSao chép và gửi đúng mã sau vào chat bot:\n'+code+'\n\nGửi mã nghĩa là đồng ý nhận tối đa 2 lời nhắc mỗi đợt vắng học. Nếu học viên chưa đủ tuổi, phụ huynh cần đồng ý. Mã có hạn 24 giờ và chỉ dùng một lần. Nhắn STOP để ngừng nhận.';}
async function copyText(text,area){
 try{await navigator.clipboard.writeText(text);note('Đã sao chép lời mời. Bạn có thể dán vào Zalo để gửi.');}
 catch{area.focus();area.select();try{if(document.execCommand('copy')){note('Đã sao chép lời mời.');return;}}catch{}note('Hãy sao chép phần lời mời đang được chọn.');}
}
async function mutate(action,r){
 if(!r.user_id||busy.has(r.user_id))return;
 if(action==='disable'&&!confirm('Tắt nhắc nhở Zalo của '+r.name+'?'))return;
 if(action==='cancel'&&!confirm('Hủy mã chưa sử dụng của '+r.name+'?'))return;
 if(action==='generate'&&r.status==='pending'&&!confirm('Tạo mã mới sẽ làm mã cũ mất hiệu lực. Tiếp tục?'))return;
 busy.add(r.user_id);note('');render();const v=version;
 try{
  const d=await request(action,r.user_id);if(v!==version||modal.hidden)return;
  if(action==='generate'&&d.status==='ready'&&/^LDD-[A-F0-9]{24}$/.test(d.code)){
   issued.set(r.user_id,d);r.status='pending';r.expires_at=d.expires_at;note('Đã tạo mã cho '+r.name+'.');
  }else if(action==='disable'&&d.status==='disabled'){issued.delete(r.user_id);r.status='disabled';note('Đã tắt nhắc nhở.');}
  else if(action==='cancel'&&d.status==='cancelled'){issued.delete(r.user_id);r.status='unlinked';r.expires_at=null;note('Đã hủy mã.');}
  else if(d.status==='linked'){issued.delete(r.user_id);r.status='linked';note('Học viên đã liên kết.');}
  else if(d.status==='busy')note('Vừa tạo mã. Thử lại sau vài giây.');
  else throw Error(d.status);
 }catch{if(v===version)showError();}
 finally{if(v===version){busy.delete(r.user_id);render();void refresh();}}
}
function render(){
 if(!list||modal.hidden)return;
 const q=search.value.trim().toLowerCase(),linked=rows.filter(x=>x.status==='linked').length;
 summary.textContent=linked+'/'+rows.length+' tài khoản đã liên kết';
 const fragment=document.createDocumentFragment();
 for(const r of rows.filter(x=>(x.name+' '+x.email).toLowerCase().includes(q))){
  const row=el('article','ldd-zt-row'),identity=el('div','ldd-zt-identity');identity.append(el('strong','',r.name),el('small','',r.email));
  const st=el('div','ldd-zt-status'+(r.status==='linked'?' ldd-zt-linked':''),labels[r.status]||'Chưa liên kết');
  if(r.status==='pending'&&r.expires_at)st.textContent+=' · Hết hạn '+expiry(r.expires_at);
  identity.append(st);row.append(identity);
  const actions=el('div','ldd-zt-actions');
  if(r.status==='linked')actions.append(btn('Tắt nhắc nhở',()=>void mutate('disable',r)));
  else if(r.status!=='no_account'){
   actions.append(btn(r.status==='pending'?'Tạo mã mới':'Tạo mã',()=>void mutate('generate',r),'ldd-zt-primary'));
   if(r.status==='pending')actions.append(btn('Hủy mã',()=>void mutate('cancel',r)));
  }
  for(const b of actions.querySelectorAll('button'))b.disabled=busy.has(r.user_id);
  row.append(actions);
  const inv=issued.get(r.user_id);
  if(inv&&r.status==='pending'&&Date.parse(inv.expires_at)>Date.now()){
   const card=el('div','ldd-zt-invite');card.append(el('code','',inv.code));const area=el('textarea');area.readOnly=true;area.value=inviteText(inv.name||r.name,inv.code);area.setAttribute('aria-label','Lời mời gửi cho '+r.name);
   card.append(area,btn('Sao chép lời mời',()=>void copyText(area.value,area),'ldd-zt-primary'));row.append(card);
  }
  fragment.append(row);
 }
 if(!fragment.childNodes.length)fragment.append(el('p','','Không tìm thấy học viên.'));
 list.replaceChildren(fragment);
}
function open(){
 if(!isTeacher())return;ensure();lastFocus=document.activeElement;version++;rows=[];issued.clear();busy.clear();loading=false;modal.hidden=false;search.value='';summary.textContent='';list.replaceChildren(el('p','','Đang tải danh sách học viên…'));note('');
 void refresh();clearInterval(poll);poll=setInterval(()=>{if(!document.hidden&&!modal.hidden&&!busy.size)void refresh();},30000);
}
window.LDDZaloTeacher={open};
})();