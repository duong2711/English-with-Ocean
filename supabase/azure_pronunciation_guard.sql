-- Applied to Supabase project ywqbaksmmtvwbojcgsdd on 2026-11-03.
-- Defensive counter: at most 4 hours of attempted short-audio assessments per UTC month.
-- Important: This does NOT confirm the Azure resource's billing tier.
create table if not exists public.azure_pronunciation_usage_monthly (
  usage_month text primary key,
  reserved_seconds integer not null default 0 check (reserved_seconds >= 0),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);
alter table public.azure_pronunciation_usage_monthly enable row level security;
revoke all on table public.azure_pronunciation_usage_monthly from public, anon, authenticated;
grant select, insert, update on table public.azure_pronunciation_usage_monthly to service_role;

create or replace function public.reserve_azure_pronunciation_seconds(p_seconds integer)
returns boolean language plpgsql security invoker set search_path = public as $$
declare
  v_month text := to_char(now() at time zone 'UTC', 'YYYY-MM');
  v_allocated integer;
begin
  if p_seconds is null or p_seconds < 1 or p_seconds > 30 then return false; end if;
  insert into public.azure_pronunciation_usage_monthly(usage_month, reserved_seconds, request_count, updated_at)
  values(v_month, p_seconds, 1, now())
  on conflict (usage_month) do update
  set reserved_seconds = public.azure_pronunciation_usage_monthly.reserved_seconds + excluded.reserved_seconds,
      request_count = public.azure_pronunciation_usage_monthly.request_count + 1,
      updated_at = now()
  where public.azure_pronunciation_usage_monthly.reserved_seconds + excluded.reserved_seconds <= 14400
  returning reserved_seconds into v_allocated;
  return v_allocated is not null;
end;
$$;
revoke all on function public.reserve_azure_pronunciation_seconds(integer) from public, anon, authenticated;
grant execute on function public.reserve_azure_pronunciation_seconds(integer) to service_role;
