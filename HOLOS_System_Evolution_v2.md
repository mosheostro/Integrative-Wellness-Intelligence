# HOLOS System Evolution v2
## From SaaS Dashboard to Living Wellness Intelligence Organism

**Document Type:** Cross-Functional Architecture + Creative Direction Brief  
**Team:** Principal AI Systems Architect · Creative Director · 3D Experience Designer · Motion Design Lead · Generative AI Visual Designer · Product Growth Architect · Design Systems Engineer · Frontend Performance Specialist  
**Status:** Pre-Implementation Specification  
**Date:** June 2026

---

## Vision Statement

The current HOLOS system is architecturally sound and intellectually rigorous. Its 6-layer scoring engine, 8 wisdom traditions, and 9 wellness dimensions represent genuine depth. But the interface speaks the language of software — cards, charts, rows, percentages.

The evolution target is a different register entirely: a system that communicates wellness through spatial metaphor, living motion, and generative form — the way the body actually experiences itself. Not numbers. Not bars. Not dashboards.

A breathing, responding, adapting organism.

**The experience test:** A user who has never heard the word "HOLOS" sits in front of it for 30 seconds. They should feel: *"This thing is watching me, understanding me, and already beginning to respond to what it sees."* That is the north star for every decision in this document.

---

## DELIVERABLE 1: 3D System Architecture Plan

### Technology Stack Decision

After evaluating Three.js, Babylon.js, and raw WebGL, the recommendation is **React Three Fiber (R3F)** with `@react-three/drei` helpers. Rationale:

- Native React component model — composable, testable, tree-shakes correctly
- Shared state with existing Zustand/Context patterns
- `@react-three/drei` provides 99% of needed abstractions (orbit controls, instances, shaders, portals)
- No build pipeline changes — works with existing Next.js 15 setup
- R3F scenes lazy-load as Next.js dynamic imports — zero bundle impact until needed

```bash
# New dependencies — all lazy-loaded, zero impact on initial bundle
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install --save-dev @types/three
```

**Package budget:** Three.js (~580kB gzip: 143kB) loaded only when 3D scenes mount. All 3D code lives in `/src/3d/` and is imported exclusively via `next/dynamic` with `{ ssr: false }`.

---

### 3D Module 1: Wellness Sphere (Core System View)

The Wellness Sphere is the primary 3D artifact. It replaces the current `WellnessOrb` SVG component at the center of the dashboard.

**Conceptual model:** A layered geosphere. Each layer is a translucent shell corresponding to one wellness dimension. The innermost shell is `purpose` (the core of identity). The outermost is the integration layer. Layer opacity and surface turbulence are driven by the user's live dimension scores.

**Architecture:**

```
/src/3d/
  WellnessSphere/
    WellnessSphere.tsx        ← R3F scene root
    layers/
      SphereLayer.tsx         ← Individual dimension shell
      LayerShader.glsl        ← Custom GLSL for surface distortion
    particles/
      AmbientParticles.tsx    ← Floating wellness state particles
    useSphereDynamics.ts      ← Hook: score → sphere parameters
  FiveElements/
    FiveElementsScene.tsx
    elements/
      WoodElement.tsx
      FireElement.tsx
      EarthElement.tsx
      MetalElement.tsx
      WaterElement.tsx
    useElementFlow.ts
  SwargaOrbit/
    SwargaOrbitScene.tsx
    OrbitalDomain.tsx
    useOrbitalDynamics.ts
  DoshaFluid/
    DoshaFluidScene.tsx
    FluidSimulation.tsx       ← GPU-based fluid on texture
    useDoshaFluid.ts
  shared/
    SceneCanvas.tsx           ← Shared R3F Canvas with performance defaults
    useDeviceCapability.ts    ← GPU tier detection
    postprocessing/
      BloomLayer.tsx
      ChromaticAberration.tsx
      DepthOfField.tsx
```

**Sphere layer mapping:**

| Layer (outer → inner) | Dimension | Color family | Distortion trigger |
|---|---|---|---|
| 1 (outermost) | life_balance | Indigo | High life_balance variance |
| 2 | sleep | Deep blue | sleep < 45 |
| 3 | movement | Clay/amber | movement extremes |
| 4 | nutrition | Gold | poor nutrition |
| 5 | recovery | Sage green | recovery < 40 |
| 6 | emotional | Violet | emotional < 45 |
| 7 | stress (inverted) | Rose | stress > 70 |
| 8 | energy | Warm white | energy < 35 |
| 9 (core) | purpose | Deep gold | always stable anchor |

**Surface shader — `LayerShader.glsl` (vertex):**
```glsl
uniform float u_time;
uniform float u_score;      // 0-1, normalized dimension score
uniform float u_distort;    // 0-1, how much to disturb the surface

varying vec2 v_uv;
varying vec3 v_normal;

// Simplex noise function (inlined)
// ...

void main() {
  v_uv = uv;
  v_normal = normalize(normalMatrix * normal);
  
  // Score drives radius deviation — poor scores create dimples
  float healthPulse = sin(u_time * 1.2 + position.y * 3.0) * 0.5 + 0.5;
  float distortion = (1.0 - u_score) * u_distort * 0.08;
  float noise = snoise(position * 2.0 + u_time * 0.3) * distortion;
  
  vec3 displaced = position + normal * noise;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
```

