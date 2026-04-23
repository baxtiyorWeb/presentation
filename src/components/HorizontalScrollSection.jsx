import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaCode, FaServer, FaShieldAlt, FaPaintBrush, FaGlobeAmericas, FaBrain,
  FaDesktop, FaComments, FaStar, FaQuoteLeft, FaTimes, FaGraduationCap,
  FaLinkedin, FaTelegram, FaChalkboardTeacher, FaAward, FaUsers
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
  {
    name: 'Refatbek Arolov', role: 'Direktor', badge: '👔 DIREKTOR', emoji: '🧑‍💼',
    rating: '5.0', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)',
    skills: ['Kompyuter savodxonligi', 'Prompt Engineering', 'Biznes strategiya', 'Liderlik'],
    students: '1000+', exp: '10+', company: 'Joylinks',
    bio: "Joylinks IT va Biznes Akademiyasining asoschisi va direktori. 10+ yil davomida O'zbekiston IT ta'lim sohasida inqilob qildi.",
    fullBio: "Refatbek Arolov — Joylinks IT va Biznes Akademiyasining muassisi va bosh direktori. U 10 yildan ortiq vaqt davomida O'zbekistonda IT ta'limini rivojlantirish yo'lida mehnат qilmoqda. Uning rahbarligida 1000+ talaba kasbiy sohalarda muvaffaqiyatga erishdi. Kompyuter savodxonligi va Prompt Engineering bo'yicha original metodologiya ishlab chiqqan.",
    achievements: ["Joylinks IT Academy asoschisi", "1000+ o'quvchi tayyorladi", "Xalqaro hamkorliklar o'rnatdi", "Innovatsion o'qitish metodlari muallifi"],
    contact: { telegram: '@refatbek_arolov', email: 'direktor@joylinks.uz' }
  },
  {
    name: 'Behruz Karimov', role: "O'qituvchi", badge: '💻 IT', emoji: '👨‍💻',
    rating: '4.9', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)',
    skills: ['MS Word', 'MS Excel', 'PowerPoint', 'Internet', 'Google Tools'],
    students: '500+', exp: '5+', company: 'Joylinks',
    bio: "Kompyuter savodxonligi bo'yicha tajribali o'qituvchi. 5 yildan ziyod Joylinks akademiyasida faoliyat ko'rsatmoqda.",
    fullBio: "Behruz Karimov — Kompyuter savodxonligi yo'nalishi bo'yicha sertifikatlangan mutaxassis. U Microsoft Office dasturlari, internet texnologiyalari va Google xizmatlari bo'yicha 500+ o'quvchiga ta'lim berdi. Har bir o'quvchiga individual yondashuvi uni talabalar orasida eng sevimli ustoz qildi.",
    achievements: ["Microsoft Office mutaxassisi", "500+ bitiruvchi", "Eng yaxshi o'qituvchi mukofoti 2023", "Yangi o'qitish dasturlarini ishlab chiqdи"],
    contact: { telegram: '@behruz_karimov', email: 'behruz@joylinks.uz' }
  },
  {
    name: 'Umid Mamatraximov', role: "O'qituvchi", badge: 'FRONT-END', emoji: '⚡',
    rating: '4.9', color: '#FF6B6B', grad: 'linear-gradient(135deg,#E74C3C,#C0392B)',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'IT Foundation'],
    students: '300+', exp: '4+', company: 'Joylinks',
    bio: "Front-end dasturlash va IT Foundation yo'nalishlari bo'yicha professional o'qituvchi.",
    fullBio: "Umid Mamatraximov — zamonaviy web texnologiyalar bo'yicha yosh va energiyali mutaxassis. U HTML5, CSS3, JavaScript va React.js bo'yicha 300+ talabaga amaliy ko'nikmalar o'rgatdi. Uning darslarida nazariya va amaliyot uyg'unligi o'quvchilarni tez sur'atda o'stiradi.",
    achievements: ["React.js sertifikatlangan dasturchi", "300+ veb-dasturchilar tayyorladi", "IT Foundation dasturini ishlab chiqdi", "Talabalar keysi: 80% birinchi loyiha"],
    contact: { telegram: '@umid_front', email: 'umid@joylinks.uz' }
  },
  {
    name: 'Jahongir Omonov', role: "O'qituvchi", badge: 'BACK-END', emoji: '⚙️',
    rating: '4.9', color: '#1dd1a1', grad: 'linear-gradient(135deg,#1dd1a1,#00b894)',
    skills: ['Python', 'Django', 'REST API', 'PostgreSQL', 'Docker'],
    students: '300+', exp: '4+', company: 'Joylinks',
    bio: "Server tomonidagi dasturlash va ma'lumotlar bazasi bo'yicha kuchli mutaxassis.",
    fullBio: "Jahongir Omonov — backend texnologiyalari bo'yicha chuqur bilimga ega dasturchi-o'qituvchi. Python, Django va REST API orqali real tarmoq loyihalarini yaratishni o'rgatadi. PostgreSQL va Docker ko'nikmalarni o'quvchilarga muvaffaqiyatli o'tkazadi. Uning talabalari bugun Samarqand va Toshkentning yetakchi kompaniyalarida ishlashmoqda.",
    achievements: ["Django sertifikatlangan mutaxassis", "300+ backend dasturchilar", "Docker & DevOps kursini yaratdi", "Server arxitekturasi bo'yicha loyihalar"],
    contact: { telegram: '@jahongir_backend', email: 'jahongir@joylinks.uz' }
  },
  {
    name: 'Samandar Qurbonov', role: "O'qituvchi", badge: 'FRONT-END', emoji: '🖥️',
    rating: '4.8', color: '#a29bfe', grad: 'linear-gradient(135deg,#5F27CD,#8E44AD)',
    skills: ['HTML/CSS', 'JavaScript', 'Figma', 'Responsive Design', 'UI/UX'],
    students: '400+', exp: '4+', company: 'Joylinks',
    bio: "Web dizayn va front-end dasturlash sohasida keng tajribaga ega ustoz.",
    fullBio: "Samandar Qurbonov — web dizayn va front-end yo'nalishining ustasi. Figma, Adobe XD va responsive dizayn bo'yicha 400+ talabaga bilim ulashdi. Uning o'quvchilari faqat kod yozibgina qolmay, zamonaviy va chiroyli veb-interfeys yaratishni ham o'rganadi.",
    achievements: ["Figma sertifikatlangan dizayner", "400+ web dasturchilar tayyorladi", "UI/UX kursini ishlab chiqdi", "30+ real veb-sayt loyihalariga rahbarlik"],
    contact: { telegram: '@samandar_web', email: 'samandar@joylinks.uz' }
  },
  {
    name: 'Elshodbek Rakhmonov', role: "O'qituvchi", badge: 'FOUNDATION', emoji: '🚀',
    rating: '4.8', color: '#ff9ff3', grad: 'linear-gradient(135deg,#f368e0,#ff9ff3)',
    skills: ['IT Asoslari', 'Algoritmlar', 'Mantiqiy Fikrlash', 'Python Boshlang\'ich'],
    students: '200+', exp: '3+', company: 'Joylinks',
    bio: "IT sohasiga yangi kirayotganlar uchun eng yaxshi murabbiy. Noldan IT ga yo'l ko'rsatadi.",
    fullBio: "Elshodbek Rakhmonov — IT Foundation yo'nalishining jonkuyar o'qituvchisi. U IT bo'yicha hech qanday bilimga ega bo'lmagan talabalarni 3-4 oy ichida asosiy texnik ko'nikmalar bilan qurollantiradi. Mantiqiy fikrlash va algoritmik tafakkurni rivojlantirishda maxsus metodologiyadan foydalanadi.",
    achievements: ["IT Foundation metodologiyasi muallifi", "200+ IT sohibi tayyorladi", "0-dan IT ga yo'l dasturi", "Yosh o'qituvchilar orasida eng ijodiy"],
    contact: { telegram: '@elshod_it', email: 'elshod@joylinks.uz' }
  },
  {
    name: "Nafisa Ro'ziyeva", role: "O'qituvchi", badge: 'SAVODXONLIK', emoji: '👩‍🏫',
    rating: '4.9', color: '#48dbfb', grad: 'linear-gradient(135deg,#0abde3,#48dbfb)',
    skills: ['MS Excel (Advanced)', 'MS Word', '1C Dasturi', 'Internet', 'Email'],
    students: '600+', exp: '6+', company: 'Joylinks',
    bio: "Kompyuter savodxonligi bo'yicha Joylinks akademiyasidagi eng ko'p tajribaga ega ustoz.",
    fullBio: "Nafisa Ro'ziyeva — Joylinks akademiyasining eng tajribali o'qituvchilaridan biri. 6 yil davomida 600+ talabaga kompyuter savodxonligini o'rgatdi. MS Excel ning murakkab formulalari, 1C dasturi va raqamli ko'nikmalar bo'yicha chuqur bilimga ega. Xotin-qizlar va ayollar uchun maxsus guruhlar tashkil qiladi.",
    achievements: ["600+ talabani sertifikatladi", "Ayollar IT guruhlari tashkilotchisi", "MS Excel Expert sertifikati", "Eng ko'p tavsiya qilingan o'qituvchi"],
    contact: { telegram: '@nafisa_teacher', email: 'nafisa@joylinks.uz' }
  },
  {
    name: 'Abbos Xushboqov', role: "O'qituvchi", badge: '🛡️ SECURITY', emoji: '🛡️',
    rating: '5.0', color: '#ff6b6b', grad: 'linear-gradient(135deg,#ee5253,#ff6b6b)',
    skills: ['Ethical Hacking', 'Penetration Testing', 'Linux', 'OWASP', 'Kriptografiya'],
    students: '150+', exp: '5+', company: 'Joylinks',
    bio: "Kiberxavfsizlik sohasida maxsus sertifikatga ega bo'lgan professional mutaxassis.",
    fullBio: "Abbos Xushboqov — kiberxavfsizlik sohasining tajribali mutaxassisi. CEH (Certified Ethical Hacker) sertifikatiga ega bo'lib, 5 yil davomida davlat va xususiy tarmoqlarni himoya qilishda ishtirok etgan. Joylinks akademiyasida 150+ talabaga axborot xavfsizligi sir-asrorlarini o'rgatmoqda.",
    achievements: ["CEH (Certified Ethical Hacker) sertifikati", "150+ kiberxavfsizlik mutaxassislari", "Penetration Testing kursi muallifi", "Milliy kiberxavfsizlik musobaqasi g'olibi"],
    contact: { telegram: '@abbos_security', email: 'abbos@joylinks.uz' }
  },
  {
    name: 'Dilnoza Shamshiddinova', role: "O'qituvchi", badge: '🇬🇧 ENGLISH', emoji: '🇬🇧',
    rating: '4.9', color: '#feca57', grad: 'linear-gradient(135deg,#ff9f43,#feca57)',
    skills: ['IELTS tayyorgarlik', 'IT English', 'Business English', 'Speaking Club'],
    students: '500+', exp: '5+', company: 'Joylinks',
    bio: "IT mutaxassislari uchun ingliz tili — texnik lug'at va professional muloqot.",
    fullBio: "Dilnoza Shamshiddinova — ingliz tilini IT kontekstida o'rgatishda ixtisoslashgan pedagog. IELTS Academic va General bo'yicha 500+ talabani muvaffaqiyatga olib chiqdi. Texnik ingliz tili, intervyu tayyorgarlik va xalqaro ish muhiti uchun kommunikatsiya ko'nikmalarini rivojlantiradi.",
    achievements: ["IELTS Band 8.0 ball egasi", "500+ talaba IELTS maqsadiga yetdi", "IT English metodologiyasi muallifi", "Xalqaro konferensiyalarda qatnashdi"],
    contact: { telegram: '@dilnoza_english', email: 'dilnoza@joylinks.uz' }
  },
]

