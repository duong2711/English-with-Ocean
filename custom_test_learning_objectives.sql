-- Require a category and a specific objective for each scored leaf of a new private test.
create or replace function public.ctest_has_learning_objectives(sections jsonb)
returns boolean language sql immutable set search_path = pg_catalog as $$
  with recursive questions(q) as (
    select question from jsonb_array_elements(sections) section,
      lateral jsonb_array_elements(section->'questions') question
    union all
    select child from questions cross join lateral jsonb_array_elements(
      case when q->>'type' in ('reading','listening') then q->'sub_questions'
           when q->>'type' = 'mixed' then q->'parts' else '[]'::jsonb end
    ) child
  )
  select coalesce(bool_and(case when q->>'type' in ('reading','listening','mixed')
      then jsonb_array_length(coalesce(case when q->>'type' = 'mixed' then q->'parts' else q->'sub_questions' end,'[]'::jsonb)) > 0
      else coalesce(q#>>'{skill,category}','') in ('Ngữ pháp','Từ vựng','Đọc hiểu','Viết câu','Phát âm','Nghe hiểu','Giao tiếp','Khác')
       and jsonb_typeof(q#>'{skill,topic}') = 'string' and length(trim(coalesce(q#>>'{skill,topic}',''))) > 0 end), false)
  from questions;
$$;
create or replace function public.ctest_require_learning_objectives()
returns trigger language plpgsql set search_path = pg_catalog as $$
begin
  if new.status <> 'published' then return new; end if;
  if tg_op = 'UPDATE' then
    if old.status = 'published' and (new.sections = old.sections or not public.ctest_has_learning_objectives(old.sections)) then
      return new;
    end if;
  end if;
  if not public.ctest_has_learning_objectives(new.sections) then
    raise exception 'Mỗi câu cần có phạm trù và điểm kiến thức trước khi giao bài.' using errcode = '23514';
  end if;
  return new;
end;
$$;
create trigger ctest_require_learning_objectives before insert or update of sections,status on public.custom_tests
for each row execute function public.ctest_require_learning_objectives();
