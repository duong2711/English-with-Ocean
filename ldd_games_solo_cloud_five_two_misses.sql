-- LDD English: solo or multiplayer and five-word two-miss cloud rules.
-- Existing shooter/race rooms retain multiplayer rules. Old 16-choice clouds stay untouched.

ALTER TABLE public.ldd_shooter_rooms
  ADD COLUMN IF NOT EXISTS cloud_round_index integer NOT NULL DEFAULT 0
  CHECK (cloud_round_index BETWEEN 0 AND 30);

CREATE TABLE IF NOT EXISTS public.ldd_cloud_wrong_attempts (
  room_id uuid NOT NULL REFERENCES public.ldd_shooter_rooms(id) ON DELETE CASCADE,
  round_index smallint NOT NULL CHECK (round_index BETWEEN 0 AND 29),
  user_id uuid NOT NULL,
  wrong_count smallint NOT NULL DEFAULT 1 CHECK (wrong_count BETWEEN 1 AND 2),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  PRIMARY KEY(room_id,round_index,user_id)
);
CREATE INDEX IF NOT EXISTS idx_ldd_cloud_wrong_attempts_round
  ON public.ldd_cloud_wrong_attempts(room_id,round_index) WHERE wrong_count=2;
ALTER TABLE public.ldd_cloud_wrong_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS cloud_wrong_attempts_own_read ON public.ldd_cloud_wrong_attempts;
CREATE POLICY cloud_wrong_attempts_own_read
 ON public.ldd_cloud_wrong_attempts
 FOR SELECT TO authenticated USING (user_id=(SELECT auth.uid()));
REVOKE ALL ON public.ldd_cloud_wrong_attempts FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.ldd_cloud_wrong_attempts TO authenticated;

