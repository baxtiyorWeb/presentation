import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import HorizontalScrollSection from './components/HorizontalScrollSection'
import StatsAndCTA from './components/StatsAndCTA'
import Preloader from './components/Preloader'
import Marquee from './components/Marquee'
import FAQ from './components/FAQ'
import FloatingActions from './components/FloatingActions'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef(null)
  const curDotRef    = useRef(null)
  const curRingRef   = useRef(null)
  const progressRef  = useRef(null)
  const navRef       = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  /* ── cursor + progress bar ── */
  useEffect(() => {
    if (!loaded) return
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
      setNavScrolled(window.scrollY > 60)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [loaded])

  /* ── nav shrink on scroll ── */
  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      padding: navScrolled ? '10px 0' : '16px 0',
      duration: 0.4, ease: 'power2.out',
    })
  }, [navScrolled])

  /* ── page entrance after preloader ── */
  const handleLoaded = () => {
    setLoaded(true)
    // Animate nav in
    setTimeout(() => {
      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
      }
    }, 50)
  }

  /* ── active nav link highlight on scroll ── */
  useEffect(() => {
    if (!loaded) return
    const links = document.querySelectorAll('.nav-link')
    const sections = ['hero', 'courses', 'teachers', 'testimonials', 'statistics', 'parents', 'cta']

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => {
            l.style.color = l.getAttribute('href') === '#' + entry.target.id ? '#00C9B1' : '#6da9c8'
            l.style.background = l.getAttribute('href') === '#' + entry.target.id ? 'rgba(0,201,177,.1)' : 'transparent'
          })
        }
      })
    }, { threshold: 0.3 })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [loaded])

  return (
    <>
      {/* PRELOADER */}
      {!loaded && <Preloader onDone={handleLoaded} />}

      {loaded && (
        <div ref={containerRef} className="app-container">
          {/* CURSOR */}
          <div ref={curDotRef}  className="cursor-dot"  />
          <div ref={curRingRef} className="cursor-ring" />

          {/* PROGRESS BAR */}
          <div ref={progressRef} className="progress-bar" />

          {/* FLOATING ACTIONS */}
          <FloatingActions />

          {/* NAV */}
          <nav ref={navRef} style={{
            ...navS.nav,
            boxShadow: navScrolled ? '0 8px 40px rgba(0,0,0,.5)' : 'none',
            opacity: 0, // GSAP will animate this in
          }}>
            <div style={navS.inner}>
              <a href="#hero" style={navS.logo}>
                <div style={navS.logoDot} />
                <div style={navS.logoBrand}>
                  <div style={navS.logoName}>JOYLINKS</div>
                  <div style={navS.logoSub}>IT & Biznes Akademiyasi</div>
                </div>
              </a>

              <ul style={navS.links}>
                {[
                  ['#courses',    'Kurslar'],
                  ['#teachers',   "O'qituvchilar"],
                  ['#statistics', 'Statistika'],
                  ['#parents',    'Ota-Onalar'],
                  ['#faq',        'FAQ'],
                  ['#cta',        "Bog'lanish"],
                ].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} className="nav-link" style={navS.link}>{l}</a>
                  </li>
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

          {/* SECTIONS */}
          <HeroSection />

          {/* Marquee between hero and courses */}
          <Marquee />

          <HorizontalScrollSection />
          <StatsAndCTA />

          {/* FAQ */}
          <div id="faq">
            <FAQ />
          </div>
        </div>
      )}
    </>
  )
}

const navS = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(2,11,24,.95)', backdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(0,201,177,.12)', padding: '16px 0',
    transition: 'box-shadow .4s',
  },
  inner: {
    maxWidth: 1400, margin: '0 auto', padding: '0 56px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
  },
  logo: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', cursor: 'pointer' },
  logoDot: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'linear-gradient(135deg,#00C9B1,#00E5FF)',
    boxShadow: '0 0 14px rgba(0,201,177,.6)',
    flexShrink: 0,
  },
  logoBrand: { display: 'flex', flexDirection: 'column', gap: 2 },
  logoName: { fontSize: '14px', fontWeight: 900, letterSpacing: '2.5px', color: '#00C9B1', fontFamily: 'Orbitron, monospace' },
  logoSub:  { fontSize: '9px', letterSpacing: '2px', color: '#6da9c8', fontFamily: 'Rajdhani, sans-serif' },
  links: { display: 'flex', gap: 4, listStyle: 'none', flex: 1, justifyContent: 'center' },
  link: {
    color: '#6da9c8', textDecoration: 'none', fontSize: '13px',
    padding: '7px 14px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
    borderRadius: '6px', transition: 'all .3s', display: 'block',
  },
  cta: {
    padding: '10px 26px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Orbitron, monospace', fontSize: '11px', fontWeight: 700,
    color: '#020b18', letterSpacing: '1px',
    boxShadow: '0 4px 20px rgba(0,201,177,.35)', transition: 'all .3s',
    whiteSpace: 'nowrap', flexShrink: 0,
  },
}