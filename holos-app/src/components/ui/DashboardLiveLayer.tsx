'use client'
// Thin client layer over the dashboard's server-rendered orb.
// Shows an animated score number that counts up on mount.

import { useEffect, useState } from 'react'
import { AnimatedScore } from './AnimatedScore'

interface DashboardLiveLayerProps {
  initialScore: number
}

export function DashboardLiveLayer({ initialScore }: DashboardLiveLayerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay so the user sees the orb first, then the count-up
    const t = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <AnimatedScore
        value={initialScore}
        size="lg"
        color="rgba(255,255,255,0.9)"
        duration={1400}
        suffix="/100"
      />
    </div>
  )
}
