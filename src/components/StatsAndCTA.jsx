import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { icon: '🎓', num: 95,  suffix: '%',  label: 'Sertifikat Oldi',    desc: "Barcha kursni tugatgan o'quvchilar", trend: '📈 +5% har yil',        color: '#00E5FF', grad: 'linear-gradient(90deg,#00E5FF,#0055ff)' },
  { icon: '💼', num: 85,  suffix: '%',  label: '3 Oyda Ish Topdi',  desc: '100+ hamkor kompaniya orqali',       trend: "📈 O'sib bormoqda",       color: '#00ff88', grad: 'linear-gradient(90deg,#00ff88,#00bcd4)' },
  { icon: '💰', num: 7,   suffix: 'M',  label: 'Oylik Maosh (max)', desc: 'Kurs va tajribaga qarab',            trend: "📈 +120% o'rtacha",       color: '#ffd700', grad: 'linear-gradient(90deg,#ffd700,#ff9500)' },
  { icon: '⭐', num: 4.9, suffix: '',   label: 'Baholash',          desc: '2000+ sharh asosida',                trend: '🎯 Eng yuqori daraja',    color: '#b66dff', grad: 'linear-gradient(90deg,#b66dff,#6c63ff)' },
  { icon: '🌍', num: 20,  suffix: '+',  label: 'Davlatda Ishlaydi', desc: 'Bitiruvchilarimiz dunyoda',          trend: '🌐 Global reach',         color: '#ff6b35', grad: 'linear-gradient(90deg,#ff6b35,#ff4d4d)' },
  { icon: '🤝', num: 100, suffix: '+',  label: 'Hamkor Kompaniya',  desc: 'Ish joylari kafolatlangan',          trend: '📊 Kengayib bormoqda',    color: '#00bcd4', grad: 'linear-gradient(90deg,#00bcd4,#00838f)' },
]

const PARENTS_REASONS = [
  { num: '01', icon: '🏆', title: "Kasbiy Tajribali O'qituvchilar", desc: "50+ mutaxassis, 10+ yil ish tajribasi. Dunyo kompaniyalarida ishlagan." },
  { num: '02', icon: '💼', title: "Real Ish Joyiga Ta'minlash",     desc: "100+ hamkor kompaniya. 85% o'quvchi 3 oyda ish topadi. CV yozishdan intervyugacha." },
  { num: '03', icon: '🎓', title: 'Sertifikatsiya Va Portfolio',     desc: "Hozirgi bozorda tan olingan sertifikatlar. Real loyihalar asosida portfolio." },
  { num: '04', icon: '🎯', title: 'Shaxsiy Mentoring',              desc: "Har bir o'quvchi uchun individual yondashish. Haftalik feedback." },
  { num: '05', icon: '💰', title: "Oylikni Ko'paytirish",           desc: "Bizning o'quvchilar o'rtacha 2-7 mln som oylik maosh oladilar. +120% o'sish." },
  { num: '06', icon: '🚀', title: 'Kasbiy Mustaqillik',             desc: "O'z biznesini boshlay oladi yoki freelance ishlaya oladi." },
]

const BRANCHES = [
  { num: '01', icon: '🏙️', name: 'Joylinks Xalqaro Maktabi', loc: "Bulung'ur tumani",  badge: 'Bosh filial',  color: '#00E5FF' },
  { num: '02', icon: '🌆', name: 'Joylinks IT Akademiyasi',   loc: 'Samarqand shahar',  badge: 'IT markaz',    color: '#00ff88' },
  { num: '03', icon: '🏫', name: 'Joylinks Xalqaro Maktabi', loc: 'Samarqand shahar',  badge: 'Yangi filial', color: '#b66dff' },
  { num: '04', icon: '🌇', name: 'Joylinks IT Akademiyasi',   loc: "Qo'bon tumani",     badge: 'Kengaymoqda',  color: '#ffd700' },
  { num: '05', icon: '🏢', name: 'Joylinks IT Akademiyasi',   loc: 'Termiz filiali',    badge: 'Janub markaz', color: '#ff6b35' },
]

