import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ progress: data || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { moduleId, progress, completed, currentLesson } = await request.json()
    if (!moduleId) return NextResponse.json({ error: 'moduleId is required' }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { error } = await supabase
      .from('module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        progress: typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined,
        completed: !!completed,
        current_lesson: typeof currentLesson === 'number' ? currentLesson : undefined,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id, module_id' })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


