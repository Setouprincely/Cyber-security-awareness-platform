import { HTMLAttributes, forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'cyber' | 'neon' | 'gradient'
  showLabel?: boolean
  label?: string
  animated?: boolean
  striped?: boolean
  glow?: boolean
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    label,
    animated = false,
    striped = false,
    glow = false,
    ...props
  }, ref) => {
    const [displayValue, setDisplayValue] = useState(0)
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    // Animate progress value
    useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => {
          setDisplayValue(percentage)
        }, 100)
        return () => clearTimeout(timer)
      } else {
        setDisplayValue(percentage)
      }
    }, [percentage, animated])

    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    }

    const backgroundVariants = {
      default: 'bg-gray-200 dark:bg-gray-700',
      success: 'bg-gray-200 dark:bg-gray-700',
      warning: 'bg-gray-200 dark:bg-gray-700',
      danger: 'bg-gray-200 dark:bg-gray-700',
      cyber: 'bg-gray-900 border border-cyber-blue/30',
      neon: 'bg-black border-2 border-neon-blue/30',
      gradient: 'bg-gray-200 dark:bg-gray-700',
    }

    const fillVariants = {
      default: 'bg-primary-600',
      success: 'bg-success-600',
      warning: 'bg-warning-600',
      danger: 'bg-danger-600',
      cyber: 'bg-gradient-to-r from-cyber-blue to-cyber-purple',
      neon: 'bg-neon-blue',
      gradient: 'bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500',
    }

    const labelVariants = {
      default: 'text-gray-700 dark:text-gray-300',
      success: 'text-gray-700 dark:text-gray-300',
      warning: 'text-gray-700 dark:text-gray-300',
      danger: 'text-gray-700 dark:text-gray-300',
      cyber: 'text-cyber-blue',
      neon: 'text-neon-blue',
      gradient: 'text-gradient',
    }

    const glowEffects = {
      cyber: glow ? 'shadow-lg shadow-cyber-blue/30' : '',
      neon: glow ? 'shadow-lg shadow-neon-blue/50' : '',
      default: '',
      success: glow ? 'shadow-lg shadow-success-500/30' : '',
      warning: glow ? 'shadow-lg shadow-warning-500/30' : '',
      danger: glow ? 'shadow-lg shadow-danger-500/30' : '',
      gradient: glow ? 'shadow-lg shadow-purple-500/30' : '',
    }

    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-2">
            <span className={cn('text-sm font-medium', labelVariants[variant])}>
              {label || 'Progress'}
            </span>
            <span className={cn('text-sm', labelVariants[variant])}>
              {Math.round(displayValue)}%
            </span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'w-full rounded-full overflow-hidden relative',
            sizes[size],
            backgroundVariants[variant],
            glowEffects[variant],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out rounded-full relative',
              fillVariants[variant],
              striped && 'bg-stripes',
              animated && 'transition-all duration-1000',
              variant === 'cyber' && 'animate-neon-pulse',
              variant === 'neon' && 'animate-glow'
            )}
            style={{ width: `${displayValue}%` }}
          >
            {/* Shimmer effect for cyber variant */}
            {variant === 'cyber' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] animate-cyber-grid" />
            )}

            {/* Pulse effect for neon variant */}
            {variant === 'neon' && (
              <div className="absolute inset-0 bg-neon-blue animate-pulse opacity-50" />
            )}

            {/* Gradient animation for gradient variant */}
            {variant === 'gradient' && animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 animate-pulse opacity-70" />
            )}
          </div>

          {/* Striped pattern overlay */}
          {striped && (
            <div className="absolute inset-0 bg-stripes opacity-20" />
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
