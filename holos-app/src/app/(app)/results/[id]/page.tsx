'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { RadarChart } from '@/components/ui/RadarChart'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { HeroReveal, RevealSection, TabReveal } from '@/components/ui/ResultsRevealWrapper'
import type { DimensionScores, WellnessState, Recommendation } from '@/lib/types'
import { getStateDef } from '@/engine/state-machine'
import { FRAMEWORK_REGISTRY } from '@/frameworks'
import { useLanguage } from '@/contexts/LanguageContext'
import { detectPersona, computeTrajectory, PERSONA_META, TRAJECTORY_COLORS } from '@/engine/intelligence-engine'
import type { PersonaResult, TrajectoryResult, ConfidenceLevel } from '@/engine/intelligence-engine'

// 3D Orb — loaded client-side only (WebGL)
const WellnessOrbR3F = dynamic(
  () => import('@/components/ui/WellnessOrbR3F').then(m => m.WellnessOrbR3F),
  { ssr: false, loading: () => <OrbPlaceholder /> }
)

// Local error boundary for WebGL — prevents global error boundary from triggering
class OrbErrorBoundary extends (require('react') as typeof import('react')).Component<
  { children: React.ReactNode },
  { crashed: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { crashed: false }
  }
  static getDerivedStateFromError() { return { crashed: true } }
  render() {
    if (this.state.crashed) return <OrbPlaceholder />
    return this.props.children
  }
}

function OrbPlaceholder() {
  return (
    <div style={{
      width: 240, height: 240, borderRadius: '50%',
      background: 'radial-gradient(ellipse at 35% 30%, rgba(122,158,142,0.25) 0%, rgba(122,158,142,0.06) 60%, transparent 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--sage-deep)', fontSize: 48,
    }}>◈</div>
  )
}

// Confidence badge
const CONFIDENCE_LABELS: Record<ConfidenceLevel, Record<string, string>> = {
  high:   { en: 'High confidence',   ru: 'Высокая точность',  he: 'ביטחון גבוה',   de: 'Hohe Genauigkeit'  },
  medium: { en: 'Medium confidence', ru: 'Средняя точность',  he: 'ביטחון בינוני', de: 'Mittlere Genauigkeit'},
  low:    { en: 'Preliminary',       ru: 'Предварительно',    he: 'ראשוני',         de: 'Vorläufig'         },
}
function ConfidenceBadge({ level, locale = 'en' }: { level: ConfidenceLevel; locale?: string }) {
  const meta: Record<ConfidenceLevel, { label: string; bg: string; color: string }> = {
    high:   { label: CONFIDENCE_LABELS.high[locale]   ?? 'High confidence',   bg: 'rgba(78,122,106,.12)', color: 'var(--sage-deep)' },
    medium: { label: CONFIDENCE_LABELS.medium[locale] ?? 'Medium confidence', bg: 'rgba(196,165,90,.12)', color: 'var(--gold-deep)' },
    low:    { label: CONFIDENCE_LABELS.low[locale]    ?? 'Preliminary',       bg: 'rgba(180,80,80,.10)', color: 'var(--rose)' },
  }
  const m = meta[level]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 100,
      background: m.bg, color: m.color,
      fontFamily: 'var(--font-mono)', fontSize: '.73rem',
      textTransform: 'uppercase', letterSpacing: '.08em',
      fontWeight: 600,
    }}>
      ● {m.label}
    </span>
  )
}

interface ResultData {
  assessment: { framework: string; wellness_state: WellnessState; composite_score: number }
  scores: DimensionScores
  fwResult: {
    narrative: string
    dosha_vata?: number; dosha_pitta?: number; dosha_kapha?: number; dominant_dosha?: string
    element_wood?: number; element_fire?: number; element_earth?: number; element_metal?: number; element_water?: number
  }
  recommendations: (Recommendation & { id: string; status: string })[]
  snapshots?: Array<{ composite: number; snapshot_date: string }>
}

