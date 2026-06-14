import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas:   'var(--canvas)',
        canvas2:  'var(--canvas2)',
        surface:  'var(--surface)',
        line:     'var(--line)',
        ink:      'var(--ink)',
        soft:     'var(--ink-soft)',
        faint:    'var(--ink-faint)',
        sage:     'var(--sage)',
        'sage-d': 'var(--sage-deep)',
        gold:     'var(--gold)',
        'gold-d': 'var(--gold-deep)',
        indigo:   'var(--indigo)',
        clay:     'var(--clay)',
        rose:     'var(--rose)',
      },
      fontFamily: {
        sans:  ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
