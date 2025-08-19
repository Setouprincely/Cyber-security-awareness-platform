import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

type ScenarioType = 'EMAIL' | 'SMS' | 'WEBSITE'

function randomItem<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)]
}

function generateEmailVariation() {
	const spoofDomains = ['companny.com', 'secure-company.co', 'company-support.com', 'c0mpany.com']
	const senderNames = ['IT Support', 'Security Team', 'Admin Desk', 'HR Department']
	const subjects = [
		'URGENT: Password Expiring Today',
		'Action Required: Account Verification',
		'Restricted Access Notice',
		'New Security Policy Update',
	]
	const domain = randomItem(spoofDomains)
	const sender = `${randomItem(senderNames)} <no-reply@${domain}>`
	const displayDomain = 'company.com'
	const linkHost = `secure-${domain}`
	return {
		sender,
		subject: randomItem(subjects),
		preview: 'Please update your credentials to avoid account lockout.',
		body:
			`We detected unusual sign-in activity. To keep your account secure, update your password using the link below.`,
		ctaText: 'Update Password',
		ctaUrl: `https://${linkHost}/reset`,
		cues: [
			`Sender domain is misspelled: ${domain} vs ${displayDomain}`,
			`Urgent language pressuring quick action`,
			`Hover over link shows domain not owned by company: ${linkHost}`,
		],
	}
}

function generateSmsVariation() {
	const banks = ['Zenith Bank', 'GTBank', 'UBA', 'Access Bank']
	const bank = randomItem(banks)
	const badHost = ['ver1fy-secure.net', 'account-checkup.org', 'support-portal.help'][
		Math.floor(Math.random() * 3)
	]
	return {
		sender: `${bank} Alerts`,
		message: `${bank}: Your account will be suspended due to suspicious activity. Verify now: https://${badHost}/login`,
		badUrl: `https://${badHost}/login`,
		cues: [
			`Generic sender name and link not matching official ${bank} domain`,
			`Urgent threat of suspension`,
		],
	}
}

function generateWebsiteVariation() {
	const brands = [
		{ name: 'Secure Portal', real: 'portal.company.com', fake: 'portal-company-verify.com' },
		{ name: 'HR Cloud', real: 'hr.company.com', fake: 'company-hr-login.net' },
		{ name: 'Banking', real: 'online.bank.com', fake: 'secure-online-bank.help' },
	]
	const brand = randomItem(brands)
	return {
		title: `${brand.name} Login`,
		realDomain: brand.real,
		fakeDomain: brand.fake,
		cues: [
			`Domain looks similar but is not owned by the organization: ${brand.fake}`,
			`No HTTPS lock icon or invalid certificate on real sites (simulated)`,
		],
	}
}

export async function POST(request: NextRequest) {
	try {
		let preferredType: ScenarioType | null = null
		try {
			const body = await request.json().catch(() => null)
			if (body && (body.scenarioType === 'EMAIL' || body.scenarioType === 'SMS' || body.scenarioType === 'WEBSITE')) {
				preferredType = body.scenarioType
			}
		} catch {}
		const cookieStore = cookies()
		const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser()
		if (userError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const scenarioType: ScenarioType = preferredType || randomItem(['EMAIL', 'SMS', 'WEBSITE'])
		const variation =
			scenarioType === 'EMAIL'
				? generateEmailVariation()
				: scenarioType === 'SMS'
				? generateSmsVariation()
				: generateWebsiteVariation()

		const id = crypto.randomUUID()
		const { error: insertError } = await supabase.from('simulation_sessions').insert([
			{
				id,
				user_id: user.id,
				scenario_type: scenarioType,
				variation,
			},
		])
		if (insertError) {
			return NextResponse.json({ error: insertError.message }, { status: 400 })
		}

		return NextResponse.json({ sessionId: id, scenarioType, variation })
	} catch (error: any) {
		return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
	}
}


