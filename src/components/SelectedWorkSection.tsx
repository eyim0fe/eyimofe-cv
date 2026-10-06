import React from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Project } from '@/data/portfolioData'

interface SelectedWorkSectionProps {
  projects: Project[]
  roleFilter: 'all' | 'pm' | 'engineer'
  onSetRoleFilter: (filter: 'all' | 'pm' | 'engineer') => void
  onOpenDrawer: (project: Project) => void
  onOpenFullscreenImage: (imageInfo: {
    src: string
    caption?: string
    title?: string
    allImages?: { src: string; caption: string }[]
    currentIndex?: number
  }) => void
}

// Folder visual color themes matching physical folder tabs with high contrast
const FOLDER_THEMES = [
  {
    bg: 'bg-[#49B3E8] dark:bg-[#1E3A5F]',
    text: 'text-[#0F172A] dark:text-[#F0F9FF]',
    tabBg: 'bg-[#49B3E8] dark:bg-[#1E3A5F]',
    tabText: 'text-[#0F172A] dark:text-[#F0F9FF]',
    tabSquare: 'bg-[#0F172A] dark:bg-[#F0F9FF]',
    category: 'ENTERPRISE OS · WORKFORCE',
    accent: '#38BDF8',
  },
  {
    bg: 'bg-[#18181B] dark:bg-[#18181C]',
    text: 'text-[#F8FAFC]',
    tabBg: 'bg-[#18181B] dark:bg-[#18181C]',
    tabText: 'text-white',
    tabSquare: 'bg-white',
    category: 'FINTECH · OPERATIONS',
    accent: '#10B981',
  },
  {
    bg: 'bg-[#DB9E2B] dark:bg-[#78350F]',
    text: 'text-[#1C1917] dark:text-[#FEF3C7]',
    tabBg: 'bg-[#DB9E2B] dark:bg-[#78350F]',
    tabText: 'text-[#1C1917] dark:text-[#FEF3C7]',
    tabSquare: 'bg-[#1C1917] dark:bg-[#FEF3C7]',
    category: 'FITNESS · MEAL PLANNER',
    accent: '#F59E0B',
  },
  {
    bg: 'bg-[#7AC8A1] dark:bg-[#064E3B]',
    text: 'text-[#064E3B] dark:text-[#D1FAE5]',
    tabBg: 'bg-[#7AC8A1] dark:bg-[#064E3B]',
    tabText: 'text-[#064E3B] dark:text-[#D1FAE5]',
    tabSquare: 'bg-[#064E3B] dark:bg-[#D1FAE5]',
    category: 'AI/ML · CUSTOMER EXPERIENCE',
    accent: '#10B981',
  },
  {
    bg: 'bg-[#D946EF] dark:bg-[#701A75]',
    text: 'text-white',
    tabBg: 'bg-[#D946EF] dark:bg-[#701A75]',
    tabText: 'text-white',
    tabSquare: 'bg-white',
    category: 'AI ORCHESTRATION & RAG',
    accent: '#F472B6',
  },
]

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  projects,
  roleFilter,
  onSetRoleFilter,
  onOpenDrawer,
  onOpenFullscreenImage,
}) => {
  const filteredProjects = projects.filter((p) => {
    if (roleFilter === 'all') return true
    if (roleFilter === 'pm')
      return p.roleLabel.toLowerCase().includes('product')
    if (roleFilter === 'engineer')
      return p.roleLabel.toLowerCase().includes('engineer')
    return true
  })

  return (
    <section
      id="selected-work"
      className="folder-section w-full relative z-20 space-y-0"
    >
      <style>{`
        .folder-section {
          --tab-base: 6px;
          --tab-step: calc((100% - 12px) / 5);
          --tab-width: calc((100% - 12px) / 5);
        }
        @media (min-width: 640px) {
          .folder-section {
            --tab-base: 16px;
            --tab-step: 148px;
            --tab-width: 154px;
          }
        }
        @media (min-width: 1024px) {
          .folder-section {
            --tab-base: 24px;
            --tab-step: 192px;
            --tab-width: 200px;
          }
        }
      `}</style>

      {/* Section Header with Serif Title & Role Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5DFD4] dark:border-[#27272D] pb-5 mb-0">
        <div>
          <h2
            className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mt-1"
            style={{
              fontFamily:
                '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
            }}
          >
            01. Selected Work
          </h2>
        </div>

        {/* Role Filter Tabs (Authentic portfolio styling, no mono) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/80 dark:bg-[#1A1A1E]/80 text-xs sm:text-sm font-sans">
          <button
            type="button"
            onClick={() => onSetRoleFilter('all')}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
              roleFilter === 'all'
                ? 'bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => onSetRoleFilter('pm')}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
              roleFilter === 'pm'
                ? 'bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Product Manager
          </button>
          <button
            type="button"
            onClick={() => onSetRoleFilter('engineer')}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
              roleFilter === 'engineer'
                ? 'bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Engineer
          </button>
        </div>
      </div>

      {/* FULL-WIDTH STACKED STICKY FOLDERS CASCADE */}
      <div className="relative w-full">
        {filteredProjects.map((project, idx) => {
          const theme = FOLDER_THEMES[idx % FOLDER_THEMES.length]
          const projectNum = `0${idx + 1}`
          const zIndexValue = 10 + idx * 10
          const hasImage = Boolean(project.image && project.image.trim() !== '')

          return (
            <div
              key={project.id}
              className="sticky top-[46px] sm:top-[56px] w-full min-h-screen flex flex-col justify-start m-0 p-0"
              style={{ zIndex: zIndexValue }}
            >
              {/* TOP TAB ROW - Tightly Docked Trapezoid Folder Tab */}
              <div className="relative w-full h-10 pointer-events-auto overflow-visible select-none font-sans">
                <div
                  className={`absolute bottom-0 flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1 sm:px-4 py-2 ${theme.tabBg} ${theme.tabText} border-t-2 border-l-2 border-r-2 border-black dark:border-white/20 font-bold text-[11px] sm:text-xs md:text-sm tracking-wider uppercase select-none shadow-xs`}
                  style={{
                    left: `calc(var(--tab-base) + ${idx} * var(--tab-step))`,
                    width: 'var(--tab-width)',
                    clipPath:
                      'polygon(6px 0, calc(100% - 6px) 0, 100% 100%, 0% 100%)',
                    borderRadius: '4px 4px 0 0',
                  }}
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 ${theme.tabSquare} rounded-2xs opacity-80 shrink-0`}
                  />
                  <span className="truncate">
                    <span className="hidden sm:inline">PROJECT </span>
                    {projectNum}
                  </span>
                </div>
              </div>

              {/* FULL-WIDTH SOLID FOLDER MAIN CARD BODY (min-h-[calc(100dvh-46px)] guarantees zero bottom gaps on mobile) */}
              <div
                className={`w-full flex-1 min-h-[calc(100dvh-46px)] sm:min-h-[calc(100vh-56px)] ${theme.bg} ${theme.text} border-t-2 border-b-2 border-black dark:border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] pt-6 sm:pt-8 pb-12 sm:pb-16 flex flex-col justify-start`}
              >
                <div
                  className={`max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 ${
                    hasImage
                      ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start'
                      : 'flex flex-col items-start'
                  }`}
                >
                  {/* Left Column: Category, Big Serif Title, Tagline, Action CTAs & Stack Badges */}
                  <div
                    className={`${
                      hasImage ? 'lg:col-span-6' : 'max-w-3xl w-full'
                    } space-y-4 flex flex-col justify-start`}
                  >
                    <div className="space-y-3">
                      {/* Category Dot Tag */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase opacity-85 font-sans">
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                        <span>
                          {project.roleLabel.toUpperCase()} · {theme.category}
                        </span>
                      </div>

                      {/* Project Title (Authentic Serif Font) */}
                      <h3
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                        style={{
                          fontFamily:
                            '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
                        }}
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base opacity-90 leading-relaxed font-sans max-w-xl">
                        {project.tagline}
                      </p>

                      {/* Interactive Action CTAs: Case Study & Demo Video Links */}
                      <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase">
                        <button
                          type="button"
                          onClick={() => onOpenDrawer(project)}
                          className="inline-flex items-center gap-1.5 underline underline-offset-8 hover:opacity-75 transition-all cursor-pointer group/link"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </button>

                        {/* Optional Demo Video Link */}
                        {project.videoUrl && (
                          <a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 underline underline-offset-8 hover:opacity-75 transition-all cursor-pointer group/vlink opacity-90 hover:opacity-100"
                          >
                            <span>WATCH DEMO</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/vlink:translate-x-0.5 group-hover/vlink:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack Badges - Refined Frosted Glass Stationery Pills */}
                    {project.stack && project.stack.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-black/10 dark:bg-white/15 text-current border border-black/20 dark:border-white/25 text-xs font-semibold backdrop-blur-xs transition-colors hover:bg-black/15 dark:hover:bg-white/20 select-none shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Figma Artboard Frame - ONLY RENDERED IF IMAGE EXISTS */}
                  {hasImage && (
                    <div className="lg:col-span-6 w-full">
                      <div
                        onClick={() =>
                          onOpenFullscreenImage({
                            src: project.image,
                            caption: project.tagline,
                            title: project.title,
                            allImages:
                              project.images && project.images.length > 0
                                ? project.images
                                : [
                                    {
                                      src: project.image,
                                      caption: project.tagline,
                                    },
                                  ],
                            currentIndex: 0,
                          })
                        }
                        className="relative w-full aspect-[16/10] border border-black dark:border-white/30 bg-black/5 dark:bg-white/5 p-2 sm:p-3 shadow-2xl group/artboard cursor-zoom-in overflow-hidden flex items-center justify-center"
                      >
                        {/* 8 Figma Artboard Selection / Resize Handles (White Squares) */}
                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border border-black z-20 pointer-events-none" />

                        {/* [PNG] MOCKUP.PNG Badge */}
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black text-white font-sans text-[10px] font-bold tracking-wider rounded-xs border border-white/20 shadow-md">
                          <span className="text-amber-400 font-black">PNG</span>
                          <span>MOCKUP.PNG</span>
                        </div>

                        {/* Mockup Image */}
                        <div className="w-full h-full rounded-xs overflow-hidden flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover/artboard:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
