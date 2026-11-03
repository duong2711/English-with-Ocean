const assert = require('node:assert/strict');
const fs = require('node:fs');
const src = fs.readFileSync('scriptphonetics.js','utf8');
const start = src.indexOf('        // Restore the exact vocabulary folder / grade / Unit / activity after reload.');
const end = src.indexOf('        // ===================================================================',start);
assert.ok(start >= 0 && end > start, 'Location restore functions should exist');
const nav = src.slice(start,end);
const calls = [], storage = new Map(), localStorage = {
  getItem:key=>storage.get(key)||null,
  setItem:(key,value)=>storage.set(key,value)
};
let activeVocab = true, draft = {value:''};
const window = {addEventListener:()=>{}};
const document = {getElementById:id=>{
  if(id==='tab-tu-vung')return {classList:{contains:x=>x==='active'&&activeVocab}};
  if(id==='thcs-translate-blank-input')return draft;
  return null;
}};
const units = [{id:'u7-1',number:1},{id:'u7-2',number:2}];
const setup = [
 "let currentUserId='user-a', currentGradeNum=7, currentGradeUnits=units;",
 "let currentUnit=units[0], trIndex=3, trWords=Array.from({length:8},(_,i)=>({ex:'Sentence '+i}));",
 "let thcsSpeechWaiting=false, thcsTranslateBusy=false, unlocked=true, activeSub='translate';",
 "const thcsFolderCard={click:()=>calls.push('folder')};",
 "const thcsPanel={style:{}}, thcsGrade6Panel={style:{}}, thcsGradePanelTitle={textContent:''};",
 "const thcsSubtabs={querySelector:selector=>{",
 " if(selector.includes('data-sub=\"')) {",
 "  const sub=selector.split('data-sub=\"')[1].split('\"')[0];",
 "  return {click:()=>{activeSub=sub;calls.push('sub:'+sub);}};",
 " } return {dataset:{sub:activeSub}};",
 "}};",
 "function thcsGetGradeUnits(g){return Number(g)===7?units:null;}",
 "function thcsIsUnitUnlocked(g,u,index){return unlocked && index>=0;}",
 "async function renderUnitGrid(){calls.push('render-grid');}",
 "async function openUnit(unit,opts={}){currentUnit=unit;calls.push('open:'+String(opts.restoring));}",
 "function thcsRenderTranslate(){calls.push('render-translate:'+trIndex);}",
 "function thcsBeginSentenceOrSkipForQuota(){calls.push('restore-speaking');}"
].join('\n');
const methods = [
 'return {',
 ' save:thcsSaveLocation, read:thcsReadLocation, restore:thcsRestoreLocation,',
 ' state(){return {user:currentUserId,grade:currentGradeNum,unit:currentUnit?.id,idx:trIndex};},',
 ' set(x){if("user" in x)currentUserId=x.user;',
 ' if("grade" in x)currentGradeNum=x.grade;',
 ' if("unit" in x)currentUnit=x.unit;',
 ' if("idx" in x)trIndex=x.idx;',
 ' if("waiting" in x)thcsSpeechWaiting=x.waiting;',
 ' if("unlocked" in x)unlocked=x.unlocked;}',
 '};'
].join('\n');
const make = new Function('window','document','localStorage','setTimeout','calls','units',setup+'\n'+nav+'\n'+methods);
const control = make(window,document,localStorage,()=>{},calls,units);
(async()=>{
 draft.value='badminton';
 control.save('unit','translate');
 const state=control.read();
 assert.equal(state.grade,7);assert.equal(state.unitId,'u7-1');
 assert.equal(state.translateIndex,3);assert.equal(state.draft,'badminton');
 assert.equal(state.step,'write');
 control.set({user:'user-b'});
 assert.equal(control.read(),null,'Account A location must not leak to B');
 control.set({user:'user-a',unit:null,grade:null,idx:0});
 draft.value='';
 activeVocab=false;
 await control.restore();
 assert.equal(calls.length,0,'Do not override a non-vocabulary main tab');
 activeVocab=true;
 await control.restore();
 assert.deepEqual(calls.slice(0,4),['folder','render-grid','open:true','sub:translate']);
 assert.equal(control.state().idx,3,'Restore current sentence number');
 assert.equal(draft.value,'badminton','Restore the unfinished typed answer');
 assert.ok(storage.has('ldd_vocab_thcs_location_v1:user-a'));
 control.set({user:'user-c',grade:7,unit:units[0],idx:2,waiting:true});
 control.save('unit','translate');
 assert.equal(control.read().step,'speaking');
 const after=calls.length;
 await control.restore();
 assert.ok(calls.slice(after).includes('restore-speaking'),'Resume the speech step, but do not start mic automatically');
 control.set({user:'user-d',grade:7,unit:units[1],idx:4,waiting:false});
 control.save('unit','translate');
 control.set({unit:null,idx:0,unlocked:false});
 const prev=calls.length;
 await control.restore();
 assert.ok(!calls.slice(prev).some(x=>x.startsWith('open:')),'Do not open a locked Unit');
 const sliceBetween=(a,b)=>{
  const start=src.indexOf(a),end=src.indexOf(b,start+a.length);
  assert.ok(start>=0&&end>start);
  return src.slice(start,end);
 };
 assert.ok(sliceBetween('        function thcsStartSentenceSpeaking(', '        function thcsInitTranslate(').includes('thcsShowTranslateActions(false)'));
 assert.ok(sliceBetween('        function thcsStopSentenceStep(', '        // Word-level edit distance:').includes('thcsShowTranslateActions(true)'));
 assert.ok(sliceBetween('        function thcsCheckAnswer(', '        function thcsAdvanceTranslate(').includes('thcsShowTranslateActions(false)'));
 console.log('PASS: restore Unit/Dịch câu/question/speech stage, prevent cross-account leaks, hide redundant buttons');
})().catch(err=>{console.error(err);process.exitCode=1;});
