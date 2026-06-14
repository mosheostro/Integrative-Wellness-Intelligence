'use client'
import { useEffect, useRef } from 'react'

interface WellnessOrbProps {
  score: number    // 0-100
  state: string
  size?: number
}

// Procedural particle orb — GPU-accelerated canvas
export function WellnessOrb({ score, state, size = 320 }: WellnessOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const cx = size / 2, cy = size / 2
    const R  = size * 0.32

    // Score-driven palette
    const hue = score >= 70 ? 150   // green-teal
              : score >= 50 ? 40    // gold
              : score >= 35 ? 20    // orange
              : 0                   // red
    const saturation = 45 + score * 0.3
    const lightness  = 38 + score * 0.1

    interface Particle {
      angle: number
      radius: number
      speed: number
      size: number
      opacity: number
      phase: number
    }

    // Fibonacci sphere distribution
    const COUNT = 180
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => {
      const t = i / COUNT
      return {
        angle:   i * 2.399963, // golden angle
        radius:  R * (0.6 + 0.4 * Math.pow(t, 0.5)),
        speed:   0.0004 + Math.random() * 0.0008,
        size:    1 + Math.random() * 2.2,
        opacity: 0.3 + Math.random() * 0.6,
        phase:   Math.random() * Math.PI * 2,
      }
    })

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, size, size)

      // Ambient glow
      const grd = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.3)
      grd.addColorStop(0, `hsla(${hue},${saturation}%,${lightness + 20}%,0.12)`)
      grd.addColorStop(0.6, `hsla(${hue},${saturation}%,${lightness}%,0.06)`)
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2)
      ctx.fill()

      // Core sphere
      const coreGrd = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.2, 0, cx, cy, R * 0.85)
      coreGrd.addColorStop(0, `hsla(${hue},${saturation - 10}%,${lightness + 30}%,0.5)`)
      coreGrd.addColorStop(0.5, `hsla(${hue},${saturation}%,${lightness}%,0.2)`)
      coreGrd.addColorStop(1, `hsla(${hue},${saturation + 10}%,${lightness - 10}%,0.05)`)
      ctx.fillStyle = coreGrd
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.85, 0, Math.PI * 2)
      ctx.fill()

      // Particles
      t += 0.005
      for (const p of particles) {
        const phi = p.angle + t * p.speed * 100
        const theta = Math.acos(1 - 2 * (particles.indexOf(p) / COUNT))
        const perspective = 1 + Math.sin(theta + t * 0.3) * 0.35

        const px = cx + Math.cos(phi) * p.radius * Math.sin(theta) * perspective
        const py = cy + Math.sin(phi * 0.7 + p.phase) * p.radius * 0.6 * perspective
        const pz = Math.cos(theta) * perspective

        const alpha = p.opacity * (0.4 + pz * 0.6) * (0.7 + 0.3 * Math.sin(t * 2 + p.phase))
        const ps    = p.size * (0.5 + pz * 0.5)

        ctx.beginPath()
        ctx.arc(px, py, ps, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue + pz * 20},${saturation}%,${lightness + pz * 20}%,${alpha})`
        ctx.fill()
      }

      // Score text
      ctx.save()
      ctx.font = `600 ${size * 0.14}px Spectral, serif`
      ctx.fillStyle = `hsl(${hue},${saturation}%,${Math.max(25, lightness - 10)}%)`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(score), cx, cy - size * 0.04)
      ctx.font = `400 ${size * 0.052}px Hanken Grotesk, sans-serif`
      ctx.fillStyle = `hsla(${hue},${saturation - 10}%,${lightness}%,0.75)`
      ctx.fillText(state.replace(/_/g, ' '), cx, cy + size * 0.09)
      ctx.restore()

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [score, state, size, hue])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block', margin: '0 auto' }}
      aria-label={`Wellness score: ${score}, state: ${state}`}
    />
  )
}
