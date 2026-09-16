-- LDD English — Vocab Race v5
-- 30s/vòng, hết giờ pause 6s rồi mới sang vòng tiếp theo.

create or replace function public.vocab_race_resolve_timeout(p_room uuid)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
    v_room public.vocab_race_rooms;
    v_uid uuid;
    v_pause_until timestamptz;
    v_result jsonb;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status<>'playing' then return '{}'::jsonb; end if;

    if coalesce(v_room.last_result->>'type','')='timeout_pause'
       and coalesce((v_room.last_result->>'round')::int,-1)=v_room.round_index then
        return v_room.last_result;
    end if;

    if clock_timestamp()<v_room.round_started_at+interval '30 seconds' then return '{}'::jsonb; end if;

    for v_uid in
        select user_id from public.vocab_race_players
         where room_id=p_room and answered_round<>v_room.round_index
    loop
        perform public.vocab_race_add_points(v_uid,-1);
    end loop;

    update public.vocab_race_players
       set wrong_count=wrong_count + case when answered_round<>v_room.round_index then 1 else 0 end,
           answered_round=v_room.round_index
     where room_id=p_room;

    v_pause_until:=clock_timestamp()+interval '6 seconds';
    v_result:=jsonb_build_object(
        'type','timeout_pause',
        'reason','timeout',
        'round',v_room.round_index,
        'at',clock_timestamp(),
        'pause_until',v_pause_until
    );

    update public.vocab_race_rooms set last_result=v_result where id=p_room;
    return v_result;
end;
$$;

create or replace function public.vocab_race_advance_after_pause(p_room uuid,p_round integer)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
    v_uid uuid:=auth.uid();
    v_room public.vocab_race_rooms;
    v_pause_until timestamptz;
    v_result jsonb;
begin
    if v_uid is null then raise exception 'not_authenticated'; end if;
    if not exists(select 1 from public.vocab_race_players where room_id=p_room and user_id=v_uid) then raise exception 'not_in_room'; end if;

    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status<>'playing' then raise exception 'game_not_playing'; end if;
    if v_room.round_index<>p_round then return jsonb_build_object('type','stale_round'); end if;
    if coalesce(v_room.last_result->>'type','')<>'timeout_pause'
       or coalesce((v_room.last_result->>'round')::int,-1)<>v_room.round_index then
        return jsonb_build_object('type','not_paused');
    end if;

    v_pause_until:=(v_room.last_result->>'pause_until')::timestamptz;
    if clock_timestamp()<v_pause_until then
        return jsonb_build_object('type','too_early','pause_until',v_pause_until);
    end if;

    v_result:=jsonb_build_object('type','timeout_complete','round',v_room.round_index,'at',clock_timestamp());

    if v_room.round_index>=19 then
        perform public.vocab_race_finish_locked(p_room,v_result);
        return v_result;
    end if;

    update public.vocab_race_players
       set lane=2,lane_entered_at=clock_timestamp()
     where room_id=p_room;

    update public.vocab_race_rooms
       set round_index=round_index+1,
           round_started_at=clock_timestamp(),
           collision_enabled=false,
           last_result=v_result
     where id=p_room;

    return v_result;
end;
$$;

create or replace function public.vocab_race_server_time()
returns timestamptz
language sql
stable
security invoker
set search_path=public
as $$
  select clock_timestamp();
$$;

revoke all on function public.vocab_race_resolve_timeout(uuid) from public, anon;
revoke all on function public.vocab_race_advance_after_pause(uuid,integer) from public, anon;
revoke all on function public.vocab_race_server_time() from public, anon;
grant execute on function public.vocab_race_resolve_timeout(uuid) to authenticated;
grant execute on function public.vocab_race_advance_after_pause(uuid,integer) to authenticated;
grant execute on function public.vocab_race_server_time() to authenticated;

notify pgrst, 'reload schema';
