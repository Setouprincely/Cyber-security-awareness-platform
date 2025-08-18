'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { 
  BookOpen, 
  Mail, 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  Clock,
  Target
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Modules Completed',
      value: '3',
      total: '8',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Phishing Tests Passed',
      value: '7',
      total: '10',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Average Score',
      value: '85%',
      total: '',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Time Spent',
      value: '12h',
      total: '',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'module_completed',
      title: 'Completed "Introduction to Phishing Attacks"',
      description: 'Scored 92% on the final quiz',
      timestamp: '2 hours ago',
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      id: 2,
      type: 'phishing_detected',
      title: 'Successfully identified phishing email',
      description: 'Fake bank security alert simulation',
      timestamp: '1 day ago',
      icon: Shield,
      color: 'text-green-600',
    },
    {
      id: 3,
      type: 'badge_earned',
      title: 'Earned "First Steps" badge',
      description: 'Completed your first training module',
      timestamp: '3 days ago',
      icon: Award,
      color: 'text-yellow-600',
    },
  ]

  const upcomingTraining = [
    {
      id: 1,
      title: 'Password Security Best Practices',
      description: 'Learn how to create and manage secure passwords',
      duration: '25 min',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Social Engineering Awareness',
      description: 'Understand and defend against social engineering attacks',
      duration: '35 min',
      difficulty: 'Intermediate',
    },
    {
      id: 3,
      title: 'Data Protection Fundamentals',
      description: 'Essential practices for protecting sensitive data',
      duration: '30 min',
      difficulty: 'Beginner',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-primary-100">
          Continue your cybersecurity training journey. You're making great progress!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Training */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Training</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTraining.map((training) => (
                <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{training.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {training.duration}
                    </span>
                    <span className={`px-2 py-1 rounded-full ${
                      training.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {training.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn-primary">
              View All Training Modules
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Start Training</p>
              <p className="text-xs text-gray-500">Begin a new module</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <Mail className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Take Simulation</p>
              <p className="text-xs text-gray-500">Test your skills</p>
            </div>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="text-center">
              <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Progress</p>
              <p className="text-xs text-gray-500">Check your stats</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
