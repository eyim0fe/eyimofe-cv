import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface AuthenticBimanshuLampProps {
  isDark: boolean
  onToggle: (newIsDark: boolean) => void
  className?: string
}

// Synthesize authentic physical switch click using Web Audio API
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

function playBimanshuClickSound(isGoingDark: boolean) {
  const ctx = getAudioContext()
  if (!ctx) return
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const now = ctx.currentTime + 0.003

  // 1. Transient noise burst
  if (!noiseBuffer) {
    const size = Math.ceil(ctx.sampleRate * 0.018)
    noiseBuffer = ctx.createBuffer(1, size, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / size, 2.5)
    }
  }

  const noiseGain = ctx.createGain()
  noiseGain.gain.setValueAtTime(0.18, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
  noiseGain.connect(ctx.destination)

  const noiseSource = ctx.createBufferSource()
  noiseSource.buffer = noiseBuffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(isGoingDark ? 3200 : 2600, now)
  filter.Q.setValueAtTime(1.5, now)

  noiseSource.connect(filter)
  filter.connect(noiseGain)
  noiseSource.start(now)

  // 2. Body pitch resonance
  const osc = ctx.createOscillator()
  const oscGain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(isGoingDark ? 2100 : 1650, now)
  osc.frequency.exponentialRampToValueAtTime(isGoingDark ? 1350 : 1050, now + 0.035)

  oscGain.gain.setValueAtTime(0.0001, now)
  oscGain.gain.exponentialRampToValueAtTime(0.3, now + 0.003)
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

  osc.connect(oscGain)
  oscGain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.055)
}

