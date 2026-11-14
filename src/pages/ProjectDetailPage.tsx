import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Play, Video, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData'
import { AuthenticBimanshuLamp } from '@/design-system/components/CreativeToggles/AuthenticBimanshuLamp'
import { ViewSwitcherPill } from '@/components/ViewSwitcherPill'
import {
  FullscreenLightboxModal,
  type FullscreenImageState,
} from '@/components/FullscreenLightboxModal'

function getEmbedUrl(url?: string): string | null {
  if (!url) return null
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  )
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  }
  const loomMatch = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/)
  if (loomMatch && loomMatch[1]) {
    return `https://www.loom.com/embed/${loomMatch[1]}`
  }
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`
  }
  return null
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [fullscreenImage, setFullscreenImage] =
    useState<FullscreenImageState | null>(null)

  const { projects } = PORTFOLIO_DATA
  const currentIndex = projects.findIndex((p) => p.id === projectId)
  const project: Project | undefined = projects[currentIndex]
  const nextProject: Project | undefined =
    currentIndex !== -1 ? projects[(currentIndex + 1) % projects.length] : undefined

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImageIndex(0)
  }, [projectId])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAF7F0] text-[#1C1A17] dark:bg-[#141416] dark:text-[#E8E4DD]">
        <h1 className="text-3xl font-bold mb-4 font-serif">Project Not Found</h1>
        <p className="opacity-75 mb-6">The project you are looking for does not exist.</p>
        <Link
          to="/archive"
          className="px-5 py-2.5 rounded-full bg-[#1C1A17] text-white dark:bg-white dark:text-[#1C1A17] font-sans font-bold text-sm"
        >
          ← Return to Portfolio
        </Link>
      </div>
    )
  }

  const hasImages = Boolean(project.images && project.images.length > 0)
  const embedVideoUrl = getEmbedUrl(project.videoUrl)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-amber-200 selection:text-neutral-900 ${
        isDark ? 'dark bg-[#141416] text-[#E8E4DD]' : 'bg-[#FAF7F0] text-[#1C1A17]'
      }`}
      style={{
        fontFamily:
          '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
      }}
    >
      {/* AUTHENTIC JOTTER NOTEBOOK LINES */}
      <div
        className="fixed inset-0 pointer-events-none opacity-45 dark:opacity-10 z-0"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)'
            : 'linear-gradient(to bottom, #E6E0D4 1px, transparent 1px)',
          backgroundSize: '100% 28px',
        }}
      />

      {/* TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E5DFD4] dark:border-[#27272D] bg-[#FAF7F0]/90 dark:bg-[#141416]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* Back link */}
          <Link
            to="/archive#work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold tracking-wide uppercase hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Work</span>
          </Link>

          {/* View Switcher Pill */}
          <ViewSwitcherPill />

          {/* Authentic Hanging Bimanshu Lamp */}
          <div className="flex items-center">
            <AuthenticBimanshuLamp isDark={isDark} onToggle={setIsDark} />
          </div>
        </div>
      </header>

      {/* MAIN PROJECT STORY CONTENT */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-12 sm:py-16 space-y-12 relative z-10">
        {/* Kicker, Title & Dek */}
        <div className="space-y-4 border-b border-[#E5DFD4] dark:border-[#27272D] pb-8">
          <div className="text-xs font-sans font-semibold tracking-widest uppercase text-amber-800 dark:text-amber-400">
            {project.roleLabel} · {project.period} · Case Study
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl opacity-85 leading-relaxed font-sans max-w-2xl">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>

        {/* METADATA CONTEXT GRID (Bimanshu Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl border border-[#D5CEC5] dark:border-[#333338] bg-black/2 dark:bg-white/5 font-sans">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
              Role
            </span>
            <span className="text-sm font-semibold">{project.roleLabel}</span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
              Timeline
            </span>
            <span className="text-sm font-semibold">{project.period}</span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
              Key Impact
            </span>
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
              {project.metrics}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">
              Deliverables
            </span>
            <span className="text-sm font-semibold">Architecture & UI</span>
          </div>
        </div>

        {/* VIDEO WALKTHROUGH EMBED (If videoUrl present) */}
        {project.videoUrl && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider font-sans">
                <Video className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Product Demo Walkthrough</span>
              </div>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-sans text-xs font-semibold underline underline-offset-4 opacity-75 hover:opacity-100"
              >
                <span>Open in new tab</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {embedVideoUrl ? (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#D5CEC5] dark:border-[#38383E] shadow-xl bg-black">
                <iframe
                  src={embedVideoUrl}
                  title={`${project.title} Video Walkthrough`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1A1A1E] hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base">Watch Full Walkthrough Video</h3>
                    <p className="font-sans text-xs opacity-65">External video demonstration</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            )}
          </section>
        )}

        {/* SCREENSHOT GALLERY CAROUSEL (If images exist) */}
        {hasImages && project.images && (
          <section className="space-y-4">
            <div className="p-4 sm:p-6 rounded-2xl border border-[#D5CEC5] dark:border-white/10 bg-[#F9F6F0] dark:bg-[#1A1A1E] shadow-sm space-y-4">
              <div
                onClick={() =>
                  setFullscreenImage({
                    src: project.images![activeImageIndex]?.src || project.image,
                    caption: project.images![activeImageIndex]?.caption || project.tagline,
                    title: project.title,
                    allImages: project.images,
                    currentIndex: activeImageIndex,
                  })
                }
                className="group/gallery relative aspect-video sm:aspect-[16/10] overflow-hidden rounded-xl border border-[#E5DFD4] dark:border-neutral-800 bg-white dark:bg-[#121214] flex items-center justify-center cursor-zoom-in shadow-inner"
              >
                <img
                  src={project.images[activeImageIndex]?.src || project.image}
                  alt={project.images[activeImageIndex]?.caption || project.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover/gallery:scale-103"
                />

                {/* Counter */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-sans font-bold z-10">
                  {activeImageIndex + 1} / {project.images.length}
                </div>

                {/* Zoom badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-sans flex items-center gap-1.5 z-10">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to zoom</span>
                </div>

                {/* Navigation arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImageIndex((prev) =>
                          prev === 0 ? project.images!.length - 1 : prev - 1
                        )
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center cursor-pointer z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImageIndex((prev) =>
                          prev === project.images!.length - 1 ? 0 : prev + 1
                        )
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center cursor-pointer z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="text-center text-xs sm:text-sm italic opacity-85 font-serif">
                {project.images[activeImageIndex]?.caption}
              </div>

              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pt-2 pb-1 scrollbar-none justify-start sm:justify-center">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        idx === activeImageIndex
                          ? 'ring-2 ring-amber-600 dark:ring-amber-400 border-amber-600 scale-105'
                          : 'opacity-60 hover:opacity-100 border-[#D5CEC5] dark:border-white/10'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={`Screen ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* NARRATIVE SECTION: THE CHALLENGE & PROBLEM */}
        <section className="space-y-3 border-t border-[#E5DFD4] dark:border-[#27272D] pt-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight">
            The Challenge & Problem
          </h2>
          <p className="text-base sm:text-lg opacity-85 leading-relaxed font-sans">
            {project.caseStudy.problem}
          </p>
        </section>

        {/* NARRATIVE SECTION: THE SOLUTION & APPROACH */}
        <section className="space-y-3 border-t border-[#E5DFD4] dark:border-[#27272D] pt-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight">
            The Solution & Approach
          </h2>
          <p className="text-base sm:text-lg opacity-85 leading-relaxed font-sans">
            {project.caseStudy.solution}
          </p>
        </section>

        {/* NARRATIVE SECTION: KEY CONTRIBUTIONS & IMPACT */}
        <section className="space-y-4 border-t border-[#E5DFD4] dark:border-[#27272D] pt-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight">
            Key Contributions & Impact
          </h2>
          <ul className="space-y-2.5 text-base opacity-85 font-sans">
            {project.caseStudy.myImpact.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-amber-700 dark:text-amber-400 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TECHNOLOGIES USED */}
        {project.stack && project.stack.length > 0 && (
          <section className="space-y-3 border-t border-[#E5DFD4] dark:border-[#27272D] pt-8">
            <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight">
              Technologies & Tools Used
            </h2>
            <div className="flex flex-wrap gap-2 pt-1 font-sans">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1E1E22] text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* NEXT PROJECT FOOTER CARD */}
        {nextProject && (
          <aside className="border-t-2 border-[#E5DFD4] dark:border-[#27272D] pt-12 pb-6">
            <div className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Next Project
            </div>
            <Link
              to={`/archive/work/${nextProject.id}`}
              className="group block p-6 sm:p-8 rounded-2xl border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1A1A1E] hover:border-black dark:hover:border-white transition-all shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-sans uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold block mb-1">
                    {nextProject.roleLabel} · {nextProject.period}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif group-hover:underline">
                    {nextProject.title}
                  </h3>
                  <p className="text-sm font-sans opacity-75 mt-1 line-clamp-1">
                    {nextProject.tagline}
                  </p>
                </div>
                <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </aside>
        )}
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <FullscreenLightboxModal
        fullscreenImage={fullscreenImage}
        onClose={() => setFullscreenImage(null)}
        onSetFullscreenImage={setFullscreenImage}
      />
    </div>
  )
}
