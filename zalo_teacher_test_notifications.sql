-- LDD English: Zalo OA notices for new teacher-assigned private tests.
-- The live migration is applied in Supabase project ywqbaksmmtvwbojcgsdd.

create table if not exists public.ldd_bot_test_notifications (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.custom_tests(id) on delete cascade,
  student_email text not null,
  state text not null default 'pending' check (state in ('pending','sent')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  constraint ldd_bot_test_notifications_unique_assignment unique (test_id, student_email),
  constraint ldd_bot_test_notifications_normalized_email check (student_email = lower(btrim(student_email)) and student_email <> '')
);

create index if not exists ldd_bot_test_notifications_pending_idx
  on public.ldd_bot_test_notifications(state, created_at);

create table if not exists public.ldd_bot_test_notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references public.ldd_bot_test_notifications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  chat_id text not null,
  state text not null default 'pending' check (state in ('pending','claimed','sent','failed')),
  attempts integer not null default 0 check (attempts >= 0),
  created_at timestamptz not null default now(),
  claimed_at timestamptz,
  reported_at timestamptz,
  sent_at timestamptz,
  constraint ldd_bot_test_notification_delivery_unique unique (notification_id, chat_id)
);

create index if not exists ldd_bot_test_notification_deliveries_pending_idx
  on public.ldd_bot_test_notification_deliveries(state, claimed_at, created_at);

alter table public.ldd_bot_test_notifications enable row level security;
alter table public.ldd_bot_test_notification_deliveries enable row level security;
revoke all on public.ldd_bot_test_notifications from public, anon, authenticated;
revoke all on public.ldd_bot_test_notification_deliveries from public, anon, authenticated;
grant all on public.ldd_bot_test_notifications to service_role;
grant all on public.ldd_bot_test_notification_deliveries to service_role;

create or replace function public.ldd_queue_custom_test_zalo_notifications()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $function$
declare v_email text;
begin
  if new.status is distinct from 'published' then return new; end if;
  for v_email in
    select distinct lower(btrim(item))
    from unnest(coalesce(new.student_emails, array[]::text[])) as item
    where nullif(btrim(item), '') is not null
  loop
    if tg_op = 'UPDATE' and old.status = 'published' and exists (
      select 1 from unnest(coalesce(old.student_emails, array[]::text[])) as old_item
      where lower(btrim(old_item)) = v_email
    ) then continue; end if;
    insert into public.ldd_bot_test_notifications(test_id, student_email)
    values (new.id, v_email)
    on conflict (test_id, student_email) do nothing;
  end loop;
  return new;
end;
$function$;

drop trigger if exists ldd_custom_test_zalo_notification_trigger on public.custom_tests;
create trigger ldd_custom_test_zalo_notification_trigger
after insert or update of status, student_emails on public.custom_tests
for each row execute function public.ldd_queue_custom_test_zalo_notifications();

revoke all on function public.ldd_queue_custom_test_zalo_notifications() from public, anon, authenticated;

create or replace function public.ldd_bot_claim_test_notifications(p_limit integer default 20)
returns table (delivery_id uuid, notification_id uuid, chat_id text, message_text text)
language plpgsql
security definer
set search_path = pg_catalog, public
as $function$
begin
  delete from public.ldd_bot_test_notification_deliveries d
  where d.state <> 'sent'
    and not exists (
      select 1 from public.ldd_bot_contacts c
      where c.user_id=d.user_id and c.chat_id=d.chat_id and c.enabled
    );

  insert into public.ldd_bot_test_notification_deliveries(notification_id,user_id,chat_id)
  select n.id,u.id,c.chat_id
  from public.ldd_bot_test_notifications n
  join auth.users u on lower(btrim(u.email))=n.student_email
  join public.ldd_bot_contacts c on c.user_id=u.id and c.enabled
  where n.state='pending'
  on conflict (notification_id,chat_id) do nothing;

  return query
  with candidates as (
    select d.id
    from public.ldd_bot_test_notification_deliveries d
    join public.ldd_bot_test_notifications n on n.id=d.notification_id
    join public.ldd_bot_contacts c on c.user_id=d.user_id and c.chat_id=d.chat_id and c.enabled
    where n.state='pending'
      and (d.state in ('pending','failed')
        or (d.state='claimed' and d.claimed_at < clock_timestamp()-interval '20 minutes'))
    order by n.created_at,d.created_at
    for update of d skip locked
    limit greatest(1,least(coalesce(p_limit,20),50))
  ),
  claimed as (
    update public.ldd_bot_test_notification_deliveries d
    set state='claimed',attempts=d.attempts+1,claimed_at=clock_timestamp(),reported_at=null
    from candidates x where d.id=x.id
    returning d.id,d.notification_id,d.chat_id
  )
  select x.id,x.notification_id,x.chat_id,
    '🔔 LDD English có bài kiểm tra mới dành cho bạn!' || E'\\n\\n📝 ' ||
    left(coalesce(nullif(btrim(t.title),''),'Bài kiểm tra mới'),240) ||
    E'\\n\\nGiảng viên đã giao bài này. Đăng nhập tại https://lddenglish.page/ rồi mở mục “Bài kiểm tra riêng” để xem đề và làm bài nhé.'
  from claimed x
  join public.ldd_bot_test_notifications n on n.id=x.notification_id
  join public.custom_tests t on t.id=n.test_id;
