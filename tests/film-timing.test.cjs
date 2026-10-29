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
  assert.match(cues[0].text, /She is \{kind\}/);
});


test('imports timestamps copied from YouTubeToTranscript without inventing word-level timings', () => {
  const text = '[00:01] At four, we say, Mommy, I love you.\n' +
    '[00:06] At fourteen, we say, I have trouble.\n' +
    '[00:13] At eighteen, we say, I want to leave this house.';
  const result = timing.parseTimestampedTranscript(text, '02:24');
  assert.deepEqual(result.errors, []);
  assert.equal(result.segments.length, 3);
  assert.equal(result.segments[0].start, 1);
  assert.equal(result.segments[0].end, 6);
  assert.equal(result.segments[1].end, 13);
  assert.equal(result.segments[2].end, 144);
  assert.ok(result.warnings.length);
});

test('rejects copied timestamps when duration is unknown, timestamp order is wrong, or text is missing', () => {
  const text = '00:01 Hello.\n00:04 Goodbye.';
  assert.ok(timing.parseTimestampedTranscript(text, '').errors.length);
  assert.ok(timing.parseTimestampedTranscript('00:02 Hi.\n00:01 Bye.', '00:12').errors.length);
  assert.ok(timing.parseTimestampedTranscript('00:01\n00:04 Goodbye.', '00:12').errors.length);
});

test('scene titles are not quiz questions and existing segment indices stay stable', () => {
  const source = [
    segment(0.26, 5.08),
    { start: 55, end: 58, text: 'In the classroom.' },
    segment(64.74, 70.22, 'Look at the {blackboard}.')
  ];
  const exerciseIndices = source.map((cue, i) =>
    /\{[^{}]+\}/.test(cue.text) ? i : -1).filter(i => i >= 0);
  assert.deepEqual(exerciseIndices, [0, 2]);
  assert.equal(timing.cueAtTime(source, 58.02, i => !exerciseIndices.includes(i)), -1);
  assert.equal(timing.cueAtTime(source, 70.24, i => !exerciseIndices.includes(i)), 2);
});
