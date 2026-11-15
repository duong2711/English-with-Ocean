-- LDD English / Tìm từ còn thiếu
-- Reuses shooter room/player/claim data and score RPC without a new table.
-- Cloud rounds carry 16 different clickable choices and one correct answer,
-- with a one-by-one marker; grammar answers may legitimately repeat.

CREATE OR REPLACE FUNCTION public.ldd_cloud_create(
 p_words jsonb,
 p_topic text,
 p_name text
) RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $fn$
DECLARE
 v_uid uuid := (SELECT auth.uid());
 v_room public.ldd_shooter_rooms;
 v_code text;
 v_attempts integer := 0;
 v_mode text;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 IF p_words IS NULL OR jsonb_typeof(p_words) <> 'array'
    OR jsonb_array_length(p_words) <> 30
    OR pg_column_size(p_words) > 90000 THEN
   RAISE EXCEPTION 'invalid_cloud_questions';
 END IF;
 IF p_words->0->>'game_mode' <> 'word_cloud'
    OR p_words->0->>'sequence_mode' <> 'one_by_one' THEN
   RAISE EXCEPTION 'invalid_cloud_questions';
 END IF;
 v_mode := p_words->0->>'cloud_mode';
 IF v_mode NOT IN ('grammar','vocabulary') THEN
   RAISE EXCEPTION 'invalid_cloud_questions';
 END IF;
 IF EXISTS (
  SELECT 1 FROM jsonb_array_elements(p_words) AS w
  WHERE jsonb_typeof(w) <> 'object'
     OR w->>'cloud_mode' IS DISTINCT FROM v_mode
     OR length(trim(coalesce(w->>'en',''))) NOT BETWEEN 1 AND 55
     OR trim(coalesce(w->>'en','')) !~ '^[A-Za-z][A-Za-z''-]*$'
     OR length(trim(coalesce(w->>'vi',''))) NOT BETWEEN 1 AND 120
     OR length(trim(coalesce(w->>'prompt',''))) NOT BETWEEN 9 AND 240
     OR position('____' in coalesce(w->>'prompt','')) = 0
     OR jsonb_typeof(w->'choices') IS DISTINCT FROM 'array'
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;

 IF EXISTS (
   SELECT 1 FROM jsonb_array_elements(p_words) AS w
   WHERE jsonb_array_length(w->'choices') <> 16
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF EXISTS (
   SELECT 1 FROM jsonb_array_elements(p_words) AS w
   WHERE EXISTS (
      SELECT 1 FROM jsonb_array_elements(w->'choices') AS option_value
      WHERE jsonb_typeof(option_value) <> 'string'
   )
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF EXISTS (
   SELECT 1 FROM jsonb_array_elements(p_words) AS w
   WHERE (SELECT count(DISTINCT lower(trim(value)))
          FROM jsonb_array_elements_text(w->'choices') AS option_values(value)) <> 16
      OR (SELECT count(*)
          FROM jsonb_array_elements_text(w->'choices') AS option_values(value)
          WHERE lower(trim(value))=lower(trim(w->>'en'))) <> 1
      OR (SELECT count(*)
          FROM jsonb_array_elements_text(w->'choices') AS option_values(value)
          WHERE length(trim(value)) NOT BETWEEN 1 AND 55) > 0
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;

 IF (SELECT count(*) FROM public.ldd_shooter_rooms
     WHERE host_user_id=v_uid AND created_at>now()-interval '2 minutes') >= 5
 THEN RAISE EXCEPTION 'create_too_fast'; END IF;

 LOOP
   v_attempts:=v_attempts+1;
   v_code:=upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
   BEGIN
     INSERT INTO public.ldd_shooter_rooms(code,host_user_id,capacity,topic_title,word_list,seed)
     VALUES(v_code,v_uid,4,left(coalesce(nullif(trim(p_topic),''),'Tìm từ còn thiếu'),90),
       p_words,(floor(random()*1000000000))::integer)
     RETURNING * INTO v_room;
     EXIT;
   EXCEPTION WHEN unique_violation THEN
     IF v_attempts >= 8 THEN RAISE EXCEPTION 'room_code_unavailable'; END IF;
   END;
 END LOOP;
 INSERT INTO public.ldd_shooter_players(room_id,user_id,slot,display_name)
 VALUES(v_room.id,v_uid,1,left(coalesce(nullif(trim(p_name),''),'Học viên'),45));
 RETURN v_room;
END
$fn$;

CREATE OR REPLACE FUNCTION public.ldd_cloud_join(
 p_code text,
 p_name text
) RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $fn$
DECLARE
 v_uid uuid := (SELECT auth.uid());
 v_room public.ldd_shooter_rooms;
 v_slot integer;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 SELECT * INTO v_room FROM public.ldd_shooter_rooms
 WHERE code=upper(trim(p_code)) FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'room_not_found'; END IF;
 IF coalesce(v_room.word_list->0->>'game_mode','') <> 'word_cloud' THEN
   RAISE EXCEPTION 'room_not_cloud';
 END IF;
 IF EXISTS (SELECT 1 FROM public.ldd_shooter_players
    WHERE room_id=v_room.id AND user_id=v_uid) THEN RETURN v_room; END IF;
 IF v_room.status <> 'lobby' THEN RAISE EXCEPTION 'room_already_started'; END IF;
 SELECT coalesce(max(slot),0)+1 INTO v_slot FROM public.ldd_shooter_players
 WHERE room_id=v_room.id;
 IF v_slot > v_room.capacity THEN RAISE EXCEPTION 'room_full'; END IF;
 INSERT INTO public.ldd_shooter_players(room_id,user_id,slot,display_name)
 VALUES(v_room.id,v_uid,v_slot,left(coalesce(nullif(trim(p_name),''),'Học viên'),45));
 RETURN v_room;
END
$fn$;

REVOKE ALL ON FUNCTION public.ldd_cloud_create(jsonb,text,text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.ldd_cloud_join(text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ldd_cloud_create(jsonb,text,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ldd_cloud_join(text,text) TO authenticated;
