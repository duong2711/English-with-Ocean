/* =============================================================
   LDD ENGLISH — STUDENT GRADE ASSIGNMENT v1.1
   Requires student_grade_assignments (diligence_scores_grade_level_setup.sql).
   ============================================================= */
(function () {
'use strict';
const URL='https://ywqbaksmmtvwbojcgsdd.supabase.co';
const REF='ywqbaksmmtvwbojcgsdd';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
const TEACHER='lddbaiu@gmail.com', TABLE='student_grade_assignments', DAY=86400000;
let tokenSeen=null, grade=null, timerData=null, busy=false, lastApplied=null;

const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn();
function token(){try{const x=JSON.parse(localStorage.getItem('sb-'+REF+'-auth-token')||'null');return x&&(x.access_token||(x.currentSession&&x.currentSession.access_token)||(Array.isArray(x)&&x[0]&&x[0].access_token))||null;}catch(e){return null;}}
function payload(){const t=token();if(!t)return{};try{let p=t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');while(p.length%4)p+='=';return JSON.parse(atob(p))||{};}catch(e){return{};}}
const email=()=>String(payload().email||'').trim().toLowerCase();
const uid=()=>payload().sub||null;
const teacher=()=>email()===TEACHER;
const gradeNum=v=>{const n=Number(v);return Number.isInteger(n)&&n>=1&&n<=12?n:null;};

async function api(table,select,params,opt){
 const t=token();if(!t)return{ok:false,status:401,data:[]};
 const q=new URLSearchParams();if(select)q.set('select',select);Object.entries(params||{}).forEach(([k,v])=>v!=null&&q.set(k,v));
 opt=opt||{};const h={apikey:KEY,Authorization:'Bearer '+t,Accept:'application/json'};if(opt.body!==undefined)h['Content-Type']='application/json';if(opt.prefer)h.Prefer=opt.prefer;
 try{const r=await fetch(URL+'/rest/v1/'+table+(q.toString()?'?'+q:''),{method:opt.method||'GET',headers:h,body:opt.body===undefined?undefined:JSON.stringify(opt.body)});let d=[];if(r.status!==204)try{d=await r.json();}catch(e){}return{ok:r.ok,status:r.status,data:d};}catch(e){return{ok:false,status:0,data:[],error:e};}
}

ready(()=>{
 ensureModal(); syncTeacherButton(); bindGradeEntry(); watch();
 setInterval(watch,1200); setInterval(()=>{if(!document.hidden&&token()&&!teacher())loadOwn(true);},45000); setInterval(tickTimers,1000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&token()&&!teacher())loadOwn(true);});
});

function watch(){
 const t=token();
 if(t&&t!==tokenSeen){tokenSeen=t;grade=null;timerData=null;lastApplied=null;syncTeacherButton();if(!teacher())loadOwn(false);}
 else if(!t&&tokenSeen){tokenSeen=null;grade=null;timerData=null;lastApplied=null;syncTeacherButton();}
 syncTeacherButton();
}

async function loadOwn(silent){
 const e=email();if(!e||teacher())return;
 let r=await api(TABLE,'email,user_id,display_name,grade_level',{email:'eq.'+e,limit:'1'});
 if(!r.ok){if(!silent)console.warn('[LDD Grade] Chưa có bảng khối lớp. Chạy diligence_scores_grade_level_setup.sql.');return;}
 let row=Array.isArray(r.data)?r.data[0]:null;
 if(!row){
   const name=String((document.getElementById('account-display-name')||{}).textContent||'').trim();
   await api(TABLE,null,{}, {method:'POST',prefer:'resolution=ignore-duplicates,return=minimal',body:{email:e,user_id:uid(),display_name:name||null,grade_level:null,updated_at:new Date().toISOString()}});
   r=await api(TABLE,'email,user_id,display_name,grade_level',{email:'eq.'+e,limit:'1'});row=r.ok&&Array.isArray(r.data)?r.data[0]:null;
 }
 const old=grade;grade=gradeNum(row&&row.grade_level);
 if(old!==grade||lastApplied!==grade){applyDefaults();document.dispatchEvent(new CustomEvent('ldd:student-grade-changed',{detail:{grade}}));}
 await loadTimers();
}

function applyDefaults(){
 if(!grade||teacher())return;lastApplied=grade;
 const conj=document.getElementById('conj-grade-slider');
 if(conj&&grade>=Number(conj.min||1)&&grade<=Number(conj.max||12)&&Number(conj.value)!==grade){conj.value=grade;conj.dispatchEvent(new Event('input',{bubbles:true}));conj.dispatchEvent(new Event('change',{bubbles:true}));}
 const a=document.querySelector('#thcs-grade-tabs-nav .grade-tab-btn[data-grade-target="grade-panel-'+grade+'"]');if(a&&!a.classList.contains('active'))a.click();
 const b=document.querySelector('#thpt-grade-tabs-nav .thpt-grade-tab-btn[data-thpt-grade-target="grade-panel-'+grade+'"]');if(b&&!b.classList.contains('active'))b.click();
 document.querySelectorAll('select[data-grade-filter],input[type="range"][data-grade-filter]').forEach(el=>{
   if(el.disabled)return;let ok=true;if(el.tagName==='SELECT')ok=Array.from(el.options||[]).some(o=>Number(o.value)===grade);else ok=grade>=Number(el.min||1)&&grade<=Number(el.max||12);
   if(ok&&Number(el.value)!==grade){el.value=grade;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}
 });
}

function bindGradeEntry(){
 document.addEventListener('click',ev=>{if(!grade||teacher())return;if(ev.target.closest&&ev.target.closest('#thcs-folder-card'))setTimeout(()=>openVocabGrade(grade),100);},false);
 new MutationObserver(()=>{if(grade&&!teacher())setTimeout(applyDefaults,30);}).observe(document.body,{childList:true,subtree:true});
}
function openVocabGrade(g){
 const grid=document.getElementById('thcs-grade-grid');if(!grid||getComputedStyle(grid).display==='none')return false;
 const card=Array.from(grid.querySelectorAll('.thcs-grade-card')).find(c=>{const t=c.querySelector('.kid-title');return t&&Number((t.textContent||'').replace(/\D/g,''))===Number(g);});
 if(card&&!card.classList.contains('locked')){card.click();return true;}return false;
}

// ---------------- Teacher grade manager ----------------
function syncTeacherButton(){
 const menu=document.getElementById('account-menu');if(!menu)return;let b=document.getElementById('teacher-grade-manager-btn');
 if(!b){b=document.createElement('button');b.type='button';b.id='teacher-grade-manager-btn';b.className='account-menu-item account-menu-item-teacher';b.textContent='🎓 Khối lớp học viên';const x=document.getElementById('teacher-impersonate-btn');x&&x.nextSibling?menu.insertBefore(b,x.nextSibling):menu.appendChild(b);b.onclick=()=>{if(teacher()){menu.classList.remove('open');openModal();}};}
 b.style.display=token()&&teacher()?'':'none';
}
function options(sel){let s='<option value="">— Chưa gán —</option>';for(let i=1;i<=12;i++)s+='<option value="'+i+'"'+(Number(sel)===i?' selected':'')+'>Lớp '+i+'</option>';return s;}
function ensureModal(){
 if(document.getElementById('ldd-grade-modal'))return;const m=document.createElement('div');m.id='ldd-grade-modal';m.className='ldd-grade-modal-overlay';m.style.display='none';
 m.innerHTML='<div class="ldd-grade-modal" role="dialog" aria-modal="true"><div class="ldd-grade-modal-head"><div><span class="ldd-grade-kicker">Giảng viên</span><h3>🎓 Gán khối lớp cho học viên</h3><p>Gán Lớp 1–12 hoặc để trống. Khối lớp này trở thành mặc định cho các filter lớp và Countdown THCS/THPT.</p></div><button type="button" id="ldd-grade-modal-close" class="ldd-grade-close">×</button></div><div class="ldd-grade-add-row"><input type="email" id="ldd-grade-add-email" placeholder="Email tài khoản học viên"><select id="ldd-grade-add-select">'+options(null)+'</select><button type="button" id="ldd-grade-add-btn">Thêm / lưu</button></div><div class="ldd-grade-toolbar"><input type="search" id="ldd-grade-search" placeholder="Tìm theo email hoặc tên..."><span id="ldd-grade-summary"></span></div><div id="ldd-grade-status" class="ldd-grade-status"></div><div id="ldd-grade-list" class="ldd-grade-list"></div></div>';
 document.body.appendChild(m);m.onclick=e=>{if(e.target===m)closeModal();};document.getElementById('ldd-grade-modal-close').onclick=closeModal;document.getElementById('ldd-grade-search').oninput=filterRows;document.getElementById('ldd-grade-add-btn').onclick=addAccount;
}
async function openModal(){ensureModal();document.getElementById('ldd-grade-modal').style.display='flex';document.body.classList.add('ldd-grade-modal-open');await loadRows();}
function closeModal(){const m=document.getElementById('ldd-grade-modal');if(m)m.style.display='none';document.body.classList.remove('ldd-grade-modal-open');}
async function loadRows(){
 const host=document.getElementById('ldd-grade-list'),st=document.getElementById('ldd-grade-status');if(!host||!teacher())return;host.innerHTML='<p class="ldd-grade-empty">Đang tải...</p>';if(st)st.textContent='';
 const r=await api(TABLE,'email,user_id,display_name,grade_level,updated_at',{order:'display_name.asc,email.asc'});
 if(!r.ok){host.innerHTML='<div class="ldd-grade-error"><strong>Chưa có bảng khối lớp trên Supabase.</strong><span>Chạy <code>diligence_scores_grade_level_setup.sql</code> một lần trong SQL Editor rồi mở lại.</span></div>';return;}
 renderRows((Array.isArray(r.data)?r.data:[]).filter(x=>String(x.email||'').toLowerCase()!==TEACHER));
}
function renderRows(rows){
 const host=document.getElementById('ldd-grade-list'),sum=document.getElementById('ldd-grade-summary');if(sum)sum.textContent=rows.length+' tài khoản';host.innerHTML='';
 if(!rows.length){host.innerHTML='<p class="ldd-grade-empty">Chưa có học viên. Có thể thêm bằng email phía trên; học viên đăng nhập cũng tự xuất hiện.</p>';return;}
 rows.forEach(r=>{const el=document.createElement('div');el.className='ldd-grade-row';el.dataset.search=(String(r.display_name||'')+' '+String(r.email||'')).toLowerCase();
   const id=document.createElement('div');id.className='ldd-grade-identity';id.innerHTML='<span class="ldd-grade-avatar"></span><span><strong></strong><small></small></span>';id.querySelector('.ldd-grade-avatar').textContent=(String(r.display_name||r.email||'?')[0]||'?').toUpperCase();id.querySelector('strong').textContent=r.display_name||String(r.email||'').split('@')[0]||'Học viên';id.querySelector('small').textContent=r.email||'—';
   const sel=document.createElement('select');sel.className='ldd-grade-select';sel.innerHTML=options(r.grade_level);sel.value=r.grade_level==null?'':String(r.grade_level);const saved=document.createElement('span');saved.className='ldd-grade-saved';saved.textContent=r.grade_level?'Lớp '+r.grade_level:'Chưa gán';
   sel.onchange=async()=>{const before=saved.textContent;sel.disabled=true;saved.textContent='Đang lưu...';const g=gradeNum(sel.value),ok=await saveGrade(r.email,g);saved.textContent=ok?(g?'Lớp '+g:'Đã bỏ gán'):before;saved.classList.toggle('is-ok',ok);sel.disabled=false;};el.append(id,sel,saved);host.appendChild(el);
 });filterRows();
}
async function saveGrade(e,g){e=String(e||'').trim().toLowerCase();if(!teacher()||!e||e===TEACHER)return false;const r=await api(TABLE,null,{email:'eq.'+e},{method:'PATCH',prefer:'return=minimal',body:{grade_level:g,updated_at:new Date().toISOString(),updated_by:email()}});if(!r.ok){const s=document.getElementById('ldd-grade-status');if(s)s.textContent='Không thể lưu. Kiểm tra bảng/RLS trên Supabase.';}return r.ok;}
async function addAccount(){
 const eEl=document.getElementById('ldd-grade-add-email'),gEl=document.getElementById('ldd-grade-add-select'),btn=document.getElementById('ldd-grade-add-btn'),s=document.getElementById('ldd-grade-status');const e=String(eEl.value||'').trim().toLowerCase(),g=gradeNum(gEl.value);
 if(!e||!e.includes('@')){s.textContent='Nhập email hợp lệ.';return;}if(e===TEACHER){s.textContent='Không gắn khối lớp cho giáo viên.';return;}btn.disabled=true;s.textContent='Đang lưu...';
 const r=await api(TABLE,'email',{on_conflict:'email'},{method:'POST',prefer:'resolution=merge-duplicates,return=representation',body:{email:e,grade_level:g,updated_at:new Date().toISOString(),updated_by:email()}});btn.disabled=false;
 if(!r.ok){s.textContent='Không thể lưu. Hãy chạy file SQL thiết lập bảng trước.';return;}eEl.value='';gEl.value='';s.textContent='✓ Đã lưu '+e+(g?' · Lớp '+g:' · Chưa gán khối');await loadRows();
}
function filterRows(){const q=String((document.getElementById('ldd-grade-search')||{}).value||'').toLowerCase().trim();document.querySelectorAll('#ldd-grade-list .ldd-grade-row').forEach(r=>r.style.display=!q||String(r.dataset.search||'').includes(q)?'':'none');}

// ---------------- Grade-aware Home countdown ----------------
async function loadTimers(){
 if(busy||!token()||teacher())return;busy=true;try{const day=new Date().toISOString().slice(0,10);const rs=await Promise.all([
   api('kid_topic_progress','topic_key,times_completed,completed_at',{}),
   api('thcs_unit_progress','grade,unit_id,completed,times_completed,completed_at',grade?{grade:'eq.'+grade}:{}),
   api('vocab_weekly_tests','id,created_at,status',{order:'created_at.desc',limit:'1'}),
   api('conj_practice_sessions','id,session_date',{session_date:'eq.'+day})]);
   timerData={kid:rs[0].ok?rs[0].data:[],thcs:rs[1].ok?rs[1].data:[],vocab:rs[2].ok?rs[2].data:[],conj:rs[3].ok?rs[3].data:[]};renderTimers();
 }finally{busy=false;}
}
function target(at,times){const n=Number(times||0),days=n<=1?7:n===2?14:null,st=Date.parse(at||'');return days&&Number.isFinite(st)?st+days*DAY:null;}
function nextUtc(){const d=new Date();return Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()+1);}
function timerItems(){
 if(!timerData)return[];const now=Date.now(),a=[];
 (timerData.kid||[]).forEach(r=>{const t=target(r.completed_at,r.times_completed);if(t)a.push({title:'Vận dụng · '+pretty(r.topic_key),note:t<=now?'Đã đến hạn ôn lại':'Reset tiến độ sau',target:t,kind:'reset',action:{type:'kid',key:r.topic_key}});});
 (timerData.thcs||[]).forEach(r=>{if(!r.completed||(grade&&Number(r.grade)!==grade))return;const t=target(r.completed_at,r.times_completed);if(t)a.push({title:'Lớp '+r.grade+' · '+unitLabel(r.unit_id),note:t<=now?'Đã đến hạn ôn lại Unit':'Reset tiến độ sau',target:t,kind:'reset',action:{type:'thcs',grade:Number(r.grade),unitId:r.unit_id}});});
 const v=(timerData.vocab||[])[0];if(v&&v.status!=='pending'&&v.created_at){const t=Date.parse(v.created_at)+2*DAY;if(Number.isFinite(t))a.push({title:'Kiểm tra từ vựng của tôi',note:t<=now?'Bài tiếp theo đã đến hạn':'Bài tiếp theo mở sau',target:t,kind:'unlock',action:{type:'vocab'}});}
 if((timerData.conj||[]).length>=2){const t=nextUtc();a.push({title:'Luyện tập Liên từ',note:t<=now?'Đã reset lượt luyện tập':'Reset 2 lượt/ngày sau',target:t,kind:'reset',action:{type:'conj'}});}
 a.forEach(x=>x.ready=x.target<=now);a.sort((x,y)=>x.ready!==y.ready?(x.ready?-1:1):x.target-y.target);return a.slice(0,12);
}
function tickTimers(){if(token()&&!teacher()&&timerData)renderTimers();}
function renderTimers(){
 const host=document.getElementById('ldd-home-timer-list');if(!host||!timerData)return;const a=timerItems();host.innerHTML='';if(!a.length){host.innerHTML='<p class="ldd-home-live-empty">Hiện chưa có mục nào đang chờ reset hoặc mở'+(grade?' cho Lớp '+grade:'')+'.</p>';return;}
 a.forEach(it=>{const b=document.createElement('button');b.type='button';b.className='ldd-home-timer-row ldd-grade-timer-row'+(it.ready?' ldd-grade-ready':'');b.dataset.targetMs=it.target;b.innerHTML='<span class="ldd-home-timer-icon">'+(it.ready?'✓':it.kind==='reset'?'↻':'🔒')+'</span><span class="ldd-home-timer-copy"><strong></strong><small></small></span><span class="ldd-home-timer-value"></span>';b.querySelector('strong').textContent=it.title;b.querySelector('small').textContent=it.note;b.querySelector('.ldd-home-timer-value').textContent=it.ready?'LÀM NGAY':remain(it.target-Date.now());b.onclick=()=>navigate(it.action);host.appendChild(b);});
}
function remain(ms){let s=Math.max(0,Math.floor(ms/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;const clock=[h,m,x].map(n=>String(n).padStart(2,'0')).join(':');return d?d+' ngày '+clock:clock;}
const pretty=s=>String(s||'Chủ đề').replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
function unitNo(v){const m=String(v==null?'':v).match(/(\d+)(?!.*\d)/);return m?Number(m[1]):NaN;}
function unitLabel(v){const n=unitNo(v);return Number.isFinite(n)?'Unit '+n:(String(v||'Unit'));}
function go(tab,cb){if(window.LDDNavigation&&LDDNavigation.goToTab)LDDNavigation.goToTab(tab);else{const b=document.querySelector('.main-tab-btn[data-main-target="'+tab+'"]');if(b)b.click();}if(cb)setTimeout(cb,90);}
function click(id){const e=document.getElementById(id);if(e)e.click();}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function navigate(a){if(!a)return;
 if(a.type==='kid')go('tab-tu-vung',()=>{click('kid-folder-card');setTimeout(()=>{const k=norm(a.key),c=Array.from(document.querySelectorAll('#kid-topic-grid .kid-topic-card')).find(x=>{const t=x.querySelector('.kid-title'),n=t&&norm(t.textContent);return n&&(n===k||n.includes(k)||k.includes(n));});if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.click();}},140);});
 if(a.type==='thcs')go('tab-tu-vung',()=>{click('thcs-folder-card');setTimeout(()=>{if(!openVocabGrade(a.grade))return;setTimeout(()=>{const n=unitNo(a.unitId),c=Array.from(document.querySelectorAll('#thcs-unit-grid .thcs-unit-card')).find(x=>{const t=x.querySelector('.kid-title'),m=t&&String(t.textContent||'').match(/Unit\s+(\d+)/i);return m&&Number(m[1])===n;});if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.click();}},160);},130);});
 if(a.type==='vocab')go('tab-kiem-tra',()=>click('vocab-test-folder'));
 if(a.type==='conj')go('tab-tu-vung',()=>click('conj-folder-card'));
}

window.LDDStudentGrade={getGrade:()=>grade,refresh:()=>loadOwn(false),applyDefaults};
})();
