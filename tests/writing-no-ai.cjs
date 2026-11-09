/* Run with NODE_PATH pointing to jsdom, as for tests/thcs-writing.cjs. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
const sleep=()=>new Promise(r=>setTimeout(r,35));
(async()=>{
 const dom=new JSDOM('<main id="root"></main>',{url:'https://qa.example/',runScripts:'outside-only'});
 const w=dom.window,rows=[];let aiCalls=0;
 w.LDDWritingAPI={
  session:async()=>({id:'student',email:'student@example.test'}),
  draft:async()=>null,saveDraft:async()=>{},
  submit:async row=>{rows.push(row);return {id:'s1'};}
 };
 w.aiHelper={callAIJSON:async prompt=>{
  aiCalls++;
  if(prompt.includes('Chấm một câu'))return {correct:true,comment:'Đúng nghĩa và đúng ngữ pháp.'};
  return {scores:{content:3,grammar:3,vocabulary:2,organisation:1,mechanics:1},comment:'Đã đọc bài.',errors:[]};
 }};
 w.eval(fs.readFileSync(path.join(root,'ldd-thcs-writing-data.js'),'utf8'));
 w.eval(fs.readFileSync(path.join(root,'ldd-thcs-writing.js'),'utf8'));
 await w.LDDTHCSWriting.mount(w.document.getElementById('root'),'thcs');
 const click=async selector=>{const el=w.document.querySelector(selector);assert(el,selector);el.click();await sleep();};
 const fill=(name,value)=>{const el=w.document.querySelector('[data-w-field="'+name+'"]');assert(el,name);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
 await click('[data-w-task="g6-u1:a"]');
 const unit=w.LDDTHCSWritingData.units.find(u=>u.id==='g6-u1');
 assert.deepEqual(unit.exercises.map(e=>e.type),['order','translate','expand','correct']);
 fill('sentence0',unit.exercises[0].answer);await click('[data-w-check="0"]');
 assert.equal(aiCalls,0,'exact word ordering needs no AI');
 fill('sentence0',unit.exercises[0].answer.replace(' a ',' '));await click('[data-w-check="0"]');
 assert.equal(aiCalls,0,'missing a provided word needs no AI');
 assert.match(w.document.querySelector('[data-w-sentence-result="0"]').textContent,/không thêm hoặc bỏ từ/);
 fill('sentence3',unit.exercises[3].prompt);await click('[data-w-check="3"]');
 assert.equal(aiCalls,0,'unchanged error needs no AI');
 fill('sentence3',unit.exercises[3].answer);await click('[data-w-check="3"]');
 assert.equal(aiCalls,0,'exact correction needs no AI');
 fill('sentence1',unit.exercises[1].answer);await click('[data-w-check="1"]');
 assert.equal(aiCalls,0,'exact translation needs no AI');
 fill('sentence1','My school is located in a small town.');await click('[data-w-check="1"]');
 assert.equal(aiCalls,1,'alternate translation requires AI');
 await click('[data-w-check="1"]');
 assert.equal(aiCalls,1,'identical previously checked sentence is cached');
 fill('sentence2','It has many classrooms and a library.');await click('[data-w-check="2"]');
 assert.equal(aiCalls,2,'open-ended sentence requires AI');
 await click('[data-w-step="2"]');
 fill('text',unit.model);await click('[data-w-action="submit"]');
 assert.equal(aiCalls,3,'a free-form essay needs AI');
 assert.equal(rows.length,1,'first essay is submitted');
 await click('[data-w-step="2"]');
 await click('[data-w-action="submit"]');
 assert.equal(aiCalls,3,'unchanged essay is not regraded');
 assert.equal(rows.length,1,'unchanged essay is not submitted twice');
 dom.window.close();
 console.log('PASS: objective checks without AI; alternate/free text with AI; repeat feedback cached.');
})().catch(e=>{console.error(e);process.exit(1);});