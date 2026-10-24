const assert = require('node:assert/strict');
const fs = require('node:fs');
const src = fs.readFileSync('scriptphonetics.js', 'utf8');
const start = src.indexOf('    let deviceSessionUserId = null;');
const end = src.indexOf('    // ================== [KẾT THÚC]', start);
let checks = 0, resets = 0;
const handler = new Function('TEACHER_EMAILS', 'gateDeviceOrProceed', 'hideDeviceGateUI', 'updateUIForUser', `
let deviceGateRunSeq=0,pendingGateUser=null,pendingGateEmail='',isImpersonating=false;
${src.slice(start,end)}
return handleSessionChange;`)([], async()=>{ checks++; }, ()=>{}, u=>{if(!u)resets++;});
(async()=>{
 const a={user:{id:'a',email:'a@example.test'}};
 await Promise.all([handler(a),handler(a),handler(a)]);
 assert.equal(checks,1,'Duplicate auth/focus events must not reopen device gate');
 await handler({user:{id:'b',email:'b@example.test'}});
 assert.equal(checks,2,'Different account must be checked');
 await handler(null);assert.equal(resets,1);
 await handler(a);assert.equal(checks,3,'Sign-in after logout must be checked again');
 console.log('PASS: duplicate auth events, account switch, logout and re-login');
})().catch(e=>{console.error(e);process.exitCode=1});
