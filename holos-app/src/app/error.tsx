'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
        fontSize:     '2.4rem',
        marginBottom: 20,
        color:        'var(--rose)',
      }}>◈</div>

      <h1 style={{
        fontFamily:   'var(--font-serif)',
        fontSize:     'clamp(1.4rem, 4vw, 2rem)',
        fontWeight:   500,
        letterSpacing:'-.02em',
        color:        'var(--ink)',
        margin:       '0 0 12px',
      }}>
        Something went unexpectedly.
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize:   '.92rem',
        color:      'var(--ink-soft)',
        lineHeight: 1.65,
        maxWidth:   400,
        margin:     '0 0 8px',
      }}>
        This error has been logged and we will look into it.
      </p>
      {error?.digest && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   '.72rem',
          color:      'var(--ink-faint)',
          margin:     '0 0 36px',
          letterSpacing:'.08em',
        }}>
          Error ID: {error.digest}
        </p>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={reset}
          style={{
            padding:      '12px 24px',
            borderRadius: 'var(--radius)',
            background:   'var(--sage-deep)',
            color:        '#fff',
            fontFamily:   'var(--font-body)',
            fontWeight:   600,
            fontSize:     '.9rem',
            border:       'none',
            cursor:       'pointer',
          }}>
          Try again &#8594;
        </button>
        <a href="/"
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
          Return home
        </a>
      </div>
    </div>
  )
}
