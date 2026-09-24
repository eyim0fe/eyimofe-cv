import React from "react"
import { motion } from "framer-motion"

interface ApertureToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const ApertureToggle: React.FC<ApertureToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm cursor-pointer shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors focus:outline-none focus:ring-1 focus:ring-neutral-400"
      title={`Toggle ${isDark ? "Daylight (f/1.4)" : "Darkroom (f/16)"}`}
      aria-label="Toggle Aperture Iris"
    >
      {/* Mechanical Iris SVG Icon */}
      <motion.div
        className="w-5 h-5 flex items-center justify-center text-neutral-800 dark:text-neutral-200"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="m14.31 8 5.74 9.94" />
          <path d="M9.69 8h11.48" />
          <path d="m7.38 12 5.74-9.94" />
          <path d="M9.69 16 3.95 6.06" />
          <path d="M14.31 16H2.83" />
          <path d="m16.62 12-5.74 9.94" />
        </svg>
      </motion.div>

      {/* Numerical Aperture Readout */}
      <span className="text-xs font-mono font-medium tracking-tight text-neutral-700 dark:text-neutral-300">
        {isDark ? "f/16 · DARK" : "f/1.4 · LIGHT"}
      </span>
    </button>
  )
}
