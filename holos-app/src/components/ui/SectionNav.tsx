'use client'
import { useState, useEffect } from 'react'

export interface NavSection {
  id: string
  label: string
  color?: string
  icon?: string
}

interface SectionNavProps {
  sections: NavSection[]
}

/**
 * Floating vertical dot navigation for long pages.
 * Tracks the active section via IntersectionObserver.
 * Desktop-only (hidden ≤1100px via CSS).
 * RTL-aware: positions on the left when dir="rtl".
 */
export function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting entry
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <>
      <nav
        aria-label="Jump to section"
        className="section-dot-nav"
        style={{
          position:      'fixed',
          top:           '50%',
          transform:     'translateY(-50%)',
          display:       'flex',
          flexDirection: 'column',
          gap:           16,
          zIndex:        40,
          padding:       '12px 4px',
        }}>
        {sections.map(s => {
          const isActive  = active === s.id
          const isHovered = hoveredId === s.id
          const color     = s.color ?? 'var(--sage-deep)'
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={`Jump to ${s.label}`}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position:   'relative',
                display:    'flex',
                alignItems: 'center',
                gap:        8,
                textDecoration: 'none',
              }}>
              {/* Dot */}
              <span style={{
                display:       'block',
                width:         isActive ? 10 : 7,
                height:        isActive ? 10 : 7,
                borderRadius:  '50%',
                background:    isActive ? color : 'var(--line)',
                border:        `2px solid ${isActive ? color : 'var(--line)'}`,
                transition:    'all .2s',
                flexShrink:    0,
              }} />
              {/* Tooltip label */}
              {isHovered && (
                <span style={{
                  position:     'absolute',
                  right:        'calc(100% + 10px)',
                  whiteSpace:   'nowrap',
                  background:   'var(--surface)',
                  border:       '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding:      '4px 10px',
                  fontFamily:   'var(--font-body)',
                  fontSize:     '.75rem',
                  color:        'var(--ink)',
                  boxShadow:    'var(--shadow-sm)',
                  pointerEvents:'none',
                }}>
                  {s.icon && <>{s.icon} </>}{s.label}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      <style>{`
        /* Hide on narrow viewports where there's no room */
        @media (max-width: 1100px) {
          .section-dot-nav { display: none !important; }
        }
        /* Default: right side */
        .section-dot-nav { right: clamp(12px, 2vw, 28px); }
        /* RTL: flip to left side */
        [dir="rtl"] .section-dot-nav {
          right: auto;
          left: clamp(12px, 2vw, 28px);
        }
        /* RTL: tooltip flips too */
        [dir="rtl"] .section-dot-nav a span:last-child {
          right: auto;
          left: calc(100% + 10px);
        }
      `}</style>
    </>
  )
}
