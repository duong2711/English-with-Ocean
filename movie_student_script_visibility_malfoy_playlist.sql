-- LDD English: student movies require a published script; teacher still sees scriptless movies.
-- Regenerated from the deployed function to keep GitHub and Supabase in sync.
-- SECURITY DEFINER retains the existing authenticated, redacted lesson response.
CREATE OR REPLACE FUNCTION public.movie_list_lessons()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE v_lessons jsonb;
        v_is_teacher boolean := false;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Login required'; END IF;
 SELECT EXISTS(SELECT 1 FROM auth.users u WHERE u.id = auth.uid() AND lower(u.email) = 'lddbaiu@gmail.com') INTO v_is_teacher;
 SELECT COALESCE(pg_catalog.jsonb_agg(
   pg_catalog.jsonb_build_object(
     'id',m.id,'title',m.title,'video_url',m.video_url,'provider',m.provider,
     'thumbnail_url',m.thumbnail_url,'playlist_name',m.playlist_name,
     'playlist_position',m.playlist_position,
     'segments',(
       SELECT COALESCE(pg_catalog.jsonb_agg(
         pg_catalog.jsonb_set(
           s.value,'{text}',
           pg_catalog.to_jsonb(pg_catalog.regexp_replace(s.value->>'text','\{[^{}]+\}', '{_____}', 'g'))
         ) ORDER BY s.ordinality
       ),'[]'::jsonb)
       FROM pg_catalog.jsonb_array_elements(m.segments) WITH ORDINALITY AS s(value,ordinality)
     )
   ) ORDER BY m.created_at DESC
 ),'[]'::jsonb) INTO v_lessons
 FROM (SELECT * FROM public.movie_lessons WHERE published AND (v_is_teacher OR jsonb_array_length(segments) > 0) ORDER BY created_at DESC LIMIT 150) m;
 RETURN v_lessons;
END;
$function$

-- The Malfoy Paradox: only the 3 active episodes belong to the ordered playlist.
-- The unpublished legacy Part Two archive stays untouched.
UPDATE public.movie_lessons
 SET playlist_name='The Malfoy Paradox', playlist_position=1
 WHERE title='The Malfoy Paradox - Part 1' AND published AND jsonb_array_length(segments)>0;
UPDATE public.movie_lessons
 SET playlist_name='The Malfoy Paradox', playlist_position=2
 WHERE title='The Malfoy Paradox - Part 2' AND published AND jsonb_array_length(segments)>0;
UPDATE public.movie_lessons
 SET playlist_name='The Malfoy Paradox', playlist_position=3
 WHERE title='The Malfoy Paradox - Part 3' AND published AND jsonb_array_length(segments)>0;
