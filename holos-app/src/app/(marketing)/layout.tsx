import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: 68, minHeight: '100dvh' }}>
        {c