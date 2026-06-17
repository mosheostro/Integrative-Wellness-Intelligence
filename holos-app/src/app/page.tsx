import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { FOUNDER } from '@/lib/founder'
import { getServerStrings } from '@/lib/i18n/server'

const STATS_VALUES = ['9', '8', '50+', '15+']

const DIM_META = [
  { key: 'nutrition',    color: 'var(--sage-deep)',   icon: '◉', descKey: 'dimDescNutrition' },
  { key: 'sleep',        color: 'var(--indigo)', icon: '◎', descKey: 'dimDescSleep'     },
  { key: 'recovery',     color: 'var(--clay)',   icon: '◆', descKey: 'dimDescRecovery'  },
  { key: 'stress',       color: 'var(--rose)',   icon: '◈', descKey: 'dimDescStress'    },
  { key: 'movement',     color: 'var(--gold)',   icon: '◉', descKey: 'dimDescMovement'  },
  { key: 'emotional',    color: 'var(--indigo)', icon: '◎', descKey: 'dimDescEmotional' },
  { key: 'life_balance', color: 'var(--sage-deep)',   icon: '◆', descKey: 'dimDescBalance'   },
  { key: 'purpose',      color: 'var(--gold)',   icon: '◈', descKey: 'dimDescPurpose'   },
  { key: 'energy',       color: 'var(--clay)',   icon: '◉', descKey: 'dimDescEnergy'    },
] as const

const TRAD_META = [
  { icon: '⚗', name: 'Evidence-Based', id: 'evidence-based', color: 'var(--sage-deep)',   descKey: 'tradDescEvidence'   },
  { icon: '☽', name: 'Rambam',         id: 'rambam',         color: 'var(--indigo)', descKey: 'tradDescRambam'     },
  { icon: '♾', name: 'Hippocrates',    id: 'hippocrates',    color: 'var(--clay)',   descKey: 'tradDescHippocrates'},
  { icon: '◈', name: 'Avicenna',       id: 'avicenna',       color: 'var(--gold)',   descKey: 'tradDescAvicenna'   },
  { icon: '🌿', name: 'Ayurveda',      id: 'ayurveda',       color: 'var(--sage-deep)',   descKey: 'tradDescAyurveda'   },
  { icon: '☯', name: 'Daoist',         id: 'daoist',         color: 'var(--indigo)', descKey: 'tradDescDaoist'     },
  { icon: '❋', name: 'Tibetan',        id: 'tibetan',        color: 'var(--clay)',   descKey: 'tradDescTibetan'    },
  { icon: '✦', name: 'Swarga',         id: 'swarga',         color: 'var(--gold)',   descKey: 'tradDescSwarga'     },
] as const

