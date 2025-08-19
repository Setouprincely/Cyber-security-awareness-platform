import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(pw)) return 'Password must contain an uppercase letter'
  if (!/[a-z]/.test(pw)) return 'Password must contain a lowercase letter'
  if (!/[0-9]/.test(pw)) return 'Password must contain a number'
  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(pw)) return 'Password must contain a special character'
  return null
}

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'currentPassword and newPassword are required' }, { status: 400 })
    }

    const validationError = validatePassword(newPassword)
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user }, error } = await supabase.auth.getUser()
    if (!user || error) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Reauthenticate by signing in
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: user.email!, password: currentPassword })
    if (signInError) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 400 })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


