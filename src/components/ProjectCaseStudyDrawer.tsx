import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, ChevronLeft, ChevronRight, Briefcase, Maximize2, ZoomIn } from "lucide-react"
import type { Project } from "@/data/portfolioData"

interface ProjectCaseStudyDrawerProps {
  activeDrawerProject: Project | null
  activeImageIndex: number
  onCloseDrawer: () => void
  onSetActiveImageIndex: React.Dispatch<React.SetStateAction<number>>
  onOpenFullscreenImage: (imageInfo: {
    src: string
    caption?: string
    title?: string
    allImages?: { src: string; caption: string }[]
    currentIndex?: number
  }) => void
}

export const ProjectCaseStudyDrawer: React.FC<ProjectCaseStudyDrawerProps> = ({
  activeDrawerProject,
  activeImageIndex,
  onCloseDrawer,
  onSetActiveImageIndex,
  onOpenFullscreenImage
}) => {
  return (
    <AnimatePresence>
      {activeDrawerProject && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseDrawer}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-3xl bg-[#FAF7F0] dark:bg-[#161618] text-[#1C1A17] dark:text-[#E8E4DD] border-l border-[#D5CEC5] dark:border-[#2D2D33] shadow-2xl flex flex-col h-full overflow-y-auto"
              style={{
                fontFamily: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif'
              }}
            >
              {/* Drawer Sticky Header */}
              <div className="sticky top-0 z-20 p-5 sm:p-7 border-b border-[#E5DFD4] dark:border-[#27272D] bg-[#FAF7F0]/95 dark:bg-[#161618]/95 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    onClick={onCloseDrawer}
                    className="sm:hidden p-1.5 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                    aria-label="Back to projects"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-amber-900 dark:text-amber-300 font-semibold">
                        {activeDrawerProject.roleLabel}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{activeDrawerProject.title}</h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onCloseDrawer}
                  className="p-2 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] hover:bg-[#EFEAE0] dark:hover:bg-[#25252A] cursor-pointer"
                  title="Close case study (Esc)"
                  aria-label="Close case study drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 sm:p-10 space-y-8 flex-1">
                {/* Tagline */}
                <p className="text-base sm:text-lg opacity-85 leading-relaxed">
                  &ldquo;{activeDrawerProject.tagline}&rdquo;
                </p>

                {/* Multi-Image Gallery Showcase Container (Only rendered if project has images) */}
                {activeDrawerProject.images && activeDrawerProject.images.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#D5CEC5] dark:border-white/10 bg-[#F9F6F0] dark:bg-[#1A1A1E] shadow-xs space-y-3">
                    {/* Main Image Viewport Frame */}
                    <div
                      onClick={() =>
                        onOpenFullscreenImage({
                          src: activeDrawerProject.images[activeImageIndex]?.src || activeDrawerProject.image,
                          caption: activeDrawerProject.images[activeImageIndex]?.caption || activeDrawerProject.tagline,
                          title: activeDrawerProject.title,
                          allImages: activeDrawerProject.images,
                          currentIndex: activeImageIndex
                        })
                      }
                      className="group/gallery relative aspect-video sm:aspect-[16/10] overflow-hidden rounded-xl border border-[#E5DFD4] dark:border-neutral-800 bg-white dark:bg-[#121214] flex items-center justify-center cursor-zoom-in shadow-inner"
                      title="Click to view full screen"
                    >
                      <img
                        src={activeDrawerProject.images[activeImageIndex]?.src || activeDrawerProject.image}
                        alt={activeDrawerProject.images[activeImageIndex]?.caption || activeDrawerProject.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover/gallery:scale-104"
                      />

                      {/* Top Right Counter Badge (1 / 5) */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-black/80 text-white text-xs font-semibold font-mono tracking-wider backdrop-blur-sm z-10 shadow-md">
                        {activeImageIndex + 1} / {activeDrawerProject.images.length}
                      </div>

                      {/* Bottom Right Click to Zoom Badge */}
                      <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-slate-800/85 hover:bg-slate-900 text-white text-xs font-medium font-sans flex items-center gap-1.5 backdrop-blur-md z-10 shadow-md transition-transform hover:scale-105">
                        <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                        <span>Click to zoom</span>
                      </div>

                      {/* Carousel Left / Right Navigation Arrow Buttons */}
                      {activeDrawerProject.images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSetActiveImageIndex((prev) =>
                                prev === 0 ? activeDrawerProject.images.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer z-10 shadow-md hover:scale-110"
                            aria-label="Previous screenshot"
                            title="Previous screenshot"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSetActiveImageIndex((prev) =>
                                prev === activeDrawerProject.images.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer z-10 shadow-md hover:scale-110"
                            aria-label="Next screenshot"
                            title="Next screenshot"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Centered Italic Caption directly below main view */}
                    <div className="text-center text-xs sm:text-sm italic opacity-85 text-neutral-700 dark:text-neutral-300 font-serif pt-1">
                      {activeDrawerProject.images[activeImageIndex]?.caption}
                    </div>

                    {/* Horizontal Thumbnail Strip Row */}
                    {activeDrawerProject.images.length > 1 && (
                      <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-1 scrollbar-none justify-start sm:justify-center">
                        {activeDrawerProject.images.map((img, idx) => {
                          const isActive = idx === activeImageIndex
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => onSetActiveImageIndex(idx)}
                              className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                                isActive
                                  ? "ring-2 ring-amber-600 dark:ring-amber-400 border-amber-600 opacity-100 scale-105 shadow-md"
                                  : "border-[#D5CEC5] dark:border-white/10 opacity-60 hover:opacity-100 hover:scale-102"
                              }`}
                              title={`View ${img.caption || `Screen ${idx + 1}`}`}
                            >
                              <img
                                src={img.src}
                                alt={img.caption || `Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Role & Contribution */}
                <div className="space-y-2 border-t border-[#E5DFD4] dark:border-[#27272D] pt-6">
                  <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                    <Briefcase className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>My Role & Contribution</span>
                  </div>
                  <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                    {activeDrawerProject.roleDescription}
                  </p>
                </div>

                {/* Challenge & Problem */}
                <div className="space-y-2 border-t border-[#E5DFD4] dark:border-[#27272D] pt-6">
                  <span className="font-bold text-sm uppercase tracking-wider block">
                    The Challenge & Problem
                  </span>
                  <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                    {activeDrawerProject.caseStudy.problem}
                  </p>
                </div>

                {/* Solution & Approach */}
                <div className="space-y-2 border-t border-[#E5DFD4] dark:border-[#27272D] pt-6">
                  <span className="font-bold text-sm uppercase tracking-wider block">
                    The Solution & Approach
                  </span>
                  <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                    {activeDrawerProject.caseStudy.solution}
                  </p>
                </div>

                {/* Key Contributions and impact */}
                <div className="space-y-2 border-t border-[#E5DFD4] dark:border-[#27272D] pt-6">
                  <span className="font-bold text-sm uppercase tracking-wider block">
                    Key Contributions and impact
                  </span>
                  <ul className="space-y-2 text-sm sm:text-base opacity-85">
                    {activeDrawerProject.caseStudy.myImpact.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-amber-700 dark:text-amber-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies & Tools */}
                {activeDrawerProject.stack && activeDrawerProject.stack.length > 0 && (
                  <div className="space-y-2 border-t border-[#E5DFD4] dark:border-[#27272D] pt-6">
                    <span className="font-bold text-sm uppercase tracking-wider block">
                      Technologies & Tools Used
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                      {activeDrawerProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1E1E22]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
