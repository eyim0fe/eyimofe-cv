import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, ChevronDown } from "lucide-react"

interface BookmarkRibbonProps {
  color?: string
  accentColor?: string
  sections?: { id: string; label: string }[]
  onSelectSection?: (id: string) => void
  className?: string
}

export const BookmarkRibbon: React.FC<BookmarkRibbonProps> = ({
  color = "#1E3A8A",
  accentColor = "#0F172A",
  sections = [
    { id: "hero-intro", label: "01. Profile & Bio" },
    { id: "selected-work", label: "02. Selected Work" },
    { id: "career-history", label: "03. Career Timeline" },
    { id: "skills-section", label: "04. Skills" }
  ],
  onSelectSection,
  className = "fixed top-0 left-4 sm:left-auto sm:right-40 md:right-48 z-40 select-none"
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleScrollTo = (id: string) => {
    setIsOpen(false)
    if (onSelectSection) {
      onSelectSection(id)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={className}>
      {/* The Hanging Fabric Ribbon */}
      <motion.div
        className="relative cursor-pointer group"
        whileHover={{ y: 8 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Bookmark Ribbon: Click for Chapter Index"
      >
        {/* Ribbon Body */}
        <div
          className="w-8 sm:w-11 h-18 sm:h-28 shadow-lg flex flex-col items-center justify-between pb-2.5 sm:pb-3 pt-2 text-white text-[8px] sm:text-[10px] uppercase font-bold tracking-wider"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, ${color} 40%, ${color} 60%, ${accentColor} 100%)`,
            boxShadow: "2px 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
          }}
        >
          {/* Stitched seam lines */}
          <div className="w-full px-1 flex justify-between opacity-50">
            <div className="w-[1px] h-full border-r border-dashed border-white/60" />
            <div className="w-[1px] h-full border-r border-dashed border-white/60" />
          </div>

          <span className="[writing-mode:vertical-rl] rotate-180 drop-shadow-sm flex items-center gap-1">
            <Bookmark className="w-3 h-3 rotate-180" />
            INDEX
          </span>

          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {/* Tail Ribbon V-cutout notch */}
        <div
          className="w-0 h-0 border-l-[16px] sm:border-l-[22px] border-l-transparent border-r-[16px] sm:border-r-[22px] border-r-transparent border-t-[12px] sm:border-t-[18px]"
          style={{ borderTopColor: color }}
        />
      </motion.div>

      {/* Chapter Index Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-22 sm:top-28 left-0 sm:left-auto sm:right-0 w-48 p-2 rounded-xs border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl text-xs space-y-1"
          >
            <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase border-b border-neutral-200 dark:border-neutral-800">
              Jotter Chapters
            </div>
            {sections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleScrollTo(sec.id)}
                className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200 cursor-pointer flex items-center justify-between"
              >
                <span>{sec.label}</span>
                <span className="text-neutral-400 text-[10px]">Jump →</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
