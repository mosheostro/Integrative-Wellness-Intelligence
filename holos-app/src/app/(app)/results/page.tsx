'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ResultsRedirectPage() {
  const { strings } = useLanguage()
  const d = strings.dashboard
  return (
    <div className="wrap section-pad" style={{ textAlign:'center' }}>
      <h1 className="h2">{d.noData}</h1>
      <p className="lede">{d.noDataDesc}</p>
      <a href="/assessment" className="btn btn-primary" style={{ marginTop:24 }}>{d.st