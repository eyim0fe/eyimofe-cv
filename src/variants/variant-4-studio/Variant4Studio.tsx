import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { RockerToggle } from "@/design-system/components/CreativeToggles/RockerToggle"
import { StickyNote } from "@/design-system/components/StickyNote"
import {
  PenTool,
  Plus,
  ClipboardList,
  CheckCircle2,
  FileText,
  Mail,
  ArrowUpRight
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

interface CustomNote {
  id: string
  text: string
  color: "yellow" | "mint" | "peach" | "sky"
  x: number
  y: number
  author: string
}

export function Variant4Studio() {
  const [isDark, setIsDark] = useState(false)
  const [penMode, setPenMode] = useState(false)
  const [activePrdTab, setActivePrdTab] = useState<"tsems" | "tnbc">("tsems")
  const { profile, projects } = PORTFOLIO_DATA

  // Custom Sticky notes state
  const [notes, setNotes] = useState<CustomNote[]>([
    {
      id: "note-1",
      text: "Eyimofe: Shipped Tsems v1 in 6 weeks with zero tech debt.",
      color: "yellow",
      x: 10,
      y: 0,
      author: "Sprint Retrospective"
    },
    {
      id: "note-2",
      text: "PRD Rule: If a user can't pick Tuesday's meal in 3 taps, we failed.",
      color: "mint",
      x: 0,
      y: 10,
      author: "Product Spec #14"
    }
  ])

  // Handle canvas click to add sticky note in pen mode
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!penMode) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 100
    const y = e.clientY - rect.top - 50

    const colors: ("yellow" | "mint" | "peach" | "sky")[] = ["yellow", "mint", "peach", "sky"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newNote: CustomNote = {
      id: `custom-note-${Date.now()}`,
      text: "New PRD Thought: Click to edit...",
      color: randomColor,
      x: Math.max(10, x),
      y: Math.max(10, y),
      author: "Eyimofe (PM)"
    }
    setNotes((prev) => [...prev, newNote])
  }

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const activeProject = projects.find((p) => p.id === activePrdTab) || projects[0]

  return (
    <div
      onClick={handleCanvasClick}
      className={`min-h-screen transition-colors duration-400 font-sans selection:bg-amber-300 selection:text-neutral-900 ${
        isDark ? "dark bg-[#141416] text-[#FAFAFA]" : "bg-[#F7F7F8] text-[#18181B]"
      } ${penMode ? "cursor-crosshair" : "cursor-default"}`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Drafting Board Grid Lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #71717A 1px, transparent 1px), linear-gradient(to bottom, #71717A 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Floating Pen Cursor Toolbar */}
      <aside aria-label="Pen Mode Toolbar" className="fixed top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-md">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setPenMode(!penMode)
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
            penMode
              ? "bg-amber-500 text-neutral-950 font-bold shadow-xs scale-105"
              : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>{penMode ? "Pen Mode ACTIVE (Click to stick note)" : "Toggle Pen Mode"}</span>
        </button>

        {penMode && (
          <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 px-2 animate-pulse">
            ✍ Click canvas to drop sticky note!
          </span>
        )}
      </aside>

      {/* Studio Header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-300 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
            <ClipboardList className="w-4 h-4" />
            <span>PM WAR ROOM · DRAFTING DESK & SPEC LAB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {profile.name}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl font-mono">
            {profile.title} · PRDs, funnels & full-stack code.
          </p>
        </div>

        {/* Industrial Rocker Light Switch Toggle */}
        <div className="flex items-center gap-4 self-start md:self-center" onClick={(e) => e.stopPropagation()}>
          <RockerToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-14 pb-32">
        {/* Sticky Notes Drafting Wall (User can interact, drag, and create) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                📌 Product Review Sticky Notes (Draggable)
              </span>
              <span className="text-[11px] font-mono opacity-50">
                ({notes.length} pinned)
              </span>
            </div>
            {notes.length < 5 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  const colors: ("yellow" | "mint" | "peach" | "sky")[] = ["yellow", "mint", "peach", "sky"]
                  setNotes((prev) => [
                    ...prev,
                    {
                      id: `note-${Date.now()}`,
                      text: "New requirement: Instant offline search with zero lag.",
                      color: colors[prev.length % colors.length],
                      x: (prev.length * 20),
                      y: 0,
                      author: "Eyimofe (PM)"
                    }
                  ])
                }}
                className="flex items-center gap-1 text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Note
              </button>
            )}
          </div>

          {/* Interactive Sticky Notes Flex Canvas */}
          <div className="flex flex-wrap gap-6 py-2 min-h-[140px]" onClick={(e) => e.stopPropagation()}>
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

        {/* Section 2: PM Profile & Specs Dossier */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            <div className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="p-3 space-y-1">
                <span className="text-xs font-mono font-bold block">{profile.name}</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  ● {profile.status}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2 font-mono text-xs">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-500 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {s.name === "Resume" && <FileText className="w-3.5 h-3.5" />}
                    {s.name === "GitHub" && <GithubIcon className="w-3.5 h-3.5" />}
                    {s.name === "LinkedIn" && <LinkedinIcon className="w-3.5 h-3.5" />}
                    {s.name === "Email" && <Mail className="w-3.5 h-3.5" />}
                    {s.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                [EXECUTIVE_SUMMARY]
              </span>
              <h2 className="text-xl font-bold leading-snug">
                {profile.bio.headline}
              </h2>
              {profile.bio.full.map((p, idx) => (
                <p key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* PM Philosophy Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400">RULE 01</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  One primary action per screen. Never force users into decision fatigue.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1">
                <span className="font-bold text-amber-600 dark:text-amber-400">RULE 02</span>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Prefer scannable lists over complex multi-nested cards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive PRD Feature Inspector (Tsems & TNBC) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-300 dark:border-neutral-800 pb-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Interactive PRD Workroom</h2>
              <p className="text-xs font-mono text-neutral-500">Live breakdown of problem hypotheses, specs, and metrics</p>
            </div>

            {/* PRD Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              <button
                type="button"
                onClick={() => setActivePrdTab("tsems")}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activePrdTab === "tsems"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                PRD-01: Tsems (Meal App)
              </button>
              <button
                type="button"
                onClick={() => setActivePrdTab("tnbc")}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activePrdTab === "tnbc"
                    ? "bg-amber-500 text-neutral-950 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                PRD-02: TNBC (Platform)
              </button>
            </div>
          </div>

          {/* Active PRD Dossier */}
          <div className="p-6 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-2xl font-bold">{activeProject.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">{activeProject.tagline}</p>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-md font-semibold">
                ★ {activeProject.metrics}
              </span>
            </div>

            {/* Screenshots Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProject.images.map((img, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="overflow-hidden rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 aspect-video flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-neutral-500">{img.caption}</p>
                </div>
              ))}
            </div>

            {/* Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">[PROBLEM_SPEC]</span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {activeProject.caseStudy.problem}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">[SOLUTION_SPEC]</span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {activeProject.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Impact Highlights */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-mono font-bold uppercase text-neutral-500">
                Shipped Execution & Leadership:
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {activeProject.caseStudy.myImpact.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Experience Timeline */}
        <section className="space-y-6">
          <div className="border-b border-neutral-300 dark:border-neutral-800 pb-3">
            <h2 className="text-2xl font-bold tracking-tight">Sprint Milestones & Experience</h2>
            <p className="text-xs font-mono text-neutral-500">Chronological product engineering roles</p>
          </div>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-base">{exp.role}</span>
                    <span className="text-amber-600 dark:text-amber-400 text-sm">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                </div>
                <p className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  ⚡ {exp.highlight}
                </p>
                {exp.details && (
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 pt-1 font-mono">
                    {exp.details.map((d, i) => (
                      <li key={i}>- {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} {profile.name} · PM Drafting Studio Edition</span>
        <span>Interactive Pen & Sticky Notes Enabled</span>
      </footer>
    </div>
  )
}
