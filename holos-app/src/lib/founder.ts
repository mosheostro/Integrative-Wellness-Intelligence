// ─── Centralized Founder & Contact Configuration ──────────────────────────
// All contact points, social links, and founder data live here.
// Never hardcode these values in page components.

export const FOUNDER = {
  name:        'Moshe Ostrovsky',
  nameHe:      'משה אוסטרובסקי',
  nameRu:      'Моше Островский',
  title:       'Founder & Chief Wellness Architect',
  subtitle:    'Integrative Wellness Coach · 15+ Years',
  tagline:     'Bridging ancient wisdom with modern science',
  photo:       '/founder.jpg',         // place in /public

  bio: `Moshe Ostrovsky spent 15 years studying wellness traditions on four continents — from Ayurvedic ashrams in India to Tibetan medical colleges in Nepal, from Hippocratic archives in Greece to clinical research institutions in Europe. He synthesised these insights into HOLOS: a precision wellness intelligence system that maps the human being across nine dimensions and eight traditions simultaneously.`,

  bioShort: `Certified integrative wellness coach, Ayurvedic practitioner, and founder of HOLOS — the first wellness intelligence platform to unite eight ancient traditions with evidence-based science.`,

  philosophy: `True health is not the absence of symptoms. It is the dynamic harmony between body, energy, mind, and meaning. Every tradition has a piece of the truth; HOLOS holds them all at once.`,

  // Contact
  email:     'Moshe.Svarga@gmail.com',
  emailAlt:  'support@holos-wellness.com',
  phone:     '+972 54-998-9627',
  whatsapp:  'https://wa.me/972549989627',
  telegram:  'https://t.me/moshe_holos',

  // Online presence
  website:   'https://svarga-om.com',
  calendly:  'https://calendly.com/moshe-holos',
  linkedin:  'https://linkedin.com/in/moshe-ostrovsky',
  instagram: 'https://instagram.com/holos.wellness',
  youtube:   'https://youtube.com/@holoswellness',

  // Credentials
  credentials: [
    'Certified Integrative Wellness Coach (IWA)',
    'Ayurvedic Health Practitioner',
    'Tibetan Medicine Graduate — Men-Tsee-Khang',
    'Rambam Medical Philosophy Scholar',
    'Certified Life Coach (ICF-PCC)',
    'Clinical Nutrition Specialist',
  ],

  expertise: [
    'Integrative Medicine & Wellness',
    'Ayurvedic Lifestyle Design',
    'Tibetan Buddhist Health Protocols',
    'Clinical Nutrition & Lifestyle Medicine',
    'Stress Reduction & Nervous System Regulation',
    'Mind-Body Connection & Psychosomatics',
    'Ancient Wisdom Synthesis',
    'AI-Augmented Coaching',
  ],

  languages: ['English', 'Hebrew', 'Russian'],
  timezone:  'Asia/Jerusalem',
  location:  'Tel Aviv, Israel',
} as const

export type Founder = typeof FOUNDER
