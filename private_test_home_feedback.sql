create schema if not exists ldd_test_analytics;

create or replace function ldd_test_analytics.normal_answer(value text)
returns text language sql immutable set search_path = pg_catalog as $$
 select lower(regexp_replace(trim(regexp_replace(trim(coalesce(value,'')), '[.]+$', '')), '[[:space:]]+', ' ', 'g'))
$$;

-- Return one observation per scorable item, preserving teacher decisions and composite item keys.
create or replace function ldd_test_analytics.items(sections jsonb, answers jsonb, overrides jsonb)
returns table(category text, topic text, correct boolean)
language sql immutable set search_path = pg_catalog as $$
with recursive question(q,k) as (
 select v, (s->>'id') || ':' || (v->>'id') from jsonb_array_elements(sections) s,
 lateral jsonb_array_elements(s->'questions') v
 union all
 select child, k || case when q->>'type'='mixed' then ':part:' else ':sub:' end || (i-1)
 from question cross join lateral jsonb_array_elements(
 case when q->>'type' in ('reading','listening') then q->'sub_questions'
      when q->>'type'='mixed' then coalesce(q->'parts',jsonb_build_array(
        jsonb_build_object('type','fill_blank','html',q->>'html'),
        jsonb_build_object('type','essay','prompt',q->>'essay_prompt','answer',q->>'essay_answer')))
      else '[]'::jsonb end) with ordinality c(child,i)
), leaf as (
 select q,k,case
 when coalesce(q->>'type','mcq') in ('mcq','mcq_multi') and jsonb_typeof(q->'options')='array'
 and jsonb_array_length(q->'options')>=2
 and not exists(select 1 from jsonb_array_elements_text(q->'options') opt
    where trim(regexp_replace(replace(opt,'&nbsp;',' '),'<[^>]*>','','g'))<>'' or opt~*'<(img|svg|video|audio)\y')
 and regexp_replace(q->>'prompt','<[^>]*>',' ','g')~*'^\s*([0-9]+[.)]\s*)?(rewrite (the|these|each|following)|arrange .*words|put .*words .*order|combine .*sentences|make .*sentence|write .*sentence)' then 'manual'
 when coalesce(q->>'type','mcq')='mcq' and not q?'options' and (q?'answer' or q->>'manual_grading'='true') then 'essay'
 when q->>'type' in ('writing','written','short_answer','free_text','open_text','open_ended','text','paragraph','essay_question','tu_luan','tuluan','sentence_ordering','sentence_rewriting') then case when q->>'manual_grading'='false' then 'essay' else 'manual' end
 else coalesce(q->>'type','mcq') end typ from question
), parts as (
 select q,k,case typ
 when 'mcq' then coalesce(answers->>k=q->>'correct',false)
 when 'mcq_multi' then array(select distinct v from jsonb_array_elements_text(case when jsonb_typeof(answers->k)='array' then answers->k else '[]'::jsonb end) v order by v)
 =array(select distinct v from jsonb_array_elements_text(q->'correct') v order by v)
 when 'reorder' then coalesce(answers->(k||':order')=(select jsonb_agg(i-1 order by i) from generate_series(1,cardinality(regexp_split_to_array(trim(q->>'sentence'),'[[:space:]]+'))) i),false)
 when 'essay' then case when q->>'manual_grading'='true' or nullif(trim(q->>'answer'),'') is null then null else ldd_test_analytics.normal_answer(answers->>k)=ldd_test_analytics.normal_answer(q->>'answer') end
 end ok from leaf where typ in ('mcq','mcq_multi','essay','manual','reorder')
 union all
 select q,k||':pair:'||(i-1),coalesce((answers->(k||':pairs')->>((i-1)::text))=(q->'correct_pairs'->>((i-1)::int)),false)
 from leaf cross join lateral jsonb_array_elements(q->'left') with ordinality x(v,i) where typ='matching'
 union all
 select q,k||':blank:'||(i-1),ldd_test_analytics.normal_answer(answers->>(k||':blank:'||(i-1)))=
 ldd_test_analytics.normal_answer(replace(replace(replace(replace(replace(replace(regexp_replace(m[2],'<[^>]*>','','g'),'&nbsp;',' '),'&amp;','&'),'&#39;',''''),'&quot;','"'),'&lt;','<'),'&gt;','>'))
 from leaf cross join lateral regexp_matches(q->>'html','(?:<(b|strong)(?:[[:space:]][^>]*)?>(.*?)</\1[[:space:]]*>){1,1}?','gis') with ordinality x(m,i)
 where typ in ('fill_blank','wordbank')
), scored as (
 select q,case overrides->>k when 'excluded' then null when 'force_correct' then true when 'force_wrong' then false else ok end hit from parts
)
select q#>>'{skill,category}', q#>>'{skill,topic}', hit from scored where hit is not null
$$;

-- Only aggregate observations from the signed-in learner's submitted work.
create or replace function public.my_private_test_feedback()
returns table(category text, topic text, correct_count bigint, item_count bigint)
language sql stable security definer set search_path = pg_catalog as $$
 with attempts as (
 select distinct on (s.test_id) s.test_id,s.answers,s.teacher_overrides,s.score_correct,s.score_total
 from public.custom_test_submissions s
 where s.student_email=(select auth.jwt()->>'email') and s.status='submitted' and s.score_total is not null
 order by s.test_id,s.submitted_at desc nulls last,s.id desc
 ), observations as (
 select a.test_id,a.score_correct,a.score_total,x.*,
        count(*) over(partition by a.test_id) as graded,
        count(*) filter(where x.correct) over(partition by a.test_id) as hits
 from attempts a join public.custom_tests t on t.id=a.test_id
 cross join lateral ldd_test_analytics.items(t.sections,a.answers,a.teacher_overrides) x
 )
 select o.category,o.topic,count(*) filter(where o.correct),count(*)
 from observations o where o.graded=o.score_total and o.hits=o.score_correct and nullif(o.topic,'') is not null
 group by o.category,o.topic
$$;
revoke all on function public.my_private_test_feedback() from public, anon;
grant execute on function public.my_private_test_feedback() to authenticated;
