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
 assert.match(actions,/const tapped=e\.target\.closest\?\.\(LOOKUP_WORD\)/);
 assert.match(actions,/wordAtPoint\(e\)/);
 assert.match(actions,/translateWord\(\{text:clean,context:context\|\|clean,source:'Bài nghe Phim ảnh'\}\)/);
});
test('news article touch taps and phrase selections use the three-action menu',()=>{
 assert.match(actions,/function inArticleText\(node\)/);
 assert.match(actions,/articleSelection=inArticleText\(r\.startContainer\)&&inArticleText\(r\.endContainer\)/);
 assert.match(actions,/const READING_ROOT=/);
 assert.match(actions,/MAX_SELECTION=20000/);
 assert.match(actions,/!isLookupReader\(node\)\)return null/);
 assert.match(actions,/if\(selection\)\{[\s\S]*?e\.preventDefault\(\);e\.stopImmediatePropagation\(\);[\s\S]*?present\(selection\);return;[\s\S]*?\}/);
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
 assert.match(boot,/ldd-text-actions\.js\?v=20261124-study-only1/);
 assert.match(boot,/ldd-test-annotations\.js\?v=20261124-study-only1/);
 assert.match(boot,/ldd-text-actions\.css\?v=20261122-universal-three-actions1/);
 assert.match(boot,/ldd-ui-vocab-grammar\.js\?v=20261119-conj-return1/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261124-study-only1/);
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
 assert.match(boot,/ldd-test-annotations\.js\?v=20261124-study-only1/);
 assert.match(page,/ldd-ui-upgrade\.js\?v=20261124-study-only1/);
});

test('every dictionary-enabled reading surface uses the same three actions by default',()=>{
 assert.match(actions,/const READING_ROOT=/);
 assert.match(actions,/data-ldd-text-actions/);
 assert.match(actions,/function presentWordElement\(el\)/);
 assert.match(actions,/function presentSelection\(\)/);
 assert.match(actions,/LDDTextActions=\{openWord,translateTerm,explainVietnamese,presentWordElement,presentSelection\}/);
 assert.match(actions,/tapped && presentWordElement\(tapped\)/);
 assert.match(actions,/e\.stopImmediatePropagation\(\)/);
 assert.match(actions,/if\(selection\)\{[\s\S]*?e\.preventDefault\(\);e\.stopImmediatePropagation\(\);[\s\S]*?present\(selection\);return;[\s\S]*?\}/);
 assert.match(actions,/!node\|\|node\.nodeType!==3\|\|blocked\(node\)\|\|!isLookupReader\(node\)\)return null/);
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

test('news article non-editable content is interactive without reopening the old dictionary',()=>{
 assert.match(actions,/\[contenteditable\]:not\(\[contenteditable="false"\]\)/);
 assert.equal((actions.match(/\[contenteditable\]:not\(\[contenteditable="false"\]\)/g)||[]).length,2);
 const capture=actions.slice(actions.indexOf("window.addEventListener('click',function(e)"));
 assert.match(capture,/if\(selection\)\{[\s\S]*?e\.stopImmediatePropagation\(\);[\s\S]*?present\(selection\);return;/);
 assert.match(capture,/tapped && presentWordElement\(tapped\)/);
 assert.match(capture,/e\.preventDefault\(\);e\.stopImmediatePropagation\(\);/);
});

test('highlight option toggles to remove while retaining all three reading actions',()=>{
 const menu = actions.match(/menu\.innerHTML='([^']*)'/)?.[1] || '';
 assert.deepEqual([...menu.matchAll(/data-action="([a-z]+)"/g)].map(m=>m[1]),['translate','highlight','note']);
 assert.match(actions,/button\.textContent=enabled\?'🖍 Bỏ highlight':'🖍 Highlight'/);
 assert.match(actions,/LDDTestAnnotations\?\.isHighlighted\?\.\(data\)/);
 assert.match(actions,/LDDTestAnnotations\?\.highlightStatus/);
 assert.match(actions,/toggleLocalHighlight\(snapshot\.range,snapshot\.text\)/);
 assert.match(actions,/function rangesOverlap\(a,b\)/);
 assert.match(actions,/Range\.START_TO_END,b\)>0/);
 assert.match(actions,/Range\.END_TO_START,b\)<0/);
});
test('saved highlights are removed from user-owned storage without deleting notes or neighboring words',()=>{
 assert.match(annotations,/function overlappingHighlights\(info,s,loc\)/);
 assert.match(annotations,/entry\.kind!=='highlight'/);
 assert.match(annotations,/function isHighlighted\(data\)/);
 assert.match(annotations,/async function highlightStatus\(data\)/);
 assert.match(annotations,/const overlaps=overlappingHighlights\(info,s,loc\)/);
 assert.match(annotations,/raw\.slice\(start,end\)/);
 assert.match(annotations,/const oldIds=overlaps\.map\(o=>o\.entry\.id\)/);
 assert.match(annotations,/\.in\('id',oldIds\)\.select\('id'\)/);
 assert.match(annotations,/s\.items=s\.items\.filter\(item=>!oldIds\.includes\(item\.id\)\)\.concat\(added\)/);
 assert.match(annotations,/window\.LDDTestAnnotations=\{highlight,isHighlighted,highlightStatus,note,refresh:/);
});

test('the toolbar only runs on dictionary-enabled learning text, never folder cards or general UI',()=>{
 const root=actions.match(/const READING_ROOT='([^']+)'/)?.[1]||'';
 assert.match(root,/#news-article-text/);
 assert.match(root,/\.news-sentence-en/);
 assert.match(root,/\.ldd-exam-lookup-root/);
 assert.match(root,/\[data-ldd-text-actions\]/);
 assert.doesNotMatch(root,/#inside|\.main-tab-content|#ldd-ent-movies-panel|\[data-vocab-context\]/);
 assert.match(actions,/const LOOKUP_WORD='\.tappable-word,\.ldd-exam-lookup-word,\[data-ldd-lookup-word\]'/);
 assert.match(actions,/const NON_STUDY_UI='[^']*\.folder-card,[^']*\.news-card/);
 assert.match(actions,/function inNonStudyUI\(node\)/);
 assert.match(actions,/function tokenizedTextBlock\(node\)/);
 assert.match(actions,/function inLearningArea\(node\)/);
 assert.match(actions,/!inNonStudyUI\(el\)/);
 assert.match(actions,/const startReader=start\?\.closest\(READING_ROOT\),endReader=end\?\.closest\(READING_ROOT\)/);
 assert.match(actions,/const sameReader=!!startReader&&startReader===endReader/);
 assert.match(actions,/const sameTokenizedBlock=!!block&&block\.contains\(r\.startContainer\)&&block\.contains\(r\.endContainer\)/);
 assert.match(actions,/if\(!\(sameReader\|\|inlineWords\|\|sameTokenizedBlock\)/);
 const click=actions.slice(actions.indexOf("window.addEventListener('click',function(e)"));
 assert.match(click,/if\(inNonStudyUI\(e\.target\)\|\|!\(isLookupReader\(e\.target\)\|\|/);
 assert.match(click,/tapped&&inLearningArea\(tapped\)/);
 assert.match(click,/tokenizedTextBlock\(e\.target\)\)\)\{hideMenu\(\);return;\}/);
 assert.match(actions,/if\(!el\|\|blocked\(el\.parentElement\)\|\|!inLearningArea\(el\)\|\|!el\.isConnected\)return false/);
 assert.match(actions,/!node\|\|node\.nodeType!==3\|\|blocked\(node\)\|\|!isLookupReader\(node\)\)return null/);
});
