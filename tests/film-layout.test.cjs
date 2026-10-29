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

test('the All videos button replaces the Entertainment back button only in watch mode', () => {
  assert.match(js, /entertainmentBack = panelHeader\?\.querySelector\('\[data-ent-back\]'\)/);
  assert.match(js, /entertainmentBack\.before\(browse\)/);
  assert.match(js, /browse\.addEventListener\('click', \(\) => \{/);
  assert.match(js, /browse\.hidden = true;/);
  assert.match(css, /#tab-giai-tri\.ldd-film-is-watching #ldd-ent-movies-panel > \.ldd-ent-panel-heading > \[data-ent-back\] \{\s*display:none!important;/);
  assert.match(css, /#tab-giai-tri \.ldd-film-browse\[hidden\] \{display:none!important\}/);
});

test('opening Phim ảnh first shows all videos and never automatically selects the first', () => {
  const mount = js.slice(js.indexOf('async function mount('), js.indexOf('async function openStandalone('));
  assert.match(mount, /const watch = \$el\('div', 'ldd-film-watch-layout'\);\s*watch\.hidden = true;/);
  assert.match(mount, /const library = \$el\('section', 'ldd-film-library'\)/);
  assert.match(mount, /card\.addEventListener\('click', \(\) => select\(item\)\)/);
  assert.match(mount, /library\.hidden = false;\s*watch\.hidden = true;\s*browse\.hidden = true;/);
  assert.doesNotMatch(mount, /select\(catalog\[0\]\)/);
  assert.match(mount, /browse\.addEventListener\('click', \(\) => \{[\s\S]*?library\.hidden = false;/);
});

test('watch-only sourced captions appear beside the film, with time-seek and safe fallback', () => {
  assert.match(js, /hasSourceCaptions = parsed\.provider === 'youtube' && parsed\.videoId === 'HeDpbMnrlRc'/);
  assert.match(js, /client\.functions\.invoke\('movie-caption-reader'/);
  assert.match(js, /captionPanel\.append\(transcriptList\)/);
  assert.match(js, /adapter\.seek\(start\); adapter\.play\(\)/);
  assert.match(js, /state\.textContent = 'Chưa tải được phụ đề:/);
  assert.match(css, /\.ldd-film-stage--video-only\.ldd-film-stage--with-transcript\s*\{[^}]*grid-template-columns:minmax\(0,1\.22fr\) minmax\(0,1fr\)/s);
  assert.match(css, /\.ldd-film-caption-list\s*\{[^}]*overflow-y:auto;overflow-x:hidden;[^}]*overscroll-behavior-y:contain;/s);
  assert.match(css, /@media\(max-width:739px\)\s*\{[\s\S]*\.ldd-film-stage--with-transcript\s*\{/);
});

test('captions scroll within their own area without sending the video off screen', () => {
  assert.match(css, /\.ldd-film-caption-panel\s*\{[^}]*display:flex;flex-direction:column;[^}]*height:clamp\(250px,var\(--ldd-film-video-height,400px\),530px\);[^}]*overflow:hidden;/s);
  assert.match(css, /\.ldd-film-caption-list\s*\{[^}]*flex:1 1 auto;min-height:0;[^}]*overflow-y:auto;overflow-x:hidden;[^}]*overscroll-behavior-y:contain;/s);
  assert.match(css, /@media\(max-width:739px\)\s*\{[\s\S]*?height:clamp\(210px,40dvh,350px\);/);
  assert.match(js, /transcriptList\.tabIndex = 0;/);
  assert.match(js, /transcriptList\.addEventListener\('wheel', markManualScroll/);
  assert.match(js, /transcriptList\.addEventListener\('touchstart', markManualScroll/);
  assert.match(js, /captionSizeObserver\?\.disconnect\(\)/);
  assert.match(js, /transcriptList\.scrollTop \+= lineRect\.top - listRect\.top/);
  const standalone = js.slice(js.indexOf('async function openStandalone('), js.indexOf('async function openLesson('));
  assert.doesNotMatch(standalone, /current\.scrollIntoView\(/);
  assert.doesNotMatch(standalone, /transcriptList\.scrollIntoView\(/);
});

test('caption lesson renders a blank, toggled Vietnamese, check and hint on every line', () => {
  const func = js.slice(js.indexOf('async function renderCaptionExercise('), js.indexOf('async function openStandalone('));
  assert.match(func, /const parts = String\(cue\.text \|\| ''\)\.split\(\/\\\{\(\[\^\{\}\]\+\)\\\}\/g\)/);
  assert.match(func, /const input = \$el\('input', 'ldd-film-answer ldd-film-caption-input'\)/);
  assert.match(func, /const translation = \$el\('p', 'ldd-film-caption-translation', cue\.translation_vi/);
  assert.match(func, /translation\.hidden = true;/);
  assert.match(func, /translate\.addEventListener\('click', toggleTranslation\)/);
  assert.match(func, /button\('Kiểm tra', 'ldd-film-check ldd-film-caption-check'\)/);
  assert.match(func, /button\('Gợi ý', 'ldd-film-hint ldd-film-caption-hint'\)/);
  assert.match(func, /client\.rpc\('movie_cloze_answer'/);
  assert.match(func, /client\.from\('movie_cloze_progress'\)/);
  assert.match(func, /p_segment_index: idx/);
  assert.match(func, /list\.scrollTop \+= itemRect\.top - listRect\.top/);
  assert.doesNotMatch(func, /scrollIntoView\(/);
});

test('caption-practice controls remain usable on tablets and phones inside bounded scroll', () => {
  assert.match(css, /\.ldd-film-caption-practice-list\s*\{[^}]*gap:9px;/s);
  assert.match(css, /\.ldd-film-caption-exercise\s*\{[^}]*border-radius:12px;/s);
  assert.match(css, /\.ldd-film-caption-translation\[hidden\]/);
  assert.match(css, /\.ldd-film-caption-input\s*\{[^}]*min-height:40px;/s);
  assert.match(css, /@media\(max-width:739px\)\{[\s\S]*?\.ldd-film-caption-input\s*\{width:110px;min-height:44px\}/);
  assert.match(js, /videoId === 'HeDpbMnrlRc'\) \{[\s\S]*?void openStandalone\(lesson, playerWrap\)/);
});

test('film pauses after each audible cue and advances only after graded completion', () => {
  const exercise = js.slice(js.indexOf('async function renderCaptionExercise('), js.indexOf('async function openStandalone('));
  assert.match(exercise, /const isComplete = idx => \{/);
  assert.match(exercise, /let gateIndex = raw\.findIndex\(\(_, idx\) => !isComplete\(idx\)\)/);
  assert.match(exercise, /button\('▶ Nghe lại · ' \+ padTime/);
  assert.match(exercise, /seek\.addEventListener\('click', \(\) => playCue\(idx\)\)/);
  assert.match(exercise, /row\.seek\.disabled = locked;/);
  assert.match(exercise, /input\.disabled = !enabled;/);
  assert.match(exercise, /check\.disabled = hint\.disabled = !enabled \|\| !heardGate;/);
  assert.match(exercise, /if \(!heardGate\) \{/);
  assert.match(exercise, /if \(data\?\.status === 'wrong'\) \{/);
  assert.match(exercise, /if \(isComplete\(idx\) && idx === gateIndex\) \{/);
  assert.match(exercise, /gateIndex = raw\.findIndex\(\(_, i\) => !isComplete\(i\)\)/);
  assert.match(exercise, /playCue\(gateIndex\)/);
  assert.match(exercise, /const finished = t >= cue\.end - 0\.045/);
  assert.match(exercise, /adapter\.pause\(\);/);
  assert.match(exercise, /heardGate = true;\s*updateRowStates\(\);/);
  assert.match(exercise, /seekPendingUntil = Date\.now\(\) \+ 2800/);
  assert.match(exercise, /const resumingPastGate/);
  assert.match(exercise, /\}, 100\);/);
  assert.doesNotMatch(exercise, /list\.scrollIntoView/);
});

test('guided listening visually locks future captions and leaves replay available', () => {
  assert.match(css, /\.ldd-film-caption-exercise\.is-next \{/);
  assert.match(css, /\.ldd-film-caption-exercise\.is-locked \{/);
  assert.match(css, /\.ldd-film-caption-seek\[disabled\] \{/);
  assert.match(js, /isPlaying: \(\) => player\.getPlayerState\(\) === window\.YT\.PlayerState\.PLAYING/);
});

test('correct answer jumps the transcript to the next cue immediately', () => {
  const exercise = js.slice(js.indexOf('async function renderCaptionExercise('), js.indexOf('async function openStandalone('));
  assert.match(exercise, /if \(isComplete\(idx\) && idx === gateIndex\) \{[\s\S]*?gateIndex = raw\.findIndex\([\s\S]*?showCue\(gateIndex\);\s*playCue\(gateIndex\);/);
  assert.match(exercise, /showCue = idx => \{[\s\S]*?manualScrollUntil = 0;[\s\S]*?list\.scrollTop \+= rowRect\.top - listRect\.top - 8;/);
  assert.match(exercise, /row\.classList\.add\('is-current'\)/);
  assert.match(exercise, /playCue = idx => \{[\s\S]*?adapter\.seek\(items\[idx\]\.start\);\s*adapter\.play\(\);/);
  assert.ok(
    exercise.indexOf('let activeIndex = -1;') < exercise.indexOf('showCue = idx => {'),
    'the initial cue can be focused without temporal-dead-zone errors'
  );
  assert.match(exercise, /focusGate = \(\) => \{[\s\S]*?showCue\(gateIndex\);/);
  // Advancing after a correct answer must not scroll the document or the video away.
  const show = exercise.slice(exercise.indexOf('showCue = idx => {'), exercise.indexOf('playCue = idx => {'));
  assert.doesNotMatch(show, /scrollIntoView\(|window\.scrollTo\(|document\.scrollTop/);
});
