import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

function toCsv(rows: Array<Record<string, any>>): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const esc = (v: any) => {
    const s = v === null || v === undefined ? '' : String(v)
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"'
    }
    return s
  }
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push(headers.map(h => esc(r[h])).join(','))
  }
  return lines.join('\n')
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Admin check
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || profile.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const [{ data: sessions }, { data: events }, { data: progress }, { data: attempts }] = await Promise.all([
      supabase.from('simulation_sessions').select('id,user_id,scenario_type,started_at,ended_at,success,time_taken_ms'),
      supabase.from('phishing_events').select('id,session_id,user_id,scenario_type,action,created_at'),
      supabase.from('module_progress').select('user_id,module_id,progress,completed,updated_at'),
      supabase.from('quiz_attempts').select('user_id,quiz_id,score,passed,completed_at'),
    ])

    const blocks: string[] = []
    if (sessions && sessions.length) {
      blocks.push('# Simulation Sessions')
      blocks.push(toCsv(sessions as any))
    }
    if (events && events.length) {
      blocks.push('# Phishing Events')
      blocks.push(toCsv(events as any))
    }
    if (progress && progress.length) {
      blocks.push('# Module Progress')
      blocks.push(toCsv(progress as any))
    }
    if (attempts && attempts.length) {
      blocks.push('# Quiz Attempts')
      blocks.push(toCsv(attempts as any))
    }

    const csv = blocks.join('\n')
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="analytics_export_${Date.now()}.csv"`
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


