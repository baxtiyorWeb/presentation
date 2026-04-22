import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '2000', suffix: '+', label: "O'quvchilar" },
  { num: '50',   suffix: '+', label: 'Mutaxassislar' },
  { num: '95',   suffix: '%', label: 'Sertifikat' },
  { num: '5',    suffix: '',  label: 'Filiallar' },
]

const ABOUT_CARDS = [
  { icon: '🏆', title: 'Xalqaro Standart', desc: 'Janubiy Koreya & Germaniya bilan rasmiy hamkorlik. Sertifikatlar dunyoda tan olingan.' },
  { icon: '👨‍💻', title: 'Real Tajriba', desc: 'Google, Microsoft, startuplardan kelgan 10-15+ yil tajribali o\'qituvchilar.' },
  { icon: '💼', title: "Ish Joyiga Ta'minlash", desc: "100+ hamkor kompaniya bilan 85% o'quvchi 3 oyda ish topadi." },
  { icon: '🎯', title: 'Individual Mentoring', desc: "Har bir o'quvchi uchun shaxsiy mentor va haftalik progress tracking." },
]

export default function HeroSection() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const badgeRef = useRef(null)
  const subRef = useRef(null)
  const btnsRef = useRef(null)
  const statsRef = useRef(null)
  const visualRef = useRef(null)
  const orbitsRef = useRef([])
  const bubblesRef = useRef([])
  const aboutCardsRef = useRef([])
  const statNumsRef = useRef([])
  const canvasRef = useRef(null)

  /* ── CANVAS PARTICLE BG ── */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, pts = [], animId

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    const init = () => {
      pts = Array.from({ length: Math.floor(W * H / 12000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        r: Math.random() * 1.5 + .4, o: Math.random() * .4 + .1
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d < 140) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,201,177,${.06 * (1 - d / 140)})`
            ctx.lineWidth = .5
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${p.o})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    resize(); init(); draw()
    window.addEventListener('resize', () => { resize(); init() })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  /* ── GSAP ANIMATIONS ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(badgeRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: .8 })
        .fromTo(titleRef.current.querySelectorAll('.hero-line'),
          { y: 80, opacity: 0, skewY: 4 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: .12 }, '-=.4')
        .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, '-=.5')
        .fromTo(btnsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, '-=.4')
        .fromTo(statsRef.current.querySelectorAll('.stat-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: .6, stagger: .1 }, '-=.3')
        .fromTo(visualRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, '-=1.2')

      // Counter animation
      statNumsRef.current.forEach((el, i) => {
        if (!el) return
        const target = parseInt(STATS[i].num)
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out', delay: .8 + i * .15,
          onUpdate() { el.textContent = Math.floor(this.targets()[0].val) }
        })
      })

      // Hero parallax on scroll
      gsap.to('.hero-content', {
        yPercent: -25,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
      })
      gsap.to('.hero-visual', {
        yPercent: -15,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
      })

      // Floating orbits (continuous)
      gsap.to('.orbit-1', { rotation: 360, duration: 14, repeat: -1, ease: 'none', transformOrigin: 'center' })
      gsap.to('.orbit-2', { rotation: -360, duration: 9, repeat: -1, ease: 'none', transformOrigin: 'center' })
      gsap.to('.orbit-3', { rotation: 360, duration: 5, repeat: -1, ease: 'none', transformOrigin: 'center' })
      gsap.to('.center-hex', {
        y: -14, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })
      document.querySelectorAll('.tb').forEach((tb, i) => {
        gsap.to(tb, { y: -10, duration: 3.5 + i * .3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * .4 })
      })

      // About cards
      aboutCardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: .8, delay: i * .12,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
          })
      })

      // About section parallax
      gsap.to('.about-left', {
        y: -40,
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* ── 3D TILT ── */
  const handleTilt = (e, el) => {
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5
    const y = (e.clientY - r.top) / r.height - .5
    gsap.to(el, { rotationY: x * 16, rotationX: -y * 12, scale: 1.03, duration: .4, ease: 'power2.out', transformPerspective: 900 })
  }
  const resetTilt = (el) => {
    gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: .5, ease: 'power2.out' })
  }

  return (
    <div ref={containerRef}>
      {/* CANVAS */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="hero" style={styles.hero}>
        {/* ambient orbs */}
        <div style={{ ...styles.ambOrb, width: 600, height: 600, background: 'radial-gradient(#00C9B155,transparent)', top: -150, left: -150 }} />
        <div style={{ ...styles.ambOrb, width: 400, height: 400, background: 'radial-gradient(#0066ff44,transparent)', bottom: -80, right: -80 }} />

        <div className="hero-content" style={styles.heroContent}>
          {/* Badge */}
          <div ref={badgeRef} style={styles.badge}>
            <span style={styles.badgeDot} />
            ✨ Janubiy Koreya &amp; Germaniya hamkorligi
          </div>

          {/* Title */}
          <h1 ref={titleRef} style={styles.heroTitle}>
            <span className="hero-line" style={{ display: 'block', color: '#fff' }}>JOYLINKS</span>
            <span className="hero-line" style={{
              display: 'block',
              background: 'linear-gradient(90deg,#00C9B1,#00E5FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>IT &amp; BIZNES</span>
            <span className="hero-line" style={{
              display: 'block', color: 'rgba(255,255,255,.65)',
              fontSize: '.52em', marginTop: 6, letterSpacing: 5
            }}>AKADEMIYASI</span>
          </h1>

          <p ref={subRef} style={styles.heroSub}>
            <strong style={{ color: '#00C9B1' }}>2000+ o'quvchi</strong> | <strong style={{ color: '#00C9B1' }}>50+ mutaxassis</strong> | <strong style={{ color: '#00C9B1' }}>5 filial</strong><br />
            Kelajakni biz bilan quring. Zamonaviy kasblar — real natijalar.
          </p>

          <div ref={btnsRef} style={styles.heroBtns}>
            <a href="#courses" style={styles.btnP}>Kurslarni Ko'rish →</a>
            <a href="#teachers" style={styles.btnS}>O'qituvchilar</a>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={styles.heroStats}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div style={styles.statNum}>
                  <span ref={el => statNumsRef.current[i] = el}>0</span>
                  <span>{s.suffix}</span>
                </div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div ref={visualRef} className="hero-visual" style={styles.heroVisual}>
          <div style={styles.hexScene}>
            <div className="orbit-1" style={styles.orbit1} />
            <div className="orbit-2" style={styles.orbit2} />
            <div className="orbit-3" style={styles.orbit3} />

            {/* Tech bubbles */}
            {['AI','PY','UX','DB','JS','EN'].map((t, i) => (
              <div key={t} className="tb" style={{ ...styles.tb, ...tbPos[i] }}>{t}</div>
            ))}

            {/* Center hex */}
            <div className="center-hex" style={styles.centerHex}>
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <defs>
                  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C9B1"/>
                    <stop offset="100%" stopColor="#00E5FF"/>
                  </linearGradient>
                </defs>
                <path d="M80 8L146 44V116L80 152L14 116V44L80 8Z" stroke="url(#hg)" strokeWidth="2" fill="rgba(0,201,177,.05)"/>
                <path d="M80 28L126 54V106L80 132L34 106V54L80 28Z" stroke="url(#hg)" strokeWidth="1" fill="rgba(0,201,177,.08)" opacity=".6"/>
                <text x="80" y="87" textAnchor="middle" fill="url(#hg)" fontFamily="Orbitron,monospace" fontWeight="900" fontSize="13" letterSpacing="2">JOY</text>
                <text x="80" y="104" textAnchor="middle" fill="#00E5FF" fontFamily="Orbitron,monospace" fontWeight="700" fontSize="10" letterSpacing="3" opacity=".7">LINKS</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" style={styles.about}>
        <div style={styles.aboutGrid}>
          <div className="about-left" style={styles.aboutLeft}>
            <div style={styles.secTag}>📍 Biz Haqimizda</div>
            <h2 style={styles.aboutH2}>
              JOYLINKS{' '}
              <span className="g">BIZNES VA IT AKADEMIYASI</span>
            </h2>
            <p style={styles.aboutP}>Tashkil topgan yil: <strong style={{ color: '#00C9B1' }}>2019-yil</strong>. 5 ta filial — Samarqand, Termiz va boshqa hududlarda. Xodimlar soni <strong style={{ color: '#00C9B1' }}>100+</strong>. Jami o'quvchilar: <strong style={{ color: '#00C9B1' }}>2000+</strong>.</p>
            <p style={styles.aboutP}>Hamkor davlatlar: <strong style={{ color: '#00C9B1' }}>Janubiy Koreya, Germaniya</strong>. 5 ta OTM va 2 ta xususiy universitetlar bilan hamkorlik.</p>

            <div style={styles.aboutFacts}>
              {[['5','Filial'],['100+','Xodimlar'],['7+','Universitetlar'],['🇰🇷🇩🇪','Hamkorlar']].map(([num, lbl], i) => (
                <div key={i} ref={el => aboutCardsRef.current[i] = el}
                  className="glass"
                  style={styles.factCard}
                  onMouseMove={e => handleTilt(e, e.currentTarget)}
                  onMouseLeave={e => resetTilt(e.currentTarget)}>
                  <div style={styles.factNum}>{num}</div>
                  <div style={styles.factLbl}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.aboutRight}>
            {ABOUT_CARDS.map((c, i) => (
              <div key={i} ref={el => aboutCardsRef.current[4 + i] = el}
                className="glass"
                style={styles.acard}
                onMouseMove={e => handleTilt(e, e.currentTarget)}
                onMouseLeave={e => resetTilt(e.currentTarget)}>
                <div style={styles.acardTop}>
                  <span style={styles.acardIcon}>{c.icon}</span>
                  <div>
                    <h3 style={styles.acardH3}>{c.title}</h3>
                    <p style={styles.acardP}>{c.desc}</p>
                  </div>
                </div>
                <div style={styles.acardGlowBar} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── Tech bubble positions ── */
const tbPos = [
  { top: 20, right: 20 },
  { top: 20, left: 20 },
  { bottom: 20, right: 20 },
  { bottom: 20, left: 20 },
  { top: '50%', right: 8, transform: 'translateY(-50%)' },
  { top: '50%', left: 8, transform: 'translateY(-50%)' },
]

/* ── STYLES ── */
const styles = {
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    padding: '130px 56px 80px',
    background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,201,177,.06) 0%, transparent 70%)',
    gap: 40,
    overflow: 'hidden',
  },
  heroContent: { flex: 1, maxWidth: 620, zIndex: 2 },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(0,201,177,.08)', border: '1px solid rgba(0,201,177,.35)',
    padding: '7px 18px', borderRadius: 40, fontSize: 11, letterSpacing: 2,
    color: '#00C9B1', marginBottom: 32, textTransform: 'uppercase',
    fontFamily: 'Rajdhani', fontWeight: 700,
  },
  badgeDot: {
    width: 7, height: 7, background: '#00C9B1', borderRadius: '50%',
    display: 'inline-block', boxShadow: '0 0 8px #00C9B1',
    animation: 'blink 1.4s ease infinite',
  },
  heroTitle: {
    fontFamily: 'Orbitron, monospace',
    fontSize: 'clamp(38px,5.5vw,76px)',
    fontWeight: 900, lineHeight: 1.0, marginBottom: 28,
  },
  heroSub: {
    color: '#6da9c8', fontSize: 16, lineHeight: 1.75, marginBottom: 40, maxWidth: 500,
  },
  heroBtns: { display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 },
  btnP: {
    padding: '14px 34px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)',
    border: 'none', borderRadius: 8, color: '#020b18',
    fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, letterSpacing: 1,
    cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
    boxShadow: '0 4px 28px rgba(0,201,177,.4)', transition: 'all .3s',
  },
  btnS: {
    padding: '14px 34px', background: 'transparent',
    border: '1.5px solid rgba(0,201,177,.45)', borderRadius: 8, color: '#00C9B1',
    fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, letterSpacing: 1,
    cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all .3s',
  },
  heroStats: { display: 'flex', gap: 44, flexWrap: 'wrap' },
  statNum: {
    fontFamily: 'Orbitron, monospace', fontSize: 40, fontWeight: 900, lineHeight: 1,
    background: 'linear-gradient(90deg,#00C9B1,#00E5FF)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  statLabel: { fontSize: 11, color: '#6da9c8', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' },
  heroVisual: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  hexScene: { width: 420, height: 420, position: 'relative' },
  orbit1: {
    position: 'absolute', top: '50%', left: '50%',
    width: 380, height: 380, marginTop: -190, marginLeft: -190,
    borderRadius: '50%', border: '1px solid rgba(0,201,177,.25)',
  },
  orbit2: {
    position: 'absolute', top: '50%', left: '50%',
    width: 270, height: 270, marginTop: -135, marginLeft: -135,
    borderRadius: '50%', border: '1px solid rgba(0,229,255,.2)',
  },
  orbit3: {
    position: 'absolute', top: '50%', left: '50%',
    width: 170, height: 170, marginTop: -85, marginLeft: -85,
    borderRadius: '50%', border: '1px solid rgba(0,201,177,.4)',
  },
  tb: {
    position: 'absolute', width: 54, height: 54,
    background: 'rgba(5,20,45,.9)', border: '1px solid rgba(0,201,177,.3)',
    borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontFamily: 'Orbitron, monospace', fontWeight: 700,
    color: '#00C9B1', letterSpacing: .5,
  },
  centerHex: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    filter: 'drop-shadow(0 0 30px rgba(0,201,177,.4))',
  },
  about: {
    padding: '120px 56px',
    background: 'linear-gradient(180deg,transparent,rgba(5,20,40,.4),transparent)',
    position: 'relative', zIndex: 10,
  },
  aboutGrid: { maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' },
  aboutLeft: {},
  secTag: {
    display: 'inline-block', fontFamily: 'Orbitron, monospace', fontSize: 10,
    letterSpacing: 4, color: '#00C9B1', textTransform: 'uppercase',
    marginBottom: 14, padding: '5px 14px', borderLeft: '3px solid #00C9B1',
  },
  aboutH2: { fontFamily: 'Orbitron, monospace', fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 900, marginBottom: 20 },
  aboutP: { color: '#6da9c8', fontSize: 15, lineHeight: 1.8, marginBottom: 20 },
  aboutFacts: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 10 },
  factCard: { padding: 20, cursor: 'default' },
  factNum: { fontFamily: 'Orbitron, monospace', fontSize: 28, fontWeight: 900, color: '#00C9B1', position: 'relative', zIndex: 3 },
  factLbl: { fontSize: 12, color: '#6da9c8', marginTop: 4, position: 'relative', zIndex: 3 },
  aboutRight: { display: 'flex', flexDirection: 'column', gap: 14 },
  acard: { padding: '22px 26px', cursor: 'default', position: 'relative' },
  acardTop: { display: 'flex', alignItems: 'center', gap: 18, position: 'relative', zIndex: 3 },
  acardIcon: { fontSize: 34, flexShrink: 0 },
  acardH3: { fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#fff' },
  acardP: { fontSize: 12, color: '#6da9c8', lineHeight: 1.6 },
  acardGlowBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
    background: 'linear-gradient(90deg,#00C9B1,#00E5FF)', borderRadius: '20px 20px 0 0',
    opacity: 0, transition: 'opacity .3s', zIndex: 4,
  },
  ambOrb: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: .25, pointerEvents: 'none', zIndex: 0 },
}
