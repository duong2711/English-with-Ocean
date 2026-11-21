/* LDD English — per-student annotations for reading articles and assigned tests.
   Notes/highlights live in Supabase with RLS; never share annotations across students.
   Selections are anchored to character offsets in the rendered exam text. */
(function(){
 'use strict';
 if(window.LDDTestAnnotations)return;
 const PROJECT='ywqbaksmmtvwbojcgsdd';
 const KEY='sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_';
 const ROOTS=['ctest-take-sections','ilt-take-body','irt-take-body','news-article-text'];
 const TABLE='student_test_annotations';
 let client=null, overlay=null, currentRoot=null, refreshTimer=0;
 const states=new Map();
 function db(){
   if(!client&&window.supabase?.createClient)
     client=window.supabase.createClient('https://'+PROJECT+'.supabase.co',KEY,{auth:{detectSessionInUrl:false}});
   return client;
 }
 function toast(message){
   let el=document.getElementById('ldd-annotation-message');
   if(!el){el=document.createElement('div');el.id='ldd-annotation-message';el.setAttribute('role','status');document.body.appendChild(el);}
   el.textContent=message;el.hidden=false;clearTimeout(el._hide);
   el._hide=setTimeout(()=>{el.hidden=true;},4000);
 }
 const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
 function hash(text){
   let h=2166136261;
   for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
   return (h>>>0).toString(36);
 }
 function rootFor(range){
   const node=range?.startContainer;
   const el=node?.nodeType===3?node.parentElement:node;
   const root=el?.closest?.('#'+ROOTS.join(',#'));
   if(!root||!root.contains(range.endContainer))return null;
   return root;
 }
 function scope(root){
   if(!root||!root.textContent?.trim())return null;
   const id=root.id;
   if(id==='news-article-text'){
     const view=document.getElementById('news-article-panel');
     if(!view||view.style.display==='none'||!view.getClientRects().length)return null;
     const title=norm(document.getElementById('news-article-title')?.textContent);
     const articleId=norm(view.dataset.annotationArticleId);
     const content=norm(root.textContent).slice(0,700);
     if(!title||title==='Bài đọc'||!content)return null;
     // Use the real news_articles.id captured from the article card. The
     // fallback is for teacher-created articles opened before a card exists.
     return {root,view,title,key:'news:'+(articleId||hash(title+'|'+content)),prefix:'news'};
   }
   const prefix=id==='ctest-take-sections'?'ctest':id==='ilt-take-body'?'ilt':'irt';
   const view=document.getElementById(prefix+'-take-view');
   if(!view||view.style.display==='none'||!view.getClientRects().length)return null;
   if(view.classList.contains('ldd-exam-no-lookup'))return null;
   const title=norm(document.getElementById(prefix+'-take-title')?.textContent);
   if(!title)return null;
   // The first question and title distinguish tests with identical names.
   // Stable across ordinary answer entry, which changes input values, not textContent.
   const content=norm(root.textContent).slice(0,700);
   const stableId=prefix==='ctest'?norm(view.dataset.annotationTestId):'';
   return {root,view,title,key:prefix+':'+(stableId||hash(title+'|'+content)),prefix};
 }
 function charOffset(root,node,offset){
   try{
     const r=document.createRange();r.selectNodeContents(root);r.setEnd(node,offset);
     return r.toString().length;
   }catch(_){return -1;}
 }
 function anchors(info,range){
   if(!info||!info.root.contains(range.startContainer)||!info.root.contains(range.endContainer))return null;
   const start=charOffset(info.root,range.startContainer,range.startOffset);
   const end=charOffset(info.root,range.endContainer,range.endOffset);
   return start>=0&&end>start?{start,end}:null;
 }
 function restoreRange(root,start,end){
   if(start<0||end<=start)return null;
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
   let node,offset=0,startNode=null,endNode=null,startAt=0,endAt=0;
   while((node=w.nextNode())){
     const size=node.nodeValue.length,next=offset+size;
     if(!startNode&&start<next){startNode=node;startAt=start-offset;}
     if(startNode&&end<=next){endNode=node;endAt=end-offset;break;}
     offset=next;
   }
   if(!startNode||!endNode)return null;
   try{
     const r=document.createRange();r.setStart(startNode,startAt);r.setEnd(endNode,endAt);
     return r;
   }catch(_){return null;}
 }
 function state(info){return states.get(info.root.id);}
 function setHighlights(name,ranges){
   if(window.CSS?.highlights&&typeof window.Highlight==='function'){
     if(ranges.length)CSS.highlights.set(name,new Highlight(...ranges));
     else CSS.highlights.delete(name);
     return;
   }
   // Safe fallback: do not wrap question/answer DOM, which can invalidate controls.
 }
 function draw(info){
   const s=state(info);
   if(!s||s.key!==info.key||currentRoot!==info.root)return;
   const plain=[],noted=[];
   for(const a of s.items){
     const r=restoreRange(info.root,a.start_offset,a.end_offset);
     if(!r||norm(r.toString())!==norm(a.selected_text))continue;
     (a.kind==='note'?noted:plain).push(r);
   }
   setHighlights('ldd-test-saved-highlight',plain);
   setHighlights('ldd-test-saved-note',noted);
   updateNotesButton(info);
 }
 async function identity(){
   const c=db();if(!c)return null;
   const {data}=await c.auth.getSession();
   return data?.session?.user?.id||null;
 }
 async function ensure(info){
   const uid=await identity();
   if(!uid)throw Error('Hãy đăng nhập để lưu đánh dấu và ghi chú.');
   let s=state(info);
   if(s&&s.uid===uid&&s.key===info.key){
     if(s.loading)await s.loading;
     return s;
   }
   s={uid,key:info.key,items:[],loading:null};
   states.set(info.root.id,s);
   s.loading=(async()=>{
     const {data,error}=await db().from(TABLE)
       .select('id,kind,selected_text,start_offset,end_offset,note_text')
       .eq('user_id',uid).eq('test_key',info.key).eq('root_id',info.root.id)
       .order('created_at',{ascending:true}).limit(500);
     if(error)throw error;
     // Never replace a newer scope with an old asynchronous response.
     if(state(info)===s)s.items=data||[];
   })();
   try{await s.loading;}finally{s.loading=null;}
   if(state(info)===s)draw(info);
   return s;
 }
 async function refresh(root){
   const info=scope(root);
   if(!info){
     if(currentRoot===root){currentRoot=null;setHighlights('ldd-test-saved-highlight',[]);setHighlights('ldd-test-saved-note',[]);}
     return;
   }
   if(currentRoot!==root||state(info)?.key!==info.key){
     currentRoot=root;
     setHighlights('ldd-test-saved-highlight',[]);
     setHighlights('ldd-test-saved-note',[]);
   }
   try{await ensure(info);if(currentRoot===root)draw(info);}
   catch(e){
     if(currentRoot===root){
       setHighlights('ldd-test-saved-highlight',[]);
       setHighlights('ldd-test-saved-note',[]);
     }
     console.warn('[LDD annotations] restore:',e);
   }
 }
 function schedule(root){
   clearTimeout(refreshTimer);
   refreshTimer=setTimeout(()=>{void refresh(root);},220);
 }
 function updateNotesButton(info){
   let btn=info.view.querySelector('.ldd-exam-notes-button');
   if(!btn){
     btn=document.createElement('button');btn.type='button';btn.className='ldd-exam-notes-button';
     btn.addEventListener('click',()=>{const latest=scope(info.root);if(latest)void openList(latest);});
     const header=info.view.querySelector('.ctest-take-header,.ilt-take-header,.irt-take-header,.grammar-panel-header,[id$="-take-header"]')
       ||info.view.querySelector('[id$="-take-title"]')?.parentElement||info.view;
     header.appendChild(btn);
   }
   if(!btn)return;
   const s=state(info);
   const count=s?.items.filter(item=>item.kind==='note').length||0;
   btn.textContent=(info.prefix==='news'?'📝 Ghi chú bài báo':'📝 Ghi chú của tôi')+(count?' ('+count+')':'');
 }
 function modal(){
   if(overlay)return overlay;
   overlay=document.createElement('div');overlay.className='ldd-annotation-overlay';overlay.hidden=true;
   overlay.innerHTML='<section role="dialog" aria-modal="true" aria-label="Ghi chú của tôi">'+
     '<button type="button" class="ldd-annotation-close" aria-label="Đóng">×</button>'+
     '<div class="ldd-annotation-body"></div></section>';
   overlay.addEventListener('click',e=>{if(e.target===overlay||e.target.closest('.ldd-annotation-close'))close();});
   document.body.appendChild(overlay);
   return overlay;
 }
 function close(){if(overlay)overlay.hidden=true;}
 function editor(quote,value,onSave){
   const m=modal(),body=m.querySelector('.ldd-annotation-body');
   body.replaceChildren();
   const h=document.createElement('h3');h.textContent='Ghi chú';body.appendChild(h);
   const q=document.createElement('blockquote');q.textContent=quote;body.appendChild(q);
   const input=document.createElement('textarea');input.rows=5;input.maxLength=3000;input.placeholder='Viết ghi chú của bạn…';input.value=value||'';body.appendChild(input);
   const footer=document.createElement('div');footer.className='ldd-annotation-footer';
   const cancel=document.createElement('button');cancel.textContent='Hủy';cancel.type='button';cancel.addEventListener('click',close);
   const save=document.createElement('button');save.textContent='Lưu ghi chú';save.type='button';save.className='ldd-annotation-primary';
   save.addEventListener('click',async()=>{
     if(!input.value.trim()){input.focus();return;}
     save.disabled=true;
     try{await onSave(input.value.trim());close();toast('Đã lưu ghi chú.');}
     catch(e){toast(e.message||'Chưa lưu được ghi chú. Hãy thử lại.');save.disabled=false;}
   });
   footer.append(cancel,save);body.appendChild(footer);
   m.hidden=false;input.focus();
 }
 async function insert(info,kind,data,note){
   const loc=anchors(info,data.range);
   if(!loc)throw Error('Đoạn văn bản đã thay đổi. Hãy quét lại.');
   const s=await ensure(info);
   if(s.key!==info.key||state(info)!==s)throw Error('Bài kiểm tra đã thay đổi. Hãy mở lại.');
   const row={user_id:s.uid,test_key:info.key,root_id:info.root.id,kind,
     selected_text:data.text,start_offset:loc.start,end_offset:loc.end,
     note_text:kind==='note'?note:null};
   // Deduplicate equal highlights, and update an existing note on the same passage.
   const old=s.items.find(a=>a.kind===kind&&a.start_offset===loc.start&&a.end_offset===loc.end);
   if(kind==='highlight'&&old){draw(info);return;}
   let response;
   if(old){
     response=await db().from(TABLE).update({note_text:note}).eq('id',old.id).eq('user_id',s.uid).select('id').single();
   }else{
     response=await db().from(TABLE).insert(row).select('id').single();
   }
   if(response.error)throw response.error;
   if(old)old.note_text=note;
   else s.items.push(Object.assign({id:response.data.id},row));
   draw(info);
 }
 async function highlight(data){
   const root=rootFor(data.range),info=scope(root);
   if(!info)return false;
   try{await insert(info,'highlight',data,null);toast('Đã lưu Highlight vào bài kiểm tra.');}
   catch(e){toast(e.message||'Không lưu được Highlight.');}
   return true;
 }
 function note(data){
   const root=rootFor(data.range),info=scope(root);
   if(!info){
     // Outside the supported article/exam readers, keep a device-local note.
     const k='ldd:selection-note:'+hash(location.pathname+'|'+(data.source||'')+'|'+data.text);
     let previous='';
     try{previous=localStorage.getItem(k)||'';}catch(_){}
     editor(data.text,previous,async text=>{localStorage.setItem(k,text);});
     return;
   }
   const loc=anchors(info,data.range);
   if(!loc){toast('Hãy quét lại đoạn cần ghi chú.');return;}
   const existing=state(info)?.items.find(a=>a.kind==='note'&&a.start_offset===loc.start&&a.end_offset===loc.end);
   editor(data.text,existing?.note_text||'',async text=>insert(info,'note',data,text));
 }
 async function openList(info){
   let s;
   try{s=await ensure(info);}catch(e){toast(e.message||'Không đọc được ghi chú.');return;}
   const m=modal(),body=m.querySelector('.ldd-annotation-body');body.replaceChildren();
   const h=document.createElement('h3');h.textContent='Ghi chú của tôi — '+info.title;body.appendChild(h);
   const list=s.items.filter(a=>a.kind==='note');
   if(!list.length){const p=document.createElement('p');p.textContent='Bạn chưa có ghi chú trong bài này. Hãy quét văn bản và chọn Ghi chú.';body.appendChild(p);}
   for(const entry of list){
     const item=document.createElement('article');item.className='ldd-annotation-item';
     const q=document.createElement('blockquote');q.textContent=entry.selected_text;item.appendChild(q);
     const note=document.createElement('p');note.textContent=entry.note_text||'';item.appendChild(note);
     const actions=document.createElement('div');actions.className='ldd-annotation-footer';
     const edit=document.createElement('button');edit.type='button';edit.textContent='Sửa';edit.addEventListener('click',()=>{
       editor(entry.selected_text,entry.note_text||'',async text=>{
         const {error}=await db().from(TABLE).update({note_text:text}).eq('id',entry.id).eq('user_id',s.uid);
         if(error)throw error;
         entry.note_text=text;
       });
     });
     const jump=document.createElement('button');jump.type='button';jump.textContent='Đến đoạn';jump.addEventListener('click',()=>{
       close();const r=restoreRange(info.root,entry.start_offset,entry.end_offset);
       const el=r?.startContainer?.parentElement;
       if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
     });
     const del=document.createElement('button');del.type='button';del.textContent='Xóa';del.addEventListener('click',async()=>{
       const {error}=await db().from(TABLE).delete().eq('id',entry.id).eq('user_id',s.uid);
       if(error){toast('Không xóa được ghi chú.');return;}
       s.items=s.items.filter(x=>x!==entry);
       draw(info);void openList(info);
     });
     actions.append(jump,edit,del);item.appendChild(actions);body.appendChild(item);
   }
   m.hidden=false;
 }
 function boot(){
   // Remember the immutable article ID before the existing news click handler
   // opens a card. Avoid keying annotations to a mutable headline or content.
   function rememberArticleId(e){
     const card=e.target?.closest?.('#news-cards-grid .news-card[data-article-id]');
     if(!card||e.target.closest('.news-card-delete-btn'))return;
     const panel=document.getElementById('news-article-panel');
     if(panel)panel.dataset.annotationArticleId=card.dataset.articleId;
   }
   document.addEventListener('pointerdown',rememberArticleId,true);
   document.addEventListener('click',rememberArticleId,true);
   ROOTS.forEach(id=>{
     const root=document.getElementById(id);if(!root)return;
     const view=root.closest('[id$="-take-view"]')||root.parentElement;
     const observer=new MutationObserver(()=>schedule(root));
     observer.observe(root,{subtree:true,childList:true,characterData:true});
     if(view){
       new MutationObserver(()=>schedule(root)).observe(view,{attributes:true,attributeFilter:['style','class']});
       const title=view.querySelector(id==='news-article-text'?'#news-article-title':'[id$="-take-title"]');
       if(title)new MutationObserver(()=>schedule(root)).observe(title,{childList:true,characterData:true,subtree:true});
     }
     schedule(root);
   });
   document.addEventListener('keydown',e=>{if(e.key==='Escape')close();},true);
   window.addEventListener('pageshow',()=>ROOTS.forEach(id=>{const root=document.getElementById(id);if(root)schedule(root);}));
 }
 window.LDDTestAnnotations={highlight,note,refresh:()=>ROOTS.forEach(id=>{const r=document.getElementById(id);if(r)schedule(r);})};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
 else boot();
})();