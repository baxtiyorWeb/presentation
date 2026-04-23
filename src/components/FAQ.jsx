import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    q: "Joylinks akademiyasiga qabul qanday amalga oshiriladi?",
    a: "Qabul juda sodda: saytdan yoki Telegram orqali ariza qoldiring → bepul konsultatsiya → sinov darsi → ro'yxatdan o'ting. Birinchi dars va konsultatsiya mutlaqo bepul!"
  },
  {
    q: "Kurslar qaysi tilda o'tiladi?",
    a: "Barcha kurslar O'zbek tilida olib boriladi. Texnik terminlar ham o'zbek tiliga moslashtirilgan. Ingliz tili kursi esa inglizcha va o'zbekcha kombinatsiyada o'tiladi."
  },
  {
    q: "Kurs tugagandan keyin ish joyi kafolatlanadimi?",
    a: "Ha! 100+ hamkor kompaniyalarimiz orqali bitiruvchilarga ish joyi tavsiya qilinadi. Statistikamiz: 85% bitiruvchi kurs tugaganidan keyin 3 oy ichida ish topadi."
  },
  {
    q: "To'lov qanday usulda amalga oshiriladi?",
    a: "Naqd pul, Click, Payme, bank o'tkazmasi orqali to'lash mumkin. Bundan tashqari, 50% to'lab boshlash va qolganini ish topgandan keyin to'lash imkoniyati mavjud!"
  },
  {
    q: "Onlayn yoki offline darslar bo'ladimi?",
    a: "Ikkala formatda ham darslar mavjud. Offlayn — Samarqand va Termiz filiallarimizda. Onlayn — Zoom/Google Meet orqali. Yozib olingan darslar ham taqdim etiladi."
  },
  {
    q: "Sertifikat qanchalik tan olinadi?",
    a: "Joylinks sertifikati O'zbekiston va xalqaro bozorda tan olinadi. Janubiy Koreya va Germaniya hamkorlari tomonidan tasdiqlangan. Ko'plab kompaniyalar sertifikatimizni rasmiy hujjat sifatida qabul qiladi."
  },
  {
    q: "Yoshga cheklov bormi? Kim o'qiy oladi?",
    a: "14 yoshdan yevropaga qadar — hamma o'qiy oladi! Maktab o'quvchilaridan tortib ish tutgan kattalar, nafaqaxo'rlar ham o'qiy oladi. Guruhlar yosh va darajaga qarab ajratiladi."
  },
  {
    q: "Kompyuterim bo'lmasa nima qilaman?",
    a: "Akademiyamizda o'quv vaqtida foydalanish uchun kompyuterlar mavjud. Bundan tashqari, ijaraga olish yo'llari bo'yicha ham maslahat beramiz. Smartfon ham dastlabki davrda yetarli bo'ladi."
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const itemRefs = useRef([])
  const answerRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%' }
        }
      )
      // FAQ items stagger in
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            delay: (i % 4) * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggle = (i) => {
    const answer = answerRefs.current[i]
    if (!answer) return

    if (openIdx === i) {
      // Close
      gsap.to(answer, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
      setOpenIdx(null)
    } else {
      // Close previous
      if (openIdx !== null && answerRefs.current[openIdx]) {
        gsap.to(answerRefs.current[openIdx], { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
      }
      // Open new
      gsap.set(answer, { height: 'auto', opacity: 1 })
      const h = answer.offsetHeight
      gsap.fromTo(answer,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
      setOpenIdx(i)
    }
  }

  return (
    <section ref={sectionRef} style={FS.sec}>
      <div style={{ ...FS.orb, top: -120, right: -80 }} />
      <div style={{ ...FS.orb, bottom: -100, left: -60, background: 'radial-gradient(#b66dff12,transparent)' }} />

      <div style={FS.inner}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={FS.tag}>❓ KO'P SO'RALADIGAN</div>
          <h2 style={FS.h2}>
            Savol va <span className="g">Javoblar</span>
          </h2>
          <p style={FS.sub}>Eng ko'p so'raladigan savollar va aniq javoblar</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 620px), 1fr))', gap: 14 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              className="glass"
              style={{
                ...FS.item,
                borderColor: openIdx === i ? 'rgba(0,201,177,.3)' : 'rgba(255,255,255,.07)',
                boxShadow: openIdx === i ? '0 0 30px rgba(0,201,177,.08)' : 'none',
              }}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(i)}
                style={FS.qRow}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, textAlign: 'left', flex: 1 }}>
                  <span style={{
                    fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 900,
                    color: openIdx === i ? '#00C9B1' : '#6da9c8',
                    background: openIdx === i ? 'rgba(0,201,177,.12)' : 'rgba(255,255,255,.04)',
                    border: `1px solid ${openIdx === i ? 'rgba(0,201,177,.3)' : 'rgba(255,255,255,.08)'}`,
                    borderRadius: 8, padding: '4px 10px', flexShrink: 0, marginTop: 2,
                    transition: 'all .3s'
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(14px,1.4vw,16px)',
                    fontWeight: 700, color: openIdx === i ? '#fff' : '#c8dff0', lineHeight: 1.5,
                    transition: 'color .3s'
                  }}>
                    {faq.q}
                  </span>
                </div>
                <span style={{
                  fontSize: '1.3rem', color: openIdx === i ? '#00C9B1' : '#445',
                  transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'all .35s cubic-bezier(.2,1,.3,1)',
                  flexShrink: 0, marginLeft: 16, lineHeight: 1
                }}>+</span>
              </button>

              {/* Answer */}
              <div ref={el => answerRefs.current[i] = el} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
                <div style={{ padding: '0 20px 20px 52px' }}>
                  <div style={{ borderLeft: '2px solid rgba(0,201,177,.2)', paddingLeft: 16 }}>
                    <p style={{
                      fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(13px,1.2vw,15px)',
                      color: '#6da9c8', lineHeight: 1.85, fontWeight: 500
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 72 }}>
          <p style={{ color: '#6da9c8', fontFamily: 'Rajdhani', fontSize: 16, marginBottom: 24 }}>
            Savolingizga javob topa olmadingizmi?
          </p>
          <a
            href="https://t.me/joylinks_uz"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px', borderRadius: 12,
              background: 'linear-gradient(135deg,#00C9B1,#008F7A)',
              color: '#020b18', fontFamily: 'Orbitron, monospace',
              fontSize: 13, fontWeight: 700, letterSpacing: '1px',
              textDecoration: 'none', boxShadow: '0 8px 28px rgba(0,201,177,.35)'
            }}
          >
            ✈️ Telegram orqali so'rang
          </a>
        </div>
      </div>
    </section>
  )
}

