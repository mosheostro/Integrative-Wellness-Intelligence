'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { BackButton } from '@/components/ui/BackButton'
import { getRecTitle } from '@/lib/i18n/recommendation-titles'

type Rec = {
  id: string
  rec_id?: string
  title: string
  description: string
  category: string
  impact_score: number
  difficulty_score: number
  priority_score: number
  framework: string
  status: string
  created_at: string
}

type Filter = 'all' | 'active' | 'completed'

const CATEGORY_COLORS: Record<string, string> = {
  nutrition:    'var(--sage)',
  sleep:        'var(--indigo)',
  recovery:     'var(--clay)',
  stress:       'var(--rose)',
  movement:     'var(--gold)',
  emotional:    'var(--indigo)',
  life_balance: 'var(--sage)',
  purpose:      'var(--gold)',
  energy:       'var(--clay)',
  general:      'var(--ink-soft)',
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  SLEEP:       { en: 'Sleep',       ru: 'Сон',            he: 'שינה',       de: 'Schlaf'       },
  MOVEMENT:    { en: 'Movement',    ru: 'Движение',       he: 'תנועה',      de: 'Bewegung'     },
  NUTRITION:   { en: 'Nutrition',   ru: 'Питание',        he: 'תזונה',      de: 'Ernährung'    },
  RECOVERY:    { en: 'Recovery',    ru: 'Восстановление', he: 'התאוששות',   de: 'Erholung'     },
  EMOTIONAL:   { en: 'Emotional',   ru: 'Эмоции',         he: 'רגשי',       de: 'Emotional'    },
  STRESS:      { en: 'Calm',        ru: 'Спокойствие',    he: 'שלווה',      de: 'Gelassenheit' },
  CALM:        { en: 'Calm',        ru: 'Спокойствие',    he: 'שלווה',      de: 'Gelassenheit' },
  BALANCE:     { en: 'Balance',     ru: 'Баланс',         he: 'איזון',      de: 'Balance'      },
  LIFE_BALANCE:{ en: 'Balance',     ru: 'Баланс',         he: 'איזון',      de: 'Balance'      },
  PURPOSE:     { en: 'Purpose',     ru: 'Цель',           he: 'מטרה',       de: 'Zweck'        },
  ENERGY:      { en: 'Energy',      ru: 'Энергия',        he: 'אנרגיה',     de: 'Energie'      },
  MINDFULNESS: { en: 'Mindfulness', ru: 'Осознанность',   he: 'מיינדפולנס', de: 'Achtsamkeit'  },
  GENERAL:     { en: 'General',     ru: 'Общее',          he: 'כללי',       de: 'Allgemein'    },
}

const TRADITION_LABELS: Record<string, Record<string, string>> = {
  tibetan:          { en: 'Tibetan',        ru: 'Тибетская',       he: 'טיבטי',          de: 'Tibetisch'      },
  swarga:           { en: 'Swarga',         ru: 'Сварга',          he: 'סוורגה',         de: 'Swarga'         },
  ayurveda:         { en: 'Ayurveda',       ru: 'Аюрведа',         he: 'אורוודה',        de: 'Ayurveda'       },
  tcm:              { en: 'TCM',            ru: 'ТКМ',             he: 'רפואה סינית',    de: 'TCM'            },
  functional:       { en: 'Functional',     ru: 'Функциональная',  he: 'פונקציונלי',     de: 'Funktionell'    },
  biorhythm:        { en: 'Biorhythm',      ru: 'Биоритм',         he: 'ביוריתם',        de: 'Biorhythmus'    },
  naturopathy:      { en: 'Naturopathy',    ru: 'Натуропатия',     he: 'נטורופתיה',      de: 'Naturheilkunde' },
  integrative:      { en: 'Integrative',    ru: 'Интегративная',   he: 'אינטגרטיבי',     de: 'Integrativ'     },
  rambam:           { en: 'Rambam',         ru: 'Рамбам',          he: 'רמב"ם',          de: 'Rambam'         },
  hippocrates:      { en: 'Hippocrates',    ru: 'Гиппократ',       he: 'היפוקרטס',       de: 'Hippokrates'    },
  avicenna:         { en: 'Avicenna',       ru: 'Авиценна',        he: 'אביצנה',         de: 'Avicenna'       },
  daoist:           { en: 'Daoist',         ru: 'Даосская',        he: 'דאואיסטי',       de: 'Daoistisch'     },
  'evidence-based': { en: 'Evidence-Based', ru: 'Доказательная',   he: 'מבוסס ראיות',    de: 'Evidenzbasiert' },
}

