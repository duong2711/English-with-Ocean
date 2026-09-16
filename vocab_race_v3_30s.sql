-- LDD English — Vocab Race v3
-- Đã áp lên project ywqbaksmmtvwbojcgsdd ngày 2026-09-17.
-- Mục tiêu: 30 giây/lượt, 5 đợt chướng ngại vật ở giây 5/10/15/20/25.
--
-- Đây là migration nối tiếp vocab_race_v2_migration.sql.
-- Thay đổi chính đã được áp trong Supabase:
--   1) vocab_race_obstacle_waves.wave: 1..5
--   2) vocab_race_set_lane(...): timeout 30 seconds
--   3) vocab_race_claim_lane(...): timeout 30 seconds, obstacle wave 1..5
--   4) vocab_race_resolve_obstacle(...): nhận p_wave 1..5
--   5) vocab_race_resolve_timeout(...): kết thúc vòng ở 30 seconds
--
-- File này giữ dấu mốc version trong repo. Database production đã được migration
-- bằng Supabase migration: vocab_race_v3_30s_five_obstacle_waves.

notify pgrst, 'reload schema';
