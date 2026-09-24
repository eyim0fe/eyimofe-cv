import React from "react"
import { motion } from "framer-motion"

interface HorizonToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const HorizonToggle: React.FC<HorizonToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-28 h-12 rounded-full overflow-hidden border border-slate-300 dark:border-sky-900/60 shadow-inner cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 group transition-all duration-300"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #050B14 0%, #0F172A 70%, #1E293B 100%)"
          : "linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 60%, #F8FAFC 100%)"
      }}
      title={`Switch to ${isDark ? "Daybreak" : "Midnight"}`}
      aria-label="Toggle Celestial Horizon"
    >
      {/* Stars in dark mode */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse" />
          <div className="absolute top-3 left-10 w-0.5 h-0.5 bg-sky-200 rounded-full opacity-60" />
          <div className="absolute top-1 right-6 w-1 h-1 bg-white rounded-full opacity-90 animate-pulse" />
          <div className="absolute top-4 right-11 w-0.5 h-0.5 bg-sky-300 rounded-full opacity-70" />
        </div>
      )}

      {/* Sun / Moon Celestial Body sliding over the curved horizon arc */}
      <motion.div
        className="absolute bottom-2 flex items-center justify-center w-7 h-7 rounded-full shadow-md"
        initial={false}
        animate={{
          left: isDark ? "68%" : "8%",
          backgroundColor: isDark ? "#F8FAFC" : "#F59E0B",
          boxShadow: isDark
            ? "0 0 12px 2px rgba(224, 242, 254, 0.7), inset -2px -2px 0 0 #CBD5E1"
            : "0 0 16px 4px rgba(245, 158, 11, 0.6)"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {/* Moon crater or sun ray motif */}
        {isDark ? (
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300/60 -ml-1 -mt-1" />
        ) : (
          <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
        )}
      </motion.div>

      {/* Oceanic Horizon line with gentle curvature */}
      <div className="absolute bottom-0 inset-x-0 h-3 border-t border-slate-400/30 dark:border-sky-500/30 bg-slate-200/40 dark:bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 dark:text-sky-300/80">
          {isDark ? "00:00 Night" : "12:00 Dawn"}
        </span>
      </div>
    </button>
  )
}
