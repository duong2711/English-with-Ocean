-- ============================================================================
-- LDD English — ĐUA XE TỪ VỰNG (2–4 học viên, Supabase Realtime)
-- Chạy 1 lần trong Supabase Dashboard -> SQL Editor.
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.vocab_race_rooms (
    id uuid primary key default gen_random_uuid(),
    code text not null unique,
    host_user_id uuid not null,
    status text not null default 'lobby' check (status in ('lobby','playing','finished')),
    round_index integer not null default 0 check (round_index between 0 and 19),
    round_started_at timestamptz null,
    questions jsonb not null default '[]'::jsonb,
    collision_enabled boolean not null default false,
    last_result jsonb null,
    created_at timestamptz not null default now(),
    ended_at timestamptz null
);

create table if not exists public.vocab_race_players (
    room_id uuid not null references public.vocab_race_rooms(id) on delete cascade,
    user_id uuid not null,
    email text null,
    display_name text null,
    slot smallint not null check (slot between 1 and 4),
    score integer not null default 0,
    wrong_count integer not null default 0,
    total_activation_ms bigint not null default 0,
    lane smallint null check (lane between 0 and 4),
    lane_entered_at timestamptz null,
    track_pos integer not null default 0,
    answered_round integer not null default -1,
    joined_at timestamptz not null default now(),
    primary key (room_id, user_id),
    unique (room_id, slot)
);

create table if not exists public.vocab_race_lane_claims (
    room_id uuid not null references public.vocab_race_rooms(id) on delete cascade,
    round_index integer not null,
    lane smallint not null check (lane between 0 and 4),
    user_id uuid not null,
    claimed_at timestamptz not null default now(),
    activation_ms integer not null default 0,
    correct boolean not null default false,
    collision_victim uuid null,
    primary key (room_id, round_index, lane)
);

-- Điểm thưởng/phạt riêng của trò chơi. Phần Thành tựu sẽ cộng bảng này vào điểm chăm chỉ.
create table if not exists public.vocab_race_points (
    user_id uuid primary key,
    points integer not null default 0,
    updated_at timestamptz not null default now()
);

create index if not exists vocab_race_rooms_code_idx on public.vocab_race_rooms(code);
create index if not exists vocab_race_players_room_idx on public.vocab_race_players(room_id);
create index if not exists vocab_race_claims_room_round_idx on public.vocab_race_lane_claims(room_id, round_index);

alter table public.vocab_race_rooms enable row level security;
alter table public.vocab_race_players enable row level security;
alter table public.vocab_race_lane_claims enable row level security;
alter table public.vocab_race_points enable row level security;

-- Authenticated users may read room state so they can join by code and render Realtime state.
drop policy if exists "race rooms readable" on public.vocab_race_rooms;
create policy "race rooms readable" on public.vocab_race_rooms for select to authenticated using (true);

drop policy if exists "race players readable" on public.vocab_race_players;
create policy "race players readable" on public.vocab_race_players for select to authenticated using (true);

drop policy if exists "race claims readable" on public.vocab_race_lane_claims;
create policy "race claims readable" on public.vocab_race_lane_claims for select to authenticated using (true);

drop policy if exists "race points own read" on public.vocab_race_points;
create policy "race points own read" on public.vocab_race_points for select to authenticated
using (user_id = auth.uid() or lower(coalesce(auth.jwt() ->> 'email','')) = 'lddbaiu@gmail.com');

-- Không mở INSERT/UPDATE/DELETE trực tiếp: mọi thay đổi game đi qua RPC SECURITY DEFINER.

