import { NextRequest, NextResponse } from 'next/server'

function normalizeUrl(raw: string): URL | null {
  try {
    const trimmed = raw.trim()
    const withProtocol = /^(https?:)?\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`
    return new URL(withProtocol)
  } catch {
    return null
  }
}

function isIpAddress(host: string): boolean {
  // IPv4
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return true
  // IPv6
  if (/^\[?[0-9a-f:]+\]?$/i.test(host)) return true
  return false
}

const SHORTENERS = new Set([
  'bit.ly','tinyurl.com','goo.gl','t.co','ow.ly','is.gd','buff.ly','cutt.ly','rebrand.ly','bit.do','rb.gy','s.id','shorte.st'
])

const SUSPICIOUS_TLDS = new Set([
  'zip','mov','xyz','top','gq','cf','tk','ml','work','click','link','country','mom','win','men','loan','download','racing','science','party'
])

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    if (typeof url !== 'string' || !url.trim()) {
      return NextResponse.json({ error: 'url is required' }, { status: 400 })
    }

    const parsed = normalizeUrl(url)
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const signals: Array<{ message: string; weight: number }> = []
    let riskPoints = 0

    const hostname = parsed.hostname.toLowerCase()
    const pathname = parsed.pathname || '/'
    const protocol = parsed.protocol.replace(':','')
    const port = parsed.port || (protocol === 'https' ? '443' : protocol === 'http' ? '80' : '')
    const query = parsed.search

    // Heuristic 1: Shorteners
    if (SHORTENERS.has(hostname)) {
      signals.push({ message: 'URL uses a known link shortener', weight: 30 })
      riskPoints += 30
    }

    // Heuristic 2: IP address instead of domain
    if (isIpAddress(hostname)) {
      signals.push({ message: 'Uses an IP address instead of a domain', weight: 25 })
      riskPoints += 25
    }

    // Heuristic 3: Punycode / IDN
    if (hostname.includes('xn--')) {
      signals.push({ message: 'Contains punycode (IDN) which can be used for lookalike domains', weight: 25 })
      riskPoints += 25
    }

    // Heuristic 4: Many subdomains
    const dotCount = hostname.split('.').length - 1
    if (dotCount >= 3) {
      signals.push({ message: 'Excessive subdomains may indicate a deceptive URL', weight: 15 })
      riskPoints += 15
    }

    // Heuristic 5: @ in path (URL obfuscation)
    if (parsed.href.includes('@')) {
      signals.push({ message: 'Contains @ which can hide the real destination', weight: 20 })
      riskPoints += 20
    }

    // Heuristic 6: Suspicious TLDs
    const tld = hostname.split('.').pop() || ''
    if (SUSPICIOUS_TLDS.has(tld)) {
      signals.push({ message: `Suspicious top-level domain: .${tld}`, weight: 15 })
      riskPoints += 15
    }

    // Heuristic 7: Lookalike characters / numbers for letters
    if (/[0-9].*[a-z]|[a-z].*[0-9]/i.test(hostname) && /(0|1|3|5|7)/.test(hostname)) {
      signals.push({ message: 'Numbers mixed into brand-like name (e.g., 0 for o, 1 for l)', weight: 10 })
      riskPoints += 10
    }

    // Heuristic 8: Login/verify/reset paths
    if (/(login|verify|reset|update|secure|account)/i.test(pathname)) {
      signals.push({ message: 'Path suggests credential capture (login/verify/reset)', weight: 10 })
      riskPoints += 10
    }

    // Heuristic 9: Non-https
    if (protocol !== 'https') {
      signals.push({ message: 'Connection is not HTTPS', weight: 20 })
      riskPoints += 20
    }

    // Heuristic 10: Unusual port
    if (port && !['80','443',''].includes(port)) {
      signals.push({ message: `Uses uncommon port :${port}`, weight: 10 })
      riskPoints += 10
    }

    // Heuristic 11: Long URL / path / query
    const urlLength = parsed.href.length
    if (urlLength > 120) {
      signals.push({ message: 'Unusually long URL (obfuscation risk)', weight: 8 })
      riskPoints += 8
    }
    if (pathname.length > 60) {
      signals.push({ message: 'Very long path', weight: 5 })
      riskPoints += 5
    }
    if (query && query.length > 40) {
      signals.push({ message: 'Long query string', weight: 5 })
      riskPoints += 5
    }

    // Heuristic 12: Suspicious keywords
    const suspiciousKeywords = ['verify','reset','update','secure','account','login','confirm','unlock','suspend','invoice','payment']
    if (suspiciousKeywords.some(k => hostname.includes(k) || pathname.toLowerCase().includes(k) || query.toLowerCase().includes(k))) {
      signals.push({ message: 'Contains suspicious phishing-related keywords', weight: 12 })
      riskPoints += 12
    }

    // Heuristic 13: Homoglyph lookalike (basic)
    const looksLikeCompany = /(c0mpany|cοmpany|cornpany|compаny)/i.test(hostname) // includes common substitutions
    if (looksLikeCompany) {
      signals.push({ message: 'Domain contains homoglyph lookalikes', weight: 18 })
      riskPoints += 18
    }

    // Normalize score 0-100 and clamp
    const score = Math.max(0, Math.min(100, riskPoints))
    const isPhishingLikely = score >= 40

    return NextResponse.json({
      ok: true,
      input: url,
      normalized: parsed.href,
      hostname,
      protocol,
      port,
      pathname,
      query,
      score,
      verdict: isPhishingLikely ? 'likely_phishing' : 'likely_safe',
      signals: signals.sort((a,b)=>b.weight-a.weight),
      recommendations: isPhishingLikely ? [
        'Do not click or enter credentials',
        'Report the link to your security team',
        'Verify the destination by typing the known domain manually'
      ] : [
        'Still verify the domain spelling before proceeding',
        'Avoid entering credentials after following emailed links'
      ],
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}


