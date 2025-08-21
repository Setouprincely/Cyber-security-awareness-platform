'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import StaticCyberBackground from '../ui/StaticCyberBackground'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

interface LayoutProps {
  children: React.ReactNode
  showNavbar?: boolean
  showParticles?: boolean
  className?: string
}

export default function Layout({ 
  children, 
  showNavbar = true, 
  showParticles = true,
  className = '' 
}: LayoutProps) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <LoadingSpinner 
          size="xl" 
          color="blue" 
          text="Initializing Cyber Defense Network..." 
        />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-cyber-dark text-cyber-white relative overflow-hidden ${className}`}>
      {/* Global Cyber Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5" />
        
        {/* Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10" />
        
        {/* Static Cyber Background */}
        {showParticles && (
          <StaticCyberBackground
            variant="grid"
            opacity={0.15}
          />
        )}
      </div>

      {/* Navigation */}
      {showNavbar && <Navbar />}

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {children}
      </motion.main>

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-cyber-blue/20 backdrop-blur-md border border-cyber-blue/30 rounded-full text-cyber-blue hover:bg-cyber-blue/30 transition-all duration-300 shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>

      {/* Global Loading Overlay */}
      <div id="loading-overlay" />
      
      {/* Global Modal Container */}
      <div id="modal-root" />
    </div>
  )
}

// Page Container Component
interface PageContainerProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
}

export function PageContainer({ 
  children, 
  title, 
  subtitle, 
  className = '',
  maxWidth = '7xl'
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {title && (
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-cyber-white/70 text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Section Component
interface SectionProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  background?: 'transparent' | 'glass' | 'solid'
}

export function Section({ 
  children, 
  title, 
  subtitle, 
  className = '',
  background = 'transparent'
}: SectionProps) {
  const backgroundClasses = {
    transparent: '',
    glass: 'glass-cyber-dark',
    solid: 'bg-cyber-dark/50'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-12 ${backgroundClasses[background]} ${background !== 'transparent' ? 'rounded-lg p-8' : ''} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-blue-purple mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-cyber-white/70 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {children}
    </motion.section>
  )
}

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function Card({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  onClick 
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`
        glass-cyber-dark rounded-lg p-6 border border-cyber-blue/30 
        ${hover ? 'hover:border-cyber-blue/50 transition-all duration-300' : ''}
        ${glow ? 'hover:shadow-lg hover:shadow-cyber-blue/20' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}