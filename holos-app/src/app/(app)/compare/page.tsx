import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Approaches — Holos Integrative Wellness Intelligence',
  description:
    'See how Holos compares to generic wellness apps, personal trainers, nutritionists, and traditional therapy. One integrated platform vs. siloed point solutions.',
}

type Row = { feature: string; holos: string | boolean; generic: string | boolean; pro: string | boolean }

const ROWS: Row[] = [
  { feature: '9-dimension wellness map', holos: true, generic: false, pro: false },
  { feature: 'Ayurvedic constitution analysis', holos: true, generic: false, pro: false },
  { feature: 'Chronotype-aware scheduling', holos: true, generic: false, pro: false },
  { feature: 'AI coach available 24 / 7', holos: true, generic: false, pro: false },
  { feature: 'Six tradition synthesis', holos: true, generic: false, pro: false },
  { feature: 'Daily journal with AI insights', holos: true, generic: 'Basic logging', pro: false },
  { feature: 'Longitudinal progress tracking', holos: true, generic: 'Step count only', pro: 'Manual notes' },
  { feature: 'Personalised nutrition protocols', holos: true, generic: 'Generic plans', pro: 'Specialised only' },
  { feature: 'Practitioner-shareable reports', holos: true, generic: false, pro: false },
  { feature: 'Evidence-referenced guidance', holos: true, generic: false, pro: 'Varies' },
  { feature: 'Available on demand', holos: true, generic: true, pro: false },
  { feature: 'Monthly cost', holos: 'From $29 / mo', generic: '$0–15 / mo', pro: '$200–500 / mo' },
]

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return (
    <span style={{ color: 'var(--sage-deep)', fontSize: '1.1rem' }}>✓</span>
  )
  if (value === false) return (
    <span style={{ color: 'var(--ink-faint)', fontSize: '1rem' }}>—</span>
  )
  return <span style={{ fontSize: '.85rem', color: 'var(--ink-soft)' }}>{value as string}</span>
}

export default function ComparePage() {
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
            ◈ Holos vs. the alternatives
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            Why Holos, not another<br />wellness app?
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            Generic apps track steps. Human coaches cost $300/hour.
            Holos does what neither can: synthesise your whole person — body, mind,
            energy, purpose — in one intelligent, always-on system.
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
                fontSize: '.72rem',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                borderBottom: '2px solid var(--line)',
                minWidth: 220,
              }}>Feature</th>
              {[
                { label: 'Holos', highlight: true },
                { label: 'Generic app', highlight: false },
                { label: 'Human professional', highlight: false },
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
        background: 'var(--ink)',
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
            Three things only Holos does
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {[
              {
                icon: '◈',
                title: 'Tradition synthesis',
                body: 'No single tradition has the full picture. Holos maps you across Ayurveda, TCM, Stoicism, Kabbalah, Chronobiology, and Functional Medicine simultaneously.',
              },
              {
                icon: '◎',
                title: '9-dimension scoring',
                body: 'Most apps track one axis. Holos tracks nine — and shows you which dimensions are causally linked to your biggest pain point.',
              },
              {
                icon: '◆',
                title: 'Adaptive intelligence',
                body: 'Your profile evolves as you log, journal, and complete habits. The AI coach recalibrates recommendations every week based on your actual data.',
              },
            ].map(d => (
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
          }}>Start your free assessment</h2>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 28 }}>
            14-day free trial. No credit card required. Cancel any time.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{
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
              Get started free →
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
              See pricing
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
