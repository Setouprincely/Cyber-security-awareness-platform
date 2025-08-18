import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass' | 'cyber' | 'neon' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animation?: 'none' | 'hover' | 'float' | 'glow' | 'pulse'
  interactive?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    animation = 'none',
    interactive = false,
    children,
    ...props
  }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
      outlined: 'bg-white border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600',
      elevated: 'bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-900/20',
      glass: 'glass dark:glass-dark border border-white/20 dark:border-white/10 backdrop-blur-md',
      cyber: 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 border border-cyber-blue/30 cyber-border',
      neon: 'bg-black/80 border-2 border-neon-blue neon-glow hover:shadow-neon-blue/50',
      gradient: 'bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 border border-primary-200 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20 dark:border-primary-700',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    const animations = {
      none: '',
      hover: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      float: 'animate-float',
      glow: 'hover:animate-glow',
      pulse: 'animate-pulse-slow',
    }

    const interactiveStyles = interactive
      ? 'cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl'
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-300',
          variants[variant],
          paddings[padding],
          animations[animation],
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}

        {/* Cyber grid overlay for cyber variant */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 cyber-grid-bg opacity-10 rounded-lg pointer-events-none" />
        )}

        {/* Floating particles for glass variant */}
        {variant === 'glass' && (
          <div className="absolute inset-0 floating-particles rounded-lg pointer-events-none" />
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
      {...props}
    />
  )
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
