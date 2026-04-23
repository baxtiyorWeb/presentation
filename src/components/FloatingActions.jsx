import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const containerRef = useRef(null)
  const topBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate back-to-top button
  useEffect(() => {
    if (!topBtnRef.current) return
    if (showTop) {
      gsap.fromTo(topBtnRef.current,
        { y: 20, opacity: 0, scale: 0.7 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }
      )
    } else {
      gsap.to(topBtnRef.current, { y: 20, opacity: 0, scale: 0.7, duration: 0.3, ease: 'power2.in' })
    }
  }, [showTop])

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return
    const btns = containerRef.current.querySelectorAll('.fab-btn')
    gsap.fromTo(btns,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)', delay: 2.8 }
    )
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} style={{
      position: 'fixed', right: 24, bottom: 28, zIndex: 8000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      pointerEvents: 'none',
    }}>

      {/* Telegram */}
      <a
        href="https://t.me/joylinks_uz"
        target="_blank"
        rel="noreferrer"
        className="fab-btn"
        style={{ ...FA.btn, background: 'linear-gradient(135deg,#229ED9,#1a7fb3)', pointerEvents: 'all' }}
        title="Telegram"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
        </svg>
        <div style={FA.pulse} />
      </a>

      {/* Phone */}
      <a
        href="tel:+998901234567"
        className="fab-btn"
        style={{ ...FA.btn, background: 'linear-gradient(135deg,#00C9B1,#008F7A)', pointerEvents: 'all' }}
        title="Qo'ng'iroq"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <div style={{ ...FA.pulse, background: 'rgba(0,201,177,.4)' }} />
      </a>

      {/* Back to top */}
      <button
        ref={topBtnRef}
        onClick={scrollToTop}
        style={{ ...FA.btn, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', pointerEvents: showTop ? 'all' : 'none', opacity: 0 }}
        title="Tepaga"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#6da9c8">
          <path d="M4 15l8-8 8 8" stroke="#6da9c8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Label tooltip (visible on hover via CSS-in-JS not applied here — handled via title) */}
    </div>
  )
}

const FA = {
  btn: {
    width: 52, height: 52, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,.5)',
    position: 'relative', overflow: 'visible',
    transition: 'transform .25s, box-shadow .25s',
  },
  pulse: {
    position: 'absolute', inset: -4, borderRadius: '50%',
    background: 'rgba(34,158,217,.3)',
    animation: 'fabPulse 2s ease-in-out infinite',
    pointerEvents: 'none', zIndex: -1,
  }
}
