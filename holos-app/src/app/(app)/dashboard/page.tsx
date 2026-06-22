export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getServerStrings } from '@/lib/i18n/server'
import { WellnessOrb } from '@/components/ui/WellnessOrb'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { DashboardLiveLayer } from '@/components/ui/DashboardLiveLayer'
import { computeTrajectory, TRAJECTORY_COLORS, detectPersona, PERSONA_META } from '@/engine/intelligence-engine'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { strings, locale, dateLocale } = await getServerStrings()
  const s = strings.dashboard
  const dims = strings.dimensions
  const nav = strings.nav

  // ── Localized label lookup tables ─────────────────────────────────────────
  const STATE_LABELS: Record<string, Partial<Record<string, string>>> = {
    HIGH_PERFORMANCE:    { en: 'High Performance',    ru: 'Высокая эффективность', he: 'ביצועים גבוהים',       de: 'Hochleistung'          },
    OPTIMIZATION:        { en: 'Optimization Mode',   ru: 'Режим оптимизации',     he: 'מצב אופטימיזציה',      de: 'Optimierungsmodus'     },
    BALANCED:            { en: 'Balanced',             ru: 'Сбалансированный',      he: 'מאוזן',                de: 'Ausgewogen'            },
    MAINTENANCE:         { en: 'Maintenance',          ru: 'Поддержание',           he: 'תחזוקה',               de: 'Erhaltung'             },
    SLEEP_DEFICIT:       { en: 'Sleep Deficit',        ru: 'Дефицит сна',           he: 'חוסר שינה',            de: 'Schlafdefizit'         },
    STRESS_DOMINANT:     { en: 'Stress Dominant',      ru: 'Доминирует стресс',     he: 'דומיננטיות של לחץ',    de: 'Stressdominant'        },
    LOW_RECOVERY:        { en: 'Low Recovery',         ru: 'Слабое восстановление', he: 'התאוששות נמוכה',       de: 'Geringe Erholung'      },
    ENERGY_IMBALANCE:    { en: 'Energy Imbalance',     ru: 'Дисбаланс энергии',     he: 'חוסר איזון אנרגטי',   de: 'Energieungleichgewicht'},
    INFLAMMATORY_PATTERN:{ en: 'Inflammatory Pattern', ru: 'Воспалительный паттерн',he: 'דפוס דלקתי',           de: 'Entzündungsmuster'     },
    LIFESTYLE_IMPROVEMENT:{ en: 'Lifestyle Improvement',ru: 'Улучшение образа жизни',he: 'שיפור אורח חיים',     de: 'Lebensstilverbesserung'},
  }
  const TRAJ_LABELS: Record<string, Partial<Record<string, string>>> = {
    first_session: { en: 'First Session', ru: 'Первая сессия',   he: 'ראשון',             de: 'Erste Sitzung'    },
    improving:     { en: 'Improving',     ru: 'Улучшение',       he: 'משתפר',             de: 'Verbesserung'     },
    recovering:    { en: 'Recovering',    ru: 'Восстановление',  he: 'מתאושש',            de: 'Erholung'         },
    plateauing:    { en: 'Plateauing',    ru: 'Плато',           he: 'מישורי',            de: 'Plateau'          },
    declining:     { en: 'Declining',     ru: 'Снижение',        he: 'בירידה',            de: 'Rückgang'         },
    unstable:      { en: 'Unstable',      ru: 'Нестабильный',    he: 'לא יציב',           de: 'Instabil'         },
  }
  const PERSONA_NAMES: Record<string, Partial<Record<string, string>>> = {
    Optimizer:  { en: 'Optimizer',  ru: 'Оптимизатор',  he: 'אופטימיזר',    de: 'Optimierer'   },
    Seeker:     { en: 'Seeker',     ru: 'Искатель',     he: 'מחפש',         de: 'Suchender'    },
    Builder:    { en: 'Builder',    ru: 'Строитель',    he: 'בונה',         de: 'Erbauer'      },
    Recoverer:  { en: 'Recoverer',  ru: 'Восстановитель',he: 'מתאושש',      de: 'Regenerierer' },
    Explorer:   { en: 'Explorer',   ru: 'Исследователь',he: 'חוקר',         de: 'Entdecker'    },
    Stabilizer: { en: 'Stabilizer', ru: 'Стабилизатор', he: 'מייצב',        de: 'Stabilisierer'},
  }
  const CATEGORY_LABELS: Record<string, Partial<Record<string, string>>> = {
    SLEEP:       { en: 'Sleep',      ru: 'Сон',             he: 'שינה',       de: 'Schlaf'       },
    MOVEMENT:    { en: 'Movement',   ru: 'Движение',        he: 'תנועה',      de: 'Bewegung'     },
    NUTRITION:   { en: 'Nutrition',  ru: 'Питание',         he: 'תזונה',      de: 'Ernährung'    },
    RECOVERY:    { en: 'Recovery',   ru: 'Восстановление',  he: 'התאוששות',   de: 'Erholung'     },
    EMOTIONAL:   { en: 'Emotional',  ru: 'Эмоции',          he: 'רגשי',       de: 'Emotional'    },
    STRESS:      { en: 'Calm',       ru: 'Спокойствие',     he: 'שלווה',      de: 'Gelassenheit' },
    CALM:        { en: 'Calm',       ru: 'Спокойствие',     he: 'שלווה',      de: 'Gelassenheit' },
    BALANCE:     { en: 'Balance',    ru: 'Баланс',          he: 'איזון',      de: 'Balance'      },
    PURPOSE:     { en: 'Purpose',    ru: 'Цель',            he: 'מטרה',       de: 'Zweck'        },
    ENERGY:      { en: 'Energy',     ru: 'Энергия',         he: 'אנרגיה',     de: 'Energie'      },
    MINDFULNESS: { en: 'Mindfulness',ru: 'Осознанность',    he: 'מיינדפולנס', de: 'Achtsamkeit'  },
  }

  // Batch 1: run all independent queries in parallel
  const [
    { data: latestAssessment },
    { data: profile },
    { data: userProgress },
    { data: snapshots },
  ] = await Promise.all([
    supabase.from('assessments')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
    supabase.from('user_progress').select('*').eq('user_id', user.id).maybeSingle(),
    supabase.from('progress_snapshots')
      .select('composite,snapshot_date')
      .eq('user_id', user.id)
      .order('snapshot_date', { ascending: true })
      .limit(30),
  ])

  // Batch 2: scores + recs depend on latestAssessment.id — run in parallel with each other
  const [{ data: latestScores }, { data: latestRecs }] = latestAssessment
    ? await Promise.all([
        supabase.from('dimension_scores').select('*').eq('assessment_id', latestAssessment.id).maybeSingle(),
        supabase.from('issued_recommendations').select('*')
          .eq('assessment_id', latestAssessment.id)
          .eq('status', 'active')
          .order('priority_score', { ascending: false })
          .limit(4),
      ])
    : [{ data: null }, { data: null }]

  const hasData = !!latestScores
  const score   = latestAssessment?.composite_score ?? 0
  const state   = latestAssessment?.wellness_state ?? 'LIFESTYLE_IMPROVEMENT'

  // Intelligence layer: trajectory + persona
  const snapshotHistory = (snapshots ?? []).map((s: Record<string, unknown>) => ({
    composite: (s.composite as number) ?? 0,
    snapshot_date: (s.snapshot_date as string) ?? '',
  }))
  const trajectory = computeTrajectory(score, snapshotHistory)
  const trajectoryColor = TRAJECTORY_COLORS[trajectory.direction]

  const behavioralProfile = {
    contradictions: [] as string[], consistencyScore: 72, extremeBias: 0,
    dominantConcern: null, patternLabel: 'Balanced',
  }
  const persona = latestScores ? detectPersona(latestScores as Parameters<typeof detectPersona>[0], behavioralProfile, snapshotHistory.length === 0) : null
  const personaMeta = persona ? PERSONA_META[persona.persona] : null
  const stateLabel = STATE_LABELS[state]?.[locale] ?? state.replace(/_/g, ' ')
  const trajLabel  = TRAJ_LABELS[trajectory.direction]?.[locale] ?? trajectory.direction.replace('_', ' ')
  const personaLabel = persona ? (PERSONA_NAMES[persona.persona]?.[locale] ?? persona.persona) : ''
  // Fallback chain: full_name → email username (never show "there")
  const rawFirst = (profile?.full_name ?? '').split(' ')[0].trim()
  const emailFirst = (user.email ?? '').split('@')[0]
  const firstName = rawFirst || emailFirst

  type DimDef = { key: string; label: string; color: string; invert?: boolean }
  const DIMS: DimDef[] = [
    { key: 'nutrition',    label: dims.nutrition,  color: '--gold-deep'  },
    { key: 'sleep',        label: dims.sleep,      color: '--indigo'     },
    { key: 'recovery',     label: dims.recovery,   color: '--sage'       },
    { key: 'stress',       label: dims.calm,       color: '--rose',      invert: true },
    { key: 'movement',     label: dims.movement,   color: '--clay'       },
    { key: 'energy',       label: dims.energy,     color: '--sage'       },
    { key: 'emotional',    label: dims.emotional,  color: '--indigo'     },
    { key: 'life_balance', label: dims.balance,    color: '--sage'       },
    { key: 'purpose',      label: dims.purpose,    color: '--gold-deep'  },
  ]

  const radarVals = latestScores
    ? [
        latestScores.nutrition, latestScores.sleep, latestScores.recovery,
        100 - latestScores.stress, latestScores.movement,
        latestScores.emotional, latestScores.life_balance,
        latestScores.purpose, latestScores.energy,
      ]
    : [60, 65, 60, 60, 55, 65, 60, 55, 60]

  // Dimension values array in same order as WellnessOrb DIM_NODES
  const dimValues: number[] | undefined = latestScores
    ? [
        latestScores.nutrition,
        latestScores.sleep,
        latestScores.recovery,
        100 - latestScores.stress,
        latestScores.movement,
        latestScores.energy,
        latestScores.emotional,
        latestScores.life_balance,
        latestScores.purpose,
      ]
    : undefined

  const stateGradients: Record<string, string> = {
    HIGH_PERFORMANCE: 'linear-gradient(160deg, oklch(0.96 0.04 155 / 0.35) 0%, var(--canvas) 50%, oklch(0.96 0.03 200 / 0.2) 100%)',
    BALANCED:         'linear-gradient(160deg, var(--canvas) 0%, oklch(0.97 0.02 155 / 0.15) 100%)',
    STRESS_DOMINANT:  'linear-gradient(160deg, oklch(0.97 0.03 15 / 0.2) 0%, var(--canvas) 100%)',
    SLEEP_DEFICIT:    'linear-gradient(160deg, oklch(0.97 0.03 270 / 0.2) 0%, var(--canvas) 100%)',
    LOW_RECOVERY:     'linear-gradient(160deg, oklch(0.97 0.03 200 / 0.2) 0%, var(--canvas) 100%)',
    ENERGY_IMBALANCE: 'linear-gradient(160deg, oklch(0.97 0.03 240 / 0.15) 0%, var(--canvas) 100%)',
  }
  const ambientBg = stateGradients[state] ?? 'var(--canvas)'

  const analysedDate = latestAssessment?.completed_at
    ? new Date(latestAssessment.completed_at).toLocaleDateString(dateLocale, { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div
      className="wrap cinematic-bg"
      style={{ paddingTop: 28, paddingBottom: 88, minHeight: 'calc(100dvh - 60px)' }}
    >
      {/* ── Greeting bar ──────────────────────────────────────── */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div className="anim-fade-up">
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            <span style={{ color: 'var(--sage-deep)' }}>&#9672;</span> {s.title}
          </div>
          <h1 className="h1">{s.greeting}, {firstName}.</h1>
          {!hasData && <p className="lede" style={{ marginTop: 8 }}>{s.noDataDesc}</p>}
        </div>
        <a href="/assessment" className="btn btn-sage" style={{ boxShadow: '0 4px 16px rgba(78,122,106,.35)' }}>
          {hasData ? s.newAssessment : s.startAssessment} <span>&#8594;</span>
        </a>
      </div>

      {hasData ? (
        <>
          {/* ── HERO: Orb + Score overlay ─────────────────────── */}
          <div className="hero-premium" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 0,
              alignItems: 'center',
              minHeight: 280,
            }}>
              {/* Left — score summary glass card */}
              <div style={{ padding: '32px 24px 32px 32px' }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  <span style={{ color: 'var(--sage)' }}>&#9675;</span> {s.currentState}
                </div>
                <div className="score-badge" style={{ marginBottom: 16 }}>
  