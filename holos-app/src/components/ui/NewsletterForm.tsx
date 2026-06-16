'use client'

export function NewsletterForm() {
  return (
    <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto' }}>
      <input
        type="email"
        placeholder="your@email.com"
        style={{
          flex:         1,
          padding:      '11px 16px',
          borderRadius: 'var(--radius)',
          border:       '1px solid var(--line)',
          background:   'var(--surface)',
          fontFamily:   'var(--font-body)',
          fontSize:     '.88rem',
          color:        'var(--ink)',
          outline:      'none',
        }}
      />
      <button type="submit"
        style={{
          padding:      '11px 20px',
          borderRadius: 'var(--radius)',
          background:   'var(--sage)',
          color:        '#fff',
          fontFamily:   'var(--font-body)',
          fontWeight:   600,
          fontSize:     '.88rem',
          border:       'none',
          cursor:       'pointer',
          whiteSpace:   'nowrap',
        }}>
        Subscribe &#8594;
      </button>
    </form>
  )
}
