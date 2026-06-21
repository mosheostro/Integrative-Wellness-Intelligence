'use client'

// ============================================================
// HOLOS — Results Page Reveal Animation
// Staggered entrance sequence using Framer Motion.
// Wrap any section with <RevealSection> for staggered reveal.
// ============================================================

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealSectionProps {
  children: ReactNode
  delay?: number          // seconds delay
  direction?: 'up' | 'left' | 'fade'
  className?: string
  style?: React.CSSProperties
}

export function RevealSection({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  const initial =
    direction === 'up'   ? { opacity: 0, y: 28 } :
    direction === 'left' ? { opacity: 0, x: -24 } :
    { opacity: 0 }

  const animate = inView
    ? { opacity: 1, y: 0, x: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Staggered container — children get sequential delays
interface RevealContainerProps {
  children: ReactNode[]
  baseDelay?: number
  stagger?: number       // seconds between each child
  style?: React.CSSProperties
  className?: string
}

export function RevealContainer({
  children,
  baseDelay = 0,
  stagger = 0.1,
  style,
  className,
}: RevealContainerProps) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <RevealSection key={i} delay={baseDelay + i * stagger}>
          {child}
        </RevealSection>
      ))}
    </div>
  )
}

// Hero reveal: score + orb fly-in together
interface HeroRevealProps {
  children: ReactNode
  score: number
}

export function HeroReveal({ children, score }: HeroRevealProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // Small delay for page load to settle
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const hue = score >= 70 ? 155 : score >= 50 ? 42 : score >= 35 ? 24 : 350

  return (
    <>
      {/* Ambient background pulse on load */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 30%, hsl(${hue},35%,95%) 0%, transparent 70%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
    </>
  )
}

// Tab content transition
interface TabRevealProps {
  children: ReactNode
  tabKey: string
}

export function TabReveal({ children, tabKey }: TabRevealProps) {
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
