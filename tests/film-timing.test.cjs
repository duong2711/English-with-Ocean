'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const timing = require('../ldd-film-timing.js');

const segment = (start, end, text = 'I {love} my mom.') => ({ start, end, text });

test('normal script passes timeline validation', () => {
  const result = timing.check([segment(1, 5), segment(6, 13), segment(14, 20)], { duration: 145 });
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
});

test('regression: 47-second lost time is flagged before publication', () => {
  const result = timing.check([segment(51, 58), segment(105, 110)]);
  assert.equal(result.ok, true);
  assert.match(result.warnings.join(' '), /47 giây/);
});

test('video duration boundary prevents impossible transcript', () => {
  const result = timing.check([segment(100, 179)], { duration: 144 });
  assert.equal(result.ok, false);
  assert.match(result.errors.join(' '), /thời lượng video/);
});

test('reversed, overlapping and invalid timestamps are rejected', () => {
  assert.equal(timing.check([segment(1, 10), segment(8, 12)]).ok, false);
  assert.equal(timing.check([segment(12, 14), segment(2, 5)]).ok, false);
  assert.equal(timing.check([segment(-1, 2)]).ok, false);
  assert.equal(timing.check([segment(2, 2)]).ok, false);
});

test('seeking does not trigger an old unanswered question', () => {
  const cues = [segment(1, 5), segment(7, 10), segment(12, 15)];
  assert.equal(timing.cueAtTime(cues, 5.03), 0);
  assert.equal(timing.cueAtTime(cues, 10.06), 1);
  assert.equal(timing.cueAtTime(cues, 15.05), 2);
  assert.equal(timing.cueAtTime(cues, 20), -1);
  assert.equal(timing.cueAtTime(cues, 5.03, index => index === 0), -1);
});

test('a subtitle cue containing two sentences is not split by guessed durations', () => {
  const window = { LDDFilmTiming: timing };
  const script = fs.readFileSync(path.resolve(__dirname, '../ldd-film-cloze.js'), 'utf8');
  vm.runInNewContext(script, { window, URL });
  const srt = '1\n00:00:01,000 --> 00:00:05,000\nI love my mom. She is kind.\n\n' +
    '2\n00:00:06,000 --> 00:00:08,000\nThank you, Mom.';
  const cues = window.LDDFilmCloze.parseSubtitles(srt, true);
  assert.equal(cues.length, 2);
  assert.equal(cues[0].start, 1);
  assert.equal(cues[0].end, 5);
  assert.match(cues[0].text, /She is kind/);
});
