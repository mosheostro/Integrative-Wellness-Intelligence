'use client'
import { useState, useEffect } from 'react'

interface ScrollToTopProps {
  /** px from bottom. Default 88 (clears mobile tab bar). Override on desktop. */
  bottom?: number | string
}

export function ScrollToTop({ bottom }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="scroll-to-top"
        style={{
          position:  'fixed',
          right:     'clamp(16px, 4vw, 32px)',
          zIndex:    150,
          width:     44,
          height:    44,
          borderRadius: 22,
          background: 'var(--surface)',
          border:    '1.5px solid var(--line)',
          boxShadow: 'var(--shadow-md)',
          color:     'var(--ink-soft)',
          display:   'flex',
          alignItems:'center',
          justifyContent: 'center',
          cursor:    'pointer',
          opacity:   visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(.85) translateY(4px)',
          pointerEvents: visible ? 'auto' : 'none',
          transition:'opacity .22s, transform .22s',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <style>{`
        /* On mobile: sit above the tab bar */
        @media (max-width: 767px) {
          .scroll-to-top {
            bottom: calc(72px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
        /* On desktop / marketing pages: standard position */
        @media (min-width: 768px) {
          .scroll-to-top {
            bottom: clamp(24px, 4vw, 40px) !important;
          }
        }
      `}</style>
    </>
  )
}
