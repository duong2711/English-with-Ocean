/* Public workbook tests: Exam center -> Grade 7 -> Unit -> tests.
   Only verified transcriptions are shown to learners; more tests can be
   appended to LDDGrade7BookTests.tests without changing folder navigation. */
(function(){
 'use strict';
 function boot(){
   const tab=document.getElementById('tab-kiem-tra');
   const grid=document.getElementById('kiemtra-folder-grid');
   const card=document.getElementById('ldd-school-exams-folder');
   const library=window.LDDGrade7BookTests;
   if(!tab||!grid||!card||!library||document.getElementById('ldd-school-exams-panel'))return;
   const panel=document.createElement('section');
   panel.id='ldd-school-exams-panel';panel.hidden=true;
   panel.setAttribute('aria-label','Đề thi lớp 6–12');
   grid.insertAdjacentElement('afterend',panel);
   let stage='grades',unit=1,current=null,answers={},submitted=false,uid=null,db=null,saveTimer=0;
   const letters=['a','b','c','d','e','f','g','h'];
   const idRoot='ldd:mlh-grade7:';
   const escapeKey=test=>idRoot+(uid||'guest')+':'+test.id;
   const navigate=()=>{ try{sessionStorage.setItem(idRoot+'route',JSON.stringify({stage,unit,testId:current?.id||''}));}catch(_){} };
   const elt=(tag,cls,text)=>{
     const e=document.createElement(tag);if(cls)e.className=cls;
     if(text!==undefined)e.textContent=String(text);return e;
   };
   const titleBar=(heading,back)=>{
     const bar=elt('div','ldd-mlh7-head');
     const b=elt('button','ldd-mlh7-back','← Quay lại');b.type='button';b.addEventListener('click',back);
     bar.append(b,elt('h2','',heading));panel.append(bar);
   };
   function setView(next){stage=next;panel.replaceChildren();navigate();}
   function openRoot(){
     card.classList.add('ldd-mlh7-selected');
     grid.style.display='none';panel.hidden=false;panel.style.display='';
     grades();
   }
   function closeRoot(){
     card.classList.remove('ldd-mlh7-selected');
     panel.hidden=true;panel.style.display='none';grid.style.display='';
     stage='grades';current=null;navigate();
   }
   function folder(label,sub,onClick,disabled=false){
     const b=elt('button','ldd-mlh7-folder',label);b.type='button';
     b.append(elt('small','',sub));
     b.disabled=disabled;
     if(!disabled)b.addEventListener('click',onClick);
     panel.append(b);return b;
   }
   function grades(){
     setView('grades');
     titleBar('Đề thi lớp 6–12',closeRoot);
     panel.append(elt('p','ldd-mlh7-intro','Bài kiểm tra theo sách và khối lớp.'));
     folder('📁 Lớp 7','Bài tập Tiếng Anh 7 – Mai Lan Hương, Hà Thanh Uyên',units);
   }
   function units(){
     setView('units');titleBar('Lớp 7 – Danh sách Unit',grades);
     panel.append(elt('p','ldd-mlh7-intro','Chọn Unit để xem các bài test đã được đối chiếu với bản PDF. Một Unit có thể có nhiều bài test.'));
     const wrap=elt('div','ldd-mlh7-unit-grid');panel.append(wrap);
     library.units.forEach((name,i)=>{
       const n=i+1,records=library.tests.filter(t=>t.unit===n&&t.verified);
       const b=elt('button','ldd-mlh7-unit','Unit '+n+' · '+name);
       b.type='button';b.append(elt('small','',records.length?records.length+' bài test':'Chưa có bài test đã đối chiếu'));
       b.addEventListener('click',()=>tests(n));wrap.append(b);
     });
   }
   function tests(n){
     unit=n;setView('tests');
     titleBar('Unit '+unit+' – '+library.units[unit-1],units);
     const items=library.tests.filter(t=>t.unit===unit&&t.verified);
     if(!items.length){
       panel.append(elt('p','ldd-mlh7-empty','Unit này chưa có bài test được kiểm tra chính xác từ PDF. Không tự động đăng nội dung OCR chưa đối chiếu.'));
       return;
     }
     items.forEach(t=>{
       const count=t.sections.reduce((a,s)=>a+s.questions.length,0);
       folder('📝 '+t.title,count+' câu · Trang sách '+t.bookPages,()=>{void openTest(t)});
     });
   }
   function progressKey(test){return escapeKey(test)}
   function writeLocal(test){try{localStorage.setItem(progressKey(test),JSON.stringify({answers,submitted}));}catch(_){}}
   function readLocal(test){
     try{const data=JSON.parse(localStorage.getItem(progressKey(test))||'{}');
       if(data&&data.answers&&typeof data.answers==='object'){answers=data.answers;submitted=!!data.submitted;}}
     catch(_){}
   }
   async function initDb(){
     if(db)return;
     if(!window.supabase?.createClient)return;
     db=window.supabase.createClient('https://ywqbaksmmtvwbojcgsdd.supabase.co',
       'sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_',
       {auth:{detectSessionInUrl:false}});
     const {data}=await db.auth.getSession();
     uid=data?.session?.user?.id||null;
   }
   async function fetchAttempt(test){
     try{
       await initDb();if(!uid)return;
       const {data,error}=await db.from('grade7_book_test_attempts')
         .select('answers,status').eq('user_id',uid).eq('test_id',test.id).maybeSingle();
       if(error)throw error;
       if(!data)return;
       // Keep an unsent local draft so an asynchronous fetch cannot erase input.
       if(Object.keys(answers).length===0){answers=data.answers||{};submitted=data.status==='submitted';writeLocal(test);}
     }catch(e){console.warn('[Grade7 tests] load',e);}
   }
   async function saveAttempt(test){
     try{
       await initDb();if(!uid)return;
       const score=calculate(test),row={
         user_id:uid,test_id:test.id,answers,status:submitted?'submitted':'draft',
         score_correct:submitted?score.correct:null,score_total:submitted?score.total:null,
         updated_at:new Date().toISOString()
       };
       const {error}=await db.from('grade7_book_test_attempts')
         .upsert(row,{onConflict:'user_id,test_id'});
       if(error)throw error;
     }catch(e){console.warn('[Grade7 tests] save',e);}
   }
   function scheduleSave(test){
     writeLocal(test);
     clearTimeout(saveTimer);saveTimer=setTimeout(()=>{void saveAttempt(test)},1800);
   }
   function answerKey(section,i){return section.label+'-'+(i+1)}
   function calculate(test){
     let correct=0,total=0;
     test.sections.forEach(s=>s.questions.forEach((q,i)=>{
       if(q.type!=='choice'&&q.type!=='match')return;
       total++;if(answers[answerKey(s,i)]===q.answer)correct++;
     }));
     return {correct,total};
   }
   function renderOption(group,key,q,i,opt,index,underlines){
     const lbl=elt('label','ldd-mlh7-option');
     const radio=elt('input');radio.type='radio';radio.name='ldd-mlh7-'+key;
     radio.value=letters[index];radio.checked=answers[key]===radio.value;radio.disabled=submitted;
     radio.addEventListener('change',()=>{answers[key]=radio.value;scheduleSave(current)});
     lbl.append(radio,elt('span','ldd-mlh7-letter',letters[index]+'.'));
     const word=String(opt);const token=underlines?.[index];const at=token?word.indexOf(token):-1;
     const words=elt('span','ldd-mlh7-option-text');
     if(at>=0){
       words.append(document.createTextNode(word.slice(0,at)));
       words.append(elt('u','',token));words.append(document.createTextNode(word.slice(at+token.length)));
     }else words.textContent=word;
     lbl.append(words);group.append(lbl);
   }
   function questionEl(section,q,i){
     const key=answerKey(section,i);
     const field=elt('fieldset','ldd-mlh7-question');
     const label=elt('legend','',String(i+1)+'. '+(q.text||''));
     field.append(label);
     if(q.type==='choice'){
       const group=elt('div','ldd-mlh7-options');
       q.options.forEach((choice,j)=>renderOption(group,key,q,i,choice,j,section.underlines?.[i]));
       field.append(group);
     }else if(q.type==='match'){
       const select=elt('select','ldd-mlh7-select');
       const first=elt('option','', '— Chọn đáp án —');first.value='';select.append(first);
       section.choices.forEach((choice,j)=>{
         const option=elt('option','',letters[j]+'. '+choice);
         option.value=letters[j];select.append(option);
       });
       select.value=answers[key]||'';select.disabled=submitted;
       select.addEventListener('change',()=>{answers[key]=select.value;scheduleSave(current)});
       field.append(select);
     }else{
       const input=elt('textarea','ldd-mlh7-answer');
       input.rows=2;input.placeholder='Nhập câu trả lời...';input.value=answers[key]||'';
       input.disabled=submitted;
       input.addEventListener('input',()=>{answers[key]=input.value;scheduleSave(current)});
       field.append(input);
     }
     if(submitted){
       const answer=elt('p','ldd-mlh7-solution','Đáp án sách: '+q.answer);
       if(q.type!=='written')answer.classList.add(answers[key]===q.answer?'ldd-mlh7-right':'ldd-mlh7-wrong');
       field.append(answer);
     }
     return field;
   }
   function exam(test){
     current=test;setView('exam');
     titleBar('Lớp 7 · Unit '+test.unit+' · '+test.title,()=>tests(test.unit));
     const info=elt('p','ldd-mlh7-intro',test.source+' · Trang sách '+test.bookPages+'.');
     panel.append(info);
     if(submitted){const s=calculate(test);panel.append(elt('p','ldd-mlh7-score','Đã nộp: '+s.correct+'/'+s.total+' câu chọn đáp án. Phần tự luận cần đối chiếu đáp án sách bên dưới.'));}
     else panel.append(elt('p','ldd-mlh7-intro','Bài làm được lưu để tiếp tục khi mở lại. Các câu tự luận giữ nguyên câu chữ sách và được đối chiếu sau khi nộp.'));
     const form=elt('form','ldd-mlh7-form');
     form.addEventListener('submit',e=>e.preventDefault());
     test.sections.forEach(sec=>{
       const block=elt('section','ldd-mlh7-section');
       block.append(elt('h3','',sec.label+'. '+sec.title));
       if(sec.passage)block.append(elt('div','ldd-mlh7-passage',sec.passage));
       if(sec.type==='match'){
         const legend=elt('div','ldd-mlh7-match-choices');
         sec.choices.forEach((choice,i)=>legend.append(elt('div','',letters[i]+'. '+choice)));
         block.append(legend);
       }
       sec.questions.forEach((q,i)=>block.append(questionEl(sec,q,i)));
       form.append(block);
     });
     const buttons=elt('div','ldd-mlh7-actions');
     if(!submitted){
       const submit=elt('button','ldd-mlh7-primary','Nộp bài');
       submit.type='button';submit.addEventListener('click',()=>{
         const total=test.sections.reduce((a,s)=>a+s.questions.length,0);
         const filled=Object.values(answers).filter(x=>String(x||'').trim()).length;
         if(filled<total&&!window.confirm('Bạn đã làm '+filled+'/'+total+' câu. Vẫn nộp bài?'))return;
         submitted=true;writeLocal(test);void saveAttempt(test);exam(test);
       });buttons.append(submit);
     }else{
       const redo=elt('button','ldd-mlh7-secondary','Làm lại bài');
       redo.type='button';redo.addEventListener('click',()=>{
         if(!window.confirm('Làm lại sẽ thay thế bài làm gần nhất. Tiếp tục?'))return;
         answers={};submitted=false;writeLocal(test);void saveAttempt(test);exam(test);
       });buttons.append(redo);
     }
     form.append(buttons);panel.append(form);
   }
   async function openTest(test){
     clearTimeout(saveTimer);current=test;answers={};submitted=false;
     // Resolve the signed-in identity before accessing device-local progress.
     try{await initDb()}catch(_){}
     readLocal(test);
     await fetchAttempt(test);
     exam(test);
   }
   card.addEventListener('click',openRoot);
   window.addEventListener('ldd:exam-close',()=>{if(!panel.hidden)closeRoot()});
   // Recover the nested route on refresh only if the Exam tab is active.
   try{
     const saved=JSON.parse(sessionStorage.getItem(idRoot+'route')||'null');
     if(saved?.stage&&['grades','units','tests','exam'].includes(saved.stage)&&
        tab.classList.contains('active')){
       openRoot();
       if(saved.stage==='units')units();
       if(saved.stage==='tests')tests(Number(saved.unit)||1);
       if(saved.stage==='exam'){
         const test=library.tests.find(t=>t.id===saved.testId&&t.verified);
         if(test)void openTest(test);
       }
     }
   }catch(_){}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
 else boot();
})();