import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'Methodologies — Holos Integrative Wellness Intelligence',
  description: 'Explore the eight wisdom traditions that power HOLOS: Evidence-Based Medicine, Rambam, Hippocrates, Avicenna, Ayurveda, Daoist, Tibetan, and Swarga synthesis.',
}

// Tradition names are proper nouns — not translated.
// Bodies and pillar tags are scholarly/technical content in English.
const TRADITIONS_META = [
  {
    id:      'evidence-based',
    icon:    '⚗',
    name:    'Evidence-Based Medicine',
    color:   'var(--sage)',
    era:     'Modern · 20th–21st century',
    origin:  'Global',
    taglineKey: 'tEvidenceTagline' as const,
    body:    `Evidence-Based Medicine (EBM) integrates the best available clinical research with individual patient circumstances and values. HOLOS uses EBM as its calibration layer — every dimension score is anchored in peer-reviewed biomarker research, epidemiological data, and clinical guidelines.\n\nIn HOLOS, EBM provides the measurable targets: optimal HRV ranges, sleep architecture percentages, macro ratios, VO₂ max benchmarks. It is the language that translates traditional insights into actionable numbers.`,
    pillars: ['Randomised controlled trials', 'Systematic reviews & meta-analyses', 'Biomarker optimisation', 'Personalised risk stratification'],
  },
  {
    id:      'rambam',
    icon:    '☽',
    name:    'Rambam',
    color:   'var(--indigo)',
    era:     '12th century · 1138–1204 CE',
    origin:  'Córdoba & Cairo',
    taglineKey: 'tRambamTagline' as const,
    body:    `Rabbi Moses ben Maimon — known as Rambam (or Maimonides) — was simultaneously the greatest Jewish philosopher, the court physician of Saladin, and one of the most systematic medical thinkers in history. His "Regimen of Health" synthesised Galenic medicine, Islamic medicine, and Jewish law into a preventive wellness system eight centuries before preventive medicine existed.\n\nRambam's genius was prescriptive precision: specific sleep hours, dietary sequencing, emotional regulation practices, and a proto-psychosomatic understanding of how thoughts affect physical health. HOLOS uses the Rambam framework for users seeking a Jewish-ethical or historical Mediterranean lens on their wellness data.`,
    pillars: ['Preventive regimen (Hanhagat HaBriut)', 'Dietary sequencing and seasonal eating', 'Psychosomatic health (mind-body unity)', 'Sleep and rest as medical intervention'],
  },
  {
    id:      'hippocrates',
    icon:    '♾',
    name:    'Hippocratic Medicine',
    color:   'var(--clay)',
    era:     '5th century BCE',
    origin:  'Ancient Greece',
    taglineKey: 'tHippocratesTagline' as const,
    body:    `The Hippocratic tradition, codified in 460 BCE, established the foundational premise of Western medicine: that disease has natural causes and that the body has innate healing capacity. The four humours — blood, phlegm, yellow bile, black bile — were its diagnostic language, mapping to temperaments, seasons, and organ systems.\n\nWhat makes Hippocrates enduringly relevant is not the humours themselves but the framework: the clinician as observer of the whole patient in their environment, and health as dynamic balance rather than the absence of symptoms. HOLOS's nine-dimension model is a direct descendant of this insight.`,
    pillars: ['Four humours and constitutional types', 'Seasonal and environmental health', 'Diet and lifestyle as primary medicine', 'Vis medicatrix naturae (healing power of nature)'],
  },
  {
    id:      'avicenna',
    icon:    '◈',
    name:    'Avicenna',
    color:   'var(--gold)',
    era:     '10th–11th century · 980–1037 CE',
    origin:  'Persia',
    taglineKey: 'tAvicennaTagline' as const,
    body:    `Ibn Sina (Avicenna) wrote the Canon of Medicine in 1025 CE — a 14-volume encyclopaedia that remained the standard medical textbook in Europe and the Islamic world for six centuries. He synthesised Hippocratic, Galenic, and Aristotelian medicine with original insights in pharmacology, psychiatry, and preventive health.\n\nAvicenna's contribution to HOLOS is his concept of "Mizaj" — individual temperament — which becomes a precision personalisation layer. His six essential principles of health (air, food & drink, sleep & waking, movement & rest, evacuation & retention, mental states) map almost perfectly onto the nine HOLOS dimensions.`,
    pillars: ['Mizaj — individual temperamental constitution', 'Six essential principles of health', 'Polypharmacy and botanical medicine', 'Mental health as medical discipline'],
  },
  {
    id:      'ayurveda',
    icon:    '🌿',
    name:    'Ayurveda',
    color:   'var(--sage)',
    era:     '3000 BCE – present',
    origin:  'Indian subcontinent',
    taglineKey: 'tAyurvedaTagline' as const,
    body:    `Ayurveda — the "knowledge of life" — is the oldest continuously practised medical system on Earth. Its central insight is that every individual has a unique constitutional type (Prakriti) composed of three doshas: Vata (air + space), Pitta (fire + water), and Kapha (earth + water). Disease arises when these doshas fall out of their individual balance.\n\nWhat makes Ayurveda extraordinary for HOLOS is its precision personalisation. The same food, sleep schedule, or exercise that heals one person can harm another — because their Prakriti differs. HOLOS uses dosha analysis to transform generic recommendations into constitution-specific guidance.`,
    pillars: ['Prakriti — constitutional typing (Vata/Pitta/Kapha)', 'Dinacharya — daily routine as medicine', 'Ritucharya — seasonal adaptation', 'Agni — digestive fire and metabolism'],
  },
  {
    id:      'daoist',
    icon:    '☯',
    name:    'Daoist Medicine',
    color:   'var(--indigo)',
    era:     '5th century BCE – present',
    origin:  'China',
    taglineKey: 'tDaoistTagline' as const,
    body:    `Daoist medical philosophy — the foundation of Traditional Chinese Medicine — sees the body as a microcosm of nature, governed by the same forces that move seasons and stars. Qi (vital energy) flows through meridian channels. The five elements (wood, fire, earth, metal, water) map to organ systems, emotions, seasons, and flavours. Health is the smooth, abundant flow of Qi; disease is its stagnation, deficiency, or excess.\n\nHOLOS applies the Daoist framework to reveal the energetic dimension of health that purely biochemical models miss.`,
    pillars: ['Qi cultivation and circulation', 'Five-element constitutional analysis', 'Yin-Yang balance across seasons', 'Meridian and organ-system relationships'],
  },
  {
    id:      'tibetan',
    icon:    '❋',
    name:    'Tibetan Medicine',
    color:   'var(--clay)',
    era:     '7th century CE – present',
    origin:  'Tibet & Himalayan region',
    taglineKey: 'tTibetanTagline' as const,
    body:    `Tibetan medicine (Sowa Rigpa — "the science of healing") developed in the Himalayas over 1,400 years, synthesising Ayurvedic, Chinese, and Greek medicine with Buddhist philosophy. Its three humours — Lung (wind/air), Tripa (bile/fire), and Beken (phlegm/water-earth) — closely parallel Ayurvedic doshas but with a uniquely Tibetan psychological and spiritual dimension.\n\nWhat distinguishes Tibetan medicine in HOLOS is its sophisticated model of the mind-body relationship. The "Three Poisons" — ignorance, attachment, and aversion — are understood as the root causes of all physical disease.`,
    pillars: ['Three nyépa (Lung, Tripa, Beken) constitution', 'Urine analysis and pulse diagnostics', 'Mind-body-spirit integration', 'Spiritual root causes of disease (Three Poisons)'],
  },
  {
    id:      'swarga',
    icon:    '✦',
    name:    'Swarga Synthesis',
    color:   'var(--gold)',
    era:     '2024 CE',
    origin:  'HOLOS',
    taglineKey: 'tSwargaTagline' as const,
    body:    `Swarga is the HOLOS synthesis framework — named after the Sanskrit concept of the bridge between earth and the divine. When you choose Swarga, HOLOS applies all eight wisdom frameworks simultaneously to your answers, weighs them by their relevance to each dimension, and synthesises a composite portrait that no single tradition could produce alone.\n\nSwarga is the recommendation for users who want the most complete possible view of their wellness. It is also the default recommendation for users new to integrative health who don't yet have a tradition affinity.`,
    pillars: ['Multi-tradition composite scoring', 'Cross-tradition agreement detection', 'Highest-confidence recommendation surfacing', 'AI coaching across all eight frameworks'],
  },
]

