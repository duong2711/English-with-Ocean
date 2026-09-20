import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const FILES = [
  ['grade4-data.js',4,'GRADE4_UNITS'],['grade6-data.js',6,'GRADE6_UNITS'],
  ['grade7-data.js',7,'GRADE7_UNITS'],['grade8-data.js',8,'GRADE8_UNITS'],
  ['grade9-data.js',9,'GRADE9_UNITS'],['grade10-data.js',10,'GRADE10_UNITS'],
  ['grade11-data.js',11,'GRADE11_UNITS'],['grade12-data.js',12,'GRADE12_UNITS']
];
const UA = 'LDD-English-Vocab-Images/1.0 (github.com/duong2711/English-with-Ocean)';
const GAP = Number(process.env.VOCAB_IMAGE_REQUEST_GAP_MS || 180);
const TAG = process.env.VOCAB_IMAGE_CACHE_TAG || '20260920-localimg2';
const CONCURRENCY = Math.max(1, Math.min(8, Number(process.env.VOCAB_IMAGE_CONCURRENCY || 6)));
const sleep = ms => new Promise(r => setTimeout(r, ms));

function ascii(s='') { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
function clean(s='') { return String(s).replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim(); }
function slug(s='') { return ascii(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,70) || 'word'; }
function parseUnits(text,name) {
  const at=text.indexOf('const '+name+' =');
  const a=text.indexOf('[',at), b=text.lastIndexOf('];');
  if(at<0||a<0||b<a) throw new Error('Cannot parse '+name);
  return JSON.parse(text.slice(a,b+1));
}
function hint(word,unit) {
  const en=clean(word.en), vi=ascii(word.vi), ex=ascii((word.ex||'')+' '+(unit.title||''));
  const h=[];
  if(ascii(en)==='compass' && /com-pa|compa/.test(vi)) h.push('drawing compass geometry');
  if(ascii(en)==='subject' && /mon hoc/.test(vi)) h.push('school subject education');
  if(/mon hoc|tiet hoc|lop hoc|truong hoc|hoc sinh|giao vien/.test(vi)) h.push('school classroom education');
  if(/can ho|nha pho|phong khach|phong ngu|phong tam|tu quan ao|noi that/.test(vi)) h.push('home interior');
  if(/mon an|thuc pham|do an|nau an|do uong/.test(vi)) h.push('food');
  if(/bong da/.test(vi)) h.push('soccer football');
  if(/xe dap|dap xe/.test(vi)) h.push('bicycle cycling');
  if(/moi truong|khi hau/.test(vi)) h.push('environment nature');
  if(/cong nghe|may tinh|internet|robot/.test(vi)) h.push('technology');
  if(/science|laboratory/.test(ex)) h.push('science');
  if(/school|student|teacher|class/.test(ex)) h.push('school');
  if(/house|home|room/.test(ex)) h.push('home');
  if(/sport|football|basketball|exercise/.test(ex)) h.push('sport');
  if(/travel|tourism|traffic|transport/.test(ex)) h.push('travel');
  if(/^(su |tinh |viec |kha nang |trach nhiem |long |thai do )/.test(vi)) h.push('concept illustration');
  return [en,...new Set(h.join(' ').split(/\s+/).filter(Boolean))].join(' ');
}
function bad(c) {
  const t=ascii((c.title||'')+' '+(c.description||'')+' '+(c.categories||''));
  return ['porn','nude','naked','genital','erotic','gore','corpse','autopsy'].some(x=>t.includes(x));
}
function score(c,word,q,rank) {
  if(bad(c)) return -999;
  const t=ascii((c.title||'')+' '+(c.description||'')+' '+(c.categories||''));
  const title=ascii(c.title||'');
  const words=ascii(word.en).split(/[^a-z0-9]+/).filter(x=>x.length>2);
  const qs=ascii(q).split(/[^a-z0-9]+/).filter(x=>x.length>2);
  let s=20-rank;
  for(const x of words) s += title.includes(x)?12:(t.includes(x)?6:0);
  for(const x of qs) s += title.includes(x)?2:(t.includes(x)?1:0);
  if(/locator map|distribution map|coat of arms| logo | flag |chart/.test(' '+t+' ')) s-=15;
  return s;
}
async function json(url) {
  for(let i=0;i<3;i++) {
    try {
      const r=await fetch(url,{headers:{'User-Agent':UA,'Accept':'application/json'},signal:AbortSignal.timeout(25000)});
      if(r.status===429||r.status>=500){await sleep(900*(i+1));continue;}
      if(!r.ok) throw new Error('HTTP '+r.status);
      return await r.json();
    } catch(e) { if(i===2) throw e; await sleep(700*(i+1)); }
  }
}
async function commons(word,unit,q) {
  const p=new URLSearchParams({action:'query',format:'json',generator:'search',gsrnamespace:'6',gsrlimit:'12',gsrsearch:q,prop:'imageinfo',iiprop:'url|mime|size|extmetadata',iiurlwidth:'900'});
  const d=await json('https://commons.wikimedia.org/w/api.php?'+p.toString()); await sleep(GAP);
  const arr=Object.values(d?.query?.pages||{}).map((x,i)=>{
    const info=x.imageinfo?.[0]||{}, m=info.extmetadata||{}, v=k=>clean(m[k]?.value||'');
    return {provider:'wikimedia-commons',rank:i,title:clean(x.title||'').replace(/^File:/i,''),description:v('ImageDescription'),categories:v('Categories'),url:info.thumburl||info.url||'',source:info.descriptionurl||'',original:info.url||'',creator:v('Artist')||v('Credit'),license:v('LicenseShortName')||v('UsageTerms')||'Wikimedia Commons',licenseUrl:v('LicenseUrl'),mime:info.thumbmime||info.mime||''};
  }).filter(x=>x.url && (!x.mime || x.mime.startsWith('image/')));
  for(const x of arr) x.score=score(x,word,q,x.rank);
  return arr.sort((a,b)=>b.score-a.score).filter(x=>x.score>5);
}
async function openverse(word,unit,q) {
  const p=new URLSearchParams({q,page_size:'15',mature:'false'});
  const d=await json('https://api.openverse.org/v1/images/?'+p.toString()); await sleep(GAP);
  const arr=(d?.results||[]).map((x,i)=>({provider:'openverse',rank:i,title:clean(x.title||''),description:clean(x.description||''),categories:(x.tags||[]).map(t=>t?.name||t).join(' '),url:x.thumbnail||x.url||'',source:x.foreign_landing_url||'',original:x.url||'',creator:clean(x.creator||''),license:[x.license,x.license_version].filter(Boolean).join(' ').toUpperCase()||'Open license',licenseUrl:x.license_url||''})).filter(x=>x.url);
  for(const x of arr) x.score=score(x,word,q,x.rank);
  return arr.sort((a,b)=>b.score-a.score).filter(x=>x.score>5);
}
async function download(url) {
  const r=await fetch(url,{redirect:'follow',headers:{'User-Agent':UA,'Accept':'image/avif,image/webp,image/*,*/*;q=0.8'},signal:AbortSignal.timeout(30000)});
  if(!r.ok) throw new Error('image HTTP '+r.status);
  const b=Buffer.from(await r.arrayBuffer());
  if(!b.length||b.length>18*1024*1024) throw new Error('bad image size');
  return b;
}
async function fallback(word,out) {
  const esc=s=>clean(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="720" height="520"><rect width="720" height="520" rx="36" fill="#f5f7fb"/><circle cx="360" cy="175" r="82" fill="#e4e9f5"/><path d="M330 175h60M360 145v60" stroke="#64748b" stroke-width="14" stroke-linecap="round"/><text x="360" y="330" text-anchor="middle" font-family="Arial" font-size="46" font-weight="700" fill="#1f2937">'+esc(word.en)+'</text><text x="360" y="392" text-anchor="middle" font-family="Arial" font-size="28" fill="#475569">'+esc(word.vi)+'</text></svg>';
  await sharp(Buffer.from(svg)).webp({quality:82}).toFile(out);
}
async function choose(word,unit,grade,rel) {
  const out=path.join(ROOT,rel); await fs.mkdir(path.dirname(out),{recursive:true});
  try { await fs.access(out); return null; } catch {}
  const q=hint(word,unit); let list=[];
  try { list=await commons(word,unit,q); } catch(e) { console.warn('Commons:',e.message); }
  if(!list.length) try { list=await openverse(word,unit,q); } catch(e) { console.warn('Openverse:',e.message); }
  for(const c of list.slice(0,6)) {
    try {
      const b=await download(c.url);
      await sharp(b,{animated:false,limitInputPixels:50000000}).rotate().resize({width:720,height:520,fit:'inside',withoutEnlargement:true}).webp({quality:76,effort:4}).toFile(out);
      return {path:rel,grade,unitId:unit.id,word:word.en,meaningVi:word.vi,query:q,provider:c.provider,title:c.title,creator:c.creator,license:c.license,licenseUrl:c.licenseUrl,sourceUrl:c.source,originalUrl:c.original,selectedScore:Math.round(c.score*10)/10};
    } catch(e) { console.warn('Candidate failed:',e.message); }
  }
  await fallback(word,out);
  return {path:rel,grade,unitId:unit.id,word:word.en,meaningVi:word.vi,query:q,provider:'local-fallback',title:'Local vocabulary fallback',creator:'LDD English',license:'Repository-owned',licenseUrl:'',sourceUrl:'',originalUrl:'',selectedScore:0};
}
async function main() {
  const manifestPath=path.join(ROOT,'assets/vocab/image-credits.json');
  let manifest=[]; try{manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));}catch{}
  const credits=new Map((Array.isArray(manifest)?manifest:[]).map(x=>[x.path,x]));
  let count=0, fallbacks=0;
  for(const [file,grade,name] of FILES) {
    const fp=path.join(ROOT,file); let text=await fs.readFile(fp,'utf8'); const units=parseUnits(text,name);
    const flat=[]; for(const unit of units) for(const word of unit.words||[]) flat.push({unit,word});
    const matches=[...text.matchAll(/"img"\s*:\s*"([^"]*)"/g)];
    if(matches.length!==flat.length) throw new Error(file+' img count mismatch');
    const reps=[], jobs=[];
    for(let i=0;i<flat.length;i++) {
      const cur=matches[i][1]; if(cur.startsWith('assets/vocab/')) continue;
      const {unit,word}=flat[i], rel='assets/vocab/grade'+grade+'/'+unit.id+'/'+slug(word.en)+'.webp';
      const off=matches[i][0].indexOf(cur), start=matches[i].index+off;
      jobs.push({cur,unit,word,rel,start,end:start+cur.length});
    }
    let cursor=0;
    async function worker() {
      while(cursor<jobs.length) {
        const j=jobs[cursor++];
        const n=++count;
        console.log('['+n+'] grade '+grade+' '+j.unit.id+' '+j.word.en+' -> '+j.rel);
        const meta=await choose(j.word,j.unit,grade,j.rel);
        if(meta){credits.set(j.rel,meta);if(meta.provider==='local-fallback')fallbacks++;}
        reps.push({start:j.start,end:j.end,value:j.rel});
      }
    }
    await Promise.all(Array.from({length:Math.min(CONCURRENCY,Math.max(1,jobs.length))},()=>worker()));
    reps.sort((a,b)=>b.start-a.start); for(const r of reps) text=text.slice(0,r.start)+r.value+text.slice(r.end);
    if(reps.length) await fs.writeFile(fp,text);
  }
  await fs.mkdir(path.dirname(manifestPath),{recursive:true});
  await fs.writeFile(manifestPath,JSON.stringify([...credits.values()].sort((a,b)=>a.path.localeCompare(b.path)),null,2)+'\n');
  let html=await fs.readFile(path.join(ROOT,'index.html'),'utf8');
  for(const [file] of FILES) {
    const re=new RegExp('(<script\\s+src=["\\\'])'+file.replace(/[|\\{}()\[\]\^$+*?.-]/g,'\\$&')+'(?:\\?v=[^"\\\']*)?(["\\\']><\\/script>)','g');
    html=html.replace(re,'$1'+file+'?v='+TAG+'$2');
  }
  await fs.writeFile(path.join(ROOT,'index.html'),html);
  console.log('Finished '+count+' images; local fallback cards: '+fallbacks);
}
main().catch(e=>{console.error(e);process.exit(1);});