const FS = {
  sec: {
    padding: '120px 64px', position: 'relative', zIndex: 10, overflow: 'hidden',
    background: 'linear-gradient(180deg,rgba(2,11,24,1),rgba(3,16,32,.96),rgba(2,11,24,1))',
    borderTop: '1px solid rgba(0,201,177,.1)'
  },
  orb: { position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(#00C9B110,transparent)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 },
  inner: { maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 },
  tag: { display: 'inline-block', fontFamily: 'Orbitron,monospace', fontSize: 12, letterSpacing: '5px', color: '#00C9B1', textTransform: 'uppercase', marginBottom: 18, padding: '6px 16px', borderLeft: '4px solid #00C9B1', fontWeight: 700, background: 'rgba(0,201,177,.07)' },
  h2: { fontFamily: 'Orbitron,monospace', fontSize: 'clamp(26px,3.8vw,52px)', fontWeight: 900, marginBottom: 14, color: '#fff', lineHeight: 1.12 },
  sub: { color: '#6da9c8', fontSize: 'clamp(14px,1.5vw,18px)', fontFamily: 'Rajdhani,sans-serif', fontWeight: 500 },
  item: { borderRadius: 18, overflow: 'visible', transition: 'border-color .3s, box-shadow .3s', cursor: 'default' },
  qRow: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 20px 20px', background: 'transparent', border: 'none', cursor: 'pointer' },
}
