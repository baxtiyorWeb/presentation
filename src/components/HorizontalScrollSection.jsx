import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaCode, FaServer, FaShieldAlt, FaPaintBrush, FaGlobeAmericas, FaBrain,
  FaDesktop, FaComments, FaStar, FaQuoteLeft, FaTimes, FaGraduationCap,
  FaTelegram, FaAward, FaUsers, FaExternalLinkAlt, FaCheckCircle
} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const COURSES = [
  {
    id: 'c1', Icon: FaCode, title: 'Frontend Development', dur: '7+1 oy', badge: 'Advanced', sub: 'HTML · CSS · JS · React · Tailwind',
    desc: 'Zamonaviy responsive veb saytlar yaratish. Bootstrap, Tailwind, JavaScript ES6+, React hooks va state management.',
    color: '#00E5FF', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', price: '2 000 000 som',
    details: 'Kurs davomida siz 10 dan ortiq real loyihalar ustida ishlaysiz. Portfolioingiz uchun tayyor veb-saytlar yaratasiz.',
    projects: [
      { name: 'E-Commerce Site', url: 'https://demo-shop.joylinks.uz' },
      { name: 'Dashboard UI', url: 'https://admin-panel.joylinks.uz' }
    ]
  },
  {
    id: 'c2', Icon: FaServer, title: 'Backend Development', dur: '7+1 oy', badge: 'Pro Level', sub: 'Python · Django · REST API · Docker',
    desc: 'Python va Django bilan professional backend tizimlar. REST API, PostgreSQL, Docker, Telegram botlar yaratish.',
    color: '#00ff88', grad: 'linear-gradient(135deg,#00ff88,#00bcd4)', price: '2 500 000 som',
    details: 'Murakkab ma\'lumotlar bazasi arxitekturasi va server optimallashtirish. Xalqaro standartlar asosida kod yozish.',
    projects: [
      { name: 'CRM System API', url: 'https://api.joylinks.uz' },
      { name: 'Booking Bot', url: 'https://t.me/joylinks_bot' }
    ]
  },
  {
    id: 'c3', Icon: FaShieldAlt, title: 'Kiberxavfsizlik', dur: '8 oy', badge: 'Expert', sub: 'Pentesting · Ethical Hacking · OWASP',
    desc: 'Red Team, Pentesting, Linux & Windows Security. Web Pentesting OWASP Top 10 qoidalarini amalda qo\'llash.',
    color: '#ff4d6d', grad: 'linear-gradient(135deg,#ff4d4d,#ff6b35)', price: '3 000 000 som',
    details: 'Tarmoq xavfsizligini ta\'minlash, xakerlik hujumlaridan himoyalanish va audit o\'tkazish ko\'nikmalari.',
    projects: [
      { name: 'Security Audit Report', url: '#' },
      { name: 'Penetration Tool', url: '#' }
    ]
  },
  {
    id: 'c4', Icon: FaPaintBrush, title: 'Grafik Dizayn', dur: '7+1 oy', badge: 'Professional', sub: 'Adobe Suite · Figma · After Effects',
    desc: 'Photoshop, Illustrator, After Effects, CorelDRAW. Logo, branding va professional motion graphics yaratish.',
    color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)', price: '1 800 000 som',
    details: 'Visual story-telling, ranglar psixologiyasi va zamonaviy UI/UX tamoyillari asosida ijod qilish.',
    projects: [
      { name: 'Brand Identity', url: 'https://behance.net/joylinks' },
      { name: 'App Design', url: '#' }
    ]
  },
]

