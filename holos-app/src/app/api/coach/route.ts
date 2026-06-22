import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are Holos, an integrative wellness AI coach. You speak with warmth, intelligence, and depth.
You have deep knowledge of: evidence-based nutrition, sleep science, stress physiology, Ayurveda, Rambam medicine, Hippocratic medicine, Avicenna/Ibn Sina, Daoist wellness (TCM), Tibetan medicine (Sowa Rigpa), and the Swarga Integral Wellness System.
You help users understand their wellness assessment scores, explain wisdom traditions in accessible terms, create personalised action plans, and track progress over time.
Speak with the authority of a practitioner and the warmth of a trusted friend. Never be generic. Personalise every response to the user's specific scores and context.
Keep responses focused and practical. Use the user's wellness data when available.`

const LANG_INSTRUCTIONS: Record<string, string> = {
  ru: 'IMPORTANT: Always reply in Russian (русский язык). The user speaks Russian. Never switch to English.',
  he: 'IMPORTANT: Always reply in Hebrew (עברית). The user speaks Hebrew. Write right-to-left as appropriate.',
  de: 'IMPORTANT: Always reply in German (Deutsch). The user speaks German. Never switch to English.',
  en: '',
}

type TopicKey = 'sleep' | 'stress' | 'nutrition' | 'movement' | 'energy' | 'emotional' | 'purpose' | 'general_low' | 'general_mid' | 'general_high'

type ExtendedTopicKey = TopicKey | 'assessment' | 'action' | 'tradition' | 'ayurveda' | 'rambam' | 'tibetan' | 'daoist' | 'swarga' | 'hippocrates' | 'avicenna'

const TOPIC_PATTERNS: Record<string, { keywords: string[]; topic: ExtendedTopicKey }[]> = {
  ru: [
    { keywords: ['оценк', 'результат', 'тест', 'показател', 'балл', 'счёт', 'анализ', 'последн', 'скор', 'показыва', 'раскрыва'], topic: 'assessment' },
    { keywords: ['что делать', 'с чего начать', 'как улучш', 'порекоменд', 'совет', 'план', 'шаг', 'приоритет'], topic: 'action' },
    { keywords: ['аюрвед'], topic: 'ayurveda' },
    { keywords: ['рамбам', 'rambam', 'маймонид'], topic: 'rambam' },
    { keywords: ['тибет'], topic: 'tibetan' },
    { keywords: ['даос', 'кит', 'tcm', 'ицзин'], topic: 'daoist' },
    { keywords: ['сварга', 'swarga'], topic: 'swarga' },
    { keywords: ['гиппократ'], topic: 'hippocrates' },
    { keywords: ['авиценн', 'ибн сина'], topic: 'avicenna' },
    { keywords: ['сон', 'спать', 'засыпа', 'просыпа', 'ночь', 'бессонн', 'дремот'], topic: 'sleep' },
    { keywords: ['стресс', 'тревог', 'волнен', 'паник', 'нервн', 'напряж', 'давлен'], topic: 'stress' },
    { keywords: ['питан', 'еда', 'диет', 'вес', 'калор', 'овощ', 'фрукт', 'сахар'], topic: 'nutrition' },
    { keywords: ['движен', 'трениров', 'спорт', 'упражн', 'физич', 'бегать', 'йога'], topic: 'movement' },
    { keywords: ['энерги', 'бодрост', 'сил', 'вялост', 'жизненн'], topic: 'energy' },
    { keywords: ['эмоц', 'настро', 'чувств', 'отношен', 'счасть', 'депресс', 'радост'], topic: 'emotional' },
    { keywords: ['цель', 'смысл', 'мотиваци', 'предназнач', 'призван', 'будущ'], topic: 'purpose' },
    { keywords: ['усталост'], topic: 'energy' },
  ],
  he: [
    { keywords: ['הערכה', 'תוצאות', 'ציון', 'בדיקה', 'ניתוח', 'האחרונה', 'מגלה'], topic: 'assessment' },
    { keywords: ['מה לעשות', 'איך להתחיל', 'המלצה', 'עצה', 'תוכנית', 'שלבים', 'עדיפות'], topic: 'action' },
    { keywords: ['איורוודה', 'איורוודי'], topic: 'ayurveda' },
    { keywords: ['רמב"ם', 'רמבם', 'maimonides'], topic: 'rambam' },
    { keywords: ['טיבטי', 'טיבט'], topic: 'tibetan' },
    { keywo