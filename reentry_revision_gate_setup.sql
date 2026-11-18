-- LDD English: re-entry revision gate (staged rollout).
-- The feature is DISABLED until the teacher enables it in the admin panel.
-- The login session remains available to display the contact/unlock instructions.
-- IMPORTANT: Apply SQL before deploying ldd-reentry-gate.js.
create schema if not exists ldd_reentry_private;

create table if not exists public.ldd_reentry_settings (
  singleton boolean primary key default true check (singleton),
  enabled boolean not null default false,
  inactivity_hours integer not null default 72 check (inactivity_hours between 24 and 720),
  question_count integer not null default 10 check (question_count = 10),
  pass_count integer not null default 6 check (pass_count = 6),
  updated_at timestamptz not null default now()
);
insert into public.ldd_reentry_settings(singleton) values (true) on conflict do nothing;

create table if not exists public.ldd_reentry_students (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_learning_at timestamptz not null default now(),
  gate_status text not null default 'clear' check (gate_status in ('clear','quiz','locked')),
  active_attempt_id uuid,
  locked_at timestamptz,
  updated_at timestamptz not null default now()
);
create table if not exists public.ldd_reentry_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  questions jsonb not null,
  answers jsonb,
  score integer,
  status text not null default 'in_progress' check (status in ('in_progress','passed','failed')),
  created_at timestamptz not null default now(),
  submitted_at timestamptz
);
create index if not exists ldd_reentry_attempts_user_idx on public.ldd_reentry_attempts(user_id,created_at desc);

alter table public.ldd_reentry_settings enable row level security;
alter table public.ldd_reentry_students enable row level security;
alter table public.ldd_reentry_attempts enable row level security;
revoke all on public.ldd_reentry_settings,public.ldd_reentry_students,public.ldd_reentry_attempts from anon,authenticated;
-- Never expose the answers, scores or privileged writes through PostgREST.
revoke all on schema ldd_reentry_private from public,anon,authenticated;

-- A valid learning-time heartbeat may advance last_learning_at ONLY before it has expired.
-- A heartbeat arriving after 72h cannot clear a pending revision quiz.
create or replace function ldd_reentry_private.track_learning()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare max_hours integer;
begin
  select inactivity_hours into max_hours from public.ldd_reentry_settings where singleton=true;
  if max_hours is null then return new; end if;
  if tg_op='INSERT' or new.seconds is distinct from old.seconds then
    update public.ldd_reentry_students
    set last_learning_at=greatest(last_learning_at,least(new.updated_at,now())),
        updated_at=now()
    where user_id=new.user_id and gate_status='clear'
      and new.updated_at >= last_learning_at
      and new.updated_at <= last_learning_at + make_interval(hours=>max_hours);
  end if;
  return new;
end;
$$;
drop trigger if exists ldd_reentry_track_learning on public.study_time_log;
create trigger ldd_reentry_track_learning
after insert or update on public.study_time_log
for each row execute function ldd_reentry_private.track_learning();

-- Pick only objective, text-only 4-option MCQs which learners at the SAME level
-- previously got wrong. Other students' identities or answers are never returned.
create or replace function ldd_reentry_private.make_quiz(p_user uuid,p_email text,p_count integer)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_grade smallint;
  v_track text;
  v_questions jsonb;
