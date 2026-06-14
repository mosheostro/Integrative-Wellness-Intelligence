import type { NextConfig } from 'next'

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // Canonical route aliases
      { source: '/methodology',       destination: '/methodologies', permanent: true },
      { source: '/traditions',        destination: '/methodologies', permanent: true },
      { source: '/frameworks',        destination: '/methodologies', permanent: true },
      { source: '/knowledge-center',  destination: '/knowledge',     permanent: true },
      { source: '/knowledge-centre',  destination: '/knowledge',     permanent: true },
      { source: '/blog',              destination: '/knowledge',     permanent: true },
      { source: '/about/moshe',       destination: '/about',         permanent: true },
      { source: '/founder',           destination: '/about',         permanent: true },
      { source: '/team',              destination: '/about',         permanent: true },
      // Dashboard sub-routes → main dashboard
      { source: '/dashboard/body',    destination: '/dashboard',     permanent: false },
      { source: '/dashboard/energy',  destination: '/dashboard',     permanent: false },
      { source: '/dashboard/mind',    destination: '/dashboard',     permanent: false },
      { source: '/dashboard/sleep',   destination: '/dashboard',     permanent: false },
      // Auth shortcuts
      { source: '/login',             destination: '/auth/login',    permanent: true },
      { source: '/signup',            destination: '/auth/signup',   permanent: true },
      { source: '/register',          destination: '/auth/signup',   permanent: true },
      // Booking shortcuts
      { source: '/book',              destination: '/book-session',  permanent: true },
      { source: '/session',           destination: '/book-session',  permanent: true },
      // Demo shortcut
      { source: '/demo',              destination: '/demo-dashboard', permanent: false },
      // Help
      { source: '/help',              destination: '/faq',           permanent: true },
      { source: '/support',           destination: '/faq',           permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default config
