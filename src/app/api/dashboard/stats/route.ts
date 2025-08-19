import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Parallel fetches
    const [modulesRes, progressRes, sessionsRes, eventsRes, attemptsRes] = await Promise.all([
      supabase.from('training_modules').select('id'),
      supabase.from('module_progress').select('completed, progress').eq('user_id', user.id),
      supabase.from('simulation_sessions').select('success, time_taken_ms, started_at').eq('user_id', user.id),
      supabase.from('phishing_events').select('action').eq('user_id', user.id),
      supabase.from('quiz_attempts').select('score, passed').eq('user_id', user.id),
    ])

    const totalModules = (modulesRes.data || []).length
    const completedModules = (progressRes.data || []).filter(p => p.completed).length

    const totalPhishingTests = (sessionsRes.data || []).length
    const phishingTestsPassed = (sessionsRes.data || []).filter(s => s.success).length

    const scores = (attemptsRes.data || []).map(a => a.score || 0)
    const averageScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

    const totalMs = (sessionsRes.data || []).map(s => s.time_taken_ms || 0).filter(Boolean).reduce((a, b) => a + b, 0)
    const hours = Math.floor(totalMs / (1000 * 60 * 60))
    const minutes = Math.round((totalMs % (1000 * 60 * 60)) / (1000 * 60))
    const timeSpent = `${hours}h${minutes ? ' ' + minutes + 'm' : ''}`

    const threatsBlocked = (eventsRes.data || []).filter(e => e.action === 'REPORTED_PHISHING').length

    // Simple composite security score
    const passRate = totalPhishingTests ? Math.round((phishingTestsPassed / totalPhishingTests) * 100) : 0
    const securityScore = Math.round((passRate + averageScore) / 2)

    // Weekly progress approximation
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const sessionsThisWeek = (sessionsRes.data || []).filter(s => new Date(s.started_at) >= oneWeekAgo)
    const weeklyProgress = {
      modules: Math.max(0, completedModules - Math.max(0, completedModules - 2)),
      threats: sessionsThisWeek.length,
      scoreImprovement: 0,
      timeThisWeek: '—'
    }

    return NextResponse.json({
      modulesCompleted: completedModules,
      totalModules,
      phishingTestsPassed,
      totalPhishingTests,
      averageScore,
      timeSpent,
      securityScore,
      threatsBlocked,
      weeklyProgress,
    })
  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}