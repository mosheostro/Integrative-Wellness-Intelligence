import { NextRequest, NextResponse } from 'next/server'
import { FOUNDER } from '@/lib/founder'

/** Escape user-controlled strings before interpolating into HTML email */
function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, phone } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Try Resend if API key present
    const RESEND_KEY = process.env.RESEND_API_KEY
    if (RESEND_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    'HOLOS Contact <noreply@holos.app>',
          to:      [FOUNDER.email],
          replyTo: email,
          subject: `[HOLOS Contact] ${subject || 'New message'} — from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
              <h2 style="color: #2B2F45; font-size: 1.2rem; margin: 0 0 24px;">New contact form submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 120px; font-size: 0.85rem;">Name</td><td style="padding: 8px 0; font-weight: 600;">${esc(name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;">Email</td><td style="padding: 8px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;">Phone</td><td style="padding: 8px 0;">${esc(phone)}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #666; font-size: 0.85rem;">Subject</td><td style="padding: 8px 0;">${esc(subject || '—')}</td></tr>
              </table>
              <div style="margin: 24px 0; padding: 20px; background: #FAF7F2; border-radius: 8px; border-left: 3px solid #7A9E8E;">
                <div style="font-size: 0.82rem; color: #666; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</div>
                <div style="line-height: 1.65; white-space: pre-wrap;">${esc(message)}</div>
              </div>
              <div style="font-size: 0.75rem; color: #aaa; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
                Sent via HOLOS contact form · ${new Date().toISOString()}
              </div>
            </div>
          `,
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Resend error:', errText)
        // Fall through to FormSubmit
      } else {
        return NextResponse.json({ ok: true })
      }
    }

    // Fallback: FormSubmit.co (no API key required)
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${FOUNDER.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject: `[HOLOS] ${subject || 'Contact form'} — from ${name}`,
        message: `${message}${phone ? `\n\nPhone: ${phone}` : ''}`,
        _captcha: 'false',
      }),
    })

    if (!for