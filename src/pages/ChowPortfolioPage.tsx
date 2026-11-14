import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  ArrowDown,
  Sparkles,
  Wrench,
  Plus,
  Trash2,
  PenTool,
  X,
  CheckCircle2,
  Rocket,
  Layers,
  Target,
  Compass,
  FileText,
  Mail,
  BookOpen,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '@/data/portfolioData'
import { ChowStickyNote } from '@/components/ChowStickyNote'
import { ChowWhiteboardCanvas } from '@/components/ChowWhiteboardCanvas'
import { ViewSwitcherPill } from '@/components/ViewSwitcherPill'
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons'
import { HeroPenCanvas } from '@/components/HeroPenCanvas'
import { AuthenticBimanshuLamp } from '@/design-system/components/CreativeToggles/AuthenticBimanshuLamp'

interface CustomNote {
  id: string
  text: string
  color: 'forest' | 'sage' | 'emerald' | 'moss' | 'mint'
  kicker?: string
  x: number
  y: number
  author: string
}

export function ChowPortfolioPage() {
  const { profile, projects } = PORTFOLIO_DATA
  const [isDark, setIsDark] = useState(false)
  const workBgColor = isDark ? '#0A3D42' : '#10B7AE'
  const [activeCycleIndex, setActiveCycleIndex] = useState(0)
  const [whiteboardOpen, setWhiteboardOpen] = useState(false)
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState<'all' | 'pm' | 'engineer'>('all')
  const [activePmStage, setActivePmStage] = useState<
    'discovery' | 'scoping' | 'build' | 'shipped'
  >('shipped')

  const cycleWords = [
    '0 to 1 products',
    'scalable systems',
    'high-impact software',
    'AI agent workflows',
  ]

  // Word cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % cycleWords.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [cycleWords.length])

  // Interactive notes in forest & sage palette
  const [notes, setNotes] = useState<CustomNote[]>([
    {
      id: 'chow-note-1',
      text: 'The New Breed Church Back Office suite consolidating 6 paper systems.',
      color: 'forest',
      kicker: '⚡ SHIPPED 2024:',
      x: 0,
      y: 0,
      author: 'Eyimofe (PM)',
    },
    {
      id: 'chow-note-2',
      text: 'Deep technical fluency with React 19, FastAPI, SQL & AI orchestration.',
      color: 'sage',
      kicker: '🎯 PM EDGE:',
      x: 10,
      y: 120,
      author: 'Builder',
    },
  ])

  const addStickyNote = () => {
    const colors: ('forest' | 'sage' | 'emerald' | 'moss' | 'mint')[] = [
      'forest',
      'sage',
      'emerald',
      'moss',
      'mint',
    ]
    const newNote: CustomNote = {
      id: `custom-note-${Date.now()}`,
      text: 'New PM Note: Double-click to edit...',
      color: colors[notes.length % colors.length],
      kicker: '📌 NOTE:',
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      author: 'Eyimofe',
    }
    setNotes((prev) => [...prev, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const filteredProjects = projects.filter((p) => {
    if (roleFilter === 'all') return true
    if (roleFilter === 'pm')
      return p.roleLabel.toLowerCase().includes('product')
    if (roleFilter === 'engineer')
      return p.roleLabel.toLowerCase().includes('engineer')
    return true
  })

  // Hero reference for pen canvas tracking
  const heroRef = useRef<HTMLElement>(null)

  // Sync dark class to documentElement for Tailwind 4 @custom-variant dark
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 antialiased selection:bg-[#1B4332] selection:text-[#D8F3DC] ${
        isDark
          ? 'dark bg-[#091522] text-[#EAF1F8]'
          : 'bg-[#FFFFFF] text-[#0E2233]'
      }`}
      style={{
        fontFamily: "'Satoshi', sans-serif",
      }}
    >
      <style>{`
        :root {
          --chow-forest: #1B4332;
          --chow-forest-mid: #2D6A4F;
          --chow-sage: #D8F3DC;
          --chow-sage-dark: #2A6F55;
          --chow-ink: #0E2233;
          --chow-sand-deep: #EAF1F8;
        }

        @keyframes bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-bob {
          animation: bob 6s ease-in-out infinite;
        }

        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 24s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .chow-card {
          border: 2.5px solid ${isDark ? '#2D6A4F' : '#0E2233'};
          box-shadow: 6px 6px 0 ${isDark ? '#143829' : '#0E2233'};
          background-color: ${isDark ? '#122436' : '#FFFFFF'};
          color: ${isDark ? '#EAF1F8' : '#0E2233'};
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chow-card:hover {
          transform: translate(-3px, -5px) rotate(-0.5deg);
          box-shadow: 10px 12px 0 ${isDark ? '#143829' : '#0E2233'};
        }

        .chow-btn {
          border: 2.5px solid #0E2233;
          box-shadow: 4px 4px 0 #0E2233;
          transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chow-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #0E2233;
        }

        .chow-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 #0E2233;
        }
      `}</style>

      {/* TOP VIEW SWITCHER PILL (Jotter vs Chow) */}
      <ViewSwitcherPill />

      {/* AUTHENTIC BIMANSHU HANGING LAMP (Exact same physics lamp fixture as Jotter) */}
      <aside
        aria-label="Theme Controller"
        className="fixed top-0 right-3 sm:right-24 md:right-32 z-40"
      >
        <AuthenticBimanshuLamp isDark={isDark} onToggle={setIsDark} />
      </aside>

      {/* BUNMI'S SIGNATURE FLOATING PILL DOCK NAVBAR */}
      <nav
        className={`fixed top-3.5 left-3 sm:left-1/2 sm:-translate-x-1/2 z-50 w-[calc(100%-4.25rem)] sm:w-[min(calc(100%-2rem),1040px)] h-14 px-3.5 sm:px-6 rounded-full border-2 ${
          isDark
            ? 'border-[#2D6A4F] bg-[#091522]/95 text-white shadow-[4px_4px_0_#143829]'
            : 'border-[#0E2233] bg-[#FFFFFF]/95 text-[#0E2233] shadow-[4px_4px_0_#0E2233]'
        } backdrop-blur-md flex items-center justify-between gap-2 sm:gap-4 transition-all`}
        aria-label="Bunmi Floating Pill Dock"
      >
        {/* Logo */}
        <a
          href="#top"
          className="font-extrabold text-sm sm:text-base tracking-tight hover:opacity-80 shrink-0 text-[#0E2233] dark:text-white truncate"
        >
          Eyimofe Pinnick
        </a>

        {/* Section links with rounded pill hover */}
        <div className="hidden md:flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
          <a
            href="#work"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#D8F3DC] hover:text-[#1B4332] dark:hover:bg-[#1B4332] dark:hover:text-[#D8F3DC] transition-colors"
          >
            Work
          </a>

          <a
            href="#experience"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#D8F3DC] hover:text-[#1B4332] dark:hover:bg-[#1B4332] dark:hover:text-[#D8F3DC] transition-colors"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#D8F3DC] hover:text-[#1B4332] dark:hover:bg-[#1B4332] dark:hover:text-[#D8F3DC] transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-full hover:bg-[#D8F3DC] hover:text-[#1B4332] dark:hover:bg-[#1B4332] dark:hover:text-[#D8F3DC] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right: Say Hi Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="mailto:eyimofepinnick@gmail.com"
            className="px-3 sm:px-4 py-1.5 rounded-full bg-[#1B4332] text-white dark:bg-[#2D6A4F] dark:text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1 hover:bg-[#2D6A4F] dark:hover:bg-[#1B4332] transition-colors shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]"
          >
            <span>Say Hi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* WHITEBOARD CANVAS MODAL */}
      <ChowWhiteboardCanvas
        isOpen={whiteboardOpen}
        onClose={() => setWhiteboardOpen(false)}
        isDark={isDark}
      />

      {/* FLOATING JOTTER TOOLS MENU TRIGGER */}
      <aside aria-label="Jotter Tools" className="fixed bottom-5 left-5 z-40">
        <div className="relative">
          <AnimatePresence>
            {toolsMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`absolute bottom-14 left-0 w-60 p-2 rounded-xl border-2 ${
                  isDark
                    ? 'border-[#2D6A4F] bg-[#122436] text-[#EAF1F8] shadow-[6px_6px_0_#143829]'
                    : 'border-[#0E2233] bg-[#FFFFFF] text-[#0E2233] shadow-[6px_6px_0_#0E2233]'
                } flex flex-col gap-1 text-xs`}
              >
                <div
                  className={`px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] border-b ${
                    isDark
                      ? 'border-[#2D6A4F]/40 text-[#CBD5E1]'
                      : 'border-[#0E2233]/20 text-[#0E2233]/80'
                  } flex items-center justify-between`}
                >
                  <span className="font-extrabold">Jotter Tools</span>
                  <button
                    type="button"
                    onClick={() => setToolsMenuOpen(false)}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded cursor-pointer text-inherit"
                    aria-label="Close tools menu"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setWhiteboardOpen(true)
                    setToolsMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left font-bold transition-colors cursor-pointer ${
                    isDark
                      ? 'text-[#EAF1F8] hover:bg-[#1B4332]'
                      : 'text-[#0E2233] hover:bg-[#D8F3DC]'
                  }`}
                >
                  <PenTool className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                  <span>Open Whiteboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => addStickyNote()}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left font-bold transition-colors cursor-pointer ${
                    isDark
                      ? 'text-[#EAF1F8] hover:bg-[#1B4332]'
                      : 'text-[#0E2233] hover:bg-[#D8F3DC]'
                  }`}
                >
                  <Plus className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                  <span>Add Sticky Note</span>
                </button>

                <button
                  type="button"
                  onClick={() => setNotes([])}
                  disabled={notes.length === 0}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-left font-bold text-red-600 dark:text-red-400 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Notes</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setToolsMenuOpen((prev) => !prev)}
            className={`chow-btn flex items-center gap-2 px-4 py-2.5 rounded-full ${
              isDark
                ? 'bg-[#122436] text-[#EAF1F8] border-[#2D6A4F]'
                : 'bg-[#FFFFFF] text-[#0E2233] border-[#0E2233]'
            } font-bold text-xs`}
          >
            <Wrench className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
            <span>Tools</span>
            {notes.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white dark:bg-[#2D6A4F] border border-[#0E2233] dark:border-[#2D6A4F] text-[10px] flex items-center justify-center font-bold">
                {notes.length}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* =========================================================================
          1. HERO SECTION (Clean White/Dark Background + Discrete Pen Trail)
         ========================================================================= */}
      <header
        ref={heroRef}
        id="top"
        className={`relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-24 border-b-2.5 transition-colors duration-300 ${
          isDark
            ? 'border-[#2D6A4F] bg-[#091522]'
            : 'border-[#0E2233] bg-[#FFFFFF]'
        }`}
        style={{
          backgroundImage: `radial-gradient(${
            isDark ? 'rgba(45, 106, 79, 0.25)' : 'rgba(14, 34, 51, 0.08)'
          } 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      >
        {/* INTERACTIVE PEN MARK & PRODUCT WORDS TRAIL CANVAS */}
        <HeroPenCanvas containerRef={heroRef} />

        <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.94] text-[#0E2233] dark:text-white">
              Hi, I&apos;m{' '}
              <em className="not-italic text-[#1B4332] dark:text-[#52B788] underline decoration-4 underline-offset-4 inline-block hover:-rotate-2 transition-transform cursor-pointer">
                Eyimofe
              </em>{' '}
              Pinnick
            </h1>

            {/* Dynamic Word Cycler */}
            <p className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-[#EAF1F8] leading-snug">
              I lead products from{' '}
              <span className="inline-block px-3 py-0.5 rounded-lg border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#D8F3DC] text-[#1B4332] dark:bg-[#1B4332] dark:text-[#D8F3DC] shadow-[3px_3px_0_#0E2233] dark:shadow-[3px_3px_0_#143829] -rotate-1 transition-all font-extrabold">
                0 to 1
              </span>{' '}
              then build cool stuff on the weekends.
            </p>

            {/* Vibrant Forest Action & Social Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <a
                href="#work"
                className="chow-btn px-5 py-3 rounded-full bg-[#2D6A4F] text-white dark:bg-[#1B4332] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-[#1B4332] dark:hover:bg-[#2D6A4F]"
              >
                <span>View Products Shipped</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/assets/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="chow-btn px-4 sm:px-5 py-3 rounded-full bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#2D6A4F] dark:hover:bg-[#1B4332]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <a
                href="https://linkedin.com/in/eyimofe-p"
                target="_blank"
                rel="noopener noreferrer"
                className="chow-btn px-4 py-3 rounded-full bg-white text-[#0E2233] dark:bg-[#122436] dark:text-white border-2 border-[#0E2233] dark:border-[#2D6A4F] font-extrabold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332]"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#52B788]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/eyim0fe"
                target="_blank"
                rel="noopener noreferrer"
                className="chow-btn px-4 py-3 rounded-full bg-white text-[#0E2233] dark:bg-[#122436] dark:text-white border-2 border-[#0E2233] dark:border-[#2D6A4F] font-extrabold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332]"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#52B788]" />
                <span>GitHub</span>
              </a>

              <a
                href="mailto:eyimofepinnick@gmail.com"
                className="chow-btn px-4 py-3 rounded-full bg-white text-[#0E2233] dark:bg-[#122436] dark:text-white border-2 border-[#0E2233] dark:border-[#2D6A4F] font-extrabold text-xs sm:text-sm flex items-center gap-1.5 hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332]"
              >
                <Mail className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#52B788]" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Bunmi Arched Portrait with Bouncing Sun */}
          <div className="lg:col-span-5 flex justify-center relative">
            <figure className="relative w-72 sm:w-80 aspect-[4/5]">
              {/* Floating Bouncing Sun Disc (Forest Green Theme) */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-3 border-[#0E2233] dark:border-[#2D6A4F] bg-[#2D6A4F] dark:bg-[#1B4332] shadow-[6px_6px_0_#0E2233] dark:shadow-[6px_6px_0_#143829] animate-bob z-0"
                aria-hidden="true"
              />

              {/* The Arch Frame */}
              <div className="relative z-10 w-full h-full border-3 border-[#0E2233] dark:border-[#2D6A4F] rounded-t-[140px] rounded-b-[24px] overflow-hidden bg-[#1B4332] dark:bg-[#122436] shadow-[10px_10px_0_#0E2233] dark:shadow-[10px_10px_0_#143829]">
                <img
                  src="/assets/images/profile.png"
                  alt="Eyimofe Pinnick"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
                  }}
                />
              </div>

              {/* Technical badge overlay */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#FFFFFF] dark:bg-[#122436] shadow-[4px_4px_0_#0E2233] dark:shadow-[4px_4px_0_#143829] text-xs font-extrabold tracking-wider uppercase whitespace-nowrap text-[#0E2233] dark:text-[#52B788]">
                PRODUCT MANAGER & BUILDER
              </div>
            </figure>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MARQUEE TICKER (High-energy Deep Forest Green Strip)
         ========================================================================= */}
      <div className="w-full overflow-hidden bg-[#1B4332] py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#D8F3DC]">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 pr-8">
              <span>★ Product Discovery & PRDs</span>
              <span>★ 0 to 1 Execution</span>
              <span>★ Software Engineering</span>
              <span>★ FastAPI & Python</span>
              {/* <span>★ PostgreSQL & Supabase</span> */}
              {/* <span>★ AI Agent Workflows</span> */}
              {/* <span>★ High Velocity Delivery</span> */}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          4. SELECTED WORK (#work) - Bunmi Signature Lagoon Teal Section with Wave Borders
         ========================================================================= */}
      <div className="w-full relative overflow-visible">
        {/* TOP SCALLOPED WAVE DIVIDER (Forest Green Marquee into Lagoon Teal) */}
        <div
          className="w-full h-10 overflow-hidden leading-none pointer-events-none -mb-[1px] bg-[#1B4332]"
          aria-hidden="true"
        >
          <svg
            className="w-full h-10 block"
            preserveAspectRatio="none"
            viewBox="0 0 1600 40"
          >
            <defs>
              <pattern
                id="bunmi-wave-top"
                width="160"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 40V22Q40 2 80 22T160 22V40Z" fill={workBgColor} />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#bunmi-wave-top)" />
          </svg>
        </div>

        {/* LAGOON TEAL BODY CONTAINER */}
        <section
          id="work"
          className={`w-full relative overflow-hidden transition-colors duration-300 py-16 sm:py-24 ${
            isDark ? 'bg-[#0A3D42]' : 'bg-[#10B7AE]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 88% 22%, transparent 0 32px, rgba(45, 106, 79, 0.15) 32px 34px, transparent 34px)'
              : 'radial-gradient(circle at 88% 22%, transparent 0 32px, rgba(8, 99, 110, 0.16) 32px 34px, transparent 34px)',
          }}
        >
          {/* FLOATING STICKY NOTES LAYER (Desktop Only - positioned cleanly on the side) */}
          <div className="hidden lg:block absolute top-12 right-12 z-30 pointer-events-none w-64 h-0">
            {notes.map((note) => (
              <div key={note.id}>
                <ChowStickyNote
                  id={note.id}
                  initialText={note.text}
                  author={note.author}
                  color={note.color}
                  kicker={note.kicker}
                  defaultX={note.x}
                  defaultY={note.y}
                  onDelete={() => deleteNote(note.id)}
                  isDraggable={true}
                />
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10 space-y-12">
            <div
              className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b-2.5 pb-6 ${
                isDark ? 'border-[#2D6A4F]/60' : 'border-[#0E2233]'
              }`}
            >
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0E2233] dark:text-[#D8F3DC]">
                  Along the Way · What I Build
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  Selected Work
                </h2>
                <p className="text-base font-semibold text-[#0E2233]/90 dark:text-[#EAF1F8] max-w-xl">
                  Real platforms and systems built with care. Click any card to
                  dive into the full case study.
                </p>
              </div>

              {/* Filter Bar (No font-mono) */}
              <div
                className={`flex items-center gap-1.5 p-1.5 rounded-xl border-2 text-xs font-bold shadow-[3px_3px_0_#0E2233] dark:shadow-[3px_3px_0_#143829] ${
                  isDark
                    ? 'border-[#2D6A4F] bg-[#091522]/90'
                    : 'border-[#0E2233] bg-[#FFFFFF]/95 backdrop-blur-sm'
                }`}
              >
                {(['all', 'pm', 'engineer'] as const).map((r) => {
                  const isActive = roleFilter === r
                  const label =
                    r === 'all'
                      ? 'All'
                      : r === 'pm'
                        ? 'Product Manager'
                        : 'Engineer'
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRoleFilter(r)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
                        isActive
                          ? isDark
                            ? 'bg-[#2D6A4F] text-white'
                            : 'bg-[#1B4332] text-white'
                          : isDark
                            ? 'text-[#CBD5E1] hover:bg-white/10'
                            : 'text-[#0E2233] hover:bg-black/5'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* MOBILE STICKY NOTES STRIP (Clean horizontal swipe - never overlaps title or filters) */}
            {notes.length > 0 && (
              <div className="lg:hidden flex items-center gap-3 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                {notes.map((note) => (
                  <div key={note.id} className="shrink-0 w-64">
                    <ChowStickyNote
                      id={note.id}
                      initialText={note.text}
                      author={note.author}
                      color={note.color}
                      kicker={note.kicker}
                      defaultX={0}
                      defaultY={0}
                      onDelete={() => deleteNote(note.id)}
                      isDraggable={false}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* BENTO CARDS: Simply Image -> Product Name -> Short Info -> Tags -> Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {filteredProjects.map((project) => {
                const hasImage = Boolean(
                  project.image && project.image.trim() !== ''
                )

                return (
                  <article
                    key={project.id}
                    className={`chow-card p-6 sm:p-8 rounded-[24px] flex flex-col justify-between ${
                      isDark
                        ? 'bg-[#122436] text-[#EAF1F8]'
                        : 'bg-[#FFFFFF] text-[#0E2233]'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* 1. MAIN IMAGE OF THE PRODUCT */}
                      {hasImage && (
                        <Link
                          to={`/work/${project.id}`}
                          className="block group/media relative w-full aspect-[16/10] border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-white rounded-xl shadow-[4px_4px_0_#0E2233] dark:shadow-[4px_4px_0_#143829] overflow-hidden p-3 cursor-pointer"
                        >
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover/media:scale-104"
                          />
                        </Link>
                      )}

                      {/* 2. PRODUCT NAME */}
                      <div className="flex items-center justify-between gap-2 pt-2">
                        <span className="px-3 py-1 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#1B4332] text-white dark:bg-[#2D6A4F] text-[11px] font-extrabold tracking-wider uppercase shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]">
                          {project.roleLabel}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-[#0E2233] dark:text-white">
                        <Link
                          to={`/work/${project.id}`}
                          className="hover:text-[#1B4332] dark:hover:text-[#52B788] transition-colors"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      {/* 3. SHORT INFO */}
                      <p className="text-sm sm:text-base text-neutral-700 dark:text-[#CBD5E1] leading-relaxed font-medium">
                        {project.tagline}
                      </p>

                      {/* 4. TAGS */}
                      {project.stack && project.stack.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md border border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#091522] text-[#0E2233] dark:text-[#EAF1F8] text-xs font-bold shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 5. LINKS */}
                    <div className="pt-6 mt-6 border-t-2 border-[#0E2233]/20 dark:border-white/15 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                      <Link
                        to={`/work/${project.id}`}
                        className="inline-flex items-center gap-1.5 underline underline-offset-4 text-[#1B4332] dark:text-[#52B788] hover:text-[#2D6A4F] dark:hover:text-[#D8F3DC] transition-colors group/cta"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                      </Link>

                      {project.videoUrl && (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 underline underline-offset-4 text-[#0B6277] dark:text-[#52B788] hover:opacity-80 transition-opacity"
                        >
                          <span>Watch Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM SCALLOPED WAVE DIVIDER (Lagoon Teal into Dusk Navy) */}
        <div
          className="w-full h-10 overflow-hidden leading-none pointer-events-none -mt-[1px] bg-[#0B6277] dark:bg-[#091522]"
          aria-hidden="true"
        >
          <svg
            className="w-full h-10 block"
            preserveAspectRatio="none"
            viewBox="0 0 1600 40"
          >
            <defs>
              <pattern
                id="bunmi-wave-work-bottom"
                width="160"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 0V18Q40 38 80 18T160 18V0Z" fill={workBgColor} />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="40"
              fill="url(#bunmi-wave-work-bottom)"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          5. EXPERIENCE & TIMELINE (#experience) - Bunmi Signature Dusk Navy Section
         ========================================================================= */}
      <div className="w-full relative overflow-visible">
        <section
          id="experience"
          className="w-full relative overflow-hidden transition-colors duration-300 bg-gradient-to-b from-[#0B6277] via-[#094F60] to-[#0E2233] dark:from-[#091522] dark:to-[#07101B] text-white py-16 sm:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-10 relative z-10">
            <div className="space-y-2 border-b-2 border-white/20 pb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D8F3DC] dark:text-[#52B788]">
                Career Path · Real Impact
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Work Experience
              </h2>
            </div>

            <div className="space-y-6">
              {profile.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="chow-card p-6 sm:p-8 rounded-[22px] bg-[#FFFFFF] dark:bg-[#122436] space-y-4 text-[#0E2233] dark:text-[#EAF1F8] border-2.5 border-[#0E2233] dark:border-[#2D6A4F] shadow-[6px_6px_0_#1B4332] dark:shadow-[6px_6px_0_#143829]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3.5 py-1 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#1B4332] text-white dark:bg-[#2D6A4F] text-xs font-extrabold shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]">
                      {exp.period}
                    </span>
                    <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                    {exp.role}{' '}
                    <span className="text-[#1B4332] dark:text-[#52B788]">
                      @ {exp.company}
                    </span>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM SCALLOPED WAVE DIVIDER (Dusk to Skills) */}
        <div
          className="w-full h-10 overflow-hidden leading-none pointer-events-none -mt-[1px] bg-[#FFFFFF] dark:bg-[#091522]"
          aria-hidden="true"
        >
          <svg
            className="w-full h-10 block"
            preserveAspectRatio="none"
            viewBox="0 0 1600 40"
          >
            <defs>
              <pattern
                id="bunmi-wave-dusk"
                width="160"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 0V18Q40 38 80 18T160 18V0Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="40"
              fill="url(#bunmi-wave-dusk)"
              className="text-[#0E2233] dark:text-[#07101B]"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          6. SKILLS TOOLBOX (#skills) - High-end Calm Forest Slate
         ========================================================================= */}
      <section
        id="skills"
        className="py-16 sm:py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-10"
      >
        <div className="space-y-2 border-b-2 border-[#0E2233] dark:border-white/15 pb-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
            Toolbox
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
            Skills & Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skills.map((cat, idx) => (
            <div
              key={idx}
              className="chow-card p-6 rounded-[22px] bg-[#FFFFFF] dark:bg-[#122436] space-y-4 text-[#0E2233] dark:text-[#EAF1F8] border-2.5 border-[#0E2233] dark:border-[#2D6A4F] shadow-[6px_6px_0_#0E2233] dark:shadow-[6px_6px_0_#143829]"
            >
              <h3 className="font-extrabold text-base tracking-tight text-[#1B4332] dark:text-[#52B788] border-b-2 border-[#0E2233]/20 dark:border-white/15 pb-2">
                {cat.category}
              </h3>
              <ul className="space-y-2.5 text-xs font-bold text-neutral-800 dark:text-[#CBD5E1]">
                {cat.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F] dark:bg-[#52B788]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. FOOTER / CONTACT (#contact)
         ========================================================================= */}
      <footer
        id="contact"
        className={`relative overflow-hidden pt-20 pb-24 border-t-2.5 px-6 sm:px-12 transition-colors duration-300 ${
          isDark
            ? 'border-[#2D6A4F] bg-[#091522] text-white'
            : 'border-[#0E2233] bg-[#E8F5E9] text-[#0E2233]'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8 text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
            Next Stop
          </span>

          <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight leading-tight text-[#0E2233] dark:text-white">
            Hiring, collaborating or <em>building 0 to 1</em>
          </h2>

          <p className="text-base sm:text-lg opacity-85 max-w-xl mx-auto font-medium text-neutral-800 dark:text-[#CBD5E1]">
            Whether you need a product manager who speaks code or an engineer
            who understands product metrics, write to me and let&apos;s build
            something exceptional.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="mailto:eyimofepinnick@gmail.com"
              className="chow-btn px-8 py-4 rounded-full bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-[#2D6A4F] dark:hover:bg-[#1B4332]"
            >
              O <span>Send Me An Email</span>
            </a>

            <a
              href="https://linkedin.com/in/eyimofe-p"
              target="_blank"
              rel="noopener noreferrer"
              className="chow-btn px-6 py-4 rounded-full bg-[#FFFFFF] dark:bg-[#122436] text-[#0E2233] dark:text-white border-2 border-[#0E2233] dark:border-[#2D6A4F] font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-50"
            >
              <LinkedinIcon className="w-4 h-4 text-[#1B4332] dark:text-[#52B788]" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/eyim0fe"
              target="_blank"
              rel="noopener noreferrer"
              className="chow-btn px-6 py-4 rounded-full bg-[#FFFFFF] dark:bg-[#122436] text-[#0E2233] dark:text-white border-2 border-[#0E2233] dark:border-[#2D6A4F] font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-50"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="pt-12 text-xs font-bold opacity-60">
            © {new Date().getFullYear()} Eyimofe Pinnick · Product Manager &
            Engineer
          </div>
        </div>
      </footer>
    </div>
  )
}
