import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  { num: '01', tag: 'Featured Work', title: 'Portfolio v3',       desc: 'GSAP-powered showcase with scroll-driven narratives.' },
  { num: '02', tag: 'E-Commerce',    title: 'Storefront UI',      desc: 'Cart animations, product reveals, micro-interactions.' },
  { num: '03', tag: 'SaaS',          title: 'Analytics Dash',     desc: 'Data-viz, live counters and chart entrance animations.' },
  { num: '04', tag: 'Motion',        title: 'Brand Film Site',    desc: 'Full-page horizontal scroll with parallax depth layers.' },
  { num: '05', tag: 'Mobile',        title: 'App Landing',        desc: 'Phone-frame scroll, feature reveals, CTA pulse loops.' },
  { num: '06', tag: 'Interactive',   title: 'Creative Lab',       desc: 'Playground for experimental WebGL + GSAP hybrids.' },
  { num: '07', tag: 'Editorial',     title: 'Digital Magazine',   desc: 'Text-reveal on scroll, pinned sections, custom cursor.' },
  { num: '08', tag: 'Open Source',   title: 'UI Kit',             desc: 'Component library with built-in animation primitives.' },
]

export default function HorizontalScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = ref.current.querySelector('.h-track')

      const getDistance = () => track.scrollWidth - ref.current.offsetWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <p className="section-title" style={{ marginTop: 0, paddingLeft: '60px' }}>Horizontal Scroll</p>
      <div className="h-outer">
        <div className="h-track" style={{ paddingLeft: '60px' }}>
          {CARDS.map((c) => (
            <div key={c.num} className="h-card">
              <div className="h-card-num">{c.num}</div>
              <div className="h-card-tag">{c.tag}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
