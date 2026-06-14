'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResultsRedirectPage() {
  return (
    <div className="wrap section-pad" style={{ textAlign:'center' }}>
      <h1 className="h2">No results loaded</h1>
      <p className="lede">Take an assessment to see your wellness portrait.</p>
      <a href="/assessment" className="btn btn-primary" style={{ marginTop:24 }}>Start assessment →</a>
    </div>
  )
}
