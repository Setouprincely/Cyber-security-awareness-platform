'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { BarChart3, TrendingUp, Users, Target, Calendar, Download } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('30d')

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access analytics. This page is restricted to administrators only.</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Training Completion',
      value: '87%',
      change: '+5%',
      changeType: 'positive',
      icon: Target,
    },
    {
      name: 'Phishing Detection Rate',
      value: '73%',
      change: '-3%',
      changeType: 'negative',
      icon: BarChart3,
    },
    {
      name: 'Average Score',
      value: '82%',
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ]

  const trainingData = [
    { module: 'Phishing Awareness', completed: 89, total: 100 },
    { module: 'Password Security', completed: 76, total: 100 },
    { module: 'Social Engineering', completed: 65, total: 100 },
    { module: 'Data Protection', completed: 58, total: 100 },
    { module: 'Incident Response', completed: 42, total: 100 },
  ]

  const simulationResults = [
    { type: 'Banking Phishing', passed: 78, failed: 22 },
    { type: 'IT Support Scam', passed: 65, failed: 35 },
    { type: 'CEO Fraud', passed: 45, failed: 55 },
    { type: 'Software Update', passed: 82, failed: 18 },
    { type: 'Social Media', passed: 91, failed: 9 },
  ]

  const recentActivity = [
    {
      user: 'John Doe',
      action: 'Completed Phishing Awareness module',
      score: '95%',
      time: '2 hours ago',
    },
    {
      user: 'Jane Smith',
      action: 'Failed CEO Fraud simulation',
      score: '45%',
      time: '4 hours ago',
    },
    {
      user: 'Mike Johnson',
      action: 'Completed Password Security module',
      score: '88%',
      time: '6 hours ago',
    },
    {
      user: 'Sarah Wilson',
      action: 'Passed Banking Phishing simulation',
      score: '92%',
      time: '8 hours ago',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
  <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor training progress and security awareness metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-cyber-blue/20 rounded-lg px-3 py-2 text-sm bg-black/20 text-cyber-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <CyberButton variant="primary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </CyberButton>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.name} variant="cyber" className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-cyber-blue/10">
                <stat.icon className="h-6 w-6 text-cyber-blue" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-cyber-white/70">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-cyber-white">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-cyber-green' : 'text-cyber-red'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Progress */}
        <GlassCard className="p-6">
          <div className="p-6 border-b border-cyber-blue/20">
            <h2 className="text-lg font-semibold text-cyber-white">Training Module Progress</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {trainingData.map((item) => (
                <div key={item.module}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-cyber-white">{item.module}</span>
                    <span className="text-sm text-cyber-white/70">
                      {item.completed}/{item.total} ({Math.round((item.completed / item.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(item.completed / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Simulation Results */}
        <GlassCard className="p-6">
          <div className="p-6 border-b border-cyber-blue/20">
            <h2 className="text-lg font-semibold text-cyber-white">Simulation Results</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {simulationResults.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-cyber-white">{item.type}</span>
                    <span className="text-sm text-cyber-white/70">
                      {item.passed}% pass rate
                    </span>
                  </div>
                  <div className="flex w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-l-full"
                      style={{ width: `${item.passed}%` }}
                    />
                    <div
                      className="bg-red-500 h-2 rounded-r-full"
                      style={{ width: `${item.failed}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${
                    parseInt(activity.score) >= 80 ? 'text-green-600' : 
                    parseInt(activity.score) >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {activity.score}
                  </span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Completion Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phishing Detection Rates</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}