-- LDD English — Vocab Race collision restore + scoring guard
-- Applied to Supabase as migration: vocab_race_collision_notice_scoring_guard_v1
-- Car-to-car collision is distinct from obstacle elimination.
-- Collision victim loses exactly 1 diligence point and is excluded from the
-- generic round-loser deduction in the same correct-answer event.

create or replace function public.vocab_race_claim_lane(p_room uuid, p_lane integer, p_round integer)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_uid uuid:=auth.uid();
  v_room public.vocab_race_rooms;
  v_player public.vocab_race_players;
  v_question jsonb;
  v_correct_lane int;
  v_correct boolean;
  v_ms int;
  v_elapsed_ms bigint;
  v_wave int;
  v_phase_ms bigint;
  v_seed bigint;
  v_lane_a int;
  v_lane_b int;
  v_offset int;
  v_active int;
  v_victim uuid;
  v_collision_victim uuid;
  v_result jsonb;
  v_hide_user text;
  v_hide_round int;
  v_pause_until timestamptz;
begin
  if p_lane<0 or p_lane>4 then raise exception 'invalid_lane'; end if;
  select * into v_room from public.vocab_race_rooms where id=p_room for update;
  if not found or v_room.status<>'playing' then raise exception 'game_not_playing'; end if;
  if v_room.round_index<>p_round then raise exception 'stale_round'; end if;
  if coalesce(v_room.last_result->>'type','') in ('round_pause','timeout_pause')
     and coalesce((v_room.last_result->>'round')::int,-1)=v_room.round_index then raise exception 'round_paused'; end if;
  if clock_timestamp()>=v_room.round_started_at+interval '30 seconds' then raise exception 'round_timeout'; end if;

  select * into v_player from public.vocab_race_players where room_id=p_room and user_id=v_uid for update;
  if not found then raise exception 'not_in_room'; end if;
  if v_player.answered_round=v_room.round_index then raise exception 'already_answered'; end if;
  if v_player.lane is distinct from p_lane then raise exception 'lane_changed'; end if;

  v_ms:=greatest(0,floor(extract(epoch from(clock_timestamp()-v_room.round_started_at))*1000)::int);
  v_elapsed_ms:=v_ms;
  v_hide_user:=nullif(v_room.last_result->>'hide_user_id','');
  v_hide_round:=coalesce((v_room.last_result->>'hide_round')::int,-1);
  if v_hide_round<>v_room.round_index then v_hide_user:=null; v_hide_round:=-1; end if;

  if v_elapsed_ms>=5000 then
    v_wave:=floor(v_elapsed_ms/5000.0)::int;
    if v_wave between 1 and 5 then
      v_phase_ms:=v_elapsed_ms-(v_wave*5000);
      if v_phase_ms>=0 and v_phase_ms<4000 then
        v_seed:=('x'||substr(replace(p_room::text,'-',''),1,8))::bit(32)::bigint;
        v_lane_a:=mod(v_seed+v_room.round_index*7+v_wave*3,5)::int;
        v_offset:=1+mod((v_seed/5)+v_room.round_index+v_wave,4)::int;
        v_lane_b:=mod(v_lane_a+v_offset,5);
        if p_lane=v_lane_a or p_lane=v_lane_b then
          update public.vocab_race_players
             set answered_round=v_room.round_index,total_activation_ms=total_activation_ms+v_ms,
                 round_outcome='obstacle'
           where room_id=p_room and user_id=v_uid;
          select count(*) into v_active from public.vocab_race_players where room_id=p_room and answered_round<>v_room.round_index;
          v_result:=jsonb_build_object('type','obstacle_hit','at',clock_timestamp(),'round',v_room.round_index,'user_id',v_uid,'wave',v_wave,'lane',p_lane,'hide_user_id',v_hide_user,'hide_round',v_hide_round);
          if v_active=0 then
            if v_room.round_index>=19 then
              perform public.vocab_race_finish_locked(p_room,v_result);
            else
              v_pause_until:=clock_timestamp()+interval '6 seconds';
              update public.vocab_race_players set lane=2,lane_entered_at=clock_timestamp() where room_id=p_room;
              v_result:=jsonb_build_object('type','round_pause','reason','obstacle','round',v_room.round_index,'at',clock_timestamp(),'pause_until',v_pause_until,'round_result',v_result);
              update public.vocab_race_rooms set collision_enabled=false,last_result=v_result where id=p_room;
            end if;
          else
            update public.vocab_race_rooms set last_result=v_result where id=p_room;
          end if;
          return v_result;
        end if;
      end if;
    end if;
  end if;

  if v_room.collision_enabled then
    select p.user_id
      into v_collision_victim
      from public.vocab_race_players p
     where p.room_id=p_room
       and p.user_id<>v_uid
       and p.answered_round<>v_room.round_index
       and p.lane=p_lane
       and p.track_pos>v_player.track_pos
     order by p.track_pos asc, p.slot asc
     limit 1
     for update;

    if v_collision_victim is not null then
      perform public.vocab_race_add_points(v_collision_victim,-1);
    end if;
  end if;

  v_question:=v_room.questions->v_room.round_index;
  v_correct_lane:=coalesce((v_question->>'correct_index')::int,-1);
  v_correct:=(p_lane=v_correct_lane);

  if not v_correct then
    update public.vocab_race_players
       set answered_round=v_room.round_index,total_activation_ms=total_activation_ms+v_ms,
           wrong_count=wrong_count+1,round_outcome='wrong'
     where room_id=p_room and user_id=v_uid;
    perform public.vocab_race_add_points(v_uid,-1);
    select count(*) into v_active from public.vocab_race_players where room_id=p_room and answered_round<>v_room.round_index;
    v_result:=jsonb_build_object(
      'type','wrong','at',clock_timestamp(),'round',v_room.round_index,
      'user_id',v_uid,'lane',p_lane,
      'collision_victim',v_collision_victim,'collider_user_id',v_uid,
      'collision_points_delta',case when v_collision_victim is null then 0 else -1 end,
      'hide_user_id',v_hide_user,'hide_round',v_hide_round
    );
    if v_active=0 then
      if v_room.round_index>=19 then
        perform public.vocab_race_finish_locked(p_room,v_result);
      else
        v_pause_until:=clock_timestamp()+interval '6 seconds';
        update public.vocab_race_players set lane=2,lane_entered_at=clock_timestamp() where room_id=p_room;
        v_result:=jsonb_build_object('type','round_pause','reason','wrong','round',v_room.round_index,'at',clock_timestamp(),'pause_until',v_pause_until,'round_result',v_result);
        update public.vocab_race_rooms set collision_enabled=false,last_result=v_result where id=p_room;
      end if;
    else
      update public.vocab_race_rooms set last_result=v_result where id=p_room;
    end if;
    return v_result;
  end if;

  update public.vocab_race_players
     set answered_round=v_room.round_index,total_activation_ms=total_activation_ms+v_ms,
         score=score+1,track_pos=track_pos+1,round_outcome='correct'
   where room_id=p_room and user_id=v_uid;

  for v_victim in
    select user_id from public.vocab_race_players
    where room_id=p_room
      and user_id<>v_uid
      and answered_round<>v_room.round_index
      and (v_collision_victim is null or user_id<>v_collision_victim)
  loop
    perform public.vocab_race_add_points(v_victim,-1);
  end loop;

  update public.vocab_race_players
     set wrong_count=wrong_count+case when user_id<>v_uid and answered_round<>v_room.round_index then 1 else 0 end,
         lane=2,lane_entered_at=clock_timestamp()
   where room_id=p_room;

  v_result:=jsonb_build_object(
    'type','correct','at',clock_timestamp(),'round',v_room.round_index,
    'winner_user_id',v_uid,'correct_lane',v_correct_lane,
    'collision_victim',v_collision_victim,'collider_user_id',v_uid,
    'collision_points_delta',case when v_collision_victim is null then 0 else -1 end
  );
  if v_room.round_index>=19 then
    perform public.vocab_race_finish_locked(p_room,v_result);
  else
    v_pause_until:=clock_timestamp()+interval '6 seconds';
    v_result:=jsonb_build_object(
      'type','round_pause','reason','correct','round',v_room.round_index,'at',clock_timestamp(),
      'pause_until',v_pause_until,'winner_user_id',v_uid,'hide_user_id',v_uid,'hide_round',v_room.round_index+1,
      'round_result',v_result
    );
    update public.vocab_race_rooms set collision_enabled=true,last_result=v_result where id=p_room;
  end if;
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
  v_next_round int;
  v_hide_user text;
  v_next_collision boolean;
