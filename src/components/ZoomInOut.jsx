import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ZI = ['React', 'GSAP', 'Vite']
const ZO = ['Node', 'CSS', 'TypeScript']

export default function ZoomInOut() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = {
        trigger: ref.current,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
      }
      gsap.fromTo('.zoom-card.zi',
        { scale: 0.55, opacity: 0.25 },
        { scale: 1.15, opacity: 1, ease: 'none', scrollTrigger: trig }
      )
      gsap.fromTo('.zoom-card.zo',
        { scale: 1.15, opacity: 1 },
        { scale: 0.55, opacity: 0.25, ease: 'none', scrollTrigger: trig }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Zoom In / Out</p>
      <div className="zoom-grid">
        {ZI.map((label, i) => (
          <div key={i} className="zoom-card zi">{label}</div>
        ))}
        {ZO.map((label, i) => (
          <div key={i} className="zoom-card zo">{label}</div>
        ))}
      </div>
    </div>
  )
}
