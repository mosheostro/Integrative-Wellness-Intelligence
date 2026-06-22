'use client'

// ============================================================
// HOLOS — Assessment Completion WOW Moment
// Cinematic sequence: particle burst → score reveal → analysis text
// Uses Framer Motion (no new deps needed).
// ============================================================

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WowCompletionScreenProps {
  score: number           // 0-100
  framework: string       // e.g. "Ayurveda"
  analysingLabel: string  // locale-aware "Analysing [framework]..."
  calculatingLabel: string
}

// Canvas particle burst
function useParticleBurst(canvasRef: React.RefObject<HTMLCanvasElement | null>, score: number) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const W = canvas.width  = canvas.offsetWidth  * (window.devicePixelRatio || 1)
    const H = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
    const cx = W / 2, cy = H / 2

    // Score → hue
    const hue = score >= 70 ? 155 : score >= 50 ? 42 : score >= 35 ? 24 : 350

    interface Particle {
      x: number; y: number
      vx: number; vy: number
      radius: number
      hue: number; alpha: number
      life: number; maxLife: number
    }

    const COUNT = 120
    const particles: Particle[] = Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const speed = 1.5 + Math.random() * 4.5
      const hueVariance = hue + (Math.random() - 0.5) * 50
      const maxLife = 90 + Math.random() * 60
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 1.5,
        radius: 1.5 + Math.random() * 3,
        hue: hueVariance,
        alpha: 0.85 + Math.random() * 0.15,
        life: 0, maxLife,
      }
    })

    let frame = 0
    let raf: number

    function tick() {
      ctx.clearRect(0, 0, W, H)
      frame++

      let alive = false
      for (const p of particles) {
        p.life++
        p.vy += 0.04  // gravity
        p.vx *= 0.98
        p.vy *= 0.98
        p.x += p.vx
        p.y += p.vy

        const progress = p.life / p.maxLife
        const alpha = p.alpha * (1 - progress) * (progress < 0.1 ? progress * 10 : 1)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (1 - progress * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 62%, ${alpha})`
        ctx.fill()

        if (p.life < p.maxLife) alive = true
      }

      if (alive && frame < 200) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, W, H)
      }
    }

    // Short delay before burst
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick) }, 200)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [])
}

// Score count-up hook
function useCountUp(target: number, delay: number = 600, duration: number = 1400) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
        setDisplay(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, delay, duration])
  return display
}

export function WowCompletionScreen({
  score,
  framework,
  analysingLabel,
  calculatingLabel,
}: WowCompletionScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const displayScore = useCountUp(score, 500, 1500)
  useParticleBurst(canvasRef as React.RefObject<HTMLCanvasElement>, score)

  // Score → theme color
  const hue = score >= 70 ? 155 : score >= 50 ? 42 : score >= 35 ? 24 : 350
  const coreColor = `hsl(${hue}, 52%, 46%)`
  const bg = `radial-gradient(ellipse 80% 80% at 50% 50%, hsl(${hue},40%,96%) 0%, var(--canvas) 70%)`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: bg,
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas — behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Score reveal */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.9, type: 'spring', damping: 14, stiffness: 100 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        {/* Outer ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          style={{
            width: 200, height: 200, borderRadius: '50%',
            border: `1.5px solid ${coreColor}22`,
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.4 }}
          style={{
            width: 160, height: 160, borderRadius: '50%',
            border: `1px solid ${coreColor}18`,
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Score number */}
        <div style={{ position: 'relative' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(4rem, 14vw, 7rem)',
              fontWeight: 600,
              color: coreColor,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              display: 'block',
            }}
          >
            {displayScore}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: `hsl(${hue}, 35%, 55%)`,
              letterSpacing: '0.1em',
            }}
          >
            /100
          </span>
        </div>
      </motion.div>

      {/* Labels */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        style={{ marginTop: 48, textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '.92rem',
            color: 'var(--ink-soft)',
            letterSpacing: '0.03em',
          }}
        >
          {analysingLabel}
        </p>
      </motion.div>

      {/* Progress dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        style={{
          display: 'flex', gap: 6, marginTop: 28,
          position: 'relative', zIndex: 1,
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: coreColor,
            }}
          />
        ))}
      </motion.div>

      {/* Ambient ring pulse */}
      <AnimatePresence>
        <motion.div
          key="ring-pulse"
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 2.5, delay: 0.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 180, height: 180,
            borderRadius: '50%',
            border: `2px solid ${coreColor}`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <motion.div
          key="ring-pulse-2"
          initial={{ scale: 0.5, opacity: 0.3 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 2.0, delay: 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 220, height: 220,
            borderRadius: '50%',
            border: `1px solid ${coreColor}`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      </AnimatePresen