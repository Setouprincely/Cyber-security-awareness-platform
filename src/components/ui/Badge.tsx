import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'cyber' | 'neon' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animation?: 'none' | 'pulse' | 'glow' | 'bounce' | 'float'
  icon?: React.ReactNode
  dot?: boolean
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    animation = 'none',
    icon,
    dot = false,
    children,
    ...props
  }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
      danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-400',
      info: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
      outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
      cyber: 'bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 text-cyber-blue border border-cyber-blue/30 backdrop-blur-sm',
      neon: 'bg-black/80 text-neon-blue border-2 border-neon-blue shadow-lg shadow-neon-blue/30',
      glass: 'glass dark:glass-dark text-white border border-white/20 backdrop-blur-md',
      gradient: 'bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-white shadow-lg',
    }

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base',
      xl: 'px-4 py-2.5 text-lg',
    }

    const animations = {
      none: '',
      pulse: 'animate-pulse-slow',
      glow: 'animate-glow',
      bounce: 'animate-bounce-slow',
      float: 'animate-float',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium transition-all duration-300 relative',
          variants[variant],
          sizes[size],
          animations[animation],
          variant === 'cyber' && 'animate-neon-pulse',
          variant === 'neon' && 'hover:shadow-neon-blue/50',
          className
        )}
        {...props}
      >
        {dot && (
          <span className={cn(
            'w-2 h-2 rounded-full mr-2',
            variant === 'success' && 'bg-success-500',
            variant === 'warning' && 'bg-warning-500',
            variant === 'danger' && 'bg-danger-500',
            variant === 'info' && 'bg-primary-500',
            variant === 'cyber' && 'bg-cyber-blue animate-pulse',
            variant === 'neon' && 'bg-neon-blue animate-pulse',
            variant === 'default' && 'bg-gray-500'
          )} />
        )}
        {icon && (
          <span className="mr-1.5">{icon}</span>
        )}
        {children}

        {/* Cyber shimmer effect */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 rounded-full" />
        )}

        {/* Neon glow effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 rounded-full border-2 border-neon-blue animate-neon-pulse opacity-50" />
        )}

        {/* Glass particles */}
        {variant === 'glass' && (
          <div className="absolute inset-0 floating-particles rounded-full" />
        )}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
