import type { Metadata } from 'next'
import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'
import { SLUG_META } from '@/lib/i18n/knowledge-articles'
import type { Locale } from '@/lib/i18n/knowledge-articles'

// Article body text remains in English (long-form professional translation pending).
// Title, category, intro, date, and readTime are fully localised via SLUG_META.
const ARTICLES: Record<string, {
  author: string; body: string[]
}> = {
  'integrative-wellness-science': {
    author: 'Moshe Ostrovsky',
    body: [
      'Integrative wellness is not an alternative to evidence-based medicine — it is its logical extension. Systems biology, psychoneuroimmunology, and chronobiology all point toward the same conclusion: the body operates as a unified intelligence, and treating it in isolation produces fragmented results.',
      'A landmark 2023 meta-analysis in the Annals of Internal Medicine reviewed 187 studies on mind-body interventions and found that multi-modal approaches outperformed single-modality treatments by 34% on primary outcomes — not because any individual component was stronger, but because their interactions compounded.',
      'The HOLOS assessment captures this complexity by mapping nine interdependent dimensions: Nutrition, Sleep, Recovery, Stress, Movement, Emotional Health, Life Balance, Purpose, and Energy. These are not separate silos. Sleep deprivation elevates cortisol, which impairs glucose metabolism, which disrupts circadian rhythm, which worsens sleep. The engine maps these feedback loops — so your recommendations address root causes, not surface symptoms.',
      'From the wisdom traditions, this systems view is not new. Ayurveda describes prakriti as a dynamic equilibrium among three doshas. Daoist medicine speaks of the continuous interplay of qi, blood, and jing. The Rambam insisted that diet, air, movement, sleep, emotion, and purpose each influence the others.',
      'What HOLOS contributes is the ability to quantify where your personal system is out of equilibrium — and to prescribe interventions ranked by likely impact and practical difficulty.',
    ]
  },
  'sleep-recovery-ancient': {
    author: 'Moshe Ostrovsky',
    body: [
      'The Tibetan medical system describes sleep as a time when the wind-humour (lung) settles and the subtle channels of the body undergo repair. This maps with striking precision onto the glymphatic hypothesis: during deep sleep, cerebrospinal fluid flushes metabolic waste from the brain at 60% greater volume than during waking.',
      'Ayurveda prescribes sleeping before 10pm and rising before 6am — the Kapha time of night, when the earth-water element supports deep anabolic restoration. Chronobiological research confirms that circadian alignment improves slow-wave sleep duration by 20–30%, regardless of total sleep time.',
      'The Rambam was explicit: "Among the things that harm the body and shorten life: staying awake at night and shortening sleep." He prescribed sleeping on the right side first, then turning to the left. Left-side sleeping improves lymphatic drainage and reduces acid reflux — the physiology differs from his 12th-century conception, but the recommendation holds.',
      'The Daoist tradition emphasizes wu wei — effortless non-doing — as the precondition for restoration. Sleep is not passive; it is the body\'s most active healing state. Modern understanding of sleep architecture (N1/N2/N3/REM cycling every ~90 minutes) vindicates this: each stage performs distinct functions.',
      'In the HOLOS Sleep dimension, your score reflects not just hours but circadian alignment, sleep debt, subjective quality, and daytime consequences.',
    ]
  },
  'nutrition-frameworks': {
    author: 'Moshe Ostrovsky',
    body: [
      'The question "what should I eat?" has a different answer depending on which tradition you ask — but the answers share more structure than they first appear. All eight frameworks identify food not merely as macronutrient fuel, but as a vehicle for constitutional balance, seasonal adaptation, and metabolic individuality.',
      'Evidence-Based: The strongest consensus supports a predominantly whole-food, plant-rich diet with adequate protein (1.2–2g/kg lean mass), omega-3 fats, and polyphenol diversity. Processed food displacement accounts for most chronic disease risk reduction in large cohort studies.',
      'Rambam: Prescribes eating in order of digestibility — light foods first; dense foods last. Restrict quantity to 75% fullness. Prioritize seasonal, local produce. "A person should not eat unless he is hungry, and should not drink unless he is thirsty."',
      'Ayurveda: Matches food gunas to dosha imbalance. Vata types need warm, oily, grounding foods; Pitta types need cooling foods; Kapha types need light, spicy, dry foods. Agni (digestive fire) is the central variable — all food recommendations subordinate to its current state.',
      'The HOLOS Swarga framework weights nutritional recommendations by your scored dimension imbalances across all traditions, producing a personalised dietary archetype — not a single diet, but a decision framework for each meal.',
    ]
  },
  'stress-resilience-traditions': {
    author: 'Moshe Ostrovsky',
    body: [
      'The HPA axis produces cortisol in response to perceived threat — a response tuned for acute danger, not chronic low-grade stressors. Extended HPA activation suppresses immune function, impairs memory, disrupts circadian rhythm, and accelerates cellular aging via telomere shortening.',
      'Ayurveda calls it Vata aggravation: the wind-air element becomes excessive, destabilizing the nervous system. The remedy is grounding: abhyanga oil massage, warm heavy foods, slow movement, ashwagandha. Modern research shows ashwagandha root reduces cortisol by 27.9% in RCTs.',
      'The Daoist tradition developed Qigong and Tai Chi as tools for regulating shen (spirit) and settling qi. A 2017 meta-analysis of 35 RCTs found Qigong practice significantly reduced anxiety, depression, and biomarkers of inflammation — effects comparable to aerobic exercise at lower intensity.',
      'Tibetan Buddhism contributed tonglen and the recognition of suffering as workable. This is not toxic positivity — it is the empirical observation that avoidance amplifies stress while engagement metabolizes it. Modern exposure-based therapies are mechanistically identical.',
      'In the HOLOS Stress dimension, recommendations draw from the tradition most compatible with your current state — breathwork, adaptogenic herbs, Qigong, or structured reflection practices.',
    ]
  },
  'movement-medicine': {
    author: 'Moshe Ostrovsky',
    body: [
      'A 2022 meta-analysis found that physical activity reduces all-cause mortality risk by 30–35%, cardiovascular events by 40%, depression incidence by 33%, and cognitive decline by 38%. These effects hold across age groups and require no equipment or facility.',
      'But movement is not monolithic. Ayurveda distinguishes brmhana (strengthening) from langhana (lightening) movement modalities — prescribed based on dosha, season, and energy state. A Vata-dominant person benefits from slow, rhythmic, grounding movement — not high-intensity interval training, which further depletes the nervous system.',
      'Hippocrates wrote: "Walking is man\'s best medicine" — and modern epidemiology vindicates this completely. The dose-response curve for walking is steep between 0 and 7,500 steps/day and flattens thereafter. Mortality benefits of 7,500 daily steps are nearly identical to 12,000.',
      'The Daoist tradition distinguished effortful non-effort. Tai Chi and Qigong are precision neuromotor training. Research shows they improve balance, proprioception, and fall prevention as effectively as conventional balance training in older adults.',
      'The HOLOS Movement dimension scores frequency, intensity distribution, functional strength markers, and movement quality — matched to your constitutional profile and current energy state.',
    ]
  },
  'emotional-intelligence-holos': {
    author: 'Moshe Ostrovsky',
    body: [
      'The polyvagal theory provides a physiological basis for what traditions have long observed: the state of the nervous system — specifically vagal tone — determines our capacity for social engagement, learning, creativity, and physical healing.',
      'Ayurveda identifies sattva (mental clarity and equanimity) as the goal of all wellness practices — achieved not by suppressing emotion, but by purifying the mind of rajas (agitation) and tamas (inertia) through yoga, meditation, wholesome food, and nature exposure.',
      'The Tibetan medical tradition developed the most granular map of mental-emotional states. The "five poisons" are understood as primary generators of disease — as chronic activation patterns that dysregulate physiology. Their antidotes are cultivated through specific meditation practices matched to constitutional type.',
      'Hippocrates understood that physician presence and emotional rapport were therapeutic in themselves. A warm, trusting relationship reduces cortisol, increases oxytocin, and improves treatment adherence.',
      'In the HOLOS Emotional dimension, the AI Coach serves as a reflective partner trained in integrative wellness perspectives. Where clinical support is appropriate, the Coach says so directly.',
    ]
  },
  'purpose-longevity': {
    author: 'Moshe Ostrovsky',
    body: [
      'The Rush Memory and Aging Project followed 1,500 older adults for seven years and found that those with a high sense of purpose had 2.5× lower all-cause mortality risk — independent of physical health, depression status, or socioeconomic factors. Purpose predicted survival more strongly than smoking cessation.',
      'The mechanism: purpose organizes attention, inhibits rumination, and activates the behavioural approach system. People with clear purpose sleep better, exercise more consistently, seek medical care proactively, and recover faster from illness. Purpose is not the outcome of wellness — it is a driver of it.',
      'Japanese culture encoded this in ikigai — the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. Okinawa, home to some of the world\'s longest-lived populations, has no concept of retirement.',
      'The HOLOS Purpose dimension assesses clarity of values, sense of contribution, engagement vs. alienation from daily activities, and temporal orientation. It is the most nuanced dimension to score and the most impactful to shift.',
    ]
  },
  'rambam-modern-wellness': {
    author: 'Moshe Ostrovsky',
    body: [
      'Maimonides wrote the Regimen of Health for the Sultan\'s son — who suffered from depression and constipation. The prescriptions are remarkably contemporary: moderate daily exercise, regular sleep schedule, emotional management, bowel regularity, and the avoidance of overeating.',
      'His "eight chapters" on mental health anticipate cognitive-behavioural therapy: the soul has appetites and reason must regulate them; character is formed by habit; negative emotional states are modified by practising their opposites.',
      'On nutrition, the Rambam was exacting: eat to 75% fullness. Begin with light foods, end with dense ones. The gut microbiome research of the 21st century is providing mechanisms for every one of these prescriptions.',
      'The Rambam was emphatic that physicians should treat the person before they are ill. "A wise man should give more attention to preserving his health than to the healing of illness." This is modern preventive medicine — encoded in 12th-century Jewish law.',
    ]
  },
}

