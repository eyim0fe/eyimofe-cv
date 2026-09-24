import React from "react"
import { motion } from "framer-motion"

interface NatureToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const NatureToggle: React.FC<NatureToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-32 h-14 rounded-xl overflow-hidden border border-emerald-900/30 dark:border-emerald-700/50 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 group transition-all duration-300"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #06150E 0%, #0F2A1C 50%, #081B11 100%)"
          : "linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 55%, #BBF7D0 100%)"
      }}
      title={`Switch to ${isDark ? "Forest Dawn" : "Evergreen Night"}`}
      aria-label="Toggle Forest Horizon"
    >
      {/* Sky backdrop with moving sun/moon */}
      <motion.div
        className="absolute top-2 w-5 h-5 rounded-full shadow-sm"
        animate={{
          x: isDark ? 88 : 10,
          y: isDark ? 2 : 1,
          backgroundColor: isDark ? "#E2E8F0" : "#F59E0B",
          boxShadow: isDark
            ? "0 0 10px rgba(226, 232, 240, 0.8)"
            : "0 0 12px rgba(245, 158, 11, 0.7)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Pine Trees Silhouette Layer */}
      <svg
        className="absolute bottom-3 inset-x-0 w-full h-7 pointer-events-none"
        viewBox="0 0 128 28"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Back tree layer */}
        <path
          d="M10 28 L16 12 L22 28 Z M28 28 L35 8 L42 28 Z M70 28 L76 10 L82 28 Z M100 28 L108 6 L116 28 Z"
          fill={isDark ? "#0A1F15" : "#86EFAC"}
          opacity="0.8"
        />
        {/* Front tree layer */}
        <path
          d="M0 28 L6 14 L12 28 Z M20 28 L28 4 L36 28 Z M50 28 L58 10 L66 28 Z M84 28 L92 2 L100 28 Z M114 28 L122 12 L128 28 Z"
          fill={isDark ? "#040D08" : "#22C55E"}
        />
      </svg>

      {/* Rippling Lake Reflection at the base */}
      <div
        className="absolute bottom-0 inset-x-0 h-3 border-t transition-colors duration-300"
        style={{
          borderColor: isDark ? "#133E27" : "#86EFAC",
          backgroundColor: isDark ? "rgba(4, 18, 11, 0.85)" : "rgba(187, 247, 208, 0.75)"
        }}
      >
        {/* Animated gentle water ripple lines */}
        <motion.div
          className="w-full h-full flex items-center justify-around px-2 opacity-60"
          animate={{ x: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <div className="w-4 h-[1px] bg-emerald-400 dark:bg-emerald-300" />
          <div className="w-8 h-[1px] bg-emerald-500 dark:bg-emerald-400" />
          <div className="w-5 h-[1px] bg-emerald-400 dark:bg-emerald-300" />
        </motion.div>
      </div>

      {/* Label */}
      <span className="absolute top-1 left-2 text-[9px] font-mono tracking-wider uppercase text-emerald-800 dark:text-emerald-300/80">
        {isDark ? "Night Lake" : "Mist Lake"}
      </span>
    </button>
  )
}
