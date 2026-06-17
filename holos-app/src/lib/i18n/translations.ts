// ─────────────────────────────────────────────────────────────────────────────
// HOLOS i18n — Centralised translation dictionaries (EN / RU / HE / DE)
// Usage: import { useLanguage } from '@/contexts/LanguageContext'
//        const { t } = useLanguage()
//        t('nav.dashboard')
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = 'en' | 'ru' | 'he' | 'de'

export const RTL_LOCALES: Locale[] = ['he']

export const LOCALE_META: Record<Locale, { label: string; flag: string; lang: string; dateLocale: string }> = {
  en: { label: 'English',  flag: '🇬🇧', lang: 'en', dateLocale: 'en-US' },
  ru: { label: 'Русский',  flag: '🇷🇺', lang: 'ru', dateLocale: 'ru-RU' },
  he: { label: 'עברית',    flag: '🇮🇱', lang: 'he', dateLocale: 'he-IL' },
  de: { label: 'Deutsch',  flag: '🇩🇪', lang: 'de', dateLocale: 'de-DE' },
}

export interface Translations {
  nav: {
    dashboard: string; assess: string; coach: string; progress: string; actions: string
    journal: string; goals: string; habits: string; reports: string
    profile: string; settings: string; signOut: string; signIn: string
    signUp: string; getStarted: string; getStartedFree: string
    platform: string; methodologies: string; knowledge: string; about: string; pricing: string
    faq: string; contact: string; recommendations: string
  }
  auth: {
    welcomeBack: string; signInDesc: string; email: string; password: string
    signIn: string; signingIn: string; noAccount: string; createFree: string
    createAccount: string; createDesc: string; fullName: string
    confirmPassword: string; createBtn: string; haveAccount: string; signInLink: string
    creatingAccount: string
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
    step1: string; step1Title: string; step1Desc: string; begin: string
    calculating: string; analysing: string; adaptive: string
    liveEstimate: string; livePreview: string
  }
  progress: {
    title: string; noData: string; noDataDesc: string
    latestScore: string; assessments: string; level: string; totalXP: string
    compositeOverTime: string; dimensionBreakdown: string; assessmentHistory: string
    yourJourney: string; takeAssessment: string
  }
  dimensions: {
    nutrition: string; sleep: string; recovery: string; calm: string
    movement: string; emotional: string; balance: string; purpose: string; energy: string
  }
  journal: {
    title: string; write: string; history: string
    howFeeling: string; tagDimensions: string; saveEntry: string; saving: string
    loading: string; noEntries: string; noEntriesDesc: string; writeFirst: string
    moodStruggling: string; moodLow: string; moodOkay: string; moodGood: string; moodThriving: string
    placeholder: string
  }
  goals: {
    title: string; addGoal: string; newGoal: string; goalTitle: string
    dimension: string; targetDate: string; description: string
    saving: string; addBtn: string
    noGoals: string; noGoalsDesc: string
    active: string; completed: string; target: string
    descPlaceholder: string; titlePlaceholder: string; loading: string
  }
  habits: {
    title: string; addHabit: string; newHabit: string; habitLabel: string
    dimension: string; frequency: string; saving: string; addBtn: string
    todayProgress: string; allCompleted: string
    noHabits: string; noHabitsDesc: string; addFirst: string; loading: string
  }
  recommendations: {
    title: string; noRecs: string; noRecsDesc: string
    nothing: string; nothingDesc: string; takeAssessment: string
    markDone: string; dismiss: string; completedLabel: string
    filterPending: string; filterCompleted: string; filterAll: string; loading: string
    impact: string; difficulty: string
  }
  reports: {
    title: string; noData: string; noDataDesc: string; takeFirst: string
    compositeScore: string; allNineDims: string; assessmentHistory: string
    fromLast: string; newAssessment: string; viewActionPlan: string
    thriving: string; stable: string; needsAttention: string; critical: string
  }
  profile: {
    title: string; fullName: string; email: string; location: string
    dob: string; tradition: string; timezone: string; bio: string
    saveChanges: string; saving: string; saved: string; level: string
    wellnessSeeker: string; bioPlaceholder: string; namePlaceholder: string; locationPlaceholder: string
    loading: string
  }
  results: {
    overview: string; framework: string; recommendations: string
    wellnessRadar: string; dimensionScores: string; dimensionRings: string
    doshaBalance: string; fiveElements: string; dominant: string
    noRecs: string; talkCoach: string; reassess: string; interpretation: string
    score: string; impact: string; evidence: string; min: string
    inBalance: string; needsAttention: string
  }
  pricing: {
    eyebrow: string; titleA: string; titleEm: string; subtitle: string
    mostPopular: string
    seekerPeriod: string; seekerTagline: string; seekerCta: string
    seekerF1: string; seekerF2: string; seekerF3: string; seekerF4: string; seekerF5: string
    seekerF6: string; seekerF7: string; seekerF8: string; seekerF9: string; seekerF10: string
    proTagline: string; proCta: string; proBadge: string; proPeriod: string
    proF1: string; proF2: string; proF3: string; proF4: string; proF5: string
    proF6: string; proF7: string; proF8: string; proF9: string; proF10: string
    entTagline: string; entCta: string
    entF1: string; entF2: string; entF3: string; entF4: string; entF5: string
    entF6: string; entF7: string; entF8: string; entF9: string; entF10: string
    faqEyebrow: string; faqTitle: string
    faq1Q: string; faq1A: string; faq2Q: string; faq2A: string
    faq3Q: string; faq3A: string; faq4Q: string; faq4A: string
    faq5Q: string; faq5A: string; faq6Q: string; faq6A: string
    ctaTitle: string; ctaBody: string; ctaCta1: string; ctaCta2: string
  }
  faq: {
    eyebrow: string; titleA: string; titleEm: string; notFound: string; contactLink: string
    cat1: string; cat2: string; cat3: string; cat4: string; cat5: string
    c1q1: string; c1a1: string; c1q2: string; c1a2: string; c1q3: string; c1a3: string; c1q4: string; c1a4: string
    c2q1: string; c2a1: string; c2q2: string; c2a2: string; c2q3: string; c2a3: string; c2q4: string; c2a4: string; c2q5: string; c2a5: string
    c3q1: string; c3a1: string; c3q2: string; c3a2: string; c3q3: string; c3a3: string
    c4q1: string; c4a1: string; c4q2: string; c4a2: string; c4q3: string; c4a3: string; c4q4: string; c4a4: string
    c5q1: string; c5a1: string; c5q2: string; c5a2: string; c5q3: string; c5a3: string
    ctaTitle: string; ctaBody: string; ctaCta1: string; ctaCta2: string
  }
  home: {
    heroEyebrow: string; heroTitle: string; heroTitleEm: string
    heroSubtitle: string; heroCta1: string; heroCta2: string
    statDims: string; statTraditions: string; statQuestions: string; statYears: string
    howEyebrow: string; howTitle: string; howCta: string
    step1Title: string; step1Body: string
    step2Title: string; step2Body: string
    step3Title: string; step3Body: string
    dimsEyebrow: string; dimsTitle: string; dimsSubtitle: string
    dimDescNutrition: string; dimDescSleep: string; dimDescRecovery: string
    dimDescStress: string; dimDescMovement: string; dimDescEmotional: string
    dimDescBalance: string; dimDescPurpose: string; dimDescEnergy: string
    tradEyebrow: string; tradTitle: string; tradSubtitle: string; tradCta: string
    tradDescEvidence: string; tradDescRambam: string; tradDescHippocrates: string
    tradDescAvicenna: string; tradDescAyurveda: string; tradDescDaoist: string
    tradDescTibetan: string; tradDescSwarga: string
    founderEyebrow: string; founderTitleA: string; founderTitleEm: string
    founderBody: string; founderCta: string
    pricingEyebrow: string; pricingTitle: string; pricingSubtitle: string
    mostPopular: string; pricingCta: string
    seekerName: string; seekerDesc: string; seekerCta: string
    seekerF1: string; seekerF2: string; seekerF3: string; seekerF4: string
    proName: string; proDesc: string; proCta: string
    proF1: string; proF2: string; proF3: string; proF4: string; proF5: string; proF6: string
    entName: string; entDesc: string; entCta: string
    entF1: string; entF2: string; entF3: string; entF4: string; entF5: string; entF6: string
    ctaEyebrow: string; ctaTitle: string; ctaTitleEm: string
    ctaSubtitle: string; ctaCta1: string; ctaCta2: string
  }
  about: {
    eyebrow: string; heroTitleA: string; heroTitleEm: string; heroSubtitle: string
    bioHeading: string; bioPara2: string; bioPara3: string; blockquote: string
    expertiseLabel: string; credentialsLabel: string
    philosophyEyebrow: string; philosophyTitle: string
    p1Icon: string; p1Title: string; p1Body: string
    p2Icon: string; p2Title: string; p2Body: string
    p3Icon: string; p3Title: string; p3Body: string
    p4Icon: string; p4Title: string; p4Body: string
    ctaTitle: string; ctaSubtitle: string
    bookConsultation: string; beginAssessment: string; contactFounder: string
  }
  footer: {
    tagline: string; platform: string; company: string; traditions: string
    allRights: string; medical: string; privacyPolicy: string; termsOfUse: string
  }
  contact: {
    eyebrow: string; title: string; subtitle: string
    sendMessage: string; name: string; email: string; subject: string
    phone: string; message: string; send: string; sending: string
    sent: string; sentDesc: string; errorMsg: string
    otherWays: string; founderQuote: string
    replyTime: string; quickReply: string; ongoingConvo: string
    professional: string; schedule: string
    subjectGeneral: string; subjectConsultation: string; subjectEnterprise: string
    subjectPress: string; subjectSupport: string; subjectOther: string
  }
  methodologies: {
    eyebrow: string; titleA: string; titleEm: string; subtitle: string
    keyPillars: string
    tEvidenceTagline: string; tRambamTagline: string; tHippocratesTagline: string
    tAvicennaTagline: string; tAyurvedaTagline: string; tDaoistTagline: string
    tTibetanTagline: string; tSwargaTagline: string
    ctaTitle: string; ctaBody: string; ctaCta: string
  }
  platform: {
    eyebrow: string; heroTitle: string; heroTitleEm: string
    heroSubtitle: string; heroCta1: string; heroCta2: string
    featTitle: string
    feat1Title: string; feat1Desc: string; feat1Cta: string
    feat2Title: string; feat2Desc: string; feat2Cta: string
    feat3Title: string; feat3Desc: string; feat3Cta: string
    feat4Title: string; feat4Desc: string; feat4Cta: string
    feat5Title: string; feat5Desc: string; feat5Cta: string
    feat6Title: string; feat6Desc: string; feat6Cta: string
    feat7Title: string; feat7Desc: string; feat7Cta: string
    feat8Title: string; feat8Desc: string; feat8Cta: string
    tradEyebrow: string; tradTitle: string; tradCta: string
    tradTagAyurveda: string; tradTagTCM: string; tradTagStoicism: string
    tradTagKabbalah: string; tradTagChrono: string; tradTagFunctional: string
    ctaTitle: string; ctaBody: string; ctaCta: string
  }
  bookSession: {
    eyebrow: string; heroTitle: string; heroSubtitle: string
    s1Title: string; s1Tag: string; s1Price: string; s1Duration: string; s1Desc: string; s1Cta: string
    s2Title: string; s2Tag: string; s2Price: string; s2Duration: string; s2Desc: string; s2Cta: string
    s3Title: string; s3Tag: string; s3Duration: string; s3Desc: string; s3Cta: string
    altTitle: string; altBody: string
  }
  legal: {
    eyebrow: string; privacyTitle: string; termsTitle: string
    lastUpdated: string; privacyNote: string; termsNote: string
  }
  science: {
    eyebrow: string; heroTitle: string; heroTitleEm: string; heroSubtitle: string
    pillarsTitle: string
    rambamEyebrow: string; rambamTitle: string; rambamBody: string; rambamCta: string
    refsTitle: string; refsFooter: string; refsFooterCta: string
    ctaTitle: string; ctaBody: string; ctaCta: string
  }
  knowledge: {
    eyebrow: string; heroTitle: string; heroTitleEm: string; heroSubtitle: string
    featuredLabel: string; readArticle: string; read: string
    newsletterTitle: string; newsletterBody: string
    newsletterSubmit: string; newsletterPlaceholder: string
    articleBack: string; articleDisclaimer: string; articleDisclaimerBody: string
    articleMore: string; articleViewAll: string
    articleCtaTitle: string; articleCtaBody: string; articleCtaCta: string
    articleNotFound: string; articleNotFoundBody: string; articleNotFoundMore: string
  }
  compare: {
    eyebrow: string; heroTitle: string; heroSubtitle: string
    colFeature: string; colHolos: string; colGeneric: string; colPro: string
    f1: string; f2: string; f3: string; f4: string; f5: string
    f6: string; f6Generic: string
    f7: string; f7Generic: string; f7Pro: string
    f8: string; f8Generic: string; f8Pro: string
    f9: string; f10: string; f10Pro: string; f11: string
    f12: string; f12Holos: string; f12Generic: string; f12Pro: string
    diffTitle: string
    d1Title: string; d1Body: string
    d2Title: string; d2Body: string
    d3Title: string; d3Body: string
    ctaTitle: string; ctaBody: string; ctaCta: string; ctaCta2: string
  }
  integrations: {
    eyebrow: string; heroTitle: string; heroTitleEm: string; heroSubtitle: string
    ctaCta: string; ctaCta2: string
    cat1: string; cat2: string; cat3: string; cat4: string; cat5: string
    statusAvailable: string; statusBeta: string; statusSoon: string
    apiTitle: string; apiBody: string; apiCta: string
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
    faq: 'FAQ', contact: 'Contact', recommendations: 'Recommendations',
  },
  auth: {
    welcomeBack: 'Welcome back', signInDesc: 'Sign in to your Holos account',
    email: 'Email', password: 'Password', signIn: 'Sign in', signingIn: 'Signing in…',
    noAccount: 'No account?', createFree: 'Create one free',
    createAccount: 'Begin your journey', createDesc: 'Your integrative wellness intelligence awaits',
    fullName: 'Full name', confirmPassword: 'Confirm password',
    createBtn: 'Create free account', haveAccount: 'Already have an account?', signInLink: 'Sign in',
    creatingAccount: 'Creating account…',
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
    step1: 'Step 1 of 2 — Choose your lens',
    step1Title: 'Which wisdom tradition\nshould interpret your results?',
    step1Desc: 'Each framework analyses the same answers differently. You can re-assess under a different tradition at any time.',
    begin: 'Begin assessment',
    calculating: 'Calculating your score',
    analysing: 'Analysing your responses across',
    adaptive: 'Adaptive · your answers shape what follows',
    liveEstimate: 'Live estimate',
    livePreview: 'Final scores use all 6 scoring layers — this preview uses Layer 1 only.',
  },
  progress: {
    title: 'Progress', noData: 'No data yet',
    noDataDesc: 'Complete your first assessment to start tracking your wellness journey.',
    latestScore: 'Latest Score', assessments: 'Assessments', level: 'Level', totalXP: 'Total XP',
    compositeOverTime: 'Composite Score Over Time', dimensionBreakdown: 'Dimension Breakdown',
    assessmentHistory: 'Assessment History', yourJourney: 'Your Wellness Journey',
    takeAssessment: 'Take assessment →',
  },
  dimensions: {
    nutrition: 'Nutrition', sleep: 'Sleep', recovery: 'Recovery', calm: 'Calm',
    movement: 'Movement', emotional: 'Emotional', balance: 'Balance', purpose: 'Purpose', energy: 'Energy',
  },
  journal: {
    title: 'Wellness Journal', write: '✎ Write', history: '◎ History',
    howFeeling: 'How are you feeling?', tagDimensions: 'Tag dimensions (optional)',
    saveEntry: 'Save entry →', saving: 'Saving...',
    loading: 'Loading entries…', noEntries: 'No entries yet',
    noEntriesDesc: 'Start writing to build your wellness history.',
    writeFirst: 'Write first entry →',
    moodStruggling: 'Struggling', moodLow: 'Low', moodOkay: 'Okay', moodGood: 'Good', moodThriving: 'Thriving',
    placeholder: 'What are you noticing about your wellness today? Any patterns, sensations, wins, or struggles...',
  },
  goals: {
    title: 'Wellness Goals', addGoal: '+ Add goal', newGoal: 'New goal', goalTitle: 'Goal title *',
    dimension: 'Dimension', targetDate: 'Target date', description: 'Description',
    saving: 'Saving…', addBtn: 'Add goal →',
    noGoals: 'No goals yet', noGoalsDesc: 'Set your first wellness goal to track what matters most.',
    active: 'Active', completed: 'Completed', target: 'Target:',
    descPlaceholder: 'Why does this goal matter?', titlePlaceholder: 'e.g. Sleep 8 hours every night',
    loading: 'Loading…',
  },
  habits: {
    title: 'Daily Habits', addHabit: '+ Add habit', newHabit: 'New habit', habitLabel: 'Habit *',
    dimension: 'Dimension', frequency: 'Frequency', saving: 'Saving…', addBtn: 'Add habit →',
    todayProgress: "Today's progress",
    allCompleted: '✓ All habits completed today — outstanding!',
    noHabits: 'No habits yet',
    noHabitsDesc: 'Small daily practices compound into lasting transformation.',
    addFirst: 'Add your first habit →', loading: 'Loading…',
  },
  recommendations: {
    title: 'Your Action Plan',
    noRecs: 'No recommendations yet',
    noRecsDesc: 'Complete an assessment to receive personalised action recommendations.',
    nothing: 'Nothing here',
    nothingDesc: 'Switch to "All" to see all your recommendations.',
    takeAssessment: 'Take assessment →',
    markDone: '✓ Mark done', dismiss: 'Dismiss', completedLabel: '✓ Completed',
    filterPending: 'pending', filterCompleted: 'completed', filterAll: 'all', loading: 'Loading…',
    impact: 'Impact', difficulty: 'Difficulty',
  },
  reports: {
    title: 'Wellness Reports', noData: 'No report data yet',
    noDataDesc: 'Complete your first assessment to generate a comprehensive wellness report with dimension scores and trend analysis.',
    takeFirst: 'Take your first assessment →',
    compositeScore: 'Composite Score', allNineDims: 'All Nine Dimensions',
    assessmentHistory: 'Assessment History',
    fromLast: 'from last assessment', newAssessment: 'New assessment →',
    viewActionPlan: 'View action plan',
    thriving: 'Thriving', stable: 'Stable', needsAttention: 'Needs Attention', critical: 'Critical',
  },
  profile: {
    title: 'Your Profile', fullName: 'Full name', email: 'Email', location: 'Location',
    dob: 'Date of birth', tradition: 'Preferred tradition', timezone: 'Timezone', bio: 'Bio',
    saveChanges: 'Save changes →', saving: 'Saving…', saved: '✓ Saved', level: 'Lv',
    wellnessSeeker: 'Wellness Seeker',
    bioPlaceholder: 'Tell us a little about your wellness journey…',
    namePlaceholder: 'Your name', locationPlaceholder: 'City, Country', loading: 'Loading…',
  },
  results: {
    overview: 'overview', framework: 'framework', recommendations: 'recommendations',
    wellnessRadar: 'Wellness Radar', dimensionScores: 'Dimension Scores', dimensionRings: 'Dimension Rings',
    doshaBalance: 'Dosha Balance', fiveElements: 'Five Elements', dominant: 'Dominant:',
    noRecs: 'No recommendations available. Retake your assessment to generate a fresh plan.',
    talkCoach: 'Talk to your AI coach →', reassess: 'Reassess under a different framework',
    interpretation: 'Interpretation', score: 'Score:', impact: 'Impact', evidence: 'evidence', min: 'min',
    inBalance: 'is in balance.', needsAttention: 'needs attention.',
  },
  pricing: {
    eyebrow: 'Pricing', titleA: 'Start free.', titleEm: 'Scale when you are ready.',
    subtitle: 'No credit card required. No long-term contracts. 14-day Practitioner trial on signup.',
    mostPopular: 'Most Popular',
    seekerPeriod: 'forever free', seekerTagline: 'Begin your wellness intelligence journey', seekerCta: 'Start free',
    seekerF1: '1 assessment per month', seekerF2: 'Evidence-Based tradition',
    seekerF3: 'Basic wellness portrait (9 dimensions)', seekerF4: 'AI Coach (3 conversations/month)',
    seekerF5: 'Progress history (30 days)', seekerF6: 'All 8 wisdom traditions',
    seekerF7: 'Unlimited assessments', seekerF8: 'Journal, Goals & Habits',
    seekerF9: 'Detailed reports', seekerF10: 'Export & share',
    proTagline: 'The complete multi-tradition wellness system', proCta: 'Start 14-day free trial',
    proBadge: 'Most Popular', proPeriod: '/month',
    proF1: 'Unlimited assessments', proF2: 'All 8 wisdom traditions',
    proF3: 'Complete wellness portrait + trend analysis', proF4: 'AI Coach (unlimited)',
    proF5: 'Journal, Goals & Habits tracking', proF6: 'Detailed reports + PDF export',
    proF7: 'Progress history (lifetime)', proF8: 'Personalised recommendations',
    proF9: 'Priority email support', proF10: 'Client sharing (coming soon)',
    entTagline: 'For clinics, coaching practices, and wellness teams', entCta: 'Contact us',
    entF1: 'Everything in Practitioner', entF2: 'Multi-user workspace management',
    entF3: 'Client portal & practitioner dashboard', entF4: 'White-label options',
    entF5: 'Custom tradition weighting', entF6: 'API access',
    entF7: 'Dedicated customer success manager', entF8: 'Custom reporting & analytics',
    entF9: 'SSO / SAML integration', entF10: 'HIPAA-compliant data handling',
    faqEyebrow: 'FAQ', faqTitle: 'Common questions about pricing.',
    faq1Q: 'Is the free plan really free, forever?',
    faq1A: 'Yes. The Seeker plan is permanently free — no credit card required, no trial period. You get one assessment per month and three AI Coach conversations, indefinitely.',
    faq2Q: 'What happens after my 14-day Practitioner trial?',
    faq2A: 'You are automatically moved to the Seeker (free) plan. No charge. If you want to continue with full Practitioner access, you can upgrade at any time from your account settings.',
    faq3Q: 'Can I cancel anytime?',
    faq3A: 'Absolutely. There are no long-term contracts. Cancel from your account settings and you will retain Practitioner access until the end o