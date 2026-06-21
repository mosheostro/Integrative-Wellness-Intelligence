import Link from 'next/link'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { KnowledgeFilterGrid } from '@/components/ui/KnowledgeFilterGrid'
import { getServerStrings } from '@/lib/i18n/server'
import { getListingArticles } from '@/lib/i18n/knowledge-articles'

export const metadata = {
  title: 'Knowledge Center — Holos Integrative Wellness Intelligence',
  description: 'Articles, guides, and deep dives on integrative wellness, the nine dimensions, and the eight wisdom traditions.',
}

// Display-only accent colours — not part of translation data
const ARTICLE_COLORS: Record<string, string> = {
  'nine-dimensions':       'var(--indigo)',
  'doshas-explained':      'var(--sage-deep)',
  'rambam-preventive':     'var(--clay)',
  'qi-cultivation':        'var(--indigo)',
  'sleep-traditions':      'var(--gold)',
  'stress-dimension':      'var(--rose)',
  'avicenna-canon':        'var(--gold)',
  'tibetan-three-humours': 'var(--clay)',
  'swarga-tradition':      'var(--sage-deep)',
}

// Locale-specific "All" label for the filter
const ALL_LABEL: Record<string, string> = { en: 'All', ru: 'Все', he: 'הכל', de: 'Alle' }

export default async function KnowledgePage() {
  const { strings, locale } = await getServerStrings()
  const k = strings.knowledge
  const { featured: FEATURED, articles: ARTICLES } = getListingArticles(locale)
  const allLabel = ALL_LABEL[locale] ?? 'All'

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

      {/* Featured */}
      <section style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link href={`/knowledge/${FEATURED.id}`}
            style={{
              display:      'block',
              background:   'var(--ink-stable)',
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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.6)' }}>{FEATURED.category}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 500, letterSpacing: '-.02em', color: '#fff', lineHeight: 1.2, margin: '0 0 16px' }}>
                {FEATURED.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', color: 'rgba(255,255,255,.75)', lineHeight: 1.65, margin: '0 0 24px' }}>
                {FEATURED.excerpt}
              </p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.6)' }}>{FEATURED.date}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'rgba(255,255,255,.6)' }}>{FEATURED.readTime}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '.88rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{k.readArticle}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive filter + article grid (client component) */}
      <KnowledgeFilterGrid articles={ARTICLES} allLabel={allLabel} readLabel={k.read} />

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
