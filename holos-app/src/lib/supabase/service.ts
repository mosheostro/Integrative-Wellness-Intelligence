import { createClient } from '@supabase/supabase-js'

// Service-role Supabase client — bypasses RLS.
// Use ONLY in server-side API routes, never in browser/client code.
// Requires SUPABASE_SERVICE_ROLE_KEY env var (Supabase → Project Settings → API).
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null   // gracefully fall back to anon client if key not set
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
