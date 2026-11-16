-- LDD English: avoid an unnecessary six-second stall after each race round.
-- This migration is deployed to Supabase as game_fast_intermission_20261116.
-- Keep all existing scoring, checks, signatures and permissions untouched.
DO $fast_rounds$
DECLARE
    v_name text;
    v_source text;
BEGIN
    FOREACH v_name IN ARRAY ARRAY[
        'vocab_race_claim_lane',
        'vocab_race_resolve_obstacle',
        'vocab_race_resolve_timeout'
    ]
    LOOP
        SELECT pg_get_functiondef(p.oid) INTO STRICT v_source
        FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname = 'public' AND p.proname = v_name;
        IF position('interval ''6 seconds''' IN v_source) = 0 THEN
            RAISE EXCEPTION 'Expected six-second pause not found in %', v_name;
        END IF;
        EXECUTE replace(v_source, 'interval ''6 seconds''', 'interval ''1.2 seconds''');
    END LOOP;
END
$fast_rounds$;
