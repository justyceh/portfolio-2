import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Manual char split — no SplitText dependency needed
function splitToChars(text) {
  return text.split('').map((ch, i) => (
    <span key={i} className="char" style={{ display: 'inline-block' }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))
}

const LINES = [
  'Design is intent.',
  'Motion tells stories.',
  'Animation is engineering.',
]

export default function TextReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal-line').forEach((line, li) => {
        const chars = line.querySelectorAll('.char')
        gsap.from(chars, {
          opacity: 0,
          y: 36,
          rotationX: -80,
          duration: 0.55,
          stagger: 0.025,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: li * 0.1,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="text-reveal-wrap">
        {LINES.map((line, i) => (
          <div key={i} className="reveal-line">
            {splitToChars(line)}
          </div>
        ))}
      </div>
    </div>
  )
}