begin
  if v_uid is null then raise exception 'not_authenticated'; end if;
  if not exists(select 1 from public.vocab_race_players where room_id=p_room and user_id=v_uid) then raise exception 'not_in_room'; end if;

  select * into v_room from public.vocab_race_rooms where id=p_room for update;
  if not found or v_room.status<>'playing' then raise exception 'game_not_playing'; end if;
  if v_room.round_index<>p_round then return jsonb_build_object('type','stale_round'); end if;
  if coalesce(v_room.last_result->>'type','') not in ('round_pause','timeout_pause')
     or coalesce((v_room.last_result->>'round')::int,-1)<>v_room.round_index then return jsonb_build_object('type','not_paused'); end if;

  v_pause_until:=(v_room.last_result->>'pause_until')::timestamptz;
  if clock_timestamp()<v_pause_until then return jsonb_build_object('type','too_early','pause_until',v_pause_until); end if;

  if v_room.round_index>=19 then
    v_result:=coalesce(v_room.last_result->'round_result',jsonb_build_object('type','round_complete','round',v_room.round_index));
    perform public.vocab_race_finish_locked(p_room,v_result);
    return v_result;
  end if;

  v_next_round:=v_room.round_index+1;
  v_hide_user:=nullif(v_room.last_result->>'hide_user_id','');
  v_next_collision:=coalesce(v_room.last_result->>'reason','')='correct';
  v_result:=jsonb_build_object('type','round_start','round',v_next_round,'at',clock_timestamp());
  if v_hide_user is not null then
    v_result:=v_result||jsonb_build_object('hide_user_id',v_hide_user,'hide_round',v_next_round);
  end if;

  update public.vocab_race_players
     set lane=2,lane_entered_at=clock_timestamp(),round_outcome=null
   where room_id=p_room;
  update public.vocab_race_rooms
     set round_index=v_next_round,round_started_at=clock_timestamp(),
         collision_enabled=v_next_collision,last_result=v_result
   where id=p_room;
  return v_result;
end;
$$;

revoke all on function public.vocab_race_claim_lane(uuid,integer,integer) from public, anon;
revoke all on function public.vocab_race_advance_after_pause(uuid,integer) from public, anon;
grant execute on function public.vocab_race_claim_lane(uuid,integer,integer) to authenticated;
grant execute on function public.vocab_race_advance_after_pause(uuid,integer) to authenticated;

notify pgrst, 'reload schema';
