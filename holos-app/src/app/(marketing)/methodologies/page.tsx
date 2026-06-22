export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'
import { getMethodologiesBodies, type ContentKey } from '@/lib/i18n/methodologies-bodies'
import { SectionNav } from '@/components/ui/SectionNav'

export const metadata = {
  title: 'Methodologies — Holos Integrative Wellness Intelligence',
  description: 'Explore the eight wisdom traditions that power HOLOS: Evidence-Based Medicine, Rambam, Hippocrates, Avicenna, Ayurveda, Daoist, Tibetan, and Swarga synthesis.',
}

const TRADITION_ERA_ORIGIN: Record<string, Record<string, { era: string; origin: string }>> = {
  'evidence-based': {
    en: { era: 'Modern · 20th–21st century',        origin: 'Global'                  },
    ru: { era: 'Современность · XX–XXI вв.',        origin: 'Весь мир'                },
    he: { era: 'מודרני · המאות ה-20–21',            origin: 'גלובלי'                  },
    de: { era: 'Modern · 20.–21. Jahrhundert',      origin: 'Global'                  },
  },
  rambam: {
    en: { era: '12th century · 1138–1204 CE',       origin: 'Córdoba & Cairo'         },
    ru: { era: 'XII век · 1138–1204 н.э.',          origin: 'Кордова и Каир'          },
    he: { era: 'המאה ה-12 · 1138–1204 לספירה',     origin: 'קורדובה וקהיר'           },
    de: { era: '12. Jahrhundert · 1138–1204 n. Chr.',origin: 'Córdoba & Kairo'        },
  },
  hippocrates: {
    en: { era: '5th century BCE',                   origin: 'Ancient Greece'          },
    ru: { era: 'V в. до н.э.',                      origin: 'Древняя Греция'          },
    he: { era: 'המאה ה-5 לפנה"ס',                  origin: 'יוון העתיקה'             },
    de: { era: '5. Jahrhundert v. Chr.',             origin: 'Antikes Griechenland'    },
  },
  avicenna: {
    en: { era: '10th–11th century · 980–1037 CE',   origin: 'Persia'                  },
    ru: { era: 'X–XI вв. · 980–1037 н.э.',         origin: 'Персия'                  },
    he: { era: 'המאות ה-10–11 · 980–1037 לספירה',  origin: 'פרס'                     },
    de: { era: '10.–11. Jh. · 980–1037 n. Chr.',    origin: 'Persien'                 },
  },
  ayurveda: {
    en: { era: '3000 BCE – present',                origin: 'Indian subcontinent'     },
    ru: { era: '3000 л. до н.э. – наши дни',       origin: 'Индийский субконтинент'  },
    he: { era: '3000 לפנה"ס – ימינו',              origin: 'תת-היבשת ההודית'         },
    de: { era: '3000 v. Chr. – heute',              origin: 'Indischer Subkontinent'  },
  },
  daoist: {
    en: { era: '5th century BCE – present',         origin: 'China'                   },
    ru: { era: 'V в. до н.э. – наши дни',          origin: 'Китай'                   },
    he: { era: 'המאה ה-5 לפנה"ס – ימינו',          origin: 'סין'                     },
    de: { era: '5. Jh. v. Chr. – heute',            origin: 'China'                   },
  },
  tibetan: {
    en: { era: '7th century CE – present',          origin: 'Tibet & Himalayan region'},
    ru: { era: 'VII в. н.э. – наши дни',           origin: 'Тибет и Гималаи'         },
    he: { era: 'המאה ה-7 לספירה – ימינו',          origin: 'טיבט ואזור ההימלאיה'     },
    de: { era: '7. Jh. n. Chr. – heute',            origin: 'Tibet & Himalaya-Region'  },
  },
  swarga: {
    en: { era: '2024 CE',                           origin: 'HOLOS'                   },
    ru: { era: '2024 н.э.',                         origin: 'HOLOS'                   },
    he: { era: '2024 לספירה',                       origin: 'HOLOS'                   },
    de: { era: '2024 n. Chr.',                      origin: 'HOLOS'                   },
  },
}

const TRADITIONS_META = [
  { id: 'evidence-based', contentKey: 'evidence' as ContentKey, icon: '⚗', color: 'var(--sage-deep)', nameKey: 'tEvidenceName'   as const, taglineKey: 'tEvidenceTagline'   as const },
  { id: 'rambam',         contentKey: 'rambam'   as ContentKey, icon: '☽', color: 'var(--indigo)',    nameKey: 'tRambamName'     as const, taglineKey: 'tRambamTagline'     as const },
  { id: 'hippocrates',    contentKey: 'hippocrates' as ContentKey, icon: '♾', color: 'var(--clay)',   nameKey: 'tHippocratesName' as const, taglineKey: 'tHippocratesTagline' as const },
  { id: 'avicenna',       contentKey: 'avicenna' as ContentKey, icon: '◈', color: 'var(--gold)',      nameKey: 'tAvicennaName'   as const, taglineKey: 'tAvicennaTagline'   as const },
  { id: 'ayurveda',       contentKey: 'ayurveda' as ContentKey, icon: '🌿', color: 'var(--sage-deep)',nameKey: 'tAyurvedaName'   as const, taglineKey: 'tAyurvedaTagline'   as const },
  { id: 'daoist',         contentKey: 'daoist'   as ContentKey, icon: '☯', color: 'var(--indigo)',    nameKey: 'tDaoistName'     as const, taglineKey: 'tDaoistTagline'     as const },
  { id: 'tibetan',        contentKey: 'tibetan'  as ContentKey, icon: '❋', color: 'var(--clay)',      nameKey: 'tTibetanName'    as const, taglineKey: 'tTibetanTagline'    as const },
  { id: 'swarga',         contentKey: 'swarga'   as ContentKey, icon: '✦', color: 'var(--gold)',      nameKey: 'tSwargaName'     as const, taglineKey: 'tSwargaTagline'     as const },
]

type MetaKey = 'tEvidenceName' | 'tRambamName' | 'tHippocratesName' | 'tAvicennaName' | 'tAyurvedaName' | 'tDaoistName' | 'tTibetanName' | 'tSwargaName' | 'tEvidenceTagline' | 'tRambamTagline' | 'tHippocratesTagline' | 'tAvicennaTagline' | 'tAyurvedaTagline' | 'tDaoistTagline' | 'tTibetanTagline' | 'tSwargaTagline'

export default async function MethodologiesPage() {
  const { strings, locale } = await getServerStrings()
  const m = strings.methodologies
  const bodies = getMethodologiesBodies(locale)

  const TRADITIONS = TRADITIONS_META.map(t => {
    const content = bodies[t.contentKey]
    const eraOrigin = TRADITION_ERA_ORIGIN[t.id]?.[locale] ?? TRADITION_ERA_ORIGIN[t.id]?.['en'] ?? { era: '', origin: '' }
    return {
      ...t,
      name:    m[t.nameKey as MetaKey],
      tagline: m[t.taglineKey as MetaKey],
      body:    content.body,
      pillars: content.pillars,
      era:     eraOrigin.era,
      origin:  eraOrigin.origin,
    }
  })

  // Serialise only what SectionNav needs (client boundary — no functions/symbols)
  const navSections = TRADITIONS.map(t => ({ id: t.id, label: t.name, color: t.color, icon: t.icon }))

  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* Floating dot nav — desktop only, tracks active section */}
      <SectionNav sections={navSections} />

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position:   'absolute',
          inset:      0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(107,111,168,.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 20 }}>
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
              background:     'var(--sage-deep)',
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