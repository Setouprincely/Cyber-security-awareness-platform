import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Supabase currently does not support global sign-out per user via anon key.
    // As a workaround, rotate refresh token by updating the password or sign out current session.
    const { error } = await supabase.auth.signOut()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


