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
import { getRecTitle } from '@/lib/i18n/recommendation-titles'

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
  recommendations: (Recommendation & { id: string; rec_id?: string; status: string })[]
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
  EMOTIONAL:   { en:'Emotional',    ru:'Эмоции',          he:'רגשי',        de:'Emotional'    },
  STRESS:      { en:'Calm',         ru:'Спокойствие',     he:'שלווה',       de:'Gelassenheit' },
  CALM:        { en:'Calm',         ru:'Спокойствие',     he:'שלווה',       de:'Gelassenheit' },
  BALANCE:     { en:'Balance',      ru:'Баланс',          he:'איזון',       de:'Balance'      },
  PURPOSE:     { en:'Purpose',      ru:'Цель',            he:'מטרה',        de:'Zweck'        },
  ENERGY:      { en:'Energy',       ru:'Энергия',         he:'אנרגיה',      de:'Energie'      },
  MINDFULNESS: { en:'Mindfulness',  ru:'Осознанность',    he:'מיינדפולנס',  de:'Achtsamkeit'  },
}

// ── Localized persona drives + coaching styles ─────────────────────────────
const PERSONA_DRIVE_L: Record<string, Record<string, string>> = {
  Optimizer:  { en:'Performance excellence',  ru:'Стремление к совершенству',     he:'מצוינות בביצועים',        de:'Leistungsexzellenz'         },
  Recoverer:  { en:'Rebuilding foundations',  ru:'Восстановление основ',          he:'בניית יסודות מחדש',       de:'Grundlagen wiederherstellen'},
  Seeker:     { en:'Meaning and depth',       ru:'Смысл и глубина',               he:'משמעות ועומק',            de:'Sinn und Tiefe'             },
  Builder:    { en:'Structured gap-closing',  ru:'Системное устранение пробелов', he:'סגירת פערים שיטתית',      de:'Systematisches Lückenschließen'},
  Stabilizer: { en:'Consistent wellbeing',    ru:'Стабильное благополучие',       he:'רווחה עקבית',             de:'Beständiges Wohlbefinden'   },
  Explorer:   { en:'Discovery and learning',  ru:'Открытие и обучение',           he:'גילוי ולמידה',            de:'Entdeckung und Lernen'      },
}
const PERSONA_COACHING_L: Record<string, Record<string, string>> = {
  Optimizer:  { en:'Challenge and precision', ru:'Вызов и точность',         he:'אתגר ודיוק',          de:'Herausforderung und Präzision'  },
  Recoverer:  { en:'Compassionate pacing',    ru:'Сострадательный темп',     he:'קצב חומל',            de:'Mitfühlendes Tempo'             },
  Seeker:     { en:'Philosophical approach',  ru:'Философский подход',       he:'גישה פילוסופית',      de:'Philosophischer Ansatz'         },
  Builder:    { en:'Systematic protocols',    ru:'Системные протоколы',      he:'פרוטוקולים שיטתיים',  de:'Systematische Protokolle'       },
  Stabilizer: { en:'Habits and routines',     ru:'Привычки и распорядок',    he:'הרגלים ושגרה',        de:'Gewohnheiten und Routinen'      },
  Explorer:   { en:'Diverse frameworks',      ru:'Разнообразие подходов',    he:'מסגרות מגוונות',      de:'Diverse Frameworks'             },
}

// ── Localized trajectory description (with interpolated delta) ─────────────
function getTrajectoryLabelL(direction: string, delta: number, locale: string): string {
  const abs = Math.abs(delta)
  const TEMPLATES: Record<string, Record<string, string | ((d: number) => string)>> = {
    first_session: { en:'First assessment — baseline is set', ru:'Первая оценка — базовая линия установлена', he:'הערכה ראשונה — קו הבסיס נקבע', de:'Erste Bewertung — Basislinie gesetzt' },
    unstable:  { en:'Oscillating — build consistency to amplify gains', ru:'Нестабильно — последовательность усилит прогресс', he:'תנודתי — עקביות תגביר את ההישגים', de:'Schwankend — Beständigkeit verstärkt Fortschritte' },
    recovering:{ en:(d)=>`Recovering — up ${d} pts from baseline`, ru:(d)=>`Восстановление — +${d} очков от базового уровня`, he:(d)=>`מתאושש — +${d} נקודות מקו הבסיס`, de:(d)=>`Erholung — +${d} Pkt. vom Ausgangswert` },
    improving: { en:(d)=>`Improving — up ${d} pts since last assessment`, ru:(d)=>`Улучшение — +${d} очков с последней оценки`, he:(d)=>`משתפר — +${d} נקודות מאז ההערכה האחרונה`, de:(d)=>`Verbesserung — +${d} Pkt. seit der letzten Bewertung` },
    declining: { en:(d)=>`Declining — down ${d} pts — let's look at what shifted`, ru:(d)=>`Снижение — -${d} очков — посмотрим, что изменилось`, he:(d)=>`בירידה — -${d} נקודות — נבדוק מה השתנה`, de:(d)=>`Rückgang — -${d} Pkt. — schauen wir, was sich verändert hat` },
    plateauing:{ en:'Stable — solid foundation, ready to level up', ru:'Стабильно — прочная основа, готов к следующему уровню', he:'יציב — יסוד מוצק, מוכן לרמה הבאה', de:'Stabil — solide Basis, bereit für nächsten Level' },
  }
  const dir = TEMPLATES[direction]
  if (!dir) return direction
  const tpl = dir[locale] ?? dir['en']
  if (typeof tpl === 'function') return (tpl as (d: number) => string)(abs)
  return tpl as string
}

