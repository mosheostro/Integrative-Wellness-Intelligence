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
    { id: 'nine-dimensions',      category: 'Assessment',       title: 'The Nine Dimensions: Why Scoring Sleep Without Stress Is Misleading',             excerpt: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model.', intro: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model.', date: 'May 2025',      readTime: '6 min' },
    { id: 'doshas-explained',     category: 'Ayurveda',         title: 'Vata, Pitta, Kapha: The Definitive Modern Explanation',                            excerpt: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', intro: 'What the doshas actually mean, how they are identified, and why the same food heals one constitution and harms another.', date: 'May 2025',      readTime: '10 min' },
    { id: 'rambam-preventive',    category: 'Rambam',           title: "Maimonides's Regimen of Health: The 12th-Century Wellness Protocol",               excerpt: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says.', intro: 'Eight centuries before preventive medicine existed, Rambam wrote its definitive guide. Here is what it says.', date: 'April 2025',    readTime: '7 min' },
    { id: 'qi-cultivation',       category: 'Daoist Medicine',  title: 'Qi Cultivation for Sceptics: The Evidence-Based Case for Energy Medicine',         excerpt: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years.', intro: 'What modern biophysics says about the concepts Daoist medicine has mapped for 3,000 years.', date: 'April 2025',    readTime: '9 min' },
    { id: 'sleep-traditions',     category: 'Sleep',            title: 'How Every Tradition Thinks About Sleep — And What They All Agree On',              excerpt: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep.', intro: 'From Ayurvedic Vata pacification to Hippocratic humoral restoration — the surprising cross-tradition consensus on optimal sleep.', date: 'March 2025',    readTime: '5 min' },
    { id: 'stress-dimension',     category: 'Stress',           title: 'Allostatic Load: The Hidden Dimension Beneath All Chronic Disease',                excerpt: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently.', intro: 'What stress actually is at the cellular level, why most stress interventions fail, and how HOLOS measures it differently.', date: 'March 2025',    readTime: '8 min' },
    { id: 'avicenna-canon',       category: 'Avicenna',         title: 'The Six Essential Principles of Health, According to Avicenna',                    excerpt: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six.', intro: 'The Canon of Medicine identified six factors that determine health 1,000 years ago. Modern science has confirmed all six.', date: 'February 2025', readTime: '6 min' },
    { id: 'tibetan-three-humours', category: 'Tibetan Medicine', title: "Lung, Tripa, Beken: Tibet's Three Humours and the Psychology of Illness",         excerpt: "How Tibetan medicine's three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.", intro: "How Tibetan medicine's three nyépa map mental states to physical disease — and what that means for modern psychosomatic health.", date: 'February 2025', readTime: '7 min' },
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
    { id: 'nine-dimensions',      category: 'Оценка',                title: 'Девять измерений: почему оценка сна без учёта стресса вводит в заблуждение',   excerpt: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS.', intro: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS.', date: 'Май 2025',      readTime: '6 мин' },
    { id: 'doshas-explained',     category: 'Аюрведа',               title: 'Вата, Питта, Капха: исчерпывающее современное объяснение',                    excerpt: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', intro: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', date: 'Май 2025',      readTime: '10 мин' },
    { id: 'rambam-preventive',    category: 'Рамбам',                title: 'Режим здоровья Маймонида: протокол оздоровления XII века',                     excerpt: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится.', intro: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится.', date: 'Апрель 2025',  readTime: '7 мин' },
    { id: 'qi-cultivation',       category: 'Даосская медицина',     title: 'Культивирование ци для скептиков: доказательная база энергетической медицины', excerpt: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад.', intro: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад.', date: 'Апрель 2025',  readTime: '9 мин' },
    { id: 'sleep-traditions',     category: 'Сон',                   title: 'Как каждая традиция понимает сон — и в чём они все едины',                    excerpt: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне.', intro: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне.', date: 'Март 2025',    readTime: '5 мин' },
    { id: 'stress-dimension',     category: 'Стресс',                title: 'Аллостатическая нагрузка: скрытое измерение под всеми хроническими заболеваниями', excerpt: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе.', intro: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе.', date: 'Март 2025',    readTime: '8 мин' },
    { id: 'avicenna-canon',       category: 'Авиценна',              title: 'Шесть основных принципов здоровья по Авиценне',                                excerpt: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть.', intro: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть.', date: 'Февраль 2025', readTime: '6 мин' },
    { id: 'tibetan-three-humours', category: 'Тибетская медицина',   title: 'Лунг, Трипа, Бекен: три хумора Тибета и психология болезни',                  excerpt: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', intro: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', date: 'Февраль 2025', readTime: '7 мин' },
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
    { id: 'nine-dimensions',      category: 'הערכה',            title: 'תשע המימדים: מדוע ניקוד שינה ללא לחץ מטעה',                                    excerpt: 'האינטראקציות בין המימדים הן שם שוכן האות האמיתי. צלילה עמוקה למודל תשעת המימדים של HOLOS.', intro: 'האינטראקציות בין המימדים הן שם שוכן האות האמיתי. צלילה עמוקה למודל תשעת המימדים של HOLOS.', date: 'מאי 2025',      readTime: '6 דקות' },
    { id: 'doshas-explained',     category: 'איורוודה',         title: 'וואטה, פיטה, קאפה: ההסבר המודרני המקיף',                                        excerpt: 'מה הדושות באמת אומרות, כיצד הן מזוהות, ומדוע אותה אוכל מרפא קונסטיטוציה אחת ומזיק לאחרת.', intro: 'מה הדושות באמת אומרות, כיצד הן מזוהות, ומדוע אותה אוכל מרפא קונסטיטוציה אחת ומזיק לאחרת.', date: 'מאי 2025',      readTime: '10 דקות' },
    { id: 'rambam-preventive',    category: 'רמב"ם',            title: 'משטר הבריאות של הרמב"ם: פרוטוקול הבריאות מהמאה ה-12',                          excerpt: 'שמונה מאות שנה לפני קיום הרפואה המניעתית, הרמב"ם כתב את מדריכה הסופי. הנה מה שנאמר בו.', intro: 'שמונה מאות שנה לפני קיום הרפואה המניעתית, הרמב"ם כתב את מדריכה הסופי. הנה מה שנאמר בו.', date: 'אפריל 2025',  readTime: '7 דקות' },
    { id: 'qi-cultivation',       category: 'רפואה טאואיסטית', title: "טיפוח צ'י לספקנים: הבסיס המבוסס-ראיות לרפואת אנרגיה",                          excerpt: "מה הביופיזיקה המודרנית אומרת על הרעיונות שהרפואה הטאואיסטית ממפה כבר 3,000 שנה.", intro: "מה הביופיזיקה המודרנית אומרת על הרעיונות שהרפואה הטאואיסטית ממפה כבר 3,000 שנה.", date: 'אפריל 2025',  readTime: '9 דקות' },
    { id: 'sleep-traditions',     category: 'שינה',             title: 'כיצד כל מסורת מבינה שינה — ובמה הן כולן מסכימות',                              excerpt: 'מהרגעת ואטה האיורוודית ועד לשיקום ההומורי ההיפוקרטי — הקונצנזוס הרב-מסורתי המפתיע על שינה מיטבית.', intro: 'מהרגעת ואטה האיורוודית ועד לשיקום ההומורי ההיפוקרטי — הקונצנזוס הרב-מסורתי המפתיע על שינה מיטבית.', date: 'מרץ 2025',    readTime: '5 דקות' },
    { id: 'stress-dimension',     category: 'לחץ',              title: 'עומס אלוסטטי: המימד הנסתר מתחת לכל מחלה כרונית',                              excerpt: 'מהו לחץ ברמה התאית, מדוע רוב התערבויות הלחץ נכשלות, וכיצד HOLOS מודד אותו אחרת.', intro: 'מהו לחץ ברמה התאית, מדוע רוב התערבויות הלחץ נכשלות, וכיצד HOLOS מודד אותו אחרת.', date: 'מרץ 2025',    readTime: '8 דקות' },
    { id: 'avicenna-canon',       category: 'אבן סינא',         title: 'ששת עקרונות הבריאות הבסיסיים לפי אבן סינא',                                    excerpt: 'קאנון הרפואה זיהה שישה גורמים הקובעים בריאות לפני 1,000 שנה. המדע המודרני אישר את כולם.', intro: 'קאנון הרפואה זיהה שישה גורמים הקובעים בריאות לפני 1,000 שנה. המדע המודרני אישר את כולם.', date: 'פברואר 2025', readTime: '6 דקות' },
    { id: 'tibetan-three-humours', category: 'רפואה טיבטית',   title: "לונג, טריפה, בקן: שלושת ה-humors הטיבטיים ופסיכולוגיית המחלה",               excerpt: "כיצד שלוש הניפות של הרפואה הטיבטית ממפות מצבים נפשיים למחלות פיזיות — ומה משמעותה לבריאות הפסיכוסומטית המודרנית.", intro: "כיצד שלוש הניפות של הרפואה הטיבטית ממפות מצבים נפשיים למחלות פיזיות — ומה משמעותה לבריאות הפסיכוסומטית המודרנית.", date: 'פברואר 2025', readTime: '7 דקות' },
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
    { id: 'nine-dimensions',      category: 'Bewertung',           title: 'Die neun Dimensionen: Warum Schlafbewertung ohne Stress irreführend ist',          excerpt: 'Dimensionsinteraktionen sind das eigentliche Signal. Ein tiefer Einblick in das Neun-Dimensionen-Modell von HOLOS.', intro: 'Dimensionsinteraktionen sind das eigentliche Signal. Ein tiefer Einblick in das Neun-Dimensionen-Modell von HOLOS.', date: 'Mai 2025',      readTime: '6 Min.' },
    { id: 'doshas-explained',     category: 'Ayurveda',            title: 'Vata, Pitta, Kapha: Die definitive moderne Erklärung',                               excerpt: 'Was die Doshas wirklich bedeuten, wie sie bestimmt werden und warum dasselbe Essen eine Konstitution heilt und einer anderen schadet.', intro: 'Was die Doshas wirklich bedeuten, wie sie bestimmt werden und warum dasselbe Essen eine Konstitution heilt und einer anderen schadet.', date: 'Mai 2025',      readTime: '10 Min.' },
    { id: 'rambam-preventive',    category: 'Rambam',              title: "Maimonides' Gesundheitsregimen: Das Wellness-Protokoll des 12. Jahrhunderts",        excerpt: 'Achthundert Jahre vor der Präventivmedizin schrieb der Rambam ihren endgültigen Leitfaden. Hier ist, was darin steht.', intro: 'Achthundert Jahre vor der Präventivmedizin schrieb der Rambam ihren endgültigen Leitfaden. Hier ist, was darin steht.', date: 'April 2025',   readTime: '7 Min.' },
    { id: 'qi-cultivation',       category: 'Daoistische Medizin', title: 'Qi-Kultivierung für Skeptiker: Der evidenzbasierte Fall für Energiemedizin',         excerpt: 'Was die moderne Biophysik über die Konzepte sagt, die die daoistische Medizin seit 3.000 Jahren kartiert.', intro: 'Was die moderne Biophysik über die Konzepte sagt, die die daoistische Medizin seit 3.000 Jahren kartiert.', date: 'April 2025',   readTime: '9 Min.' },
    { id: 'sleep-traditions',     category: 'Schlaf',              title: 'Wie jede Tradition über Schlaf denkt — und was sie alle gemeinsam haben',             excerpt: 'Von Ayurvedischer Vata-Beruhigung bis zur hippokratischen Humoral-Wiederherstellung — der überraschende traditionenübergreifende Konsens.', intro: 'Von Ayurvedischer Vata-Beruhigung bis zur hippokratischen Humoral-Wiederherstellung — der überraschende traditionenübergreifende Konsens.', date: 'März 2025',    readTime: '5 Min.' },
    { id: 'stress-dimension',     category: 'Stress',              title: 'Allostatische Last: Die verborgene Dimension unter allen chronischen Krankheiten',    excerpt: 'Was Stress auf zellulärer Ebene wirklich ist, warum die meisten Stressinterventionen scheitern und wie HOLOS ihn anders misst.', intro: 'Was Stress auf zellulärer Ebene wirklich ist, warum die meisten Stressinterventionen scheitern und wie HOLOS ihn anders misst.', date: 'März 2025',    readTime: '8 Min.' },
    { id: 'avicenna-canon',       category: 'Avicenna',            title: 'Die sechs wesentlichen Gesundheitsprinzipien nach Avicenna',                          excerpt: 'Der Canon der Medizin identifizierte vor 1.000 Jahren sechs gesundheitsbestimmende Faktoren. Die moderne Wissenschaft hat alle sechs bestätigt.', intro: 'Der Canon der Medizin identifizierte vor 1.000 Jahren sechs gesundheitsbestimmende Faktoren. Die moderne Wissenschaft hat alle sechs bestätigt.', date: 'Februar 2025', readTime: '6 Min.' },
    { id: 'tibetan-three-humours', category: 'Tibetische Medizin', title: "Lung, Tripa, Beken: Tibets drei Humor und die Psychologie der Krankheit",            excerpt: "Wie die drei Nyépa der tibetischen Medizin mentale Zustände auf physische Erkrankungen abbilden — und was das für die moderne Psychosomatik bedeutet.", intro: "Wie die drei Nyépa der tibetischen Medizin mentale Zustände auf physische Erkrankungen abbilden — und was das für die moderne Psychosomatik bedeutet.", date: 'Februar 2025', readTime: '7 Min.' },
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
  'nine-dimensions':               { title: 'The Nine Dimensions: Why Scoring Sleep Without Stress Is Misleading',      category: 'Assessment',       intro: 'Dimension interactions are where the real signal lives. A deep dive into the HOLOS nine-dimension model and why a siloed approach to wellness measurement is guaranteed to mislead.', date: 'May 2025',      readTime: '6 min read' },
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
  'rambam-modern-wellness':        { title: 'Maimonides: The 12th-Century Physician Ahead of His Time',           category: 'Traditions',       intro: 'Rabbi Moses ben Maimon (1138–1204) was the court physician to the Sultan of Egypt and a philosopher who synthesized Aristotle with Torah. His medical writings anticipate modern preventive medicine with unsettling precision.', date: 'October 2024', readTime: '7 min read' },
}

const slugMetaRU: Record<string, SlugArticleMeta> = {
  // ── Listing article slugs ────────────────────────────────────────────────────
  'what-is-integrative-wellness':  { title: 'Что такое интегративное здоровье — и почему оно требует восьми традиций?', category: 'Основы',               intro: 'Пределы отслеживания одного показателя здоровья и почему каждая великая цивилизация разработала полноценную медицинскую философию, которую современная наука только сейчас начинает подтверждать.', date: 'Июнь 2025',     readTime: '8 мин' },
  'nine-dimensions':               { title: 'Девять измерений: почему оценка сна без учёта стресса вводит в заблуждение', category: 'Оценка',            intro: 'Взаимодействие между измерениями — это то, где живёт настоящий сигнал. Глубокое погружение в модель девяти измерений HOLOS и почему изолированный подход к измерению здоровья обречён вводить в заблуждение.', date: 'Май 2025',      readTime: '6 мин' },
  'doshas-explained':              { title: 'Вата, Питта, Капха: исчерпывающее современное объяснение',                  category: 'Аюрведа',           intro: 'Что на самом деле означают доши, как их определяют и почему одна и та же еда исцеляет одну конституцию и вредит другой.', date: 'Май 2025',      readTime: '10 мин' },
  'rambam-preventive':             { title: 'Режим здоровья Маймонида: протокол оздоровления XII века',                  category: 'Рамбам',            intro: 'За восемь веков до появления превентивной медицины Рамбам написал её окончательное руководство. Вот что в нём говорится — и почему это до сих пор работает.', date: 'Апрель 2025',  readTime: '7 мин' },
  'qi-cultivation':                { title: 'Культивирование ци для скептиков: доказательная база энергетической медицины', category: 'Даосская медицина', intro: 'Что современная биофизика говорит о концепциях, которые даосская медицина описывала 3000 лет назад — и почему скептическое отрицание упускает нечто важное.', date: 'Апрель 2025',  readTime: '9 мин' },
  'sleep-traditions':              { title: 'Как каждая традиция понимает сон — и в чём они все едины',                  category: 'Сон',               intro: 'От успокоения вата в аюрведе до гуморального восстановления по Гиппократу — удивительный межтрадиционный консенсус об оптимальном сне, который современная хронобиология теперь подтверждает.', date: 'Март 2025',    readTime: '5 мин' },
  'stress-dimension':              { title: 'Аллостатическая нагрузка: скрытое измерение под всеми хроническими заболеваниями', category: 'Стресс',     intro: 'Что такое стресс на клеточном уровне, почему большинство методов борьбы со стрессом не работают и как HOLOS измеряет его иначе, чем любая другая платформа оздоровления.', date: 'Март 2025',    readTime: '8 мин' },
  'avicenna-canon':                { title: 'Шесть основных принципов здоровья по Авиценне',                             category: 'Авиценна',          intro: 'Канон медицины выделил шесть факторов, определяющих здоровье, 1000 лет назад. Современная наука подтвердила все шесть — и это имеет глубокие последствия для подхода к оздоровлению.', date: 'Февраль 2025', readTime: '6 мин' },
  'tibetan-three-humours':         { title: 'Лунг, Трипа, Бекен: три хумора Тибета и психология болезни',               category: 'Тибетская медицина', intro: 'Как три ньепа тибетской медицины связывают психические состояния с физическими болезнями — и что это значит для современного психосоматического здоровья.', date: 'Февраль 2025', readTime: '7 мин' },
  // ── Deep article slugs ───────────────────────────────────────────────────────
  'integrative-wellness-science':  { title: 'Наука об интегративном здоровье',                               category: 'Исследования',        intro: 'Современная наука подтверждает то, что древние традиции давно понимали: человеческий организм — единое целое, а не набор независимых частей.',                                                     date: 'Май 2025',       readTime: '8 мин' },
  'sleep-recovery-ancient':        { title: 'Сон и восстановление: что правильно понимала древняя мудрость',  category: 'Сон',                 intro: 'До появления датчиков сна и полисомнографии древние врачи создали сложные системы отдыха и восстановления — системы, которые современная хронобиология подтверждает с поразительной точностью.',  date: 'Апрель 2025',    readTime: '6 мин' },
  'nutrition-frameworks':          { title: 'Питание в восьми системах: сравнительное руководство',           category: 'Питание',             intro: 'Каждая великая традиция оздоровления имеет свою философию питания. HOLOS определяет, принципы какой системы питания соответствуют вашему конституциональному типу.',                              date: 'Март 2025',      readTime: '10 мин' },
  'stress-resilience-traditions':  { title: 'Стрессоустойчивость: уроки пяти тысячелетий',                   category: 'Стресс',              intro: 'Стресс — не современное изобретение. Каждая традиция мудрости разработала изощрённые инструменты для повышения устойчивости — инструменты, которые ныне подтверждаются физиологией стресса.',   date: 'Февраль 2025',   readTime: '7 мин' },
  'movement-medicine':             { title: 'Движение как медицина: межтрадиционный консенсус',               category: 'Движение',            intro: 'Ни одна традиция в системе HOLOS не рекомендует малоподвижный образ жизни. Движение повсеместно предписывается как медицина, но доза, тип и время различаются в зависимости от конституции.',     date: 'Январь 2025',    readTime: '5 мин' },
  'emotional-intelligence-holos':  { title: 'Эмоциональный интеллект в системе HOLOS',                       category: 'Эмоциональное здоровье', intro: 'Эмоциональный интеллект — не мягкий навык, а измеримая физиологическая способность с прямыми последствиями для иммунной функции, здоровья сердца и когнитивных показателей.',                  date: 'Декабрь 2024',   readTime: '6 мин' },
  'purpose-longevity':             { title: 'Цель и долголетие: что на самом деле показывают исследования',   category: 'Цель',                intro: 'Наличие причины вставать по утрам — не философская роскошь, а измеримая биологическая переменная, которая предсказывает смертность, устойчивость и поведение в отношении здоровья.',            date: 'Ноябрь 2024',    readTime: '5 мин' },
  'rambam-modern-wellness':        { title: 'Маймонид: врач XII века, опередивший своё время',               category: 'Традиции',            intro: 'Рабби Моше бен Маймон (1138–1204) был придворным врачом Египетского Султана и философом, синтезировавшим Аристотеля с Торой. Его медицинские труды предвосхищают современную превентивную медицину.', date: 'Октябрь 2024', readTime: '7 мин' },
}

const slugMetaHE: Record<string, SlugArticleMeta> = {
  // ── Listing article slugs ────────────────────────────────────────────────────
  'what-is-integrative-wellness':  { title: 'מהי בריאות אינטגרטיבית — ומדוע היא דורשת שמונה מסורות?',             category: 'יסודות',           intro: 'גבולות המעקב אחר מדד בריאות יחיד, ומדוע כל ציביליזציה גדולה פיתחה פילוסופיה רפואית מלאה שהמדע המודרני רק עכשיו מתחיל לאמת.', date: 'יוני 2025',     readTime: '8 דקות' },
  'nine-dimensions':               { title: 'תשע המימדים: מדוע ניקוד שינה ללא לחץ מטעה',                          category: 'הערכה',            intro: 'האינטראקציות בין המימדים הן שם שוכן האות האמיתי. צלילה עמוקה למודל תשעת המימדים של HOLOS ומדוע גישה מבודדת למדידת בריאות מובטחת להוליך שולל.', date: 'מאי 2025',      readTime: '6 דקות' },
  'doshas-explained':              { title: 'וואטה, פיטה, קאפה: ההסבר המודרני המקיף',                              category: 'איורוודה',         intro: 'מה הדושות באמת אומרות, כיצד הן מזוהות, ומדוע אותה אוכל מרפא קונסטיטוציה אחת ומזיק לאחרת.', date: 'מאי 2025',      readTime: '10 דקות' },
  'rambam-preventive':             { title: 'משטר הבריאות של הרמב"ם: פרוטוקול הבריאות מהמאה ה-12',               category: 'רמב"ם',            intro: 'שמונה מאות שנה לפני קיום הרפואה המניעתית, הרמב"ם כתב את מדריכה הסופי. הנה מה שנאמר בו — ומדוע זה עדיין עובד.', date: 'אפריל 2025',  readTime: '7 דקות' },
  'qi-cultivation':                { title: "טיפוח צ'י לספקנים: הבסיס המבוסס-ראיות לרפואת אנרגיה",               category: 'רפואה טאואיסטית', intro: "מה הביופיזיקה המודרנית אומרת על הרעיונות שהרפואה הטאואיסטית ממפה כבר 3,000 שנה — ומדוע הדחייה הספקנית מפספסת משהו חשוב.", date: 'אפריל 2025',  readTime: '9 דקות' },
  'sleep-traditions':              { title: 'כיצד כל מסורת מבינה שינה — ובמה הן כולן מסכימות',                   category: 'שינה',             intro: 'מהרגעת ואטה האיורוודית ועד לשיקום ההומורי ההיפוקרטי — הקונצנזוס הרב-מסורתי המפתיע על שינה מיטבית שהכרונוביולוגיה המודרנית מאשרת כעת.', date: 'מרץ 2025',    readTime: '5 דקות' },
  'stress-dimension':              { title: 'עומס אלוסטטי: המימד הנסתר מתחת לכל מחלה כרונית',                    category: 'לחץ',              intro: 'מהו לחץ ברמה התאית, מדוע רוב התערבויות הלחץ נכשלות, וכיצד HOLOS מודד אותו אחרת מכל פלטפורמת בריאות אחרת.', date: 'מרץ 2025',    readTime: '8 דקות' },
  'avicenna-canon':                { title: 'ששת עקרונות הבריאות הבסיסיים לפי אבן סינא',                          category: 'אבן סינא',         intro: 'קאנון הרפואה זיהה שישה גורמים הקובעים בריאות לפני 1,000 שנה. המדע המודרני אישר את כולם — וההשלכות על אופן מבנה הבריאות הן עמוקות.', date: 'פברואר 2025', readTime: '6 דקות' },
  'tibetan-three-humours':         { title: "לונג, טריפה, בקן: שלושת ה-humors הטיבטיים ופסיכולוגיית המחלה",     category: 'רפואה טיבטית',    intro: "כיצד שלוש הניפות של הרפואה הטיבטית ממפות מצבים נפשיים למחלות פיזיות — ומה משמעותה לבריאות הפסיכוסומטית המודרנית.", date: 'פברואר 2025', readTime: '7 דקות' },
  // ── Deep article slugs ───────────────────────────────────────────────────────
  'integrative-wellness-science':  { title: 'המדע מאחורי הבריאות האינטגרטיבית',                                category: 'מחקר',              intro: 'המחקר המודרני מאשר את מה שהמסורות העתיקות הבינו זה מכבר: האורגניזם האנושי הוא שלם משולב, לא אוסף של חלקים עצמאיים.',                                                                          date: 'מאי 2025',       readTime: '8 דקות' },
  'sleep-recovery-ancient':        { title: 'שינה והתאוששות: מה החוכמה העתיקה מבינה נכון',                     category: 'שינה',              intro: 'לפני מכשירי מעקב שינה ופוליסומנוגרפיה, רופאים עתיקים בנו מסגרות מתוחכמות למנוחה והתאוששות — מסגרות שהכרונוביולוגיה המודרנית מאמתת כיום בפרטים מדהימים.',                                date: 'אפריל 2025',     readTime: '6 דקות' },
  'nutrition-frameworks':          { title: 'תזונה ב-8 מסגרות: מדריך השוואתי',                                 category: 'תזונה',             intro: 'לכל מסורת בריאות גדולה יש פילוסופיה תזונתית. במקום לבחור ביניהן, HOLOS מזהה איזה מסגרת תזונתית מתאימה לסוג הקונסטיטוציה שלך.',                                                                date: 'מרץ 2025',       readTime: '10 דקות' },
  'stress-resilience-traditions':  { title: 'חוסן ללחץ: לקחים מחמשת האלפים',                                  category: 'לחץ',               intro: 'לחץ אינו המצאה מודרנית. כל מסורת חוכמה פיתחה כלים מתוחכמים לבניית חוסן — כלים שמאוששים כיום על ידי פיזיולוגיית לחץ ופסיכונוירואימונולוגיה.',                                                date: 'פברואר 2025',    readTime: '7 דקות' },
  'movement-medicine':             { title: 'תנועה כרפואה: הקונצנזוס הרב-מסורתי',                              category: 'תנועה',             intro: 'אף מסורת במסגרת HOLOS אינה ממליצה על אורח חיים יושבני. תנועה נקבעת באופן אוניברסלי כרפואה — אך המינון, הסוג והעיתוי משתנים לפי קונסטיטוציה, עונה ומצב בריאות נוכחי.',                  date: 'ינואר 2025',     readTime: '5 דקות' },
  'emotional-intelligence-holos':  { title: 'אינטליגנציה רגשית במסגרת HOLOS',                                  category: 'בריאות רגשית',     intro: 'אינטליגנציה רגשית אינה כישור רך — היא יכולת פיזיולוגית מדידה עם השלכות ישירות על תפקוד חיסוני, בריאות לבבית וביצועים קוגניטיביים.',                                                            date: 'דצמבר 2024',     readTime: '6 דקות' },
  'purpose-longevity':             { title: 'מטרה ואריכות ימים: מה המחקר באמת מראה',                           category: 'מטרה',              intro: 'קיום סיבה לקום בבוקר אינו מותרות פילוסופי — זהו משתנה ביולוגי מדיד המנבא תמותה, חוסן והתנהגות בריאותית על פני עשורים.',                                                                         date: 'נובמבר 2024',    readTime: '5 דקות' },
  'rambam-modern-wellness':        { title: 'הרמב"ם: הרופא מהמאה ה-12 שהקדים את זמנו',                        category: 'מסורות',            intro: 'רבי משה בן מימון (1138–1204) היה רופא החצר של סולטן מצרים ופילוסוף שסינתז את אריסטו עם התורה. כתביו הרפואיים מקדימים את הרפואה המניעתית המודרנית בדיוק מטריד.',                          date: 'אוקטובר 2024',   readTime: '7 דקות' },
}

const slugMetaDE: Record<string, SlugArticleMeta> = {
  // ── Listing article slugs ────────────────────────────────────────────────────
  'what-is-integrative-wellness':  { title: 'Was ist integrative Wellness — und warum braucht sie acht Traditionen?',    category: 'Grundlagen',          intro: 'Die Grenzen der Einzelkennzahl-Gesundheitsverfolgung und warum jede große Zivilisation eine vollständige medizinische Philosophie entwickelte, die die moderne Wissenschaft gerade erst zu bestätigen beginnt.', date: 'Juni 2025',     readTime: '8 Min.' },
  'nine-dimensions':               { title: 'Die neun Dimensionen: Warum Schlafbewertung ohne Stress irreführend ist',    category: 'Bewertung',           intro: 'Dimensionsinteraktionen sind das eigentliche Signal. Ein tiefer Einblick in das Neun-Dimensionen-Modell von HOLOS und warum ein isolierter Ansatz zur Wellness-Messung zwangsläufig irreführt.', date: 'Mai 2025',      readTime: '6 Min.' },
  'doshas-explained':              { title: 'Vata, Pitta, Kapha: Die definitive moderne Erklärung',                       category: 'Ayurveda',            intro: 'Was die Doshas wirklich bedeuten, wie sie bestimmt werden und warum dasselbe Essen eine Konstitution heilt und einer anderen schadet.', date: 'Mai 2025',      readTime: '10 Min.' },
  'rambam-preventive':             { title: "Maimonides' Gesundheitsregimen: Das Wellness-Protokoll des 12. Jahrhunderts", category: 'Rambam',             intro: 'Achthundert Jahre vor der Präventivmedizin schrieb der Rambam ihren endgültigen Leitfaden. Hier ist, was darin steht — und warum es noch immer funktioniert.', date: 'April 2025',   readTime: '7 Min.' },
  'qi-cultivation':                { title: 'Qi-Kultivierung für Skeptiker: Der evidenzbasierte Fall für Energiemedizin',  category: 'Daoistische Medizin', intro: 'Was die moderne Biophysik über die Konzepte sagt, die die daoistische Medizin seit 3.000 Jahren kartiert — und warum die skeptische Ablehnung etwas Wichtiges übersieht.', date: 'April 2025',   readTime: '9 Min.' },
  'sleep-traditions':              { title: 'Wie jede Tradition über Schlaf denkt — und was sie alle gemeinsam haben',    category: 'Schlaf',              intro: 'Von Ayurvedischer Vata-Beruhigung bis zur hippokratischen Humoral-Wiederherstellung — der überraschende traditionenübergreifende Konsens über optimalen Schlaf, den die moderne Chronobiologie nun bestätigt.', date: 'März 2025',    readTime: '5 Min.' },
  'stress-dimension':              { title: 'Allostatische Last: Die verborgene Dimension unter allen chronischen Krankheiten', category: 'Stress',         intro: 'Was Stress auf zellulärer Ebene wirklich ist, warum die meisten Stressinterventionen scheitern und wie HOLOS ihn anders misst als jede andere Wellness-Plattform.', date: 'März 2025',    readTime: '8 Min.' },
  'avicenna-canon':                { title: 'Die sechs wesentlichen Gesundheitsprinzipien nach Avicenna',                  category: 'Avicenna',            intro: 'Der Canon der Medizin identifizierte vor 1.000 Jahren sechs gesundheitsbestimmende Faktoren. Die moderne Wissenschaft hat alle sechs bestätigt — mit tiefgreifenden Konsequenzen für die Wellness-Strukturierung.', date: 'Februar 2025', readTime: '6 Min.' },
  'tibetan-three-humours':         { title: "Lung, Tripa, Beken: Tibets drei Humor und die Psychologie der Krankheit",    category: 'Tibetische Medizin',  intro: "Wie die drei Nyépa der tibetischen Medizin mentale Zustände auf physische Erkrankungen abbilden — und was das für die moderne Psychosomatik bedeutet.", date: 'Februar 2025', readTime: '7 Min.' },
  // ── Deep article slugs ───────────────────────────────────────────────────────
  'integrative-wellness-science':  { title: 'Die Wissenschaft hinter integrativer Wellness',                          category: 'Forschung',            intro: 'Moderne Forschung bestätigt, was alte Traditionen schon lange verstanden haben: Der menschliche Organismus ist ein integriertes Ganzes, keine Sammlung unabhängiger Teile.',                        date: 'Mai 2025',       readTime: '8 Min.' },
  'sleep-recovery-ancient':        { title: 'Schlaf & Erholung: Was alte Weisheit richtig macht',                     category: 'Schlaf',               intro: 'Lange vor Schlaf-Trackern und Polysomnographie entwickelten alte Ärzte ausgefeilte Rahmenwerke für Ruhe und Erholung — Rahmenwerke, die die moderne Chronobiologie jetzt bestätigt.',               date: 'April 2025',     readTime: '6 Min.' },
  'nutrition-frameworks':          { title: 'Ernährung in 8 Frameworks: Ein Vergleichsführer',                        category: 'Ernährung',            intro: 'Jede große Wellness-Tradition hat eine Ernährungsphilosophie. Anstatt zwischen ihnen zu wählen, identifiziert HOLOS, welches Framework Ihrer konstitutionellen Art entspricht.',                   date: 'März 2025',      readTime: '10 Min.' },
  'stress-resilience-traditions':  { title: 'Stressresilienz: Lektionen aus fünf Jahrtausenden',                     category: 'Stress',               intro: 'Stress ist keine moderne Erfindung. Jede Weisheitstradition entwickelte ausgefeilte Werkzeuge zur Resilienzförderung — Werkzeuge, die heute durch Stressphysiologie bestätigt werden.',           date: 'Februar 2025',   readTime: '7 Min.' },
  'movement-medicine':             { title: 'Bewegung als Medizin: Der traditionenübergreifende Konsens',             category: 'Bewegung',             intro: 'Keine Tradition im HOLOS-Framework empfiehlt sitzende Lebensweise. Bewegung wird universell als Medizin verschrieben — aber Dosis, Typ und Timing variieren je nach Konstitution und Jahreszeit.',  date: 'Januar 2025',    readTime: '5 Min.' },
  'emotional-intelligence-holos':  { title: 'Emotionale Intelligenz im HOLOS-Framework',                              category: 'Emotionale Gesundheit', intro: 'Emotionale Intelligenz ist keine weiche Fähigkeit — sie ist eine messbare physiologische Kapazität mit direkten Auswirkungen auf Immunfunktion, kardiovaskuläre Gesundheit und Kognition.',    date: 'Dezember 2024',  readTime: '6 Min.' },
  'purpose-longevity':             { title: 'Zweck & Langlebigkeit: Was die Forschung wirklich zeigt',                category: 'Zweck',                intro: 'Einen Grund zu haben, morgens aufzustehen, ist kein philosophischer Luxus — es ist eine messbare biologische Variable, die Mortalität, Resilienz und Gesundheitsverhalten vorhersagt.',              date: 'November 2024',  readTime: '5 Min.' },
  'rambam-modern-wellness':        { title: 'Maimonides: Der Arzt des 12. Jahrhunderts, seiner Zeit voraus',          category: 'Traditionen',          intro: 'Rabbi Moses ben Maimon (1138–1204) war Hofarzt des Sultans von Ägypten und Philosoph, der Aristoteles mit der Torah synthetisierte. Seine medizinischen Schriften antizipieren moderne Präventivmedizin.', date: 'Oktober 2024', readTime: '7 Min.' },
}

export const SLUG_META: Record<Locale, Record<string, SlugArticleMeta>> = {
  en: slugMetaEN,
  ru: slugMetaRU,
  he: slugMetaHE,
  de: slugMetaDE,
}

/** Get localized listing articles for the knowledge index page. */
export function getListingArticles(locale: Locale): ListingArticles {
  return LISTING_ARTICLES[locale] ?? LISTING_ARTICLES.en
}

/** Get localized metadata for a single article slug page. */
export function getSlugMeta(locale: Locale, slug: string): SlugArticleMeta | undefined {
  return (SLUG_META[locale] ?? SLUG_META.en)[slug]
}
