import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import HorizontalScrollSection from './components/HorizontalScrollSection'
import StatsAndCTA from './components/StatsAndCTA'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef(null)
  const curDotRef   = useRef(null)
  const curRingRef  = useRef(null)
  const progressRef = useRef(null)

  /* ── cursor + progress ── */
  useEffect(() => {
    const dot  = curDotRef.current
    const ring = curRingRef.current
    const bar  = progressRef.current
    if (!dot || !ring || !bar) return

    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: 'power2.out' })
    }
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      gsap.to(bar, { scaleX: pct, duration: 0.1, ease: 'none' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll',    onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll',    onScroll)
    }
  }, [])

  return (
    <div ref={containerRef}>
      {/* CURSOR */}
      <div ref={curDotRef}  className="cursor-dot"  />
      <div ref={curRingRef} className="cursor-ring" />

      {/* PROGRESS BAR */}
      <div ref={progressRef} className="progress-bar" />

      {/* NAV */}
      <nav style={navS.nav}>
        <div style={navS.inner}>
          <a href="#hero" style={navS.logo}>
            <div>
              <div style={navS.logoName}>JOYLINKS</div>
              <div style={navS.logoSub}>IT Academy</div>
            </div>
          </a>

          <ul style={navS.links}>
            {[
              ['#about',      'Haqimizda'],
              ['#courses',    'Kurslar'],
              ['#teachers',   "O'qituvchilar"],
              ['#statistics', 'Statistika'],
              ['#parents',    'Ota-Onalar'],
              ['#cta',        "Bog'lanish"],
            ].map(([h, l]) => (
              <li key={h}><a href={h} style={navS.link}>{l}</a></li>
            ))}
          </ul>

          <button
            style={navS.cta}
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ro'yxatdan O'tish
          </button>
        </div>
      </nav>

      <HeroSection />
      <HorizontalScrollSection />
      <StatsAndCTA />
    </div>
  )
}

const navS = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(2,11,24,.88)', backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,201,177,.12)', padding: '14px 0',
  },
  inner: {
    maxWidth: 1400, margin: '0 auto', padding: '0 48px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' },
  logoName: { fontSize: 17, fontWeight: 900, letterSpacing: 2, color: '#00C9B1' },
  logoSub:  { fontSize: 9,  letterSpacing: 4, color: '#6da9c8' },
  links: { display: 'flex', gap: 4, listStyle: 'none' },
  link:  { color: '#6da9c8', textDecoration: 'none', fontSize: 12, padding: '7px 14px' },
  cta: {
    padding: '8px 22px', background: '#00C9B1',
    border: 'none', borderRadius: 6, cursor: 'pointer',
    fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700, color: '#020b18',
  },
}