import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main style={{ paddingTop: 68, minHeight: '100dvh' }}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
