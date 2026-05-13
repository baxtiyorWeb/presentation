import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaAward, FaBriefcase, FaDollarSign, FaStar, FaGlobeAmericas,
  FaUsers, FaBookOpen, FaMapMarkerAlt, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes,
  FaSchool, FaLaptopCode, FaBuilding, FaUniversity, FaMicrochip,
  FaGlobeAsia, FaGlobeEurope
} from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { Icon: FaAward, num: 95, suffix: '%', label: 'Sertifikat Oldi', desc: "Barcha kursni tugatgan o'quvchilar", trend: '📈 +5% har yil', color: '#00E5FF', grad: 'linear-gradient(135deg,#00E5FF,#0055ff)' },
  { Icon: FaBriefcase, num: 85, suffix: '%', label: '3 Oyda Ish Topdi', desc: '100+ hamkor kompaniya orqali', trend: "📈 O'sib bormoqda", color: '#00ff88', grad: 'linear-gradient(135deg,#00ff88,#00bcd4)' },
  { Icon: FaDollarSign, num: 7, suffix: 'M', label: 'Oylik Maosh (max)', desc: 'Kurs va tajribaga qarab', trend: "📈 +120% o'rtacha", color: '#ffd700', grad: 'linear-gradient(135deg,#ffd700,#ff9500)' },
  { Icon: FaStar, num: 4.9, suffix: '', label: 'Baholash', desc: '2000+ sharh asosida', trend: '🎯 Eng yuqori', color: '#b66dff', grad: 'linear-gradient(135deg,#b66dff,#6c63ff)' },
  { Icon: FaGlobeAmericas, num: 20, suffix: '+', label: 'Davlatda Ishlaydi', desc: 'Bitiruvchilarimiz dunyoda', trend: '🌐 Global reach', color: '#ff6b35', grad: 'linear-gradient(135deg,#ff6b35,#ff4d4d)' },
  { Icon: FaUsers, num: 100, suffix: '+', label: 'Hamkor Kompaniya', desc: 'Ish joylari kafolatlangan', trend: '📊 Kengaymoqda', color: '#00bcd4', grad: 'linear-gradient(135deg,#00bcd4,#00838f)' },
]

const PARENTS = [
  { n: '01', Icon: FaAward, title: "Kasbiy Tajribali O'qituvchilar", desc: "50+ mutaxassis, 10+ yil ish tajribasi. Dunyo kompaniyalarida ishlagan." },
  { n: '02', Icon: FaBriefcase, title: "Real Ish Joyiga Ta'minlash", desc: "100+ hamkor kompaniya. 85% o'quvchi 3 oyda ish topadi. CV yozishdan intervyugacha." },
  { n: '03', Icon: FaBookOpen, title: 'Sertifikatsiya Va Portfolio', desc: "Hozirgi bozorda tan olingan sertifikatlar. Real loyihalar asosida portfolio." },
  { n: '04', Icon: FaStar, title: 'Shaxsiy Mentoring', desc: "Har bir o'quvchi uchun individual yondashish. Haftalik feedback va progress tracking." },
  { n: '05', Icon: FaDollarSign, title: "Oylikni Ko'paytirish", desc: "Bizning o'quvchilar o'rtacha 2-7 mln som oylik maosh oladilar. +120% o'sish." },
  { n: '06', Icon: FaGlobeAmericas, title: 'Kasbiy Mustaqillik', desc: "O'z biznesini boshlay oladi yoki freelance ishlaya oladi. Kelajak sening qo'lingda." },
]

