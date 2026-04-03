import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CTAButton from './CTAButton'

export default function HeroSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-first', {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.hero-last', {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.45,
      })
      gsap.from('.hero-sub', {
        y: 20, opacity: 0, duration: 1.0, ease: 'power2.out', delay: 0.9,
      })
      gsap.from('.hero-desc', {
        y: 20, opacity: 0, duration: 1.0, ease: 'power2.out', delay: 1.1,
      })
      gsap.from('.hero-cta-group', {
        y: 20, opacity: 0, duration: 1.0, ease: 'power2.out', delay: 1.3,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="hero" className="hero-section">
      <div className="hero-name">
        <span className="hero-first">Justyce</span>
        <span className="hero-last">Hickman</span>
      </div>
      <p className="hero-sub">Designer &amp; Developer</p>
      <p className="hero-desc">Computer Science &amp; Engineering Student specialized in web development, c++, and graphic design</p>
      <div className="hero-cta-group">
        <CTAButton variant="accent">Projects</CTAButton>
        <a href="https://docs.google.com/document/d/1JvqmAZPXJqf94Yg_JQtAL9MNhnEEVRDg/export?format=pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <CTAButton variant="white">Download Resume</CTAButton>
        </a>
      </div>
    </section>
  )
}