create or replace function public.vocab_race_add_points(p_user uuid, p_delta integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    if p_user is null or coalesce(p_delta,0) = 0 then return; end if;
    insert into public.vocab_race_points(user_id, points, updated_at)
    values (p_user, p_delta, now())
    on conflict (user_id) do update
       set points = public.vocab_race_points.points + excluded.points,
           updated_at = now();
end;
$$;
revoke all on function public.vocab_race_add_points(uuid, integer) from public;

create or replace function public.vocab_race_create_room(p_questions jsonb, p_display_name text default null)
returns public.vocab_race_rooms
language plpgsql
security definer
set search_path = public
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
        exit when not exists (select 1 from public.vocab_race_rooms where code = v_code and created_at > now() - interval '1 day');
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

create or replace function public.vocab_race_join_room(p_code text, p_display_name text default null)
returns public.vocab_race_rooms
language plpgsql
security definer
set search_path = public
as $$
declare
    v_uid uuid := auth.uid();
    v_email text := lower(coalesce(auth.jwt() ->> 'email',''));
    v_room public.vocab_race_rooms;
    v_slot int;
begin
    if v_uid is null then raise exception 'not_authenticated'; end if;
    if v_email = 'lddbaiu@gmail.com' then raise exception 'teacher_cannot_play'; end if;

    select * into v_room from public.vocab_race_rooms
     where code = upper(trim(p_code))
     order by created_at desc limit 1 for update;
    if not found then raise exception 'room_not_found'; end if;
    if v_room.status <> 'lobby' then raise exception 'room_already_started'; end if;

    if exists (select 1 from public.vocab_race_players where room_id=v_room.id and user_id=v_uid) then
        return v_room;
    end if;
    if (select count(*) from public.vocab_race_players where room_id=v_room.id) >= 4 then
        raise exception 'room_full';
    end if;

    select s into v_slot
      from generate_series(1,4) s
     where not exists (select 1 from public.vocab_race_players p where p.room_id=v_room.id and p.slot=s)
     order by s limit 1;

    insert into public.vocab_race_players(room_id,user_id,email,display_name,slot)
    values (v_room.id,v_uid,v_email,nullif(trim(coalesce(p_display_name,'')),''),v_slot);
    return v_room;
end;
$$;

grant execute on function public.vocab_race_join_room(text,text) to authenticated;

create or replace function public.vocab_race_leave_room(p_room uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_uid uuid := auth.uid(); v_room public.vocab_race_rooms;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found then return; end if;
    if v_room.status = 'playing' then raise exception 'cannot_leave_during_game'; end if;
    delete from public.vocab_race_players where room_id=p_room and user_id=v_uid;
    if v_room.host_user_id=v_uid then
        delete from public.vocab_race_rooms where id=p_room;
    end if;
end;
$$;
grant execute on function public.vocab_race_leave_room(uuid) to authenticated;

create or replace function public.vocab_race_start_room(p_room uuid)
returns public.vocab_race_rooms
language plpgsql
security definer
set search_path = public
as $$
declare v_uid uuid := auth.uid(); v_room public.vocab_race_rooms; v_count int;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found then raise exception 'room_not_found'; end if;
    if v_room.host_user_id <> v_uid then raise exception 'host_only'; end if;
    if v_room.status <> 'lobby' then raise exception 'room_already_started'; end if;
    select count(*) into v_count from public.vocab_race_players where room_id=p_room;
    if v_count < 2 or v_count > 4 then raise exception 'need_2_to_4_players'; end if;

    update public.vocab_race_players
       set score=0, wrong_count=0, total_activation_ms=0, lane=2, lane_entered_at=clock_timestamp(),
           track_pos=0, answered_round=-1
     where room_id=p_room;
    delete from public.vocab_race_lane_claims where room_id=p_room;
    update public.vocab_race_rooms
       set status='playing', round_index=0, round_started_at=clock_timestamp(),
           collision_enabled=false, last_result=null, ended_at=null
     where id=p_room returning * into v_room;
    return v_room;
end;
$$;
grant execute on function public.vocab_race_start_room(uuid) to authenticated;

create or replace function public.vocab_race_set_lane(p_room uuid, p_lane integer)
returns public.vocab_race_players
language plpgsql
security definer
set search_path = public
as $$
declare v_uid uuid := auth.uid(); v_room public.vocab_race_rooms; v_player public.vocab_race_players;
begin
    if p_lane < 0 or p_lane > 4 then raise exception 'invalid_lane'; end if;
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then raise exception 'game_not_playing'; end if;
    if clock_timestamp() >= v_room.round_started_at + interval '20 seconds' then raise exception 'round_timeout'; end if;

    select * into v_player from public.vocab_race_players where room_id=p_room and user_id=v_uid for update;
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
grant execute on function public.vocab_race_set_lane(uuid,integer) to authenticated;

-- Hoàn tất trận và thưởng +20 điểm chăm chỉ cho hạng 1.
create or replace function public.vocab_race_finish_locked(p_room uuid, p_round_result jsonb default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_winner uuid; v_rank jsonb;
begin
    select user_id into v_winner
      from public.vocab_race_players
     where room_id=p_room
     order by score desc, wrong_count asc, total_activation_ms asc, joined_at asc
     limit 1;
    if v_winner is not null then perform public.vocab_race_add_points(v_winner,20); end if;

    select coalesce(jsonb_agg(jsonb_build_object(
        'user_id',user_id,'display_name',display_name,'slot',slot,'score',score,
        'wrong_count',wrong_count,'total_activation_ms',total_activation_ms
    ) order by score desc, wrong_count asc, total_activation_ms asc, joined_at asc),'[]'::jsonb)
      into v_rank
      from public.vocab_race_players where room_id=p_room;

    update public.vocab_race_rooms
       set status='finished', ended_at=clock_timestamp(),
           last_result=jsonb_build_object('type','finished','at',clock_timestamp(),'winner_user_id',v_winner,
                    'round_result',coalesce(p_round_result,'{}'::jsonb),'ranking',v_rank)
     where id=p_room;
end;
$$;
revoke all on function public.vocab_race_finish_locked(uuid,jsonb) from public;

create or replace function public.vocab_race_claim_lane(p_room uuid, p_lane integer)
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
    v_victim uuid;
    v_collision_victim uuid;
    v_total int;
    v_answered int;
    v_result jsonb;
begin
    select * into v_room from public.vocab_race_rooms where id=p_room for update;
    if not found or v_room.status <> 'playing' then raise exception 'game_not_playing'; end if;
    if clock_timestamp() >= v_room.round_started_at + interval '20 seconds' then raise exception 'round_timeout'; end if;

    select * into v_player from public.vocab_race_players where room_id=p_room and user_id=v_uid for update;
    if not found then raise exception 'not_in_room'; end if;
    if v_player.answered_round = v_room.round_index then raise exception 'already_answered'; end if;
    if v_player.lane is distinct from p_lane or v_player.lane_entered_at is null then raise exception 'lane_changed'; end if;
    if clock_timestamp() < v_player.lane_entered_at + interval '6 seconds' then raise exception 'hold_not_finished'; end if;

    v_ms := greatest(0, floor(extract(epoch from (clock_timestamp()-v_room.round_started_at))*1000)::int);
    v_question := v_room.questions -> v_room.round_index;
    v_correct_lane := coalesce((v_question ->> 'correct_index')::int,-1);
    v_correct := (p_lane = v_correct_lane);

    begin
        insert into public.vocab_race_lane_claims(room_id,round_index,lane,user_id,activation_ms,correct)
        values (p_room,v_room.round_index,p_lane,v_uid,v_ms,v_correct);
    exception when unique_violation then
        raise exception 'lane_taken';
    end;

    -- Hút xe: chỉ từ vòng có khoảng cách, và chỉ khi người claim đang phía sau 1 xe cùng làn.
    if v_room.collision_enabled then
        select p.user_id into v_collision_victim
          from public.vocab_race_players p
         where p.room_id=p_room and p.user_id<>v_uid and p.lane=p_lane and p.track_pos>v_player.track_pos
         order by p.track_pos asc, p.slot asc limit 1 for update;
        if v_collision_victim is not null then
            perform public.vocab_race_add_points(v_collision_victim,-1);
            update public.vocab_race_lane_claims set collision_victim=v_collision_victim
             where room_id=p_room and round_index=v_room.round_index and lane=p_lane;
        end if;
    end if;

    update public.vocab_race_players
       set answered_round=v_room.round_index,
           total_activation_ms=total_activation_ms+v_ms,
           wrong_count=wrong_count + case when v_correct then 0 else 1 end,
           score=score + case when v_correct then 1 else 0 end
     where room_id=p_room and user_id=v_uid;

    if not v_correct then
        perform public.vocab_race_add_points(v_uid,-1);
    end if;

    if v_correct then
        -- Các xe chưa ăn từ khi đáp án đúng xuất hiện được tính là thua lượt: -1 chăm chỉ, +1 sai.
        for v_victim in
            select user_id from public.vocab_race_players
             where room_id=p_room and user_id<>v_uid and answered_round<>v_room.round_index
        loop
            perform public.vocab_race_add_points(v_victim,-1);
        end loop;
        update public.vocab_race_players
           set wrong_count=wrong_count + case when user_id<>v_uid and answered_round<>v_room.round_index then 1 else 0 end,
               track_pos=case when user_id=v_uid then track_pos else track_pos-1 end,
               lane=2, lane_entered_at=clock_timestamp()
         where room_id=p_room;

        v_result := jsonb_build_object('type','correct','at',clock_timestamp(),'round',v_room.round_index,
                     'winner_user_id',v_uid,'correct_lane',v_correct_lane,'collision_victim',v_collision_victim);

        if v_room.round_index >= 19 then
            perform public.vocab_race_finish_locked(p_room,v_result);
        else
            update public.vocab_race_rooms
               set round_index=round_index+1, round_started_at=clock_timestamp(), collision_enabled=true,
                   last_result=v_result
             where id=p_room;
        end if;
        return v_result;
    end if;

    select count(*), count(*) filter (where answered_round=v_room.round_index)
      into v_total,v_answered from public.vocab_race_players where room_id=p_room;

    if v_answered >= v_total then
        -- Tất cả đã chọn sai: kéo xe về cùng hàng, vòng sau tắt hút xe.
        update public.vocab_race_players set track_pos=0,lane=2,lane_entered_at=clock_timestamp() where room_id=p_room;
        v_result := jsonb_build_object('type','all_wrong','at',clock_timestamp(),'round',v_room.round_index,'correct_lane',v_correct_lane);
        if v_room.round_index >= 19 then
            perform public.vocab_race_finish_locked(p_room,v_result);
        else
            update public.vocab_race_rooms
               set round_index=round_index+1,round_started_at=clock_timestamp(),collision_enabled=false,last_result=v_result
             where id=p_room;
        end if;
        return v_result;
    end if;

    return jsonb_build_object('type','wrong','round',v_room.round_index,'lane',p_lane,'collision_victim',v_victim);
end;
$$;
grant execute on function public.vocab_race_claim_lane(uuid,integer) to authenticated;

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
           track_pos=0,lane=2,lane_entered_at=clock_timestamp()
     where room_id=p_room;

    v_result := jsonb_build_object('type','all_wrong','reason','timeout','at',clock_timestamp(),'round',v_room.round_index);
    if v_room.round_index >= 19 then
        perform public.vocab_race_finish_locked(p_room,v_result);
    else
        update public.vocab_race_rooms
           set round_index=round_index+1,round_started_at=clock_timestamp(),collision_enabled=false,last_result=v_result
         where id=p_room;
    end if;
    return v_result;
end;
$$;
grant execute on function public.vocab_race_resolve_timeout(uuid) to authenticated;

create or replace function public.vocab_race_reset_room(p_room uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_uid uuid := auth.uid(); v_host uuid;
begin
    select host_user_id into v_host from public.vocab_race_rooms where id=p_room for update;
    if v_host is null then return; end if;
    if v_host<>v_uid then raise exception 'host_only'; end if;
    update public.vocab_race_rooms set status='lobby',round_index=0,round_started_at=null,collision_enabled=false,last_result=null,ended_at=null where id=p_room;
    update public.vocab_race_players set score=0,wrong_count=0,total_activation_ms=0,lane=null,lane_entered_at=null,track_pos=0,answered_round=-1 where room_id=p_room;
    delete from public.vocab_race_lane_claims where room_id=p_room;
end;
$$;
grant execute on function public.vocab_race_reset_room(uuid) to authenticated;

-- Realtime publication (bỏ qua nếu bảng đã được add trước đó).
do $$
begin
    begin alter publication supabase_realtime add table public.vocab_race_rooms; exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.vocab_race_players; exception when duplicate_object then null; end;
    begin alter publication supabase_realtime add table public.vocab_race_lane_claims; exception when duplicate_object then null; end;
end $$;

comment on table public.vocab_race_rooms is 'Phòng Đua xe từ vựng 2–4 học viên, 20 lượt.';
comment on table public.vocab_race_points is 'Điểm chăm chỉ cộng/trừ từ Đua xe từ vựng; được cộng vào công thức Thành tựu.';