const UZB_PATH = `M 321.8 343.9 L 322.6 326.7 L 285.3 314.8 L 256.0 301.0 L 237.7 287.8 L 205.6 268.5 L 191.9 239.6 L 182.5 234.5 L 152.2 235.8 L 141.4 230.0 L 138.4 207.7 L 100.7 192.9 L 77.1 209.1 L 53.1 218.8 L 57.7 232.9 L 26.1 233.3 L 25.0 130.0 L 97.1 113.4 L 102.4 115.8 L 145.8 135.9 L 168.8 146.5 L 195.5 171.8 L 228.4 167.7 L 276.5 165.5 L 310.0 186.0 L 307.9 214.1 L 321.6 214.3 L 327.3 237.2 L 362.9 238.1 L 370.6 251.4 L 381.0 251.2 L 393.3 231.2 L 430.3 211.7 L 446.3 206.5 L 454.7 209.2 L 431.1 227.4 L 451.8 237.9 L 471.8 230.9 L 505.0 245.7 L 469.1 265.9 L 447.8 263.1 L 436.2 263.9 L 432.2 256.1 L 438.0 243.1 L 400.6 249.6 L 391.7 267.6 L 378.3 283.1 L 354.9 281.7 L 347.7 294.1 L 368.2 300.8 L 374.3 321.6 L 358.5 350.0 L 337.4 344.1 L 321.8 343.9 Z`

const DEFAULT_BRANCHES = [
  { id: 1, Icon: FaUniversity, name: 'Joylinks Xalqaro Maktabi', loc: "Bulung'ur tumani", badge: 'Bosh filial', color: '#00E5FF', cx: 230, cy: 182 },
  { id: 2, Icon: FaLaptopCode, name: 'Joylinks IT Akademiyasi', loc: 'Samarqand shahar', badge: 'IT markaz', color: '#00ff88', cx: 250, cy: 200 },
  { id: 3, Icon: FaSchool, name: 'Joylinks Xalqaro Maktabi', loc: 'Samarqand (Filial)', badge: 'Yangi filial', color: '#b66dff', cx: 215, cy: 210 },
  { id: 4, Icon: FaMicrochip, name: 'Joylinks IT Akademiyasi', loc: "Qo'shtepa tumani", badge: 'Kengaymoqda', color: '#ffd700', cx: 268, cy: 220 },
  { id: 5, Icon: FaBuilding, name: 'Joylinks IT Akademiyasi', loc: 'Termiz filiali', badge: 'Janub markaz', color: '#ff6b35', cx: 258, cy: 315 },
]

let _nextId = 6

