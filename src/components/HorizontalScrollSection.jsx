import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const COURSES = [
  { id: 'c1', icon: '💻', title: 'Frontend Development', dur: '7+1 oy', badge: 'Advanced',          sub: 'HTML, CSS, JS, React, Tailwind',     desc: 'Bootstrap, Tailwind, JavaScript, React. Zamonaviy responsive veb saytlar yaratish.',           color: '#00E5FF', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', price: '2,000,000 som',  img: 'https://img.freepik.com/free-photo/html-css-collage-concept_23-2150061955.jpg' },
  { id: 'c2', icon: '⚙️', title: 'Backend Development',  dur: '7+1 oy', badge: 'Pro Level',         sub: 'Python, Django, API, Bot',           desc: 'Python va Django bilan professional backend. REST API, PostgreSQL, Docker, Telegram botlar.',    color: '#00ff88', grad: 'linear-gradient(135deg,#00ff88,#00bcd4)', price: '2,500,000 som',  img: 'https://www.miquido.com/wp-content/uploads/2021/04/header-what-is-backend-development-1.jpg' },
  { id: 'c3', icon: '🔐', title: 'Kiberxavfsizlik',      dur: '8 oy',   badge: 'Expert',            sub: 'Pentesting | Ethical Hacking',       desc: 'Red Team, Pentesting, Linux & Windows Security, Web Pentesting OWASP Top 10.',                   color: '#ff4d6d', grad: 'linear-gradient(135deg,#ff4d4d,#ff6b35)', price: '3,000,000 som',  img: 'https://images.ricoh-usa.com/j2jqn9lauv41/6IrdDgkJAhvm4jNoFa5QGM/27f2e319dab816390e8170427571721c/OG-Social-SaS-Cybersecurity.jpg' },
  { id: 'c4', icon: '🎨', title: 'Grafik Dizayn',        dur: '7+1 oy', badge: 'Professional',      sub: 'Adobe Suite | Figma | After FX',     desc: 'Photoshop, Illustrator, After Effects, CorelDRAW. Logo, branding, motion graphics.',            color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)', price: '1,800,000 som',  img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?fm=jpg&q=60&w=800&fit=crop' },
  { id: 'c5', icon: '🌐', title: 'Ingliz Tili',          dur: '6-12 oy',badge: 'IELTS Sertifikat', sub: 'A1 dan C1 gacha',                    desc: "A1 dan C1 gacha. IELTS va TOEFL tayyorgarlik. Native speaker o'qituvchi.",                       color: '#ffd700', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', price: '150,000 som/oy', img: 'https://media.istockphoto.com/id/953264308/photo/learn-english-note-at-wooden-background-with-teachers-glasses.jpg' },
  { id: 'c6', icon: '🤖', title: 'AI & Prompt Eng.',     dur: 'Trending',badge: 'Trending 🔥',      sub: 'ChatGPT, Claude, Midjourney',        desc: "Sun'iy intellekt bilan ishlash. Biznes automation, content creation, AI tools.",                 color: '#00ff88', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', price: '800,000 som',    img: 'https://s45271.pcdn.co/wp-content/uploads/elementor/thumbs/2026.02.09_prompt-engineering-rivw8hfd7ts2pvaztkd00v5wijao8q4dw4rnu86s84.jpg' },
  { id: 'c7', icon: '🖥️', title: 'Komp. Savodxonligi',  dur: '4 oy',   badge: "Boshlang'ich",      sub: 'Word, Excel, PowerPoint',            desc: "Ish uchun zarur kompyuter ko'nikmalari. Office dasturlar bilan professional ishlash.",           color: '#00bcd4', grad: 'linear-gradient(135deg,#00bcd4,#00838f)', price: 'Arzon narx',     img: 'https://grotechlearn.com/Content/Home/img/course-ban/basic-computer.jpg' },
  { id: 'c8', icon: '🇷🇺', title: 'Rus Tili',            dur: 'B2 Maqsad',badge: 'Grammatika + Suhbat', sub: "Grammatika | So'zlashuv",        desc: 'Business Russian. Rossiya kompaniyalari uchun professional Russian. Grammar va Conversation.',     color: '#a29bfe', grad: 'linear-gradient(135deg,#a29bfe,#6c5ce7)', price: 'Qulay narx',     img: 'https://moderndiplomacy.eu/wp-content/uploads/2023/12/Learn-Russian-Language.jpg' },
]

const TEACHERS = [
  { name: 'Alisher Karimov',       role: 'Backend Developer',  rating: '4.95', emoji: '👨‍💻', badge: '🏆 TOP',     color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', skills: ['Python','Django','REST API','Docker'],           students: '500+', exp: '15+', company: 'Google',    bio: "O'zbek IT sohasining yetakchi backend mutaxassisi. Google va Samsung loyihalarida ishlab, 15+ yil tajribani Joylinks talabalariga ulashadi." },
  { name: 'Madina Omonova',         role: 'UI/UX Designer',     rating: '4.92', emoji: '👩‍🎨', badge: '✨ DIZAYN', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', skills: ['Figma','Photoshop','Adobe XD','Branding'],       students: '350+', exp: '12+', company: '200+ Proekt',bio: "200+ brendni visual identifikatsiyasini yaratgan. Figma va Adobe Suite bo'yicha O'zbekistondagi eng so'ralgan mutaxassis." },
  { name: 'Sardor Mirza',           role: 'English Teacher',    rating: '4.97', emoji: '👨‍🎓', badge: '🎯 IELTS',  color: '#FF6B6B', grad: 'linear-gradient(135deg,#FF6B6B,#FF8E72)', skills: ['IELTS 8.5','TOEFL','IT English','Speaking'],    students: '800+', exp: '10+', company: 'Oxford',    bio: "IELTS 8.5 ball egasi. Oxford dasturida ishtirok etgan. 800+ talabani IELTS maqsadiga yetkazgan legendar o'qituvchi." },
  { name: 'Javohir Abdurahmonov',   role: 'AI Expert',          rating: '4.98', emoji: '👨‍💼', badge: '🤖 AI',     color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)', skills: ['ChatGPT','Claude','Midjourney','Automation'],   students: '220+', exp: '8+',  company: 'OpenAI',   bio: "OpenAI hamkorligida AI kurslarini yaratgan. O'zbekistonda AI education pioneeri. Prompt Engineering bo'yicha kitob muallifi." },
  { name: 'Nozima Tosheva',         role: 'Motion Design',      rating: '4.93', emoji: '👩‍🏫', badge: '🎬 MOTION',color: '#a29bfe', grad: 'linear-gradient(135deg,#5F27CD,#8E44AD)', skills: ['After Effects','Premiere','Animation','3D'],    students: '280+', exp: '11+', company: '150+ Video',bio: "150+ reklama va motion graphics loyihasining muallifi. After Effects va Cinema 4D bo'yicha sertifikatlangan mutaxassis." },
  { name: 'Firuza Rahimova',        role: 'Frontend Developer', rating: '4.94', emoji: '👩‍💻', badge: '⚡ FRONT', color: '#FF6B6B', grad: 'linear-gradient(135deg,#E74C3C,#C0392B)', skills: ['React','Vue.js','TypeScript','Webpack'],        students: '320+', exp: '9+',  company: '80+ Sayt', bio: "80+ veb sayt va 3 ta startup mahsulotini yaratgan. React va TypeScript bo'yicha O'zbekistondagi eng yosh senior mutaxassis." },
]

const TESTIMONIALS = [
  { name: 'Muhammad Amin',    role: 'Backend Developer → Google',      emoji: '👨‍💼', color: 'linear-gradient(135deg,#00C9B1,#00E5FF)', start: "Python hech narsani bilmasdan boshladi",           mid: "3 oyda Backend malakalarini o'rgandi, API yaratdi",  end: "Google Senior Developer — oylik 7 mln so'm",   quote: '"Joylinks nafaqat texnologiya balkim o\'z-o\'ziga ishonch berdi!"', rating: 5 },
  { name: 'Feruza Xalimova',  role: 'Grafik Designer → Startup Lead',  emoji: '👩‍🎨', color: 'linear-gradient(135deg,#FFD166,#FF9F43)', start: "Photoshop ni biladimi ham bilmasdi",               mid: "5 oyda Senior Designer sifatida startupga kirdi",    end: "Startup Design Lead — 4 mln + options",        quote: '"Joylinks tungi quloq bo\'lib mentoring berdi!"', rating: 5 },
  { name: 'Sherzod Rahimov',  role: 'IELTS 5.5 → 8.0 → Oxford',       emoji: '🎓',   color: 'linear-gradient(135deg,#1dd1a1,#00b894)', start: "IELTS 5.5 bal bilan qo'rqib turdi",               mid: "3 oyda 7.0 dan 8.0 ga ko'tarildi",               end: "Oxford University — stipendiya bilan",         quote: '"Sardor o\'qituvchining darslarida inglizcha yoqdi boshladi!"', rating: 5 },
  { name: 'Aziz Normatov',    role: 'Grafik dizayn bitiruvchisi',       emoji: '🧑‍🎨', color: 'linear-gradient(135deg,#b66dff,#6c63ff)', start: "Kompyuter va Photoshop dan umuman xabar yo'q",    mid: '6 oy ichida 50+ brend dizayni yaratdi',             end: 'Hozir Dubayda Senior Designer — $3000/oy',     quote: '"Madina domla meni dizayner qildi, Joylinks esa kelajagimni!"', rating: 5 },
]

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function HorizontalScrollSection() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const panelsRef  = useRef([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [modalVisible,    setModalVisible]    = useState(false)

  /* ── HORIZONTAL SCROLL GSAP ── */
  useEffect(() => {
    const panels = panelsRef.current.filter(Boolean)
    if (!panels.length || !trackRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current.scrollWidth - window.innerWidth

      /* ── main horizontal tween ── */
      const horizontalTween = gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.1}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /* ── panel inner fade-in (only when horizontalTween exists) ── */
      if (horizontalTween) {
        panels.forEach((panel) => {
          const inner = panel.querySelector('.panel-inner')
          if (!inner) return
          gsap.fromTo(inner,
            { x: 80, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 1, ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: 'left 90%',
                end:   'left 30%',
                toggleActions: 'play none none reverse',
              },
            })
        })

        /* ── panel BG parallax ── */
        panels.forEach((panel) => {
          const bg = panel.querySelector('.panel-bg')
          if (!bg) return
          gsap.to(bg, {
            x: -60, ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: 'left right',
              end:   'right left',
              scrub: 2,
            },
          })
        })

        /* ── course cards stagger ── */
        const courseCards = sectionRef.current.querySelectorAll('.course-card-item')
        courseCards.forEach((card, i) => {
          gsap.fromTo(card,
            { y: 50, opacity: 0, rotationY: 15 },
            {
              y: 0, opacity: 1, rotationY: 0, duration: .7, delay: i * .08, ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 85%',
              },
            })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ── 3D TILT ── */
  const tilt   = (e, el) => {
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - .5
    const y = (e.clientY - r.top)  / r.height - .5
    gsap.to(el, { rotationY: x * 18, rotationX: -y * 13, scale: 1.04, duration: .35, ease: 'power2.out', transformPerspective: 900 })
  }
  const untilt = el => gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: .5, ease: 'power2.out' })

  const openTeacher = (t) => {
    setSelectedTeacher(t)
    setModalVisible(true)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setModalVisible(false)
    setTimeout(() => setSelectedTeacher(null), 400)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* ════════════════════════════════════════════
          HORIZONTAL SCROLL WRAPPER
      ════════════════════════════════════════════ */}
      <div ref={sectionRef} style={hStyles.wrapper}>
        <div ref={trackRef} style={hStyles.track}>

          {/* ── PANEL 0: INTRO LABEL ── */}
          <div ref={el => panelsRef.current[0] = el} style={{ ...hStyles.panel, ...hStyles.introPanel }}>
            <div className="panel-bg" style={hStyles.panelBgGrad} />
            <div className="panel-inner" style={hStyles.introPanelInner}>
              <div style={hStyles.panelLabel}>📚 KURSLAR</div>
              <h2 style={hStyles.panelH2}>
                Hozirgi Bozorda<br />
                <span className="g">Talab Qiladigan</span><br />
                Kurslar
              </h2>
              <p style={hStyles.panelSub}>8 maxsus kurs | Sertifikatsiya | Real proyektlar | Ish bilan ta'minlash</p>
              <div style={hStyles.scrollHint}>
                <span style={hStyles.scrollArrow}>→</span>
                <span style={{ fontSize: 13, color: '#6da9c8', letterSpacing: 2 }}>SCROLL DOWN</span>
              </div>
            </div>
          </div>

          {/* ── PANEL 1: COURSES ── */}
          <div ref={el => panelsRef.current[1] = el} style={{ ...hStyles.panel, width: '220vw' }}>
            <div className="panel-bg" style={{ ...hStyles.panelBgGrad, background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(0,201,177,.05),transparent)' }} />
            <div className="panel-inner" style={hStyles.coursesGrid}>
              {COURSES.map((c) => (
                <div key={c.id} className="course-card-item glass" style={{ ...hStyles.courseCard }}
                  onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                  <div style={{ ...hStyles.cardImgOverlay, backgroundImage: `url(${c.img})` }} />
                  <div style={{ ...hStyles.glowBar, background: c.grad }} />
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <div style={hStyles.durBadge}>
                      <span style={{ color: c.color, fontFamily: 'Orbitron', fontWeight: 900, fontSize: 18 }}>{c.dur.split(' ')[0]}</span>
                      <span style={{ fontSize: 9, color: '#6da9c8', display: 'block', letterSpacing: 1 }}>{c.dur.includes('oy') ? 'OY' : c.dur.toUpperCase()}</span>
                    </div>
                    <span style={{ ...hStyles.badge, color: c.color, borderColor: `${c.color}44` }}>{c.badge}</span>
                    <h3 style={hStyles.cardTitle}>{c.title}</h3>
                    <div style={{ ...hStyles.cardSub, color: c.color }}>{c.sub}</div>
                    <p style={hStyles.cardDesc}>{c.desc}</p>
                    <div style={hStyles.priceTag}>💰 {c.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PANEL 2: TEACHERS ── */}
          <div ref={el => panelsRef.current[2] = el} style={{ ...hStyles.panel, width: '180vw', background: 'linear-gradient(180deg,transparent,rgba(5,20,40,.5),transparent)' }}>
            <div className="panel-bg" style={{ ...hStyles.panelBgGrad, background: 'radial-gradient(ellipse 50% 70% at 70% 50%, rgba(0,100,255,.04),transparent)' }} />
            <div className="panel-inner" style={{ width: '100%', padding: '80px 56px' }}>
              <div style={hStyles.panelHeader}>
                <div style={hStyles.panelLabel}>🌟 O'QITUVCHILAR</div>
                <h2 style={hStyles.panelH2}>Mutaxassislarga <span className="g">Ishonch Qiling</span></h2>
                <p style={hStyles.panelSub}>50+ malakali o'qituvchi | Xalqaro sertifikatlar | 10-15+ yil real tajriba</p>
              </div>
              <div style={hStyles.teachersGrid}>
                {TEACHERS.map((t, i) => (
                  <div key={i} className="glass" style={hStyles.teacherCard}
                    onClick={() => openTeacher(t)}
                    onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                    <div style={{ ...hStyles.glowBar, background: t.grad }} />
                    <div style={{ position: 'relative', marginBottom: 16 }}>
                      <div style={hStyles.tAvRing} />
                      <div style={{ ...hStyles.tAv, background: t.grad }}>{t.emoji}</div>
                      <div style={hStyles.tBadge}>{t.badge}</div>
                    </div>
                    <h3 style={hStyles.tName}>{t.name}</h3>
                    <div style={{ ...hStyles.tRole, color: t.color }}>{t.role}</div>
                    <div style={hStyles.tRating}>⭐⭐⭐⭐⭐ <span style={{ color: '#ffd700', fontFamily: 'Orbitron', fontSize: 13 }}>{t.rating}</span></div>
                    <div style={hStyles.tSkills}>
                      {t.skills.map(s => <span key={s} style={{ ...hStyles.sk, color: t.color, borderColor: `${t.color}33` }}>{s}</span>)}
                    </div>
                    <div style={hStyles.tFooter}>
                      {[['students',"O'quvchi"],['exp','Yil'],['company','Tajriba']].map(([k,lbl]) => (
                        <div key={k} style={{ textAlign: 'center' }}>
                          <div style={{ ...hStyles.tfNum, color: t.color }}>{t[k]}</div>
                          <div style={hStyles.tfLbl}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                    <div style={hStyles.clickHint}>Batafsil ko'rish →</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── PANEL 3: TESTIMONIALS ── */}
          <div ref={el => panelsRef.current[3] = el} style={{ ...hStyles.panel, width: '160vw' }}>
            <div className="panel-bg" style={{ ...hStyles.panelBgGrad, background: 'radial-gradient(ellipse 60% 60% at 40% 60%, rgba(0,229,255,.04),transparent)' }} />
            <div className="panel-inner" style={{ width: '100%', padding: '80px 56px' }}>
              <div style={hStyles.panelHeader}>
                <div style={hStyles.panelLabel}>🏆 MUVAFFAQIYAT</div>
                <h2 style={hStyles.panelH2}>Bitiruvchilar <span className="g">Real Natijalari</span></h2>
                <p style={hStyles.panelSub}>95% sertifikat | 85% 3 oyda ish | 4.9/5 baholash | 2-7M oylik</p>
              </div>
              <div style={hStyles.testiGrid}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="glass" style={hStyles.testiCard}
                    onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                    <div style={{ ...hStyles.glowBar, background: t.color }} />
                    <div style={{ position: 'relative', zIndex: 3 }}>
                      <div style={{ ...hStyles.testiAv, background: t.color }}>{t.emoji}</div>
                      <div style={hStyles.testiName}>{t.name}</div>
                      <div style={hStyles.testiRole}>{t.role}</div>
                      <div style={hStyles.stars}>{'★'.repeat(t.rating)}</div>
                      <div style={{ marginTop: 20 }}>
                        {[['Boshlanish',t.start,false],['Jarayon',t.mid,false],['Hozir ✅',t.end,true]].map(([lbl,txt,ok]) => (
                          <div key={lbl} style={hStyles.tlItem}>
                            <div style={{ ...hStyles.tlDot, background: ok ? '#00C9B1' : '#6da9c8', boxShadow: ok ? '0 0 10px #00C9B1' : 'none' }} />
                            <div>
                              <div style={hStyles.tlLbl}>{lbl}</div>
                              <div style={hStyles.tlTxt}>{txt}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={hStyles.testiQuote}>{t.quote}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>{/* end track */}
      </div>{/* end wrapper */}

      {/* ══════════════════════════════
          TEACHER MODAL
      ══════════════════════════════ */}
      {selectedTeacher && (
        <div
          style={{ ...hStyles.modalOverlay, opacity: modalVisible ? 1 : 0, pointerEvents: modalVisible ? 'all' : 'none' }}
          onClick={closeModal}
        >
          <div
            style={{ ...hStyles.modal, transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(.85) translateY(40px)' }}
            onClick={e => e.stopPropagation()}
          >
            <button style={hStyles.modalClose} onClick={closeModal}>✕</button>
            <div style={{ ...hStyles.modalAv, background: selectedTeacher.grad }}>{selectedTeacher.emoji}</div>
            <h2 style={hStyles.modalName}>{selectedTeacher.name}</h2>
            <div style={{ ...hStyles.modalRole, color: selectedTeacher.color }}>{selectedTeacher.role}</div>
            <p style={hStyles.modalBio}>{selectedTeacher.bio}</p>
            <div style={hStyles.modalAchs}>
              {[["O'quvchilar",selectedTeacher.students],['Tajriba (yil)',selectedTeacher.exp],['Kompaniya',selectedTeacher.company],['Reyting',selectedTeacher.rating+'/5']].map(([l,v]) => (
                <div key={l} style={hStyles.modalAch}>
                  <span style={{ ...hStyles.achNum, color: selectedTeacher.color }}>{v}</span>
                  <span style={hStyles.achLbl}>{l}</span>
                </div>
              ))}
            </div>
            <div style={hStyles.modalSkills}>
              {selectedTeacher.skills.map(s => (
                <span key={s} style={{ ...hStyles.sk, color: selectedTeacher.color, borderColor: `${selectedTeacher.color}44`, padding: '6px 16px', fontSize: 13 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */
const hStyles = {
  wrapper:        { position: 'relative', overflow: 'hidden', zIndex: 10 },
  track:          { display: 'flex', flexDirection: 'row', alignItems: 'stretch', willChange: 'transform' },
  panel:          { position: 'relative', minWidth: '100vw', height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', overflow: 'hidden' },
  introPanel:     { minWidth: '60vw', background: 'linear-gradient(135deg, rgba(0,20,50,.9), rgba(0,10,30,.95))', borderRight: '1px solid rgba(0,229,255,.1)' },
  panelBgGrad:    { position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 },
  introPanelInner:{ padding: '0 80px', position: 'relative', zIndex: 2 },
  panelLabel:     { fontFamily: 'Orbitron, monospace', fontSize: 11, letterSpacing: 4, color: '#00C9B1', textTransform: 'uppercase', marginBottom: 16, padding: '5px 14px', borderLeft: '3px solid #00C9B1', display: 'inline-block' },
  panelH2:        { fontFamily: 'Orbitron, monospace', fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 18, color: '#fff' },
  panelSub:       { color: '#6da9c8', fontSize: 15, maxWidth: 440, lineHeight: 1.65, marginBottom: 40 },
  scrollHint:     { display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 },
  scrollArrow:    { fontSize: 28, color: '#00C9B1', display: 'inline-block' },
  panelHeader:    { marginBottom: 48, maxWidth: 700 },
  coursesGrid:    { display: 'grid', gridTemplateColumns: 'repeat(4, 320px)', gridTemplateRows: 'repeat(2, 1fr)', gap: 22, padding: '0 56px', height: '85vh', alignContent: 'center', position: 'relative', zIndex: 2 },
  courseCard:     { padding: '26px 24px', cursor: 'pointer', position: 'relative', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)', backdropFilter: 'blur(20px)', borderRadius: 20, overflow: 'hidden', transition: 'all .4s' },
  cardImgOverlay: { position: 'absolute', inset: 0, borderRadius: 20, backgroundSize: 'cover', backgroundPosition: 'center', opacity: .07 },
  glowBar:        { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '20px 20px 0 0', opacity: .7, zIndex: 4 },
  durBadge:       { position: 'absolute', top: 18, right: 18, textAlign: 'right' },
  badge:          { display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10, background: 'rgba(255,255,255,.05)', border: '1px solid', fontFamily: 'Rajdhani' },
  cardTitle:      { fontFamily: 'Orbitron, monospace', fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 6 },
  cardSub:        { fontSize: 12, fontWeight: 600, marginBottom: 10, fontFamily: 'Rajdhani' },
  cardDesc:       { fontSize: 12, color: '#6da9c8', lineHeight: 1.6, marginBottom: 14 },
  priceTag:       { fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, color: '#ffd700' },
  teachersGrid:   { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 },
  teacherCard:    { padding: '24px 18px', textAlign: 'center', cursor: 'pointer', transition: 'all .4s', position: 'relative' },
  tAvRing:        { position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(0,201,177,.35)', width: 84, height: 84 },
  tAv:            { width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', margin: '0 auto', position: 'relative', zIndex: 1 },
  tBadge:         { position: 'absolute', top: -4, right: -4, background: 'rgba(0,0,0,.8)', border: '1px solid rgba(0,201,177,.3)', borderRadius: 20, padding: '3px 8px', fontSize: 9, color: '#00C9B1', fontWeight: 700, backdropFilter: 'blur(8px)' },
  tName:          { fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 900, color: '#fff', marginBottom: 4, marginTop: 14 },
  tRole:          { fontSize: 11, fontWeight: 600, marginBottom: 10, fontFamily: 'Rajdhani', letterSpacing: 1 },
  tRating:        { fontSize: 12, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' },
  tSkills:        { display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 12 },
  sk:             { fontSize: 10, border: '1px solid', padding: '3px 8px', borderRadius: 4, fontWeight: 600, background: 'rgba(255,255,255,.04)' },
  tFooter:        { display: 'flex', justifyContent: 'space-around', paddingTop: 12, borderTop: '1px solid rgba(0,201,177,.1)', marginTop: 8 },
  tfNum:          { fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700 },
  tfLbl:          { fontSize: 9, color: '#6da9c8', textTransform: 'uppercase', letterSpacing: 1 },
  clickHint:      { display: 'inline-block', marginTop: 12, padding: '5px 14px', borderRadius: 20, fontSize: 10, fontFamily: 'Rajdhani', fontWeight: 700, letterSpacing: .5, background: 'rgba(0,201,177,.08)', border: '1px solid rgba(0,201,177,.2)', color: '#00C9B1' },
  testiGrid:      { display: 'grid', gridTemplateColumns: 'repeat(4, 320px)', gap: 22, alignItems: 'start' },
  testiCard:      { padding: '28px 24px', cursor: 'default', position: 'relative' },
  testiAv:        { width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 12 },
  testiName:      { fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, color: '#fff' },
  testiRole:      { fontSize: 11, color: '#00C9B1', marginBottom: 6 },
  stars:          { color: '#ffd700', fontSize: 14, letterSpacing: 2 },
  tlItem:         { display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  tlDot:          { width: 12, height: 12, borderRadius: '50%', flexShrink: 0, marginTop: 3 },
  tlLbl:          { fontWeight: 700, fontSize: 11, color: '#fff', marginBottom: 2 },
  tlTxt:          { fontSize: 11, color: '#6da9c8', lineHeight: 1.55 },
  testiQuote:     { color: '#00C9B1', fontStyle: 'italic', fontSize: 12, marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,201,177,.12)', lineHeight: 1.65 },
  modalOverlay:   { position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, transition: 'opacity .4s' },
  modal:          { background: 'linear-gradient(135deg,rgba(4,18,46,.97),rgba(2,8,24,.97))', border: '1px solid rgba(0,201,177,.25)', borderRadius: 22, padding: '48px 44px', maxWidth: 640, width: '100%', position: 'relative', transition: 'transform .4s cubic-bezier(.2,1.4,.5,1), opacity .4s', boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 60px rgba(0,201,177,.1)', maxHeight: '90vh', overflowY: 'auto' },
  modalClose:     { position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: '#6da9c8', fontSize: '1.4rem', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalAv:        { width: 100, height: 100, borderRadius: '50%', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 0 30px rgba(0,201,177,.4), 0 0 60px rgba(0,201,177,.2)' },
  modalName:      { fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', textAlign: 'center', color: '#fff', marginBottom: 5 },
  modalRole:      { textAlign: 'center', fontFamily: 'Rajdhani', fontSize: '.9rem', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 },
  modalBio:       { color: '#6da9c8', lineHeight: 1.75, marginBottom: 24, fontSize: '.92rem', textAlign: 'center' },
  modalAchs:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 },
  modalAch:       { background: 'rgba(0,201,177,.05)', border: '1px solid rgba(0,201,177,.12)', borderRadius: 12, padding: '14px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  achNum:         { fontFamily: 'Orbitron, monospace', fontSize: '1.6rem', display: 'block', marginBottom: 4 },
  achLbl:         { fontSize: '.75rem', color: '#6da9c8' },
  modalSkills:    { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
}