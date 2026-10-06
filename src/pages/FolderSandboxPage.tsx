import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PORTFOLIO_DATA, type Project } from "@/data/portfolioData"
import { ProjectCaseStudyDrawer } from "@/components/ProjectCaseStudyDrawer"
import { FullscreenLightboxModal, type FullscreenImageState } from "@/components/FullscreenLightboxModal"
import { ArrowUpRight, Mail, FileText, ChevronRight, Sparkles, ExternalLink, RefreshCw, ZoomIn, ArrowLeft } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"
import { Link } from "react-router-dom"

export function FolderSandboxPage() {
  const { profile, projects } = PORTFOLIO_DATA
  const [activeDrawerProject, setActiveDrawerProject] = useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [fullscreenImage, setFullscreenImage] = useState<FullscreenImageState | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [activeTabFilter, setActiveTabFilter] = useState<"all" | "pm" | "engineer">("all")

  // Live Lagos / WAT Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
      setCurrentTime(`${timeString} WAT`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard navigation for drawer & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (fullscreenImage) setFullscreenImage(null)
        else if (activeDrawerProject) setActiveDrawerProject(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeDrawerProject, fullscreenImage])

  const openDrawer = (proj: Project) => {
    setActiveDrawerProject(proj)
    setActiveImageIndex(0)
  }

  const closeDrawer = () => {
    setActiveDrawerProject(null)
  }

  // Folder visual color themes matching iamthecode style
  const FOLDER_THEMES = [
    {
      bg: "bg-[#49B3E8]",
      text: "text-[#0F172A]",
      tabBg: "bg-[#49B3E8]",
      tabText: "text-[#0F172A]",
      badgeBg: "bg-black/15",
      badgeText: "text-slate-900",
      btnBg: "bg-[#0F172A]",
      btnText: "text-white",
      tagBorder: "border-black/30",
      artboardBg: "bg-white",
      category: "AI INFRA & APIS",
      tabOffset: "sm:left-6 lg:left-10",
      accent: "#38BDF8"
    },
    {
      bg: "bg-[#18181B]",
      text: "text-[#F8FAFC]",
      tabBg: "bg-[#18181B]",
      tabText: "text-white",
      badgeBg: "bg-white/10",
      badgeText: "text-emerald-300",
      btnBg: "bg-white",
      btnText: "text-black",
      tagBorder: "border-white/20",
      artboardBg: "bg-[#27272A]",
      category: "ENTERPRISE & OPERATIONS",
      tabOffset: "sm:left-40 lg:left-64",
      accent: "#10B981"
    },
    {
      bg: "bg-[#DB9E2B]",
      text: "text-[#1C1917]",
      tabBg: "bg-[#DB9E2B]",
      tabText: "text-[#1C1917]",
      badgeBg: "bg-black/15",
      badgeText: "text-amber-950",
      btnBg: "bg-[#1C1917]",
      btnText: "text-white",
      tagBorder: "border-black/30",
      artboardBg: "bg-white",
      category: "FITNESS & MOBILE APP",
      tabOffset: "sm:left-72 lg:left-[450px]",
      accent: "#F59E0B"
    },
    {
      bg: "bg-[#7AC8A1]",
      text: "text-[#064E3B]",
      tabBg: "bg-[#7AC8A1]",
      tabText: "text-[#064E3B]",
      badgeBg: "bg-black/15",
      badgeText: "text-emerald-950",
      btnBg: "bg-[#064E3B]",
      btnText: "text-white",
      tagBorder: "border-black/30",
      artboardBg: "bg-white",
      category: "AI/ML RISK PREDICTION",
      tabOffset: "sm:left-[380px] lg:left-[660px]",
      accent: "#10B981"
    },
    {
      bg: "bg-[#E056FD]",
      text: "text-white",
      tabBg: "bg-[#E056FD]",
      tabText: "text-white",
      badgeBg: "bg-black/20",
      badgeText: "text-white",
      btnBg: "bg-white",
      btnText: "text-black",
      tagBorder: "border-white/30",
      artboardBg: "bg-[#27272A]",
      category: "AI ORCHESTRATION & RAG",
      tabOffset: "sm:left-[460px] lg:left-[840px]",
      accent: "#F472B6"
    }
  ]

  const filteredProjects = projects.filter((p) => {
    if (activeTabFilter === "all") return true
    if (activeTabFilter === "pm") return p.roleLabel.toLowerCase().includes("product")
    if (activeTabFilter === "engineer") return p.roleLabel.toLowerCase().includes("engineer")
    return true
  })

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#18181B] font-sans relative overflow-x-hidden selection:bg-sky-300 selection:text-black">
      {/* -------------------------------------------------------------
          TOP RULER & PIXEL GRID HEADER (iamthecode style)
         ------------------------------------------------------------- */}
      <div className="w-full border-b border-black/15 bg-[#EFECE4] py-1.5 px-4 font-mono text-[11px] flex items-center justify-between text-neutral-600 select-none overflow-x-auto">
        <div className="flex items-center gap-6 shrink-0 opacity-70">
          <span>+ 000</span>
          <span className="hidden md:inline">+ 200</span>
          <span className="hidden md:inline">+ 400</span>
          <span className="hidden lg:inline">+ 600</span>
          <span className="hidden lg:inline">+ 800</span>
          <span className="hidden xl:inline">+ 1000</span>
          <span className="hidden xl:inline">+ 1200</span>
        </div>

        {/* Live Lagos Clock */}
        <div className="flex items-center gap-2 font-bold text-neutral-800 bg-white/70 px-3 py-0.5 rounded-full border border-black/10 shadow-xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{currentTime || "12:00:00 WAT"}</span>
        </div>

        {/* Return to Classic Jotter Link */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black text-white hover:bg-neutral-800 text-[11px] font-bold transition-all shadow-xs"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Classic Lined Jotter</span>
          </Link>
        </div>
      </div>

      {/* Grid line background overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 space-y-24">
        {/* =============================================================
            1. HERO SECTION (With Figma selection box, stickers & tapes)
           ============================================================= */}
        <section className="relative flex flex-col items-center text-center space-y-8 pt-6 sm:pt-10">
          {/* Handwritten "my name is" with wavy underline */}
          <div className="flex flex-col items-center">
            <span
              className="text-2xl sm:text-3xl text-neutral-800"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              my name is
            </span>
            <svg
              className="w-28 sm:w-36 h-3 text-neutral-800 mt-[-4px]"
              viewBox="0 0 120 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M2 6 Q 15 1, 30 6 T 60 6 T 90 6 T 118 6" />
              <path d="M4 10 Q 18 5, 32 10 T 62 10 T 92 10 T 116 10" opacity="0.6" />
            </svg>
          </div>

          {/* Center Stage Name with Figma Selection Bounding Box & Stickers */}
          <div className="relative inline-block max-w-full">
            {/* Top-Left Green Tape Sticker */}
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 10 }}
              animate={{ opacity: 1, rotate: -3.5, y: 0 }}
              className="absolute -top-7 -left-3 sm:-top-8 sm:-left-6 z-20 bg-[#7AC8A1] text-emerald-950 font-mono text-[11px] sm:text-xs font-bold px-3 py-1 shadow-md border border-emerald-900/20 backdrop-blur-xs select-none"
              style={{
                boxShadow: "2px 3px 0px rgba(0,0,0,0.15)"
              }}
            >
              Currently at Tegence
            </motion.div>

            {/* Top-Right Tan Tape Sticker */}
            <motion.div
              initial={{ opacity: 0, rotate: 8, y: 10 }}
              animate={{ opacity: 1, rotate: 3.5, y: 0 }}
              className="absolute -top-7 -right-3 sm:-top-8 sm:-right-6 z-20 bg-[#E6D5A8] text-amber-950 font-mono text-[11px] sm:text-xs font-bold px-3 py-1 shadow-md border border-amber-900/20 backdrop-blur-xs select-none"
              style={{
                boxShadow: "2px 3px 0px rgba(0,0,0,0.15)"
              }}
            >
              Previously at Sabi & NSIA
            </motion.div>

            {/* Left Floating Folded Badge: PRODUCT MANAGER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="hidden md:flex absolute -left-32 top-1/2 -translate-y-1/2 -rotate-12 items-center gap-1.5 bg-[#FACC15] text-black font-mono text-[11px] font-black uppercase px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full select-none"
            >
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span>PRODUCT MANAGER</span>
            </motion.div>

            {/* Right Floating Ribbon Badge: LAGOS · WAT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="hidden md:flex absolute -right-32 top-1/2 -translate-y-1/2 rotate-8 items-center gap-1.5 bg-[#F43F5E] text-white font-mono text-[11px] font-black uppercase px-3.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full select-none"
            >
              <span>NIGERIA · WAT 📍</span>
            </motion.div>

            {/* Figma Selection Bounding Box around Name */}
            <div className="relative border-2 border-sky-400 bg-sky-50/30 px-6 sm:px-12 py-3 sm:py-5 shadow-xs">
              {/* 8 Bounding Box Handle Anchors (White squares) */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-sky-500 z-10" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-sky-500 z-10" />

              {/* Bold Display Name */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 uppercase font-mono">
                EYIMOFE PINNICK
              </h1>
            </div>
          </div>

          {/* Status Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/15 shadow-xs font-mono text-xs font-bold tracking-wider text-neutral-700 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <span>AVAILABLE FOR NEW PRODUCT ROLES</span>
          </div>

          {/* Descriptive Tagline with inline emoji badges */}
          <p className="max-w-2xl text-lg sm:text-2xl font-medium leading-snug text-neutral-800">
            I build <span className="inline-block text-emerald-600 font-bold">🎯</span> the systems behind AI workflows, enterprise operating systems, and high-impact digital products <span className="inline-block text-rose-500 font-bold">🌸</span>.
          </p>

          {/* Contact and Social CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="mailto:eyimofepinnick@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#18181B] text-white font-mono text-xs sm:text-sm font-bold border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer group"
            >
              <span className="w-6 h-6 rounded bg-[#F43F5E] flex items-center justify-center text-white text-xs font-black">
                &gt;
              </span>
              <span>GET IN TOUCH</span>
            </a>

            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-neutral-900 font-mono text-xs sm:text-sm font-bold border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="https://linkedin.com/in/eyimofe-p"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-neutral-900 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/eyim0fe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-neutral-900 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* =============================================================
            2. FEATURED WORKS (Stacked File Folder Tabs Layout)
           ============================================================= */}
        <section id="works-section" className="space-y-12">
          {/* Section Header with Handwritten Script & Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xl sm:text-2xl text-neutral-700"
                  style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
                >
                  explore my work!
                </span>
                <span className="text-xs px-2 py-0.5 bg-amber-200 border border-black font-mono font-bold rounded-sm">
                  {filteredProjects.length} PROJECTS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-neutral-900 uppercase mt-1">
                FEATURED WORKS
              </h2>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTabFilter("all")}
                className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${
                  activeTabFilter === "all" ? "bg-black text-white" : "hover:bg-neutral-100"
                }`}
              >
                ALL
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter("pm")}
                className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${
                  activeTabFilter === "pm" ? "bg-black text-white" : "hover:bg-neutral-100"
                }`}
              >
                PRODUCT MANAGER
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter("engineer")}
                className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${
                  activeTabFilter === "engineer" ? "bg-black text-white" : "hover:bg-neutral-100"
                }`}
              >
                ENGINEER
              </button>
            </div>
          </div>

          {/* STACKED FOLDERS CONTAINER */}
          <div className="space-y-16 pt-4">
            {filteredProjects.map((project, idx) => {
              const theme = FOLDER_THEMES[idx % FOLDER_THEMES.length]
              const projectNum = `0${idx + 1}`

              return (
                <div key={project.id} className="relative group/folder pt-9">
                  {/* FOLDER TOP TAB (Cut-angle polygon tab extending above card) */}
                  <div
                    className={`absolute top-0 ${theme.tabOffset} z-10 flex items-center gap-2 px-5 sm:px-7 py-2 ${theme.tabBg} ${theme.tabText} border-t-2 border-l-2 border-r-2 border-black font-mono font-black text-xs sm:text-sm tracking-wider uppercase select-none`}
                    style={{
                      clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0% 100%)",
                      borderRadius: "6px 0 0 0"
                    }}
                  >
                    <span className="inline-block w-2.5 h-2.5 bg-black/40 rounded-xs" />
                    <span>PROJECT {projectNum}</span>
                  </div>

                  {/* FOLDER MAIN CARD CONTAINER */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`relative w-full ${theme.bg} ${theme.text} border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-b-xl rounded-tr-xl overflow-hidden p-6 sm:p-8 lg:p-10`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Column: Specs, Title, Description, Stack & CTA */}
                      <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          {/* Category Badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-xs border border-black/15 bg-black/10">
                            <span className="w-2 h-2 rounded-full bg-current opacity-80" />
                            <span>{project.roleLabel.toUpperCase()} · {theme.category}</span>
                          </div>

                          {/* Large Title */}
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight leading-tight">
                            {project.title}
                          </h3>

                          {/* Tagline / Plain Language Description */}
                          <p className="text-sm sm:text-base opacity-90 leading-relaxed font-sans font-normal">
                            {project.tagline}
                          </p>

                          {/* Stack Tags styled like mini index tags */}
                          {project.stack && project.stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className={`text-xs font-mono px-2.5 py-1 rounded-sm border ${theme.tagBorder} bg-black/10 font-medium`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Interactive Trigger CTA */}
                        <div className="pt-4 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => openDrawer(project)}
                            className={`inline-flex items-center gap-2 px-5 py-3 ${theme.btnBg} ${theme.btnText} font-mono text-xs sm:text-sm font-black uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer`}
                          >
                            <span>VIEW PROJECT CASE STUDY</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Artboard Frame with 8 Corner Handles & [JPG] IMAGE badge */}
                      <div className="lg:col-span-6">
                        {project.image ? (
                          <div
                            onClick={() =>
                              setFullscreenImage({
                                src: project.image,
                                caption: project.tagline,
                                title: project.title,
                                allImages: project.images && project.images.length > 0 ? project.images : [{ src: project.image, caption: project.tagline }],
                                currentIndex: 0
                              })
                            }
                            className={`relative aspect-video sm:aspect-[16/10] ${theme.artboardBg} border-2 border-black rounded-lg p-2 sm:p-3 shadow-md group/artboard cursor-zoom-in overflow-hidden`}
                          >
                            {/* 8 Artboard Figma Corner Handles (White Squares) */}
                            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute top-1/2 left-1 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute top-1/2 right-1 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black z-20" />
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-white border border-black z-20" />

                            {/* [PNG] IMAGE Badge */}
                            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black text-white font-mono text-[10px] font-bold tracking-wider rounded-xs border border-white/20 shadow-md">
                              <span className="text-amber-400 font-black">PNG</span>
                              <span>MOCKUP.PNG</span>
                            </div>

                            {/* Image with zoom transition */}
                            <div className="w-full h-full rounded-md overflow-hidden bg-neutral-100 flex items-center justify-center">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover/artboard:scale-105"
                              />
                            </div>

                            {/* Click to Zoom Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/artboard:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-10">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold border border-white/20 shadow-lg">
                                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                                <span>CLICK TO FULLSCREEN ZOOM</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className={`aspect-video sm:aspect-[16/10] ${theme.artboardBg} border-2 border-black rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3`}>
                            <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                              <Sparkles className="w-6 h-6 opacity-60" />
                            </div>
                            <span className="font-mono text-xs uppercase font-bold tracking-wider opacity-70">
                              Production Architecture Case Study
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </section>

        {/* =============================================================
            3. FOOTER SECTION ("LET'S TALK" iamthecode style)
           ============================================================= */}
        <footer className="border-t-2 border-black pt-16 space-y-8">
          <div className="bg-[#18181B] text-white p-8 sm:p-12 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Header */}
            <div className="space-y-4 max-w-2xl">
              <span
                className="text-2xl sm:text-3xl text-amber-300"
                style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
              >
                ready to collaborate?
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight">
                LET&apos;S TALK.
              </h2>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed font-sans">
                Open to product management roles, AI advisory, and technical product leadership. Email is the fastest way to get in touch.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs sm:text-sm font-bold">
                <a
                  href="mailto:eyimofepinnick@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-100 transition-colors border-2 border-black shadow-[3px_3px_0px_rgba(255,255,255,0.4)]"
                >
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>eyimofepinnick@gmail.com</span>
                </a>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Classic Lined Jotter</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Slide-over Case Study Drawer Panel */}
      <ProjectCaseStudyDrawer
        activeDrawerProject={activeDrawerProject}
        activeImageIndex={activeImageIndex}
        onCloseDrawer={closeDrawer}
        onSetActiveImageIndex={setActiveImageIndex}
        onOpenFullscreenImage={setFullscreenImage}
      />

      {/* Fullscreen Image Lightbox Modal with iPhone Pan & Zoom */}
      <FullscreenLightboxModal
        fullscreenImage={fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        onSetFullscreenImage={setFullscreenImage}
      />
    </div>
  )
}