// ── Localized wellness state descriptions ──────────────────────────────────
const STATE_DESCRIPTIONS_L: Record<string, Record<string, string>> = {
  HIGH_PERFORMANCE: {
    en: 'All systems operating at peak. Your body and mind are in rare alignment.',
    ru: 'Все системы работают на пике. Ваше тело и разум находятся в редкой гармонии.',
    he: 'כל המערכות פועלות בשיא. גופך ומוחך נמצאים בהתאמה נדירה.',
    de: 'Alle Systeme arbeiten auf Höchstleistung. Körper und Geist sind in seltener Harmonie.',
  },
  OPTIMIZATION: {
    en: 'Strong foundation with clear, targeted areas to refine.',
    ru: 'Прочная основа с чёткими, конкретными областями для совершенствования.',
    he: 'יסוד חזק עם תחומים ממוקדים וברורים לשיפור.',
    de: 'Solides Fundament mit klaren, gezielten Bereichen zur Verfeinerung.',
  },
  BALANCED: {
    en: 'Your wellness ecosystem is in stable equilibrium.',
    ru: 'Ваша экосистема здоровья находится в стабильном равновесии.',
    he: 'מערכת הבריאות שלך נמצאת בשיווי משקל יציב.',
    de: 'Ihr Wellness-Ökosystem befindet sich in stabilem Gleichgewicht.',
  },
  MAINTENANCE: {
    en: 'Good baseline. Focus on consistency to lock in gains.',
    ru: 'Хорошая база. Сосредоточьтесь на последовательности, чтобы закрепить прогресс.',
    he: 'בסיס טוב. התמקד בעקביות כדי לנעל את ההישגים.',
    de: 'Gute Ausgangsbasis. Fokus auf Beständigkeit, um Fortschritte zu festigen.',
  },
  SLEEP_DEFICIT: {
    en: 'Sleep is the primary bottleneck. Everything else improves when sleep does.',
    ru: 'Сон — основное ограничение. Всё остальное улучшается вместе с ним.',
    he: 'שינה היא צוואר הבקבוק הראשי. כל השאר משתפר כשהשינה משתפרת.',
    de: 'Schlaf ist der primäre Engpass. Alles andere verbessert sich, wenn der Schlaf es tut.',
  },
  STRESS_DOMINANT: {
    en: 'High stress is overriding your wellness capacity. Recovery is priority one.',
    ru: 'Высокий стресс подавляет вашу способность к благополучию. Восстановление — приоритет №1.',
    he: 'לחץ גבוה מבטל את יכולת הבריאות שלך. התאוששות היא עדיפות ראשונה.',
    de: 'Hoher Stress überlagert Ihre Wellness-Kapazität. Erholung hat oberste Priorität.',
  },
  LOW_RECOVERY: {
    en: 'Your system needs restoration. Effort without recovery leads to depletion.',
    ru: 'Вашей системе нужно восстановление. Усилия без отдыха ведут к истощению.',
    he: 'המערכת שלך זקוקה לשיקום. מאמץ ללא התאוששות מוביל לדלדול.',
    de: 'Ihr System benötigt Erholung. Anstrengung ohne Regeneration führt zur Erschöpfung.',
  },
  ENERGY_IMBALANCE: {
    en: 'Energy fluctuations point to metabolic or sleep irregularities.',
    ru: 'Колебания энергии указывают на метаболические или связанные со сном нарушения.',
    he: 'תנודות אנרגיה מצביעות על חוסר סדירות מטבולית או הקשורה לשינה.',
    de: 'Energieschwankungen deuten auf metabolische oder schlafbedingte Unregelmäßigkeiten hin.',
  },
  INFLAMMATORY_PATTERN: {
    en: 'Nutritional and movement signals suggest chronic low-grade inflammation.',
    ru: 'Сигналы питания и двигательной активности указывают на хроническое воспаление низкой степени.',
    he: 'אותות תזונה ותנועה מרמזים על דלקת כרונית ברמה נמוכה.',
    de: 'Ernährungs- und Bewegungssignale deuten auf chronische leichtgradige Entzündung hin.',
  },
  LIFESTYLE_IMPROVEMENT: {
    en: 'Multiple dimensions need attention. Small consistent steps will compound.',
    ru: 'Несколько измерений требуют внимания. Небольшие последовательные шаги дадут накопительный эффект.',
    he: 'מספר ממדים דורשים תשומת לב. צעדים קטנים ועקביים ייצברו לתוצאות גדולות.',
    de: 'Mehrere Dimensionen benötigen Aufmerksamkeit. Kleine, konsequente Schritte wirken sich kumulativ aus.',
  },
}

// ── Localized framework narratives ────────────────────────────────────────
type FwResult = {
  narrative?: string
  dosha_vata?: number; dosha_pitta?: number; dosha_kapha?: number; dominant_dosha?: string
  element_wood?: number; element_fire?: number; element_earth?: number; element_metal?: number; element_water?: number
}

