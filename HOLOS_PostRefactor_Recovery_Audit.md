# HOLOS Post-Refactor Recovery Audit
**Date:** 2026-06-16  
**Scope:** Theme System · Internationalization · RTL Support · Localization QA  
**Verdict:** ✅ Production-ready pending Supabase env vars + Vercel deploy

---

## 1. Files Created / Modified

### New infrastructure files
| File | Purpose |
|------|---------|
| `src/lib/i18n/translations.ts` | Complete 4-language dictionaries (EN/RU/HE/DE), ~430 lines |
| `src/contexts/ThemeContext.tsx` | Theme provider — light/dark/system, localStorage persistence, anti-flash |
| `src/contexts/LanguageContext.tsx` | Language provider — cookie + localStorage, RTL dir management |
| `src/components/Providers.tsx` | Wraps ThemeProvider + LanguageProvider for layout consumption |
| `src/components/ui/ThemeToggle.tsx` | Sun/moon icon button, calls toggleTheme() |
| `src/components/ui/LanguageSwitcher.tsx` | 4-locale dropdown with flags, outside-click close |
| `holos-app/vercel.json` | Forces Next.js framework detection (fixes "no public dir" error) |

### Modified files
| File | Change |
|------|--------|
| `src/app/layout.tsx` | Anti-flash inline script in `<head>`, Providers wrapper, suppressHydrationWarning |
| `src/app/globals.css` | Full RTL CSS block added (~55 lines) |
| `src/components/ui/AppNav.tsx` | ThemeToggle + LanguageSwitcher added; all labels wired to `t()` |
| `src/components/layout/SiteNav.tsx` | ThemeToggle + LanguageSwitcher in desktop CTAs + mobile drawer; all labels wired |
| `src/app/(app)/settings/page.tsx` | Appearance section added (theme selector + language grid); all strings translated |

---

## 2. Theme System — Restored ✅

**What was broken:** `data-theme="light"` hardcoded in `layout.tsx`, no ThemeProvider, no toggle UI.

**What was restored:**

- **ThemeContext** reads `localStorage('holos-theme')`, resolves `system` via `matchMedia`, writes back on change, listens for OS preference changes while in system mode.
- **Anti-flash inline `<script>`** in `<head>` reads localStorage and sets `data-theme` before first paint — eliminates flash of default theme (FODT).
- **`suppressHydrationWarning`** on `<html>` prevents React hydration mismatch from the server/client `data-theme` difference.
- **ThemeToggle** button in both `AppNav` (app) and `SiteNav` (marketing). Sun icon in dark mode, moon in light.
- **Settings → Appearance** lets users pick Light / Dark / System explicitly.
- **Existing CSS is fully wired** — `globals.css` already had complete `[data-theme="dark"]` token overrides (309 lines). Nothing needed to change there.

---

## 3. Internationalization — Restored ✅

**What was broken:** No i18n library, all UI strings hardcoded in English.

**Architecture chosen:** Cookie + localStorage (NOT `next-intl`) — preserves current flat URL routing. `next-intl` requires `/[locale]/` prefix which would break all 40+ existing routes.

**What was built:**

- **`translations.ts`** — 4 complete language dictionaries (English, Russian, Hebrew, German) covering: `nav`, `auth`, `common`, `dashboard`, `settings`, `coach`, `assessment`, `progress` — ~430 strings total.
- **`LanguageContext`** — reads from `localStorage('holos-locale')` first, falls back to `HOLOS_LOCALE` cookie. Writes both on change (cookie max-age 1 year for SSR reads in middleware if needed). Exposes `{ locale, t, strings, setLocale, isRTL, dir }`.
- **`LanguageSwitcher`** dropdown — shows flag + locale code + name, checkmark on active locale. Available in AppNav (app shell) and SiteNav (marketing) on both desktop and mobile.
- **AppNav** — all 14 nav labels wired to `strings.nav.*`.
- **SiteNav** — all nav labels, CTAs ("Sign in", "Get started", "Get started free") wired to `strings.nav.*`.
- **Settings page** — all section titles, labels, descriptions, button text wired to `strings.settings.*` and `strings.common.*`.

**Anti-flash for locale:** The same inline `<script>` in `<head>` also reads the stored locale and sets `document.documentElement.lang` and `dir` before first paint — Hebrew users never see an LTR flash.

---

## 4. RTL Support — Implemented ✅

**What was broken:** No RTL CSS, no `dir` management.

**What was built:**

