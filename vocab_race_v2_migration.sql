-- ============================================================================
-- LDD English — ĐUA XE TỪ VỰNG v2 MIGRATION
-- Chạy SAU vocab_race_setup.sql trong Supabase SQL Editor.
-- Cơ chế mới: bấm ĂN TỪ, loại theo vòng, chướng ngại vật đồng bộ.
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.vocab_race_obstacle_waves (
    room_id uuid not null references public.vocab_race_rooms(id) on delete cascade,
    round_index integer not null,
    wave smallint not null check (wave between 1 and 3),
    lane_a smallint not null check (lane_a between 0 and 4),
    lane_b smallint not null check (lane_b between 0 and 4),
    resolved_at timestamptz not null default clock_timestamp(),
    primary key (room_id, round_index, wave)
);

alter table public.vocab_race_obstacle_waves enable row level security;
drop policy if exists "race obstacle waves readable" on public.vocab_race_obstacle_waves;
create policy "race obstacle waves readable" on public.vocab_race_obstacle_waves
for select to authenticated using (true);

-- Sửa lỗi pgcrypto/search_path và giữ nguyên API tạo phòng.
create or replace function public.vocab_race_create_room(p_questions jsonb, p_display_name text default null)
returns public.vocab_race_rooms
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_uid uuid := auth.uid();
    v_email text := lower(coalesce(auth.jwt() ->> 'email',''));
    v_code text;
    v_room public.vocab_race_rooms;
    i int := 0;
begin
    if v_uid is null then raise exception 'not_authenticated'; end if;
    if v_email = 'lddbaiu@gmail.com' then raise exception 'teacher_cannot_play'; end if;
    if p_questions is null or jsonb_typeof(p_questions) <> 'array' or jsonb_array_length(p_questions) <> 20 then
        raise exception 'need_exactly_20_questions';
    end if;

    loop
        i := i + 1;
        v_code := upper(substr(encode(gen_random_bytes(5),'hex'),1,6));
        exit when not exists (
            select 1 from public.vocab_race_rooms
            where code = v_code and created_at > now() - interval '1 day'
        );
        if i > 20 then raise exception 'cannot_create_code'; end if;
    end loop;

    insert into public.vocab_race_rooms(code, host_user_id, questions)
    values (v_code, v_uid, p_questions)
    returning * into v_room;

    insert into public.vocab_race_players(room_id,user_id,email,display_name,slot)
    values (v_room.id,v_uid,v_email,nullif(trim(coalesce(p_display_name,'')),''),1);

    return v_room;
end;
$$;
grant execute on function public.vocab_race_create_room(jsonb,text) to authenticated;

-- Bắt đầu trận: tất cả xe về làn giữa, xóa trạng thái chướng ngại vật cũ.
create or replace function public.vocab_race_start_room(p_room uuid)
returns public.vocab_race_rooms
language plpgsql
security definer
set search_path = public
as $$
declare
    v_uid uuid := auth.uid();
    v_room public.vocab_race_rooms;
    v_count int;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found then raise exception 'room_not_found'; end if;
    if v_room.host_user_id <> v_uid then raise exception 'host_only'; end if;
    if v_room.status <> 'lobby' then raise exception 'room_already_started'; end if;
    select count(*) into v_count from public.vocab_race_players where room_id=p_room;
    if v_count < 2 or v_count > 4 then raise exception 'need_2_to_4_players'; end if;

    update public.vocab_race_players
       set score=0, wrong_count=0, total_activation_ms=0, lane=2,
           lane_entered_at=clock_timestamp(), track_pos=0, answered_round=-1
     where room_id=p_room;
    delete from public.vocab_race_lane_claims where room_id=p_room;
    delete from public.vocab_race_obstacle_waves where room_id=p_room;

    update public.vocab_race_rooms
       set status='playing', round_index=0, round_started_at=clock_timestamp(),
           collision_enabled=false, last_result=null, ended_at=null
     where id=p_room returning * into v_room;
    return v_room;
end;
$$;
grant execute on function public.vocab_race_start_room(uuid) to authenticated;

-- v2: đổi làn có kèm round để request cũ không tác động nhầm sang vòng mới.
create or replace function public.vocab_race_set_lane(p_room uuid, p_lane integer, p_round integer)
returns public.vocab_race_players
language plpgsql
security definer
set search_path = public
as $$
declare
    v_uid uuid := auth.uid();
    v_room public.vocab_race_rooms;
    v_player public.vocab_race_players;
