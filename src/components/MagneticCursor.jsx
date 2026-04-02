import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const BUTTONS = [
  { label: 'Hire Me',   sub: 'open to work', size: 'lg' },
  { label: 'Projects',  sub: 'view work',    size: 'md' },
  { label: 'Contact',   sub: 'get in touch', size: 'md' },
  { label: 'Resume',    sub: 'pdf',          size: 'sm' },
  { label: 'GitHub',    sub: 'code',         size: 'sm' },
  { label: 'X',         sub: 'tweets',       size: 'xs' },
]

export default function MagneticCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const cleanups = []

    ref.current.querySelectorAll('.magnetic-btn').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' })

      const onMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        xTo((e.clientX - cx) * 0.38)
        yTo((e.clientY - cy) * 0.38)
      }
      const onLeave = () => { xTo(0); yTo(0) }

      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onMove)
        btn.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Magnetic Cursor</p>
      <div className="magnetic-stage">
        {BUTTONS.map((b, i) => (
          <div key={i} className={`magnetic-btn ${b.size}`}>
            {b.label}
            <span>{b.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
