import Link from 'next/link'
import { FOUNDER } from '@/lib/founder'

export const metadata = {
  title: 'About — Holos Integrative Wellness Intelligence',
  description: 'Meet Moshe Ostrovsky, founder of HOLOS — 15 years studying wellness traditions across four continents, synthesised into one intelligence platform.',
}

const PHILOSOPHY = [
  {
    icon: '◈',
    title: 'The Whole is More Than the Sum',
    body: 'No single dimension — sleep, nutrition, stress — can explain health in isolation. HOLOS scores nine dimensions simultaneously and surfaces the interactions between them.',
  },
  {
    icon: '◉',
    title: 'Wisdom Has No Single Origin',
    body: 'Every major civilisation developed a complete medical philosophy. They disagree on mechanism but converge on the same outcomes. HOLOS holds that convergence.',
  },
  {
    icon: '◆',
    title: 'Data Without Context Is Noise',
    body: 'A score only matters if it guides action. Every HOLOS assessment ends with ranked, tradeable actions — not just a number to stare at.',
  },
  {
    icon: '◎',
    title: 'Your Coach Should Know You',
    body: 'The AI Coach inside HOLOS is grounded in your actual assessment data. It cannot give generic advice — because it can see your actual portrait.',
  },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding:       '96px 24px 80px',
        textAlign:     'center',
        position:      'relative',
        overflow:      'hidden',
      }}>
        <div aria-hidden style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(122,158,142,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>◈ The Founder</div>
          <h1 style={{
            fontFamily:   'var(--font-serif)',
            fontSize:     'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight:   500,
            letterSpacing:'-0.03em',
            lineHeight:   1.1,
            color:        'var(--ink)',
            margin:       '0 0 24px',
          }}>
            Built at the intersection of{' '}
            <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>ancient and modern.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 560, margin: '0 auto' }}>
            {FOUNDER.name} spent {'>'}15 years studying wellness traditions across four continents before building the tool he wished had existed from the beginning.
          </p>
        </div>
      </section>

      {/* ── Bio Section ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
          {/* Avatar card */}
          <div style={{
            background:   'var(--canvas2)',
            border:       '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding:      '48px 36px',
            textAlign:    'center',
            position:     'sticky',
            top:          88,
          }}>
            <div style={{
              width:          96,
              height:         96,
              borderRadius:   '50%',
              background:     'linear-gradient(135deg, var(--sage) 0%, var(--indigo) 100%)',
              margin:         '0 auto 20px',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       '2.4rem',
              color:          '#fff',
            }}>◈</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 4px' }}>{FOUNDER.name}</h2>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)', marginBottom: 28 }}>{FOUNDER.title}</div>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              <a href={`mailto:${FOUNDER.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
                <span style={{ color: 'var(--sage)', width: 16 }}>✉</span> {FOUNDER.email}
              </a>
              <a href={FOUNDER.whatsapp} target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
                <span style={{ color: 'var(--sage)', width: 16 }}>◎</span> WhatsApp
              </a>
              <a href={FOUNDER.telegram} target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
                <span style={{ color: 'var(--sage)', width: 16 }}>◉</span> Telegram
              </a>
              <a href={FOUNDER.linkedin} target="_blank" rel="noopener"
                style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: '.83rem', color: 'var(--ink-soft)', textDecoration: 'none' }}>
                <span style={{ color: 'var(--sage)', width: 16 }}>◆</span> LinkedIn
              </a>
            </div>

            <a href={FOUNDER.calendly} target="_blank" rel="noopener"
              style={{
                display:      'block',
                padding:      '12px 20px',
                borderRadius: 'var(--radius)',
                background:   'var(--sage)',
                color:        '#fff',
                fontFamily:   'var(--font-body)',
                fontWeight:   600,
                fontSize:     '.88rem',
                textDecoration: 'none',
                textAlign:    'center',
              }}>
              Book a consultation &#8594;
            </a>

            {/* Credentials */}
            <div style={{ marginTop: 32, textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 12 }}>Credentials</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FOUNDER.credentials.map((c: string) => (
                  <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-soft)' }}>
                    <span style={{ color: 'var(--sage)', flexShrink: 0, marginTop: 2 }}>✓</span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 24px' }}>
              The 15-year journey behind HOLOS.
            </h2>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
              <p>{FOUNDER.bio}</p>
              <p style={{ marginTop: 20 }}>
                What began as a personal quest to resolve a chronic health mystery that Western medicine couldn't explain became a systematic study of every major medical tradition on earth. From Ayurvedic ashrams in Kerala to Tibetan medical colleges in Dharamsala; from Daoist monasteries in Wudang to academic hospitals in Tel Aviv — Moshe studied where the traditions agreed, and more importantly, where they disagreed.
              </p>
              <p style={{ marginTop: 20 }}>
                The pattern he found: every tradition uses different language, different mechanisms, different treatments — but they all converge on the same underlying signal. That signal is HOLOS.
              </p>
            </div>

            <blockquote style={{
              margin:      '36px 0',
              padding:     '24px 28px',
              background:  'var(--canvas2)',
              border:      '1px solid var(--line)',
              borderLeft:  '4px solid var(--sage)',
              borderRadius:'0 var(--radius) var(--radius) 0',
              fontFamily:  'var(--font-serif)',
              fontSize:    '1.05rem',
              fontStyle:   'italic',
              color:       'var(--ink)',
              lineHeight:  1.65,
            }}>
              &ldquo;True health is the dynamic harmony between body, energy, mind, and meaning. Every tradition holds a piece of the truth. HOLOS holds them all at once.&rdquo;
              <cite style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '.8rem', fontStyle: 'normal', color: 'var(--ink-faint)' }}>
                — {FOUNDER.name}
              </cite>
            </blockquote>

            {/* Expertise areas */}
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 16 }}>Areas of Expertise</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {FOUNDER.expertise.map((e: string) => (
                  <div key={e} style={{
                    background:   'var(--canvas2)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                    padding:      '10px 14px',
                    fontFamily:   'var(--font-body)',
                    fontSize:     '.8rem',
                    color:        'var(--ink-soft)',
                    display:      'flex',
                    alignItems:   'center',
                    gap:          8,
                  }}>
                    <span style={{ color: 'var(--sage)', fontSize: '.65rem' }}>◈</span>
                    {e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section style={{ background: 'var(--canvas2)', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 12 }}>◉ Design Philosophy</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
              The principles that guide everything.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {PHILOSOPHY.map(p => (
              <div key={p.title} style={{
                background:   'var(--surface)',
                border:       '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding:      '32px 28px',
              }}>
                <div style={{ fontSize: '1.4rem', color: 'var(--sage)', marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 20px' }}>
            Ready to see your whole self?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)', margin: '0 0 40px', lineHeight: 1.65 }}>
            Begin with a free assessment. No credit card. No commitment. Just clarity.
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
              Begin free assessment &#8594;
            </Link>
            <Link href="/contact"
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
              Contact Moshe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
