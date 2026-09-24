import React, { useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface CompactLampToggleProps {
  isDark: boolean
  onToggle: () => void
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
    // Gracefully handle environments with strict audio autoplay restrictions
  }
}

export const CompactLampToggle: React.FC<CompactLampToggleProps> = ({ isDark, onToggle }) => {
  const [showClick, setShowClick] = useState(false)
  const chainControls = useAnimation()

  const handlePull = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    playLampClickSound()
    await chainControls.start({
      y: 8,
      transition: { type: "spring", stiffness: 700, damping: 15 }
    })
    setShowClick(true)
    onToggle()
    await chainControls.start({
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 18 }
    })
    setTimeout(() => setShowClick(false), 450)
  }

  return (
    <button
      type="button"
      onClick={handlePull}
      className="relative inline-flex items-center gap-2 select-none cursor-pointer p-1.5 rounded-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-[#D5CEC5] dark:hover:border-[#38383E] focus:outline-hidden"
      style={{
        fontFamily: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif'
      }}
      title={`Click to switch to ${isDark ? "Light" : "Dark"} mode`}
      aria-label="Toggle light/dark mode"
    >
      {/* Mini Minimalist Lamp Cord Pull */}
      <div className="flex flex-col items-center">
        {/* Tiny shade top */}
        <div
          className="w-5 h-3 rounded-t-xs border border-neutral-400 dark:border-neutral-600 transition-colors"
          style={{
            backgroundColor: isDark ? "#2A2A30" : "#E8E4DC",
            boxShadow: !isDark ? "0 0 8px 1px rgba(245, 158, 11, 0.45)" : "none"
          }}
        />
        {/* Pull cord & bead */}
        <motion.div
          animate={chainControls}
          className="flex flex-col items-center"
        >
          <div className="w-[1px] h-2.5 bg-neutral-400 dark:bg-neutral-500" />
          <div
            className="w-2 h-2 rounded-full border border-black/20 shadow-xs transition-colors"
            style={{
              backgroundColor: !isDark ? "#D97706" : "#A1A1AA"
            }}
          />
        </motion.div>
      </div>

      {/* Mode readout */}
      <span className="text-xs opacity-75">
        {isDark ? "Dark" : "Light"}
      </span>

      {showClick && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: -4 }}
          exit={{ opacity: 0 }}
          className="absolute -top-3 -right-2 text-[10px] text-amber-700 dark:text-amber-300 italic pointer-events-none"
        >
          *click*
        </motion.span>
      )}
    </button>
  )
}
