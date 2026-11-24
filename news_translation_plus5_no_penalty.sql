-- LDD English — News translation scoring v2
-- Each good sentence earns +5 diligence points.
-- Weak, incorrect, nonsense and blank translations earn 0 (no negative points).
-- Historical news scores are normalized to this rule as well.

begin;

alter table public.news_translation_scores
  drop constraint if exists news_translation_scores_points_check;

update public.news_translation_scores
set points = case when quality = 'good' then 5 else 0 end
where points is distinct from case when quality = 'good' then 5 else 0 end;

alter table public.news_translation_scores
  add constraint news_translation_scores_points_check
  check (points in (0, 5));

create or replace function public.record_news_translation_score(
  p_user_id uuid,
  p_article_id bigint,
  p_sentence_index integer,
  p_source_sentence text,
  p_student_translation text,
  p_quality text,
  p_points integer,
  p_ai_provider text,
  p_ai_comment text,
  p_ai_translation text
)
returns table(
  awarded_now boolean,
  sentence_points integer,
  news_translation_points integer,
  diligence_score numeric
)
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_inserted boolean := false;
  v_sentence_points integer;
  v_total integer;
  v_diligence numeric;
  v_expected_points integer;
begin
  if p_user_id is null then
    raise exception 'user_required';
  end if;

  if p_quality not in ('good','weak','nonsense','blank') then
    raise exception 'invalid quality';
  end if;

  v_expected_points := case when p_quality = 'good' then 5 else 0 end;
  if p_points is distinct from v_expected_points then
    raise exception 'points_do_not_match_quality';
  end if;

  insert into public.news_translation_scores(
    user_id, article_id, sentence_index, source_sentence, student_translation,
    quality, points, ai_provider, ai_comment, ai_translation
  ) values (
    p_user_id, p_article_id, p_sentence_index, p_source_sentence,
    coalesce(p_student_translation,''),
    p_quality, v_expected_points, p_ai_provider, p_ai_comment, p_ai_translation
  )
  on conflict (user_id, article_id, sentence_index) do nothing
  returning true into v_inserted;

  v_inserted := coalesce(v_inserted, false);

  select nts.points into v_sentence_points
  from public.news_translation_scores nts
  where nts.user_id = p_user_id
    and nts.article_id = p_article_id
    and nts.sentence_index = p_sentence_index;

  select coalesce(sum(nts.points),0)::integer into v_total
  from public.news_translation_scores nts
  where nts.user_id = p_user_id;

  update public.diligence_scores ds
  set news_translation_points = v_total,
      updated_at = now()
  where ds.user_id = p_user_id
  returning ds.diligence_score into v_diligence;

  if not found then
    insert into public.diligence_scores(
      user_id, base_diligence_score, news_translation_points, diligence_score, updated_at
    )
    values (p_user_id, 0, v_total, v_total, now())
    on conflict (user_id) do update
      set news_translation_points = excluded.news_translation_points,
          updated_at = now()
    returning public.diligence_scores.diligence_score into v_diligence;
  end if;

  return query select
    v_inserted,
    coalesce(v_sentence_points, v_expected_points),
    v_total,
    coalesce(v_diligence, 0);
end;
$function$;

-- Keep the existing service_role-only RPC permission.
revoke all on function public.record_news_translation_score(
  uuid,bigint,integer,text,text,text,integer,text,text,text
) from public, anon, authenticated;
grant execute on function public.record_news_translation_score(
  uuid,bigint,integer,text,text,text,integer,text,text,text
) to service_role;

-- Recalculate each learner's translation subtotal; the existing diligence-score
-- trigger recalculates the overall score from all learning sources.
update public.diligence_scores ds
set news_translation_points = coalesce((
  select sum(nts.points)::integer
  from public.news_translation_scores nts
  where nts.user_id = ds.user_id
), 0),
updated_at = now();

commit;
