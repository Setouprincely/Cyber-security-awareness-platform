import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: NextRequest) {
	try {
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
		const {
			data: { user },
		} = await supabase.auth.getUser()
		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		// Check admin
		const { data: profile } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', user.id)
			.single()
		if (!profile || profile.role !== 'ADMIN') {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		// Aggregate stats
		const { data: sessions } = await supabase
			.from('simulation_sessions')
			.select('id, user_id, scenario_type, started_at, ended_at, success, time_taken_ms')

		const { data: events } = await supabase
			.from('phishing_events')
			.select('id, session_id, user_id, scenario_type, action, created_at')

		const totals = { totalSessions: 0, successRate: 0, avgTimeMs: 0, clickRate: 0, reportRate: 0 }
		if (sessions) {
			totals.totalSessions = sessions.length
			const successes = sessions.filter(s => s.success).length
			totals.successRate = sessions.length ? Math.round((successes / sessions.length) * 100) : 0
			const times = sessions.map(s => s.time_taken_ms || 0).filter(Boolean)
			totals.avgTimeMs = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0
		}
		if (events) {
			const clicks = events.filter(e => e.action === 'LINK_CLICKED' || e.action === 'FORM_SUBMITTED').length
			const reports = events.filter(e => e.action === 'REPORTED_PHISHING').length
			const bySession = new Set(events.map(e => e.session_id))
			totals.clickRate = bySession.size ? Math.round((clicks / bySession.size) * 100) : 0
			totals.reportRate = bySession.size ? Math.round((reports / bySession.size) * 100) : 0
		}

		// Breakdown per scenario
		const scenarioTypes: Array<'EMAIL' | 'SMS' | 'WEBSITE'> = ['EMAIL', 'SMS', 'WEBSITE']
		const breakdown = scenarioTypes.map(type => {
			const s = (sessions || []).filter(x => x.scenario_type === type)
			const ev = (events || []).filter(x => x.scenario_type === type)
			const clicks = ev.filter(e => e.action === 'LINK_CLICKED' || e.action === 'FORM_SUBMITTED').length
			const reports = ev.filter(e => e.action === 'REPORTED_PHISHING').length
			return {
				type,
				sessions: s.length,
				clickRate: s.length ? Math.round((clicks / s.length) * 100) : 0,
				reportRate: s.length ? Math.round((reports / s.length) * 100) : 0,
			}
		})

		return NextResponse.json({ totals, breakdown })
	} catch (error: any) {
		return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
	}
}


