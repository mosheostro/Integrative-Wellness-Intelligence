'use client'

// ============================================================
// HOLOS — Living Wellness Orb (Three.js / React Three Fiber)
// True 3D scene. Score-driven colors. 9 orbital dimension nodes.
// Particle constellation. Auto-rotate with user override.
// ============================================================

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── Dimension node color palette (HSL)
const DIM_NODE_COLORS: [number, number, number][] = [
  [42,  80, 55], // nutrition    — gold
  [240, 68, 62], // sleep        — indigo
  [158, 60, 46], // recovery     — sage
  [350, 75, 60], // calm/stress  — rose
  [24,  72, 55], // movement     — clay
  [155, 63, 48], // energy       — teal
  [268, 62, 62], // emotional    — lavender
  [162, 56, 44], // life_balance — deep sage
  [38,  78, 52], // purpose      — amber-gold
]

// Score → core sphere hue/sat/lit
function scoreToHSL(score: number): [number, number, number] {
  if (score >= 80) return [158, 52, 46]   // sage
  if (score >= 65) return [150, 45, 50]   // sage-warm
  if (score >= 50) return [42,  68, 52]   // gold
  if (score >= 35) return [24,  70, 52]   // amber
  return [350, 65, 58]                    // rose
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100
  const ln = l / 100
  const a = sn * Math.min(ln, 1 - ln)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// ── Orbital dimension node ────────────────────────────────────

interface DimNodeProps {
  index: number
  total: number
  value: number  // 0-100
}

function DimNode({ index, total, value }: DimNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  const [h, s, l] = DIM_NODE_COLORS[index % DIM_NODE_COLORS.length]
  const color = useMemo(() => new THREE.Color(hslToHex(h, s, l)), [h, s, l])
  const emissive = useMemo(() => new THREE.Color(hslToHex(h, s, l - 12)), [h, s, l])

  // Each node orbits at slightly different speed + radius
  const baseAngle = (index / total) * Math.PI * 2
  const orbitRadius = 2.0
  const orbitSpeed = 0.08 + (index % 5) * 0.016
  const yDrift = (index % 3 - 1) * 0.35    // -0.35, 0, 0.35
  const nodeRadius = 0.06 + (value / 100) * 0.10  // 0.06 – 0.16

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const angle = baseAngle + t * orbitSpeed
    const x = Math.cos(angle) * orbitRadius
    const z = Math.sin(angle) * orbitRadius * 0.5   // elliptical orbit
    const y = yDrift + Math.sin(angle * 0.6 + index) * 0.15

    meshRef.current.position.set(x, y, z)
    meshRef.current.rotation.y += 0.015

    if (haloRef.current) {
      haloRef.current.position.copy(meshRef.current.position)
      // gentle pulse
      const pulse = 1 + Math.sin(t * 2.1 + index) * 0.12
      haloRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {/* Halo glow */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[nodeRadius * 2.4, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      {/* Node body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[nodeRadius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.55 + (value / 100) * 0.35}
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>
    </group>
  )
}

// ── Orbital ring (ellipse) ───────────────────────────────────

function OrbitRing({ coreHue }: { coreHue: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(a) * 2.0,
        0,
        Math.sin(a) * 1.0,
      ))
    }
    return pts
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(hslToHex(coreHue, 40, 60)),
    transparent: true,
    opacity: 0.08,
  }), [coreHue])

  return <lineLoop args={[geometry, material]} />
}

// ── Connection threads (center → each node direction hint) ────

function ConnectionThreads({ values, coreHue }: { values: number[]; coreHue: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (!linesRef.current) return
    const t = state.clock.elapsedTime
    const positions: number[] = []
    const total = values.length

    for (let i = 0; i < total; i++) {
      const baseAngle = (i / total) * Math.PI * 2
      const speed = 0.08 + (i % 5) * 0.016
      const angle = baseAngle + t * speed
      const x = Math.cos(angle) * 2.0
      const z = Math.sin(angle) * 1.0
      const yDrift = ((i % 3) - 1) * 0.35 + Math.sin(angle * 0.6 + i) * 0.15

      // From origin to ~70% of the way to node
      positions.push(0, 0, 0)
      positions.push(x * 0.7, yDrift * 0.7, z * 0.7)
    }

    const geo = linesRef.current.geometry
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    posAttr.set(positions)
    posAttr.needsUpdate = true
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(values.length * 6) // 2 vertices * 3 coords
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [values.length])

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(hslToHex(coreHue, 40, 65)),
    transparent: true,
    opacity: 0.12,
  }), [coreHue])

  return <lineSegments ref={linesRef} args={[geometry, material]} />
}

// ── Core sphere ───────────────────────────────────────────────

function CoreSphere({ score, state }: { score: number; state: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [h, s, l] = scoreToHSL(score)
  const color = useMemo(() => hslToHex(h, s, l), [h, s, l])

  // Distortion responds to wellness state
  const distort = useMemo(() => {
    if (state === 'HIGH_PERFORMANCE') return 0.08
    if (state === 'BALANCED')         return 0.12
    if (state === 'STRESS_DOMINANT')  return 0.28
    if (state === 'LOW_RECOVERY')     return 0.22
    if (state === 'SLEEP_DEFICIT')    return 0.20
    return 0.15
  }, [state])

  const speed = useMemo(() => {
    if (state === 'HIGH_PERFORMANCE') return 1.5
    if (state === 'STRESS_DOMINANT')  return 4.0
    return 2.0
  }, [state])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    // Breathing pulse
    const breathe = 1 + Math.sin(t * 0.8) * 0.025
    meshRef.current.scale.setScalar(breathe)
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.05, 4]} />
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.22 + score / 400}
        distort={distort}
        speed={speed}
        roughness={0.12}
        metalness={0.08}
        transparent
        opacity={0.88}
      />
    </mesh>
  )
}

// ── Inner glow shell ─────────────────────────────────────────

function InnerGlow({ score }: { score: number }) {
  const [h, s, l] = scoreToHSL(score)
  const color = hslToHex(h, s, l + 14)

  return (
    <mesh>
      <sphereGeometry args={[1.35, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
    </mesh>
  )
}

// ── Full 3D scene ─────────────────────────────────────────────

function OrbScene({ score, state, values }: OrbSceneProps) {
  const [h, s, l] = scoreToHSL(score)
  const coreColor = hslToHex(h, s, l)
  const complementColor = hslToHex((h + 180) % 360, s * 0.6, l + 10)

  const sparkleColor = useMemo(() => hslToHex(h, s - 10, l + 20), [h, s, l])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[3.5, 3.5, 3.5]} intensity={0.7} color={coreColor} />
      <pointLight position={[-3, -2.5, -3]} intensity={0.45} color={complementColor} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color={coreColor} distance={4} />

      {/* Core */}
      <CoreSphere score={score} state={state} />
      <InnerGlow score={score} />

      {/* Orbital guide ring */}
      <OrbitRing coreHue={h} />

      {/* Connection threads */}
      <ConnectionThreads values={values} coreHue={h} />

      {/* Dimension nodes */}
      {values.map((val, i) => (
        <DimNode key={i} index={i} total={values.length} value={val} />
      ))}

      {/* Particle constellation */}
      <Sparkles
        count={180}
        scale={6}
        size={1.8}
        speed={0.25}
        color={sparkleColor}
        opacity={0.45}
        noise={0.4}
      />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

// ── Public component ──────────────────────────────────────────

interface OrbSceneProps {
  score: number
  state: string
  values: number[]
}

interface WellnessOrbR3FProps {
  score: number
  state: string
  size?: number
  values?: number[]
}

function OrbFallback({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at 35% 30%, rgba(122,158,142,0.35) 0%, rgba(122,158,142,0.08) 60%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--sage-deep)',
        fontSize: size * 0.15,
      }}
    >
      ◈
    </div>
  )
}

export function WellnessOrbR3F({ score, state, size = 320, values }: WellnessOrbR3FProps) {
  const safeValues = values ?? Array(9).fill(62)

  return (
    <div style={{ width: size, height: size }} aria-label={`Wellness score: ${score}, state: ${state}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <OrbScene score={score} state={state} values={safeValues} />
        </Suspense>
      </Canvas>
    </div>
  )
}
