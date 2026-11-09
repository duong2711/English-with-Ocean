-- THCS writing: learner drafts and immutable attempts; teacher reviews are separate.
create table public.thcs_writing_drafts (
 user_id uuid not null references auth.users(id) on delete cascade,
 task_key text not null check(length(task_key)<80),
 draft jsonb not null default '{}' check(octet_length(draft::text)<100000),
 updated_at timestamptz not null default now(),
 primary key(user_id,task_key)
);
create table public.thcs_writing_submissions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 grade smallint not null check(grade between 6 and 9),
 unit smallint not null check(unit between 1 and 12),
 task_key text not null check(length(task_key)<80),
 prompt text not null check(length(prompt)<4000),
 body text not null check(length(trim(body))>0 and length(body)<=12000),
 support text not null check(support in ('guided','light','independent')),
 ai_feedback jsonb check(octet_length(ai_feedback::text)<50000),
 created_at timestamptz not null default now()
);
create index thcs_writing_submissions_owner on public.thcs_writing_submissions(user_id,created_at desc);
create index thcs_writing_submissions_grade on public.thcs_writing_submissions(grade,created_at desc);
create table public.thcs_writing_reviews (
 submission_id uuid primary key references public.thcs_writing_submissions(id) on delete cascade,
 score numeric(3,1) not null check(score between 0 and 10),
 comment text not null check(length(comment)<=12000),
 updated_at timestamptz not null default now()
);
create table public.thcs_writing_assignments (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 task_key text not null check(length(task_key)<80),
 note text not null default '' check(length(note)<2000),
 created_at timestamptz not null default now(),
 unique(user_id,task_key)
);
alter table public.thcs_writing_drafts enable row level security;
alter table public.thcs_writing_submissions enable row level security;
alter table public.thcs_writing_reviews enable row level security;
alter table public.thcs_writing_assignments enable row level security;
revoke all on public.thcs_writing_drafts,public.thcs_writing_submissions,public.thcs_writing_reviews,public.thcs_writing_assignments from anon;
grant select,insert,update on public.thcs_writing_drafts to authenticated;
grant select,insert on public.thcs_writing_submissions to authenticated;
grant select,insert,update on public.thcs_writing_reviews to authenticated;
grant select,insert,update,delete on public.thcs_writing_assignments to authenticated;
create policy writing_draft_select on public.thcs_writing_drafts for select to authenticated using (user_id=(select auth.uid()));
create policy writing_draft_insert on public.thcs_writing_drafts for insert to authenticated with check (user_id=(select auth.uid()));
create policy writing_draft_update on public.thcs_writing_drafts for update to authenticated using (user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy writing_submission_select on public.thcs_writing_submissions for select to authenticated using (user_id=(select auth.uid()) or (select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_submission_insert on public.thcs_writing_submissions for insert to authenticated with check (user_id=(select auth.uid()));
create policy writing_review_select on public.thcs_writing_reviews for select to authenticated using ((select auth.jwt()->>'email')='lddbaiu@gmail.com' or exists(select 1 from public.thcs_writing_submissions s where s.id=submission_id and s.user_id=(select auth.uid())));
create policy writing_review_insert on public.thcs_writing_reviews for insert to authenticated with check ((select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_review_update on public.thcs_writing_reviews for update to authenticated using ((select auth.jwt()->>'email')='lddbaiu@gmail.com') with check ((select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_assignment_select on public.thcs_writing_assignments for select to authenticated using (user_id=(select auth.uid()) or (select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_assignment_insert on public.thcs_writing_assignments for insert to authenticated with check ((select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_assignment_update on public.thcs_writing_assignments for update to authenticated using ((select auth.jwt()->>'email')='lddbaiu@gmail.com') with check ((select auth.jwt()->>'email')='lddbaiu@gmail.com');
create policy writing_assignment_delete on public.thcs_writing_assignments for delete to authenticated using ((select auth.jwt()->>'email')='lddbaiu@gmail.com');
