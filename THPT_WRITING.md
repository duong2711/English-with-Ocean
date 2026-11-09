# THPT writing workshop

Global Success grades 10–12: 10 units per grade, two prompts per unit and four review tasks (after units 3, 5, 8 and 10). The prompts, models, biographies and chart datasets are original LDD practice materials. Practice word targets are labelled as LDD targets; they are not verbatim textbook instructions. Models are available after feedback for guided tasks only.

The existing THCS workshop now mounts with a track parameter. THCS grades 6–9 and THPT grades 10–12 retain separate saved views while using the same account-scoped draft keys, teacher assignment tools and immutable submissions. Existing THCS data is unchanged. The legacy `thcs_writing_*` tables store both tracks; `thpt_writing_setup.sql` extends only the grade check to 12. RLS and privileges are unchanged.

Genres include messages, emails, application letters, articles, essays, proposals, leaflets, biographies, reports, charts and CVs. Chart tasks provide SVG charts plus accessible data tables. Independent variants use their own datasets; the selected dataset or biography profile is included in grading context. CVs accept phrases and bullets. Grading retains the existing 10-point school rubric and curriculum-to-current-unit limits.

## Curriculum references

- Grade 10 publisher overview: https://heid.vn/product/sach-giao-khoa-tieng-anh-lop-10-global-success/
- Grade 10 book map: https://www.scribd.com/document/830234475/BOOK-MAP-Tieng-Anh-10-Global-Success
- Grade 11 publisher overview: https://heid.vn/product/sach-giao-khoa-tieng-anh-lop-11-global-success/
- Grade 11 training/book map: https://www.scribd.com/document/847847866/Tai-Lieu-Tap-Huan-Tieng-Anh-11-Global-Success
- Grade 12 contents/skill mapping: https://sach-giao-khoa.com/sach/sgk-tieng-anh-12-global-success-4879792656

These references inform topic and genre mapping, not model text. All chart numbers and named biography profiles are fictional and labelled accordingly.

## Verification

Run the following with jsdom 26.1.0 available on NODE_PATH:

- `node tests/thcs-writing.cjs`
- `node tests/thpt-writing.cjs`
- `node tests/writing-roadmap.cjs`

Coverage includes data integrity, model length, draft restore, account separation, track switching, chart variants, grading payload, asynchronous submission during navigation, teacher assignments and full-index roadmap integration. A rolled-back authenticated database transaction verifies submission inserts for grades 10, 11 and 12. AI tests use a controlled response; live provider output and mobile visual layout require a signed-in browser check.
