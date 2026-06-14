import Link from 'next/link'

export const metadata = {
  title: 'Pricing — Holos Integrative Wellness Intelligence',
  description: 'Start free. Upgrade when you are ready. No long-term contracts.',
}

const PLANS = [
  {
    name:    'Seeker',
    price:   '$0',
    period:  'forever free',
    tagline: 'Begin your wellness intelligence journey',
    color:   'var(--sage)',
    features: [
      { text: '1 assessment per month', included: true },
      { text: 'Evidence-Based tradition', included: true },
      { text: 'Basic wellness portrait (9 dimensions)', included: true },
      { text: 'AI Coach (3 conversations/month)', included: true },
      { text: 'Progress history (30 days)', included: true },
      { text: 'All 8 wisdom traditions', included: false },
      { text: 'Unlimited assessments', included: false },
      { text: 'Journal, Goals & Habits', included: false },
      { text: 'Detailed reports', included: false },
      { text: 'Export & share', included: false },
    ],
    cta:       'Start free',
    href:      '/auth/signup',
    highlight: false,
  },
  {
    name:    'Practitioner',
    price:   '$39',
    period:  '/month',
    tagline: 'The complete multi-tradition wellness system',
    color:   'var(--sage)',
    features: [
      { text: 'Unlimited assessments', included: true },
      { text: 'All 8 wisdom traditions', included: true },
      { text: 'Complete wellness portrait + trend analysis', included: true },
      { text: 'AI Coach (unlimited)', included: true },
      { text: 'Journal, Goals & Habits tracking', included: true },
      { text: 'Detailed reports + PDF export', included: true },
      { text: 'Progress history (lifetime)', included: true },
      { text: 'Personalised recommendations', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Client sharing (coming soon)', included: false },
    ],
    cta:       'Start 14-day free trial',
    href:      '/auth/signup?plan=pro',
    highlight: true,
    badge:     'Most Popular',
  },
  {
    name:    'Enterprise',
    price:   'Custom',
    period:  '',
    tagline: 'For clinics, coaching practices, and wellness teams',
    color:   'var(--indigo)',
    features: [
      { text: 'Everything in Practitioner', included: true },
      { text: 'Multi-user workspace management', included: true },
      { text: 'Client portal & practitioner dashboard', included: true },
      { text: 'White-label options', included: true },
      { text: 'Custom tradition weighting', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated customer success manager', included: true },
      { text: 'Custom reporting & analytics', included: true },
      { text: 'SSO / SAML integration', included: true },
      { text: 'HIPAA-compliant data handling', included: true },
    ],
    cta:       'Contact us',
    href:      '/contact',
    highlight: false,
  },
]

const FAQS = [
  {
    q: 'Is the free plan really free, forever?',
    a: 'Yes. The Seeker plan is permanently free — no credit card required, no trial period. You get one assessment per month and three AI Coach conversations, indefinitely.',
  },
  {
    q: 'What happens after my 14-day Practitioner trial?',
    a: 'You are automatically moved to the Seeker (free) plan. No charge. If you want to continue with full Practitioner access, you can upgrade at any time from your account settings.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. There are no long-term contracts. Cancel from your account settings and you will retain Practitioner access until the end of your current billing period, then revert to the free Seeker plan.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes — annual billing saves you 20% (equivalent to $31/month billed annually). Contact us or toggle the billing period in your account settings.',
  },
  {
    q: 'Is my health data private and secure?',
    a: 'Your data is encrypted at rest and in transit. It is never sold to third parties or used to train AI models. You own your data and can export or delete it at any time. See our Privacy Policy for full details.',
  },
  {
    q: 'Can I use HOLOS as a wellness practitioner with my clients?',
    a: 'The Enterprise plan is designed for exactly this. It includes a client portal, practitioner dashboard, and white-label options. Contact us to discuss your specific workflow.',
  },
]

export default function PricingPage() {
  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>◈ Pricing</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            Start free.{' '}
            <em style={{ color: 'var(--sage)' }}>Scale when you are ready.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            No credit card required. No long-term contracts. 14-day Practitioner trial on signup.
          </p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background:   plan.highlight ? 'var(--ink)' : 'var(--surface)',
              border:       plan.highlight ? '2px solid var(--sage)' : '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding:      '40px 32px',
              position:     'relative',
              display:      'flex',
              flexDirection:'column',
            }}>
              {plan.badge && (
                <div style={{
                  position:     'absolute',
                  top:          -14,
                  left:         '50%',
                  transform:    'translateX(-50%)',
                  background:   'var(--sage)',
                  color:        '#fff',
                  fontFamily:   'var(--font-mono)',
                  fontSize:     '.65rem',
                  textTransform:'uppercase',
                  letterSpacing:'.1em',
                  padding:      '5px 16px',
                  borderRadius: 100,
                  whiteSpace:   'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.12em', color: plan.highlight ? 'rgba(255,255,255,.4)' : 'var(--ink-faint)', marginBottom: 16 }}>
                {plan.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 500, letterSpacing: '-.03em', color: plan.highlight ? '#fff' : 'var(--ink)', lineHeight: 1 }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.4)' : 'var(--ink-faint)' }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.55)' : 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {plan.tagline}
              </p>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {plan.features.map(f => (
                  <div key={f.text} style={{
                    display:   'flex',
                    alignItems: 'flex-start',
                    gap:       10,
                    fontFamily: 'var(--font-body)',
                    fontSize:  '.83rem',
                    color:     f.included
                      ? (plan.highlight ? 'rgba(255,255,255,.75)' : 'var(--ink-soft)')
                      : (plan.highlight ? 'rgba(255,255,255,.2)' : 'var(--ink-faint)'),
                  }}>
                    <span style={{ flexShrink: 0, marginTop: 1, color: f.included ? 'var(--sage)' : 'var(--line)' }}>
                      {f.included ? '✓' : '✕'}
                    </span>
                    <span style={{ textDecoration: f.included ? 'none' : 'line-through' }}>{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.href}
                style={{
                  display:      'block',
                  textAlign:    'center',
                  padding:      '13px 20px',
                  borderRadius: 'var(--radius)',
                  background:   plan.highlight ? 'var(--sage)' : 'transparent',
                  border:       plan.highlight ? 'none' : '1.5px solid var(--line)',
                  color:        plan.highlight ? '#fff' : 'var(--ink)',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   600,
                  fontSize:     '.9rem',
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>◉ FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
              Common questions about pricing.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQS.map(f => (
              <div key={f.q} style={{
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
            Need something custom?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)', margin: '0 0 36px', lineHeight: 1.65 }}>
            HOLOS Enterprise is built for wellness clinics, coaching practices, and corporate wellness teams. Let&apos;s design a solution for your workflow.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"
              style={{
                padding:      '13px 28px',
                borderRadius: 'var(--radius)',
                background:   'var(--sage)',
                color:        '#fff',
                fontFamily:   'var(--font-body)',
                fontWeight:   600,
                fontSize:     '.92rem',
                textDecoration: 'none',
              }}>
              Talk to us &#8594;
            </Link>
            <Link href="/auth/signup"
              style={{
                padding:      '13px 24px',
                borderRadius: 'var(--radius)',
                border:       '1.5px solid var(--line)',
                color:        'var(--ink)',
                fontFamily:   'var(--font-body)',
                fontWeight:   500,
                fontSize:     '.92rem',
                textDecoration: 'none',
              }}>
              Start free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
