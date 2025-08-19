'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkillHexagonProps {
  skill: string
  level: number
  color: string
}

export const SkillHexagon: React.FC<SkillHexagonProps> = ({ skill, level, color }) => {
  const size = 120
  const points = Array.from({ length: 6 }).map((_, i) => {
    const angle = (Math.PI / 3) * i
    const x = size / 2 + (size / 2) * Math.cos(angle)
    const y = size / 2 + (size / 2) * Math.sin(angle)
    return `${x},${y}`
  })

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg width={size} height={size} className="transform rotate-90">
        <polygon
          points={points.join(' ')}
          fill="transparent"
          stroke={color}
          strokeWidth="2"
          className="glow"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={color}
          className="text-xs font-cyber transform -rotate-90"
        >
          {skill}
        </text>
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={color}
          className="text-lg font-cyber transform -rotate-90"
        >
          {level}%
        </text>
      </svg>
      <div
        className="absolute inset-0 bg-gradient-to-t"
        style={{
          background: `linear-gradient(to top, ${color}33 ${level}%, transparent ${level}%)`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />
    </motion.div>
  )
}
