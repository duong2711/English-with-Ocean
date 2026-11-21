-- Student highlights and notes for assigned tests AND news articles share
-- public.student_test_annotations.  Keys are "ctest:*", "ilt:*", "irt:*"
-- and "news:<news_articles.id>".
-- Row-level security is already enabled, with one-owner CRUD policies based
-- on (select auth.uid()) = user_id. Never expose another student's notes.
-- Limit Data API grants to the operations used by the reader.
revoke all privileges on table public.student_test_annotations from anon;
revoke all privileges on table public.student_test_annotations from authenticated;
grant select, insert, update, delete on table public.student_test_annotations to authenticated;
