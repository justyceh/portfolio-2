import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Simulation resolution — smaller = faster, CSS stretches it to fill stage
const SIM_W = 520
const SIM_H = 320

export default function WaterCursor() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const dot = dotRef.current
    const ctx = canvas.getContext('2d')

    // Two height-field buffers (wave equation)
    let buf1 = new Float32Array(SIM_W * SIM_H)
    let buf2 = new Float32Array(SIM_W * SIM_H)
    const imageData = ctx.createImageData(SIM_W, SIM_H)
    const px = imageData.data

    // Disturb the surface at simulation coords
    function disturb(cx, cy, strength = 220, radius = 10) {
      const r = Math.round(radius)
      const ix = Math.round(cx)
      const iy = Math.round(cy)
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dy * dy > r * r) continue
          const sx = ix + dx
          const sy = iy + dy
          if (sx < 1 || sx >= SIM_W - 1 || sy < 1 || sy >= SIM_H - 1) continue
          buf1[sy * SIM_W + sx] = strength
        }
      }
    }

    // Wave propagation step (classic 2D wave equation)
    function step() {
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x
          buf2[i] =
            (buf1[i - 1] + buf1[i + 1] + buf1[i - SIM_W] + buf1[i + SIM_W]) * 0.5 - buf2[i]
          buf2[i] *= 0.987 // damping — controls how fast ripples die out
        }
      }
      const tmp = buf1; buf1 = buf2; buf2 = tmp
    }

    // Render: caustic refraction — bright where waves peak (light bends through water)
    function render() {
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x
          const gx = buf1[i + 1] - buf1[i - 1]
          const gy = buf1[i + SIM_W] - buf1[i - SIM_W]
          // Refraction light intensity from surface normal
          const light = Math.max(0, Math.min(255, (gx - gy) * 1.8))
          const idx = i * 4
          // Deep water colour base + caustic shimmer
          px[idx]     = Math.min(255,  3 + light * 0.32)  // R — stays dark
          px[idx + 1] = Math.min(255, 14 + light * 0.52)  // G — teal mid
          px[idx + 2] = Math.min(255, 32 + light * 0.88)  // B — dominant
          px[idx + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const tick = () => { step(); render() }
    gsap.ticker.add(tick)

    // Cursor dot quickTo (stage display coords, not sim coords)
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'none' })

    const onMove = (e) => {
      const rect = stage.getBoundingClientRect()
      // Map mouse → simulation pixel coords
      const sx = (e.clientX - rect.left) / rect.width  * SIM_W
      const sy = (e.clientY - rect.top)  / rect.height * SIM_H
      disturb(sx, sy)
      // Dot stays in display coords
      xDot(e.clientX - rect.left)
      yDot(e.clientY - rect.top)
    }

    stage.addEventListener('mousemove', onMove)

    return () => {
      stage.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div ref={ref}>
      <p className="section-title" style={{ marginTop: 0 }}>Water Cursor</p>
      <div className="water-stage" ref={stageRef}>
        <canvas ref={canvasRef} className="water-canvas" width={SIM_W} height={SIM_H} />
        <div className="water-cursor-dot" ref={dotRef} />
        <p className="water-hint">move your cursor</p>
      </div>
    </div>
  )
}