const CAT_COLORS: Record<string, string> = {
  'Research':         '#6B6FA8',
  'Исследования':     '#6B6FA8',
  'מחקר':            '#6B6FA8',
  'Forschung':        '#6B6FA8',
  'Sleep':            '#7A9E8E',
  'Сон':              '#7A9E8E',
  'שינה':            '#7A9E8E',
  'Schlaf':           '#7A9E8E',
  'Nutrition':        '#B07A60',
  'Питание':          '#B07A60',
  'תזונה':           '#B07A60',
  'Ernährung':        '#B07A60',
  'Stress':           '#B06070',
  'Стресс':           '#B06070',
  'לחץ':             '#B06070',
  'Movement':         '#C4A55A',
  'Движение':         '#C4A55A',
  'תנועה':           '#C4A55A',
  'Bewegung':         '#C4A55A',
  'Emotional Health': '#9B7BB0',
  'Эмоциональное здоровье': '#9B7BB0',
  'בריאות רגשית':   '#9B7BB0',
  'Emotionale Gesundheit': '#9B7BB0',
  'Purpose':          '#7A9E8E',
  'Цель':             '#7A9E8E',
  'מטרה':            '#7A9E8E',
  'Zweck':            '#7A9E8E',
  'Traditions':       '#C4A55A',
  'Традиции':         '#C4A55A',
  'מסורות':          '#C4A55A',
  'Traditionen':      '#C4A55A',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { locale } = await getServerStrings()
  const meta = (SLUG_META[locale as Locale] ?? SLUG_META.en)[slug] ?? SLUG_META.en[slug]
  if (!meta) return { title: 'Article Not Found — Holos' }
  return {
    title: `${meta.title} — Holos Knowledge Center`,
    description: meta.intro,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, { strings, locale }] = await Promise.all([params, getServerStrings()])
  const k = strings.knowledge

  const localeKey = locale as Locale
  const localeMeta = SLUG_META[localeKey] ?? SLUG_META.en
  const meta = localeMeta[slug] ?? SLUG_META.en[slug]
  const body = ARTICLES[slug]

  const article = meta && body ? {
    title:    meta.title,
    category: meta.category,
    intro:    meta.intro,
    date:     meta.date,
    readTime: meta.readTime,
    author:   body.author,
    body:     body.body,
  } : {
    title:    k.articleNotFound,
    category: 'Knowledge',
    readTime: '—',
    date:     '—',
    author:   'HOLOS',
    intro:    k.articleNotFoundBody,
    body:     [k.articleNotFoundMore],
  }

  const catColor = CAT_COLORS[article.category] ?? '#7A9E8E'

  // Other articles — show localized titles from SLUG_META
  const otherArticles = Object.keys(ARTICLES)
    .filter(s => s !== slug)
    .slice(0, 3)
    .map(s => ({
      slug: s,
      ...(localeMeta[s] ?? SLUG_META.en[s]),
    }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas, #FAF7F2)' }}>

      {/* Hero — uses ink-stable so it stays dark in both light and dark mode */}
      <section style={{
        background: 'var(--ink-stable, #2B2F45)', color: '#EDE9E0',
        padding: 'clamp(60px,10vw,100px) clamp(20px,6vw,80px) clamp(40px,6vw,60px)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link href="/knowledge" style={{
              color: 'rgba(237,233,224,.6)', fontSize: '0.85rem',
              fontFamily: 'var(--font-body)', textDecoration: 'none',
            }}>
              {k.articleBack}
            </Link>
            <span style={{ color: 'rgba(237,233,224,.3)' }}>·</span>
            <span style={{
              background: catColor, color: '#FAF7F2',
              fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-body)',
              padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em',
            }}>{article.category}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)',
            fontWeight: 500, lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em',
          }}>{article.title}</h1>

          <p style={{
            fontSize: 'clamp(1rem,1.5vw,1.15rem)', lineHeight: 1.6, opacity: 0.8,
            fontFamily: 'var(--font-body)', marginBottom: 28,
          }}>{article.intro}</p>

          <div style={{
            display: 'flex', gap: 20, flexWrap: 'wrap',
            fontSize: '0.85rem', opacity: 0.6, fontFamily: 'var(--font-mono)',
          }}>
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article style={{
        maxWidth: 760, margin: '0 auto',
        padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
      }}>
        {article.body.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem,1.2vw,1.05rem)',
            lineHeight: 1.75,
            color: 'var(--ink, #2B2F45)',
            marginBottom: 24,
          }}>{paragraph}</p>
        ))}

        {/* Medical disclaimer */}
        <div style={{
          background: 'rgba(122,158,142,.08)',
          border: '1px solid rgba(122,158,142,.25)',
          borderRadius: 12, padding: '20px 24px', marginTop: 48,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'var(--ink-soft, #5A5F78)', lineHeight: 1.6, margin: 0,
          }}>
            <strong style={{ color: 'var(--sage, #7A9E8E)' }}>{k.articleDisclaimer}</strong>{' '}
            {k.articleDisclaimerBody}
          </p>
        </div>
      </article>

      {/* More articles — localized titles */}
      {otherArticles.length > 0 && (
        <section style={{
          borderTop: '1px solid var(--line, #DDD8CC)',
          padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
          maxWidth: 1100, margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
            fontWeight: 500, color: 'var(--ink, #2B2F45)',
            marginBottom: 32, letterSpacing: '-0.02em',
          }}>{k.articleMore}</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {otherArticles.map(a => (
              <Link key={a.slug} href={`/knowledge/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface, #FFFFFF)',
                  border: '1px solid var(--line, #DDD8CC)',
                  borderRadius: 16, padding: 24,
                }}>
                  <span style={{
                    background: CAT_COLORS[a.category] ?? '#7A9E8E',
                    color: '#FAF7F2', fontSize: '0.7rem', fontWeight: 600,
                    fontFamily: 'var(--font-body)', padding: '2px 8px',
                    borderRadius: 20, letterSpacing: '0.04em',
                  }}>{a.category}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
                    fontWeight: 500, color: 'var(--ink, #2B2F45)',
                    marginTop: 12, marginBottom: 8, lineHeight: 1.3,
                  }}>{a.title}</h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--ink-soft, #5A5F78)', lineHeight: 1.5, margin: 0,
                  }}>{a.intro.slice(0, 100)}…</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/knowledge" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              color: 'var(--sage, #7A9E8E)', textDecoration: 'none', fontWeight: 500,
            }}>
              {k.articleViewAll}
            </Link>
          </div>
        </section>
      )}

      {/* CTA — uses ink-stable so it stays dark in both light and dark mode */}
      <section style={{
        background: 'var(--ink-stable, #2B2F45)',
        padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,3vw,2.2rem)',
          color: '#EDE9E0', fontWeight: 500, marginBottom: 16,
        }}>{k.articleCtaTitle}</h2>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'rgba(237,233,224,.7)',
          fontSize: '1.05rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px',
        }}>
          {k.articleCtaBody}
        </p>
        <Link href="/auth/signup" style={{
          display: 'inline-block',
          background: 'var(--sage, #7A9E8E)', color: '#FAF7F2',
          padding: '14px 32px', borderRadius: 50, fontFamily: 'var(--font-body)',
          fontSize: '1rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em',
        }}>
          {k.articleCtaCta}
        </Link>
      </section>
    </div>
  )
}
