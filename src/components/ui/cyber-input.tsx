'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  glowColor?: 'blue' | 'purple' | 'pink' | 'green' | 'red'
  animatedLabel?: boolean
}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    icon, 
    rightIcon, 
    glowColor = 'blue', 
    animatedLabel = true,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const glowColors = {
      blue: 'focus:shadow-[0_0_10px_rgba(0,212,255,0.3)] focus:border-cyber-blue',
      purple: 'focus:shadow-[0_0_10px_rgba(139,0,255,0.3)] focus:border-cyber-purple',
      pink: 'focus:shadow-[0_0_10px_rgba(255,0,122,0.3)] focus:border-cyber-pink',
      green: 'focus:shadow-[0_0_10px_rgba(0,255,65,0.3)] focus:border-cyber-green',
      red: 'focus:shadow-[0_0_10px_rgba(255,7,58,0.3)] focus:border-cyber-red',
    }

    const errorGlow = error ? 'border-cyber-red shadow-[0_0_10px_rgba(255,7,58,0.3)]' : ''

    return (
      <div className="relative w-full">
        {/* Static Label */}
        {label && !animatedLabel && (
          <label className="block text-sm font-medium text-cyber-white/70 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-white/50 z-10">
              {icon}
            </div>
          )}

          {/* Input Field */}
          <motion.input
            type={type}
            className={cn(
              'w-full px-4 py-3 bg-cyber-dark/50 border-2 border-cyber-blue/30 rounded-lg text-cyber-white placeholder-cyber-white/30 transition-all duration-300 outline-none backdrop-blur-sm',
              icon && 'pl-10',
              rightIcon && 'pr-10',
              glowColors[glowColor],
              errorGlow,
              className
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            {...props}
          />

          {/* Animated Label */}
          {label && animatedLabel && (
            <motion.label
              className={cn(
                'absolute left-4 pointer-events-none transition-all duration-300',
                icon && 'left-10',
                (isFocused || hasValue || props.value) 
                  ? 'top-0 -translate-y-1/2 text-xs bg-cyber-dark px-2 text-cyber-blue' 
                  : 'top-1/2 -translate-y-1/2 text-cyber-white/50'
              )}
              animate={{
                y: (isFocused || hasValue || props.value) ? '-50%' : '-50%',
                scale: (isFocused || hasValue || props.value) ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-white/50 z-10">
              {rightIcon}
            </div>
          )}

          {/* Focus Ring Animation */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-cyber-blue pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  boxShadow: `0 0 20px rgba(0, 212, 255, 0.3)`,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-2 text-sm text-cyber-red flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: [0, -2, 2, -2, 2, 0] // Shake animation
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                opacity: { duration: 0.2 },
                y: { duration: 0.2 },
                x: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
              }}
            >
              <span className="text-cyber-red">⚠</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
CyberInput.displayName = 'CyberInput'

export { CyberInput }
