import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA } from "@/data/portfolioData"
import { NatureToggle } from "@/design-system/components/CreativeToggles/NatureToggle"
import {
  Trees,
  FileText,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Droplets,
  Feather
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

export function Variant3Forest() {
  const [isDark, setIsDark] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>("tsems")
  const { profile, projects, quotes } = PORTFOLIO_DATA

  return (
    <div
      className={`min-h-screen transition-colors duration-400 font-sans selection:bg-emerald-500/20 selection:text-emerald-900 ${
        isDark ? "dark bg-[#05110B] text-[#E8F4EC]" : "bg-[#F3F7F4] text-[#0D2117]"
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      {/* Decorative SVG Lake & Pine Topography Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0 overflow-hidden">
        <svg
          className="absolute -bottom-10 inset-x-0 w-full h-80"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,133.3C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill={isDark ? "#1B4D36" : "#A7F3D0"}
          />
        </svg>
      </div>

      {/* Forest Header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-900/15 dark:border-emerald-800/30">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-emerald-700 dark:text-emerald-400">
            <Trees className="w-4 h-4" />
            <span>THE FOREST SANCTUARY · PINE & LAKE EDITION</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-medium tracking-tight"
            style={{ fontFamily: '"Fraunces", serif' }}
          >
            {profile.name}
          </h1>
          <p className="text-base sm:text-lg text-emerald-800/80 dark:text-emerald-300/80 mt-1 max-w-lg">
            {profile.title} — deliberate software, peaceful craft.
          </p>
        </div>

        {/* Nature Pine & Lake Toggle */}
        <div className="flex items-center gap-4 self-start md:self-center">
          <NatureToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-16 pb-32">
        {/* Section 1: Forest Clearing (About) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 relative group">
            <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-900/20 dark:border-emerald-700/40 p-1.5 bg-white dark:bg-[#0D2319] shadow-md">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
              <div className="p-3 text-center">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-semibold block">
                  🌲 Forest HQ · Lagos
                </span>
                <span className="text-[11px] text-emerald-600/70 dark:text-emerald-400/60 font-mono">
                  {profile.status}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <Droplets className="w-3.5 h-3.5" />
              <span>Sanctuary Observations</span>
            </div>
            <h2
              className="text-2xl font-normal text-emerald-950 dark:text-emerald-100 leading-snug"
              style={{ fontFamily: '"Fraunces", serif' }}
            >
              &ldquo;{profile.bio.headline}&rdquo;
            </h2>
            {profile.bio.full.map((p, idx) => (
              <p key={idx} className="text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                {p}
              </p>
            ))}

            {/* Social & Connect Pills */}
            <div className="pt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
              {profile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-900/20 dark:border-emerald-700/50 bg-white/70 dark:bg-[#0F2A1C] hover:bg-emerald-100 dark:hover:bg-[#163D29] text-emerald-900 dark:text-emerald-100 transition-colors"
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
        </section>

        {/* Section 2: Selected Works / Lake Cabin Logs */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/15 dark:border-emerald-800/30 pb-3">
            <h2
              className="text-2xl font-medium tracking-tight text-emerald-950 dark:text-emerald-100"
              style={{ fontFamily: '"Fraunces", serif' }}
            >
              Forest Logs & Shipped Products
            </h2>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              0-to-1 Architecture
            </span>
          </div>

          <div className="space-y-6">
            {projects.map((proj) => {
              const isOpen = expandedProject === proj.id
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 bg-white/80 dark:bg-[#0C2016]/90 backdrop-blur-xs overflow-hidden shadow-xs"
                >
                  {/* Collapsible Trigger */}
                  <button
                    type="button"
                    onClick={() => setExpandedProject(isOpen ? null : proj.id)}
                    className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-[#122E21] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h3
                          className="text-xl font-medium tracking-tight text-emerald-950 dark:text-emerald-100"
                          style={{ fontFamily: '"Fraunces", serif' }}
                        >
                          {proj.title}
                        </h3>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                          [{proj.period}]
                        </span>
                        <span className="text-xs font-mono text-emerald-600/70 dark:text-emerald-400/60">
                          {proj.roleLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-800/80 dark:text-emerald-300/80 pl-5">
                        {proj.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 pl-5 sm:pl-0">
                      {proj.metrics && (
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          {proj.metrics}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-emerald-700 dark:text-emerald-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Content Drawer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-emerald-900/10 dark:border-emerald-800/30 p-6 space-y-6"
                      >
                        {/* Real Screenshots Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {proj.images.map((img, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="overflow-hidden rounded-xl border border-emerald-900/20 dark:border-emerald-800/50 bg-emerald-950 aspect-video flex items-center justify-center shadow-xs">
                                <img
                                  src={img.src}
                                  alt={img.caption}
                                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                                />
                              </div>
                              <p className="text-[11px] font-mono text-emerald-700/70 dark:text-emerald-400/60 italic">
                                {img.caption}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Problem & Solution Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#07160F] border border-emerald-900/10 dark:border-emerald-800/40 space-y-1">
                            <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                              The Forest Challenge:
                            </span>
                            <p className="text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                              {proj.caseStudy.problem}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#07160F] border border-emerald-900/10 dark:border-emerald-800/40 space-y-1">
                            <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                              The Architecture Solution:
                            </span>
                            <p className="text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
                              {proj.caseStudy.solution}
                            </p>
                          </div>
                        </div>

                        {/* Impact points */}
                        <div className="space-y-2 pt-2 border-t border-emerald-900/10 dark:border-emerald-800/30 text-xs">
                          <span className="font-mono font-bold uppercase text-emerald-800 dark:text-emerald-400">
                            Measurable Product Impact:
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-emerald-900/80 dark:text-emerald-200/80">
                            {proj.caseStudy.myImpact.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-xs">
                          <span className="text-emerald-700/60 dark:text-emerald-400/60 mr-2">Materials:</span>
                          {proj.stack.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-0.5 rounded-full border border-emerald-900/20 dark:border-emerald-700/50 bg-white/60 dark:bg-[#0E281C] text-emerald-900 dark:text-emerald-200"
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

        {/* Section 3: Experience & Cabin Lore */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-900/15 dark:border-emerald-800/30 pb-3">
            <h2
              className="text-2xl font-medium tracking-tight text-emerald-950 dark:text-emerald-100"
              style={{ fontFamily: '"Fraunces", serif' }}
            >
              Expeditions & Career Journey
            </h2>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Timeline</span>
          </div>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-emerald-900/15 dark:border-emerald-800/40 bg-white/70 dark:bg-[#0A1B12]/80 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-lg font-medium text-emerald-950 dark:text-emerald-100"
                      style={{ fontFamily: '"Fraunces", serif' }}
                    >
                      {exp.role}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 text-sm">@ {exp.company}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-600/70 dark:text-emerald-400/60">{exp.period}</span>
                </div>
                <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300">
                  🌱 {exp.highlight}
                </p>
                {exp.details && (
                  <ul className="space-y-1 text-xs text-emerald-900/70 dark:text-emerald-200/70 pt-1">
                    {exp.details.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Cabin Quotes & Fun Facts */}
        <section className="p-8 rounded-3xl border border-emerald-900/15 dark:border-emerald-800/40 bg-emerald-100/50 dark:bg-[#0B1E14] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>Cabin Wisdom</span>
          </div>
          <p
            className="text-xl sm:text-2xl font-normal italic text-emerald-950 dark:text-emerald-100"
            style={{ fontFamily: '"Fraunces", serif' }}
          >
            &ldquo;{quotes[0].text}&rdquo;
          </p>
          <span className="block text-xs font-mono text-emerald-700/70 dark:text-emerald-400/70">
            — {quotes[0].author}
          </span>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-emerald-900/15 text-xs font-mono text-emerald-700/60 dark:text-emerald-400/60 flex items-center justify-between">
        <span>© {new Date().getFullYear()} {profile.name} · Forest Sanctuary</span>
        <span>Built with Fraunces & Organic Physics</span>
      </footer>
    </div>
  )
}
