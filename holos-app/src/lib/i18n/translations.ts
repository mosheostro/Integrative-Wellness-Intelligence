// ─────────────────────────────────────────────────────────────────────────────
// HOLOS i18n — Centralised translation dictionaries (EN / RU / HE / DE)
// Usage: import { useLanguage } from '@/contexts/LanguageContext'
//        const { t } = useLanguage()
//        t('nav.dashboard')
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = 'en' | 'ru' | 'he' | 'de'

export const RTL_LOCALES: Locale[] = ['he']

export const LOCALE_META: Record<Locale, { label: string; flag: string; lang: string }> = {
  en: { label: 'English',  flag: '🇬🇧', lang: 'en' },
  ru: { label: 'Русский',  flag: '🇷🇺', lang: 'ru' },
  he: { label: 'עברית',    flag: '🇮🇱', lang: 'he' },
  de: { label: 'Deutsch',  flag: '🇩🇪', lang: 'de' },
}

export interface Translations {
  nav: {
    dashboard: string; assess: string; coach: string; progress: string; actions: string
    journal: string; goals: string; habits: string; reports: string
    profile: string; settings: string; signOut: string; signIn: string
    signUp: string; getStarted: string; getStartedFree: string
    platform: string; methodologies: string; knowledge: string; about: string; pricing: string
  }
  auth: {
    welcomeBack: string; signInDesc: string; email: string; password: string
    signIn: string; signingIn: string; noAccount: string; createFree: string
    createAccount: string; createDesc: string; fullName: string
    confirmPassword: string; createBtn: string; haveAccount: string; signInLink: string
  }
  common: {
    save: string; cancel: string; delete: string; edit: string; back: string
    next: string; submit: string; loading: string; error: string; success: string
    confirm: string; close: string; export: string; or: string; free: string; new: string
    yes: string; no: string
  }
  dashboard: {
    title: string; greeting: string; noData: string; noDataDesc: string
    beginAssessment: string; newAssessment: string; startAssessment: string
    dimensionBreakdown: string; wellnessRadar: string; currentState: string
    lastAnalysed: string; takeNew: string; wellnessJourney: string
    priorityActions: string; seeAll: string; level: string; totalXP: string; compositeTrend: string
  }
  settings: {
    title: string; account: string; notifications: string; privacy: string
    data: string; dangerZone: string; appearance: string
    theme: string; themeLight: string; themeDark: string; themeSystem: string
    language: string; languageDesc: string
    currentPw: string; newPw: string; confirmPw: string
    updatePw: string; updating: string; updated: string
    assessmentReminders: string; assessmentRemindersDesc: string
    weeklyDigest: string; weeklyDigestDesc: string
    productUpdates: string; productUpdatesDesc: string
    shareAnonymous: string; shareAnonymousDesc: string
    coachHistory: string; coachHistoryDesc: string
    publicProfile: string; publicProfileDesc: string
    exportDesc: string; exportJSON: string; exportCSV: string; exportNote: string
    signOutAll: string; signOutAllDesc: string; signOutAllBtn: string
    deleteAccount: string; deleteAccountDesc: string; deleteBtn: string
    managePw: string; accountDesc: string
  }
  coach: {
    title: string; subtitle: string; placeholder: string; disclaimer: string; initialMessage: string
  }
  assessment: {
    title: string; question: string; of: string
    continue: string; back: string; complete: string; completing: string
  }
  progress: {
    title: string; noData: string; noDataDesc: string
  }
}

