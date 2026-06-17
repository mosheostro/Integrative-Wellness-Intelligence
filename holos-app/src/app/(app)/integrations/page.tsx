import Link from 'next/link'
import type { Metadata } from 'next'
import { getServerStrings } from '@/lib/i18n/server'

export const metadata: Metadata = {
  title: 'Integrations — Holos Integrative Wellness Intelligence',
  description:
    'Connect Holos with your wearables, health apps, and calendar. Apple Health, Oura, Garmin, Google Fit, Whoop, and more.',
}

// catKey is the lookup key into ig.cat1–cat5; status is English key for color lookup
const INTEGRATIONS = [
  {
    catKey: 'cat1',
    items: [
      { name: 'Apple Health',       desc: 'Steps, sleep, HRV, heart rate, workouts',         status: 'Available'    },
      { name: 'Oura Ring',          desc: 'Readiness score, sleep stages, HRV, activity',     status: 'Available'    },
      { name: 'Garmin Connect',     desc: 'Activity, sleep, stress score, body battery',       status: 'Available'    },
      { name: 'Whoop',              desc: 'Recovery, strain, sleep performance',               status: 'Beta'         },
      { name: 'Fitbit / Google Fit',desc: 'Steps, sleep, heart rate, active minutes',          status: 'Available'    },
      { name: 'Samsung Health',     desc: 'Activity, sleep, stress tracking',                  status: 'Coming soon'  },
    ],
  },
  {
    catKey: 'cat2',
    items: [
      { name: 'Cronometer',   desc: 'Detailed macro and micronutrient tracking',  status: 'Available'   },
      { name: 'MyFitnessPal', desc: 'Food diary and calorie tracking',             status: 'Beta'        },
      { name: 'Lifesum',      desc: 'Meal plans and nutritional insights',         status: 'Coming soon' },
    ],
  },
  {
    catKey: 'cat3',
    items: [
      { name: 'Google Calendar', desc: 'Sync habits and sessions to your calendar', status: 'Available' },
      { name: 'Apple Calendar',  desc: 'Push wellness blocks to iCal',              status: 'Available' },
      { name: 'Calendly',        desc: 'Book practitioner sessions directly in Holos', status: 'Available' },
    ],
  },
  {
    catKey: 'cat4',
    items: [
      { name: 'Headspace',    desc: 'Sync meditation minutes and streaks',              status: 'Beta'        },
      { name: 'Calm',         desc: 'Import sleep stories and meditation sessions',     status: 'Coming soon' },
      { name: 'Insight Timer', desc: 'Connect meditation practice data',               status: 'Coming soon' },
    ],
  },
  {
    catKey: 'cat5',
    items: [
      { name: 'Function Health', desc: 'Import 100+ biomarker panel results',          status: 'Beta'        },
      { name: 'Levels',          desc: 'Continuous glucose monitoring insights',        status: 'Coming soon' },
      { name: 'Viome',           desc: 'Gut microbiome and precision nutrition data',   status: 'Coming soon' },
    ],
  },
]

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Available:     { bg: 'oklch(0.96 0.04 155 / 0.6)', color: 'var(--sage-deep)' },
  Beta:          { bg: 'oklch(0.96 0.06 60 / 0.5)',  color: 'oklch(0.45 0.1 60)' },
  'Coming soon': { bg: 'var(--canvas2)',               color: 'var(--ink-faint)' },
}

export default async function IntegrationsPage() {
  const { strings } = await getServerStrings()
  const ig = strings.integrations

  // Map English status keys → localised display labels
  const STATUS_LABEL: Record<string, string> = {
    Available:     ig.statusAvailable,
    Beta:          ig.statusBeta,
    'Coming soon': ig.statusSoon,
  }

  // Map catKey → localised category name
  const CAT_LABELS: Record<string, string> = {
    cat1: ig.cat1, cat2: ig.cat2, cat3: ig.cat3,
    cat4: ig.cat4, cat5: ig.cat5,
  }

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section style={{
        padding: '72px 24px 56px',
        textAlign: 'center',
        background: 'linear-gradient(160deg, var(--canvas) 60%, oklch(0.95 0.02 270 / 0.3) 100%)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '6px 16px',
            fontSize: '.78rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--indigo)',
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            ◈ {ig.eyebrow}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            {ig.heroTitle}<br /><em>{ig.heroTitleEm}</em>
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.75,
            maxWidth: 500,
            margin: '0 auto 32px',
          }}>
            {ig.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'var(--sage)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {ig.ctaCta}
            </Link>
            <Link href="/contact" style={{
              display: 'inline-block',
              padding: '12px 28px',
              border: '1.5px solid var(--line)',
              color: 'var(--ink)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '.95rem',
            }}>
              {ig.ctaCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Integration grid */}
      <section style={{ padding: '64px 24px 80px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {INTEGRATIONS.map(cat => (
            <div key={cat.catKey}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontWeight: 500,
                color: 'var(--ink)',
                marginBottom: 20,
                paddingBottom: 12,
                borderBottom: '1px solid var(--line)',
              }}>
                {CAT_LABELS[cat.catKey]}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {cat.items.map(item => {
                  const st = STATUS_STYLES[item.status]
                  return (
                    <div key={item.name} style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--radius)',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '.95rem',
                          fontWeight: 600,
                          color: 'var(--ink)',
                        }}>{item.name}</h3>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 999,
                          background: st.bg,
                          color: st.color,
                          fontSize: '.72rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '.04em',
                          whiteSpace: 'nowrap',
                        }}>{STATUS_LABEL[item.status]}</span>
                      </div>
                      <p style={{ fontSize: '.83rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practitioner API callout */}
      <section style={{
        background: 'var(--ink)',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 500,
            color: 'var(--canvas)',
            marginBottom: 16,
          }}>
            {ig.apiTitle}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.65)', lineHeight: 1.75, marginBottom: 32 }}>
            {ig.apiBody}
          </p>
          <Link href="/contact" style={{
            display: 'inline-block',
            padding: '12px 28px',
            border: '1.5px solid rgba(255,255,255,.25)',
            color: 'var(--canvas)',
            borderRadius: 'var(--radius)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: '.95rem',
          }}>
            {ig.apiCta}
          </Link>
        </div>
      </section>

    </main>
  )
}
