import Link from 'next/link'
import type { Metadata } from 'next'
import { PlatformFeatureGrid, buildFeatures } from '@/components/ui/PlatformFeatureGrid'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Platform — Holos Integrative Wellness Intelligence',
  description:
    'Explore every tool in the Holos platform: AI coach, 9-dimension assessment, daily journal, habits, goals, reports, and more — all in one adaptive wellness intelligence layer.',
}

export default async function PlatformPage() {
  const { strings } = await getServerStrings()
  const p = strings.platform

  const TRADITIONS = [
    { name: 'Ayurveda',            tag: p.tradTagAyurveda   },
    { name: 'TCM',                 tag: p.tradTagTCM        },
    { name: 'Stoicism',            tag: p.tradTagStoicism   },
    { name: 'Kabbalah',            tag: p.tradTagKabbalah   },
    { name: 'Chronobiology',       tag: p.tradTagChrono     },
    { name: 'Functional Medicine', tag: p.tradTagFunctional },
  ]

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--canvas) 60%, oklch(0.95 0.03 155 / 0.4) 100%)',
        padding: '80px 24px 64px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '6px 16px',
            fontSize: '.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--sage-deep)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            ◈ {p.eyebrow}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.18,
            marginBottom: 20,
          }}>
            {p.heroTitle}<br />
            <em>{p.heroTitleEm}</em>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 36px',
          }}>
            {p.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/assessment" style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'var(--sage)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {p.heroCta1}
            </Link>
            <Link href="/demo-dashboard" style={{
              display: 'inline-block',
              padding: '12px 28px',
              border: '1.5px solid var(--line)',
              color: 'var(--ink)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {p.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ padding: '72px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 500,
          color: 'var(--ink)',
          textAlign: 'center',
          marginBottom: 48,
        }}>
          {p.featTitle}
        </h2>
        <PlatformFeatureGrid features={buildFeatures(p)} />
      </section>

      {/* Traditions */}
      <section style={{
        background: 'var(--ink)',
        padding: '72px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '.72rem',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--sage)',
            marginBottom: 16,
          }}>
            {p.tradEyebrow}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 500,
            color: 'var(--canvas)',
            marginBottom: 48,
          }}>
            {p.tradTitle}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {TRADITIONS.map(t => (
              <div key={t.name} style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 'var(--radius)',
                padding: '20px 18px',
                textAlign: 'left',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--gold)',
                  marginBottom: 6,
                }}>{t.name}</div>
                <div style={{
                  fontSize: '.8rem',
                  color: 'rgba(255,255,255,.55)',
                  lineHeight: 1.5,
                }}>{t.tag}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Link href="/methodologies" style={{
              display: 'inline-block',
              padding: '12px 28px',
              border: '1.5px solid rgba(255,255,255,.25)',
              color: 'var(--canvas)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {p.tradCta}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 16,
          }}>
            {p.ctaTitle}
          </h2>
          <p style={{
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            {p.ctaBody}
          </p>
          <Link href="/assessment" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: 'var(--sage)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '1rem',
          }}>
            {p.ctaCta}
          </Link>
        </div>
      </section>

    </main>
  )
}