function getLocalizedNarrative(frameworkId: string, fwResult: FwResult | null | undefined, _scores: unknown, locale: string): string {
  if (locale === 'en') return fwResult?.narrative ?? '—'

  // Ayurveda — dynamic dosha-based narrative
  if (frameworkId === 'ayurveda' && fwResult?.dominant_dosha) {
    const d = fwResult.dominant_dosha
    const vata = fwResult.dosha_vata ?? 0
    const pitta = fwResult.dosha_pitta ?? 0
    const kapha = fwResult.dosha_kapha ?? 0
    const doshaNamesRU: Record<string, string> = { Vata: 'Вата', Pitta: 'Питта', Kapha: 'Капха' }
    const doshaNamesHE: Record<string, string> = { Vata: 'ואטה', Pitta: 'פיטה', Kapha: 'קאפה' }
    const doshaNamesDE: Record<string, string> = { Vata: 'Vata', Pitta: 'Pitta', Kapha: 'Kapha' }
    if (locale === 'ru') {
      const dn = doshaNamesRU[d] ?? d
      return `Аюрведа рассматривает ваш профиль здоровья через призму баланса дош. Ваша доминирующая доша — ${dn} (${Math.round(vata > pitta && vata > kapha ? vata : pitta > kapha ? pitta : kapha)}%), Питта ${Math.round(pitta)}%, Капха ${Math.round(kapha)}%. Это конституциональное соотношение определяет ваши сильные стороны и области для заботы. Рекомендации согласованы с вашей природной пракрити для восстановления внутреннего равновесия.`
    }
    if (locale === 'he') {
      const dn = doshaNamesHE[d] ?? d
      return `האיורוודה בוחנת את פרופיל הבריאות שלך דרך עדשת איזון הדושות. הדושה הדומיננטית שלך היא ${dn} (${Math.round(vata > pitta && vata > kapha ? vata : pitta > kapha ? pitta : kapha)}%), פיטה ${Math.round(pitta)}%, קאפה ${Math.round(kapha)}%. יחס קונסטיטוציונלי זה מגדיר את חוזקותיך ואת תחומי הטיפול. ההמלצות מותאמות לפרקריטי הטבעית שלך לשיקום שיווי המשקל הפנימי.`
    }
    if (locale === 'de') {
      const dn = doshaNamesDE[d] ?? d
      return `Das Ayurveda betrachtet Ihr Gesundheitsprofil durch das Prisma des Dosha-Gleichgewichts. Ihr dominantes Dosha ist ${dn} (${Math.round(vata > pitta && vata > kapha ? vata : pitta > kapha ? pitta : kapha)}%), Pitta ${Math.round(pitta)}%, Kapha ${Math.round(kapha)}%. Dieses konstitutionelle Verhältnis definiert Ihre Stärken und Pflegebereiche. Die Empfehlungen sind auf Ihre natürliche Prakriti abgestimmt, um das innere Gleichgewicht wiederherzustellen.`
    }
  }

  // TCM — element-based narrative
  if (frameworkId === 'tcm' && fwResult?.element_wood != null) {
    const dominant = (['wood','fire','earth','metal','water'] as const)
      .map(e => ({ e, v: (fwResult as Record<string,number>)[`element_${e}`] ?? 0 }))
      .sort((a, b) => b.v - a.v)[0]
    const elementNamesRU: Record<string,string> = { wood:'Дерево', fire:'Огонь', earth:'Земля', metal:'Металл', water:'Вода' }
    const elementNamesHE: Record<string,string> = { wood:'עץ', fire:'אש', earth:'אדמה', metal:'מתכת', water:'מים' }
    const elementNamesDE: Record<string,string> = { wood:'Holz', fire:'Feuer', earth:'Erde', metal:'Metall', water:'Wasser' }
    if (locale === 'ru') return `Традиционная китайская медицина исследует ваши жизненные силы через систему пяти элементов. Доминирующий элемент — ${elementNamesRU[dominant.e] ?? dominant.e} (${Math.round(dominant.v)}%). Ваш паттерн Ци отражает уникальное взаимодействие энергий, формирующее ваше здоровье. Рекомендации направлены на гармонизацию потока энергии и укрепление слабых элементов.`
    if (locale === 'he') return `הרפואה הסינית המסורתית בוחנת את כוחות חייך דרך מערכת חמשת היסודות. היסוד הדומיננטי הוא ${elementNamesHE[dominant.e] ?? dominant.e} (${Math.round(dominant.v)}%). דפוס הצ'י שלך משקף אינטראקציה ייחודית של אנרגיות המעצבות את בריאותך. ההמלצות מכוונות להרמוניזציה של זרימת האנרגיה וחיזוק היסודות החלשים.`
    if (locale === 'de') return `Die Traditionelle Chinesische Medizin untersucht Ihre Lebenskräfte durch das System der Fünf Elemente. Das dominante Element ist ${elementNamesDE[dominant.e] ?? dominant.e} (${Math.round(dominant.v)}%). Ihr Qi-Muster spiegelt eine einzigartige Energieinteraktion wider, die Ihre Gesundheit prägt. Die Empfehlungen zielen auf Harmonisierung des Energieflusses und Stärkung schwacher Elemente ab.`
  }

  // Generic per-framework localized summaries
  const GENERIC_NARRATIVES: Record<string, Record<string, string>> = {
    rambam: {
      ru: `Медицина Рамбама рассматривает здоровье как гармоничное единство тела и разума. Ваши показатели анализируются через восемь регуляторов здоровья: питание, движение, сон, эмоциональное состояние, воздух, вода, очищение и душевный покой. Рекомендации основаны на принципах умеренности и мудрого образа жизни.`,
      he: `רפואת הרמב"ם רואה את הבריאות כאחדות הרמונית של גוף ונפש. הנתונים שלך מנותחים דרך שמונה מווסתי הבריאות: תזונה, תנועה, שינה, מצב רגשי, אוויר, מים, ניקוי ושקט נפשי. ההמלצות מבוססות על עקרונות המתינות ואורח חיים חכם.`,
      de: `Die Rambam-Medizin betrachtet Gesundheit als harmonische Einheit von Körper und Geist. Ihre Werte werden durch acht Gesundheitsregulatoren analysiert: Ernährung, Bewegung, Schlaf, emotionaler Zustand, Luft, Wasser, Reinigung und Seelenfrieden. Die Empfehlungen basieren auf den Grundsätzen der Mäßigung und des weisen Lebensstils.`,
    },
    avicenna: {
      ru: `Ибн Сина считал, что темперамент — основа здоровья. Ваш индивидуальный мизадж (конституциональный тип) определяет предрасположенности и ресурсы вашего организма. Анализ показывает, как ваши пищевые привычки, режим сна и управление стрессом соотносятся с вашей врождённой природой.`,
      he: `אבן סינא סבר שמזג הוא יסוד הבריאות. המיזג (הסוג הקונסטיטוציונלי) הייחודי שלך קובע את הנטיות ומשאבי גופך. הניתוח מראה כיצד הרגלי האכילה, שגרת השינה וניהול הלחץ שלך מתקשרים לטבעך המולד.`,
      de: `Ibn Sina war der Ansicht, dass das Temperament die Grundlage der Gesundheit ist. Ihre individuelle Mizaj (Konstitutionstyp) bestimmt die Veranlagungen und Ressourcen Ihres Körpers. Die Analyse zeigt, wie Ihre Ernährungsgewohnheiten, Schlafrhythmus und Stressmanagement mit Ihrer angeborenen Natur zusammenpassen.`,
    },
    hippocrates: {
      ru: `Гиппократова медицина исследует баланс четырёх гуморов в контексте вашего образа жизни. Ваши показатели отражают соотношение жизненных сил и указывают на области, требующие внимания. Природа обладает целительной силой — наши рекомендации направлены на создание условий для самовосстановления.`,
      he: `הרפואה ההיפוקרטית בוחנת את איזון ארבעת ההומורים בהקשר של אורח חייך. הנתונים שלך משקפים את יחס כוחות החיים ומצביעים על תחומים הדורשים תשומת לב. לטבע כוח ריפוי — ההמלצות שלנו מכוונות ליצור תנאים לריפוי עצמי.`,
      de: `Die Hippokratische Medizin untersucht das Gleichgewicht der vier Körpersäfte im Kontext Ihres Lebensstils. Ihre Werte spiegeln das Verhältnis der Lebenskräfte wider und zeigen Bereiche, die Aufmerksamkeit erfordern. Die Natur besitzt Heilkraft — unsere Empfehlungen zielen darauf ab, Bedingungen für die Selbstheilung zu schaffen.`,
    },
    daoist: {
      ru: `Даосская медицина видит здоровье как плавное течение жизненной энергии Ци в состоянии У-Вэй — естественного действия без усилий. Ваши показатели отражают, насколько вы находитесь в гармонии с природными ритмами. Рекомендации направлены на восстановление естественного потока и устранение препятствий.`,
      he: `הרפואה הדאואיסטית רואה את הבריאות כזרימה חלקה של אנרגיית חיים (צ'י) במצב של וו-ווי — פעולה טבעית ללא מאמץ. הנתונים שלך משקפים עד כמה אתה בהרמוניה עם המקצבים הטבעיים. ההמלצות מכוונות לשיקום הזרימה הטבעית וסילוק המכשולים.`,
      de: `Die Daoistische Medizin sieht Gesundheit als fließende Bewegung der Lebensenergie Qi im Zustand des Wu-Wei — natürliches Handeln ohne Anstrengung. Ihre Werte spiegeln wider, inwieweit Sie mit den natürlichen Rhythmen in Harmonie sind. Die Empfehlungen zielen auf die Wiederherstellung des natürlichen Flusses und die Beseitigung von Hindernissen ab.`,
    },
    tibetan: {
      ru: `Тибетская медицина рассматривает здоровье через равновесие трёх нъеп — Ветра (Лунг), Желчи (Трипа) и Слизи (Бекен). Ваши показатели указывают на текущее состояние этих жизненных принципов. Рекомендации интегрируют диетические практики, образ жизни и медитативные техники тибетской традиции.`,
      he: `הרפואה הטיבטית בוחנת את הבריאות דרך שיווי המשקל של שלושת הניא-פה — רוח (לונג), מרה (טריפה) ורירית (בקן). הנתונים שלך מצביעים על המצב הנוכחי של עקרונות חיים אלה. ההמלצות משלבות פרקטיקות תזונה, אורח חיים וטכניקות מדיטציה מהמסורת הטיבטית.`,
      de: `Die Tibetische Medizin betrachtet Gesundheit durch das Gleichgewicht der drei Nyepa — Wind (Lung), Galle (Tripa) und Schleim (Beken). Ihre Werte zeigen den aktuellen Zustand dieser Lebensprinzipien. Die Empfehlungen integrieren Ernährungspraktiken, Lebensstil und meditative Techniken der tibetischen Tradition.`,
    },
    swarga: {
      ru: `Интегральная система Сварга объединяет ведическую мудрость с современной наукой о благополучии. Ваш профиль оценивается по семи измерениям: физическому, энергетическому, ментальному, эмоциональному, творческому, социальному и духовному. Рекомендации направлены на гармонизацию всех уровней вашего существа.`,
      he: `מערכת סוורגה האינטגרלית משלבת חוכמה ודית עם מדע הבריאות המודרני. הפרופיל שלך מוערך לפי שבעה ממדים: פיזי, אנרגטי, מנטלי, רגשי, יצירתי, חברתי ורוחני. ההמלצות מכוונות להרמוניזציה של כל רמות ישותך.`,
      de: `Das integrale Swarga-System verbindet vedische Weisheit mit moderner Wellness-Wissenschaft. Ihr Profil wird nach sieben Dimensionen bewertet: körperlich, energetisch, mental, emotional, kreativ, sozial und spirituell. Die Empfehlungen zielen auf die Harmonisierung aller Ebenen Ihres Seins ab.`,
    },
    functional: {
      ru: `Функциональная медицина рассматривает ваш организм как взаимосвязанную систему, а не набор изолированных симптомов. Анализ ваших показателей выявляет коренные причины дисбаланса. Персонализированные рекомендации направлены на оптимизацию биохимических процессов и устранение глубинных факторов.`,
      he: `הרפואה הפונקציונלית רואה את גופך כמערכת מקושרת ולא כאוסף של תסמינים מבודדים. ניתוח הנתונים שלך חושף את הסיבות השורשיות של חוסר האיזון. ההמלצות המותאמות אישית מכוונות לייעול התהליכים הביוכימיים ולטיפול בגורמים העמוקים.`,
      de: `Die Funktionelle Medizin betrachtet Ihren Körper als vernetztes System, nicht als Sammlung isolierter Symptome. Die Analyse Ihrer Werte deckt die Grundursachen des Ungleichgewichts auf. Personalisierte Empfehlungen zielen auf die Optimierung biochemischer Prozesse und die Beseitigung tiefer liegender Faktoren ab.`,
    },
    integrative: {
      ru: `Интегративная медицина объединяет лучшее из доказательной науки и традиционных систем исцеления. Ваши показатели оцениваются с точки зрения физического, психологического и социального здоровья одновременно. Рекомендации сочетают научно обоснованные протоколы с проверенными временем практиками.`,
      he: `הרפואה האינטגרטיבית משלבת את הטוב ביותר מהמדע המבוסס ראיות ומהמערכות המסורתיות של ריפוי. הנתונים שלך מוערכים מבחינת הבריאות הגופנית, הפסיכולוגית והחברתית בו-זמנית. ההמלצות משלבות פרוטוקולים מדעיים עם פרקטיקות שעמדו במבחן הזמן.`,
      de: `Die Integrative Medizin verbindet das Beste aus evidenzbasierter Wissenschaft und traditionellen Heilsystemen. Ihre Werte werden gleichzeitig aus körperlicher, psychologischer und sozialer Gesundheitsperspektive bewertet. Die Empfehlungen kombinieren wissenschaftlich fundierte Protokolle mit zeiterprobten Praktiken.`,
    },
    'evidence-based': {
      ru: `Доказательная наука анализирует ваши показатели здоровья, опираясь на актуальные клинические исследования. Каждая рекомендация подкреплена метаанализами и рандомизированными контролируемыми испытаниями. Ваш профиль показывает конкретные, измеримые области для улучшения с высоким уровнем доверия.`,
      he: `המדע המבוסס ראיות מנתח את מדדי הבריאות שלך תוך הסתמכות על מחקרים קליניים עדכניים. כל המלצה מגובה במטה-אנליזות וניסויים מבוקרים אקראיים. הפרופיל שלך מציג תחומים ספציפיים ומדידים לשיפור ברמת אמון גבוהה.`,
      de: `Die Evidenzbasierte Wissenschaft analysiert Ihre Gesundheitswerte auf der Grundlage aktueller klinischer Forschung. Jede Empfehlung ist durch Metaanalysen und randomisierte kontrollierte Studien belegt. Ihr Profil zeigt konkrete, messbare Verbesserungsbereiche mit hohem Vertrauensniveau.`,
    },
    biorhythm: {
      ru: `Биоритм-анализ исследует, насколько ваш образ жизни согласован с естественными циркадными ритмами. Ваши показатели сна, энергии и восстановления оцениваются через призму хронобиологии. Рекомендации направлены на оптимизацию ежедневных ритуалов в соответствии с вашими биологическими часами.`,
      he: `ניתוח הביוריתם בוחן עד כמה אורח חייך מסונכרן עם המקצבים הצירקדיים הטבעיים. מדדי השינה, האנרגיה וההתאוששות שלך מוערכים דרך עדשת הכרונוביולוגיה. ההמלצות מכוונות לייעול הטקסים היומיומיים בהתאם לשעון הביולוגי שלך.`,
      de: `Die Biorhythmus-Analyse untersucht, inwieweit Ihr Lebensstil mit den natürlichen zirkadianen Rhythmen synchronisiert ist. Ihre Schlaf-, Energie- und Erholungswerte werden durch das Prisma der Chronobiologie bewertet. Die Empfehlungen zielen auf die Optimierung täglicher Rituale entsprechend Ihrer biologischen Uhr ab.`,
    },
    naturopathy: {
      ru: `Натуропатия рассматривает ваш организм как систему, обладающую врождённой силой самоисцеления. Ваши показатели оцениваются с точки зрения природных факторов здоровья: питание, движение, воздух, вода, солнечный свет и ментальный покой. Рекомендации усиливают вашу природную способность к восстановлению.`,
      he: `הנטורופתיה רואה את גופך כמערכת בעלת כוח ריפוי עצמי מולד. הנתונים שלך מוערכים מבחינת גורמי הבריאות הטבעיים: תזונה, תנועה, אוויר, מים, אור שמש ושקט מנטלי. ההמלצות מחזקות את יכולת ההתאוששות הטבעית שלך.`,
      de: `Die Naturheilkunde betrachtet Ihren Körper als System mit angeborener Selbstheilungskraft. Ihre Werte werden aus der Perspektive natürlicher Gesundheitsfaktoren bewertet: Ernährung, Bewegung, Luft, Wasser, Sonnenlicht und mentale Ruhe. Die Empfehlungen stärken Ihre natürliche Erholungsfähigkeit.`,
    },
  }

  const generic = GENERIC_NARRATIVES[frameworkId]
  if (generic) return generic[locale] ?? fwResult?.narrative ?? '—'
  return fwResult?.narrative ?? '—'
}

