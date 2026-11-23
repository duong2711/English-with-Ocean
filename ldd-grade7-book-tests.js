/* Grade 7 workbook exams — resumable per-question answers, two-action
   annotations (Highlight/Note, NO translation), teacher review alongside
   objective auto-marking. Student progress is isolated by Supabase Auth uid. */
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
  const KEY='ldd:mlh-grade7:';
  const TEACHER='lddbaiu@gmail.com';
  const letters=['a','b','c','d','e','f','g','h','i','j'];
  let stage='grades',unit=1,current=null,db=null,uid=null,teacher=false;
  let currentContext=null,sessionRequest=null,openSerial=0;
  const drafts=new Map();
  const el=(tag,cls,contents)=>{
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(contents!==undefined)node.textContent=String(contents);
    return node;
  };
  const button=(text,cls,cb)=>{
    const b=el('button',cls,text);b.type='button';b.addEventListener('click',cb);return b;
  };
  const route=()=>{
    try{sessionStorage.setItem(KEY+'route',JSON.stringify({
      stage,unit,testId:current?.id||''
    }));}catch(_){}
  };
  function setView(next){
    stage=next;panel.replaceChildren();
    if(next!=='exam')delete panel.dataset.annotationTestId;
    route();
  }
  function titleBar(title,back){
    const head=el('div','ldd-mlh7-head');
    head.append(button('← Quay lại','ldd-mlh7-back',back),el('h2','',title));
    panel.append(head);
  }
  function folder(title,subtitle,callback){
    const item=button(title,'ldd-mlh7-folder',callback);
    item.append(el('small','',subtitle));panel.append(item);return item;
  }
  function openRoot(){
    grid.style.display='none';panel.hidden=false;panel.style.display='';
    grades();
  }
  function closeRoot(){
    grid.style.display='';panel.hidden=true;panel.style.display='none';
    stage='grades';current=null;currentContext=null;route();
  }
  function grades(){
    current=null;currentContext=null;
    setView('grades');titleBar('Đề thi lớp 6–12',closeRoot);
    folder('📁 Lớp 7','Bài tập Tiếng Anh 7 – Mai Lan Hương, Hà Thanh Uyên',units);
    void initDb().then(()=>{
      if(!teacher||stage!=='grades'||panel.hidden)return;
      if(panel.querySelector('.ldd-mlh7-teacher-folder'))return;
      folder('👩‍🏫 Chấm bài lớp 7','Bài học viên đã nộp · chấm từng câu và nhận xét',()=>{void teacherList()})
        .classList.add('ldd-mlh7-teacher-folder');
    }).catch(()=>{});
  }
  function units(){
    current=null;currentContext=null;
    setView('units');titleBar('Lớp 7 – Danh sách Unit',grades);
    panel.append(el('p','ldd-mlh7-intro','Chọn Unit để xem các bài test đã đối chiếu với PDF. Mỗi Unit có thể có nhiều bài.'));
    const wrap=el('div','ldd-mlh7-unit-grid');panel.append(wrap);
    library.units.forEach((name,index)=>{
      const n=index+1,tests=library.tests.filter(t=>t.unit===n&&t.verified);
      const item=button('Unit '+n+' · '+name,'ldd-mlh7-unit',()=>showTests(n));
      item.append(el('small','',tests.length?tests.length+' bài test':'Chưa có bài test đã đối chiếu'));
      wrap.append(item);
    });
  }
  function showTests(n){
    unit=n;current=null;currentContext=null;
    setView('tests');titleBar('Unit '+n+' – '+library.units[n-1],units);
    const matches=library.tests.filter(t=>t.unit===n&&t.verified);
    if(!matches.length){
      panel.append(el('p','ldd-mlh7-empty','Chưa có bài test được đối chiếu chính xác với PDF. Không đăng bản OCR chưa kiểm tra.'));
      return;
    }
    matches.forEach(t=>{
      const count=t.sections.reduce((sum,s)=>sum+s.questions.length,0);
      folder('📝 '+t.title,count+' câu · Trang sách '+t.bookPages,()=>{void openTest(t)});
    });
  }
  async function initDb(){
    if(sessionRequest)return sessionRequest;
    sessionRequest=(async()=>{
      if(!window.supabase?.createClient)throw Error('Không kết nối được Supabase');
      if(!db)db=window.supabase.createClient('https://ywqbaksmmtvwbojcgsdd.supabase.co',
        'sb_publishable_AQZ6Jc8ZGID7kfRYPe9fLQ_Wmy7ekp_',{auth:{detectSessionInUrl:false}});
      const {data,error}=await db.auth.getSession();
      if(error)throw error;
      const session=data?.session;
      const nextUid=session?.user?.id||null;
      if(uid!==nextUid)drafts.clear(); // never reuse another learner's draft
      uid=nextUid;
      teacher=String(session?.user?.email||'').toLowerCase()===TEACHER;
      return session;
    })();
    try{return await sessionRequest;}finally{sessionRequest=null;}
  }
  function localKey(test){return KEY+'answer:'+(uid||'signed-out')+':'+test.id;}
  function persist(ctx){
    try{localStorage.setItem(localKey(ctx.test),JSON.stringify({
      answers:ctx.answers,dirty:ctx.dirty,submitted:ctx.submitted,updatedAt:Date.now()
    }));}catch(_){}
  }
  function readLocal(ctx){
    try{
      const record=JSON.parse(localStorage.getItem(localKey(ctx.test))||'null');
      if(record?.answers&&typeof record.answers==='object'&&!Array.isArray(record.answers)){
        ctx.answers=record.answers;
        // Migrate device-only answers from the previous reader version.
        ctx.dirty=record.dirty&&typeof record.dirty==='object'?record.dirty:{...record.answers};
        ctx.submitted=!!record.submitted;
      }
    }catch(_){}
  }
  function newContext(test){
    const ctx={
      test,answers:{},dirty:{},submitted:false,attemptId:null,
      loading:false,saving:null,syncTimer:0,error:'',synced:false,review:null
    };
    drafts.set(test.id,ctx);readLocal(ctx);return ctx;
  }
  function status(ctx,message){
    if(ctx!==currentContext)return;
    const bar=panel.querySelector('#ldd-mlh7-save-status');
    if(bar)bar.textContent=message||(
      ctx.error?'Đã lưu trên thiết bị; chưa đồng bộ: '+ctx.error:
      Object.keys(ctx.dirty).length?'Đã lưu trên thiết bị · Đang đồng bộ…':
      ctx.synced?'✓ Đã lưu trên tài khoản':'Đã lưu trên thiết bị');
  }
  async function getAttempt(ctx){
    await initDb();
    if(!uid){ctx.error='Hãy đăng nhập để đồng bộ bài làm';return;}
    try{
      const {data,error}=await db.from('grade7_book_test_attempts')
        .select('id,answers,status,updated_at')
        .eq('user_id',uid).eq('test_id',ctx.test.id).maybeSingle();
      if(error)throw error;
      if(data){
        ctx.attemptId=data.id;
        // Pending local answers are the only values allowed to override server
        // answers. All synced values from other devices are authoritative.
        ctx.answers={...(data.answers||{}),...ctx.dirty};
        ctx.submitted=data.status==='submitted';
        if(ctx.submitted)ctx.dirty={};
      }else{
        // A local submitted flag is not authoritative without a server row.
        ctx.submitted=false;
      }
      ctx.error='';ctx.synced=!!data;
      persist(ctx);
    }catch(e){ctx.error=e.message||'Không kết nối được máy chủ';}
  }
  function changeAnswer(ctx,key,value){
    if(ctx.submitted)return;
    ctx.answers[key]=value;ctx.dirty[key]=value;
    ctx.synced=false;ctx.error='';persist(ctx);status(ctx);
    clearTimeout(ctx.syncTimer);
    // Only a short debounce for typing; radio/select changes flush at once.
    ctx.syncTimer=setTimeout(()=>{void flushAnswers(ctx)},ctx._choice?0:250);
    ctx._choice=false;
  }
  function flushAnswers(ctx){
    clearTimeout(ctx.syncTimer);
    if(ctx.saving)return ctx.saving;
    if(ctx.submitted||!Object.keys(ctx.dirty).length)return Promise.resolve();
    ctx.saving=(async()=>{
      try{
        await initDb();
        if(!uid)throw Error('Bạn cần đăng nhập để đồng bộ');
        while(!ctx.submitted&&Object.keys(ctx.dirty).length){
          const key=Object.keys(ctx.dirty)[0],value=ctx.dirty[key];
          const {data,error}=await db.rpc('grade7_save_answer',{
            p_test_id:ctx.test.id,p_question_key:key,p_answer:value
          });
          if(error||data!==true)throw error||Error('Chưa lưu được câu trả lời');
          if(ctx.dirty[key]===value)delete ctx.dirty[key];
          ctx.synced=!Object.keys(ctx.dirty).length;
          persist(ctx);status(ctx);
        }
        ctx.error='';
      }catch(e){ctx.error=e.message||'Chưa đồng bộ';status(ctx);}
      finally{
        ctx.saving=null;
        status(ctx);
      }
    })();
    return ctx.saving;
  }
  function answerKey(s,i){return s.label+'-'+(i+1);}
  function scoreObjective(test,values){
    let correct=0,total=0;
    test.sections.forEach(s=>s.questions.forEach((q,i)=>{
      if(q.type==='choice'||q.type==='match'){
        total++;
        if(values[answerKey(s,i)]===q.answer)correct++;
      }
    }));
    return {correct,total};
  }
  function countAll(test){
    return test.sections.reduce((sum,sec)=>sum+sec.questions.length,0);
  }
  function autoMark(q,answer){
    return q.type==='written'?null:(answer===q.answer?1:0);
  }
  function reviewSummary(test,values,grades){
    let correct=0,pending=0,total=0;
    test.sections.forEach(sec=>sec.questions.forEach((q,i)=>{
      total++;
      const key=answerKey(sec,i),manual=grades?.[key];
      const mark=(manual===0||manual===1)?manual:autoMark(q,values[key]);
      if(mark===null)pending++;
      else correct+=mark;
    }));
    return {correct,total,pending};
  }
  async function getPublishedReview(ctx){
    if(!ctx.attemptId)return;
    try{
      const {data,error}=await db.from('grade7_book_test_reviews')
        .select('grades,comments,overall_feedback,score_correct,score_total,status')
        .eq('attempt_id',ctx.attemptId).maybeSingle();
      if(error)throw error;
      ctx.review=data?.status==='published'?data:null;
    }catch(e){console.warn('[Grade7] review read',e);}
  }
  function drawChoice(group,ctx,key,q,word,index,underlines){
    const label=el('label','ldd-mlh7-option');
    const radio=el('input');radio.type='radio';radio.value=letters[index];
    radio.name='ldd-mlh7-'+key;radio.checked=ctx.answers[key]===radio.value;
    radio.disabled=ctx.submitted;
    radio.addEventListener('change',()=>{
      ctx._choice=true;changeAnswer(ctx,key,radio.value);
    });
    const answer=el('span','ldd-mlh7-option-text');
    const token=underlines?.[index],at=token?String(word).indexOf(token):-1;
    if(at>=0){
      answer.append(document.createTextNode(String(word).slice(0,at)));
      answer.append(el('u','',token));
      answer.append(document.createTextNode(String(word).slice(at+token.length)));
    }else answer.textContent=String(word);
    label.append(radio,el('span','ldd-mlh7-letter',letters[index]+'.'),answer);
    group.append(label);
  }
  function renderQuestion(sec,q,i,ctx){
    const key=answerKey(sec,i);
    const field=el('fieldset','ldd-mlh7-question');
    field.append(el('legend','',String(i+1)+'. '+(q.text||'')));
    if(q.type==='choice'){
      const group=el('div','ldd-mlh7-options');
      q.options.forEach((opt,n)=>drawChoice(group,ctx,key,q,opt,n,sec.underlines?.[i]));
      field.append(group);
    }else if(q.type==='match'){
      const select=el('select','ldd-mlh7-select');
      const first=el('option','','— Chọn đáp án —');first.value='';select.append(first);
      sec.choices.forEach((value,j)=>{
        const o=el('option','',letters[j]+'. '+value);o.value=letters[j];select.append(o);
      });
      select.value=ctx.answers[key]||'';select.disabled=ctx.submitted;
      select.addEventListener('change',()=>{
        ctx._choice=true;changeAnswer(ctx,key,select.value);
      });
      field.append(select);
    }else{
      const input=el('textarea','ldd-mlh7-answer');
      input.rows=2;input.placeholder='Nhập câu trả lời…';
      input.value=ctx.answers[key]||'';input.disabled=ctx.submitted;
      input.addEventListener('input',()=>changeAnswer(ctx,key,input.value));
      input.addEventListener('blur',()=>{void flushAnswers(ctx)});
      field.append(input);
    }
    if(ctx.submitted){
      const row=el('p','ldd-mlh7-solution',q.answer?'Đáp án sách: '+q.answer:'Phần tự luận: giảng viên đối chiếu và chấm theo đáp án sách.');
      if(q.type!=='written')row.classList.add(autoMark(q,ctx.answers[key])?'ldd-mlh7-right':'ldd-mlh7-wrong');
      const comment=ctx.review?.comments?.[key];
      const override=ctx.review?.grades?.[key];
      if(override===0||override===1)
        row.append(el('span','ldd-mlh7-teacher-mark',' · Giáo viên: '+(override?'Đúng':'Sai')));
      if(comment)row.append(el('span','ldd-mlh7-teacher-mark',' · Nhận xét: '+comment));
      field.append(row);
    }
    return field;
  }
  // Original scanned source is the authority for question text. Each Unit is
  // fetched only when opened; never download ten PDF assets on the home page.
  const scannedPages=new Map();
  const scansLoading=new Map();
  let ocrLoading=null,ocrByUnit=null;
  function injectScript(src){
    return new Promise((resolve,reject)=>{
      const tag=document.createElement('script');
      tag.async=true;tag.src=src;
      tag.onload=resolve;
      tag.onerror=()=>reject(new Error('Không tải được tài liệu sách. Hãy thử tải lại.'));
      document.head.append(tag);
    });
  }
  async function originalPDF(test){
    if(!test.pdfAsset)return null;
    if(scannedPages.has(test.unit))return scannedPages.get(test.unit);
    if(scansLoading.has(test.unit))return scansLoading.get(test.unit);
    const task=(async()=>{
      if(!window.LDDGrade7PDFData?.[test.unit])
        await injectScript(test.pdfAsset+'?v=20261124-mlh7-original1');
      const b64=window.LDDGrade7PDFData?.[test.unit];
      if(!b64)throw Error('Chưa có bản scan của Unit '+test.unit);
      const binary=atob(b64),bytes=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
      const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
      scannedPages.set(test.unit,url);return url;
    })();
    scansLoading.set(test.unit,task);
    try{return await task;}finally{scansLoading.delete(test.unit);}
  }
  function sourceViewer(test,target){
    if(!test.pdfAsset)return null;
    const wrap=el('section','ldd-mlh7-source');
    const heading=el('h3','','Đề gốc từ sách · Unit '+test.unit);
    const note=el('p','ldd-mlh7-intro',
      'Đọc câu hỏi và các phương án trên bản scan gốc. Phiếu bên dưới dùng để trả lời theo số câu trong sách.');
    const viewer=el('div','ldd-mlh7-pdf-container','Đang tải trang đề gốc…');
    const tools=el('div','ldd-mlh7-source-tools');
    wrap.append(heading,note,tools,viewer);
    target.append(wrap);
    void originalPDF(test).then(url=>{
      if(!wrap.isConnected)return;
      viewer.replaceChildren();
      const iframe=el('iframe','ldd-mlh7-pdf-frame');
      iframe.title='Bản PDF gốc Test for Unit '+test.unit;
      iframe.loading='lazy';iframe.src=url+'#view=FitH&toolbar=1';
      viewer.append(iframe);
      const link=el('a','ldd-mlh7-source-link','Mở đề gốc ở cửa sổ riêng');
      link.href=url;link.target='_blank';link.rel='noopener';
      const download=el('a','ldd-mlh7-source-link','Lưu bản PDF của Unit '+test.unit);
      download.href=url;download.download='Mai-Lan-Huong-Grade7-Unit'+test.unit+'-Test.pdf';
      tools.append(link,download);
    }).catch(e=>{if(wrap.isConnected)viewer.textContent=e.message||'Không tải được PDF';});
    return wrap;
  }
  async function ocrCompanion(){
    if(ocrByUnit)return ocrByUnit;
    if(ocrLoading)return ocrLoading;
    ocrLoading=(async()=>{
      if(!window.LDDGrade7OCRB64)
        await injectScript('ldd-grade7-book-tests-ocr.js?v=20261124-mlh7-ocr1');
      const b64=window.LDDGrade7OCRB64;
      if(!b64)throw Error('Không tải được bản chữ để ghi chú');
      const bin=atob(b64),bytes=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
      return JSON.parse(new TextDecoder().decode(bytes));
    })();
    try{ocrByUnit=await ocrLoading;return ocrByUnit;}
    finally{ocrLoading=null;}
  }
  function addSelectableStudyText(test,content){
    if(!test.pdfAsset)return;
    const details=el('details','ldd-mlh7-ocr');
    const summary=el('summary','','Văn bản chọn để Highlight / Ghi chú');
    const warn=el('p','ldd-mlh7-ocr-warning',
      'Văn bản này được nhận dạng từ bản scan và có thể sai ký tự. Hãy đối chiếu PDF gốc ở phía trên trước khi làm bài.');
    const body=el('div','ldd-mlh7-ocr-text','Đang tải văn bản…');
    body.setAttribute('data-ldd-no-translation','true');
    details.append(summary,warn,body);
    // Keep source text first. Teacher feedback added after submission must
    // not shift existing highlight/note offsets anchored inside the OCR text.
    content.prepend(details);
    void ocrCompanion().then(data=>{
      if(!body.isConnected)return;
      body.textContent=String(data?.[test.unit]||'Không có bản chữ cho Unit này.');
      window.LDDTestAnnotations?.refresh?.();
    }).catch(e=>{if(body.isConnected)body.textContent=e.message||'Không tải được văn bản';});
  }
  window.addEventListener('pagehide',()=>{
    for(const url of scannedPages.values())URL.revokeObjectURL(url);
    scannedPages.clear();
  });
  function drawExam(ctx){
    current=ctx.test;currentContext=ctx;unit=ctx.test.unit;
    setView('exam');
    panel.dataset.annotationTestId=ctx.test.id;
    titleBar('Lớp 7 · Unit '+ctx.test.unit+' · '+ctx.test.title,()=>showTests(ctx.test.unit));
    const s=scoreObjective(ctx.test,ctx.answers);
    panel.append(el('p','ldd-mlh7-intro',ctx.test.source+' · Trang sách '+ctx.test.bookPages));
    if(ctx.submitted){
      panel.append(el('p','ldd-mlh7-score',
        'Máy chấm: '+s.correct+'/'+s.total+' câu trắc nghiệm/nối đáp án. '+(ctx.review?
          'Giáo viên chấm: '+ctx.review.score_correct+'/'+ctx.review.score_total+' câu (đã công bố).':
          'Bài tự luận đang chờ giáo viên chấm.')));
      if(ctx.review?.overall_feedback)
        panel.append(el('p','ldd-mlh7-teacher-feedback','Nhận xét của giảng viên: '+ctx.review.overall_feedback));
    }else{
      panel.append(el('p','ldd-mlh7-intro',
        'Chọn đáp án hoặc nhập câu trả lời: mỗi câu được lưu riêng. Chưa nộp có thể thoát và mở lại để làm tiếp. Chỉ có Highlight/Ghi chú, không có Dịch.'));
    }
    const statusLine=el('p','ldd-mlh7-save-status');
    statusLine.id='ldd-mlh7-save-status';panel.append(statusLine);
    sourceViewer(ctx.test,panel);
    const form=el('form','ldd-mlh7-form');
    form.addEventListener('submit',e=>e.preventDefault());
    const content=el('div','ldd-mlh7-learning-content');
    content.id='ldd-mlh7-text';
    content.setAttribute('data-ldd-text-actions','');
    content.setAttribute('data-ldd-no-translation','true');
    ctx.test.sections.forEach(sec=>{
      const section=el('section','ldd-mlh7-section');
      section.append(el('h3','',sec.label+'. '+sec.title));
      if(sec.passage)section.append(el('div','ldd-mlh7-passage',sec.passage));
      if(sec.type==='match'){
        const legend=el('div','ldd-mlh7-match-choices');
        sec.choices.forEach((text,n)=>legend.append(el('div','',letters[n]+'. '+text)));
        section.append(legend);
      }
      sec.questions.forEach((q,i)=>section.append(renderQuestion(sec,q,i,ctx)));
      content.append(section);
    });
    addSelectableStudyText(ctx.test,content);
    form.append(content);
    const actions=el('div','ldd-mlh7-actions');
    if(!ctx.submitted){
      actions.append(button('Nộp bài','ldd-mlh7-primary',()=>{void submitExam(ctx)}));
    }else{
      actions.append(el('p','ldd-mlh7-intro','Đã nộp bài. Đáp án được khóa để giáo viên chấm trên bài làm hiện tại.'));
    }
    form.append(actions);panel.append(form);
    status(ctx);
    // Dynamic reader root: restore student-owned highlights and notes from
    // Supabase after DOM insertion; notes do not live in local-only memory.
    window.LDDTestAnnotations?.refresh?.();
  }
  async function submitExam(ctx){
    if(ctx.submitted||!uid)return;
    const total=countAll(ctx.test);
    const filled=Object.values(ctx.answers).filter(x=>String(x||'').trim()).length;
    if(filled<total&&!window.confirm('Bạn mới làm '+filled+'/'+total+' câu. Vẫn nộp bài?'))return;
    await flushAnswers(ctx);
    if(Object.keys(ctx.dirty).length){
      window.alert('Có câu chưa đồng bộ. Bài vẫn được lưu trên thiết bị; hãy kiểm tra mạng rồi nộp lại.');
      return;
    }
    try{
      const {data,error}=await db.from('grade7_book_test_attempts')
        .update({status:'submitted',updated_at:new Date().toISOString()})
        .eq('user_id',uid).eq('test_id',ctx.test.id).eq('status','draft')
        .select('id').single();
      if(error)throw error;
      ctx.submitted=true;ctx.attemptId=data.id;ctx.synced=true;persist(ctx);
      await getPublishedReview(ctx);drawExam(ctx);
    }catch(e){window.alert('Không nộp được bài: '+(e.message||'Lỗi kết nối')+'. Đáp án vẫn được lưu để làm tiếp.');}
  }
  async function openTest(test){
    const request=++openSerial;
    await initDb();
    if(!uid){window.alert('Hãy đăng nhập để làm bài và lưu tiến độ.');return;}
    const ctx=drafts.get(test.id)||newContext(test);
    currentContext=ctx;
    await getAttempt(ctx);
    if(request!==openSerial)return;
    if(ctx.submitted)await getPublishedReview(ctx);
    drawExam(ctx);
    if(Object.keys(ctx.dirty).length)void flushAnswers(ctx);
  }
  async function teacherList(){
    await initDb();if(!teacher)return;
    current=null;currentContext=null;setView('teacher-list');
    titleBar('Giảng viên · Chấm bài lớp 7',grades);
    panel.append(el('p','ldd-mlh7-intro','Bài đã nộp · điểm trắc nghiệm máy chấm · giáo viên chấm riêng từng câu và có thể sửa điểm.'));
    const list=el('div','ldd-mlh7-teacher-list');
    panel.append(list);list.append(el('p','','Đang tải bài nộp…'));
    try{
      const [attempts,students,reviews]=await Promise.all([
        db.from('grade7_book_test_attempts').select('id,user_id,test_id,updated_at,status')
          .eq('status','submitted').order('updated_at',{ascending:false}).limit(200),
        db.from('student_grade_assignments').select('user_id,email,display_name'),
        db.from('grade7_book_test_reviews').select('attempt_id,status,score_correct,score_total')
      ]);
      if(attempts.error)throw attempts.error;
      const people=new Map((students.data||[]).map(s=>[s.user_id,s]));
      const grades=new Map((reviews.data||[]).map(s=>[s.attempt_id,s]));
      list.replaceChildren();
      const records=(attempts.data||[]).filter(a=>library.tests.some(t=>t.id===a.test_id));
      if(!records.length){list.append(el('p','ldd-mlh7-empty','Chưa có học viên nộp bài lớp 7.'));return;}
      records.forEach(a=>{
        const test=library.tests.find(t=>t.id===a.test_id);
        const who=people.get(a.user_id);
        const review=grades.get(a.id);
        const name=who?.display_name||who?.email||a.user_id;
        const summary=review?.status==='published'?'Đã chấm '+review.score_correct+'/'+review.score_total:'Chưa công bố điểm giáo viên';
        const row=folder('📝 '+name+' · Unit '+test.unit+' · '+test.title,
          'Đã nộp · '+summary,
          ()=>{void teacherGrade(a,test)});
        list.append(row);
      });
    }catch(e){list.replaceChildren(el('p','ldd-mlh7-empty','Không tải được bài nộp: '+(e.message||'Lỗi kết nối')));}
  }
  async function teacherGrade(attempt,test){
    await initDb();if(!teacher||attempt.status!=='submitted')return;
    setView('teacher-grade');
    titleBar('Chấm bài · Unit '+test.unit+' · '+test.title,()=>{void teacherList()});
    sourceViewer(test,panel);
    const loading=el('p','ldd-mlh7-intro','Đang đọc điểm chấm…');panel.append(loading);
    try{
      // The list is metadata-only for low egress. Load one learner's answer
      // sheet only when the teacher opens that submitted attempt.
      const [saved,previous]=await Promise.all([
        db.from('grade7_book_test_attempts').select('answers')
          .eq('id',attempt.id).eq('status','submitted').single(),
        db.from('grade7_book_test_reviews')
          .select('grades,comments,overall_feedback,status')
          .eq('attempt_id',attempt.id).maybeSingle()
      ]);
      if(saved.error)throw saved.error;
      if(previous.error)throw previous.error;
      const studentAnswers=saved.data?.answers||{};
      const existing=previous.data;
      loading.remove();
      const state={grades:{...(existing?.grades||{})},comments:{...(existing?.comments||{})},
        feedback:existing?.overall_feedback||'',published:existing?.status==='published',
        saveTimer:0,saving:false,error:'',revision:0,queued:false,queuedPublish:false};
      const summary=el('p','ldd-mlh7-score');panel.append(summary);
      const statusLine=el('p','ldd-mlh7-save-status');panel.append(statusLine);
      const body=el('div','ldd-mlh7-teacher-review');panel.append(body);
      function paintSummary(){
        const score=reviewSummary(test,studentAnswers,state.grades);
        const auto=scoreObjective(test,studentAnswers);
        summary.textContent='Máy: '+auto.correct+'/'+auto.total+' câu khách quan · Điểm hiện tại: '+score.correct+'/'+score.total+
          (score.pending?' · Còn '+score.pending+' câu tự luận chưa chấm':' · Đã chấm đủ');
        return score;
      }
      const save=async publish=>{
        if(state.saving){
          // Serialize instructor saves. A later edit or Publish may arrive
          // before the previous request completes; never discard it.
          state.queued=true;
          state.queuedPublish=state.queuedPublish||!!publish;
          return false;
        }
        const score=paintSummary();
        if(publish&&score.pending){
          window.alert('Còn '+score.pending+' câu chưa chấm. Hãy chấm đủ trước khi công bố.');return false;
        }
        const revision=state.revision;
        state.saving=true;statusLine.textContent='Đang lưu điểm và nhận xét…';
        try{
          const row={
            attempt_id:attempt.id,grades:{...state.grades},comments:{...state.comments},
            overall_feedback:state.feedback,score_correct:score.pending?null:score.correct,
            score_total:score.pending?null:score.total,
            status:publish||state.published?'published':'draft',
            graded_by:uid,graded_at:publish||state.published?new Date().toISOString():null,
            updated_at:new Date().toISOString()
          };
          const {error}=await db.from('grade7_book_test_reviews')
            .upsert(row,{onConflict:'attempt_id'});
          if(error)throw error;
          state.published=row.status==='published';
          statusLine.textContent=state.published?'✓ Đã công bố điểm giáo viên':'✓ Đã lưu bản chấm nháp';
          return true;
        }catch(e){statusLine.textContent='Chưa lưu được: '+(e.message||'Lỗi kết nối');return false;}
        finally{
          state.saving=false;
          if(state.queued||revision!==state.revision){
            const nextPublish=state.queuedPublish;
            state.queued=false;state.queuedPublish=false;
            void save(nextPublish);
          }
        }
      };
      function changed(){
        state.revision++;
        paintSummary();statusLine.textContent='Chưa lưu thay đổi';
        clearTimeout(state.saveTimer);
        state.saveTimer=setTimeout(()=>{void save(false)},1200);
      }
      test.sections.forEach(sec=>{
        const section=el('section','ldd-mlh7-section');
        section.append(el('h3','',sec.label+'. '+sec.title));
        if(sec.passage)section.append(el('div','ldd-mlh7-passage',sec.passage));
        sec.questions.forEach((q,i)=>{
          const key=answerKey(sec,i),field=el('article','ldd-mlh7-review-item');
          field.append(el('h4','',key+' · '+(q.text||('Câu '+(i+1)+' ('+sec.title+')'))));
          // Show the actual source options; without these, teachers cannot
          // judge questions that contain only four answer choices.
          if(q.type==='choice'){
            const choices=el('div','ldd-mlh7-teacher-choices');
            q.options.forEach((choice,n)=>{
              const item=el('span','',letters[n]+'. '+choice);
              choices.append(item);
            });
            field.append(choices);
          }else if(q.type==='match'){
            const choices=el('div','ldd-mlh7-teacher-choices');
            sec.choices.forEach((choice,n)=>choices.append(el('span','',letters[n]+'. '+choice)));
            field.append(choices);
          }
          field.append(el('p','ldd-mlh7-student-answer',
            'Học viên: '+String(studentAnswers[key]||'(chưa trả lời)')));
          field.append(el('p','ldd-mlh7-book-answer',q.answer?'Đáp án sách: '+q.answer:'Tự luận: đối chiếu đáp án trong sách để chấm.'));
          const automatic=autoMark(q,studentAnswers[key]);
          const label=el('label','ldd-mlh7-grade-line',automatic===null?
            'Giáo viên chấm tự luận: ':'Điểm máy: '+(automatic?'Đúng':'Sai')+' · Chấm lại: ');
          const select=el('select','ldd-mlh7-grade-select');
          const options=[
            ['',''+(automatic===null?'— Chưa chấm —':'Giữ điểm máy')],['1','✓ Đúng (1 điểm)'],['0','✕ Sai (0 điểm)']
          ];
          options.forEach(([value,name])=>{
            const o=el('option','',name);o.value=value;select.append(o);
          });
          select.value=state.grades[key]===0||state.grades[key]===1?
            String(state.grades[key]):'';
          select.addEventListener('change',()=>{
            if(select.value==='')delete state.grades[key];
            else state.grades[key]=Number(select.value);
            changed();
          });
          label.append(select);field.append(label);
          const comment=el('textarea','ldd-mlh7-teacher-comment');
          comment.rows=2;comment.maxLength=1000;
          comment.placeholder='Nhận xét câu này (nếu cần)…';
          comment.value=state.comments[key]||'';
          comment.addEventListener('input',()=>{
            if(comment.value.trim())state.comments[key]=comment.value;
            else delete state.comments[key];changed();
          });
          field.append(comment);section.append(field);
        });
        body.append(section);
      });
      const overall=el('textarea','ldd-mlh7-teacher-comment ldd-mlh7-overall');
      overall.rows=4;overall.maxLength=4000;
      overall.placeholder='Nhận xét tổng thể của giảng viên…';overall.value=state.feedback;
      overall.addEventListener('input',()=>{state.feedback=overall.value;changed()});
      body.append(el('h3','','Nhận xét tổng thể'),overall);
      const actionbar=el('div','ldd-mlh7-actions');
      actionbar.append(button('Lưu bản chấm','ldd-mlh7-secondary',()=>{
        clearTimeout(state.saveTimer);void save(false);
      }));
      actionbar.append(button('Công bố điểm cho học viên','ldd-mlh7-primary',()=>{
        clearTimeout(state.saveTimer);void save(true);
      }));
      panel.append(actionbar);paintSummary();
    }catch(e){loading.textContent='Không mở được bài chấm: '+(e.message||'Lỗi kết nối');}
  }
  card.addEventListener('click',openRoot);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden')drafts.forEach(ctx=>{void flushAnswers(ctx)});
  });
  window.addEventListener('pagehide',()=>drafts.forEach(ctx=>{void flushAnswers(ctx)}));
  window.addEventListener('online',()=>drafts.forEach(ctx=>{void flushAnswers(ctx)}));
  window.addEventListener('ldd:exam-close',()=>{if(!panel.hidden)closeRoot()});
  try{
    const saved=JSON.parse(sessionStorage.getItem(KEY+'route')||'null');
    if(saved?.stage&&tab.classList.contains('active')){
      openRoot();
      if(saved.stage==='units')units();
      if(saved.stage==='tests')showTests(Number(saved.unit)||1);
      if(saved.stage==='exam'){
        const test=library.tests.find(t=>t.id===saved.testId&&t.verified);
        if(test)void openTest(test);
      }
      if(saved.stage==='teacher-list')void teacherList();
    }
  }catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();