import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { icon: '⟨/⟩', title: 'HTML', years: '4+ yrs' },
  { icon: '◈', title: 'CSS', years: '4+ yrs' },
  { icon: '⬡', title: 'Claude Code', years: '1 yr' },
  { icon: '◉', title: 'React', years: '2 yrs' },
  { icon: '✦', title: 'JavaScript', years: '3 yrs' },
  { icon: '▲', title: 'Python', years: '2 yrs' },
  { icon: '◆', title: 'REST & APIs', years: '2 yrs' },
  { icon: '⬟', title: 'C++', years: '4+ yrs' },
  { icon: '⎇', title: 'GitHub', years: '4 yrs' },
]

export default function SkillSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from('.skill-header', { opacity: 0, y: 28, duration: 0.5 }, 0)

      SKILLS.forEach((_, i) => {
        const offset = 0.2 + (i * 0.15)
        
        // Emulating TimelineChain overlapping techniques
        tl.from(`.sk-chart-label-${i}`,   { opacity: 0, x: -20, duration: 0.4, ease: 'power2.out' }, offset)
          .from(`.sk-node-${i}`,          { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)' }, offset + 0.1)
          .to(`.sk-node-${i}`,            { rotation: 360, duration: 1.2, ease: 'power1.inOut' }, offset + 0.2)
          .from(`.sk-bar-fill-${i}`,      { scaleX: 0, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' }, offset + 0.2)
          .from(`.sk-exp-text-${i}`,      { opacity: 0, x: -10, duration: 0.4, ease: 'power2.out' }, offset + 0.6)
      })

    }, ref)
    return () => ctx.revert()
  }, [])

  const maxYears = 5;

  return (
    <section ref={ref} id="skills" className="skill-section">
      <div className="skill-header">
        <p className="skill-eyebrow">Technical Expertise</p>
        <h2 className="skill-title">Skills &amp; Technologies</h2>
        <p className="skill-subtitle">Years of experience</p>
      </div>

      <div className="skill-chart-wrap">
        {SKILLS.map((s, i) => {
          // Parse years from string ('4+ yrs' -> 4, '1 yr' -> 1)
          const yrs = parseInt(s.years) || 1
          const fillWidth = Math.min((yrs / maxYears) * 100, 100) + '%'

          return (
            <div key={i} className="skill-row">
              <div className={`sk-chart-label sk-chart-label-${i}`}>{s.title}</div>
              <div className={`sk-node sk-node-${i}`}>{s.icon}</div>
              <div className="sk-track-container">
                <div className="sk-bar-track" />
                <div className={`sk-bar-fill sk-bar-fill-${i}`} style={{ width: fillWidth }} />
                <div className={`sk-exp-text sk-exp-text-${i}`} style={{ left: fillWidth }}>
                  {s.years}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
