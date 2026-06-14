import Link from 'next/link'

export default function LandingPage() {
  const FRAMEWORKS = [
    { icon:'⚗', name:'Evidence-Based', desc:'Modern clinical science' },
    { icon:'☽', name:'Rambam', desc:'Maimonides · 12th century medicine' },
    { icon:'♾', name:'Hippocrates', desc:'Four humours · Greek medicine' },
    { icon:'◈', name:'Avicenna', desc:'Canon of Medicine · Islamic tradition' },
    { icon:'🌿', name:'Ayurveda', desc:'Vata · Pitta · Kapha doshas' },
    { icon:'☯', name:'Daoist', desc:'Five elements · Qi cultivation' },
    { icon:'❋', name:'Tibetan', desc:'Wind · Bile · Phlegm humours' },
    { icon:'✦', name:'Swarga', desc:'Integrated synthesis system' },
  ]

  const DIMENSIONS = [
    'Nutrition', 'Sleep', 'Recovery', 'Stress',
    'Movement', 'Emotional', 'Life Balance', 'Purpose', 'Energy',
  ]

  return (
    <main style={{ background:'var(--canvas)', overflowX:'hidden' }}>

      {/* Nav */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 32px', height:64,
        background:'rgba(249,246,240,.9)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid var(--line)',
      }}>
        <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.25rem', fontWeight:500, color:'var(--ink)' }}>
          <span style={{ color:'var(--sage)' }}>◈ </span>Holos
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <Link href="/auth/login" className="btn btn-ghost">Sign in</Link>
          <Link href="/auth/signup" className="btn btn-sage">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-pad" style={{ paddingTop:140, textAlign:'center', position:'relative', minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div className="mesh-bg" />
        <div style={{ position:'relative', zIndex:1, maxWidth:780, margin:'0 auto' }}>
          <div className="eyebrow" style={{ marginBottom:24, justifyContent:'center' }}>
            <span style={{ color:'var(--sage)' }}>◈</span> Integrative Wellness Intelligence
          </div>
          <h1 className="display" style={{ marginBottom:28 }}>
            Your whole self,<br />
            <span className="serif-it">seen whole.</span>
          </h1>
          <p className="lede" style={{ margin:'0 auto 44px', maxWidth:560 }}>
            Holos maps your health across 9 dimensions and 8 wisdom traditions — from ancient Ayurveda to modern clinical science — to reveal patterns that single-metric apps miss.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/auth/signup" className="btn btn-primary btn-lg">Begin your assessment →</Link>
            <Link href="/auth/login" className="btn btn-ghost btn-lg">Sign in</Link>
          </div>
        </div>
      </section>

      {/* 9 Dimensions */}
      <section className="section-pad" style={{ background:'var(--canvas2)' }}>
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="eyebrow" style={{ marginBottom:12, justifyContent:'center' }}>◆ Nine Dimensions</div>
            <h2 className="h1">Health isn&apos;t a number.</h2>
            <p className="lede" style={{ margin:'16px auto 0' }}>
              Every dimension interacts. Holos scores them together, not in silos.
            </p>
          </div>
          <div className="grid-3">
            {DIMENSIONS.map(d => (
              <div key={d} className="card card-hover" style={{ textAlign:'center', padding:'24px' }}>
                <div style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--sage)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:8 }}>DIMENSION</div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.2rem', color:'var(--ink)' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Frameworks */}
      <section className="section-pad">
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="eyebrow" style={{ marginBottom:12, justifyContent:'center' }}>◈ Eight Traditions</div>
            <h2 className="h1">Every tradition has something to teach.</h2>
            <p className="lede" style={{ margin:'16px auto 0' }}>
              Choose the wisdom lens you want applied. The same answers produce a different portrait under each tradition.
            </p>
          </div>
          <div className="grid-4">
            {FRAMEWORKS.map(f => (
              <div key={f.name} className="card card-hover" style={{ padding:'24px 20px' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:'1.05rem', fontWeight:500, marginBottom:6 }}>{f.name}</div>
                <div style={{ fontSize:'.8rem', color:'var(--ink-soft)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad" style={{ background:'var(--canvas2)' }}>
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div className="eyebrow" style={{ marginBottom:12, justifyContent:'center' }}>◎ How It Works</div>
            <h2 className="h1">Three steps to clarity.</h2>
          </div>
          <div className="grid-3">
            {[
              { n:'01', title:'Choose your tradition', body:'Select the wisdom framework you want applied — or let Holos synthesise across all eight.' },
              { n:'02', title:'Answer adaptively', body:'15–30 branching questions that adjust based on your answers to find the signal in your experience.' },
              { n:'03', title:'Receive your portrait', body:'A scored, multi-dimensional wellness portrait with ranked recommendations and AI coaching.' },
            ].map(step => (
              <div key={step.n} className="card" style={{ padding:'32px 28px' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'2.5rem', fontWeight:500, color:'var(--line)', marginBottom:20 }}>{step.n}</div>
                <h3 className="h3" style={{ marginBottom:12 }}>{step.title}</h3>
                <p style={{ color:'var(--ink-soft)', lineHeight:1.7 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ textAlign:'center' }}>
        <div className="wrap" style={{ maxWidth:640 }}>
          <div className="eyebrow" style={{ marginBottom:20, justifyContent:'center' }}>◈ Begin</div>
          <h2 className="h1" style={{ marginBottom:20 }}>
            Your wellness portrait<br />
            is <span className="serif-it">waiting.</span>
          </h2>
          <p className="lede" style={{ margin:'0 auto 40px' }}>
            Free to start. No credit card. Your data stays yours.
          </p>
          <Link href="/auth/signup" className="btn btn-primary btn-lg">Create your Holos account →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:'1px solid var(--line)', padding:'32px 0', textAlign:'center' }}>
        <div className="eyebrow" style={{ justifyContent:'center', marginBottom:8 }}>
          <span style={{ color:'var(--sage)' }}>◈</span> Holos Integrative Wellness Intelligence
        </div>
        <p style={{ fontSize:'.78rem', color:'var(--ink-faint)', margin:0 }}>
          Not medical advice. Always consult a qualified healthcare professional.
        </p>
      </footer>
    </main>
  )
}