export const AuthenticBimanshuLamp: React.FC<AuthenticBimanshuLampProps> = ({
  isDark,
  onToggle,
  className = '',
}) => {
  const cordRef = useRef<HTMLSpanElement>(null)
  const beadRef = useRef<HTMLButtonElement>(null)
  const lampFixtureRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isArmed, setIsArmed] = useState(false)

  // Drag physics motion values
  const pullY = useMotionValue(0)
  const pullX = useMotionValue(0)
  const cordLen = useMotionValue(42)

  // Rotate cord and scale length based on pull displacement
  const cordTransform = useTransform(
    [pullX, pullY, cordLen],
    ([x, y, len]: number[]) => {
      const angle = (-Math.atan2(x, len + y) * 180) / Math.PI
      const scale = Math.hypot(x, len + y) / len
      return `rotate(${angle.toFixed(2)}deg) scaleY(${scale.toFixed(3)})`
    }
  )

  // Measure initial cord length
  useEffect(() => {
    if (cordRef.current) {
      cordLen.set(cordRef.current.offsetHeight || 42)
    }
  }, [cordLen])

  // Trigger theme toggle with View Transition ripple
  const triggerToggle = useCallback(
    (originX?: number, originY?: number) => {
      const nextMode = !isDark
      playBimanshuClickSound(nextMode)

      let x = originX
      let y = originY

      if (x === undefined || y === undefined) {
        if (beadRef.current) {
          const rect = beadRef.current.getBoundingClientRect()
          x = rect.left + rect.width / 2
          y = rect.top + rect.height / 2
        } else {
          x = window.innerWidth - 60
          y = 50
        }
      }

      // Check if browser supports View Transitions
      const doc = document as unknown as {
        startViewTransition?: (callback: () => void) => { ready: Promise<void> }
      }

      if (typeof doc.startViewTransition === 'function') {
        document.documentElement.style.setProperty('--vt-x', `${x}px`)
        document.documentElement.style.setProperty('--vt-y', `${y}px`)
        document.documentElement.dataset.vt = 'reveal'

        doc.startViewTransition(() => {
          onToggle(nextMode)
        })
      } else {
        // Fallback for non-supporting browsers
        onToggle(nextMode)
      }
    },
    [isDark, onToggle]
  )

  // Drag handling
  const dragStartRef = useRef<{
    pointerId: number
    startX: number
    startY: number
  } | null>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
    }
    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return
    const dy = e.clientY - dragStartRef.current.startY
    const dx = e.clientX - dragStartRef.current.startX

    // Clamp and rubberband
    const dampedY = dy <= 0 ? dy * 0.2 : dy < 50 ? dy : 50 + (dy - 50) * 0.35
    const dampedX = Math.max(-20, Math.min(20, dx * 0.4))

    pullY.set(Math.max(-8, dampedY))
    pullX.set(dampedX)

    const armed = dampedY >= 32
    if (armed !== isArmed) {
      setIsArmed(armed)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return
    dragStartRef.current = null
    setIsDragging(false)

    const currentY = pullY.get()
    const currentX = pullX.get()
    const shouldFire = currentY >= 28 || isArmed

    // Snap back with spring
    animate(pullY, 0, { type: 'spring', stiffness: 500, damping: 15, bounce: 0.3 })
    animate(pullX, 0, { type: 'spring', stiffness: 450, damping: 18 })

    setIsArmed(false)

    if (shouldFire) {
      triggerToggle(e.clientX, e.clientY)
    }
  }

  // Click toggle (for quick click or keyboard activation)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    animate(pullY, 20, { duration: 0.1, ease: 'easeOut' }).then(() => {
      triggerToggle()
      animate(pullY, 0, { type: 'spring', stiffness: 450, damping: 16 })
    })
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-auto ${className}`}
      style={{ viewTransitionName: 'lamp' }}
    >
      {/* 1. CEILING MOUNT CANOPY */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Brass / bronze ceiling bracket */}
        <div className="w-9 sm:w-11 h-2 rounded-b-md bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 shadow-xs border-b border-black/30" />

        {/* Stem wire connecting mount to shade */}
        <div className="w-[1.5px] h-3 sm:h-4 bg-neutral-600 dark:bg-neutral-400" />
      </div>

      {/* 2. LAMP FIXTURE SHADE & BULB (SVG) */}
      <div
        ref={lampFixtureRef}
        className="relative z-20 -mt-0.5 flex flex-col items-center"
      >
        <svg
          viewBox="0 0 48 34"
          className="w-12 h-8 sm:w-14 sm:h-10 overflow-visible drop-shadow-md"
          aria-hidden="true"
        >
          <defs>
            {/* Lamp shade metallic gradient */}
            <linearGradient id="bimanshuShade" x1="0" y1="0" x2="1" y2="0.35">
              <stop
                offset="0%"
                stopColor={isDark ? '#3D3934' : '#E8A338'}
                className="transition-colors duration-300"
              />
              <stop
                offset="55%"
                stopColor={isDark ? '#262422' : '#C7821B'}
                className="transition-colors duration-300"
              />
              <stop
                offset="100%"
                stopColor={isDark ? '#181614' : '#8A5308'}
                className="transition-colors duration-300"
              />
            </linearGradient>

            {/* Lit bulb glow */}
            <radialGradient id="lampGlow" cx="24" cy="28.4" r="13" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF9EB" stopOpacity={!isDark ? '0.95' : '0'} />
              <stop offset="35%" stopColor="#FBBF24" stopOpacity={!isDark ? '0.6' : '0'} />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity={!isDark ? '0.2' : '0'} />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>

            {/* Bloom gradient */}
            <radialGradient id="lampBloom" cx="24" cy="28.4" r="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity={!isDark ? '0.35' : '0'} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Glass bulb gradient */}
            <radialGradient id="lampGlass" cx="0.4" cy="0.6" r="0.7">
              <stop offset="0%" stopColor={!isDark ? '#FFFBEB' : '#52525B'} />
              <stop offset="100%" stopColor={!isDark ? '#FDE68A' : '#27272A'} />
            </radialGradient>

            <clipPath id="lampBelowClip">
              <rect x="-30" y="25.6" width="108" height="40" />
            </clipPath>
          </defs>

          {/* Inner shade ceiling */}
          <ellipse
            cx="24"
            cy="26.5"
            rx="20.4"
            ry="1.3"
            fill={!isDark ? '#FDF4DC' : '#1F1E1D'}
            className="transition-colors duration-300"
          />

          {/* Glass bulb */}
          <circle
            cx="24"
            cy="27.8"
            r="4.6"
            fill="url(#lampGlass)"
            stroke={!isDark ? '#F59E0B' : '#3F3F46'}
            strokeWidth="0.6"
            className="transition-colors duration-300"
          />

          {/* Lit bulb bloom & illumination (Active in Light mode) */}
          {!isDark && (
            <g clipPath="url(#lampBelowClip)" className="mix-blend-screen pointer-events-none">
              <circle cx="24" cy="28.4" r="24" fill="url(#lampBloom)" />
              <circle cx="24" cy="28.4" r="13" fill="url(#lampGlow)" />
            </g>
          )}

          {/* Outer Shade Path */}
          <path
            fill="url(#bimanshuShade)"
            stroke={isDark ? '#141416' : '#78350F'}
            strokeWidth="0.6"
            d="M19 7h10c.9 0 1.7.6 2 1.5 1.9 6.6 6.3 12.6 13.3 15.8 1.4.6 1 2.2-.5 2.2H4.2c-1.5 0-1.9-1.6-.5-2.2C10.7 21.1 15.1 15.1 17 8.5c.3-.9 1.1-1.5 2-1.5Z"
            className="transition-colors duration-300"
          />

          {/* Metallic Sheen line */}
          <path
            d="M16.2 12.6C14 17.4 10.6 20.9 6.6 23.1"
            fill="none"
            stroke={!isDark ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Brass Cap atop shade */}
          <rect
            x="20.5"
            y="0"
            width="7"
            height="6"
            rx="1.5"
            fill="#B4833E"
            stroke="#78350F"
            strokeWidth="0.5"
          />
          <rect
            x="19"
            y="5"
            width="10"
            height="2.6"
            rx="1.3"
            fill="#8C5E24"
            stroke="#523211"
            strokeWidth="0.5"
          />

          {/* Cord eyelet ring at right edge (36, 25.1) */}
          <circle cx="36" cy="25.1" r="1.1" fill="#B4833E" stroke="#523211" strokeWidth="0.6" />
        </svg>

        {/* 3. DIRECTIONAL LIGHT CONE BEAM (Day/Light Mode projection) */}
        {!isDark && (
          <div
            className="absolute top-7 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 z-10"
            style={{
              width: '180px',
              height: '140px',
              clipPath: 'polygon(calc(50% - 18px) 0, calc(50% + 18px) 0, 100% 100%, 0 100%)',
              background:
                'radial-gradient(60% 100% at 50% 0, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 100%)',
              mixBlendMode: 'plus-lighter',
              filter: 'blur(1px)',
            }}
          />
        )}

        {/* 4. HANGING PULL CORD & BEAD (Originating at eyelet x=36 of 48) */}
        <div
          className="absolute top-[25px] left-[75%] -translate-x-1/2 w-0 h-0 z-30"
          style={{ transformOrigin: '50% 0' }}
        >
          {/* Flexible Cord Line */}
          <motion.span
            ref={cordRef}
            className="absolute top-0 left-[-0.75px] w-[1.5px] h-10 sm:h-12 bg-amber-900/60 dark:bg-amber-200/50 rounded-full"
            style={{
              transform: cordTransform,
              transformOrigin: '50% 0',
            }}
            aria-hidden="true"
          />

          {/* Tactile Grab Bead Button */}
          <motion.button
            ref={beadRef}
            type="button"
            className="absolute top-10 sm:top-12 left-[-18px] w-9 h-9 flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none group/bead"
            style={{
              x: pullX,
              y: pullY,
            }}
            aria-label={`Toggle mode: Currently ${isDark ? 'Dark' : 'Light'}. Pull cord to switch.`}
            title="Pull cord to toggle light/dark"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={handleClick}
          >
            {/* The Brass Bead */}
            <motion.span
              animate={{
                scale: isArmed ? 1.25 : isDragging ? 1.15 : 1,
              }}
              transition={{ duration: 0.15 }}
              className="w-3 h-3.5 rounded-full shadow-md border border-black/30 transition-colors"
              style={{
                background: !isDark
                  ? 'radial-gradient(circle at 35% 30%, #FDE68A, #D97706 65%, #92400E)'
                  : 'radial-gradient(circle at 35% 30%, #D4D4D8, #71717A 65%, #3F3F46)',
                boxShadow: isArmed
                  ? '0 0 12px 2px rgba(245, 158, 11, 0.8)'
                  : '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />

            {/* Hover Tooltip Hint */}
            <span className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover/bead:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-neutral-900/90 text-white dark:bg-white/90 dark:text-neutral-900 shadow-sm pointer-events-none">
              {isDark ? 'Pull for day ☀️' : 'Pull for night 🌙'}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