const DIM_COLORS: Record<string, string> = {
  nutrition:'--gold-deep', sleep:'--indigo', recovery:'--sage', stress:'--rose',
  movement:'--clay', emotional:'--sage', life_balance:'--gold', purpose:'--indigo', energy:'--sage',
}

// ── Localized intelligence labels (client-side lookup) ─────────────────────
const PERSONA_NAMES_L: Record<string, Record<string, string>> = {
  Optimizer:  { en:'Optimizer',   ru:'Оптимизатор',   he:'אופטימיזר',   de:'Optimierer'    },
  Seeker:     { en:'Seeker',      ru:'Искатель',      he:'מחפש',         de:'Suchender'     },
  Builder:    { en:'Builder',     ru:'Строитель',     he:'בונה',         de:'Erbauer'       },
  Recoverer:  { en:'Recoverer',   ru:'Восстановитель',he:'מתאושש',       de:'Regenerierer'  },
  Explorer:   { en:'Explorer',    ru:'Исследователь', he:'חוקר',         de:'Entdecker'     },
  Stabilizer: { en:'Stabilizer',  ru:'Стабилизатор',  he:'מייצב',        de:'Stabilisierer' },
}
const PERSONA_TAGLINES_L: Record<string, Record<string, string>> = {
  Optimizer:  { en:'Peak performance seeker',     ru:'Стремление к максимальной эффективности', he:'שואף לביצועים שיא',         de:'Leistungsstreber'          },
  Seeker:     { en:'Meaning and depth explorer',  ru:'Исследователь смысла и глубины',          he:'חוקר משמעות ועומק',         de:'Sinn- und Tiefenerforscher'},
  Builder:    { en:'Systematic gap-closer',       ru:'Системный устранитель пробелов',          he:'סוגר פערים שיטתי',         de:'Systematischer Lückenschließer'},
  Recoverer:  { en:'Rebuilding with intention',   ru:'Восстановление с намерением',             he:'בנייה מחדש בכוונה',         de:'Bewusstes Wiederaufbauen'  },
  Explorer:   { en:'Curious wellness pioneer',    ru:'Любознательный пионер здоровья',          he:'חלוץ בריאות סקרן',         de:'Neugieriger Wellness-Pionier'},
  Stabilizer: { en:'Consistency champion',        ru:'Чемпион последовательности',              he:'אלוף העקביות',              de:'Beständigkeitschampion'    },
}
const TRAJ_LABELS_L: Record<string, Record<string, string>> = {
  first_session: { en:'First Session',  ru:'Первая сессия',    he:'סשן ראשון',      de:'Erste Sitzung'  },
  improving:     { en:'Improving',      ru:'Улучшение',        he:'משתפר',           de:'Verbesserung'   },
  recovering:    { en:'Recovering',     ru:'Восстановление',   he:'מתאושש',          de:'Erholung'       },
  plateauing:    { en:'Plateauing',     ru:'Плато',            he:'מישורי',          de:'Plateau'        },
  declining:     { en:'Declining',      ru:'Снижение',         he:'בירידה',          de:'Rückgang'       },
  unstable:      { en:'Unstable',       ru:'Нестабильный',     he:'לא יציב',         de:'Instabil'       },
}

