import Link from 'next/link'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

const STATS = [
  { value: '9',    label: 'Wellness Dimensions' },
  { value: '8',    label: 'Wisdom Traditions'   },
  { value: '50+',  label: 'Adaptive Questions'  },
  { value: '15+',  label: 'Years of Research'   },
]

const DIMENSIONS = [
  { key: 'nutrition',     label: 'Nutrition',      color: 'var(--sage)',   icon: '◉', desc: 'Food as medicine — micro, macro, and energetic quality' },
  { key: 'sleep',         label: 'Sleep',           color: 'var(--indigo)', icon: '◎', desc: 'Circadian alignment, depth, and restorative quality'     },
  { key: 'recovery',      label: 'Recovery',        color: 'var(--clay)',   icon: '◆', desc: 'HRV, rest intervals, and regenerative capacity'          },
  { key: 'stress',        label: 'Stress',          color: 'var(--rose)',   icon: '◈', desc: 'Allostatic load, resilience, and nervous system tone'    },
  { key: 'movement',      label: 'Movement',        color: 'var(--gold)',   icon: '◉', desc: 'Strength, mobility, breath, and energetic cultivation'   },
  { key: 'emotional',     label: 'Emotional',       color: 'var(--indigo)', icon: '◎', desc: 'Emotional range, regulation, and relational health'      },
  { key: 'life_balance',  label: 'Life Balance',    color: 'var(--sage)',   icon: '◆', desc: 'Work, play, rest, and meaningful contribution'          },
  { key: 'purpose',       label: 'Purpose',         color: 'var(--gold)',   icon: '◈', desc: 'Meaning, direction, values alignment, and legacy'       },
  { key: 'energy',        label: 'Energy',          color: 'var(--clay)',   icon: '◉', desc: 'Vitality, prana, Qi — the animating force of life'      },
]

const TRADITIONS = [
  { icon: '⚗', name: 'Evidence-Based', desc: 'Modern clinical science and peer-reviewed research', color: 'var(--sage)',   id: 'evidence-based' },
  { icon: '☽', name: 'Rambam',         desc: 'Maimonides — 12th-century integrative medicine',     color: 'var(--indigo)', id: 'rambam'         },
  { icon: '♾', name: 'Hippocrates',    desc: 'Four humours and the original holistic medicine',    color: 'var(--clay)',   id: 'hippocrates'    },
  { icon: '◈', name: 'Avicenna',       desc: 'The Canon of Medicine — Islamic golden-age science', color: 'var(--gold)',   id: 'avicenna'       },
  { icon: '🌿', name: 'Ayurveda',      desc: 'Vata · Pitta · Kapha — India\'s 5,000-year system', color: 'var(--sage)',   id: 'ayurveda'       },
  { icon: '☯', name: 'Daoist',         desc: 'Five elements, Qi cultivation, and Wu Xing balance', color: 'var(--indigo)', id: 'daoist'         },
  { icon: '❋', name: 'Tibetan',        desc: 'Wind · Bile · Phlegm — the Himalayan medical arts',  color: 'var(--clay)',   id: 'tibetan'        },
  { icon: '✦', name: 'Swarga',         desc: 'HOLOS synthesis — all eight traditions, unified',    color: 'var(--gold)',   id: 'swarga'         },
]

const STEPS = [
  { n: '01', title: 'Choose your tradition', body: 'Select the wisdom framework you want applied — or let HOLOS synthesise across all eight simultaneously.', icon: '◈' },
  { n: '02', title: 'Answer adaptively', body: '15–50 branching questions that intelligently adjust to reveal the signal beneath your surface answers.', icon: '◉' },
  { n: '03', title: 'Receive your portrait', body: 'A scored, nine-dimensional wellness portrait with ranked actions, AI coaching, and longitudinal tracking.', icon: '◆' },
]

