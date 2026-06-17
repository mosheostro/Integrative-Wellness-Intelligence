import { AppNav } from '@/components/ui/AppNav'
import { MobileTabBar } from '@/components/ui/MobileTabBar'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WellnessProvider, AmbientModeInjector } from '@/contexts/WellnessContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WellnessProvider>
      <AmbientModeInjector />
      <AppNav />
      <main className="app-main" style={{ paddingTop: 60, minHeight: '100dvh', background: 'var(--canvas)' }}>
        <div className="mesh-bg" />
        {children}
      </main>
      <MobileTabBar />
      <ScrollToTop />
    </WellnessProvider>
  )
}
