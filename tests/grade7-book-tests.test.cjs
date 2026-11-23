const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.resolve(__dirname,'..');
const page=fs.readFileSync(path.join(base,'index.html'),'utf8');
const boot=fs.readFileSync(path.join(base,'ldd-ui-upgrade.js'),'utf8');
const view=fs.readFileSync(path.join(base,'ldd-grade7-book-tests.js'),'utf8');
const css=fs.readFileSync(path.join(base,'ldd-grade7-book-tests.css'),'utf8');
const actions=fs.readFileSync(path.join(base,'ldd-text-actions.js'),'utf8');
const annotations=fs.readFileSync(path.join(base,'ldd-test-annotations.js'),'utf8');
const scope={window:{}};
for(const file of ['ldd-grade7-book-tests-data.js','ldd-grade7-book-tests-unit2.js'])
  vm.runInNewContext(fs.readFileSync(path.join(base,file),'utf8'),scope);
const book=scope.window.LDDGrade7BookTests;

test('school-exam folder opens 12 grade-seven units without replacing private exams',()=>{
  assert.match(page,/id="ldd-school-exams-folder"/);
  assert.match(page,/id="ctest-folder-card"/);
  assert.match(boot,/'ldd-school-exams-folder'/);
  assert.match(boot,/'ldd-school-exams-panel'/);
  assert.match(view,/grid\.style\.display='none';panel\.hidden=false;panel\.style\.display=''/);
  assert.match(view,/const matches=library\.tests\.filter\(t=>t\.unit===n&&t\.verified\)/);
  assert.match(css,/#ldd-school-exams-panel/);
});
test('assets for exam, two-action menu and persisted annotations are cache-versioned',()=>{
  assert.match(boot,/ldd-grade7-book-tests-data\.js\?v=20261124-mlh7-1/);
  assert.match(boot,/ldd-grade7-book-tests-unit2\.js\?v=20261124-mlh7-1/);
  assert.match(boot,/ldd-grade7-book-tests\.js\?v=20261124-mlh7-review1/);
  assert.match(boot,/ldd-grade7-book-tests\.css\?v=20261124-mlh7-review1/);
  assert.match(boot,/ldd-text-actions\.js\?v=20261124-mlh7-two-actions1/);
  assert.match(boot,/ldd-test-annotations\.js\?v=20261124-mlh7-annotations1/);
  assert.match(page,/ldd-ui-upgrade\.js\?v=20261124-mlh7-review1/);
});
test('all twelve units exist; only scanned and reviewed workbook tests appear',()=>{
  assert.equal(book.units.length,12);
  assert.equal(book.tests.length,2);
  assert.deepEqual(Array.from(book.tests,t=>t.unit),[1,2]);
  for(const item of book.tests)assert.equal(item.verified,true);
  assert.match(view,/Không đăng bản OCR chưa kiểm tra/);
});
test('Unit 1 and Unit 2 preserve ten exercise sections and original answer formats',()=>{
  for(const [unit,expectedCount] of [[1,73],[2,71]]){
    const t=book.tests.find(x=>x.unit===unit);
    assert.equal(t.sections.length,10);
    assert.deepEqual(Array.from(t.sections,s=>s.label),['I','II','III','IV','V','VI','VII','VIII','IX','X']);
    assert.equal(t.sections.reduce((n,s)=>n+s.questions.length,0),expectedCount);
    for(const sec of t.sections)for(const q of sec.questions){
      assert.ok(q.answer?.trim());
      if(q.type==='choice')assert.ok(['a','b','c','d'].includes(q.answer)&&q.options.length===4);
      if(q.type==='match')assert.ok(sec.choices?.length>=6);
    }
  }
});
test('exam allows Highlight and Note but never translation or pronunciation',()=>{
  assert.match(view,/content\.id='ldd-mlh7-text'/);
  assert.match(view,/content\.setAttribute\('data-ldd-text-actions',''\)/);
  assert.match(view,/content\.setAttribute\('data-ldd-no-translation','true'\)/);
  assert.match(actions,/translateButton\.hidden=translationDisabled/);
  assert.match(actions,/translateButton\.disabled=translationDisabled\|\|!english/);
  assert.match(actions,/if\(!elementOf\(snapshot\.range\?\.commonAncestorContainer\)\?\.closest\('\[data-ldd-no-translation\]'\)\) void translate\(snapshot\)/);
  assert.match(actions,/#ldd-mlh7-text label/);
  assert.match(annotations,/key:'mlh7:'\+testId/);
  assert.match(annotations,/const ROOTS=\[[^\]]*'ldd-mlh7-text'/);
  assert.match(view,/LDDTestAnnotations\?\.refresh\?\.\(\)/);
  assert.match(css,/#ldd-mlh7-text/);
});
test('each answer is saved locally immediately and merged remotely without overwriting other questions',()=>{
  assert.match(view,/ctx\.dirty\[key\]=value/);
  assert.match(view,/localStorage\.setItem\(localKey\(ctx\.test\)/);
  assert.match(view,/setTimeout\(\(\)=>\{void flushAnswers\(ctx\)\},ctx\._choice\?0:250\)/);
  assert.match(view,/db\.rpc\('grade7_save_answer'/);
  assert.match(view,/p_test_id:ctx\.test\.id,p_question_key:key,p_answer:value/);
  assert.match(view,/if\(ctx\.dirty\[key\]===value\)delete ctx\.dirty\[key\]/);
  assert.match(view,/ctx\.answers=\{\.\.\.\(data\.answers\|\|\{\}\),\.\.\.ctx\.dirty\}/);
  assert.match(view,/await flushAnswers\(ctx\)/);
  assert.match(view,/if\(Object\.keys\(ctx\.dirty\)\.length\)/);
  assert.match(view,/visibilitychange/);
  assert.match(view,/window\.addEventListener\('pagehide'/);
  assert.match(view,/window\.addEventListener\('online'/);
  assert.match(view,/sessionStorage\.setItem/);
});
test('students cannot change submitted work or forge teacher grading through the UI',()=>{
  assert.match(view,/\.eq\('status','draft'\)/);
  assert.match(view,/ctx\.submitted=true/);
  assert.match(view,/radio\.disabled=ctx\.submitted/);
  assert.match(view,/select\.disabled=ctx\.submitted/);
  assert.match(view,/input\.disabled=ctx\.submitted/);
  assert.match(view,/teacher=String\(session\?\.user\?\.email\|\|''\)\.toLowerCase\(\)===TEACHER/);
  assert.match(view,/if\(!teacher\|\|attempt\.status!=='submitted'\)return/);
  assert.match(view,/grade7_book_test_reviews/);
});
test('teacher reviews individual items, overrides machine marks and publishes feedback',()=>{
  assert.match(view,/function reviewSummary\(test,values,grades\)/);
  assert.match(view,/const mark=\(manual===0\|\|manual===1\)\?manual:autoMark/);
  assert.match(view,/if\(publish&&score\.pending\)/);
  assert.match(view,/state\.grades\[key\]=Number\(select\.value\)/);
  assert.match(view,/state\.comments\[key\]=comment\.value/);
  assert.match(view,/overall_feedback:state\.feedback/);
  assert.match(view,/\.upsert\(row,\{onConflict:'attempt_id'\}\)/);
  assert.match(view,/status:publish\|\|state\.published\?'published':'draft'/);
  assert.match(view,/Công bố điểm cho học viên/);
  assert.match(view,/ctx\.review\?\.overall_feedback/);
});
