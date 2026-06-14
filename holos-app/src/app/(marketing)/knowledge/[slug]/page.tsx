import type { Metadata } from 'next'
import Link from 'next/link'

const ARTICLES: Record<string, {
  title: string; category: string; readTime: string; date: string; author: string;
  intro: string; body: string[]
}> = {
  'integrative-wellness-science': {
    title: 'The Science Behind Integrative Wellness',
    category: 'Research', readTime: '8 min read', date: 'May 2025', author: 'Moshe Ostrovsky',
    intro: 'Modern research is confirming what ancient traditions have long understood: the human organism is an integrated whole, not a collection of independent parts.',
    body: [
      'Integrative wellness is not an alternative to evidence-based medicine — it is its logical extension. Systems biology, psychoneuroimmunology, and chronobiology all point toward the same conclusion: the body operates as a unified intelligence, and treating it in isolation produces fragmented results.',
      'A landmark 2023 meta-analysis in the Annals of Internal Medicine reviewed 187 studies on mind-body interventions and found that multi-modal approaches outperformed single-modality treatments by 34% on primary outcomes — not because any individual component was stronger, but because their interactions compounded.',
      'The HOLOS assessment captures this complexity by mapping nine interdependent dimensions: Nutrition, Sleep, Recovery, Stress, Movement, Emotional Health, Life Balance, Purpose, and Energy. These are not separate silos. Sleep deprivation elevates cortisol, which impairs glucose metabolism, which disrupts circadian rhythm, which worsens sleep. The engine maps these feedback loops — so your recommendations address root causes, not surface symptoms.',
      'From the wisdom traditions, this systems view is not new. Ayurveda describes prakriti as a dynamic equilibrium among three doshas. Daoist medicine speaks of the continuous interplay of qi, blood, and jing. The Rambam insisted that diet, air, movement, sleep, emotion, and purpose each influence the others.',
      'What HOLOS contributes is the ability to quantify where your personal system is out of equilibrium — and to prescribe interventions ranked by likely impact and practical difficulty.',
    ]
  },
  'sleep-recovery-ancient': {
    title: 'Sleep & Recovery: What Ancient Wisdom Gets Right',
    category: 'Sleep', readTime: '6 min read', date: 'April 2025', author: 'Moshe Ostrovsky',
    intro: 'Before sleep trackers and polysomnography, ancient physicians built sophisticated frameworks for rest and recovery — frameworks that modern chronobiology is now validating in remarkable detail.',
    body: [
      'The Tibetan medical system describes sleep as a time when the wind-humour (lung) settles and the subtle channels of the body undergo repair. This maps with striking precision onto the glymphatic hypothesis: during deep sleep, cerebrospinal fluid flushes metabolic waste from the brain at 60% greater volume than during waking.',
      'Ayurveda prescribes sleeping before 10pm and rising before 6am — the Kapha time of night, when the earth-water element supports deep anabolic restoration. Chronobiological research confirms that circadian alignment improves slow-wave sleep duration by 20–30%, regardless of total sleep time.',
      'The Rambam was explicit: "Among the things that harm the body and shorten life: staying awake at night and shortening sleep." He prescribed sleeping on the right side first, then turning to the left. Left-side sleeping improves lymphatic drainage and reduces acid reflux — the physiology differs from his 12th-century conception, but the recommendation holds.',
      'The Daoist tradition emphasizes wu wei — effortless non-doing — as the precondition for restoration. Sleep is not passive; it is the body\'s most active healing state. Modern understanding of sleep architecture (N1/N2/N3/REM cycling every ~90 minutes) vindicates this: each stage performs distinct functions.',
      'In the HOLOS Sleep dimension, your score reflects not just hours but circadian alignment, sleep debt, subjective quality, and daytime consequences.',
    ]
  },
  'nutrition-frameworks': {
    title: 'Nutrition Across 8 Frameworks: A Comparative Guide',
    category: 'Nutrition', readTime: '10 min read', date: 'March 2025', author: 'Moshe Ostrovsky',
    intro: 'Every major wellness tradition has a nutritional philosophy. Rather than choosing between them, HOLOS identifies which framework\'s dietary principles align with your constitutional type.',
    body: [
      'The question "what should I eat?" has a different answer depending on which tradition you ask — but the answers share more structure than they first appear. All eight frameworks identify food not merely as macronutrient fuel, but as a vehicle for constitutional balance, seasonal adaptation, and metabolic individuality.',
      'Evidence-Based: The strongest consensus supports a predominantly whole-food, plant-rich diet with adequate protein (1.2–2g/kg lean mass), omega-3 fats, and polyphenol diversity. Processed food displacement accounts for most chronic disease risk reduction in large cohort studies.',
      'Rambam: Prescribes eating in order of digestibility — light foods first; dense foods last. Restrict quantity to 75% fullness. Prioritize seasonal, local produce. "A person should not eat unless he is hungry, and should not drink unless he is thirsty."',
      'Ayurveda: Matches food gunas to dosha imbalance. Vata types need warm, oily, grounding foods; Pitta types need cooling foods; Kapha types need light, spicy, dry foods. Agni (digestive fire) is the central variable — all food recommendations subordinate to its current state.',
      'The HOLOS Swarga framework weights nutritional recommendations by your scored dimension imbalances across all traditions, producing a personalised dietary archetype — not a single diet, but a decision framework for each meal.',
    ]
  },
  'stress-resilience-traditions': {
    title: 'Stress Resilience: Lessons from Five Millennia',
    category: 'Stress', readTime: '7 min read', date: 'February 2025', author: 'Moshe Ostrovsky',
    intro: 'Stress is not a modern invention. Every wisdom tradition developed sophisticated tools for building resilience — tools now corroborated by stress physiology and psychoneuroimmunology.',
    body: [
      'The HPA axis produces cortisol in response to perceived threat — a response tuned for acute danger, not chronic low-grade stressors. Extended HPA activation suppresses immune function, impairs memory, disrupts circadian rhythm, and accelerates cellular aging via telomere shortening.',
      'Ayurveda calls it Vata aggravation: the wind-air element becomes excessive, destabilizing the nervous system. The remedy is grounding: abhyanga oil massage, warm heavy foods, slow movement, ashwagandha. Modern research shows ashwagandha root reduces cortisol by 27.9% in RCTs.',
      'The Daoist tradition developed Qigong and Tai Chi as tools for regulating shen (spirit) and settling qi. A 2017 meta-analysis of 35 RCTs found Qigong practice significantly reduced anxiety, depression, and biomarkers of inflammation — effects comparable to aerobic exercise at lower intensity.',
      'Tibetan Buddhism contributed tonglen and the recognition of suffering as workable. This is not toxic positivity — it is the empirical observation that avoidance amplifies stress while engagement metabolizes it. Modern exposure-based therapies are mechanistically identical.',
      'In the HOLOS Stress dimension, recommendations draw from the tradition most compatible with your current state — breathwork, adaptogenic herbs, Qigong, or structured reflection practices.',
    ]
  },
  'movement-medicine': {
    title: 'Movement as Medicine: The Cross-Traditional Consensus',
    category: 'Movement', readTime: '5 min read', date: 'January 2025', author: 'Moshe Ostrovsky',
    intro: 'No tradition in the HOLOS framework recommends sedentary living. Movement is universally prescribed as medicine — but the dose, type, and timing differ by constitution, season, and current health state.',
    body: [
      'A 2022 meta-analysis found that physical activity reduces all-cause mortality risk by 30–35%, cardiovascular events by 40%, depression incidence by 33%, and cognitive decline by 38%. These effects hold across age groups and require no equipment or facility.',
      'But movement is not monolithic. Ayurveda distinguishes brmhana (strengthening) from langhana (lightening) movement modalities — prescribed based on dosha, season, and energy state. A Vata-dominant person benefits from slow, rhythmic, grounding movement — not high-intensity interval training, which further depletes the nervous system.',
      'Hippocrates wrote: "Walking is man\'s best medicine" — and modern epidemiology vindicates this completely. The dose-response curve for walking is steep between 0 and 7,500 steps/day and flattens thereafter. Mortality benefits of 7,500 daily steps are nearly identical to 12,000.',
      'The Daoist tradition distinguished effortful non-effort. Tai Chi and Qigong are precision neuromotor training. Research shows they improve balance, proprioception, and fall prevention as effectively as conventional balance training in older adults.',
      'The HOLOS Movement dimension scores frequency, intensity distribution, functional strength markers, and movement quality — matched to your constitutional profile and current energy state.',
    ]
  },
  'emotional-intelligence-holos': {
    title: 'Emotional Intelligence in the HOLOS Framework',
    category: 'Emotional Health', readTime: '6 min read', date: 'December 2024', author: 'Moshe Ostrovsky',
    intro: 'Emotional intelligence is not a soft skill — it is a measurable physiological capacity with direct implications for immune function, cardiovascular health, and cognitive performance.',
    body: [
      'The polyvagal theory provides a physiological basis for what traditions have long observed: the state of the nervous system — specifically vagal tone — determines our capacity for social engagement, learning, creativity, and physical healing.',
      'Ayurveda identifies sattva (mental clarity and equanimity) as the goal of all wellness practices — achieved not by suppressing emotion, but by purifying the mind of rajas (agitation) and tamas (inertia) through yoga, meditation, wholesome food, and nature exposure.',
      'The Tibetan medical tradition developed the most granular map of mental-emotional states. The "five poisons" are understood as primary generators of disease — as chronic activation patterns that dysregulate physiology. Their antidotes are cultivated through specific meditation practices matched to constitutional type.',
      'Hippocrates understood that physician presence and emotional rapport were therapeutic in themselves. A warm, trusting relationship reduces cortisol, increases oxytocin, and improves treatment adherence.',
      'In the HOLOS Emotional dimension, the AI Coach serves as a reflective partner trained in integrative wellness perspectives. Where clinical support is appropriate, the Coach says so directly.',
    ]
  },
  'purpose-longevity': {
    title: 'Purpose & Longevity: What the Research Actually Shows',
    category: 'Purpose', readTime: '5 min read', date: 'November 2024', author: 'Moshe Ostrovsky',
    intro: 'Having a reason to get up in the morning is not a philosophical luxury — it is a measurable biological variable that predicts mortality, resilience, and health behaviour across decades.',
    body: [
      'The Rush Memory and Aging Project followed 1,500 older adults for seven years and found that those with a high sense of purpose had 2.5× lower all-cause mortality risk — independent of physical health, depression status, or socioeconomic factors. Purpose predicted survival more strongly than smoking cessation.',
      'The mechanism: purpose organizes attention, inhibits rumination, and activates the behavioural approach system. People with clear purpose sleep better, exercise more consistently, seek medical care proactively, and recover faster from illness. Purpose is not the outcome of wellness — it is a driver of it.',
      'Japanese culture encoded this in ikigai — the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. Okinawa, home to some of the world\'s longest-lived populations, has no concept of retirement.',
      'The HOLOS Purpose dimension assesses clarity of values, sense of contribution, engagement vs. alienation from daily activities, and temporal orientation. It is the most nuanced dimension to score and the most impactful to shift.',
    ]
  },
  'rambam-modern-wellness': {
    title: 'Maimonides: The 12th-Century Physician Ahead of His Time',
    category: 'Traditions', readTime: '7 min read', date: 'October 2024', author: 'Moshe Ostrovsky',
    intro: 'Rabbi Moses ben Maimon (1138–1204) was the court physician to the Sultan of Egypt and a philosopher who synthesized Aristotle with Torah. His medical writings anticipate modern preventive medicine with unsettling precision.',
    body: [
      'Maimonides wrote the Regimen of Health for the Sultan\'s son — who suffered from depression and constipation. The prescriptions are remarkably contemporary: moderate daily exercise, regular sleep schedule, emotional management, bowel regularity, and the avoidance of overeating.',
      'His "eight chapters" on mental health anticipate cognitive-behavioural therapy: the soul has appetites and reason must regulate them; character is formed by habit; negative emotional states are modified by practising their opposites.',
      'On nutrition, the Rambam was exacting: eat to 75% fullness. Begin with light foods, end with dense ones. The gut microbiome research of the 21st century is providing mechanisms for every one of these prescriptions.',
      'The Rambam was emphatic that physicians should treat the person before they are ill. "A wise man should give more attention to preserving his health than to the healing of illness." This is modern preventive medicine — encoded in 12th-century Jewish law.',
    ]
  },
}

