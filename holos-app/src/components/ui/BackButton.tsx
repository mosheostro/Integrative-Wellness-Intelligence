'use client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import type { CSSProperties } from 'react'

interface BackButtonProps {
  /** Explicit fallback route when there is no browser history. Defaults to '/'. */
  href?: string
  /** Override display label. Falls back to 'Back'. */
  label?: string
  style?: CSSProperties
  className?: string
}

/**
 * Reusable back button.
 * Uses router.back() when browser history exists, otherwise navigates to `href`.
 * RTL-aware: arrow flips direction automatically.
 */
export function BackButton({ href = '/', label, style, className }: BackButtonProps) {
  const router    = useRouter()
  const { isRTL } = useLanguage()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(href)
    }
  }

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className={className}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            6,
        background:     'none',
        border:         'none',
        cursor:         'pointer',
        fontFamily:     'var(--font-body)',
        fontSize:       '.85rem',
        color:          'var(--ink-soft)',
        padding:        '6px 0',
        borderRadius:   'var(--radius)',
        transition:     'color .15s',
        minHeight:      44,
        ...style,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
    >
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
        style={{ transform: isRTL ? 'scaleX(-1)' : 'none', flexShrink: 0 }}>
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label ?? 'Back'}
    </button>
  )
}
