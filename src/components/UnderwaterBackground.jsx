import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

const SIM_W = 280
const SIM_H = 160

function noiseAt(x, y, t) {
  const a = Math.sin(x * 0.020 + t * 0.14) * Math.cos(y * 0.024 + t * 0.11)
  const b = Math.sin(x * 0.038 + y * 0.030 + t * 0.07) * 0.55
  const c = Math.cos(x * 0.009 - y * 0.013 + t * 0.04) * 0.38
  return (a + b + c) / 2.0
}

export default function UnderwaterBackground() {
  const canvasRef = useRef(null)
  const dotRef = useRef(null)
  const timerRef = useRef(null)
  const simActive = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const dot = dotRef.current
    const ctx = canvas.getContext('2d')

    let buf1 = new Float32Array(SIM_W * SIM_H)
    let buf2 = new Float32Array(SIM_W * SIM_H)
    const imageData = ctx.createImageData(SIM_W, SIM_H)
    const px = imageData.data

    // OPT 5: Pre-fill alpha channel once — never written again in the loop
    for (let i = 3; i < px.length; i += 4) px[i] = 255

    const vignette = new Float32Array(SIM_W * SIM_H)
    for (let y = 0; y < SIM_H; y++) {
      for (let x = 0; x < SIM_W; x++) {
        const nx = (x / SIM_W - 0.5) * 2
        const ny = (y / SIM_H - 0.5) * 2
        vignette[y * SIM_W + x] = Math.max(0.55, 1.0 - (nx * nx + ny * ny) * 0.35)
      }
    }

    // OPT 1: Pre-baked noise LUT — recomputed every 3 frames instead of every pixel every frame
    const noiseLUT = new Float32Array(SIM_W * SIM_H)
    let noiseFrame = 0
    function updateNoiseLUT(t) {
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          noiseLUT[y * SIM_W + x] = noiseAt(x, y, t) * 0.5 + 0.5
        }
      }
    }

    function disturb(cx, cy, strength = 18, radius = 12) {
      const ix = Math.round(cx)
      const iy = Math.round(cy)
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy > radius * radius) continue
          const sx = ix + dx
          const sy = iy + dy
          if (sx < 1 || sx >= SIM_W - 1 || sy < 1 || sy >= SIM_H - 1) continue
          buf1[sy * SIM_W + sx] = strength
        }
      }
      simActive.current = true
    }

    function scheduleDisturb() {
      timerRef.current = setTimeout(() => {
        disturb(
          10 + Math.random() * (SIM_W - 20),
          10 + Math.random() * (SIM_H - 20),
          25,
          15
        )
        scheduleDisturb()
      }, 1000 + Math.random() * 2000)
    }
    scheduleDisturb()

    function step() {
      let maxVal = 0
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x
          buf2[i] =
            (buf1[i - 1] + buf1[i + 1] + buf1[i - SIM_W] + buf1[i + SIM_W]) * 0.5 - buf2[i]
          buf2[i] *= 0.990
          if (Math.abs(buf2[i]) > maxVal) maxVal = Math.abs(buf2[i])
        }
      }
      const tmp = buf1; buf1 = buf2; buf2 = tmp
      simActive.current = maxVal > 0.01
    }

    let time = 0
    function render() {
      time += 0.016
      noiseFrame++

      // OPT 1: Only recompute noise LUT every 3 frames
      if (noiseFrame % 3 === 0) updateNoiseLUT(time)

      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x
          const n = noiseLUT[i]
          const gx = buf1[i + 1] - buf1[i - 1]
          const gy = buf1[i + SIM_W] - buf1[i - SIM_W]
          const wave = Math.max(0, (gx - gy) * 0.45)
          const vig = vignette[i]
          const baseR = (2 + n * 5) * vig
          const baseG = (6 + n * 14) * vig
          const baseB = (20 + n * 28) * vig
          const idx = i * 4
          px[idx]     = Math.min(255, baseR + wave * 0.09)
          px[idx + 1] = Math.min(255, baseG + wave * 0.14)
          px[idx + 2] = Math.min(255, baseB + wave * 0.28)
          // OPT 5: alpha (idx+3) pre-filled — skip entirely
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    // Seed the LUT before first render
    updateNoiseLUT(time)

    const tick = () => { if (simActive.current) step(); render() }
    gsap.ticker.add(tick)

    // OPT 3: Pause ticker when browser tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        gsap.ticker.remove(tick)
      } else {
        gsap.ticker.add(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // OPT 4: Pause ticker when canvas is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.ticker.add(tick)
        } else {
          gsap.ticker.remove(tick)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Global cursor — tracks the full window, maps into sim coords for disturbance
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'none' })

    // OPT 2: Throttle mousemove disturbances to max once per frame (~16ms)
    let lastMoveTime = 0
    const onMove = (e) => {
      xDot(e.clientX)
      yDot(e.clientY)
      const now = performance.now()
      if (now - lastMoveTime < 16) return
      lastMoveTime = now
      const sx = (e.clientX / window.innerWidth) * SIM_W
      const sy = (e.clientY / window.innerHeight) * SIM_H
      disturb(sx, sy, 0.3, 2)
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
      clearTimeout(timerRef.current)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div className="underwater-bg">
        <canvas ref={canvasRef} className="underwater-canvas" width={SIM_W} height={SIM_H} />
      </div>
      {createPortal(<div ref={dotRef} className="global-cursor-dot" />, document.body)}
    </>
  )
}
