import Link from 'next/link'
import { FOUNDER } from '@/lib/founder'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata = {
  title: 'Terms of Service — Holos Integrative Wellness Intelligence',
  description: 'Terms governing your use of the HOLOS platform.',
}

const LAST_UPDATED = 'June 1, 2025'

export default async function TermsPage() {
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
            {l.termsTitle}
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
            {l.termsNote}
          </div>

          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', lineHeight: 1.85, color: 'var(--ink-soft)' }}>

            <T title="1. Acceptance of Terms">
              <p>By creating an account or using the HOLOS platform (&ldquo;HOLOS,&rdquo; &ldquo;the Service&rdquo;), you agree to be bound by these Terms. If you do not agree, do not use the Service. These Terms constitute a binding agreement between you and {FOUNDER.name}, the operator of HOLOS.</p>
            </T>

            <T title="2. Not Medical Advice">
              <p>HOLOS is a wellness and self-awareness platform. <strong>It is not a medical device, medical service, or source of medical advice.</strong> Nothing in HOLOS — including assessment scores, AI Coach conversations, recommendations, or content — constitutes medical advice, diagnosis, or treatment.</p>
              <p style={{ marginTop: 12 }}>Always consult a qualified healthcare professional before making changes to your health regimen, especially if you have a medical condition, are pregnant, or are taking medication.</p>
            </T>

            <T title="3. Eligibility">
              <p>You must be at least 16 years old to use HOLOS. By using the Service, you represent that you meet this requirement.</p>
            </T>

            <T title="4. Your Account">
              <p>You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activity that occurs under your account. Notify us immediately at <a href={`mailto:${FOUNDER.email}`} style={{ color: 'var(--sage-deep)' }}>{FOUNDER.email}</a> if you suspect unauthorised access.</p>
            </T>

            <T title="5. Acceptable Use">
              <p>You agree not to:</p>
              <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to reverse-engineer, scrape, or extract data from the platform</li>
                <li>Share your account credentials with others (except on Enterprise plans with multi-user licences)</li>
                <li>Upload false or misleading wellness data with intent to manipulate AI Coach output</li>
                <li>Use the AI Coach in ways that could harm yourself or others</li>
              </ul>
            </T>

            <T title="6. Subscriptions and Billing">
              <p>The Seeker (free) plan is provided at no cost. Paid plans (Practitioner, Enterprise) are billed via Stripe. Prices are listed at <Link href="/pricing" style={{ color: 'var(--sage-deep)' }}>/pricing</Link>. You may cancel anytime from your account settings; cancellation takes effect at the end of the current billing period. We offer a 30-day money-back guarantee on all paid plans.</p>
            </T>

            <T title="7. Your Data">
              <p>You own your wellness data. By using HOLOS, you grant us a limited licence to process your data solely for the purpose of providing the Service. We will never sell your data. See our <Link href="/privacy" style={{ color: 'var(--sage-deep)' }}>Privacy Policy</Link> for full details.</p>
            </T>

            <T title="8. Intellectual Property">
              <p>The HOLOS platform, including its algorithms, frameworks, design, and content, is proprietary to HOLOS. The eight tradition frameworks referenced (Ayurveda, Daoist medicine, etc.) draw on ancient public-domain knowledge; HOLOS&apos;s particular synthesis, weightings, and applications are original intellectual property.</p>
            </T>

            <T title="9. Disclaimer of Warranties">
              <p>THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT RESULTS FROM USING THE SERVICE WILL BE ACCURATE OR RELIABLE.</p>
            </T>

            <T title="10. Limitation of Liability">
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, HOLOS&apos;S LIABILITY FOR ANY CLAIM ARISING FROM YOUR USE OF THE SERVICE IS LIMITED TO THE AMOUNT YOU PAID FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.</p>
            </T>

            <T title="11. Changes to Terms">
              <p>We may update these Terms. We will notify you by email at least 30 days before material changes take effect. Continued use of the Service after that date constitutes acceptance.</p>
            </T>

            <T title="12. Governing Law">
              <p>These Terms are governed by the laws of the State of Israel, without regard to conflict of law provisions.</p>
            </T>

            <T title="13. Contact">
              <p>Questions about these Terms? Email us at <a href={`mailto:${FOUNDER.email}`} style={{ color: 'var(--sage-deep)' }}>{FOUNDER.email}</a>.</p>
            </T>
          </div>
        </div>
      </section>
    </div>
  )
}

function T({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  )
}