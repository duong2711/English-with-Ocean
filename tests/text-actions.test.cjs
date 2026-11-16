const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const actions = fs.readFileSync(path.resolve(__dirname,'../ldd-text-actions.js'),'utf8');
const styles = fs.readFileSync(path.resolve(__dirname,'../ldd-text-actions.css'),'utf8');
const boot = fs.readFileSync(path.resolve(__dirname,'../ldd-ui-upgrade.js'),'utf8');
const page = fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
const grammar = fs.readFileSync(path.resolve(__dirname,'../ldd-ui-vocab-grammar.js'),'utf8');

test('tapping or selecting a word exposes exactly Highlight and Translate actions',()=>{
 assert.match(actions,/data-action="highlight">/);
 assert.match(actions,/data-action="translate">/);
 assert.match(actions,/window\.addEventListener\('click',[\s\S]*?true\);/);
 assert.match(actions,/e\.stopImmediatePropagation\(\)/);
 assert.match(actions,/closest\?\.\('\.tappable-word,\.ldd-exam-lookup-word'\)/);
 assert.match(actions,/wordAtPoint\(e\)/);
 assert.match(actions,/translateWord\(\{text:clean,context:context\|\|clean,source:'Bài nghe Phim ảnh'\}\)/);
});
test('mouse drag and long-press mobile word selection use native selection handles',()=>{
 assert.match(actions,/window\.getSelection\?\.\(\)/);
 assert.match(actions,/document\.addEventListener\('selectionchange'/);
 assert.match(actions,/document\.addEventListener\('pointerup'/);
 assert.match(actions,/document\.addEventListener\('touchend'/);
 assert.match(actions,/lastTouch=Date\.now\(\)/);
 assert.match(styles,/ldd-text-action-menu/);
 assert.match(styles,/::highlight\(ldd-learning-highlight\)/);
});
test('invalid or incomplete selections show an error and never save collocations',()=>{
 assert.match(actions,/wholeWordBoundary\(range\.startContainer,range\.startOffset,true\)/);
 assert.match(actions,/wholeWordBoundary\(range\.endContainer,range\.endOffset,false\)/);
 assert.match(actions,/if\(data\.partial\|\|!\(WORD\.test\(data\.text\)\|\|PHRASE\.test\(data\.text\)\)\)/);
 assert.match(actions,/Quét chưa trọn một từ hoặc cụm tiếng Anh/);
 assert.match(actions,/result\.is_collocation/);
 assert.match(actions,/if\(result\.stored\)document\.dispatchEvent/);
 assert.doesNotMatch(actions,/\.from\('collocation_bank'\)\.insert/);
 assert.match(actions,/functions\/v1\/collocation-lookup/);
});
test('no-lookup tests remain excluded, and phrase translation never invokes pronunciation',()=>{
 assert.match(actions,/#ctest-take-view\.ldd-exam-no-lookup/);
 assert.match(actions,/const res=await fetch\(ROOT\+'\/functions\/v1\/collocation-lookup'/);
 assert.match(actions,/const auth=await client\.auth\.getSession\(\)/);
 const phrase = actions.slice(actions.indexOf('async function translate(data)'),actions.indexOf('// Public helper'));
 assert.doesNotMatch(phrase,/speechSynthesis|playVideo|\.speak\(/);
});
test('shared collocations render in existing vocabulary category and assets load globally',()=>{
 assert.match(grammar,/from\('collocation_bank'\)/);
 assert.match(grammar,/select\('phrase,meaning_vi'\)/);
 assert.match(boot,/ldd-text-actions\.js\?v=20261116-text-actions3/);
 assert.match(boot,/ldd-text-actions\.css\?v=20261116-text-actions2/);
 assert.match(boot,/ldd-ui-vocab-grammar\.js\?v=20261116-shared-collocations1/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261116-ctest-student-groups1/);
});