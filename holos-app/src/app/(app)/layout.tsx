import { AppNav } from '@/components/ui/AppNav'
import { MobileTabBar } from '@/components/ui/MobileTabBar'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { AmbientBackground } from '@/components/ui/AmbientBackground'
import { WellnessProvider, AmbientModeInjector } from '@/contexts/WellnessContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WellnessProvider>
      <AmbientModeInjector />
      <AmbientBackground />
      <AppNav />
      <main className="app-main" style={{ paddingTop: 60, minHeight: '100dvh', background: 'var(--canvas)', position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <MobileTabBar />
      <ScrollToTop />
    </WellnessProvider>
  )
}
