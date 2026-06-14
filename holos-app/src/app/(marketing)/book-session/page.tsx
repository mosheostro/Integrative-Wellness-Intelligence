import Link from 'next/link'
import type { Metadata } from 'next'
import { FOUNDER } from '@/lib/founder'

export const metadata: Metadata = {
  title: 'Book a Session — Holos Integrative Wellness Intelligence',
  description:
    'Book a 1:1 integrative wellness session with Moshe Ostrovsky. Explore your wellness profile, set your priorities, and get a personalised protocol.',
}

const SESSION_TYPES = [
  {
    title: 'Wellness Discovery Session',
    duration: '60 min',
    price: 'Complimentary',
    tag: 'First session',
    desc: 'A deep-dive conversation to map your current wellness landscape — symptoms, goals, lifestyle, and tradition resonance. You\'ll leave with clarity on your top three priorities and a sample protocol.',
    cta: 'Book free session',
    href: FOUNDER.calendly,
    highlight: false,
  },
  {
    title: 'Integrative Wellness Review',
    duration: '90 min',
    price: '$180',
    tag: 'Most popular',
    desc: 'Full 9-dimension assessment review with Moshe. Includes Ayurvedic constitution analysis, chronotype mapping, and a 30-day personalised protocol with weekly check-ins in the Holos platform.',
    cta: 'Book session',
    href: FOUNDER.calendly,
    highlight: true,
  },
  {
    title: 'Practitioner Partnership Call',
    duration: '45 min',
    price: 'Free',
    tag: 'For professionals',
    desc: 'For health coaches, nutritionists, therapists, and integrative practitioners interested in using Holos with clients. Learn how to onboard clients, read reports, and co-create protocols.',
    cta: 'Book call',
    href: FOUNDER.calendly,
    highlight: false,
  },
]

export default function BookSessionPage() {
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
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            Book a session with Moshe
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            marginBottom: 12,
          }}>
            {FOUNDER.credentials}
          </p>
          <p style={{
            fontSize: '.95rem',
            color: 'var(--ink-faint)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto',
          }}>
            Personalised 1:1 sessions that blend evidence-based coaching with the wisdom
            traditions your profile resonates most with.
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
              background: s.highlight ? 'var(--ink)' : 'var(--surface)',
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
                  color: s.highlight ? 'var(--ink)' : 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '.9rem',
                  textDecoration: 'none',
                  transition: 'opacity .15s',
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
          }}>Prefer to reach out directly?</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: '.9rem', lineHeight: 1.65, marginBottom: 28 }}>
            Send a message via WhatsApp or Telegram and Moshe will reply within one business day.
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