export default async function HomePage() {
  const { strings } = await getServerStrings()
  const h = strings.home
  const dims = strings.dimensions

  // Stat labels from translations
  const STATS = [
    { value: STATS_VALUES[0], label: h.statDims       },
    { value: STATS_VALUES[1], label: h.statTraditions },
    { value: STATS_VALUES[2], label: h.statQuestions  },
    { value: STATS_VALUES[3], label: h.statYears      },
  ]

  // Dimension labels from strings.dimensions, descriptions from strings.home
  type HomeKey = keyof typeof h
  const DIMENSIONS = DIM_META.map(d => ({
    key:   d.key,
    color: d.color,
    icon:  d.icon,
    label: dims[d.key === 'life_balance' ? 'balance' : d.key === 'stress' ? 'calm' : d.key as keyof typeof dims],
    desc:  h[d.descKey as HomeKey] as string,
  }))

  // Tradition descriptions from translations (names are proper nouns — not translated)
  const TRADITIONS = TRAD_META.map(t => ({
    icon:  t.icon,
    name:  t.name,
    id:    t.id,
    color: t.color,
    desc:  h[t.descKey as HomeKey] as string,
  }))

  // Steps from translations
  const STEPS = [
    { n: '01', icon: '◈', title: h.step1Title, body: h.step1Body },
    { n: '02', icon: '◉', title: h.step2Title, body: h.step2Body },
    { n: '03', icon: '◆', title: h.step3Title, body: h.step3Body },
  ]

  // Pricing from translations (prices/periods are intentionally not translated)
  const PRICING_PREVIEW = [
    {
      name:      h.seekerName,
      price:     'Free',
      period:    'forever',
      desc:      h.seekerDesc,
      features:  [h.seekerF1, h.seekerF2, h.seekerF3, h.seekerF4],
      cta:       h.seekerCta,
      href:      '/auth/signup',
      highlight: false,
    },
    {
      name:      h.proName,
      price:     '$39',
      period:    '/month',
      desc:      h.proDesc,
      features:  [h.proF1, h.proF2, h.proF3, h.proF4, h.proF5, h.proF6],
      cta:       h.proCta,
      href:      '/auth/signup?plan=pro',
      highlight: true,
    },
    {
      name:      h.entName,
      price:     'Custom',
      period:    '',
      desc:      h.entDesc,
      features:  [h.entF1, h.entF2, h.entF3, h.entF4, h.entF5, h.entF6],
      cta:       h.entCta,
      href:      '/contact',
      highlight: false,
    },
  ]

  return (
    <>
      <SiteNav />
      <main style={{ background: 'var(--canvas)' }}>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section style={{
          minHeight:      '92vh',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          textAlign:      'center',
          padding:        '120px 24px 80px',
          position:       'relative',
          overflow:       'hidden',
        }}>
          <div aria-hidden style={{
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(122,158,142,.14) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(107,111,168,.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}/>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
            {/* Eyebrow */}
            <div style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          8,
              background:   'rgba(122,158,142,.1)',
              border:       '1px solid rgba(122,158,142,.25)',
              borderRadius: 100,
              padding:      '6px 16px',
              marginBottom: 32,
            }}>
              <span style={{ color: 'var(--sage-deep)', fontSize: '.9rem' }}>◈</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)' }}>
                {h.heroEyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:    'var(--font-serif)',
              fontSize:      'clamp(2.6rem, 6vw, 4.8rem)',
              fontWeight:    500,
              lineHeight:    1.08,
              letterSpacing: '-0.03em',
              color:         'var(--ink)',
              margin:        '0 0 28px',
            }}>
              {h.heroTitle}{' '}
              <em style={{ color: 'var(--sage-deep)', fontStyle: 'italic' }}>{h.heroTitleEm}</em>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1.05rem, 2vw, 1.2rem)',
              lineHeight: 1.65,
              color:      'var(--ink-soft)',
              maxWidth:   580,
              margin:     '0 auto 48px',
            }}>
              {h.heroSubtitle}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/signup"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '14px 32px',
                  borderRadius:   'var(--radius)',
                  background:     'var(--sage-deep)',
                  color:          '#fff',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     600,
                  fontSize:       '.95rem',
                  textDecoration: 'none',
                  letterSpacing:  '-.01em',
                }}>
                {h.heroCta1}
              </Link>
              <Link href="/methodologies"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '14px 28px',
                  borderRadius:   'var(--radius)',
                  border:         '1.5px solid var(--line)',
                  color:          'var(--ink)',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  fontSize:       '.95rem',
                  textDecoration: 'none',
                  background:     'transparent',
                }}>
                {h.heroCta2}
              </Link>
            </div>

            {/* Trust bar */}
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 40px' }}>
              {STATS.map(s => (
                <div key={s.value} style={{ textAlign: 'center', padding: '8px 0' }}>
                  <div style={{
                    fontFamily:    'var(--font-serif)',
                    fontSize:      '1.8rem',
                    fontWeight:    500,
                    color:         'var(--ink)',
                    letterSpacing: '-.02em',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily:    'var(--font-body)',
                    fontSize:      '.75rem',
                    color:         'var(--ink-faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>◎ {h.howEyebrow}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
                {h.howTitle}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {STEPS.map(step => (
                <div key={step.n}
                  style={{
                    background:   'var(--surface)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding:      '36px 32px',
                    position:     'relative',
                  }}>
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '2.8rem',
                    fontWeight:    500,
                    color:         'var(--line)',
                    lineHeight:    1,
                    marginBottom:  20,
                    letterSpacing: '-.02em',
                  }}>{step.n}</div>
                  <div style={{ fontSize: '1.4rem', marginBottom: 12, color: 'var(--sage-deep)' }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 10px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/auth/signup"
                style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 600, color: 'var(--sage-deep)', textDecoration: 'none' }}>
                {h.howCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 9 Dimensions ─────────────────────────────────── */}
        <section style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>◆ {h.dimsEyebrow}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
                {h.dimsTitle}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto' }}>
                {h.dimsSubtitle}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {DIMENSIONS.map(d => (
                <Link key={d.key} href="/assessment"
                  style={{
                    display:        'block',
                    background:     'var(--surface)',
                    border:         '1px solid var(--line)',
                    borderRadius:   'var(--radius-lg)',
                    padding:        '24px 22px',
                    textDecoration: 'none',
                    transition:     'border-color .2s, box-shadow .2s, transform .2s',
                    borderTop:      `3px solid ${d.color}`,
                  }}>
                  <div style={{ fontSize: '1.1rem', color: d.color, marginBottom: 10 }}>{d.icon}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 6 }}>
                    {d.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-faint)', lineHeight: 1.5 }}>
                    {d.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8 Traditions ─────────────────────────────────── */}
        <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>◆ {h.tradEyebrow}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
                {h.tradTitle}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto' }}>
                {h.tradSubtitle}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {TRADITIONS.map(t => (
                <Link key={t.id} href={`/methodologies#${t.id}`}
                  style={{
                    display:        'block',
                    background:     'var(--surface)',
                    border:         '1px solid var(--line)',
                    borderRadius:   'var(--radius-lg)',
                    padding:        '28px 24px',
                    textDecoration: 'none',
                    transition:     'border-color .2s, box-shadow .2s',
                  }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>{t.icon}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 6 }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-faint)', lineHeight: 1.5 }}>
                    {t.desc}
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/methodologies"
                style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 600, color: 'var(--sage-deep)', textDecoration: 'none' }}>
                {h.tradCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Founder ──────────────────────────────────────── */}
        <section style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 16 }}>◆ {h.founderEyebrow}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 20px' }}>
                {h.founderTitleA}{' '}
                <em style={{ color: 'var(--sage-deep)' }}>{h.founderTitleEm}</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', lineHeight: 1.75, color: 'var(--ink-soft)', margin: '0 0 24px' }}>
                {h.founderBody}
              </p>
              <blockquote style={{
                borderLeft:  '3px solid var(--sage)',
                paddingLeft: 20,
                margin:      '0 0 32px',
                fontFamily:  'var(--font-serif)',
                fontSize:    '1rem',
                fontStyle:   'italic',
                color:       'var(--ink-soft)',
              }}>
                &ldquo;{strings.about.blockquote}&rdquo;
              </blockquote>
              <Link href="/about"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '10px 24px',
                  borderRadius:   'var(--radius)',
                  border:         '1.5px solid var(--line)',
                  color:          'var(--ink)',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  fontSize:       '.88rem',
                  textDecoration: 'none',
                }}>
                {h.founderCta}
              </Link>
            </div>
            <div style={{
              background:   'var(--canvas2)',
              border:       '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding:      '40px 32px',
              textAlign:    'center',
            }}>
              <div style={{
                width:          80,
                height:         80,
                borderRadius:   '50%',
                background:     'linear-gradient(135deg, var(--sage) 0%, var(--indigo) 100%)',
                margin:         '0 auto 20px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '2rem',
                color:          '#fff',
              }}>◈</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 500, marginBottom: 4 }}>{FOUNDER.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-faint)', marginBottom: 24 }}>{FOUNDER.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FOUNDER.credentials.map((cred: string) => (
                  <div key={cred} style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        8,
                    fontFamily: 'var(--font-body)',
                    fontSize:   '.8rem',
                    color:      'var(--ink-soft)',
                  }}>
                    <span style={{ color: 'var(--sage-deep)', fontSize: '.7rem' }}>✓</span>
                    {cred}
                  </div>
                ))}
              </div>
              <a href={FOUNDER.calendly} target="_blank" rel="noopener"
                style={{
                  display:        'block',
                  marginTop:      28,
                  padding:        '10px 20px',
                  borderRadius:   'var(--radius)',
                  background:     'var(--sage-deep)',
                  color:          '#fff',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     600,
                  fontSize:       '.85rem',
                  textDecoration: 'none',
                  textAlign:      'center',
                }}>
                {strings.about.bookConsultation}
              </a>
            </div>
          </div>
        </section>

        {/* ── Pricing Preview ───────────────────────────────── */}
        <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 12 }}>◆ {h.pricingEyebrow}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 12px' }}>
                {h.pricingTitle}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)' }}>
                {h.pricingSubtitle}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {PRICING_PREVIEW.map(plan => (
                <div key={plan.name}
                  style={{
                    background:   plan.highlight ? 'var(--ink)' : 'var(--surface)',
                    border:       plan.highlight ? '2px solid var(--sage)' : '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding:      '36px 28px',
                    position:     'relative',
                  }}>
                  {plan.highlight && (
                    <div style={{
                      position:      'absolute',
                      top:           -12,
                      left:          '50%',
                      transform:     'translateX(-50%)',
                      background:    'var(--sage-deep)',
                      color:         '#fff',
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '.1em',
                      padding:       '4px 14px',
                      borderRadius:  100,
                    }}>{h.mostPopular}</div>
                  )}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.12em', color: plan.highlight ? 'rgba(255,255,255,.5)' : 'var(--ink-faint)', marginBottom: 12 }}>
                    {plan.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 500, color: plan.highlight ? '#fff' : 'var(--ink)', letterSpacing: '-.03em' }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.5)' : 'var(--ink-faint)' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: plan.highlight ? 'rgba(255,255,255,.6)' : 'var(--ink-soft)', margin: '0 0 24px' }}>
                    {plan.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: plan.highlight ? 'rgba(255,255,255,.7)' : 'var(--ink-soft)' }}>
                        <span style={{ color: 'var(--sage-deep)', flexShrink: 0, marginTop: 1 }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href={plan.href}
                    style={{
                      display:        'block',
                      textAlign:      'center',
                      padding:        '12px 20px',
                      borderRadius:   'var(--radius)',
                      background:     plan.highlight ? 'var(--sage-deep)' : 'transparent',
                      border:         plan.highlight ? 'none' : '1.5px solid var(--line)',
                      color:          plan.highlight ? '#fff' : 'var(--ink)',
                      fontFamily:     'var(--font-body)',
                      fontWeight:     600,
                      fontSize:       '.88rem',
                      textDecoration: 'none',
                    }}>
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/pricing"
                style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
                {h.pricingCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,158,142,.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}/>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 20 }}>◆ {h.ctaEyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 20px', lineHeight: 1.1 }}>
              {h.ctaTitle}{' '}
              <em style={{ color: 'var(--sage-deep)' }}>{h.ctaTitleEm}</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', margin: '0 auto 44px', maxWidth: 440, lineHeight: 1.65 }}>
              {h.ctaSubtitle}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/signup"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '14px 32px',
                  borderRadius:   'var(--radius)',
                  background:     'var(--sage-deep)',
                  color:          '#fff',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     600,
                  fontSize:       '.95rem',
                  textDecoration: 'none',
                }}>
                {h.ctaCta1}
              </Link>
              <Link href="/about"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            8,
                  padding:        '14px 24px',
                  borderRadius:   'var(--radius)',
                  border:         '1.5px solid var(--line)',
                  color:          'var(--ink)',
                  fontFamily:     'var(--font-body)',
                  fontWeight:     500,
                  fontSize:       '.95rem',
                  textDecoration: 'none',
                }}>
                {h.ctaCta2}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              