begin
    if p_lane < 0 or p_lane > 4 then raise exception 'invalid_lane'; end if;
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then raise exception 'game_not_playing'; end if;
    if v_room.round_index <> p_round then raise exception 'stale_round'; end if;
    if clock_timestamp() >= v_room.round_started_at + interval '20 seconds' then raise exception 'round_timeout'; end if;

    select * into v_player from public.vocab_race_players
     where room_id=p_room and user_id=v_uid for update;
    if not found then raise exception 'not_in_room'; end if;
    if v_player.answered_round = v_room.round_index then raise exception 'already_answered'; end if;

    if v_player.lane is distinct from p_lane then
        update public.vocab_race_players
           set lane=p_lane, lane_entered_at=clock_timestamp()
         where room_id=p_room and user_id=v_uid
         returning * into v_player;
    end if;
    return v_player;
end;
$$;
grant execute on function public.vocab_race_set_lane(uuid,integer,integer) to authenticated;

-- v2: bấm ĂN TỪ ngay; sai hoặc đâm chướng ngại vật => loại ở vòng hiện tại.
create or replace function public.vocab_race_claim_lane(p_room uuid, p_lane integer, p_round integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_uid uuid := auth.uid();
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
    v_result jsonb;
    v_hide_user text;
    v_hide_round int;
begin
    if p_lane < 0 or p_lane > 4 then raise exception 'invalid_lane'; end if;

    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then raise exception 'game_not_playing'; end if;
    if v_room.round_index <> p_round then raise exception 'stale_round'; end if;
    if clock_timestamp() >= v_room.round_started_at + interval '20 seconds' then raise exception 'round_timeout'; end if;

    select * into v_player from public.vocab_race_players
     where room_id=p_room and user_id=v_uid for update;
    if not found then raise exception 'not_in_room'; end if;
    if v_player.answered_round = v_room.round_index then raise exception 'already_answered'; end if;
    if v_player.lane is distinct from p_lane then raise exception 'lane_changed'; end if;

    v_ms := greatest(0, floor(extract(epoch from (clock_timestamp()-v_room.round_started_at))*1000)::int);
    v_elapsed_ms := v_ms;
    v_hide_user := nullif(v_room.last_result ->> 'hide_user_id','');
    v_hide_round := coalesce((v_room.last_result ->> 'hide_round')::int,-1);
    if v_hide_round <> v_room.round_index then
        v_hide_user := null;
        v_hide_round := -1;
    end if;

    -- Trong 4 giây chướng ngại vật đang rơi, bấm lao lên cùng làn sẽ bị đâm.
    if v_elapsed_ms >= 5000 then
        v_wave := floor(v_elapsed_ms / 5000.0)::int;
        if v_wave between 1 and 3 then
            v_phase_ms := v_elapsed_ms - (v_wave * 5000);
            if v_phase_ms >= 0 and v_phase_ms < 4000 then
                v_seed := ('x' || substr(replace(p_room::text,'-',''),1,8))::bit(32)::bigint;
                v_lane_a := mod(v_seed + v_room.round_index * 7 + v_wave * 3, 5)::int;
                v_offset := 1 + mod((v_seed / 5) + v_room.round_index + v_wave, 4)::int;
                v_lane_b := mod(v_lane_a + v_offset, 5);
                if p_lane = v_lane_a or p_lane = v_lane_b then
                    update public.vocab_race_players
                       set answered_round=v_room.round_index,
                           total_activation_ms=total_activation_ms+v_ms
                     where room_id=p_room and user_id=v_uid;

                    select count(*) into v_active from public.vocab_race_players
                     where room_id=p_room and answered_round<>v_room.round_index;

                    v_result := jsonb_build_object(
                        'type','obstacle_hit','at',clock_timestamp(),'round',v_room.round_index,
                        'user_id',v_uid,'wave',v_wave,'lane',p_lane,
                        'hide_user_id',v_hide_user,'hide_round',v_hide_round
                    );

                    if v_active = 0 then
                        if v_room.round_index >= 19 then
                            perform public.vocab_race_finish_locked(p_room,v_result);
                        else
                            update public.vocab_race_players
                               set lane=2,lane_entered_at=clock_timestamp()
                             where room_id=p_room;
                            update public.vocab_race_rooms
                               set round_index=round_index+1,round_started_at=clock_timestamp(),
                                   collision_enabled=false,
                                   last_result=jsonb_build_object('type','all_eliminated','reason','obstacle','at',clock_timestamp(),'round',v_room.round_index)
                             where id=p_room;
                        end if;
                    else
                        update public.vocab_race_rooms set last_result=v_result where id=p_room;
                    end if;
                    return v_result;
                end if;
            end if;
        end if;
    end if;

    v_question := v_room.questions -> v_room.round_index;
    v_correct_lane := coalesce((v_question ->> 'correct_index')::int,-1);
    v_correct := (p_lane = v_correct_lane);

    if not v_correct then
        update public.vocab_race_players
           set answered_round=v_room.round_index,
               total_activation_ms=total_activation_ms+v_ms,
               wrong_count=wrong_count+1
         where room_id=p_room and user_id=v_uid;
        perform public.vocab_race_add_points(v_uid,-1);

        select count(*) into v_active from public.vocab_race_players
         where room_id=p_room and answered_round<>v_room.round_index;

        v_result := jsonb_build_object(
            'type','wrong','at',clock_timestamp(),'round',v_room.round_index,
            'user_id',v_uid,'lane',p_lane,
            'hide_user_id',v_hide_user,'hide_round',v_hide_round
        );

        if v_active = 0 then
            if v_room.round_index >= 19 then
                perform public.vocab_race_finish_locked(p_room,v_result);
            else
                update public.vocab_race_players
                   set lane=2,lane_entered_at=clock_timestamp()
                 where room_id=p_room;
                update public.vocab_race_rooms
                   set round_index=round_index+1,round_started_at=clock_timestamp(),
                       collision_enabled=false,
                       last_result=jsonb_build_object('type','all_eliminated','reason','wrong','at',clock_timestamp(),'round',v_room.round_index)
                 where id=p_room;
            end if;
        else
            update public.vocab_race_rooms set last_result=v_result where id=p_room;
        end if;
        return v_result;
    end if;

    -- Đúng: người bấm đúng đầu tiên thắng vòng. Room lock đảm bảo chỉ một người thắng.
    update public.vocab_race_players
       set answered_round=v_room.round_index,
           total_activation_ms=total_activation_ms+v_ms,
           score=score+1,
           track_pos=track_pos+1
     where room_id=p_room and user_id=v_uid;

    -- Giữ cơ chế điểm chăm chỉ cũ: người còn đang thi nhưng không ăn được từ bị -1.
    for v_victim in
        select user_id from public.vocab_race_players
         where room_id=p_room and user_id<>v_uid and answered_round<>v_room.round_index
    loop
        perform public.vocab_race_add_points(v_victim,-1);
    end loop;

    update public.vocab_race_players
       set wrong_count=wrong_count + case when user_id<>v_uid and answered_round<>v_room.round_index then 1 else 0 end,
           lane=2,lane_entered_at=clock_timestamp()
     where room_id=p_room;

    v_result := jsonb_build_object(
        'type','correct','at',clock_timestamp(),'round',v_room.round_index,
        'winner_user_id',v_uid,'correct_lane',v_correct_lane
    );

    if v_room.round_index >= 19 then
        perform public.vocab_race_finish_locked(p_room,v_result);
    else
        update public.vocab_race_rooms
           set round_index=round_index+1,
               round_started_at=clock_timestamp(),
               collision_enabled=false,
               last_result=v_result || jsonb_build_object('hide_user_id',v_uid,'hide_round',v_room.round_index+1)
         where id=p_room;
    end if;
    return v_result;
end;
$$;
grant execute on function public.vocab_race_claim_lane(uuid,integer,integer) to authenticated;

-- Tại thời điểm chướng ngại vật chạm vùng xe (~3.2 giây sau khi xuất hiện),
-- loại mọi xe còn sống đang ở 2 làn đó. Mỗi wave chỉ resolve đúng 1 lần.
create or replace function public.vocab_race_resolve_obstacle(p_room uuid, p_round integer, p_wave integer)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_room public.vocab_race_rooms;
    v_elapsed_ms bigint;
    v_seed bigint;
    v_lane_a int;
    v_lane_b int;
    v_offset int;
    v_inserted int;
    v_hit_ids jsonb := '[]'::jsonb;
    v_hit_count int := 0;
    v_active int;
    v_result jsonb;
    v_hide_user text;
    v_hide_round int;
begin
    if p_wave < 1 or p_wave > 3 then raise exception 'invalid_obstacle_wave'; end if;

    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then raise exception 'game_not_playing'; end if;
    if v_room.round_index <> p_round then return jsonb_build_object('type','stale_round'); end if;

    v_elapsed_ms := greatest(0, floor(extract(epoch from (clock_timestamp()-v_room.round_started_at))*1000)::bigint);
    if v_elapsed_ms < (p_wave * 5000 + 3200) then return jsonb_build_object('type','too_early'); end if;

    v_seed := ('x' || substr(replace(p_room::text,'-',''),1,8))::bit(32)::bigint;
    v_lane_a := mod(v_seed + v_room.round_index * 7 + p_wave * 3, 5)::int;
    v_offset := 1 + mod((v_seed / 5) + v_room.round_index + p_wave, 4)::int;
    v_lane_b := mod(v_lane_a + v_offset, 5);

    insert into public.vocab_race_obstacle_waves(room_id,round_index,wave,lane_a,lane_b)
    values (p_room,v_room.round_index,p_wave,v_lane_a,v_lane_b)
    on conflict do nothing;
    get diagnostics v_inserted = row_count;
    if v_inserted = 0 then return jsonb_build_object('type','already_processed'); end if;

    with hit as (
        update public.vocab_race_players
           set answered_round=v_room.round_index
         where room_id=p_room
           and answered_round<>v_room.round_index
           and lane in (v_lane_a,v_lane_b)
        returning user_id
    )
    select coalesce(jsonb_agg(user_id),'[]'::jsonb), count(*)
      into v_hit_ids,v_hit_count
      from hit;

    if v_hit_count = 0 then
        return jsonb_build_object('type','obstacle_clear','wave',p_wave,'lanes',jsonb_build_array(v_lane_a,v_lane_b));
    end if;

    v_hide_user := nullif(v_room.last_result ->> 'hide_user_id','');
    v_hide_round := coalesce((v_room.last_result ->> 'hide_round')::int,-1);
    if v_hide_round <> v_room.round_index then
        v_hide_user := null;
        v_hide_round := -1;
    end if;

    select count(*) into v_active from public.vocab_race_players
     where room_id=p_room and answered_round<>v_room.round_index;

    v_result := jsonb_build_object(
        'type','obstacle_hit','at',clock_timestamp(),'round',v_room.round_index,
        'wave',p_wave,'lanes',jsonb_build_array(v_lane_a,v_lane_b),'hit_user_ids',v_hit_ids,
        'hide_user_id',v_hide_user,'hide_round',v_hide_round
    );

    if v_active = 0 then
        if v_room.round_index >= 19 then
            perform public.vocab_race_finish_locked(p_room,v_result);
        else
            update public.vocab_race_players
               set lane=2,lane_entered_at=clock_timestamp()
             where room_id=p_room;
            update public.vocab_race_rooms
               set round_index=round_index+1,round_started_at=clock_timestamp(),
                   collision_enabled=false,
                   last_result=jsonb_build_object('type','all_eliminated','reason','obstacle','at',clock_timestamp(),'round',v_room.round_index)
             where id=p_room;
        end if;
    else
        update public.vocab_race_rooms set last_result=v_result where id=p_room;
    end if;

    return v_result;
end;
$$;
grant execute on function public.vocab_race_resolve_obstacle(uuid,integer,integer) to authenticated;

-- Timeout v2: chỉ phạt những người vẫn còn sống đến hết 20 giây.
create or replace function public.vocab_race_resolve_timeout(p_room uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_room public.vocab_race_rooms;
    v_uid uuid;
    v_result jsonb;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then return '{}'::jsonb; end if;
    if clock_timestamp() < v_room.round_started_at + interval '20 seconds' then return '{}'::jsonb; end if;

    for v_uid in
        select user_id from public.vocab_race_players
         where room_id=p_room and answered_round<>v_room.round_index
    loop
        perform public.vocab_race_add_points(v_uid,-1);
    end loop;

    update public.vocab_race_players
       set wrong_count=wrong_count + case when answered_round<>v_room.round_index then 1 else 0 end,
           answered_round=v_room.round_index,
           lane=2,lane_entered_at=clock_timestamp()
     where room_id=p_room;

    v_result := jsonb_build_object('type','all_eliminated','reason','timeout','at',clock_timestamp(),'round',v_room.round_index);
    if v_room.round_index >= 19 then
        perform public.vocab_race_finish_locked(p_room,v_result);
    else
        update public.vocab_race_rooms
           set round_index=round_index+1,round_started_at=clock_timestamp(),
               collision_enabled=false,last_result=v_result
         where id=p_room;
    end if;
    return v_result;
end;
$$;
grant execute on function public.vocab_race_resolve_timeout(uuid) to authenticated;

-- Replay: dọn cả obstacle waves.
create or replace function public.vocab_race_reset_room(p_room uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    v_uid uuid := auth.uid();
    v_host uuid;
begin
    select host_user_id into v_host from public.vocab_race_rooms where id=p_room for update;
    if v_host is null then return; end if;
    if v_host<>v_uid then raise exception 'host_only'; end if;
    update public.vocab_race_rooms
       set status='lobby',round_index=0,round_started_at=null,collision_enabled=false,last_result=null,ended_at=null
     where id=p_room;
    update public.vocab_race_players
       set score=0,wrong_count=0,total_activation_ms=0,lane=null,lane_entered_at=null,track_pos=0,answered_round=-1
     where room_id=p_room;
    delete from public.vocab_race_lane_claims where room_id=p_room;
    delete from public.vocab_race_obstacle_waves where room_id=p_room;
end;
$$;
grant execute on function public.vocab_race_reset_room(uuid) to authenticated;

NOTIFY pgrst, 'reload schema';