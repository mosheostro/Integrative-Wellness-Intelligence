import Link from 'next/link'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'FAQ — Holos Integrative Wellness Intelligence',
  description: 'Answers to common questions about HOLOS, the assessment process, wisdom traditions, privacy, and pricing.',
}

export default async function FAQPage() {
  const { strings } = await getServerStrings()
  const f = strings.faq

  const FAQS = [
    {
      category: f.cat1,
      icon: '◈',
      items: [
        { q: f.c1q1, a: f.c1a1 },
        { q: f.c1q2, a: f.c1a2 },
        { q: f.c1q3, a: f.c1a3 },
        { q: f.c1q4, a: f.c1a4 },
      ],
    },
    {
      category: f.cat2,
      icon: '◉',
      items: [
        { q: f.c2q1, a: f.c2a1 },
        { q: f.c2q2, a: f.c2a2 },
        { q: f.c2q3, a: f.c2a3 },
        { q: f.c2q4, a: f.c2a4 },
        { q: f.c2q5, a: f.c2a5 },
      ],
    },
    {
      category: f.cat3,
      icon: '◆',
      items: [
        { q: f.c3q1, a: f.c3a1 },
        { q: f.c3q2, a: f.c3a2 },
        { q: f.c3q3, a: f.c3a3 },
      ],
    },
    {
      category: f.cat4,
      icon: '◎',
      items: [
        { q: f.c4q1, a: f.c4a1 },
        { q: f.c4q2, a: f.c4a2 },
        { q: f.c4q3, a: f.c4a3 },
        { q: f.c4q4, a: f.c4a4 },
      ],
    },
    {
      category: f.cat5,
      icon: '✦',
      items: [
        { q: f.c5q1, a: f.c5a1 },
        { q: f.c5q2, a: f.c5a2 },
        { q: f.c5q3, a: f.c5a3 },
      ],
    },
  ]

  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>
            ◈ {f.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            {f.titleA}{' '}
            <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>{f.titleEm}</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
            {f.notFound}{' '}
            <Link href="/contact" style={{ color: 'var(--sage)', textDecoration: 'none', fontWeight: 600 }}>
              {f.contactLink}
            </Link>
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
          {FAQS.map(cat => (
            <div key={cat.category}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: '1rem', color: 'var(--sage)' }}>{cat.icon}</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--ink)', margin: 0 }}>{cat.category}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cat.items.map((item, i) => (
                  <details key={i}
                    style={{
                      background:   'var(--surface)',
                      border:       '1px solid var(--line)',
                      borderRadius: 'var(--radius-lg)',
                      overflow:     'hidden',
                    }}>
                    <summary style={{
                      padding:       '18px 24px',
                      fontFamily:    'var(--font-body)',
                      fontSize:      '.93rem',
                      fontWeight:    600,
                      color:         'var(--ink)',
                      cursor:        'pointer',
                      listStyle:     'none',
                      display:       'flex',
                      justifyContent:'space-between',
                      alignItems:    'center',
                      gap:           16,
                    }}>
                      {item.q}
                      <span style={{ color: 'var(--ink-faint)', fontSize: '.8rem', flexShrink: 0 }}>&#43;</span>
                    </summary>
                    <div style={{
                      padding:    '0 24px 20px',
                      fontFamily: 'var(--font-body)',
                      fontSize:   '.88rem',
                      lineHeight: 1.75,
                      color:      'var(--ink-soft)',
                    }}>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--canvas2)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 16px' }}>
            {f.ctaTitle}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', color: 'var(--ink-soft)', margin: '0 0 32px', lineHeight: 1.65 }}>
            {f.ctaBody}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"
              style={{
                padding:        '12px 24px',
                borderRadius:   'var(--radius)',
                background:     'var(--sage)',
                color:          '#fff',
                fontFamily:     'var(--font-body)',
                fontWeight:     600,
                fontSize:       '.9rem',
                textDecoration: 'none',
              }}>
              {f.ctaCta1}
            </Link>
            <Link href="/auth/signup"
              style={{
                padding:        '12px 24px',
                borderRadius:   'var(--radius)',
                border:         '1.5px solid var(--line)',
                color:          'var(--ink)',
                fontFamily:     'var(--font-body)',
                fontWeight:     500,
                fontSize:       '.9rem',
                textDecoration: 'none',
              }}>
              {f.ctaCta2}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
