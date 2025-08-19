import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Admin only
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { data: modules } = await supabase.from('training_modules').select('id, category')
    const { data: progress } = await supabase.from('module_progress').select('module_id, completed, progress')
    const { data: attempts } = await supabase.from('quiz_attempts').select('score, passed, quiz_id')
    const { data: quizzes } = await supabase.from('quizzes').select('id, module_id, is_final')

    const byModule: Record<string, any> = {}
    for (const m of modules || []) {
      byModule[m.id] = { total: 0, completed: 0, avgProgress: 0, category: m.category }
    }
    for (const p of progress || []) {
      if (!byModule[p.module_id]) continue
      byModule[p.module_id].total += 1
      byModule[p.module_id].completed += p.completed ? 1 : 0
      byModule[p.module_id].avgProgress += p.progress || 0
    }
    const moduleStats = Object.entries(byModule).map(([moduleId, s]) => ({
      moduleId,
      category: s.category,
      completionRate: s.total ? Math.round((s.completed / s.total) * 100) : 0,
      avgProgress: s.total ? Math.round(s.avgProgress / s.total) : 0,
    }))

    const finalQuiz = (quizzes || []).find(q => q.is_final)
    const finalAttempts = (attempts || []).filter(a => !finalQuiz ? false : a.quiz_id === finalQuiz.id)
    const avgScore = finalAttempts.length ? Math.round(finalAttempts.reduce((a,b)=>a+b.score,0)/finalAttempts.length) : 0
    const passRate = finalAttempts.length ? Math.round(finalAttempts.filter(a=>a.passed).length / finalAttempts.length * 100) : 0

    return NextResponse.json({ moduleStats, final: { avgScore, passRate, attempts: finalAttempts.length } })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


