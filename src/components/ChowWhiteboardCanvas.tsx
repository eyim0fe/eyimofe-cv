import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PenTool,
  Highlighter,
  Eraser,
  RotateCcw,
  Trash2,
  Download,
  X,
  Sparkles,
  Check,
} from 'lucide-react'

interface ChowWhiteboardCanvasProps {
  isOpen: boolean
  onClose: () => void
  isDark?: boolean
}

type ToolType = 'pen' | 'marker' | 'highlighter' | 'eraser'

interface StrokePoint {
  x: number
  y: number
}

interface Stroke {
  tool: ToolType
  color: string
  width: number
  opacity: number
  points: StrokePoint[]
}

const CHOW_PALETTE = [
  { name: 'Ink', color: '#0E2233' },
  { name: 'Forest', color: '#1B4332' },
  { name: 'Emerald', color: '#2D6A4F' },
  { name: 'Pine', color: '#387A5C' },
  { name: 'Teal', color: '#0B6277' },
  { name: 'White', color: '#FFFFFF' },
]

export const ChowWhiteboardCanvas: React.FC<ChowWhiteboardCanvasProps> = ({
  isOpen,
  onClose,
  isDark = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [tool, setTool] = useState<ToolType>('pen')
  const [color, setColor] = useState<string>(isDark ? '#2D6A4F' : '#0E2233')
  const [lineWidth, setLineWidth] = useState<number>(3.5)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)

  useEffect(() => {
    setColor(isDark ? '#D8F3DC' : '#0E2233')
  }, [isDark])

  // Resize canvas to window size
  useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      redrawAllStrokes(strokes)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, strokes])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const redrawAllStrokes = (allStrokes: Stroke[]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    allStrokes.forEach((stroke) => {
      drawStroke(ctx, stroke)
    })
  }

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return

    ctx.save()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = stroke.width

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(0,0,0,1)'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = stroke.color
      ctx.globalAlpha = stroke.opacity
    }

    ctx.beginPath()
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

    for (let i = 1; i < stroke.points.length; i++) {
      const p0 = stroke.points[i - 1]
      const p1 = stroke.points[i]
      const midX = (p0.x + p1.x) / 2
      const midY = (p0.y + p1.y) / 2
      ctx.quadraticCurveTo(p0.x, p0.y, midX, midY)
    }

    ctx.stroke()
    ctx.restore()
  }

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let effectiveOpacity = 1
    let effectiveWidth = lineWidth

    if (tool === 'marker') {
      effectiveWidth = lineWidth * 2.2
      effectiveOpacity = 0.95
    } else if (tool === 'highlighter') {
      effectiveWidth = lineWidth * 3.5
      effectiveOpacity = 0.45
    } else if (tool === 'eraser') {
      effectiveWidth = lineWidth * 4
    }

    const newStroke: Stroke = {
      tool,
      color,
      width: effectiveWidth,
      opacity: effectiveOpacity,
      points: [{ x, y }],
    }

    setIsDrawing(true)
    setCurrentStroke(newStroke)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const updatedPoints = [...currentStroke.points, { x, y }]
    const updatedStroke = { ...currentStroke, points: updatedPoints }

    setCurrentStroke(updatedStroke)

    // Redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    strokes.forEach((s) => drawStroke(ctx, s))
    drawStroke(ctx, updatedStroke)
  }

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) return

    setIsDrawing(false)
    if (currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke])
    }
    setCurrentStroke(null)
  }

  const handleUndo = () => {
    if (strokes.length === 0) return
    const updated = strokes.slice(0, -1)
    setStrokes(updated)
    redrawAllStrokes(updated)
  }

  const handleClear = () => {
    setStrokes([])
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleExportPNG = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height
    const ctx = exportCanvas.getContext('2d')
    if (!ctx) return

    // Background fill
    ctx.fillStyle = isDark ? '#091522' : '#FFFFFF'
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    // Draw strokes
    strokes.forEach((s) => drawStroke(ctx, s))

    const url = exportCanvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `eyimofe-chow-whiteboard-${Date.now()}.png`
    a.click()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            backgroundColor: isDark ? 'rgba(9, 21, 34, 0.94)' : 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Subtle micro dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `radial-gradient(${isDark ? '#2D6A4F' : '#0E2233'} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            className="absolute inset-0 cursor-crosshair touch-none"
          />

          {/* FLOATING NEO-BRUTALIST TOOLBAR */}
          <header className="absolute top-4 left-1/2 -translate-x-1/2 z-60 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl border-2.5 border-[#0E2233] bg-[#FFFFFF] dark:bg-[#122436] dark:border-[#2D6A4F] shadow-[5px_5px_0_#0E2233] dark:shadow-[5px_5px_0_#143829]">
              {/* Tool buttons */}
              <div className="flex items-center gap-1 border-r-2 border-[#0E2233]/20 pr-2">
                {[
                  { id: 'pen', label: 'Pen', icon: PenTool },
                  { id: 'marker', label: 'Marker', icon: Sparkles },
                  { id: 'highlighter', label: 'Highlighter', icon: Highlighter },
                  { id: 'eraser', label: 'Eraser', icon: Eraser },
                ].map((item) => {
                  const Icon = item.icon
                  const active = tool === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTool(item.id as ToolType)}
                      className={`p-2 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        active
                          ? 'border-[#0E2233] bg-[#1B4332] text-white shadow-[2px_2px_0_#0E2233]'
                          : 'border-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#0E2233] dark:text-white'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Color Palette */}
              {tool !== 'eraser' && (
                <div className="flex items-center gap-1.5 border-r-2 border-[#0E2233]/20 pr-2">
                  {CHOW_PALETTE.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setColor(p.color)}
                      className={`w-6 h-6 rounded-full border-2 border-[#0E2233] flex items-center justify-center cursor-pointer transition-transform ${
                        color === p.color ? 'scale-120 ring-2 ring-[#2D6A4F]' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                    >
                      {color === p.color && (
                        <Check
                          className={`w-3 h-3 ${p.color === '#FFFFFF' || p.color === '#D8F3DC' ? 'text-[#0E2233]' : 'text-white'}`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Stroke Size Controls */}
              <div className="hidden md:flex items-center gap-1 border-r-2 border-[#0E2233]/20 pr-2">
                {[2, 4, 7].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setLineWidth(size)}
                    className={`w-7 h-7 rounded-lg border-2 border-[#0E2233] flex items-center justify-center cursor-pointer ${
                      lineWidth === size
                        ? 'bg-[#D8F3DC] text-[#1B4332] shadow-[2px_2px_0_#0E2233]'
                        : 'bg-white hover:bg-black/5 dark:bg-[#091522]'
                    }`}
                    title={`Size ${size}`}
                  >
                    <span
                      className="rounded-full bg-[#0E2233] dark:bg-white"
                      style={{ width: size * 1.5, height: size * 1.5 }}
                    />
                  </button>
                ))}
              </div>

              {/* Undo & Clear */}
              <div className="flex items-center gap-1 border-r-2 border-[#0E2233]/20 pr-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={strokes.length === 0}
                  className="p-2 rounded-xl border-2 border-[#0E2233] bg-white hover:bg-[#D8F3DC] text-[#0E2233] cursor-pointer shadow-[2px_2px_0_#0E2233] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={strokes.length === 0}
                  className="p-2 rounded-xl border-2 border-[#0E2233] bg-white hover:bg-red-200 text-red-700 cursor-pointer shadow-[2px_2px_0_#0E2233] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Clear Whiteboard"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Export PNG */}
              <button
                type="button"
                onClick={handleExportPNG}
                className="px-3 py-1.5 rounded-xl border-2 border-[#0E2233] bg-[#1B4332] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-[2px_2px_0_#0E2233] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                title="Download PNG"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PNG</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl border-2 border-[#0E2233] bg-[#FF5B22] text-white hover:opacity-90 shadow-[2px_2px_0_#0E2233] cursor-pointer ml-1"
                title="Close (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

