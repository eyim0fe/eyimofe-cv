import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { jsPDF } from "jspdf"
import {
  PenTool,
  Highlighter,
  Eraser,
  RotateCcw,
  Trash2,
  Download,
  FileDown,
  X,
  Sparkles,
  Palette
} from "lucide-react"

interface WhiteboardCanvasProps {
  isOpen: boolean
  onClose: () => void
  isDark?: boolean
}

type ToolType = "pen" | "marker" | "highlighter" | "eraser"

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

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  isOpen,
  onClose,
  isDark = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [tool, setTool] = useState<ToolType>("pen")
  const [color, setColor] = useState<string>("#1C1A17")
  const [lineWidth, setLineWidth] = useState<number>(3)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)

  // Default color based on theme
  useEffect(() => {
    if (isDark) {
      setColor("#E8E4DD")
    } else {
      setColor("#1C1A17")
    }
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
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, strokes])

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const redrawAllStrokes = (strokeList: Stroke[]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    strokeList.forEach((st) => {
      if (st.points.length < 2) return
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(st.points[0].x, st.points[0].y)

      if (st.tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out"
        ctx.strokeStyle = "rgba(0,0,0,1)"
        ctx.lineWidth = st.width * 3
      } else {
        ctx.globalCompositeOperation = "source-over"
        ctx.strokeStyle = st.color
        ctx.lineWidth = st.width
        ctx.globalAlpha = st.opacity
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
      }

      for (let i = 1; i < st.points.length; i++) {
        ctx.lineTo(st.points[i].x, st.points[i].y)
      }
      ctx.stroke()
      ctx.restore()
    })
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let clientX = 0
    let clientY = 0

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    let opacity = 1
    let width = lineWidth

    if (tool === "highlighter") {
      opacity = 0.35
      width = 20
    } else if (tool === "marker") {
      opacity = 0.95
      width = 6
    } else if (tool === "pen") {
      opacity = 0.9
      width = 2.5
    }

    const newStroke: Stroke = {
      tool,
      color,
      width,
      opacity,
      points: [{ x, y }]
    }

    setIsDrawing(true)
    setCurrentStroke(newStroke)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let clientX = 0
    let clientY = 0

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    const updatedPoints = [...currentStroke.points, { x, y }]
    const updatedStroke = { ...currentStroke, points: updatedPoints }
    setCurrentStroke(updatedStroke)

    // Draw live stroke segment
    ctx.save()
    const lastPoint = currentStroke.points[currentStroke.points.length - 1]
    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(x, y)

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.strokeStyle = "rgba(0,0,0,1)"
      ctx.lineWidth = updatedStroke.width * 3
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = updatedStroke.color
      ctx.lineWidth = updatedStroke.width
      ctx.globalAlpha = updatedStroke.opacity
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
    }
    ctx.stroke()
    ctx.restore()
  }

  const stopDrawing = () => {
    if (!isDrawing || !currentStroke) return
    setIsDrawing(false)
    const updatedList = [...strokes, currentStroke]
    setStrokes(updatedList)
    setCurrentStroke(null)
  }

  const handleUndo = () => {
    if (strokes.length === 0) return
    const newStrokes = strokes.slice(0, -1)
    setStrokes(newStrokes)
    redrawAllStrokes(newStrokes)
  }

  const handleClear = () => {
    setStrokes([])
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  // Export as high-resolution PDF
  const handleExportPDF = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create temporary export canvas with paper background
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height
    const expCtx = exportCanvas.getContext("2d")
    if (!expCtx) return

    // Draw lined paper background
    expCtx.fillStyle = isDark ? "#141416" : "#FAF7F0"
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    // Ruled lines
    expCtx.strokeStyle = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
    expCtx.lineWidth = 1
    for (let y = 28; y < exportCanvas.height; y += 28) {
      expCtx.beginPath()
      expCtx.moveTo(0, y)
      expCtx.lineTo(exportCanvas.width, y)
      expCtx.stroke()
    }

    // Red margin line
    expCtx.strokeStyle = isDark ? "rgba(244, 63, 94, 0.2)" : "rgba(244, 63, 94, 0.3)"
    expCtx.lineWidth = 1
    expCtx.beginPath()
    expCtx.moveTo(60, 0)
    expCtx.lineTo(60, exportCanvas.height)
    expCtx.stroke()

    // Title stamp
    expCtx.fillStyle = isDark ? "#A1A1AA" : "#71717A"
    expCtx.font = "14px 'BIZ UDPMincho', serif"
    expCtx.fillText(
      `Eyimofe Pinnick · Whiteboard Notes · ${new Date().toLocaleDateString()}`,
      80,
      40
    )

    // Draw user strokes
    expCtx.drawImage(canvas, 0, 0)

    const imgData = exportCanvas.toDataURL("image/jpeg", 0.95)
    const orientation = canvas.width > canvas.height ? "landscape" : "portrait"
    const pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [canvas.width, canvas.height]
    })

    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height)
    pdf.save(`eyimofe-whiteboard-notes-${Date.now()}.pdf`)
  }

  // Export as PNG image (with Notebook Paper BG, Ruled Lines, Red Margin, and Header Stamp)
  const handleExportPNG = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create temporary export canvas with notebook paper background
    const exportCanvas = document.createElement("canvas")
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height
    const expCtx = exportCanvas.getContext("2d")
    if (!expCtx) return

    // 1. Draw notebook paper background
    expCtx.fillStyle = isDark ? "#141416" : "#FAF7F0"
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    // 2. Ruled horizontal lines
    expCtx.strokeStyle = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
    expCtx.lineWidth = 1
    for (let y = 28; y < exportCanvas.height; y += 28) {
      expCtx.beginPath()
      expCtx.moveTo(0, y)
      expCtx.lineTo(exportCanvas.width, y)
      expCtx.stroke()
    }

    // 3. Vertical Red Margin line
    expCtx.strokeStyle = isDark ? "rgba(244, 63, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"
    expCtx.lineWidth = 1.5
    expCtx.beginPath()
    expCtx.moveTo(60, 0)
    expCtx.lineTo(60, exportCanvas.height)
    expCtx.stroke()

    // 4. Title & Date Header stamp
    expCtx.fillStyle = isDark ? "#A1A1AA" : "#71717A"
    expCtx.font = "14px 'BIZ UDPMincho', serif"
    expCtx.fillText(
      `Eyimofe Pinnick · Whiteboard Notes · ${new Date().toLocaleDateString()}`,
      80,
      40
    )

    // 5. Draw user strokes on top
    expCtx.drawImage(canvas, 0, 0)

    const link = document.createElement("a")
    link.download = `eyimofe-whiteboard-${Date.now()}.png`
    link.href = exportCanvas.toDataURL("image/png")
    link.click()
  }

  const colors = [
    { label: "Carbon Black", value: isDark ? "#E8E4DD" : "#1C1A17" },
    { label: "Ballpoint Blue", value: "#1E40AF" },
    { label: "Crimson Red", value: "#DC2626" },
    { label: "Amber Gold", value: "#D97706" },
    { label: "Pine Green", value: "#059669" }
  ]

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden select-none"
      style={{
        fontFamily: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif'
      }}
    >
      {/* Whiteboard Ruled Paper Background */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDark ? "bg-[#141416]" : "bg-[#FAF7F0]"
        }`}
        style={{
          backgroundImage: isDark
            ? "linear-gradient(to bottom, #26262D 1px, transparent 1px)"
            : "linear-gradient(to bottom, #E6E0D4 1px, transparent 1px)",
          backgroundSize: "100% 28px"
        }}
      />

      {/* Margin Rule */}
      <div className="hidden sm:block absolute left-14 top-0 bottom-0 w-[1px] bg-rose-400/30 dark:bg-rose-900/30 pointer-events-none" />

      {/* HTML5 Drawing Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="absolute inset-0 cursor-crosshair touch-none z-10"
      />

      {/* Top Floating Whiteboard Control Bar (Responsive & Fully Accessible on Mobile) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 w-[95vw] sm:w-auto p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0]/98 dark:bg-[#1A1A1E]/98 backdrop-blur-md shadow-xl flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs"
      >
        {/* Tool Selectors */}
        <div className="flex items-center gap-1 border-r border-[#D5CEC5] dark:border-[#38383E] pr-2">
          <button
            type="button"
            onClick={() => setTool("pen")}
            className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              tool === "pen"
                ? "bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] shadow-xs"
                : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
            }`}
            title="Fine Ink Pen"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">Pen</span>
          </button>

          <button
            type="button"
            onClick={() => setTool("marker")}
            className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              tool === "marker"
                ? "bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] shadow-xs"
                : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
            }`}
            title="Bold Marker"
          >
            <span className="font-bold text-xs">M</span>
            <span className="hidden sm:inline">Marker</span>
          </button>

          <button
            type="button"
            onClick={() => setTool("highlighter")}
            className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              tool === "highlighter"
                ? "bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] shadow-xs"
                : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
            }`}
            title="Translucent Highlighter"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Highlight</span>
          </button>

          <button
            type="button"
            onClick={() => setTool("eraser")}
            className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              tool === "eraser"
                ? "bg-[#1C1A17] text-white dark:bg-[#FAF7F0] dark:text-[#1C1A17] shadow-xs"
                : "hover:bg-black/5 dark:hover:bg-white/5 opacity-75"
            }`}
            title="Eraser"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eraser</span>
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 border-r border-[#D5CEC5] dark:border-[#38383E] pr-2">
          {colors.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => {
                setColor(c.value)
                if (tool === "eraser") setTool("pen")
              }}
              style={{ backgroundColor: c.value }}
              className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border border-black/20 shadow-xs transition-transform cursor-pointer ${
                color === c.value && tool !== "eraser" ? "scale-125 ring-2 ring-amber-500" : "hover:scale-110"
              }`}
              title={c.label}
            />
          ))}
        </div>

        {/* Undo & Clear */}
        <div className="flex items-center gap-1 border-r border-[#D5CEC5] dark:border-[#38383E] pr-2">
          <button
            type="button"
            onClick={handleUndo}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100 transition-colors cursor-pointer"
            title="Undo last stroke"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-red-600 dark:text-red-400 opacity-75 hover:opacity-100 transition-colors cursor-pointer"
            title="Clear whiteboard"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Export PDF & Save Image Controls (Always Visible on Mobile & Desktop) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-900 text-white hover:bg-amber-800 dark:bg-amber-400 dark:text-neutral-950 text-[11px] sm:text-xs font-bold shadow-xs cursor-pointer"
            title="Save drawings and notes as PDF document"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportPNG}
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1C1C20] hover:bg-black/5 dark:hover:bg-white/5 text-[11px] sm:text-xs font-bold shadow-2xs cursor-pointer"
            title="Download PNG image"
          >
            <Download className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Save Image</span>
          </button>

          {/* Close Whiteboard Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full border border-[#D5CEC5] dark:border-[#38383E] hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer ml-1"
            title="Exit Whiteboard (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Floating Canvas Watermark / Hint */}
      <div className="absolute bottom-4 left-6 z-20 text-xs opacity-50 pointer-events-none">
        <span>✍ Jotter Whiteboard Mode · Sketch, annotate & save as PDF</span>
      </div>
    </div>
  )
}
