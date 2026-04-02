import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const FLOATS = [
  { cls: 'float-a', y: -22, duration: 2.1, delay: 0,    rotate: true,  rot: 360,  rotDur: 8 },
  { cls: 'float-b', y: -16, duration: 2.9, delay: 0.35, rotate: false, scale: true },
  { cls: 'float-c', y: -28, duration: 1.8, delay: 0.7,  rotate: true,  rot: -360, rotDur: 5 },
  { cls: 'float-d', y: -18, duration: 2.5, delay: 0.15, rotate: false },
  { cls: 'float-e', y: -20, duration: 2.2, delay: 0.9,  rotate: true,  rot: 360,  rotDur: 7 },
  { cls: 'float-f', y: -24, duration: 3.1, delay: 0.5,  rotate: false, scale: true },
]

export default function FloatBounce() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      FLOATS.forEach(({ cls, y, duration, delay, rotate, rot, rotDur, scale }) => {
        gsap.to(`.${cls}`, {
          y,
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        if (rotate) {
          gsap.to(`.${cls}`, {
            rotation: rot,
            duration: rotDur,
            repeat: -1,
            ease: 'none',
          })
        }
        if (scale) {
          gsap.to(`.${cls}`, {
            scale: 1.12,
            duration: 1.6,
            delay: delay + 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Float &amp; Bounce</p>
      <div className="float-stage">
        <div className="float-shape float-a" />
        <div className="float-shape float-b" />
        <div className="float-shape float-c" />
        <div className="float-shape float-d" />
        <div className="float-shape float-e" />
        <div className="float-shape float-f" />
        <div className="float-center-label">
          <h2>Idle <span style={{ color: 'var(--accent)' }}>Loop</span></h2>
          <p>yoyo · repeat -1 · staggered phases</p>
        </div>
      </div>
    </div>
  )
}
