'use client'
import { useState } from 'react'
import Link from 'next/link'

// Display-only accent colours (mirrored from knowledge/page.tsx)
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

type Article = {
  id:       string
  category: string
  title:    string
  excerpt:  string
  date:     string
  readTime: string
}

interface Props {
  articles:  Article[]
  allLabel:  string   // locale-aware "All" label
  readLabel: string   // locale-aware "Read →" label
}

export function KnowledgeFilterGrid({ articles, allLabel, readLabel }: Props) {
  // Build category list dynamically from actual articles
  const categories = [allLabel, ...Array.from(new Set(articles.map(a => a.category)))]
  const [active, setActive] = useState(allLabel)

  const filtered = active === allLabel
    ? articles
    : articles.filter(a => a.category === active)

  return (
    <>
      {/* Category filter pills */}
      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                padding:      '6px 16px',
                borderRadius: 100,
                border:       '1px solid var(--line)',
                background:   c === active ? 'var(--sage-deep)' : 'var(--surface)',
                color:        c === active ? '#fff' : 'var(--ink-soft)',
                fontFamily:   'var(--font-body)',
                fontSize:     '.8rem',
                cursor:       'pointer',
                transition:   'background .15s, color .15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Article grid */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{
          maxWidth:             1200,
          margin:               '0 auto',
          display:              'grid',
          gridTemplateColumns:  'repeat(auto-fill, minmax(300px, 1fr))',
          gap:                  20,
        }}>
          {filtered.map(a => {
            const color = ARTICLE_COLORS[a.id] ?? 'var(--sage-deep)'
            return (
              <Link
                key={a.id}
                href={`/knowledge/${a.id}`}
                style={{
                  display:        'block',
                  background:     'var(--surface)',
                  border:         '1px solid var(--line)',
                  borderTop:      `3px solid ${color}`,
                  borderRadius:   'var(--radius-lg)',
                  padding:        '28px 24px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.12em', color, marginBottom: 12 }}>{a.category}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.35, margin: '0 0 10px' }}>{a.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)', lineHeight: 1.6, margin: '0 0 16px' }}>{a.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--ink-faint)' }}>{a.date} · {a.readTime}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--sage-deep)', fontWeight: 600 }}>{readLabel}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
