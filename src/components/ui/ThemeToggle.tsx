'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ThemeToggle({ variant = 'button', size = 'md', className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  if (variant === 'switch') {
    return (
      <motion.div
        className={cn(
          'relative inline-flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300',
          className
        )}
        layout
      >
        <motion.button
          className={cn(
            'relative z-10 p-2 rounded-full transition-colors duration-300',
            resolvedTheme === 'light' 
              ? 'text-yellow-500' 
              : 'text-gray-400 hover:text-gray-300'
          )}
          onClick={() => setTheme('light')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Sun className={iconSize[size]} />
        </motion.button>
        
        <motion.button
          className={cn(
            'relative z-10 p-2 rounded-full transition-colors duration-300',
            resolvedTheme === 'dark' 
              ? 'text-blue-400' 
              : 'text-gray-400 hover:text-gray-600'
          )}
          onClick={() => setTheme('dark')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Moon className={iconSize[size]} />
        </motion.button>
        
        <motion.div
          className="absolute top-1 bottom-1 w-10 bg-white dark:bg-gray-600 rounded-full shadow-md"
          animate={{
            x: resolvedTheme === 'dark' ? 40 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.div>
    )
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <Button
          variant="ghost"
          size={size}
          onClick={() => {
            if (theme === 'light') setTheme('dark')
            else if (theme === 'dark') setTheme('system')
            else setTheme('light')
          }}
          className="relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {resolvedTheme === 'light' && (
              <motion.div
                key="light"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className={iconSize[size]} />
              </motion.div>
            )}
            {resolvedTheme === 'dark' && (
              <motion.div
                key="dark"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className={iconSize[size]} />
              </motion.div>
            )}
            {theme === 'system' && (
              <motion.div
                key="system"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Monitor className={iconSize[size]} />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    )
  }

  // Default button variant
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn('relative overflow-hidden', className)}
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === 'light' && (
          <motion.div
            key="light"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <Sun className={cn(iconSize[size], 'text-yellow-500')} />
          </motion.div>
        )}
        {resolvedTheme === 'dark' && (
          <motion.div
            key="dark"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <Moon className={cn(iconSize[size], 'text-blue-400')} />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// Cyber-themed variant
export function CyberThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      className={cn(
        'relative p-3 rounded-lg bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 backdrop-blur-sm transition-all duration-300 hover:from-cyber-blue/30 hover:to-cyber-purple/30',
        className
      )}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {resolvedTheme === 'light' && (
          <motion.div
            key="light"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="text-cyber-blue"
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        )}
        {resolvedTheme === 'dark' && (
          <motion.div
            key="dark"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="text-cyber-purple"
          >
            <Moon className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cyber glow effect */}
      <div className="absolute inset-0 rounded-lg border border-cyber-blue animate-neon-pulse opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}
