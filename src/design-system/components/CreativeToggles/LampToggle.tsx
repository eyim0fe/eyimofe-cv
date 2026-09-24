import React, { useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface LampToggleProps {
  isDark: boolean
  onToggle: () => void
  accentColor?: string
  size?: "sm" | "md" | "lg"
}

// Synthesize a tactile, crisp mechanical lamp switch click using Web Audio API
function playLampClickSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === "suspended") {
      ctx.resume()
    }

    const now = ctx.currentTime

    // 1. High-frequency mechanical transient snap (noise burst)
    const bufferSize = Math.floor(ctx.sampleRate * 0.012)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25))
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.setValueAtTime(3600, now)
    filter.Q.setValueAtTime(4, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.4, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    // 2. Physical switch body resonance (rapid downward pitch click)
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(1400, now)
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.022)

    oscGain.gain.setValueAtTime(0.35, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    noise.start(now)
    osc.start(now)
    osc.stop(now + 0.03)
    noise.stop(now + 0.03)
  } catch (err) {
    // Graceful fallback
  }
}

export const LampToggle: React.FC<LampToggleProps> = ({
  isDark,
  onToggle,
  accentColor = "#F59E0B"
}) => {
  const [isPulling, setIsPulling] = useState(false)
  const [showClickBadge, setShowClickBadge] = useState(false)
  const chainControls = useAnimation()

  const handlePull = async () => {
    setIsPulling(true)
    playLampClickSound()
    // Animate cord pulling down
    await chainControls.start({
      y: 20,
      transition: { type: "spring", stiffness: 700, damping: 15 }
    })

    // Trigger click sound / flash
    setShowClickBadge(true)
    onToggle()

    // Release back up
    await chainControls.start({
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 18 }
    })

    setIsPulling(false)
    setTimeout(() => setShowClickBadge(false), 600)
  }

  return (
    <div className="relative inline-flex flex-col items-center select-none" title="Pull cord to toggle light">
      {/* Lamp Fixture Top Mount */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Wall / Ceiling bracket */}
        <div className="w-10 h-2.5 rounded-t-sm bg-neutral-400 dark:bg-neutral-700 border-b border-black/20 shadow-xs" />
        
        {/* Brass Stem */}
        <div className="w-2.5 h-3 bg-amber-700/80 dark:bg-amber-600/60" />

        {/* Lamp Shade with authentic metallic/ceramic finish */}
        <div className="relative w-16 h-10 overflow-hidden rounded-t-xl border border-black/15 shadow-md">
          <div
            className="w-full h-full transition-colors duration-300"
            style={{
              backgroundColor: isDark ? "#232328" : "#383842",
              boxShadow: isDark
                ? "inset 0 4px 6px rgba(255,255,255,0.05), inset 0 -4px 8px rgba(0,0,0,0.6)"
                : "inset 0 4px 6px rgba(255,255,255,0.2), inset 0 -4px 8px rgba(0,0,0,0.4)"
            }}
          />
          {/* Bulb Rim & Glow */}
          <div
            className="absolute -bottom-1.5 inset-x-2 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: !isDark ? "#FEF08A" : "#2E2E38",
              boxShadow: !isDark
                ? "0 0 24px 6px rgba(245, 158, 11, 0.9), 0 0 48px 12px rgba(251, 191, 36, 0.5)"
                : "none"
            }}
          />
        </div>
      </div>

      {/* Hanging Pull Chain Cord */}
      <motion.div
        animate={chainControls}
        onClick={handlePull}
        className="relative z-30 -mt-1 flex flex-col items-center cursor-pointer group"
        whileHover={{ y: 3 }}
      >
        {/* Beaded pull chain links */}
        <div className="flex flex-col items-center gap-0.5 pt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 border border-black/20 shadow-xs group-hover:bg-amber-600 transition-colors"
            />
          ))}
        </div>

        {/* Pull weight fob / tassel */}
        <div
          className="w-3.5 h-5 mt-0.5 rounded-full border border-black/30 shadow-md transition-all group-hover:scale-110"
          style={{
            backgroundColor: !isDark ? "#D97706" : "#71717A",
            boxShadow: !isDark ? "0 2px 8px rgba(217, 119, 6, 0.5)" : "none"
          }}
        />

        {/* Tactile prompt tooltip on hover */}
        <span className="absolute left-6 top-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] px-2 py-0.5 rounded-xs bg-neutral-900 text-white font-mono pointer-events-none z-50">
          pull cord ↵
        </span>
      </motion.div>

      {/* Floating *click* animation badge */}
      {showClickBadge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1.1, y: -8 }}
          exit={{ opacity: 0 }}
          className="absolute -top-3 -right-6 text-xs font-mono font-bold text-amber-700 dark:text-amber-300 italic pointer-events-none z-50"
        >
          *click!*
        </motion.div>
      )}
    </div>
  )
}
