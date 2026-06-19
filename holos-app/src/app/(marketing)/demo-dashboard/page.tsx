import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo Dashboard — Holos Integrative Wellness Intelligence',
  description:
    'Preview a live Holos wellness dashboard. See dimension scores, AI coach insights, habits, and journal — without creating an account.',
}

const DIMENSIONS = [
  { name: 'Body', score: 78, color: 'var(--sage-deep)', icon: '⬡' },
  { name: 'Energy', score: 64, color: 'var(--gold)', icon: '◈' },
  { name: 'Mind', score: 82, color: 'var(--indigo)', icon: '◎' },
  { name: 'Emotions', score: 71, color: 'var(--rose)', icon: '◉' },
  { name: 'Purpose', score: 88, color: 'var(--clay)', icon: '◆' },
  { name: 'Relationships', score: 74, color: '#9B8DB0', icon: '◫' },
  { name: 'Environment', score: 66, color: '#7A9E8E', icon: '◬' },
  { name: 'Sleep', score: 59, color: '#6B6FA8', icon: '◰' },
  { name: 'Spirit', score: 91, color: 'var(--gold-deep)', icon: '◇' },
]

const HABITS = [
  { name: 'Morning sun exposure', streak: 12, done: true },
  { name: '20 min breathwork', streak: 5, done: true },
  { name: 'Protein target (120g)', streak: 3, done: false },
  { name: 'Evening journaling', streak: 8, done: true },
]

export default function DemoDashboardPage() {
  const overall = Math.round(DIMENSIONS.reduce((a, d) => a + d.score, 0) / DIMENSIONS.length)

  return (
    <main style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--canvas)' }}>

      {/* Banner */}
      <div style={{
        background: 'var(--ink-stable)',
        padding: '10px 24px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.7)', fontFamily: 'var(--font-body)' }}>
          ◈ This is a demo dashboard with sample data.
        </span>
        <Link href="/auth/signup" style={{
          padding: '6px 16px',
          borderRadius: 999,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontSize: '.8rem',
          fontWeight: 700,
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
        }}>
          Create your real profile →
        </Link>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 64px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--ink-faint)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                Sunday · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 500,
                color: 'var(--ink)',
              }}>
                Good morning, Alex ✦
              </h1>
            </div>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 24px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 500, color: 'var(--sage-deep)', lineHeight: 1 }}>{overall}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--ink-faint)', marginTop: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Overall score</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Dimension scores */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 20 }}>
                9 Dimensions
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                {DIMENSIONS.map(d => (
                  <div key={d.name} style={{
                    padding: '14px 16px',
                    background: 'var(--canvas)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                  }}>
                    <div style={{ fontSize: '1.1rem', marginBottom: 6 }}>{d.icon}</div>
                    <div style={{ fontSize: '.78rem', color: 'var(--ink-faint)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{d.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1,
                        height: 4,
                        background: 'var(--line)',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${d.score}%`,
                          height: '100%',
                          background: d.color,
                          borderRadius: 2,
                        }} />
                      </div>
                      <span style={{ fontSize: '.82rem', fontWeight: 700, color: d.color, minWidth: 26, textAlign: 'right' }}>{d.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Coach insight */}
            <div style={{
              background: 'linear-gradient(135deg, var(--ink-stable) 0%, oklch(0.25 0.04 270) 100%)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem' }}>◈</div>
                <div>
                  <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Holos AI Coach</div>
                  <div style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.9)', fontWeight: 500 }}>Daily insight</div>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,.8)', lineHeight: 1.75, fontSize: '.95rem', marginBottom: 20 }}>
                Your Sleep score (59) is your primary lever this week. Chronobiology research shows
                that shifting your final meal earlier by 90 minutes can improve sleep onset by ~23%.
                Your Pitta constitution suggests avoiding screen exposure after 8 pm. Try it for 3 days.
              </p>
              <Link href="/auth/signup" style={{
                fontSize: '.85rem',
                color: 'var(--gold)',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
                Unlock your personalised protocol →
              </Link>
            </div>

          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Today's habits */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 16 }}>
                Today's habits
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {HABITS.map(h => (
                  <div key={h.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 14px',
                    background: h.done ? 'oklch(0.97 0.02 155 / 0.5)' : 'var(--canvas)',
                    border: `1px solid ${h.done ? 'oklch(0.8 0.05 155)' : 'var(--line)'}`,
                    borderRadius: 'var(--radius)',
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${h.done ? 'var(--sage)' : 'var(--line)'}`,
                      background: h.done ? 'var(--sage-deep)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '.65rem',
                      color: '#fff',
                    }}>
                      {h.done ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.85rem', color: 'var(--ink)', fontWeight: h.done ? 400 : 500 }}>{h.name}</div>
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--sage-deep)', fontFamily: 'var(--font-mono)' }}>
                      🔥 {h.streak}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditions match */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
            }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 16 }}>
                Your tradition profile
              </h2>
              {[
                { name: 'Ayurveda (Pitta)', pct: 42, color: 'var(--clay)' },
                { name: 'Chronobiology', pct: 28, color: 'var(--indigo)' },
                { name: 'Stoic philosophy', pct: 18, color: 'var(--sage-deep)' },
                { name: 'Functional Medicine', pct: 12, color: 'var(--gold)' },
              ].map(t => (
                <div key={t.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', marginBottom: 4 }}>
                    <span style={{ color: 'var(--ink)' }}>{t.name}</span>
                    <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>{t.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/auth/signup" style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px',
              background: 'var(--sage-deep)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '.95rem',
              textDecoration: 'none',
            }}>
              Create your real dashboard →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
