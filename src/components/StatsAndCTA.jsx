import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaAward, FaBriefcase, FaDollarSign, FaStar, FaGlobeAmericas,
  FaUsers, FaBookOpen, FaMapMarkerAlt, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes
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

const PROGRESS_BARS = [
  { name: '💻 Frontend Development', pct: 92, color: '#00E5FF', grad: 'linear-gradient(90deg,#00E5FF,#0055ff)' },
  { name: '⚙️ Backend Development', pct: 88, color: '#00ff88', grad: 'linear-gradient(90deg,#00ff88,#00bcd4)' },
  { name: '🔐 Kiberxavfsizlik', pct: 95, color: '#ff4d4d', grad: 'linear-gradient(90deg,#ff4d4d,#ff6b35)' },
  { name: '🎨 Grafik Dizayn', pct: 78, color: '#b66dff', grad: 'linear-gradient(90deg,#b66dff,#6c63ff)' },
  { name: '🌐 Ingliz tili', pct: 70, color: '#ffd700', grad: 'linear-gradient(90deg,#ffd700,#ff9500)' },
]

const PARENTS = [
  { n: '01', Icon: FaAward, title: "Kasbiy Tajribali O'qituvchilar", desc: "50+ mutaxassis, 10+ yil ish tajribasi. Dunyo kompaniyalarida ishlagan." },
  { n: '02', Icon: FaBriefcase, title: "Real Ish Joyiga Ta'minlash", desc: "100+ hamkor kompaniya. 85% o'quvchi 3 oyda ish topadi. CV yozishdan intervyugacha." },
  { n: '03', Icon: FaBookOpen, title: 'Sertifikatsiya Va Portfolio', desc: "Hozirgi bozorda tan olingan sertifikatlar. Real loyihalar asosida portfolio." },
  { n: '04', Icon: FaStar, title: 'Shaxsiy Mentoring', desc: "Har bir o'quvchi uchun individual yondashish. Haftalik feedback va progress tracking." },
  { n: '05', Icon: FaDollarSign, title: "Oylikni Ko'paytirish", desc: "Bizning o'quvchilar o'rtacha 2-7 mln som oylik maosh oladilar. +120% o'sish." },
  { n: '06', Icon: FaGlobeAmericas, title: 'Kasbiy Mustaqillik', desc: "O'z biznesini boshlay oladi yoki freelance ishlaya oladi. Kelajak sening qo'lingda." },
]

/* ── O'ZBEKISTON SVG koordinatalari (real proportsiya) ──
   viewBox: 0 0 530 420 */
const UZB_PATH = `M 321.8 343.9 L 322.6 326.7 L 285.3 314.8 L 256.0 301.0 L 237.7 287.8 L 205.6 268.5 L 191.9 239.6 L 182.5 234.5 L 152.2 235.8 L 141.4 230.0 L 138.4 207.7 L 100.7 192.9 L 77.1 209.1 L 53.1 218.8 L 57.7 232.9 L 26.1 233.3 L 25.0 130.0 L 97.1 113.4 L 102.4 115.8 L 145.8 135.9 L 168.8 146.5 L 195.5 171.8 L 228.4 167.7 L 276.5 165.5 L 310.0 186.0 L 307.9 214.1 L 321.6 214.3 L 327.3 237.2 L 362.9 238.1 L 370.6 251.4 L 381.0 251.2 L 393.3 231.2 L 430.3 211.7 L 446.3 206.5 L 454.7 209.2 L 431.1 227.4 L 451.8 237.9 L 471.8 230.9 L 505.0 245.7 L 469.1 265.9 L 447.8 263.1 L 436.2 263.9 L 432.2 256.1 L 438.0 243.1 L 400.6 249.6 L 391.7 267.6 L 378.3 283.1 L 354.9 281.7 L 347.7 294.1 L 368.2 300.8 L 374.3 321.6 L 358.5 350.0 L 337.4 344.1 L 321.8 343.9 Z`

