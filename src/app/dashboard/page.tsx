'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { 
  BookOpenIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  UsersIcon, 
  TrophyIcon,
  ClockIcon,
  BoltIcon,
  UserIcon,
  FireIcon,
  EyeIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Layout, { PageContainer, Section, Card } from '@/components/layout/Layout'
import LoadingSpinner, { CardSkeleton } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { useWebSocket } from '@/components/providers/WebSocketProvider'
import { useEffect, useState } from 'react'

interface DashboardStats {
  modulesCompleted: number
  totalModules: number
  phishingTestsPassed: number
  totalPhishingTests: number
  averageScore: number
  timeSpent: string
  securityScore: number
  threatsBlocked: number
}

interface Activity {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  icon: any
  color: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { subscribe, isConnected } = useWebSocket()
  const [realTimeStats, setRealTimeStats] = useState<Partial<DashboardStats>>({})

  // Fetch dashboard data with React Query
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats')
      if (!response.ok) throw new Error('Failed to fetch dashboard data')
      return response.json()
    },
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isConnected) return

    const unsubscribeStats = subscribe('stats_update', (data) => {
      setRealTimeStats(prev => ({ ...prev, ...data }))
    })

    const unsubscribeProgress = subscribe('progress_update', (data) => {
      // Handle progress updates
      console.log('Progress update:', data)
    })

    return () => {
      unsubscribeStats()
      unsubscribeProgress()
    }
  }, [isConnected, subscribe])

  // Merge real-time stats with fetched data
  const stats = { ...dashboardData, ...realTimeStats }

  const statCards = [
    {
      name: 'Neural Modules',
      value: stats.modulesCompleted || 3,
      total: stats.totalModules || 8,
      icon: BookOpenIcon,
      color: 'cyber-blue',
      bgGradient: 'from-cyber-blue/20 to-cyber-blue/5',
      change: '+2 this week'
    },
    {
      name: 'Threats Neutralized',
      value: stats.phishingTestsPassed || 7,
      total: stats.totalPhishingTests || 10,
      icon: ShieldCheckIcon,
      color: 'cyber-green',
      bgGradient: 'from-cyber-green/20 to-cyber-green/5',
      change: '+3 today'
    },
    {
      name: 'Security Score',
      value: `${stats.averageScore || 94}%`,
      total: '',
      icon: ArrowTrendingUpIcon,
      color: 'cyber-purple',
      bgGradient: 'from-cyber-purple/20 to-cyber-purple/5',
      change: '+5% improvement'
    },
    {
      name: 'Neural Time',
      value: stats.timeSpent || '12.5h',
      total: '',
      icon: ClockIcon,
      color: 'cyber-pink',
      bgGradient: 'from-cyber-pink/20 to-cyber-pink/5',
      change: '2.5h this week'
    },
  ]

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'module_completed',
      title: 'Neural Module Completed',
      description: 'Advanced Threat Detection - Score: 96%',
      timestamp: '2 hours ago',
      icon: BookOpenIcon,
      color: 'text-cyber-blue',
    },
    {
      id: '2',
      type: 'phishing_detected',
      title: 'Threat Neutralized',
      description: 'Quantum Banking Phishing Simulation',
      timestamp: '4 hours ago',
      icon: ShieldCheckIcon,
      color: 'text-cyber-green',
    },
    {
      id: '3',
      type: 'badge_earned',
      title: 'Achievement Unlocked',
      description: 'Neural Defense Expert Badge',
      timestamp: '1 day ago',
      icon: TrophyIcon,
      color: 'text-cyber-purple',
    },
    {
      id: '4',
      type: 'security_alert',
      title: 'Security Enhancement',
      description: 'Neural firewall updated successfully',
      timestamp: '2 days ago',
      icon: ExclamationTriangleIcon,
      color: 'text-cyber-orange',
    },
  ]

  const upcomingTraining = [
    {
      id: 1,
      title: 'Quantum Encryption Protocols',
      description: 'Master next-generation encryption techniques',
      duration: '45 min',
      difficulty: 'Advanced',
      threat_level: 'Critical'
    },
    {
      id: 2,
      title: 'Neural Social Engineering Defense',
      description: 'AI-powered defense against manipulation attacks',
      duration: '35 min',
      difficulty: 'Intermediate',
      threat_level: 'High'
    },
    {
      id: 3,
      title: 'Cyber Warfare Fundamentals',
      description: 'Understanding modern cyber warfare tactics',
      duration: '60 min',
      difficulty: 'Advanced',
      threat_level: 'Critical'
    },
  ]

  if (isLoading) {
    return (
      <Layout>
        <PageContainer>
          <div className="space-y-6">
            <CardSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </PageContainer>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageContainer>
        <div className="space-y-8">
          {/* Neural Command Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden"
          >
            <Card className="bg-gradient-to-r from-cyber-blue/10 via-cyber-purple/10 to-cyber-pink/10 border-cyber-blue/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="h-20 w-20 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center relative">
                      <CpuChipIcon className="h-10 w-10 text-white" />
                      <div className="absolute inset-0 rounded-full bg-cyber-blue/20 animate-ping" />
                    </div>
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold text-gradient-cyber mb-2">
                      Neural Command Center
                    </h1>
                    <p className="text-cyber-white/70 mb-2">
                      Welcome back, Agent {user?.name || 'Unknown'}. Your neural interface is active.
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="flex items-center text-cyber-blue">
                        <UserIcon className="h-4 w-4 mr-1" />
                        {user?.email}
                      </span>
                      <span className="flex items-center text-cyber-green">
                        <ShieldCheckIcon className="h-4 w-4 mr-1" />
                        {user?.role === 'admin' ? 'Command Authority' : 'Neural Agent'}
                      </span>
                      <span className="flex items-center text-cyber-purple">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {isConnected ? 'Neural Link Active' : 'Neural Link Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-cyber-white/70 text-sm mb-1">System Status</div>
                  <div className="text-2xl font-bold text-cyber-green">OPERATIONAL</div>
                  <div className="text-cyber-white/50 text-xs">All systems nominal</div>
                </div>
              </div>
              
              {/* Background Effects */}
              <div className="absolute inset-0 cyber-grid-bg opacity-5" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyber-purple/10 rounded-full blur-2xl" />
            </Card>
          </motion.div>

          {/* Neural Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${stat.bgGradient} border-${stat.color}/30 hover:border-${stat.color}/50 transition-all duration-300`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyber-white/70 text-sm font-medium mb-1">{stat.name}</p>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-3xl font-bold text-${stat.color}`}>
                          {stat.value}
                        </span>
                        {stat.total && (
                          <span className="text-cyber-white/50 text-sm">/{stat.total}</span>
                        )}
                      </div>
                      <p className="text-cyber-white/50 text-xs mt-1">{stat.change}</p>
                    </div>
                    <motion.div
                      className={`p-3 rounded-lg bg-${stat.color}/20`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className={`h-8 w-8 text-${stat.color}`} />
                    </motion.div>
                  </div>
                  
                  {/* Progress Bar for stats with totals */}
                  {stat.total && (
                    <div className="mt-4">
                      <div className="w-full bg-cyber-dark/50 rounded-full h-2">
                        <motion.div
                          className={`bg-${stat.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.value / parseInt(stat.total)) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Neural Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gradient-cyber flex items-center">
                    <FireIcon className="h-6 w-6 mr-2 text-cyber-orange" />
                    Neural Activity Feed
                  </h2>
                  <span className="text-cyber-white/50 text-sm">Real-time updates</span>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-cyber-dark/30 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300"
                    >
                      <div className={`p-2 rounded-lg bg-cyber-dark/50`}>
                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-cyber-white font-medium">{activity.title}</p>
                        <p className="text-cyber-white/70 text-sm">{activity.description}</p>
                        <p className="text-cyber-white/50 text-xs mt-1">{activity.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/activity">
                  <button className="w-full mt-6 btn-cyber-primary">
                    View Full Activity Log
                  </button>
                </Link>
              </Card>
            </motion.div>

            {/* Neural Training Queue */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gradient-cyber flex items-center">
                    <BoltIcon className="h-6 w-6 mr-2 text-cyber-blue" />
                    Neural Training Queue
                  </h2>
                  <span className="text-cyber-white/50 text-sm">Priority missions</span>
                </div>
                <div className="space-y-4">
                  {upcomingTraining.map((training, index) => (
                    <motion.div
                      key={training.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-cyber-dark/30 border border-cyber-purple/20 hover:border-cyber-purple/40 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-cyber-white font-medium group-hover:text-gradient-cyber transition-all duration-300">
                          {training.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          training.threat_level === 'Critical' 
                            ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/30'
                            : 'bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30'
                        }`}>
                          {training.threat_level}
                        </span>
                      </div>
                      <p className="text-cyber-white/70 text-sm mb-3">{training.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-cyber-blue">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {training.duration}
                          </span>
                          <span className={`px-2 py-1 rounded-full ${
                            training.difficulty === 'Advanced' 
                              ? 'bg-cyber-red/20 text-cyber-red'
                              : 'bg-cyber-blue/20 text-cyber-blue'
                          }`}>
                            {training.difficulty}
                          </span>
                        </div>
                        <button className="text-cyber-purple hover:text-cyber-pink transition-colors duration-300">
                          Initialize →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/training">
                  <button className="w-full mt-6 btn-cyber-primary">
                    Access Training Matrix
                  </button>
                </Link>
              </Card>
            </motion.div>
          </div>

          {/* Neural Command Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gradient-cyber mb-6 flex items-center">
                <CpuChipIcon className="h-6 w-6 mr-2 text-cyber-green" />
                Neural Command Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: BookOpenIcon,
                    title: 'Initialize Training',
                    description: 'Begin neural enhancement protocols',
                    color: 'cyber-blue',
                    href: '/training'
                  },
                  {
                    icon: EnvelopeIcon,
                    title: 'Threat Simulation',
                    description: 'Test defensive capabilities',
                    color: 'cyber-purple',
                    href: '/simulations'
                  },
                  {
                    icon: ChartBarIcon,
                    title: 'Neural Analytics',
                    description: 'Review performance metrics',
                    color: 'cyber-green',
                    href: '/analytics'
                  }
                ].map((action, index) => (
                  <Link key={action.title} href={action.href}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`p-6 rounded-lg bg-gradient-to-br from-${action.color}/10 to-${action.color}/5 border border-${action.color}/30 hover:border-${action.color}/50 transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="text-center">
                        <motion.div
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${action.color}/20 flex items-center justify-center group-hover:bg-${action.color}/30 transition-all duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <action.icon className={`h-8 w-8 text-${action.color}`} />
                        </motion.div>
                        <h3 className="text-cyber-white font-bold mb-2 group-hover:text-gradient-cyber transition-all duration-300">
                          {action.title}
                        </h3>
                        <p className="text-cyber-white/70 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </PageContainer>
    </Layout>
  )
}