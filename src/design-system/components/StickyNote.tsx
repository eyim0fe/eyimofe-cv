import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Edit2 } from "lucide-react"
import { PushPinIcon, TrashBinIcon } from "@/components/StationeryIcons"

export interface StickyNoteProps {
  id?: string
  initialText?: string
  author?: string
  color?: "yellow" | "mint" | "peach" | "sky"
  defaultX?: number
  defaultY?: number
  onDelete?: () => void
  isDraggable?: boolean
}

const COLOR_STYLES = {
  yellow: {
    bg: "#FEF08A",
    border: "#FDE047",
    text: "#713F12",
    tape: "rgba(253, 224, 71, 0.45)",
    pin: "#EAB308"
  },
  mint: {
    bg: "#BBF7D0",
    border: "#86EFAC",
    text: "#14532D",
    tape: "rgba(134, 239, 172, 0.45)",
    pin: "#22C55E"
  },
  peach: {
    bg: "#FED7AA",
    border: "#FDBA74",
    text: "#7C2D12",
    tape: "rgba(253, 186, 116, 0.45)",
    pin: "#F97316"
  },
  sky: {
    bg: "#BAE6FD",
    border: "#7DD3FC",
    text: "#0C4A6E",
    tape: "rgba(125, 211, 252, 0.45)",
    pin: "#0284C7"
  }
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  initialText = "Eyimofe: Shipped v1 in 6 weeks with 0 tech debt.",
  author = "Eyimofe (PM)",
  color = "yellow",
  defaultX = 0,
  defaultY = 0,
  onDelete,
  isDraggable = true
}) => {
  const [text, setText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)
  const [isSquishing, setIsSquishing] = useState(false)
  const styles = COLOR_STYLES[color]

  const handleSquishAndDelete = () => {
    setIsSquishing(true)
    setTimeout(() => {
      if (onDelete) onDelete()
    }, 450)
  }

  return (
    <AnimatePresence>
      <motion.div
        drag={isDraggable && !isSquishing}
        dragMomentum={false}
        initial={{ x: defaultX, y: defaultY, rotate: (Math.random() * 4) - 2, scale: 0.9, opacity: 0 }}
        animate={
          isSquishing
            ? {
                scale: [1, 1.15, 0.35, 0.05],
                rotate: [0, -35, 90, 270],
                borderRadius: ["4px", "16px", "50%", "50%"],
                y: [0, -30, 80],
                opacity: [1, 1, 0.6, 0],
                transition: { duration: 0.45, ease: "easeInOut" }
              }
            : { scale: 1, opacity: 1 }
        }
        whileHover={!isSquishing ? { scale: 1.01, rotate: 0 } : undefined}
        whileDrag={!isSquishing ? { scale: 1.05, zIndex: 100 } : undefined}
        className="absolute top-0 right-0 pointer-events-auto w-56 sm:w-60 p-4 rounded-xs select-none cursor-grab active:cursor-grabbing border text-left touch-none"
        style={{
          backgroundColor: styles.bg,
          borderColor: styles.border,
          color: styles.text,
          boxShadow: "none"
        }}
      >
        {/* Translucent tape strip at the top */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 pointer-events-none rounded-xs backdrop-blur-xs"
          style={{
            backgroundColor: styles.tape,
            border: "1px dashed rgba(0,0,0,0.15)"
          }}
        />

        {/* Pushpin & Squish/Trash button */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20 pointer-events-auto">
          <PushPinIcon color={styles.pin} className="w-4 h-4" />
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleSquishAndDelete()
              }}
              className="opacity-70 hover:opacity-100 hover:scale-115 transition-all p-1.5 text-red-600 hover:text-red-700 cursor-pointer rounded-full hover:bg-black/5"
              title="Squish & throw into bin"
              aria-label="Delete note"
            >
              <TrashBinIcon isOpen={false} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Note Body: Double-click or click edit button to edit */}
        <div className="pt-2">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-20 bg-transparent resize-none border-b border-black/20 focus:outline-none text-sm leading-relaxed"
                style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: "14px", fontWeight: 500 }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="self-end inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-black/10 hover:bg-black/20 cursor-pointer font-bold"
                style={{ fontFamily: '"Instrument Sans", sans-serif' }}
              >
                <Check className="w-3 h-3" /> Done
              </button>
            </div>
          ) : (
            <p
              onDoubleClick={() => setIsEditing(true)}
              className="text-sm leading-relaxed cursor-grab active:cursor-grabbing min-h-[48px]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontSize: "14px", fontWeight: 500 }}
              title="Drag to move · Double-click to edit text"
            >
              {text}
            </p>
          )}
        </div>

        {/* Author Footnote */}
        <div
          className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] opacity-75 font-semibold"
          style={{ fontFamily: '"Instrument Sans", sans-serif' }}
        >
          <span>{author}</span>
          {!isEditing && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="p-1 rounded hover:bg-black/10 cursor-pointer transition-colors"
              title="Edit note text"
              aria-label="Edit note text"
            >
              <Edit2 className="w-3 h-3 opacity-75 hover:opacity-100" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
