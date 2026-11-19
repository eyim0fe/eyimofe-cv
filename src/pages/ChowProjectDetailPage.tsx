import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Video,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  CheckCircle2,
  Rocket,
  Layers,
  Sparkles,
} from 'lucide-react'
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData'
import { AuthenticBimanshuLamp } from '@/design-system/components/CreativeToggles/AuthenticBimanshuLamp'
import {
  FullscreenLightboxModal,
  type FullscreenImageState,
} from '@/components/FullscreenLightboxModal'
import { TraceDeepDiveCaseStudy } from '@/components/TraceDeepDiveCaseStudy'

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

export function ChowProjectDetailPage() {
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
    currentIndex !== -1
      ? projects[(currentIndex + 1) % projects.length]
      : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImageIndex(0)
  }, [projectId])

  // Sync dark class to documentElement for Tailwind 4 @custom-variant dark
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFFFFF] text-[#0E2233]">
        <h1 className="text-4xl font-extrabold mb-4">
          Product Case Study Not Found
        </h1>
        <p className="opacity-75 mb-6 font-medium">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full border-2.5 border-[#0E2233] bg-[#1B4332] text-white font-extrabold text-sm shadow-[4px_4px_0_#0E2233]"
        >
          ← Return to Products
        </Link>
      </div>
    )
  }

  const hasImages = Boolean(project.images && project.images.length > 0)
  const embedVideoUrl = getEmbedUrl(project.videoUrl)

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
        .chow-card {
          border: 2.5px solid ${isDark ? '#2D6A4F' : '#0E2233'};
          box-shadow: 6px 6px 0 ${isDark ? '#143829' : '#0E2233'};
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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

      {/* AUTHENTIC BIMANSHU HANGING LAMP (Exact same physics lamp fixture as Jotter) */}
      <aside
        aria-label="Theme Controller"
        className="fixed top-0 right-3 sm:right-24 md:right-32 z-40"
      >
        <AuthenticBimanshuLamp isDark={isDark} onToggle={setIsDark} />
      </aside>

      {/* BUNMI FLOATING PILL DOCK NAVBAR */}
      <nav
        className={`fixed top-3.5 left-3 sm:left-1/2 sm:-translate-x-1/2 z-50 w-[calc(100%-4.25rem)] sm:w-[min(calc(100%-2rem),1040px)] h-14 px-3.5 sm:px-6 rounded-full border-2 ${
          isDark
            ? 'border-[#2D6A4F] bg-[#091522]/95 text-white shadow-[4px_4px_0_#143829]'
            : 'border-[#0E2233] bg-[#FFFFFF]/95 text-[#0E2233] shadow-[4px_4px_0_#0E2233]'
        } backdrop-blur-md flex items-center justify-between gap-2 sm:gap-4 transition-all`}
        aria-label="Bunmi Floating Pill Dock"
      >
        <Link
          to="/#work"
          className="flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider hover:opacity-80 text-[#0E2233] dark:text-white shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">All Products</span>
          <span className="sm:hidden">Back</span>
        </Link>

        <span className="font-extrabold text-xs sm:text-sm tracking-tight truncate max-w-[120px] sm:max-w-xs text-[#0E2233] dark:text-white">
          {project.title}
        </span>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="mailto:eyimofepinnick@gmail.com"
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829] hover:opacity-90"
          >
            <span>Say Hi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* MAIN CASE STUDY CONTAINER */}
      <main className="max-w-5xl mx-auto px-6 sm:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16 space-y-12">
        {/* =========================================================================
            1. HERO TITLE & METRICS
           ========================================================================= */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.id === 'trace' ? (
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#1B4332] dark:text-[#52B788]">
                PRODUCT MANAGEMENT · SABI · APRIL 2024 – JULY 2025
              </span>
            ) : (
              <>
                <span className="px-3.5 py-1 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-extrabold text-xs uppercase tracking-wider shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]">
                  {project.roleLabel}
                </span>
                <span className="px-3 py-1 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-[#E8F5E9] text-[#1B4332] dark:bg-[#0A3D42] dark:text-[#D8F3DC] font-extrabold text-xs tracking-wider shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829] flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Shipped to Production</span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.98] text-[#0E2233] dark:text-white">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-neutral-800 dark:text-[#CBD5E1] max-w-3xl">
            {project.tagline}
          </p>

          {project.id === 'trace' && (
            <p className="text-base sm:text-lg font-medium text-neutral-600 dark:text-[#CBD5E1] max-w-3xl">
              Trace was a mineral trading platform designed to connect suppliers, laboratories, logistics operators, and buyers in one place.
            </p>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {embedVideoUrl && (
              <a
                href="#demo-video"
                className="chow-btn px-6 py-3 rounded-full bg-[#2D6A4F] text-white dark:bg-[#1B4332] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#1B4332] dark:hover:bg-[#2D6A4F]"
              >
                <Video className="w-4 h-4" />
                <span>Watch Product Walkthrough</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="chow-btn px-6 py-3 rounded-full bg-[#1B4332] text-[#D8F3DC] dark:bg-[#2D6A4F] dark:text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#2D6A4F]"
              >
                <span>Open Live Application</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* =========================================================================
            2. EDITORIAL CONTEXT NARRATIVE OR DEDICATED PM DEEP DIVE
           ========================================================================= */}
        {project.id === 'trace' ? (
          <TraceDeepDiveCaseStudy />
        ) : (
          <section className="space-y-10 pt-4">
            {/* 1. The Operational Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B4332] dark:border-[#52B788] bg-transparent inline-block shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  The Operational Problem
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-neutral-800 dark:text-[#CBD5E1] pl-6 border-l-2 border-[#0E2233]/15 dark:border-white/15">
                {project.caseStudy.problem}
              </p>
            </div>

            {/* 2. The Product Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B4332] dark:border-[#52B788] bg-transparent inline-block shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  The Product Solution
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-neutral-800 dark:text-[#CBD5E1] pl-6 border-l-2 border-[#0E2233]/15 dark:border-white/15">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* 3. Role, Ownership & Delivery */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B4332] dark:border-[#52B788] bg-transparent inline-block shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  Role, Ownership & Delivery
                </h2>
              </div>
              <p className="text-base sm:text-lg leading-relaxed font-medium text-neutral-800 dark:text-[#CBD5E1] pl-6 border-l-2 border-[#0E2233]/15 dark:border-white/15">
                <strong className="text-[#0E2233] dark:text-white">
                  {project.roleLabel}
                </strong>{' '}
                — {project.roleDescription}
              </p>
            </div>

            {/* 4. Core Architecture & Tech Stack */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B4332] dark:border-[#52B788] bg-transparent inline-block shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  Core Architecture & Tech Stack
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 pl-6">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] text-[#0E2233] dark:text-[#EAF1F8] font-extrabold text-xs shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. The 0-to-1 PM Execution */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1B4332] dark:border-[#52B788] bg-transparent inline-block shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  The 0-to-1 PM Execution
                </h2>
              </div>
              <div className="text-base sm:text-lg leading-relaxed font-medium text-neutral-800 dark:text-[#CBD5E1] pl-6 border-l-2 border-[#0E2233]/15 dark:border-white/15 space-y-3">
                <p>
                  When tackling{' '}
                  <strong className="text-[#0E2233] dark:text-white">
                    {project.title}
                  </strong>
                  , the primary hurdle was reconciling fragmented manual processes
                  into a unified system that teammates would naturally adopt
                  without extensive retraining.
                </p>
                <p>
                  By driving discovery interviews, scoping clear acceptance
                  criteria in weekly PRDs, and orchestrating rapid builds with
                  React 19, FastAPI, and automated pipelines, we decoupled
                  operational complexity and provided real-time visibility into
                  mission-critical workflows.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            3. EMBEDDED DEMO VIDEO WALKTHROUGH
           ========================================================================= */}
        {embedVideoUrl && (
          <section id="demo-video" className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2D6A4F] border border-[#0E2233]" />
              <h2 className="text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                Interactive Demo Walkthrough
              </h2>
            </div>

            <div className="rounded-2xl border-3 border-[#0E2233] dark:border-[#2D6A4F] overflow-hidden bg-black shadow-[8px_8px_0_#0E2233] dark:shadow-[8px_8px_0_#143829] aspect-video w-full">
              <iframe
                src={embedVideoUrl}
                title={`${project.title} Demo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </section>
        )}

        {/* =========================================================================
            4. SCREENSHOT CAROUSEL SHOWCASE (Hidden if project has no real screenshots)
           ========================================================================= */}
        {project.id !== 'trace' && hasImages && project.images && (
          <section className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#1B4332] dark:bg-[#52B788] border border-[#0E2233] shrink-0" />
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0E2233] dark:text-white">
                  Product Screens
                </h2>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : project.images!.length - 1
                      )
                    }
                    className="p-2 rounded-xl border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] text-[#0E2233] dark:text-white hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829] cursor-pointer"
                    title="Previous Screen"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-extrabold px-2 text-[#0E2233] dark:text-white whitespace-nowrap">
                    {activeImageIndex + 1} / {project.images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex(
                        (prev) => (prev + 1) % project.images!.length
                      )
                    }
                    className="p-2 rounded-xl border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] text-[#0E2233] dark:text-white hover:bg-[#D8F3DC] dark:hover:bg-[#1B4332] shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829] cursor-pointer"
                    title="Next Screen"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border-3 border-[#0E2233] dark:border-[#2D6A4F] overflow-hidden bg-[#EAF1F8] dark:bg-[#122436] shadow-[8px_8px_0_#0E2233] dark:shadow-[8px_8px_0_#143829] group">
              <img
                src={project.images[activeImageIndex].src}
                alt={
                  project.images[activeImageIndex].caption ||
                  `${project.title} screenshot`
                }
                className="w-full h-auto max-h-[580px] object-contain mx-auto transition-transform duration-300"
              />

              <button
                type="button"
                onClick={() =>
                  setFullscreenImage({
                    src: project.images![activeImageIndex].src,
                    caption: project.images![activeImageIndex].caption,
                  })
                }
                className="absolute top-4 right-4 p-2.5 rounded-xl border-2 border-[#0E2233] dark:border-[#2D6A4F] bg-white dark:bg-[#122436] text-[#0E2233] dark:text-white shadow-[3px_3px_0_#0E2233] dark:shadow-[3px_3px_0_#143829] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 font-bold text-xs cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Enlarge</span>
              </button>

              {project.images[activeImageIndex].caption && (
                <div className="p-4 border-t-2.5 border-[#0E2233] dark:border-[#2D6A4F] bg-[#1B4332] text-[#D8F3DC] font-bold text-xs sm:text-sm">
                  {project.images[activeImageIndex].caption}
                </div>
              )}
            </div>
          </section>
        )}

        {/* =========================================================================
            6. NEXT PROJECT TEASER FOOTER
           ========================================================================= */}
        {nextProject && (
          <footer className="pt-12 border-t-2.5 border-[#0E2233] dark:border-[#2D6A4F]">
            <Link
              to={`/work/${nextProject.id}`}
              className="group block p-6 sm:p-8 rounded-2xl border-3 border-[#0E2233] dark:border-[#2D6A4F] bg-[#1B4332] text-[#D8F3DC] hover:bg-[#2D6A4F] shadow-[6px_6px_0_#0E2233] dark:shadow-[6px_6px_0_#143829] transition-all transform hover:-translate-y-1 hover:shadow-[10px_10px_0_#0E2233]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#D8F3DC] block mb-1">
                    Up Next
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {nextProject.title}
                  </h3>
                  <p className="text-sm font-bold text-[#D8F3DC] mt-1 line-clamp-1">
                    {nextProject.tagline}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full border-2.5 border-[#0E2233] dark:border-[#2D6A4F] bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0_#0E2233] dark:shadow-[2px_2px_0_#143829] group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-6 h-6 text-[#1B4332]" />
                </div>
              </div>
            </Link>
          </footer>
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
