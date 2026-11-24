-- Stronger safeguard: serialize claims globally and prevent message bursts.\ncreate or replace function public.ldd_claim_single_zalo_inactivity_reminder()
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
  -- Atomic global throttling: at most one attempt in a 30-minute interval.
  if not pg_try_advisory_xact_lock(7184, 2401) then return; end if;
  if exists (
    select 1 from public.ldd_zalo_reminder_attempts
    where claimed_at > clock_timestamp() - interval '30 minutes'
  ) then return; end if;

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
