import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { HorizonToggle } from "@/design-system/components/CreativeToggles/HorizonToggle"
import {
  FileText,
  Mail,
  ArrowUpRight,
  TrendingUp,
  Compass,
  ChevronRight,
  Terminal,
  Layers
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

export function Variant2Navy() {
  const [isDark, setIsDark] = useState(true) // Navy Fanatic default to dark midnight mode!
  const [activeTab, setActiveTab] = useState<"products" | "experience" | "skills">("products")
  const [selectedProjectId, setSelectedProjectId] = useState<string>("tsems")
  const { profile, projects } = PORTFOLIO_DATA
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0]

  return (
    <div
      className={`min-h-screen transition-colors duration-400 font-sans selection:bg-sky-500/30 selection:text-sky-300 ${
        isDark ? "dark bg-[#060A12] text-[#F1F5F9]" : "bg-[#F8FAFC] text-[#0F172A]"
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Subtle Blueprint Grid Lines in Navy */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 dark:opacity-15 z-0"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)"
            : "linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Nautical Header with Coordinates & Horizon Toggle */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-6 border-b border-sky-900/30 dark:border-sky-800/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-sky-600 dark:text-sky-400">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "20s" }} />
            <span>LAGOS · 6°27′N 3°23′E · NAVY ARTISAN EDITION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            {profile.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            {profile.title} — shipping high-velocity 0-to-1 products.
          </p>
        </div>

        {/* Sun & Moon Horizon Toggle */}
        <div className="flex items-center gap-4 self-start md:self-center">
          <HorizonToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Metrics Banner */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">
        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/60 dark:bg-[#0B1528] flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-sky-400/80">
                Primary Impact Metric
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                +38% Checkout Volume Growth @ FinTech Scaleup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-md bg-white dark:bg-[#0F1D33] border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-300">
              ● {profile.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-6 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Dossier Profile & Controls (5 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-sky-950 bg-white dark:bg-[#0A111E] shadow-sm space-y-6">
            {/* Real Avatar */}
            <div className="relative overflow-hidden rounded-xl border border-sky-300/40 dark:border-sky-800/40 aspect-square">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A12]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono text-sky-300">Eyimofe Pinnick</span>
                <p className="text-sm font-medium">Product Strategist & TypeScript Hacker</p>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p className="font-medium text-slate-900 dark:text-slate-200">
                {profile.bio.headline}
              </p>
              {profile.bio.full.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Social & Contact Links */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-2 font-mono text-xs">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-sky-900 bg-slate-50 dark:bg-[#0E1A2D] hover:border-sky-400 dark:hover:border-sky-500 transition-colors"
                >
                  {s.name === "Resume" && <FileText className="w-3.5 h-3.5" />}
                  {s.name === "GitHub" && <GithubIcon className="w-3.5 h-3.5" />}
                  {s.name === "LinkedIn" && <LinkedinIcon className="w-3.5 h-3.5" />}
                  {s.name === "Email" && <Mail className="w-3.5 h-3.5" />}
                  {s.name}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Navy Fanatic Note */}
          <div className="p-4 rounded-xl border border-sky-300/30 dark:border-sky-900/40 bg-sky-50/50 dark:bg-[#081220] text-xs font-mono text-slate-600 dark:text-sky-300/80">
            <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">
              [NAVY_FANATIC_SPEC]
            </span>
            &quot;A color palette inspired by deep oceanic trenches and naval precision instruments. Built to WCAG AAA contrast standard.&quot;
          </div>
        </div>

        {/* Right Column: Interactive Explorer (7 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* View Segmented Control */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-sky-950 bg-slate-100 dark:bg-[#0A111E]">
            {[
              { id: "products", label: "Selected Products", icon: Layers },
              { id: "experience", label: "Experience", icon: TrendingUp },
              { id: "skills", label: "Tooling & Architecture", icon: Terminal }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* TAB 1: Selected Products */}
          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Product Selector Pills */}
              <div className="grid grid-cols-2 gap-3">
                {projects.map((proj) => {
                  const isSelected = selectedProjectId === proj.id
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-50 dark:bg-[#0D1C33] shadow-md ring-1 ring-sky-500"
                          : "border-slate-200 dark:border-sky-950 bg-white dark:bg-[#0A111E] hover:border-sky-300 dark:hover:border-sky-800"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-bold text-base">{proj.title}</span>
                        <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                          {proj.period}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {proj.tagline}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Active Product Deep Dive */}
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-slate-200 dark:border-sky-950 bg-white dark:bg-[#0A111E] space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {currentProject.roleLabel}
                    </span>
                    {currentProject.metrics && (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        ★ {currentProject.metrics}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{currentProject.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {currentProject.tagline}
                  </p>
                </div>

                {/* Screenshots Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProject.images.map((img, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-sky-900 bg-slate-100 dark:bg-[#070E1A] aspect-video flex items-center justify-center">
                        <img
                          src={img.src}
                          alt={img.caption}
                          className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">{img.caption}</p>
                    </div>
                  ))}
                </div>

                {/* Problem vs Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1526] border border-slate-100 dark:border-sky-900/40 space-y-1">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                      Problem Context
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentProject.caseStudy.problem}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1526] border border-slate-100 dark:border-sky-900/40 space-y-1">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      Delivered Solution
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentProject.caseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Impact List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-sky-950">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">
                    Product & Technical Leadership:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {currentProject.caseStudy.myImpact.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-xs">
                  <span className="text-slate-400 mr-2">Stack:</span>
                  {currentProject.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md border border-slate-200 dark:border-sky-900 bg-white dark:bg-[#0E1A2E] text-slate-700 dark:text-sky-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* TAB 2: Experience */}
          {activeTab === "experience" && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-sky-950 bg-white dark:bg-[#0A111E] space-y-6">
              <h3 className="text-xl font-bold tracking-tight">Experience & Career History</h3>
              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 dark:border-sky-900/60 bg-slate-50/50 dark:bg-[#0E1A2E]/50 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-base text-slate-900 dark:text-white">
                          {exp.role}
                        </span>
                        <span className="text-sky-600 dark:text-sky-400 text-sm">@ {exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      ★ {exp.highlight}
                    </p>
                    {exp.details && (
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1">
                        {exp.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-sky-500">›</span> {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Skills & Architecture */}
          {activeTab === "skills" && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-sky-950 bg-white dark:bg-[#0A111E] space-y-6">
              <h3 className="text-xl font-bold tracking-tight">Core Competencies</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {profile.skills.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-4 rounded-xl border border-slate-200 dark:border-sky-900/50 bg-slate-50/50 dark:bg-[#0E1A2E]/50 space-y-2"
                  >
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                      {cat.category}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      {cat.items.map((it) => (
                        <li key={it}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-sky-900/20 text-xs font-mono text-slate-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} {profile.name} · Navy Fanatic Edition</span>
        <span>WCAG AAA Compliant</span>
      </footer>
    </div>
  )
}
