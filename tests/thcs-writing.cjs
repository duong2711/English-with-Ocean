/* Run: NODE_PATH=<jsdom installation>/node_modules node tests/thcs-writing.cjs */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),data=fs.readFileSync(path.join(root,'ldd-thcs-writing-data.js'),'utf8'),src=fs.readFileSync(path.join(root,'ldd-thcs-writing.js'),'utf8');
const pause=()=>new Promise(r=>setTimeout(r,15));
async function setup(storage={}){
 const dom=new JSDOM('<!doctype html><main id="root"></main>',{url:'https://qa.example/',runScripts:'outside-only'}),w=dom.window,db=[],saves=[];
 for(const [k,v] of Object.entries(storage))w.localStorage.setItem(k,v);
 let user={id:'alice',email:'alice@example.test'},resolveAI,failSubmit=false;
 w.LDDWritingAPI={session:async()=>user,draft:async()=>null,saveDraft:async(...x)=>saves.push(x),submit:async row=>{if(failSubmit)throw Error('offline');db.push(row);return{id:'a1'};},history:async()=>[],assignments:async()=>[]};
 w.aiHelper={callAIJSON:()=>new Promise(r=>resolveAI=r)};
 w.eval(data);w.eval(src);await w.LDDTHCSWriting.mount(w.document.getElementById('root'));await pause();
 const click=async s=>{const e=w.document.querySelector(s);assert(e,'missing '+s);e.click();await pause();};
 const fill=(s,text)=>{const e=w.document.querySelector(s);e.value=text;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
 const response={scores:{content:3,grammar:2,vocabulary:2,organisation:1,mechanics:1},comment:'Useful feedback',errors:[{original:'I likes books.',hint:'Check verb.',correction:'I like books.',type:'error'}]};
 return {dom,w,db,saves,click,fill,response,ai:x=>resolveAI(x),fail:()=>failSubmit=true,user:u=>{user=u;w.dispatchEvent(new w.CustomEvent('ldd:writing-auth',{detail:u}));}};
}
(async()=>{
 let t=await setup(),{w}=t,D=w.LDDTHCSWritingData;
 assert.equal(D.units.length,48);assert.equal(D.reviews.length,16);assert.equal(new Set(D.units.map(x=>x.id)).size,48);
 for(const u of D.units){assert.equal(u.questions.length,5);assert.ok(u.exercises.length>=3);const n=w.LDDTHCSWriting.words(u.model);assert(n>=u.minWords&&n<=u.maxWords,u.id+' sample length');assert.notEqual(u.prompt,u.alternate);}
 for(const r of D.reviews){const u=D.units.find(u=>u.id===r.taskId);assert(u.unit<=r.throughUnit);assert.notEqual(r.prompt,u.alternate);}
 assert.equal(w.LDDTHCSWriting.words("I'm a student."),3);
 assert.throws(()=>w.LDDTHCSWriting.validateFeedback({scores:{},comment:'x',errors:[]}));
 assert.equal(w.LDDTHCSWriting.marked('<img src=x>',[{original:'<img src=x>'}]),'<mark>&lt;img src=x&gt;</mark>');
 await t.click('[data-w-task="g7-u1:a"]'.replace('g7','g6'));await t.click('[data-w-step="2"]');
 t.fill('[data-w-field="text"]','I likes books.');
 await t.click('[data-w-action="submit"]');t.fill('[data-w-field="text"]','I like books. This is a newer draft.');
 t.ai(t.response);await pause();await pause();assert.equal(t.db.length,1);assert.equal(t.db[0].body,'I likes books.');
 await t.click('[data-w-step="2"]');assert.equal(w.document.querySelector('[data-w-field="text"]').value,'I like books. This is a newer draft.');
 const stored={};for(let i=0;i<w.localStorage.length;i++){const k=w.localStorage.key(i);stored[k]=w.localStorage.getItem(k);}t.dom.window.close();
 t=await setup(stored);w=t.w;assert.equal(w.document.querySelector('[data-w-field="text"]').value,'I like books. This is a newer draft.');
 await t.click('[data-w-action="home"]');await t.click('[data-w-task="g6-u2:b"]');assert.equal(w.document.querySelector('[data-w-field="text"]').value,'');
 t.fill('[data-w-field="text"]','My new house.');t.user({id:'bob',email:'bob@example.test'});await pause();await t.click('[data-w-task="g6-u2:b"]');assert.equal(w.document.querySelector('[data-w-field="text"]').value,'');
 await t.click('[data-w-grade="9"]');await t.click('[data-w-task="g9-u10:b"]');assert(w.document.body.textContent.includes('Oceans cover'));assert(!w.document.body.textContent.includes('Trees help life'));
 await t.click('[data-w-grade="6"]');await t.click('[data-w-task="g6-u1:a"]');await t.click('[data-w-step="2"]');t.fill('[data-w-field="text"]','A saved attempt.');t.fail();await t.click('[data-w-action="submit"]');t.ai(t.response);await pause();await pause();assert(w.document.querySelector('[data-w-action="retry-submit"]'));
 await t.click('[data-w-step="2"]');await t.click('[data-w-step="3"]');assert(w.document.querySelector('[data-w-action="retry-submit"]'),'retry survives rerender');
 t.dom.window.close();console.log('PASS: 48 units, 16 reviews, sample lengths, validation, safe highlighting, submit snapshot, draft restore, account isolation, summary source and failed-save retry.');
})().catch(e=>{console.error(e);process.exit(1);});
