/**
 * Localized metadata for Knowledge Center articles.
 * Titles, categories, excerpts, and intros translated into all 4 supported locales.
 * Article body text remains in English (long-form professional translation pending).
 */

// Re-export the canonical Locale type so consumers only need one import
export type { Locale } from './translations'
import type { Locale } from './translations'

export type ArticleMeta = {
  title:    string
  category: string
  excerpt:  string   // listing page card excerpt
  intro:    string   // article page lead paragraph
  date:     string
  readTime: string
}

// ── Listing-page articles (knowledge/page.tsx) ────────────────────────────────

export type ListingArticles = {
  featured: ArticleMeta & { id: string }
  articles: Array<ArticleMeta & { id: string }>
}

const listingEN: ListingArticles = {
  featured: {
    id:       'what-is-integrative-wellness',
    category: 'Foundation',
    title:    'What Is Integrative Wellness — And Why Does It Require Eight Traditions?',
    excerpt:  'The limits of single-metric health tracking, and why every major civilisation developed a complete medical philosophy that modern science is only now beginning to validate.',
    intro:    'The limits of single-metric health tracking, and why every major civilisation developed a complete medical philosophy that modern science is only now beginning to validate.',
    date:     'June 2025',
    readTime: '8 min read',
  },
  articles: [
    { id: 'nine-dimensions',      category: 'Nine Dimensions',  title: 'The Nine Dimensions: Why Scoring Sleep Without Stress Is Misleading',             excerpt: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model.', intro: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model.', date: 'May 2025',      readTime: '6 min' },
    { id: 'doshas-explained',     category: 'Ayurveda',         title: 'Vata, Pitta, Kapha: The Definitive Modern Explanation',                            excerpt: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', intro: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', date: 'May 2025',      readTime: '10 min' },
    { id: 'rambam-preventive',    category: 'Rambam',           title: "Maimonides's Regimen of Health: The 12th-Century Wellness Protocol",               excerpt: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says.', intro: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says.', date: 'April 2025',    readTime: '7 min' },
    { id: 'qi-cultivation',       category: 'Daoist Medicine',  title: 'Qi Cultivation for Sceptics: The Evidence-Based Case for Energy Medicine',         excerpt: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years.', intro: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years.', date: 'April 2025',    readTime: '9 min' },
    { id: 'sleep-traditions',     category: 'Sleep',            title: 'How Every Tradition Thinks About Sleep — And What They All Agree On',              excerpt: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep.', intro: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep.', date: 'March 2025',    readTime: '5 min' },
    { id: 'stress-dimension',     category: 'Stress',           title: 'Allostatic Load: The Hidden Dimension Beneath All Chronic Disease',                excerpt: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently.', intro: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently.', date: 'March 2025',    readTime: '8 min' },
    { id: 'avicenna-canon',       category: 'Avicenna',         title: 'The Six Essential Principles of Health, According to Avicenna',                    excerpt: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six.', intro: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six.', date: 'February 2025', readTime: '6 min' },
    { id: 'tibetan-three-humours', category: 'Tibetan Medicine', title: "Lung, Tripa, Beken: Tibet's Three Humours and the Psychology of Illness",         excerpt: "How Tibetan medicine's three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.", intro: "How Tibetan medicine's three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.", date: 'February 2025', readTime: '7 min' },
    { id: 'swarga-tradition',     category: 'Swarga',           title: 'The Svarga Principle: Synthesis as the Highest Wisdom Tradition',                   excerpt: 'Eight traditions. One intelligence. How HOLOS synthesises five millennia of wellness wisdom into a personalised framework that no single tradition could produce alone.', intro: 'Eight traditions. One intelligence. How HOLOS synthesises five millennia of wellness wisdom into a personalised framework that no single tradition could produce alone.', date: 'January 2025', readTime: '6 min' },
  ],
}

