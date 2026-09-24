import React from "react"

export const MarkerIcon: React.FC<{ color?: string; className?: string }> = ({
  color = "#2563EB",
  className = "w-5 h-5"
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Marker Cap */}
    <rect x="7" y="2" width="10" height="6" rx="1.5" fill={color} stroke="currentColor" />
    {/* Marker Body */}
    <rect x="6" y="8" width="12" height="13" rx="2" fill="currentColor" fillOpacity="0.1" stroke="currentColor" />
    <path d="M9 13h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Chisel Tip */}
    <path d="M10 21l2 2 2-2" fill={color} stroke="currentColor" />
  </svg>
)

export const PushPinIcon: React.FC<{ color?: string; className?: string }> = ({
  color = "#EF4444",
  className = "w-4 h-4"
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="7" rx="6" ry="3" fill={color} />
    <path d="M9 7l1 7h4l1-7" fill={color} fillOpacity="0.8" />
    <circle cx="12" cy="5" r="3" fill="#FFFFFF" fillOpacity="0.4" />
    <path d="M12 14v8" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const PaperclipIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)

export const TrashBinIcon: React.FC<{ isOpen?: boolean; className?: string }> = ({
  isOpen = false,
  className = "w-6 h-6"
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lid (pivots open when isOpen is true) */}
    <g
      style={{
        transformOrigin: "4px 6px",
        transform: isOpen ? "rotate(-32deg) translateY(-2px)" : "none",
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <path d="M3 6h18" stroke="#EF4444" strokeWidth="2" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#EF4444" strokeWidth="1.75" />
    </g>
    {/* Bin Can Body */}
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" stroke="currentColor" strokeOpacity="0.5" />
    <path d="M14 11v6" stroke="currentColor" strokeOpacity="0.5" />
  </svg>
)

export const MagnetStarIcon: React.FC<{ color?: string; className?: string }> = ({
  color = "#F59E0B",
  className = "w-4 h-4"
}) => (
  <svg className={className} viewBox="0 0 24 24" fill={color} stroke="#B45309" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export const WashiTape: React.FC<{ color?: string; className?: string }> = ({
  color = "rgba(253, 224, 71, 0.45)",
  className = "w-16 h-4"
}) => (
  <div
    className={`rounded-xs pointer-events-none ${className}`}
    style={{
      backgroundColor: color,
      border: "1px dashed rgba(0,0,0,0.12)",
      backdropFilter: "blur(2px)"
    }}
  />
)
