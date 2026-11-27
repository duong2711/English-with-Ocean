-- Run once in Supabase SQL editor. Safe to re-run.
create table if not exists public.whisper_word_exclusions (
 word_norm text primary key, word text not null, active boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 updated_by uuid references auth.users(id)
);
create table if not exists public.whisper_word_reports (
 word_norm text primary key, word text not null, report_count integer not null default 1,
 first_reporter_id uuid references auth.users(id), latest_reporter_id uuid references auth.users(id),
 latest_reporter_email text, first_reported_at timestamptz not null default now(),
 latest_reported_at timestamptz not null default now(),
 status text not null default 'pending' check(status in ('pending','accepted','rejected')),
 teacher_notified_at timestamptz not null default now(), teacher_seen_at timestamptz,
 resolved_at timestamptz, resolved_by uuid references auth.users(id)
);
alter table public.whisper_word_exclusions enable row level security;
alter table public.whisper_word_reports enable row level security;
revoke all on public.whisper_word_exclusions from anon,authenticated;
revoke all on public.whisper_word_reports from anon,authenticated;
grant select on public.whisper_word_exclusions to authenticated;
grant select on public.whisper_word_reports to authenticated;
drop policy if exists "Authenticated can read active Whisper exclusions" on public.whisper_word_exclusions;
create policy "Authenticated can read active Whisper exclusions" on public.whisper_word_exclusions
 for select to authenticated using(active=true);
drop policy if exists "Only teacher reads Whisper reports" on public.whisper_word_reports;
create policy "Only teacher reads Whisper reports" on public.whisper_word_reports
 for select to authenticated using(lower(coalesce(auth.jwt()->>'email',''))='lddbaiu@gmail.com');

create or replace function public.report_whisper_word(p_word text) returns jsonb
language plpgsql security definer set search_path=''
as $$
declare v_uid uuid:=auth.uid(); v_email text:=lower(coalesce(auth.jwt()->>'email',''));
 v_word text:=btrim(coalesce(p_word,'')); v_norm text; v_count integer;
begin
 if v_uid is null then raise exception 'authentication required'; end if;
 v_norm:=regexp_replace(lower(v_word),'[^a-z0-9]+','','g');
 if length(v_norm)<1 or length(v_norm)>80 or length(v_word)>100 then raise exception 'invalid word'; end if;
 insert into public.whisper_word_reports(word_norm,word,report_count,first_reporter_id,latest_reporter_id,latest_reporter_email)
 values(v_norm,v_word,1,v_uid,v_uid,v_email)
 on conflict(word_norm) do update set word=excluded.word,
 report_count=public.whisper_word_reports.report_count+1,
 latest_reporter_id=excluded.latest_reporter_id,latest_reporter_email=excluded.latest_reporter_email,
 latest_reported_at=now();
 insert into public.whisper_word_exclusions(word_norm,word,active,updated_at,updated_by)
 values(v_norm,v_word,true,now(),v_uid)
 on conflict(word_norm) do update set word=excluded.word,active=true,updated_at=now(),updated_by=v_uid;
 select report_count into v_count from public.whisper_word_reports where word_norm=v_norm;
 return jsonb_build_object('word_norm',v_norm,'report_count',v_count,'skipped',true);
end $$;
revoke all on function public.report_whisper_word(text) from public,anon;
grant execute on function public.report_whisper_word(text) to authenticated;

create or replace function public.teacher_set_whisper_word(p_word text,p_action text) returns jsonb
language plpgsql security definer set search_path=''
as $$
declare v_uid uuid:=auth.uid(); v_word text:=btrim(coalesce(p_word,''));
 v_norm text:=regexp_replace(lower(v_word),'[^a-z0-9]+','','g');
begin
 if v_uid is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com' then raise exception 'teacher access required'; end if;
 if length(v_norm)<1 or length(v_norm)>80 or p_action not in ('add','remove') then raise exception 'invalid action or word'; end if;
 if p_action='add' then
  insert into public.whisper_word_exclusions(word_norm,word,active,updated_at,updated_by)
  values(v_norm,v_word,true,now(),v_uid)
  on conflict(word_norm) do update set word=excluded.word,active=true,updated_at=now(),updated_by=v_uid;
  update public.whisper_word_reports set status='accepted',resolved_at=now(),resolved_by=v_uid where word_norm=v_norm;
 else
  update public.whisper_word_exclusions set active=false,updated_at=now(),updated_by=v_uid where word_norm=v_norm;
  update public.whisper_word_reports set status='rejected',resolved_at=now(),resolved_by=v_uid where word_norm=v_norm;
 end if;
 return jsonb_build_object('word_norm',v_norm,'action',p_action);
end $$;
revoke all on function public.teacher_set_whisper_word(text,text) from public,anon;
grant execute on function public.teacher_set_whisper_word(text,text) to authenticated;

create or replace function public.claim_whisper_report_notifications()
returns table(word text,report_count integer,latest_reported_at timestamptz)
language plpgsql security definer set search_path=''
as $$
begin
 if auth.uid() is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com' then raise exception 'teacher access required'; end if;
 return query update public.whisper_word_reports r set teacher_seen_at=now()
 where r.status='pending' and r.teacher_seen_at is null
 returning r.word,r.report_count,r.latest_reported_at;
end $$;
revoke all on function public.claim_whisper_report_notifications() from public,anon;
grant execute on function public.claim_whisper_report_notifications() to authenticated;

create or replace function public.get_custom_test_annotations_for_teacher(p_test_id uuid,p_student_email text)
returns table(id uuid,kind text,selected_text text,start_offset integer,end_offset integer,note_text text,created_at timestamptz)
language plpgsql security definer set search_path=''
as $$
declare v_uid uuid:=auth.uid(); v_student_id uuid;
begin
 if v_uid is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com' then raise exception 'teacher access required'; end if;
 if not exists(select 1 from public.custom_tests t where t.id=p_test_id and lower(t.teacher_email)=lower(auth.jwt()->>'email')) then
  raise exception 'test not owned by teacher';
 end if;
 select u.id into v_student_id from auth.users u where lower(u.email)=lower(p_student_email) limit 1;
 if v_student_id is null then return; end if;
 return query select a.id,a.kind,a.selected_text,a.start_offset,a.end_offset,a.note_text,a.created_at
 from public.student_test_annotations a where a.user_id=v_student_id
 and a.test_key='ctest:'||p_test_id::text and a.root_id='ctest-take-sections'
 order by a.created_at asc;
end $$;
revoke all on function public.get_custom_test_annotations_for_teacher(uuid,text) from public,anon;
grant execute on function public.get_custom_test_annotations_for_teacher(uuid,text) to authenticated;