// ── English ───────────────────────────────────────────────────────────────────
const en: Translations = {
  nav: {
    dashboard: 'Dashboard', assess: 'Assess', coach: 'Coach',
    progress: 'Progress', actions: 'Actions', journal: 'Journal',
    goals: 'Goals', habits: 'Habits', reports: 'Reports',
    profile: 'Profile', settings: 'Settings', signOut: 'Sign out',
    signIn: 'Sign in', signUp: 'Sign up', getStarted: 'Get started',
    getStartedFree: 'Get started free',
    platform: 'Platform', methodologies: 'Methodologies',
    knowledge: 'Knowledge', about: 'About', pricing: 'Pricing',
  },
  auth: {
    welcomeBack: 'Welcome back', signInDesc: 'Sign in to your Holos account',
    email: 'Email', password: 'Password', signIn: 'Sign in', signingIn: 'Signing in…',
    noAccount: 'No account?', createFree: 'Create one free',
    createAccount: 'Create your account', createDesc: 'Start your integrative wellness journey',
    fullName: 'Full name', confirmPassword: 'Confirm password',
    createBtn: 'Create account', haveAccount: 'Already have an account?', signInLink: 'Sign in',
  },
  common: {
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', back: 'Back',
    next: 'Next', submit: 'Submit', loading: 'Loading…', error: 'Error',
    success: 'Success', confirm: 'Confirm', close: 'Close', export: 'Export',
    or: 'or', free: 'free', new: 'New', yes: 'Yes', no: 'No',
  },
  dashboard: {
    title: 'Holos Dashboard', greeting: 'Hello',
    noData: 'Your wellness portrait is waiting',
    noDataDesc: 'Holos will analyse your responses across 9 dimensions and 8 wisdom traditions to create a living picture of your whole self.',
    beginAssessment: 'Begin your assessment →', newAssessment: 'New assessment',
    startAssessment: 'Start assessment',
    dimensionBreakdown: 'Dimension Breakdown', wellnessRadar: 'Wellness Radar',
    currentState: 'Current State', lastAnalysed: 'Your profile was last analysed on',
    takeNew: 'Take a new assessment to track your progress.',
    wellnessJourney: 'Wellness Journey', priorityActions: 'Priority Actions',
    seeAll: 'See all →', level: 'LEVEL', totalXP: 'Total XP', compositeTrend: 'Composite Trend',
  },
  settings: {
    title: 'Settings', account: 'Account', notifications: 'Notifications',
    privacy: 'Privacy', data: 'Data & Export', dangerZone: 'Danger Zone', appearance: 'Appearance',
    theme: 'Theme', themeLight: 'Light', themeDark: 'Dark', themeSystem: 'System',
    language: 'Language', languageDesc: 'Choose your preferred language',
    currentPw: 'Current password', newPw: 'New password', confirmPw: 'Confirm new password',
    updatePw: 'Update password →', updating: 'Updating…', updated: '✓ Updated',
    assessmentReminders: 'Assessment reminders',
    assessmentRemindersDesc: 'Weekly reminders to take a new assessment',
    weeklyDigest: 'Weekly wellness digest',
    weeklyDigestDesc: 'Summary of your progress every Sunday',
    productUpdates: 'Product updates', productUpdatesDesc: 'New features and tradition additions',
    shareAnonymous: 'Share anonymous usage data',
    shareAnonymousDesc: 'Help us improve HOLOS with anonymised usage statistics. No personal health data is shared.',
    coachHistory: 'AI Coach conversation history',
    coachHistoryDesc: 'Allow the AI Coach to reference your previous conversations for continuity',
    publicProfile: 'Public profile',
    publicProfileDesc: 'Allow others to see your wellness level and tradition preference',
    exportDesc: 'Export all your wellness data — assessments, scores, journal entries, goals, and habits — in standard formats.',
    exportJSON: '↓ Export as JSON', exportCSV: '↓ Export as CSV',
    exportNote: 'Export generation takes a few seconds. A download link will appear when ready.',
    signOutAll: 'Sign out of all devices',
    signOutAllDesc: 'Revoke all sessions. You will need to sign in again.',
    signOutAllBtn: 'Sign out →',
    deleteAccount: 'Delete my account',
    deleteAccountDesc: 'Permanently delete your account and all associated data. This cannot be undone.',
    deleteBtn: 'Delete account',
    managePw: 'Manage your password. For email or name changes, go to',
    accountDesc: 'Profile',
  },
  coach: {
    title: 'Holos Coach', subtitle: '8 wisdom traditions · evidence-based',
    placeholder: 'Ask anything about your wellness…',
    disclaimer: 'AI coaching · not medical advice · always consult your physician',
    initialMessage: "Shalom. I'm your Holos AI coach — an integration of eight wisdom traditions with modern evidence-based science. I'm here to help you understand your wellness landscape and take meaningful steps forward.\n\nWhat's on your mind today?",
  },
  assessment: {
    title: 'Wellness Assessment', question: 'Question', of: 'of',
    continue: 'Continue', back: 'Back', complete: 'Complete assessment →', completing: 'Completing…',
  },
  progress: {
    title: 'Progress', noData: 'No progress data yet',
    noDataDesc: 'Complete your first assessment to start tracking your wellness journey.',
  },
}

