'use client'
import { useEffect, useRef } from 'react'

// Map CSS variable names to their glow class
const GLOW_CLASS: Record<string, string> = {
  '--sage':       'ring-glow-sage',
  '--sage-deep':  'ring-glow-sage',
  '--indigo':     'ring-glow-indigo',
  '--gold-deep':  'ring-glow-gold',
  '--gold':       'ring-glow-gold',
  '--rose':       'ring-glow-rose',
  '--clay':       'ring-glow-clay',
}

interface ScoreRingProps {
  value: number   // 0-100
  color?: string  // CSS variable like '--sage'
  size?: number
  label?: string
  animate?: boolean
  glow?: boolean  // apply neon glow in dark mode
}

export function ScoreRing({ value, color = '--sage', size = 96, label, animate = true, glow = false }: ScoreRingProps) {
  const arcRef = useRef<SVGCircleElement>(null)

  const sw = size > 80 ? 8 : 6
  const R  = (size - sw) / 2 - 2
  const C  = 2 * Math.PI * R
  const cx = size / 2

  useEffect(() => {
    const arc = arcRef.current
    if (!arc || !animate) return
    arc.style.strokeDashoffset = String(C)
    const raf = requestAnimationFrame(() => {
      arc.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)'
      arc.style.strokeDashoffset = String(C * (1 - value / 100))
    })
    return () => cancelAnimationFrame(raf)
  }, [value, C, animate])

  const cssColor  = `var(${color})`
  const glowClass = glow ? (GLOW_CLASS[color] ?? '') : ''

  return (
    <div style={{ textAlign: 'center' }}>
      <svg
        viewBox={`0 0 ${size} ${size}`} width={size} height={size}
        className={glowClass}
      >
        {/* Track */}
        <circle cx={cx} cy={cx} r={R} fill="none" stroke="var(--surface-2)" strokeWidth={sw} />
        {/* Arc */}
        <circle
          ref={arcRef}
          cx={cx} cy={cx} r={R}
          fill="none" stroke={cssColor} strokeW