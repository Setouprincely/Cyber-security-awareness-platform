import { NextRequest, NextResponse } from 'next/server'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    title: 'New Training Module Available',
    message: 'Advanced Threat Detection module is now available for training',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    actionUrl: '/training/advanced-threat-detection'
  },
  {
    id: '2',
    title: 'Phishing Simulation Completed',
    message: 'You successfully identified 8 out of 10 phishing attempts',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    actionUrl: '/simulations/results/sim-123'
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'Suspicious login attempt detected from unknown location',
    type: 'warning',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    actionUrl: '/profile/security'
  },
  {
    id: '4',
    title: 'Training Reminder',
    message: 'Complete your monthly security training by end of week',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    actionUrl: '/training'
  },
  {
    id: '5',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You earned the "Phishing Expert" badge',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    actionUrl: '/profile/achievements'
  }
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user ID from the session/token
    // and fetch notifications from the database
    
    const notifications = mockNotifications
    const unreadCount = notifications.filter(n => !n.read).length

    return NextResponse.json({
      notifications,
      unreadCount
    })
  } catch (error) {
    console.error('Notifications API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}