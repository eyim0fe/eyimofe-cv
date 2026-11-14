import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ChowLampToggleProps {
  isDark: boolean
  onToggle: (newIsDark: boolean) => void
  className?: string
}

let audioCtx: AudioContext | null = null
let noiseBuffer: AudioBuffer | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (audioCtx) return audioCtx
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return null
  try {
    audioCtx = new AudioContextClass()
  } catch {
    return null
  }
  return audioCtx
}

function playLampClickSound(isGoingDark: boolean) {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const now = ctx.currentTime + 0.002

  // 1. Mechanical transient click
  if (!noiseBuffer) {
    const size = Math.ceil(ctx.sampleRate * 0.016)
    noiseBuffer = ctx.createBuffer(1, size, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, 2.2)
    }
  }

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.2, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
  noiseGain.connect(ctx.destination)

  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = noiseBuffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(isGoingDark ? 3000 : 2500, now)
  filter.Q.setValueAtTime(1.8, now)

  noiseSource.connect(filter)
  filter.connect(noiseGain)
  noiseSource.start(now)

  // 2. Resonant spring body tone
  const osc = ctx.createOscillator()
  const oscGain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(isGoingDark ? 2000 : 1600, now)
  osc.frequency.exponentialRampToValueAtTime(isGoingDark ? 1200 : 980, now + 0.038)

  oscGain.gain.setValueAtTime(0.0001, now)
  oscGain.gain.exponentialRampToValueAtTime(0.28, now + 0.003)
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

  osc.connect(oscGain)
  oscGain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.05)
}

