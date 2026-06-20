-- ============================================================
-- HOLOS — Migration 004: Backfill missing profiles
-- ============================================================
-- Problem: All tables (goals, journal, habits, etc.) reference
-- public.profiles(id). The trigger on_auth_user_created auto-creates
-- a profile row on signup, but if the migration was applied AFTER
-- users already registered, their profiles were never created.
-- Result: every INSERT violates the foreign key constraint.
--
-- Fix: backfill public.profiles and public.user_progress for any
-- auth.users row that is missing a profile.
--
-- Run in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. Create missing profile rows for any auth.users without a profile
INSERT INTO public.profiles (id, email, full_name, locale, role)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', SPLIT_PART(au.email, '@', 1)),
  COALESCE(
    CASE WHEN au.raw_user_meta_data->>'locale' IN ('en','ru','he','de')
         THEN au.raw_user_meta_data->>'locale' END,
    'en'
  ),
  COALESCE(
    CASE WHEN au.raw_user_meta_data->>'role' IN ('user','coach','admin')
         THEN au.raw_user_meta_data->>'role' END,
    'user'
  )
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 2. Create missing user_progress rows for any profile without one
INSERT INTO public.user_progress (user_id, total_xp, level)
SELECT p.id, 0, 1
FROM public.profiles p
LEFT JOIN public.user_progress up ON up.user_id = p.id
WHERE up.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;

-- 3. Verify — should both return 0 rows after successful run
-- SELECT au.id, au.email FROM auth.users au LEFT JOIN public.profiles p ON p.id = au.id WHERE p.id IS NULL;
-- SELECT p.id FROM public.profiles p LEFT JOIN public.user_progress up ON up.user_id = p.id WHERE up.user_id IS NULL;
