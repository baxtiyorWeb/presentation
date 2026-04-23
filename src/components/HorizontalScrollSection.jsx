import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaCode, FaServer, FaShieldAlt, FaPaintBrush, FaGlobeAmericas, FaBrain,
  FaDesktop, FaComments, FaStar, FaQuoteLeft
} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const COURSES = [
  { id: 'c1', Icon: FaCode, title: 'Frontend Development', dur: '7+1 oy', badge: 'Advanced', sub: 'HTML · CSS · JS · React · Tailwind', desc: 'Zamonaviy responsive veb saytlar. Bootstrap, Tailwind, JavaScript ES6+, React hooks.', color: '#00E5FF', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', price: '2 000 000 som', jobs: '92%' },
  { id: 'c2', Icon: FaServer, title: 'Backend Development', dur: '7+1 oy', badge: 'Pro Level', sub: 'Python · Django · REST API · Docker', desc: 'Python va Django bilan professional backend. REST API, PostgreSQL, Docker, Telegram botlar.', color: '#00ff88', grad: 'linear-gradient(135deg,#00ff88,#00bcd4)', price: '2 500 000 som', jobs: '88%' },
  { id: 'c3', Icon: FaShieldAlt, title: 'Kiberxavfsizlik', dur: '8 oy', badge: 'Expert', sub: 'Pentesting · Ethical Hacking · OWASP', desc: 'Red Team, Pentesting, Linux & Windows Security. Web Pentesting OWASP Top 10.', color: '#ff4d6d', grad: 'linear-gradient(135deg,#ff4d4d,#ff6b35)', price: '3 000 000 som', jobs: '95%' },
  { id: 'c4', Icon: FaPaintBrush, title: 'Grafik Dizayn', dur: '7+1 oy', badge: 'Professional', sub: 'Adobe Suite · Figma · After Effects', desc: 'Photoshop, Illustrator, After Effects, CorelDRAW. Logo, branding, motion graphics.', color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)', price: '1 800 000 som', jobs: '78%' },
  { id: 'c5', Icon: FaGlobeAmericas, title: 'Ingliz Tili', dur: '6–12 oy', badge: 'IELTS Sertifikat', sub: 'A1 dan C1 gacha · IELTS · TOEFL', desc: "A1 dan C1 gacha. IELTS va TOEFL tayyorgarlik. Native speaker o'qituvchi.", color: '#ffd700', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', price: '150 000 som/oy', jobs: '70%' },
  { id: 'c6', Icon: FaBrain, title: 'AI & Prompt Eng.', dur: 'Trending', badge: 'HOT 🔥', sub: 'ChatGPT · Claude · Midjourney · Automation', desc: "Sun'iy intellekt bilan ishlash. Biznes automation, content creation, AI tools.", color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', price: '800 000 som', jobs: '85%' },
  { id: 'c7', Icon: FaDesktop, title: 'Komp. Savodxonligi', dur: '4 oy', badge: "Boshlang'ich", sub: 'Word · Excel · PowerPoint · Internet', desc: "Ish uchun zarur kompyuter ko'nikmalari. Office dasturlar bilan professional ishlash.", color: '#00bcd4', grad: 'linear-gradient(135deg,#00bcd4,#00838f)', price: 'Arzon narx', jobs: '65%' },
  { id: 'c8', Icon: FaComments, title: 'Rus Tili', dur: 'B2 Maqsad', badge: 'Grammatika + Suhbat', sub: "Grammatika · So'zlashuv · Business", desc: 'Business Russian. Rossiya kompaniyalari uchun professional Russian. Grammar + Conv.', color: '#a29bfe', grad: 'linear-gradient(135deg,#a29bfe,#6c5ce7)', price: 'Qulay narx', jobs: '68%' },
]

const TEACHERS = [
  { name: 'Refatbek Arolov', role: 'Direktor', badge: '👔 DIREKTOR', emoji: '🧑‍💼', rating: '5.0', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', skills: ['Kompyuter savodxonligi', 'Prompt Engineering'], students: '1000+', exp: '10+', company: 'Joylinks', bio: 'Joylinks IT va Biznes Akademiyasi direktori.' },
  { name: 'Behruz Karimov', role: "O'qituvchi", badge: '💻 IT', emoji: '👨‍💻', rating: '4.9', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', skills: ['Kompyuter savodxonligi'], students: '500+', exp: '5+', company: 'Joylinks', bio: "Kompyuter savodxonligi bo'yicha mutaxassis." },
  { name: 'Umid Mamatraximov', role: "O'qituvchi", badge: 'FRONT-END', emoji: '⚡', rating: '4.9', color: '#FF6B6B', grad: 'linear-gradient(135deg,#E74C3C,#C0392B)', skills: ['Front-end', 'IT Foundation'], students: '300+', exp: '4+', company: 'Joylinks', bio: "Front-end dasturlash bo'yicha o'qituvchi." },
  { name: 'Jahongir Omonov', role: "O'qituvchi", badge: 'BACK-END', emoji: '⚙️', rating: '4.9', color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', skills: ['Back-end', 'IT Foundation'], students: '300+', exp: '4+', company: 'Joylinks', bio: "Serverlar va ma'lumotlar bazasi ustasi." },
  { name: 'Samandar Qurbonov', role: "O'qituvchi", badge: 'FRONT-END', emoji: '🖥️', rating: '4.8', color: '#a29bfe', grad: 'linear-gradient(135deg,#5F27CD,#8E44AD)', skills: ['Front-end', 'Kompyuter savodxonligi'], students: '400+', exp: '4+', company: 'Joylinks', bio: "Web dizayn va front-end bo'yicha ustoz." },
  { name: 'Elshodbek Rakhmonov', role: "O'qituvchi", badge: 'FOUNDATION', emoji: '🚀', rating: '4.8', color: '#ff9ff3', grad: 'linear-gradient(135deg,#f368e0,#ff9ff3)', skills: ['IT Foundation'], students: '200+', exp: '3+', company: 'Joylinks', bio: "IT sohasiga kirib kelayotganlar uchun murabbiy." },
  { name: "Nafisa Ro'ziyeva", role: "O'qituvchi", badge: 'SAVODXONLIK', emoji: '👩‍🏫', rating: '4.9', color: '#48dbfb', grad: 'linear-gradient(135deg,#0abde3,#48dbfb)', skills: ['Kompyuter savodxonligi'], students: '600+', exp: '6+', company: 'Joylinks', bio: "Ofis dasturlari va kompyuter sirlari o'rgatadi." },
  { name: 'Abbos Xushboqov', role: "O'qituvchi", badge: 'SECURITY', emoji: '🛡️', rating: '5.0', color: '#ff6b6b', grad: 'linear-gradient(135deg,#ee5253,#ff6b6b)', skills: ['Kiberxavfsizlik'], students: '150+', exp: '5+', company: 'Joylinks', bio: "Axborot xavfsizligi bo'yicha professional mutaxassis." },
  { name: 'Dilnoza Shamshiddinova', role: "O'qituvchi", badge: 'ENGLISH', emoji: '🇬🇧', rating: '4.9', color: '#feca57', grad: 'linear-gradient(135deg,#ff9f43,#feca57)', skills: ['Ingliz Tili'], students: '500+', exp: '5+', company: 'Joylinks', bio: "IT mutaxassislari uchun ingliz tili darslari olib boradi." },
]

const TESTIMONIALS = [
  { name: 'Ozodbek Ruziboyev', role: 'Bitiruvchi', emoji: '👨‍🎓', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', salary: 'MUVAFFAQIYATLI', start: "Noldan boshladi", mid: "Jadal o'rganish va loyihalar", end: "Hozirda kuchli mutaxassis", quote: '"Joylinks men uchun kelajak eshiklarini ochdi!"', rating: 5 },
  { name: 'Mamatov Musulmon', role: 'Bitiruvchi', emoji: '🚀', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', salary: 'KURS BITIRUVCHISI', start: "IT haqida tushuncham yo'q edi", mid: "Ajoyib muhitda ta'lim", end: "Hozirda dasturchi bo'lib yetishdi", quote: "Eng zo\\'r ustozlar va muhit shu yerda!", rating: 5 },
  { name: 'Quldoshev Xalil', role: 'Bitiruvchi', emoji: '🎯', color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', salary: 'ALUMNI', start: "Boshlang'ich bilim", mid: "Amaliyot va mashqlar", end: "Katta maqsadlarga yetildi", quote: '"Shaxsiy mentoring bilan katta natijaga erishdim."', rating: 5 },
  { name: 'Kosimov Adxambek', role: 'Bitiruvchi', emoji: '💻', color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)', salary: 'TOP NATIJA', start: "Faqatgina qiziqish bor edi", mid: "Ustozlar katta yordam berishdi", end: "Ishonchli va kuchli malaka", quote: '"Darslar shunchaki ajoyib. Rahmat kattakon!"', rating: 5 },
]

/* ─── HORIZONTAL PANEL HOOK ─── */
function usePinnedHScroll(sectionRef, trackRef) {
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = [...track.querySelectorAll('.h-card')]
    const getScroll = () => track.scrollWidth - window.innerWidth + 120

    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScroll()}`,
        pin: true,
        scrub: 1.2, // Ultra smooth scrubbing
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // GSAP Velocity-based momentum skew effect for MAX quality
          const velocity = Math.min(Math.max(self.getVelocity() / 150, -12), 12)
          gsap.to(cards, {
            skewX: -velocity * 0.6,
            rotation: velocity * 0.1,
            overwrite: 'auto',
            duration: 0.6,
            ease: 'power3.out'
          })
        }
      },
    })

    // Staggered appear side by side with Premium GSAP 3D config
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          scale: 0.75,
          y: 60,
          x: 40,
          rotationY: 25,
          rotationZ: -3,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          rotationY: 0,
          rotationZ: 0,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 98%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Reset snap for velocity check
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${getScroll()}`,
      onLeave: () => gsap.to(cards, { skewX: 0, rotation: 0, duration: 0.5 }),
      onLeaveBack: () => gsap.to(cards, { skewX: 0, rotation: 0, duration: 0.5 })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.containerAnimation === tween) t.kill()
      })
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [sectionRef, trackRef])
}

export default function HorizontalScrollSection() {
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const cSecRef = useRef(null); const cTrkRef = useRef(null)
  const tSecRef = useRef(null); const tTrkRef = useRef(null)
  const stSecRef = useRef(null); const stTrkRef = useRef(null)
  const modalContentRef = useRef(null)

  usePinnedHScroll(cSecRef, cTrkRef)
  usePinnedHScroll(tSecRef, tTrkRef)
  usePinnedHScroll(stSecRef, stTrkRef)

  /* modal GSAP entry animation */
  useEffect(() => {
    if (modalVisible && modalContentRef.current) {
      const els = modalContentRef.current.children
      gsap.fromTo(els,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.4)' }
      )
    }
  }, [modalVisible])

  /* heading squish animation */
  useEffect(() => {
    const els = document.querySelectorAll('.sec-heading')
    els.forEach(el => {
      gsap.fromTo(el,
        { scaleX: 1.22, scaleY: 0.5, opacity: 0, y: -52 },
        {
          scaleX: 1, scaleY: 1, opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1,0.46)',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
        })
    })
  }, [])

  const tilt = (e, el) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; gsap.to(el, { rotationY: x * 14, rotationX: -y * 10, scale: 1.05, duration: .3, ease: 'power2.out', transformPerspective: 1200 }) }
  const untilt = el => gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: .5, ease: 'power2.out' })

  const open = t => { setSelectedTeacher(t); setModalVisible(true); document.body.style.overflow = 'hidden' }
  const close = () => { setModalVisible(false); setTimeout(() => { setSelectedTeacher(null); document.body.style.overflow = '' }, 350) }

  return (
    <>
      <style>{`
        @keyframes arrowBounce { 0%,100%{transform:translateX(0);opacity:1} 50%{transform:translateX(10px);opacity:.5} }
        .h-card { transform-style: preserve-3d; }
        .h-card:hover .glow-bar { opacity: 1 !important; }
      `}</style>

      {/* ════════════════ COURSES ════════════════ */}
      <section id="courses" ref={cSecRef} style={S.pin}>
        <div style={{ ...S.orb, background: 'radial-gradient(#00C9B122,transparent)', top: -220, right: -80 }} />
        <div style={S.head}>
          <div style={S.tag}>📚 KURSLAR</div>
          <h2 className="sec-heading" style={S.h2}>
            Hozirgi Bozorda <span className="g">Talab Qiladigan</span> Kurslar
          </h2>
          <p style={S.sub}>8 maxsus kurs · Sertifikatsiya · Real proyektlar · Ish bilan ta'minlash</p>
        </div>
        <div style={S.viewport}>
          <div ref={cTrkRef} style={S.track}>
            {COURSES.map(c => (
              <div key={c.id} className="h-card glass" style={S.cCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div className="glow-bar" style={{ ...S.topBar, background: c.grad, opacity: .85 }} />
                <div style={{ ...S.iconWrap, background: `${c.color}18`, border: `1.5px solid ${c.color}44` }}>
                  <c.Icon style={{ color: c.color, fontSize: '2.4rem' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ ...S.badge, color: c.color, borderColor: `${c.color}55` }}>{c.badge}</span>
                  <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 12, fontWeight: 800, color: c.color, letterSpacing: 1 }}>{c.dur}</span>
                </div>
                <h3 style={S.cTitle}>{c.title}</h3>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.color, fontFamily: 'Rajdhani', letterSpacing: '.5px' }}>{c.sub}</div>
                <p style={S.cDesc}>{c.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#6da9c8', fontFamily: 'Rajdhani' }}>Ish joylashuv:</span>
                  <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: c.color }}>{c.jobs}</span>
                </div>
                <div style={{ padding: '9px 14px', borderRadius: 10, background: `${c.color}14`, color: c.color, fontFamily: 'Orbitron,monospace', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
                  💰 {c.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Hint />
      </section>

      {/* ════════════════ TEACHERS ════════════════ */}
      <section id="teachers" ref={tSecRef} style={{ ...S.pin, background: 'linear-gradient(160deg,#020f28,#030d1e)' }}>
        <div style={{ ...S.orb, background: 'radial-gradient(#0044ff18,transparent)', bottom: -200, left: -80 }} />
        <div style={S.head}>
          <div style={S.tag}>🌟 O'QITUVCHILAR</div>
          <h2 className="sec-heading" style={S.h2}>
            Mutaxassislarga <span className="g">Ishonch Qiling</span>
          </h2>
          <p style={S.sub}>50+ malakali o'qituvchi · Xalqaro sertifikatlar · 10–15+ yil real tajriba</p>
        </div>
        <div style={S.viewport}>
          <div ref={tTrkRef} style={S.track}>
            {TEACHERS.map((t, i) => (
              <div key={i} className="h-card glass" style={S.tCard}
                onClick={() => open(t)}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div className="glow-bar" style={{ ...S.topBar, background: t.grad, opacity: .85 }} />
                <div style={{ position: 'relative', marginBottom: 20 }}>
                  <div style={{ ...S.avRing, borderColor: `${t.color}55` }} />
                  <div style={{ ...S.av, background: t.grad }}>{t.emoji}</div>
                  <div style={{ ...S.tBadge, color: t.color, borderColor: `${t.color}44` }}>{t.badge}</div>
                </div>
                <h3 style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(11px,0.9vw,13px)', fontWeight: 900, color: '#fff', marginBottom: 5 }}>{t.name}</h3>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Rajdhani', letterSpacing: '1px', color: t.color, marginBottom: 10 }}>{t.role}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => <FaStar key={j} style={{ color: '#ffd700', fontSize: '1rem' }} />)}
                  <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: t.color, marginLeft: 4 }}>{t.rating}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginBottom: 14 }}>
                  {t.skills.map(sk => <span key={sk} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.color}33`, background: 'rgba(255,255,255,.04)', fontFamily: 'Rajdhani', fontWeight: 700, color: t.color }}>{sk}</span>)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.07)' }}>
                  {[['students', "O'quvchi"], ['exp', 'Yil'], ['company', 'Tajriba']].map(([k, l]) => (
                    <div key={k} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: t.color }}>{t[k]}</div>
                      <div style={{ fontSize: 9, color: '#6da9c8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'inline-block', marginTop: 12, padding: '5px 16px', borderRadius: 20, fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 700, background: 'rgba(255,255,255,.04)', border: `1px solid ${t.color}33`, color: t.color }}>
                  Batafsil ko'rish →
                </div>
              </div>
            ))}
          </div>
        </div>
        <Hint />
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <section id="testimonials" ref={stSecRef} style={{ ...S.pin, background: 'linear-gradient(160deg,#02101f,#031628)' }}>
        <div style={{ ...S.orb, background: 'radial-gradient(#00ff8810,transparent)', top: -80, left: '25%' }} />
        <div style={S.head}>
          <div style={S.tag}>🏆 MUVAFFAQIYAT TARIXI</div>
          <h2 className="sec-heading" style={S.h2}>
            Bitiruvchilar <span className="g">Real Natijalari</span>
          </h2>
          <p style={S.sub}>95% sertifikat · 85% 3 oyda ish · 4.9/5 baholash · 2–7M oylik maosh</p>
        </div>
        <div style={S.viewport}>
          <div ref={stTrkRef} style={S.track}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="h-card glass" style={S.stCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div className="glow-bar" style={{ ...S.topBar, background: t.grad, opacity: .85 }} />
                <div style={{ ...S.salBadge, background: t.grad }}>{t.salary}</div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 14, boxShadow: '0 6px 24px rgba(0,0,0,.5)' }}>{t.emoji}</div>
                <h3 style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(12px,1vw,14px)', fontWeight: 900, color: '#fff', marginBottom: 4 }}>{t.name}</h3>
                <div style={{ color: t.color, fontSize: 13, fontFamily: 'Rajdhani', fontWeight: 700, marginBottom: 12 }}>{t.role}</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>{[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: '#ffd700', fontSize: '1rem' }} />)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['🏁 Boshlanish', t.start, false], ['⚡ Jarayon', t.mid, false], ['✅ Hozir', t.end, true]].map(([lbl, txt, ok]) => (
                    <div key={lbl} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 13, height: 13, borderRadius: '50%', flexShrink: 0, marginTop: 3, background: ok ? '#00C9B1' : '#334', boxShadow: ok ? '0 0 12px #00C9B1' : 'none', border: `2px solid ${ok ? '#00C9B1' : '#445'}` }} />
                      <div>
                        <div style={{ fontSize: 10, fontFamily: 'Orbitron', fontWeight: 700, letterSpacing: '1px', marginBottom: 2, textTransform: 'uppercase', color: ok ? '#00C9B1' : '#aaa' }}>{lbl}</div>
                        <div style={{ fontSize: 'clamp(11px,.9vw,13px)', lineHeight: 1.55, color: ok ? '#e0f4ff' : '#6da9c8' }}>{txt}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${t.color}33`, fontStyle: 'italic', fontSize: 'clamp(11px,.9vw,13px)', lineHeight: 1.65, fontFamily: 'Rajdhani', fontWeight: 500, color: t.color, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <FaQuoteLeft style={{ marginRight: 6, opacity: .6, flexShrink: 0, marginTop: 2 }} />{t.quote}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Hint />
      </section>

      {/* ════════════════ MODAL ════════════════ */}
      {selectedTeacher && (
        <div style={{ ...S.overlay, opacity: modalVisible ? 1 : 0, pointerEvents: modalVisible ? 'all' : 'none' }} onClick={close}>
          <div style={{ ...S.modal, transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(40px)' }} onClick={e => e.stopPropagation()}>
            <button style={S.mClose} onClick={close}>✕</button>
            <div style={{ ...S.modalGlow, background: selectedTeacher.grad }} />
            <div ref={modalContentRef} style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: selectedTeacher.grad, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.6rem', boxShadow: `0 0 40px ${selectedTeacher.color}55` }}>{selectedTeacher.emoji}</div>
              <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.8rem', textAlign: 'center', color: '#fff', marginBottom: 8 }}>{selectedTeacher.name}</h2>
              <div style={{ textAlign: 'center', fontFamily: 'Rajdhani', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20, color: selectedTeacher.color }}>{selectedTeacher.role}</div>

              <p style={{ color: '#6da9c8', lineHeight: 1.85, marginBottom: 32, fontSize: '1.05rem', textAlign: 'center', padding: '0 20px' }}>{selectedTeacher.bio}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 30 }}>
                {[["O'quvchilar", selectedTeacher.students], ['Tajriba (yil)', selectedTeacher.exp], ['Kompaniya', selectedTeacher.company], ['Reyting', selectedTeacher.rating + '/5']].map(([l, v]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${selectedTeacher.color}33`, borderRadius: 18, padding: 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'all 0.3s', cursor: 'default' }}>
                    <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '2rem', fontWeight: 900, color: selectedTeacher.color }}>{v}</span>
                    <span style={{ fontSize: '.9rem', color: '#6da9c8', fontWeight: 500 }}>{l}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {selectedTeacher.skills.map(sk => (
                  <span key={sk} style={{ fontSize: 13, padding: '10px 22px', borderRadius: 8, border: `1px solid ${selectedTeacher.color}55`, background: 'rgba(255,255,255,.05)', fontFamily: 'Rajdhani', fontWeight: 700, color: selectedTeacher.color, letterSpacing: '1px' }}>{sk}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Hint() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 64px 18px', position: 'relative', zIndex: 5 }}>
      <span style={{ fontSize: '1.6rem', color: '#00C9B1', animation: 'arrowBounce 1.5s ease-in-out infinite' }}>→</span>
      <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13, color: '#6da9c8', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll qiling</span>
    </div>
  )
}

const S = {
  pin: { position: 'relative', height: '100vh', overflow: 'hidden', background: 'linear-gradient(160deg,#020b18,#031020)', borderTop: '1px solid rgba(0,201,177,.12)', display: 'flex', flexDirection: 'column', zIndex: 10 },
  orb: { position: 'absolute', width: 600, height: 600, borderRadius: '50%', filter: 'blur(90px)', opacity: .22, pointerEvents: 'none', zIndex: 0 },
  head: { padding: '44px 64px 14px', position: 'relative', zIndex: 5, flexShrink: 0 },
  tag: { display: 'inline-block', fontFamily: 'Orbitron,monospace', fontSize: 12, letterSpacing: '5px', color: '#00C9B1', textTransform: 'uppercase', marginBottom: 14, padding: '6px 16px', borderLeft: '4px solid #00C9B1', fontWeight: 700, background: 'rgba(0,201,177,.07)' },
  h2: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(24px,3.4vw,50px)', fontWeight: 900, lineHeight: 1.1, color: '#fff', margin: '0 0 10px', transformOrigin: 'left top' },
  sub: { color: '#6da9c8', fontSize: 'clamp(13px,1.4vw,17px)', fontFamily: 'Rajdhani,sans-serif', fontWeight: 500 },
  viewport: { flex: 1, overflow: 'hidden', padding: '14px 64px 0', position: 'relative', zIndex: 4, display: 'flex', alignItems: 'center' },
  track: { display: 'flex', gap: 22, alignItems: 'stretch', willChange: 'transform', paddingRight: 120 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '22px 22px 0 0', zIndex: 4, transition: 'opacity .3s' },
  iconWrap: { width: 64, height: 64, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '1px', background: 'rgba(255,255,255,.04)', border: '1px solid', fontFamily: 'Rajdhani' },
  cCard: { flexShrink: 0, width: 'clamp(260px,19vw,310px)', padding: '26px 22px', cursor: 'pointer', position: 'relative', background: 'rgba(4,16,44,.95)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 10 },
  cTitle: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(12px,1vw,15px)', fontWeight: 900, color: '#fff' },
  cDesc: { fontSize: 'clamp(11px,.95vw,13px)', color: '#6da9c8', lineHeight: 1.65, flex: 1 },
  tCard: { flexShrink: 0, width: 'clamp(220px,16vw,270px)', padding: '24px 18px 18px', textAlign: 'center', cursor: 'pointer', position: 'relative', background: 'rgba(4,16,44,.95)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 22 },
  avRing: { position: 'absolute', inset: '-4px', borderRadius: '50%', border: '2px solid', width: 90, height: 90, left: '50%', top: 0, transform: 'translateX(-50%)', pointerEvents: 'none' },
  av: { width: 82, height: 82, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', margin: '0 auto', position: 'relative', zIndex: 1, boxShadow: '0 8px 32px rgba(0,0,0,.5)' },
  tBadge: { position: 'absolute', top: -6, right: 'calc(50% - 68px)', background: 'rgba(2,11,24,.95)', border: '1px solid', borderRadius: 20, padding: '3px 10px', fontSize: 10, fontWeight: 700, fontFamily: 'Orbitron,monospace', letterSpacing: '.5px', whiteSpace: 'nowrap' },
  stCard: { flexShrink: 0, width: 'clamp(290px,22vw,360px)', padding: '30px 26px', position: 'relative', cursor: 'default', background: 'rgba(4,16,44,.95)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 22 },
  salBadge: { position: 'absolute', top: 20, right: 20, padding: '7px 18px', borderRadius: 30, fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: '#020b18', letterSpacing: '1px', boxShadow: '0 4px 20px rgba(0,0,0,.4)' },
  overlay: { position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,.93)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, transition: 'opacity .35s' },
  modal: { background: 'linear-gradient(135deg,rgba(4,18,46,.99),rgba(2,8,24,.99))', border: '1px solid rgba(0,201,177,.3)', borderRadius: 28, padding: '52px 48px', maxWidth: 700, width: '100%', position: 'relative', transition: 'transform .4s cubic-bezier(.2,1.4,.5,1)', boxShadow: '0 40px 100px rgba(0,0,0,.8)', maxHeight: '90vh', overflowY: 'auto' },
  mClose: { position: 'absolute', top: 18, right: 20, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: '#aaa', fontSize: '1.2rem', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  modalGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, borderRadius: '28px 28px 0 0', opacity: 0.9, zIndex: 1 },
}