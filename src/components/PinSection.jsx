import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PinSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          start: 'top top',
          end: '+=1800',
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Step 1: stat
      tl.to('.pin-step-1', { opacity: 1, y: 0, duration: 1 }, 0)
        .to('.pin-step-1', { opacity: 0, x: -80, duration: 0.8 }, 2)

      // Step 2: headline
        .to('.pin-step-2', { opacity: 1, scale: 1, duration: 1 }, 2.2)
        .to('.pin-step-2', { opacity: 0, y: -60, duration: 0.8 }, 4)

      // Step 3: CTA
        .to('.pin-step-3', { opacity: 1, y: 0, duration: 1 }, 4.2)

      // Progress bar
      gsap.to('.pin-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=1800',
          scrub: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Pin &amp; Scrub</p>
      <div className="pin-wrap">
        <div className="pin-content">
          {/* Step 1 */}
          <div className="pin-step pin-step-1" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Projects shipped</p>
            <div className="pin-stat" style={{ color: 'var(--accent)' }}>48+</div>
          </div>

          {/* Step 2 */}
          <div className="pin-step pin-step-2" style={{ opacity: 0, transform: 'scale(0.8)' }}>
            <h2>Scroll-driven<br /><span style={{ color: 'var(--accent2)' }}>storytelling.</span></h2>
            <p>The viewport becomes your canvas.</p>
          </div>

          {/* Step 3 */}
          <div className="pin-step pin-step-3" style={{ opacity: 0, transform: 'translateY(40px)' }}>
            <div style={{ display: 'inline-block', padding: '14px 36px', border: '1px solid var(--accent)', color: 'var(--accent)', fontFamily: 'var(--display)', fontWeight: 700, fontSize: '18px', borderRadius: '4px', letterSpacing: '-0.01em' }}>
              Let&apos;s build something →
            </div>
            <p style={{ marginTop: '16px' }}>Pin • Scrub • Reveal</p>
          </div>
        </div>

        <div className="pin-progress-bar">
          <div className="pin-progress-fill" />
        </div>
      </div>
    </div>
  )
}
