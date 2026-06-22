export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'Pricing — Holos Integrative Wellness Intelligence',
  description: 'Start free. Upgrade when you are ready. No long-term contracts.',
}

export default async function PricingPage() {
  const { strings } = await getServerStrings()
  const p = strings.pricing

  const PLANS = [
    {
      name:      'Seeker',
      price:     '$0',
      period:    p.seekerPeriod,
      tagline:   p.seekerTagline,
      color:     'var(--sage)',
      features: [
        { text: p.seekerF1,  included: true  },
        { text: p.seekerF2,  included: true  },
        { text: p.seekerF3,  included: true  },
        { text: p.seekerF4,  included: true  },
        { text: p.seekerF5,  included: true  },
        { text: p.seekerF6,  included: false },
        { text: p.seekerF7,  included: false },
        { text: p.seekerF8,  included: false },
        { text: p.seekerF9,  included: false },
        { text: p.seekerF10, included: false },
      ],
      cta:       p.seekerCta,
      href:      '/auth/signup',
      highlight: false,
      badge:     null,
    },
    {
      name:      'Practitioner',
      price:     '$39',
      period:    p.proPeriod,
      tagline:   p.proTagline,
      color:     'var(--sage)',
      features: [
        { text: p.proF1,  included: true  },
        { text: p.proF2,  included: true  },
        { text: p.proF3,  included: true  },
        { text: p.proF4,  included: true  },
        { text: p.proF5,  included: true  },
        { text: p.proF6,  included: true  },
        { text: p.proF7,  included: true  },
        { text: p.proF8,  included: true  },
        { text: p.proF9,  included: true  },
        { text: p.proF10, included: false },
      ],
      cta:       p.proCta,
      href:      '/auth/signup?plan=pro',
      highlight: true,
      badge:     p.proBadge,
    },
    {
      name:      'Enterprise',
      price:     'Custom',
      period:    '',
      tagline:   p.entTagline,
      color:     'var(--indigo)',
      features: [
        { text: p.entF1,  included: true },
        { text: p.entF2,  included: true },
        { text: p.entF3,  included: true },
        { text: p.entF4,  included: true },
        { text: p.entF5,  included: true },
        { text: p.entF6,  included: true },
        { text: p.entF7,  included: true },
        { text: p.entF8,  included: true },
        { text: p.entF9,  included: true },
        { text: p.entF10, included: true },
      ],
      cta:       p.entCta,
      href:      '/contact',
      highlight: false,
      badge:     null,
    },
  ]

  const FAQS = [
    { q: p.faq1Q, a: p.faq1A },
    { q: p.faq2Q, a: p.faq2A },
    { q: p.faq3Q, a: p.faq3A },
    { q: p.faq4Q, a: p.faq4A },
    { q: p.faq5Q, a: p.faq5A },
    { q: p.faq6Q, a: p.faq6A },
  ]

  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 20 }}>
            ◈ {p.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            {p.titleA}{' '}
            <em style={{ color: 'var(--sage-deep)', fontStyle: 'italic' }}>{p.titleEm}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background:    plan.highlight ? 'var(--ink-stable)' : 'var(--surface)',
              border:        plan.highlight ? '2px solid var(--sage)' : '1px solid var(--line)',
              borderRadius:  'var(--radius-lg)',
              padding:       '40px 32px',
              position:      'relative',
              display:       'flex',
              flexDirection: 'column',
            }}>
              {plan.badge && (
                <div style={{
                  position:      'absolute',
                  top:           -14,
                  left:          '50%',
                  transform:     'translateX(-50%)',
                  background:    'var(--sage-deep)',
                  color:         '#fff',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '.1em',
                  padding:       '5px 16px',
                  borderRadius:  100,
                  whiteSpace:    'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.12em', color: plan.highlight ? 'rgba(255,255,255,.65)' : 'var(--ink-faint)', marginBottom: 16 }}>
                {plan.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 500, letterSpacing: '-.03em', color: plan.highlight ? '#fff' : 'var(--ink)', lineHeight: 1 }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.65)' : 'var(--ink-faint)' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.8)' : 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {plan.tagline}
              </p>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{
                    display:    'flex',
                    alignItems: 'flex-start',
                    gap:        10,
                    fontFamily: 'var(--font-body)',
                    fontSize:   '.83rem',
                    color:      f.included
                      ? (plan.highlight ? 'rgba(255,255,255,.75)' : 'var(--ink-soft)')
                      : (plan.highlight ? 'rgba(255,255,255,.2)' : 'var(--ink-faint)'),
                  }}>
                    <span style={{ flexShrink: 0, marginTop: 1, color: f.included ? 'var(--sage-deep)' : 'var(--line)' }}>
                      {f.included ? '✓' : '✕'}
                    </span>
                    <span style={{ textDecoration: f.included ? 'none' : 'line-through' }}>{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.href}
                style={{
                  display:        'block',
                  textAlign:      'center',
                  padding:        '13px 20px',
                  borderRadius:   'var(--radius)',
                  background:     plan.highlight ? 'var(--sage-deep)' : 'transparent',
                  border:         plan.highlight ? 'none' : '1.5px solid var(--line)',
                  color:          plan.highlight ? '#fff' : 'var(--ink)',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     600,
                  fontSize:       '.9rem',
                  textDecoration: 'none',
                }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>
              ◉ {p.faqEyebrow}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
              {p.faqTitle}
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{
                background:   'var(--surface)',
                border:       '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding:      '24px 28px',
              }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px' }}>{f.q}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise CTA ── */}
      <section style={{ padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
            {p.ctaTitle}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)', margin: '0 0 36px', lineHeight: 1.65 }}>
            {p.ctaBody}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"
              style={{
                padding:        '13px 28px',
                borderRadius:   'var(--radius)',
                background:     'var(--sage-deep)',
                color:          '#fff',
                fontFamily:     'var(--font-body)',
                fontWeight:     600,
                fontSize:       '.92rem',
                textDecoration: 'none',
              }}>
              {p.ctaCta1}
            </Link>
            <Link href="/auth/signup"
              style={{
                padding:        '13px 24px',
                borderRadius:   'var(--radius)',
                border:         '1.5px solid var(--line)',
                color:          'var(--ink)',
                fontFamily:     'var(--font-body)',
                fontWeight:     500,
                fontSize:       '.92rem',
                textDecoration: 'none',
              }}>
              {p.ctaCta2}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