// ── Localized framework labels ─────────────────────────────────────────────
const FW_LABELS_L: Record<string, Record<string, string>> = {
  'evidence-based': { en:'Evidence-Based Science', ru:'Доказательная наука',     he:'מדע מבוסס ראיות',      de:'Evidenzbasierte Wissenschaft' },
  ayurveda:         { en:'Ayurveda',               ru:'Аюрведа',                 he:'אורוודה',              de:'Ayurveda'                     },
  rambam:           { en:'Rambam Medicine',         ru:'Медицина Рамбама',        he:'רפואת הרמב"ם',         de:'Rambam-Medizin'               },
  hippocrates:      { en:'Hippocratic Medicine',    ru:'Медицина Гиппократа',     he:'הרפואה ההיפוקרטית',    de:'Hippokratische Medizin'       },
  avicenna:         { en:'Ibn Sina (Avicenna)',      ru:'Ибн Сина (Авиценна)',     he:'אבן סינא (אביצנה)',    de:'Ibn Sina (Avicenna)'          },
  daoist:           { en:'Daoist Wellness',          ru:'Даосское здоровье',       he:'בריאות דאואיסטית',     de:'Daoistisches Wohlbefinden'    },
  tibetan:          { en:'Tibetan Medicine',         ru:'Тибетская медицина',      he:'רפואה טיבטית',         de:'Tibetische Medizin'           },
  swarga:           { en:'Swarga Integral Wellness', ru:'Интегральное здоровье Сварга', he:'בריאות אינטגרלית סוורגה', de:'Swarga Integrale Wellness' },
  tcm:              { en:'Traditional Chinese Medicine', ru:'Традиционная китайская медицина', he:'רפואה סינית מסורתית', de:'Traditionelle Chinesische Medizin' },
  functional:       { en:'Functional Medicine',     ru:'Функциональная медицина', he:'רפואה פונקציונלית',    de:'Funktionelle Medizin'         },
  biorhythm:        { en:'Biorhythm',               ru:'Биоритм',                 he:'ביוריתם',              de:'Biorhythmus'                  },
  naturopathy:      { en:'Naturopathy',              ru:'Натуропатия',             he:'נטורופתיה',            de:'Naturheilkunde'               },
  integrative:      { en:'Integrative Medicine',    ru:'Интегративная медицина',  he:'רפואה אינטגרטיבית',    de:'Integrative Medizin'          },
}

// ── Localized wellness state labels ───────────────────────────────────────
const STATE_LABELS_L: Record<string, Record<string, string>> = {
  HIGH_PERFORMANCE:     { en:'High Performance',     ru:'Высокая эффективность',   he:'ביצועים גבוהים',        de:'Hochleistung'           },
  OPTIMIZATION:         { en:'Optimization Mode',    ru:'Режим оптимизации',       he:'מצב אופטימיזציה',       de:'Optimierungsmodus'      },
  BALANCED:             { en:'Balanced',              ru:'Сбалансированный',        he:'מאוזן',                 de:'Ausgewogen'             },
  MAINTENANCE:          { en:'Maintenance',           ru:'Поддержание',             he:'תחזוקה',                de:'Erhaltung'              },
  SLEEP_DEFICIT:        { en:'Sleep Deficit',         ru:'Дефицит сна',             he:'חוסר שינה',             de:'Schlafdefizit'          },
  STRESS_DOMINANT:      { en:'Stress Dominant',       ru:'Доминирует стресс',       he:'דומיננטיות של לחץ',     de:'Stressdominant'         },
  LOW_RECOVERY:         { en:'Low Recovery',          ru:'Слабое восстановление',   he:'התאוששות נמוכה',        de:'Geringe Erholung'       },
  ENERGY_IMBALANCE:     { en:'Energy Imbalance',      ru:'Дисбаланс энергии',       he:'חוסר איזון אנרגטי',    de:'Energieungleichgewicht' },
  INFLAMMATORY_PATTERN: { en:'Inflammatory Pattern',  ru:'Воспалительный паттерн',  he:'דפוס דלקתי',            de:'Entzündungsmuster'      },
  LIFESTYLE_IMPROVEMENT:{ en:'Lifestyle Improvement', ru:'Улучшение образа жизни',  he:'שיפור אורח חיים',       de:'Lebensstilverbesserung' },
}

// ── Localized recommendation category labels ───────────────────────────────
const REC_CATEGORY_L: Record<string, Record<string, string>> = {
  SLEEP:       { en:'Sleep',        ru:'Сон',             he:'שינה',        de:'Schlaf'       },
  MOVEMENT:    { en:'Movement',     ru:'Движение',        he:'תנועה',       de:'Bewegung'     },
  NUTRITION:   { en:'Nutrition',    ru:'Питание',         he:'תזונה',       de:'Ernährung'    },
  RECOVERY:    { en:'Recovery',     ru:'Восстановление',  he:'התאוששות',    de:'Erholung'     },
  EMOTIONAL: 