// ── Russian ───────────────────────────────────────────────────────────────────
const ru: Translations = {
  nav: {
    dashboard: 'Панель', assess: 'Оценка', coach: 'Коуч',
    progress: 'Прогресс', actions: 'Действия', journal: 'Дневник',
    goals: 'Цели', habits: 'Привычки', reports: 'Отчёты',
    profile: 'Профиль', settings: 'Настройки', signOut: 'Выйти',
    signIn: 'Войти', signUp: 'Регистрация', getStarted: 'Начать',
    getStartedFree: 'Начать бесплатно',
    platform: 'Платформа', methodologies: 'Методологии',
    knowledge: 'База знаний', about: 'О нас', pricing: 'Цены',
  },
  auth: {
    welcomeBack: 'С возвращением', signInDesc: 'Войдите в свой аккаунт Holos',
    email: 'Email', password: 'Пароль', signIn: 'Войти', signingIn: 'Вход…',
    noAccount: 'Нет аккаунта?', createFree: 'Создать бесплатно',
    createAccount: 'Создать аккаунт', createDesc: 'Начните путь к интегративному здоровью',
    fullName: 'Полное имя', confirmPassword: 'Подтвердите пароль',
    createBtn: 'Создать аккаунт', haveAccount: 'Уже есть аккаунт?', signInLink: 'Войти',
  },
  common: {
    save: 'Сохранить', cancel: 'Отмена', delete: 'Удалить', edit: 'Изменить', back: 'Назад',
    next: 'Далее', submit: 'Отправить', loading: 'Загрузка…', error: 'Ошибка',
    success: 'Успешно', confirm: 'Подтвердить', close: 'Закрыть', export: 'Экспорт',
    or: 'или', free: 'бесплатно', new: 'Новый', yes: 'Да', no: 'Нет',
  },
  dashboard: {
    title: 'Панель Holos', greeting: 'Здравствуй',
    noData: 'Ваш портрет здоровья ждёт вас',
    noDataDesc: 'Holos проанализирует ваши ответы по 9 измерениям и 8 традициям мудрости, чтобы создать живую картину вашего здоровья.',
    beginAssessment: 'Начать оценку →', newAssessment: 'Новая оценка',
    startAssessment: 'Начать оценку',
    dimensionBreakdown: 'Разбивка по измерениям', wellnessRadar: 'Радар здоровья',
    currentState: 'Текущее состояние', lastAnalysed: 'Профиль последний раз анализировался',
    takeNew: 'Пройдите новую оценку, чтобы отследить прогресс.',
    wellnessJourney: 'Путь к здоровью', priorityActions: 'Приоритетные действия',
    seeAll: 'Все →', level: 'УРОВЕНЬ', totalXP: 'Всего XP', compositeTrend: 'Общий тренд',
  },
  settings: {
    title: 'Настройки', account: 'Аккаунт', notifications: 'Уведомления',
    privacy: 'Конфиденциальность', data: 'Данные и экспорт', dangerZone: 'Опасная зона',
    appearance: 'Внешний вид',
    theme: 'Тема', themeLight: 'Светлая', themeDark: 'Тёмная', themeSystem: 'Системная',
    language: 'Язык', languageDesc: 'Выберите предпочитаемый язык',
    currentPw: 'Текущий пароль', newPw: 'Новый пароль', confirmPw: 'Подтвердите новый пароль',
    updatePw: 'Обновить пароль →', updating: 'Обновление…', updated: '✓ Обновлено',
    assessmentReminders: 'Напоминания об оценке',
    assessmentRemindersDesc: 'Еженедельные напоминания о прохождении оценки',
    weeklyDigest: 'Еженедельный дайджест',
    weeklyDigestDesc: 'Сводка прогресса каждое воскресенье',
    productUpdates: 'Обновления продукта', productUpdatesDesc: 'Новые функции и добавление традиций',
    shareAnonymous: 'Делиться анонимными данными',
    shareAnonymousDesc: 'Помогите нам улучшить HOLOS с помощью анонимной статистики.',
    coachHistory: 'История разговоров с AI-коучем',
    coachHistoryDesc: 'Разрешить AI-коучу ссылаться на предыдущие разговоры',
    publicProfile: 'Публичный профиль',
    publicProfileDesc: 'Разрешить другим видеть ваш уровень здоровья',
    exportDesc: 'Экспортируйте все ваши данные о здоровье в стандартных форматах.',
    exportJSON: '↓ Экспорт в JSON', exportCSV: '↓ Экспорт в CSV',
    exportNote: 'Экспорт занимает несколько секунд. Ссылка для скачивания появится после готовности.',
    signOutAll: 'Выйти на всех устройствах',
    signOutAllDesc: 'Отозвать все сессии. Потребуется повторный вход.',
    signOutAllBtn: 'Выйти →',
    deleteAccount: 'Удалить мой аккаунт',
    deleteAccountDesc: 'Навсегда удалить аккаунт и все связанные данные. Это невозможно отменить.',
    deleteBtn: 'Удалить аккаунт',
    managePw: 'Управляйте паролем. Для изменения email или имени перейдите в',
    accountDesc: 'Профиль',
  },
  coach: {
    title: 'Коуч Holos', subtitle: '8 традиций мудрости · доказательная наука',
    placeholder: 'Задайте любой вопрос о вашем здоровье…',
    disclaimer: 'AI-коучинг · не является медицинским советом · консультируйтесь с врачом',
    initialMessage: 'Шалом. Я ваш AI-коуч Holos — интеграция восьми традиций мудрости с современной доказательной наукой. Я здесь, чтобы помочь вам понять ваш путь к здоровью.\n\nЧто у вас на уме сегодня?',
  },
  assessment: {
    title: 'Оценка здоровья', question: 'Вопрос', of: 'из',
    continue: 'Продолжить', back: 'Назад', complete: 'Завершить оценку →', completing: 'Завершение…',
  },
  progress: {
    title: 'Прогресс', noData: 'Данных о прогрессе пока нет',
    noDataDesc: 'Пройдите первую оценку, чтобы начать отслеживать путь к здоровью.',
  },
}

