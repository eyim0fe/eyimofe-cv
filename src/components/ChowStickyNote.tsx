import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Edit2, Trash2 } from 'lucide-react'

export interface ChowStickyNoteProps {
  id?: string
  initialText?: string
  author?: string
  color?: 'forest' | 'sage' | 'emerald' | 'moss' | 'mint' | 'yellow' | 'lilac' | 'peach' | 'sky'
  kicker?: string
  defaultX?: number
  defaultY?: number
  onDelete?: () => void
  isDraggable?: boolean
}

const CHOW_NOTE_COLORS = {
  forest: {
    bg: '#1B4332',
    border: '#0E2233',
    text: '#FFFFFF',
    kicker: '🌲 PM EDGE:',
  },
  sage: {
    bg: '#D8F3DC',
    border: '#1B4332',
    text: '#1B4332',
    kicker: '🌿 SPEC:',
  },
  emerald: {
    bg: '#2D6A4F',
    border: '#0E2233',
    text: '#FFFFFF',
    kicker: '⚡ SHIPPED:',
  },
  moss: {
    bg: '#E8F5E9',
    border: '#2D6A4F',
    text: '#1B4332',
    kicker: '🎯 GOAL:',
  },
  mint: {
    bg: '#BDF0E6',
    border: '#08636E',
    text: '#08636E',
    kicker: '📌 NOTE:',
  },
  // Compatibility mappings (Zero yellow, maps to rich green family)
  yellow: {
    bg: '#D8F3DC',
    border: '#1B4332',
    text: '#1B4332',
    kicker: '⚡ SHIPPED:',
  },
  lilac: {
    bg: '#E8F5E9',
    border: '#2D6A4F',
    text: '#1B4332',
    kicker: '🎯 PM EDGE:',
  },
  peach: {
    bg: '#D8F3DC',
    border: '#1B4332',
    text: '#1B4332',
    kicker: '🌿 NOTE:',
  },
  sky: {
    bg: '#BDF0E6',
    border: '#08636E',
    text: '#08636E',
    kicker: '📌 ROADMAP:',
  },
}

export const ChowStickyNote: React.FC<ChowStickyNoteProps> = ({
  initialText = 'Consolidate member back office suite & automate workflows',
  author = 'Eyimofe (PM)',
  color = 'yellow',
  kicker,
  defaultX = 0,
  defaultY = 0,
  onDelete,
  isDraggable = true,
}) => {
  const [text, setText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)
  const [isSquishing, setIsSquishing] = useState(false)
  const theme = CHOW_NOTE_COLORS[color] || CHOW_NOTE_COLORS.yellow
  const displayKicker = kicker || theme.kicker
  const isDarkBg = color === 'forest' || color === 'emerald'

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
        initial={{
          x: defaultX,
          y: defaultY,
          rotate: (Math.random() * 4) - 2,
          scale: 0.9,
          opacity: 0,
        }}
        animate={
          isSquishing
            ? {
                scale: [1, 1.15, 0.35, 0.05],
                rotate: [0, -35, 90, 270],
                borderRadius: ['16px', '24px', '50%', '50%'],
                y: [0, -30, 80],
                opacity: [1, 1, 0.6, 0],
                transition: { duration: 0.45, ease: 'easeInOut' },
              }
            : { scale: 1, opacity: 1 }
        }
        whileHover={!isSquishing ? { scale: 1.02, rotate: 0 } : undefined}
        whileDrag={!isSquishing ? { scale: 1.05, zIndex: 100 } : undefined}
        className={`pointer-events-auto w-52 sm:w-64 p-3.5 sm:p-4 rounded-2xl select-none cursor-grab active:cursor-grabbing border-2.5 text-left touch-none transition-shadow ${isDraggable ? 'absolute top-0 left-0' : 'relative'}`}
        style={{
          backgroundColor: theme.bg,
          borderColor: theme.border,
          color: theme.text,
          boxShadow: '4px 4px 0 #0E2233',
        }}
      >
        {/* TOP BAR: Kicker & Quick Actions */}
        <div className={`flex items-center justify-between pb-1.5 border-b mb-2 ${isDarkBg ? 'border-white/20' : 'border-[#1B4332]/20'}`}>
          <span className={`font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider ${isDarkBg ? 'text-[#D8F3DC]' : 'text-[#1B4332]'}`}>
            {displayKicker}
          </span>

          <div className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing((prev) => !prev)
              }}
              className={`p-1 rounded-md cursor-pointer ${isDarkBg ? 'hover:bg-white/15 text-white' : 'hover:bg-black/10 text-[#1B4332]'}`}
              title={isEditing ? 'Save' : 'Edit note'}
            >
              {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleSquishAndDelete()
              }}
              className={`p-1 rounded-md cursor-pointer ${isDarkBg ? 'hover:bg-white/15 text-red-300' : 'hover:bg-black/10 text-red-700'}`}
              title="Delete note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* NOTE BODY */}
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            rows={3}
            className="w-full bg-white/90 border-2 border-[#0E2233] rounded-lg p-2 text-xs font-semibold text-[#0E2233] outline-none resize-none shadow-[2px_2px_0_#0E2233]"
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className={`text-xs sm:text-sm font-semibold leading-relaxed break-words ${isDarkBg ? 'text-white' : 'text-[#1B4332]'}`}
          >
            {text}
          </p>
        )}

        {/* FOOTER: Author & status */}
        <div className={`mt-2.5 pt-1.5 border-t flex items-center justify-between text-[10px] font-bold ${isDarkBg ? 'border-white/20 text-[#D8F3DC]/80' : 'border-[#1B4332]/20 text-[#1B4332]/80'}`}>
          <span>{author}</span>
          <span className="text-[9px] uppercase tracking-wider opacity-70">Double-click to edit</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

