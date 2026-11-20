const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const actions = fs.readFileSync(path.resolve(__dirname,'../ldd-text-actions.js'),'utf8');
const annotations = fs.readFileSync(path.resolve(__dirname,'../ldd-test-annotations.js'),'utf8');
const styles = fs.readFileSync(path.resolve(__dirname,'../ldd-text-actions.css'),'utf8');
const boot = fs.readFileSync(path.resolve(__dirname,'../ldd-ui-upgrade.js'),'utf8');
const page = fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
const grammar = fs.readFileSync(path.resolve(__dirname,'../ldd-ui-vocab-grammar.js'),'utf8');

test('tapping or selecting text exposes exactly Translate, Highlight and Note actions',()=>{
 const menu = actions.match(/menu\.innerHTML='([^']*)'/)?.[1] || '';
 assert.deepEqual([...menu.matchAll(/data-action="([a-z]+)"/g)].map(m=>m[1]),['translate','highlight','note']);
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
 assert.match(actions,/if\(data\.partial\)/);
 assert.match(actions,/menu\.querySelector\('\[data-action="translate"\]'\)\.disabled=/);
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
 assert.match(boot,/ldd-text-actions\.js\?v=20261120-selection-notes1/);
 assert.match(boot,/ldd-test-annotations\.js\?v=20261120-selection-notes1/);
 assert.match(boot,/ldd-text-actions\.css\?v=20261120-selection-notes1/);
 assert.match(boot,/ldd-ui-vocab-grammar\.js\?v=20261119-conj-return1/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261120-selection-notes1/);
 assert.match(page,/scriptphonetics\.js\?v=20261120-selection-notes1/);
});
test('assigned-test highlights and notes use account-owned Supabase rows and safe text anchors',()=>{
 assert.match(annotations,/student_test_annotations/);
 assert.match(annotations,/\.auth\.getSession\(\)/);
 assert.match(annotations,/user_id:s\.uid/);
 assert.match(annotations,/\.eq\('user_id',uid\)\.eq\('test_key',info\.key\)/);
 assert.match(annotations,/\.insert\(row\)/);
 assert.match(annotations,/\.update\(\{note_text:note\}\)/);
 assert.match(annotations,/start_offset:loc\.start,end_offset:loc\.end/);
 assert.match(annotations,/restoreRange\(info\.root,a\.start_offset,a\.end_offset\)/);
 assert.match(annotations,/CSS\.highlights\.set\(name,new Highlight/);
 assert.match(styles,/::highlight\(ldd-test-saved-highlight\)/);
 assert.match(styles,/::highlight\(ldd-test-saved-note\)/);
 assert.match(annotations,/Ghi chú của tôi/);
});