export default function RecommendationsPage() {
  const { strings, locale } = useLanguage()
  const s = strings.recommendations

  const [recs, setRecs]         = useState<Rec[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState<Filter>('active')
  // journalState: null | 'sending' | 'sent' per rec id
  const [journalState, setJournalState] = useState<Record<string, 'sending' | 'sent'>>({})

  useEffect(() => {
    fetch('/api/recommendations')
      .then(async r => {
        if (r.status === 401) { window.location.href = '/login'; return }
        const json = await r.json()
        if (json.error) {
          console.error('Recs API error:', json.error)
          setLoading(false)
          return
        }
        setRecs((json.recommendations as Rec[]) ?? [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Recs fetch error:', err)
        setLoading(false)
      })
  }, [])

  const updateStatus = useCallback(async (id: string, status: string) => {
    setRecs(rs => rs.map(r => r.id === id ? { ...r, status } : r))
    await fetch('/api/recommendations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  }, [])

  const sendToJournal = useCallback(async (rec: Rec) => {
    setJournalState(s => ({ ...s, [rec.id]: 'sending' }))
    const catKey = (rec.category ?? '').toUpperCase()
    const catLabel = CATEGORY_LABELS[catKey]?.[locale] ?? rec.category
    const content = `[${catLabel}] ${getRecTitle(rec.rec_id, rec.title, locale)}\n\n${rec.description}`
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        dimension_tags: [rec.category],
      }),
    })
    if (res.ok) {
      setJournalState(s => ({ ...s, [rec.id]: 'sent' }))
      setTimeout(() => setJournalState(s => { const n = { ...s }; delete n[rec.id]; return n }), 3000)
    } else {
      setJournalState(s => { const n = { ...s }; delete n[rec.id]; return n })
    }
  }, [locale])

  const active    = recs.filter(r => r.status === 'active')
  const completed = recs.filter(r => r.status === 'completed')
  const visible   = filter === 'active'    ? active
                  : filter === 'completed' ? completed
                  : recs

  const doneCount  = completed.length
  const totalCount = recs.length

  const filterMap: Record<Filter, string> = {
    active:    s.filterPending,
    completed: s.filterCompleted,
    all:       s.filterAll,
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      <BackButton href="/dashboard" style={{ marginBottom: 24 }} />

      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--sage-deep)', marginBottom: 6 }}>
            ◈ {strings.nav.actions}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, letterSpacing: '-.02em', color: 'var(--ink)', margin: 0 }}>
            {s.title}
          </h1>
        </div>

        {/* Progress pill */}
        {totalCount > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--surface)', border: '1px solid var(--line)',
            borderRadius: 100, padding: '8px 16px',
          }}>
            {/* progress bar */}
            <div style={{ width: 80, height: 6, background: 'var(--line)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${Math.round((doneCount / totalCount) * 100)}%`,
                background: 'var(--sage-deep)',
                transition: 'width .4s ease',
              }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.76rem', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
              {doneCount} {s.progressOf} {totalCount} {s.progressDone}
            </span>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {(['active', 'completed', 'all'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '7px 16px', borderRadius: 'var(--radius)', border: '1px solid',
              borderColor: filter === f ? 'var(--sage-deep)' : 'var(--line)',
              background: filter === f ? 'var(--sage-deep)' : 'transparent',
              color: filter === f ? '#fff' : 'var(--ink-soft)',
              fontFamily: 'var(--font-body)', fontSize: '.8rem',
              fontWeight: filter === f ? 600 : 400, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
            {filterMap[f]}
            <span style={{
              background: filter === f ? 'rgba(255,255,255,.25)' : 'var(--canvas2)',
              color: filter === f ? '#fff' : 'var(--ink-faint)',
              fontSize: '.7rem', borderRadius: 100, padding: '1px 7px', fontWeight: 600,
            }}>
              {f === 'active' ? active.length : f === 'completed' ? completed.length : totalCount}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-faint)', fontFamily: 'var(--font-body)' }}>
          {s.loading}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState s={s} totalCount={totalCount} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visible.map(r => (
            <RecCard
              key={r.id}
              rec={r}
              locale={locale}
              s={s}
              journalStatus={journalState[r.id]}
              onMarkDone={() => updateStatus(r.id, 'completed')}
              onDismiss={() => updateStatus(r.id, 'dismissed')}
              onJournal={() => sendToJournal(r)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ s, totalCount }: { s: ReturnType<typeof useLanguage>['strings']['recommendations']; totalCount: number }) {
  return (
    <div style={{
      textAlign: 'center', padding: 64,
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
    }}>
      <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>◈</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: 8 }}>
        {totalCount === 0 ? s.noRecs : s.nothing}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: 'var(--ink-faint)', marginBottom: 28 }}>
        {totalCount === 0 ? s.noRecsDesc : s.nothingDesc}
      </div>
      {totalCount === 0 && (
        <Link href="/assessment" style={{
          padding: '10px 24px', borderRadius: 'var(--radius)',
          background: 'var(--sage-deep)', color: '#fff',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.88rem', textDecoration: 'none',
        }}>
          {s.takeAssessment}
        </Link>
      )}
    </div>
  )
}

