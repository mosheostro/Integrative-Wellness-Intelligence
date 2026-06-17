import { AppNav } from '@/components/ui/AppNav'
import { MobileTabBar } from '@/components/ui/MobileTabBar'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WellnessProvider, AmbientModeInjector } from '@/contexts/WellnessContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  retur