const listingRU: ListingArticles = {
  featured: {
    id:       'what-is-integrative-wellness',
    category: 'Основы',
    title:    'Что такое интегративное здоровье — и почему оно требует восьми традиций?',
    excerpt:  'Пределы отслеживания одного показателя здоровья и почему каждая великая цивилизация разработала полноценную медицинскую философию, которую современная наука только сейчас начинает подтверждать.',
    intro:    'Пределы отслеживания одного показателя здоровья и почему каждая великая цивилизация разработала полноценную медицинскую философию, которую современная наука только сейчас начинает подтверждать.',
    date:     'Июнь 2025',
    readTime: '8 мин',
  },
  articles: [
    { id: 'nine-dimensions',      category: '9 измерений',           title: 'Девять измерений: почему оценка сна без учёта стресса вводит в заблуждение',   excerpt: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS.', intro: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS.', date: 'Май 2025',      readTime: '6 мин' },
    { id: 'doshas-explained',     category: 'Аюрведа',               title: 'Вата, Питта, Капха: исчерпывающее современное объяснение',                    excerpt: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', intro: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', date: 'Май 2025',      readTime: '10 мин' },
    { id: 'rambam-preventive',    category: 'Рамбам',                title: 'Режим здоровья Маймонида: протокол оздоровления XII века',                     excerpt: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится.', intro: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится.', date: 'Апрель 2025',  readTime: '7 мин' },
    { id: 'qi-cultivation',       category: 'Даосская медицина',     title: 'Культивирование ци для скептиков: доказательная база энергетической медицины', excerpt: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад.', intro: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад.', date: 'Апрель 2025',  readTime: '9 мин' },
    { id: 'sleep-traditions',     category: 'Сон',                   title: 'Как каждая традиция понимает сон — и в чём они все едины',                    excerpt: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне.', intro: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне.', date: 'Март 2025',    readTime: '5 мин' },
    { id: 'stress-dimension',     category: 'Стресс',                title: 'Аллостатическая нагрузка: скрытое измерение под всеми хроническими заболеваниями', excerpt: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе.', intro: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе.', date: 'Март 2025',    readTime: '8 мин' },
    { id: 'avicenna-canon',       category: 'Авиценна',              title: 'Шесть основных принципов здоровья по Авиценне',                                excerpt: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть.', intro: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть.', date: 'Февраль 2025', readTime: '6 мин' },
    { id: 'tibetan-three-humours', category: 'Тибетская медицина',   title: 'Лунг, Трипа, Бекен: три хумора Тибета и психология болезни',                  excerpt: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', intro: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', date: 'Февраль 2025', readTime: '7 мин' },
    { id: 'swarga-tradition',     category: 'Сварга',                title: 'Принцип Сварги: синтез как высшая традиция мудрости',                            excerpt: 'Восемь традиций. Один интеллект. Как HOLOS синтезирует пять тысячелетий wellness-мудрости в персонализированную систему, которую ни одна традиция в отдельности не могла бы создать.', intro: 'Восемь традиций. Один интеллект. Как HOLOS синтезирует пять тысячелетий wellness-мудрости в персонализированную систему, которую ни одна традиция в отдельности не могла бы создать.', date: 'Январь 2025', readTime: '6 мин' },
  ],
}

