
-- LDD English — one voluntary Zalo reminder after 24h without opening the website.
-- All sending remains OFF until a separately confirmed Zalo UID is enabled and n8n is configured.
-- Server time (Postgres) is authoritative. No scheduled job or external message is created by this migration.
create table if not exists public.ldd_student_site_presence (
  user_id uuid primary key references auth.users(id) on delete cascade,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  last_reminded_for_seen_at timestamptz,
  last_reminder_claimed_at timestamptz
);
create index if not exists ldd_student_site_presence_last_seen_idx
  on public.ldd_student_site_presence(last_seen_at);
alter table public.ldd_student_site_presence enable row level security;
revoke all on table public.ldd_student_site_presence from public, anon, authenticated;

-- A teacher must enter a verified Zalo recipient UID (not a phone number).
-- No learner can read or change contacts, and no contact is enabled by default.
create table if not exists public.ldd_zalo_reminder_contacts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  recipient_uid text not null check (recipient_uid ~ '^[0-9]{6,32}$'),
  recipient_kind text not null default 'student'
    check (recipient_kind in ('student','guardian')),
  consent_at timestamptz,
  enabled boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint ldd_zalo_reminder_requires_consent check (not enabled or consent_at is not null)
);
alter table public.ldd_zalo_reminder_contacts enable row level security;
revoke all on table public.ldd_zalo_reminder_contacts from public, anon, authenticated;

-- An immutable claim for each *last visit timestamp* ensures at most one send
-- attempt in a continuous absence, even when scheduler runs concurrently.
create table if not exists public.ldd_zalo_reminder_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  last_seen_at timestamptz not null,
  state text not null default 'claimed' check (state in ('claimed','sent','failed')),
  claimed_at timestamptz not null default now(),
  reported_at timestamptz,
  unique (user_id, last_seen_at)
);
create index if not exists ldd_zalo_reminder_attempts_student_idx
  on public.ldd_zalo_reminder_attempts(user_id,claimed_at desc);
alter table public.ldd_zalo_reminder_attempts enable row level security;
revoke all on table public.ldd_zalo_reminder_attempts from public, anon, authenticated;

-- Only authenticated users can mark *their own* visit.
-- No client-controlled timestamp/user_id; an optional once-per-10-min write throttle.
create or replace function public.ldd_touch_student_site_presence()
returns void
language plpgsql security definer set search_path = pg_catalog, public
as $function$
declare
  v_uid uuid := auth.uid();
  v_now timestamptz := clock_timestamp();
begin
  if v_uid is null then raise exception 'Authentication required' using errcode='28000'; end if;
  -- Only assigned learners count, not teachers/strangers.
  if not exists (
    select 1 from public.student_grade_assignments as g where g.user_id = v_uid
  ) then return; end if;
  insert into public.ldd_student_site_presence(user_id,first_seen_at,last_seen_at)
  values(v_uid,v_now,v_now)
  on conflict (user_id) do update
    set last_seen_at = excluded.last_seen_at
    where public.ldd_student_site_presence.last_seen_at <= v_now - interval '10 minutes';
end;
$function$;
revoke all on function public.ldd_touch_student_site_presence() from public, anon;
grant execute on function public.ldd_touch_student_site_presence() to authenticated;

-- Service-only claim. "Claim" is definitive and cannot be retried for the same
-- inactivity episode even if an external Zalo message fails (at-most-once delivery).
create or replace function public.ldd_claim_single_zalo_inactivity_reminder()
returns table(reminder_id uuid, recipient_uid text, message_text text)
language plpgsql security definer set search_path = pg_catalog, public
as $function$
declare
  v_candidate record;
  v_id uuid;
  v_local_hour int := extract(hour from clock_timestamp() at time zone 'Asia/Ho_Chi_Minh');
begin
  -- Avoid messaging children and guardians late at night.
  if v_local_hour < 8 or v_local_hour >= 20 then return; end if;

  select p.user_id, p.last_seen_at, c.recipient_uid,
         coalesce(nullif(trim(g.display_name),''), 'bạn') as student_name,
         c.recipient_kind
    into v_candidate
  from public.ldd_student_site_presence as p
  join public.ldd_zalo_reminder_contacts as c on c.user_id=p.user_id
  join public.student_grade_assignments as g on g.user_id=p.user_id
  where p.last_seen_at <= clock_timestamp() - interval '24 hours'
    and (p.last_reminded_for_seen_at is null
         or p.last_reminded_for_seen_at < p.last_seen_at)
    and c.enabled and c.consent_at is not null
  order by p.last_seen_at asc
  limit 1
  for update of p skip locked;

  if not found then return; end if;

  insert into public.ldd_zalo_reminder_attempts(user_id,last_seen_at)
  values(v_candidate.user_id,v_candidate.last_seen_at)
  on conflict (user_id,last_seen_at) do nothing
  returning id into v_id;

  -- If a previous execution already claimed it, never attempt again.
  update public.ldd_student_site_presence
    set last_reminded_for_seen_at = v_candidate.last_seen_at,
        last_reminder_claimed_at = clock_timestamp()
  where user_id=v_candidate.user_id;

  if v_id is null then return; end if;

  reminder_id := v_id;
  recipient_uid := v_candidate.recipient_uid;
  if v_candidate.recipient_kind = 'guardian' then
    message_text := format(
      'LDD English xin chào! Học viên %s chưa vào trang học trong 24 giờ vừa qua. Gia đình có thể nhắc em ghé https://lddenglish.page/ để tiếp tục học khi thuận tiện. Đây là lời nhắc duy nhất trong đợt vắng học này.',
      v_candidate.student_name);
  else
    message_text := format(
      'LDD English nhắc bạn %s: Bạn đã 24 giờ chưa truy cập trang học. Khi thuận tiện, hãy ghé https://lddenglish.page/ để tiếp tục học nhé! Đây là lời nhắc duy nhất trong đợt vắng học này.',
      v_candidate.student_name);
  end if;
  return next;
end;
$function$;
revoke all on function public.ldd_claim_single_zalo_inactivity_reminder() from public, anon, authenticated;
grant execute on function public.ldd_claim_single_zalo_inactivity_reminder() to service_role;

-- The sending workflow can record success/failure, but reporting never
-- releases a claim. A retry cannot create a second message for the same absence.
create or replace function public.ldd_report_single_zalo_reminder(
  p_reminder_id uuid, p_state text
) returns boolean
language plpgsql security definer set search_path = pg_catalog, public
as $function$
begin
  if p_state not in ('sent','failed') then return false; end if;
  update public.ldd_zalo_reminder_attempts
    set state=p_state, reported_at=clock_timestamp()
  where id=p_reminder_id and state='claimed';
  return found;
end;
$function$;
revoke all on function public.ldd_report_single_zalo_reminder(uuid,text) from public, anon, authenticated;
grant execute on function public.ldd_report_single_zalo_reminder(uuid,text) to service_role;
