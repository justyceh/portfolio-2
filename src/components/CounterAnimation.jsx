import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { id: 'c1', end: 48,   suffix: '+',    decimals: 0, label: 'Projects Shipped',  color: 'var(--accent)' },
  { id: 'c2', end: 99,   suffix: '%',    decimals: 0, label: 'Client Satisfaction', color: 'var(--accent2)' },
  { id: 'c3', end: 4.9,  suffix: '',     decimals: 1, label: 'Avg Rating',        color: 'var(--accent3)' },
  { id: 'c4', end: 120,  suffix: 'k',    decimals: 0, label: 'Lines Written',     color: 'var(--accent4)' },
]

export default function CounterAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach(({ id, end, suffix, decimals }) => {
        const el = ref.current.querySelector(`#${id}`)
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = obj.val.toFixed(decimals) + suffix
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Counter Animation</p>
      <div className="counter-grid">
        {STATS.map((s) => (
          <div key={s.id} className="counter-cell">
            <span id={s.id} className="counter-number" style={{ color: s.color }}>0</span>
            <span className="counter-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
