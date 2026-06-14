import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform — Holos Integrative Wellness Intelligence',
  description:
    'Explore every tool in the Holos platform: AI coach, 9-dimension assessment, daily journal, habits, goals, reports, and more — all in one adaptive wellness intelligence layer.',
}

const FEATURES = [
  {
    icon: '◈',
    title: 'Adaptive Assessment',
    desc: 'A 9-dimension deep scan across body, energy, mind, emotions, purpose, relationships, environment, sleep, and spirit. Results evolve as you do.',
    href: '/assessment',
    cta: 'Take the assessment',
  },
  {
    icon: '◎',
    title: 'AI Wellness Coach',
    desc: 'A coach that synthesises your full profile — Ayurvedic constitution, chronotype, stress patterns — and gives evidence-based, tradition-informed guidance.',
    href: '/coach',
    cta: 'Meet your coach',
  },
  {
    icon: '▣',
    title: 'Wellness Dashboard',
    desc: 'Your daily command centre. See dimension scores, streaks, today\'s priorities, and trend sparklines at a glance.',
    href: '/dashboard',
    cta: 'Preview dashboard',
  },
  {
    icon: '◰',
    title: 'Daily Journal',
    desc: 'Guided reflections that feed your AI coach. Optional voice notes, mood tagging, and AI-generated pattern insights.',
    href: '/journal',
    cta: 'Open journal',
  },
  {
    icon: '⊞',
    title: 'Goals & Habits',
    desc: 'Set intentions aligned to your wellness profile. Build micro-habits with adaptive scheduling that respects your chronotype and energy rhythms.',
    href: '/habits',
    cta: 'Build habits',
  },
  {
    icon: '◫',
    title: 'Progress & Reports',
    desc: 'Longitudinal tracking across all 9 dimensions. Exportable PDF reports for you and, optionally, your practitioner.',
    href: '/reports',
    cta: 'View reports',
  },
  {
    icon: '◬',
    title: 'Personalised Recommendations',
    desc: 'Protocols distilled from six wisdom traditions and clinical research — nutrition, movement, sleep, breath, and more — tailored to your profile.',
    href: '/recommendations',
    cta: 'See recommendations',
  },
  {
    icon: '◆',
    title: 'Progress Tracking',
    desc: 'Week-over-week dimension trends, correlation insights, and milestone celebrations to keep you motivated.',
    href: '/progress',
    cta: 'Track progress',
  },
]

const TRADITIONS = [
  { name: 'Ayurveda', tag: 'Dosha-aware personalisation' },
  { name: 'TCM', tag: 'Qi balance & meridian patterns' },
  { name: 'Stoicism', tag: 'Mindset resilience protocols' },
  { name: 'Kabbalah', tag: 'Purpose & meaning mapping' },
  { name: 'Chronobiology', tag: 'Circadian-optimised scheduling' },
  { name: 'Functional Medicine', tag: 'Root-cause analysis' },
]

export default function PlatformPage() {
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
            ◈ The Holos Platform
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.18,
            marginBottom: 20,
          }}>
            Every tool your wellness journey needs,<br />
            <em>woven into one intelligent layer</em>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 36px',
          }}>
            Holos unites assessment, AI coaching, habit science, and six wisdom traditions
            into a single adaptive platform that knows you — and grows with you.
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
              Start your assessment →
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
              See a live demo
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
          Eight tools. One coherent picture.
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {FEATURES.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px 24px',
                height: '100%',
                transition: 'box-shadow .2s, transform .2s',
                cursor: 'pointer',
              }}
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
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: 10,
                }}>{f.title}</h3>
                <p style={{
                  fontSize: '.88rem',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}>{f.desc}</p>
                <span style={{
                  fontSize: '.82rem',
                  color: 'var(--sage-deep)',
                  fontWeight: 600,
                }}>
                  {f.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
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
            Wisdom traditions powering the platform
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 500,
            color: 'var(--canvas)',
            marginBottom: 48,
          }}>
            Six frameworks. One synthesis.
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
              Explore the methodologies →
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
            Ready to begin?
          </h2>
          <p style={{
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            marginBottom: 32,
          }}>
            Start with a free assessment and see your complete wellness profile in minutes.
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
            Take the free assessment →
          </Link>
        </div>
      </section>

    </main>
  )
}
