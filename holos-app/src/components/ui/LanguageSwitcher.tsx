'use client'
import { useState, useRef, useEffect } from 'react'
import { useLanguage, LOCALE_META, type Locale } from '@/contexts/LanguageContext'

const LOCALES = Object.keys(LOCALE_META) as Locale[]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen]       = useState(false)
  const ref                   = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LOCALE_META[locale]

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          5,
          padding:      '5px 9px',
          borderRadius: 'var(--radius)',
          border:       '1px solid var(--line)',
          background:   open ? 'var(--surface-2)' : 'transparent',
          color:        'var(--ink-soft)',
          fontFamily:   'var(--font-mono)',
          fontSize:     '.72rem',
          fontWeight:   500,
          cursor:       'pointer',
          letterSpacing: '.04em',
          minHeight:    30,
          transition:   'background .15s',
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{current.flag}</span>
        <span>{locale.toUpperCase()}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transition: 'transform .18s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position:     'absolute',
          top:          '100%',
          right:        0,
          marginTop:    6,
          background:   'var(--surface)',
          border:       '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          boxShadow:    'var(--shadow-md)',
          overflow:     'hidden',
          zIndex:       300,
          minWidth:     130,
        }}>
          {LOCALES.map(l => {
            const meta = LOCALE_META[l]
            return (
              <button
                key={l}
                onClick={() => { setLocale(l); setOpen(false) }}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          10,
                  width:        '100%',
                  padding:      '9px 14px',
                  border:       'none',
                  background:   l === locale ? 'var(--surface-2)' : 'transparent',
                  color:        l === locale ? 'var(--ink)' : 'var(--ink-soft)',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.84rem',
                  fontWeight:   l === locale ? 600 : 400,
                  cursor:       'pointer',
                  textAlign:    'left',
                  whiteSpace:   'nowrap',
                }}
              >
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{meta.flag}</span>
                {meta.label}
                {l === locale && (
                  <span style={{ marginLeft: 'auto', color: 'var(--sage)', fontSize: '.75rem' }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
