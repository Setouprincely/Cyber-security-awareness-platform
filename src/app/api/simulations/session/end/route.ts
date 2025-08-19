import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
	try {
		const { sessionId, success, timeTakenMs } = await request.json()
		if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 })

		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
		const {
			data: { user },
		} = await supabase.auth.getUser()
		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const { error } = await supabase
			.from('simulation_sessions')
			.update({ ended_at: new Date().toISOString(), success: !!success, time_taken_ms: timeTakenMs ?? null })
			.eq('id', sessionId)
			.eq('user_id', user.id)

		if (error) return NextResponse.json({ error: error.message }, { status: 400 })
		return NextResponse.json({ ok: true })
	} catch (error: any) {
		return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
	}
}


