import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export interface FullscreenImageState {
  src: string
  caption?: string
  title?: string
  allImages?: { src: string; caption: string }[]
  currentIndex?: number
}

interface FullscreenLightboxModalProps {
  fullscreenImage: FullscreenImageState | null
  onClose: () => void
  onSetFullscreenImage: React.Dispatch<React.SetStateAction<FullscreenImageState | null>>
}

export const FullscreenLightboxModal: React.FC<FullscreenLightboxModalProps> = ({
  fullscreenImage,
  onClose,
  onSetFullscreenImage
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false)

  // Reset zoom when image changes
  React.useEffect(() => {
    setIsZoomed(false)
  }, [fullscreenImage?.src])
  return (
    <AnimatePresence>
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/92 backdrop-blur-md cursor-zoom-out"
          />

          {/* Top Toolbar */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-medium backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
              title="Close fullscreen view (Esc)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close (Esc)</span>
            </button>
          </div>

          {/* Main Fullscreen Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-[105] max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden flex items-center justify-center max-w-full max-h-[75vh] select-none">
              <motion.img
                key={fullscreenImage.src}
                src={fullscreenImage.src}
                alt={fullscreenImage.caption || fullscreenImage.title}
                drag={isZoomed}
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.1}
                onClick={() => setIsZoomed((prev) => !prev)}
                animate={{
                  scale: isZoomed ? 2 : 1,
                  x: isZoomed ? undefined : 0,
                  y: isZoomed ? undefined : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`max-w-full max-h-[75vh] object-contain rounded-xs shadow-2xl border border-white/10 touch-none ${
                  isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                }`}
                title={isZoomed ? "Click to zoom out · Drag to pan" : "Click to zoom in (iPhone photo style)"}
              />
            </div>

            {/* Navigation Arrows for Multiple Images */}
            {fullscreenImage.allImages && fullscreenImage.allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    const all = fullscreenImage.allImages!
                    const cur = fullscreenImage.currentIndex ?? 0
                    const prevIdx = cur === 0 ? all.length - 1 : cur - 1
                    onSetFullscreenImage({
                      ...fullscreenImage,
                      src: all[prevIdx].src,
                      caption: all[prevIdx].caption,
                      currentIndex: prevIdx
                    })
                  }}
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-xl z-20"
                  aria-label="Previous image"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    const all = fullscreenImage.allImages!
                    const cur = fullscreenImage.currentIndex ?? 0
                    const nextIdx = cur === all.length - 1 ? 0 : cur + 1
                    onSetFullscreenImage({
                      ...fullscreenImage,
                      src: all[nextIdx].src,
                      caption: all[nextIdx].caption,
                      currentIndex: nextIdx
                    })
                  }}
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer shadow-xl z-20"
                  aria-label="Next image"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Title & Caption Glass Pill */}
            <div className="mt-4 px-5 py-2.5 rounded-full bg-black/80 border border-white/15 text-white backdrop-blur-md flex items-center justify-between gap-6 max-w-xl text-xs sm:text-sm font-sans shadow-xl">
              <div className="flex items-center gap-2 truncate">
                {fullscreenImage.title && (
                  <span className="font-bold text-amber-300 truncate">
                    {fullscreenImage.title}
                  </span>
                )}
                {fullscreenImage.caption && (
                  <span className="opacity-80 truncate">
                    {fullscreenImage.caption}
                  </span>
                )}
              </div>
              {fullscreenImage.allImages && fullscreenImage.allImages.length > 1 && (
                <span className="opacity-60 text-xs shrink-0 font-mono">
                  {(fullscreenImage.currentIndex ?? 0) + 1} / {fullscreenImage.allImages.length}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
