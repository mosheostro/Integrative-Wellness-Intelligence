-- ============================================================
-- HOLOS — Fix v2: Schema–UI alignment
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. journal_entries (new table) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content        text NOT NULL,
  mood           integer CHECK (mood BETWEEN 1 AND 5),
  dimension_tags text[] NOT NULL DEFAULT '{}',
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "own_journal" ON public.journal_entries FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── 2. goals: add dimension + progress, relax category ───────
ALTER TABLE public.goals
  ADD COLUMN IF NOT EXISTS dimension text NOT NULL DEFAULT 'Energy',
  ADD COLUMN IF NOT EXISTS progress  integer NOT NULL DEFAULT 0;

-- category was NOT NULL but the UI doesn't use it — make nullable
ALTER TABLE public.goals ALTER COLUMN category DROP NOT NULL;
ALTER TABLE public.goals ALTER COLUMN category SET DEFAULT '';

-- ── 3. habits: add dimension, streak, completed_today ─────────
ALTER TABLE public.habits
  ADD COLUMN IF NOT EXISTS dimension       text NOT NULL DEFAULT 'Energy',
  ADD COLUMN IF NOT EXISTS streak          integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS completed_today boolean NOT NULL DEFAULT false;

-- Add 'weekdays' to frequency options (UI sends it)
ALTER TABLE public.habits DROP CONSTRAINT IF EXISTS habits_frequency_check;
ALTER TABLE public.habits ADD CONSTRAINT habits_frequency_check
  CHECK (frequency IN ('daily', 'weekly', 'monthly', 'weekdays'));

-- ── 4. profiles: add 'de' to locale constraint ───────────────
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_locale_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_locale_check
  CHECK (locale IN ('en', 'ru', 'he', 'de'));

-- ── Done ─────────────────────────────────────────────────────
-- After running this migration:
-- 1. Add SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables
--    (Supabase Dashboard → Project Settings → API → service_role key)
-- 2. Push the updated code via git