export const ChowLampToggle: React.FC<ChowLampToggleProps> = ({
  isDark,
  onToggle,
  className = '',
}) => {
  const beadRef = useRef<HTMLButtonElement>(null)
  const lampFixtureRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isArmed, setIsArmed] = useState(false)

  // Motion physics
  const pullY = useMotionValue(0)
  const pullX = useMotionValue(0)
  const cordLen = useMotionValue(36)

  const cordAngle = useTransform([pullX, cordLen], ([x, len]) => {
    return (Math.atan2(Number(x), Number(len)) * 180) / Math.PI
  })

  const cordScale = useTransform([pullX, pullY, cordLen], ([x, y, len]) => {
    const hyp = Math.hypot(Number(x), Number(len) + Number(y))
    return Math.max(1, hyp / Number(len))
  })

  // Origin-aware View Transition
  const triggerViewTransition = useCallback(
    (nextState: boolean) => {
      playLampClickSound(nextState)

      const doc = document as unknown as {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> }
      }

      if (typeof doc.startViewTransition === 'function' && beadRef.current) {
        const beadRect = beadRef.current.getBoundingClientRect()
        const x = beadRect.left + beadRect.width / 2
        const y = beadRect.top + beadRect.height / 2
        document.documentElement.style.setProperty('--vt-x', `${x}px`)
        document.documentElement.style.setProperty('--vt-y', `${y}px`)

        doc.startViewTransition(() => {
          onToggle(nextState)
        })
      } else {
        onToggle(nextState)
      }
    },
    [onToggle]
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setIsArmed(false)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const clientY = e.clientY
    const clientX = e.clientX

    if (beadRef.current) {
      const rect = beadRef.current.getBoundingClientRect()
      const originY = rect.top
      const originX = rect.left + rect.width / 2

      const dy = Math.max(0, Math.min(clientY - originY, 52))
      const dx = Math.max(-28, Math.min(clientX - originX, 28))

      pullY.set(dy)
      pullX.set(dx)

      if (dy > 24 && !isArmed) {
        setIsArmed(true)
      } else if (dy <= 24 && isArmed) {
        setIsArmed(false)
      }
    }
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (isArmed) {
      triggerViewTransition(!isDark)
    }

    setIsArmed(false)

    animate(pullY, 0, {
      type: 'spring',
      stiffness: 700,
      damping: 24,
      mass: 0.8,
    })
    animate(pullX, 0, {
      type: 'spring',
      stiffness: 700,
      damping: 24,
      mass: 0.8,
    })
  }

  return (
    <div
      ref={lampFixtureRef}
      className={`relative flex flex-col items-center select-none pointer-events-auto ${className}`}
      title={isDark ? 'Pull to switch to Day mode' : 'Pull to switch to Night mode'}
    >
      {/* 1. CEILING MOUNT BRACKET */}
      <div className="w-8 h-2.5 rounded-b-md bg-[#0E2233] border-2 border-[#0E2233] dark:bg-[#FED766] dark:border-[#FED766] shadow-[1px_1px_0_#0E2233]" />

      {/* 2. RIGID BRASS STEM WIRE */}
      <div className="w-1 h-5 bg-[#0E2233] dark:bg-[#FED766]" />

      {/* 3. NEO-BRUTALIST LAMP SHADE */}
      <div className="relative flex flex-col items-center">
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          className="overflow-visible filter drop-shadow-[2px_2px_0_#0E2233]"
        >
          {/* Top cap */}
          <rect
            x="18"
            y="0"
            width="12"
            height="5"
            rx="1.5"
            fill={isDark ? '#FED766' : '#FF5B22'}
            stroke="#0E2233"
            strokeWidth="2"
          />

          {/* Lamp shade bell */}
          <path
            d="M 18 5 L 6 24 C 6 28, 42 28, 42 24 L 30 5 Z"
            fill={isDark ? '#00C988' : '#FED766'}
            stroke="#0E2233"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner bulb */}
          <ellipse
            cx="24"
            cy="24"
            rx="6"
            ry="4"
            fill={isDark ? '#FFFFFF' : '#FFFCF0'}
            stroke="#0E2233"
            strokeWidth="1.8"
          />
        </svg>

        {/* DIRECTIONAL LIGHT CONE PROJECTION */}
        <div
          className={`absolute top-7 left-1/2 -translate-x-1/2 w-64 h-72 pointer-events-none transition-opacity duration-500 ${
            isDark ? 'opacity-35' : 'opacity-85'
          }`}
          style={{
            background: isDark
              ? 'conic-gradient(from 150deg at 50% 0%, transparent 0deg, rgba(0, 201, 136, 0.4) 30deg, rgba(254, 215, 102, 0.45) 60deg, transparent 60deg)'
              : 'conic-gradient(from 150deg at 50% 0%, transparent 0deg, rgba(254, 215, 102, 0.5) 30deg, rgba(255, 255, 255, 0.6) 60deg, transparent 60deg)',
            filter: 'blur(10px)',
            mixBlendMode: isDark ? 'screen' : 'multiply',
          }}
        />
      </div>

      {/* 4. SPRING PULL CORD & BEAD */}
      <div className="relative flex flex-col items-center">
        {/* Cord line */}
        <motion.div
          className="w-0.5 bg-[#0E2233] dark:bg-[#FED766] origin-top"
          style={{
            height: cordLen,
            rotate: cordAngle,
            scaleY: cordScale,
          }}
        />

        {/* Pull bead trigger */}
        <motion.button
          ref={beadRef}
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={() => triggerViewTransition(!isDark)}
          style={{
            x: pullX,
            y: pullY,
          }}
          className={`w-6 h-6 rounded-full border-2 border-[#0E2233] cursor-grab active:cursor-grabbing flex items-center justify-center shadow-[2px_2px_0_#0E2233] transition-colors ${
            isArmed
              ? 'bg-[#FF5B22] scale-110'
              : isDark
              ? 'bg-[#FED766] hover:bg-[#FED766]/80'
              : 'bg-[#00C988] hover:bg-[#00C988]/80'
          }`}
          aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          <span className="w-2 h-2 rounded-full bg-[#0E2233]" />
        </motion.button>
      </div>
    </div>
  )
}

