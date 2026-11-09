const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'..'),errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://qa.example/',runScripts:'outside-only',virtualConsole:vc}),w=dom.window;
w.LDDWritingAPI={session:async()=>null};
for(const name of ['ldd-thcs-writing-data.js','ldd-thpt-writing-data.js','ldd-thcs-writing.js','ldd-skill-roadmap.js'])w.eval(fs.readFileSync(path.join(root,name),'utf8'));
const tick=()=>new Promise(r=>setTimeout(r,30));
(async()=>{await tick();const host=w.document.getElementById('tab-luyen-viet');
for(const [audience,count] of [['thcs',12],['thpt',10],['ielts',0],['thpt',10],['thcs',12]]){host.querySelector('[data-skill-audience="'+audience+'"]').click();await tick();assert.equal(host.querySelectorAll('.tw-card').length,count,audience);}
assert(w.document.querySelector('#tab-thi-thpt .tw-entry'));assert.equal(errors.length,0,errors.join('\n'));dom.window.close();console.log('PASS: full index mounts THCS/THPT, preserves IELTS, switches repeatedly, and adds THPT entry.');})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