// ── Hebrew ─────────────────────────────────────────────────────────────────────
const he: Translations = {
  nav: {
    dashboard: 'לוח מחוונים', assess: 'הערכה', coach: 'מאמן',
    progress: 'התקדמות', actions: 'פעולות', journal: 'יומן',
    goals: 'מטרות', habits: 'הרגלים', reports: 'דוחות',
    profile: 'פרופיל', settings: 'הגדרות', signOut: 'התנתק',
    signIn: 'כניסה', signUp: 'הרשמה', getStarted: 'התחל',
    getStartedFree: 'התחל בחינם',
    platform: 'פלטפורמה', methodologies: 'מתודולוגיות',
    knowledge: 'בסיס ידע', about: 'אודות', pricing: 'תמחור',
  },
  auth: {
    welcomeBack: 'ברוך שובך', signInDesc: 'היכנס לחשבון Holos שלך',
    email: 'אימייל', password: 'סיסמה', signIn: 'כניסה', signingIn: 'נכנס…',
    noAccount: 'אין חשבון?', createFree: 'צור בחינם',
    createAccount: 'צור חשבון', createDesc: 'התחל את מסע הבריאות האינטגרטיבי שלך',
    fullName: 'שם מלא', confirmPassword: 'אמת סיסמה',
    createBtn: 'צור חשבון', haveAccount: 'כבר יש חשבון?', signInLink: 'כניסה',
  },
  common: {
    save: 'שמור', cancel: 'ביטול', delete: 'מחק', edit: 'ערוך', back: 'חזרה',
    next: 'הבא', submit: 'שלח', loading: 'טוען…', error: 'שגיאה',
    success: 'הצלחה', confirm: 'אשר', close: 'סגור', export: 'ייצוא',
    or: 'או', free: 'חינם', new: 'חדש', yes: 'כן', no: 'לא',
  },
  dashboard: {
    title: 'לוח Holos', greeting: 'שלום',
    noData: 'דיוקן הבריאות שלך מחכה',
    noDataDesc: '.Holos ינתח את תשובותיך ב-9 ממדים ו-8 מסורות חוכמה כדי ליצור תמונה חיה של עצמך השלם',
    beginAssessment: 'התחל את ההערכה ←', newAssessment: 'הערכה חדשה',
    startAssessment: 'התחל הערכה',
    dimensionBreakdown: 'פירוט ממדים', wellnessRadar: 'מכ"ם בריאות',
    currentState: 'מצב נוכחי', lastAnalysed: 'הפרופיל שלך נותח לאחרונה ב',
    takeNew: '.בצע הערכה חדשה כדי לעקוב אחר ההתקדמות שלך',
    wellnessJourney: 'מסע הבריאות', priorityActions: 'פעולות עדיפות',
    seeAll: 'ראה הכל ←', level: 'רמה', totalXP: 'סה"כ XP', compositeTrend: 'מגמה כוללת',
  },
  settings: {
    title: 'הגדרות', account: 'חשבון', notifications: 'התראות',
    privacy: 'פרטיות', data: 'נתונים וייצוא', dangerZone: 'אזור סכנה', appearance: 'מראה',
    theme: 'ערכת נושא', themeLight: 'בהיר', themeDark: 'כהה', themeSystem: 'מערכת',
    language: 'שפה', languageDesc: 'בחר את השפה המועדפת עליך',
    currentPw: 'סיסמה נוכחית', newPw: 'סיסמה חדשה', confirmPw: 'אמת סיסמה חדשה',
    updatePw: 'עדכן סיסמה ←', updating: 'מעדכן…', updated: '✓ עודכן',
    assessmentReminders: 'תזכורות הערכה',
    assessmentRemindersDesc: 'תזכורות שבועיות לביצוע הערכה חדשה',
    weeklyDigest: 'תקציר שבועי',
    weeklyDigestDesc: 'סיכום ההתקדמות שלך כל יום ראשון',
    productUpdates: 'עדכוני מוצר', productUpdatesDesc: 'תכונות חדשות והוספת מסורות',
    shareAnonymous: 'שתף נתוני שימוש אנונימיים',
    shareAnonymousDesc: '.עזור לנו לשפר את HOLOS עם סטטיסטיקות שימוש אנונימיות',
    coachHistory: 'היסטוריית שיחות AI Coach',
    coachHistoryDesc: 'אפשר ל-AI Coach להתייחס לשיחות קודמות',
    publicProfile: 'פרופיל ציבורי',
    publicProfileDesc: 'אפשר לאחרים לראות את רמת הבריאות שלך',
    exportDesc: '.ייצא את כל נתוני הבריאות שלך בפורמטים סטנדרטיים',
    exportJSON: '↓ ייצוא כ-JSON', exportCSV: '↓ ייצוא כ-CSV',
    exportNote: '.הייצוא לוקח כמה שניות. קישור להורדה יופיע כשיהיה מוכן',
    signOutAll: 'התנתק מכל המכשירים',
    signOutAllDesc: '.בטל את כל ההפעלות. תצטרך להיכנס שוב',
    signOutAllBtn: 'התנתק ←',
    deleteAccount: 'מחק את חשבוני',
    deleteAccountDesc: '.מחק לצמיתות את החשבון ואת כל הנתונים המשויכים. לא ניתן לבטל פעולה זו',
    deleteBtn: 'מחק חשבון',
    managePw: '.נהל את הסיסמה שלך. לשינוי אימייל או שם, עבור אל',
    accountDesc: 'פרופיל',
  },
  coach: {
    title: 'מאמן Holos', subtitle: '8 מסורות חוכמה · מבוסס ראיות',
    placeholder: 'שאל כל שאלה על הבריאות שלך…',
    disclaimer: 'אימון AI · אינו ייעוץ רפואי · תמיד התייעץ עם הרופא שלך',
    initialMessage: 'שלום. אני המאמן ה-AI שלך ב-Holos — שילוב של שמונה מסורות חוכמה עם המדע המבוסס ראיות המודרני. אני כאן כדי לעזור לך להבין את נוף הבריאות שלך.\n\nמה עומד על לבך היום?',
  },
  assessment: {
    title: 'הערכת בריאות', question: 'שאלה', of: 'מתוך',
    continue: 'המשך', back: 'חזרה', complete: 'השלם הערכה ←', completing: 'משלים…',
  },
  progress: {
    title: 'התקדמות', noData: 'אין עדיין נתוני התקדמות',
    noDataDesc: '.השלם את ההערכה הראשונה שלך כדי להתחיל לעקוב אחר מסע הבריאות שלך',
  },
}

