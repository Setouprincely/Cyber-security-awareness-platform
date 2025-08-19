import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { error } = await supabase
      .from('profiles')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


