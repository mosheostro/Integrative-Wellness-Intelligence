'use client'
import { useState } from 'react'
import { FOUNDER } from '@/lib/founder'

const SUBJECTS = [
  'General inquiry',
  'Book a wellness consultation',
  'Enterprise & clinic partnerships',
  'Press & media',
  'Technical support',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: SUBJECTS[0], message: '', phone: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const CONTACT_METHODS = [
    { icon: '✉', label: 'Email', value: FOUNDER.email, href: `mailto:${FOUNDER.email}`, desc: 'Typically replies within 24 hours' },
    { icon: '◎', label: 'WhatsApp', value: '+972 54-998-9627', href: FOUNDER.whatsapp, desc: 'Quick questions, fastest response' },
    { icon: '◉', label: 'Telegram', value: '@moshe_holos', href: FOUNDER.telegram, desc: 'For ongoing conversations' },
    { icon: '◆', label: 'LinkedIn', value: 'Moshe Ostrovsky', href: FOUNDER.linkedin, desc: 'Professional inquiries' },
    { icon: '✦', label: 'Book a Call', value: 'calendly.com/moshe-holos', href: FOUNDER.calendly, desc: 'Schedule a 30-minute consultation' },
  ]

  return (
    <div style={{ background: 'var(--canvas)' }}>
      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>◈ Contact</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            Let&apos;s talk about{' '}
            <em style={{ color: 'var(--sage)' }}>your wellbeing.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            Whether you have a question about the platform, want to book a personal consultation, or are exploring enterprise solutions — reach out.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Contact form */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '40px 36px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 24px' }}>Send a message</h2>

            {status === 'sent' ? (
              <div style={{
                padding:      32,
                textAlign:    'center',
                background:   'rgba(122,158,142,.08)',
                border:       '1px solid rgba(122,158,142,.25)',
                borderRadius: 'var(--radius)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>Message sent</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-soft)' }}>
                  Moshe will get back to you within 24 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      style={{
                        padding:      '10px 14px',
                        borderRadius: 'var(--radius)',
                        border:       '1px solid var(--line)',
                        background:   'var(--canvas)',
                        fontFamily:   'var(--font-body)',
                        fontSize:     '.88rem',
                        color:        'var(--ink)',
                        outline:      'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      style={{
                        padding:      '10px 14px',
                        borderRadius: 'var(--radius)',
                        border:       '1px solid var(--line)',
                        background:   'var(--canvas)',
                        fontFamily:   'var(--font-body)',
                        fontSize:     '.88rem',
                        color:        'var(--ink)',
                        outline:      'none',
                      }}
                    />
                  </label>
                </div>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Subject</span>
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    style={{
                      padding:      '10px 14px',
                      borderRadius: 'var(--radius)',
                      border:       '1px solid var(--line)',
                      background:   'var(--canvas)',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.88rem',
                      color:        'var(--ink)',
                      outline:      'none',
                      appearance:   'none',
                    }}
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Phone (optional)</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                    style={{
                      padding:      '10px 14px',
                      borderRadius: 'var(--radius)',
                      border:       '1px solid var(--line)',
                      background:   'var(--canvas)',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.88rem',
                      color:        'var(--ink)',
                      outline:      'none',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Message *</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="How can Moshe help you?"
                    style={{
                      padding:      '10px 14px',
                      borderRadius: 'var(--radius)',
                      border:       '1px solid var(--line)',
                      background:   'var(--canvas)',
                      fontFamily:   'var(--font-body)',
                      fontSize:     '.88rem',
                      color:        'var(--ink)',
                      outline:      'none',
                      resize:       'vertical',
                    }}
                  />
                </label>

                {status === 'error' && (
                  <div style={{ padding: '10px 14px', background: 'rgba(176,96,112,.1)', border: '1px solid rgba(176,96,112,.25)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontSize: '.83rem', color: 'var(--rose)' }}>
                    Something went wrong. Please try email directly: {FOUNDER.email}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding:      '13px 24px',
                    borderRadius: 'var(--radius)',
                    background:   status === 'sending' ? 'var(--line)' : 'var(--sage)',
                    color:        '#fff',
                    fontFamily:   'var(--font-body)',
                    fontWeight:   600,
                    fontSize:     '.9rem',
                    border:       'none',
                    cursor:       status === 'sending' ? 'wait' : 'pointer',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message →'}
                </button>
              </form>
            )}
          </div>

          {/* Contact methods */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink)', margin: '0 0 24px' }}>Other ways to reach Moshe</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CONTACT_METHODS.map(m => (
                <a key={m.label} href={m.href} target="_blank" rel="noopener"
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          16,
                    padding:      '16px 20px',
                    background:   'var(--surface)',
                    border:       '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                  }}>
                  <div style={{
                    width:          40,
                    height:         40,
                    borderRadius:   '50%',
                    background:     'rgba(122,158,142,.12)',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    fontSize:       '1.1rem',
                    color:          'var(--sage)',
                    flexShrink:     0,
                  }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '.88rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-faint)' }}>{m.desc}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-faint)' }}>&#8594;</div>
                </a>
              ))}
            </div>

            {/* Founder card */}
            <div style={{
              marginTop:    24,
              padding:      '24px 20px',
              background:   'var(--canvas2)',
              border:       '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              textAlign:    'center',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--ink)', marginBottom: 4 }}>{FOUNDER.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--ink-faint)', marginBottom: 16 }}>{FOUNDER.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.6 }}>
                &ldquo;I personally read every message. If it is about your wellness, it is important.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
