'use client'
// ============================================================
// HOLOS — AnimatedScore
// Morphs a numeric score smoothly from one value to another.
// Used in assessment live preview and dashboard.
// ============================================================

import { useEffect, useRef, useState } from 'react'

interface AnimatedScoreProps {
  value: number           // Target value 0-100
  duration?: number       // Animation duration ms (default 600)
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showBar?: boolean       // Show progress bar under the number
  color?: string          // CSS color or variable e.g. 'var(--sage)'
  label?: string          // Optional label below
  prefix?: string         // Prefix string e.g. '+'
  suffix?: string         // Suffix string e.g. '/100'
  className?: string
}

// Ease-in-out cubic
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

export function AnimatedScore({
  value,
  duration = 600,
  size = 'md',
  showBar = false,
  color = 'var(--sage)',
  label,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedScoreProps) {
  const [displayed, setDisplayed] = useState(value)
  const fromRef = useRef(value)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startTimeRef.current = null

    function tick(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const t = Math.min(1, elapsed / duration)
      const eased = easeInOutCubic(t)
      const current = Math.round(from + (to - from) * eased)
      setDisplayed(current)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  const SIZES = {
    sm:  { num: '1.25rem', bar: 3 },
    md:  { num: '2rem',    bar: 4 },
    lg:  { num: '3rem',    bar: 5 },
    xl:  { num: '4.5rem',  bar: 6 },
  }
  const s = SIZES[size]

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: s.num,
        fontWeight: 500,
        color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
        transition: 'color 0.4s ease',
      }}>
        {prefix}{displayed}{suffix}
      </div>

      {showBar && (
        <div style={{
          width: '100%',
          height: s.bar,
          background: 'var(--line)',
          borderRadius: 999,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${displayed}%`,
            background: color,
            borderRadius: 999,
            transition: 'width 0.3s ease',
          }} />
        </div>
      )}

      {label && (
        <div style={{
          fontSize: '.7rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
        }}>
          {label}
        </div>
      )}
    </div>
  )
}

// ── Composite Score Ring (circular progress) ──────────────────

interface AnimatedRingProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  showNumber?: boolean
}

export function AnimatedRing({
  value,
  size = 80,
  strokeWidth = 6,
  color = 'var(--sage)',
  label,
  showNumber = true,
}: AnimatedRingProps) {
  const [displayed, setDisplayed] = useState(value)
  const fromRef = useRef(value)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts
      const t = Math.min(1, (ts - startRef.current) / 800)
      const eased = easeInOutCubic(t)
      setDisplayed(Math.round(from + (to - from) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = to
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [value])

  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (displayed / 100) * circ

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="var(--line)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        {showNumber && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: size > 60 ? '1.25rem' : '.875rem',
            fontWeight: 500,
            color: 'var(--ink)',
          }}>
            {displayed}
          </div>
        )}
      </div>
      {label && (
        <div style={{
          fontSize: '.7rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
          textAlign: 'center',
        }}>
          {label}
        </div>
      )}
    </div>
  )
}

// ── Live Score Preview Bar ────────────────────────────────────
// Compact strip for assessment live preview panel

interface LiveScoreBarProps {
  label: string
  value: number | undefined
  color?: string
  invert?: boolean
}

export function LiveScoreBar({ label, value, color = 'var(--sage)', invert = false }: LiveScoreBarProps) {
  const displayValue = value !== undefined ? (invert ? 100 - value : value) : null
  const hasValue = displayValue !== null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        fontSize: '.72rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        color: 'var(--ink-faint)',
        minWidth: 80,
        flexShrink: 0,
      }}>
        {label}
      </div>
      <div style={{
        flex: 1,
        height: 4,
        background: 'var(--line)',
        borderRadius: 999,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: hasValue ? `${displayValue}%` : '0%',
          background: hasValue ? color : 'transparent',
          borderRadius: 999,
          transition: 'width 0.5s cubic-bezier(.25,.8,.25,1)',
        }} />
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '.72rem',
        color: hasValue ? 'var(--ink-soft)' : 'var(--ink-faint)',
        minWidth: 28,
        textAlign: 'right',
      }}>
        {hasValue ? displayValue : '—'}
      </div>
    </div>
  )
}
