import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: NextRequest) {
	try {
		const { sessionId, scenarioType, action, meta } = await request.json()
		if (!sessionId || !scenarioType || !action) {
			return NextResponse.json({ error: 'sessionId, scenarioType and action are required' }, { status: 400 })
		}

		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser()
		if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const id = crypto.randomUUID()
		const { error: insertError } = await supabase.from('phishing_events').insert([
			{
				id,
				session_id: sessionId,
				user_id: user.id,
				scenario_type: scenarioType,
				action,
				meta: meta ?? null,
			},
		])

		if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 })
		return NextResponse.json({ ok: true, id })
	} catch (error: any) {
		return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
	}
}


