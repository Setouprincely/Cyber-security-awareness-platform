import { NextRequest, NextResponse } from 'next/server'

// Mock data for search results
const mockData = [
  {
    id: '1',
    title: 'Phishing Email Detection',
    description: 'Learn to identify and respond to phishing attempts',
    type: 'module',
    href: '/training/phishing-detection'
  },
  {
    id: '2',
    title: 'Password Security Best Practices',
    description: 'Master secure password creation and management',
    type: 'module',
    href: '/training/password-security'
  },
  {
    id: '3',
    title: 'Social Engineering Awareness',
    description: 'Understand and defend against social engineering attacks',
    type: 'module',
    href: '/training/social-engineering'
  },
  {
    id: '4',
    title: 'Corporate Email Simulation',
    description: 'Test your skills with realistic corporate phishing emails',
    type: 'simulation',
    href: '/simulations/corporate-email'
  },
  {
    id: '5',
    title: 'Banking Phishing Simulation',
    description: 'Practice identifying fraudulent banking communications',
    type: 'simulation',
    href: '/simulations/banking-phishing'
  },
  {
    id: '6',
    title: 'Data Protection Compliance',
    description: 'Learn about GDPR, CCPA, and other data protection regulations',
    type: 'module',
    href: '/training/data-protection'
  },
  {
    id: '7',
    title: 'Incident Response Planning',
    description: 'Develop effective incident response strategies',
    type: 'module',
    href: '/training/incident-response'
  },
  {
    id: '8',
    title: 'Mobile Security Threats',
    description: 'Understand and mitigate mobile device security risks',
    type: 'module',
    href: '/training/mobile-security'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''

    if (query.length < 2) {
      return NextResponse.json([])
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    // Filter results based on query
    const results = mockData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    ).slice(0, 8) // Limit to 8 results

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}