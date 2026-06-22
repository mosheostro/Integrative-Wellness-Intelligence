export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { FOUNDER } from '@/lib/founder'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Book a Session — Holos Integrative Wellness Intelligence',
  description:
    'Book a 1:1 integrative wellness session with Moshe Ostrovsky. Explore your wellness profile, set your priorities, and get a personalised protocol.',
}

export default async function BookSessionPage() {
  const { strings } = await getServerStrings()
  const b = strings.bookSession

  const SESSION_TYPES = [
    {
      title:     b.s1Title,
      duration:  b.s1Duration,
      price:     b.s1Price,
      tag:       b.s1Tag,
      desc:      b.s1Desc,
      cta:       b.s1Cta,
      href:      FOUNDER.calendly,
      highlight: false,
    },
    {
      title:     b.s2Title,
      duration:  b.s2Duration,
      price:     b.s2Price,
      tag:       b.s2Tag,
      desc:      b.s2Desc,
      cta:       b.s2Cta,
      href:      FOUNDER.calendly,
      highlight: true,
    },
    {
      title:     b.s3Title,
      duration:  b.s3Duration,
      price:     'Free',
      tag:       b.s3Tag,
      desc:      b.s3Desc,
      cta:       b.s3Cta,
      href:      FOUNDER.calendly,
      highlight: false,
    },
  ]

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section style={{
        padding: '72px 24px 56px',
        textAlign: 'center',
        background: 'linear-gradient(160deg, var(--canvas) 55%, oklch(0.96 0.02 155 / 0.35) 100%)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--sage)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '1.6rem',
          }}>◈</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>
            {b.eyebrow}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            {b.heroTitle}
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            marginBottom: 12,
          }}>
            {FOUNDER.credentials.join(' · ')}
          </p>
          <p style={{
            fontSize: '.95rem',
            color: 'var(--ink-faint)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            {b.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Session types */}
      <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {SESSION_TYPES.map(s => (
            <div key={s.title} style={{
              background: s.highlight ? 'var(--ink-stable)' : 'var(--surface)',
              border: s.highlight ? 'none' : '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 28px',
              position: 'relative',
            }}>
              {s.tag && (
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: s.highlight ? 'var(--gold)' : 'var(--canvas2)',
                  color: s.highlight ? 'var(--ink)' : 'var(--sage-deep)',
                  fontSize: '.73rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}>{s.tag}</div>
              )}
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: s.highlight ? 'var(--canvas)' : 'var(--ink)',
                marginBottom: 6,
              }}>{s.title}</h3>
              <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'baseline',
                marginBottom: 16,
              }}>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: s.highlight ? 'var(--gold)' : 'var(--sage-deep)',
                  fontWeight: 500,
                }}>{s.price}</span>
                <span style={{
                  fontSize: '.8rem',
                  color: s.highlight ? 'rgba(255,255,255,.5)' : 'var(--ink-faint)',
                }}>{s.duration}</span>
              </div>
              <p style={{
                fontSize: '.88rem',
                color: s.highlight ? 'rgba(255,255,255,.7)' : 'var(--ink-soft)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}>{s.desc}</p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '11px 0',
                  borderRadius: 'var(--radius)',
                  background: s.highlight ? 'var(--gold)' : 'transparent',
                  border: s.highlight ? 'none' : '1.5px solid var(--line)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  textDecoration: 'none',
                }}
              >
                {s.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact alternatives */}
      <section style={{
        padding: '0 24px 80px',
        maxWidth: 680,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 32px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 8,
          }}>{b.altTitle}</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', lineHeight: 1.65, marginBottom: 28 }}>
            {b.altBody}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={FOUNDER.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 22px',
                borderRadius: 'var(--radius)',
                background: '#25D366',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '.88rem',
                textDecoration: 'none',
              }}
            >
              WhatsApp
            </a>
            <a
              href={FOUNDER.telegram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 22px',
                borderRadius: 'var(--radius)',
                background: '#229ED9',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '.88rem',
                textDecoration: 'none',
              }}
            >
              Telegram
            </a>
            <a
              href={`mailto:${FOUNDER.email}`}
              style={{
                padding: '10px 22px',
                borderRadius: 'var(--radius)',
                border: '1.5px solid var(--line)',
                color: 'var(--ink)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '.88rem',
                textDecoration: 'none',
              }}
            >
              Email
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
