import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { ApertureToggle } from "@/design-system/components/CreativeToggles/ApertureToggle"
import {
  FileText,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Clock
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

export function Variant5Swiss() {
  const [isDark, setIsDark] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>("tsems")
  const [currentTime, setCurrentTime] = useState<string>("")
  const { profile, projects, quotes } = PORTFOLIO_DATA

  // Lagos Local Time Clock (WAT: UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 ${
        isDark ? "dark bg-[#09090B] text-[#FAFAFA]" : "bg-[#FFFFFF] text-[#111827]"
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Top Mobile Bar (Visible on mobile, hides on desktop) */}
      <div className="lg:hidden sticky top-0 z-30 p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#09090B]/90 backdrop-blur-md flex items-center justify-between">
        <div>
          <span className="font-bold text-sm">{profile.name}</span>
          <p className="text-[11px] text-neutral-500 font-mono">Product Manager & Engineer</p>
        </div>
        <ApertureToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>

      {/* Main Container: Split 2-Column Desktop Grid */}
      <div className="max-w-7xl mx-auto lg:flex items-start">
        {/* Left Column: Fixed Sticky Dossier (ana.sh inspiration) */}
        <aside className="w-full lg:w-[360px] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto p-6 lg:p-10 border-r border-neutral-200 dark:border-neutral-800/80 space-y-8 shrink-0 scrollbar-none">
          {/* Top Logo / Aperture Toggle on Desktop */}
          <div className="hidden lg:flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800/60">
            <span className="font-mono text-xs font-bold tracking-tight uppercase">
              DOSSIER · 05
            </span>
            <ApertureToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>

          {/* Profile Dossier Card */}
          <div className="space-y-5">
            {/* Real Avatar with ana.sh style Ambient Glow Blur */}
            <div className="relative group">
              {/* Soft blur depth underlay */}
              <div
                className="absolute inset-0 rounded-2xl filter blur-xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none"
                style={{
                  backgroundImage: `url(${profile.avatar})`,
                  backgroundSize: "cover"
                }}
              />
              <img
                src={profile.avatar}
                alt={profile.name}
                className="relative z-10 w-28 h-28 lg:w-32 lg:h-32 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-700/80 shadow-md"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {profile.title}
              </p>
            </div>

            {/* Status & Lagos Clock */}
            <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-900/60 space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {profile.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Lagos (WAT):
                </span>
                <span className="font-bold tracking-wider">{currentTime || "12:00:00"}</span>
              </div>
            </div>

            {/* Short Bio */}
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {profile.bio.full[0]}
            </p>
          </div>

          {/* ana.sh Inspired "Fun Facts" List */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800/60">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">
              QUICK FACTS
            </span>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {profile.funFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Resume */}
          <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800/60 font-mono text-xs">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
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
        </aside>

        {/* Right Column: High-Density Scannable Project Index */}
        <main className="flex-1 p-6 lg:p-12 space-y-16 pb-36">
          {/* Hero Statement */}
          <section className="space-y-3 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              [PORTFOLIO_INDEX · 2024]
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {profile.bio.headline}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {profile.bio.full[1]}
            </p>
          </section>

          {/* Selected Work (Scannable Drawers) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-lg font-bold tracking-tight">Selected Products & Work</h3>
              <span className="text-xs font-mono text-neutral-400">Click to expand case study</span>
            </div>

            <div className="space-y-4">
              {projects.map((proj) => {
                const isOpen = expandedProject === proj.id
                return (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedProject(isOpen ? null : proj.id)}
                      className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">{proj.title}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            {proj.period}
                          </span>
                          <span className="text-xs font-mono text-neutral-500">
                            {proj.roleLabel}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {proj.metrics && (
                          <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-md">
                            {proj.metrics}
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expandable Case Study Drawer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="border-t border-neutral-200 dark:border-neutral-800 p-6 space-y-6"
                        >
                          {/* Screenshots */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {proj.images.map((img, i) => (
                              <div key={i} className="space-y-1.5">
                                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 aspect-video bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                                  <img
                                    src={img.src}
                                    alt={img.caption}
                                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                                  />
                                </div>
                                <p className="text-[11px] font-mono text-neutral-400">{img.caption}</p>
                              </div>
                            ))}
                          </div>

                          {/* Problem & Solution */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                              <span className="font-mono font-bold text-neutral-500 uppercase">
                                The Problem
                              </span>
                              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {proj.caseStudy.problem}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                              <span className="font-mono font-bold text-neutral-500 uppercase">
                                The Product Solution
                              </span>
                              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {proj.caseStudy.solution}
                              </p>
                            </div>
                          </div>

                          {/* Impact Points */}
                          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                            <span className="font-mono font-bold uppercase text-neutral-500">
                              Product Impact:
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
                              {proj.caseStudy.myImpact.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-xs">
                            <span className="text-neutral-400 mr-2">Stack:</span>
                            {proj.stack.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-lg font-bold tracking-tight">Experience & Career</h3>
            </div>

            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-base">{exp.role}</span>
                      <span className="text-neutral-500 text-sm">@ {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                  </div>
                  <p className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    ★ {exp.highlight}
                  </p>
                  {exp.details && (
                    <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 pt-1">
                      {exp.details.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tooling & Architecture */}
          <section className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-lg font-bold tracking-tight">Skills & Tech Stack</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.skills.map((cat) => (
                <div
                  key={cat.category}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 space-y-2"
                >
                  <span className="text-xs font-mono font-bold uppercase text-neutral-500">
                    {cat.category}
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {cat.items.map((it) => (
                      <li key={it}>- {it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-6 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} {profile.name} · Swiss Monolith Edition</span>
        <span>Inspired by ana.sh & olumideadewole.xyz</span>
      </footer>
    </div>
  )
}
