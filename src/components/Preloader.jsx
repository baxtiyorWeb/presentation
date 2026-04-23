import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onDone }) {
  const overlayRef = useRef(null)
  const logoRef    = useRef(null)
  const barRef     = useRef(null)
  const barFillRef = useRef(null)
  const countRef   = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide out
        gsap.to(overlayRef.current, {
          yPercent: -105, duration: 1, ease: 'power4.inOut',
          onComplete: onDone
        })
      }
    })

    // 1. Letters drop in stagger
    tl.fromTo(lettersRef.current,
      { y: -80, opacity: 0, rotationX: 90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2)' }
    )

    // 2. Count 0 → 100 while bar fills
    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.6,
      ease: 'power1.inOut',
      onUpdate() {
        const v = Math.round(obj.val)
        if (countRef.current) countRef.current.textContent = v + '%'
        if (barFillRef.current) barFillRef.current.style.width = v + '%'
      }
    }, '-=0.1')

    // 3. Pulse logo at 100%
    tl.to(logoRef.current, { scale: 1.12, duration: 0.2, ease: 'power2.out' })
      .to(logoRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1.4,.5)' })
  }, [])

  const LETTERS = 'JOYLINKS'.split('')

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'radial-gradient(ellipse at 50% 40%, #031628 0%, #010810 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 40, overflow: 'hidden'
    }}>

      {/* Animated orbs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(#00C9B115,transparent)', top: -100, left: -100, filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(#00E5FF0d,transparent)', bottom: -80, right: -80, filter: 'blur(60px)' }} />

      {/* Logo letters */}
      <div ref={logoRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, perspective: 600 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {LETTERS.map((l, i) => (
            <span
              key={i}
              ref={el => lettersRef.current[i] = el}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(36px, 7vw, 72px)',
                fontWeight: 900,
                color: i < 3 ? '#00C9B1' : '#00E5FF',
                letterSpacing: '2px',
                textShadow: '0 0 30px rgba(0,201,177,.5)',
                display: 'inline-block',
                opacity: 0,
              }}
            >{l}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 14, letterSpacing: '6px', color: '#6da9c8', textTransform: 'uppercase' }}>
          IT & Biznes Akademiyasi
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 'min(320px, 80vw)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div ref={barRef} style={{ height: 3, background: 'rgba(255,255,255,.07)', borderRadius: 4, overflow: 'hidden' }}>
          <div ref={barFillRef} style={{
            height: '100%', width: '0%', borderRadius: 4,
            background: 'linear-gradient(90deg,#00C9B1,#00E5FF)',
            boxShadow: '0 0 16px rgba(0,229,255,.7)',
            transition: 'none'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Rajdhani', fontSize: 12, color: '#6da9c8', letterSpacing: '2px' }}>YUKLANMOQDA</span>
          <span ref={countRef} style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, color: '#00C9B1' }}>0%</span>
        </div>
      </div>
    </div>
  )
}
