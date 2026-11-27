(function(){
 'use strict';
 if(window.__LDDWhisperAdminLoaded)return;
 window.__LDDWhisperAdminLoaded=true;
 const PROJECT='ywqbaksmmtvwbojcgsdd';
 const KEY='sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_';
 let client=null,overlay=null;
 function db(){
  if(!client&&window.supabase?.createClient)client=window.supabase.createClient('https://'+PROJECT+'.supabase.co',KEY,{auth:{detectSessionInUrl:false}});
  return client;
 }
 function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
 async function teacher(){
  const c=db();if(!c)return false;
  const {data}=await c.auth.getSession();
  return String(data?.session?.user?.email||'').toLowerCase()==='lddbaiu@gmail.com';
 }
 function ensure(){
  if(overlay)return overlay;
  overlay=el('div','ldd-whisper-admin-overlay');overlay.hidden=true;
  const panel=el('section','ldd-whisper-admin-panel');
  const head=el('header','ldd-whisper-admin-head');
  head.append(el('h2','','Quản lý từ miễn chấm Whisper'));
  const close=el('button','ldd-whisper-admin-close','Đóng');close.type='button';close.onclick=()=>overlay.hidden=true;head.appendChild(close);
  const content=el('div','ldd-whisper-admin-content');
  panel.append(head,content);overlay.appendChild(panel);document.body.appendChild(overlay);
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.hidden=true;});
  overlay._content=content;return overlay;
 }
 async function load(){
  const c=db(),ui=ensure(),host=ui._content;host.replaceChildren(el('p','','Đang tải danh sách báo cáo...'));
  const [{data:reports,error:re},{data:words,error:we}]=await Promise.all([
   c.from('whisper_word_reports').select('*').order('latest_reported_at',{ascending:false}).limit(200),
   c.from('whisper_word_exclusions').select('*').eq('active',true).order('word')
  ]);
  if(re)throw re;if(we)throw we;host.replaceChildren();
  const add=el('form','ldd-whisper-add-form');
  const input=el('input');input.placeholder='Nhập từ cần miễn chấm';input.maxLength=100;
  const addBtn=el('button','','+ Thêm từ');addBtn.type='submit';add.append(input,addBtn);
  add.onsubmit=async e=>{e.preventDefault();if(!input.value.trim())return;addBtn.disabled=true;try{const {error}=await c.rpc('teacher_set_whisper_word',{p_word:input.value.trim(),p_action:'add'});if(error)throw error;await load();}catch(err){alert('Không thêm được từ: '+err.message);addBtn.disabled=false;}};
  host.appendChild(add);
  host.appendChild(el('h3','','Báo cáo từ học viên ('+(reports||[]).filter(x=>x.status==='pending').length+' chờ xử lý)'));
  (reports||[]).forEach(row=>{
   const card=el('article','ldd-whisper-report-card');
   const info=el('div','');info.append(el('strong','',row.word),el('p','',row.report_count+' lượt báo cáo · gần nhất: '+(row.latest_reporter_email||'học viên')+' · '+new Date(row.latest_reported_at).toLocaleString('vi-VN')));
   const actions=el('div','ldd-whisper-actions');
   const keep=el('button','','Giữ trong danh sách miễn chấm');keep.type='button';keep.disabled=row.status==='accepted';
   keep.onclick=()=>resolve(row.word,'add');
   const remove=el('button','','Loại khỏi danh sách');remove.type='button';
   remove.onclick=()=>resolve(row.word,'remove');
   actions.append(keep,remove);card.append(info,actions,el('small','',row.status==='pending'?'Chưa xử lý':row.status==='accepted'?'Đã xác nhận miễn chấm':'Đã loại'));host.appendChild(card);
  });
  host.appendChild(el('h3','','Danh sách từ hiện đang miễn chấm ('+(words||[]).length+')'));
  (words||[]).forEach(row=>{
   const line=el('div','ldd-whisper-word-row');line.append(el('span','',row.word));
   const btn=el('button','','Bỏ miễn chấm');btn.type='button';btn.onclick=()=>resolve(row.word,'remove');line.appendChild(btn);host.appendChild(line);
  });
 }
 async function resolve(word,action){
  const {error}=await db().rpc('teacher_set_whisper_word',{p_word:word,p_action:action});
  if(error){alert('Không cập nhật được: '+error.message);return;}await load();
 }
 async function boot(){
  if(!await teacher())return;
  const btn=el('button','ldd-whisper-admin-launch','🎙️ Báo cáo Whisper');
  btn.type='button';btn.onclick=async()=>{try{await load();ensure().hidden=false;}catch(e){alert('Không tải được báo cáo: '+e.message);}};
  document.body.appendChild(btn);
  const {data:notifications,error}=await db().rpc('claim_whisper_report_notifications');
  if(!error&&notifications&&notifications.length){
   btn.textContent='🎙️ Báo cáo Whisper ('+notifications.length+')';
   const toast=el('div','ldd-whisper-teacher-toast',
    '⚠️ Có '+notifications.length+' từ mới được học viên báo cáo chấm sai: '+notifications.map(x=>x.word).join(', '));
   document.body.appendChild(toast);
   setTimeout(()=>toast.remove(),9000);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else void boot();
})();