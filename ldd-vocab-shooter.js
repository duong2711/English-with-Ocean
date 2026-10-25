/* LDD English — Bắn từ vựng (2–4 học viên, 30 từ, Realtime ít egress).
 * The server arbitrates claims and diligence points; animations and falling words are LOCAL.
 * Timing is paired with ldd_shooter_claim/finish; old rooms keep legacy timing.
 */
(function () {
 'use strict';
 if (window.__LDDVocabShooterV1) return;
 window.__LDDVocabShooterV1 = true;
 const URL = 'https://ywqbaksmmtvwbojcgsdd.supabase.co';
 const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
 const WORD_COUNT = 30;
 const SLOW_TIMING_FROM = Date.parse('2026-10-25T08:35:37.582080Z');
 function slowTiming(){return room && Date.parse(room.created_at)>=SLOW_TIMING_FROM;}
 function spawnInterval(){return slowTiming()?4000:2200;}
 function fallDuration(word){return slowTiming()?20000+Math.max(0,Array.from(String(word||'').trim()).length-4)*1200:12000;}
 function lastEnd(){return Math.max(...(room.word_list||[]).map((w,i)=>i*spawnInterval()+fallDuration(w.en)));}
 const ICONS = ['🚀','🛸','🦾','🛰️'];
 const $ = id => document.getElementById(id);
 const esc = text => String(text == null ? '' : text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const normalize = str => String(str || '').trim().replace(/\s+/g,' ').toLocaleLowerCase('en');
 let sb = null, me = null, room = null, roster = [], shots = new Map(), channel = null;
 let offset = 0, frame = 0, finishPending = false, panelOpen = false, refreshBusy = false;
 let pending = new Set(), nodes = new Map(), activeWords = [], uiMode = '', lastShotText = '';
 let hasSubscribed = false, lastFinishAttempt = 0, visualCountdown = -1;
 let needsRoomRefresh = false, resumeBusy = false;
 let optimisticShots = new Set(), rosterRefreshTimer = null, mobileNativeKeyboard = true;
 let lobbySyncTimer = null, rosterEventVersion = 0, pendingJoinNotice = false;
 let rosterLoadedRevision = -1;

 function addUI() {
   const grid = $('entertainment-folder-grid');
   if (!grid || $('shooter-folder-card')) return;
   const card = document.createElement('div');
   card.id = 'shooter-folder-card'; card.className = 'folder-card';
   card.innerHTML = '<span class="shooter-folder-emoji">🔫</span><span><strong>Bắn từ vựng</strong><small>2–4 người · 30 từ rơi · gõ để bắn</small></span>';
   grid.appendChild(card);

   const panel = document.createElement('section');
   panel.id = 'shooter-panel'; panel.style.display = 'none';
   panel.innerHTML = [
    '<div class="shooter-shell">',
      '<div class="shooter-head">',
        '<button type="button" id="shooter-back" class="shooter-back">← Quay lại</button>',
        '<div><h3>🔫 BẮN TỪ VỰNG</h3><p>Gõ đúng nhanh nhất để bắn hạ từ đang rơi và nhận +1 điểm chăm chỉ.</p></div>',
        '<button type="button" id="shooter-full" class="shooter-ghost shooter-full">⛶ Toàn màn hình</button>',
      '</div>',
      '<div class="shooter-info" id="shooter-info" role="status" aria-live="polite"></div>',
      '<div class="shooter-entry" id="shooter-entry">',
        '<div class="shooter-box"><h4>🎮 Tạo phòng chơi</h4>',
         '<p>Chọn số người và bộ từ vựng. Cả phòng cùng nhìn thấy 30 từ giống nhau, rơi theo cùng nhịp.</p>',
         '<p class="shooter-room-note">Phòng tối đa 4 người. Có từ 2 người là chủ phòng có thể bắt đầu.</p>',
         '<label class="shooter-field">Chủ đề từ vựng<select id="shooter-topic"><option value="">Đang đọc chủ đề…</option></select></label>',
         '<button type="button" class="shooter-primary" id="shooter-create">Tạo phòng 30 từ</button>',
        '</div>',
        '<div class="shooter-box"><h4>🔑 Tham gia phòng</h4>',
         '<p>Nhập mã phòng từ bạn bè. Bạn có thể dùng máy tính hoặc điện thoại, mỗi người một tài khoản.</p>',
         '<div class="shooter-code-row"><input class="shooter-code" id="shooter-code-input" maxlength="6" autocomplete="off" placeholder="MÃ PHÒNG" aria-label="Mã phòng">',
         '<button type="button" class="shooter-primary" id="shooter-join">Vào phòng</button></div>',
        '</div>',
      '</div>',
      '<div id="shooter-lobby" class="shooter-room" hidden>',
        '<div class="shooter-room-top"><div><span class="shooter-room-kicker">MÃ PHÒNG · CHIA SẺ CHO BẠN</span>',
        '<strong class="shooter-room-code" id="shooter-room-code">------</strong></div>',
        '<button type="button" class="shooter-ghost" id="shooter-copy">📋 Sao chép mã</button></div>',
        '<div class="shooter-room-note" id="shooter-lobby-heading">Đang chờ người chơi…</div>',
        '<div class="shooter-roster" id="shooter-roster"></div>',
        '<div class="shooter-room-buttons"><button class="shooter-primary" type="button" id="shooter-start">🚀 Bắt đầu</button>',
         '<button class="shooter-ghost" type="button" id="shooter-leave">Rời phòng</button></div>',
        '<p class="shooter-room-note">Chủ phòng có thể bắt đầu khi có 2, 3 hoặc 4 người tham gia.</p>',
      '</div>',
      '<div id="shooter-game" hidden>',
         '<div class="shooter-hud"><div class="shooter-match-title" id="shooter-match-title">🎯 Đấu trường từ vựng</div>',
         '<div class="shooter-progress" id="shooter-progress">0 / 30 từ</div></div>',
         '<div class="shooter-track"><span id="shooter-track-bar"></span></div>',
         '<div id="shooter-scoreboard" class="shooter-scoreboard"></div>',
         '<div id="shooter-stage" class="shooter-stage">',
           '<div id="shooter-words-layer"></div>',
           '<div class="shooter-turret">🔫</div>',
           '<div id="shooter-overlay" class="shooter-overlay" hidden></div>',
         '</div>',
         '<div class="shooter-controls">',
            '<label for="shooter-answer">⌨️ Gõ từ tiếng Anh đang rơi để bắn ngay (không cần Enter)</label>',
            '<input id="shooter-answer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="Gõ từ đang rơi…" maxlength="65">',
            '<div class="shooter-mobile-toolbar" id="shooter-mobile-toolbar" hidden><strong>⌨️ Phím gọn</strong><button type="button" id="shooter-input-mode">Bàn phím điện thoại</button></div>',
             '<div id="shooter-keyboard" class="shooter-keyboard" hidden></div>',
             '<p class="shooter-hint">Ai hoàn thành chính xác trước sẽ nhận 1 điểm chăm chỉ. Từ trúng đạn biến mất trên mọi màn hình.</p>',
            '<div class="shooter-feedback" id="shooter-feedback" aria-live="polite"></div>',
         '</div>',
      '</div>',
      '<div id="shooter-finish" class="shooter-finish" hidden>',
         '<div class="shooter-medal">🏆</div><h3>ĐÃ KẾT THÚC 30 TỪ!</h3>',
         '<p>Đã thả đủ 30 từ. Mỗi từ bắn trúng đầu tiên được cộng <b>+1 điểm chăm chỉ</b>.</p>',
         '<div class="shooter-results" id="shooter-results"></div>',
         '<button type="button" class="shooter-primary" id="shooter-new">🎮 Chơi ván mới</button>',
      '</div>',
    '</div>'
   ].join('');
   grid.insertAdjacentElement('afterend', panel);
   card.addEventListener('click', openPanel);
   $('shooter-back').addEventListener('click', () => closePanel(false));
   $('shooter-full').addEventListener('click', toggleFullscreen);
   $('shooter-create').addEventListener('click', createGame);
   $('shooter-join').addEventListener('click', joinGame);
   $('shooter-code-input').addEventListener('keydown', e => {if(e.key==='Enter') joinGame();});
   $('shooter-code-input').addEventListener('input',e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-F0-9]/g,'').slice(0,6);});
   $('shooter-copy').addEventListener('click',copyCode);
   $('shooter-start').addEventListener('click',startGame);
   $('shooter-leave').addEventListener('click',leaveLobby);
   $('shooter-new').addEventListener('click',newGame);
   $('shooter-answer').addEventListener('input', e => { if (!e.isComposing) typeWord(); });
   $('shooter-answer').addEventListener('compositionend',typeWord);
   $('shooter-answer').addEventListener('change',typeWord);
   $('shooter-answer').addEventListener('keydown',e=>{
     if(e.key==='Enter'){e.preventDefault();typeWord();}
   });
   if(window.visualViewport){
     window.visualViewport.addEventListener('resize',updateMobileViewport,{passive:true});
     window.visualViewport.addEventListener('scroll',updateMobileViewport,{passive:true});
   }
   window.addEventListener('resize',updateMobileViewport,{passive:true});
   window.addEventListener('orientationchange',updateMobileViewport,{passive:true});
   $('shooter-stage').addEventListener('pointerdown',()=>{if(room && room.status==='playing' && !$('shooter-panel').classList.contains('is-shooter-mobile-playing'))$('shooter-answer').focus({preventScroll:true});});
   document.addEventListener('visibilitychange',onVisibility);
   window.addEventListener('online',onVisibility);
   document.addEventListener('fullscreenchange',syncFullscreen);
   document.addEventListener('click',e=>{
     if(!panelOpen || !e.target || !e.target.closest) return;
     const nav = e.target.closest('[data-main-target]');
     if(nav && nav.getAttribute('data-main-target')!=='tab-giai-tri'){closePanel(false);return;}
     const other = e.target.closest('.folder-card');
     if(other && other.id !== 'shooter-folder-card') closePanel(true);
   },true);
 }

 function updateMobileViewport(){
   const p=$('shooter-panel');
   if(!p || !p.classList.contains('is-shooter-mobile-playing'))return;
   const vv=window.visualViewport;
   p.style.setProperty('--shooter-vvh',Math.round(vv&&vv.height||window.innerHeight)+'px');
   p.style.setProperty('--shooter-vvtop',Math.max(0,Math.round(vv&&vv.offsetTop||0))+'px');
 }
 function syncMobileLayout(){
   const p=$('shooter-panel'),input=$('shooter-answer');
   if(!p || !input)return;
   const mobile=!!(room&&room.status==='playing'&&panelOpen&&window.matchMedia&&window.matchMedia('(max-width:740px)').matches);
   p.classList.toggle('is-shooter-mobile-playing',mobile);
   document.body.classList.remove('ldd-shooter-lock-scroll');
   $('shooter-mobile-toolbar').hidden=!mobile;
   $('shooter-keyboard').hidden=true;
   $('shooter-input-mode').hidden=true;
   input.readOnly=false;
   input.setAttribute('inputmode','text');
   if(mobile)updateMobileViewport();
   else {p.style.removeProperty('--shooter-vvh');p.style.removeProperty('--shooter-vvtop');}
 }
 function info(message,level) {
   const el=$('shooter-info'); if(!el) return;
   el.textContent=message||'';el.className='shooter-info'+(level?' is-'+level:'');
 }
 function errText(error) {
   const raw=String(error && error.message || error || '');
   const labels={not_authenticated:'Hãy đăng nhập để chơi.',need_30_words:'Phải chọn đủ 30 từ.',
     invalid_words:'Bộ từ có dữ liệu không hợp lệ.',create_too_fast:'Bạn đã tạo quá nhiều phòng trong thời gian ngắn.',
     room_not_found:'Không tìm thấy mã phòng.',room_full:'Phòng đã đủ người.',
     room_already_started:'Phòng đã bắt đầu.',need_full_room:'Chưa đủ số người chơi.',
     host_only:'Chỉ chủ phòng có thể bắt đầu.',need_2_to_4_players:'Cần từ 2 đến 4 người tham gia trước khi bắt đầu.',not_in_room:'Bạn không thuộc phòng này.'};
   for(const key in labels) if(raw.includes(key)) return labels[key];
   return raw || 'Đã xảy ra lỗi kết nối. Vui lòng thử lại.';
 }
 function ensureClient() {
   if(sb) return sb;
   if(!window.supabase || !window.supabase.createClient) throw Error('Chưa tải xong kết nối đăng nhập.');
   sb=window.supabase.createClient(URL,ANON,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
   return sb;
 }
 async function identity(){
   const client=ensureClient();
   const {data,error}=await client.auth.getSession();
   if(error) throw error;
   const user=data && data.session && data.session.user;
   if(!user) {me=null;return null;}
   const byPage=String(($('account-display-name')||{}).textContent||'').trim();
   me={id:user.id,name:(byPage && byPage!=='Học viên'?byPage:
     user.user_metadata && (user.user_metadata.display_name||user.user_metadata.full_name||user.user_metadata.name))||
     (user.email||'Học viên').split('@')[0]};
   return me;
 }
 function topicWords(topic) {
   const map=new Map();
   (topic && topic.words || []).forEach(w=>{
     const en=String(w && (w.en||w.word)||'').trim();
     const vi=String(w && (w.vi||w.meaning)||'').trim();
     if(en.length>=2 && en.length<=55 && vi && !map.has(normalize(en))) map.set(normalize(en),{en:en,vi:vi.slice(0,120)});
   });
   return [...map.values()];
 }
 async function getTopics(){
   for(let i=0;i<35;i++){
     if(window.kidTopicsAPI && typeof window.kidTopicsAPI.getTopics==='function')
       return window.kidTopicsAPI.getTopics()||[];
     await new Promise(r=>setTimeout(r,100));
   }
   throw Error('Chưa tải được danh sách từ vựng ở mục Vận dụng.');
 }
 async function setupTopicList(){
   const select=$('shooter-topic');
   if(select.dataset.loaded==='1') return;
   try {
     const topics=await getTopics();
     const all=new Map();topics.forEach(t=>topicWords(t).forEach(w=>all.set(normalize(w.en),w)));
     select.innerHTML='<option value="__mixed">🌍 Tổng hợp nhiều chủ đề ('+all.size+' từ)</option>';
     topics.forEach(t=>{
       const count=topicWords(t).length;
       const option=document.createElement('option');
       option.value=String(t.id||'');
       option.textContent=String(t.icon||'📚')+' '+String(t.title||t.id||'Chủ đề')+' ('+count+' từ)';
       option.disabled=count<WORD_COUNT || !option.value;
       select.appendChild(option);
     });
     if(all.size<WORD_COUNT) throw Error('Kho từ vựng chưa có đủ 30 từ hợp lệ.');
     select.dataset.loaded='1';
   }catch(e){info(errText(e),'error'); select.innerHTML='<option>Không tải được bộ từ vựng</option>';}
 }
 function shuffle(arr) {
   const result=arr.slice();
   for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
   return result;
 }
 async function makeWords(topicId){
   const topics=await getTopics();
   const title=topicId==='__mixed'?'Tổng hợp nhiều chủ đề':((topics.find(t=>String(t.id)===topicId)||{}).title||'Chủ đề');
   const pool=topicId==='__mixed'
      ? topics.flatMap(topicWords)
      : topicWords(topics.find(t=>String(t.id)===topicId));
   const unique=new Map();
   pool.forEach(w=>{if(!unique.has(normalize(w.en)))unique.set(normalize(w.en),w);});
   if(unique.size<30) throw Error('Chủ đề chưa có đủ 30 từ khác nhau. Hãy chọn Tổng hợp nhiều chủ đề.');
   return {words:shuffle([...unique.values()]).slice(0,30),topic:String(title)};
 }
 async function openPanel(){
   panelOpen=true;
   $('entertainment-folder-grid').style.display='none';
   $('shooter-panel').style.display='block';
   try{
     await identity();
     if(!me){info('Bạn cần đăng nhập tài khoản học viên để tham gia.','error');return;}
     await setupTopicList();
     const saved=localStorage.getItem('ldd-shooter-room-'+me.id);
     if(!room && saved && /^[A-F0-9]{6}$/.test(saved)){
       await enterRoom(saved,true);
     }else{
       render();if(room) resumeRoom();else info('Tạo phòng hoặc nhập mã phòng để bắt đầu.');
     }
   }catch(e){info(errText(e),'error');render();}
 }
 function closePanel(keepGridHidden){
   panelOpen=false;removeFullscreen();
   syncMobileLayout();
   $('shooter-panel').style.display='none';
   if(!keepGridHidden) $('entertainment-folder-grid').style.display='';
   unsubscribe();stopFrame();
 }
 function activePanel(){
   if(!panelOpen || document.hidden) return false;
   const p=$('shooter-panel');
   return !!(p && p.isConnected && p.getClientRects().length);
 }
 function unsubscribe() {
   if(channel && sb){sb.removeChannel(channel);channel=null;needsRoomRefresh=true;}
   hasSubscribed=false;
   clearTimeout(lobbySyncTimer);lobbySyncTimer=null;
   if(rosterRefreshTimer){clearTimeout(rosterRefreshTimer);rosterRefreshTimer=null;}
  }
  function stopFrame() {if(frame){cancelAnimationFrame(frame);frame=0;}}
 async function syncClock(){
   if(!sb || !room) return;
   const t0=Date.now();
   const {data,error}=await sb.rpc('ldd_shooter_server_time');
   const t1=Date.now();
   if(!error && data && Number.isFinite(Date.parse(data)))offset=Date.parse(data)-(t0+t1)/2;
 }
 function resetWordNodes(){
   nodes.clear();activeWords=[];
   const layer=$('shooter-words-layer');if(layer)layer.textContent='';
 }
 async function enterRoom(code,quiet){
   pendingJoinNotice=!quiet;
   try {
     const {data,error}=await sb.rpc('ldd_shooter_join',{p_code:code,p_name:me.name});
     if(error) throw error;
     setRoom(data);
     // Notify the host immediately; send() uses HTTP until the socket is ready.
     // The SUBSCRIBED callback repeats this signal to cover reconnect races.
     if(!quiet)sendJoinNotice();
     if(!quiet)info('Đã tham gia phòng!','success');
   }catch(e){
     if(quiet){localStorage.removeItem('ldd-shooter-room-'+me.id);room=null;render();return;}
     throw e;
   }
 }
 function setRoom(r){
   if(!r)return;
   const changed=!room || room.id!==r.id;
   room=r;
   if(changed){rosterLoadedRevision=-1;rosterEventVersion=0;clearTimeout(lobbySyncTimer);lobbySyncTimer=null;}
   localStorage.setItem('ldd-shooter-room-'+me.id,room.code);
   if(changed){roster=[];shots.clear();pending.clear();optimisticShots.clear();resetWordNodes();needsRoomRefresh=false;}
   render();
   if(panelOpen && !document.hidden) resumeRoom();
 }
 async function resumeRoom(){
   if(!room||!sb||!activePanel()||resumeBusy)return;
   resumeBusy=true;
   try{
     if(needsRoomRefresh){
       needsRoomRefresh=false;
       const id=room.id;
       const {data,error}=await sb.rpc('ldd_shooter_join',{p_code:room.code,p_name:me.name});
       if(!error && data && room && room.id===id)room=data;
     }
     if(!channel)subscribeRoom();
     scheduleLobbySync();
     await Promise.all([refreshSnapshot(),syncClock()]);
     render();playFrames();scheduleLobbySync();
   }finally{resumeBusy=false;}
 }
 function scheduleRosterRefresh(){
    // Coalesce player INSERT and room revision into one small SELECT, no polling.
    if(rosterRefreshTimer || !room || room.status!=='lobby')return;
    rosterRefreshTimer=setTimeout(()=>{
      rosterRefreshTimer=null;
      if(room && room.status==='lobby' && activePanel())refreshPlayers();
    },90);
  }
  // Only check tiny lobby rows, never stream gameplay frames or word lists.
  function scheduleLobbySync(){
   clearTimeout(lobbySyncTimer);lobbySyncTimer=null;
   if(!room || room.status!=='lobby' || !activePanel())return;
   const id=room.id;
   lobbySyncTimer=setTimeout(async()=>{
     lobbySyncTimer=null;
     if(!room || room.id!==id || room.status!=='lobby' || !activePanel())return;
     try{await refreshLobbyStatus(id);}finally{
       if(room && room.id===id)scheduleLobbySync();
     }
   },1500);
  }
  async function refreshLobbyStatus(id){
   const {data,error}=await sb.from('ldd_shooter_rooms')
     .select('id,status,started_at,roster_revision').eq('id',id).maybeSingle();
   if(error || !data || !room || room.id!==id)return;
   const oldRevision=Number(room.roster_revision||0);
   if(data.status!==room.status || Number(data.roster_revision||0)!==oldRevision){
     room=Object.assign({},room,data);
     render();
     if(room.status!=='lobby'){clearTimeout(lobbySyncTimer);lobbySyncTimer=null;await refreshSnapshot();playFrames();}
   }
   // A revision is acknowledged only after its roster query succeeds.
   if(room && room.id===id && room.status==='lobby' && rosterLoadedRevision!==Number(room.roster_revision||0))scheduleRosterRefresh();
  }
  function sendJoinNotice(){
   if(!channel || !room)return;
   const sent=channel.send({type:'broadcast',event:'shooter-joined',payload:{room_id:room.id}});
   if(sent && sent.catch)sent.catch(()=>{});
  }
  function subscribeRoom(){
   if(!room||channel)return;
   const id=room.id;
   channel=sb.channel('ldd-shooter-'+id,{config:{broadcast:{ack:true}}})
     .on('postgres_changes',{event:'*',schema:'public',table:'ldd_shooter_players',filter:'room_id=eq.'+id},p=>{
        if(!room || room.id!==id)return;
        rosterEventVersion++;
        if((p.eventType==='INSERT' || p.eventType==='UPDATE') && p.new && p.new.user_id){
          roster=roster.filter(x=>x.user_id!==p.new.user_id).concat(p.new).sort((a,b)=>a.slot-b.slot);
        }else if(p.eventType==='DELETE' && p.old && p.old.user_id){
          roster=roster.filter(x=>x.user_id!==p.old.user_id);
        }
        render();scheduleRosterRefresh();
      })
      .on('broadcast',{event:'shooter-joined'},()=>scheduleRosterRefresh())
     .on('postgres_changes',{event:'INSERT',schema:'public',table:'ldd_shooter_claims',filter:'room_id=eq.'+id},p=>{
       if(p.new && p.new.room_id===id)applyShot(p.new);
     })
     .on('postgres_changes',{event:'UPDATE',schema:'public',table:'ldd_shooter_rooms',filter:'id=eq.'+id},p=>{
       if(!p.new || !room || p.new.id!==room.id)return;
       const previousStatus=room.status;
        const previousRevision=Number(room.roster_revision||0);
        room=p.new;render();
        if(room.status==='lobby' && Number(room.roster_revision||0)!==previousRevision)scheduleRosterRefresh();
        if(room.status==='playing'){clearTimeout(lobbySyncTimer);lobbySyncTimer=null;playFrames();}else{stopFrame();scheduleLobbySync();}
       if(room.status==='finished' && previousStatus!=='finished')refreshSnapshot();
     })
     .subscribe(status=>{
       if(status==='SUBSCRIBED'){
         hasSubscribed=true;refreshSnapshot();scheduleRosterRefresh();scheduleLobbySync();
         if(pendingJoinNotice){
           pendingJoinNotice=false;
           sendJoinNotice();
         }
       }
       if(status==='CHANNEL_ERROR' || status==='TIMED_OUT')info('Kết nối trực tiếp gián đoạn. Hãy kiểm tra mạng.','error');
     });
 }
 async function refreshPlayers(){
   if(!room || !sb)return;
   const id=room.id,version=rosterEventVersion,revision=Number(room.roster_revision||0);
   const {data,error}=await sb.from('ldd_shooter_players').select('room_id,user_id,slot,display_name').eq('room_id',id).order('slot',{ascending:true}).limit(4);
   if(error){info(errText(error),'error');return;}
   if(room && id===room.id){
     if(version!==rosterEventVersion){scheduleRosterRefresh();return;}
     roster=data||[];rosterLoadedRevision=revision;render();
   }
 }
 async function refreshSnapshot(){
   if(!room || !sb || refreshBusy)return;
   const id=room.id,version=rosterEventVersion,revision=Number(room.roster_revision||0);refreshBusy=true;
   try{
     const results=await Promise.all([
       sb.from('ldd_shooter_players').select('room_id,user_id,slot,display_name').eq('room_id',id).order('slot',{ascending:true}).limit(4),
       sb.from('ldd_shooter_claims').select('room_id,word_index,user_id,claimed_at').eq('room_id',id).limit(30)
     ]);
     for(const r of results)if(r.error)throw r.error;
     if(!room || room.id!==id)return;
     if(version===rosterEventVersion){roster=results[0].data||[];rosterLoadedRevision=revision;}
     else scheduleRosterRefresh();
     (results[1].data||[]).forEach(applyShot);
     render();
   }catch(e){info('Không cập nhật được phòng: '+errText(e),'error');}
   finally{refreshBusy=false;}
 }
 function tally() {
   const scores=new Map(roster.map(p=>[p.user_id,0]));
   shots.forEach(s=>scores.set(s.user_id,(scores.get(s.user_id)||0)+1));
   return scores;
 }
 function applyShot(s){
   const idx=Number(s.word_index);
   if(!Number.isInteger(idx)||idx<0||idx>=WORD_COUNT)return;
    optimisticShots.delete(idx);
    if(shots.has(idx))return;
    shots.set(idx,s);pending.delete(idx);
   const el=nodes.get(idx);
   if(el){burst(el);el.remove();nodes.delete(idx);}
   if(me && s.user_id===me.id) {
     $('shooter-feedback').textContent='🎯 Chính xác! +1 điểm chăm chỉ';
     lastShotText='hit';
   } else if(lastShotText!=='hit') {
     $('shooter-feedback').textContent='⚡ Một bạn khác vừa bắn trúng!';
   }
   renderScores();
 }
 function render(){
   if(!$('shooter-entry'))return;
   const mode=room ? room.status : 'entry';
   if(uiMode!==mode){
     uiMode=mode;resetWordNodes();stopFrame();
   }
   $('shooter-entry').hidden=!!room;
   $('shooter-lobby').hidden=mode!=='lobby';
   $('shooter-game').hidden=mode!=='playing';
   $('shooter-finish').hidden=mode!=='finished';
   syncMobileLayout();
   if(!room)return;
   if(mode==='lobby'){
     $('shooter-room-code').textContent=room.code;
     $('shooter-lobby-heading').textContent=String(room.topic_title||'')+' · '+roster.length+'/'+room.capacity+' người';
     $('shooter-roster').innerHTML=Array.from({length:room.capacity},(_,i)=>{
       const p=roster.find(x=>x.slot===i+1);
       return '<div class="shooter-person'+(!p?' is-empty':'')+'"><span class="shooter-person-emoji">'+ICONS[i]+'</span><strong>'+
         (p?esc(p.display_name):'Đang chờ…')+'</strong><small>'+(p && p.user_id===room.host_user_id?'Chủ phòng':p?'Người chơi '+(i+1):'Chưa vào')+'</small></div>';
     }).join('');
     const owner=me && me.id===room.host_user_id;
     $('shooter-start').hidden=!owner;
     // Keep the host action available: the server checks the real player count,
     // even when a delayed Realtime packet leaves this screen at 1/4.
     $('shooter-start').disabled=false;
     info(roster.length>=2?'Có '+roster.length+' người, chủ phòng có thể bắt đầu.':'Cần tối thiểu 2 người để bắt đầu (tối đa '+room.capacity+').');
   } else {
     $('shooter-match-title').textContent='🎯 '+String(room.topic_title||'Bắn từ vựng');
     renderScores();
     if(mode==='finished')renderFinish();
     else if(activePanel())playFrames();
   }
 }
 function renderScores(){
   const board=$('shooter-scoreboard');
   if(!board || !room)return;
   const scores=tally();
   board.innerHTML=roster.map((p,i)=>
     '<div class="shooter-score-person'+(me && p.user_id===me.id?' is-me':'')+'"><span>'+
      ICONS[(p.slot-1)%4]+' <b title="'+esc(p.display_name)+'">'+esc(p.display_name)+'</b></span><strong>'+
      (scores.get(p.user_id)||0)+'</strong></div>').join('');
 }
 function renderFinish(){
   const sorted=roster.slice().sort((a,b)=>{
     const s=tally();return (s.get(b.user_id)||0)-(s.get(a.user_id)||0) || a.slot-b.slot;
   });
   const scores=tally();
   $('shooter-results').innerHTML=sorted.map((p,i)=>
     '<div><span>'+(i===0?'🥇':i===1?'🥈':i===2?'🥉':'🏅')+' '+esc(p.display_name)+
     (me && p.user_id===me.id?' (Bạn)':'')+'</span><strong>'+String(scores.get(p.user_id)||0)+
     ' từ · +'+String(scores.get(p.user_id)||0)+' điểm</strong></div>').join('')+
     '<p>Toàn phòng bắn trúng '+shots.size+'/30 từ. Từ rơi xuống chưa kịp gõ không có điểm.</p>';
   $('shooter-feedback').textContent='';
   info('Ván chơi hoàn thành. Điểm đã được cộng ngay khi mỗi từ được xác nhận.','success');
 }
 function getElapsed(){return room && room.started_at ? Date.now()+offset-Date.parse(room.started_at) : -99999;}
 function positionFor(index){
   const seed=Number(room.seed)||1234;
   const hash=n=>{const x=Math.sin(n*12.9898+seed*.00013)*43758.5453;return x-Math.floor(x);};
   const lane=(index*3+Math.floor(hash(index+3)*6))%6;
   return 10+lane*16+hash(index+51)*3;
 }
 function buildWord(index){
   const w=room.word_list && room.word_list[index];
   if(!w)return null;
   const el=document.createElement('div');
   el.className='shooter-word';el.dataset.index=index;el.style.left=positionFor(index)+'%';
   el.innerHTML='<b>'+esc(w.en)+'</b><small>'+esc(w.vi)+'</small>';
   $('shooter-words-layer').appendChild(el);nodes.set(index,el);
   return el;
 }
 function updateFrame(){
   frame=0;
   if(!room || room.status!=='playing'||!activePanel())return;
   const time=getElapsed();
   const overlay=$('shooter-overlay');
   if(time<0){
     const secs=Math.max(1,Math.ceil(-time/1000));
     if(visualCountdown!==secs){overlay.innerHTML='Chuẩn bị bắn!<div><em>'+secs+'</em></div>';visualCountdown=secs;}
     overlay.hidden=false;
     $('shooter-answer').disabled=true;
   }else{
     overlay.hidden=true;
     $('shooter-answer').disabled=false;
     if(visualCountdown!==0){
       visualCountdown=0;
       if(window.matchMedia && window.matchMedia('(pointer:fine)').matches)
         $('shooter-answer').focus({preventScroll:true});
     }
     activeWords=[];
     const height=$('shooter-stage').clientHeight - 92;
     for(let i=0;i<WORD_COUNT;i++){
       const delta=time-i*spawnInterval();
       const fall=fallDuration(room.word_list[i] && room.word_list[i].en);
       let el=nodes.get(i);
       const visible=delta>=0 && delta<=fall && !shots.has(i) && !optimisticShots.has(i);
       if(!visible){if(el){el.remove();nodes.delete(i);}continue;}
       if(!el)el=buildWord(i);
       if(!el)continue;
       const y=10+Math.min(1,delta/fall)*height;
       el.style.transform='translate3d(-50%,'+Math.round(y)+'px,0)';
       activeWords.push(i);
     }
     const spawned=Math.min(WORD_COUNT,Math.floor(time/spawnInterval())+1);
     $('shooter-progress').textContent=spawned+' / 30 từ đã thả';
     $('shooter-track-bar').style.width=(spawned/30*100)+'%';
     if(time>=lastEnd() && !finishPending && Date.now()-lastFinishAttempt>4000)finishGame();
   }
   frame=requestAnimationFrame(updateFrame);
 }
 function playFrames(){if(frame || !room || room.status!=='playing'||!activePanel())return;frame=requestAnimationFrame(updateFrame);}
 function matchingWord(value){
   const typed=normalize(value);
   if(!typed)return null;
   let target=null;
   for(const index of activeWords){
     const w=room.word_list[index];if(!w || pending.has(index) || shots.has(index))continue;
     if(normalize(w.en)===typed){target=index;break;}
   }
   return target;
 }
 function typeWord(){
   if(!room || room.status!=='playing'||getElapsed()<0)return;
   const input=$('shooter-answer');
   const typed=normalize(input.value);
   for(const [id,el] of nodes){
     const word=normalize(room.word_list[id].en);
     el.classList.toggle('is-matched',!!typed && word.startsWith(typed));
     const bold=el.querySelector('b');
     if(!bold)continue;
     if(typed && word.startsWith(typed) && typed.length<word.length){
       const raw=String(room.word_list[id].en);
       bold.innerHTML='<span class="shooter-prefix">'+esc(raw.slice(0,typed.length))+'</span>'+esc(raw.slice(typed.length));
     }else bold.textContent=room.word_list[id].en;
   }
   const index=matchingWord(typed);
   if(index===null)return;
   input.value='';
   lastShotText='';
   // Visual removal is immediate; points remain server-authoritative.
   optimisticShots.add(index);
   activeWords=activeWords.filter(i=>i!==index);
   const hit=nodes.get(index);
   if(hit){burst(hit);hit.remove();nodes.delete(index);}
   $('shooter-feedback').textContent='💥 Đã bắn! Đang xác nhận điểm…';
   claimWord(index,room.word_list[index].en);
 }
 async function claimWord(index,typed){
   if(!sb||!room||pending.has(index))return;
   const id=room.id;pending.add(index);
   let keepHidden=false;
   try{
     const {data,error}=await sb.rpc('ldd_shooter_claim',{p_room:id,p_word_index:index,p_typed:typed});
     if(error)throw error;
     if(!room||room.id!==id)return;
     if(data && data.ok){
       applyShot({room_id:id,word_index:index,user_id:me.id,claimed_at:new Date().toISOString()});
     }else{
       const reason=data && data.reason;
       $('shooter-feedback').textContent=reason==='already_claimed'?'⚡ Bạn khác đã bắn nhanh hơn!':
         reason==='expired'?'⌛ Từ đã rơi khỏi màn hình!':'Không ghi nhận phát bắn.';
       if(reason==='already_claimed'||reason==='expired')keepHidden=true;
     }
   }catch(e){info('Không thể ghi điểm: '+errText(e),'error');$('shooter-feedback').textContent='Mạng gián đoạn, phát bắn chưa được xác nhận.';}
   finally{
     pending.delete(index);
     // Re-show the still-falling word if the network request failed.
     if(!keepHidden && !shots.has(index))optimisticShots.delete(index);
   }
  }
  function burst(el){
   if(!el||!$('shooter-stage'))return;
   const parent=$('shooter-stage'),a=el.getBoundingClientRect(),b=parent.getBoundingClientRect();
   const x=a.left-b.left+a.width/2,y=a.top-b.top+a.height/2;
   const beam=document.createElement('div');beam.className='shooter-laser';
   const fromX=b.width/2,fromY=b.height-40;
   const dx=x-fromX,dy=y-fromY;
   beam.style.width=Math.hypot(dx,dy)+'px';
   beam.style.transform='rotate('+Math.atan2(dy,dx)+'rad)';
   parent.appendChild(beam);
   const boom=document.createElement('div');boom.className='shooter-explode';
   boom.style.left=x+'px';boom.style.top=y+'px';boom.textContent='💥';
   parent.appendChild(boom);
   setTimeout(()=>{beam.remove();boom.remove();},500);
 }
 async function finishGame(){
   if(!room || room.status!=='playing'||finishPending)return;
   finishPending=true;lastFinishAttempt=Date.now();
   const id=room.id;
   try{
     const {data,error}=await sb.rpc('ldd_shooter_finish',{p_room:id});
     if(error)throw error;
     if(room && room.id===id && data && data.status==='finished'){room=data;render();stopFrame();}
   }catch(e){info('Chưa thể chốt ván: '+errText(e),'error');}
   finally{finishPending=false;}
 }
 async function createGame(){
   const btn=$('shooter-create');btn.disabled=true;
   try{
     await identity();if(!me)throw Error('Bạn cần đăng nhập để tạo phòng.');
     const topicId=$('shooter-topic').value;
     const bank=await makeWords(topicId);
     const capacity=4; // 2–4 players may start; 4 is only the upper bound.
     const {data,error}=await sb.rpc('ldd_shooter_create',{p_words:bank.words,p_capacity:capacity,p_topic:bank.topic,p_name:me.name});
     if(error)throw error;
     unsubscribe();pendingJoinNotice=false;setRoom(data);
   }catch(e){info(errText(e),'error');}
   finally{btn.disabled=false;}
 }
 async function joinGame(){
   const btn=$('shooter-join');btn.disabled=true;
   try{
     await identity();if(!me)throw Error('Bạn cần đăng nhập để vào phòng.');
     const code=$('shooter-code-input').value.trim().toUpperCase();
     if(!/^[A-F0-9]{6}$/.test(code))throw Error('Nhập mã phòng gồm 6 chữ/số.');
     unsubscribe();await enterRoom(code,false);
   }catch(e){info(errText(e),'error');}
   finally{btn.disabled=false;}
 }
 async function startGame(){
   if(!room || !me || room.host_user_id!==me.id)return;
   const btn=$('shooter-start');btn.disabled=true;
   try{
     const {data,error}=await sb.rpc('ldd_shooter_start',{p_room:room.id});
     if(error)throw error;
     room=data;await Promise.all([syncClock(),refreshSnapshot()]);render();playFrames();
     info('Ván chơi bắt đầu. Chuẩn bị gõ từ!');
   }catch(e){info(errText(e),'error');btn.disabled=false;}
 }
 async function leaveLobby(){
   if(!room)return;
   const previous=room;
   unsubscribe();stopFrame();resetWordNodes();
   room=null;roster=[];shots.clear();pending.clear();optimisticShots.clear();
   if(me)localStorage.removeItem('ldd-shooter-room-'+me.id);
   render();info('Bạn đã rời phòng.');
   try{
     if(previous.status==='lobby')await sb.rpc('ldd_shooter_leave',{p_room:previous.id});
   }catch(e){info(errText(e),'error');}
 }
 function newGame(){
   unsubscribe();stopFrame();resetWordNodes();
   room=null;roster=[];shots.clear();pending.clear();optimisticShots.clear();
   if(me)localStorage.removeItem('ldd-shooter-room-'+me.id);
   render();info('Chọn chủ đề và tạo phòng mới để chơi tiếp.');
 }
 async function copyCode(){
   if(!room)return;
   try{await navigator.clipboard.writeText(room.code);info('Đã sao chép mã '+room.code,'success');}
   catch(e){info('Mã phòng: '+room.code);}
 }
 function onVisibility(){
   if(!room)return;
   if(!activePanel()){stopFrame();unsubscribe();}
   else resumeRoom();
 }
 function fullscreenActive(){return document.fullscreenElement===$('shooter-panel') || $('shooter-panel').classList.contains('is-shooter-fullscreen-fallback');}
 async function toggleFullscreen(){
   const p=$('shooter-panel');
   if(fullscreenActive())removeFullscreen();
   else if(p.requestFullscreen){try{await p.requestFullscreen();}catch(e){p.classList.add('is-shooter-fullscreen-fallback');}}
   else p.classList.add('is-shooter-fullscreen-fallback');
   syncFullscreen();
 }
 function removeFullscreen(){
   const p=$('shooter-panel');if(!p)return;
   p.classList.remove('is-shooter-fullscreen-fallback');
   if(document.fullscreenElement===p && document.exitFullscreen)document.exitFullscreen().catch(()=>{});
   syncFullscreen();
 }
 function syncFullscreen(){
   const el=$('shooter-full');if(el)el.textContent=fullscreenActive()?'⤢ Thu nhỏ':'⛶ Toàn màn hình';
 }
 function boot(){
   addUI();
   // No backend requests or Realtime subscriptions until the student opens this game.
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
 else boot();
})();
