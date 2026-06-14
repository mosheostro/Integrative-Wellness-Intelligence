import Link from 'next/link'

export const metadata = {
  title: 'FAQ — Holos Integrative Wellness Intelligence',
  description: 'Answers to common questions about HOLOS, the assessment process, wisdom traditions, privacy, and pricing.',
}

const FAQS = [
  {
    category: 'About HOLOS',
    icon: '◈',
    items: [
      {
        q: 'What is HOLOS?',
        a: 'HOLOS is an integrative wellness intelligence platform. It maps your health across nine dimensions (nutrition, sleep, recovery, stress, movement, emotional, life balance, purpose, energy) through the lens of up to eight wisdom traditions — from Ayurveda and Daoist medicine to modern Evidence-Based Medicine. The result is a multi-dimensional wellness portrait plus an AI coach that gives you personalised, tradition-specific guidance.',
      },
      {
        q: 'Who is HOLOS for?',
        a: 'HOLOS is designed for people who are serious about understanding their health beyond a single metric. It is particularly useful for those who feel drawn to traditional medicine systems but want them grounded in modern science; for wellness practitioners who want a multi-tradition view of their clients; and for anyone who has hit the ceiling of conventional tracking apps.',
      },
      {
        q: 'Is HOLOS a medical service?',
        a: 'No. HOLOS is a wellness and self-awareness platform. It does not diagnose, treat, or cure any condition. The information it provides is for educational and self-improvement purposes only. If you have a medical condition, consult a licensed healthcare provider.',
      },
      {
        q: 'What makes HOLOS different from other wellness apps?',
        a: 'Most wellness apps track a single metric (steps, calories, sleep score) or use a single framework. HOLOS uses nine dimensions and eight complete medical philosophies simultaneously. Instead of one score, you get a multidimensional portrait. Instead of generic advice, you get recommendations shaped by your constitution, your tradition preference, and your actual answers.',
      },
    ],
  },
  {
    category: 'The Assessment',
    icon: '◉',
    items: [
      {
        q: 'How long does the assessment take?',
        a: 'The assessment uses adaptive branching: it starts with approximately 15 questions and expands to up to 50 based on your answers. Most users complete it in 10–20 minutes on first attempt. Subsequent assessments take 5–10 minutes because the system learns which branches matter most for you.',
      },
      {
        q: 'What are "adaptive questions"?',
        a: 'The assessment branches based on your answers. If you score low on sleep, the system asks follow-up questions to understand why — is it latency, maintenance, early waking, or chronotype misalignment? This means the assessment gets more relevant as it continues, rather than exhausting you with every possible question.',
      },
      {
        q: 'What do the dimension scores mean?',
        a: 'Each of the nine dimensions is scored from 0–100. Above 75 is thriving; 50–75 is stable; below 50 signals that dimension needs attention. The AI Coach interprets these scores in the context of your chosen tradition and tells you which dimensions are affecting each other (because they always do).',
      },
      {
        q: 'Can I take the assessment more than once?',
        a: 'Yes — and you should. The assessment is designed for repeated use. Taking it monthly shows you how your scores change over time and which interventions are working. The Practitioner plan offers unlimited assessments and a full longitudinal trend view.',
      },
      {
        q: 'Which tradition should I choose?',
        a: 'If you are new to integrative health, choose Swarga — it synthesises all eight traditions and gives you the most complete portrait. If you have a tradition you resonate with (e.g. Ayurveda, Daoist), choose that one and compare it to your Swarga result. If you are a healthcare professional assessing a client, choose the tradition most aligned with your training.',
      },
    ],
  },
  {
    category: 'Wisdom Traditions',
    icon: '◆',
    items: [
      {
        q: 'Do I need to believe in traditional medicine to use HOLOS?',
        a: 'No. HOLOS always cross-references traditional insights with modern research. Even if you choose Ayurveda mode, the recommendations are validated against the available scientific evidence. The traditions provide the diagnostic lens; the evidence base provides the safety floor.',
      },
      {
        q: 'What is the Swarga tradition?',
        a: 'Swarga is HOLOS\'s own synthesis framework. Named after the Sanskrit concept of the bridge between earthly and divine, Swarga applies all eight wisdom traditions to your answers simultaneously, weights them by their relevance to each dimension, and produces a composite portrait. It is the recommended starting point for new users.',
      },
      {
        q: 'Can I switch traditions between assessments?',
        a: 'Yes. You can choose a different tradition for each new assessment. This is actually recommended — seeing your data through Ayurveda vs. Evidence-Based vs. Rambam often reveals different priorities and insights. Your progress history keeps all results, labelled by tradition.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    icon: '◎',
    items: [
      {
        q: 'Who can see my wellness data?',
        a: 'Only you. HOLOS is built on Supabase with Row-Level Security enabled. Your data is physically isolated at the database level — no other user can access it. The HOLOS team can access anonymised aggregate statistics but cannot see your individual responses or scores.',
      },
      {
        q: 'Is my data sold to third parties?',
        a: 'Never. Your health data is not sold, shared with advertisers, or used to train AI models without your explicit consent. HOLOS is a subscription business — our revenue comes from subscriptions, not data monetisation.',
      },
      {
        q: 'Can I export or delete my data?',
        a: 'Yes. You can export your complete data history (assessments, scores, journal entries, goals) in JSON or CSV format from your account settings. You can also delete your account and all associated data at any time. Deletion is permanent and immediate.',
      },
      {
        q: 'Where is my data stored?',
        a: 'HOLOS uses Supabase cloud infrastructure. Data is stored in encrypted form at rest and in transit. We follow GDPR principles for all users, regardless of location.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    icon: '✦',
    items: [
      {
        q: 'Is the free plan really permanent?',
        a: 'Yes. The Seeker (free) plan is not a trial — it is a permanent free tier. You get one assessment per month, Evidence-Based tradition, and three AI Coach conversations monthly, forever, with no credit card required.',
      },
      {
        q: 'What happens at the end of my 14-day trial?',
        a: 'You automatically move to the Seeker (free) plan. No charge is made unless you choose to upgrade. There is no need to cancel to avoid being charged.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes. If you are on the Practitioner plan and are not satisfied for any reason within the first 30 days, contact us and we will refund your subscription — no questions asked.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div style={{ background: 'var(--canvas)' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '96px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage)', marginBottom: 20 }}>◈ FAQ</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 20px' }}>
            Common questions,{' '}
            <em style={{ color: 'var(--sage)' }}>honest answers.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
            Can&apos;t find what you need?{' '}
            <Link href="/contact" style={{ color: 'var(--sage)', textDecoration: 'none', fontWeight: 600 }}>
              Reach out directly &#8594;
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
                {cat.items.map(item => (
                  <details key={item.q}
                    style={{
                      background:   'var(--surface)',
                      border:       '1px solid var(--line)',
                      borderRadius: 'var(--radius-lg)',
                      overflow:     'hidden',
                    }}>
                    <summary style={{
                      padding:    '18px 24px',
                      fontFamily: 'var(--font-body)',
                      fontSize:   '.93rem',
                      fontWeight: 600,
                      color:      'var(--ink)',
                      cursor:     'pointer',
                      listStyle:  'none',
                      display:    'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap:        16,
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
            Still have questions?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', color: 'var(--ink-soft)', margin: '0 0 32px', lineHeight: 1.65 }}>
            Moshe personally reads every message. Reach out — he will reply within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"
              style={{
                padding:      '12px 24px',
                borderRadius: 'var(--radius)',
                background:   'var(--sage)',
                color:        '#fff',
                fontFamily:   'var(--font-body)',
                fontWeight:   600,
                fontSize:     '.9rem',
                textDecoration: 'none',
              }}>
              Contact us &#8594;
            </Link>
            <Link href="/auth/signup"
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
              Start free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