// ── German ────────────────────────────────────────────────────────────────────
const de: Translations = {
  nav: {
    dashboard: 'Dashboard', assess: 'Bewertung', coach: 'Coach',
    progress: 'Fortschritt', actions: 'Aktionen', journal: 'Tagebuch',
    goals: 'Ziele', habits: 'Gewohnheiten', reports: 'Berichte',
    profile: 'Profil', settings: 'Einstellungen', signOut: 'Abmelden',
    signIn: 'Anmelden', signUp: 'Registrieren', getStarted: 'Loslegen',
    getStartedFree: 'Kostenlos starten',
    platform: 'Plattform', methodologies: 'Methoden',
    knowledge: 'Wissen', about: 'Über uns', pricing: 'Preise',
  },
  auth: {
    welcomeBack: 'Willkommen zurück', signInDesc: 'Melden Sie sich bei Ihrem Holos-Konto an',
    email: 'E-Mail', password: 'Passwort', signIn: 'Anmelden', signingIn: 'Anmeldung…',
    noAccount: 'Kein Konto?', createFree: 'Kostenlos erstellen',
    createAccount: 'Konto erstellen', createDesc: 'Beginnen Sie Ihre integrative Wellnessreise',
    fullName: 'Vollständiger Name', confirmPassword: 'Passwort bestätigen',
    createBtn: 'Konto erstellen', haveAccount: 'Bereits ein Konto?', signInLink: 'Anmelden',
  },
  common: {
    save: 'Speichern', cancel: 'Abbrechen', delete: 'Löschen', edit: 'Bearbeiten', back: 'Zurück',
    next: 'Weiter', submit: 'Absenden', loading: 'Lädt…', error: 'Fehler',
    success: 'Erfolgreich', confirm: 'Bestätigen', close: 'Schließen', export: 'Exportieren',
    or: 'oder', free: 'kostenlos', new: 'Neu', yes: 'Ja', no: 'Nein',
  },
  dashboard: {
    title: 'Holos Dashboard', greeting: 'Hallo',
    noData: 'Ihr Wellnessprofil wartet auf Sie',
    noDataDesc: 'Holos analysiert Ihre Antworten über 9 Dimensionen und 8 Weisheitstraditionen, um ein lebendiges Bild Ihres Wohlbefindens zu erstellen.',
    beginAssessment: 'Bewertung starten →', newAssessment: 'Neue Bewertung',
    startAssessment: 'Bewertung starten',
    dimensionBreakdown: 'Dimensionsaufschlüsselung', wellnessRadar: 'Wellness-Radar',
    currentState: 'Aktueller Zustand', lastAnalysed: 'Ihr Profil wurde zuletzt analysiert am',
    takeNew: 'Machen Sie eine neue Bewertung, um Ihren Fortschritt zu verfolgen.',
    wellnessJourney: 'Wellnessreise', priorityActions: 'Prioritätsmaßnahmen',
    seeAll: 'Alle anzeigen →', level: 'STUFE', totalXP: 'Gesamt XP', compositeTrend: 'Gesamttrend',
  },
  settings: {
    title: 'Einstellungen', account: 'Konto', notifications: 'Benachrichtigungen',
    privacy: 'Datenschutz', data: 'Daten & Export', dangerZone: 'Gefahrenzone',
    appearance: 'Erscheinungsbild',
    theme: 'Thema', themeLight: 'Hell', themeDark: 'Dunkel', themeSystem: 'System',
    language: 'Sprache', languageDesc: 'Wählen Sie Ihre bevorzugte Sprache',
    currentPw: 'Aktuelles Passwort', newPw: 'Neues Passwort', confirmPw: 'Neues Passwort bestätigen',
    updatePw: 'Passwort aktualisieren →', updating: 'Aktualisierung…', updated: '✓ Aktualisiert',
    assessmentReminders: 'Bewertungserinnerungen',
    assessmentRemindersDesc: 'Wöchentliche Erinnerungen für neue Bewertungen',
    weeklyDigest: 'Wöchentliche Zusammenfassung',
    weeklyDigestDesc: 'Fortschrittszusammenfassung jeden Sonntag',
    productUpdates: 'Produktupdates', productUpdatesDesc: 'Neue Funktionen und Traditionserweiterungen',
    shareAnonymous: 'Anonyme Nutzungsdaten teilen',
    shareAnonymousDesc: 'Helfen Sie uns, HOLOS mit anonymisierten Statistiken zu verbessern.',
    coachHistory: 'KI-Coach-Gesprächshistorie',
    coachHistoryDesc: 'Erlauben Sie dem KI-Coach, frühere Gespräche zu referenzieren',
    publicProfile: 'Öffentliches Profil',
    publicProfileDesc: 'Erlauben Sie anderen, Ihr Wellnessniveau zu sehen',
    exportDesc: 'Exportieren Sie alle Ihre Wellness-Daten in Standardformaten.',
    exportJSON: '↓ Als JSON exportieren', exportCSV: '↓ Als CSV exportieren',
    exportNote: 'Der Export dauert einige Sekunden. Ein Download-Link erscheint, wenn er fertig ist.',
    signOutAll: 'Von allen Geräten abmelden',
    signOutAllDesc: 'Alle Sitzungen widerrufen. Sie müssen sich erneut anmelden.',
    signOutAllBtn: 'Abmelden →',
    deleteAccount: 'Mein Konto löschen',
    deleteAccountDesc: 'Konto und alle zugehörigen Daten dauerhaft löschen. Dies kann nicht rückgängig gemacht werden.',
    deleteBtn: 'Konto löschen',
    managePw: 'Verwalten Sie Ihr Passwort. Für E-Mail- oder Namensänderungen gehen Sie zu',
    accountDesc: 'Profil',
  },
  coach: {
    title: 'Holos Coach', subtitle: '8 Weisheitstraditionen · evidenzbasiert',
    placeholder: 'Stellen Sie beliebige Fragen zu Ihrem Wohlbefinden…',
    disclaimer: 'KI-Coaching · kein medizinischer Rat · konsultieren Sie immer Ihren Arzt',
    initialMessage: 'Shalom. Ich bin Ihr Holos KI-Coach — eine Integration von acht Weisheitstraditionen mit moderner evidenzbasierter Wissenschaft. Ich helfe Ihnen, Ihre Wellnesslandschaft zu verstehen.\n\nWas beschäftigt Sie heute?',
  },
  assessment: {
    title: 'Wellnessbewertung', question: 'Frage', of: 'von',
    continue: 'Weiter', back: 'Zurück', complete: 'Bewertung abschließen →', completing: 'Wird abgeschlossen…',
  },
  progress: {
    title: 'Fortschritt', noData: 'Noch keine Fortschrittsdaten',
    noDataDesc: 'Schließen Sie Ihre erste Bewertung ab, um Ihre Wellnessreise zu verfolgen.',
  },
}

// ── Dictionary map + lookup helper ───────────────────────────────────────────
export const TRANSLATIONS: Record<Locale, Translations> = { en, ru, he, de }

/** Deep key lookup: t('nav.dashboard') */
export function getTranslation(locale: Locale, key: string): string {
  const parts = key.split('.')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let val: any = TRANSLATIONS[locale]
  for (const part of parts) {
    val = val?.[part]
    if (val === undefined) break
  }
  // Fall back to English if key missing in locale
  if (typeof val !== 'string') {
    let fallback: any = TRANSLATIONS.en
    for (const part of parts) { fallback = fallback?.[part] }
    return typeof fallback === 'string' ? fallback : key
  }
  return val
}
