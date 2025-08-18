'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface CyberBackgroundProps {
  variant?: 'grid' | 'particles' | 'binary' | 'minimal'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export default function CyberBackground({ 
  variant = 'grid', 
  intensity = 'medium',
  className = '' 
}: CyberBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (variant === 'particles' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Particle system
      const particles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        color: string
        opacity: number
      }> = []

      const colors = ['#00D4FF', '#8B00FF', '#FF007A']
      const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2
        })
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle, index) => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Draw particle
          ctx.save()
          ctx.globalAlpha = particle.opacity
          ctx.fillStyle = particle.color
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          // Draw connections
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.save()
              ctx.globalAlpha = (1 - distance / 100) * 0.2
              ctx.strokeStyle = particle.color
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
              ctx.restore()
            }
          })
        })

        requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
      }
    }
  }, [variant, intensity])

  if (variant === 'grid') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    )
  }

  if (variant === 'binary') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 binary-rain opacity-20" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.1) 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, rgba(139, 0, 255, 0.1) 50%, transparent 100%)
            `
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    )
  }

  // Minimal variant
  return (
    <div className={`absolute inset-0 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-dark/95 to-cyber-dark"
        animate={{
          background: [
            'linear-gradient(135deg, #0A0A23 0%, #0A0A23 50%, #0A0A23 100%)',
            'linear-gradient(135deg, #0A0A23 0%, rgba(0, 212, 255, 0.05) 50%, #0A0A23 100%)',
            'linear-gradient(135deg, #0A0A23 0%, #0A0A23 50%, #0A0A23 100%)',
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-0 floating-particles opacity-40" />
    </div>
  )
}