const TESTIMONIALS = [
  { name: 'Ozodbek Ruziboyev', role: 'Bitiruvchi', emoji: '👨‍🎓', color: '#00C9B1', grad: 'linear-gradient(135deg,#00C9B1,#00E5FF)', salary: 'MUVAFFAQIYATLI', start: "Noldan boshladi", mid: "Jadal o'rganish va loyihalar", end: "Hozirda kuchli mutaxassis", quote: '"Joylinks men uchun kelajak eshiklarini ochdi!"', rating: 5 },
  { name: 'Mamatov Musulmon', role: 'Bitiruvchi', emoji: '🚀', color: '#FFD166', grad: 'linear-gradient(135deg,#FFD166,#FF9F43)', salary: 'KURS BITIRUVCHISI', start: "IT haqida tushuncham yo'q edi", mid: "Ajoyib muhitda ta'lim", end: "Hozirda dasturchi bo'lib yetishdi", quote: '"Eng zo\'r ustozlar va muhit shu yerda!"', rating: 5 },
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
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Cards appear one by one - NO skew, NO rotation, clean & smooth
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.88, y: 30 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 96%',
            toggleActions: 'play none none reverse',
          },
        }
      )
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
  const [activeTab, setActiveTab] = useState('about')

  const cSecRef = useRef(null); const cTrkRef = useRef(null)
  const tSecRef = useRef(null); const tTrkRef = useRef(null)
  const stSecRef = useRef(null); const stTrkRef = useRef(null)
  const modalRef = useRef(null)
  const modalContentRef = useRef(null)

  usePinnedHScroll(cSecRef, cTrkRef)
  usePinnedHScroll(tSecRef, tTrkRef)
  usePinnedHScroll(stSecRef, stTrkRef)

  /* modal GSAP entry animation */
  useEffect(() => {
    if (modalVisible && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.88, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }
      )
      if (modalContentRef.current) {
        const els = [...modalContentRef.current.children]
        gsap.fromTo(els,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', delay: 0.15 }
        )
      }
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

  /* Hover glow on card - no tilt, just smooth scale */
  const hoverIn = el => gsap.to(el, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
  const hoverOut = el => gsap.to(el, { scale: 1, duration: 0.4, ease: 'power2.out' })

  const open = t => {
    setSelectedTeacher(t)
    setActiveTab('about')
    setModalVisible(true)
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.9, y: 40, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setModalVisible(false)
          setSelectedTeacher(null)
          document.body.style.overflow = ''
        }
      })
    } else {
      setModalVisible(false)
      setSelectedTeacher(null)
      document.body.style.overflow = ''
    }
  }

  return (
    <>
      <style>{`
        @keyframes arrowBounce { 0%,100%{transform:translateX(0);opacity:1} 50%{transform:translateX(10px);opacity:.5} }
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.4} }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .h-card { transform-style: flat !important; }
        .h-card:hover .glow-bar { opacity: 1 !important; }
        .modal-tab { transition: all 0.25s; }
        .modal-tab:hover { background: rgba(255,255,255,0.08) !important; }
        .achievement-item { transition: transform 0.2s; }
        .achievement-item:hover { transform: translateX(4px); }
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
                onMouseEnter={e => hoverIn(e.currentTarget)} onMouseLeave={e => hoverOut(e.currentTarget)}>
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
          <p style={S.sub}>9 malakali o'qituvchi · Xalqaro sertifikatlar · Real tajriba</p>
        </div>
        <div style={S.viewport}>
          <div ref={tTrkRef} style={S.track}>
            {TEACHERS.map((t, i) => (
              <div key={i} className="h-card glass" style={S.tCard}
                onClick={() => open(t)}
                onMouseEnter={e => hoverIn(e.currentTarget)} onMouseLeave={e => hoverOut(e.currentTarget)}>
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
                  {t.skills.slice(0, 3).map(sk => <span key={sk} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.color}33`, background: 'rgba(255,255,255,.04)', fontFamily: 'Rajdhani', fontWeight: 700, color: t.color }}>{sk}</span>)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.07)' }}>
                  {[['students', "O'quvchi"], ['exp', 'Yil'], ['company', 'Manzil']].map(([k, l]) => (
                    <div key={k} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: t.color }}>{t[k]}</div>
                      <div style={{ fontSize: 9, color: '#6da9c8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: 3 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 14, padding: '8px 16px', borderRadius: 20, fontSize: 12, fontFamily: 'Rajdhani', fontWeight: 700, background: `${t.color}15`, border: `1px solid ${t.color}33`, color: t.color, gap: 6 }}>
                  <span>Batafsil ko'rish</span><span>→</span>
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
                onMouseEnter={e => hoverIn(e.currentTarget)} onMouseLeave={e => hoverOut(e.currentTarget)}>
                <div className="glow-bar" style={{ ...S.topBar, background: t.grad, opacity: .85 }} />
                <div style={{ ...S.salBadge, background: t.grad }}>{t.salary}</div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 14, boxShadow: '0 6px 24px rgba(0,0,0,.5)' }}>{t.emoji}</div>
                <h3 style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(12px,1vw,14px)', fontWeight: 900, color: '#fff', marginBottom: 4 }}>{t.name}</h3>
                <div style={{ color: t.color, fontSize: 13, fontFamily: 'Rajdhani', fontWeight: 700, marginBottom: 12 }}>{t.role}</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>{[...Array(t.rating)].map((_, j) => <FaStar key={j} style={{ color: '#ffd700', fontSize: '1rem' }} />)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[['🏁 Boshlanish', t.start, false], ['⚡ Jarayon', t.mid, false], ['✅ Hozir', t.end, true]].map(([lbl, txt, ok]) => (
                    <div key={lbl} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 13, height: 13, borderRadius: '50%', flexShrink: 0, marginTop: 3, background: ok ? '#00C9B1' : '#334', boxShadow: ok ? '0 0 12px #00C9B1' : 'none', border: `2px solid ${ok ? '#00C9B1' : '#445'}`, animation: ok ? 'pulseDot 2s infinite' : 'none' }} />
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
        <div
          style={{ ...S.overlay, opacity: modalVisible ? 1 : 0, pointerEvents: modalVisible ? 'all' : 'none' }}
          onClick={close}
        >
          <div ref={modalRef} style={S.modal} onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button style={S.mClose} onClick={close}><FaTimes /></button>

            {/* Top gradient bar */}
            <div style={{ ...S.modalTopBar, background: selectedTeacher.grad }} />

            {/* Content */}
            <div ref={modalContentRef} style={{ position: 'relative', zIndex: 2 }}>

              {/* Hero section */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                  <div style={{ width: 110, height: 110, borderRadius: '50%', background: selectedTeacher.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.4rem', boxShadow: `0 0 40px ${selectedTeacher.color}55, 0 0 80px ${selectedTeacher.color}22` }}>{selectedTeacher.emoji}</div>
                  <div style={{ position: 'absolute', bottom: 2, right: 2, width: 24, height: 24, borderRadius: '50%', background: '#00C9B1', border: '2px solid #020b18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</div>
                </div>
                <h2 style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: '#fff', marginBottom: 6 }}>{selectedTeacher.name}</h2>
                <div style={{ fontFamily: 'Rajdhani', fontSize: '1rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: selectedTeacher.color, marginBottom: 14 }}>{selectedTeacher.role} · {selectedTeacher.badge}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center', marginBottom: 8 }}>
                  {[...Array(5)].map((_, i) => <FaStar key={i} style={{ color: '#ffd700', fontSize: '1.1rem' }} />)}
                  <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '1.1rem', fontWeight: 900, color: '#ffd700', marginLeft: 8 }}>{selectedTeacher.rating}/5</span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
                {[
                  { icon: <FaUsers />, val: selectedTeacher.students, lbl: "O'quvchilar" },
                  { icon: <FaAward />, val: selectedTeacher.exp + ' yil', lbl: 'Tajriba' },
                  { icon: <FaGraduationCap />, val: selectedTeacher.company, lbl: 'Muassasa' }
                ].map(({ icon, val, lbl }) => (
                  <div key={lbl} style={{ background: `${selectedTeacher.color}10`, border: `1px solid ${selectedTeacher.color}30`, borderRadius: 16, padding: '16px 10px', textAlign: 'center' }}>
                    <div style={{ color: selectedTeacher.color, fontSize: '1.3rem', marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(1rem,1.5vw,1.4rem)', fontWeight: 900, color: selectedTeacher.color }}>{val}</div>
                    <div style={{ fontSize: 11, color: '#6da9c8', marginTop: 4, fontFamily: 'Rajdhani', letterSpacing: '1px' }}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 22, padding: '6px', background: 'rgba(255,255,255,.04)', borderRadius: 14 }}>
                {[['about', '👤 Haqida'], ['skills', '⚡ Ko\'nikmalar'], ['achievements', '🏆 Yutuqlar']].map(([key, label]) => (
                  <button
                    key={key}
                    className="modal-tab"
                    onClick={() => setActiveTab(key)}
                    style={{
                      flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none', cursor: 'pointer',
                      fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(11px,1.2vw,13px)',
                      background: activeTab === key ? `${selectedTeacher.color}22` : 'transparent',
                      color: activeTab === key ? selectedTeacher.color : '#6da9c8',
                      borderBottom: activeTab === key ? `2px solid ${selectedTeacher.color}` : '2px solid transparent',
                    }}
                  >{label}</button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'about' && (
                <p style={{ color: '#a8c8e0', lineHeight: 1.9, fontSize: 'clamp(0.9rem,1.3vw,1rem)', fontFamily: 'Rajdhani', fontWeight: 500 }}>
                  {selectedTeacher.fullBio}
                </p>
              )}

              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {selectedTeacher.skills.map((sk, i) => (
                    <div key={sk} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, border: `1px solid ${selectedTeacher.color}44`, background: `${selectedTeacher.color}0d`, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 14, color: selectedTeacher.color }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: selectedTeacher.color, display: 'inline-block', boxShadow: `0 0 8px ${selectedTeacher.color}` }} />
                      {sk}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'achievements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedTeacher.achievements.map((ach, i) => (
                    <div key={i} className="achievement-item" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: `1px solid ${selectedTeacher.color}22` }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${selectedTeacher.color}20`, border: `1.5px solid ${selectedTeacher.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedTeacher.color, fontSize: 14, flexShrink: 0, fontFamily: 'Orbitron,monospace', fontWeight: 900 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: 14, color: '#c8dff0', lineHeight: 1.5 }}>{ach}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact */}
              <div style={{ marginTop: 26, paddingTop: 20, borderTop: `1px solid ${selectedTeacher.color}22`, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={`https://t.me/${selectedTeacher.contact?.telegram?.replace('@', '')}`} style={{ ...S.contactBtn, background: `${selectedTeacher.color}15`, borderColor: `${selectedTeacher.color}44`, color: selectedTeacher.color }}>
                  <FaTelegram style={{ marginRight: 8 }} />{selectedTeacher.contact?.telegram}
                </a>
                <a href={`mailto:${selectedTeacher.contact?.email}`} style={{ ...S.contactBtn, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: '#6da9c8' }}>
                  📧 {selectedTeacher.contact?.email}
                </a>
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
  overlay: { position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,.9)', backdropFilter: 'blur(28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', transition: 'opacity .3s' },
  modal: { background: 'linear-gradient(160deg,rgba(5,20,52,.98),rgba(2,8,24,.99))', border: '1px solid rgba(0,201,177,.25)', borderRadius: 28, padding: '48px 44px 44px', maxWidth: 680, width: '100%', position: 'relative', boxShadow: '0 40px 100px rgba(0,0,0,.85), 0 0 60px rgba(0,201,177,.08)', maxHeight: '90vh', overflowY: 'auto' },
  mClose: { position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: '#888', fontSize: '1rem', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'all .2s' },
  modalTopBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 5, borderRadius: '28px 28px 0 0', opacity: 1, zIndex: 1 },
  contactBtn: { display: 'flex', alignItems: 'center', padding: '10px 18px', borderRadius: 10, border: '1px solid', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13, textDecoration: 'none', cursor: 'pointer', transition: 'all .2s' },
}