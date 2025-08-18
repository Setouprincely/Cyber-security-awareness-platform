'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  variant?: 'default' | 'cyber' | 'neon' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  glow?: boolean
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  variant = 'default',
  size = 'md',
  glow = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })
    
    return unsubscribe
  }, [springValue])

  const formatValue = (val: number) => {
    return prefix + val.toFixed(decimals) + suffix
  }

  const variants = {
    default: 'text-gray-900 dark:text-gray-100',
    cyber: 'text-cyber-blue animate-neon-pulse',
    neon: 'text-neon-blue',
    gradient: 'text-gradient bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
  }

  const sizes = {
    sm: 'text-lg font-semibold',
    md: 'text-2xl font-bold',
    lg: 'text-4xl font-bold',
    xl: 'text-6xl font-bold',
  }

  const glowEffects = {
    cyber: glow ? 'drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]' : '',
    neon: glow ? 'drop-shadow-[0_0_10px_rgba(0,245,255,0.7)]' : '',
    default: '',
    gradient: glow ? 'drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]' : '',
  }

  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block tabular-nums transition-all duration-300',
        variants[variant],
        sizes[size],
        glowEffects[variant],
        className
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
    >
      {formatValue(displayValue)}
    </motion.span>
  )
}

// Preset counter components for common use cases
export function SecurityScore({ score, className }: { score: number; className?: string }) {
  const getVariant = (score: number) => {
    if (score >= 80) return 'cyber'
    if (score >= 60) return 'gradient'
    if (score >= 40) return 'neon'
    return 'default'
  }

  return (
    <div className={cn('text-center', className)}>
      <AnimatedCounter
        value={score}
        suffix="%"
        variant={getVariant(score)}
        size="xl"
        glow={true}
        duration={2.5}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Security Score
      </div>
    </div>
  )
}

export function ThreatCounter({ threats, className }: { threats: number; className?: string }) {
  return (
    <div className={cn('text-center', className)}>
      <AnimatedCounter
        value={threats}
        variant="neon"
        size="lg"
        glow={true}
        duration={1.5}
      />
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Threats Detected
      </div>
    </div>
  )
}

export function TrainingProgress({ completed, total, className }: { completed: number; total: number; className?: string }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className={cn('text-center', className)}>
      <div className="flex items-center justify-center gap-2">
        <AnimatedCounter
          value={completed}
          variant="cyber"
          size="lg"
          glow={true}
          duration={1.5}
        />
        <span className="text-gray-400">/</span>
        <AnimatedCounter
          value={total}
          variant="default"
          size="lg"
          duration={1.5}
          delay={0.5}
        />
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Training Modules
      </div>
      <div className="mt-2">
        <AnimatedCounter
          value={percentage}
          suffix="%"
          variant="gradient"
          size="md"
          decimals={1}
          duration={2}
          delay={1}
        />
      </div>
    </div>
  )
}

export function PhishingStats({ 
  detected, 
  missed, 
  className 
}: { 
  detected: number; 
  missed: number; 
  className?: string 
}) {
  const total = detected + missed
  const accuracy = total > 0 ? (detected / total) * 100 : 0

  return (
    <div className={cn('grid grid-cols-3 gap-4 text-center', className)}>
      <div>
        <AnimatedCounter
          value={detected}
          variant="cyber"
          size="lg"
          glow={true}
          duration={1.5}
        />
        <div className="text-xs text-green-500 mt-1">Detected</div>
      </div>
      <div>
        <AnimatedCounter
          value={missed}
          variant="neon"
          size="lg"
          glow={true}
          duration={1.5}
          delay={0.3}
        />
        <div className="text-xs text-red-500 mt-1">Missed</div>
      </div>
      <div>
        <AnimatedCounter
          value={accuracy}
          suffix="%"
          variant="gradient"
          size="lg"
          glow={true}
          duration={2}
          delay={0.6}
          decimals={1}
        />
        <div className="text-xs text-purple-500 mt-1">Accuracy</div>
      </div>
    </div>
  )
}
