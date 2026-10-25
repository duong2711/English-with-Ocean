# Student exam navigation

All new on-site exam renderers must provide a question sheet using `LDDExamUI`
from `ldd-exam-navigation.js` and load its accompanying stylesheet.

- Green means answered; grey means unanswered. Colour must not reveal correctness.
- Update the sheet when answers change or clear, and restore it from saved answers.
- Each number jumps to its question, revealing its Part/Passage if necessary.
- Timer and sheet occupy separate layout tracks, outside the scrolling paper.
  Do not float timers or navigation controls over question content.
- On narrow screens the question sheet expands inline below the timer toolbar;
  it closes after navigation and reserves its own space while open.
- Preserve answer nodes, media playback, grading, autosave and submission handlers.
- Navigation within an exam is not an exam violation.

Custom tests register leaf questions with `setQuestions('ctest', entries)` and call
`refresh('ctest')` when their answer model changes. An entry has `label`, `element`
and `answered()`; this predicate checks completion only, never correctness.
IELTS renderers reuse their existing grid, answer-state callbacks and part switching.
Standalone papers and sequential tests can use `inline(container, entries)`; an
entry may supply `go()` for custom navigation and `disabled()` while a required
recording or save is in progress. Keep submitted vocabulary answers read-only on
revisit to avoid counting the same attempt twice.

Validate with `tests/exam-navigation.cjs`: actual renderers, saved/cleared answers,
long-paper navigation, vocabulary drafts and duplicate-attempt protection,
standalone questions, and viewport geometry from 320px to 1920px.
