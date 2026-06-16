'use client'
import Link from 'next/link'

const FEATURES = [
  { icon: '◈', title: 'Adaptive Assessment', desc: 'A 9-dimension deep scan across body, energy, mind, emotions, purpose, relationships, environment, sleep, and spirit. Results evolve as you do.', href: '/assessment', cta: 'Take the assessment' },
  { icon: '◎', title: 'AI Wellness Coach', desc: 'A coach that synthesises your full profile — Ayurvedic constitution, chronotype, stress patterns — and gives evidence-based, tradition-informed guidance.', href: '/coach', cta: 'Meet your coach' },
  { icon: '▣', title: 'Wellness Dashboard', desc: "Your daily command centre. See dimension scores, streaks, today's priorities, and trend sparklines at a glance.", href: '/dashboard', cta: 'Preview dashboard' },
  { icon: '◰', title: 'Daily Journal', desc: 'Guided reflections that feed your AI coach. Optional voice notes, mood tagging, and AI-generated pattern insights.', href: '/journal', cta: 'Open journal' },
  { icon: '⊞', title: 'Goals & Habits', desc: 'Set intentions aligned to your wellness profile. Build micro-habits with adaptive scheduling that respects your chronotype and energy rhythms.', href: '/habits', cta: 'Build habits' },
  { icon: '◫', title: 'Progress & Reports', desc: 'Longitudinal tracking across all 9 dimensions. Exportable PDF reports for you and, optionally, your practitioner.', href: '/reports', cta: 'View reports' },
  { icon: '◬', title: 'Personalised Recommendations', desc: 'Protocols distilled from six wisdom traditions and clinical research — nutrition, movement, sleep, breath, and more — tailored to your profile.', href: '/recommendations', cta: 'See recommendations' },
  { icon: '◆', title: 'Progress Tracking', desc: 'Week-over-week dimension trends, correlation insights, and milestone celebrations to keep you motivated.', href: '/progress', cta: 'Track progress' },
]

export function PlatformFeatureGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
      {FEATURES.map(f => (
        <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
          <div
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '28px 24px', height: '100%', transition: 'box-shadow .2s, transform .2s', cursor: 'pointer' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(43,47,69,.1)'
              ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLDivElement).style.transform = 'none'
            }}
          >
            <div style={{ fontSize: '1.4rem', color: 'var(--sage)', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 10 }}>{f.title}</h3>
            <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 16 }}>{f.desc}</p>
            <span style={{ fontSize: '.82rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{f.cta} →</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
