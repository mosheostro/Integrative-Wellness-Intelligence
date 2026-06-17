import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight:      '100dvh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     'var(--canvas)',
      padding:        '40px 24px',
      textAlign:      'center',
    }}>
      <div style={{
        fontFamily:   'var(--font-mono)',
        fontSize:     '5rem',
        fontWeight:   500,
        color:        'var(--line)',
        lineHeight:   1,
        marginBottom: 24,
        letterSpacing:'-.04em',
      }}>404</div>

      <div style={{
        width:        48,
        height:       2,
        background:   'var(--sage)',
        margin:       '0 auto 32px',
        borderRadius: 2,
      }}/>

      <h1 style={{
        fontFamily:   'var(--font-serif)',
        fontSize:     'clamp(1.4rem, 4vw, 2rem)',
        fontWeight:   500,
        letterSpacing:'-.02em',
        color:        'var(--ink)',
        margin:       '0 0 16px',
      }}>
        This page has not been found.
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '.95rem',
        color:      'var(--ink-soft)',
        lineHeight: 1.65,
        maxWidth:   400,
        margin:     '0 0 40px',
      }}>
        It may have been moved, renamed, or — like unexamined habits — it never really existed in the first place.
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/"
          style={{
            padding:      '12px 24px',
            borderRadius: 'var(--radius)',
            background:   'var(--sage-deep)',
            color:        '#fff',
            fontFamily:   'var(--font-body)',
            fontWeight:   600,
            fontSize:     '.9rem',
            textDecoration: 'none',
          }}>
          Return home &#8594;
        </Link>
        <Link href="/assessment"
          style={{
            padding:      '12px 24px',
            borderRadius: 'var(--radius)',
            border:       '1.5px solid var(--line)',
            color:        'var(--ink)',
            fontFamily:   'var(--font-body)',
            fontWeight:   500,
            fontSize:     '.9rem',
            textDecoration: 'none',
          }}>
          Take an assessment
        </Link>
      </div>
    </div>
  )
}
