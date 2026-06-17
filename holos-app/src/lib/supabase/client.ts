import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Fallback prevents build-time throw when env vars aren't set in CI/Vercel.
  // Auth calls will simply return errors at ru