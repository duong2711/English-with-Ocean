-- Allow dedicated single-player rooms while preserving 4-player maximum.
ALTER TABLE public.ldd_shooter_rooms
 DROP CONSTRAINT IF EXISTS ldd_shooter_rooms_capacity_check;
ALTER TABLE public.ldd_shooter_rooms
 ADD CONSTRAINT ldd_shooter_rooms_capacity_check CHECK (capacity BETWEEN 1 AND 4);
