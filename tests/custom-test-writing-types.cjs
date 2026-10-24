// Run: node tests/custom-test-writing-types.cjs
// Regression cases for HV2 Writing imported as MCQ with blank answer options.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '..', 'scriptphonetics.js'), 'utf8');
const start = script.indexOf('    const CTEST_WRITING_ALIASES =');
const end = script.indexOf('    // Di chuyển 1 phần tử', start);
assert.ok(start > -1 && end > start, 'Question-type helpers must exist');
const types = new Function('CTEST_TYPE_LABELS', script.slice(start, end) +
  '\nreturn { resolve: ctestResolveQuestionType, manual: ctestEssayNeedsManualGrading };')({
  mcq: true, mcq_multi: true, essay: true, reorder: true, fill_blank: true
});
const cases = [
  [
    {type: 'mcq', prompt: 'Rewrite the sentence, keeping the same meaning. We stayed at home because it rained. (SO) → It rained, ______.', options: ['', '']},
    'essay', true, 'Screenshot of HV2',
  ],
  [
    {type: 'mcq', prompt: '<p>Rewrite the following sentences, keeping the same meaning.</p>', options: ['<p><br></p>', '&nbsp;']},
    'essay', true, 'HTML-only placeholder options',
  ],
  [
    {type: 'mcq', prompt: 'Choose the correct answer.', options: ['A', 'B']},
    'mcq', false, 'Legitimate multiple-choice',
  ],
  [
    {type: 'mcq', prompt: 'Rewrite the sentence', options: ['It rained, so we stayed home.', 'It rained but we went out.']},
    'mcq', false, 'Real options take precedence over essay wording',
  ],
  [
    {type: 'mcq', prompt: "What does 'rewrite' mean?", options: ['', '']},
    'mcq', false, 'Do not classify unrelated prompts',
  ],
  [
    {type: 'mcq', prompt: 'Rewrite the sentence', options: ['<img src="image.png">', '']},
    'mcq', false, 'Keep media-based answers',
  ],
  [
    {type: 'writing', prompt: 'Rewrite the sentence', answer: 'The model answer.'},
    'essay', true, 'Legacy Writing alias',
  ],
  [
    {type: 'essay', prompt: 'Describe your hobby.', answer: 'I enjoy collecting stamps.', manual_grading: false},
    'essay', false, 'Preserve explicitly configured auto grading',
  ],
  [
    {type: 'mcq_multi', prompt: 'Arrange the words to make a correct sentence.', options: ['', '']},
    'essay', true, 'Misclassified word arrangement',
  ],
];
for (const [q, expectedType, expectedManual, description] of cases) {
  assert.equal(types.resolve(q), expectedType, description + ': type');
  assert.equal(types.manual(q), expectedManual, description + ': grading');
}
console.log('PASS: ' + cases.length + ' HV2 custom-test question-type regression cases');
