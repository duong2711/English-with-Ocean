/* LDD English — unified word/phrase selection actions.
   Mouse selection and long-press drag on touch devices use the native Selection API.
   Do not install heavy observers or continually scan lesson DOM. */
(function(){
 'use strict';
 if(window.LDDTextActions)return;
 const PROJECT='ywqbaksmmtvwbojcgsdd';
 const ROOT='https://'+PROJECT+'.supabase.co';
 const PUBLISHABLE='sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_';
 const WORD=/^[A-Za-z]+(?:['’\-][A-Za-z]+)*$/;
 const PHRASE=/^[A-Za-z]+(?:['’\-][A-Za-z]+)*(?: [A-Za-z]+(?:['’\-][A-Za-z]+)*){1,7}$/;
 const BAD_PARENT='input,textarea,select,option,button,a,[contenteditable],code,pre,script,style,svg,canvas,video,iframe,[role="textbox"],.word-lookup-popup,.ldd-text-action-menu,.ldd-text-action-dialog,.ldd-quick-lookup-overlay';
 let menu=null, dialog=null, toast=null, active=null, selectionTimer=0, lastTouch=0, sequence=0;
 let highlights=[];
 function elementOf(node){return node?.nodeType===1?node:node?.parentElement;}
 function blocked(node) {
   const el=elementOf(node);
   return !el || !!el.closest(BAD_PARENT+',#ctest-take-view.ldd-exam-no-lookup,body.ldd-exam-no-lookup-active #ctest-take-view');
 }
 function inLearningArea(node){
   const el=elementOf(node);
   return !!el?.closest('#inside,.main-tab-content,#ldd-ent-movies-panel,.ldd-comic-overlay,.ldd-wimpy-reader') &&
     !el.closest('.ldd-exam-no-lookup');
 }
 function normalize(raw){return String(raw||'').replace(/\s+/g,' ').trim();}
 function wholeWordBoundary(node,offset,start){
   if(!node||node.nodeType!==3)return true;
   const text=node.nodeValue||'';
   const near=start?text[offset-1]:text[offset];
   return !near||!/[A-Za-z'’\-]/.test(near);
 }
 function isPartial(range){
   return !wholeWordBoundary(range.startContainer,range.startOffset,true) ||
          !wholeWordBoundary(range.endContainer,range.endOffset,false);
 }
 function selectionData(){
   const sel=window.getSelection?.();
   if(!sel||sel.isCollapsed||!sel.rangeCount)return null;
   const r=sel.getRangeAt(0);
   if(!inLearningArea(r.commonAncestorContainer) ||
      blocked(r.startContainer)||blocked(r.endContainer))return null;
   const text=normalize(sel.toString());
   if(!text||text.length>100)return null;
   return {text,range:r.cloneRange(),partial:isPartial(r),
     context:contextOf(r.commonAncestorContainer),source:sourceOf(r.commonAncestorContainer)};
 }
 function contextOf(node){
   const el=elementOf(node);
   const root=el?.closest('[data-vocab-context],.ldd-film-caption-item,p,li,blockquote,.news-paragraph,.ldd-film-caption-sentence')||el;
   return normalize(root?.dataset?.vocabContext||root?.textContent||'').slice(0,500);
 }
 function sourceOf(node){return elementOf(node)?.closest('[data-vocab-source]')?.dataset?.vocabSource||document.title||'LDD English';}
 function wordAtPoint(event){
   let node,offset;
   if(document.caretPositionFromPoint){
     const caret=document.caretPositionFromPoint(event.clientX,event.clientY);
     node=caret?.offsetNode;offset=caret?.offset;
   }else if(document.caretRangeFromPoint){
     const caret=document.caretRangeFromPoint(event.clientX,event.clientY);
     node=caret?.startContainer;offset=caret?.startOffset;
   }
   if(!node||node.nodeType!==3||blocked(node)||!inLearningArea(node))return null;
   const s=node.nodeValue||'';
   const isLetter=c=>/[A-Za-z'’\-]/.test(c||'');
   let index=offset;
   if(!isLetter(s[index]) && isLetter(s[index-1]))index--;
   if(!isLetter(s[index]))return null;
   let start=index,end=index+1;
   while(start>0&&isLetter(s[start-1]))start--;
   while(end<s.length&&isLetter(s[end]))end++;
   const term=s.slice(start,end);
   if(!WORD.test(term))return null;
   const range=document.createRange();
   range.setStart(node,start);range.setEnd(node,end);
   return {text:term,range,partial:false,context:contextOf(node),source:sourceOf(node)};
 }
 function showToast(text){
   if(!toast){toast=document.createElement('div');toast.className='ldd-text-action-toast';toast.setAttribute('role','alert');document.body.appendChild(toast);}
   toast.textContent=text;toast.hidden=false;clearTimeout(toast._timer);
   toast._timer=setTimeout(()=>{toast.hidden=true},4200);
 }
 function setup(){
   if(menu)return;
   menu=document.createElement('div');
   menu.className='ldd-text-action-menu';menu.hidden=true;
   menu.setAttribute('role','group');menu.setAttribute('aria-label','Tùy chọn cho từ hoặc cụm đã chọn');
   menu.innerHTML='<button type="button" data-action="highlight">🖍 Highlight</button><button type="button" data-action="translate">Dịch</button>';
   document.body.appendChild(menu);
   menu.addEventListener('pointerdown',e=>e.preventDefault());
   menu.addEventListener('click',function(e){
     const action=e.target.closest('[data-action]')?.dataset.action;
     if(!action||!active)return;
     const snapshot=active;hideMenu();
     if(action==='highlight')highlight(snapshot.range,snapshot.text);
     else void translate(snapshot);
   });
 }
 function hideMenu(){if(menu)menu.hidden=true;}
 function positionMenu(data){
   const rect=data.range.getBoundingClientRect?.()||{left:24,top:24,bottom:24,width:0};
   menu.hidden=false;
   const width=menu.offsetWidth||174;
   const left=Math.max(8,Math.min(window.innerWidth-width-8,rect.left+(rect.width||0)/2-width/2));
   const top=rect.top>65?rect.top-menu.offsetHeight-10:rect.bottom+10;
   menu.style.left=left+'px';menu.style.top=Math.max(8,top)+'px';
 }
 function present(data){
   setup(); if(!data)return;
   if(data.partial||!(WORD.test(data.text)||PHRASE.test(data.text))){
     hideMenu();showToast('Quét chưa trọn một từ hoặc cụm tiếng Anh. Hãy chọn lại đầy đủ, không cắt giữa từ/cụm.');
     return;
   }
   active=data;positionMenu(data);
 }
 function handleSelection(){
   const data=selectionData();
   if(data)present(data);
 }
 function highlight(range,text){
   try{
     const safeRange=range.cloneRange();
     if(window.CSS?.highlights && typeof window.Highlight==='function'){
       highlights.push(safeRange);if(highlights.length>100)highlights.shift();
       CSS.highlights.set('ldd-learning-highlight',new Highlight(...highlights));
       return;
     }
     // Older Safari fallback: wrap only text-node portions; leave existing controls untouched.
     if(safeRange.startContainer===safeRange.endContainer&&safeRange.startContainer.nodeType===3){
       const mark=document.createElement('mark');mark.className='ldd-user-mark';
       safeRange.surroundContents(mark);return;
     }
     const scope=safeRange.commonAncestorContainer;
     const root=scope.nodeType===3?scope.parentNode:scope;
     const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
     const nodes=[];
     while(walker.nextNode()){const n=walker.currentNode;if(safeRange.intersectsNode(n)&&!blocked(n))nodes.push(n);}
     nodes.forEach(n=>{
       const r=document.createRange();r.selectNodeContents(n);
       if(n===safeRange.startContainer)r.setStart(n,safeRange.startOffset);
       if(n===safeRange.endContainer)r.setEnd(n,safeRange.endOffset);
       if(r.collapsed)return;
       const mark=document.createElement('mark');mark.className='ldd-user-mark';
       try{r.surroundContents(mark)}catch(_){}
     });
   }catch(_){showToast('Chưa đánh dấu được đoạn này. Hãy quét lại phần văn bản.');}
 }
 function closeDialog(){if(dialog)dialog.hidden=true;sequence++;}
 function createDialog(){
   if(dialog)return dialog;
   dialog=document.createElement('div');dialog.className='ldd-text-action-dialog';dialog.hidden=true;
   dialog.innerHTML='<section role="dialog" aria-modal="true" aria-labelledby="ldd-phrase-title">'+
    '<button type="button" class="ldd-phrase-close" aria-label="Đóng">×</button>'+
    '<h3 id="ldd-phrase-title"></h3><p class="ldd-phrase-definition" role="status"></p>'+
    '<p class="ldd-phrase-note"></p></section>';
   dialog.addEventListener('click',e=>{if(e.target===dialog||e.target.closest('.ldd-phrase-close'))closeDialog();});
   document.body.appendChild(dialog);return dialog;
 }
 function makeToken(word,context,source){
   const span=document.createElement('span');
   span.className='tappable-word';
   span.dataset.word=word;span.dataset.vocabContext=context||word;
   span.dataset.vocabSource=source||'Chọn từ trên website';
   return span;
 }
 function translateWord(data){
   const el=makeToken(data.text,data.context,data.source);
   if(typeof window.lddExamLookupWord==='function'){
     try{window.lddExamLookupWord(el);return;}
     catch(e){console.error('[LDD text actions] word lookup failed',e)}
   }
   showToast('Từ điển đang khởi tạo. Hãy thử lại.');
 }
 async function phraseRequest(phrase,context){
   const client=window.supabase?.createClient?.(ROOT,PUBLISHABLE,{auth:{detectSessionInUrl:false}});
   if(!client)throw Error('Chưa có kết nối tài khoản.');
   const auth=await client.auth.getSession();
   const token=auth.data?.session?.access_token;
   if(!token)throw Error('Hãy đăng nhập để tra cụm từ.');
   const res=await fetch(ROOT+'/functions/v1/collocation-lookup',{method:'POST',
     headers:{'Content-Type':'application/json','apikey':PUBLISHABLE,'Authorization':'Bearer '+token},
     body:JSON.stringify({phrase,context})});
   const body=await res.json();
   if(!res.ok)throw Error(body.error||'Không dịch được cụm từ.');
   return body;
 }
 async function translate(data){
   if(WORD.test(data.text)){translateWord(data);return;}
   const box=createDialog();
   const id=++sequence;
   box.querySelector('h3').textContent=data.text;
   box.querySelector('.ldd-phrase-definition').textContent='Đang tra nghĩa cụm từ…';
   box.querySelector('.ldd-phrase-note').textContent='Cụm từ không yêu cầu đọc phát âm.';
   box.hidden=false;
   try{
     const result=await phraseRequest(data.text,data.context);
     if(id!==sequence)return;
     box.querySelector('.ldd-phrase-definition').textContent=result.meaning_vi||'Chưa có nghĩa.';
     box.querySelector('.ldd-phrase-note').textContent=result.is_collocation
        ?(result.stored?'✓ Collocation đã có trong kho chung':'Đây là collocation, nhưng chưa lưu được vào kho.')
        :'Đây là cụm diễn đạt thông thường, không lưu vào kho Collocation.';
     if(result.stored)document.dispatchEvent(new Event('ldd:collocation-updated'));
   }catch(error){
     if(id!==sequence)return;
     box.querySelector('.ldd-phrase-definition').textContent=error.message||'Tra cụm từ thất bại.';
     box.querySelector('.ldd-phrase-note').textContent='Không lưu dữ liệu khi việc kiểm tra chưa thành công.';
   }
 }
 // Public helper used by Vietnamese gloss in film scripts.
 function openWord(word,context){
   const clean=normalize(word);
   if(!WORD.test(clean))return showToast('Từ tiếng Anh chưa hợp lệ.');
   translateWord({text:clean,context:context||clean,source:'Bài nghe Phim ảnh'});
 }
 function translateTerm(term,context){
   const text=normalize(term);
   if(!(WORD.test(text)||PHRASE.test(text)))return showToast('Chưa xác định được từ hoặc cụm cần tra.');
   void translate({text,context:context||text,source:'Bài nghe Phim ảnh'});
 }
 window.LDDTextActions={openWord,translateTerm};
 function boot(){
   setup();
   window.addEventListener('click',function(e){
     if(e.target.closest?.('.ldd-text-action-menu,.ldd-text-action-dialog,.ldd-vi-cloze-focus'))return;
     if(e.target.closest?.('#ctest-take-view.ldd-exam-no-lookup'))return;
     if(e.target.closest?.('input,textarea,select,button,a,[contenteditable],.ldd-quick-lookup-overlay')){hideMenu();return;}
     const selection=selectionData();
     if(selection){present(selection);return;}
     const tapped=e.target.closest?.('.tappable-word,.ldd-exam-lookup-word');
     if(tapped && !blocked(tapped.parentElement)){
       const term=normalize(tapped.dataset.word||tapped.textContent);
       if(WORD.test(term)){
         const r=document.createRange();r.selectNodeContents(tapped);
         e.preventDefault();e.stopImmediatePropagation();
         present({text:term,range:r,context:contextOf(tapped),source:sourceOf(tapped)});
         return;
       }
     }
     if(Date.now()-lastTouch<550)return;
     const word=wordAtPoint(e);
     if(word){e.preventDefault();e.stopImmediatePropagation();present(word);}
     else hideMenu();
   },true);
   document.addEventListener('selectionchange',function(){
     clearTimeout(selectionTimer);
     selectionTimer=setTimeout(()=>{if(selectionData())handleSelection()},420);
   });
   document.addEventListener('pointerup',function(e){
     if(e.pointerType==='touch')lastTouch=Date.now();
     if(e.pointerType==='mouse')setTimeout(handleSelection,0);
   },true);
   document.addEventListener('touchend',function(){lastTouch=Date.now();setTimeout(handleSelection,480)},{passive:true,capture:true});
   document.addEventListener('keydown',function(e){if(e.key==='Escape'){hideMenu();closeDialog();}},true);
   window.addEventListener('scroll',hideMenu,true);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
 else boot();
})();
