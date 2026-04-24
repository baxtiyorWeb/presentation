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
  const [loaded, setLoaded] = useState(false)

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
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [loaded])

  /* ── page entrance after preloader ── */
  const handleLoaded = () => {
    setLoaded(true)
  }

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

          {/* SECTIONS */}
          <StatsAndCTA show="branches" />

          <HorizontalScrollSection />

          <Marquee />

          <HeroSection />

          <StatsAndCTA show="stats" />

          {/* FAQ */}
          <div id="faq">
            <FAQ />
          </div>

          <StatsAndCTA show="cta" />
        </div>
      )}
    </>
  )
}