// ── Localized recommendation descriptions ─────────────────────────────────
const REC_DESCRIPTIONS_L: Record<string, Record<string, string>> = {
  'slp-001': {
    ru: 'Температура в спальне 18–19°C снижает частоту сердечных сокращений и запускает выработку мелатонина. Это один из наиболее изученных факторов качества сна.',
    he: 'טמפרטורת חדר שינה של 18–19°C מפחיתה את קצב הלב ומפעילה ייצור מלטונין. זה אחד הגורמים המחקרתיים ביותר לאיכות שינה.',
    de: 'Eine Schlafzimmertemperatur von 18–19°C senkt die Herzfrequenz und initiiert die Melatoninproduktion. Dies ist einer der am besten erforschten Schlafqualitätsfaktoren.',
  },
  'slp-002': {
    ru: 'Постоянное время пробуждения — мощнейший регулятор циркадного ритма, даже в выходные. Это закрепляет ваши биологические часы и улучшает качество сна.',
    he: 'זמן השכמה קבוע הוא המווסת החזק ביותר של הקצב הצירקדי, אפילו בסופי שבוע. הדבר מייצב את השעון הביולוגי שלך ומשפר את איכות השינה.',
    de: 'Eine konstante Aufwachzeit ist der wirkungsvollste Regulator des zirkadianen Rhythmus, auch an Wochenenden. Dies stabilisiert Ihre biologische Uhr und verbessert die Schlafqualität.',
  },
  'slp-003': {
    ru: 'Ритуал расслабления за 90 минут до сна — снижение освещённости, отказ от экранов, тёплый душ — плавно переводит нервную систему из режима активации в режим восстановления.',
    he: 'פרוטוקול הרגעה של 90 דקות לפני השינה — הפחתת תאורה, הימנעות ממסכים, מקלחת חמה — מעביר בהדרגה את מערכת העצבים ממצב הפעלה למצב התאוששות.',
    de: 'Ein 90-minütiges Entspannungsritual vor dem Schlafen — Lichtreduzierung, Bildschirmverzicht, warme Dusche — führt das Nervensystem sanft vom Aktivierungs- in den Erholungsmodus.',
  },
  'slp-004': {
    ru: 'Пребывание на ярком свету в течение первых 30 минут после пробуждения синхронизирует кортизол и настраивает циркадный ритм на весь день.',
    he: 'חשיפה לאור בהיר ב-30 הדקות הראשונות לאחר ההתעוררות מסנכרנת את הקורטיזול ומכוונת את הקצב הצירקדי ליום כולו.',
    de: 'Helles Licht in den ersten 30 Minuten nach dem Aufwachen synchronisiert Cortisol und stellt den zirkadianen Rhythmus für den ganzen Tag ein.',
  },
  'slp-005': {
    ru: 'Кофеин блокирует рецепторы аденозина до 8–10 часов. Приём после 13:00 задерживает засыпание и снижает глубину медленноволновой фазы сна.',
    he: 'קפאין חוסם קולטני אדנוזין למשך 8–10 שעות. צריכה לאחר 13:00 מעכבת את ההירדמות ומפחיתה את עומק שלב גלי השינה האיטיים.',
    de: 'Koffein blockiert Adenosin-Rezeptoren für 8–10 Stunden. Konsum nach 13 Uhr verzögert das Einschlafen und reduziert die Tiefe des Tiefschlafes.',
  },
  'mov-001': {
    ru: 'Зона 2 — это темп, при котором вы можете разговаривать полными предложениями. Три сессии по 45 минут в неделю повышают митохондриальную плотность и метаболическую гибкость.',
    he: 'אזור 2 הוא קצב שבו אתה יכול לדבר במשפטים שלמים. שלוש סשנים של 45 דקות בשבוע מגבירים את צפיפות המיטוכונדריה והגמישות המטבולית.',
    de: 'Zone 2 ist ein Tempo, bei dem Sie in vollständigen Sätzen sprechen können. Drei 45-minütige Einheiten pro Woche erhöhen die Mitochondriendichte und die metabolische Flexibilität.',
  },
  'mov-002': {
    ru: '10-минутная прогулка после еды снижает пиковый уровень глюкозы в крови на 20–30% и ускоряет пищеварение. Один из самых эффективных инструментов метаболического здоровья.',
    he: 'הליכה של 10 דקות לאחר הארוחה מפחיתה את רמת הגלוקוז בדם בשיא ב-20–30% ומאיצה את העיכול. כלי אחד מהיעילים ביותר לבריאות מטבולית.',
    de: 'Ein 10-minütiger Spaziergang nach den Mahlzeiten senkt den Blutzuckerspitzenwert um 20–30% und beschleunigt die Verdauung. Eines der wirkungsvollsten Werkzeuge für die metabolische Gesundheit.',
  },
  'nut-001': {
    ru: 'Белок (30–40г на приём пищи) замедляет всасывание глюкозы, обеспечивает чувство насыщения и поддерживает мышечную массу — фундамент долгосрочного метаболизма.',
    he: 'חלבון (30–40 גרם לארוחה) מאט את ספיגת הגלוקוז, מספק תחושת שובע ושומר על מסת השריר — בסיס המטבוליזם לטווח הארוך.',
    de: 'Protein (30–40 g pro Mahlzeit) verlangsamt die Glukoseaufnahme, sorgt für Sättigung und erhält die Muskelmasse — die Grundlage des Langzeitmetabolismus.',
  },
  'nut-002': {
    ru: 'Ограничение приёма пищи 8-часовым окном даёт организму 16 часов для клеточного восстановления. Улучшает инсулинорезистентность, аутофагию и маркеры воспаления.',
    he: 'הגבלת האכילה לחלון של 8 שעות נותנת לגוף 16 שעות להתאוששות תאית. משפר את עמידות האינסולין, האוטופגיה ומדדי הדלקת.',
    de: 'Die Einschränkung des Essens auf ein 8-Stunden-Fenster gibt dem Körper 16 Stunden für die zelluläre Erholung. Verbessert Insulinresistenz, Autophagie und Entzündungsmarker.',
  },
  'str-001': {
    ru: 'Двойной вдох через нос + длинный выдох быстро снижает ЧСС и активирует парасимпатическую нервную систему. Физиологический сброс стресса за 30 секунд.',
    he: 'שאיפה כפולה דרך האף + נשיפה ארוכה מפחיתה במהירות את קצב הלב ומפעילה את מערכת העצבים הפאראסימפתטית. איפוס פיזיולוגי של לחץ תוך 30 שניות.',
    de: 'Doppeltes Einatmen durch die Nase + langes Ausatmen senkt schnell die Herzfrequenz und aktiviert das parasympathische Nervensystem. Physiologischer Stressabbau in 30 Sekunden.',
  },
  'str-004': {
    ru: '20-минутная прогулка среди деревьев снижает кортизол на 12–15%, уменьшает активность префронтальной коры и восстанавливает направленное внимание.',
    he: 'הליכה של 20 דקות בין עצים מפחיתה קורטיזול ב-12–15%, מקטינה את פעילות קליפת המוח הקדמית ומשקמת תשומת לב מכוונת.',
    de: '20-minütiges Spazierengehen zwischen Bäumen senkt Cortisol um 12–15%, reduziert die Aktivität des präfrontalen Kortex und stellt die gerichtete Aufmerksamkeit wieder her.',
  },
  'mnd-001': {
    ru: 'Ежедневная практика фокусированного внимания (12–15 минут) увеличивает толщину префронтальной коры и улучшает рабочую память. Наиболее изученная форма медитации.',
    he: 'תרגול יומי של קשב ממוקד (12–15 דקות) מגדיל את עובי קליפת המוח הקדמית ומשפר את הזיכרון לטווח קצר. הצורה הנחקרת ביותר של מדיטציה.',
    de: 'Tägliche Praxis der fokussierten Aufmerksamkeit (12–15 Minuten) erhöht die Dicke des präfrontalen Kortex und verbessert das Arbeitsgedächtnis. Die am besten erforschte Form der Meditation.',
  },
  'rec-001': {
    ru: 'Три сессии в сауне (20 мин, 80°C) в неделю снижают риск сердечно-сосудистых событий на 40%, улучшают выброс гормона роста и ускоряют мышечное восстановление.',
    he: 'שלוש סשנים בסאונה (20 דקות, 80°C) בשבוע מפחיתים את הסיכון לאירועים לבביים ב-40%, משפרים את הפרשת הורמון הגדילה ומאיצים את ההתאוששות השרירית.',
    de: 'Drei Saunasitzungen (20 Min., 80°C) pro Woche reduzieren das Risiko kardiovaskulärer Ereignisse um 40%, verbessern die Wachstumshormonausschüttung und beschleunigen die Muskelregeneration.',
  },
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { strings, locale } = useLanguage()
  const s = strings.results
  const dims = strings.dimensions

  const [data, setData]           = useState<ResultData | null>(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [activeTab, setActiveTab] = useState<'overview'|'framework'|'recommendations'|'intelligence'>('overview')

  useEffect(() => {
    fetch(`/api/results/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('not_found')
        return r.json()
      })
      .then(d => {
        if (!d?.scores) throw new Error('incomplete')
        setData(d)
      })
      .catch(() => setError(strings.common.error))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight:'80dvh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div className="spinner" style={{ width:40, height:40, borderWidth:3 }} />
    </div>
  )
  if (error || !data) return (
    <div className="wrap section-pad">
      <p style={{ color:'var(--rose)' }}>{error || strings.common.error}</p>
    </div>
  )

  const { assessment, scores, fwResult, recommendations } = data
  const stateDef = getStateDef(assessment.wellness_state)
  const fw = FRAMEWORK_REGISTRY[assessment.framework as keyof typeof FRAMEWORK_REGISTRY]

  const dimKeys = ['nutrition','sleep','recovery','stress','movement','emotional','life_balance','purpose','energy'] as const
  const dimLabels: Record<string, string> = {
    nutrition: dims.nutrition, sleep: dims.sleep, recovery: dims.recovery,
    stress: dims.calm, movement: dims.movement, emotional: dims.emotional,
    life_balance: dims.balance, purpose: dims.purpose, energy: dims.energy,
  }

  const radarAxes = [dims.nutrition, dims.sleep, dims.recovery, dims.calm, dims.movement, dims.emotional, dims.balance, dims.purpose, dims.energy]
  const radarVals = dimKeys.map(d => d === 'stress' ? 100 - scores[d] : scores[d])

  // 3D orb dimension values array
  const dimValues = [
    scores.nutrition, scores.sleep, scores.recovery,
    100 - scores.stress, scores.movement, scores.energy,
    scores.emotional, scores.life_balance, scores.purpose,
  ]

  // Intelligence layer: persona + trajectory
  const behavioralProfile = {
    contradictions: [],
    consistencyScore: 75,
    extremeBias: 0,
    dominantConcern: null,
    patternLabel: 'Balanced',
  }
  const persona: PersonaResult = detectPersona(scores, behavioralProfile, !data.snapshots || data.snapshots.length === 0)
  const trajectory: TrajectoryResult = computeTrajectory(scores.composite, data.snapshots ?? [])
  const personaMeta = PERSONA_META[persona.persona] ?? PERSONA_META['Stabilizer']
  const trajectoryColor = TRAJECTORY_COLORS[trajectory.direction] ?? 'var(--ink-soft)'

  // Localized persona / trajectory labels
  const personaNameL    = PERSONA_NAMES_L[persona.persona]?.[locale]       ?? persona.persona
  const personaTaglineL = PERSONA_TAGLINES_L[persona.persona]?.[locale]    ?? personaMeta.tagline
  const trajLabelL      = TRAJ_LABELS_L[trajectory.direction]?.[locale]    ?? trajectory.direction.replace('_', ' ')
  const trajLabelFull   = getTrajectoryLabelL(trajectory.direction, trajectory.delta, locale)
  const fwNameL         = FW_LABELS_L[assessment.framework]?.[locale]      ?? fw?.label ?? assessment.framework
  const stateNameL      = STATE_LABELS_L[assessment.wellness_state]?.[locale] ?? stateDef.label
  const personaDriveL   = PERSONA_DRIVE_L[persona.persona]?.[locale]       ?? persona.primaryDrive
  const personaCoachingL = PERSONA_COACHING_L[persona.persona]?.[locale]   ?? persona.coachingStyle

  const tabLabels: Record<'overview' | 'framework' | 'recommendations' | 'intelligence', string> = {
    overview:        s.overview,
    framework:       s.framework,
    recommendations: s.recommendations,
    intelligence:    s.intelligence,
  }

  // Confidence by score density proxy
  const getRecConfidence = (impactScore: number): ConfidenceLevel => {
    return impactScore >= 8 ? 'high' : impactScore >= 5 ? 'medium' : 'low'
  }

  return (
    <div className="wrap cinematic-bg" style={{ paddingTop:36, paddingBottom:80, position: 'relative' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroReveal score={assessment.composite_score}>
        <div className="hero-premium" style={{ marginBottom:40, padding:0 }}>
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:32, alignItems:'center', padding:'32px 36px' }}>

            {/* 3D Orb */}
            <div className="orb-glow-wrap">
              <OrbErrorBoundary>
                <WellnessOrbR3F
                  score={assessment.composite_score}
                  state={assessment.wellness_state}
                  size={240}
                  values={dimValues}
                />
              </OrbErrorBoundary>
            </div>

            <div>
              {/* Framework label */}
              <div className="eyebrow" style={{ marginBottom:12 }}>
                <span style={{ fontSize:16 }}>{fw?.icon ?? '◆'}</span>
                {fwNameL}
              </div>

              {/* Persona badge */}
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:6,
                  padding:'4px 12px', borderRadius:100,
                  background:`${personaMeta.color}15`,
                  color: personaMeta.color,
                  fontFamily:'var(--font-mono)', fontSize:'.68rem',
                  textTransform:'uppercase', letterSpacing:'.08em', fontWeight:600,
                }}>
                  {personaMeta.emoji} {personaNameL}
                </span>
                <span style={{ fontSize:'.78rem', color:'var(--ink-faint)', fontFamily:'var(--font-body)' }}>
                  {personaTaglineL}
                </span>
              </div>

              <h1 className="h1" style={{ marginBottom:12 }}>
                {s.yourWellnessEcosystem}<br/>
                <span className="serif-it">{stateDef.label === 'BALANCED' ? s.inBalance : s.needsAttention}</span>
              </h1>
              <p className="lede" style={{ marginBottom:20 }}>{STATE_DESCRIPTIONS_L[assessment.wellness_state]?.[locale] ?? stateDef.description}</p>

              <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>
                <span className="state-pill" style={{ background:`rgba(var(--sage-rgb,122,158,142),.15)`, color:`var(${stateDef.color})` }}>
                  {stateDef.emoji} {stateNameL}
                </span>
                <div className="score-badge">
                  <span className="score-num" style={{ fontSize:'2rem' }}>{assessment.composite_score}</span>
                  <span className="score-denom">/100</span>
                </div>

                {/* Trajectory */}
                {trajectory.direction !== 'first_session' && (
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:5,
                    padding:'4px 10px', borderRadius:100,
                    background:`${trajectoryColor}15`,
                    color: trajectoryColor,
                    fontFamily:'var(--font-mono)', fontSize:'.68rem', fontWeight:600,
                  }}>
                    {trajectory.emoji} {trajLabelL}
                  </span>
                )}
              </div>

              {/* Trajectory label */}
              {trajectory.direction !== 'first_session' && (
                <p style={{ marginTop:10, fontSize:'.8rem', color:'var(--ink-soft)', fontFamily:'var(--font-body)' }}>
                  {trajLabelFull}
                </p>
              )}
            </div>
          </div>
        </div>
      </HeroReveal>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <RevealSection delay={0.15}>
        <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--line)', marginBottom:36, overflowX:'auto' }}>
          {(['overview','framework','recommendations','intelligence'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:'10px 20px', fontWeight: activeTab===tab ? 600 : 400,
              color: activeTab===tab ? 'var(--ink)' : 'var(--ink-soft)',
              borderBottom: activeTab===tab ? '2px solid var(--sage)' : '2px solid transparent',
              background:'transparent', cursor:'pointer', fontSize:'.9rem',
              transition:'color .15s', whiteSpace:'nowrap', flexShrink:0,
            }}>{tabLabels[tab]}</button>
          ))}
        </div>
      </RevealSection>

      {/* ── Tab: Overview ────────────────────────────────── */}
      {activeTab === 'overview' && (
        <TabReveal tabKey="overview">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
            <RevealSection delay={0.05}>
              <div className="card-depth" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.wellnessRadar}</div>
                <RadarChart axes={radarAxes} values={radarVals} size={280} />
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <div className="card-depth" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:20 }}>◈ {s.dimensionScores}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {dimKeys.map(dim => {
                    const val = dim === 'stress' ? 100 - scores[dim] : scores[dim]
                    return (
                      <div key={dim}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                          <span style={{ fontSize:'.8125rem', color:'var(--ink-soft)' }}>{dimLabels[dim]}</span>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--ink)', fontWeight:600 }}>{val}</span>
                        </div>
                        <div className="progress-premium">
                          <div className="progress-premium-fill" style={{ width:`${val}%`, background:`var(${DIM_COLORS[dim]})` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={0.18}>
            <div className="card-depth" style={{ padding:24 }}>
              <div className="eyebrow" style={{ marginBottom:24 }}>◆ {s.dimensionRings}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(90px, 1fr))', gap:16 }}>
                {dimKeys.map(dim => (
                  <div className="dim-card" key={dim}>
                    <ScoreRing
                      value={dim === 'stress' ? 100 - scores[dim] : scores[dim]}
                      color={DIM_COLORS[dim]}
                      size={76}
                      label={dimLabels[dim]}
                      glow={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </TabReveal>
      )}

      {/* ── Tab: Framework ───────────────────────────────── */}
      {activeTab === 'framework' && (
        <TabReveal tabKey="framework">
          <RevealSection>
            <div className="card-depth" style={{ padding:28, marginBottom:20 }}>
              <div className="eyebrow" style={{ marginBottom:16 }}>{fw?.icon} {fwNameL} {s.interpretation}</div>
              <p style={{ lineHeight:1.8, color:'var(--ink-soft)' }}>{getLocalizedNarrative(assessment.framework, fwResult, scores, locale)}</p>
            </div>
          </RevealSection>

          {fwResult?.dosha_vata != null && (
            <RevealSection delay={0.1}>
              <div className="card-depth" style={{ padding:24, marginBottom:20 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.doshaBalance}</div>
                <div style={{ marginBottom:8 }}>
                  <strong style={{ fontFamily:'var(--font-serif)' }}>{s.dominant} {fwResult.dominant_dosha}</strong>
                </div>
                {[
                  { label:'Vata', val:fwResult.dosha_vata, color:'--indigo' },
                  { label:'Pitta', val:fwResult.dosha_pitta, color:'--clay' },
                  { label:'Kapha', val:fwResult.dosha_kapha, color:'--sage' },
                ].map(d => (
                  <div key={d.label} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:'.875rem', color:'var(--ink-soft)' }}>{d.label}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{d.val ?? 0}%</span>
                    </div>
                    <div className="progress-premium">
                      <div className="progress-premium-fill" style={{ width:`${d.val ?? 0}%`, background:`var(${d.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          )}

          {fwResult?.element_wood != null && (
            <RevealSection delay={0.15}>
              <div className="card-depth" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.fiveElements}</div>
                {[
                  { label:'Wood', val:fwResult.element_wood, color:'--sage' },
                  { label:'Fire', val:fwResult.element_fire, color:'--clay' },
                  { label:'Earth', val:fwResult.element_earth, color:'--gold-deep' },
                  { label:'Metal', val:fwResult.element_metal, color:'--ink-soft' },
                  { label:'Water', val:fwResult.element_water, color:'--indigo' },
                ].map(e => (
                  <div key={e.label} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                      <span style={{ fontSize:'.875rem', color:'var(--ink-soft)' }}>{e.label}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12 }}>{e.val ?? 0}%</span>
                    </div>
                    <div className="progress-premium">
                      <div className="progress-premium-fill" style={{ width:`${e.val ?? 0}%`, background:`var(${e.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          )}
        </TabReveal>
      )}

      {/* ── Tab: Recommendations ─────────────────────────── */}
      {activeTab === 'recommendations' && (
        <TabReveal tabKey="recommendations">
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {recommendations.length === 0 && (
              <p className="muted">{s.noRecs}</p>
            )}
            {recommendations.map((rec, i) => {
              const confLevel = getRecConfidence(rec.impact_score)
              return (
                <RevealSection key={rec.id} delay={i * 0.06}>
                  <div className="glass-card" style={{ padding:'20px 24px', borderLeft:`3px solid var(--sage)` }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:10 }}>
                      <div>
                        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8, flexWrap:'wrap' }}>
                          <span className="badge badge-sage">{REC_CATEGORY_L[rec.category?.toUpperCase()]?.[locale] ?? rec.category}</span>
                          <ConfidenceBadge level={confLevel} locale={locale} />
                        </div>
                        <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', color:'var(--ink)' }}>
                          {i + 1}. {getRecTitle(rec.rec_id ?? rec.id, rec.title, locale)}
                        </h3>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink-faint)' }}>{s.impact}</div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:18, fontWeight:700, color:'var(--sage-deep)' }}>+{rec.impact_score}</div>
                      </div>
                    </div>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.7 }}>{REC_DESCRIPTIONS_L[rec.rec_id ?? rec.id]?.[locale] ?? rec.description}</p>
                    {rec.evidence_level && (
                      <div style={{ marginTop:12 }}>
                        <span className="badge">{rec.evidence_level} {s.evidence}</span>
                        {rec.time_minutes && <span className="badge" style={{ marginLeft:6 }}>{rec.time_minutes} {s.min}</span>}
                      </div>
                    )}
                  </div>
                </RevealSection>
              )
            })}
          </div>
        </TabReveal>
      )}

      {/* ── Tab: Intelligence ─────────────────────────────── */}
      {activeTab === 'intelligence' && (
        <TabReveal tabKey="intelligence">
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Persona card */}
            <RevealSection>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◈ {s.wellnessArchetype}</div>
                <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
                  <div style={{
                    width:56, height:56, borderRadius:16, flexShrink:0,
                    background:`${personaMeta.color}18`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:24, color: personaMeta.color,
                  }}>{personaMeta.emoji}</div>
                  <div>
                    <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1.3rem', color:'var(--ink)', marginBottom:6 }}>
                      {personaNameL}
                    </h3>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.7, marginBottom:10 }}>
                      {personaTaglineL}
                    </p>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.7 }}>
                      <strong style={{ color:'var(--ink)' }}>{s.primaryDriveLabel}</strong> {personaDriveL}
                    </p>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.7, marginTop:6 }}>
                      <strong style={{ color:'var(--ink)' }}>{s.coachingApproachLabel}</strong> {personaCoachingL}
                    </p>
                    <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--ink-faint)', textTransform:'uppercase', letterSpacing:'.08em' }}>
                        {s.detectionConfidenceLabel}
                      </span>
                      <div style={{ flex:1, height:4, background:'var(--line)', borderRadius:2, maxWidth:120 }}>
                        <div style={{ width:`${persona.confidence}%`, height:'100%', background: personaMeta.color, borderRadius:2 }} />
                      </div>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color: personaMeta.color, fontWeight:600 }}>
                        {persona.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Trajectory card */}
            <RevealSection delay={0.08}>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◎ {s.wellnessTrajectory}</div>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{
                    width:52, height:52, borderRadius:'50%', flexShrink:0,
                    background:`${trajectoryColor}15`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, color: trajectoryColor,
                    fontFamily:'var(--font-mono)',
                  }}>{trajectory.emoji}</div>
                  <div>
                    <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.1rem', color:'var(--ink)', marginBottom:4, textTransform:'capitalize' }}>
                      {trajLabelL}
                    </div>
                    <p style={{ color:'var(--ink-soft)', fontSize:'.875rem', lineHeight:1.6 }}>
                      {trajLabelFull}
                    </p>
                    {trajectory.delta !== 0 && (
                      <div style={{
                        marginTop:8, display:'inline-flex', alignItems:'center', gap:4,
                        fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                        color: trajectory.delta > 0 ? 'var(--sage-deep)' : 'var(--rose)',
                      }}>
                        {trajectory.delta > 0 ? '+' : ''}{trajectory.delta} {s.ptsVsPrevious}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Focus areas */}
            <RevealSection delay={0.16}>
              <div className="card-depth" style={{ padding:28 }}>
                <div className="eyebrow" style={{ marginBottom:16 }}>◆ {s.focusAreasTitle}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {persona.focusAreas.map((dim, i) => {
                    const val = dim === 'stress' ? 100 - scores[dim] : scores[dim]
                    return (
                      <div key={dim} style={{ display:'flex', alignItems:'center', gap:14 }}>
                        <div style={{
                          width:28, height:28, borderRadius:8, flexShrink:0,
                          background:'var(--line)',
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontFamily:'var(--font-mono)', fontSize:11, fontWeight:700,
                          color:'var(--ink-faint)',
                        }}>{i + 1}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                            <span style={{ fontSize:'.875rem', color:'var(--ink)', fontWeight:500 }}>
                              {dimLabels[dim]}
                            </span>
                            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--ink)', fontWeight:700 }}>{val}</span>
                          </div>
                          <div className="progress-premium">
                            <div className="progress-premium-fill" style={{ width:`${val}%`, background:`var(${DIM_COLORS[dim] ?? '--sage'})` }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </RevealSection>

            {/* Why this matters */}
            <RevealSection delay={0.22}>
              <div className="glass-card" style={{ padding:24 }}>
                <div className="eyebrow" style={{ marginBottom:12 }}>◉ {s.whyRecsTitle}</div>
                <p style={{ color:'var(--ink-soft)', fontSize:'.9rem', lineHeight:1.75 }}>
                  {locale === 'ru' && <>
                    Как <strong style={{ color:'var(--ink)' }}>{personaNameL}</strong>, ваш коучинг оптимизирован под{' '}
                    <em>{persona.primaryDrive.toLowerCase()}</em>. Рекомендации выше выбраны потому, что они устраняют ваши
                    наименее выраженные измерения — там небольшое улучшение даёт наибольший общий прирост.
                  </>}
                  {locale === 'he' && <>
                    כ-<strong style={{ color:'var(--ink)' }}>{personaNameL}</strong>, האימון שלך מותאם ל-<em>{persona.primaryDrive.toLowerCase()}</em>.
                    {' '}ההמלצות נבחרו כיוון שהן מתמקדות בממדים הנמוכים ביותר שלך, שם שיפור קטן מניב את הרווח המצרפי הגדול ביותר.
                  </>}
                  {locale === 'de' && <>
                    Als <strong style={{ color:'var(--ink)' }}>{personaNameL}</strong> ist Ihr Coaching auf{' '}
                    <em>{persona.primaryDrive.toLowerCase()}</em> ausgerichtet. Die obigen Empfehlungen wurden ausgewählt,
                    weil sie Ihre schwächsten Dimensionen ansprechen — dort bringt eine kleine Verbesserung den größten Gesamtfortschritt.
                  </>}
                  {(locale === 'en' || !['ru','he','de'].includes(locale)) && <>
                    As a <strong style={{ color:'var(--ink)' }}>{personaNameL}</strong>, your coaching is optimized for{' '}
                    <em>{persona.primaryDrive.toLowerCase()}</em>. The recommendations above were selected because they
                    address your lowest-scoring dimensions, where a small improvement yields the largest composite gain.
                  </>}
                </p>
              </div>
            </RevealSection>
          </div>
        </TabReveal>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <RevealSection delay={0.2} style={{ marginTop:48 }}>
        <div style={{ display:'flex', gap:12 }}>
          <a href="/coach" className="btn btn-primary">{s.talkCoach}</a>
          <a href="/assessment" className="btn btn-ghost">{s.reassess}</a>
        </div>
      </RevealSection>
    </div>
  )
}
