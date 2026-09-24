import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Maximize2 } from 'lucide-react'
import { PushPinIcon } from '@/components/StationeryIcons'
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

const pinRotations = ['-rotate-1', 'rotate-1', '-rotate-0.5', 'rotate-0.5']

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
    <section id="selected-work" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD4] dark:border-[#27272D] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight">
              01. Selected Work
            </h2>
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/80 dark:bg-[#1A1A1E]/80 text-xs sm:text-sm">
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

      {/* PINNED BOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {filteredProjects.map((proj, idx) => {
          const rotation = pinRotations[idx % pinRotations.length]

          return (
            <motion.div
              key={proj.id}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => onOpenDrawer(proj)}
              className={`relative p-6 rounded-xs border border-[#D5CEC5] dark:border-white/10 bg-white dark:bg-[#1E1E22] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-5 h-full ${rotation}`}
            >
              {/* Pushpin at Top Center holding the sheet */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <PushPinIcon
                  color={idx % 2 === 0 ? '#DC2626' : '#D97706'}
                  className="w-5 h-5 drop-shadow-md"
                />
              </div>

              {/* Card Content */}
              <div className="space-y-3.5 pt-2">
                {/* Header Row: Title & Role Badge */}
                <div className="flex items-start justify-between gap-2 border-b border-[#E5DFD4] dark:border-[#27272D] pb-3">
                  <div>
                    <span className="text-xs opacity-60 font-semibold block">
                      SPEC #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight mt-0.5">
                      {proj.title}
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0] dark:bg-[#202025] shrink-0 font-semibold">
                    {proj.roleLabel}
                  </span>
                </div>

                {/* Framed Image Preview with Hover & Fullscreen Click (Only rendered if proj.image is present) */}
                {proj.image && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenFullscreenImage({
                        src: proj.image,
                        caption: proj.tagline,
                        title: proj.title,
                        allImages:
                          proj.images && proj.images.length > 0
                            ? proj.images
                            : [{ src: proj.image, caption: proj.tagline }],
                        currentIndex: 0,
                      })
                    }}
                    className="group/img relative aspect-video overflow-hidden rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-black/5 dark:bg-white/5 cursor-zoom-in transition-all duration-200 hover:shadow-md"
                    title="Click to view image in full screen"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-108"
                    />
                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-sans font-medium backdrop-blur-sm border border-white/20 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Fullscreen</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Tagline Summary */}
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-3">
                  {proj.tagline}
                </p>
              </div>

              {/* Footer Stack Tags & Action Button */}
              <div className="pt-3 border-t border-[#E5DFD4] dark:border-[#27272D] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] opacity-70 px-1.5 py-0.5 rounded-xs bg-black/5 dark:bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300 pt-1">
                  <span>View Pinned Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