const TEACHERS = [
  // {
  //   name: 'Refatbek Arolov', role: 'Direktor', badge: '👔 DIREKTOR',
  //   img: 'img5.jpg',
  //   rating: '5.0', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)',
  //   skills: ['Management', 'Strategy', 'Prompt Engineering'], students: '1000+', exp: '10+', company: 'Joylinks',
  //   fullBio: "Refatbek Arolov — Joylinks akademiyasining asoschisi. O'zbekistonda zamonaviy IT ta'lim tizimini rivojlantirishga ulkan hissa qo'shib kelmoqda.",
  //   achievements: ["Joylinks IT Academy asoschisi", "Muvaffaqiyatli tadbirkor"],
  //   contact: { telegram: '@refatbek_arolov', email: 'direktor@joylinks.uz' }
  // },
  {
    name: 'Abbos Xushboqov', role: "O'qituvchi", badge: '🛡️ SECURITY',
    img: 'img3.png',
    rating: '5.0', color: '#ff6b6b', grad: 'linear-gradient(135deg,#ee5253,#ff6b6b)',
    skills: ['Cyber Security', 'Pentesting', 'Linux'], students: '150+', exp: '5+', company: 'Joylinks',
    fullBio: "Abbos Xushboqov — kiberxavfsizlik bo'yicha yetuk mutaxassis. Xalqaro CTF musobaqalari qatnashchisi.",
    achievements: ["Xalqaro sertifikatlar egasi", "Professional hacker (Ethical)"],
    contact: { telegram: '@abbos_sec', email: 'abbos@joylinks.uz' }
  },
  {
    name: 'Umid Mamatraximov', role: "O'qituvchi", badge: 'FRONT-END',
    img: 'img2.png',
    rating: '4.9', color: '#FF6B6B', grad: 'linear-gradient(135deg,#E74C3C,#C0392B)',
    skills: ['React', 'Next.js', 'Tailwind'], students: '300+', exp: '4+', company: 'Joylinks',
    fullBio: "Umid Mamatraximov — zamonaviy JS frameworklari ustasi. Ko'plab yirik loyihalar arxitektori.",
    achievements: ["React Expert", "Full-stack developer"],
    contact: { telegram: '@umid_js', email: 'umid@joylinks.uz' }
  },
  {
    name: 'Jahongir Omonov', role: "O'qituvchi", badge: 'BACK-END',
    img: 'img5.png',
    rating: '4.9', color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)',
    skills: ['Python', 'Django', 'PostgreSQL'], students: '300+', exp: '4+', company: 'Joylinks',
    fullBio: "Jahongir Omonov — backend va DevOps mutaxassisi. Tizimlarni xavfsiz va tez ishlashini ta'minlaydi.",
    achievements: ["Senior Python Developer", "Database Administrator"],
    contact: { telegram: '@jahongir_py', email: 'jahongir@joylinks.uz' }
  },
  {
    name: 'Samandar Qurbonov', role: "O'qituvchi", badge: 'FRONT-END',
    img: 'img3.jpg',
    rating: '4.8', color: '#a29bfe', grad: 'linear-gradient(135deg,#5F27CD,#8E44AD)',
    skills: ['UI/UX', 'Figma', 'HTML/CSS'], students: '400+', exp: '4+', company: 'Joylinks',
    fullBio: "Samandar Qurbonov — web-dizayn va UX research ustasi. Interfeyslarni foydalanuvchibop qilish bo'yicha ekspert.",
    achievements: ["UI/UX Designer", "Product Developer"],
    contact: { telegram: '@samandar_ux', email: 'samandar@joylinks.uz' }
  },
  {
    name: 'Dilnoza Shamshiddinova', role: "O'qituvchi", badge: '🇬🇧 ENGLISH',
    img: 'img4.jpg',
    rating: '4.9', color: '#feca57', grad: 'linear-gradient(135deg,#ff9f43,#feca57)',
    skills: ['IELTS', 'Business English'], students: '500+', exp: '5+', company: 'Joylinks',
    fullBio: "Dilnoza Shamshiddinova — IELTS 8.5 ball sohibasi. O'quvchilarni eng qisqa muddatda natijaga olib chiqadi.",
    achievements: ["IELTS 8.5 Ball", "Top Pedagog 2023"],
    contact: { telegram: '@dilnoza_eng', email: 'dilnoza@joylinks.uz' }
  },
]

