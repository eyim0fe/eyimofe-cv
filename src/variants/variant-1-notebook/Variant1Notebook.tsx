import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { LampToggle } from "@/design-system/components/CreativeToggles/LampToggle"
import {
  FileText,
  Mail,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Clock
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

export function Variant1Notebook() {
  const [isDark, setIsDark] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>("tsems")
  const { profile, projects, quotes } = PORTFOLIO_DATA

  return (
    <div
      className={`min-h-screen transition-colors duration-400 font-serif selection:bg-amber-200 selection:text-neutral-900 ${
        isDark ? "dark bg-[#121214] text-[#E4E4E7]" : "bg-[#FAF8F5] text-[#1A1A1A]"
      }`}
      style={{
        fontFamily: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif'
      }}
    >
      {/* Subtle tactile ruled margin lines & paper grain */}
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
        {/* Notebook vertical left red margin rule */}
        <div className="hidden lg:block absolute left-24 top-0 bottom-0 w-[1px] bg-rose-300 dark:bg-rose-900/40" />
        <div className="hidden lg:block absolute left-[98px] top-0 bottom-0 w-[1px] bg-rose-200/50 dark:bg-rose-900/20" />
      </div>

      {/* Top Header & Tactile Lamp Toggle */}
      <header className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-6 flex items-start justify-between border-b border-[#E7E2DB] dark:border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">
              Field Notebook · Vol. 01
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight">
            {profile.name}
          </h1>
          <p className="text-base sm:text-lg opacity-75 mt-1">
            {profile.title}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono opacity-60 mt-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {profile.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> WAT (UTC+1)
            </span>
          </div>
        </div>

        {/* Pull-chain Desk Lamp Toggle */}
        <div className="flex flex-col items-center">
          <LampToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: About Me & Tactile Dossier */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#E7E2DB] dark:border-[#27272A] pb-2">
            <h2 className="text-xl font-normal tracking-wide">01. About Me</h2>
            <span className="text-xs font-mono opacity-50 uppercase">Philosophy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Real Avatar with Physical Tape Corner */}
            <div className="md:col-span-4 relative group">
              <div className="relative overflow-hidden rounded-xs border border-[#D5CEC5] dark:border-[#3F3F46] p-1 bg-white dark:bg-[#1A1A1E] shadow-sm">
                {/* Tape strip at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EAE4DC]/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 -rotate-2 pointer-events-none" />
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full aspect-square object-cover rounded-xs filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Status note */}
              <div className="mt-3 p-2.5 rounded-xs border border-dashed border-[#D5CEC5] dark:border-[#3F3F46] bg-white/50 dark:bg-[#1A1A1E]/50 text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1.5">●</span>
                {profile.status}
              </div>
            </div>

            {/* Bio text */}
            <div className="md:col-span-8 space-y-4 text-base leading-relaxed">
              <p className="text-lg opacity-90 leading-relaxed font-normal">
                {profile.bio.headline}
              </p>
              {profile.bio.full.map((p, idx) => (
                <p key={idx} className="opacity-80">
                  {p}
                </p>
              ))}

              {/* Quick Social & Resume Links */}
              <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                {profile.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#D5CEC5] dark:border-[#3F3F46] hover:bg-[#EFEAE2] dark:hover:bg-[#27272A] transition-colors"
                  >
                    {s.name === "Resume" ? <FileText className="w-3.5 h-3.5" /> : null}
                    {s.name === "GitHub" ? <GithubIcon className="w-3.5 h-3.5" /> : null}
                    {s.name === "LinkedIn" ? <LinkedinIcon className="w-3.5 h-3.5" /> : null}
                    {s.name === "Email" ? <Mail className="w-3.5 h-3.5" /> : null}
                    {s.name}
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Selected Products (List-First Scannable Architecture) */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#E7E2DB] dark:border-[#27272A] pb-2">
            <h2 className="text-xl font-normal tracking-wide">02. Selected Products & Work</h2>
            <span className="text-xs font-mono opacity-50 uppercase">Case Studies</span>
          </div>

          <div className="space-y-6">
            {projects.map((proj) => {
              const isOpen = expandedProject === proj.id
              return (
                <div
                  key={proj.id}
                  className="rounded-xs border border-[#D5CEC5] dark:border-[#2E2E33] bg-white dark:bg-[#18181B] transition-shadow shadow-xs overflow-hidden"
                >
                  {/* Collapsible Row Header */}
                  <button
                    type="button"
                    onClick={() => setExpandedProject(isOpen ? null : proj.id)}
                    className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#FDFBF7] dark:hover:bg-[#1E1E22] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">{proj.title}</h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-xs border border-[#D5CEC5] dark:border-[#3F3F46]">
                          {proj.period}
                        </span>
                        <span className="text-xs font-mono opacity-60">
                          {proj.roleLabel}
                        </span>
                      </div>
                      <p className="text-sm opacity-75 font-sans leading-relaxed">
                        {proj.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {proj.metrics && (
                        <span className="hidden md:inline-block text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xs border border-emerald-300 dark:border-emerald-800">
                          {proj.metrics}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {/* Expanded In-Place Case Study Drawer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-[#E7E2DB] dark:border-[#27272A] p-6 space-y-6 font-sans text-sm"
                      >
                        {/* Real Screenshots Grid with Captions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {proj.images.map((img, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="overflow-hidden rounded-xs border border-[#D5CEC5] dark:border-[#3F3F46] bg-neutral-100 dark:bg-neutral-900 aspect-video flex items-center justify-center">
                                <img
                                  src={img.src}
                                  alt={img.caption}
                                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                                />
                              </div>
                              <p className="text-[11px] font-mono opacity-60 italic">{img.caption}</p>
                            </div>
                          ))}
                        </div>

                        {/* Problem & Solution Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-2">
                            <span className="text-xs font-mono font-bold uppercase opacity-60">
                              Problem Statement
                            </span>
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {proj.caseStudy.problem}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <span className="text-xs font-mono font-bold uppercase opacity-60">
                              Product Solution
                            </span>
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                              {proj.caseStudy.solution}
                            </p>
                          </div>
                        </div>

                        {/* PM Impact */}
                        <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono font-bold uppercase opacity-60">
                            Eyimofe&apos;s Impact
                          </span>
                          <ul className="list-disc list-inside space-y-1.5 text-neutral-700 dark:text-neutral-300">
                            {proj.caseStudy.myImpact.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs">
                          <span className="opacity-60 mr-2">Stack:</span>
                          {proj.stack.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded-xs border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80"
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

        {/* Section 3: Experience */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#E7E2DB] dark:border-[#27272A] pb-2">
            <h2 className="text-xl font-normal tracking-wide">03. Experience</h2>
            <span className="text-xs font-mono opacity-50 uppercase">Career Timeline</span>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xs border border-[#D5CEC5] dark:border-[#27272A] bg-white dark:bg-[#18181B] space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-semibold text-base">{exp.role}</h3>
                    <span className="opacity-50 text-sm">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono opacity-60">{exp.period}</span>
                </div>
                <p className="text-sm font-sans font-medium text-emerald-800 dark:text-emerald-400">
                  {exp.highlight}
                </p>
                {exp.details && (
                  <ul className="list-disc list-inside font-sans text-xs opacity-75 space-y-1 pt-1">
                    {exp.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Skills Matrix & Fun Personal Notes */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#E7E2DB] dark:border-[#27272A] pb-2">
            <h2 className="text-xl font-normal tracking-wide">04. Tooling & Fun Facts</h2>
            <span className="text-xs font-mono opacity-50 uppercase">Personal Corner</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div className="p-6 rounded-xs border border-[#D5CEC5] dark:border-[#27272A] bg-white dark:bg-[#18181B] space-y-4">
              <h3 className="font-semibold text-base">Skills & Disciplines</h3>
              <div className="space-y-3 font-mono text-xs">
                {profile.skills.map((cat) => (
                  <div key={cat.category} className="space-y-1.5">
                    <span className="font-bold opacity-60 uppercase">{cat.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-xs border border-[#D5CEC5] dark:border-[#3F3F46] bg-[#FAF8F5] dark:bg-[#202024]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Facts & Quotes */}
            <div className="p-6 rounded-xs border border-[#D5CEC5] dark:border-[#27272A] bg-white dark:bg-[#18181B] space-y-4">
              <h3 className="font-semibold text-base">Field Notes & Quirks</h3>
              <ul className="space-y-2 text-sm font-sans">
                {profile.funFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 font-mono text-xs mt-0.5">0{idx + 1}.</span>
                    <span className="opacity-80">{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 italic text-sm opacity-70">
                &ldquo;{quotes[1].text}&rdquo;
                <span className="block not-italic text-xs font-mono opacity-50 mt-1">
                  — {quotes[1].author}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-[#E7E2DB] dark:border-[#27272A] flex flex-col sm:flex-row items-center justify-between text-xs font-mono opacity-60 gap-4">
        <span>© {new Date().getFullYear()} {profile.name} · Designed with BIZ UDPMincho & 8pt Grid</span>
        <a href="#top" className="hover:opacity-100 transition-opacity">Back to top ↑</a>
      </footer>
    </div>
  )
}
