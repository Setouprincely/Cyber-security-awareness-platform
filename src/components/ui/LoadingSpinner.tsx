'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'white'
  text?: string
  fullScreen?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const colorClasses = {
  blue: 'border-cyber-blue',
  purple: 'border-cyber-purple',
  pink: 'border-cyber-pink',
  green: 'border-cyber-green',
  white: 'border-cyber-white'
}

export default function LoadingSpinner({
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
  className = ''
}: LoadingSpinnerProps) {
  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Main Spinner */}
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Spinner */}
        <motion.div
          className={`absolute inset-2 border-2 ${colorClasses[color]} border-b-transparent rounded-full opacity-60`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full`}
          style={{
            boxShadow: `0 0 20px ${color === 'blue' ? '#00D4FF' : 
                                   color === 'purple' ? '#8B00FF' : 
                                   color === 'pink' ? '#FF007A' : 
                                   color === 'green' ? '#00FF41' : '#E0E0E0'}40`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          className={`text-sm font-medium ${
            color === 'blue' ? 'text-cyber-blue' :
            color === 'purple' ? 'text-cyber-purple' :
            color === 'pink' ? 'text-cyber-pink' :
            color === 'green' ? 'text-cyber-green' :
            'text-cyber-white'
          }`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}

      {/* Loading Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              color === 'blue' ? 'bg-cyber-blue' :
              color === 'purple' ? 'bg-cyber-purple' :
              color === 'pink' ? 'bg-cyber-pink' :
              color === 'green' ? 'bg-cyber-green' :
              'bg-cyber-white'
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-cyber-dark/80 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-cyber-dark/90 backdrop-blur-md border border-cyber-blue/30 rounded-lg p-8 shadow-2xl">
          {spinnerContent}
        </div>
      </motion.div>
    )
  }

  return spinnerContent
}

// Skeleton Loader Component
interface SkeletonProps {
  className?: string
  animate?: boolean
}

export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-cyber-blue/10 rounded ${className}`}
      animate={animate ? {
        opacity: [0.5, 0.8, 0.5]
      } : {}}
      transition={animate ? {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    />
  )
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="glass-cyber-dark rounded-lg p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: cols }).map((_, index) => (
          <Skeleton key={index} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}