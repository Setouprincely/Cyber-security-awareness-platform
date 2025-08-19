'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  colors?: string[]
  speed?: number
  size?: { min: number; max: number }
  opacity?: { min: number; max: number }
  interactive?: boolean
  className?: string
}

export default function ParticleBackground({
  particleCount = 50,
  colors = ['#00D4FF', '#8B00FF', '#FF007A', '#00FF41'],
  speed = 0.5,
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.8 },
  interactive = true,
  className = ''
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const maxLife = 200 + Math.random() * 300
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: size.min + Math.random() * (size.max - size.min),
      opacity: opacity.min + Math.random() * (opacity.max - opacity.min),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: maxLife,
      maxLife
    }
  }, [colors, speed, size, opacity])

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas))
  }, [particleCount, createParticle])

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    // Update position
    particle.x += particle.vx
    particle.y += particle.vy

    // Interactive mouse effect
    if (interactive) {
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.01
        particle.vy += (dy / distance) * force * 0.01
      }
    }

    // Boundary collision
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    }

    // Update life
    particle.life--
    particle.opacity = (particle.life / particle.maxLife) * (opacity.min + Math.random() * (opacity.max - opacity.min))

    // Reset particle if life is over
    if (particle.life <= 0) {
      Object.assign(particle, createParticle(canvas))
    }
  }, [interactive, opacity, createParticle])

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.shadowBlur = 10
    ctx.shadowColor = particle.color
    
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }, [])

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.2
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.strokeStyle = '#00D4FF'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas)
      drawParticle(ctx, particle)
    })

    // Draw connections
    drawConnections(ctx, particlesRef.current)

    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticle, drawParticle, drawConnections])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Reinitialize particles with new canvas size
    initParticles(canvas)
  }, [initParticles])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set initial canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Initialize particles
    initParticles(canvas)

    // Start animation
    animate()

    // Event listeners
    window.addEventListener('resize', handleResize)
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [animate, handleResize, handleMouseMove, initParticles, interactive])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ 
        background: 'transparent',
        zIndex: -1
      }}
    />
  )
}