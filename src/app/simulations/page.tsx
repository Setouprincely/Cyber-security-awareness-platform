'use client'

import { useState, useEffect } from 'react'
import { Mail, Shield, AlertTriangle, CheckCircle, Clock, Target, Cpu, Terminal, Laptop, AlertCircle } from 'lucide-react'
import { SimulationCard } from '@/components/ui/SimulationCard'
import { motion } from 'framer-motion'
import CyberBackground from '@/components/ui/CyberBackground'
import { GlassCard } from '@/components/ui/GlassCard'
import { CyberButton } from '@/components/ui/cyber-button'
import Layout, { PageContainer } from '@/components/layout/Layout'
import { CyberParticles } from '@/components/ui/CyberParticles'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

export default function SimulationsPage() {
  const [activeTab, setActiveTab] = useState('available')
  const [completionStatus, setCompletionStatus] = useState(new Map())

  useEffect(() => {
    // Initialize completion status for simulations
    const status = new Map()
    simulations.forEach(sim => {
      status.set(sim.id, {
        progress: sim.status === 'completed' ? 100 : sim.status === 'failed' ? 0 : Math.floor(Math.random() * 100),
        started: sim.status !== 'available'
      })
    })
    setCompletionStatus(status)
  }, [])

  const simulations = [
    {
      id: 1,
      title: 'Cloud Storage Ransomware Attack',
      description: 'Investigate and respond to a live ransomware incident affecting company cloud storage',
      type: 'Incident Response',
      difficulty: 'Advanced',
      status: 'available',
      score: null,
      completedAt: null,
      estimatedTime: '45 minutes',
      thumbnail: '/ransomware-sim.jpg',
      scenario: 'Live incident response simulation with real ransomware artifacts',
    },
    {
      id: 2,
      title: 'Advanced Persistent Threat (APT) Detection',
      description: 'Analyze network traffic and system logs to identify APT activities',
      type: 'Threat Hunting',
      difficulty: 'Expert',
      status: 'available',
      score: null,
      completedAt: null,
      estimatedTime: '60 minutes',
      thumbnail: '/apt-sim.jpg',
      scenario: 'Real-time threat hunting in enterprise environment',
    },
    {
      id: 3,
      title: 'Supply Chain Attack Investigation',
      description: 'Investigate compromised software dependencies and infected build systems',
      type: 'Forensic Analysis',
      difficulty: 'Advanced',
      status: 'available',
      score: null,
      completedAt: null,
      estimatedTime: '50 minutes',
      thumbnail: '/supply-chain-sim.jpg',
      scenario: 'Interactive investigation of compromised development pipeline',
    },
    {
      id: 4,
      title: 'Zero-Day Vulnerability Response',
      description: 'Respond to and mitigate a zero-day exploit in production systems',
      type: 'Emergency Response',
      difficulty: 'Expert',
      status: 'available',
      score: null,
      completedAt: null,
      estimatedTime: '40 minutes',
      thumbnail: '/zero-day-sim.jpg',
      scenario: 'Live zero-day exploit mitigation simulation',
    },
    {
      id: 5,
      title: 'Social Engineering Red Team',
      description: 'Conduct and defend against advanced social engineering attacks',
      type: 'Red Team Exercise',
      difficulty: 'Intermediate',
      status: 'available',
      score: null,
      completedAt: null,
      estimatedTime: '30 minutes',
      thumbnail: '/social-eng-sim.jpg',
      scenario: 'Interactive red team vs blue team simulation',
    },
  ]

  const getFilteredSimulations = () => {
    switch (activeTab) {
      case 'completed':
        return simulations.filter(sim => sim.status === 'completed')
      case 'failed':
        return simulations.filter(sim => sim.status === 'failed')
      default:
        return simulations.filter(sim => sim.status === 'available')
    }
  }

  const handleSimulationClick = (simulation: any) => {
    // This would launch the simulation in a dedicated environment
    console.log('Launching simulation:', simulation.title)
  }

  const getStatusIcon = (status: string, score?: number | null) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Target className="h-5 w-5 text-blue-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <Layout>
      <PageContainer>
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Phishing Simulations</h1>
        <p className="text-red-100">
          Test your ability to identify and respond to realistic phishing attempts
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6" variant="cyber">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-cyber-green/10">
              <CheckCircle className="h-6 w-6 text-cyber-green" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Passed</p>
              <p className="text-2xl font-bold text-cyber-white">1</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variant="cyber">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-cyber-red/10">
              <AlertTriangle className="h-6 w-6 text-cyber-red" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Failed</p>
              <p className="text-2xl font-bold text-cyber-white">1</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variant="cyber">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-cyber-blue/10">
              <Target className="h-6 w-6 text-cyber-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Available</p>
              <p className="text-2xl font-bold text-cyber-white">3</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" variant="cyber">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-cyber-purple/10">
              <Shield className="h-6 w-6 text-cyber-purple" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-cyber-white/70">Avg Score</p>
              <p className="text-2xl font-bold text-cyber-white">70%</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs */}
      <GlassCard className="bg-gradient-to-r from-gray-900/50 to-indigo-900/50">
        <div className="border-b border-cyber-blue/20">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'available', name: 'Available', count: 3 },
              { id: 'completed', name: 'Completed', count: 1 },
              { id: 'failed', name: 'Failed', count: 1 },
            ].map((tab) => (
              <CyberButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'primary' : 'secondary'}
              >
                {tab.name} ({tab.count})
              </CyberButton>
            ))}
          </nav>
        </div>

        {/* Simulations List */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredSimulations().map((simulation) => (
              <SimulationCard
                key={simulation.id}
                simulation={simulation}
                onClick={() => {/* handle click */}}
              />
            ))}
          </div>
        </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {simulation.title}
                    </h3>
                    {getStatusIcon(simulation.status, simulation.score)}
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {simulation.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium text-gray-900">{simulation.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full ${
                        simulation.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : simulation.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {simulation.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Score */}
                  {simulation.score !== null && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Score:</span>
                        <span className={`font-bold ${
                          simulation.score >= 80 ? 'text-green-600' : 
                          simulation.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {simulation.score}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    simulation.status === 'available'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : simulation.status === 'completed'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}>
                    {simulation.status === 'available' ? 'Start Simulation' : 
                     simulation.status === 'completed' ? 'Review Results' : 'Retry Simulation'}
                  </button>

                  {/* Completion Time */}
                  {simulation.completedAt && (
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed {simulation.completedAt}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {getFilteredSimulations().length === 0 && (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No simulations found</h3>
              <p className="text-gray-600">
                {activeTab === 'available' && 'No simulations are currently available.'}
                {activeTab === 'completed' && 'You haven\'t completed any simulations yet.'}
                {activeTab === 'failed' && 'You haven\'t failed any simulations.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
      </PageContainer>
    </Layout>
  )
}