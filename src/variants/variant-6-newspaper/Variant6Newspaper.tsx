import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { LampToggle } from "@/design-system/components/CreativeToggles/LampToggle"
import { StickyNote } from "@/design-system/components/StickyNote"
import { BookmarkRibbon } from "@/components/BookmarkRibbon"
import { TrashDropZone } from "@/components/TrashDropZone"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"
import {
  FileText,
  Mail,
  ArrowUpRight,
  ChevronDown,
  PenTool,
  Plus,
  TrendingUp,
  Camera,
  Quote,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from "lucide-react"

interface CustomNote {
  id: string
  text: string
  color: "yellow" | "mint" | "peach" | "sky"
  x: number
  y: number
  author: string
}

export function Variant6Newspaper() {
  const [isDark, setIsDark] = useState(false)
  const [penMode, setPenMode] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>("tsems")
  const { profile, projects } = PORTFOLIO_DATA

  // Sticky notes state
  const [notes, setNotes] = useState<CustomNote[]>([
    {
      id: "news-note-1",
      text: "Editorial Note: The details are not the details. They make the design.",
      color: "yellow",
      x: 0,
      y: 0,
      author: "Editor's Desk"
    },
    {
      id: "news-note-2",
      text: "Breaking: +38% Checkout volume growth achieved at FinTech Scaleup.",
      color: "mint",
      x: 0,
      y: 0,
      author: "Lead Dispatch"
    }
  ])

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!penMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(10, e.clientX - rect.left - 100)
    const y = Math.max(10, e.clientY - rect.top - 50)

    const colors: ("yellow" | "mint" | "peach" | "sky")[] = ["yellow", "mint", "peach", "sky"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newNote: CustomNote = {
      id: `custom-note-${Date.now()}`,
      text: "Press Note: Click to edit story headline...",
      color: randomColor,
      x,
      y,
      author: "Eyimofe (Reporter)"
    }
    setNotes((prev) => [...prev, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotes = () => {
    setNotes([])
  }

  return (
    <div
      onClick={handleCanvasClick}
      className={`min-h-screen transition-colors duration-400 font-serif selection:bg-neutral-300 dark:selection:bg-neutral-800 ${
        isDark ? "dark bg-[#0F0F11] text-[#F0EFEA]" : "bg-[#F7F5F0] text-[#141414]"
      } ${penMode ? "cursor-crosshair" : "cursor-default"}`}
      style={{
        fontFamily: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif'
      }}
    >
      {/* Bookmark Ribbon on top */}
      <BookmarkRibbon
        color="#881337"
        accentColor="#4C0519"
        sections={[
          { id: "masthead", label: "01. Masthead" },
          { id: "lead-story", label: "02. Lead Story" },
          { id: "offerings", label: "03. Shipped Products" },
          { id: "clippings", label: "04. Recent Metrics" },
          { id: "interview", label: "05. Meet The Builder" },
          { id: "contact-sheet", label: "06. Film Contact Sheet" }
        ]}
      />

      {/* Floating Pen Mode Toolbar */}
      <aside aria-label="Editor's Pen Toolbar" className="fixed top-4 left-6 z-40 flex items-center gap-2 p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setPenMode(!penMode)
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            penMode
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold shadow-xs scale-105"
              : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{penMode ? "Pen Mode ON" : "Editor's Pen"}</span>
        </button>

        {penMode && (
          <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 px-1 animate-pulse hidden sm:inline">
            ✍ Click canvas to pin note
          </span>
        )}
      </aside>

      {/* Main Editorial Broadsheet Page Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-10 py-10 pb-36 space-y-12">
        {/* =========================================================================
            1. MASTHEAD & TOP BANNER (Guided by Image 2 & Image 3)
           ========================================================================= */}
        <header id="masthead" className="space-y-4">
          {/* Metadata Top Ribbon */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest border-b border-neutral-400/60 dark:border-neutral-700 pb-2 text-neutral-600 dark:text-neutral-400">
            <span>Issue No. 01</span>
            <span className="hidden sm:inline">Website Exclusive · Lagos & Remote</span>
            <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>

          {/* Big Editorial Masthead Title */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b-2 border-neutral-900 dark:border-neutral-200">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-6xl font-normal tracking-tight uppercase leading-none">
                THE PRODUCT CRAFTSMAN
              </h1>
              <p className="text-xs sm:text-sm italic opacity-75 mt-1 tracking-wide font-sans">
                A Journal of 0-to-1 Product Strategy, Software Craft & Systematic Execution
              </p>
            </div>

            {/* Lamp Toggle with Pull Chain */}
            <div className="shrink-0 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <LampToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>

          {/* Section Category Ribbon (Guided by Image 2) */}
          <div className="border-b-2 border-neutral-900 dark:border-neutral-200 py-2 flex flex-wrap items-center justify-around text-xs font-mono font-bold tracking-widest uppercase text-neutral-800 dark:text-neutral-200 gap-2">
            <span>PRODUCT STRATEGY</span>
            <span className="opacity-40">|</span>
            <span>0-TO-1 DISCOVERY</span>
            <span className="opacity-40">|</span>
            <span>SOFTWARE ENGINEERING</span>
            <span className="opacity-40">|</span>
            <span>SYSTEMS</span>
          </div>
        </header>

        {/* Sticky Notes Canvas Row */}
        <section className="space-y-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
              📌 Pinned News Clippings ({notes.length})
            </span>
            <div className="flex items-center gap-3">
              {notes.length < 5 && (
                <button
                  type="button"
                  onClick={() => {
                    const colors: ("yellow" | "mint" | "peach" | "sky")[] = ["yellow", "mint", "peach", "sky"]
                    setNotes((prev) => [
                      ...prev,
                      {
                        id: `news-note-${Date.now()}`,
                        text: "Editorial Review: Validate checkout conversion telemetry across all payment rails.",
                        color: colors[prev.length % colors.length],
                        x: 0,
                        y: 0,
                        author: "Desk Editor"
                      }
                    ])
                  }}
                  className="flex items-center gap-1 text-xs font-mono hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Clip
                </button>
              )}
              <TrashDropZone onClearAll={clearAllNotes} noteCount={notes.length} />
            </div>
          </div>

          {/* Sticky Notes Flex Area */}
          <div className="flex flex-wrap gap-4 py-1 min-h-[90px]">
            {notes.map((note) => (
              <StickyNote
                key={note.id}
                id={note.id}
                initialText={note.text}
                author={note.author}
                color={note.color}
                onDelete={() => deleteNote(note.id)}
                isDraggable={true}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            2. HERO / LEAD STORY (Guided by Image 3 & Image 2)
           ========================================================================= */}
        <section id="lead-story" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-neutral-300 dark:border-neutral-800 pb-12">
          {/* Left: Editorial Framed Portrait with Quote Box (like Image 3) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#18181C] shadow-sm space-y-3">
              {/* Photo with Kodak Portra film label (like Image 1) */}
              <div className="relative overflow-hidden border border-neutral-300 dark:border-neutral-700">
                <div className="absolute top-1 left-2 z-10 text-[8px] font-mono text-white/80 bg-black/60 px-1 rounded-2xs">
                  KODAK PORTRA 400 · 90 F11.0
                </div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-square object-cover filter grayscale contrast-110"
                />
              </div>

              {/* Quote under photo */}
              <div className="text-center pt-2 space-y-2">
                <p className="text-xs italic font-serif leading-snug text-neutral-700 dark:text-neutral-300">
                  &ldquo;I build the software and write the PRDs that teams feel proud to ship.&rdquo;
                </p>
                <span className="block text-[11px] font-mono font-bold uppercase text-neutral-500">
                  — {profile.name}
                </span>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href={profile.socials.find((s) => s.name === "Resume")?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 border border-neutral-900 dark:border-white text-xs font-mono font-bold uppercase hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Read Full CV / Résumé
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Big Editorial Headline & Multi-Column Story */}
          <div className="md:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                COVER ESSAY · BY EYIMOFE PINNICK · 4 MIN READ
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight leading-tight">
                Why Great Products Are Won In The Trenches: From 0-to-1 PRDs To Weekend Code.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 font-sans pt-2">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                {profile.bio.full[0]}
              </p>
              <p>
                {profile.bio.full[1]}
              </p>
            </div>

            {/* Social Links Row */}
            <div className="pt-4 border-t border-neutral-300 dark:border-neutral-800 flex flex-wrap items-center justify-between text-xs font-mono gap-3">
              <span className="font-bold text-neutral-500 uppercase">DIRECT DISPATCH:</span>
              <div className="flex flex-wrap gap-4">
                {profile.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline text-neutral-800 dark:text-neutral-200"
                  >
                    {s.name === "GitHub" && <GithubIcon className="w-3.5 h-3.5" />}
                    {s.name === "LinkedIn" && <LinkedinIcon className="w-3.5 h-3.5" />}
                    {s.name === "Email" && <Mail className="w-3.5 h-3.5" />}
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. "THE EDITORIAL OFFERINGS" / SHIPPED PRODUCTS (Guided by Image 3)
           ========================================================================= */}
        <section id="offerings" className="space-y-6 border-b border-neutral-300 dark:border-neutral-800 pb-12">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-normal italic tracking-wide">
              The Editorial Offerings
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Selected 0-to-1 Products & Shipped Software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const isOpen = expandedProject === proj.id
              return (
                <div
                  key={proj.id}
                  className="p-5 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#16161A] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header tag */}
                    <div className="text-center pb-2 border-b border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                        PRODUCT · {proj.period}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight mt-1">{proj.title}</h3>
                    </div>

                    {/* Architectural / High-contrast Screenshot Frame */}
                    <div className="aspect-[16/10] overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={proj.images[0].src}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    <p className="text-xs font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {proj.tagline}
                    </p>

                    {proj.metrics && (
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-900 border-l-2 border-neutral-900 dark:border-white text-xs font-mono">
                        ★ {proj.metrics}
                      </div>
                    )}
                  </div>

                  {/* Expandable Case Study Drawer */}
                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                    <button
                      type="button"
                      onClick={() => setExpandedProject(isOpen ? null : proj.id)}
                      className="w-full py-2 border border-neutral-900 dark:border-white text-xs font-mono font-bold uppercase hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{isOpen ? "Close Case Study ▲" : "Inspect Case Study ▼"}</span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4 pt-2 text-xs font-sans"
                        >
                          <div className="space-y-1">
                            <span className="font-mono font-bold uppercase opacity-60">The Problem:</span>
                            <p className="text-neutral-700 dark:text-neutral-300">{proj.caseStudy.problem}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono font-bold uppercase opacity-60">Product Solution:</span>
                            <p className="text-neutral-700 dark:text-neutral-300">{proj.caseStudy.solution}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono font-bold uppercase opacity-60">Impact Delivered:</span>
                            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                              {proj.caseStudy.myImpact.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-1 font-mono text-[11px] pt-1">
                            <span className="opacity-60 mr-1">Stack:</span>
                            {proj.stack.map((s) => (
                              <span key={s} className="px-1.5 py-0.5 border border-neutral-300 dark:border-neutral-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* =========================================================================
            4. "RECENT CLIPPINGS & KEY METRICS" (Inverted Dark Bar - Guided by Image 3)
           ========================================================================= */}
        <section id="clippings" className="p-8 rounded-xs bg-[#141416] text-[#FAF8F5] border border-neutral-800 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-normal italic tracking-wide">
              Recent Clippings & Key Metrics
            </h2>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Verified Track Record
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
            <div className="pt-2 sm:pt-0 sm:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">+38%</span>
              <p className="text-xs font-mono text-neutral-400 uppercase">Checkout Volume Surge</p>
              <span className="text-[10px] text-neutral-500 font-sans block">FinTech Scaleup</span>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">6 Weeks</span>
              <p className="text-xs font-mono text-neutral-400 uppercase">0-to-1 MVP Shipped</p>
              <span className="text-[10px] text-neutral-500 font-sans block">Tsems Meal Platform</span>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">12 Eng</span>
              <p className="text-xs font-mono text-neutral-400 uppercase">Cross-Functional Team</p>
              <span className="text-[10px] text-neutral-500 font-sans block">Studio Labs</span>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4 space-y-1">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">100%</span>
              <p className="text-xs font-mono text-neutral-400 uppercase">WCAG AAA Compliance</p>
              <span className="text-[10px] text-neutral-500 font-sans block">8pt Spatial Architecture</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. "MEET THE BUILDER" INTERVIEW (Guided by Image 3 & Image 2)
           ========================================================================= */}
        <section id="interview" className="p-6 sm:p-8 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#18181C] space-y-6">
          <div className="text-center pb-3 border-b border-neutral-300 dark:border-neutral-800">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
              EXCLUSIVE INTERVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal uppercase tracking-wide mt-1">
              MEET THE BUILDER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4 space-y-2">
              <div className="border border-neutral-300 dark:border-neutral-700 p-1">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-square object-cover filter grayscale contrast-110"
                />
              </div>
              <div className="text-center font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                <span className="font-bold block">{profile.name}</span>
                <span>Product Manager & Engineer</span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 font-sans text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
              <div className="space-y-1">
                <p className="font-mono font-bold text-neutral-500 uppercase">
                  Q: Why write code when you are already a Senior Product Manager?
                </p>
                <p className="leading-relaxed">
                  &ldquo;Because the best product decisions happen when you understand the raw material. When a PM understands database schemas, API latencies, and CSS layouts, PRDs become laser-focused and engineers move 3x faster.&rdquo;
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-mono font-bold text-neutral-500 uppercase">
                  Q: What is your golden rule for software design?
                </p>
                <p className="leading-relaxed">
                  &ldquo;One primary action per screen. Never bury user intent beneath nested cards or purple gradient fluff. The product should resemble a clean, tactile notebook.&rdquo;
                </p>
              </div>

              {/* Hand signature */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-500 uppercase">AUTHORIZED RECORD:</span>
                <span className="font-serif italic text-base sm:text-lg">Eyimofe A. Pinnick</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. ANALOG CONTACT SHEET / FILM GALLERY (Guided by Image 1 Kendrick Lamar)
           ========================================================================= */}
        <section id="contact-sheet" className="p-6 sm:p-8 border-2 border-dashed border-neutral-400 dark:border-neutral-700 bg-white/50 dark:bg-[#141418]/50 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-neutral-500" />
              <h2 className="text-xl font-normal uppercase tracking-wider">
                ANALOG CONTACT SHEET · SCRAPBOOK LOG
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">KODAK PORTRA 400</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Contact Sheet Frame 1 */}
            <div className="p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#18181C] shadow-sm space-y-2 -rotate-1 hover:rotate-0 transition-transform">
              <div className="relative border border-black/20">
                <img
                  src="/assets/images/tsems-1.png"
                  alt="Tsems Screenshot"
                  className="w-full aspect-[4/3] object-cover filter grayscale contrast-110"
                />
              </div>
              <p
                className="text-xs font-handwriting leading-tight text-neutral-700 dark:text-neutral-300"
                style={{ fontFamily: '"Caveat", cursive', fontSize: "16px" }}
              >
                &ldquo;Tsems v1 mobile library — designed for zero-lag weekly planning.&rdquo;
              </p>
            </div>

            {/* Contact Sheet Frame 2 */}
            <div className="p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#18181C] shadow-sm space-y-2 rotate-1 hover:rotate-0 transition-transform">
              <div className="relative border border-black/20">
                <img
                  src="/assets/images/tnbc-2.png"
                  alt="TNBC Dashboard"
                  className="w-full aspect-[4/3] object-cover filter grayscale contrast-110"
                />
              </div>
              <p
                className="text-xs font-handwriting leading-tight text-neutral-700 dark:text-neutral-300"
                style={{ fontFamily: '"Caveat", cursive', fontSize: "16px" }}
              >
                &ldquo;TNBC Executive Operations view — 6 manual ledgers replaced.&rdquo;
              </p>
            </div>

            {/* Contact Sheet Frame 3 */}
            <div className="p-3 border border-neutral-400 dark:border-neutral-700 bg-white dark:bg-[#18181C] shadow-sm space-y-2 -rotate-1 hover:rotate-0 transition-transform">
              <div className="relative border border-black/20">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-[4/3] object-cover filter grayscale contrast-110"
                />
              </div>
              <p
                className="text-xs font-handwriting leading-tight text-neutral-700 dark:text-neutral-300"
                style={{ fontFamily: '"Caveat", cursive', fontSize: "16px" }}
              >
                &ldquo;Lagos studio desk. Shipped with zero tech debt.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CAREER CHRONICLE & FOOTER
           ========================================================================= */}
        <section className="space-y-4 border-t-2 border-neutral-900 dark:border-neutral-200 pt-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-normal uppercase tracking-wider">
              CAREER CHRONICLE OF RECORD
            </h2>
            <span className="text-xs font-mono text-neutral-500">2019 — PRESENT</span>
          </div>

          <div className="space-y-3 font-sans text-xs">
            {profile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#18181C] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-2 font-serif">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white">{exp.role}</span>
                    <span className="text-neutral-500">@ {exp.company}</span>
                  </div>
                  <p className="font-mono text-emerald-700 dark:text-emerald-400 text-[11px]">
                    ★ {exp.highlight}
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-500 shrink-0">{exp.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Colophon Bar (like Image 2 bottom bar) */}
        <footer className="border-t-2 border-b-2 border-neutral-900 dark:border-neutral-200 py-3 flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 gap-2">
          <span>WWW.EYIMOFE.DEV · BROADSHEET ARCHIVE</span>
          <span>© {new Date().getFullYear()} {profile.name} · ALL RIGHTS RESERVED</span>
        </footer>
      </div>
    </div>
  )
}
