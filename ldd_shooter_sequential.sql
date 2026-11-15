-- LDD Shooter: one-by-one prompts in newly created rooms.
-- Backward compatibility: old rooms have no sequence_mode marker, so keep
-- the original timestamp-driven behavior until they finish.
-- Stored in the first element of ldd_shooter_rooms.word_list:
--   {"en":"...","vi":"...","sequence_mode":"one_by_one"}

CREATE OR REPLACE FUNCTION public.ldd_shooter_claim(
  p_room uuid,
  p_word_index integer,
  p_typed text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_uid uuid := (SELECT auth.uid());
  v_room public.ldd_shooter_rooms;
  v_word text;
  v_now timestamptz;
  v_rows integer;
  v_spawn integer;
  v_fall integer;
  v_completed integer;
  v_sequential boolean;
  v_typed_normalized text;
  v_word_normalized text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not_authenticated'; END IF;

  -- Serialize claims within a room: no player can open word N+1 before
  -- word N has committed, even when two players answer at the same instant.
  SELECT * INTO v_room FROM public.ldd_shooter_rooms
   WHERE id = p_room FOR UPDATE;
  IF NOT FOUND OR v_room.status <> 'playing' THEN
    RETURN jsonb_build_object('ok',false,'reason','not_playing');
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.ldd_shooter_players
    WHERE room_id = p_room AND user_id = v_uid
  ) THEN RAISE EXCEPTION 'not_in_room'; END IF;
  IF p_word_index NOT BETWEEN 0 AND 29 THEN
    RETURN jsonb_build_object('ok',false,'reason','invalid_index');
  END IF;

  v_now := clock_timestamp();
  v_word := v_room.word_list -> p_word_index ->> 'en';
  v_sequential := COALESCE(v_room.word_list -> 0 ->> 'sequence_mode','') = 'one_by_one';

  IF v_sequential THEN
    -- Ignore a terminal full stop/question mark for sentence-answer games.
    v_typed_normalized := lower(regexp_replace(
      regexp_replace(trim(coalesce(p_typed,'')),'[[:space:]]+',' ','g'),
      '[.!?]+$','','g'
    ));
    v_word_normalized := lower(regexp_replace(
      regexp_replace(trim(coalesce(v_word,'')),'[[:space:]]+',' ','g'),
      '[.!?]+$','','g'
    ));
    IF v_typed_normalized <> v_word_normalized THEN
      RETURN jsonb_build_object('ok',false,'reason','wrong_word');
    END IF;
    IF v_room.started_at IS NULL OR v_now < v_room.started_at THEN
      RETURN jsonb_build_object('ok',false,'reason','not_started');
    END IF;
    SELECT count(*)::integer INTO v_completed FROM public.ldd_shooter_claims
      WHERE room_id = p_room;
    IF p_word_index <> v_completed THEN
      RETURN jsonb_build_object('ok',false,'reason',
        CASE WHEN p_word_index < v_completed THEN 'already_claimed'
             ELSE 'not_current_word' END);
    END IF;
    -- No expiry: the current word stays available until a correct claim.
  ELSE
    -- Original timing for already-running rooms and older clients.
    IF lower(regexp_replace(trim(coalesce(p_typed,'')),'[[:space:]]+',' ','g'))
       <> lower(trim(v_word)) THEN
      RETURN jsonb_build_object('ok',false,'reason','wrong_word');
    END IF;
    v_spawn := CASE WHEN v_room.created_at >= timestamptz '2026-10-25T08:35:37.582080Z'
                      THEN 4000 ELSE 2200 END;
    v_fall := CASE WHEN v_room.created_at >= timestamptz '2026-10-25T08:35:37.582080Z'
                     THEN 20000 + greatest(0,char_length(trim(v_word))-4)*1200
                     ELSE 12000 END;
    IF v_now < v_room.started_at + (p_word_index*v_spawn*interval '1 millisecond')
       OR v_now > v_room.started_at + (p_word_index*v_spawn*interval '1 millisecond')
                         + v_fall*interval '1 millisecond'
    THEN RETURN jsonb_build_object('ok',false,'reason','expired'); END IF;
  END IF;

  INSERT INTO public.ldd_shooter_claims(room_id,word_index,user_id)
  VALUES(p_room,p_word_index,v_uid)
  ON CONFLICT (room_id,word_index) DO NOTHING;
  GET DIAGNOSTICS v_rows = ROW_COUNT;
  IF v_rows = 0 THEN
    RETURN jsonb_build_object('ok',false,'reason','already_claimed');
  END IF;

  PERFORM public.vocab_race_add_points(v_uid,1);
  UPDATE public.diligence_scores SET diligence_score=diligence_score
    WHERE user_id=v_uid;

  SELECT count(*)::integer INTO v_completed FROM public.ldd_shooter_claims
    WHERE room_id = p_room;
  IF v_completed = 30 THEN
    UPDATE public.ldd_shooter_rooms
    SET status='finished',finished_at=clock_timestamp()
    WHERE id=p_room AND status='playing';
  END IF;
  RETURN jsonb_build_object('ok',true,'index',p_word_index,'winner',v_uid);
END
$function$;

CREATE OR REPLACE FUNCTION public.ldd_shooter_finish(p_room uuid)
RETURNS public.ldd_shooter_rooms
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_room public.ldd_shooter_rooms;
  v_sequential boolean;
  v_completed integer;
  v_deadline timestamptz;
BEGIN
  SELECT * INTO v_room FROM public.ldd_shooter_rooms
    WHERE id=p_room FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'room_not_found'; END IF;
  IF NOT public.ldd_shooter_is_member(p_room) THEN
    RAISE EXCEPTION 'not_in_room';
  END IF;
  IF v_room.status <> 'playing' THEN RETURN v_room; END IF;

  v_sequential := COALESCE(v_room.word_list -> 0 ->> 'sequence_mode','') = 'one_by_one';
  SELECT count(*)::integer INTO v_completed FROM public.ldd_shooter_claims
    WHERE room_id=p_room;
  IF v_sequential THEN
    IF v_completed < 30 THEN RETURN v_room; END IF;
  ELSE
    -- Preserve the prior expiry rule for legacy, time-spawned rooms.
    v_deadline := v_room.started_at +
      (CASE WHEN v_room.created_at >= timestamptz '2026-10-25T08:35:37.582080Z'
       THEN (SELECT max((w.ord-1)*4000+20000+
                   greatest(0,char_length(trim(w.item->>'en'))-4)*1200)
               FROM jsonb_array_elements(v_room.word_list) WITH ORDINALITY AS w(item,ord))
       ELSE 75800 END) * interval '1 millisecond';
    IF v_completed < 30 AND clock_timestamp() < v_deadline THEN RETURN v_room; END IF;
  END IF;

  UPDATE public.ldd_shooter_rooms
    SET status='finished',finished_at=clock_timestamp()
    WHERE id=p_room RETURNING * INTO v_room;
  RETURN v_room;
END
$function$;
