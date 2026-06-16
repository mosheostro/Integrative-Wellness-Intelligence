import Link from 'next/link'
import type { Metadata } from 'next'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'The Science — Holos Integrative Wellness Intelligence',
  description:
    'How Holos translates peer-reviewed research and six wisdom traditions into a personalised wellness system. Evidence-based, tradition-informed.',
}

// Pillar names and bodies are scholarly/medical content — kept in English.
const PILLARS = [
  {
    number: '01',
    title: 'Psychoneuroimmunology',
    body: 'The bidirectional link between mind and body is no longer hypothesis — it is the foundation of modern integrative medicine. Holos operationalises PNI research by tracking how mental state markers correlate with physical dimension scores over time.',
  },
  {
    number: '02',
    title: 'Chronobiology & Circadian Science',
    body: 'Meal timing, sleep pressure, cognitive peaks, and exercise windows are all governed by circadian rhythms. Holos maps your chronotype and schedules recommendations to your biological clock, not a generic 9-to-5.',
  },
  {
    number: '03',
    title: 'Positive Psychology & ACT',
    body: 'Acceptance and Commitment Therapy and wellbeing science show that meaning, values alignment, and psychological flexibility predict long-term health outcomes. Holos integrates values clarification into goal-setting and daily reflections.',
  },
  {
    number: '04',
    title: 'Functional Medicine Root-Cause Model',
    body: 'Symptoms are downstream. Holos applies the Functional Medicine matrix to surface upstream drivers — gut-brain axis, HPA dysregulation, nutrient insufficiency — and maps them to actionable protocol categories.',
  },
  {
    number: '05',
    title: 'Contemplative Neuroscience',
    body: 'Decades of research on meditation, breathwork, and contemplative practice show measurable changes in HRV, cortisol, and neuroplasticity. Holos draws on validated protocols from Tibetan, Vedic, and Jewish mystical traditions.',
  },
  {
    number: '06',
    title: 'Nutritional Psychiatry',
    body: 'The gut-brain axis and the role of the microbiome in mood regulation are among the fastest-moving areas of health science. Holos nutrition guidance is informed by current research on the Mediterranean diet, anti-inflammatory eating, and personalised microbiome data.',
  },
]

// Academic citations — kept in English
const REFS = [
  { text: 'Irwin & Cole (2011). Reciprocal regulation of the neural and innate immune systems.', journal: 'Nature Reviews Immunology' },
  { text: 'Roenneberg & Merrow (2016). The circadian clock and human health.', journal: 'Current Biology' },
  { text: 'Hayes et al. (2006). Acceptance and Commitment Therapy: Model, data, and extension.', journal: 'Behaviour Research and Therapy' },
  { text: 'Hyman (2010). The UltraWellness system: Redefining systems medicine.', journal: 'Alternative Therapies in Health and Medicine' },
  { text: 'Ricard et al. (2014). Mind of the meditator.', journal: 'Scientific American' },
  { text: 'Jacka et al. (2017). A randomised controlled trial of dietary improvement for adults with major depression.', journal: 'BMC Medicine' },
]

export default async function SciencePage() {
  const { strings } = await getServerStrings()
  const s = strings.science

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section style={{
        background: 'var(--ink)',
        padding: '80px 24px 72px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,.07)',
            border: '1px solid rgba(255,255,255,.12)',
            borderRadius: 999,
            padding: '6px 16px',
            fontSize: '.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--sage)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            ◈ {s.eyebrow}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 500,
            color: 'var(--canvas)',
            lineHeight: 1.18,
            marginBottom: 20,
          }}>
            {s.heroTitle}<br /><em>{s.heroTitleEm}</em>
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,.65)',
            lineHeight: 1.75,
            maxWidth: 540,
            margin: '0 auto',
          }}>
            {s.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Science pillars */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          fontWeight: 500,
          color: 'var(--ink)',
          marginBottom: 48,
        }}>
          {s.pillarsTitle}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PILLARS.map((p, i) => (
            <div key={p.number} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '0 32px',
              padding: '36px 0',
              borderBottom: i < PILLARS.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                color: 'var(--line)',
                fontWeight: 500,
                lineHeight: 1,
                paddingTop: 4,
              }}>{p.number}</div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  marginBottom: 10,
                }}>{p.title}</h3>
                <p style={{
                  color: 'var(--ink-soft)',
                  lineHeight: 1.75,
                  fontSize: '.95rem',
                }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rambam synthesis callout */}
      <section style={{
        background: 'linear-gradient(135deg, oklch(0.96 0.02 155 / 0.5), oklch(0.96 0.02 270 / 0.3))',
        border: '1px solid var(--line)',
        margin: '0 24px 80px',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 40px',
        maxWidth: 860,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '.72rem',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--sage-deep)',
          marginBottom: 16,
        }}>{s.rambamEyebrow}</p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
          fontWeight: 500,
          color: 'var(--ink)',
          marginBottom: 16,
          lineHeight: 1.3,
        }}>
          {s.rambamTitle}
        </h2>
        <p style={{
          color: 'var(--ink-soft)',
          lineHeight: 1.75,
          maxWidth: 620,
          marginBottom: 24,
        }}>
          {s.rambamBody}
        </p>
        <Link href="/knowledge/rambam-modern-wellness" style={{
          fontSize: '.9rem',
          color: 'var(--sage-deep)',
          fontWeight: 600,
          textDecoration: 'none',
        }}>
          {s.rambamCta}
        </Link>
      </section>

      {/* Key references */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.3rem',
          fontWeight: 500,
          color: 'var(--ink)',
          marginBottom: 24,
        }}>{s.refsTitle}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {REFS.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 16,
              padding: '16px 20px',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.75rem',
                color: 'var(--ink-faint)',
                minWidth: 24,
                paddingTop: 2,
              }}>{i + 1}</div>
              <div>
                <p style={{ fontSize: '.88rem', color: 'var(--ink)', lineHeight: 1.5, marginBottom: 4 }}>{r.text}</p>
                <p style={{ fontSize: '.78rem', color: 'var(--sage-deep)', fontStyle: 'italic' }}>{r.journal}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '.82rem', color: 'var(--ink-faint)', marginTop: 20, lineHeight: 1.6 }}>
          {s.refsFooter}{' '}
          <Link href="/contact" style={{ color: 'var(--sage-deep)' }}>{s.refsFooterCta}</Link>.
        </p>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--canvas2)',
        padding: '64px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--line)',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 500,
            color: 'var(--ink)',
            marginBottom: 16,
          }}>
            {s.ctaTitle}
          </h2>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 28 }}>
            {s.ctaBody}
          </p>
          <Link href="/assessment" style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'var(--sage)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            {s.ctaCta}
          </Link>
        </div>
      </section>

    </main>
  )
}
