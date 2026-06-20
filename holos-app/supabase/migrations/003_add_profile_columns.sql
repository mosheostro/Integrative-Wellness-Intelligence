-- ============================================================
-- HOLOS — Migration 003: Add extended profile columns
-- Run in Supabase Dashboard → SQL Editor
-- ============================================================

-- ── profiles: add bio, location, date_of_birth, preferred_framework ──
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS bio                  text,
  ADD COLUMN IF NOT EXISTS location             text,
  ADD COLUMN IF NOT EXISTS date_of_birth        date,
  ADD COLUMN IF NOT EXISTS preferred_framework  text NOT NULL DEFAULT 'swarga';

-- ── Done ─────────────────────────────────────────────────────
-- After running this migration the Profile page can save and
-- load bio / location / date_of_birth / preferred_framework.