const PRICING_PREVIEW = [
  {
    name: 'Seeker',
    price: 'Free',
    period: 'forever',
    desc: 'Begin your wellness intelligence journey',
    features: ['1 assessment per month', 'Evidence-Based tradition', 'Basic wellness portrait', 'AI Coach (3 sessions)'],
    cta: 'Start free',
    href: '/auth/signup',
    highlight: false,
  },
  {
    name: 'Practitioner',
    price: '$39',
    period: '/month',
    desc: 'Unlock the full multi-tradition system',
    features: ['Unlimited assessments', 'All 8 wisdom traditions', 'AI Coach (unlimited)', 'Journal, Goals & Habits', 'Progress tracking', 'Detailed reports'],
    cta: 'Start 14-day trial',
    href: '/auth/signup?plan=pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For clinics, coaches, and wellness teams',
    features: ['Everything in Practitioner', 'Multi-user management', 'Client portal', 'White-label options', 'Dedicated coach support', 'Custom integrations'],
    cta: 'Contact us',
    href: '/contact',
    highlight: false,
  },
]

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: 'var(--canvas)' }}>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section style={{
          minHeight:     '92vh',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          justifyContent:'center',
          textAlign:     'center',
          padding:       '120px 24px 80px',
          position:      'relative',
          overflow:      'hidden',
        }}>
          {/* Ambient gradient */}
          <div aria-hidden style={{
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(122,158,142,.14) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(107,111,168,.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}/>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
            {/* Eyebrow */}
            <div style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           8,
              background:    'rgba(122,158,142,.1)',
              border:        '1px solid rgba(122,158,142,.25)',
              borderRadius:  100,
              padding:       '6px 16px',
              marginBottom:  32,
            }}>
              <span style={{ color: 'var(--sage)', fontSize: '.9rem' }}>◈</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)' }}>
                Integrative Wellness Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:   'var(--font-serif)',
              fontSize:     'clamp(2.6rem, 6vw, 4.8rem)',
              fontWeight:   500,
              lineHeight:   1.08,
              letterSpacing:'-0.03em',
              color:        'var(--ink)',
              margin:       '0 0 28px',
            }}>
              Your whole self,{' '}
              <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>seen whole.</em>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(1.05rem, 2vw, 1.2rem)',
              lineHeight: 1.65,
              color:      'var(--ink-soft)',
              maxWidth:   580,
              margin:     '0 auto 48px',
            }}>
              HOLOS maps your health across nine dimensions and eight wisdom traditions — from ancient Ayurveda to modern clinical science — revealing patterns that single-metric apps miss entirely.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/signup"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '14px 32px',
                  borderRadius: 'var(--radius)',
                  background:   'var(--sage)',
                  color:        '#fff',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   600,
                  fontSize:     '.95rem',
                  textDecoration: 'none',
                  letterSpacing: '-.01em',
                }}>
                Begin your assessment
                <span aria-hidden>&#8594;</span>
              </Link>
              <Link href="/methodologies"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '14px 28px',
                  borderRadius: 'var(--radius)',
                  border:       '1.5px solid var(--line)',
                  color:        'var(--ink)',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   500,
                  fontSize:     '.95rem',
                  textDecoration: 'none',
                  background:   'transparent',
                }}>
                Explore traditions
              </Link>
            </div>

            {/* Trust bar */}
            <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 40px' }}>
              {STATS.map(s => (
                <div key={s.value} style={{ textAlign: 'center', padding: '8px 0' }}>
                  <div style={{
                    fontFamily:   'var(--font-serif)',
                    fontSize:     '1.8rem',
                    fontWeight:   500,
                    color:        'var(--ink)',
                    letterSpacing: '-.02em',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   '.75rem',
                    color:      'var(--ink-faint)',
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>&#9702; How It Works</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
                Three steps to clarity.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {STEPS.map((step, i) => (
                <div key={step.n}
                  style={{
                    background:   'var(--surface)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding:      '36px 32px',
                    position:     'relative',
                  }}>
                  <div style={{
                    fontFamily:   'var(--font-mono)',
                    fontSize:     '2.8rem',
                    fontWeight:   500,
                    color:        'var(--line)',
                    lineHeight:   1,
                    marginBottom: 20,
                    letterSpacing: '-.02em',
                  }}>{step.n}</div>
                  <div style={{ fontSize: '1.4rem', marginBottom: 12, color: 'var(--sage)' }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 10px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
                    {step.body}
                  </p>
                  {i < STEPS.length - 1 && (
                    <div aria-hidden style={{
                      display:  'none',
                      position: 'absolute',
                      right:    -20,
                      top:      '50%',
                      fontSize: '1.2rem',
                      color:    'var(--line)',
                    }}>&#8594;</div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/auth/signup"
                style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 600, color: 'var(--sage)', textDecoration: 'none' }}>
                Start your assessment free &#8594;
              </Link>
            </div>
          </div>
        </section>

        {/* ── 9 Dimensions ─────────────────────────────────── */}
        <section style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>&#9670; Nine Dimensions</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
                Health is not a number.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto' }}>
                Every dimension interacts. Holos scores them together — not in silos — revealing the hidden patterns beneath your symptoms.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {DIMENSIONS.map(d => (
                <Link key={d.key} href="/assessment"
                  style={{
                    display:      'block',
                    background:   'var(--surface)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding:      '24px 22px',
                    textDecoration: 'none',
                    transition:   'border-color .2s, box-shadow .2s, transform .2s',
                    borderTop:    `3px solid ${d.color}`,
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>&#9672; Eight Traditions</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
                Every tradition has something to teach.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto' }}>
                Choose the wisdom lens you want applied — or let Swarga synthesise all eight. The same answers produce a different portrait under each tradition.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {TRADITIONS.map(t => (
                <Link key={t.id} href={`/methodologies#${t.id}`}
                  style={{
                    display:      'block',
                    background:   'var(--surface)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding:      '28px 24px',
                    textDecoration: 'none',
                    transition:   'border-color .2s, box-shadow .2s',
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
                style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', fontWeight: 600, color: 'var(--sage)', textDecoration: 'none' }}>
                Explore all eight traditions &#8594;
              </Link>
            </div>
          </div>
        </section>

        {/* ── Founder ──────────────────────────────────────── */}
        <section style={{ padding: '96px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 16 }}>&#9670; The Founder</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 20px' }}>
                Built by a practitioner,<br/>
                <em style={{ color: 'var(--sage)' }}>not a tech company.</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', lineHeight: 1.75, color: 'var(--ink-soft)', margin: '0 0 24px' }}>
                Moshe Ostrovsky spent 15 years studying wellness traditions across four continents — from Ayurvedic ashrams in India to Tibetan medical colleges in Nepal. HOLOS is the synthesis of that journey.
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
                &ldquo;True health is the dynamic harmony between body, energy, mind, and meaning. Every tradition holds a piece of the truth. HOLOS holds them all at once.&rdquo;
              </blockquote>
              <Link href="/about"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '10px 24px',
                  borderRadius: 'var(--radius)',
                  border:       '1.5px solid var(--line)',
                  color:        'var(--ink)',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   500,
                  fontSize:     '.88rem',
                  textDecoration: 'none',
                }}>
                Meet Moshe &#8594;
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
                width:        80,
                height:       80,
                borderRadius: '50%',
                background:   'linear-gradient(135deg, var(--sage) 0%, var(--indigo) 100%)',
                margin:       '0 auto 20px',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                fontSize:     '2rem',
                color:        '#fff',
              }}>◈</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 500, marginBottom: 4 }}>Moshe Ostrovsky</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--ink-faint)', marginBottom: 24 }}>Founder &amp; Chief Wellness Architect</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Certified Integrative Wellness Coach', 'Ayurvedic Health Practitioner', 'Tibetan Medicine Graduate'].map(c => (
                  <div key={c} style={{
                    display:    'flex',
                    alignItems: 'center',
                    gap:        8,
                    fontFamily: 'var(--font-body)',
                    fontSize:   '.8rem',
                    color:      'var(--ink-soft)',
                  }}>
                    <span style={{ color: 'var(--sage)', fontSize: '.7rem' }}>&#10003;</span>
                    {c}
                  </div>
                ))}
              </div>
              <a href="https://calendly.com/moshe-holos" target="_blank" rel="noopener"
                style={{
                  display:      'block',
                  marginTop:    28,
                  padding:      '10px 20px',
                  borderRadius: 'var(--radius)',
                  background:   'var(--sage)',
                  color:        '#fff',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   600,
                  fontSize:     '.85rem',
                  textDecoration: 'none',
                  textAlign:    'center',
                }}>
                Book a session &#8594;
              </a>
            </div>
          </div>
        </section>

        {/* ── Pricing Preview ───────────────────────────────── */}
        <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>&#9670; Pricing</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 12px' }}>
                Start free. Scale as you grow.
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)' }}>
                No credit card required. 14-day Pro trial included.
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
                      position:     'absolute',
                      top:          -12,
                      left:         '50%',
                      transform:    'translateX(-50%)',
                      background:   'var(--sage)',
                      color:        '#fff',
                      fontFamily:   'var(--font-mono)',
                      fontSize:     '.65rem',
                      textTransform:'uppercase',
                      letterSpacing:'.1em',
                      padding:      '4px 14px',
                      borderRadius: 100,
                    }}>Most Popular</div>
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
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: plan.highlight ? 'rgba(255,255,255,.7)' : 'var(--ink-soft)' }}>
                        <span style={{ color: 'var(--sage)', flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href={plan.href}
                    style={{
                      display:      'block',
                      textAlign:    'center',
                      padding:      '12px 20px',
                      borderRadius: 'var(--radius)',
                      background:   plan.highlight ? 'var(--sage)' : 'transparent',
                      border:       plan.highlight ? 'none' : '1.5px solid var(--line)',
                      color:        plan.highlight ? '#fff' : 'var(--ink)',
                      fontFamily:   'var(--font-body)',
                      fontWeight:   600,
                      fontSize:     '.88rem',
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
                View full pricing &amp; feature comparison &#8594;
              </Link>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(122,158,142,.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}/>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>&#9672; Begin</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 20px', lineHeight: 1.1 }}>
              Your wellness portrait is{' '}
              <em style={{ color: 'var(--sage)' }}>waiting.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--ink-soft)', margin: '0 auto 44px', maxWidth: 440, lineHeight: 1.65 }}>
              Free to start. No credit card. Your data stays yours, always.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/auth/signup"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '14px 32px',
                  borderRadius: 'var(--radius)',
                  background:   'var(--sage)',
                  color:        '#fff',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   600,
                  fontSize:     '.95rem',
                  textDecoration: 'none',
                }}>
                Create your Holos account &#8594;
              </Link>
              <Link href="/about"
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '14px 24px',
                  borderRadius: 'var(--radius)',
                  border:       '1.5px solid var(--line)',
                  color:        'var(--ink)',
                  fontFamily:   'var(--font-body)',
                  fontWeight:   500,
                  fontSize:     '.95rem',
                  textDecoration: 'none',
                }}>
                Learn about our approach
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}
