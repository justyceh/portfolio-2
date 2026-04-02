import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TimelineChain() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from('.tl-ring',   { scale: 2.5, opacity: 0, duration: 0.8, ease: 'expo.out' })
        .from('.tl-circle', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.3')
        .from('.tl-rect',   { x: -180, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15')
        .from('.tl-text',   { opacity: 0, y: 24, duration: 0.4, ease: 'power2.out' }, '<0.25')
        .to  ('.tl-circle', { rotation: 360, duration: 1.2, ease: 'power1.inOut' }, '+=0.1')
        .from('.tl-line',   { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power2.inOut' }, '<0.2')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Timeline Chain</p>
      <div className="tl-stage">
        <div className="tl-ring" />
        <div className="tl-circle" />
        <div className="tl-rect" />
        <div className="tl-text">Timeline</div>
        <div className="tl-line" />
      </div>
      <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center' }}>
        Sequential &amp; overlapping tweens — position strings: <code style={{ color: 'var(--accent)', background: 'rgba(110,231,255,0.08)', padding: '2px 6px', borderRadius: '3px' }}>'-=0.3'</code>&nbsp;&nbsp;<code style={{ color: 'var(--accent2)', background: 'rgba(167,139,250,0.08)', padding: '2px 6px', borderRadius: '3px' }}>'&lt;0.25'</code>&nbsp;&nbsp;<code style={{ color: 'var(--accent3)', background: 'rgba(240,180,41,0.08)', padding: '2px 6px', borderRadius: '3px' }}>'+=0.1'</code>
      </p>
    </div>
  )
}
