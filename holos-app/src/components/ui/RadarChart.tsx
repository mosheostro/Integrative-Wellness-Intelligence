'use client'
import { useEffect, useRef } from 'react'

interface RadarChartProps {
  axes: string[]
  values: number[]  // 0-100 each
  size?: number
  className?: string
}

export function RadarChart({ axes, values, size = 280, className = '' }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

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
    const R  = size / 2 - 42
    const n  = axes.length
    const RINGS = 4

    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    const C = {
      sage:    isDark ? '#4ebf94' : '#4E7A6A',
      gold:    isDark ? '#e8c247' : '#C4A55A',
      indigo:  isDark ? '#9b9ff5' : '#6B6FA8',
      grid:    isDark ? 'rgba(255,255,255,0.07)' : 'rgba(43,47,69,0.08)',
      gridHi:  isDark ? 'rgba(255,255,255,0.13)' : 'rgba(43,47,69,0.15)',
      label:   isDark ? 'rgba(255,255,255,0.45)' : 'rgba(43,47,69,0.5)',
      dot:     isDark ? '#16181F' : '#ffffff',
      fill0:   isDark ? 'rgba(78,191,148,0.14)' : 'rgba(78,158,142,0.18)',
      fill1:   isDark ? 'rgba(107,111,168,0.08)' : 'rgba(107,111,168,0.12)',
    }

    // Animate 0 → values
    const dur   = 1000
    const start = performance.now()

    function draw(ts: number) {
      if (!ctx) return
      const t    = Math.min(1, (ts - start) / dur)
      const ease = 1 - Math.pow(1 - t, 3) // cubic ease-out
      ctx.clearRect(0, 0, size, size)

      // ── outer atmospheric glow (dark only) ─────────────────
      if (isDark) {
        const atm = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.5)
        atm.addColorStop(0, 'rgba(78,191,148,0.04)')
        atm.addColorStop(1, 'transparent')
        ctx.fillStyle = atm
        ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill()
      }

      // ── grid rings ──────────────────────────────────────────
      for (let r = 1; r <= RINGS; r++) {
        const pts: [number, number][] = axes.map((_, i) => {
          const a = (Math.PI * 2 * i / n) - Math.PI / 2
          return [cx + Math.cos(a) * R * r / RINGS, cy + Math.sin(a) * R * r / RINGS]
        })
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
        ctx.closePath()
        ctx.strokeStyle = r === RINGS ? C.gridHi : C.grid
        ctx.lineWidth   = r === RINGS ? 1.2 : 0.8
        ctx.stroke()
        // Subtle inner fill
        if (r <= 2) {
          ctx.fillStyle = isDark ? `rgba(255,255,255,${0.01 * (3 - r)})` : `rgba(0,0,0,${0.008 * (3 - r)})`
          ctx.fill()
     