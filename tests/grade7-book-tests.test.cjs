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
const scope={window:{}};
for(const file of ['ldd-grade7-book-tests-data.js','ldd-grade7-book-tests-unit2.js']){
  vm.runInNewContext(fs.readFileSync(path.join(base,file),'utf8'),scope);
}
const book=scope.window.LDDGrade7BookTests;
test('school exam folder opens grade7 unit hierarchy without replacing private tests',()=>{
  assert.match(page,/id="ldd-school-exams-folder"/);
  assert.match(page,/id="ctest-folder-card"/);
  assert.match(boot,/'ldd-school-exams-folder'/);
  assert.match(boot,/'ldd-school-exams-panel'/);
  assert.match(boot,/ldd-grade7-book-tests-data\.js\?v=20261124-mlh7-1/);
  assert.match(boot,/ldd-grade7-book-tests-unit2\.js\?v=20261124-mlh7-1/);
  assert.match(boot,/ldd-grade7-book-tests\.js\?v=20261124-mlh7-1/);
  assert.match(page,/ldd-ui-upgrade\.js\?v=20261124-grade7-book1/);
  assert.match(view,/grid\.style\.display='none';panel\.hidden=false;panel\.style\.display=''/);
  assert.match(view,/const items=library\.tests\.filter\(t=>t\.unit===unit&&t\.verified\)/);
  assert.match(css,/#ldd-school-exams-panel/);
});
test('grade7 has 12 book units but only shows carefully verified tests',()=>{
  assert.equal(book.units.length,12);
  assert.equal(book.tests.length,2);
  assert.deepEqual(Array.from(book.tests,t=>t.unit),[1,2]);
  for(const item of book.tests)assert.equal(item.verified,true);
  assert.match(view,/Không tự động đăng nội dung OCR chưa đối chiếu/);
});
test('Unit 1 and Unit 2 preserve the ten book exercise sections and answer types',()=>{
  for(const [unit,expectedCount] of [[1,73],[2,71]]){
    const t=book.tests.find(x=>x.unit===unit);
    assert.equal(t.sections.length,10);
    assert.deepEqual(Array.from(t.sections,s=>s.label),['I','II','III','IV','V','VI','VII','VIII','IX','X']);
    assert.equal(t.sections.reduce((n,s)=>n+s.questions.length,0),expectedCount);
    for(const section of t.sections){
      for(const q of section.questions){
        assert.ok(q.answer?.trim());
        if(q.type==='choice')assert.ok(['a','b','c','d'].includes(q.answer)&&q.options.length===4);
        if(q.type==='match')assert.ok(section.choices?.length>=6);
      }
    }
  }
});
test('students save drafts and submissions with account-owned Supabase rows',()=>{
  assert.match(view,/grade7_book_test_attempts/);
  assert.match(view,/localStorage\.setItem/);
  assert.match(view,/getSession\(\)/);
  assert.match(view,/\.upsert\(row,\{onConflict:'user_id,test_id'\}\)/);
  assert.match(view,/status:submitted\?'submitted':'draft'/);
  assert.match(view,/function calculate\(test\)/);
  assert.match(view,/sessionStorage\.setItem/);
});
