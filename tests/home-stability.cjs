// Run with NODE_PATH pointing to an installation of jsdom.
const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=process.env.HOME_TEST_SOURCE||path.resolve(__dirname,'..');
const dom=new JSDOM('<div id="tab-trang-chu"><div class="ldd-home-dashboard"><aside><div id="ldd-today-tasks"></div></aside><section id="ldd-home-live-panel"><div id="ldd-home-timer-list"></div><div id="ldd-home-leaderboard"></div></section></div></div>',{url:'https://test.invalid',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document;
Object.defineProperty(d,'readyState',{value:'loading'});
// Prevent startup network/timers; execute renderer integration with synthetic state.
const add=d.addEventListener.bind(d);d.addEventListener=(name,...args)=>{if(name!=='DOMContentLoaded')add(name,...args);};
w.fetch=()=>{throw Error('Unexpected network request');};
const jwt='x.'+Buffer.from(JSON.stringify({sub:'test-user',email:'student@example.test'})).toString('base64')+'.x';
w.localStorage.setItem('sb-ywqbaksmmtvwbojcgsdd-auth-token',JSON.stringify({access_token:jwt}));
let now=Date.parse('2026-10-03T12:00:00Z');w.Date.now=()=>now;
function load(file,hooks){let s=fs.readFileSync(path.join(root,file),'utf8');const pos=s.lastIndexOf('})();');s=s.slice(0,pos)+hooks+'\n'+s.slice(pos);w.eval(s);}
load('ldd-student-grade.js','window.gradeTest={set:g=>grade=g,render:renderTimers,watch:bindGradeEntry,setData:s=>timerData=s};');
load('ldd-ui-today.js','window.todayTest={renderLive,renderToday};');
load('ldd-thcs-vocab-reset.js','window.resetTest={set:r=>rows=r,render:renderReadyRows,observe:observeTimerList};');
w.gradeTest.set(9);
const unit={grade:9,unit_id:'unit1',completed:true,times_completed:1,completed_at:new Date(now-7*86400000+5000).toISOString()};
const state={thcs:[unit],kid:[],vocabTests:[],conjToday:[],rank:[{user_id:'test-user',display_name:'A',diligence_score:10}],vocab:[],vocabProgress:[],reads:[],articles:[],day:'2026-10-03',ipaUnrecorded:2};
w.gradeTest.setData({thcs:state.thcs,kid:[],vocab:[],conj:[]});
w.todayTest.renderLive(state);w.gradeTest.render();w.todayTest.renderToday(state);
w.resetTest.set([{grade:9,unit_id:'unit2',completed:false,times_completed:1,completed_at:null}]);w.resetTest.render();w.resetTest.observe();
const host=d.getElementById('ldd-home-timer-list');
const countdown=host.querySelector('[data-target-ms]'),ready=host.querySelector('.ldd-thcs-vocab-reset-ready');
countdown.focus();
const mission=d.querySelector('#ldd-today-tasks > *'),rank=d.querySelector('#ldd-home-leaderboard > *');
let records=[];const mo=new w.MutationObserver(r=>records.push(...r));mo.observe(host,{childList:true});
for(let i=0;i<4;i++){now+=1000;w.gradeTest.render();w.todayTest.renderLive(state);w.resetTest.render();w.todayTest.renderToday(state);}
records.push(...mo.takeRecords());
assert.equal(records.length,0,'Idle ticks/refreshes must not replace or move rows');
assert.equal(host.querySelector('[data-target-ms]'),countdown);
assert.equal(host.querySelector('.ldd-thcs-vocab-reset-ready'),ready);
assert.equal(d.activeElement,countdown,'Keyboard focus must survive ticks');
assert.equal(d.querySelector('#ldd-today-tasks > *'),mission);
assert.equal(d.querySelector('#ldd-home-leaderboard > *'),rank);
now+=2000;w.gradeTest.render();assert.equal(countdown.querySelector('.ldd-home-timer-value').textContent,'LÀM NGAY');
assert.equal(countdown.isConnected,true);
// Completion refresh removes only the expired countdown, preserving other ready rows.
state.thcs=[];w.todayTest.renderLive(state);assert.equal(countdown.isConnected,false);assert.equal(ready.isConnected,true);
w.todayTest.renderLive({...state,rank:[{...state.rank[0],diligence_score:20}]});assert.match(d.getElementById('ldd-home-leaderboard').textContent,/20 điểm/);
w.resetTest.set([]);w.resetTest.render();w.gradeTest.render();assert.equal(host.querySelectorAll('.ldd-home-live-empty').length,1);
// A countdown text mutation must not schedule grade-filter work.
let scheduled=0;w.setTimeout=()=>{scheduled++;return 1;};w.gradeTest.watch();
const span=d.createElement('span');host.append(span);span.textContent='00:00:01';
Promise.resolve().then(()=>{
 assert.equal(scheduled,0,'Timer changes must not schedule applyDefaults');
 const filter=d.createElement('select');filter.dataset.gradeFilter='';d.body.append(filter);
 return Promise.resolve();
}).then(()=>{assert.equal(scheduled,1,'New grade controls still receive defaults');console.log('PASS: stable rows/focus, unchanged tasks/rank, expiry, removal, empty state, scoped observer');dom.window.close();}).catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
