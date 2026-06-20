'use client'
import { useEffect, useRef } from 'react'

interface WellnessOrbProps {
  score: number    // 0-100
  state: string
  size?: number
  values?: number[] // 9 dimension values 0-100 [nutrition, sleep, recovery, stress-inv, movement, energy, emotional, balance, purpose]
}

// Dimension node palette — one per wellness dimension
const DIM_NODES = [
  { hue: 42,  sat: 82, lit: 55 }, // nutrition    — gold
  { hue: 240, sat: 70, lit: 65 }, // sleep        — indigo
  { hue: 158, sat: 62, lit: 48 }, // recovery     — sage
  { hue: 350, sat: 78, lit: 63 }, // stress/calm  — rose
  { hue: 24,  sat: 75, lit: 58 }, // movement     — clay/amber
  { hue: 155, sat: 65, lit: 50 }, // energy       — teal
  { hue: 268, sat: 65, lit: 65 }, // emotional    — lavender
  { hue: 162, sat: 58, lit: 46 }, // life_balance — deep sage
  { hue: 38,  sat: 80, lit: 53 }, // purpose      — amber-gold
]

export function WellnessOrb({ score, state, size = 320, values }: WellnessOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width  = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const cx = size / 2, cy = size / 2
    const R  = size * 0.27           // core orb radius
    const OR = size * 0.42           // orbital radius for dimension nodes

    // Score-driven core palette
    const coreHue = score >= 70 ? 155 : score >= 50 ? 42 : score >= 35 ? 22 : 5
    const coreSat = 50 + score * 0.22
    const coreLit = 40 + score * 0.08

    // Fibonacci particles inside the core
    const COUNT = 100
    interface P { angle: number; radius: number; speed: number; size: number; opacity: number; phase: number }
    const particles: P[] = Array.from({ length: COUNT }, (_, i) => {
      const t = i / COUNT
      return {
        angle:   i * 2.399963,
        radius:  R * (0.45 + 0.55 * Math.pow(t, 0.65)),
        speed:   0.00025 + Math.random() * 0.0005,
        size:    0.7 + Math.random() * 1.6,
        opacity: 0.2 + Math.random() * 0.55,
        phase:   Math.random() * Math.PI * 2,
      }
    })

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, size, size)
      t += 0.0038

      // ── Far atmospheric glow ───────────────────────────
      const farGlow = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 2.6)
      farGlow.addColorStop(0,   `hsla(${coreHue},${coreSat}%,${coreLit + 18}%,0.09)`)
      farGlow.addColorStop(0.45, `hsla(${coreHue},${coreSat}%,${coreLit}%,0.04)`)
      farGlow.addColorStop(1,   'transparent')
      ctx.fillStyle = farGlow
      ctx.beginPath(); ctx.arc(cx, cy, R * 2.6, 0, Math.PI * 2); ctx.fill()

      // ── Orbital ring (faint) ───────────────────────────
      ctx.beginPath()
      ctx.ellipse(cx, cy, OR, OR * 0.88, Math.PI * 0.12, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${coreHue},${coreSat}%,${coreLit + 10}%,0.08)`
      ctx.lineWidth = 1
      ctx.stroke()

      // ── Connection threads from core to each node ──────
      const nodeCount = DIM_NODES.length
      for (let i = 0; i < nodeCount; i++) {
        const base  = (i / nodeCount) * Math.PI * 2
        const angle = base + t * 0.095
        const nx = cx + Math.cos(angle) * OR
        const ny = cy + Math.sin(angle) * OR * 0.88
        const node = DIM_NODES[i]
        const v = values ? values[i] / 100 : 0.62

        const lg = ctx.createLinearGradient(cx, cy, nx, ny)
        lg.addColorStop(0,   `hsla(${node.hue},${node.sat}%,${node.lit}%,0.04)`)
        lg.addColorStop(0.55, `hsla(${node.hue},${node.sat}%,${node.lit}%,${0.06 + v * 0.10})`)
        lg.addColorStop(1,   `hsla(${node.hue},${node.sat}%,${node.lit}%,0.04)`)
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny)
        ctx.strokeStyle = lg; ctx.lineWidth = 0.75; ctx.stroke()
      }

      // ── Core inner ambient ─────────────────────────────
      const coreAmbient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.15)
      coreAmbient.addColorStop(0,   `hsla(${coreHue},${coreSat - 8}%,${coreLit + 28}%,0.20)`)
      coreAmbient.addColorStop(0.5, `hsla(${coreHue},${coreSat}%,${coreLit}%,0.10)`)
      coreAmbient.addColorStop(1,   'transparent')
      ctx.fillStyle = coreAmbient
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2); ctx.fill()

      // ── Core sphere body ───────────────────────────────
      const coreSphere = ctx.createRadialGradient(cx - R * 0.22, cy - R * 0.22, 0, cx, cy, R)
      coreSphere.addColorStop(0,    `hsla(${coreHue},${coreSat - 18}%,${coreLit + 38}%,0.70)`)
      coreSphere.addColorStop(0.42, `hsla(${coreHue},${coreSat}%,${coreLit + 10}%,0.30)`)
      coreSphere.addColorStop(0.82, `hsla(${coreHue},${coreSat + 8}%,${coreLit - 6}%,0.10)`)
      coreSphere.addColorStop(1,    'transparent')
      ctx.fillStyle = coreSphere
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()

      // ── Fibonacci particles ────────────────────────────
      for (let idx = 0; idx < COUNT; idx++) {
        const p = particles[idx]
        const phi   = p.angle + t * p.speed * 80
        const theta = Math.acos(1 - 2 * (idx / COUNT))
        const persp = 1 + Math.sin(theta + t * 0.22) * 0.28

        const px = cx + Math.cos(phi) * p.radius * Math.sin(theta) * persp
        const py = cy + Math.sin(phi * 0.72 + p.phase) * p.radius * 0.58 * persp
        const pz = Math.cos(theta) * persp

        const alpha = p.opacity * (0.3 + pz * 0.7) * (0.55 + 0.45 * Math.sin(t * 1.9 + p.phase))
        const ps    = p.size * (0.4 + pz * 0.6)

        ctx.beginPath(); ctx.arc(px, py, ps, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${coreHue + pz * 28},${coreSat}%,${coreLit + pz * 28}%,${alpha})`
        ctx.fill()
      }

      // ── Orbiting dimension nodes ───────────────────────
      for (let i = 0; i < nodeCount; i++) {
        const base  = (i / nodeCount) * Math.PI * 2
        const speed = 0.09 + (i % 4) * 0.018  // subtle speed variance per node
        const angle = base + t * speed * 1.05
        const wobble = Math.sin(t * 1.8 + i * 0.85) * (size * 0.012)
        const nx = cx + Math.cos(angle) * (OR + wobble)
        const ny = cy + Math.sin(angle) * (OR * 0.88 + wobble * 0.6)

        const node = DIM_NODES[i]
        const v    = values ? values[i] / 100 : 0.65
        const nr   = size * 0.053 * (0.72 + v * 0.38)  // node radius proportional to its value
        const pulse = 0.78 + 0.22 * Math.sin(t * 2.2 + i)

        // Node halo
        const halo = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 2.5)
        halo.addColorStop(0,   `hsla(${node.hue},${node.sat}%,${node.lit + 12}%,${0.28 * pulse})`)
        halo.addColorStop(0.5, `hsla(${node.hue},${node.sat}%,${node.lit}%,${0.10 * pulse})`)
        halo.addColorStop(1,   'transparent')
        ctx.fillStyle = halo
        ctx.beginPath(); ctx.arc(nx, ny, nr * 2.5, 0, Math.PI * 2); ctx.fill()

        // Node body
        const body = ctx.createRadialGradient(nx - nr * 0.32, ny - nr * 0.32, 0, nx, ny, nr)
        body.addColorStop(0,    `hsla(${node.hue},${node.sat - 12}%,${node.lit + 28}%,0.97)`)
        body.addColorStop(0.48, `hsla(${node.hue},${node.sat}%,${node.lit}%,0.88)`)
        body.addColorStop(1,    `hsla(${node.hue},${node.sat + 8}%,${node.lit - 10}%,0.72)`)
        ctx.fillStyle = body
        ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI * 2); ctx.fill()

        // Node specular shine
        const shine = ctx.createRadialGradient(nx - nr * 0.38, ny - nr * 0.38, 0, nx, ny, nr * 0.75)
        shine.addColorStop(0, 'rgba(255,255,255,0.40)')
        shine.addColorStop(1, 'transparent')
        ctx.fillStyle = shine
        ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI * 2); ctx.fill()

        // Value arc (shows score as arc around node)
        if (v > 0.05) {
          ctx.beginPath()
          ctx.arc(nx, ny, nr + 2.5, -Math.PI * 0.5, -Math.PI * 0.5 + v * Math.PI * 2)
          ctx.strokeStyle = `hsla(${node.hue},${node.sat}%,${node.lit + 20}%,${0.55 + v * 0.25})`
          ctx.lineWidth = 1.8
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }

      // ── Score centrepiece ──────────────────────────────
      // Inner highlight glow behind text
      const textGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.45)
      textGlow.addColorStop(0, `hsla(${coreHue},${coreSat}%,${coreLit + 22}%,0.18)`)
      textGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = textGlow
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.45, 0, Math.PI * 2); ctx.fill()

      ctx.save()
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'

      // Score number
      ctx.font      = `600 ${size * 0.165}px Spectral, Georgia, serif`
      ctx.fillStyle = `hsl(${coreHue},${coreSat - 6}%,${Math.max(22, coreLit - 4)}%)`
      ctx.fillText(String(score), cx, cy - size * 0.052)

      // State label
      const stateLabel = state.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
      ctx.font      = `400 ${size * 0.046}px Hanken Grotesk, system-ui, sans-serif`
      ctx.fillStyle = `hsla(${coreHue},${coreSat - 18}%,${coreLit + 8}%,0.68)`
      ctx.fillText(stateLabel, cx, cy + size * 0.105)
      ctx.restore()

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [score, state, size, values])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
      aria-label={`Wellness score: ${score}, state: ${state}`}
    />
  )
}