const listingHE: ListingArticles = {
  featured: {
    id:       'what-is-integrative-wellness',
    category: 'יסודות',
    title:    'מהי בריאות אינטגרטיבית — ומדוע היא דורשת שמונה מסורות?',
    excerpt:  'גבולות המעקב אחר מדד בריאות יחיד, ומדוע כל ציביליזציה גדולה פיתחה פילוסופיה רפואית מלאה שהמדע המודרני רק עכשיו מתחיל לאמת.',
    intro:    'גבולות המעקב אחר מדד בריאות יחיד, ומדוע כל ציביליזציה גדולה פיתחה פילוסופיה רפואית מלאה שהמדע המודרני רק עכשיו מתחיל לאמת.',
    date:     'יוני 2025',
    readTime: '8 דקות',
  },
  articles: [
    { id: 'nine-dimensions',      category: '9 מימדים',         title: 'תשע המימדים: מדוע ניקוד שינה ללא לחץ מטעה',                                    excerpt: 'האינטראקציות בין המימדים הן שם שוכן האות האמיתי. צלילה עמוקה למודל תשעת המימדים של HOLOS.', intro: 'האינטראקציות בין המימדים הן שם שוכן האות האמיתי. צלילה עמוקה למודל תשעת המימדים של HOLOS.', date: 'מאי 2025',      readTime: '6 דקות' },
    { id: 'doshas-explained',     category: 'איורוודה',         title: 'וואטה, פיטה, קאפה: ההסבר המודרני המקיף',                                        excerpt: 'מה הדושות באמת אומרות, כיצד הן מזוהות, ומדוע אותה אוכל מרפא קונסטיטוציה אחת ומזיק לאחרת.', intro: 'מה הדושות באמת אומרות, כיצד הן מזוהות, ומדוע אותה אוכל מרפא קונסטיטוציה אחת ומזיק לאחרת.', date: 'מאי 2025',      readTime: '10 דקות' },
    { id: 'rambam-preventive',    category: 'רמב"ם',            title: 'משטר הבריאות של הרמב"ם: פרוטוקול הבריאות מהמאה ה-12',                          excerpt: 'שמונה מאות שנה לפני קיום הרפואה המניעתית, הרמב"ם כתב את מדריכה הסופי. הנה מה שנאמר בו.', intro: 'שמונה מאות שנה לפני קיום הרפואה המניעתית, הרמב"ם כתב את מדריכה הסופי. הנה מה שנאמר בו.', date: 'אפריל 2025',  readTime: '7 דקות' },
    { id: 'qi-cultivation',       category: 'רפואה טאואיסטית', title: "טיפוח צ'י לספקנים: הבסיס המבוסס-ראיות לרפואת אנרגיה",                          excerpt: "מה הביופיזיקה המודרנית אומרת על הרעיונות שהרפואה הטאואיסטית ממפה כבר 3,000 שנה.", intro: "מה הביופיזיקה המודרנית אומרת על הרעיונות שהרפואה הטאואיסטית ממפה כבר 3,000 שנה.", date: 'אפריל 2025',  readTime: '9 דקות' },
    { id: 'sleep-traditions',     category: 'שינה',             title: 'כיצד כל מסורת מבינה שינה — ובמה הן כולן מסכימות',                              excerpt: 'מהרגעת ואטה האיורוודית ועד לשיקום ההומורי ההיפוקרטי — הקונצנזוס הרב-מסורתי המפתיע על שינה מיטבית.', intro: 'מהרגעת ואטה האיורוודית ועד לשיקום ההומורי ההיפוקרטי — הקונצנזוס הרב-מסורתי המפתיע על שינה מיטבית.', date: 'מרץ 2025',    readTime: '5 דקות' },
    { id: 'stress-dimension',     category: 'לחץ',              title: 'עומס אלוסטטי: המימד הנסתר מתחת לכל מחלה כרונית',                              excerpt: 'מהו לחץ ברמה התאית, מדוע רוב התערבויות הלחץ נכשלות, וכיצד HOLOS מודד אותו אחרת.', intro: 'מהו לחץ ברמה התאית, מדוע רוב התערבויות הלחץ נכשלות, וכיצד HOLOS מודד אותו אחרת.', date: 'מרץ 2025',    readTime: '8 דקות' },
    { id: 'avicenna-canon',       category: 'אבן סינא',         title: 'ששת עקרונות הבריאות הבסיסיים לפי אבן סינא',                                    excerpt: 'קאנון הרפואה זיהה שישה גורמים הקובעים בריאות לפני 1,000 שנה. המדע המודרני אישר את כולם.', intro: 'קאנון הרפואה זיהה שישה גורמים הקובעים בריאות לפני 1,000 שנה. המדע המודרני אישר את כולם.', date: 'פברואר 2025', readTime: '6 דקות' },
    { id: 'tibetan-three-humours', category: 'רפואה טיבטית',   title: "לונג, טריפה, בקן: שלושת ה-humors הטיבטיים ופסיכולוגיית המחלה",               excerpt: "כיצד שלוש הניפות של הרפואה הטיבטית ממפות מצבים נפשיים למחלות פיזיות — ומה משמעותה לבריאות הפסיכוסומטית המודרנית.", intro: "כיצד שלוש הניפות של הרפואה הטיבטית ממפות מצבים נפשיים למחלות פיזיות — ומה משמעותה לבריאות הפסיכוסומטית המודרנית.", date: 'פברואר 2025', readTime: '7 דקות' },
    { id: 'swarga-tradition',     category: 'סוורגה',          title: 'עקרון סוורגה: הסינתזה כמסורת החוכמה הגבוהה ביותר',                                  excerpt: 'שמונה מסורות. בינה אחת. כיצד HOLOS מסנתז חמישה אלפי שנה של חוכמת בריאות למסגרת מותאמת אישית שאף מסורת בודדת לא יכלה ליצור לבדה.', intro: 'שמונה מסורות. בינה אחת. כיצד HOLOS מסנתז חמישה אלפי שנה של חוכמת בריאות למסגרת מותאמת אישית שאף מסורת בודדת לא יכלה ליצור לבדה.', date: 'ינואר 2025', readTime: '6 דקות' },
  ],
}

