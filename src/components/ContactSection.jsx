import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTAButton from './CTAButton'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cont-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="contact-section">
      <div className="contact-container">

        <div className="contact-info">
          <p className="cont-eyebrow cont-animate">Contact Me</p>
          <h2 className="cont-title cont-animate">Let's<br />Connect.</h2>
          <p className="cont-desc cont-animate">
            I am currently looking for an internship, I would love to apply my problem solving skills in here reno, I love coding and computers and would love to build even greater projects with a team!
          </p>
        </div>

        <div className="contact-links cont-animate" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>
          <CTAButton
            variant="accent"
            onClick={() => window.open('https://linkedin.com/in/justycehickman', '_blank')}
          >
            LinkedIn Profile
          </CTAButton>

          <CTAButton
            variant="white"
            onClick={() => window.open('https://github.com/justyceh', '_blank')}
          >
            GitHub Repository
          </CTAButton>

          <CTAButton
            variant="white"
            onClick={() => window.location.href = 'mailto:justyceh@unr.edu'}
          >
            Email Me
          </CTAButton>
        </div>

      </div>
    </section>
  )
}