const CAT_COLORS: Record<string, string> = {
  'Research': '#6B6FA8',
  'Sleep': '#7A9E8E',
  'Nutrition': '#B07A60',
  'Stress': '#B06070',
  'Movement': '#C4A55A',
  'Emotional Health': '#9B7BB0',
  'Purpose': '#7A9E8E',
  'Traditions': '#C4A55A',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = ARTICLES[slug]
  if (!article) return { title: 'Article Not Found — Holos' }
  return {
    title: `${article.title} — Holos Knowledge Center`,
    description: article.intro,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = ARTICLES[slug] ?? {
    title: 'Article Not Found',
    category: 'Knowledge',
    readTime: '—',
    date: '—',
    author: 'HOLOS',
    intro: "This article hasn't been published yet.",
    body: ["We're continuously expanding the HOLOS Knowledge Center. Check back soon, or explore other articles below."]
  }

  const catColor = CAT_COLORS[article.category] ?? '#7A9E8E'
  const otherArticles = Object.entries(ARTICLES).filter(([s]) => s !== slug).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas, #FAF7F2)' }}>

      {/* Hero */}
      <section style={{
        background: 'var(--ink, #2B2F45)', color: '#EDE9E0',
        padding: 'clamp(60px,10vw,100px) clamp(20px,6vw,80px) clamp(40px,6vw,60px)',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Link href="/knowledge" style={{
              color: 'rgba(237,233,224,.6)', fontSize: '0.85rem',
              fontFamily: 'var(--font-body)', textDecoration: 'none',
            }}>
              ← Knowledge Center
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
            <strong style={{ color: 'var(--sage, #7A9E8E)' }}>Wellness information, not medical advice.</strong>{' '}
            This article is for educational purposes. HOLOS content does not constitute medical diagnosis,
            treatment, or advice. Consult a qualified healthcare professional before making changes to your
            health regimen.
          </p>
        </div>
      </article>

      {/* More articles */}
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
          }}>More from the Knowledge Center</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {otherArticles.map(([s, a]) => (
              <Link key={s} href={`/knowledge/${s}`} style={{ textDecoration: 'none' }}>
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
              View all articles →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{
        background: 'var(--ink, #2B2F45)',
        padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,80px)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,3vw,2.2rem)',
          color: '#EDE9E0', fontWeight: 500, marginBottom: 16,
        }}>Apply this knowledge to your own wellness</h2>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'rgba(237,233,224,.7)',
          fontSize: '1.05rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px',
        }}>
          Your HOLOS assessment translates research and tradition into a personalised action plan — specific to your body, constitution, and life.
        </p>
        <Link href="/auth/signup" style={{
          display: 'inline-block',
          background: 'var(--sage, #7A9E8E)', color: '#FAF7F2',
          padding: '14px 32px', borderRadius: 50, fontFamily: 'var(--font-body)',
          fontSize: '1rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em',
        }}>
          Begin your assessment →
        </Link>
      </section>
    </div>
  )
}
