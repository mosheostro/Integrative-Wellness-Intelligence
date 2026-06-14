import { AppNav } from '@/components/ui/AppNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNav />
      <main style={{ paddingTop: 60, minHeight: '100dvh', background: 'var(--canvas)' }}>
        <div className="mesh-bg" />
        {children}
      </main>
    </>
  )
}
