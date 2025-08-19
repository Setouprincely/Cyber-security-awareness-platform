import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { quizSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const moduleId = request.nextUrl.searchParams.get('moduleId')
    const isFinal = request.nextUrl.searchParams.get('final')

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    let query = supabase.from('quizzes').select('*, quiz_questions(*)')
    if (moduleId) query = query.eq('module_id', moduleId)
    if (isFinal === 'true') query = query.eq('is_final', true)
    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // Randomize questions order for anti-cheat
    const randomized = (data || []).map(q => ({
      ...q,
      quiz_questions: (q.quiz_questions || []).sort(() => Math.random() - 0.5),
    }))

    return NextResponse.json({ quizzes: randomized })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = quizSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { data, error } = await supabase.from('quizzes').insert([{ 
      module_id: body.moduleId ?? null,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      passing_score: parsed.data.passingScore,
      time_limit: parsed.data.timeLimit ?? null,
      is_final: !!body.isFinal,
    }]).select('*').single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ quiz: data })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


