import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SpinRotate() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle loops
      gsap.to('.spin-hex',    { rotation: 360,  duration: 7,  repeat: -1, ease: 'none' })
      gsap.to('.spin-ring',   { rotation: -360, duration: 11, repeat: -1, ease: 'none' })
      gsap.to('.spin-square', { rotation: 360,  duration: 4,  repeat: -1, ease: 'none' })
      gsap.to('.spin-tri',    { rotation: -360, duration: 9,  repeat: -1, ease: 'none' })

      // Scroll-driven boost
      const trig = { trigger: ref.current, scrub: 2, start: 'top bottom', end: 'bottom top' }
      gsap.to('.spin-hex',    { rotation: '+=540', ease: 'none', scrollTrigger: trig })
      gsap.to('.spin-square', { rotation: '-=360', ease: 'none', scrollTrigger: trig })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Spin &amp; Rotate</p>
      <div className="spin-stage">
        <div className="spin-item">
          <div className="spin-hex" />
          <span className="spin-label">Hexagon</span>
        </div>
        <div className="spin-item">
          <div className="spin-ring" />
          <span className="spin-label">Ring</span>
        </div>
        <div className="spin-item">
          <div className="spin-square" />
          <span className="spin-label">Square</span>
        </div>
        <div className="spin-item">
          <div className="spin-tri" />
          <span className="spin-label">Triangle</span>
        </div>
      </div>
    </div>
  )
}
