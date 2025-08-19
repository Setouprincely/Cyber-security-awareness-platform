'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Mail, Smartphone, Globe, CheckCircle, AlertTriangle } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'

type ScenarioType = 'EMAIL' | 'SMS' | 'WEBSITE'

interface EmailVariation {
  sender: string
  subject: string
  preview: string
  body: string
  ctaText: string
  ctaUrl: string
  cues: string[]
}

interface SmsVariation {
  sender: string
  message: string
  badUrl: string
  cues: string[]
}

interface WebsiteVariation {
  title: string
  realDomain: string
  fakeDomain: string
  cues: string[]
}

type Variation = EmailVariation | SmsVariation | WebsiteVariation

function randomItem<T>(items: T[]): T { return items[Math.floor(Math.random() * items.length)] }

export default function SimulationRunPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [scenarioType, setScenarioType] = useState<ScenarioType | null>(null)
  const [variation, setVariation] = useState<Variation | null>(null)
  const [status, setStatus] = useState<'idle' | 'running' | 'summary'>('idle')
  const [success, setSuccess] = useState<boolean | null>(null)
  const [events, setEvents] = useState<Array<{ action: string; meta?: any; ts: number }>>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const emailCatalog: Array<() => EmailVariation> = [
    () => ({ sender: 'IT Support <no-reply@c0mpany.com>', subject: 'URGENT: Password Expiring Today', preview: 'Update your password now to avoid lockout.', body: 'We detected unusual sign-in activity. To keep your account secure, update your password using the link below.', ctaText: 'Update Password', ctaUrl: 'https://secure-c0mpany.com/reset', cues: ['Misspelled domain', 'Urgent tone', 'Link host mismatch'] }),
    () => ({ sender: 'HR Department <hr@company-support.com>', subject: 'Updated Benefits Package - Action Required', preview: 'Please verify your information to access your new benefits.', body: 'We have updated our benefits provider. Please verify your details.', ctaText: 'Verify Details', ctaUrl: 'https://company-support.com/benefits', cues: ['Third-party domain', 'Generic salutation'] }),
    () => ({ sender: 'Admin Desk <admin@secure-company.co>', subject: 'Shared File: Q4_Payroll.xlsx', preview: 'You have been granted access to a payroll file.', body: 'A file has been shared with you. You must log in to view it.', ctaText: 'Open File', ctaUrl: 'https://secure-company.co/files/payroll', cues: ['Unexpected file', 'External host'] }),
  ]

  const smsCatalog: Array<() => SmsVariation> = [
    () => ({ sender: 'Zenith Bank Alerts', message: 'Zenith: Suspicious login attempt. Verify now: https://ver1fy-secure.net/login', badUrl: 'https://ver1fy-secure.net/login', cues: ['Non-official domain', 'Urgent threat'] }),
    () => ({ sender: 'Delivery', message: 'Your package is held. Pay customs fee: https://support-portal.help/pay', badUrl: 'https://support-portal.help/pay', cues: ['Unexpected fee', 'Short link lookalike'] }),
    () => ({ sender: 'Revenue Service', message: 'Tax refund available. Claim at https://account-checkup.org/refund', badUrl: 'https://account-checkup.org/refund', cues: ['Unsolicited refund', 'Suspicious domain'] }),
  ]

  const websiteCatalog: Array<() => WebsiteVariation> = [
    () => ({ title: 'Secure Portal Login', realDomain: 'portal.company.com', fakeDomain: 'portal-company-verify.com', cues: ['Lookalike domain', 'TLS issues'] }),
    () => ({ title: 'HR Cloud Sign-in', realDomain: 'hr.company.com', fakeDomain: 'company-hr-login.net', cues: ['Hyphenated domain', 'Third-party host'] }),
    () => ({ title: 'Banking Online', realDomain: 'online.bank.com', fakeDomain: 'secure-online-bank.help', cues: ['Non-bank TLD', 'Vague branding'] }),
  ]

  function generateEmailVariation(): EmailVariation { return randomItem(emailCatalog)() }
  function generateSmsVariation(): SmsVariation { return randomItem(smsCatalog)() }
  function generateWebsiteVariation(): WebsiteVariation { return randomItem(websiteCatalog)() }

  const startSimulation = useCallback(async () => {
    setStatus('idle')
    setSuccess(null)
    setEvents([])
    setSessionId(null)
    setScenarioType(null)
    setVariation(null)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/simulations/session/start', { method: 'POST' })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || 'Failed to start simulation')
      }
      const data = await res.json()
      setSessionId(data.sessionId)
      setScenarioType(data.scenarioType)
      setVariation(data.variation)
      startTimeRef.current = Date.now()
      setStatus('running')
    } catch (e: any) {
      const localScenario: ScenarioType = randomItem(['EMAIL', 'SMS', 'WEBSITE'])
      const localVariation = localScenario === 'EMAIL' ? generateEmailVariation() : localScenario === 'SMS' ? generateSmsVariation() : generateWebsiteVariation()
      setSessionId(`local-${crypto.randomUUID()}`)
      setScenarioType(localScenario)
      setVariation(localVariation)
      startTimeRef.current = Date.now()
      setStatus('running')
      setErrorMsg('Running in demo mode (not logged). Actions will not be saved.')
    }
  }, [])

  const logEvent = useCallback(async (action: string, meta?: any) => {
    if (!sessionId || !scenarioType) return
    setEvents((prev) => [...prev, { action, meta, ts: Date.now() }])
    if (sessionId.startsWith('local-')) return
    try {
      await fetch('/api/simulations/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, scenarioType, action, meta }) })
    } catch {}
  }, [sessionId, scenarioType])

  const endSimulation = useCallback(async (didSucceed: boolean) => {
    setSuccess(didSucceed)
    setStatus('summary')
    const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : null
    try {
      if (sessionId && sessionId.startsWith('local-')) return
      await fetch('/api/simulations/session/end', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId, success: didSucceed, timeTakenMs: elapsed }) })
    } catch {}
  }, [sessionId])

  useEffect(() => { startSimulation() }, [startSimulation])

  function EmailSim({ v }: { v: EmailVariation }) {
    return (
      <GlassCard className="p-0 overflow-hidden h-full" variant="cyber">
        <div className="border-b border-cyber-blue/20 p-4 flex items-center justify-between bg-black/30">
          <div>
            <p className="text-cyber-white font-semibold">Inbox</p>
            <p className="text-cyber-white/60 text-xs">Simulated email client</p>
          </div>
          <div className="text-xs text-cyber-white/60">Actions are tracked</div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-cyber-white/70">From</p>
            <p className="text-cyber-white">{v.sender}</p>
          </div>
          <div>
            <p className="text-sm text-cyber-white/70">Subject</p>
            <p className="text-cyber-white font-semibold">{v.subject}</p>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-cyber-white/90">{v.body}</p>
            <a href={v.ctaUrl} className="inline-block mt-4 text-cyber-blue underline" onMouseEnter={() => logEvent('HOVERED_LINK', { url: v.ctaUrl })} onClick={(e) => { e.preventDefault(); logEvent('LINK_CLICKED', { url: v.ctaUrl }); endSimulation(false) }} title={`Destination: ${v.ctaUrl}`}>{v.ctaText}</a>
          </div>
          <div className="flex gap-3 mt-6">
            <CyberButton variant="secondary" onClick={() => { logEvent('REPORTED_PHISHING'); endSimulation(true) }}>Report Phishing</CyberButton>
            <CyberButton variant="secondary" onClick={() => { logEvent('IGNORED'); endSimulation(true) }}>Ignore</CyberButton>
          </div>
        </div>
      </GlassCard>
    )
  }

  function SmsSim({ v }: { v: SmsVariation }) {
    return (
      <GlassCard className="p-6 h-full" variant="cyber">
        <div className="mx-auto max-w-sm">
          <div className="rounded-2xl border border-cyber-blue/20 bg-black/30 p-4">
            <div className="text-center text-cyber-white/60 text-xs mb-2">Simulated SMS</div>
            <div className="text-cyber-white font-semibold mb-1">{v.sender}</div>
            <div className="bg-cyber-blue/10 text-cyber-white p-3 rounded-xl inline-block">
              <span>{v.message.split(' ')[0]} </span>
              <span>{v.message.substring(v.message.indexOf(' ') + 1)}</span>
            </div>
            <div className="mt-3">
              <a href={v.badUrl} className="text-cyber-blue underline" onMouseEnter={() => logEvent('HOVERED_LINK', { url: v.badUrl })} onClick={(e) => { e.preventDefault(); logEvent('LINK_CLICKED', { url: v.badUrl }); endSimulation(false) }} title={`Destination: ${v.badUrl}`}>{v.badUrl}</a>
            </div>
            <div className="flex gap-3 mt-4">
              <CyberButton variant="secondary" onClick={() => { logEvent('REPORTED_PHISHING'); endSimulation(true) }}>Report SMS</CyberButton>
              <CyberButton variant="secondary" onClick={() => { logEvent('IGNORED'); endSimulation(true) }}>Ignore</CyberButton>
            </div>
          </div>
        </div>
      </GlassCard>
    )
  }

  function WebsiteSim({ v }: { v: WebsiteVariation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
      <GlassCard className="p-0 overflow-hidden h-full" variant="cyber">
        <div className="border-b border-cyber-blue/20 p-4 flex items-center justify-between bg-black/30">
          <div>
            <p className="text-cyber-white font-semibold">{v.title}</p>
            <p className="text-cyber-white/60 text-xs">URL: https://{v.fakeDomain}</p>
          </div>
          <div className="text-xs text-cyber-white/60">Simulated website</div>
        </div>
        <div className="p-6 max-w-md">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); logEvent('FORM_SUBMITTED', { usernameLength: username.length, passwordLength: password.length, host: v.fakeDomain }); endSimulation(false) }}>
            <div>
              <label className="block text-sm text-cyber-white/70">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full rounded-md bg-black/40 border border-cyber-blue/20 p-2 text-cyber-white" placeholder="user@company.com" />
            </div>
            <div>
              <label className="block text-sm text-cyber-white/70">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-md bg-black/40 border border-cyber-blue/20 p-2 text-cyber-white" placeholder="••••••••" />
            </div>
            <div className="flex gap-3">
              <CyberButton type="submit" variant="primary">Sign In</CyberButton>
              <CyberButton type="button" variant="secondary" onClick={() => { logEvent('REPORTED_PHISHING', { host: v.fakeDomain }); endSimulation(true) }}>Report Site</CyberButton>
              <CyberButton type="button" variant="secondary" onClick={() => { logEvent('IGNORED', { host: v.fakeDomain }); endSimulation(true) }}>Back to safety</CyberButton>
            </div>
          </form>
          <div className="mt-4 text-xs text-cyber-white/60">Tip: Always verify the domain: expected {v.realDomain}</div>
        </div>
      </GlassCard>
    )
  }

  const elapsedMs = useMemo(() => { const start = startTimeRef.current; if (!start) return 0; return Math.max(0, Date.now() - start) }, [success])

  function Summary() {
    const tips: string[] = useMemo(() => { if (!variation) return []; return ('cues' in variation ? variation.cues : []) as string[] }, [variation])
    return (
      <GlassCard className="p-6" variant="cyber">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {success ? <CheckCircle className="h-6 w-6 text-cyber-green" /> : <AlertTriangle className="h-6 w-6 text-cyber-red" />}
            <p className="text-cyber-white font-semibold">{success ? 'Great job! You handled the phishing attempt.' : 'You fell for the attempt. Learn from the cues below.'}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs ${success ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'}`}>{success ? 'Passed' : 'Failed'}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-cyber-white/70">Scenario</p>
            <p className="text-cyber-white font-medium">{scenarioType}</p>
          </div>
          <div>
            <p className="text-sm text-cyber-white/70">Time Taken</p>
            <p className="text-cyber-white font-medium">{Math.round(elapsedMs / 1000)}s</p>
          </div>
          <div>
            <p className="text-sm text-cyber-white/70">Actions</p>
            <p className="text-cyber-white font-medium">{events.map(e => e.action).join(', ') || 'None'}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-cyber-white font-semibold mb-2">What to look for next time</p>
          <ul className="list-disc pl-5 space-y-1 text-cyber-white/90">
            {tips.map((t, i) => (<li key={i}>{t}</li>))}
            {!tips.length && <li>Verify sender, hover links to inspect destination, and confirm domains before entering credentials.</li>}
          </ul>
        </div>
        <div className="mt-6 flex gap-3">
          <CyberButton variant="primary" onClick={startSimulation}>Try Again (new scenario)</CyberButton>
        </div>
      </GlassCard>
    )
  }

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-cyber-blue/10 via-cyber-purple/10 to-cyber-pink/10">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient-cyber">Full-screen Phishing Simulation</h1>
            <div className="flex gap-2">
              <CyberButton variant="secondary" onClick={startSimulation}>Restart</CyberButton>
              <a href="/simulations"><CyberButton variant="ghost">Exit</CyberButton></a>
            </div>
          </div>
          {errorMsg && <div className="text-yellow-400 text-sm">{errorMsg}</div>}
          <div className="h-[70vh] md:h-[75vh]">
            {status === 'running' && scenarioType && variation && (
              scenarioType === 'EMAIL' ? (
                <EmailSim v={variation as EmailVariation} />
              ) : scenarioType === 'SMS' ? (
                <SmsSim v={variation as SmsVariation} />
              ) : (
                <WebsiteSim v={variation as WebsiteVariation} />
              )
            )}
            {status === 'summary' && <Summary />}
            {status === 'idle' && (
              <GlassCard className="p-6 h-full flex items-center justify-center" variant="cyber">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-3 text-cyber-white/80">
                    <Mail className="h-5 w-5" />
                    <Smartphone className="h-5 w-5" />
                    <Globe className="h-5 w-5" />
                  </div>
                  <p className="text-cyber-white">Preparing a randomized scenario...</p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}


