import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Fallback prevents build-time throw when env vars aren't set in CI/Vercel.
  // Auth calls will simply return errors at runtime without real credentials.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'
  )
}
