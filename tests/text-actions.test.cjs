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
 assert.match(actions,/closest\?\.\('\.tappable-word,\.ldd-exam-lookup-word,\[data-ldd-lookup-word\]'\)/);
 assert.match(actions,/wordAtPoint\(e\)/);
 assert.match(actions,/translateWord\(\{text:clean,context:context\|\|clean,source:'Bài nghe Phim ảnh'\}\)/);
});
test('news article touch taps and phrase selections use the three-action menu',()=>{
 assert.match(actions,/function inArticleText\(node\)/);
 assert.match(actions,/articleSelection=inArticleText\(r\.startContainer\)&&inArticleText\(r\.endContainer\)/);
 assert.match(actions,/const READING_ROOT=/);
 assert.match(actions,/MAX_SELECTION=20000/);
 assert.match(actions,/!isLookupReader\(node\)/);
 assert.match(actions,/if\(selection\)\{present\(selection\);return;\}/);
 assert.match(actions,/const word=wordAtPoint\(e\)/);
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
 assert.match(boot,/ldd-text-actions\.js\?v=20261122-universal-three-actions2/);
 assert.match(boot,/ldd-test-annotations\.js\?v=20261122-universal-three-actions2/);
 assert.match(boot,/ldd-text-actions\.css\?v=20261122-universal-three-actions1/);
 assert.match(boot,/ldd-ui-vocab-grammar\.js\?v=20261119-conj-return1/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261122-universal-three-actions3/);
 assert.match(page,/scriptphonetics\.js\?v=20261122-pronunciation-history1/);
});
test('assigned-test highlights and notes use account-owned Supabase rows and safe text anchors',()=>{
 assert.match(annotations,/student_test_annotations/);
 assert.match(annotations,/\.auth\.getSession\(\)/);
 assert.match(annotations,/user_id:s\.uid/);
 assert.match(annotations,/\.eq\('user_id',uid\)\.eq\('test_key',info\.key\)/);
 assert.match(annotations,/\.insert\(row\)/);
 assert.match(annotations,/\.update\(\{note_text:note\}\)/);
 assert.match(annotations,/start_offset:loc\.start,end_offset:loc\.end/);
 assert.match(annotations,/resolveRange\(info\.root,a\)/);
 assert.match(annotations,/CSS\.highlights\.set\(name,new Highlight/);
 assert.match(styles,/::highlight\(ldd-test-saved-highlight\)/);
 assert.match(styles,/::highlight\(ldd-test-saved-note\)/);
 assert.match(annotations,/Ghi chú của tôi/);
});

test('news annotations retain their account-specific identity and text anchors',()=>{
 assert.match(annotations,/news-article-text/);
 assert.match(annotations,/news-article-panel/);
 assert.match(annotations,/news-article-title/);
 assert.match(annotations,/data-article-id/);
 assert.match(annotations,/panel\.dataset\.annotationArticleId=card\.dataset\.articleId/);
 assert.match(annotations,/key:'news:'\+\(articleId\|\|hash/);
 assert.match(annotations,/\['ctest-take-sections','ilt-take-body','irt-take-body','news-article-text'\]/);
 assert.match(annotations,/\.eq\('user_id',uid\)\.eq\('test_key',info\.key\)/);
 assert.match(annotations,/s\.items=data\|\|\[\]/);
 assert.match(annotations,/resolveRange\(info\.root,a\)/);
 assert.match(annotations,/Ghi chú bài báo/);
 assert.match(annotations,/function resolveRange\(root,entry\)/);
 assert.match(annotations,/normalized\.indexOf\(expected/);
 assert.match(annotations,/if\(currentRoot!==root\|\|state\(info\)\?\.key!==info\.key\)/);
 assert.match(boot,/ldd-test-annotations\.js\?v=20261122-universal-three-actions2/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261122-universal-three-actions3/);
});

test('every dictionary-enabled reading surface uses the same three actions by default',()=>{
 assert.match(actions,/const READING_ROOT=/);
 assert.match(actions,/data-ldd-text-actions/);
 assert.match(actions,/function presentWordElement\(el\)/);
 assert.match(actions,/function presentSelection\(\)/);
 assert.match(actions,/LDDTextActions=\{openWord,translateTerm,explainVietnamese,presentWordElement,presentSelection\}/);
 assert.match(actions,/tapped && presentWordElement\(tapped\)/);
 assert.match(actions,/e\.stopImmediatePropagation\(\)/);
 assert.match(actions,/if\(selection\)\{present\(selection\);return;\}/);
 assert.match(actions,/if\(!isLookupReader\(node\)&&Date\.now\(\)-lastTouch<550\)return null/);
 assert.doesNotMatch(actions,/lastTouch<550 && !inArticleText/);
});
test('the whole news article can be highlighted, annotated, or translated as passage text',()=>{
 assert.match(actions,/MAX_SELECTION=20000/);
 assert.match(actions,/articleSelection=inArticleText\(r\.startContainer\)&&inArticleText\(r\.endContainer\)/);
 assert.match(actions,/menu\.querySelector\('\[data-action="translate"\]'\)\.disabled=!english/);
 assert.match(actions,/async function passageRequest\(text\)/);
 assert.match(actions,/text\.split\(\/\\s\+\/\)/);
 assert.match(actions,/functions\/v1\/ai-proxy/);
 assert.match(actions,/Văn bản:.*JSON\.stringify\(chunk\)/);
 assert.match(actions,/const isPhrase=PHRASE\.test\(data\.text\)/);
 assert.match(styles,/user-select:text/);
 assert.match(styles,/white-space:pre-wrap/);
 assert.match(annotations,/function editor\(quote,value,onSave,sourceRange\)/);
 assert.match(annotations,/source\?\.closest\?\.\('dialog\[open\]'\)\|\|document\.body/);
});
test('exam taps keep their no-microphone exception and comic dialog lookups stay visible',()=>{
 assert.match(actions,/if\(node\?\.closest\('\.ldd-exam-lookup-root'\)\|\|source==='Bài kiểm tra'\)/);
 assert.match(actions,/function keepLegacyLookupAboveDialog\(range\)/);
 assert.match(actions,/host\.addEventListener\('close',function restorePopup\(\)/);
 assert.match(actions,/keepLegacyLookupAboveDialog\(data\.range\)/);
 assert.match(actions,/hostForRange\(data\.range\)/);
});

test('comic and exam word-click modules use the shared three-action menu',()=>{
 const comic=fs.readFileSync(path.resolve(__dirname,'../ldd-entertainment.js'),'utf8');
 const exam=fs.readFileSync(path.resolve(__dirname,'../ldd-exam-word-lookup.js'),'utf8');
 assert.match(exam,/window\.LDDTextActions\?\.presentWordElement\?\.\(el\)/);
 assert.equal((comic.match(/window\.LDDTextActions\?\.presentWordElement\?\.\(word\)/g)||[]).length,2);
 assert.match(page,/ldd-exam-word-lookup\.js\?v=20261122-universal-three-actions1/);
 assert.match(boot,/ldd-entertainment\.js\?v=20261122-universal-three-actions1/);
});

test('fallback notes never leak between two accounts sharing one device',()=>{
 assert.match(annotations,/async function note\(data\)/);
 assert.match(annotations,/const uid=await identity\(\)/);
 assert.match(annotations,/hash\(uid\+'\|'\+location\.pathname/);
});
test('long article action menu stays visible at the end of multi-screen selections',()=>{
 assert.match(actions,/Array\.from\(data\.range\.getClientRects\?\.\(\)\|\|\[\]\)/);
 assert.match(actions,/visible\[visible\.length-1\]/);
 assert.match(actions,/window\.innerHeight-menu\.offsetHeight-8/);
});
