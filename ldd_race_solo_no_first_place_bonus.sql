-- Race: no automatic first-place bonus in a one-player practice match.
-- Correct/wrong question scoring stays unchanged.
CREATE OR REPLACE FUNCTION public.vocab_race_finish_locked(
 p_room uuid, p_round_result jsonb DEFAULT NULL::jsonb
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $fn$
DECLARE
 v_winner uuid;
 v_rank jsonb;
 v_players int;
BEGIN
 SELECT count(*) INTO v_players FROM public.vocab_race_players WHERE room_id=p_room;
 SELECT user_id INTO v_winner
 FROM public.vocab_race_players
 WHERE room_id=p_room
 ORDER BY score DESC,wrong_count ASC,total_activation_ms ASC,joined_at ASC
 LIMIT 1;
 IF v_winner IS NOT NULL AND v_players>1 THEN
   PERFORM public.vocab_race_add_points(v_winner,20);
 END IF;
 SELECT coalesce(jsonb_agg(jsonb_build_object(
    'user_id',user_id,'display_name',display_name,'slot',slot,
    'score',score,'wrong_count',wrong_count,'total_activation_ms',total_activation_ms
 ) ORDER BY score DESC,wrong_count ASC,total_activation_ms ASC,joined_at ASC),'[]'::jsonb)
 INTO v_rank FROM public.vocab_race_players WHERE room_id=p_room;
 UPDATE public.vocab_race_rooms
 SET status='finished',ended_at=clock_timestamp(),
     last_result=jsonb_build_object('type','finished','at',clock_timestamp(),'winner_user_id',v_winner,
       'round_result',coalesce(p_round_result,'{}'::jsonb),'ranking',v_rank)
 WHERE id=p_room;
END $fn$;