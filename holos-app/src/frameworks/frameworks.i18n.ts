// ── Framework Localization ─────────────────────────────────────────────────────
// label is a proper name — kept in English in all locales (Ayurveda, Rambam, etc.)
// origin and description are translated.

export interface FrameworkLocale {
  label:       string   // proper name — usually same in every locale
  origin:      string
  description: string
}

export const FRAMEWORK_I18N: Record<string, Record<string, FrameworkLocale>> = {

  'evidence-based': {
    ru: {
      label: 'Наука, основанная на доказательствах',
      origin: 'Современные исследования',
      description: 'Рецензируемые исследования в области метаболизма, нейронауки и долголетия от Стэнфорда, NIH и публикаций Nature.',
    },
    he: {
      label: 'מדע מבוסס ראיות',
      origin: 'מחקר מודרני',
      description: 'מחקר מטבולי, נוירו-מדעי ואריכות חיים המבוסס על עמיתים מסטנפורד, NIH ופרסומי Nature.',
    },
    de: {
      label: 'Evidenzbasierte Wissenschaft',
      origin: 'Moderne Forschung',
      description: 'Peer-reviewed Forschung zu Metabolismus, Neurowissenschaften und Langlebigkeit von Stanford, NIH und Nature.',
    },
  },

  'ayurveda': {
    ru: {
      label: 'Аюрведа',
      origin: 'Древняя Индия',
      description: '5000-летняя наука о жизни — балансировка дош Ваты, Питты и Капхи через индивидуальное питание, режим дня и сезонный образ жизни.',
    },
    he: {
      label: 'אַיוּרְוֶדָה',
      origin: 'הודו העתיקה',
      description: 'מדע החיים בן 5,000 שנה — איזון דושות ואטה, פיטה וקאפה דרך תזונה אישית, שגרה וחיים עונתיים.',
    },
    de: {
      label: 'Ayurveda',
      origin: 'Altes Indien',
      description: 'Die 5.000 Jahre alte Wissenschaft des Lebens — Ausgleich der Vata-, Pitta- und Kapha-Doshas durch individualisierte Ernährung, Routine und saisonales Leben.',
    },
  },

  'rambam': {
    ru: {
      label: 'Медицина Рамбама',
      origin: 'Средневековая еврейская медицина',
      description: 'Медицинская философия Маймонида: профилактика через режим, баланс шести не-природных факторов — воздух, пища и питьё, движение и покой, сон и бодрствование, эмоции и выделения.',
    },
    he: {
      label: 'רפואת הרמב"ם',
      origin: 'רפואה יהודית ימי-ביניימית',
      description: 'הפילוסופיה הרפואית של הרמב"ם: מניעה דרך סדר יום, איזון שישה לא-טבעיים — אוויר, מזון ושתיה, תנועה ומנוחה, שינה וערות, מצבים רגשיים והפרשות.',
    },
    de: {
      label: 'Rambam-Medizin',
      origin: 'Mittelalterliche jüdische Medizin',
      description: "Maimonides' medizinische Philosophie: Prävention durch Lebensführung, Gleichgewicht der sechs Nicht-Naturalia — Luft, Essen & Trinken, Bewegung & Ruhe, Schlaf & Wachen, Gemütszustände und Ausscheidungen.",
    },
  },

  'hippocrates': {
    ru: {
      label: 'Гиппократова медицина',
      origin: 'Древняя Греция',
      description: 'Исходная интегративная медицина: еда как лекарство, природа как целитель, четыре гумора (кровь, флегма, жёлтая и чёрная желчь) как карта конституционального типа.',
    },
    he: {
      label: 'רפואה היפוקרטית',
      origin: 'יוון העתיקה',
      description: 'הרפואה האינטגרטיבית המקורית: מזון כתרופה, טבע כמרפא, ארבעת מיצי הגוף (דם, ליחה, מרה צהובה, מרה שחורה) כמפת הטיפוס החוקתי.',
    },
    de: {
      label: 'Hippokratische Medizin',
      origin: 'Altes Griechenland',
      description: 'Die ursprüngliche integrative Medizin: Nahrung als Medizin, Natur als Heiler, die vier Körpersäfte (Blut, Schleim, gelbe und schwarze Galle) als Karte des konstitutionellen Typs.',
    },
  },

  'avicenna': {
    ru: {
      label: 'Ибн Сина (Авиценна)',
      origin: 'Исламский золотой век',
      description: 'Канон медицины Ибн Сины синтезировал греческие и исламские знания — акцент на темпераменте (мизадж), медицине образа жизни и триаде тело–душа–среда.',
    },
    he: {
      label: 'אבן סינא (אביצנה)',
      origin: 'התור הזהב האסלאמי',
      description: 'קאנון הרפואה של אבן סינא סינתז ידע יווני ואסלאמי — עם דגש על מזג (מיזאג׳), רפואת אורח חיים ושלישיית גוף-נפש-סביבה.',
    },
    de: {
      label: 'Ibn Sina (Avicenna)',
      origin: 'Islamisches Goldenes Zeitalter',
      description: 'Ibn Sinas Kanon der Medizin synthetisierte griechisches und islamisches Wissen — mit Betonung von Temperament (Mizaj), Lebensstilmedizin und der Körper-Seele-Umwelt-Trias.',
    },
  },

  'daoist': {
    ru: {
      label: 'Даосское оздоровление',
      origin: 'Древний Китай',
      description: 'Традиционная китайская медицина: баланс Ци, Инь и Ян и Пяти элементов (Дерево, Огонь, Земля, Металл, Вода), протекающих через меридиональные системы органов.',
    },
    he: {
      label: 'בריאות דאואיסטית',
      origin: 'סין העתיקה',
      description: 'מסגרת הרפואה הסינית המסורתית: איזון צ׳י, יין ויאנג וחמשת האלמנטים (עץ, אש, אדמה, מתכת, מים) הזורמים דרך מערכות מרידיאן האיברים.',
    },
    de: {
      label: 'Daoistisches Wohlbefinden',
      origin: 'Altes China',
      description: 'Das Rahmenwerk der Traditionellen Chinesischen Medizin: Balance von Qi, Yin und Yang sowie den Fünf Elementen (Holz, Feuer, Erde, Metall, Wasser) durch Organmeridian-Systeme.',
    },
  },

  'tibetan': {
    ru: {
      label: 'Тибетская медицина',
      origin: 'Тибет и гималайская традиция',
      description: 'Сова Ригпа — наука исцеления: три гумора (Лунг, Трипа, Пекан), пять элементов, взаимосвязь разума и тела, духовное измерение здоровья.',
    },
    he: {
      label: 'רפואה טיבטית',
      origin: 'טיבט ומסורת ההימלאיה',
      description: 'סובא ריגפא — מדע הריפוי: שלושה מיצים (לונג, טריפה, פקאן), חמשת האלמנטים, קשר גוף-נפש וממד הרוחניות של הבריאות.',
    },
    de: {
      label: 'Tibetische Medizin',
      origin: 'Tibet & Himalaya-Tradition',
      description: 'Sowa Rigpa — die Wissenschaft des Heilens: drei Körpersäfte (Lung, Tripa, Pekan), fünf Elemente, Geist-Körper-Verbindung und die spirituelle Dimension der Gesundheit.',
    },
  },

  'swarga': {
    ru: {
      label: 'Сварга: интегральное оздоровление',
      origin: 'Фирменная система Holos',
      description: 'Современный синтез всех традиций — восемь измерений целостного человека, три слоя дош, пять элементарных резонансов и колесо жизненного баланса. Самый полный взгляд из доступных.',
    },
    he: {
      label: 'Swarga: בריאות אינטגרלית',
      origin: 'מערכת קניינית של Holos',
      description: 'סינתזה מודרנית של כל המסורות — שמונה ממדים של האדם השלם, שלוש שכבות דושה, חמישה תהודות אלמנטליות וגלגל איזון החיים. המבט המקיף ביותר הזמין.',
    },
    de: {
      label: 'Swarga Integral Wellness',
      origin: 'Holos Proprietärsystem',
      description: 'Eine moderne Synthese aller Traditionen — acht Dimensionen des ganzen Menschen, drei Dosha-Schichten, fünf elementare Resonanzen und ein Lebensbalancerad. Die umfassendste verfügbare Perspektive.',
    },
  },
}

// ── Helper ─────────────────────────────────────────────────────────────────────
export function getLocalizedFramework(
  fwId: string,
  defaults: { label: string; origin: string; description: string },
  locale: string,
): { label: string; origin: string; description: string } {
  if (locale === 'en') return defaults
  const t = FRAMEWORK_I18N[fwId]?.[locale]
  if (t) return t
  return defaults
}
