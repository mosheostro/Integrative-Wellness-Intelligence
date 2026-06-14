'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Shalom. I\'m your Holos AI coach — an integration of eight wisdom traditions with modern evidence-based science. I\'m here to help you understand your wellness landscape and take meaningful steps forward.\n\nWhat\'s on your mind today?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {})
        },
        body: JSON.stringify({ message: text, history: messages.map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date() }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again in a moment.', timestamp: new Date() }])
    } finally {
      setLoading(false)
    }
  }

  const STARTERS = [
    'What does my latest assessment reveal?',
    'How can I improve my sleep quality?',
    'Explain the Ayurvedic view of my state',
    'What are the highest-impact changes I can make?',
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 60px)', background:'var(--canvas)' }}>

      {/* Header */}
      <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid var(--line)', background:'var(--canvas)', flexShrink:0 }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', alignItems:'center', gap:14 }}>
          <div style={{
            width:44, height:44, borderRadius:'50%',
            background:'linear-gradient(135deg, var(--sage), var(--indigo))',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:20,
          }}>◈</div>
          <div>
            <div style={{ fontWeight:600, color:'var(--ink)', fontFamily:'var(--font-serif)' }}>Holos Coach</div>
            <div style={{ fontSize:12, color:'var(--ink-soft)', fontFamily:'var(--font-mono)' }}>8 wisdom traditions · evidence-based</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'24px 16px' }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', flexDirection:'column', gap:20 }}>

          {messages.map((msg, i) => (
            <div key={i} style={{
              display:'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap:12, alignItems:'flex-start',
            }}>
              {msg.role === 'assistant' && (
                <div style={{
                  width:32, height:32, borderRadius:'50%', flexShrink:0,
                  background:'linear-gradient(135deg, var(--sage), var(--indigo))',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:14, marginTop:4,
                }}>◈</div>
              )}
              <div style={{
                maxWidth:'75%',
                padding:'14px 18px',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                background: msg.role === 'user' ? 'var(--sage)' : 'var(--surface)',
                color: msg.role === 'user' ? '#fff' : 'var(--ink)',
                fontSize:'.9rem',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
                boxShadow: '0 1px 4px rgba(0,0,0,.06)',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg, var(--sage), var(--indigo))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>◈</div>
              <div style={{ padding:'14px 18px', background:'var(--surface)', borderRadius:'4px 18px 18px 18px' }}>
                <div style={{ display:'flex', gap:5 }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width:6, height:6, borderRadius:'50%', background:'var(--ink-faint)', animation:`pulse 1.2s ease-in-out ${j*0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick starters (only when 1 message) */}
      {messages.length === 1 && (
        <div style={{ padding:'0 16px 12px', flexShrink:0 }}>
          <div style={{ maxWidth:720, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:8 }}>
            {STARTERS.map(s => (
              <button key={s} onClick={() => { setInput(s); setTimeout(send, 0) }}
                style={{
                  padding:'7px 14px', borderRadius:20, border:'1px solid var(--line)',
                  background:'var(--canvas2)', color:'var(--ink-soft)', fontSize:'.8rem',
                  cursor:'pointer', fontFamily:'inherit',
                }}
              >{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding:'12px 16px 20px', borderTop:'1px solid var(--line)', background:'var(--canvas)', flexShrink:0 }}>
        <div style={{ maxWidth:720, margin:'0 auto', display:'flex', gap:10 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask anything about your wellness…"
            rows={1}
            style={{
              flex:1, resize:'none', padding:'12px 16px',
              border:'1px solid var(--line)', borderRadius:14,
              background:'var(--canvas2)', color:'var(--ink)',
              fontFamily:'inherit', fontSize:'.9rem',
              outline:'none', lineHeight:1.5,
            }}
          />
          <button onClick={send} disabled={loading || !input.trim()}
            className="btn btn-sage"
            style={{ padding:'0 20px', borderRadius:14, alignSelf:'stretch' }}
          >↑</button>
        </div>
        <div style={{ maxWidth:720, margin:'8px auto 0', textAlign:'center', fontSize:'.72rem', color:'var(--ink-faint)' }}>
          AI coaching · not medical advice · always consult your physician
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  )
}
