import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOTS = [
  { top: '10%', left: '8%' },  { top: '20%', right: '12%' },
  { top: '70%', left: '6%' },  { top: '80%', right: '8%' },
  { top: '40%', left: '3%' },  { top: '50%', right: '5%' },
  { top: '15%', left: '45%' }, { top: '85%', left: '55%' },
]

export default function ParallaxScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = { trigger: ref.current, scrub: 1, start: 'top bottom', end: 'bottom top' }
      gsap.to('.p-layer-1', { y: -40,  ease: 'none', scrollTrigger: trig })
      gsap.to('.p-layer-2', { y: -90,  ease: 'none', scrollTrigger: trig })
      gsap.to('.p-layer-3', { y: -150, ease: 'none', scrollTrigger: trig })
      gsap.to('.p-layer-4', { y: -220, ease: 'none', scrollTrigger: trig })
      gsap.to('.p-dot',     { y: -60,  ease: 'none', stagger: 0.05, scrollTrigger: trig })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="parallax-wrap">
      <div className="p-layer p-layer-1" />
      <div className="p-layer p-layer-2" />
      <div className="p-layer p-layer-3" />
      <div className="p-layer p-layer-4" />
      {DOTS.map((style, i) => (
        <div key={i} className="p-dot" style={style} />
      ))}
      <div className="p-center-text">
        <h2>Parallax</h2>
        <p>Each layer moves at a different speed</p>
      </div>
    </div>
  )
}
