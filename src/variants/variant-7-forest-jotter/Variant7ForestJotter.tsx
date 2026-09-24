import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData'
import { CompactLampToggle } from '@/design-system/components/CreativeToggles/CompactLampToggle'
import { StickyNote } from '@/design-system/components/StickyNote'
import { WhiteboardCanvas } from '@/components/WhiteboardCanvas'
import { HeroProfileHeader } from '@/components/HeroProfileHeader'
import { SelectedWorkSection } from '@/components/SelectedWorkSection'
import { CareerTimelineSection } from '@/components/CareerTimelineSection'
import { SkillsShowcase } from '@/components/SkillsShowcase'
import { ProjectCaseStudyDrawer } from '@/components/ProjectCaseStudyDrawer'
import {
  FullscreenLightboxModal,
  type FullscreenImageState,
} from '@/components/FullscreenLightboxModal'
import { JotterFooter } from '@/components/JotterFooter'
import { PenTool, Plus, Trash2, Wrench, X } from 'lucide-react'

interface CustomNote {
  id: string
  text: string
  color: 'yellow' | 'mint' | 'peach' | 'sky'
  x: number
  y: number
  author: string
}

export function Variant7ForestJotter() {
  const [isDark, setIsDark] = useState(false)
  const [whiteboardOpen, setWhiteboardOpen] = useState(false)
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<'all' | 'pm' | 'engineer'>('all')
  const [activeDrawerProject, setActiveDrawerProject] =
    useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [fullscreenImage, setFullscreenImage] =
    useState<FullscreenImageState | null>(null)
  const { profile, projects } = PORTFOLIO_DATA

  // Keyboard navigation for drawer & lightbox (ESC to close, Arrow keys for lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null)
          return
        }
        if (activeDrawerProject) setActiveDrawerProject(null)
        if (whiteboardOpen) setWhiteboardOpen(false)
        if (toolsMenuOpen) setToolsMenuOpen(false)
      } else if (
        fullscreenImage &&
        fullscreenImage.allImages &&
        fullscreenImage.allImages.length > 1
      ) {
        if (e.key === 'ArrowLeft') {
          const all = fullscreenImage.allImages
          const cur = fullscreenImage.currentIndex ?? 0
          const prevIdx = cur === 0 ? all.length - 1 : cur - 1
          setFullscreenImage({
            ...fullscreenImage,
            src: all[prevIdx].src,
            caption: all[prevIdx].caption,
            currentIndex: prevIdx,
          })
        } else if (e.key === 'ArrowRight') {
          const all = fullscreenImage.allImages
          const cur = fullscreenImage.currentIndex ?? 0
          const nextIdx = cur === all.length - 1 ? 0 : cur + 1
          setFullscreenImage({
            ...fullscreenImage,
            src: all[nextIdx].src,
            caption: all[nextIdx].caption,
            currentIndex: nextIdx,
          })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeDrawerProject, whiteboardOpen, fullscreenImage, toolsMenuOpen])

  // Floating sticky notes state (Absolute floating - maintains independent positions)
  const [notes, setNotes] = useState<CustomNote[]>([
    {
      id: 'jotter-note-1',
      text: 'Sync with design for a review',
      color: 'yellow',
      x: 0,
      y: 0,
      author: 'Eyimofe (PM)',
    },
    {
      id: 'jotter-note-2',
      text: 'Write documentation for Tsems',
      color: 'peach',
      x: -15,
      y: 150,
      author: 'Product Note',
    },
    {
      id: 'jotter-note-3',
      text: 'Cook Coconut Rice with Iced tea',
      color: 'mint',
      x: 10,
      y: 300,
      author: 'Personal',
    },
  ])

  const addStickyNote = () => {
    const colors: ('yellow' | 'mint' | 'peach' | 'sky')[] = [
      'yellow',
      'peach',
      'sky',
      'mint',
    ]
    const newNote: CustomNote = {
      id: `custom-note-${Date.now()}`,
      text: 'New Note: Double-click to edit text...',
      color: colors[notes.length % colors.length],
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      author: 'Eyimofe',
    }
    setNotes((prev) => [...prev, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotes = () => {
    setNotes([])
  }

  const openDrawer = (proj: Project) => {
    setActiveDrawerProject(proj)
    setActiveImageIndex(0)
  }

  const closeDrawer = () => {
    setActiveDrawerProject(null)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-amber-200 selection:text-neutral-900 ${
        isDark
          ? 'dark bg-[#141416] text-[#E8E4DD]'
          : 'bg-[#FAF7F0] text-[#1C1A17]'
      }`}
      style={{
        fontFamily:
          '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
      }}
    >
      {/* AUTHENTIC JOTTER HORIZONTAL RULED NOTEBOOK LINES (Extremely subtle in dark mode to prevent visual clash) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-45 dark:opacity-10 z-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)'
            : 'linear-gradient(to bottom, #E6E0D4 1px, transparent 1px)',
          backgroundSize: '100% 28px',
        }}
      />

      {/* Classic Vertical Margin Lines (Subtle Red Rule) */}
      <div className="hidden xl:block fixed left-12 top-0 bottom-0 w-[1.5px] bg-red-600/40 dark:bg-rose-500/25 z-0 pointer-events-none" />
      <div className="hidden xl:block fixed left-[54px] top-0 bottom-0 w-[1px] bg-red-600/20 dark:bg-rose-500/15 z-0 pointer-events-none" />

      {/* =========================================================================
          FIXED BOTTOM-LEFT FLOATING JOTTER TOOLS MENU (Whiteboard, Add Note, Delete All)
         ========================================================================= */}
      <aside
        aria-label="Jotter Tools Menu"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40"
      >
        <div className="relative">
          <AnimatePresence>
            {toolsMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 left-0 w-52 sm:w-56 p-2 rounded-2xl border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/95 dark:bg-[#1C1C20]/95 backdrop-blur-md shadow-2xl flex flex-col gap-1 text-xs"
              >
                <div className="px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] opacity-60 border-b border-[#E5DFD4] dark:border-[#27272D] flex items-center justify-between">
                  <span>Jotter Tools</span>
                  <button
                    type="button"
                    onClick={() => setToolsMenuOpen(false)}
                    className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* 1. Open Whiteboard */}
                <button
                  type="button"
                  onClick={() => {
                    setWhiteboardOpen(true)
                    setToolsMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-400/10 text-left font-bold transition-colors cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600/10 dark:bg-amber-400/15 flex items-center justify-center text-amber-700 dark:text-amber-400">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover:text-amber-700 dark:group-hover:text-amber-300">
                      Open Whiteboard
                    </span>
                    <span className="text-[10px] opacity-60 font-normal">
                      Draw & export notes
                    </span>
                  </div>
                </button>

                {/* 2. Add Sticky Note */}
                <button
                  type="button"
                  onClick={() => {
                    addStickyNote()
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-400/10 text-left font-bold transition-colors cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      Add Sticky Note
                    </span>
                    <span className="text-[10px] opacity-60 font-normal">
                      Pin note to board
                    </span>
                  </div>
                </button>

                {/* 3. Delete All Notes */}
                <button
                  type="button"
                  onClick={() => {
                    clearAllNotes()
                  }}
                  disabled={notes.length === 0}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-bold transition-colors cursor-pointer group ${
                    notes.length > 0
                      ? 'hover:bg-red-500/10 dark:hover:bg-red-400/10 text-red-700 dark:text-red-400'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-red-600/10 dark:bg-red-400/15 flex items-center justify-center text-red-700 dark:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span>Delete All Notes</span>
                    <span className="text-[10px] opacity-60 font-normal">
                      Clear floating board
                    </span>
                  </div>
                  {notes.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/20 text-red-700 dark:text-red-300 font-mono">
                      {notes.length}
                    </span>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setToolsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/95 dark:bg-[#1C1C20]/95 backdrop-blur-md shadow-lg hover:scale-105 transition-all cursor-pointer font-bold text-xs"
            title="Jotter Tools (Whiteboard, Add Note, Delete All)"
          >
            <div className="relative">
              <Wrench className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              {notes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <span>Jotter Tools</span>
            {notes.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono">
                {notes.length}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* 2. Fixed Light Mode Toggle (Top Right on Mobile & Desktop) */}
      <aside
        aria-label="Theme Controller"
        className="fixed top-4 right-4 sm:right-6 z-40 flex items-center p-1 rounded-full border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/95 dark:bg-[#1C1C20]/95 backdrop-blur-md shadow-md"
      >
        <CompactLampToggle
          isDark={isDark}
          onToggle={() => setIsDark(!isDark)}
        />
      </aside>

      {/* =========================================================================
          FULL-SCREEN INTERACTIVE WHITEBOARD CANVAS (With PDF Export)
         ========================================================================= */}
      <WhiteboardCanvas
        isOpen={whiteboardOpen}
        onClose={() => setWhiteboardOpen(false)}
        isDark={isDark}
      />

      {/* =========================================================================
          STICKY NOTES CANVAS LAYER (Mobile: 1 note default, Desktop: 3 notes default)
         ========================================================================= */}
      <div className="absolute top-24 right-6 sm:right-12 z-30 pointer-events-none w-44 sm:w-60 h-0">
        {notes.map((note, idx) => (
          <div key={note.id} className={idx >= 1 ? "hidden sm:block" : ""}>
            <StickyNote
              id={note.id}
              initialText={note.text}
              author={note.author}
              color={note.color}
              defaultX={note.x}
              defaultY={note.y}
              onDelete={() => deleteNote(note.id)}
              isDraggable={true}
            />
          </div>
        ))}
      </div>

      {/* EXPANSIVE FULL-WIDTH JOTTER CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-18 py-12 pb-36 space-y-18 relative z-10">
        {/* 1. Profile & Bio Header */}
        <HeroProfileHeader profile={profile} />

        {/* 2. Selected Work Grid */}
        <SelectedWorkSection
          projects={projects}
          roleFilter={roleFilter}
          onSetRoleFilter={setRoleFilter}
          onOpenDrawer={openDrawer}
          onOpenFullscreenImage={setFullscreenImage}
        />

        {/* 3. Career & Experience Timeline */}
        <CareerTimelineSection experience={profile.experience} />

        {/* 4. Skills Showcase */}
        <section id="skills-section">
          <SkillsShowcase />
        </section>

        {/* Footer */}
        <JotterFooter name={profile.name} />
      </div>

      {/* Slide-over Case Study Drawer Panel */}
      <ProjectCaseStudyDrawer
        activeDrawerProject={activeDrawerProject}
        activeImageIndex={activeImageIndex}
        onCloseDrawer={closeDrawer}
        onSetActiveImageIndex={setActiveImageIndex}
        onOpenFullscreenImage={setFullscreenImage}
      />

      {/* Fullscreen Image Lightbox Modal */}
      <FullscreenLightboxModal
        fullscreenImage={fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        onSetFullscreenImage={setFullscreenImage}
      />
    </div>
  )
}
