'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Container, Engine } from "@tsparticles/engine"

interface CyberParticlesProps {
  id?: string
  className?: string
  variant?: 'matrix' | 'cyber' | 'neon' | 'minimal'
  density?: number
  speed?: number
  color?: string
}

export function CyberParticles({ 
  id = "cyber-particles",
  className = "",
  variant = 'cyber',
  density = 80,
  speed = 1,
  color = "#00d4ff"
}: CyberParticlesProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log(container)
  }, [])

  const options = useMemo(() => {
    const baseConfig = {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: density,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }

    // Variant-specific configurations
    switch (variant) {
      case 'matrix':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: "#00ff41" },
            links: {
              ...baseConfig.particles.links,
              color: "#00ff41",
              opacity: 0.2,
            },
            move: {
              ...baseConfig.particles.move,
              direction: "bottom" as const,
              speed: speed * 2,
            },
            shape: {
              type: "char",
              character: {
                value: ["0", "1", "ア", "イ", "ウ", "エ", "オ"],
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true,
              },
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
          },
        }

      case 'neon':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            color: { value: ["#00f5ff", "#bf7af0", "#ff6ec7"] },
            links: {
              ...baseConfig.particles.links,
              enable: false,
            },
            move: {
              ...baseConfig.particles.move,
              speed: speed * 0.5,
            },
            opacity: {
              value: { min: 0.3, max: 1 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.3,
              },
            },
            size: {
              value: { min: 2, max: 6 },
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 2,
              },
            },
          },
        }

      case 'minimal':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            number: {
              ...baseConfig.particles.number,
              value: density * 0.3,
            },
            links: {
              ...baseConfig.particles.links,
              opacity: 0.1,
              width: 0.5,
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: { min: 0.5, max: 1.5 },
            },
          },
        }

      default: // cyber
        return baseConfig
    }
  }, [variant, density, speed, color])

  if (!init) {
    return null
  }

  return (
    <Particles
      id={id}
      className={className}
      particlesLoaded={particlesLoaded}
      options={options}
    />
  )
}