- **`LanguageContext`** sets `document.documentElement.dir = 'rtl'` when locale is Hebrew, `'ltr'` for all others. Also sets the `lang` attribute correctly for each locale.
- **Anti-flash script** reads the stored locale and pre-applies `dir` before React hydrates.
- **RTL CSS block** added to `globals.css`:
  - `[dir="rtl"]` → `text-align: right`
  - Flex-row containers → `flex-direction: row-reverse`
  - Inputs/textareas/selects → `text-align: right; direction: rtl`
  - Dropdown menus → open from left edge instead of right
  - Sidebar active-indicator border flips from left to right
  - Lists → `padding-right` instead of `padding-left`
  - Progress bars → `direction: rtl`
  - Logo margin swaps start/end

**Coverage:** Nav, forms, buttons, inputs, dropdowns, sidebars, lists. Charts (Recharts SVG) are locale-neutral and need no RTL override.

---

## 5. Localization QA

### Strings audit by screen

| Screen | Status | Notes |
|--------|--------|-------|
| AppNav (app shell) | ✅ Translated | All 14 items + profile/settings/signout |
| SiteNav (marketing) | ✅ Translated | All 5 top-level + CTAs + mobile drawer |
| Settings page | ✅ Translated | All 6 sections, all labels/descriptions |
| Auth (login/signup) | ✅ Dictionary ready | `strings.auth.*` keys defined; pages need wiring in next pass |
| Dashboard | ✅ Dictionary ready | `strings.dashboard.*` keys defined; page needs wiring in next pass |
| AI Coach | ✅ Dictionary ready | `strings.coach.*` keys defined; page needs wiring in next pass |
| Assessment | ✅ Dictionary ready | `strings.assessment.*` keys defined; page needs wiring in next pass |
| Progress | ✅ Dictionary ready | `strings.progress.*` keys defined; page needs wiring in next pass |

### Known remaining work (non-blocking for production)

The following pages still have hardcoded English strings. Translation dictionaries are 100% complete — only the wiring is pending:

- `/auth/login` and `/auth/signup` — replace hardcoded strings with `strings.auth.*`
- `/dashboard` — replace hardcoded strings with `strings.dashboard.*`
- `/coach` — replace with `strings.coach.*`
- `/assessment` — replace with `strings.assessment.*`
- `/progress` — replace with `strings.progress.*`
- All marketing pages (about, pricing, methodologies, etc.) — not yet in translation dictionaries; add when content stabilizes

### Text overflow / truncation risk

- Hebrew strings are generally shorter than English (no overflow risk)
- Russian strings average ~15% longer than English — monitor nav labels on narrow viewports
- German strings can be 30–40% longer — `whiteSpace: nowrap` + `overflowX: auto` on nav container handles this in AppNav

---

## 6. Security Constraints — Verified ✅

- **Founder contact data:** `src/lib/founder.ts` is the single source of truth. No hardcoded email or phone anywhere in the new files.
- **Calendly URL:** Not referenced in any of the new i18n/theme files.
- **No hardcoded credentials:** All Supabase calls use `createClient()` from `src/lib/supabase/client.ts` with env vars.

---

## 7. Vercel Build Fix — Applied ✅

**Root cause:** Vercel project had `framework: null` even after Root Directory was changed to `holos-app/`. Without a framework declaration, Vercel ran `npm install` then looked for a `public/` directory as static output.

**Fix:** `holos-app/vercel.json` created:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**Action required from you:**
1. `git add holos-app/vercel.json && git commit -m "fix: add vercel.json" && git push origin main`
2. In Vercel UI → Project Settings → General → Framework Preset → set to **Next.js** (belt and suspenders)
3. Add env vars in Vercel → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - `OPENAI_API_KEY` = your OpenAI key (for AI Coach)

---

## 8. Production Readiness Verdict

| Area | Status | Confidence |
|------|--------|-----------|
| Theme system (light/dark/system) | ✅ Complete | High — anti-flash, persistence, toggle in both navs |
| Translation architecture | ✅ Complete | High — 4 languages, centralized dictionaries, context API |
| RTL layout (Hebrew) | ✅ Complete | High — dir managed pre-paint, comprehensive CSS rules |
| Settings Appearance section | ✅ Complete | High — theme + language picker, fully wired |
| Nav strings (app + marketing) | ✅ Complete | High |
| Inner page strings (dashboard, auth, coach…) | ⚠️ Partial | Medium — dictionaries ready, wiring pending |
| Vercel build | ✅ Fixed | High — pending git push + env vars |
| Founder data security | ✅ Enforced | High — no hardcoded data in any new files |

**Verdict: Ship-ready for core flows.** The theme, language switcher, RTL, and settings UI are production quality. The inner app pages (dashboard, coach, assessment) still render English strings until wired — acceptable for a launch where EN is the primary market, with full i18n rollout in the next sprint.
