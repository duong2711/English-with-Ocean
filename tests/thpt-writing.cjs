/* Run with the same jsdom runtime as thcs-writing.cjs. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),pause=()=>new Promise(r=>setTimeout(r,15));
async function setup(storage={},teacher=false){
 const dom=new JSDOM('<main id="root"></main>',{url:'https://qa.example/',runScripts:'outside-only'}),w=dom.window,rows=[],assignments=[];
 for(const [k,v] of Object.entries(storage))w.localStorage.setItem(k,v);
 let resolveAI,prompt='',user={id:'alice',email:teacher?'lddbaiu@gmail.com':'alice@example.test'};
 w.LDDWritingAPI={session:async()=>user,draft:async()=>null,saveDraft:async()=>{},submit:async row=>{rows.push(row);return{id:'s1'};},history:async()=>[],assignments:async()=>[{task_key:'g6-u1:a'},{task_key:'g12-u1:a'}],students:async()=>[{user_id:'bob',email:'bob@example.test',grade_level:12}],assign:async(...x)=>assignments.push(x)};
 w.aiHelper={callAIJSON:p=>{prompt=p;return new Promise(r=>resolveAI=r);}};
 for(const file of ['ldd-thcs-writing-data.js','ldd-thpt-writing-data.js','ldd-thcs-writing.js'])w.eval(fs.readFileSync(path.join(root,file),'utf8'));
 const mount=async track=>{await w.LDDTHCSWriting.mount(w.document.getElementById('root'),track);await pause();};
 await mount('thpt');
 const click=async selector=>{const el=w.document.querySelector(selector);assert(el,'missing '+selector);el.click();await pause();};
 const fill=text=>{const el=w.document.querySelector('[data-w-field="text"]');el.value=text;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
 const snapshot=()=>Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}));
 return {w,dom,rows,assignments,mount,click,fill,snapshot,getPrompt:()=>prompt,resolve:()=>resolveAI({scores:{content:3,grammar:3,vocabulary:2,organisation:1,mechanics:1},comment:'Good.',errors:[]})};
}
(async()=>{
 let t=await setup(),w=t.w,D=w.LDDTHCSWritingData;
 assert.equal(D.units.length,78);assert.equal(D.reviews.length,28);assert.equal(new Set(D.units.map(u=>u.id)).size,78);
 for(const grade of [10,11,12]){
  const list=D.units.filter(u=>u.grade===grade);assert.equal(list.length,10);
  assert.deepEqual(Array.from(D.reviews.filter(r=>r.grade===grade).map(r=>r.throughUnit)),[3,5,8,10]);
  for(const u of list){assert.equal(u.questions.length,5);assert.equal(u.exercises.length,4);assert.notEqual(u.prompt,u.alternate);const n=w.LDDTHCSWriting.words(u.model);assert(n>=u.minWords&&n<=u.maxWords,u.id+' model: '+n);assert.notEqual(u.exercises[3].prompt,u.exercises[3].answer);
   for(const variant of ['a','b']){const task=w.LDDTHCSWriting.task(u.id+':'+variant);if(u.kind==='linegraph'||u.kind==='piechart')assert(task.chart);if(u.kind==='biography')assert(task.sourceText);}
  }
 }
 assert.equal(w.document.querySelectorAll('.tw-card').length,10);assert.equal(w.document.querySelectorAll('[data-w-grade]').length,3);assert(!w.document.querySelector('[data-w-grade="6"]'));
 await t.click('[data-w-task="g10-u1:a"]');await t.click('[data-w-step="2"]');t.fill('My grade ten draft.');
 await t.mount('thcs');assert.equal(w.document.querySelectorAll('.tw-card').length,12);assert(w.document.querySelector('[data-w-grade="6"]'));
 await t.click('[data-w-task="g6-u1:b"]');t.fill('My grade six draft.');await t.mount('thpt');assert.equal(w.document.querySelector('[data-w-field="text"]').value,'My grade ten draft.');
 await t.click('[data-w-grade="12"]');await t.click('[data-w-task="g12-u4:a"]');await t.click('[data-w-step="2"]');assert(w.document.querySelector('.tw-chart svg'));assert(w.document.querySelector('.tw-chart table').textContent.includes('North'));
 await t.click('[data-w-action="home"]');await t.click('[data-w-task="g12-u4:b"]');assert(w.document.querySelector('.tw-chart table').textContent.includes('Lake Town'));assert(!w.document.querySelector('.tw-chart table').textContent.includes('North'));
 t.fill('The chart compares two towns.');await t.click('[data-w-action="submit"]');assert(t.getPrompt().includes('Lake Town'));assert(!t.getPrompt().includes('"North"'));
 await t.mount('thcs');t.resolve();await pause();await pause();assert.equal(t.rows[0].grade,12);assert.equal(t.rows[0].task_key,'g12-u4:b');assert(w.document.querySelector('[data-w-grade="6"]'));
 await t.mount('thpt');await t.click('[data-w-action="home"]');await t.click('[data-w-task="g12-u7:b"]');assert.equal(w.document.querySelectorAll('.tw-pies svg').length,2);const c=w.LDDTHCSWriting.task('g12-u7:b').chart;for(const s of c.series)assert.equal(s.values.reduce((a,b)=>a+b,0),100);
 await t.click('[data-w-action="home"]');await t.click('[data-w-task="g12-u1:b"]');assert(w.document.body.textContent.includes('Nam Le'));assert(!w.document.body.textContent.includes('Mai Tran'));
 const storage=t.snapshot();t.dom.window.close();t=await setup(storage);w=t.w;assert(w.document.body.textContent.includes('Nam Le'));assert(w.document.querySelector('[data-w-grade="12"][aria-pressed="true"]'));
 await t.click('[data-w-action="assignments"]');assert(w.document.querySelector('[data-w-task="g12-u1:a"]'));assert(!w.document.querySelector('[data-w-task="g6-u1:a"]'));
 t.dom.window.close();t=await setup({},true);w=t.w;await t.click('[data-w-grade="12"]');await t.click('[data-w-action="assign"]');assert.equal(w.document.querySelector('[name="task"]').options.length,24);w.document.querySelector('[name="task"]').value='g12-u9:b';w.document.querySelector('[data-w-assign]').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await pause();assert.equal(t.assignments[0][1],'g12-u9:b');
 t.dom.window.close();console.log('PASS: 30 THPT units, 12 reviews, word counts, isolated grade tracks and drafts, chart variants and grading context, biography source, reload, async submission, assignment filtering and teacher assignment.');
})().catch(e=>{console.error(e);process.exit(1);});
