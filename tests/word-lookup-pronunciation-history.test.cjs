const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const main = fs.readFileSync(path.resolve(__dirname, '../scriptphonetics.js'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

function testHistory(entries, progress) {
  const begin = main.indexOf('function savedPronunciationScore(progress) {');
  const end = main.indexOf('// [MỚI] Badge số', begin);
  assert(begin > 0 && end > begin, 'find the exact pronunciation history helpers');
  const pureHelpers = main.slice(begin, end);
  return Function('myVocabList', 'vocabWordProgressMap', `
    'use strict';
    function normalizeWord(w) { return String(w || '').toLowerCase().trim(); }
    ${pureHelpers}
    return { savedPronunciationScore, recordedPronunciationForWord, isVocabWordPronounced };
  `)(entries, progress);
}

test('prior pronunciation scores from 0 to 100 prevent a repeat requirement', () => {
  const entries = [
    { id: 7, word: 'Apple', word_norm: 'apple' },
    { id: 8, word: 'APPLE', word_norm: 'apple' },
    { id: 9, word: 'banana' },
    { id: 10, word: 'pear' }
  ];
  const api = testHistory(entries, {
    '7': { pron_score: null, pron_first_checked: false },
    '8': { pron_score: 0, pron_first_checked: true },
    '9': { pron_score: '87.5', pron_first_checked: true },
    '10': { pron_score: null, pron_first_checked: false }
  });
  assert.deepEqual(api.recordedPronunciationForWord('apple'), { id: 8, score: 0 });
  assert.deepEqual(api.recordedPronunciationForWord('BANANA'), { id: 9, score: 87.5 });
  assert.equal(api.isVocabWordPronounced(7), true, 'same spelling with another meaning is already scored');
  assert.equal(api.isVocabWordPronounced(8), true);
  assert.equal(api.isVocabWordPronounced(9), true);
  assert.equal(api.isVocabWordPronounced(10), false);
  assert.equal(api.recordedPronunciationForWord('pear'), null);
});

test('missing, malformed or out-of-range scores do not bypass the first reading', () => {
  const api = testHistory([], {});
  for (const value of [null, undefined, '', 'abc', -1, 101, Infinity]) {
    assert.equal(api.savedPronunciationScore({ pron_score: value, pron_first_checked: true }), null);
  }
  assert.equal(api.savedPronunciationScore({ pron_score: '0' }), 0);
  assert.equal(api.savedPronunciationScore({ pron_score: 100 }), 100);
  assert.equal(api.savedPronunciationScore(null), null);
});

test('word tap checks account-specific history before deciding whether to gate', () => {
  const start = main.indexOf('async function handleWordTap(wordEl) {');
  const end = main.indexOf('window.lddExamLookupWord = handleWordTap;', start);
  const handler = main.slice(start, end);
  assert(start > 0 && end > start);
  assert(handler.includes('const lookupToken = ++wordLookupSeq;'));
  assert(handler.includes('await ensureMyVocabLoaded();'));
  assert(handler.includes('const recorded = recordedPronunciationForWord(norm);'));
  assert(handler.includes('wordLookupPronounceRequired = wordLookupIsGatedContext(wordEl, norm) && recorded === null;'));
  assert(handler.indexOf('window.speakEnglishWord(rawWord)') < handler.indexOf('await ensureMyVocabLoaded()'),
    'iOS speech remains in the synchronous tap');
  assert(handler.indexOf('await ensureMyVocabLoaded()') < handler.indexOf('const recorded = recordedPronunciationForWord(norm);'));
  assert(handler.includes('wordLookupPronounceVocabId = recorded ? recorded.id'));
});

test('previously scored words can be viewed and optionally practiced without locking the popup', () => {
  assert(main.includes('wordLookupPronounceRequired = recorded === null;'));
  assert(main.includes("wordLookupPronounceStatus.textContent = '📝 ' + label"));
  assert(main.includes("wordLookupPronounceRow.style.display = wordLookupPreviousScore === null ? 'none' : 'flex';"));
  assert(main.includes('if (!force && wordLookupPronounceRequired && !wordLookupPronounceDone'));
  assert(main.includes('recordPronunciationAttempt(wordLookupPronounceVocabId, score)'));
  assert(html.includes('scriptphonetics.js?v=20261122-pronunciation-history1'));
});
