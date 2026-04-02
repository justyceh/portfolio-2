import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { icon: '✦', color: 'var(--accent)',  title: 'Animation',   text: 'Fluid motion systems' },
  { icon: '◈', color: 'var(--accent2)', title: 'Design',      text: 'Visual language & systems' },
  { icon: '▲', color: 'var(--accent3)', title: 'Engineering', text: 'Clean, scalable code' },
  { icon: '●', color: 'var(--accent4)', title: 'Performance', text: 'Sub-16ms render loops' },
  { icon: '◆', color: 'var(--accent5)', title: 'Interaction', text: 'Micro-gestures & feedback' },
  { icon: '⬡', color: 'var(--accent)',  title: 'Typography', text: 'Rhythm, scale, hierarchy' },
  { icon: '✿', color: 'var(--accent2)', title: 'Colour',      text: 'Palette & contrast theory' },
  { icon: '⬟', color: 'var(--accent3)', title: 'Layout',      text: 'Spatial & grid systems' },
  { icon: '◉', color: 'var(--accent4)', title: 'Motion',      text: 'Easing & physics curves' },
  { icon: '✦', color: 'var(--accent5)', title: 'Scroll',      text: 'Progressive disclosure' },
  { icon: '◈', color: 'var(--accent)',  title: 'States',      text: 'Loading, empty, error' },
  { icon: '▲', color: 'var(--accent2)', title: 'Brand',       text: 'Voice, tone & identity' },
]

export default function FadeStagger() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-card', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.65,
        stagger: { amount: 0.9, from: 'start', grid: [3, 4] },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stagger-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Fade &amp; Stagger</p>
      <div className="stagger-grid">
        {CARDS.map((c, i) => (
          <div key={i} className="stagger-card">
            <div className="stagger-icon" style={{ background: `color-mix(in srgb, ${c.color} 20%, transparent)`, border: `1px solid ${c.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, fontSize: '16px' }}>
              {c.icon}
            </div>
            <h4>{c.title}</h4>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