export default function StatsAndCTA({ show = 'all' }) {
  const containerRef = useRef(null)
  const statNumRefs = useRef([])
  const statRefs = useRef([])
  const parentRefs = useRef([])
  const headRefs = useRef([])
  const [hovered, setHovered] = useState(null)
  const [branches, setBranches] = useState(DEFAULT_BRANCHES)
  const [editMode, setEditMode] = useState(false)
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      headRefs.current.forEach(el => {
        if (!el) return
        gsap.fromTo(el,
          { scaleX: 1.22, scaleY: 0.5, opacity: 0, y: -52 },
          {
            scaleX: 1, scaleY: 1, opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1,.46)',
            scrollTrigger: { trigger: el, start: 'top 80%' }
          })
      })

      statRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.82 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.75, delay: i * 0.1, ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: el, start: 'top 88%',
              onEnter: () => {
                const s = STATS[i]
                gsap.to({ val: 0 }, {
                  val: s.num, duration: 2.2, ease: 'power2.out',
                  onUpdate() {
                    const ref = statNumRefs.current[i]
                    if (ref) ref.textContent = s.num % 1 !== 0 ? this.targets()[0].val.toFixed(1) : Math.floor(this.targets()[0].val)
                  }
                })
              }
            }
          })
      })

      parentRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0, rotationY: i % 2 === 0 ? -12 : 12 },
          {
            x: 0, opacity: 1, rotationY: 0, duration: 0.9, delay: (i % 3) * 0.13, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const tilt = (e, el) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; gsap.to(el, { rotationY: x * 14, rotationX: -y * 10, scale: 1.04, duration: .3, ease: 'power2.out', transformPerspective: 1200 }) }
  const untilt = el => gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: .5, ease: 'power2.out' })

  const addBranch = () => {
    const nb = { id: _nextId++, Icon: FaMapMarkerAlt, name: 'Yangi Filial', loc: 'Shahar nomi', badge: 'Yangi', color: '#00C9B1', cx: 260, cy: 180 }
    setBranches(p => [...p, nb])
    setEditing(nb.id); setDraft({ ...nb })
  }
  const deleteBranch = id => setBranches(p => p.filter(b => b.id !== id))
  const saveEdit = () => { setBranches(p => p.map(b => b.id === editing ? { ...draft } : b)); setEditing(null); setDraft(null) }

  return (
    <div ref={containerRef}>

      {/* ═══════════ BRANCHES + MAP (Birinchi bo'lim) ═══════════ */}
      {(show === 'all' || show === 'branches') && (
        <section id="branches" style={T.sec}>
          <div style={{ ...T.orb, width: 800, height: 800, background: 'radial-gradient(#00E5FF22,transparent)', bottom: -120, left: -120 }} />
          <div style={T.inner}>
            <div style={T.secHead}>
              <div style={T.tag}>📍 FILIALLAR</div>
              <h2 ref={el => headRefs.current[3] = el} style={{ ...T.h2, fontSize: 'clamp(30px, 4.5vw, 64px)' }}>
                JOYLINKS <span className="g">XALQARO MAKTABI</span>
              </h2>
              <p style={T.sub}>O'zbekistonning {branches.length} ta shahrida zamonaviy va innovatsion o'quv markazlari</p>
            </div>

            <div style={T.mapLayout}>
              {/* ── O'ZBEKISTON 3D SVG XARITASI (KATTAROQ) ── */}
              <div style={T.mapWrap}>
                <div style={{ ...T.map3d, maxWidth: 780 }}>
                  <svg viewBox="0 0 530 420" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="uzBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C9B1" />
                        <stop offset="100%" stopColor="#00E5FF" />
                      </linearGradient>
                      <filter id="pinGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <radialGradient id="mapFill" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#052040" stopOpacity="1" />
                        <stop offset="100%" stopColor="#021018" stopOpacity="1" />
                      </radialGradient>
                    </defs>
                    <path d={UZB_PATH} transform="translate(6,12)" fill="rgba(0,201,177,0.1)" style={{ filter: 'blur(20px)' }} />
                    <path d={UZB_PATH} fill="url(#mapFill)" stroke="url(#uzBorder)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 20px rgba(0,201,177,0.4))' }} />
                    {Array.from({ length: 12 }, (_, row) => Array.from({ length: 18 }, (_, col) => {
                      const x = 30 + col * 28; const y = 50 + row * 28
                      return <circle key={`${row}-${col}`} cx={x} cy={y} r={0.8} fill="rgba(0,201,177,0.15)" />
                    }))}
                    {branches.map((b, idx) => (
                      <g key={b.id} style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHovered(b.id)} onMouseLeave={() => setHovered(null)}>
                        <circle cx={b.cx} cy={b.cy} r={hovered === b.id ? 24 : 18} fill="none" stroke={b.color} strokeWidth="1" opacity={hovered === b.id ? .4 : .2} style={{ transition: 'all .3s' }} />
                        <circle cx={b.cx} cy={b.cy} r={hovered === b.id ? 15 : 12} fill={`${b.color}22`} stroke={b.color} strokeWidth="1.5" style={{ transition: 'all .3s' }} />
                        <circle cx={b.cx} cy={b.cy} r={6} fill={b.color} filter="url(#pinGlow)" />
                        {hovered === b.id && (
                          <g>
                            <rect x={b.cx - 70} y={b.cy - 50} width={140} height={36} rx={8} fill="rgba(2,11,28,0.98)" stroke={b.color} strokeWidth="1.5" />
                            <text x={b.cx} y={b.cy - 38} textAnchor="middle" fill={b.color} fontSize="10" fontFamily="Orbitron,monospace" fontWeight="900">{b.name}</text>
                            <text x={b.cx} y={b.cy - 24} textAnchor="middle" fill="#6da9c8" fontSize="9" fontFamily="Rajdhani,sans-serif">{b.loc}</text>
                          </g>
                        )}
                      </g>
                    ))}
                  </svg>
                  <div style={T.mapBase} />
                </div>
              </div>

              {/* ── BRANCH CARDS LIST ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <button onClick={() => { setEditMode(m => !m); setEditing(null); setDraft(null) }}
                    style={{ ...T.eBtn, background: editMode ? '#00C9B1' : 'transparent', color: editMode ? '#020b18' : '#00C9B1', padding: '10px 24px' }}>
                    {editMode ? <><FaCheck /> Tayyor</> : <><FaEdit /> Filiallarni Tahrirlash</>}
                  </button>
                </div>

                {branches.map((b, idx) => (
                  <div key={b.id} className="glass" style={{ ...T.brCard, borderColor: hovered === b.id ? `${b.color}99` : 'rgba(255,255,255,.09)', padding: '20px 24px' }}
                    onMouseEnter={() => setHovered(b.id)} onMouseLeave={() => setHovered(null)}>
                    <div style={{ ...T.gbar, background: `linear-gradient(90deg,${b.color},transparent)`, height: 4 }} />
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{
                        width: 74,
                        height: 74,
                        borderRadius: 22,
                        background: `${b.color}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${b.color}33`,
                        flexShrink: 0,
                        boxShadow: `inset 0 0 20px ${b.color}10`
                      }}>
                        <b.Icon style={{ color: b.color, fontSize: '2.2rem' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                          <span style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 900, color: b.color }}>{String(idx + 1).padStart(2, '0')}</span>
                          <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 10, fontWeight: 800, background: `${b.color}15`, border: `1px solid ${b.color}44`, color: b.color }}>{b.badge}</span>
                        </div>
                        <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, fontSize: 17, color: '#fff' }}>{b.name}</div>
                        <div style={{ fontSize: 14, color: '#6da9c8' }}><FaMapMarkerAlt style={{ color: b.color, marginRight: 6 }} />{b.loc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ STATISTICS ═══════════ */}
      {(show === 'all' || show === 'stats') && (
        <>
          <section id="statistics" style={{ ...T.sec, background: 'linear-gradient(180deg, rgba(2,11,24,1), rgba(5,20,50,0.5), rgba(2,11,24,1))' }}>
            <div style={T.inner}>
              <div style={T.secHead}>
                <div style={T.tag}>📊 STATISTIKA</div>
                <h2 ref={el => headRefs.current[0] = el} style={T.h2}>
                  2000+ Talabaning <span className="g">Real Muvaffaqiyati</span>
                </h2>
                <p style={T.sub}>Dunyo bo'ylab tan olingan natijalar va yuqori daromadli ish o'rinlari</p>
              </div>
              <div style={T.statsGrid}>
                {STATS.map((s, i) => (
                  <div key={i} ref={el => statRefs.current[i] = el} className="glass" style={T.statCard}
                    onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                    <div style={{ ...T.gbar, background: s.grad }} />
                    <div style={{ position: 'relative', zIndex: 3 }}>
                      <div style={{ ...T.statIcon, background: `${s.color}14`, border: `1.5px solid ${s.color}33` }}>
                        <s.Icon style={{ color: s.color, fontSize: '2.5rem' }} />
                      </div>
                      <div style={T.statNum}>
                        <span ref={el => statNumRefs.current[i] = el} style={{ color: s.color }}>0</span>
                        <span style={{ color: s.color }}>{s.suffix}</span>
                      </div>
                      <div style={T.statLbl}>{s.label}</div>
                      <div style={T.statDesc}>{s.desc}</div>
                      <span style={{ ...T.trend, color: '#00ff88', borderColor: 'rgba(0,255,136,0.3)' }}>{s.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ PARENTS ═══════════ */}
          <section id="parents" style={{ ...T.sec, background: 'rgba(5,20,40,.2)' }}>
            <div style={T.inner}>
              <div style={T.secHead}>
                <div style={T.tag}>👨‍👩‍👧 OTA-ONALARGA</div>
                <h2 ref={el => headRefs.current[2] = el} style={T.h2}>
                  Farzandingiz Uchun <span className="g">Kelajakni Rejalashtiring</span>
                </h2>
                <p style={T.sub}>Har bir ota-ona bilishi shart bo'lgan 6 ta muhim afzallik</p>
              </div>
              <div style={T.parGrid}>
                {PARENTS.map((p, i) => (
                  <div key={i} ref={el => parentRefs.current[i] = el} className="glass" style={T.parCard}
                    onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                    <div style={{ ...T.gbar, background: 'linear-gradient(90deg,#00C9B1,#00E5FF)' }} />
                    <div style={{ position: 'relative', zIndex: 3 }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, fontFamily: 'Orbitron', fontSize: 48, fontWeight: 900, color: '#00C9B1', opacity: .12 }}>{p.n}</div>
                      <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,201,177,.1)', borderRadius: 16, marginBottom: 20, border: '1px solid rgba(0,201,177,0.2)' }}>
                        <p.Icon style={{ color: '#00C9B1', fontSize: '2rem' }} />
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12, fontFamily: 'Rajdhani' }}>{p.title}</h3>
                      <p style={{ fontSize: 14, color: '#6da9c8', lineHeight: 1.8 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════ CTA ═══════════ */}
      {(show === 'all' || show === 'cta') && (
        <>
          <section id="cta" style={T.ctaSec}>
            <div style={{ ...T.orb, width: 900, height: 900, background: 'radial-gradient(#00C9B122,transparent)', top: -300, left: '50%', transform: 'translateX(-50%)' }} />
            <div className="glass" style={T.ctaCard}>
              <div style={{ ...T.gbar, background: 'linear-gradient(90deg,#00C9B1,#b66dff,#ff4d4d)', height: 6 }} />
              <div style={{ position: 'relative', zIndex: 3 }}>
                <div style={T.tag}>🚀 BUGUNDAN BOSHLANG</div>
                <h2 ref={el => headRefs.current[4] = el} style={{ ...T.h2, fontSize: 'clamp(32px, 5vw, 68px)', marginBottom: 24 }}>
                  Kelajakni <span className="g">Bugun Boshlang</span>
                </h2>

                <div style={{ margin: '50px auto', width: 260, height: 260, background: '#fff', padding: 18, borderRadius: 32, boxShadow: '0 0 60px rgba(0,201,177,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #020b18' }}>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://joylinks.uz" alt="QR Code" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </div>
                <p style={{ color: '#00C9B1', fontFamily: 'Orbitron', fontSize: 14, fontWeight: 900, letterSpacing: 4, marginBottom: 40 }}>SCAN TO REGISTER</p>

                <p style={{ ...T.sub, marginBottom: 15, fontSize: 22 }}>
                  Birinchi dars va konsultatsiya — <strong style={{ color: '#00C9B1' }}>MUTLAQO BEPUL!</strong>
                </p>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
                  <a href="tel:+998712345678" style={T.btnP}>📞 Hoziroq Qo'ng'iroq Qiling</a>
                  <a href="https://t.me/joylinks_uz" style={T.btnS}>✈️ Telegramda Yozish</a>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════ FOOTER ═══════════ */}
          <footer style={{ ...T.footer, padding: '60px 20px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 4vw, 40px)', flexWrap: 'wrap' }}>
            {[
              { Icon: FaGlobeAsia, label: 'Janubiy Koreya' },
              { Icon: FaGlobeEurope, label: 'Germaniya' },
              { Icon: FaMapMarkerAlt, label: 'Samarqand' },
              { Icon: FaMapMarkerAlt, label: 'Termiz' }
            ].map((t, idx) => (
              <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#00C9B1', fontWeight: 700, fontFamily: 'Rajdhani', fontSize: 16 }}>
                <t.Icon size={18} style={{ opacity: 0.8 }} />
                {t.label}
              </span>
            ))}
          </div>
              <div style={{ color: '#6da9c8', fontSize: 14, opacity: .7, fontFamily: 'Rajdhani' }}>
                © 2024 Joylinks IT Academy. Barcha huquqlar himoyalangan. <br />
                <span style={{ fontSize: 11, marginTop: 8, display: 'inline-block', opacity: .5 }}>Built for high performance by Google & Antigravity Engineers</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

const T = {
  sec: { padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 64px)', position: 'relative', zIndex: 10, overflow: 'hidden' },
  inner: { width: 'min(1440px, 92vw)', margin: '0 auto', position: 'relative', zIndex: 2 },
  orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: .22, pointerEvents: 'none', zIndex: 0 },
  secHead: { textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' },
  tag: { display: 'inline-block', fontFamily: 'Orbitron,monospace', fontSize: 'clamp(10px, 1.2vw, 12px)', letterSpacing: 'clamp(3px, 0.5vw, 5px)', color: '#00C9B1', textTransform: 'uppercase', marginBottom: 20, padding: '8px 20px', borderLeft: '5px solid #00C9B1', fontWeight: 700, background: 'rgba(0,201,177,.08)' },
  h2: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, marginBottom: 16, color: '#fff', lineHeight: 1.1, transformOrigin: 'center top' },
  sub: { color: '#6da9c8', fontSize: 'clamp(15px, 1.7vw, 20px)', maxWidth: 720, margin: '0 auto', lineHeight: 1.8, fontFamily: 'Rajdhani,sans-serif', fontWeight: 500 },
  gbar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '22px 22px 0 0', zIndex: 4 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,240px),1fr))', gap: 'clamp(16px, 2vw, 24px)' },
  statCard: { padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2vw, 24px)', textAlign: 'center', cursor: 'default', position: 'relative', background: 'rgba(5,22,55,.9)', border: '1.2px solid rgba(255,255,255,0.08)', borderRadius: 20 },
  statIcon: { width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  statNum: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, lineHeight: 1, marginBottom: 8 },
  statLbl: { fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: 6, fontFamily: 'Rajdhani' },
  statDesc: { fontSize: '12px', color: '#6da9c8', marginBottom: 12, lineHeight: 1.4, height: '2.8em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
  trend: { display: 'inline-block', marginTop: 8, padding: '5px 14px', border: '1px solid', borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: 'Rajdhani' },
  parGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,350px),1fr))', gap: 'clamp(16px, 2.5vw, 28px)' },
  parCard: { padding: 'clamp(20px, 4vw, 40px) clamp(20px, 4vw, 36px) clamp(20px, 4vw, 40px) clamp(60px, 8vw, 96px)', position: 'relative', cursor: 'default', background: 'rgba(5,18,48,.92)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 24 },
  mapLayout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' },
  mapWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minWidth: 0 },
  map3d: { position: 'relative', width: '100%', maxWidth: 780, transform: 'perspective(1200px) rotateX(15deg) rotateY(-5deg)', transformStyle: 'preserve-3d', filter: 'drop-shadow(0 40px 60px rgba(0,201,177,0.3))' },
  mapBase: { position: 'absolute', bottom: -30, left: '10%', right: '10%', height: 32, background: 'rgba(0,201,177,.12)', borderRadius: '50%', filter: 'blur(18px)' },
  brCard: { cursor: 'default', position: 'relative', background: 'rgba(4,18,48,.96)', border: '1.5px solid', borderRadius: 22, transition: 'all .3s', padding: 'clamp(16px, 3vw, 20px) clamp(16px, 4vw, 24px)' },
  eBtn: { borderRadius: 10, cursor: 'pointer', fontFamily: 'Orbitron', fontSize: 'clamp(10px, 1.2vw, 12px)', fontWeight: 700, border: '1.5px solid rgba(0,201,177,.4)', color: '#00C9B1', background: 'transparent', display: 'flex', alignItems: 'center', gap: 8, transition: 'all .25s' },
  ctaSec: { padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 64px)', textAlign: 'center', position: 'relative', zIndex: 10, background: 'linear-gradient(135deg,rgba(0,201,177,.1),rgba(0,229,255,.05))', borderTop: '1px solid rgba(0,201,177,.2)', overflow: 'hidden' },
  ctaCard: { width: 'min(1080px, 92vw)', margin: '0 auto', padding: 'clamp(40px, 10vw, 100px) clamp(20px, 6vw, 64px)', cursor: 'default', background: 'rgba(4,20,52,.98)', border: '1.5px solid rgba(0,201,177,.25)', borderRadius: 36 },
  btnP: { padding: '18px 48px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)', border: 'none', borderRadius: 14, color: '#020b18', fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 40px rgba(0,201,177,.5)', transition: 'all .3s' },
  btnS: { padding: '18px 48px', background: 'transparent', border: '1.5px solid rgba(0,201,177,.6)', borderRadius: 14, color: '#00C9B1', fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, letterSpacing: '2px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all .3s' },
  footer: { position: 'relative', zIndex: 10, background: 'rgba(2,8,24,.99)', borderTop: '1px solid rgba(0,201,177,.15)' },
}