import { NextRequest, NextResponse } from 'next/server'

// Mock dashboard stats data
const mockStats = {
  modulesCompleted: 3,
  totalModules: 8,
  phishingTestsPassed: 7,
  totalPhishingTests: 10,
  averageScore: 94,
  timeSpent: '12.5h',
  securityScore: 94,
  threatsBlocked: 1247,
  weeklyProgress: {
    modules: 2,
    threats: 3,
    scoreImprovement: 5,
    timeThisWeek: '2.5h'
  },
  recentAchievements: [
    {
      id: '1',
      title: 'Neural Defense Expert',
      description: 'Completed advanced threat detection module',
      earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      rarity: 'rare'
    },
    {
      id: '2',
      title: 'Phishing Hunter',
      description: 'Successfully identified 50 phishing attempts',
      earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      rarity: 'common'
    }
  ],
  upcomingDeadlines: [
    {
      id: '1',
      title: 'Monthly Security Assessment',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Quarterly Compliance Training',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      priority: 'medium'
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would:
    // 1. Get user ID from session/token
    // 2. Fetch user-specific stats from database
    // 3. Calculate real-time metrics
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Add some randomization to make it feel more real-time
    const stats = {
      ...mockStats,
      threatsBlocked: mockStats.threatsBlocked + Math.floor(Math.random() * 10),
      securityScore: Math.min(100, mockStats.securityScore + Math.floor(Math.random() * 3)),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}