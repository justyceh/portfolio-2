import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CTAButton({ children, variant = 'accent', className = '', ...props }) {
  const btnRef = useRef(null)
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' })

      const onMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      xTo((e.clientX - cx) * 0.6)
      yTo((e.clientY - cy) * 0.6)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    btn.addEventListener('mousemove', onMove)
    btn.addEventListener('mouseleave', onLeave)

    return () => {
      btn.removeEventListener('mousemove', onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Fallback ID generation
    const newRipple = {
      x,
      y,
      id: Date.now() + Math.random()
    }
    
    setRipples((prev) => [...prev, newRipple])

    if (props.onClick) {
      props.onClick(e)
    }
  }

  const handleAnimationEnd = (id) => {
    setRipples((prev) => prev.filter(r => r.id !== id))
  }

  return (
    <button 
      ref={btnRef} 
      className={`cta-btn ${variant} ${className}`} 
      onClick={handleClick}
      {...props}
    >
      <span className="cta-content">{children}</span>
      {ripples.map(r => (
        <span 
          key={r.id} 
          className="cta-ripple" 
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() => handleAnimationEnd(r.id)}
        />
      ))}
    </button>
  )
}