const listingDE: ListingArticles = {
  featured: {
    id:       'what-is-integrative-wellness',
    category: 'Grundlagen',
    title:    'Was ist integrative Wellness — und warum braucht sie acht Traditionen?',
    excerpt:  'Die Grenzen der Einzelkennzahl-Gesundheitsverfolgung und warum jede große Zivilisation eine vollständige medizinische Philosophie entwickelte, die die moderne Wissenschaft gerade erst zu bestätigen beginnt.',
    intro:    'Die Grenzen der Einzelkennzahl-Gesundheitsverfolgung und warum jede große Zivilisation eine vollständige medizinische Philosophie entwickelte, die die moderne Wissenschaft gerade erst zu bestätigen beginnt.',
    date:     'Juni 2025',
    readTime: '8 Min.',
  },
  articles: [
    { id: 'nine-dimensions',      category: '9 Dimensionen',       title: 'Die neun Dimensionen: Warum Schlafbewertung ohne Stress irreführend ist',          excerpt: 'Dimensionsinteraktionen sind das eigentliche Signal. Ein tiefer Einblick in das Neun-Dimensionen-Modell von HOLOS.', intro: 'Dimensionsinteraktionen sind das eigentliche Signal. Ein tiefer Einblick in das Neun-Dimensionen-Modell von HOLOS.', date: 'Mai 2025',      readTime: '6 Min.' },
    { id: 'doshas-explained',     category: 'Ayurveda',            title: 'Vata, Pitta, Kapha: Die definitive moderne Erklärung',                               excerpt: 'Was die Doshas wirklich bedeuten, wie sie bestimmt werden und warum dasselbe Essen eine Konstitution heilt und einer anderen schadet.', intro: 'Was die Doshas wirklich bedeuten, wie sie bestimmt werden und warum dasselbe Essen eine Konstitution heilt und einer anderen schadet.', date: 'Mai 2025',      readTime: '10 Min.' },
    { id: 'rambam-preventive',    category: 'Rambam',              title: "Maimonides' Gesundheitsregimen: Das Wellness-Protokoll des 12. Jahrhunderts",        excerpt: 'Achthundert Jahre vor der Präventivmedizin schrieb der Rambam ihren endgültigen Leitfaden. Hier ist, was darin steht.', intro: 'Achthundert Jahre vor der Präventivmedizin schrieb der Rambam ihren endgültigen Leitfaden. Hier ist, was darin steht.', date: 'April 2025',   readTime: '7 Min.' },
    { id: 'qi-cultivation',       category: 'Daoistische Medizin', title: 'Qi-Kultivierung für Skeptiker: Der evidenzbasierte Fall für Energiemedizin',         excerpt: 'Was die moderne Biophysik über die Konzepte sagt, die die daoistische Medizin seit 3.000 Jahren kartiert.', intro: 'Was die moderne Biophysik über die Konzepte sagt, die die daoistische Medizin seit 3.000 Jahren kartiert.', date: 'April 2025',   readTime: '9 Min.' },
    { id: 'sleep-traditions',     category: 'Schlaf',              title: 'Wie jede Tradition über Schlaf denkt — und was sie alle gemeinsam haben',             excerpt: 'Von Ayurvedischer Vata-Beruhigung bis zur hippokratischen Humoral-Wiederherstellung — der überraschende traditionenübergreifende Konsens.', intro: 'Von Ayurvedischer Vata-Beruhigung bis zur hippokratischen Humoral-Wiederherstellung — der überraschende traditionenübergreifende Konsens.', date: 'März 2025',    readTime: '5 Min.' },
    { id: 'stress-dimension',     category: 'Stress',              title: 'Allostatische Last: Die verborgene Dimension unter allen chronischen Krankheiten',    excerpt: 'Was Stress auf zellulärer Ebene wirklich ist, warum die meisten Stressinterventionen scheitern und wie HOLOS ihn anders misst.', intro: 'Was Stress auf zellulärer Ebene wirklich ist, warum die meisten Stressinterventionen scheitern und wie HOLOS ihn anders misst.', date: 'März 2025',    readTime: '8 Min.' },
    { id: 'avicenna-canon',       category: 'Avicenna',            title: 'Die sechs wesentlichen Gesundheitsprinzipien nach Avicenna',                          excerpt: 'Der Canon der Medizin identifizierte vor 1.000 Jahren sechs gesundheitsbestimmende Faktoren. Die moderne Wissenschaft hat alle sechs bestätigt.', intro: 'Der Canon der Medizin identifizierte vor 1.000 Jahren sechs gesundheitsbestimmende Faktoren. Die moderne Wissenschaft hat alle sechs bestätigt.', date: 'Februar 2025', readTime: '6 Min.' },
    { id: 'tibetan-three-humours', category: 'Tibetische Medizin', title: "Lung, Tripa, Beken: Tibets drei Humor und die Psychologie der Krankheit",            excerpt: "Wie die drei Nyépa der tibetischen Medizin mentale Zustände auf physische Erkrankungen abbilden — und was das für die moderne Psychosomatik bedeutet.", intro: "Wie die drei Nyépa der tibetischen Medizin mentale Zustände auf physische Erkrankungen abbilden — und was das für die moderne Psychosomatik bedeutet.", date: 'Februar 2025', readTime: '7 Min.' },
    { id: 'swarga-tradition',     category: 'Swarga',            title: 'Das Svarga-Prinzip: Synthese als höchste Weisheitstradition',                         excerpt: 'Acht Traditionen. Eine Intelligenz. Wie HOLOS fünf Jahrtausende Wellness-Weisheit in ein personalisiertes Framework synthetisiert, das keine einzelne Tradition alleine hätte schaffen können.', intro: 'Acht Traditionen. Eine Intelligenz. Wie HOLOS fünf Jahrtausende Wellness-Weisheit in ein personalisiertes Framework synthetisiert, das keine einzelne Tradition alleine hätte schaffen können.', date: 'Januar 2025', readTime: '6 Min.' },
  ],
}

