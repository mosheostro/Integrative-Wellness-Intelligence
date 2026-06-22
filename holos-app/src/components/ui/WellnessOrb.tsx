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