const TESTIMONIALS = [
  { name: 'Ozodbek Ruziboyev', role: 'Frontend Dasturchi', emoji: '👨‍🎓', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', quote: '"Joylinks men uchun kelajak eshiklarini ochdi!"', rating: 5, site: 'https://portfolio-ozodbek.joylinks.uz' },
  { name: 'Mamatov Musulmon', role: 'Backend Dasturchi', emoji: '🚀', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', quote: '"Eng zo\'r ustozlar va muhit shu yerda!"', rating: 5, site: 'https://musulmon-api.joylinks.uz' },
  { name: 'Quldoshev Xalil', role: 'Fullstack Dasturchi', emoji: '🎯', color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', quote: '"Shaxsiy mentoring bilan katta natijaga erishdim."', rating: 5, site: 'https://xalil-app.joylinks.uz' },
  { name: 'Kosimov Adxambek', role: 'Grafik Dizayner', emoji: '💻', color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)', quote: '"Darslar shunchaki ajoyib. Rahmat kattakon!"', rating: 5, site: 'https://adxambek-design.joylinks.uz' },
]

export default function HorizontalScrollSection() {
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('about')

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseModalVisible, setCourseModalVisible] = useState(false)
  const [courseActiveTab, setCourseActiveTab] = useState('program')

  const tSecRef = useRef(null); const tTrkRef = useRef(null)
  const stSecRef = useRef(null); const stTrkRef = useRef(null)
  const courseRefs = useRef([])
  const modalRef = useRef(null); const courseModalRef = useRef(null)

  /* ─── TEACHERS HORIZONTAL SCROLL (3 per step) ─── */
  useEffect(() => {
    const section = tSecRef.current
    const track = tTrkRef.current
    if (!section || !track) return

    const cards = [...track.querySelectorAll('.t-card')]
    const getScroll = () => track.scrollWidth - window.innerWidth + 140

    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScroll()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 98%', toggleActions: 'play none none reverse' }
        }
      )
    })

    return () => { ScrollTrigger.getAll().forEach(t => { if (t.vars.containerAnimation === tween) t.kill() }); tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  /* ─── TESTIMONIALS SCROLL ─── */
  useEffect(() => {
    const section = stSecRef.current
    const track = stTrkRef.current
    if (!section || !track) return
    const getScroll = () => track.scrollWidth - window.innerWidth + 120
    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${getScroll()}`, pin: true, scrub: 1.2, invalidateOnRefresh: true }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  /* ─── COURSES VERTICAL REVEAL ─── */
  useEffect(() => {
    courseRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        })
    })
  }, [])

  /* Header animations */
  useEffect(() => {
    gsap.utils.toArray('.sec-heading').forEach(el => {
      gsap.fromTo(el, { scaleX: 1.1, opacity: 0, y: 30 }, {
        scaleX: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      })
    })
  }, [])

  const open = t => {
    setSelectedTeacher(t)
    setActiveTab('about')
    setModalVisible(true)
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { scale: 0.95, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' })
        gsap.fromTo('.m-img', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 })
        gsap.fromTo('.m-text', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.2 })
      }
    }, 10)
  }
  const close = () => { if (modalRef.current) { gsap.to(modalRef.current, { scale: 0.9, opacity: 0, duration: 0.3, onComplete: () => { setModalVisible(false); setSelectedTeacher(null); document.body.style.overflow = '' } }) } }

  const openCourse = c => {
    setSelectedCourse(c)
    setCourseActiveTab('program')
    setCourseModalVisible(true)
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      if (courseModalRef.current) {
        gsap.fromTo(courseModalRef.current, { scale: 0.95, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' })
        gsap.fromTo('.cm-icon', { scale: 0.5, opacity: 0, rotation: -45 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.5)', delay: 0.1 })
        gsap.fromTo('.cm-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 })
      }
    }, 10)
  }
  const closeCourse = () => { if (courseModalRef.current) { gsap.to(courseModalRef.current, { scale: 0.9, opacity: 0, duration: 0.3, onComplete: () => { setCourseModalVisible(false); setSelectedCourse(null); document.body.style.overflow = '' } }) } }

  return (
    <>
      <style>{`
        .course-row:hover .course-glow { opacity: 1 !important; }
        .t-card:hover .t-img { transform: scale(1.1); }
      `}</style>

      {/* ════════════════ COURSES (VERTICAL) ════════════════ */}
      <section id="courses" style={S.vSec}>
        <div style={S.headCenter}>
          <div style={S.tag}>📚 BIZNING KURSLAR</div>
          <h2 className="sec-heading" style={S.h2}>Mutaxassis <span className="g">Yo'nalishlari</span></h2>
          <p style={S.sub}>Har bir kurs — bu professional karyera sari tashlangan katta qadam</p>
        </div>

        <div style={S.vTrack}>
          {COURSES.map((c, i) => (
            <div key={c.id} ref={el => courseRefs.current[i] = el} className="course-row glass" style={{ ...S.cRow, cursor: 'pointer' }} onClick={() => openCourse(c)}>
              <div className="course-glow" style={{ ...S.cGlow, background: c.grad }} />
              <div style={S.cLeft}>
                <div style={{ ...S.cIcon, background: `${c.color}15`, border: `2px solid ${c.color}33` }}>
                  <c.Icon style={{ color: c.color, fontSize: '3rem' }} />
                </div>
                <div style={{ ...S.cBadge, color: c.color, borderColor: `${c.color}55` }}>{c.badge}</div>
              </div>
              <div style={S.cMid}>
                <h3 style={{ ...S.cTitle, color: c.color }}>{c.title}</h3>
                <p style={S.cSub}>{c.sub}</p>
                <p style={S.cDesc}>{c.desc}</p>
                <div style={S.cDetails}>{c.details}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 24 }}>
                  <div style={{ color: c.color, fontWeight: 700, fontSize: 14, letterSpacing: 1, fontFamily: 'Orbitron', display: 'flex', alignItems: 'center', gap: 8 }}>BATAFSIL <FaExternalLinkAlt size={12} /></div>
                </div>
              </div>
              <div style={S.cRight} onClick={e => e.stopPropagation()}>
                <h4 style={S.projHead}>LOYIHALAR:</h4>
                <div style={S.projList}>
                  {c.projects.map((p, j) => (
                    <a key={j} href={p.url} target="_blank" rel="noreferrer" style={{ ...S.projBtn, color: c.color, borderColor: `${c.color}33` }}>
                      {p.name} <FaExternalLinkAlt size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ TEACHERS (HORIZONTAL CAROUSEL) ════════════════ */}
      <section id="teachers" ref={tSecRef} style={S.pSec}>
        <div style={S.headCenter}>
          <div style={S.tag}>🌟 MUTAXASSISLAR</div>
          <h2 className="sec-heading" style={S.h2}>Bizning <span className="g">O'qituvchilarimiz</span></h2>
          <p style={S.sub}>Google va xalqaro kompaniyalar tajribasiga ega ustozlar jamoasi</p>
        </div>

        <div style={S.viewport}>
          <div ref={tTrkRef} style={S.track}>
            {TEACHERS.map((t, i) => (
              <div key={i} className="t-card glass" style={S.tCard} onClick={() => open(t)}>
                <div style={S.tImgFrame}>
                  <img src={t.img} alt={t.name} className="t-img" style={S.tImg} />
                  <div style={{ ...S.tBar, background: t.grad }} />
                  <div style={{ ...S.tBadge, background: t.grad }}>{t.badge}</div>
                </div>
                <div style={S.tInfo}>
                  <h3 style={S.tName}>{t.name}</h3>
                  <div style={{ color: t.color, fontWeight: 800, fontSize: 13, textTransform: 'uppercase', marginBottom: 12 }}>{t.role}</div>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 14 }}>
                    {[...Array(5)].map((_, j) => <FaStar key={j} style={{ color: '#ffd700', fontSize: 14 }} />)}
                  </div>
                  <div style={S.skillsRow}>
                    {t.skills.slice(0, 2).map(sk => <span key={sk} style={{ ...S.skPill, color: t.color, borderColor: `${t.color}33` }}>{sk}</span>)}
                  </div>
                  <div style={S.viewMore}>Batafsil ko'rish →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <section id="testimonials" ref={stSecRef} style={S.pSec}>
        <div style={S.headCenter}>
          <div style={S.tag}>🏆 NATIJALAR</div>
          <h2 className="sec-heading" style={S.h2}>Muvaffaqiyat <span className="g">Loyiha Ustasi</span></h2>
        </div>
        <div style={S.viewport}>
          <div ref={stTrkRef} style={S.track}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass" style={S.stCard}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: 16 }}>{t.emoji}</div>
                <h3 style={S.tName}>{t.name}</h3>
                <p style={{ color: t.color, fontWeight: 800, marginBottom: 14 }}>{t.role}</p>
                <p style={S.stQuote}><FaQuoteLeft /> {t.quote}</p>
                <a href={t.site} target="_blank" rel="noreferrer" style={{ ...S.projBtn, marginTop: 20, color: t.color, borderColor: `${t.color}33`, width: '100%', justifyContent: 'center' }}>
                  Loyiha Saytini Ko'rish <FaExternalLinkAlt />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TEACHER MODAL ════════════════ */}
      {selectedTeacher && (
        <div style={{ ...S.overlay, opacity: modalVisible ? 1 : 0, pointerEvents: modalVisible ? 'all' : 'none' }} onClick={close}>
          <div ref={modalRef} style={S.modal} onClick={e => e.stopPropagation()}>
            <button style={S.mClose} onClick={close}><FaTimes /></button>
            <div style={S.mGrid}>
              <div style={S.mLeft}>
                <img src={selectedTeacher.img} alt={selectedTeacher.name} className="m-img" style={S.mImg} />
                <div style={{ ...S.mImgGlow, background: selectedTeacher.grad }} />
                <div style={S.mGradient} />
                <div className="m-text" style={S.mBadgeFloat}>
                  <FaAward style={{ color: selectedTeacher.color, fontSize: 24 }} />
                  <div style={{ fontSize: 12, fontWeight: 900, fontFamily: 'Orbitron', letterSpacing: 1 }}>{selectedTeacher.achievements?.[0] || 'Top Expert'}</div>
                </div>
              </div>
              <div style={S.mRight}>
                <div className="m-text" style={{ ...S.tag, color: selectedTeacher.color, borderColor: selectedTeacher.color, marginBottom: 12 }}>{selectedTeacher.role}</div>
                <h2 className="m-text" style={S.mTitle}>{selectedTeacher.name}</h2>
                <div className="m-text" style={S.mRating}>
                  <div style={{ display: 'flex', gap: 4 }}>{[...Array(5)].map((_, j) => <FaStar key={j} style={{ color: '#ffd700' }} />)}</div>
                  <span style={{ color: '#fff', fontSize: 16 }}>{selectedTeacher.rating} / 5.0</span>
                  <span style={{ opacity: .3 }}>•</span>
                  <span style={{ fontSize: 14, color: '#6da9c8', fontWeight: 600 }}>{selectedTeacher.students} o'quvchilar</span>
                </div>

                <div className="m-text" style={S.mTabs}>
                  {[['about', 'Haqida'], ['skills', 'Mutaxassisligi'], ['contact', 'Bog\'lanish']].map(([k, l]) => (
                    <button key={k} onClick={() => setActiveTab(k)} style={{ ...S.mTab, color: activeTab === k ? selectedTeacher.color : '#6da9c8', background: activeTab === k ? `${selectedTeacher.color}15` : 'transparent', borderColor: activeTab === k ? selectedTeacher.color : 'rgba(255,255,255,0.05)' }}>{l}</button>
                  ))}
                </div>

                <div className="m-text" style={S.mContent}>
                  {activeTab === 'about' && (
                    <div style={{ animation: 'fadeIn .3s ease' }}>
                      <p style={S.mP}>{selectedTeacher.fullBio}</p>
                      <div style={{ display: 'flex', gap: 24, marginTop: 24, padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div>
                          <div style={{ fontSize: 12, color: '#6da9c8', marginBottom: 4, fontFamily: 'Orbitron', letterSpacing: 1 }}>TAJRIBA</div>
                          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{selectedTeacher.exp} yil</div>
                        </div>
                        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                        <div>
                          <div style={{ fontSize: 12, color: '#6da9c8', marginBottom: 4, fontFamily: 'Orbitron', letterSpacing: 1 }}>KOMPANIYA</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: selectedTeacher.color }}>{selectedTeacher.company}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === 'skills' && (
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeIn .3s ease' }}>
                      {selectedTeacher.skills.map(sk => (
                        <div key={sk} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${selectedTeacher.color}44`, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <FaCheckCircle style={{ color: selectedTeacher.color }} />
                          <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{sk}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'contact' && (
                    <div style={{ animation: 'fadeIn .3s ease' }}>
                      <p style={{ color: '#6da9c8', marginBottom: 24, fontSize: 16 }}>Ustoz bilan to'g'ridan-to'g'ri bog'lanish yoki savollar berish uchun quyidagi tarmoqlardan foydalaning:</p>
                      <a href={`https://t.me/${selectedTeacher.contact.telegram.slice(1)}`} target="_blank" rel="noreferrer" style={{ ...S.mLink, background: 'rgba(0,136,204,0.1)', borderColor: 'rgba(0,136,204,0.3)', color: '#0088cc' }}>
                        <FaTelegram style={{ fontSize: 24 }} /> {selectedTeacher.contact.telegram}
                      </a>
                      <div style={{ ...S.mLink, background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                        <FaTimes style={{ fontSize: 24, opacity: .5 }} /> {selectedTeacher.contact.email}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════ COURSE MODAL ════════════════ */}
      {selectedCourse && (
        <div style={{ ...S.overlay, opacity: courseModalVisible ? 1 : 0, pointerEvents: courseModalVisible ? 'all' : 'none' }} onClick={closeCourse}>
          <div ref={courseModalRef} style={{ ...S.modal, width: 'min(900px, 95vw)', height: 'auto', minHeight: '60vh' }} onClick={e => e.stopPropagation()}>
            <button style={S.mClose} onClick={closeCourse}><FaTimes /></button>
            <div style={{ ...S.mGrid, flexDirection: 'column' }}>

              {/* Course Header */}
              <div style={{ padding: '60px 60px 40px', background: `linear-gradient(135deg, ${selectedCourse.color}15, transparent)`, borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.05, pointerEvents: 'none' }}>
                  <selectedCourse.Icon style={{ fontSize: 300, color: selectedCourse.color }} />
                </div>
                <div style={{ display: 'flex', gap: 32, alignItems: 'center', position: 'relative', zIndex: 2 }}>
                  <div className="cm-icon" style={{ width: 100, height: 100, borderRadius: 24, background: `${selectedCourse.color}22`, border: `2px solid ${selectedCourse.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <selectedCourse.Icon style={{ fontSize: 50, color: selectedCourse.color }} />
                  </div>
                  <div>
                    <div className="cm-text" style={{ ...S.tag, color: selectedCourse.color, borderColor: selectedCourse.color, marginBottom: 12 }}>{selectedCourse.badge}</div>
                    <h2 className="cm-text" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>{selectedCourse.title}</h2>
                    <p className="cm-text" style={{ color: '#6da9c8', fontSize: 18, fontFamily: 'Rajdhani', fontWeight: 600 }}>{selectedCourse.sub}</p>
                  </div>
                </div>
              </div>

              {/* Course Body */}
              <div style={{ padding: '40px 60px', flex: 1, background: '#020b18' }}>
                <div className="cm-text" style={S.mTabs}>
                  {[['program', 'Dastur Haqida'], ['projects', 'Loyihalar'], ['price', 'Narx & Muddat']].map(([k, l]) => (
                    <button key={k} onClick={() => setCourseActiveTab(k)} style={{ ...S.mTab, color: courseActiveTab === k ? selectedCourse.color : '#6da9c8', background: courseActiveTab === k ? `${selectedCourse.color}15` : 'transparent', borderColor: courseActiveTab === k ? selectedCourse.color : 'rgba(255,255,255,0.05)' }}>{l}</button>
                  ))}
                </div>

                <div className="cm-text" style={{ marginTop: 32 }}>
                  {courseActiveTab === 'program' && (
                    <div style={{ animation: 'fadeIn .3s ease' }}>
                      <p style={{ ...S.mP, fontSize: 20, color: '#fff', marginBottom: 16 }}>{selectedCourse.desc}</p>
                      <p style={{ ...S.mP, marginBottom: 32 }}>{selectedCourse.details}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div style={{ padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                          <FaBrain style={{ fontSize: 24, color: selectedCourse.color, marginBottom: 16 }} />
                          <h4 style={{ color: '#fff', fontFamily: 'Rajdhani', fontSize: 18, marginBottom: 8 }}>Amaliyotga Asoslangan</h4>
                          <p style={{ color: '#6da9c8', fontSize: 14 }}>Darslar faqat nazariya emas, balki real loyihalar ustida ishlash orqali olib boriladi.</p>
                        </div>
                        <div style={{ padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                          <FaGraduationCap style={{ fontSize: 24, color: selectedCourse.color, marginBottom: 16 }} />
                          <h4 style={{ color: '#fff', fontFamily: 'Rajdhani', fontSize: 18, marginBottom: 8 }}>Sertifikat & Portfolio</h4>
                          <p style={{ color: '#6da9c8', fontSize: 14 }}>Kurs so'ngida xalqaro standartdagi sertifikat va tayyor portfolioga ega bo'lasiz.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {courseActiveTab === 'projects' && (
                    <div style={{ animation: 'fadeIn .3s ease' }}>
                      <h3 style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: 20, marginBottom: 24 }}>Kurs davomida qilinadigan loyihalar:</h3>
                      <div style={{ display: 'grid', gap: 16 }}>
                        {selectedCourse.projects.map((p, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${selectedCourse.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedCourse.color }}>
                                <FaDesktop size={20} />
                              </div>
                              <div>
                                <h4 style={{ color: '#fff', fontSize: 18, fontFamily: 'Rajdhani', fontWeight: 700 }}>{p.name}</h4>
                                <div style={{ color: '#6da9c8', fontSize: 13 }}>Real world project</div>
                              </div>
                            </div>
                            <a href={p.url} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', borderRadius: 10, background: selectedCourse.color, color: '#020b18', textDecoration: 'none', fontWeight: 700, fontFamily: 'Rajdhani', display: 'flex', alignItems: 'center', gap: 8 }}>
                              Ko'rish <FaExternalLinkAlt size={12} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {courseActiveTab === 'price' && (
                    <div style={{ animation: 'fadeIn .3s ease', display: 'flex', gap: 40, alignItems: 'center' }}>
                      <div style={{ flex: 1, padding: 40, background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: '#6da9c8', fontFamily: 'Orbitron', fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>KURS MUDDATI</div>
                        <div style={{ fontSize: 36, color: '#fff', fontWeight: 900, fontFamily: 'Orbitron', marginBottom: 32 }}>{selectedCourse.dur}</div>

                        <div style={{ color: '#6da9c8', fontFamily: 'Orbitron', fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>OYLIK TO'LOV</div>
                        <div style={{ fontSize: 36, color: selectedCourse.color, fontWeight: 900, fontFamily: 'Orbitron' }}>{selectedCourse.price}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#fff', fontFamily: 'Rajdhani', fontSize: 24, marginBottom: 16 }}>Nimalarni o'z ichiga oladi?</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {['Haftada 3 kun asosiy darslar', 'Haftada 2 kun amaliyot (Coworking)', 'Shaxsiy mentor yordami', 'Yopiq hamjamiyatga kirish', 'Ishga joylashishda ko\'mak'].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6da9c8', fontSize: 16 }}>
                              <FaCheckCircle style={{ color: selectedCourse.color }} /> {item}
                            </li>
                          ))}
                        </ul>
                        <button style={{ marginTop: 32, width: '100%', padding: '16px', borderRadius: 12, background: selectedCourse.grad, color: '#020b18', border: 'none', fontFamily: 'Orbitron', fontSize: 16, fontWeight: 900, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                          Ro'yxatdan O'tish <FaExternalLinkAlt />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

const S = {
  vSec: { padding: '120px 64px', position: 'relative', background: '#020b18' },
  pSec: { height: '100vh', padding: '120px 0', overflow: 'hidden', position: 'relative' },
  headCenter: { textAlign: 'center', marginBottom: 72, padding: '0 64px' },
  tag: { display: 'inline-block', fontFamily: 'Orbitron', fontSize: 13, letterSpacing: 4, color: '#00C9B1', textTransform: 'uppercase', marginBottom: 18, borderLeft: '4px solid', paddingLeft: 12 },
  h2: { fontFamily: 'Orbitron', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, color: '#fff' },
  sub: { color: '#6da9c8', fontSize: 18, fontFamily: 'Rajdhani', marginTop: 12 },

  vTrack: { maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 },
  cRow: { display: 'flex', padding: '52px 48px', gap: 48, borderRadius: 32, alignItems: 'center', position: 'relative' },
  cGlow: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, borderRadius: '32px 0 0 32px' },
  cLeft: { flexShrink: 0, textAlign: 'center' },
  cIcon: { width: 100, height: 100, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  cBadge: { padding: '5px 15px', borderRadius: 20, fontSize: 11, fontWeight: 800, border: '1px solid', fontFamily: 'Orbitron' },
  cMid: { flex: 1 },
  cTitle: { fontFamily: 'Orbitron', fontSize: 28, fontWeight: 900, marginBottom: 8 },
  cSub: { fontFamily: 'Rajdhani', fontSize: 18, fontWeight: 800, marginBottom: 16 },
  cDesc: { color: '#6da9c8', fontSize: 16, lineHeight: 1.7, marginBottom: 16 },
  cDetails: { color: '#e0f4ff', fontSize: 15, fontStyle: 'italic', marginBottom: 20 },
  cPrice: { fontFamily: 'Orbitron', fontWeight: 900, fontSize: 18, color: '#fff' },
  cRight: { width: 260, background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.06)' },
  projHead: { fontSize: 12, fontFamily: 'Orbitron', letterSpacing: 2, color: '#6da9c8', marginBottom: 16 },
  projList: { display: 'flex', flexDirection: 'column', gap: 10 },
  projBtn: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, border: '1px solid', textDecoration: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'Rajdhani', transition: 'all .3s' },

  viewport: { padding: '0 64px', overflow: 'hidden' },
  track: { display: 'flex', gap: 32, paddingRight: 200 },
  tCard: { width: 'min(380px, 30vw)', flexShrink: 0, cursor: 'pointer', borderRadius: 32, overflow: 'hidden', paddingBottom: 32 },
  tImgFrame: { height: 320, position: 'relative', overflow: 'hidden' },
  tImg: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' },
  tBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 },
  tBadge: { position: 'absolute', top: 20, right: 20, padding: '6px 16px', borderRadius: 20, color: '#020b18', fontSize: 11, fontWeight: 900, fontFamily: 'Orbitron' },
  tInfo: { padding: '24px 24px 0', textAlign: 'center' },
  tName: { fontFamily: 'Orbitron', fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4 },
  skillsRow: { display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' },
  skPill: { padding: '5px 15px', borderRadius: 10, fontSize: 11, fontWeight: 700, border: '1px solid', background: 'rgba(255,255,255,0.05)' },
  viewMore: { marginTop: 20, fontSize: 12, color: '#00C9B1', fontWeight: 700, letterSpacing: 1 },

  stCard: { width: 440, padding: 40, flexShrink: 0, borderRadius: 32 },
  stQuote: { color: '#aac', fontSize: 16, fontStyle: 'italic', lineHeight: 1.8 },

  overlay: { position: 'fixed', inset: 0, background: 'rgba(2,11,24,0.85)', backdropFilter: 'blur(16px)', zIndex: 9000, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity .4s' },
  modal: { width: 'min(1100px, 95vw)', height: 'min(700px, 90vh)', background: '#020b18', borderRadius: 32, overflow: 'hidden', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.05)' },
  mGrid: { display: 'flex', height: '100%' },
  mLeft: { width: '45%', position: 'relative', overflow: 'hidden' },
  mImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center' },
  mImgGlow: { position: 'absolute', inset: 0, opacity: 0.3, mixBlendMode: 'overlay' },
  mGradient: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, #020b18 100%)' },
  mBadgeFloat: { position: 'absolute', bottom: 40, left: 40, right: 0, display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(2,11,24,0.6)', backdropFilter: 'blur(16px)', padding: '16px 24px', borderRadius: '24px 0 0 24px', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', color: '#fff' },
  mRight: { flex: 1, padding: '60px 80px 60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  mTitle: { fontFamily: 'Orbitron', fontSize: 'clamp(32px, 3.5vw, 56px)', fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.1 },
  mRating: { marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 },
  mTabs: { display: 'flex', gap: 12, marginBottom: 32 },
  mTab: { padding: '10px 24px', borderRadius: 12, border: '1.5px solid', cursor: 'pointer', fontFamily: 'Orbitron', fontSize: 11, fontWeight: 900, letterSpacing: 1, transition: 'all .3s' },
  mContent: { flex: 1 },
  mP: { color: '#6da9c8', fontSize: 18, lineHeight: 1.8, fontFamily: 'Rajdhani', fontWeight: 500 },
  mLink: { display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', fontSize: 16, fontWeight: 700, marginBottom: 16, padding: '16px 24px', borderRadius: 16, border: '1px solid', transition: 'all .3s' },
  mClose: { position: 'absolute', top: 32, right: 32, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', fontSize: 20, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }
}