-- ============================================================================
-- LDD English — Gán khối lớp cho tài khoản học viên
-- Chạy file này 1 lần trong Supabase Dashboard -> SQL Editor.
-- NULL = giáo viên chưa gán khối lớp.
-- ============================================================================

create table if not exists public.student_grade_assignments (
    email text primary key,
    user_id uuid null,
    display_name text null,
    grade_level smallint null,
    updated_at timestamptz not null default now(),
    updated_by text null,
    constraint student_grade_assignments_grade_check
        check (grade_level is null or grade_level between 1 and 12)
);

create index if not exists student_grade_assignments_user_id_idx
    on public.student_grade_assignments(user_id);

alter table public.student_grade_assignments enable row level security;

-- Học viên chỉ được đọc đúng dòng của email đang đăng nhập.
drop policy if exists "student can read own grade assignment" on public.student_grade_assignments;
create policy "student can read own grade assignment"
on public.student_grade_assignments
for select
to authenticated
using (
    lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'lddbaiu@gmail.com'
);

-- Học viên được tự tạo dòng hồ sơ lần đầu, nhưng BẮT BUỘC grade_level = NULL.
-- Vì vậy học viên không thể tự gán lớp cho mình bằng request trực tiếp.
drop policy if exists "student can register own grade row" on public.student_grade_assignments;
create policy "student can register own grade row"
on public.student_grade_assignments
for insert
to authenticated
with check (
    (
        lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        and grade_level is null
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'lddbaiu@gmail.com'
);

-- Chỉ giáo viên được sửa khối lớp / thông tin dòng của học viên.
drop policy if exists "teacher can update grade assignments" on public.student_grade_assignments;
create policy "teacher can update grade assignments"
on public.student_grade_assignments
for update
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'lddbaiu@gmail.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'lddbaiu@gmail.com');

-- Chỉ giáo viên được xoá dòng nếu cần dọn dữ liệu.
drop policy if exists "teacher can delete grade assignments" on public.student_grade_assignments;
create policy "teacher can delete grade assignments"
on public.student_grade_assignments
for delete
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'lddbaiu@gmail.com');

comment on table public.student_grade_assignments is
    'Khối lớp do giáo viên gán cho học viên. Dùng làm giá trị mặc định cho các filter lớp và countdown THCS/THPT.';
comment on column public.student_grade_assignments.grade_level is
    '1-12; NULL nghĩa là chưa gán / để trống.';
