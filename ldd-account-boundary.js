/* LDD English — isolate one authenticated account per page runtime.
 * Reload only on a real account boundary, never on routine JWT rotation.
 * No server requests, storage-wide clearing, or deletion of study progress.
 */
(function(){
'use strict';
if(window.__lddAccountBoundaryInstalled)return;
window.__lddAccountBoundaryInstalled=true;
const AUTH='sb-ywqbaksmmtvwbojcgsdd-auth-token';
const nativeSet=Storage.prototype.setItem,nativeRemove=Storage.prototype.removeItem,nativeClear=Storage.prototype.clear;
function store(name){try{return window[name];}catch{return null;}}
const local=store('localStorage'),session=store('sessionStorage');
function read(s){try{return s?s.getItem(AUTH):null;}catch{return null;}}
function identity(raw){
 try{
  const v=JSON.parse(raw||'null'),s=v?.access_token?v:v?.currentSession?.access_token?v.currentSession:v?.session?.access_token?v.session:Array.isArray(v)?v[0]:null;
  if(!s?.access_token)return null;
  let p=s.access_token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
  p=p.padEnd(Math.ceil(p.length/4)*4,'=');
  const sub=JSON.parse(atob(p)).sub;
  return typeof sub==='string'&&sub?sub:null;
 }catch{return null;}
}
function current(){return identity(read(local))||identity(read(session));}
let owner=current(),queued=false,leaving=false,oldOwner=null;
function mask(on){
 const root=document.documentElement;
 if(!root)return;
 root.classList.toggle('ldd-account-switching',on);
}
const css=document.createElement('style');
css.textContent='html.ldd-account-switching body{visibility:hidden!important;pointer-events:none!important}html.ldd-account-switching::after{content:"Đang chuyển tài khoản…";position:fixed;inset:0;display:grid;place-items:center;background:#f4f6fa;color:#26364a;font:600 15px system-ui,sans-serif;z-index:2147483647}';
(document.head||document.documentElement).append(css);
function settle(){
 queued=false;
 if(leaving)return;
 const next=current();
 if(next===oldOwner){mask(false);return;}
 leaving=true;mask(true);
 // The old document must never render another user's data or run its callbacks.
 // Reload preserves the new SDK session and the account's persisted progress.
 window.location.reload();
}
function changed(before,after,area){
 if(leaving)return;
 if(before===after)return;
 // Supabase's primary local session was removed. Remove only an identical
 // stale auth mirror, if present; do not touch unrelated keys or another UID.
 if(before&&!after&&area===local&&identity(read(session))===before){
  try{nativeRemove.call(session,AUTH);}catch{}
 }
 const next=current();
 if(!owner){owner=next;return;} // normal first login, including device verification
 if(next===owner)return;
 if(!queued){oldOwner=owner;queued=true;mask(true);setTimeout(settle,0);}
}
function watched(s){return s===local||s===session;}
try{
 Storage.prototype.setItem=function(k,v){
  if(k!==AUTH||!watched(this))return nativeSet.apply(this,arguments);
  const before=identity(read(this));const result=nativeSet.apply(this,arguments);
  changed(before,identity(read(this)),this);return result;
 };
 Storage.prototype.removeItem=function(k){
  if(k!==AUTH||!watched(this))return nativeRemove.apply(this,arguments);
  const before=identity(read(this));const result=nativeRemove.apply(this,arguments);
  changed(before,identity(read(this)),this);return result;
 };
 Storage.prototype.clear=function(){
  if(!watched(this))return nativeClear.apply(this,arguments);
  const before=identity(read(this));const result=nativeClear.apply(this,arguments);
  changed(before,identity(read(this)),this);return result;
 };
}catch{}
window.addEventListener('storage',e=>{
 if((e.key===AUTH||e.key===null)&&watched(e.storageArea)){
  changed(identity(e.oldValue)||owner,identity(read(e.storageArea)),e.storageArea);
 }
});
function check(){
 if(leaving||queued)return;
 const now=current();
 if(!owner){owner=now;return;}
 if(now!==owner){oldOwner=owner;queued=true;mask(true);setTimeout(settle,0);}
}
window.addEventListener('pageshow',check);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check();});
})();