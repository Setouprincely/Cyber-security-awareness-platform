import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { trainingModuleSchema } from '@/lib/validations'

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()

    const { data: modules, error } = await supabase
      .from('training_modules')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // Attach per-user progress if logged in
    let progressMap: Record<string, any> = {}
    if (user) {
      const { data: progress } = await supabase
        .from('module_progress')
        .select('*')
        .eq('user_id', user.id)
      for (const p of progress || []) progressMap[p.module_id] = p
    }

    return NextResponse.json({ modules: modules || [], progress: progressMap })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = trainingModuleSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Verify admin
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data, error } = await supabase.from('training_modules').insert([{
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      difficulty: parsed.data.difficulty,
      estimated_duration: parsed.data.estimatedDuration,
      content: JSON.parse(parsed.data.content),
      is_published: parsed.data.isPublished ?? true,
      created_by: user.id,
    }]).select('*').single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ module: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