begin
  select grade_level,learning_track into v_grade,v_track
  from public.student_grade_assignments
  where lower(email)=lower(p_email) limit 1;

  with eligible as (
    select
      s.test_id,
      sec->>'id' as section_id,
      q->>'id' as question_id,
      q,
      md5(lower(trim(regexp_replace(coalesce(q->>'prompt',''),'\s+',' ','g'))) || ':' || (q->'options')::text) as fingerprint
    from public.custom_test_submissions s
    join public.custom_tests t on t.id=s.test_id
    left join public.student_grade_assignments a on lower(a.email)=lower(s.student_email)
    cross join lateral jsonb_array_elements(t.sections) sec
    cross join lateral jsonb_array_elements(sec->'questions') q
    where s.status='submitted'
      and t.title !~* '^\s*\[(BẢN SAO|SAO LƯU)(\s|\])'
      and (case when v_grade is not null then a.grade_level=v_grade
                when v_track is not null then a.learning_track=v_track
                else lower(s.student_email)=lower(p_email) end)
      and q->>'type'='mcq'
      and nullif(trim(q->>'prompt'),'') is not null
      and jsonb_typeof(q->'options')='array'
      and jsonb_array_length(q->'options')=4
      and (q->>'correct') ~ '^[0-3]$'
      and not (q->>'prompt' ~* '<(img|iframe|audio|video|svg)\b')
      and not (q->'options')::text ~* '<(img|iframe|audio|video|svg)\b'
      and coalesce(s.teacher_overrides->>((sec->>'id')||':'||(q->>'id')),'') not in ('excluded','force_correct')
      and (coalesce(s.teacher_overrides->>((sec->>'id')||':'||(q->>'id')),'')='force_wrong'
        or s.answers->>((sec->>'id')||':'||(q->>'id')) is distinct from q->>'correct')
  ), distinct_items as (
    select distinct on (fingerprint) q,fingerprint
    from eligible
    order by fingerprint
  ), picked as (
    select q from distinct_items order by random() limit p_count
  ), numbered as (
    select jsonb_build_object(
      'id', gen_random_uuid()::text,
      'prompt', regexp_replace(q->>'prompt','<[^>]+>','','g'),
      'options', q->'options',
      'skill', coalesce(q->'skill','{}'::jsonb),
      'correct', (q->>'correct')::integer
    ) as question
    from picked
  )
  select coalesce(jsonb_agg(question),'[]'::jsonb) into v_questions from numbered;
  if jsonb_array_length(v_questions)<>p_count then
    return null;
  end if;
  return v_questions;
end;
$$;

create or replace function public.ldd_reentry_status()
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt()->>'email',''));
  v_config public.ldd_reentry_settings%rowtype;
  v_state public.ldd_reentry_students%rowtype;
  v_questions jsonb;
  v_attempt uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select * into v_config from public.ldd_reentry_settings where singleton=true;
  if v_email='lddbaiu@gmail.com' then
    return jsonb_build_object('mode','teacher','enabled',v_config.enabled);
  end if;
  if not v_config.enabled then return jsonb_build_object('mode','disabled'); end if;

  insert into public.ldd_reentry_students(user_id,last_learning_at)
  values (v_user,coalesce((
    select max(updated_at) from public.study_time_log where user_id=v_user
  ),now()))
  on conflict (user_id) do nothing;

  select * into v_state from public.ldd_reentry_students where user_id=v_user for update;
  if v_state.gate_status='locked' then
    return jsonb_build_object('mode','locked');
  end if;
  if v_state.gate_status='quiz' and v_state.active_attempt_id is not null then
    select questions into v_questions from public.ldd_reentry_attempts
      where id=v_state.active_attempt_id and user_id=v_user and status='in_progress';
    if v_questions is not null then
      return jsonb_build_object('mode','quiz','questions',(
        select jsonb_agg(jsonb_build_object(
          'id',q->>'id','prompt',q->>'prompt','options',q->'options','skill',q->'skill'
        ) order by ord)
        from jsonb_array_elements(v_questions) with ordinality as x(q,ord)
      ));
    end if;
  end if;
  if v_state.last_learning_at >= now()-make_interval(hours=>v_config.inactivity_hours) then
    return jsonb_build_object('mode','clear');
  end if;

  v_questions:=ldd_reentry_private.make_quiz(v_user,v_email,v_config.question_count);
  if v_questions is null then
    -- Never lock a learner for a quiz that cannot be assembled fairly.
    return jsonb_build_object('mode','insufficient_questions');
  end if;
  insert into public.ldd_reentry_attempts(user_id,questions)
  values (v_user,v_questions) returning id into v_attempt;
  update public.ldd_reentry_students set gate_status='quiz',
    active_attempt_id=v_attempt,updated_at=now() where user_id=v_user;
  return jsonb_build_object('mode','quiz','questions',(
    select jsonb_agg(jsonb_build_object(
      'id',q->>'id','prompt',q->>'prompt','options',q->'options','skill',q->'skill'
    ) order by ord)
    from jsonb_array_elements(v_questions) with ordinality as x(q,ord)
  ));
end;
$$;

