/**
 * React Three Fiber JSX type augmentation for React 19.
 *
 * R3F v8 extends the legacy global `JSX.IntrinsicElements` namespace,
 * but React 19 uses `React.JSX.IntrinsicElements`. This declaration
 * bridges the gap so three.js elements (<group>, <mesh>, etc.) are
 * recognised by TypeScript.
 */
import type { ThreeElements } from '@react-three/fiber'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
