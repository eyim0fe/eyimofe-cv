import React from "react"
import { motion } from "framer-motion"

interface RockerToggleProps {
  isDark: boolean
  onToggle: () => void
}

export const RockerToggle: React.FC<RockerToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative flex flex-col items-center justify-center p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 border-2 border-neutral-400 dark:border-neutral-700 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 group select-none"
      title={`Flip switch to ${isDark ? "Light" : "Dark"}`}
      aria-label="Toggle Industrial Rocker Switch"
    >
      {/* Wall plate screw head at top */}
      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mb-1 flex items-center justify-center">
        <div className="w-1 h-[0.5px] bg-neutral-600 dark:bg-neutral-400" />
      </div>

      {/* Rocker Switch Bezel */}
      <div className="w-8 h-14 rounded-xs bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 p-1 flex flex-col justify-between shadow-inner">
        {/* Rocker Paddle */}
        <motion.div
          className="w-full h-1/2 rounded-xs flex items-center justify-center transition-colors shadow-sm"
          animate={{
            y: isDark ? 22 : 0,
            backgroundColor: isDark ? "#262626" : "#E5E5E5"
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {/* Small tactile grip ridges */}
          <div className="flex flex-col gap-0.5">
            <div className="w-3 h-[1px] bg-neutral-400 dark:bg-neutral-500" />
            <div className="w-3 h-[1px] bg-neutral-400 dark:bg-neutral-500" />
          </div>
        </motion.div>
      </div>

      {/* Wall plate screw head at bottom */}
      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-1 flex items-center justify-center">
        <div className="w-1 h-[0.5px] bg-neutral-600 dark:bg-neutral-400" />
      </div>

      <span className="text-[9px] font-mono tracking-wider uppercase mt-1 text-neutral-600 dark:text-neutral-400">
        {isDark ? "OFF" : "ON"}
      </span>
    </button>
  )
}