**Score → sphere parameter mapping** (`useSphereDynamics.ts`):
```ts
interface SphereParams {
  layerOpacities: number[]      // per-layer, 0-1
  rotationSpeed: number         // 0.001 (depleted) → 0.008 (high performance)
  innerGlowIntensity: number    // composite score / 100
  surfaceDistortion: number[]   // per-layer, inverse of score
  particleDensity: number       // wellness state drives this
  ambientPulseRate: number      // breathing rate: stressed=fast, calm=slow
}

export function scoreToSphereParams(scores: DimensionScores): SphereParams {
  const composite = scores.composite / 100
  return {
    layerOpacities: DIMS.map(d => 0.3 + (scores[d] / 100) * 0.5),
    rotationSpeed: 0.001 + composite * 0.007,
    innerGlowIntensity: composite,
    surfaceDistortion: DIMS.map(d => Math.max(0, (60 - scores[d]) / 60)),
    particleDensity: composite * 200,
    ambientPulseRate: 1.2 + (1 - scores.stress / 100) * 0.8,
  }
}
```

---

### 3D Module 2: Five Elements Ecosystem

A spatial scene where five elemental entities exist in dynamic relationship. Wood feeds Fire; Earth grounds Metal; Water nourishes Wood. In the TCM / Daoist framework, imbalance in one propagates to the generative/controlling cycles.

Each element is not an icon or glyph. It is a **behavioral entity**:
- **Wood** → growing branching structure (L-system geometry, animated)
- **Fire** → particle system with upward flow and heat shimmer (custom shader)
- **Earth** → stable low-frequency pulse, settled geometry
- **Metal** → reflective planes with crisp edges, high specularity
- **Water** → fluid surface simulation, caustic lighting

**Flow visualization:** When one element weakens (score drop), `bezierCurve` particles flow from the controlling element to it, visually representing the Ke (controlling) cycle attempting to compensate. The user sees their imbalance as a visible energetic drain.

---

### 3D Module 3: Swarga Balance Universe

Nine life domains orbit a central core, rendered as luminous orbs. The orbital radius, velocity, and brightness of each orb encodes its health. Domains in deficit drift outward (eccentricity increases) and dim. High-performing domains orbit closer and emit secondary particles.

The central core pulses at the composite score's rhythm. The user can click any orbital domain to pull it into focus — the scene rotates that domain to face the camera and expands it into a detail card.

---

### 3D Module 4: Dosha Fluid Model

A bounded sphere filled with three interpenetrating fluids — Vata (light grey/white, high mobility), Pitta (amber-red, medium viscosity), Kapha (deep blue-green, high viscosity). Their relative volumes reflect the dosha balance. The fluid simulation runs on a GPU render target (512×512 texture), updated per frame using a custom WebGL shader that implements simplified Navier-Stokes.

Transitions between dominant doshas are animated over 2 seconds — you watch the fluid redistribute as the user answers branching questions.

---

## DELIVERABLE 2: Generative Visual Strategy

### Philosophy

Static illustrations are frozen moments. They represent a generic user at a generic state. HOLOS users are specific individuals in specific states. Their visuals must be too.

Every visual generated in HOLOS must satisfy: **If this user's scores changed by 20 points, would the visual look measurably different?** If yes, it belongs. If no, it's decoration and should be removed.

### Visual Type 1: Wellness Signature (Assessment Output)

Every completed assessment generates a unique visual "wellness signature" — a procedurally generated image that encodes the user's 9-dimension profile as a visual artifact. The same user on two different days produces two visibly different signatures.

**Algorithm:**
```ts
interface SignatureParams {
  // Derived from DimensionScores
  colorPalette: [string, string, string]  // tradition + state driven
  symmetryOrder: number                   // 3-7, based on consistency score
  noiseScale: number                      // roughness = 1 - composite/100
  organicBias: number                     // toward organic vs geometric
  particleCount: number                   // energy × 500
  centerMass: number                      // purpose score drives gravity
}

function scoresToSignatureParams(scores: DimensionScores, framework: Framework): SignatureParams {
  const palette = TRADITION_PALETTES[framework]
  return {
    colorPalette: [
      palette.primary,
      lerpColor(palette.primary, palette.secondary, scores.emotional / 100),
      lerpColor(palette.secondary, palette.accent, scores.energy / 100),
    ],
    symmetryOrder: 3 + Math.round((scores.life_balance / 100) * 4),
    noiseScale: 1 - scores.composite / 100,
    organicBias: scores.stress > 60 ? 0.3 : 0.8,  // stressed → geometric
    particleCount: Math.round(scores.energy * 5),
    centerMass: scores.purpose / 100,
  }
}
```

**Rendering:** Canvas 2D API with Perlin noise, polar symmetry, and Bézier field lines. SVG export for sharing. Generated client-side in ~80ms using a Web Worker to avoid blocking the main thread.

### Visual Type 2: Energy Flow Map

An animated flow field where streamlines represent wellness energy moving through dimensions. High-energy dimensions generate strong, clear flow lines. Low-energy dimensions show turbulence or stagnation. The flow field uses the curl noise technique (common in fluid art) seeded by the user's score vector.

**Implementation:** Canvas 2D + requestAnimationFrame. The field is computed on a 40×40 grid, particles flow along gradient directions computed from score spatial mapping.

### Visual Type 3: Emotional Terrain

The emotional dimension is rendered as a 3D landscape (using Three.js PlaneGeometry with vertex displacement). High emotional health → rolling gentle hills. Low emotional health → jagged peaks or deep valleys. The terrain morphs slowly in real time using Simplex noise with the user's emotional score controlling the roughness uniform.

### Visual Type 4: Neural Health Map

