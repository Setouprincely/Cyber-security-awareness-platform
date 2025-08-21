import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Normalize environment variables to avoid issues with trailing spaces or undefined values
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim()

// Do not throw on the client: throwing here can break hydration and freeze navigation
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Supabase configuration is missing (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY). Auth features may be disabled.'
  )
}

// Pass explicit values to guard against trailing whitespace and ensure predictable behavior
export const supabase = createClientComponentClient({
  supabaseUrl: supabaseUrl || undefined,
  supabaseKey: supabaseAnonKey || undefined,
})