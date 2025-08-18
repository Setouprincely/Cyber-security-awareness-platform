'use client'

import { HTMLAttributes, forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyber' | 'neon' | 'minimal'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
  border?: boolean
  glow?: boolean
  interactive?: boolean
  tilt?: boolean
  children: React.ReactNode
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className,
    variant = 'default',
    blur = 'md',
    opacity = 0.1,
    border = true,
    glow = false,
    interactive = false,
    tilt = false,
    children,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl',
    }
    
    const variants = {
      'default': {
        background: `rgba(255, 255, 255, ${opacity})`,
        borderColor: border ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        boxShadow: glow ? '0 8px 32px rgba(31, 38, 135, 0.37)' : 'none',
      },
      'cyber': {
        background: `rgba(0, 212, 255, ${opacity * 0.5})`,
        borderColor: border ? 'rgba(0, 212, 255, 0.3)' : 'transparent',
        boxShadow: glow ? '0 8px 32px rgba(0, 212, 255, 0.3)' : 'none',
      },
      'neon': {
        background: `rgba(0, 245, 255, ${opacity * 0.3})`,
        borderColor: border ? 'rgba(0, 245, 255, 0.5)' : 'transparent',
        boxShadow: glow ? '0 0 20px rgba(0, 245, 255, 0.5)' : 'none',
      },
      'minimal': {
        background: `rgba(255, 255, 255, ${opacity * 0.5})`,
        borderColor: border ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        boxShadow: 'none',
      },
    }
    
    const currentVariant = variants[variant as keyof typeof variants] || variants['default']
    
    const motionProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      whileHover: interactive ? {
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      } : undefined,
      whileTap: interactive ? { scale: 0.98 } : undefined,
    }
    
    const tiltProps = tilt ? {
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10
        
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      },
      onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      }
    } : {}
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-xl p-6 transition-all duration-300',
          blurClasses[blur],
          border && 'border',
          interactive && 'cursor-pointer',
          className
        )}
        style={{
          background: currentVariant?.background || `rgba(255, 255, 255, ${opacity})`,
          borderColor: currentVariant?.borderColor || 'transparent',
          boxShadow: isHovered && glow ? currentVariant?.boxShadow || 'none' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...motionProps}
        {...tiltProps}
        {...props}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] transition-transform duration-1000",
              isHovered && "translate-x-[100%]"
            )}
          />
        </div>
        
        {/* Cyber grid overlay */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 cyber-grid-bg opacity-20 rounded-xl" />
        )}
        
        {/* Neon pulse overlay */}
        {variant === 'neon' && glow && (
          <div className="absolute inset-0 rounded-xl border border-neon-blue animate-neon-pulse opacity-30" />
        )}
        
        {/* Floating particles */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 floating-particles rounded-xl" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Corner accents for cyber variant */}
        {variant === 'cyber' && (
          <>
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyber-blue opacity-60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyber-blue opacity-60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyber-blue opacity-60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyber-blue opacity-60" />
          </>
        )}
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export { GlassCard }
