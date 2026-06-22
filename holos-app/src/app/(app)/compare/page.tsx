export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Compare Approaches — Holos Integrative Wellness Intelligence',
  description:
    'See how Holos compares to generic wellness apps, personal trainers, nutritionists, and traditional therapy. One integrated platform vs. siloed point solutions.',
}

type Row = { feature: string; holos: string | boolean; generic: string | boolean; pro: string | boolean }

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return (
    <span style={{ color: 'var(--sage-deep)', fontSize: '1.1rem' }}>✓</span>
  )
  if (value === false) return (
    <span style={{ color: 'var(--ink-faint)', fontSize: '1rem' }}>—</span>
  )
  return <span style={{ fontSize: '.85rem', color: 'var(--ink-soft)' }}>{value as string}</span>
}

export default async function ComparePage() {
  const { strings } = await getServerStrings()
  const c = strings.compare

  const ROWS: Row[] = [
    { feature: c.f1,  holos: true,        generic: false,        pro: false       },
    { feature: c.f2,  holos: true,        generic: false,        pro: false       },
    { feature: c.f3,  holos: true,        generic: false,        pro: false       },
    { feature: c.f4,  holos: true,        generic: false,        pro: false       },
    { feature: c.f5,  holos: true,        generic: false,        pro: false       },
    { feature: c.f6,  holos: true,        generic: c.f6Generic,  pro: false       },
    { feature: c.f7,  holos: true,        generic: c.f7Generic,  pro: c.f7Pro     },
    { feature: c.f8,  holos: true,        generic: c.f8Generic,  pro: c.f8Pro     },
    { feature: c.f9,  holos: true,        generic: false,        pro: false       },
    { feature: c.f10, holos: true,        generic: false,        pro: c.f10Pro    },
    { feature: c.f11, holos: true,        generic: true,         pro: false       },
    { feature: c.f12, holos: c.f12Holos,  generic: c.f12Generic, pro: c.f12Pro    },
  ]

  const DIFFS = [
    { icon: '◈', title: c.d1Title, body: c.d1Body },
    { icon: '◎', title: c.d2Title, body: c.d2Body },
    { icon: '◆', title: c.d3Title, body: c.d3Body },
  ]

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section style={{
        padding: '72px 24px 56px',
        textAlign: 'center',
        background: 'var(--canvas)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
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
            ◈ {c.eyebrow}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            {c.heroTitle}
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left',
                padding: '12px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '.78rem',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                borderBottom: '2px solid var(--line)',
                minWidth: 220,
              }}>{c.colFeature}</th>
              {[
                { label: c.colHolos,   highlight: true  },
                { label: c.colGeneric, highlight: false },
                { label: c.colPro,     highlight: false },
              ].map(col => (
                <th key={col.label} style={{
                  textAlign: 'center',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '.88rem',
                  fontWeight: 700,
                  color: col.highlight ? 'var(--sage-deep)' : 'var(--ink-soft)',
                  borderBottom: `2px solid ${col.highlight ? 'var(--sage)' : 'var(--line)'}`,
                  background: col.highlight ? 'oklch(0.97 0.02 155 / 0.4)' : 'transparent',
                  minWidth: 160,
                }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.feature} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--canvas2)' }}>
                <td style={{
                  padding: '13px 16px',
                  fontSize: '.88rem',
                  color: 'var(--ink)',
                  borderBottom: '1px solid var(--line)',
                }}>{row.feature}</td>
                <td style={{
                  padding: '13px 16px',
                  textAlign: 'center',
                  borderBottom: '1px solid var(--line)',
                  background: 'oklch(0.97 0.02 155 / 0.3)',
                }}>
                  <Cell value={row.holos} />
                </td>
                <td style={{
                  padding: '13px 16px',
                  textAlign: 'center',
                  borderBottom: '1px solid var(--line)',
                }}>
                  <Cell value={row.generic} />
                </td>
                <td style={{
                  padding: '13px 16px',
                  textAlign: 'center',
                  borderBottom: '1px solid var(--line)',
                }}>
                  <Cell value={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Key differentiators */}
      <section style={{
        background: 'var(--ink-stable)',
        padding: '72px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 500,
            color: 'var(--canvas)',
            textAlign: 'center',
            marginBottom: 48,
          }}>
            {c.diffTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {DIFFS.map(d => (
              <div key={d.title} style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
              }}>
                <div style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 14 }}>{d.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: 'var(--canvas)',
                  marginBottom: 10,
                }}>{d.title}</h3>
                <p style={{ fontSize: '.87rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.7 }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.9rem',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 16,
          }}>{c.ctaTitle}</h2>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 28 }}>
            {c.ctaBody}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'var(--sage-deep)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {c.ctaCta}
            </Link>
            <Link href="/pricing" style={{
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
              {c.ctaCta2}
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