create or replace function public.ldd_reentry_submit(p_answers jsonb)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_state public.ldd_reentry_students%rowtype;
  v_questions jsonb;
  v_count integer;
  v_score integer;
  v_pass integer;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select * into v_state from public.ldd_reentry_students where user_id=v_user for update;
  if not found or v_state.gate_status<>'quiz' then raise exception 'No active quiz'; end if;
  select questions into v_questions from public.ldd_reentry_attempts
  where id=v_state.active_attempt_id and user_id=v_user and status='in_progress' for update;
  if v_questions is null then raise exception 'Quiz is no longer active'; end if;
  v_count:=jsonb_array_length(v_questions);
  if jsonb_typeof(p_answers) is distinct from 'array' or jsonb_array_length(p_answers)<>v_count
    or exists (select 1 from jsonb_array_elements(p_answers) as a(v)
               where jsonb_typeof(v)<>'number' or v::text !~ '^[0-3]$')
  then raise exception 'Please answer all questions with one option each'; end if;
  select count(*) filter(where (p_answers->>(i-1))::integer=(q->>'correct')::integer)
  into v_score from jsonb_array_elements(v_questions) with ordinality as x(q,i);
  select pass_count into v_pass from public.ldd_reentry_settings where singleton=true;
  update public.ldd_reentry_attempts set answers=p_answers,score=v_score,
    status=case when v_score>=v_pass then 'passed' else 'failed' end,
    submitted_at=now() where id=v_state.active_attempt_id;
  if v_score>=v_pass then
    update public.ldd_reentry_students set gate_status='clear',active_attempt_id=null,
      locked_at=null,last_learning_at=now(),updated_at=now() where user_id=v_user;
    return jsonb_build_object('mode','passed','correct',v_score,'total',v_count);
  else
    update public.ldd_reentry_students set gate_status='locked',
      locked_at=now(),updated_at=now() where user_id=v_user;
    return jsonb_build_object('mode','locked','correct',v_score,'total',v_count);
  end if;
end;
$$;

create or replace function public.ldd_reentry_admin_list()
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare v_data jsonb;
begin
  if auth.uid() is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com'
    then raise exception 'Teacher only'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
    'user_id',st.user_id,'email',u.email,'status',st.gate_status,
    'last_learning_at',st.last_learning_at,'locked_at',st.locked_at)
    order by st.locked_at desc nulls last),'[]'::jsonb)
    into v_data
    from public.ldd_reentry_students st join auth.users u on u.id=st.user_id;
  return v_data;
end;
$$;

create or replace function public.ldd_reentry_admin_unlock(p_user_id uuid)
returns boolean language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com'
    then raise exception 'Teacher only'; end if;
  if p_user_id=auth.uid() then raise exception 'Cannot unlock teacher account'; end if;
  update public.ldd_reentry_students
  set gate_status='clear',active_attempt_id=null,locked_at=null,
      last_learning_at=now(),updated_at=now()
  where user_id=p_user_id and gate_status='locked';
  return found;
end;
$$;

create or replace function public.ldd_reentry_admin_set_enabled(p_enabled boolean)
returns boolean language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null or lower(coalesce(auth.jwt()->>'email',''))<>'lddbaiu@gmail.com'
    then raise exception 'Teacher only'; end if;
  update public.ldd_reentry_settings set enabled=p_enabled,updated_at=now()
    where singleton=true;
  return p_enabled;
end;
$$;

revoke all on function public.ldd_reentry_status() from public,anon;
revoke all on function public.ldd_reentry_submit(jsonb) from public,anon;
revoke all on function public.ldd_reentry_admin_list() from public,anon;
revoke all on function public.ldd_reentry_admin_unlock(uuid) from public,anon;
revoke all on function public.ldd_reentry_admin_set_enabled(boolean) from public,anon;
grant execute on function public.ldd_reentry_status() to authenticated;
grant execute on function public.ldd_reentry_submit(jsonb) to authenticated;
grant execute on function public.ldd_reentry_admin_list() to authenticated;
grant execute on function public.ldd_reentry_admin_unlock(uuid) to authenticated;
grant execute on function public.ldd_reentry_admin_set_enabled(boolean) to authenticated;