export const LISTING_ARTICLES: Record<Locale, ListingArticles> = {
  en: listingEN,
  ru: listingRU,
  he: listingHE,
  de: listingDE,
}

// ── Slug-page article metadata (knowledge/[slug]/page.tsx) ───────────────────

export type SlugArticleMeta = {
  title:    string
  category: string
  intro:    string
  date:     string
  readTime: string
}

const slugMetaEN: Record<string, SlugArticleMeta> = {
  // ── Listing article slugs (nine-dimensions, doshas-explained, etc.) ──────────
  'what-is-integrative-wellness':  { title: 'What Is Integrative Wellness — And Why Does It Require Eight Traditions?', category: 'Foundation',       intro: 'The limits of single-metric health tracking, and why every major civilisation developed a complete medical philosophy that modern science is only now beginning to validate.', date: 'June 2025',     readTime: '8 min read' },
  'nine-dimensions':               { title: 'The Nine Dimensions: Why Scoring Sleep Without Stress Is Misleading',      category: 'Nine Dimensions',       intro: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model and why a siloed approach to wellness measurement is guaranteed to mislead.', date: 'May 2025',      readTime: '6 min read' },
  'doshas-explained':              { title: 'Vata, Pitta, Kapha: The Definitive Modern Explanation',                     category: 'Ayurveda',         intro: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', date: 'May 2025',      readTime: '10 min read' },
  'rambam-preventive':             { title: "Maimonides's Regimen of Health: The 12th-Century Wellness Protocol",       category: 'Rambam',           intro: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says — and why it still works.', date: 'April 2025',    readTime: '7 min read' },
  'qi-cultivation':                { title: 'Qi Cultivation for Sceptics: The Evidence-Based Case for Energy Medicine', category: 'Daoist Medicine',  intro: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years — and why the sceptic\'s dismissal misses something important.', date: 'April 2025',    readTime: '9 min read' },
  'sleep-traditions':              { title: 'How Every Tradition Thinks About Sleep — And What They All Agree On',      category: 'Sleep',            intro: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep that modern chronobiology is now confirming.', date: 'March 2025',    readTime: '5 min read' },
  'stress-dimension':              { title: 'Allostatic Load: The Hidden Dimension Beneath All Chronic Disease',        category: 'Stress',           intro: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently from every other wellness platform.', date: 'March 2025',    readTime: '8 min read' },
  'avicenna-canon':                { title: 'The Six Essential Principles of Health, According to Avicenna',            category: 'Avicenna',         intro: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six — and the implications for how we structure wellness are profound.', date: 'February 2025', readTime: '6 min read' },
  'tibetan-three-humours':         { title: "Lung, Tripa, Beken: Tibet's Three Humours and the Psychology of Illness", category: 'Tibetan Medicine', intro: "How Tibetan medicine's three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.", date: 'February 2025', readTime: '7 min read' },
  // ── Deep article slugs ───────────────────────────────────────────────────────
  'integrative-wellness-science':  { title: 'The Science Behind Integrative Wellness',                             category: 'Research',         intro: 'Modern research is confirming what ancient traditions have long understood: the human organism is an integrated whole, not a collection of independent parts.',                                          date: 'May 2025',       readTime: '8 min read' },
  'sleep-recovery-ancient':        { title: 'Sleep & Recovery: What Ancient Wisdom Gets Right',                    category: 'Sleep',            intro: 'Before sleep trackers and polysomnography, ancient physicians built sophisticated frameworks for rest and recovery — frameworks that modern chronobiology is now validating in remarkable detail.',  date: 'April 2025',     readTime: '6 min read' },
  'nutrition-frameworks':          { title: 'Nutrition Across 8 Frameworks: A Comparative Guide',                  category: 'Nutrition',        intro: "Every major wellness tradition has a nutritional philosophy. Rather than choosing between them, HOLOS identifies which framework's dietary principles align with your constitutional type.",          date: 'March 2025',     readTime: '10 min read' },
  'stress-resilience-traditions':  { title: 'Stress Resilience: Lessons from Five Millennia',                     category: 'Stress',           intro: 'Stress is not a modern invention. Every wisdom tradition developed sophisticated tools for building resilience — tools now corroborated by stress physiology and psychoneuroimmunology.',           date: 'February 2025',  readTime: '7 min read' },
  'movement-medicine':             { title: 'Movement as Medicine: The Cross-Traditional Consensus',               category: 'Movement',         intro: 'No tradition in the HOLOS framework recommends sedentary living. Movement is universally prescribed as medicine — but the dose, type, and timing differ by constitution, season, and current health state.', date: 'January 2025',   readTime: '5 min read' },
  'emotional-intelligence-holos':  { title: 'Emotional Intelligence in the HOLOS Framework',                      category: 'Emotional Health', intro: 'Emotional intelligence is not a soft skill — it is a measurable physiological capacity with direct implications for immune function, cardiovascular health, and cognitive performance.',          date: 'December 2024',  readTime: '6 min read' },
  'purpose-longevity':             { title: 'Purpose & Longevity: What the Research Actually Shows',               category: 'Purpose',          intro: 'Having a reason to get up in the morning is not a philosophical luxury — it is a measurable biological variable that predicts mortality, resilience, and health behaviour across decades.',         date: 'November 2024',  readTime: '5 min read' },
  'rambam-modern-wellness':        { title: 'Maimonides: The 12th-Century Physician Ahead of His Time',           category: 'Swarga',       intro: 'Rabbi Moses ben Maimon (1138–1204) was the court physician to the Sultan of Egypt and a philosopher who synthesized Aristotle with Torah. His medical writings anticipate modern preventive medicine with unsettling precision.', date: 'October 2024', readTime: '7 min read' },
  'swarga-tradition':              { title: 'The Svarga Principle: Synthesis as the Highest Wisdom Tradition',    category: 'Swarga',       intro: 'Eight traditions. One intelligence. How HOLOS synthesises five millennia of wellness wisdom into a personalised framework that no single tradition could produce alone — and why the synthesis itself is the breakthrough.', date: 'January 2025', readTime: '6 min read' },
}

const slugMetaRU: Record<string, SlugArticleMeta> = {
  // ── Listing article slugs ────────────────────────────────────────────────────
  'what-is-integrative-wellness':  { title: 'Что такое интегративное здоровье — и почему оно требует восьми традиций?', category: 'Основы',               intro: 'Пределы отслеживания одного показателя здоровья и почему каждая великая цивилизация разработала полноценную медицинскую философию, которую современная наука только сейчас начинает подтверждать.', date: 'Июнь 2025',     readTime: '8 мин' },
  'nine-dimensions':               { title: 'Девять измерений: почему оценка сна без учёта стресса вводит в заблуждение', category: '9 измерений',            intro: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS и почему изолированный подход к измерению здоровья обречён вводить в заблуждение.', date: 'Май 2025',      readTime: '6 мин' },
  'doshas-explained':              { title: 'Вата, Питта, Капха: исчерпывающее современное объяснение',                  category: 'Аюрведа',           intro: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', date: 'Май 2025',      readTime: '10 мин' },
  'rambam-preventive':             { title: 'Режим здоровья Маймонида: протокол оздоровления XII века',                  category: 'Рамбам',            intro: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится — и почему это до сих пор работает.', date: 'Апрель 2025',  readTime: '7 мин' },
  'qi-cultivation':                { title: 'Культивирование ци для скептиков: доказательная база энергетической медицины', category: 'Даосская медицина', intro: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад — и почему скептическое отрицание упускает нечто важное.', date: 'Апрель 2025',  readTime: '9 мин' },
  'sleep-traditions':              { title: 'Как каждая традиция понимает сон — и в чём они все едины',                  category: 'Сон',               intro: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне, который современная хронобиология теперь подтверждает.', date: 'Март 2025',    readTime: '5 мин' },
  'stress-dimension':              { title: 'Аллостатическая нагрузка: скрытое измерение под всеми хроническими заболеваниями', category: 'Стресс',     intro: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе, чем любая другая платформа оздоровления.', date: 'Март 2025',    readTime: '8 мин' },
  'avicenna-canon':                { title: 'Шесть основных принципов здоровья по Авиценне',                             category: 'Авиценна',          intro: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть — и это имеет глубокие последствия для подхода к оздоровлению.', date: 'Февраль 2025', readTime: '6 мин' },
  'tibetan-three-humours':         { title: 'Лунг, Трипа, Бекен: три хумора Тибета и психология болезни',               category: 'Тибетская медицина', intro: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', date: 'Февраль 2025', readTime: '7 мин' },
  // ── Deep article slugs ───────────────────────────────────────────────────────
  'integrative-wellness-science':  { title: 'Наука об интегративном здоровье',                               category: 'Исследования',        intro: 'Современная наука подтверждает то, что древние традиции давно понимали: человеческий организм — единое целое, а не набор независимых частей.',       