// ─── Recommendation card ──────────────────────────────────────────────────────
function RecCard({
  rec, locale, s,
  journalStatus,
  onMarkDone, onDismiss, onJournal,
}: {
  rec: Rec
  locale: string
  s: ReturnType<typeof useLanguage>['strings']['recommendations']
  journalStatus?: 'sending' | 'sent'
  onMarkDone: () => void
  onDismiss: () => void
  onJournal: () => void
}) {
  const done      = rec.status === 'completed'
  const catKey    = (rec.category ?? '').toUpperCase()
  const catLabel  = CATEGORY_LABELS[catKey]?.[locale] ?? rec.category.replace(/_/g, ' ')
  const catColor  = CATEGORY_COLORS[rec.category] ?? 'var(--sage)'
  const tradition = TRADITION_LABELS[rec.framework]?.[locale] ?? rec.framework

  const priorityColor = rec.priority_score >= 70 ? 'var(--rose)'
                      : rec.priority_score >= 40 ? 'var(--gold)'
                      : 'var(--sage)'
  const priorityBg = rec.priority_score >= 70 ? 'rgba(176,96,112,.1)'
                   : rec.priority_score >= 40 ? 'rgba(196,165,90,.1)'
                   : 'rgba(122,158,142,.1)'

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${done ? 'rgba(122,158,142,.35)' : 'var(--line)'}`,
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      opacity: done ? 0.72 : 1,
      transition: 'opacity .25s',
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

        {/* Checkbox */}
        <button
          onClick={done ? undefined : onMarkDone}
          title={done ? undefined : s.markDone}
          style={{
            flexShrink: 0, marginTop: 2,
            width: 22, height: 22, borderRadius: 6,
            border: done ? 'none' : '2px solid var(--line)',
            background: done ? 'var(--sage-deep)' : 'transparent',
            cursor: done ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '.8rem', transition: 'all .2s',
          }}>
          {done && '✓'}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: catColor }}>
              {catLabel}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', color: 'var(--ink-faint)', background: 'var(--canvas2)', padding: '1px 8px', borderRadius: 100 }}>
              {tradition}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', fontWeight: 600, color: priorityColor, background: priorityBg, padding: '2px 8px', borderRadius: 100, marginLeft: 'auto' }}>
              P{Math.round(rec.priority_score)}
            </span>
          </div>

          {/* Title */}
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 6, textDecoration: done ? 'line-through' : 'none', textDecorationColor: 'var(--ink-faint)' }}>
            {getRecTitle(rec.rec_id, rec.title, locale)}
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '.84rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: '0 0 14px' }}>
            {rec.description}
          </p>

          {/* Score bars */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
            <ScoreBar label={s.impact}     value={Math.round(rec.impact_score)}     color="var(--sage)" />
            <ScoreBar label={s.difficulty} value={Math.round(rec.difficulty_score)} color="var(--rose)" />
          </div>

          {/* Actions */}
          {!done ? (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={onMarkDone}
                style={{ padding: '7px 14px', borderRadius: 'var(--radius)', background: 'var(--sage-deep)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '.8rem', border: 'none', cursor: 'pointer' }}>
                {s.markDone}
              </button>
              <button onClick={journalStatus ? undefined : onJournal} disabled={!!journalStatus}
                style={{ padding: '7px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: journalStatus === 'sent' ? 'rgba(122,158,142,.1)' : 'transparent', color: journalStatus === 'sent' ? 'var(--sage-deep)' : 'var(--ink-soft)', fontFamily: 'var(--font-body)', fontSize: '.8rem', cursor: journalStatus ? 'default' : 'pointer', transition: 'all .2s' }}>
                {journalStatus === 'sending' ? '…' : journalStatus === 'sent' ? s.sentToJournal : s.sendToJournal}
              </button>
              <button onClick={onDismiss}
                style={{ padding: '7px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink-faint)', fontFamily: 'var(--font-body)', fontSize: '.8rem', cursor: 'pointer' }}>
                {s.dismiss}
              </button>
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--sage-deep)', fontWeight: 600 }}>
              {s.completedLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Score bar ────────────────────────────────────────────────────────────────
function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 140 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--ink-faint)', width: 64, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 4, background: 'var(--line)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.73rem', color: 'var(--ink-soft)', width: 22, textAlign: 'right' }}>{value}</span>
    </div>
  )
}