type MetaKey = 'tEvidenceTagline' | 'tRambamTagline' | 'tHippocratesTagline' | 'tAvicennaTagline' | 'tAyurvedaTagline' | 'tDaoistTagline' | 'tTibetanTagline' | 'tSwargaTagline'

export default async function MethodologiesPage() {
  const { strings } = await getServerStrings()
  const m = strings.methodologies

  const TRADITIONS = TRADITIONS_META.map(t => ({
    ...t,
    tagline: m[t.taglineKey as MetaKey],
  }))

  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,111,168,.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>
            ◈ {m.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 24px' }}>
            {m.titleA}{' '}
            <em style={{ color: 'var(--indigo)', fontStyle: 'italic' }}>{m.titleEm}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 560, margin: '0 auto 48px' }}>
            {m.subtitle}
          </p>
          {/* Tradition pill nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {TRADITIONS.map(t => (
              <a key={t.id} href={`#${t.id}`}
                style={{
                  padding:        '6px 16px',
                  borderRadius:   100,
                  border:         '1px solid var(--line)',
                  fontFamily:     'var(--font-body)',
                  fontSize:       '.8rem',
                  color:          'var(--ink-soft)',
                  textDecoration: 'none',
                  background:     'var(--surface)',
                }}>
                {t.icon} {t.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Traditions ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}>
          {TRADITIONS.map((t, i) => (
            <article key={t.id} id={t.id} style={{
              background:   i % 2 === 1 ? 'var(--canvas2)' : 'transparent',
              border:       '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding:      '48px 44px',
              borderTop:    `4px solid ${t.color}`,
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
                <div style={{ fontSize: '2.4rem', lineHeight: 1 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.12em', color: t.color, marginBottom: 6 }}>
                    {t.era} · {t.origin}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 4px' }}>
                    {t.name}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--ink-soft)', fontStyle: 'italic', margin: 0 }}>
                    {t.tagline}
                  </p>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 28 }}>
                {t.body.split('\n\n').map((para, j) => (
                  <p key={j} style={{ margin: j > 0 ? '16px 0 0' : 0 }}>{para}</p>
                ))}
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--ink-faint)', marginBottom: 12 }}>
                  {m.keyPillars}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {t.pillars.map(pillar => (
                    <span key={pillar} style={{
                      padding:      '5px 12px',
                      borderRadius: 100,
                      background:   'var(--surface)',
                      border:       `1px solid ${t.color}33`,
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.78rem',
                      color:        'var(--ink-soft)',
                    }}>{pillar}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--canvas2)', padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
            {m.ctaTitle}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', color: 'var(--ink-soft)', margin: '0 0 36px', lineHeight: 1.65 }}>
            {m.ctaBody}
          </p>
          <Link href="/auth/signup"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            8,
              padding:        '14px 32px',
              borderRadius:   'var(--radius)',
              background:     'var(--sage)',
              color:          '#fff',
              fontFamily:     'var(--font-body)',
              fontWeight:     600,
              fontSize:       '.95rem',
              textDecoration: 'none',
            }}>
            {m.ctaCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
