import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/portfolioData'

interface BimanshuSelectedWorkProps {
  projects: Project[]
  roleFilter: 'all' | 'pm' | 'engineer'
  onSetRoleFilter: (filter: 'all' | 'pm' | 'engineer') => void
  onOpenFullscreenImage?: (imageInfo: {
    src: string
    caption?: string
    title?: string
    allImages?: { src: string; caption: string }[]
    currentIndex?: number
  }) => void
}

export const BimanshuSelectedWork: React.FC<BimanshuSelectedWorkProps> = ({
  projects,
  roleFilter,
  onSetRoleFilter,
  onOpenFullscreenImage,
}) => {
  const filteredProjects = projects.filter((p) => {
    if (roleFilter === 'all') return true
    if (roleFilter === 'pm') return p.roleLabel.toLowerCase().includes('product')
    if (roleFilter === 'engineer') return p.roleLabel.toLowerCase().includes('engineer')
    return true
  })

  return (
    <section id="work" className="w-full relative z-20 space-y-10">
      {/* Section Header with Serif Title & Role Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5DFD4] dark:border-[#27272D] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              selected work
            </span>
            <span className="text-xs px-2.5 py-0.5 bg-amber-200 dark:bg-amber-900/40 dark:text-amber-200 border border-black/20 dark:border-white/20 font-bold rounded-xs font-sans">
              {filteredProjects.length} PROJECTS
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mt-1"
            style={{
              fontFamily:
                '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
            }}
          >
            01. Selected Work
          </h2>
        </div>

        {/* Role Filter Tabs (No font-mono) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/80 dark:bg-[#1A1A1E]/80 text-xs sm:text-sm font-sans font-semibold">
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

      {/* SELECTED WORK GRID: Image -> Product Name -> Short Info -> Tags -> Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {filteredProjects.map((project, idx) => {
          const isFeatured = idx === 0
          const hasImage = Boolean(project.image && project.image.trim() !== '')

          return (
            <article
              key={project.id}
              className={`rounded-2xl border border-[#D5CEC5] dark:border-[#333338] bg-[#FAF7F0]/70 dark:bg-[#19191D]/80 backdrop-blur-xs p-5 sm:p-7 flex flex-col justify-between transition-all hover:shadow-xl hover:border-black/30 dark:hover:border-white/30 ${
                isFeatured ? 'md:col-span-2' : ''
              }`}
            >
              <div className="space-y-4">
                {/* 1. MAIN IMAGE OF THE PRODUCT */}
                {hasImage && (
                  <Link
                    to={`/work/${project.id}`}
                    className="block group/media relative w-full aspect-[16/10] border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#121214] p-3 rounded-xl shadow-xs overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/media:scale-103"
                    />
                  </Link>
                )}

                {/* 2. PRODUCT NAME */}
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug pt-1"
                  style={{
                    fontFamily:
                      '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif',
                  }}
                >
                  <Link
                    to={`/work/${project.id}`}
                    className="hover:underline underline-offset-4"
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* 3. SHORT INFO */}
                <p className="text-sm sm:text-base opacity-85 leading-relaxed font-sans">
                  {project.tagline}
                </p>

                {/* 4. TAGS */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 text-xs font-semibold border border-black/10 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. LINKS */}
              <div className="pt-6 mt-4 border-t border-[#E5DFD4] dark:border-[#27272D] flex flex-wrap items-center gap-6 font-sans text-xs sm:text-sm font-bold tracking-wider uppercase">
                <Link
                  to={`/work/${project.id}`}
                  className="inline-flex items-center gap-1.5 underline underline-offset-8 text-neutral-900 dark:text-neutral-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors group/cta"
                >
                  <span>READ FULL CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>

                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline underline-offset-8 opacity-80 hover:opacity-100 transition-opacity text-amber-800 dark:text-amber-300"
                  >
                    <span>WATCH DEMO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
