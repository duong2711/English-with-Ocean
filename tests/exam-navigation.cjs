// Run with Playwright available on NODE_PATH. Optional EXAM_BROWSER_PATH selects a local Chromium.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');const root=path.resolve(__dirname, '..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link\b[^>]*>/gi,'');
const source=fs.readFileSync(path.join(root,'scriptphonetics.js'),'utf8');
function moduleCode(name,hook){const start=source.indexOf('(function '+name+'() {');assert(start>=0);const end=source.indexOf('\n})();',start);return source.slice(start,end)+'\n'+hook+source.slice(end,end+7);}
const custom=moduleCode('initCustomTestModule',`window.customFixture={open(test,answers={}){ currentTest=test;currentAnswers=answers;showView('take');renderTakeSections(test);ctestStartTimer(45,new Date().toISOString());}, close(){showView('list');}, getAnswers(){return currentAnswers;}};`);
const ielts=(name,prefix)=>moduleCode(name,`window.${prefix}Fixture={open(test,answers={}){currentTest=test;currentAnswers=answers;currentMode='take';const result=renderTestBody(test,'take');takeBodyEl.replaceChildren(result.el);iltBuildPartNav();iltBuildAnswerSheet(result.total);iltShowPart(0);showView('take');iltStartTimer(45,new Date().toISOString());${prefix==='irt'?'iltSetFocusMode(true);':''}},close(){showView('list');}};`);
const qs=[{type:'mcq',prompt:'Choose an answer.',options:['One','Two'],correct:0},{type:'mcq_multi',prompt:'Choose answers.',options:['A','B','C'],correct:[0,1]},{type:'fill_blank',html:'She <b>likes</b> <b>apples</b>.'},{type:'wordbank',html:'This is <b>blue</b>.'},{type:'reorder',sentence:'We like English'},{type:'matching',left:['one','two'],right:['một','hai']},{type:'essay',prompt:'Write a sentence.'},{type:'reading',passage:'A short reading passage.',sub_questions:[{type:'mcq',prompt:'Nested question',options:['yes','no'],correct:0}]},{type:'listening',sub_questions:[{type:'essay',prompt:'Write what you hear.'}]},{type:'mixed',parts:[{type:'essay',prompt:'First part'},{type:'fill_blank',html:'A <b>word</b>.'}]}];
const test={title:'Kiểm tra responsive',sections:[{id:'s',title:'Phần I',questions:Array.from({length:4},(_,i)=>qs.map((q,j)=>({...q,id:`q${i}-${j}`}))).flat()}]};
(async()=>{
 const b=await chromium.launch({executablePath:process.env.EXAM_BROWSER_PATH || undefined,args:['--no-sandbox','--disable-dev-shm-usage'],headless:true});
 const p=await b.newPage({viewport:{width:1366,height:900}});let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.abort());await p.setContent(html,{waitUntil:'domcontentloaded'});
 for(const name of ['stylephonetics.css','ldd-ui-upgrade-core.css','ldd-responsive-foundation.css','ldd-exam-navigation.css'])await p.addStyleTag({content:fs.readFileSync(path.join(root,name),'utf8').replace(/@import[^;]+;/g,'')});
 await p.evaluate(()=>{document.body.classList.add('ldd-ui-v2','ldd-motion-ready');document.getElementById('inside').classList.add('ldd-navigation-pulse');document.getElementById('ctest-panel').classList.add('ldd-view-enter');window.sb={};window.wireSecureAudioEl=()=>{};document.querySelectorAll('.main-tab-content').forEach(x=>x.classList.toggle('active',x.id==='tab-kiem-tra'));document.querySelector('#inside').style.display='block';document.querySelector('#auth-container').style.display='none';document.querySelector('#ctest-panel').style.display='block';});
 await p.addScriptTag({path:path.join(root,'ldd-exam-navigation.js')});await p.addScriptTag({content:custom});await p.evaluate(test=>customFixture.open(test),test);await p.waitForTimeout(100);
 assert.equal(await p.locator('#ctest-question-navigation button').count(),44);
 assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),0);
 await p.locator('#ctest-take-sections input[type=radio]').first().check();assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),1);
 // Completion is about having answered, independent of correctness.
 await p.locator('#ctest-take-sections input[type=radio]').nth(1).check();assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),1);
 const fill=p.locator('#ctest-take-sections .ctest-blank-input');await fill.nth(0).fill('wrong');assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),1);await fill.nth(1).fill('answer');assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),2);await fill.nth(0).fill('');assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),1);
 // Multi-select, word bank, ordering, matching and essay completion all use
 // the renderer's answer model, including clearing and incomplete grouped answers.
 const nav=p.locator('#ctest-question-navigation button');
 const multi=p.locator('.ctest-take-qblock:has(> .ctest-multi-take-hint)').first();
 await multi.locator('input').first().check();assert(await nav.nth(1).evaluate(x=>x.classList.contains('is-answered')));
 await multi.locator('input').first().uncheck();assert(!(await nav.nth(1).evaluate(x=>x.classList.contains('is-answered'))));
 await p.locator('.ctest-blank-select').first().selectOption('blue');assert(await nav.nth(3).evaluate(x=>x.classList.contains('is-answered')));
 await p.locator('.ctest-blank-select').first().selectOption('');assert(!(await nav.nth(3).evaluate(x=>x.classList.contains('is-answered'))));
 const reorder=p.locator('.ctest-take-qblock:has(> .ctest-reorder-strip)').first();
 await reorder.locator('.ctest-reorder-pool .ctest-reorder-chip').first().click();assert(!(await nav.nth(4).evaluate(x=>x.classList.contains('is-answered'))));
 await reorder.locator('.ctest-reorder-pool .ctest-reorder-chip').first().click();await reorder.locator('.ctest-reorder-pool .ctest-reorder-chip').first().click();assert(await nav.nth(4).evaluate(x=>x.classList.contains('is-answered')));
 await reorder.locator('.ctest-reorder-strip .ctest-reorder-chip').first().click();assert(!(await nav.nth(4).evaluate(x=>x.classList.contains('is-answered'))));
 const match=p.locator('.ctest-match-take-wrap').first();
 await match.locator('.ctest-match-take-col').nth(0).locator('.ctest-match-take-item').first().click();await match.locator('.ctest-match-take-col').nth(1).locator('.ctest-match-take-item').first().click();assert(!(await nav.nth(5).evaluate(x=>x.classList.contains('is-answered'))));
 await match.locator('.ctest-match-take-col').nth(0).locator('.ctest-match-take-item').nth(1).click();await match.locator('.ctest-match-take-col').nth(1).locator('.ctest-match-take-item').nth(1).click();assert(await nav.nth(5).evaluate(x=>x.classList.contains('is-answered')));
 await p.locator('#ctest-take-sections textarea').first().fill('Draft essay');assert(await nav.nth(6).evaluate(x=>x.classList.contains('is-answered')));
 await p.locator('#ctest-take-sections textarea').first().fill('');assert(!(await nav.nth(6).evaluate(x=>x.classList.contains('is-answered'))));
 // Preserve values, listeners and focus across timer ticks.
 await fill.first().fill('saved');const inputHandle=await fill.first().elementHandle();await p.waitForTimeout(1100);assert(await inputHandle.evaluate(el=>el===document.querySelector('.ctest-blank-input')));assert.equal(await fill.first().inputValue(),'saved');
 for(const [width,height] of [[320,568],[360,800],[390,844],[600,800],[800,600],[801,600],[1024,768],[1366,900],[1920,1080],[667,375]]){
  await p.setViewportSize({width,height});await p.waitForTimeout(60);
  if(width<=800){await p.locator('#ctest-take-view .ldd-exam-sheet-toggle').click();
   const expanded=await p.evaluate(()=>{const v=document.querySelector('#ctest-take-view');return {nav:v.querySelector('.ldd-exam-sheet').getBoundingClientRect().bottom,paper:v.querySelector('.ldd-exam-paper').getBoundingClientRect().top};});assert(expanded.nav<=expanded.paper+1);
   await p.locator('#ctest-question-navigation button').last().click();}else await p.locator('#ctest-question-navigation button').last().click();
  await p.waitForTimeout(350);
  const box=await p.evaluate(()=>{const v=document.querySelector('#ctest-take-view'),paper=v.querySelector('.ldd-exam-paper'),timer=v.querySelector('.ldd-exam-clock'),nav=v.querySelector('.ldd-exam-sheet'),toolbar=v.querySelector('.ldd-exam-toolbar');const rect=e=>{if(!e)throw new Error("Missing element "+v.innerHTML.slice(0,800));let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,b:r.bottom,r:r.right}};return {paper:rect(paper),timer:rect(timer),toolbar:rect(toolbar),nav:rect(nav),scroll:paper.scrollTop,overflow:paper.scrollWidth>paper.clientWidth+1,active:v.classList.contains('ldd-exam-open')};});
  assert(box.active);assert(box.timer.b<=box.paper.y+1,JSON.stringify({width,box}));assert(box.timer.x>=0&&box.timer.r<=width+1);assert(box.paper.b<=height+1);assert(box.scroll>0);assert(!box.overflow,JSON.stringify({width,box}));
  if(width>800)assert(box.paper.r<=box.nav.x+1);
  await p.screenshot({path:`/tmp/exam-${width}.png`});
  console.log('PASS custom viewport',width,height);
 }
 await p.evaluate(()=>customFixture.close());await p.waitForTimeout(60);assert.equal(await p.locator('body.ldd-exam-active').count(),0);
 // Restored answers are green immediately; question navigation doesn't reset them.
 await p.evaluate(test=>customFixture.open(test,{'s:q0-0':0,'s:q0-6':'Restored essay'}),test);await p.waitForTimeout(60);assert.equal(await p.locator('#ctest-question-navigation button.is-answered').count(),2);await p.evaluate(()=>customFixture.close());
 await p.addScriptTag({content:ielts('initIeltsListeningModule','ilt')});await p.addScriptTag({content:ielts('initIeltsReadingModule','irt')});
 const ieltsTest={title:'IELTS fixture',parts:Array.from({length:3},(_,part)=>({passage_html:'<p>'+('Reading passage. '.repeat(250))+'</p>',sections:[{id:'s'+part,blocks:[{id:'p',type:'paragraph',html:'A <u>blank</u> in a sentence.'},...Array.from({length:12},(_,i)=>({id:'mc'+i,type:'mcq',prompt_html:'Question '+(i+1),options:['Option A','Option B'],correct:0}))]}]}))};
 for(const prefix of ['ilt','irt']){
  await p.evaluate(({prefix,test})=>{document.getElementById(prefix+'-panel').style.display='block';window[prefix+'Fixture'].open(test);},{prefix,test:ieltsTest});await p.waitForTimeout(100);
  assert.equal(await p.locator(`#${prefix}-question-navigation button`).count(),39);
  for(const width of [320,390,800,1024,1366]){
   await p.setViewportSize({width,height:800});await p.waitForTimeout(80);
   if(width<=800)await p.locator(`#${prefix}-take-view .ldd-exam-sheet-toggle`).click();
   await p.locator(`#${prefix}-question-navigation button`).last().click();await p.waitForTimeout(1000);
   assert(await p.locator(`#${prefix}-q-39`).isVisible());
   const geometry=await p.evaluate(prefix=>{const v=document.getElementById(prefix+'-take-view'),a=v.querySelector('.ldd-exam-clock').getBoundingClientRect(),paper=v.querySelector('.ldd-exam-paper'),b=paper.getBoundingClientRect(),q=document.getElementById(prefix+'-q-39').getBoundingClientRect();return {timerBottom:a.bottom,paperTop:b.top,paperBottom:b.bottom,questionTop:q.top,questionBottom:q.bottom,scroll:paper.scrollTop,scrollHeight:paper.scrollHeight,overflow:paper.scrollWidth>paper.clientWidth+1};},prefix);
   await p.screenshot({path:`/tmp/debug-${prefix}-${width}.png`});assert(geometry.timerBottom<=geometry.paperTop+1,JSON.stringify({prefix,width,geometry}));assert(geometry.questionBottom<=geometry.paperBottom+1&&geometry.questionTop>=geometry.paperTop,JSON.stringify({prefix,width,geometry}));assert(!geometry.overflow,JSON.stringify({prefix,width,geometry}));
   await p.locator(`#${prefix}-q-39 input[type=radio]`).first().check();await p.waitForTimeout(20);assert(await p.locator(`#${prefix}-answer-sheet-grid button`).last().evaluate(x=>x.classList.contains('is-answered')));
   await p.screenshot({path:`/tmp/${prefix}-${width}.png`});console.log('PASS',prefix,'viewport',width);
  }
  await p.evaluate(prefix=>window[prefix+'Fixture'].close(),prefix);await p.waitForTimeout(50);
 }

 // Sequential vocabulary navigation: drafts survive a jump; revisiting submitted
 // items cannot double-count an attempt or bypass a pending pronunciation step.
 function fn(name,next){const start=source.indexOf('        function '+name+'(');const end=source.indexOf('        function '+next+'(',start);assert(start>0&&end>start);return source.slice(start,end);}
 const weekly= `let currentWeeklyTest=null,currentWeeklyTestIndex=0,weeklyNavigationSheet=null;
 const vocabWeeklyBodyEl=document.getElementById('vocab-weekly-question-body'),vocabWeeklyProgressEl=document.getElementById('vocab-weekly-progress');
 let saved=0;const vocabWordProgressMap={};const canFillBlankForVocab=()=>false,escapeHtmlNews=x=>x,checkMeaningAnswer=()=>true,normalizeWord=x=>x;
 async function submitVocabWeeklyAnswer(item,correct){saved++;item.answered=true;item.is_correct=correct;}
 function renderVocabWeeklySummary(){window.weeklySummary=true;}
 function renderVocabWeeklyPronounceStep(){const el=document.createElement('div');el.className='vocab-weekly-pron-step';vocabWeeklyBodyEl.appendChild(el);}
 `+fn('refreshVocabWeeklyNavigation','renderVocabWeeklyQuestion')+fn('renderVocabWeeklyQuestion','appendVocabWeeklyNextButton')+fn('appendVocabWeeklyNextButton','renderVocabWeeklyPronounceStep')+`
 window.weeklyFixture={open(needsPronunciation=false){saved=0;currentWeeklyTestIndex=0;currentWeeklyTest={items:[0,1,2].map(i=>({id:i,vocab_id:i,question_type:2,vocab:{word:'word '+i,meaning:'nghĩa'}}))};for(let i=0;i<3;i++)vocabWordProgressMap[i]={pron_first_checked:!needsPronunciation,pron_passed_count:1,pron_tier_required:1};document.getElementById('vocab-weekly-test-overlay').style.display='flex';renderVocabWeeklyQuestion();},saved:()=>saved,index:()=>currentWeeklyTestIndex,finishPron(){appendVocabWeeklyNextButton(currentWeeklyTestIndex,3);}};`;
 await p.addScriptTag({content:'(function(){'+weekly+'})();'});await p.evaluate(()=>weeklyFixture.open());
 async function weeklyGo(index){await p.locator('#vocab-weekly-question-nav summary').click();await p.locator('#vocab-weekly-question-nav button').nth(index).click();}
 await p.locator('#vocab-weekly-answer-input').fill('draft one');await weeklyGo(1);await p.locator('#vocab-weekly-answer-input').fill('answer two');await p.locator('#vocab-weekly-submit-btn').click();await p.waitForTimeout(20);assert.equal(await p.evaluate(()=>weeklyFixture.saved()),1);
 await weeklyGo(0);assert.equal(await p.locator('#vocab-weekly-answer-input').inputValue(),'draft one');await weeklyGo(1);assert(await p.locator('#vocab-weekly-submit-btn').isDisabled());assert.equal(await p.evaluate(()=>weeklyFixture.saved()),1);
 await weeklyGo(2);await p.locator('#vocab-weekly-answer-input').fill('answer three');await p.locator('#vocab-weekly-submit-btn').click();await p.locator('.vocab-weekly-next-btn').click();assert.equal(await p.evaluate(()=>weeklyFixture.index()),0);assert.equal(await p.locator('#vocab-weekly-answer-input').inputValue(),'draft one');assert.equal(await p.evaluate(()=>Boolean(window.weeklySummary)),false);
 await p.evaluate(()=>weeklyFixture.open(true));await p.locator('#vocab-weekly-answer-input').fill('answer');await p.locator('#vocab-weekly-submit-btn').click();assert.equal(await p.locator('#vocab-weekly-question-nav button:disabled').count(),3);await p.evaluate(()=>weeklyFixture.finishPron());assert.equal(await p.locator('#vocab-weekly-question-nav button:disabled').count(),0);
 await p.screenshot({path:'/tmp/exam-weekly.png'});console.log('PASS vocabulary drafts, navigation, no duplicate attempts, pronunciation lock, incomplete summary guard');
 // Standalone paper executes its real scripts against local files, with no login/network.
 await p.route('http://exam.test/**',async route=>{const file=path.join(root,new URL(route.request().url()).pathname);if(!fs.existsSync(file)){await route.abort();return;}await route.fulfill({body:fs.readFileSync(file),contentType:file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'});});
 await p.goto('http://exam.test/kiem-tra-unit-3-lop-9.html');
 assert.equal(await p.locator('.ldd-exam-inline-sheet button').count(),40);
 await p.locator('#q1 input').first().check();assert.equal(await p.locator('.ldd-exam-inline-sheet button.is-answered').count(),1);
 await p.locator('#q31 textarea').fill('A written response.');assert.equal(await p.locator('.ldd-exam-inline-sheet button.is-answered').count(),2);await p.locator('#q31 textarea').fill('');assert.equal(await p.locator('.ldd-exam-inline-sheet button.is-answered').count(),1);
 for(const width of [320,390,800,1366]){
  await p.setViewportSize({width,height:800});await p.locator('.ldd-exam-inline-sheet summary').click();await p.locator('.ldd-exam-inline-sheet button').last().click();await p.waitForTimeout(100);
  const rect=await p.evaluate(()=>{let toolbar=document.querySelector('.toolbar').getBoundingClientRect(),q=document.getElementById('q40').getBoundingClientRect();return {toolbar:toolbar.bottom,question:q.top,right:q.right,width:innerWidth};});
  assert(rect.question>=rect.toolbar,JSON.stringify({width,rect}));assert(rect.right<=rect.width);console.log('PASS standalone viewport',width);
 }
 assert.deepEqual(errors,[]);await b.close();console.log('PASS all exam types, restored answers, clearing answers, timer stability, part navigation, responsive geometry');
})().catch(e=>{console.error(e);process.exit(1)});
