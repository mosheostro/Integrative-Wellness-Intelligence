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
        }
      }

      // ── spokes ─────────────────────────────────────────────
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i / n) - Math.PI / 2
        const lg = ctx.createLinearGradient(cx, cy, cx + Math.cos(a) * R, cy + Math.sin(a) * R)
        lg.addColorStop(0,   isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)')
        lg.addColorStop(0.7, isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)')
        lg.addColorStop(1,   isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)')
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R)
        ctx.strokeStyle = lg
        ctx.lineWidth   = 1
        ctx.stroke()
      }

      // ── axis labels ─────────────────────────────────────────
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.font         = '500 8px "JetBrains Mono", monospace'
      for (let i = 0; i < n; i++) {
        const a  = (Math.PI * 2 * i / n) - Math.PI / 2
        const lx = cx + Math.cos(a) * (R + 25)
        const ly = cy + Math.sin(a) * (R + 20)
        ctx.fillStyle = C.label
        ctx.fillText(axes[i].toUpperCase().slice(0, 4), lx, ly)
      }

      // ── data polygon ────────────────────────────────────────
      const pts: [number, number][] = axes.map((_, i) => {
        const a  = (Math.PI * 2 * i / n) - Math.PI / 2
        const rr = R * ((values[i] ?? 50) / 100) * ease
        return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]
      })

      // Glow stroke (dark only)
      if (isDark && ease > 0.05) {
        ctx.save()
        ctx.shadowColor = C.sage
        ctx.shadowBlur  = 18
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
        ctx.closePath()
        ctx.strokeStyle = C.sage
        ctx.lineWidth   = 1
        ctx.globalAlpha = 0.5
        ctx.stroke()
        ctx.restore()
      }

      // Gradient fill
      const grad = ctx.createLinearGradient(0, 0, size, size)
      grad.addColorStop(0, C.fill0)
      grad.addColorStop(1, C.fill1)
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
      ctx.closePath()
      ctx.fillStyle   = grad
      ctx.fill()
      ctx.strokeStyle = isDark ? 'rgba(78,191,148,0.75)' : C.sage
      ctx.lineWidth   = 1.8
      ctx.lineJoin    = 'round'
      ctx.stroke()

      // ── dot nodes ───────────────────────────────────────────
      for (let i = 0; i < n; i++) {
        const [dx, dy] = pts[i]
        const score    = (values[i] ?? 50) * ease

        // Halo glow
        if (isDark) {
          const hue  = i % 3 === 0 ? C.sage : i % 3 === 1 ? C.gold : C.indigo
          const halo = ctx.createRadialGradient(dx, dy, 0, dx, dy, 10)
          halo.addColorStop(0, hue.replace(')', ',0.35)').replace('rgb', 'rgba').replace('#', 'rgba(') || 'rgba(78,191,148,0.3)')
          halo.addColorStop(1, 'transparent')
          ctx.fillStyle = isDark ? 'rgba(78,191,148,0.22)' : 'transparent'
          ctx.beginPath(); ctx.arc(dx, dy, 9, 0, Math.PI * 2); ctx.fill()
        }

        // Dot body
        ctx.beginPath(); ctx.arc(dx, dy, 3.8, 0, Math.PI * 2)
        const scoreColor =
          score > 70 ? C.sage :
          score > 45 ? C.gold : '#B07A60'
        ctx.fillStyle   = C.dot
        ctx.strokeStyle = scoreColor
        ctx.lineWidth   = 2
        if (isDark) { ctx.shadowColor = scoreColor; ctx.shadowBlur = 8 }
        ctx.fill(); ctx.stroke()
        ctx.shadowBlur = 0
      }

      // ── centre glow ─────────────────────────────────────────
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18)
      cg.addColorStop(0, isDark ? 'rgba(78,191,148,0.18)' : 'rgba(78,158,142,0.12)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill()

      if (t < 1) rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [axes, values, size])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, maxWidth: '100%', display: 'block' }}
      className={className}
      aria-label="Wellness radar chart"
    />
  )
}
