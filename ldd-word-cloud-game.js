/* LDD English · Tìm từ còn thiếu · multiplayer word-cloud cloze */
(function(){
'use strict';
if(window.__LDDWordCloudGame)return;window.__LDDWordCloudGame=true;
const URL='https://ywqbaksmmtvwbojcgsdd.supabase.co';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
const $=id=>document.getElementById(id);
const norm=s=>String(s||'').toLowerCase().trim().replace(/\s+/g,' ');
const translateErr=e=>{const value=String(e&&e.message||e||'Lỗi không xác định.');
  const map={not_authenticated:'Hãy đăng nhập trước khi chơi.',room_not_found:'Không tìm thấy mã phòng.',room_full:'Phòng đã đủ người.',room_already_started:'Phòng đã bắt đầu.',need_2_to_4_players:'Cần 2–4 người để bắt đầu.',host_only:'Chỉ chủ phòng được bắt đầu.',invalid_cloud_questions:'Bộ câu hỏi không hợp lệ.',create_too_fast:'Bạn đã tạo quá nhiều phòng.'};
  return Object.keys(map).find(x=>value.includes(x))?map[Object.keys(map).find(x=>value.includes(x))]:value;
};
let sb=null,me=null,room=null,players=[],shots=new Map(),channel=null;
let opened=false,busy=false,pending=false,shown=-1,refreshing=false,syncBusy=false,liveTimer=0,lobbyTimer=0;
const cloud=r=>!!(r&&r.word_list&&r.word_list[0]&&r.word_list[0].game_mode==='word_cloud');
const storeKey=()=>me?'ldd-cloud-room-'+me.id:'';
function notify(msg,type){const el=$('ldd-cloud-notice');if(el){el.textContent=msg||'';el.dataset.type=type||'';}}
function client(){
 if(!sb){if(!window.supabase)throw Error('Chưa tải xong kết nối đăng nhập.');
  sb=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});}
 return sb;
}
async function identity(){
 const {data,error}=await client().auth.getSession();if(error)throw error;
 const u=data&&data.session&&data.session.user;if(!u)throw Error('Hãy đăng nhập trước khi tham gia.');
 me={id:u.id,name:(u.user_metadata&&(u.user_metadata.display_name||u.user_metadata.full_name||u.user_metadata.name))||(u.email||'Học viên').split('@')[0]};
}
function boot(){
 const grid=$('entertainment-games-grid');if(!grid||$('ldd-cloud-card'))return;
 const card=document.createElement('button');card.type='button';card.id='ldd-cloud-card';card.className='folder-card ldd-cloud-card';
 card.innerHTML='<span class="ldd-cloud-icon">☁️</span><span><strong>Tìm từ còn thiếu</strong><small>Chạm tìm từ đúng · Từ vựng / Ngữ pháp</small></span>';
 grid.appendChild(card);
 const view=document.createElement('section');view.id='ldd-cloud-panel';view.className='ldd-cloud-panel';view.hidden=true;
 view.innerHTML=`
 <div class="ldd-cloud-shell">
 <div class="ldd-cloud-head"><button type="button" id="ldd-cloud-back" class="ldd-cloud-secondary">← Trò chơi</button>
 <div><h3>☁️ TÌM TỪ CÒN THIẾU</h3><p>Chọn đúng một từ giữa đám mây lộn xộn để hoàn thiện câu.</p></div></div>
 <p id="ldd-cloud-notice" class="ldd-cloud-notice" role="status" aria-live="polite"></p>
 <div id="ldd-cloud-entry" class="ldd-cloud-entry">
   <div class="ldd-cloud-box"><h4>🎮 Tạo phòng</h4><p>30 lượt · 2–4 người. Ai chạm đúng trước nhận 1 điểm.</p>
     <label class="ldd-cloud-topic-field">Chủ đề từ vựng
       <select id="ldd-cloud-topic"><option value="">Đang tải chủ đề…</option></select></label>
     <button type="button" id="ldd-cloud-create" class="ldd-cloud-primary">Tạo phòng 30 câu</button>
   </div>
   <div class="ldd-cloud-box"><h4>🔑 Tham gia</h4><p>Cùng phòng, cùng bộ câu hỏi trên mọi thiết bị.</p>
     <div class="ldd-cloud-code-line"><input id="ldd-cloud-code" maxlength="6" placeholder="MÃ PHÒNG" autocomplete="off" aria-label="Mã phòng">
       <button type="button" id="ldd-cloud-join" class="ldd-cloud-primary">Vào phòng</button></div>
   </div>
 </div>
 <div id="ldd-cloud-lobby" class="ldd-cloud-lobby" hidden>
   <div class="ldd-cloud-room-top"><div>MÃ PHÒNG<strong id="ldd-cloud-room-code"></strong></div>
     <button type="button" id="ldd-cloud-copy" class="ldd-cloud-secondary">Sao chép mã</button></div>
   <p id="ldd-cloud-lobby-hint"></p><div id="ldd-cloud-roster" class="ldd-cloud-roster"></div>
   <div class="ldd-cloud-actions"><button type="button" id="ldd-cloud-start" class="ldd-cloud-primary">🚀 Bắt đầu</button>
     <button type="button" id="ldd-cloud-leave" class="ldd-cloud-secondary">Rời phòng</button></div>
 </div>
 <div id="ldd-cloud-playing" hidden>
   <div class="ldd-cloud-round-head"><strong id="ldd-cloud-round"></strong><span id="ldd-cloud-topic-label"></span></div>
   <div id="ldd-cloud-scores" class="ldd-cloud-scores"></div>
   <div class="ldd-cloud-question"><small id="ldd-cloud-kind"></small>
     <div id="ldd-cloud-sentence" class="ldd-cloud-sentence"></div><p id="ldd-cloud-hint"></p></div>
   <div id="ldd-cloud-words" class="ldd-cloud-words" aria-label="Nhấn chọn từ đúng"></div>
   <p id="ldd-cloud-feedback" class="ldd-cloud-feedback" role="status" aria-live="polite"></p>
 </div>
 <div id="ldd-cloud-finished" class="ldd-cloud-finished" hidden>
   <div class="ldd-cloud-trophy">🏆</div><h3>HOÀN THÀNH 30 CÂU!</h3>
   <p>Người trả lời đúng nhanh nhất mỗi lượt nhận 1 điểm chăm chỉ.</p>
   <div id="ldd-cloud-results"></div>
   <button type="button" id="ldd-cloud-again" class="ldd-cloud-primary">Tạo ván mới</button>
 </div></div>`;
 grid.insertAdjacentElement('afterend',view);
 if(window.LDDGameGrammar)window.LDDGameGrammar.mount('cloud','ldd-cloud-topic');
 card.addEventListener('click',openPanel);
 $('ldd-cloud-back').addEventListener('click',()=>closePanel(false));
 $('ldd-cloud-create').addEventListener('click',createRoom);
 $('ldd-cloud-join').addEventListener('click',joinRoom);
 $('ldd-cloud-code').addEventListener('input',e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-F0-9]/g,'').slice(0,6);});
 $('ldd-cloud-code').addEventListener('keydown',e=>{if(e.key==='Enter')joinRoom();});
 $('ldd-cloud-start').addEventListener('click',startRoom);
 $('ldd-cloud-leave').addEventListener('click',leaveRoom);
 $('ldd-cloud-again').addEventListener('click',resetRoom);
 $('ldd-cloud-copy').addEventListener('click',async()=>{if(!room)return;try{await navigator.clipboard.writeText(room.code);notify('Đã sao chép mã phòng.','success');}catch(_){notify('Mã phòng: '+room.code);}});
 document.addEventListener('visibilitychange',()=>{if(!opened)return;if(document.hidden)stopLive();else resume();});
 window.addEventListener('online',()=>{if(opened&&room)resume();});
 document.addEventListener('click',e=>{
  if(!opened||!e.target.closest)return;
  const nav=e.target.closest('[data-main-target]');if(nav&&nav.dataset.mainTarget!=='tab-giai-tri')closePanel(false);
  const other=e.target.closest('.folder-card');if(other&&other.id!=='ldd-cloud-card')closePanel(true);
 },true);
}
function stopLive(){
 clearInterval(liveTimer);liveTimer=0;clearInterval(lobbyTimer);lobbyTimer=0;
 if(channel&&sb){sb.removeChannel(channel);channel=null;}
}
function closePanel(keepHidden){
 opened=false;stopLive();$('ldd-cloud-panel').hidden=true;
 if(!keepHidden)$('entertainment-games-grid').style.display='';
}
async function openPanel(){
 if(opened)return;opened=true;$('entertainment-games-grid').style.display='none';$('ldd-cloud-panel').hidden=false;
 render();notify('Đang kiểm tra tài khoản…');
 try{
  await identity();await loadTopics();
  if(!room){
   const old=localStorage.getItem(storeKey());
   if(old&&/^[A-F0-9]{6}$/.test(old)){try{await attachCode(old);}catch(_){localStorage.removeItem(storeKey());}}
  }
  if(room)await resume();else{render();notify('Chọn nội dung để tạo phòng hoặc nhập mã tham gia.');}
 }catch(e){notify(translateErr(e),'error');}
}
async function loadTopics(){
 const select=$('ldd-cloud-topic');if(select.dataset.loaded==='1')return;
 const list=await window.LDDCloudBank.topics(),all=window.LDDCloudBank.vocabulary(list);
 select.replaceChildren();
 const top=document.createElement('option');top.value='__mixed';top.textContent='🌎 Tổng hợp các chủ đề ('+all.length+' từ)';select.appendChild(top);
 list.forEach(t=>{
  const n=window.LDDCloudBank.fromTopic(t).length,option=document.createElement('option');
  option.value=String(t.id||'');option.textContent=(t.icon||'📚')+' '+(t.title||'Chủ đề')+' ('+n+' từ)';
  option.disabled=!option.value||n<30;select.appendChild(option);
 });
 select.value='__mixed';select.dataset.loaded='1';
}
function setRoom(r){
 if(!cloud(r))throw Error('Mã phòng thuộc một trò chơi khác.');
 const changed=!room||room.id!==r.id;room=r;localStorage.setItem(storeKey(),room.code);
 if(changed){shots.clear();players=[];shown=-1;pending=false;}
 render();
}
async function createRoom(){
 if(busy)return;busy=true;$('ldd-cloud-create').disabled=true;
 try{
  if(!me)await identity();
  const grammar=window.LDDGameGrammar&&window.LDDGameGrammar.isGrammar('cloud');
  notify('Đang tạo 30 câu hỏi…');
  const bank=grammar?window.LDDCloudBank.makeGrammar(window.LDDGameGrammar.selectedGrade('cloud')):
   window.LDDCloudBank.makeVocabulary(await window.LDDCloudBank.topics(),$('ldd-cloud-topic').value);
  const validated=window.LDDCloudBank.markRoom(bank);
  const {data,error}=await client().rpc('ldd_cloud_create',{p_words:validated.words,p_topic:validated.topic,p_name:me.name});
  if(error)throw error;stopLive();setRoom(data);players=[{user_id:me.id,display_name:me.name,slot:1}];
  notify('Đã tạo phòng! Mời 1–3 người vào cùng mã.','success');await resume();
 }catch(e){notify(translateErr(e),'error');}
 finally{busy=false;$('ldd-cloud-create').disabled=false;}
}
async function attachCode(code){
 if(!me)await identity();
 const {data,error}=await client().rpc('ldd_cloud_join',{p_code:code,p_name:me.name});
 if(error)throw error;stopLive();setRoom(data);
}
async function joinRoom(){
 if(busy)return;const code=$('ldd-cloud-code').value.trim().toUpperCase();
 if(!/^[A-F0-9]{6}$/.test(code))return notify('Mã phòng gồm 6 chữ/số từ A–F và 0–9.','error');
 busy=true;$('ldd-cloud-join').disabled=true;
 try{await attachCode(code);notify('Đã vào phòng!','success');await resume();sendJoin();}
 catch(e){notify(translateErr(e),'error');}
 finally{busy=false;$('ldd-cloud-join').disabled=false;}
}
function subscribe(){
 if(!room||channel||!opened||document.hidden)return;const id=room.id;
 channel=client().channel('ldd-cloud-'+id,{config:{broadcast:{ack:true}}})
 .on('postgres_changes',{event:'INSERT',schema:'public',table:'ldd_shooter_claims',filter:'room_id=eq.'+id},p=>{
  if(p.new&&p.new.room_id===id)applyShot(p.new);
 })
 .on('postgres_changes',{event:'*',schema:'public',table:'ldd_shooter_players',filter:'room_id=eq.'+id},()=>snapshot())
 .on('postgres_changes',{event:'UPDATE',schema:'public',table:'ldd_shooter_rooms',filter:'id=eq.'+id},p=>{
  if(!room||!p.new||p.new.id!==id)return;
  room=p.new;render();if(room.status==='finished')snapshot();
 })
 .on('broadcast',{event:'cloud-joined'},()=>snapshot())
 .subscribe(status=>{
  if(status==='SUBSCRIBED'){snapshot();sendJoin();}
  if(status==='CHANNEL_ERROR'||status==='TIMED_OUT')notify('Kết nối trực tiếp gián đoạn.','error');
 });
}
function sendJoin(){if(!channel||!room)return;const p=channel.send({type:'broadcast',event:'cloud-joined',payload:{room:room.id}});if(p&&p.catch)p.catch(()=>{});}
async function snapshot(){
 if(!room||refreshing||!sb)return;refreshing=true;const id=room.id;
 try{
  const [a,b]=await Promise.all([
    sb.from('ldd_shooter_players').select('room_id,user_id,slot,display_name').eq('room_id',id).order('slot').limit(4),
    sb.from('ldd_shooter_claims').select('room_id,word_index,user_id,claimed_at').eq('room_id',id).limit(30)
  ]);
  if(a.error)throw a.error;if(b.error)throw b.error;
  if(!room||room.id!==id)return;
  players=a.data||[];for(const s of b.data||[])shots.set(Number(s.word_index),s);
  render();
 }catch(e){notify('Không tải được danh sách người chơi: '+translateErr(e),'error');}
 finally{refreshing=false;}
}
async function sync(){
 if(!room||syncBusy||!opened||document.hidden)return;
 syncBusy=true;const id=room.id;
 try{
  const {data,error}=await client().rpc('ldd_cloud_join',{p_code:room.code,p_name:me.name});
  if(error)throw error;if(!room||room.id!==id)return;
  if(cloud(data)){room=data;render();}await snapshot();
 }catch(e){notify('Lỗi đồng bộ: '+translateErr(e),'error');}
 finally{syncBusy=false;}
}
async function resume(){
 if(!room||!opened||document.hidden)return;
 subscribe();await sync();
 clearInterval(liveTimer);liveTimer=setInterval(()=>{if(room&&room.status==='playing'&&opened&&!document.hidden){render();}},350);
 clearInterval(lobbyTimer);lobbyTimer=setInterval(()=>{
  if(!opened||document.hidden||!room)return;
  if(room.status==='lobby')sync();else if(room.status==='playing')sync();
 },room.status==='lobby'?1800:12000);
}
async function startRoom(){
 if(!room||!me||busy||room.host_user_id!==me.id)return;busy=true;$('ldd-cloud-start').disabled=true;
 try{
  const {data,error}=await client().rpc('ldd_shooter_start',{p_room:room.id});
  if(error)throw error;room=data;render();notify('Bắt đầu! Hãy chọn từ đúng nhanh nhất.','success');await resume();
 }catch(e){notify(translateErr(e),'error');}
 finally{busy=false;$('ldd-cloud-start').disabled=false;}
}
function nextIndex(){for(let i=0;i<30;i++)if(!shots.has(i))return i;return 30;}
function render(){
 if(!$('ldd-cloud-entry'))return;
 $('ldd-cloud-entry').hidden=!!room;
 $('ldd-cloud-lobby').hidden=!room||room.status!=='lobby';
 $('ldd-cloud-playing').hidden=!room||room.status!=='playing';
 $('ldd-cloud-finished').hidden=!room||room.status!=='finished';
 if(!room)return;
 if(room.status==='lobby')renderLobby();
 if(room.status==='playing')renderPlaying();
 if(room.status==='finished')renderFinished();
}
function renderLobby(){
 $('ldd-cloud-room-code').textContent=room.code;
 $('ldd-cloud-lobby-hint').textContent=(room.topic_title||'')+' · '+players.length+'/4 người · '+(players.length<2?'Cần thêm ít nhất 1 người':'Có thể bắt đầu');
 $('ldd-cloud-start').hidden=!(me&&room.host_user_id===me.id);
 const out=$('ldd-cloud-roster');out.replaceChildren();
 for(let i=1;i<=4;i++){
  const p=players.find(x=>Number(x.slot)===i),item=document.createElement('div');item.className='ldd-cloud-person';
  const name=document.createElement('strong');name.textContent=p?p.display_name||'Học viên':'Chỗ trống';
  const note=document.createElement('small');note.textContent=p?(p.user_id===room.host_user_id?'Chủ phòng':'Người chơi '+i):'Đang chờ';
  item.append(name,note);out.appendChild(item);
 }
}
function scoreMap(){const m=new Map(players.map(p=>[p.user_id,0]));shots.forEach(s=>m.set(s.user_id,(m.get(s.user_id)||0)+1));return m;}
function renderScores(){
 const m=scoreMap(),out=$('ldd-cloud-scores');out.replaceChildren();
 for(const p of players){
  const chip=document.createElement('div');chip.className='ldd-cloud-score'+(me&&p.user_id===me.id?' own':'');
  const name=document.createElement('span');name.textContent=p.display_name||'Học viên';
  const score=document.createElement('b');score.textContent=m.get(p.user_id)||0;chip.append(name,score);out.appendChild(chip);
 }
}
function renderSentence(q,answer){
 const el=$('ldd-cloud-sentence');el.replaceChildren();
 String(q.prompt||'').split('____').forEach((part,i,list)=>{
  el.appendChild(document.createTextNode(part));
  if(i<list.length-1){const blank=document.createElement('mark');blank.className='ldd-cloud-blank';blank.textContent=answer||' ? ';el.appendChild(blank);}
 });
}
function renderPlaying(){
 renderScores();const current=nextIndex();if(current>=30)return;
 const start=Date.parse(room.started_at||0);
 if(start>Date.now()){
  $('ldd-cloud-round').textContent='Chuẩn bị '+Math.ceil((start-Date.now())/1000)+' giây';
  $('ldd-cloud-words').replaceChildren();$('ldd-cloud-sentence').textContent='Cả phòng chuẩn bị chọn từ!';return;
 }
 const q=room.word_list[current];if(!q)return;
 $('ldd-cloud-round').textContent='Câu '+(current+1)+'/30';
 $('ldd-cloud-topic-label').textContent=room.topic_title||'';
 $('ldd-cloud-kind').textContent=q.cloud_mode==='grammar'?'✏️ Ngữ pháp':'📖 Từ vựng';
 if(shown===current)return;shown=current;pending=false;
 $('ldd-cloud-feedback').textContent='Chọn một từ trong đám mây để hoàn thiện câu.';
 $('ldd-cloud-hint').textContent=q.hint||q.vi||'';
 renderSentence(q,null);
 const out=$('ldd-cloud-words');out.replaceChildren();
 const tones=['blue','purple','teal','gold','rose','green'];
 q.choices.forEach((value,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='ldd-cloud-word';btn.textContent=value;
  btn.style.setProperty('--word-size',(13+((i*17+current*13+Number(room.seed||0))%17))+'px');
  btn.style.setProperty('--word-turn',(((i*7+current*3)%13)-6)+'deg');
  btn.style.setProperty('--word-lift',(((i*3+current)%11)-5)+'px');
  btn.dataset.tone=tones[(i+current)%tones.length];
  btn.addEventListener('click',()=>selectWord(btn,value,current));out.appendChild(btn);
 });
}
async function selectWord(button,value,index){
 if(!room||room.status!=='playing'||pending||index!==nextIndex()||Date.now()<Date.parse(room.started_at||0))return;
 const q=room.word_list[index];
 if(norm(q.en)!==norm(value)){
  button.classList.remove('wrong');void button.offsetWidth;button.classList.add('wrong');
  $('ldd-cloud-feedback').textContent='Chưa đúng! Hãy chọn từ khác.';return;
 }
 pending=true;
 $('ldd-cloud-feedback').textContent='🎯 Đúng rồi! Đang xác nhận điểm…';
 $('ldd-cloud-words').querySelectorAll('button').forEach(b=>b.disabled=true);
 try{
  const {data,error}=await client().rpc('ldd_shooter_claim',{p_room:room.id,p_word_index:index,p_typed:value});
  if(error)throw error;
  if(data&&data.ok)applyShot({room_id:room.id,word_index:index,user_id:me.id,claimed_at:new Date().toISOString()});
  else{
   $('ldd-cloud-feedback').textContent='⚡ Có người chọn nhanh hơn, đang chuyển câu…';await sync();
  }
 }catch(e){notify('Lỗi chấm điểm: '+translateErr(e),'error');await sync();}
 finally{
  pending=false;
  if(room&&room.status==='playing'&&nextIndex()===index)
   $('ldd-cloud-words').querySelectorAll('button').forEach(b=>b.disabled=false);
 }
}
function applyShot(s){
 if(!room||s.room_id!==room.id)return;const i=Number(s.word_index);
 if(!Number.isInteger(i)||i<0||i>=30||shots.has(i))return;
 shots.set(i,s);
 if(shown===i){
  const q=room.word_list[i];renderSentence(q,q.en);
  $('ldd-cloud-feedback').textContent=(me&&s.user_id===me.id?'🎯 Bạn nhanh nhất! +1 điểm':'⚡ Một người chơi đã trả lời đúng!')+' '+q.en;
 }
 shown=-1;render();
}
function renderFinished(){
 const m=scoreMap(),out=$('ldd-cloud-results');out.replaceChildren();
 players.slice().sort((a,b)=>(m.get(b.user_id)||0)-(m.get(a.user_id)||0)).forEach((p,i)=>{
  const div=document.createElement('div');div.className='ldd-cloud-result';
  const name=document.createElement('span');name.textContent=(['🥇','🥈','🥉','🏅'][i]||'🏅')+' '+(p.display_name||'Học viên');
  const score=document.createElement('strong');score.textContent=(m.get(p.user_id)||0)+' điểm';
  div.append(name,score);out.appendChild(div);
 });
}
async function leaveRoom(){
 if(!room)return;const old=room;resetRoom();
 if(old.status==='lobby'){try{await client().rpc('ldd_shooter_leave',{p_room:old.id});}catch(_){}}
}
function resetRoom(){
 stopLive();if(me)localStorage.removeItem(storeKey());
 room=null;players=[];shots.clear();shown=-1;pending=false;render();notify('Chọn nội dung và tạo phòng mới.');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();