import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'cyber' | 'neon' | 'glass' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
  animation?: 'none' | 'glow' | 'float' | 'pulse' | 'bounce'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    animation = 'none',
    icon,
    iconPosition = 'left',
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden'

    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 hover:shadow-lg',
      secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus:ring-secondary-500 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 hover:shadow-lg',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800',
      cyber: 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:from-cyber-blue/80 hover:to-cyber-purple/80 focus:ring-cyber-blue hover:shadow-xl hover:scale-105 neon-glow',
      neon: 'bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black focus:ring-neon-blue hover:shadow-lg hover:shadow-neon-blue/50 hover:scale-105',
      glass: 'glass dark:glass-dark text-white hover:bg-white/20 dark:hover:bg-black/30 focus:ring-white/50 backdrop-blur-md',
      gradient: 'bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 text-white hover:from-primary-600 hover:via-purple-600 hover:to-pink-600 focus:ring-purple-500 hover:shadow-xl hover:scale-105',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
    }

    const animations = {
      none: '',
      glow: 'hover:animate-glow',
      float: 'hover:animate-float',
      pulse: 'animate-pulse-slow',
      bounce: 'hover:animate-bounce-slow',
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          animations[animation],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}

        {/* Cyber effect overlay */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
        )}

        {/* Neon pulse effect */}
        {variant === 'neon' && (
          <div className="absolute inset-0 rounded-md border-2 border-neon-blue animate-neon-pulse opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
