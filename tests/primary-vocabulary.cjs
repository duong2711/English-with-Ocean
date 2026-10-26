const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({});
for (let g = 1; g <= 12; g++) vm.runInContext(fs.readFileSync(path.join(root, `grade${g}-data.js`), 'utf8'), ctx);
const main = fs.readFileSync(path.join(root, 'scriptphonetics.js'), 'utf8');
const lookup = main.slice(main.indexOf('        function thcsGetGradeUnits('), main.indexOf('        if (!thcsGetGradeUnits(6))'));
vm.runInContext(lookup, ctx);
let additions = 0;
for (const [g, count] of [[1,16],[2,16],[3,20],[4,20],[5,20]]) {
 const units = vm.runInContext(`thcsGetGradeUnits(${g})`, ctx);
 assert.equal(units.length, count);
 units.forEach((unit, i) => {
  assert.equal(unit.id, `u${i+1}`);
  assert.equal(unit.number, i+1);
  assert(unit.words.length >= 3);
  if (g === 4 && i < 10) return;
  additions++;
  const seen = new Set();
  for (const w of unit.words) {
   for (const key of ['en','ipa','vi','img','ex','trVi','trAnswer','trKey']) assert(w[key], `${g}/${unit.id}: ${key}`);
   assert(!seen.has(w.en.toLowerCase())); seen.add(w.en.toLowerCase());
   assert.equal(w.trAnswer, w.ex);
   assert(w.trAnswer.toLowerCase().includes(w.trKey.toLowerCase()), `${g}/${unit.id}: ${w.en} answer span`);
   if(w.img.startsWith('assets/')) assert(fs.existsSync(path.join(root,w.img)), w.img);
   else assert(w.img.startsWith('data:image/svg+xml;'));
  }
  assert.equal(unit.storyFrames.length, 4);
  for (const frame of unit.storyFrames) {
   const bold = [...frame.content_html.matchAll(/<b>(.*?)<\/b>/g)].map(x=>x[1].replace(/&#x27;/g, "'").replace(/&amp;/g,'&').toLowerCase());
   assert(frame.keywords.length > 0);
   for(const k of frame.keywords) assert(bold.includes(k.key), `${g}/${unit.id}: ${k.key}`);
  }
 });
}
assert.equal(additions,82);
const index = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const g of [1,2,3,4,5]) assert(index.indexOf(`src="grade${g}-data.js?`) < index.indexOf('src="scriptphonetics.js?'));
// Exercise the actual grade-card renderer and shared practice-pool API.
const cards=[];
ctx.thcsGradeGrid={innerHTML:'',appendChild:card=>cards.push(card)};
ctx.document={createElement:()=>({addEventListener(){}})};
const render=main.slice(main.indexOf('        function renderGradeGrid()'),main.indexOf("        thcsFolderCard.addEventListener('click'"));
vm.runInContext(render+';renderGradeGrid()',ctx);
assert.equal(cards.length,12);
assert(cards.every(card=>!card.className.includes('locked')));
const poolStart=main.indexOf('            getAllUnits: () => {', main.indexOf('window.thcsUnitsAPI ='));
const poolEnd=main.indexOf('            ensureProgressLoaded:',poolStart);
vm.runInContext('var api={'+main.slice(poolStart,poolEnd)+'};var all=api.getAllUnits()',ctx);
assert.equal(vm.runInContext('all.length',ctx),170);
for(let g=1;g<=5;g++)assert(vm.runInContext(`all.some(row=>row.gradeNum===${g})`,ctx));
console.log('PASS: 82 added Units; complete flashcard/translation/story fields; valid answer spans and images; all 12 grade cards and shared 170-Unit practice pool.');
