'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Terminal, Clock, Target } from 'lucide-react'
import { GlassCard } from './GlassCard'

interface SimulationCardProps {
  simulation: {
    id: number
    title: string
    description: string
    type: string
    difficulty: string
    status: string
    score: number | null
    completedAt: string | null
    estimatedTime: string
    scenario: string
  }
  onClick: () => void
}

export const SimulationCard: React.FC<SimulationCardProps> = ({ simulation, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'from-emerald-600/40 to-emerald-400/40 border-emerald-500/40 text-emerald-400'
      case 'intermediate':
        return 'from-yellow-600/40 to-yellow-400/40 border-yellow-500/40 text-yellow-400'
      case 'advanced':
        return 'from-orange-600/40 to-orange-400/40 border-orange-500/40 text-orange-400'
      case 'expert':
        return 'from-red-600/40 to-red-400/40 border-red-500/40 text-red-400'
      default:
        return 'from-gray-600/40 to-gray-400/40 border-gray-500/40 text-gray-400'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard
        className={`cursor-pointer overflow-hidden bg-gradient-to-br ${getDifficultyColor(simulation.difficulty)} hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="relative p-6">
          <div className="absolute top-0 right-0 p-4">
            <div className={`font-cyber text-sm ${getDifficultyColor(simulation.difficulty)}`}>
              {simulation.difficulty}
            </div>
          </div>
          
          <h3 className="text-xl font-cyber mb-2 text-cyan-400">{simulation.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-cyan-300/80 mb-4">
            <Terminal className="w-4 h-4" />
            <span>{simulation.type}</span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{simulation.estimatedTime}</span>
          </div>
          
          <p className="text-gray-300 mb-4">{simulation.description}</p>
          
          <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
            <h4 className="text-sm font-cyber text-cyan-400 mb-2">Scenario Overview</h4>
            <p className="text-sm text-gray-400">{simulation.scenario}</p>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-500" />
              <span className="text-sm text-cyan-300">Real-world simulation</span>
            </div>
            <Target className="w-5 h-5 text-cyan-500" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
