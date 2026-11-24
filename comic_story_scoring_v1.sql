-- LDD English — Comic Story Diligence Scoring
-- Applies to Truyện học đường (grades 6–12), per frame.
-- Bold English words not looked up: +2 each, one award per user/frame/word.
-- AI-approved Vietnamese translation: +5 per user/frame, one award per frame.
-- This file reflects the final deployed schema and RPC permissions.

create table if not exists public.comic_word_lookup_events (
  user_id uuid not null references auth.users(id) on delete cascade,
  grade integer not null check (grade between 6 and 12),
  unit_id text not null check (unit_id ~ '^u[0-9]{1,2}$'),
  frame_index integer not null check (frame_index between 1 and 4),
  word_norm text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, grade, unit_id, frame_index, word_norm)
);

create table if not exists public.comic_frame_word_rewards (
  user_id uuid not null references auth.users(id) on delete cascade,
  grade integer not null check (grade between 6 and 12),
  unit_id text not null check (unit_id ~ '^u[0-9]{1,2}$'),
  frame_index integer not null check (frame_index between 1 and 4),
  word_norm text not null,
  points integer not null default 2 check (points = 2),
  created_at timestamptz not null default now(),
  primary key (user_id, grade, unit_id, frame_index, word_norm)
);

create table if not exists public.comic_translation_awards (
  user_id uuid not null references auth.users(id) on delete cascade,
  grade integer not null check (grade between 6 and 12),
  unit_id text not null check (unit_id ~ '^u[0-9]{1,2}$'),
  frame_index integer not null check (frame_index between 1 and 4),
  ai_provider text not null,
  points integer not null default 5 check (points = 5),
  created_at timestamptz not null default now(),
  primary key (user_id, grade, unit_id, frame_index)
);

alter table public.comic_word_lookup_events enable row level security;
alter table public.comic_frame_word_rewards enable row level security;
alter table public.comic_translation_awards enable row level security;

revoke all on public.comic_word_lookup_events from anon, authenticated;
revoke all on public.comic_frame_word_rewards from anon, authenticated;
revoke all on public.comic_translation_awards from anon, authenticated;

create or replace function public.ldd_comic_bold_words(p_html text)
returns text[]
language plpgsql
immutable
set search_path = public
as $$
declare
  v_html text := coalesce(p_html, '');
  v_lower text;
  v_b_start integer;
  v_s_start integer;
  v_start integer;
  v_open_end integer;
  v_content_start integer;
  v_close_rel integer;
  v_close_tag text;
  v_is_strong boolean;
  v_block text;
  v_token text;
  v_norm text;
  v_words text[] := array[]::text[];
