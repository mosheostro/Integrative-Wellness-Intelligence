'use client'
import Link from 'next/link'

export interface PlatformFeature {
  icon: string
  title: string
  desc: string
  href: string
  cta: string
}

const FEATURE_HREFS = [
  '/assessment',
  '/coach',
  '/dashboard',
  '/journal',
  '/habits',
  '/reports',
  '/recommendations',
  '/progress',
]

const FEATURE_ICONS = ['◈', '◎', '▣', '◰', '⊞', '◫', '◬', '◆']

interface Props {
  features: PlatformFeature[]
}

export function PlatformFeatureGrid({ features }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
      {features.map((f, i) => (
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
            <div style={{ fontSize: '1.4rem', color: 'var(--sage-deep)', marginBottom: 12 }}>{f.icon}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 10 }}>{f.title}</h3>
            <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 16 }}>{f.desc}</p>
            <span style={{ fontSize: '.82rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{f.cta} →</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

/** Build feature list from translation strings + static metadata */
export function buildFeatures(p: {
  feat1Title: string; feat1Desc: string; feat1Cta: string
  feat2Title: string; feat2Desc: string; feat2Cta: string
  feat3Title: string; feat3Desc: string; feat3Cta: string
  feat4Title: string; feat4Desc: string; feat4Cta: string
  feat5Title: string; feat5Desc: string; feat5Cta: string
  feat6Title: string; feat6Desc: string; feat6Cta: string
  feat7Title: string; feat7Desc: string; feat7Cta: string
  feat8Title: string; feat8Desc: string; feat8Cta: string
}): PlatformFeature[] {
  const raw = [
    { title: p.feat1Title, desc: p.feat1Desc, cta: p.feat1Cta },
    { title: p.feat2Title, desc: p.feat2Desc, cta: p.feat2Cta },
    { title: p.feat3Title, desc: p.feat3Desc, cta: p.feat3Cta },
    { title: p.feat4Title, desc: p.feat4Desc, cta: p.feat4Cta },
    { title: p.feat5Title, desc: p.feat5Desc, cta: p.feat5Cta },
    { title: p.feat6Title, desc: p.feat6Desc, cta: p.feat6Cta },
    { title: p.feat7Title, desc: p.feat7Desc, cta: p.feat7Cta },
    { title: p.feat8Title, desc: p.feat8Desc, cta: p.feat8Cta },
  ]
  return raw.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i], href: FEATURE_HREFS[i] }))
}
