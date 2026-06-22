import type { NextConfig } from 'next'

const config: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['@anthropic-ai/sdk'],
  async redirects() {
    return [
      // Canonical route aliases
      { source: '/methodology',       destination: '/methodologies', permanent: true },
      { source: '/traditions',        destination: '/methodologies', permanent: true },
      { source: '/frameworks',        destination: '/methodologies', permanent: true },
      { source: '/knowledge-center',  destination: '/k