import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { dir: 'left',  color: 'var(--accent)',  title: 'Motion Design',   sub: 'Kinetic interfaces that breathe' },
  { dir: 'right', color: 'var(--accent2)', title: 'Web Animation',   sub: 'ScrollTrigger, timelines, scrub' },
  { dir: 'left',  color: 'var(--accent3)', title: 'Creative Code',   sub: 'Generative & interactive art' },
  { dir: 'right', color: 'var(--accent4)', title: 'UI Engineering',  sub: 'Component-driven systems' },
  { dir: 'left',  color: 'var(--accent5)', title: 'Performance',     sub: 'Optimised render pipelines' },
  { dir: 'right', color: 'var(--accent)',  title: 'Accessibility',   sub: 'Inclusive motion design' },
]

export default function SlideInLeftRight() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.slide-card').forEach((card) => {
        const dir = card.dataset.dir
        gsap.from(card, {
          x: dir === 'left' ? -140 : 140,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Slide In Left / Right</p>
      <div className="slide-container">
        {CARDS.map((c, i) => (
          <div key={i} className={`slide-card ${c.dir}`} data-dir={c.dir}>
            <div className="slide-card-bar" style={{ background: c.color }} />
            <div className="slide-card-text">
              <h3>{c.title}</h3>
              <p>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