An organic network visualization where nodes represent wellness dimensions and edges represent their correlations (as computed by the scoring engine's behavioral profile). Edge thickness = correlation strength. Node size = score magnitude. Color = category. The network uses a force-directed layout (D3-force) and animates continuously with gentle spring physics.

This replaces the static RadarChart on the results page for users who opt into the "immersive" view.

### Visual Type 5: Sacred Geometry Wellness Mandala

Framework-specific geometric forms that carry the user's scores:
- Ayurveda → Sri Yantra derivative with 9 dimensions encoded in petal counts
- Daoist → Ba Gua arrangement with element balance in trigram weights
- Rambam → Star of David hexagonal lattice with dimension nodes at vertices
- Evidence-Based → Lissajous curves generated from dimension pairs

Generated as SVG strings, exportable, shareable as identity artifacts.

### Tradition Color Systems

```ts
const TRADITION_PALETTES: Record<Framework, TraditionPalette> = {
  'evidence-based': { primary: 'oklch(0.55 0.15 200)', secondary: 'oklch(0.65 0.12 155)', accent: 'oklch(0.75 0.1 230)' },
  'ayurveda':       { primary: 'oklch(0.60 0.18 60)',  secondary: 'oklch(0.55 0.15 30)',  accent: 'oklch(0.70 0.12 80)'  },
  'rambam':         { primary: 'oklch(0.45 0.10 250)', secondary: 'oklch(0.65 0.08 200)', accent: 'oklch(0.75 0.15 45)'  },
  'daoist':         { primary: 'oklch(0.30 0.05 240)', secondary: 'oklch(0.70 0.02 240)', accent: 'oklch(0.65 0.12 155)' },
  'tibetan':        { primary: 'oklch(0.55 0.20 30)',  secondary: 'oklch(0.45 0.15 280)', accent: 'oklch(0.70 0.15 60)'  },
  'hippocrates':    { primary: 'oklch(0.55 0.12 155)', secondary: 'oklch(0.65 0.10 180)', accent: 'oklch(0.70 0.08 210)' },
  'avicenna':       { primary: 'oklch(0.50 0.15 270)', secondary: 'oklch(0.65 0.12 45)',  accent: 'oklch(0.70 0.10 60)'  },
  'swarga':         { primary: 'oklch(0.60 0.15 155)', secondary: 'oklch(0.65 0.12 45)',  accent: 'oklch(0.55 0.10 200)' },
}
```

---

## DELIVERABLE 3: Motion System Language Definition

### Core Principle

Every motion in HOLOS is a breath. The system breathes with the user. Not animations — biological rhythms.

### Six Motion Primitives

**1. Inhale** — Expansion, opening, arrival  
Duration: 400–800ms | Easing: `cubic-bezier(0.4, 0, 0.2, 1)` | Use: elements entering, scores improving, positive state transitions

**2. Exhale** — Contraction, settling, completion  
Duration: 300–600ms | Easing: `cubic-bezier(0.0, 0, 0.2, 1)` | Use: elements leaving, UI settling after interaction, submission confirmation

**3. Pulse** — Rhythmic attention signal  
Duration: 1200ms infinite | Easing: `ease-in-out` sine wave | Use: live updates, processing states, elements awaiting interaction

**4. Flow** — Continuous directional movement  
Duration: Infinite | Easing: Linear with noise offset | Use: particle systems, progress indicators, energy flow visualizations

**5. Settle** — Spring-based landing after transition  
Duration: 500ms | Easing: `spring(stiffness: 300, damping: 30)` | Use: after route transitions, after score updates, after any significant state change

**6. Shift** — State change marker  
Duration: 200ms out → 400ms in | Easing: `ease-out` then `ease-in` | Use: wellness state changes, framework switches, major data updates

### Motion Token System

```ts
// /src/design-system/motion.ts
export const MOTION = {
  // Durations
  instant:  80,
  fast:     150,
  normal:   300,
  slow:     500,
  deliberate: 800,
  cinematic: 1200,

  // Easings (CSS cubic-bezier strings)
  easing: {
    inhale:   'cubic-bezier(0.4, 0, 0.2, 1)',
    exhale:   'cubic-bezier(0.0, 0, 0.2, 1)',
    spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',  // slight overshoot
    smooth:   'cubic-bezier(0.4, 0, 0.6, 1)',
    sharp:    'cubic-bezier(0.0, 0, 0.6, 1)',
    linear:   'linear',
  },

  // State-driven timing multipliers (wellness state adjusts motion speed)
  stateMultiplier: {
    HIGH_PERFORMANCE: 0.8,   // crisp, snappy
    BALANCED:         1.0,   // default
    OPTIMIZATION:     0.9,
    LIFESTYLE_IMPROVEMENT: 1.1,
    MAINTENANCE:      1.1,
    INFLAMMATORY_PATTERN: 1.2,
    LOW_RECOVERY:     1.3,   // slower, heavier
    ENERGY_IMBALANCE: 1.4,
    SLEEP_DEFICIT:    1.5,
    STRESS_DOMINANT:  0.85,  // tight, faster transitions (nervous energy)
  },
} as const
```

### Framer Motion Variants Library

```ts
// /src/design-system/variants.ts
import { MOTION } from './motion'

export const pageVariants = {
  hidden:  { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
             transition: { duration: MOTION.slow / 1000, ease: MOTION.easing.inhale } },
  exit:    { opacity: 0, y: -8, filter: 'blur(2px)',
             transition: { duration: MOTION.normal / 1000, ease: MOTION.easing.exhale } },
}

export const scoreCounterVariants = {
  initial: { scale: 0.95, opacity: 0.6 },
  animate: { scale: 1, opacity: 1,
             transition: { type: 'spring', stiffness: 300, damping: 25 } },
}

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.06 } },
}

export const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,
             transition: { duration: MOTION.normal / 1000, ease: MOTION.easing.inhale } },
}

// Wellness state → motion intensity
export function getStateMotionProps(state: WellnessState) {
  const mult = MOTION.stateMultiplier[state]
  return {
    transition: {
      duration: (MOTION.normal / 1000) * mult,
      ease: state === 'STRESS_DOMINANT' ? MOTION.easing.sharp : MOTION.easing.smooth,
    },
  }
}
```

### Ambient Breathing System

The entire interface breathes at a rate derived from the user's stress and energy scores. This is implemented as a CSS animation on the root element, affecting subtle properties (background luminosity ±2%, shadow spread ±1px):

```css
@property --breathe-progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

:root {
  animation: ambient-breathe var(--breathe-duration, 4s) ease-in-out infinite;
}

@keyframes ambient-breathe {
  0%, 100% { --breathe-progress: 0; }
  50%       { --breathe-progress: 1; }
}

/* Components subscribe to --breathe-progress via calc() */
.orb-glow {
  box-shadow: 0 0 calc(20px + var(--breathe-progress) * 12px)
              rgba(var(--sage-rgb), calc(0.15 + var(--breathe-progress) * 0.08));
}
```

Stress score controls `--breathe-duration` via JS: stressed = 2.8s, calm = 5.5s.

---

## DELIVERABLE 4: UI Adaptive Behavior Specification

### State → UI Parameter Mapping

The interface transforms across 6 axes in response to wellness state. These are subtle shifts — not theme changes. The same layout, visibly different feeling.

| State | Spacing density | Border radius | Shadow depth | Gradient saturation | Text weight | Motion speed |
|---|---|---|---|---|---|---|
| HIGH_PERFORMANCE | Tight (88%) | Sharp (8px) | Deep (24px) | High (1.2×) | 600 | 0.8× |
| BALANCED | Normal (100%) | Medium (16px) | Standard (12px) | Normal (1.0×) | 500 | 1.0× |
| OPTIMIZATION | Tight (94%) | Medium-sharp (12px) | Standard+ (16px) | Normal+ (1.1×) | 500-600 | 0.9× |
| STRESS_DOMINANT | Slightly tight (96%) | Sharp (10px) | Flat (8px) | Low (0.85×) | 500 | 0.85× |
| SLEEP_DEFICIT | Loose (106%) | Soft (20px) | Diffuse (16px) | Low (0.8×) | 400 | 1.5× |
| LOW_RECOVERY | Loose (110%) | Soft (24px) | Minimal (6px) | Very low (0.7×) | 400 | 1.4× |
| ENERGY_IMBALANCE | Normal (100%) | Medium (16px) | Minimal (8px) | Low (0.8×) | 400 | 1.3× |
| DEPLETED (general) | Loose (108%) | Very soft (24px) | None (4px) | Muted (0.65×) | 400 | 1.6× |

**CSS custom property injection** (extends existing `AmbientModeInjector` pattern):

```ts
// /src/contexts/WellnessContext.tsx — extend AmbientModeInjector
const STATE_UI_VARS: Record<WellnessState, Record<string, string>> = {
  HIGH_PERFORMANCE: {
    '--ui-spacing-scale': '0.88',
    '--ui-radius-scale':  '0.5',
    '--ui-shadow-blur':   '24px',
    '--ui-sat-boost':     '1.2',
    '--breathe-duration': '3.2s',
  },
  BALANCED: {
    '--ui-spacing-scale': '1.0',
    '--ui-radius-scale':  '1.0',
    '--ui-shadow-blur':   '12px',
    '--ui-sat-boost':     '1.0',
    '--breathe-duration': '4.5s',
  },
  SLEEP_DEFICIT: {
    '--ui-spacing-scale': '1.06',
    '--ui-radius-scale':  '1.25',
    '--ui-shadow-blur':   '16px',
    '--ui-sat-boost':     '0.8',
    '--breathe-duration': '6.0s',
  },
  // ... all 10 states
}
```

**Contextual intelligence — time of day:**

```ts
function getTimeOfDayUIShift(): Partial<Record<string, string>> {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 10)  return { '--ui-luminosity': '1.05', '--canvas-tint': 'warm' }
  if (hour >= 10 && hour < 17) return { '--ui-luminosity': '1.0',  '--canvas-tint': 'neutral' }
  if (hour >= 17 && hour < 20) return { '--ui-luminosity': '0.97', '--canvas-tint': 'warm-dim' }
  return { '--ui-luminosity': '0.92', '--canvas-tint': 'cool-dim', '--ui-sat-boost': '0.85' }
}
```

### Adaptive Dashboard Layout

The current dashboard has a fixed layout. The evolved system uses a weighted card sort that elevates cards based on user state:

```ts
interface DashboardCard {
  id: string
  weight: (state: WellnessState, scores: DimensionScores) => number
}

const CARD_WEIGHTS: DashboardCard[] = [
  { id: 'sphere',          weight: () => 100 },  // always first
  { id: 'sleep-focus',     weight: (s, sc) => s === 'SLEEP_DEFICIT' ? 95 : 40 },
  { id: 'stress-tools',    weight: (s, sc) => s === 'STRESS_DOMINANT' ? 90 : 35 },
  { id: 'energy-boost',    weight: (s, sc) => sc.energy < 40 ? 85 : 30 },
  { id: 'radar',           weight: (s, sc) => 75 },
  { id: 'recommendations', weight: (s, sc) => 70 },
  { id: 'coach-prompt',    weight: (s, sc) => sc.composite < 60 ? 80 : 50 },
  { id: 'progress-trend',  weight: () => 45 },
  { id: 'xp-gamification', weight: () => 20 },
]

// Cards render in weight-descending order
// Lowest-weight cards collapse to "see more" accordion on mobile
```

---

## DELIVERABLE 5: Module / Plugin Architecture

### Design Goal

Any third-party system (wearable, lab, app) should be able to plug into HOLOS's scoring engine, recommendation engine, and visualization layer by implementing a single TypeScript interface.

### Core Plugin Interface

```ts
// /src/plugins/types.ts

export interface HOLOSPlugin {
  // Identity
  id:          string
  name:        string
  version:     string
  icon:        string
  description: string
  category:    PluginCategory

  // Capabilities
  capabilities: PluginCapability[]

  // Data contract
  fetchData(userId: string, timeRange: TimeRange): Promise<PluginData>
  
  // Scoring contribution (optional — not all plugins score)
  getScoreContributions?(data: PluginData): Partial<DimensionScores>
  
  // Recommendation filter (optional — can veto/boost recs)
  filterRecommendations?(recs: Recommendation[], data: PluginData): Recommendation[]
  
  // Dashboard widget (optional — can render its own UI)
  DashboardWidget?: React.ComponentType<{ data: PluginData; compact?: boolean }>
  
  // 3D contribution (optional — can add objects to Wellness Sphere scene)
  Sphere3DLayer?: React.ComponentType<{ data: PluginData; score: number }>
}

export type PluginCategory = 
  | 'wearable' | 'nutrition' | 'lab' | 'meditation' | 'coaching' | 'corporate'

export type PluginCapability =
  | 'scores'            // contributes to dimension scores
  | 'recommendations'   // filters/generates recommendations
  | 'dashboard'         // renders dashboard widget
  | 'visualization'     // contributes to 3D/visual layer
  | 'data-export'       // can export user data
  | 'real-time'         // streams live data
```

### Plugin Registry

```ts
// /src/plugins/registry.ts
class PluginRegistry {
  private plugins: Map<string, HOLOSPlugin> = new Map()
  private activePlugins: Set<string> = new Set()

  register(plugin: HOLOSPlugin): void {
    this.plugins.set(plugin.id, plugin)
  }

  activate(pluginId: string, userId: string): void {
    this.activePlugins.add(pluginId)
    // Persist to Supabase user_plugins table
  }

  // Scoring engine calls this to collect all active plugin contributions
  async collectScoreContributions(
    userId: string, 
    baseScores: DimensionScores,
    timeRange: TimeRange
  ): Promise<DimensionScores> {
    let merged = { ...baseScores }
    for (const id of this.activePlugins) {
      const plugin = this.plugins.get(id)
      if (!plugin?.getScoreContributions) continue
      const data = await plugin.fetchData(userId, timeRange)
      const contributions = plugin.getScoreContributions(data)
      // Weight: plugin contributions are 20% influence max on base scores
      for (const [dim, val] of Object.entries(contributions)) {
        merged[dim] = Math.round(merged[dim] * 0.8 + val * 0.2)
      }
    }
    return merged
  }
}

export const pluginRegistry = new PluginRegistry()
```

### Built-In Plugin Examples

**Oura Ring Plugin:**
```ts
export const ouraPlugin: HOLOSPlugin = {
  id: 'oura-ring',
  name: 'Oura Ring',
  version: '1.0.0',
  icon: '◎',
  description: 'Sleep stages, HRV, readiness, and activity from Oura Ring',
  category: 'wearable',
  capabilities: ['scores', 'dashboard', 'visualization'],

  async fetchData(userId, timeRange) {
    // Call /api/integrations/oura with OAuth token
    const token = await getOAuthToken(userId, 'oura')
    return fetchOuraData(token, timeRange)
  },

  getScoreContributions(data: OuraData) {
    return {
      sleep:    ouraReadinessToScore(data.sleep_score),
      recovery: ouraHRVToRecoveryScore(data.hrv),
      energy:   ouraActivityToEnergyScore(data.activity_score),
    }
  },

  DashboardWidget: OuraDashboardWidget,
  Sphere3DLayer: OuraSphereContribution,
}
```

**Supabase table for plugin state:**
```sql
CREATE TABLE user_plugins (
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plugin_id   TEXT NOT NULL,
  enabled     BOOLEAN DEFAULT true,
  config      JSONB DEFAULT '{}',
  oauth_token TEXT,  -- encrypted
  last_sync   TIMESTAMPTZ,
  PRIMARY KEY (user_id, plugin_id)
);
```

### Plugin Score Blending Strategy

Wearable data is more reliable than self-report for certain dimensions (sleep, HRV). The blending ratio should reflect this:

| Dimension | Self-report weight | Wearable weight (if available) |
|---|---|---|
| sleep | 40% | 60% |
| recovery | 40% | 60% |
| energy | 50% | 50% |
| movement | 40% | 60% |
| stress | 60% | 40% |
| nutrition | 90% | 10% |
| emotional | 95% | 5% |
| purpose | 100% | 0% |
| life_balance | 100% | 0% |

---

## DELIVERABLE 6: Data Visualization Redesign Plan

The principle: data should feel like a *place you visit*, not a *table you read*.

### Visualization 1: Energy Flow Map

Replace static progress bars with an animated directed graph where energy flows between dimensions based on cascade relationships from the multi-layer engine.

**Implementation:** D3.js force simulation + Canvas 2D  
**Data source:** `LayeredScoreResult.behavioral_profile` — the cascade penalties become visible flow arrows  
**Visual language:** Energy as luminous particles flowing along Bézier paths. Thick paths = strong influence. Pulsing nodes = active dimensions.

```tsx
// /src/components/viz/EnergyFlowMap.tsx
export function EnergyFlowMap({ layeredResult }: { layeredResult: LayeredScoreResult }) {
  // Build adjacency from engine cascade rules
  const edges = buildCascadeEdges(layeredResult)
  // D3 force layout + Canvas particle animation
  return <canvas ref={canvasRef} width={500} height={400} />
}
```

### Visualization 2: Emotional Terrain

A topographic 3D surface where elevation = emotional wellbeing across time. X-axis = days, Z-axis = emotional sub-dimensions (if available), Y-axis = emotional score. Rendered with Three.js `PlaneGeometry` with dynamic vertex displacement from historical `progress_snapshots`.

The terrain breathes slowly (noise-based gentle deformation over time). Users can scrub through time on a horizontal slider to watch the terrain evolve.

### Visualization 3: Recovery Gradient Field

Recovery is not a single number — it's the rate at which the system returns to baseline after stress. Visualized as a 2D vector field (arrows pointing toward recovery, length = rate) with a background gradient showing the current recovery landscape. When recovery is poor, arrows are short and scattered. When strong, they align and extend.

**Derived from:** Layer 4 evidence cascade outputs — the delta between `evidence` scores and `temporal` scores encodes recovery trajectory.

### Visualization 4: Sleep Cycle Architecture

If the user provides sleep duration and quality data, this visualization renders a stylized sleep stage diagram — not the clinical chart, but an architectural cross-section of the night. Deep sleep stages are rendered as lower chambers (cooler, denser), REM as middle layers, light sleep as surface patterns.

Integrated with wearable data if available; approximated from questionnaire sleep score if not.

### Visualization 5: Life Balance Orbit System

The Swarga orbital system from the 3D layer is available as a 2D equivalent: nine concentric rings where each ring represents a domain, and an illuminated dot orbits each ring at a speed proportional to the domain's score. Well-functioning domains produce synchronous, harmonious patterns. Imbalanced domains create dissonant timing.

This is pure SVG + CSS animation — no WebGL required. Works on all devices.

---

## DELIVERABLE 7: Performance Strategy for Real-Time Visuals

### Constraint Definition

- Target: 60fps on mid-tier hardware (2019 MacBook Pro equivalent, mobile flagship)
- Graceful degradation to 30fps on budget devices
- Core dashboard: ≤ 200kB JS addition per 3D module
- Time to interactive: unchanged from current (<3s on 4G)

### Strategy 1: Progressive Enhancement via GPU Tier Detection

```ts
// /src/3d/shared/useDeviceCapability.ts
import { useState, useEffect } from 'react'

type Tier = 'minimal' | 'standard' | 'enhanced' | 'full'

export function useDeviceCapability(): Tier {
  const [tier, setTier] = useState<Tier>('standard')

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    if (!gl) { setTier('minimal'); return }
    
    const renderer = gl.getParameter(gl.RENDERER)
    const vendor = gl.getParameter(gl.VENDOR)
    
    // Intel integrated → standard, mobile → standard, Apple Silicon → full
    if (renderer.includes('Intel') || navigator.maxTouchPoints > 0) {
      setTier('standard')
    } else if (renderer.includes('Apple') || renderer.includes('Radeon')) {
      setTier('full')
    } else {
      setTier('enhanced')
    }
    
    // Also check frame budget
    measureFrameBudget().then(fps => {
      if (fps < 40) setTier('minimal')
    })
  }, [])

  return tier
}
```

**Tier → feature mapping:**

| Feature | minimal | standard | enhanced | full |
|---|---|---|---|---|
| 3D Wellness Sphere | ✗ → 2D orb | Sphere only | Sphere + particles | All layers |
| Ambient particles | ✗ | Low density | Medium density | High density |
| Post-processing | ✗ | ✗ | Bloom only | Bloom + DoF + CA |
| Five Elements 3D | ✗ | ✗ | Simplified | Full behavioral |
| Fluid simulation | ✗ | ✗ | Baked animation | Real-time GPU |
| Energy flow map | SVG static | Canvas 2D | Canvas animated | WebGL particles |

### Strategy 2: Lazy Loading and Code Splitting

All 3D code loads on demand:

```tsx
// Dashboard page — 3D sphere only loads if user scrolls to it or has high-tier device
const WellnessSphere = dynamic(
  () => import('@/3d/WellnessSphere/WellnessSphere'),
  { 
    ssr: false,
    loading: () => <WellnessOrbFallback score={score} />,
  }
)

// Five Elements only loads on framework detail pages
const FiveElementsScene = dynamic(
  () => import('@/3d/FiveElements/FiveElementsScene'),
  { ssr: false }
)
```

Three.js itself is split: the R3F Canvas creates its own webpack chunk. Users on minimal tier never download Three.js.

### Strategy 3: Web Workers for Computation

The 6-layer scoring engine (currently synchronous on main thread) moves to a Worker for full 3D mode where calculation is more frequent:

```ts
// /src/workers/scoring.worker.ts
self.onmessage = (e: MessageEvent<{ answers: AssessmentAnswer[]; framework: Framework }>) => {
  const result = computeMultiLayerScores(e.data.answers, e.data.framework)
  self.postMessage(result)
}
```

The signature/visual generation also runs in a Worker, preventing frame drops during the post-assessment generative render.

### Strategy 4: GPU Instancing for Particles

All particle systems use `InstancedMesh` (not individual `Mesh` objects). 500 particles = 1 draw call.

```tsx
// Particle system: 500 instances, 1 draw call
<instancedMesh ref={meshRef} args={[undefined, undefined, 500]}>
  <sphereGeometry args={[0.02, 4, 4]} />
  <meshBasicMaterial color={particleColor} transparent opacity={0.7} />
</instancedMesh>
```

### Strategy 5: Render Loop Optimization

R3F by default rerenders every frame. HOLOS scenes use `frameloop="demand"` (render only on state change) for scenes that aren't continuously animating, and `frameloop="always"` only for active particle/fluid simulations.

```tsx
<Canvas frameloop={isAnimating ? 'always' : 'demand'} dpr={[1, 2]}>
```

`dpr={[1, 2]}` caps pixel ratio at 2 — prevents 3× rendering on Retina while still looking crisp.

---

## DELIVERABLE 8: Fallback Architecture

### Principle

The 3D and generative layers are **progressive enhancement**, not requirements. Every 3D object has a 2D semantic equivalent. A user on a 2012 laptop running Firefox 90 gets the same information as a user on Apple Silicon with WebGL2 — just without spatial depth.

### Fallback Hierarchy

```
Level 0 (all devices):
  CSS custom property-driven ambient system (already built)
  Static SVG orb (WellnessOrb — already built)
  Progress bars and score rings (already built)

Level 1 (Canvas 2D supported — ~99% of browsers):
  Animated SVG wellness signature
  Canvas 2D energy flow map (vector field, no particles)
  SVG orbital life balance system
  CSS-animated emotional terrain (2D gradient landscape)

Level 2 (WebGL 1.0 — ~95% of browsers):
  Simplified Three.js wellness sphere (no displacement shader)
  Static element icons with CSS animation
  2D noise-based background generation

Level 3 (WebGL 2.0, desktop-class GPU):
  Full 3D sphere with layer shaders
  Five Elements behavioral simulation
  Post-processing (bloom, DoF)
  Real-time fluid simulation

Level 4 (WebGL 2.0 + high GPU tier):
  All of the above + particle systems at full density
  Dosha fluid GPU simulation
  Neural health map with WebGL force layout
```

### Graceful Degradation Examples

**Wellness Sphere fallback progression:**

```
Full 3D (WebGL2) → Simplified sphere (WebGL1) → Animated CSS orb → Static SVG orb
```

**Implemented via capability detection:**

```tsx
export function WellnessVisualization({ score, scores }: Props) {
  const tier = useDeviceCapability()
  
  if (tier === 'minimal') return <WellnessOrb score={score} state={state} />
  if (tier === 'standard') return <WellnessSphereSimple scores={scores} />
  return <WellnessSphere3D scores={scores} />
}
```

### Reduced Motion Compliance

```ts
// Respects prefers-reduced-motion at every level
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  // Disable all continuous animations
  // Show final state immediately
  // Convert flow animations to static with meaningful fill
}
```

---

## DELIVERABLE 9: Implementation Roadmap

### Guiding Constraint

Each phase ships to users independently. No phase blocks the next from being used.

---

### Phase 1 — Motion System Foundation *(4–6 days)*

**Goal:** The app feels alive before any 3D ships.

Deliverables:
- `MOTION` token system in `/src/design-system/motion.ts`
- `Framer Motion` integration on all page transitions (route changes currently have no transition)
- State-driven CSS custom properties via expanded `AmbientModeInjector`
- Ambient breathing CSS animation tied to stress score
- `stateGradients` fixed for all 10 `WellnessState` values (existing bug)
- Assessment question advance animation (slide + fade, replaces abrupt render)
- Score change transitions on `AnimatedScore` using spring physics

**Success test:** Navigate between dashboard → assessment → results. Every transition flows. The dashboard breathing rate visibly changes between a HIGH_PERFORMANCE user and a SLEEP_DEFICIT user.

---

### Phase 2 — Generative 2D Visuals *(5–7 days)*

**Goal:** Every user gets a unique visual identity.

Deliverables:
- Canvas 2D wellness signature generator (Web Worker)
- SVG-based animated life balance orbit system (replaces static ring)
- Energy flow map using Canvas 2D + D3 force layout
- Assessment results page: wellness signature displayed alongside scores
- Sharing mechanism: "Download your wellness signature" (Canvas → PNG)
- Framework-specific tradition color palettes applied across all visuals

**Success test:** Two users with different scores generate visibly different signatures. The same user re-assessing one week later generates a measurably different (but related) signature.

---

### Phase 3 — 3D Core Layer *(8–10 days)*

**Goal:** The Wellness Sphere becomes the central metaphor.

Deliverables:
- R3F + Three.js installed as lazy-loaded dependency
- `useDeviceCapability` hook for progressive enhancement
- `WellnessSphere` component (all 9 layers, score-driven distortion)
- Dashboard: Sphere replaces static `WellnessOrb` on capable devices
- `SceneCanvas` shared wrapper with performance defaults
- Post-processing: subtle bloom on sphere core
- 2D fallback for all 3D components
- Performance monitoring: `stats.js` in development mode, automatic tier downgrade if FPS < 30

**Success test:** Open dashboard on a 2019 MacBook Pro → sphere loads in <2s, sustains 60fps. Open on iPhone SE → 2D orb renders, no 3D loaded.

---

### Phase 4 — Experiential Data Visualizations *(6–8 days)*

**Goal:** Charts become spaces.

Deliverables:
- Five Elements scene (Daoist framework users)
- Swarga Orbit System (Swarga framework)
- Emotional Terrain landscape on results page (Three.js PlaneGeometry)
- Neural Health Map (D3 force-directed, replaces RadarChart option)
- Historical trend: morphing terrain as user scrolls through assessment history
- Framework-specific visualization auto-selection (Ayurveda users see Dosha fluid, TCM users see Five Elements)

**Success test:** A Daoist framework user's results page feels meaningfully different from an Evidence-Based user's page — not just different colors, but different visual metaphors carrying different semantic content.

---

### Phase 5 — AI Visual Co-Pilot *(6–8 days)*

**Goal:** The AI coach generates live visual explanations.

Deliverables:
- Coach interface: AI responses trigger synchronized visual updates in the Wellness Sphere
- "What if" simulation: `POST /api/coach/simulate` receives a hypothetical score change and returns the projected dimension vector; Sphere visually morphs to show the simulated state
- Score explanation mode: coach highlights specific sphere layers while explaining
- Pattern detection: AI identifies visual anomalies (distorted layer = flagged dimension) and narrates them
- Generative chart creation: coach can generate inline Energy Flow Maps or comparison visuals in the chat thread

**Example interaction:**
> User: "What happens if I improve my sleep from 38 to 65?"  
> → Coach responds  
> → Sphere layers for recovery, energy, emotional animate to projected values  
> → Flow map shows cascade improvements  
> → After 3 seconds, sphere returns to actual state

---

### Phase 6 — Plugin System *(8–12 days)*

**Goal:** HOLOS is the integration layer, not just the assessment layer.

Deliverables:
- Plugin registry and TypeScript interface
- Supabase `user_plugins` table and migration
- `/api/integrations` namespace with OAuth 2.0 flow
- Oura Ring integration (first party)
- Apple Health import (via file upload initially, then HealthKit bridge)
- Plugin dashboard widget framework
- Plugin contribution to sphere (wearable data adds a new outer layer)
- Admin panel: plugin management per user
- Scoring blending with plugin contributions
- `/integrations` page in app

**Success test:** An Oura Ring user's sleep score on day 2 reflects their actual Oura sleep data from last night, and their Wellness Sphere sleep layer visibly improves or degrades in sync.

---

### Phase Summary

| Phase | Duration | Ships to users | Prerequisite |
|---|---|---|---|
| 1 — Motion System | 4–6 days | Immediately | None |
| 2 — Generative 2D | 5–7 days | Immediately | Phase 1 |
| 3 — 3D Core | 8–10 days | Progressive | Phase 2 |
| 4 — Experiential Viz | 6–8 days | Progressive | Phase 3 |
| 5 — AI Co-Pilot | 6–8 days | Beta users | Phase 3 |
| 6 — Plugin System | 8–12 days | Beta users | None (parallel) |

**Total to full implementation:** ~37–51 days of focused development.  
**Minimum viable transformation** (motion + generative 2D + sphere): Phase 1–3 = ~17–23 days.

---

## Appendix A: File Structure for Evolution Layer

```
holos-app/src/
  3d/
    WellnessSphere/
    FiveElements/
    SwargaOrbit/
    DoshaFluid/
    shared/
      SceneCanvas.tsx
      useDeviceCapability.ts
      postprocessing/
  design-system/
    motion.ts          ← NEW: motion token system
    variants.ts        ← NEW: Framer Motion variants library
    generative.ts      ← NEW: generative visual parameters
  components/
    viz/               ← NEW: experiential visualizations
      EnergyFlowMap.tsx
      EmotionalTerrain.tsx
      LifeBalanceOrbit.tsx
      NeuralHealthMap.tsx
      WellnessSignature.tsx
    3d-fallbacks/      ← NEW: 2D equivalents for every 3D component
  plugins/
    types.ts           ← NEW: plugin interface
    registry.ts        ← NEW: plugin registry singleton
    oura/
    apple-health/
  workers/
    scoring.worker.ts  ← NEW: scoring engine off main thread
    signature.worker.ts ← NEW: generative visual off main thread
```

---

## Appendix B: Design Principles for Every Decision

**Rule 1 — Semantic always, decorative never.**  
Every visual element encodes real information. If you can't explain what score or state drives a visual behavior, remove the visual behavior.

**Rule 2 — Subtlety compounds.**  
Individual changes should feel like nothing. Their combination should feel profound. The user should not consciously notice that the UI is breathing, that the sphere is rotating slower today, that the gradients are softer. They should just feel that *something here understands them*.

**Rule 3 — Never block information with experience.**  
The 3D layer, generative visuals, and motion system are additive. A user with JavaScript disabled and a 10-year-old phone must still be able to complete an assessment and read their scores.

**Rule 4 — Performance is a feature of the experience.**  
A 3D sphere that stutters is worse than a 2D ring that flows. Fail gracefully and fail fast. Never defend a visual decision that costs frame rate.

**Rule 5 — The tradition must breathe through the interface.**  
An Ayurveda user and an Evidence-Based user should feel like they're using related but distinct instruments — the same underlying intelligence, expressed through fundamentally different visual vocabularies.

---

*HOLOS System Evolution v2 — Document Version 1.0*  
*Next review: After Phase 3 implementation*