export default function StatsAndCTA() {
  const containerRef    = useRef(null)
  const statNumRefs     = useRef([])
  const statCardsRef    = useRef([])
  const parentCardsRef  = useRef([])
  const branchCardsRef  = useRef([])
  /* ── refs that were missing ── */
  const statsSectionRef = useRef(null)
  const statsBgRef      = useRef(null)
  const ctaSectionRef   = useRef(null)
  const ctaRef          = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* stat cards */
      statCardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 60, opacity: 0, scale: .92 },
          { y: 0, opacity: 1, scale: 1, duration: .75, delay: i * .1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el, start: 'top 88%' } })

        const s = STATS[i]
        if (typeof s.num !== 'number') return
        gsap.to({ val: 0 }, {
          val: s.num, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate() {
            const el2 = statNumRefs.current[i]
            if (el2) el2.textContent = s.num % 1 !== 0
              ? this.targets()[0].val.toFixed(1)
              : Math.floor(this.targets()[0].val)
          },
        })
      })

      /* parent cards */
      parentCardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          { x: 0, opacity: 1, duration: .8, delay: (i % 3) * .12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } })
      })

      /* branch cards */
      branchCardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { scale: .85, opacity: 0 },
          { scale: 1, opacity: 1, duration: .7, delay: i * .09, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: el, start: 'top 88%' } })
      })

      /* stats section BG parallax */
      if (statsBgRef.current && statsSectionRef.current) {
        gsap.to(statsBgRef.current, {
          y: -80,
          scrollTrigger: { trigger: statsSectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        })
      }

      /* CTA entrance */
      if (ctaRef.current && ctaSectionRef.current) {
        gsap.fromTo(ctaRef.current,
          { y: 60, opacity: 0, scale: .95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: ctaSectionRef.current, start: 'top 80%' } })
      }

    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  /* 3D tilt */
  const tilt   = (e, el) => {
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - .5
    const y = (e.clientY - r.top)  / r.height - .5
    gsap.to(el, { rotationY: x * 16, rotationX: -y * 11, scale: 1.035, duration: .35, ease: 'power2.out', transformPerspective: 900 })
  }
  const untilt = el => gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: .5, ease: 'power2.out' })

  return (
    <div ref={containerRef}>

      {/* ═══════════ STATISTICS ═══════════ */}
      <section id="statistics" ref={statsSectionRef} style={sStyles.section}>
        <div ref={statsBgRef} className="stats-bg-orb" style={{ ...sStyles.bgOrb, width: 600, height: 600, background: 'radial-gradient(#00C9B155,transparent)', top: -200, right: -150 }} />

        <div style={sStyles.inner}>
          <div style={sStyles.secHead}>
            <div style={sStyles.secTag}>📊 STATISTIKA</div>
            <h2 style={sStyles.h2}>2000+ Talabaning <span className="g">Real Muvaffaqiyati</span></h2>
            <p style={sStyles.headP}>95% sertifikat oldi | 85% 3 oyda ish topdi | 4.9/5 baholash | 2-7M oylik maosh</p>
          </div>

          <div style={sStyles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} ref={el => statCardsRef.current[i] = el} className="glass" style={sStyles.statCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div style={{ ...sStyles.glowBar, background: s.grad }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <span style={sStyles.statIcon}>{s.icon}</span>
                  <div style={sStyles.statNum}>
                    <span ref={el => statNumRefs.current[i] = el} style={{ color: s.color }}>
                      {typeof s.num === 'number' ? 0 : s.num}
                    </span>
                    <span style={{ color: s.color }}>{s.suffix}</span>
                  </div>
                  <div style={sStyles.statLabel}>{s.label}</div>
                  <div style={sStyles.statDesc}>{s.desc}</div>
                  <span style={{ ...sStyles.trend, color: '#00ff88', borderColor: 'rgba(0,255,136,.2)' }}>{s.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div style={{ marginTop: 60 }}>
            <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 18, textAlign: 'center', marginBottom: 36, color: '#fff' }}>
              Kurs bo'yicha <span className="g">ish joylashuv darajasi</span>
            </h3>
            <div className="glass" style={sStyles.progCard}>
              <div style={{ position: 'relative', zIndex: 3 }}>
                {[
                  ['💻 Frontend Development', 92, '#00E5FF', 'linear-gradient(90deg,#00E5FF,#0055ff)'],
                  ['⚙️ Backend Development',  88, '#00ff88', 'linear-gradient(90deg,#00ff88,#00bcd4)'],
                  ['🔐 Kiberxavfsizlik',       95, '#ff4d4d', 'linear-gradient(90deg,#ff4d4d,#ff6b35)'],
                  ['🎨 Grafik Dizayn',         78, '#b66dff', 'linear-gradient(90deg,#b66dff,#6c63ff)'],
                  ['🌐 Ingliz tili',           70, '#ffd700', 'linear-gradient(90deg,#ffd700,#ff9500)'],
                ].map(([name, pct, clr, grad], i) => (
                  <ProgBar key={name} name={name} pct={pct} color={clr} grad={grad} delay={i * .1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PARENTS ═══════════ */}
      <section id="parents" style={{ ...sStyles.section, background: 'linear-gradient(180deg,transparent,rgba(5,20,40,.4),transparent)' }}>
        <div style={sStyles.inner}>
          <div style={sStyles.secHead}>
            <div style={sStyles.secTag}>👨‍👩‍👧 OTA-ONALARGA</div>
            <h2 style={sStyles.h2}>Farzandingiz Uchun <span className="g">Kelajakni Rejalashtirib Bering</span></h2>
            <p style={sStyles.headP}>Joylinks akademiyasini tanlash uchun 6 muhim sabab</p>
          </div>
          <div style={sStyles.parentsGrid}>
            {PARENTS_REASONS.map((p, i) => (
              <div key={i} ref={el => parentCardsRef.current[i] = el} className="glass" style={sStyles.parentCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div style={{ ...sStyles.glowBar, background: 'linear-gradient(90deg,#00C9B1,#00E5FF)' }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={sStyles.pNum}>{p.num}</div>
                  <div style={sStyles.pIcon}>{p.icon}</div>
                  <h3 style={sStyles.pH3}>{p.title}</h3>
                  <p style={sStyles.pP}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BRANCHES ═══════════ */}
      <section id="branches" style={sStyles.section}>
        <div style={sStyles.inner}>
          <div style={sStyles.secHead}>
            <div style={sStyles.secTag}>📍 FILIALLAR</div>
            <h2 style={sStyles.h2}>JOYLINKS <span className="g">XALQARO MAKTABI</span> FILIALLARI</h2>
            <p style={sStyles.headP}>O'zbekistonning 5 ta shahrida zamonaviy o'quv markazlari</p>
          </div>
          <div style={sStyles.branchGrid}>
            {BRANCHES.map((b, i) => (
              <div key={i} ref={el => branchCardsRef.current[i] = el} className="glass" style={sStyles.branchCard}
                onMouseMove={e => tilt(e, e.currentTarget)} onMouseLeave={e => untilt(e.currentTarget)}>
                <div style={{ ...sStyles.glowBar, background: `linear-gradient(90deg,${b.color},transparent)` }} />
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ ...sStyles.bNum, color: b.color }}>{b.num}</div>
                  <div style={sStyles.bIcon}>{b.icon}</div>
                  <h3 style={sStyles.bH3}>{b.name}</h3>
                  <p style={sStyles.bLoc}>{b.loc}</p>
                  <span style={{ ...sStyles.bBadge, color: b.color, borderColor: `${b.color}44` }}>{b.badge}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={sStyles.partnersRow}>
            {['🇰🇷 Janubiy Koreya','🇩🇪 Germaniya','🎓 5 ta OTM','🏛️ 2 ta Universitet','🤝 100+ Kompaniya'].map((p, i) => (
              <div key={i} className="glass" style={sStyles.partnerChip}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section id="cta" ref={ctaSectionRef} style={sStyles.ctaSection}>
        <div style={{ ...sStyles.bgOrb, width: 700, height: 700, background: 'radial-gradient(#00C9B133,transparent)', top: -200, left: '50%', transform: 'translateX(-50%)' }} />
        <div ref={ctaRef} className="glass" style={sStyles.ctaCard}>
          <div style={{ ...sStyles.glowBar, background: 'linear-gradient(90deg,#00C9B1,#b66dff,#ff4d4d)', height: 4 }} />
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
            <div style={sStyles.secTag}>🚀 BUGUNDAN BOSHLANG</div>
            <h2 style={{ ...sStyles.h2, fontSize: 'clamp(28px,4vw,52px)', marginBottom: 18 }}>
              Kelajakni <span className="g">Bugun Boshlang</span>
            </h2>
            <p style={{ ...sStyles.headP, marginBottom: 14 }}>
              Birinchi dars — <strong style={{ color: '#00C9B1' }}>BEPUL</strong> | Konsultatsiya — <strong style={{ color: '#00C9B1' }}>BEPUL</strong> | Riskisiz qo'lga olish
            </p>
            <p style={{ color: '#6da9c8', fontSize: 14, marginBottom: 36 }}>
              50% to'lovda o'qishni boshlang — online kompyuter savodxonlik kursi <strong style={{ color: '#00C9B1' }}>SOVG'A!</strong>
            </p>
            <div style={sStyles.ctaBtns}>
              <a href="tel:+998712345678" style={sStyles.btnP}>📞 Qo'ng'iroq Qiling</a>
              <a href="https://t.me/joylinks_uz" style={sStyles.btnS}>✈️ Telegram</a>
              <a href="#courses" style={sStyles.btnS}>Kurslarni Ko'rish →</a>
            </div>
            <p style={{ marginTop: 24, fontSize: 13, color: '#6da9c8' }}>
              📍 Samarqand va Termiz, O'zbekiston &nbsp;|&nbsp; 📧 info@joylinks.uz &nbsp;|&nbsp; 📞 +998 (71) 234-56-78
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={sStyles.footer}>
        <div style={sStyles.footGrid}>
          <div>
            <h3 style={sStyles.footH3}>Joylinks IT Academy</h3>
            <p style={sStyles.footP}>Kelajakni biz bilan quring!<br />Zamonaviy kasblar — real natijalar.</p>
            <p style={{ marginTop: 14, color: '#00C9B1', fontSize: 13 }}>🇰🇷 Janubiy Koreya &nbsp; 🇩🇪 Germaniya</p>
          </div>
          <div>
            <h4 style={sStyles.footH4}>Bog'lanish</h4>
            {['📍 Samarqand va Termiz','📞 +998 (71) 234-56-78','📧 info@joylinks.uz'].map(t => <p key={t} style={sStyles.footP}>{t}</p>)}
          </div>
          <div>
            <h4 style={sStyles.footH4}>Sahifalar</h4>
            {[['#about','Biz Haqimizda'],['#courses','Kurslar'],['#teachers',"O'qituvchilar"],['#statistics','Statistika'],['#parents','Ota-Onalar']].map(([h,l]) => (
              <a key={h} href={h} style={sStyles.footLink}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={sStyles.footH4}>Hamkorlar</h4>
            {['🇰🇷 Janubiy Koreya','🇩🇪 Germaniya','7+ Universitetlar','100+ Kompaniyalar'].map(t => <p key={t} style={sStyles.footP}>{t}</p>)}
          </div>
        </div>
        <div style={sStyles.footBottom}>
          <p>© 2024 Joylinks IT Academy. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  )
}

/* ── Progress Bar Sub-component ── */
function ProgBar({ name, pct, color, grad, delay }) {
  const barRef = useRef(null)
  useEffect(() => {
    if (!barRef.current) return
    gsap.fromTo(barRef.current, { width: 0 }, {
      width: `${pct}%`, duration: 1.6, ease: 'power2.out', delay,
      scrollTrigger: { trigger: barRef.current, start: 'top 90%', toggleActions: 'play none none none' },
    })
  }, [pct, delay])
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, color: '#fff', fontSize: 14 }}>{name}</span>
        <span style={{ fontFamily: 'Orbitron', fontSize: 12, color }}>{pct}%</span>
      </div>
      <div style={{ height: 9, background: 'rgba(255,255,255,.06)', borderRadius: 5, overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', borderRadius: 5, background: grad, boxShadow: `0 0 10px ${color}66`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 28, background: 'rgba(255,255,255,.35)' }} />
        </div>
      </div>
    </div>
  )
}

const sStyles = {
  section:     { padding: '120px 56px', position: 'relative', zIndex: 10, overflow: 'hidden' },
  inner:       { maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 },
  bgOrb:       { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', opacity: .22, pointerEvents: 'none', zIndex: 0 },
  secHead:     { textAlign: 'center', marginBottom: 64 },
  secTag:      { display: 'inline-block', fontFamily: 'Orbitron, monospace', fontSize: 10, letterSpacing: 4, color: '#00C9B1', textTransform: 'uppercase', marginBottom: 16, padding: '5px 14px', borderLeft: '3px solid #00C9B1' },
  h2:          { fontFamily: 'Orbitron, monospace', fontSize: 'clamp(24px,3vw,44px)', fontWeight: 900, marginBottom: 14, color: '#fff', lineHeight: 1.1 },
  headP:       { color: '#6da9c8', fontSize: 15, maxWidth: 600, margin: '0 auto', lineHeight: 1.65 },
  statsGrid:   { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 },
  statCard:    { padding: '34px 26px', textAlign: 'center', cursor: 'default' },
  glowBar:     { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '20px 20px 0 0', opacity: .75, zIndex: 4 },
  statIcon:    { fontSize: '2.4rem', display: 'block', marginBottom: 14 },
  statNum:     { fontFamily: 'Orbitron, monospace', fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, marginBottom: 8 },
  statLabel:   { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 },
  statDesc:    { fontSize: 12, color: '#6da9c8' },
  trend:       { display: 'inline-block', marginTop: 12, padding: '4px 12px', border: '1px solid', borderRadius: 20, fontSize: 11, fontWeight: 700 },
  progCard:    { padding: '36px 40px', maxWidth: '100%' },
  parentsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 },
  parentCard:  { padding: '30px 30px 30px 78px', position: 'relative', cursor: 'default' },
  pNum:        { position: 'absolute', left: 22, top: 22, fontFamily: 'Orbitron, monospace', fontSize: 34, fontWeight: 900, color: '#00C9B1', opacity: .3 },
  pIcon:       { fontSize: 28, marginBottom: 12 },
  pH3:         { fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 },
  pP:          { fontSize: 13, color: '#6da9c8', lineHeight: 1.65 },
  branchGrid:  { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 },
  branchCard:  { padding: '26px 20px', textAlign: 'center', cursor: 'default' },
  bNum:        { fontFamily: 'Orbitron, monospace', fontSize: 11, letterSpacing: 3, marginBottom: 12, opacity: .7 },
  bIcon:       { fontSize: 38, marginBottom: 12 },
  bH3:         { fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 5 },
  bLoc:        { fontSize: 12, color: '#6da9c8', marginBottom: 8 },
  bBadge:      { display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,.05)', border: '1px solid', borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: 'Rajdhani' },
  partnersRow: { display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 },
  partnerChip: { padding: '12px 22px', borderRadius: 12, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '.9rem', cursor: 'default' },
  ctaSection:  { padding: '100px 56px', textAlign: 'center', position: 'relative', zIndex: 10, background: 'linear-gradient(135deg,rgba(0,201,177,.06),rgba(0,229,255,.03))', borderTop: '1px solid rgba(0,201,177,.15)', borderBottom: '1px solid rgba(0,201,177,.15)', overflow: 'hidden' },
  ctaCard:     { maxWidth: 860, margin: '0 auto', padding: '64px 56px', cursor: 'default' },
  ctaBtns:     { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
  btnP:        { padding: '14px 36px', background: 'linear-gradient(135deg,#00C9B1,#008F7A)', border: 'none', borderRadius: 8, color: '#020b18', fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 28px rgba(0,201,177,.4)' },
  btnS:        { padding: '14px 36px', background: 'transparent', border: '1.5px solid rgba(0,201,177,.45)', borderRadius: 8, color: '#00C9B1', fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  footer:      { position: 'relative', zIndex: 10, background: 'rgba(2,8,24,.95)', borderTop: '1px solid rgba(0,201,177,.1)', padding: '60px 56px 36px' },
  footGrid:    { maxWidth: 1200, margin: '0 auto 36px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40 },
  footH3:      { fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700, color: '#00C9B1', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 },
  footH4:      { fontFamily: 'Orbitron, monospace', fontSize: 12, fontWeight: 700, color: '#00C9B1', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 },
  footP:       { color: '#6da9c8', fontSize: 13, marginBottom: 8 },
  footLink:    { display: 'block', color: '#6da9c8', fontSize: 13, marginBottom: 8, textDecoration: 'none' },
  footBottom:  { maxWidth: 1200, margin: '0 auto', textAlign: 'center', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.05)', color: '#6da9c8', fontSize: 12, opacity: .5 },
}