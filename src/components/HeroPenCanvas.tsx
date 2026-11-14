import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  time: number
}

interface FloatingWordBadge {
  id: string
  text: string
  x: number
  y: number
  color: string
  textColor: string
  rotation: number
}

const PM_WORDS = [
  'Complete sprint ⚡',
  'Attend standup ☕',
  'Review PRD 📋',
  'Ship to prod 🚀',
  'Triage P0 bug 🐛',
  'User interview 🎙️',
  '1:1 with Eng 💬',
  'Backlog grooming 🧹',
  'Check telemetry 📈',
  'Align stakeholders 🤝',
  'Define OKRs 🎯',
  'Run A/B test 🧪',
  'Figma handoff 🎨',
  'Unblock team 🔓',
  'Release notes 📝',
]

const CHOW_PILL_THEMES = [
  { bg: '#1B4332', text: '#FFFFFF' }, // Deep forest pine
  { bg: '#2D6A4F', text: '#FFFFFF' }, // Rich dark emerald
  { bg: '#D8F3DC', text: '#1B4332' }, // Soft sage
  { bg: '#2A6F55', text: '#FFFFFF' }, // Forest moss
  { bg: '#E8F5E9', text: '#1B4332' }, // Pale eucalyptus
]

interface HeroPenCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export function HeroPenCanvas({ containerRef }: HeroPenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [badges, setBadges] = useState<FloatingWordBadge[]>([])
  const pointsRef = useRef<TrailPoint[]>([])
  const wordIndexRef = useRef(0)
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null)
  const lastSpawnTime = useRef(0)
  const isInteractingRef = useRef(false)
  const lastPointTime = useRef(0)

  // SPAWN PRODUCT WORD BADGE (Gentle, rare, discrete)
  const spawnWordBadge = useCallback((x: number, y: number, containerRect: DOMRect) => {
    const word = PM_WORDS[wordIndexRef.current % PM_WORDS.length]
    wordIndexRef.current += 1

    const theme = CHOW_PILL_THEMES[Math.floor(Math.random() * CHOW_PILL_THEMES.length)]
    const rotation = (Math.random() - 0.5) * 8 // -4deg to +4deg

    // Keep badge inside container boundaries
    const safeX = Math.max(20, Math.min(containerRect.width - 180, x - 50))
    const safeY = Math.max(30, Math.min(containerRect.height - 60, y - 30))

    const newBadge: FloatingWordBadge = {
      id: `pm-word-${Date.now()}-${Math.random()}`,
      text: word,
      x: safeX,
      y: safeY,
      color: theme.bg,
      textColor: theme.text,
      rotation,
    }

    setBadges(() => [newBadge]) // Keep at most 1 subtle badge at a time

    // Automatically remove after 1.5 seconds
    setTimeout(() => {
      setBadges((prev) => prev.filter((b) => b.id !== newBadge.id))
    }, 1500)
  }, [])

  // SETUP CANVAS & POINTER TRACKING
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return

      const now = performance.now()
      isInteractingRef.current = true
      lastPointTime.current = now

      // Add trail point
      pointsRef.current.push({ x, y, time: now })

      // Distance & Time check for spawning PM words (Quiet, gentle)
      if (!lastSpawnPos.current) {
        lastSpawnPos.current = { x, y }
        lastSpawnTime.current = now
      } else {
        const dist = Math.hypot(x - lastSpawnPos.current.x, y - lastSpawnPos.current.y)
        const elapsed = now - lastSpawnTime.current
        if (dist > 280 && elapsed > 2200) {
          lastSpawnPos.current = { x, y }
          lastSpawnTime.current = now
          spawnWordBadge(x, y, rect)
        }
      }
    }

    const onPointerLeave = () => {
      isInteractingRef.current = false
      lastSpawnPos.current = null
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', onPointerLeave)

    // CANVAS 60FPS INK STROKE DRAW LOOP (Subtle & clean)
    const TRAIL_LIFETIME = 500 // 500ms quick, graceful fade
    const MAX_SEGMENT_DIST = 70 // Never connect points jumped further than 70px

    const render = () => {
      const now = performance.now()
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      // Purge expired points
      const pts = pointsRef.current
      while (pts.length > 0 && now - pts[0].time > TRAIL_LIFETIME) {
        pts.shift()
      }

      // Draw ink stroke segments
      if (pts.length > 1) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let i = 1; i < pts.length; i++) {
          const p1 = pts[i - 1]
          const p2 = pts[i]

          const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
          if (segDist > MAX_SEGMENT_DIST) continue

          const age = now - p2.time
          const alpha = Math.max(0, 1 - age / TRAIL_LIFETIME)
          const strokeWidth = Math.max(1, 2.2 * alpha)

          ctx.beginPath()
          ctx.strokeStyle = `rgba(30, 77, 56, ${alpha * 0.45})` // Refined deep forest moss ink
          ctx.lineWidth = strokeWidth
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }

        // Tiny ink bead at leading point
        if (now - lastPointTime.current < 100 && pts.length > 0) {
          const tip = pts[pts.length - 1]
          ctx.beginPath()
          ctx.fillStyle = 'rgba(30, 77, 56, 0.6)'
          ctx.arc(tip.x, tip.y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [containerRef, spawnWordBadge])

  return (
    <>
      {/* 1. BUTTERY SMOOTH INK PEN CANVAS (Only draws ink lines, 0 artifacts) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* 2. CHOWDECK NEO-BRUTALIST FLOATING PM WORD PILLS (HTML / Framer Motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {badges.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: -24 }}
              exit={{ opacity: 0, scale: 0.85, y: -45 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="absolute pointer-events-none px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border-2 border-[#0E2233] shadow-[3px_3px_0_#0E2233]"
              style={{
                left: b.x,
                top: b.y,
                backgroundColor: b.color,
                color: b.textColor,
                transform: `rotate(${b.rotation}deg)`,
              }}
            >
              {b.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
