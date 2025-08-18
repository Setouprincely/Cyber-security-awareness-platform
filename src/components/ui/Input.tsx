import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'cyber' | 'glass' | 'neon'
  animation?: 'none' | 'glow' | 'pulse' | 'float'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    animation = 'none',
    id,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const variants = {
      default: 'bg-white border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:border-primary-400',
      cyber: 'bg-gray-900/50 border border-cyber-blue/30 text-cyber-blue focus:border-cyber-blue focus:ring-cyber-blue/20 placeholder-cyber-blue/50',
      glass: 'glass dark:glass-dark border border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20',
      neon: 'bg-black/80 border-2 border-neon-blue text-neon-blue focus:border-neon-blue focus:ring-neon-blue/20 placeholder-neon-blue/50 focus:shadow-lg focus:shadow-neon-blue/20',
    }

    const animations = {
      none: '',
      glow: 'focus:animate-glow',
      pulse: 'animate-pulse-slow',
      float: 'hover:animate-float',
    }

    const labelVariants = {
      default: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
      cyber: 'block text-sm font-medium text-cyber-blue mb-2 animate-neon-pulse',
      glass: 'block text-sm font-medium text-white/90 mb-2',
      neon: 'block text-sm font-medium text-neon-blue mb-2 animate-neon-pulse',
    }

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={labelVariants[variant]}>
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <span className={variant === 'cyber' || variant === 'neon' ? 'text-current' : 'text-gray-400'}>
                {leftIcon}
              </span>
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 rounded-md text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
              variants[variant],
              animations[animation],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-danger-300 focus:border-danger-500 focus:ring-danger-500',
              isFocused && variant === 'cyber' && 'shadow-lg shadow-cyber-blue/20',
              isFocused && variant === 'neon' && 'shadow-lg shadow-neon-blue/30',
              className
            )}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
              <span className={variant === 'cyber' || variant === 'neon' ? 'text-current' : 'text-gray-400'}>
                {rightIcon}
              </span>
            </div>
          )}

          {/* Cyber glow effect */}
          {variant === 'cyber' && isFocused && (
            <div className="absolute inset-0 rounded-md border border-cyber-blue animate-neon-pulse pointer-events-none" />
          )}

          {/* Neon glow effect */}
          {variant === 'neon' && isFocused && (
            <div className="absolute inset-0 rounded-md border-2 border-neon-blue animate-neon-pulse pointer-events-none" />
          )}

          {/* Glass shimmer effect */}
          {variant === 'glass' && (
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-danger-600 animate-slide-down">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
