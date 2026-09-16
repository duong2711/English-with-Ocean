/* LDD English — Vocab Race v12 intermission controller · low egress */
(function(){
  'use strict';

  const SUPABASE_URL='https://ywqbaksmmtvwbojcgsdd.supabase.co';
  const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cWJha3NtbXR2d2JvamNnc2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNjc3NTAsImV4cCI6MjA5Nzc0Mzc1MH0.vhgt7cB6w2elm-MXY57U_wJtYkJQHDFAEsJwAArOjhQ';
  if(!window.supabase||!window.supabase.createClient)return;

  const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{auth:{detectSessionInUrl:false}});
  let roomId=null;
  let channel=null;
  let roomSnapshot=null;
  let paused=false;
  let advancing=false;
  let discovering=false;
  let discoverTimer=null;
  let clockOffset=0;
  let lastClockSync=0;

  const now=()=>Date.now()+clockOffset;
  const isPauseResult=lr=>!!lr&&['round_pause','timeout_pause'].includes(String(lr.type||''));

  function getOverlay(){return document.getElementById('vocab-race-pause-overlay');}
  function getGame(){return document.getElementById('vocab-race-game');}
  function gameVisible(){const g=getGame();return !!g&&g.style.display!=='none';}

  async function syncClock(force){
    if(!force&&Date.now()-lastClockSync<30000)return;
    const t0=Date.now();
    try{
      const {data,error}=await sb.rpc('vocab_race_server_time');
      const t1=Date.now();
      if(!error&&data){
        const server=Date.parse(data);
        if(Number.isFinite(server))clockOffset=server-((t0+t1)/2);
      }
    }catch(_){ }
    lastClockSync=Date.now();
  }

  function setOverlayCopy(reason){
    const overlay=getOverlay();
    if(!overlay)return;
    const title=overlay.querySelector('.vocab-race-pause-card>strong');
    const text=overlay.querySelector('.vocab-race-pause-card>p');
    if(reason==='timeout'){
      if(title)title.textContent='HẾT THỜI GIAN';
      if(text)text.textContent='Vòng tiếp theo bắt đầu sau';
    }else{
      if(title)title.textContent='CHUẨN BỊ VÒNG TIẾP THEO';
      if(text)text.textContent='Tiếp tục sau';
    }
  }

  function publishRoomState(r){
    const state=r?{id:r.id,code:r.code||'',status:r.status||'',round_index:Number(r.round_index),last_result:r.last_result||{}}:null;
    window.LDDVocabRaceRoomState=state;
    document.dispatchEvent(new CustomEvent('ldd:vocab-race-room',{detail:state}));
  }

  function applyRoom(r){
    roomSnapshot=r||null;
    publishRoomState(r);
    const game=getGame();
    const lr=r&&r.last_result||{};
    const shouldPause=!!(r&&r.status==='playing'&&isPauseResult(lr)&&Number(lr.round)===Number(r.round_index));
    const pauseChanged=shouldPause!==paused;
    paused=shouldPause;
    if(game)game.classList.toggle('vocab-race-v9-paused',shouldPause);
    if(shouldPause){
      setOverlayCopy(String(lr.reason||''));
      if(pauseChanged)syncClock(false);
    }
  }

  function unsubscribe(){
    if(channel){try{sb.removeChannel(channel);}catch(_){ }}
    channel=null;
  }

  async function attach(r){
    if(!r||!r.id)return;
    if(String(roomId)===String(r.id)){applyRoom(r);return;}
    unsubscribe();
    roomId=r.id;
    applyRoom(r);
    channel=sb.channel('race-v12-room-'+roomId)
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'vocab_race_rooms',filter:'id=eq.'+roomId},payload=>applyRoom(payload.new))
      .subscribe();
    await syncClock(true);
  }

  async function discover(){
    if(discovering||!gameVisible())return;
    if(roomId&&roomSnapshot&&['lobby','playing'].includes(String(roomSnapshot.status||'')))return;
    discovering=true;
    try{
      const {data:{session}}=await sb.auth.getSession();
      if(!session||!session.user)return;
      const {data:rows}=await sb.from('vocab_race_players')
        .select('room_id,joined_at')
        .eq('user_id',session.user.id)
        .order('joined_at',{ascending:false})
        .limit(1);
      if(!rows||!rows.length)return;
      const id=rows[0].room_id;
      const {data:r}=await sb.from('vocab_race_rooms')
        .select('id,code,status,round_index,last_result')
        .eq('id',id)
        .maybeSingle();
      if(r)await attach(r);
    }finally{
      discovering=false;
    }
  }

  function scheduleDiscover(delay){
    clearTimeout(discoverTimer);
    discoverTimer=setTimeout(discover,delay==null?40:delay);
  }

  async function advanceIfReady(){
    if(!paused||advancing||!roomSnapshot)return;
    const lr=roomSnapshot.last_result||{};
    const until=Date.parse(lr.pause_until||'');
    if(!Number.isFinite(until)||now()<until)return;
    advancing=true;
    try{
      await sb.rpc('vocab_race_advance_after_pause',{p_room:roomSnapshot.id,p_round:Number(roomSnapshot.round_index)});
      await syncClock(true);
      const {data:r}=await sb.from('vocab_race_rooms')
        .select('id,code,status,round_index,last_result')
        .eq('id',roomSnapshot.id)
        .maybeSingle();
      if(r)applyRoom(r);
    }finally{
      advancing=false;
    }
  }

  function paint(){
    const overlay=getOverlay();
    const game=getGame();
    if(paused&&roomSnapshot){
      if(game)game.classList.add('vocab-race-v9-paused');
      if(overlay)overlay.style.setProperty('display','grid','important');
      const count=document.getElementById('vocab-race-pause-count');
      const until=Date.parse((roomSnapshot.last_result||{}).pause_until||'');
      if(count&&Number.isFinite(until))count.textContent=String(Math.max(0,Math.ceil((until-now())/1000)));
      advanceIfReady();
    }else{
      if(game)game.classList.remove('vocab-race-v9-paused');
      if(overlay)overlay.style.removeProperty('display');
    }
    requestAnimationFrame(paint);
  }

  document.addEventListener('keydown',function(e){
    if(!paused)return;
    if(['ArrowLeft','ArrowRight',' ','Enter'].includes(e.key)){
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },true);

  // No REST polling: discover once when the game becomes visible, then Realtime owns updates.
  new MutationObserver(function(){
    if(gameVisible())scheduleDiscover(30);
  }).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});

  document.addEventListener('visibilitychange',function(){if(!document.hidden&&gameVisible())scheduleDiscover(0);});
  document.addEventListener('click',function(e){
    if(e.target&&e.target.closest&&e.target.closest('#vocab-race-folder-card'))scheduleDiscover(80);
  },true);

  scheduleDiscover(0);
  requestAnimationFrame(paint);
})();