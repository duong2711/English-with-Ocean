'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(path.resolve(__dirname, '../ldd-film-cloze.css'), 'utf8');
const js = fs.readFileSync(path.resolve(__dirname, '../ldd-film-cloze.js'), 'utf8');

const tabletStart = css.lastIndexOf('@media (min-width:740px) {');
const mobileStart = css.lastIndexOf('@media (max-width:739px) {');

test('tablet and desktop keep video left, exercise right and full translation visible', () => {
  assert.ok(tabletStart >= 0, 'tablet two-column breakpoint exists');
  const tabletStyles = css.slice(tabletStart, mobileStart);
  assert.match(tabletStyles, /grid-template-areas:"screen exercise" "title exercise" "controls exercise"/);
  assert.match(tabletStyles, /\.ldd-film-stage:not\(\.ldd-film-stage--video-only\) > \.ldd-film-screen/);
  assert.match(tabletStyles, /\.ldd-film-stage:not\(\.ldd-film-stage--video-only\) > \.ldd-film-question/);
  assert.match(tabletStyles, /\.ldd-film-question-body\s*\{\s*display:flex;\s*flex-direction:column/);
  assert.match(tabletStyles, /\.ldd-film-translation\s*\{[^}]*max-height:none;[^}]*overflow:visible/s);
  assert.match(tabletStyles, /\.ldd-film-stage--video-only\s*\{\s*display:flex/);
});

test('recommended videos are below the lesson and form 3/2/1 grid by width', () => {
  const overrides = css.slice(css.indexOf('/* Lesson player + exercise: two columns starting at tablet widths.'));
  assert.match(overrides, /\.ldd-film-watch-layout,\s*#[^\n]*\.ldd-film-watch-layout\.ldd-film-focus-mode\s*\{[^}]*grid-template-columns:minmax\(0,1fr\)/s);
  assert.match(overrides, /\.ldd-film-rec-list\s*\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/s);
  assert.match(overrides, /@media \(min-width:740px\) and \(max-width:1080px\) \{[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(overrides, /@media \(max-width:739px\) \{[\s\S]*grid-template-columns:minmax\(0,1fr\)/);
  assert.ok(css.indexOf('.ldd-film-watch-layout') < tabletStart, 'tablet style overrides earlier layout');
});

test('video-only lessons avoid the empty exercise column', () => {
  assert.match(js, /ldd-film-stage ldd-film-stage--video-only/);
  assert.match(js, /stage\.append\(screen, heading, controls, question\)/);
  assert.match(js, /watch\.append\(primary, suggestions\)/);
});
