-- Extend the existing shared writing storage; preserve all drafts, submissions and RLS.
-- Applied using Supabase migration: extend_writing_to_thpt
begin;
alter table public.thcs_writing_submissions
 drop constraint thcs_writing_submissions_grade_check,
 add constraint thcs_writing_submissions_grade_check check (grade between 6 and 12);
commit;
