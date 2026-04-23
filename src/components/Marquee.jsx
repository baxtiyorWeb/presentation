import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const ITEMS = [
  '🎓 2000+ O\'quvchi Bitirdi', '⭐ 4.9/5 Reyting', '💼 100+ Hamkor Kompaniya',
  '🌍 20+ Davlatda Bitiruvchilar', '🏆 95% Sertifikat Oldi', '🚀 85% 3 Oyda Ish Topdi',
  '🇰🇷 Janubiy Koreya Hamkorligi', '🇩🇪 Germaniya Hamkorligi', '💰 7 MLN Oylik Maosh',
  '📚 8 Ta Maxsus Kurs', '👨‍🏫 9 Ta Malakali O\'qituvchi', '🏅 IT Academy №1 Samarqand',
]

export default function Marquee() {
  const track1 = useRef(null)
  const track2 = useRef(null)

  useEffect(() => {
    const dur = 32
    ;[track1, track2].forEach((ref, i) => {
      if (!ref.current) return
      gsap.set(ref.current, { x: i === 0 ? 0 : '-50%' })
      gsap.to(ref.current, {
        x: '-50%',
        duration: dur,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const w = ref.current.scrollWidth / 2
            return parseFloat(x) % -w
          })
        }
      })
    })
  }, [])

  return (
    <div style={{
      overflow: 'hidden',
      background: 'linear-gradient(90deg,rgba(0,201,177,.06),rgba(0,0,0,0),rgba(0,201,177,.06))',
      borderTop: '1px solid rgba(0,201,177,.12)',
      borderBottom: '1px solid rgba(0,201,177,.12)',
      padding: '14px 0',
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Left fade */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg,#020b18,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      {/* Right fade */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg,#020b18,transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div ref={track1} style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 32, padding: '0 32px', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 14, color: i % 3 === 0 ? '#00C9B1' : i % 3 === 1 ? '#00E5FF' : '#6da9c8', letterSpacing: '1px' }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,201,177,.4)', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}
