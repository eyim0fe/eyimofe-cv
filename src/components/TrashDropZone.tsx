import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrashBinIcon } from "./StationeryIcons"
import { Sparkles } from "lucide-react"

interface TrashDropZoneProps {
  onClearAll?: () => void
  noteCount?: number
}

export const TrashDropZone: React.FC<TrashDropZoneProps> = ({ onClearAll, noteCount = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSquishing, setIsSquishing] = useState(false)

  const handleEmpty = () => {
    if (!onClearAll || noteCount === 0) return
    setIsSquishing(true)
    setTimeout(() => {
      onClearAll()
      setIsSquishing(false)
    }, 400)
  }

  return (
    <div
      className="relative inline-flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={handleEmpty}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={isSquishing ? { rotate: [-10, 10, -10, 10, 0] } : {}}
        className="relative p-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-md text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:border-red-400 transition-all cursor-pointer flex items-center gap-2 group"
        title={noteCount > 0 ? "Empty & squish all sticky notes" : "Whiteboard Trash Bin"}
        aria-label="Trash bin for sticky notes"
      >
        <TrashBinIcon isOpen={isHovered || isSquishing} className="w-5 h-5 text-red-500" />
        <span className="text-xs font-medium hidden sm:inline">
          {noteCount > 0 ? `Trash (${noteCount})` : "Trash"}
        </span>
      </motion.button>

      {/* Floating Dust / Crumple Poof particles */}
      <AnimatePresence>
        {isSquishing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.2, y: -20 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-6 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1 pointer-events-none"
          >
            <Sparkles className="w-3 h-3" /> *SQUISHED!*
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
