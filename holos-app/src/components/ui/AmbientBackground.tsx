'use client'
// Pure-CSS animated ambient background — floating atmospheric orbs
// Adds depth and cinematic feel to the app without canvas overhead
export function AmbientBackground() {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ambient-orb ao-1" />
      <div className="ambient-orb ao-2" />
      <div className="ambient-orb ao-3" />
      <div className="ambient-orb ao-4" />
    </div>
  )
}
