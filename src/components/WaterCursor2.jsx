import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SIM_W = 520
const SIM_H = 320

// Blinn-Phong halfway vector: H = normalize(keyLight + viewDir)
// keyLight ≈ (0.5, -0.5, 0.707), viewDir = (0, 0, 1)
// H = normalize(0.5, -0.5, 1.707) → (0.271, -0.271, 0.924)
const KLX =  0.5,   KLY = -0.5,   KLZ = 0.707
const HNX =  0.271, HNY = -0.271, HNZ = 0.924
// Soft fill light from lower-left to prevent full black shadows
const FLX = -0.4,   FLY =  0.3,   FLZ = 0.5

export default function WaterCursor2() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const dot = dotRef.current
    const ctx = canvas.getContext('2d')

    let buf1 = new Float32Array(SIM_W * SIM_H)
    let buf2 = new Float32Array(SIM_W * SIM_H)
    const imageData = ctx.createImageData(SIM_W, SIM_H)
    const px = imageData.data

    // Gaussian falloff disturb — tapers to edges for cleaner, rounder ripples
    function disturb(cx, cy, strength = 100, radius = 8) {
      const ix = Math.round(cx)
      const iy = Math.round(cy)
      const r2 = radius * radius
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const d2 = dx * dx + dy * dy
          if (d2 > r2) continue
          const sx = ix + dx
          const sy = iy + dy
          if (sx < 1 || sx >= SIM_W - 1 || sy < 1 || sy >= SIM_H - 1) continue
          buf1[sy * SIM_W + sx] = strength * Math.exp(-d2 / (r2 * 0.5))
        }
      }
    }

    function step() {
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x
          buf2[i] =
            (buf1[i - 1] + buf1[i + 1] + buf1[i - SIM_W] + buf1[i + SIM_W]) * 0.5 - buf2[i]
          buf2[i] *= 0.991
        }
      }
      const tmp = buf1; buf1 = buf2; buf2 = tmp
    }

    // Blinn-Phong render — surface normals + key/fill lights + specular glints
    function render() {
      for (let y = 1; y < SIM_H - 1; y++) {
        for (let x = 1; x < SIM_W - 1; x++) {
          const i = y * SIM_W + x

          // Surface normal from height field (outward = away from viewer)
          // nz controls bumpiness: lower = more dramatic waves
          const nx = buf1[i - 1] - buf1[i + 1]
          const ny = buf1[i - SIM_W] - buf1[i + SIM_W]
          const nz = 18.0
          const invLen = 1.0 / Math.sqrt(nx * nx + ny * ny + nz * nz)
          const nnx = nx * invLen
          const nny = ny * invLen
          const nnz = nz * invLen

          // Key light diffuse (upper-right, 45°)
          const keyDiff = Math.max(0, nnx * KLX + nny * KLY + nnz * KLZ)

          // Fill light diffuse (lower-left, soft) — lifts shadows
          const fillDiff = Math.max(0, nnx * FLX + nny * FLY + nnz * FLZ) * 0.22

          // Blinn-Phong specular — tight highlight = crisp water glint
          const specDot = Math.max(0, nnx * HNX + nny * HNY + nnz * HNZ)
          const spec = Math.pow(specDot, 90)

          // Ambient + diffuse + fill + specular
          // Base:  deep navy   (3,  15,  55)
          // Diff:  ocean blue  (+15, +75, +165) * keyDiff
          // Fill:  dark teal   (+4,  +18,  +40) * fillDiff
          // Spec:  white-blue  (+150,+205,+255) * spec
          const idx = i * 4
          px[idx]     = Math.min(255,  3 + keyDiff * 15  + fillDiff * 4  + spec * 150)
          px[idx + 1] = Math.min(255, 15 + keyDiff * 75  + fillDiff * 18 + spec * 205)
          px[idx + 2] = Math.min(255, 55 + keyDiff * 165 + fillDiff * 40 + spec * 255)
          px[idx + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const tick = () => { step(); render() }
    gsap.ticker.add(tick)

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'none' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'none' })

    const onMove = (e) => {
      const rect = stage.getBoundingClientRect()
      const sx = (e.clientX - rect.left) / rect.width  * SIM_W
      const sy = (e.clientY - rect.top)  / rect.height * SIM_H
      disturb(sx, sy)
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
      <p className="section-title" style={{ marginTop: 0 }}>Water Cursor II</p>
      <div className="water-stage" ref={stageRef}>
        <canvas ref={canvasRef} className="water-canvas" width={SIM_W} height={SIM_H} />
        <div className="water-cursor-dot" ref={dotRef} />
        <p className="water-hint">move your cursor</p>
      </div>
    </div>
  )
}
