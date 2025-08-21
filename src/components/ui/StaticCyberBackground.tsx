'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface StaticCyberBackgroundProps {
  className?: string
  variant?: 'grid' | 'circuit' | 'matrix' | 'minimal'
  opacity?: number
}

export default function StaticCyberBackground({
  className = '',
  variant = 'grid',
  opacity = 0.1
}: StaticCyberBackgroundProps) {
  const renderGridPattern = () => (
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(rgba(139, 0, 255, ${opacity * 0.5}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 0, 255, ${opacity * 0.5}) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0, 0 0, 25px 25px, 25px 25px'
      }}
    >
      {/* Glowing nodes at grid intersections */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px rgba(0, 212, 255, ${opacity * 2})`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
    </div>
  )

  const renderCircuitPattern = () => (
    <div className="absolute inset-0">
      {/* Circuit board traces */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Horizontal traces */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="#00D4FF" strokeWidth="2" opacity="0.6" />
            <line x1="0" y1="150" x2="200" y2="150" stroke="#8B00FF" strokeWidth="1.5" opacity="0.4" />
            
            {/* Vertical traces */}
            <line x1="50" y1="0" x2="50" y2="200" stroke="#FF007A" strokeWidth="1" opacity="0.5" />
            <line x1="150" y1="0" x2="150" y2="200" stroke="#00FF41" strokeWidth="1.5" opacity="0.3" />
            
            {/* Circuit nodes */}
            <circle cx="50" cy="50" r="3" fill="#00D4FF" opacity="0.8" />
            <circle cx="150" cy="50" r="2" fill="#8B00FF" opacity="0.6" />
            <circle cx="50" cy="150" r="2.5" fill="#FF007A" opacity="0.7" />
            <circle cx="150" cy="150" r="2" fill="#00FF41" opacity="0.5" />
            
            {/* Connection paths */}
            <path d="M50,50 L100,75 L150,50" stroke="#00D4FF" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M50,150 L100,125 L150,150" stroke="#FF007A" strokeWidth="1" fill="none" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Glowing circuit nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 13 + 10) % 90}%`,
              top: `${(i * 17 + 15) % 80}%`,
            }}
          >
            <div 
              className="w-2 h-2 bg-cyber-blue rounded-full"
              style={{
                boxShadow: `0 0 8px rgba(0, 212, 255, ${opacity * 3})`,
                opacity: 0.6
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderMatrixPattern = () => (
    <div className="absolute inset-0 font-mono text-xs overflow-hidden">
      {/* Binary code streams */}
      {Array.from({ length: 8 }).map((_, col) => (
        <div
          key={col}
          className="absolute top-0 bottom-0 flex flex-col justify-start"
          style={{
            left: `${col * 12.5}%`,
            color: `rgba(0, 212, 255, ${opacity * 2})`,
            animation: `matrix-rain ${20 + col * 2}s linear infinite`
          }}
        >
          {Array.from({ length: 50 }).map((_, row) => (
            <div key={row} className="leading-4">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}
      
      {/* Glowing highlights */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-cyber-green font-bold"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              opacity: opacity * 3,
              textShadow: `0 0 10px rgba(0, 255, 65, ${opacity * 2})`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
    </div>
  )

  const renderMinimalPattern = () => (
    <div className="absolute inset-0">
      {/* Subtle geometric shapes */}
      <div className="absolute inset-0">
        {/* Hexagonal pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: opacity * 0.5 }}>
          <defs>
            <pattern id="hexagon" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon 
                points="30,2 52,15 52,37 30,50 8,37 8,15" 
                fill="none" 
                stroke="#00D4FF" 
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)" />
        </svg>
        
        {/* Floating geometric elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-cyber-purple/20 rotate-45"
            style={{
              left: `${(i * 15 + 10) % 85}%`,
              top: `${(i * 23 + 20) % 70}%`,
              width: `${20 + (i % 3) * 10}px`,
              height: `${20 + (i % 3) * 10}px`,
              opacity: opacity * 2
            }}
          />
        ))}
        
        {/* Subtle glow points */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-pink rounded-full"
            style={{
              left: `${(i * 20 + 15) % 80}%`,
              top: `${(i * 30 + 25) % 75}%`,
              boxShadow: `0 0 15px rgba(255, 0, 122, ${opacity * 2})`,
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </div>
  )

  const renderPattern = () => {
    switch (variant) {
      case 'circuit':
        return renderCircuitPattern()
      case 'matrix':
        return renderMatrixPattern()
      case 'minimal':
        return renderMinimalPattern()
      default:
        return renderGridPattern()
    }
  }

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ zIndex: -1 }}
    >
      {renderPattern()}
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5"
        style={{ opacity: opacity * 0.5 }}
      />
    </motion.div>
  )
}