const DEFAULT_BRANCHES = [
  { id: 1, emoji: '🏙️', name: 'Joylinks Xalqaro Maktabi', loc: "Bulung'ur tumani", badge: 'Bosh filial', color: '#00E5FF', cx: 230, cy: 182 },
  { id: 2, emoji: '🌆', name: 'Joylinks IT Akademiyasi', loc: 'Samarqand shahar', badge: 'IT markaz', color: '#00ff88', cx: 250, cy: 200 },
  { id: 3, emoji: '🏫', name: 'Joylinks Xalqaro Maktabi', loc: 'Samarqand (Filial)', badge: 'Yangi filial', color: '#b66dff', cx: 215, cy: 210 },
  { id: 4, emoji: '🌇', name: 'Joylinks IT Akademiyasi', loc: "Qo'shtepa tumani", badge: 'Kengaymoqda', color: '#ffd700', cx: 268, cy: 220 },
  { id: 5, emoji: '🏢', name: 'Joylinks IT Akademiyasi', loc: 'Termiz filiali', badge: 'Janub markaz', color: '#ff6b35', cx: 258, cy: 315 },
]

let _nextId = 6

export default function StatsAndCTA() {
  const containerRef = useRef(null)
  const statNumRefs = useRef([])
  const statRefs = useRef([])
  const parentRefs = useRef([])
  const progRefs = useRef([])
  const headRefs = useRef([])
  const [hovered, setHovered] = useState(null)
  const [branches, setBranches] = useState(DEFAULT_BRANCHES)
  const [editMode, setEditMode] = useState(false)
  const [editing, setEditing] = useState(null)   // branch being edited
  const [draft, setDraft] = useState(null)   // draft copy

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* heading squish */
      headRefs.current.forEach(el => {
        if (!el) return
        gsap.fromTo(el,
          { scaleX: 1.22, scaleY: 0.5, opacity: 0, y: -52 },
          {
            scaleX: 1, scaleY: 1, opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1,.46)',
            scrollTrigger: { trigger: el, start: 'top 80%' }
          })
      })

      /* stat cards */
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

      /* progress bars */
      progRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { width: 0 })
        ScrollTrigger.create({
          trigger: el, start: 'top 92%',
          onEnter: () => gsap.to(el, { width: `${PROGRESS_BARS[i].pct}%`, duration: 1.7, delay: i * 0.18, ease: 'power3.out' }),
          onLeaveBack: () => gsap.to(el, { width: 0, duration: 0.5 }),
        })
      })

      /* parent cards */
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
    const nb = { id: _nextId++, emoji: '📍', name: 'Yangi Filial', loc: 'Shahar nomi', badge: 'Yangi', color: '#00C9B1', cx: 260, cy: 180 }
    setBranches(p => [...p, nb])
    setEditing(nb.id); setDraft({ ...nb })
  }
  const deleteBranch = id => setBranches(p => p.filter(b => b.id !== id))
  const saveEdit = () => { setBranches(p => p.map(b => b.id === editing ? { ...draft } : b)); setEditing(null); setDraft(null) }

  return (
    <div ref={containerRef}>

      {/* ═══════════ STATISTICS ═══════════ */}
      <section id="statistics" style={T.sec}>
        <div style={{ ...T.orb, width: 700, height: 700, background: 'radial-gradient(#00C9B133,transparent)', top: -220, right: -160 }} />
        <div style={T.inner}>
          <div style={T.secHead}>
            <div style={T.tag}>📊 STATISTIKA</div>
            <h2 ref={el => headRefs.current[0] = el} style={T.h2}>
              2000+ Talabaning <span className="g">Real Muvaffaqiyati</span>
            </h2>
            <p style={T.sub}>95% sertifikat oldi · 85% 3 oyda ish topdi · 4.9/5 baholash · 2–7M oylik maosh</p>
          </div>

          <div style={T.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} ref={el => statRefs.current[i] = el} className="glass" style={T.statCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div style={{ ...T.gbar, background: s.grad }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ ...T.statIcon, background: `${s.color}14`, border: `1.5px solid ${s.color}33` }}>
                    <s.Icon style={{ color: s.color, fontSize: '2rem' }} />
                  </div>
                  <div style={T.statNum}>
                    <span ref={el => statNumRefs.current[i] = el} style={{ color: s.color }}>0</span>
                    <span style={{ color: s.color }}>{s.suffix}</span>
                  </div>
                  <div style={T.statLbl}>{s.label}</div>
                  <div style={T.statDesc}>{s.desc}</div>
                  <span style={{ ...T.trend, color: '#00ff88', borderColor: 'rgba(0,255,136,.22)' }}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* progress bars */}
          <div style={{ marginTop: 88 }}>
            <h3 ref={el => headRefs.current[1] = el} style={{ ...T.h2, fontSize: 'clamp(20px,2.4vw,34px)', textAlign: 'center', marginBottom: 44 }}>
              Kurs bo'yicha <span className="g">Ish Joylashuv Darajasi</span>
            </h3>
            <div className="glass" style={{ padding: '48px 56px', borderRadius: 24 }}>
              {PROGRESS_BARS.map((p, i) => (
                <div key={p.name} style={{ marginBottom: i < PROGRESS_BARS.length - 1 ? 32 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, color: '#fff', fontSize: 'clamp(14px,1.6vw,18px)' }}>{p.name}</span>
                    <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(13px,1.3vw,16px)', color: p.color, fontWeight: 900 }}>{p.pct}%</span>
                  </div>
                  <div style={{ height: 13, background: 'rgba(255,255,255,.06)', borderRadius: 7, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
                    <div ref={el => progRefs.current[i] = el} style={{ height: '100%', borderRadius: 7, background: p.grad, boxShadow: `0 0 20px ${p.color}44`, position: 'relative', width: 0 }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 40, background: 'rgba(255,255,255,.22)', borderRadius: '0 7px 7px 0' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PARENTS ═══════════ */}
      <section id="parents" style={{ ...T.sec, background: 'linear-gradient(180deg,transparent,rgba(5,20,40,.5),transparent)' }}>
        <div style={T.inner}>
          <div style={T.secHead}>
            <div style={T.tag}>👨‍👩‍👧 OTA-ONALARGA</div>
            <h2 ref={el => headRefs.current[2] = el} style={T.h2}>
              Farzandingiz Uchun <span className="g">Kelajakni Rejalashtirib Bering</span>
            </h2>
            <p style={T.sub}>Joylinks akademiyasini tanlash uchun 6 muhim sabab</p>
          </div>
          <div style={T.parGrid}>
            {PARENTS.map((p, i) => (
              <div key={i} ref={el => parentRefs.current[i] = el} className="glass" style={T.parCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div style={{ ...T.gbar, background: 'linear-gradient(90deg,#00C9B1,#00E5FF)' }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, fontFamily: 'Orbitron,monospace', fontSize: 44, fontWeight: 900, color: '#00C9B1', opacity: .16, lineHeight: 1 }}>{p.n}</div>
                  <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,201,177,.1)', borderRadius: 14, marginBottom: 16, border: '1px solid rgba(0,201,177,.2)' }}>
                    <p.Icon style={{ color: '#00C9B1', fontSize: '1.9rem' }} />
                  </div>
                  <h3 style={{ fontSize: 'clamp(14px,1.4vw,17px)', fontWeight: 700, color: '#fff', marginBottom: 10, fontFamily: 'Rajdhani' }}>{p.title}</h3>
                  <p style={{ fontSize: 'clamp(12px,1.1vw,14px)', color: '#6da9c8', lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BRANCHES + MAP ═══════════ */}
      <section id="branches" style={T.sec}>
        <div style={{ ...T.orb, width: 600, height: 600, background: 'radial-gradient(#00E5FF18,transparent)', bottom: -80, left: -80 }} />
        <div style={T.inner}>
          <div style={T.secHead}>
            <div style={T.tag}>📍 FILIALLAR</div>
            <h2 ref={el => headRefs.current[3] = el} style={T.h2}>
              JOYLINKS <span className="g">XALQARO MAKTABI</span> FILIALLARI
            </h2>
            <p style={T.sub}>O'zbekistonning {branches.length} ta shahrida zamonaviy o'quv markazlari</p>
          </div>

          <div style={T.mapLayout}>

            {/* ── O'ZBEKISTON 3D SVG XARITASI ── */}
            <div style={T.mapWrap}>
              <div style={T.map3d}>
                <svg viewBox="0 0 530 420" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }} xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="uzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#041630" />
                      <stop offset="100%" stopColor="#020e22" />
                    </linearGradient>
                    <linearGradient id="uzBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00C9B1" />
                      <stop offset="100%" stopColor="#00E5FF" />
                    </linearGradient>
                    <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="pinGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="mapFill" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#052040" stopOpacity="1" />
                      <stop offset="100%" stopColor="#021018" stopOpacity="1" />
                    </radialGradient>
                  </defs>

                  {/* Shadow base */}
                  <path d={UZB_PATH} transform="translate(6,12)"
                    fill="rgba(0,201,177,0.08)"
                    style={{ filter: 'blur(16px)' }} />

                  {/* Map body */}
                  <path d={UZB_PATH}
                    fill="url(#mapFill)"
                    stroke="url(#uzBorder)"
                    strokeWidth="2.2"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(0,201,177,0.35))' }} />

                  {/* Inner shimmer */}
                  <path d={UZB_PATH}
                    fill="none"
                    stroke="rgba(0,229,255,0.12)"
                    strokeWidth="1" />

                  {/* Grid dots */}
                  {Array.from({ length: 8 }, (_, row) => Array.from({ length: 12 }, (_, col) => {
                    const x = 55 + col * 38; const y = 70 + row * 32
                    return <circle key={`${row}-${col}`} cx={x} cy={y} r={1} fill="rgba(0,201,177,0.12)" />
                  }))}

                  {/* Branch pins */}
                  {branches.map((b, idx) => (
                    <g key={b.id} style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHovered(b.id)} onMouseLeave={() => setHovered(null)}>

                      {/* Outer pulse ring */}
                      <circle cx={b.cx} cy={b.cy} r={hovered === b.id ? 22 : 16}
                        fill="none" stroke={b.color} strokeWidth="0.8"
                        opacity={hovered === b.id ? .35 : .15}
                        style={{ transition: 'all .3s' }} />

                      {/* Middle ring */}
                      <circle cx={b.cx} cy={b.cy} r={hovered === b.id ? 14 : 10}
                        fill={`${b.color}18`} stroke={b.color} strokeWidth="1.2"
                        style={{ transition: 'all .3s' }} />

                      {/* Center dot */}
                      <circle cx={b.cx} cy={b.cy} r={hovered === b.id ? 5 : 4}
                        fill={b.color} filter="url(#pinGlow)"
                        style={{ transition: 'all .3s' }} />

                      {/* Tooltip */}
                      {hovered === b.id && (
                        <g>
                          <rect x={b.cx - 58} y={b.cy - 42} width={116} height={32} rx={6}
                            fill="rgba(2,11,28,.97)" stroke={b.color} strokeWidth="1" />
                          <text x={b.cx} y={b.cy - 32} textAnchor="middle" fill={b.color}
                            fontSize="8.5" fontFamily="Orbitron,monospace" fontWeight="700">
                            {b.name.length > 18 ? b.name.slice(0, 18) + '…' : b.name}
                          </text>
                          <text x={b.cx} y={b.cy - 20} textAnchor="middle" fill="#aac"
                            fontSize="7.5" fontFamily="Rajdhani,sans-serif">
                            {b.loc}
                          </text>
                        </g>
                      )}

                      {/* Index number */}
                      <text x={b.cx + 12} y={b.cy - 10} fill={b.color}
                        fontSize="8" fontFamily="Orbitron,monospace" fontWeight="700" opacity=".8">
                        {String(idx + 1).padStart(2, '0')}
                      </text>
                    </g>
                  ))}
                </svg>
                {/* 3D base shadow */}
                <div style={T.mapBase} />
              </div>
            </div>

            {/* ── BRANCH CARDS LIST ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Edit toolbar */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                <button onClick={() => { setEditMode(m => !m); setEditing(null); setDraft(null) }}
                  style={{ ...T.eBtn, background: editMode ? '#00C9B1' : 'transparent', color: editMode ? '#020b18' : '#00C9B1' }}>
                  {editMode ? <><FaCheck style={{ marginRight: 6 }} />Tayyor</> : <><FaEdit style={{ marginRight: 6 }} />Tahrirlash</>}
                </button>
                {editMode && (
                  <button onClick={addBranch} style={{ ...T.eBtn, color: '#00ff88', borderColor: 'rgba(0,255,136,.35)' }}>
                    <FaPlus style={{ marginRight: 6 }} />Qo'shish
                  </button>
                )}
              </div>

              {branches.map((b, idx) => (
                <div key={b.id} className="glass" style={{ ...T.brCard, borderColor: hovered === b.id ? `${b.color}66` : 'rgba(255,255,255,.09)' }}
                  onMouseEnter={() => setHovered(b.id)} onMouseLeave={() => setHovered(null)}
                  onMouseMove={e => tilt(e, e.currentTarget)}>
                  <div style={{ ...T.gbar, background: `linear-gradient(90deg,${b.color},transparent)` }} />

                  {editing === b.id && draft ? (
                    /* Edit form */
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', gap: 8 }} onClick={e => e.stopPropagation()}>
                      {[['name', 'Filial nomi'], ['loc', 'Manzil'], ['badge', 'Badge'], ['emoji', 'Emoji icon']].map(([k, label]) => (
                        <div key={k}>
                          <label style={{ fontSize: 11, color: '#6da9c8', fontFamily: 'Rajdhani', display: 'block', marginBottom: 3 }}>{label}</label>
                          <input value={draft[k]} onChange={e => setDraft(p => ({ ...p, [k]: e.target.value }))} style={T.inp} />
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <button onClick={saveEdit} style={{ ...T.eBtn, background: '#00C9B1', color: '#020b18', flex: 1 }}><FaCheck style={{ marginRight: 4 }} />Saqlash</button>
                        <button onClick={() => { setEditing(null); setDraft(null) }} style={{ ...T.eBtn, flex: 1 }}><FaTimes style={{ marginRight: 4 }} />Bekor</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ fontSize: '2rem', flexShrink: 0 }}>{b.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, color: b.color, letterSpacing: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
                          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: 'rgba(255,255,255,.04)', border: `1px solid ${b.color}44`, color: b.color, fontFamily: 'Rajdhani' }}>{b.badge}</span>
                        </div>
                        <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(13px,1.3vw,15px)', color: '#fff', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
                        <div style={{ fontSize: 13, color: '#6da9c8', display: 'flex', alignItems: 'center' }}><FaMapMarkerAlt style={{ color: b.color, marginRight: 5, fontSize: '0.8rem', flexShrink: 0 }} />{b.loc}</div>
                      </div>
                      {editMode && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                          <button onClick={() => { setEditing(b.id); setDraft({ ...b }) }}
                            style={{ background: 'transparent', border: `1px solid ${b.color}44`, color: b.color, cursor: 'pointer', borderRadius: 6, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                            <FaEdit />
                          </button>
                          <button onClick={() => deleteBranch(b.id)}
                            style={{ background: 'transparent', border: '1px solid rgba(255,77,77,.4)', color: '#ff4d4d', cursor: 'pointer', borderRadius: 6, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 52 }}>
            {['🇰🇷 Janubiy Koreya', '🇩🇪 Germaniya', '🎓 5 ta OTM', '🏛️ 2 ta Universitet', '🤝 100+ Kompaniya'].map((p, i) => (
              <div key={i} className="glass" style={{ padding: '13px 26px', borderRadius: 14, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 'clamp(13px,1.3vw,16px)', cursor: 'default' }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section id="cta" style={T.ctaSec}>
        <div style={{ ...T.orb, width: 900, height: 900, background: 'radial-gradient(#00C9B133,transparent)', top: -300, left: '50%', transform: 'translateX(-50%)' }} />
        <div className="glass" style={T.ctaCard}>
          <div style={{ ...T.gbar, background: 'linear-gradient(90deg,#00C9B1,#b66dff,#ff4d4d)', height: 6 }} />
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <div style={T.tag}>🚀 BUGUNDAN BOSHLANG</div>
            <h2 ref={el => headRefs.current[4] = el} style={{ ...T.h2, fontSize: 'clamp(28px,4.5vw,58px)', marginBottom: 20 }}>
              Kelajakni <span className="g">Bugun Boshlang</span>
            </h2>
            <p style={{ ...T.sub, marginBottom: 12, fontSize: 'clamp(15px,1.7vw,20px)' }}>
              Birinchi dars — <strong style={{ color: '#00C9B1' }}>BEPUL</strong> &nbsp;|&nbsp; Konsultatsiya — <strong style={{ color: '#00C9B1' }}>BEPUL</strong>
            </p>
            <p style={{ color: '#6da9c8', fontSize: 'clamp(13px,1.4vw,16px)', marginBottom: 44, fontFamily: 'Rajdhani' }}>
              50% to'lovda o'qishni boshlang — online kompyuter savodxonlik kursi <strong style={{ color: '#00C9B1' }}>SOVG'A!</strong>
            </p>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+998712345678" style={T.btnP}>📞 Qo'ng'iroq Qiling</a>
              <a href="https://t.me/joylinks_uz" style={T.btnS}>✈️ Telegram</a>
              <a href="#courses" style={T.btnS}>Kurslarni Ko'rish →</a>
            </div>
            <p style={{ marginTop: 32, fontSize: 'clamp(12px,1.3vw,15px)', color: '#6da9c8', fontFamily: 'Rajdhani' }}>
              📍 Samarqand va Termiz, O'zbekiston &nbsp;|&nbsp; 📧 info@joylinks.uz &nbsp;|&nbsp; 📞 +998 (71) 234-56-78
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={T.footer}>
        <div style={T.footGrid}>
          <div>
            <h3 style={T.fH3}>Joylinks IT Academy</h3>
            <p style={T.fP}>Kelajakni biz bilan quring!<br />Zamonaviy kasblar — real natijalar.</p>
            <p style={{ marginTop: 14, color: '#00C9B1', fontSize: 14 }}>🇰🇷 Janubiy Koreya &nbsp; 🇩🇪 Germaniya</p>
          </div>
          <div>
            <h4 style={T.fH4}>Bog'lanish</h4>
            {['📍 Samarqand va Termiz', '📞 +998 (71) 234-56-78', '📧 info@joylinks.uz'].map(t => <p key={t} style={T.fP}>{t}</p>)}
          </div>
          <div>
            <h4 style={T.fH4}>Sahifalar</h4>
            {[['#about', 'Biz Haqimizda'], ['#courses', 'Kurslar'], ['#teachers', "O'qituvchilar"], ['#statistics', 'Statistika'], ['#parents', 'Ota-Onalar']].map(([h, l]) => (
              <a key={h} href={h} style={T.fLink}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={T.fH4}>Hamkorlar</h4>
            {['🇰🇷 Janubiy Koreya', '🇩🇪 Germaniya', '7+ Universitetlar', '100+ Kompaniyalar'].map(t => <p key={t} style={T.fP}>{t}</p>)}
          </div>
        </div>
        <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.05)', color: '#6da9c8', fontSize: 13, opacity: .6 }}>
          © 2024 Joylinks IT Academy. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  )
}

const T = {
  sec: { padding: '120px 64px', position: 'relative', zIndex: 10, overflow: 'hidden' },
  inner: { maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 2 },
  orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: .22, pointerEvents: 'none', zIndex: 0 },
  secHead: { textAlign: 'center', marginBottom: 72 },
  tag: { display: 'inline-block', fontFamily: 'Orbitron,monospace', fontSize: 12, letterSpacing: '5px', color: '#00C9B1', textTransform: 'uppercase', marginBottom: 18, padding: '6px 16px', borderLeft: '4px solid #00C9B1', fontWeight: 700, background: 'rgba(0,201,177,.07)' },
  h2: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(26px,3.8vw,54px)', fontWeight: 900, marginBottom: 14, color: '#fff', lineHeight: 1.12, transformOrigin: 'center top' },
  sub: { color: '#6da9c8', fontSize: 'clamp(14px,1.6vw,19px)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75, fontFamily: 'Rajdhani,sans-serif', fontWeight: 500 },
  gbar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4, borderRadius: '22px 22px 0 0', zIndex: 4 },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: 24 },
  statCard: { padding: '40px 28px', textAlign: 'center', cursor: 'default', position: 'relative', background: 'rgba(5,20,50,.88)', border: '1.5px solid rgba(255,255,255,.1)', borderRadius: 22 },
  statIcon: { width: 68, height: 68, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' },
  statNum: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(2.4rem,3.5vw,3.4rem)', fontWeight: 900, lineHeight: 1, marginBottom: 12 },
  statLbl: { fontSize: 'clamp(14px,1.4vw,17px)', fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: 'Rajdhani' },
  statDesc: { fontSize: 'clamp(12px,1.1vw,14px)', color: '#6da9c8', marginBottom: 14 },
  trend: { display: 'inline-block', marginTop: 12, padding: '6px 16px', border: '1px solid', borderRadius: 20, fontSize: 13, fontWeight: 700, fontFamily: 'Rajdhani' },

  parGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,330px),1fr))', gap: 22 },
  parCard: { padding: '34px 32px 34px 80px', position: 'relative', cursor: 'default', background: 'rgba(5,18,45,.9)', border: '1.5px solid rgba(255,255,255,.09)', borderRadius: 22 },

  mapLayout: { display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 52, alignItems: 'start' },
  mapWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  map3d: { position: 'relative', width: '100%', maxWidth: 540, transform: 'perspective(800px) rotateX(16deg) rotateY(-4deg)', transformStyle: 'preserve-3d', filter: 'drop-shadow(0 32px 48px rgba(0,201,177,.22))' },
  mapBase: { position: 'absolute', bottom: -22, left: '8%', right: '8%', height: 26, background: 'rgba(0,201,177,.1)', borderRadius: '50%', filter: 'blur(14px)' },

  brCard: { padding: '16px 18px', cursor: 'default', position: 'relative', background: 'rgba(4,16,44,.94)', border: '1.5px solid', borderRadius: 18, transition: 'border-color .3s' },
  eBtn: { padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, border: '1.5px solid rgba(0,201,177,.4)', color: '#00C9B1', background: 'transparent', letterSpacing: '.5px', display: 'flex', alignItems: 'center', gap: 4, transition: 'all .2s' },
  inp: { width: '100%', padding: '7px 12px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(0,201,177,.3)', borderRadius: 8, color: '#e0f4ff', fontFamily: 'Rajdhani,sans-serif', fontSize: 13, outline: 'none' },

  ctaSec: { padding: '120px 64px', textAlign: 'center', position: 'relative', zIndex: 10, background: 'linear-gradient(135deg,rgba(0,201,177,.07),rgba(0,229,255,.03))', borderTop: '1px solid rgba(0,201,177,.15)', borderBottom: '1px solid rgba(0,201,177,.15)', overflow: 'hidden' },
  ctaCard: { maxWidth: 980, margin: '0 auto', padding: '72px 64px', cursor: 'default', background: 'rgba(4,18,48,.94)', border: '1.5px solid rgba(0,201,177,.2)', borderRadius: 28 },
  btnP: { padding: '16px 40px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)', border: 'none', borderRadius: 12, color: '#020b18', fontFamily: 'Orbitron,monospace', fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 700, letterSpacing: '1.5px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', boxShadow: '0 8px 32px rgba(0,201,177,.4)', transition: 'all .3s' },
  btnS: { padding: '16px 40px', background: 'transparent', border: '1.5px solid rgba(0,201,177,.5)', borderRadius: 12, color: '#00C9B1', fontFamily: 'Orbitron,monospace', fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 700, letterSpacing: '1.5px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', transition: 'all .3s' },

  footer: { position: 'relative', zIndex: 10, background: 'rgba(2,8,24,.98)', borderTop: '1px solid rgba(0,201,177,.1)', padding: '80px 64px 48px' },
  footGrid: { maxWidth: 1440, margin: '0 auto 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 52 },
  fH3: { fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 700, color: '#00C9B1', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 18 },
  fH4: { fontFamily: 'Orbitron,monospace', fontSize: 12, fontWeight: 700, color: '#00C9B1', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 18 },
  fP: { color: '#6da9c8', fontSize: 14, marginBottom: 10, fontFamily: 'Rajdhani' },
  fLink: { display: 'block', color: '#6da9c8', fontSize: 14, marginBottom: 10, textDecoration: 'none', fontFamily: 'Rajdhani', transition: 'color .3s' },
}