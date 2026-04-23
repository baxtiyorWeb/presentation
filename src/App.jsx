import { useEffect, useRef, useState } from 'react'
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
    <div ref={containerRef} className="app-container">
      {/* CURSOR */}
      <div ref={curDotRef}  className="cursor-dot"  />
      <div ref={curRingRef} className="cursor-ring" />

      {/* PROGRESS BAR */}
      <div ref={progressRef} className="progress-bar" />

      {/* NAV */}
      <nav style={navS.nav}>
        <div style={navS.inner}>
          <a href="#hero" style={navS.logo}>
            <div style={navS.logoBrand}>
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
    background: 'rgba(2,11,24,.92)', backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,201,177,.15)', padding: '16px 0',
  },
  inner: {
    maxWidth: 1400, margin: '0 auto', padding: '0 56px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', cursor: 'pointer' },
  logoBrand: { display: 'flex', flexDirection: 'column', gap: 2 },
  logoName: { fontSize: '15px', fontWeight: 900, letterSpacing: '2.5px', color: '#00C9B1', fontFamily: 'Orbitron, monospace' },
  logoSub:  { fontSize: '9px',  letterSpacing: '3px', color: '#6da9c8', fontFamily: 'Rajdhani, sans-serif' },
  links: { display: 'flex', gap: 6, listStyle: 'none' },
  link:  { color: '#6da9c8', textDecoration: 'none', fontSize: '13px', padding: '8px 16px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, transition: 'all .3s', borderRadius: '6px' },
  cta: {
    padding: '10px 28px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 700, color: '#020b18', letterSpacing: '1px',
    boxShadow: '0 4px 20px rgba(0,201,177,.35)', transition: 'all .3s',
  },
}