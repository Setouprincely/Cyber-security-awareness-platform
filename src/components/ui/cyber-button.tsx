'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const cyberButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-dark hover:scale-105 hover:shadow-lg',
        secondary: 'border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-cyber-dark',
        danger: 'bg-gradient-to-r from-cyber-red to-red-600 text-white hover:scale-105',
        success: 'bg-gradient-to-r from-cyber-green to-green-600 text-cyber-dark hover:scale-105',
        ghost: 'text-cyber-blue hover:bg-cyber-blue/10 hover:text-cyber-blue',
        outline: 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-cyber-dark',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      glow: {
        none: '',
        blue: 'hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]',
        purple: 'hover:shadow-[0_0_20px_rgba(139,0,255,0.5)]',
        pink: 'hover:shadow-[0_0_20px_rgba(255,0,122,0.5)]',
        green: 'hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]',
        red: 'hover:shadow-[0_0_20px_rgba(255,7,58,0.5)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      glow: 'blue',
    },
  }
)

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean
  loading?: boolean
  pulseOnHover?: boolean
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, glow, asChild = false, loading = false, pulseOnHover = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button

    const buttonContent = (
      <>
        {/* Animated background overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        {/* Button content */}
        <motion.span
          className={cn('relative z-10', loading && 'opacity-0')}
          whileHover={pulseOnHover ? { scale: 1.05 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </>
    )

    if (asChild) {
      return (
        <Slot
          className={cn(cyberButtonVariants({ variant, size, glow, className }))}
          ref={ref}
          {...props}
        >
          {buttonContent}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(cyberButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        disabled={loading || props.disabled}
        {...props}
      >
        {buttonContent}
      </motion.button>
    )
  }
)
CyberButton.displayName = 'CyberButton'

export { CyberButton, cyberButtonVariants }
