-- LDD English: keep official Zalo notices inside 08:00–20:59 Vietnam time.
-- Supabase pg_cron runs in GMT for this project (Asia/Ho_Chi_Minh = GMT+7).
-- Run twice per hour from 01:00 through 13:30 GMT, i.e. 08:00 through 20:30 Vietnam.
-- The command-level guard below remains authoritative and blocks 21:00 onward.

do $migration$
declare
  v_job_id bigint;
  v_command text;
begin
  select jobid, command
    into v_job_id, v_command
  from cron.job
  where jobname = 'ldd-zalo-inactivity-reminder';

  if v_job_id is null then
    raise exception 'Cron job ldd-zalo-inactivity-reminder was not found';
  end if;

  if position('between 8 and 19' in v_command) > 0 then
    v_command := replace(v_command, 'between 8 and 19', 'between 8 and 20');
  elsif position('between 8 and 20' in v_command) = 0 then
    raise exception 'Expected Vietnam-time guard was not found; refusing to overwrite the cron command';
  end if;

  perform cron.alter_job(
    job_id := v_job_id,
    schedule := '0,30 1-13 * * *',
    command := v_command
  );
end;
$migration$;
