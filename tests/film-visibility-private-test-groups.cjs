const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.join(__dirname, '..');
const film = fs.readFileSync(path.join(repo, 'ldd-film-cloze.js'), 'utf8');
const exams = fs.readFileSync(path.join(repo, 'scriptphonetics.js'), 'utf8');
const css = fs.readFileSync(path.join(repo, 'ldd-ctest-student-groups.css'), 'utf8');
const boot = fs.readFileSync(path.join(repo, 'ldd-ui-upgrade.js'), 'utf8');
const page = fs.readFileSync(path.join(repo, 'index.html'), 'utf8');

test('students cannot see films without script, including legacy movies', () => {
  assert.match(film, /if \(!isTeacher && \(!Array\.isArray\(lesson\.segments\) \|\| !lesson\.segments\.length\)\) return;/);
  assert.match(film, /lessons\.forEach\(put\);[\s\S]*?\(legacyMovies \|\| \[\]\)\.forEach\(put\);/);
  assert.match(film, /const isTeacher = String\(user\?\.email \|\| ''\)\.toLowerCase\(\) === TEACHER;/);
});

test('teacher private tests group by learner, with newest creation date first', () => {
  const begin = exams.indexOf('    async function renderTeacherList()');
  const end = exams.indexOf('    async function renderStudentList()', begin);
  const code = exams.slice(begin, end);
  assert.ok(begin > -1 && end > begin);
  assert.match(code, /const learnerGroups = new Map\(\);/);
  assert.match(code, /Date\.parse\(b\.created_at \|\| ''\)/);
  assert.doesNotMatch(code, /Date\.parse\(a\.updated_at \|\| a\.created_at/);
  assert.match(code, /recipients\.length \? recipients : \[null\]/);
  assert.match(code, /targets\.forEach\(studentEmail =>/);
  assert.match(code, /studentEmail \? \[studentEmail\] :/);
  assert.match(code, /learnerFilter\.add\(new Option\('Tất cả học viên/);
  assert.match(code, /folder\.dataset\.studentEmail = email/);
  assert.match(code, /group\.completed\+\+/);
  assert.match(code, /group\.pending\+\+/);
  assert.match(code, /group\.drafts\+\+/);
  assert.match(code, /folder\.open = index === 0/);
});

test('teacher grouping keeps original edit and grading actions', () => {
  const begin = exams.indexOf('    async function renderTeacherList()');
  const end = exams.indexOf('    async function renderStudentList()', begin);
  const code = exams.slice(begin, end);
  assert.match(code, /main\.addEventListener\('click', \(\) => openEditorForTest\(test\)\)/);
  assert.match(code, /openResultView\(test, sub, \{ editable: true \}\)/);
  assert.match(code, /sb\.from\('custom_test_submissions'\)\.delete\(\)\.eq\('id', sub\.id\)/);
  assert.match(code, /ctestIsArchivedBackup\(test\)/);
  assert.match(code, /unassignedGroup\.appendChild\(row\)/);
  assert.match(code, /archiveGroup\.appendChild\(row\)/);
  assert.match(exams, /async function renderStudentList\(\)/);
});

test('grouped teacher layout is responsive, and new assets are cache-busted', () => {
  assert.match(css, /\.ctest-student-group-filter/);
  assert.match(css, /\.ctest-student-group-summary/);
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(boot, /ldd-ctest-student-groups\.css\?v=20261116-grouped1/);
  assert.match(boot, /ldd-film-cloze\.js\?v=20261116-script-visibility1/);
  assert.match(page, /scriptphonetics\.js\?v=20261116-ctest-student-groups1/);
  assert.match(page, /ldd-ui-upgrade\.js\?v=20261116-ctest-student-groups1/);
});
