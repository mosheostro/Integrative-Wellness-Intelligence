import Link from 'next/link'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'Knowledge Center — Holos Integrative Wellness Intelligence',
  description: 'Articles, guides, and deep dives on integrative wellness, the nine dimensions, and the eight wisdom traditions.',
}

// Article titles, excerpts, and categories are editorial English content — not translated.
// This mirrors the same architectural decision as methodologies bodies and science pillar bodies.
const FEATURED = {
  id:       'what-is-integrative-wellness',
  category: 'Foundation',
  title:    'What Is Integrative Wellness — And Why Does It Require Eight Traditions?',
  excerpt:  'The limits of single-metric health tracking, and why every major civilisation developed a complete medical philosophy that modern science is only now beginning to validate.',
  readTime: '8 min read',
  date:     'June 2025',
  color:    'var(--sage)',
}

const ARTICLES = [
  { id: 'nine-dimensions', category: 'Assessment', title: 'The Nine Dimensions: Why Scoring Sleep Without Stress Is Misleading', excerpt: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model.', readTime: '6 min', date: 'May 2025', color: 'var(--indigo)' },
  { id: 'doshas-explained', category: 'Ayurveda', title: 'Vata, Pitta, Kapha: The Definitive Modern Explanation', excerpt: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', readTime: '10 min', date: 'May 2025', color: 'var(--sage-deep)' },
  { id: 'rambam-preventive', category: 'Rambam', title: 'Maimonides\'s Regimen of Health: The 12th-Century Wellness Protocol', excerpt: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says.', readTime: '7 min', date: 'April 2025', color: 'var(--clay)' },
  { id: 'qi-cultivation', category: 'Daoist Medicine', title: 'Qi Cultivation for Sceptics: The Evidence-Based Case for Energy Medicine', excerpt: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years.', readTime: '9 min', date: 'April 2025', color: 'var(--indigo)' },
  { id: 'sleep-traditions', category: 'Sleep', title: 'How Every Tradition Thinks About Sleep — And What They All Agree On', excerpt: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep.', readTime: '5 min', date: 'March 2025', color: 'var(--gold)' },
  { id: 'stress-dimension', category: 'Stress', title: 'Allostatic Load: The Hidden Dimension Beneath All Chronic Disease', excerpt: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently.', readTime: '8 min', date: 'March 2025', color: 'var(--rose)' },
  { id: 'avicenna-canon', category: 'Avicenna', title: 'The Six Essential Principles of Health, According to Avicenna', excerpt: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six.', readTime: '6 min', date: 'February 2025', color: 'var(--gold)' },
  { id: 'tibetan-three-humours', category: 'Tibetan Medicine', title: 'Lung, Tripa, Beken: Tibet\'s Three Humours and the Psychology of Illness', excerpt: 'How Tibetan medicine\'s three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.', readTime: '7 min', date: 'February 2025', color: 'var(--clay)' },
]

const CATEGORIES = ['All', 'Foundation', 'Assessment', 'Ayurveda', 'Daoist Medicine', 'Rambam', 'Tibetan Medicine', 'Avicenna', 'Sleep', 'Stress', 'Nutrition', 'Movement']

export default async function KnowledgePage() {
  const { strings } = await getServerStrings()
  const k = strings.knowledge

  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* Hero */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 20 }}>
            ◈ {k.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            {k.heroTitle}{' '}
            <em style={{ color: 'var(--sage-deep)' }}>{k.heroTitleEm}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
            {k.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Category filters (decorative) */}
      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((c, i) => (
            <button key={c}
              style={{
                padding:      '6px 16px',
                borderRadius: 100,
                border:       '1px solid var(--line)',
                background:   i === 0 ? 'var(--sage-deep)' : 'var(--surface)',
                color:        i === 0 ? '#fff' : 'var(--ink-soft)',
                fontFamily:   'var(--font-body)',
                fontSize:     '.8rem',
                cursor:       'pointer',
              }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link href={`/knowledge/${FEATURED.id}`}
            style={{
              display:      'block',
              background:   'var(--ink)',
              borderRadius: 'var(--radius-lg)',
              padding:      'clamp(32px, 5vw, 64px)',
              textDecoration: 'none',
              position:     'relative',
              overflow:     'hidden',
            }}>
            <div aria-hidden style={{
              position:   'absolute',
              inset:      0,
              background: 'radial-gradient(ellipse 50% 80% at 90% 50%, rgba(122,158,142,.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}/>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--sage-deep)' }}>{k.featuredLabel}</span>
                <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,.2)' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.4)' }}>{FEATURED.category}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 500, letterSpacing: '-.02em', color: '#fff', lineHeight: 1.2, margin: '0 0 16px' }}>
                {FEATURED.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.65, margin: '0 0 24px' }}>
                {FEATURED.excerpt}
              </p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.4)' }}>{FEATURED.date}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.4)' }}>{FEATURED.readTime}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{k.readArticle}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {ARTICLES.map(a => (
            <Link key={a.id} href={`/knowledge/${a.id}`}
              style={{
                display:        'block',
                background:     'var(--surface)',
                border:         '1px solid var(--line)',
                borderTop:      `3px solid ${a.color}`,
                borderRadius:   'var(--radius-lg)',
                padding:        '28px 24px',
                textDecoration: 'none',
              }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: a.color, marginBottom: 12 }}>{a.category}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35, margin: '0 0 10px' }}>{a.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)', lineHeight: 1.6, margin: '0 0 16px' }}>{a.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--ink-faint)' }}>{a.date} · {a.readTime}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{k.read}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: 'var(--canvas2)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 12px' }}>
            {k.newsletterTitle}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', color: 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.65 }}>
            {k.newsletterBody}
          </p>
          <NewsletterForm submitLabel={k.newsletterSubmit} placeholder={k.newsletterPlaceholder} />
        </div>
      </section>
    </div>
  )
}
