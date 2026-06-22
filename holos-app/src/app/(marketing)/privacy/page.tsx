export const dynamic = 'force-dynamic'
import { FOUNDER } from '@/lib/founder'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'Privacy Policy — Holos Integrative Wellness Intelligence',
  description: 'How HOLOS collects, uses, and protects your personal and health data.',
}

const LAST_UPDATED = 'June 1, 2025'

export default async function PrivacyPage() {
  const { strings } = await getServerStrings()
  const l = strings.legal

  return (
    <div style={{ background: 'var(--canvas)' }}>
      <section style={{ padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 16 }}>
            ◈ {l.eyebrow}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: '0 0 12px' }}>
            {l.privacyTitle}
          </h1>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--ink-faint)', marginBottom: 16 }}>
            {l.lastUpdated} {LAST_UPDATED}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '.82rem',
            color: 'var(--ink-soft)',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
            padding: '10px 16px',
            marginBottom: 40,
          }}>
            {l.privacyNote}
          </div>

          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', lineHeight: 1.85, color: 'var(--ink-soft)' }}>
            <Section title="1. Who We Are">
              <p>HOLOS Integrative Wellness Intelligence (&ldquo;HOLOS,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is operated by {FOUNDER.name}. Our contact email is <a href={`mailto:${FOUNDER.email}`} style={{ color: 'var(--sage-deep)' }}>{FOUNDER.email}</a>.</p>
            </Section>

            <Section title="2. Data We Collect">
              <p>We collect the following categories of data when you use HOLOS:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li><strong>Account data:</strong> Email address, name, and profile information you provide during signup.</li>
                <li><strong>Assessment data:</strong> Your answers to wellness assessment questions and the dimension scores derived from them.</li>
                <li><strong>Journal and goal data:</strong> Content you voluntarily enter into the journal, goals, and habits features.</li>
                <li><strong>Usage data:</strong> Page views, feature usage patterns, and device/browser information collected via server logs and analytics.</li>
                <li><strong>AI Coach conversations:</strong> Messages exchanged with the AI Coach, retained to provide continuity and improve your coaching experience.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Data">
              <p>We use your data exclusively to:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Provide and improve the HOLOS platform and your personalised wellness portrait</li>
                <li>Generate AI Coach responses grounded in your assessment data</li>
                <li>Send transactional emails (account confirmation, password reset, billing receipts)</li>
                <li>Analyse aggregate, anonymised usage to improve the product</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p style={{ marginTop: 16 }}>We do <strong>not</strong> sell your data, share it with advertisers, or use it to train AI models without your explicit written consent.</p>
            </Section>

            <Section title="4. Data Sharing">
              <p>We share your data only with:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li><strong>Supabase:</strong> Our database and authentication provider. Data is stored encrypted at rest and in transit. See Supabase&apos;s Privacy Policy at supabase.com/privacy.</li>
                <li><strong>Anthropic:</strong> When you use the AI Coach, your messages and relevant assessment context are sent to Anthropic&apos;s Claude API. Anthropic processes this data per their usage policies.</li>
                <li><strong>Stripe:</strong> For payment processing. Stripe handles billing data; HOLOS never stores card numbers.</li>
                <li><strong>Law enforcement:</strong> When legally required.</li>
              </ul>
            </Section>

            <Section title="5. Data Security">
              <p>HOLOS uses Row-Level Security (RLS) at the database layer, meaning your data is physically isolated — no other HOLOS user can access your records. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct periodic security reviews and require all team members with data access to sign confidentiality agreements.</p>
            </Section>

            <Section title="6. Data Retention">
              <p>We retain your data as long as your account is active. When you delete your account, your personal data and wellness history are permanently deleted within 30 days. Anonymised, aggregated statistics may be retained indefinitely for product improvement purposes.</p>
            </Section>

            <Section title="7. Your Rights">
              <p>Depending on your location, you may have the following rights:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li><strong>Access:</strong> Request a copy of all personal data we hold about you.</li>
                <li><strong>Rectification:</strong> Correct inaccurate data.</li>
                <li><strong>Erasure:</strong> Delete your account and all associated data.</li>
                <li><strong>Portability:</strong> Export your data in JSON or CSV format from your account settings.</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
                <li><strong>Restriction:</strong> Request that we restrict processing your data.</li>
              </ul>
              <p style={{ marginTop: 16 }}>To exercise any of these rights, email <a href={`mailto:${FOUNDER.email}`} style={{ color: 'var(--sage-deep)' }}>{FOUNDER.email}</a>. We respond within 30 days.</p>
            </Section>

            <Section title="8. Cookies">
              <p>HOLOS uses session cookies for authentication (required for the platform to function). We do not use advertising cookies or third-party tracking cookies. We use privacy-respecting analytics that do not require cookies.</p>
            </Section>

            <Section title="9. Children">
              <p>HOLOS is not intended for users under 16 years of age. We do not knowingly collect personal information from children under 16. If you believe we have collected such data, contact us immediately.</p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>We will notify you of material changes to this policy by email and by posting a notice on the platform at least 30 days before the changes take effect.</p>
            </Section>

            <Section title="11. Contact Us">
              <p>For any privacy-related questions, to exercise your rights, or to report a concern, contact us at <a href={`mailto:${FOUNDER.email}`} style={{ color: 'var(--sage-deep)' }}>{FOUNDER.email}</a>. We aim to respond within 2 business days.</p>
            </Section>
          </div>
        </div>
      </section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--line)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  )
}