-- New rooms only, old 16-choice cloud create RPC is kept for backwards compatibility.
CREATE OR REPLACE FUNCTION public.ldd_cloud_create_v2(
 p_words jsonb, p_topic text, p_name text, p_capacity integer
) RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $fn$
DECLARE
 v_uid uuid := (SELECT auth.uid());
 v_room public.ldd_shooter_rooms;
 v_code text;
 v_attempts int := 0;
 v_mode text;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 IF p_capacity NOT IN (1,4) OR p_capacity IS NULL THEN RAISE EXCEPTION 'invalid_capacity'; END IF;
 IF p_words IS NULL OR jsonb_typeof(p_words)<>'array'
 OR jsonb_array_length(p_words)<>30 OR pg_column_size(p_words)>80000
 THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF p_words->0->>'game_mode'<>'word_cloud'
 OR p_words->0->>'sequence_mode'<>'one_by_one'
 OR p_words->0->>'cloud_rules'<>'two_misses_v1'
 THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 v_mode:=p_words->0->>'cloud_mode';
 IF v_mode NOT IN ('grammar','vocabulary') OR v_mode IS NULL
 THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF EXISTS (
 SELECT 1 FROM jsonb_array_elements(p_words) AS w
 WHERE jsonb_typeof(w)<>'object'
  OR w->>'cloud_mode' IS DISTINCT FROM v_mode
  OR length(trim(coalesce(w->>'en',''))) NOT BETWEEN 1 AND 55
  OR trim(coalesce(w->>'en','')) !~ '^[A-Za-z][A-Za-z''-]*$'
  OR length(trim(coalesce(w->>'vi',''))) NOT BETWEEN 1 AND 120
  OR length(trim(coalesce(w->>'prompt',''))) NOT BETWEEN 9 AND 240
  OR position('____' in coalesce(w->>'prompt',''))=0
  OR jsonb_typeof(w->'choices') IS DISTINCT FROM 'array'
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF EXISTS (
 SELECT 1 FROM jsonb_array_elements(p_words) AS w
 WHERE jsonb_array_length(w->'choices')<>5
   OR (SELECT count(DISTINCT lower(trim(c.value)))
      FROM jsonb_array_elements_text(w->'choices') AS c(value))<>5
   OR (SELECT count(*) FROM jsonb_array_elements_text(w->'choices') AS c(value)
       WHERE lower(trim(c.value))=lower(trim(w->>'en')))<>1
 ) THEN RAISE EXCEPTION 'invalid_cloud_questions'; END IF;
 IF (SELECT count(*) FROM public.ldd_shooter_rooms
   WHERE host_user_id=v_uid AND created_at>now()-interval '2 minutes')>=5
 THEN RAISE EXCEPTION 'create_too_fast'; END IF;
 LOOP
  v_attempts:=v_attempts+1;
  v_code:=upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
  BEGIN
   INSERT INTO public.ldd_shooter_rooms(code,host_user_id,capacity,topic_title,word_list,seed)
   VALUES (v_code,v_uid,p_capacity,left(coalesce(nullif(trim(p_topic),''),'Tìm từ còn thiếu'),90),
      p_words,(floor(random()*1000000000))::integer)
   RETURNING * INTO v_room;
   EXIT;
  EXCEPTION WHEN unique_violation THEN
    IF v_attempts>=8 THEN RAISE EXCEPTION 'room_code_unavailable'; END IF;
  END;
 END LOOP;
 INSERT INTO public.ldd_shooter_players(room_id,user_id,slot,display_name)
 VALUES(v_room.id,v_uid,1,left(coalesce(nullif(trim(p_name),''),'Học viên'),45));
 RETURN v_room;
END $fn$;

-- One server transaction arbitrates both correct answers and incorrect attempts.
-- No user-controlled score, current index, or wrong-count state is trusted.
CREATE OR REPLACE FUNCTION public.ldd_cloud_answer(
 p_room uuid, p_round integer, p_choice text
) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $fn$
DECLARE
 v_uid uuid := (SELECT auth.uid());
 v_room public.ldd_shooter_rooms;
 v_expected text;
 v_guess text:=lower(trim(coalesce(p_choice,'')));
 v_question jsonb;
 v_wrong int:=0;
 v_after int;
 v_players int;
 v_exhausted int;
 v_count int;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 SELECT * INTO v_room FROM public.ldd_shooter_rooms WHERE id=p_room FOR UPDATE;
 IF NOT FOUND THEN RETURN jsonb_build_object('ok',false,'reason','room_not_found'); END IF;
 IF coalesce(v_room.word_list->0->>'cloud_rules','')<>'two_misses_v1'
 OR coalesce(v_room.word_list->0->>'game_mode','')<>'word_cloud'
 THEN RETURN jsonb_build_object('ok',false,'reason','wrong_game'); END IF;
 IF NOT EXISTS (SELECT 1 FROM public.ldd_shooter_players
  WHERE room_id=p_room AND user_id=v_uid)
 THEN RAISE EXCEPTION 'not_in_room'; END IF;
 IF v_room.status<>'playing'
 THEN RETURN jsonb_build_object('ok',false,'reason','not_playing','round_index',v_room.cloud_round_index); END IF;
 IF v_room.started_at IS NULL OR clock_timestamp()<v_room.started_at
 THEN RETURN jsonb_build_object('ok',false,'reason','not_started'); END IF;
 IF p_round IS NULL OR p_round<>v_room.cloud_round_index OR p_round NOT BETWEEN 0 AND 29
 THEN RETURN jsonb_build_object('ok',false,'reason','stale_round','round_index',v_room.cloud_round_index); END IF;

 v_question:=v_room.word_list->p_round;
 v_expected:=lower(trim(v_question->>'en'));
 IF v_guess='' OR NOT EXISTS (
   SELECT 1 FROM jsonb_array_elements_text(v_question->'choices') AS c(value)
   WHERE lower(trim(c.value))=v_guess
 ) THEN RETURN jsonb_build_object('ok',false,'reason','invalid_choice','round_index',p_round); END IF;
 SELECT wrong_count INTO v_wrong FROM public.ldd_cloud_wrong_attempts
 WHERE room_id=p_room AND round_index=p_round AND user_id=v_uid;
 v_wrong:=coalesce(v_wrong,0);
 IF v_wrong>=2 THEN
  RETURN jsonb_build_object('ok',false,'reason','lost_round','wrong_count',2,'round_index',p_round);
 END IF;

 IF v_guess=v_expected THEN
   INSERT INTO public.ldd_shooter_claims(room_id,word_index,user_id)
   VALUES(p_room,p_round,v_uid) ON CONFLICT(room_id,word_index) DO NOTHING;
   GET DIAGNOSTICS v_count=ROW_COUNT;
   IF v_count=0 THEN
     RETURN jsonb_build_object('ok',false,'reason','already_claimed','round_index',v_room.cloud_round_index);
   END IF;
   PERFORM public.vocab_race_add_points(v_uid,1);
   UPDATE public.diligence_scores SET diligence_score=diligence_score WHERE user_id=v_uid;
   v_after:=p_round+1;
   UPDATE public.ldd_shooter_rooms
     SET cloud_round_index=v_after,
         status=CASE WHEN v_after=30 THEN 'finished' ELSE 'playing' END,
         finished_at=CASE WHEN v_after=30 THEN clock_timestamp() ELSE finished_at END
   WHERE id=p_room;
   RETURN jsonb_build_object('ok',true,'result','correct','round_index',v_after,'winner',v_uid,'wrong_count',v_wrong);
 END IF;

 v_wrong:=v_wrong+1;
 INSERT INTO public.ldd_cloud_wrong_attempts(room_id,round_index,user_id,wrong_count)
 VALUES(p_room,p_round,v_uid,v_wrong)
 ON CONFLICT(room_id,round_index,user_id)
 DO UPDATE SET wrong_count=EXCLUDED.wrong_count,updated_at=clock_timestamp();

 IF v_wrong=1 THEN
  RETURN jsonb_build_object('ok',true,'result','wrong_once','round_index',p_round,'wrong_count',1);
 END IF;

 SELECT count(*) INTO v_players FROM public.ldd_shooter_players WHERE room_id=p_room;
 SELECT count(*) INTO v_exhausted FROM public.ldd_cloud_wrong_attempts
   WHERE room_id=p_room AND round_index=p_round AND wrong_count=2;
 IF v_exhausted>=v_players THEN
   v_after:=p_round+1;
   UPDATE public.ldd_shooter_rooms
    SET cloud_round_index=v_after,
        status=CASE WHEN v_after=30 THEN 'finished' ELSE 'playing' END,
        finished_at=CASE WHEN v_after=30 THEN clock_timestamp() ELSE finished_at END
    WHERE id=p_room;
   RETURN jsonb_build_object('ok',true,'result','round_skipped','round_index',v_after,'wrong_count',2);
 END IF;
 RETURN jsonb_build_object('ok',true,'result','lost_round','round_index',p_round,'wrong_count',2);
END $fn$;

-- Only new cloud rooms use the v2 rules; legacy shooter/cloud claims work as before.
CREATE OR REPLACE FUNCTION public.ldd_shooter_create(
 p_words jsonb,p_capacity integer,p_topic text,p_name text
) RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $fn$
DECLARE
 v_uid uuid:=(SELECT auth.uid());
 v_room public.ldd_shooter_rooms;
 v_code text;
 v_tries integer:=0;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 IF p_capacity<1 OR p_capacity>4 OR p_capacity IS NULL THEN RAISE EXCEPTION 'invalid_capacity'; END IF;
 IF p_words IS NULL OR jsonb_typeof(p_words)<>'array' OR jsonb_array_length(p_words)<>30
 THEN RAISE EXCEPTION 'need_30_words'; END IF;
 IF EXISTS (
   SELECT 1 FROM jsonb_array_elements(p_words) w
   WHERE jsonb_typeof(w)<>'object'
   OR length(trim(coalesce(w->>'en',''))) NOT BETWEEN 2 AND 55
   OR length(trim(coalesce(w->>'vi',''))) NOT BETWEEN 1 AND 120
 ) OR (
   SELECT count(DISTINCT lower(trim(w->>'en'))) FROM jsonb_array_elements(p_words) w
 )<>30
 THEN RAISE EXCEPTION 'invalid_words'; END IF;
 IF (
  SELECT count(*) FROM public.ldd_shooter_rooms
  WHERE host_user_id=v_uid AND created_at>now()-interval '2 minutes'
 )>=5 THEN RAISE EXCEPTION 'create_too_fast'; END IF;
 LOOP
  v_tries:=v_tries+1;
  v_code:=upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
  BEGIN
   INSERT INTO public.ldd_shooter_rooms(code,host_user_id,capacity,topic_title,word_list,seed)
   VALUES(v_code,v_uid,p_capacity,left(coalesce(nullif(trim(p_topic),''),'Từ vựng'),90),
          p_words,(floor(random()*1000000000))::integer)
   RETURNING * INTO v_room;
   EXIT;
  EXCEPTION WHEN unique_violation THEN
    IF v_tries>=8 THEN RAISE EXCEPTION 'room_code_unavailable'; END IF;
  END;
 END LOOP;
 INSERT INTO public.ldd_shooter_players(room_id,user_id,slot,display_name)
 VALUES(v_room.id,v_uid,1,left(coalesce(nullif(trim(p_name),''),'Học viên'),45));
 RETURN v_room;
END $fn$;

CREATE OR REPLACE FUNCTION public.ldd_shooter_start(p_room uuid)
RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $fn$
DECLARE
 v_room public.ldd_shooter_rooms;
 v_count integer;
BEGIN
 SELECT * INTO v_room FROM public.ldd_shooter_rooms WHERE id=p_room FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'room_not_found'; END IF;
 IF v_room.host_user_id<>(SELECT auth.uid()) THEN RAISE EXCEPTION 'host_only'; END IF;
 IF v_room.status<>'lobby' THEN RAISE EXCEPTION 'room_already_started'; END IF;
 SELECT count(*) INTO v_count FROM public.ldd_shooter_players WHERE room_id=p_room;
 IF (v_room.capacity=1 AND v_count<>1)
 OR (v_room.capacity>1 AND (v_count<2 OR v_count>v_room.capacity))
 THEN RAISE EXCEPTION 'need_2_to_4_players'; END IF;
 UPDATE public.ldd_shooter_rooms
 SET status='playing',started_at=clock_timestamp()+interval '3 seconds'
 WHERE id=p_room RETURNING * INTO v_room;
 RETURN v_room;
END $fn$;

-- Race solo is an explicit marker stored with its immutable first question;
-- old and new multiplayer rooms continue to require 2–4 participants.
CREATE OR REPLACE FUNCTION public.vocab_race_start_room(p_room uuid)
RETURNS public.vocab_race_rooms
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
 v_uid uuid:=auth.uid();
 v_room public.vocab_race_rooms;
 v_count int;
 v_solo boolean;
BEGIN
 SELECT * INTO v_room FROM public.vocab_race_rooms WHERE id=p_room FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'room_not_found'; END IF;
 IF v_room.host_user_id<>v_uid THEN RAISE EXCEPTION 'host_only'; END IF;
 IF v_room.status<>'lobby' THEN RAISE EXCEPTION 'room_already_started'; END IF;
 v_solo:=coalesce(v_room.questions->0->>'play_mode','')='solo';
 SELECT count(*) INTO v_count FROM public.vocab_race_players WHERE room_id=p_room;
 IF (v_solo AND v_count<>1) OR (NOT v_solo AND (v_count<2 OR v_count>4))
 THEN RAISE EXCEPTION 'need_2_to_4_players'; END IF;
 UPDATE public.vocab_race_players
   SET score=0,wrong_count=0,total_activation_ms=0,lane=2,lane_entered_at=clock_timestamp(),
       track_pos=0,answered_round=-1,round_outcome=null
 WHERE room_id=p_room;
 DELETE FROM public.vocab_race_lane_claims WHERE room_id=p_room;
 DELETE FROM public.vocab_race_obstacle_waves WHERE room_id=p_room;
 UPDATE public.vocab_race_rooms
   SET status='playing',round_index=0,round_started_at=clock_timestamp(),
       collision_enabled=false,last_result=null,ended_at=null
 WHERE id=p_room RETURNING * INTO v_room;
 RETURN v_room;
END $fn$;

CREATE OR REPLACE FUNCTION public.vocab_race_join_room(
 p_code text,p_display_name text DEFAULT NULL::text
) RETURNS public.vocab_race_rooms
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
 v_uid uuid:=auth.uid();
 v_email text:=lower(coalesce(auth.jwt()->>'email',''));
 v_room public.vocab_race_rooms;
 v_slot integer;
BEGIN
 IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;
 IF v_email='lddbaiu@gmail.com' THEN RAISE EXCEPTION 'teacher_cannot_play'; END IF;
 SELECT * INTO v_room FROM public.vocab_race_rooms
 WHERE code=upper(trim(p_code)) ORDER BY created_at DESC LIMIT 1 FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'room_not_found'; END IF;
 IF EXISTS (SELECT 1 FROM public.vocab_race_players WHERE room_id=v_room.id AND user_id=v_uid)
 THEN RETURN v_room; END IF;
 IF coalesce(v_room.questions->0->>'play_mode','')='solo'
 THEN RAISE EXCEPTION 'solo_room'; END IF;
 IF v_room.status<>'lobby' THEN RAISE EXCEPTION 'room_already_started'; END IF;
 IF (SELECT count(*) FROM public.vocab_race_players WHERE room_id=v_room.id)>=4
 THEN RAISE EXCEPTION 'room_full'; END IF;
 SELECT s INTO v_slot FROM generate_series(1,4) s WHERE NOT EXISTS(
  SELECT 1 FROM public.vocab_race_players p WHERE p.room_id=v_room.id AND p.slot=s
 ) ORDER BY s LIMIT 1;
 INSERT INTO public.vocab_race_players(room_id,user_id,email,display_name,slot)
 VALUES(v_room.id,v_uid,v_email,nullif(trim(coalesce(p_display_name,'')),''),v_slot);
 RETURN v_room;
END $fn$;

REVOKE ALL ON FUNCTION public.ldd_cloud_create_v2(jsonb,text,text,integer) FROM PUBLIC,anon;
REVOKE ALL ON FUNCTION public.ldd_cloud_answer(uuid,integer,text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.ldd_cloud_create_v2(jsonb,text,text,integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ldd_cloud_answer(uuid,integer,text) TO authenticated;
