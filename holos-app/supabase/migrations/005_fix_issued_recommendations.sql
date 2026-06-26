-- ============================================================
-- HOLOS — Migration 005: Fix issued_recommendations schema
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Add created_at column (mirrors issued_at) for API compatibility
ALTER TABLE public.issued_recommendations
  ADD COLUMN IF NOT EXISTS created_at timestamptz;

-- 2. Backfill from issued_at for existing rows
UPDATE public.issued_recommendations
  SET created_at = issued_at
  WHERE created_at IS NULL;

-- 3. Set default so new rows always get a value
ALTER TABLE public.issued_recommendations
  ALTER COLUMN created_at SET DEFAULT now();

-- 4. Make NOT NULL (safe after backfill)
ALTER TABLE public.issued_recommendations
  ALTER COLUMN created_at SET NOT NULL;

-- 5. Ensure rec_id has a safe default so NOT NULL is never violated
--    (assessment route now generates a fallback, but belt-and-suspenders)
-- No schema change needed — the NOT NULL was always there; the code is fixed.

-- ============================================================
-- After running this migration:
-- git add + commit + push to deploy the code fixes alongside it
-- ============================================================
