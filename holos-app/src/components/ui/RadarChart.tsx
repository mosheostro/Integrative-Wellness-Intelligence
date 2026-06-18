'use client'
import { useEffect, useRef } from 'react'

interface RadarChartProps {
  axes: string[]
  values: number[]  // 0-100 each
  size?: number
  className?: string
}

export function RadarChart({ axes, values, size = 280, className = '' }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const style = getComputedStyle(document.documentElement)
    const sage   = style.getPropertyValue('--sage').trim()   || '#7A9E8E'
    const gold   = style.getPropertyValue('--gold').trim()   || '#C4A55A'
    const faint  = style.getPropertyValue('--line').trim()   || '#DDD8CC'
    const inkFaint = style.getPropertyValue('--ink-faint').trim() || '#9097B0'
    const bg     = style.getPropertyValue('--surface').trim() || '#fff'

    const cx = size / 2, cy = size / 2, R = size / 2 - 44, rings = 4, n = axes.length
    let markup = ''

    // Grid rings
    for (let r = 1; r <= rings; r++) {
      const pts = axes.map((_, i) => {
        const a = (Math.PI * 2 * i / n) - Math.PI / 2
        return `${cx + Math.cos(a) * R * r / rings},${cy + Math.sin(a) * R * r / rings}`
      }).join(' ')
      markup += `<polygon points="${pts}" fill="none" stroke="${faint}" stroke-width="1" opacity="0.7"/>`
    }

    // Spokes
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i / n) - Math.PI / 2
      markup += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * R}" y2="${cy + Math.sin(a) * R}" stroke="${faint}" stroke-width="1"/>`
    }

    // Labels
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i / n) - Math.PI / 2
      const lx = cx + Math.cos(a) * (R + 26)
      const ly = cy + Math.sin(a) * (R + 20)
      markup += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="${inkFaint}" font-size="9" font-family="JetBrains Mono,monospace" font-weight="500">${axes[i].toUpperCase()}</text>`
    }

    // Data polygon
    const dataPts = axes.map((_, i) => {
      const a = (Math.PI * 2 * i / n) - Math.PI / 2
      const rr = R * (values[i] ?? 50) / 100
      return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`
    }).join(' ')

    const gid = `rg${Math.random().toString(36).slice(2, 6)}`
    markup += `<defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${sage}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${gold}" stop-opacity="0.3"/>
      </linearGradient>
    </defs>`
    markup += `<polygon points="${dataPts}" fill="url(#${gid})" stroke="${sage}" stroke-width="2" stroke-linejoin="round"/>`

    // Dots
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i / n) - Math.PI / 2
      const rr = R * (values[i] ?? 50) / 100
      markup += `<circle cx="${cx + Math.cos(a) * rr}" cy="${cy + Math.sin(a) * rr}" r="3.5" fill="${bg}" stroke="${sage}" stroke-width="2"/>`
    }

    svg.innerHTML = markup
  }, [axes, values, size])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      className={className}
      style={{ maxWidth: size }}
    />
  )
}