begin
  loop
    v_lower := lower(v_html);
    v_b_start := regexp_instr(v_lower, '<b([[:space:]>])');
    v_s_start := regexp_instr(v_lower, '<strong([[:space:]>])');

    if v_b_start = 0 and v_s_start = 0 then
      exit;
    elsif v_b_start > 0 and (v_s_start = 0 or v_b_start < v_s_start) then
      v_start := v_b_start;
      v_is_strong := false;
      v_close_tag := '</b>';
    else
      v_start := v_s_start;
      v_is_strong := true;
      v_close_tag := '</strong>';
    end if;

    v_open_end := strpos(substring(v_html from v_start), '>');
    if v_open_end = 0 then exit; end if;
    v_content_start := v_start + v_open_end;
    v_close_rel := strpos(substring(v_lower from v_content_start), v_close_tag);
    if v_close_rel = 0 then exit; end if;

    v_block := substring(v_html from v_content_start for v_close_rel - 1);
    v_block := regexp_replace(v_block, '<[^>]*>', ' ', 'g');
    v_block := replace(v_block, '&nbsp;', ' ');
    v_block := replace(v_block, '&#39;', '''');
    v_block := replace(v_block, '&apos;', '''');
    v_block := replace(v_block, '&amp;', '&');
    v_block := replace(v_block, '&quot;', '"');
    v_block := replace(v_block, '&lt;', '<');
    v_block := replace(v_block, '&gt;', '>');

    for v_token in select regexp_split_to_table(v_block, '[[:space:]]+')
    loop
      v_norm := lower(regexp_replace(
        btrim(v_token),
        '^[^[:alnum:]]+|[^[:alnum:]]+$',
        '',
        'g'
      ));
      if v_norm <> '' and not (v_norm = any(v_words)) then
        v_words := array_append(v_words, v_norm);
      end if;
    end loop;

    v_html := substring(
      v_html from v_content_start + v_close_rel - 1 + length(v_close_tag)
    );
  end loop;

  return v_words;
end;
$$;

create or replace function public.record_comic_bold_word_lookup(
  p_grade integer,
  p_unit_id text,
  p_frame_index integer,
  p_word text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_html text;
  v_word text;
  v_words text[];
begin
  if v_uid is null then raise exception 'not_authenticated'; end if;
  if p_grade not between 6 and 12
     or p_unit_id !~ '^u[0-9]{1,2}$'
     or p_frame_index not between 1 and 4 then
    raise exception 'invalid_comic_frame';
  end if;

  v_word := lower(regexp_replace(
    btrim(coalesce(p_word, '')),
    '^[^[:alnum:]]+|[^[:alnum:]]+$',
    '',
    'g'
  ));
  if v_word = '' or length(v_word) > 80 then raise exception 'invalid_word'; end if;

  select content_html into v_html
  from public.thcs_story_frames
  where grade = p_grade and unit_id = p_unit_id and frame_index = p_frame_index
  limit 1;
  if not found then raise exception 'comic_frame_not_found'; end if;

  v_words := public.ldd_comic_bold_words(v_html);
  if not (v_word = any(v_words)) then raise exception 'word_is_not_bold_in_frame'; end if;

  insert into public.comic_word_lookup_events(user_id, grade, unit_id, frame_index, word_norm)
  values (v_uid, p_grade, p_unit_id, p_frame_index, v_word)
  on conflict do nothing;

  return true;
end;
$$;

create or replace function public.record_comic_frame_word_rewards(
  p_grade integer,
  p_unit_id text,
  p_frame_index integer,
  p_looked_up_words text[] default array[]::text[]
)
returns table(words_rewarded integer, points_awarded integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_html text;
  v_words text[];
  v_word text;
  v_looked text;
  v_inserted boolean;
  v_count integer := 0;
begin
  if v_uid is null then raise exception 'not_authenticated'; end if;
  if p_grade not between 6 and 12
     or p_unit_id !~ '^u[0-9]{1,2}$'
     or p_frame_index not between 1 and 4 then
    raise exception 'invalid_comic_frame';
  end if;

  select content_html into v_html
  from public.thcs_story_frames
  where grade = p_grade and unit_id = p_unit_id and frame_index = p_frame_index
  limit 1;
  if not found then raise exception 'comic_frame_not_found'; end if;

  v_words := public.ldd_comic_bold_words(v_html);

  for v_looked in
    select distinct lower(regexp_replace(
      btrim(coalesce(x, '')),
      '^[^[:alnum:]]+|[^[:alnum:]]+$',
      '',
      'g'
    ))
    from unnest(coalesce(p_looked_up_words, array[]::text[])) as x
  loop
    if v_looked <> '' and v_looked = any(v_words) then
      insert into public.comic_word_lookup_events(user_id, grade, unit_id, frame_index, word_norm)
      values (v_uid, p_grade, p_unit_id, p_frame_index, v_looked)
      on conflict do nothing;
    end if;
  end loop;

  foreach v_word in array v_words loop
    if not exists (
      select 1 from public.comic_word_lookup_events l
      where l.user_id = v_uid and l.grade = p_grade
        and l.unit_id = p_unit_id and l.frame_index = p_frame_index
        and l.word_norm = v_word
    ) then
      v_inserted := false;
      insert into public.comic_frame_word_rewards(user_id, grade, unit_id, frame_index, word_norm, points)
      values (v_uid, p_grade, p_unit_id, p_frame_index, v_word, 2)
      on conflict do nothing
      returning true into v_inserted;
      if coalesce(v_inserted, false) then v_count := v_count + 1; end if;
    end if;
  end loop;

  if v_count > 0 then
    perform public.vocab_race_add_points(v_uid, v_count * 2);
    update public.diligence_scores set updated_at = now() where user_id = v_uid;
    if not found then
      insert into public.diligence_scores(user_id, base_diligence_score, diligence_score, updated_at)
      values (v_uid, 0, 0, now())
      on conflict (user_id) do update set updated_at = now();
    end if;
  end if;

  return query select v_count, v_count * 2;
end;
$$;

create or replace function public.record_comic_translation_award(
  p_user_id uuid,
  p_grade integer,
  p_unit_id text,
  p_frame_index integer,
  p_ai_provider text
)
returns table(awarded_now boolean, points_awarded integer, diligence_score numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inserted boolean := false;
  v_diligence numeric := 0;
begin
  if p_user_id is null then raise exception 'user_required'; end if;
  if p_grade not between 6 and 12
     or p_unit_id !~ '^u[0-9]{1,2}$'
     or p_frame_index not between 1 and 4 then
    raise exception 'invalid_comic_frame';
  end if;
  if p_ai_provider not in ('Gemini','Mistral') then raise exception 'invalid_ai_provider'; end if;

  insert into public.comic_translation_awards(user_id, grade, unit_id, frame_index, ai_provider, points)
  values (p_user_id, p_grade, p_unit_id, p_frame_index, p_ai_provider, 5)
  on conflict do nothing
  returning true into v_inserted;

  v_inserted := coalesce(v_inserted, false);
  if v_inserted then
    perform public.vocab_race_add_points(p_user_id, 5);
    update public.diligence_scores set updated_at = now() where user_id = p_user_id;
    if not found then
      insert into public.diligence_scores(user_id, base_diligence_score, diligence_score, updated_at)
      values (p_user_id, 0, 0, now())
      on conflict (user_id) do update set updated_at = now();
    end if;
  end if;

  select ds.diligence_score into v_diligence
  from public.diligence_scores ds where ds.user_id = p_user_id;

  return query select v_inserted, case when v_inserted then 5 else 0 end, coalesce(v_diligence, 0);
end;
$$;

revoke all on function public.ldd_comic_bold_words(text) from public, anon, authenticated;
revoke all on function public.record_comic_bold_word_lookup(integer,text,integer,text) from public, anon, authenticated;
revoke all on function public.record_comic_frame_word_rewards(integer,text,integer,text[]) from public, anon, authenticated;
revoke all on function public.record_comic_translation_award(uuid,integer,text,integer,text) from public, anon, authenticated;

grant execute on function public.record_comic_bold_word_lookup(integer,text,integer,text) to authenticated, service_role;
grant execute on function public.record_comic_frame_word_rewards(integer,text,integer,text[]) to authenticated, service_role;
grant execute on function public.record_comic_translation_award(uuid,integer,text,integer,text) to service_role;