end;
$function$;

create or replace function public.ldd_bot_report_test_notification(p_delivery_id uuid,p_state text)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $function$
declare v_notification_id uuid;
begin
  if p_state not in ('sent','failed') then return false; end if;
  update public.ldd_bot_test_notification_deliveries
  set state=p_state,reported_at=clock_timestamp(),
      sent_at=case when p_state='sent' then clock_timestamp() else null end
  where id=p_delivery_id and state='claimed'
  returning notification_id into v_notification_id;
  if not found then return false; end if;
  if p_state='sent' and not exists (
    select 1 from public.ldd_bot_test_notification_deliveries
    where notification_id=v_notification_id and state <> 'sent'
  ) then
    update public.ldd_bot_test_notifications
    set state='sent',sent_at=clock_timestamp()
    where id=v_notification_id and state='pending';
  end if;
  return true;
end;
$function$;

revoke all on function public.ldd_bot_claim_test_notifications(integer) from public, anon, authenticated;
revoke all on function public.ldd_bot_report_test_notification(uuid,text) from public, anon, authenticated;
grant execute on function public.ldd_bot_claim_test_notifications(integer) to service_role;
grant execute on function public.ldd_bot_report_test_notification(uuid,text) to service_role;

-- Retain the existing half-hour cron and inactivity-reminder behavior.
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname='ldd-zalo-inactivity-reminder'),
  command := $job$
select net.http_post(
 url:='https://ywqbaksmmtvwbojcgsdd.supabase.co/functions/v1/ldd-zalo-official',
 headers:=jsonb_build_object('Content-Type','application/json','x-ldd-cron-token',(select decrypted_secret from vault.decrypted_secrets where name='ldd_zalo_cron_token')),
 body:='{"action":"dispatch"}'::jsonb,
 timeout_milliseconds:=120000
)
where extract(hour from clock_timestamp() at time zone 'Asia/Ho_Chi_Minh') between 8 and 19
and (
 exists(
   select 1 from public.ldd_bot_test_notifications n
   join auth.users u on lower(btrim(u.email))=n.student_email
   join public.ldd_bot_contacts c on c.user_id=u.id and c.enabled
   where n.state='pending'
 )
 or (
   (
    exists(
      select 1 from public.ldd_student_site_presence p
      join public.ldd_zalo_reminder_contacts c on c.user_id=p.user_id
      join auth.users u on u.id=p.user_id
      join public.student_grade_assignments g
        on (g.user_id=p.user_id or (g.user_id is null and lower(g.email)=lower(u.email)))
      where c.enabled and c.consent_at is not null
        and p.last_seen_at<=clock_timestamp()-interval '24 hours'
        and (p.last_reminded_for_seen_at is null or p.last_reminded_for_seen_at<p.last_seen_at)
    )
    or (
      public.ldd_second_zalo_due()
      and exists(select 1 from storage.objects where bucket_id='ldd-reminder-media' and name='ldd-reminder-2.jpg')
    )
   )
   and not exists(select 1 from public.ldd_zalo_reminder_attempts where claimed_at>clock_timestamp()-interval '30 minutes')
   and not exists(select 1 from public.ldd_zalo_second_reminder_attempts where claimed_at>clock_timestamp()-interval '30 minutes')
 )
);
$job$
);
