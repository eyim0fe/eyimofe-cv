import React, { useState, useEffect } from 'react'

const THOUGHTS = [
  'Reading PRD v2.4 📋',
  'Analyzing user metrics 📈',
  'Finding the 0-to-1 edge 💡',
  '☕ Coffee → Code → Ship',
  'Checking sprint backlog ⚡',
  'Sprint on track: 98% 🚀',
]

interface ReadingStickmanProps {
  className?: string
}

export function ReadingStickman({ className = '' }: ReadingStickmanProps) {
  const [thoughtIndex, setThoughtIndex] = useState(0)
  const [isWaving, setIsWaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Cycle thoughts every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % THOUGHTS.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true)
        setIsWaving(true)
        setTimeout(() => setIsWaving(false), 1400)
      }}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="Stickman product manager peacefully reading"
    >
      <style>{`
        @keyframes stickman-head-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(1.5px) rotate(1.5deg); }
        }

        @keyframes page-turn-flip {
          0%, 65% {
            transform: scaleX(1) skewY(0deg);
            opacity: 0;
          }
          70% {
            opacity: 1;
            transform: scaleX(1) skewY(-2deg);
          }
          85% {
            transform: scaleX(0) skewY(-8deg);
          }
          95% {
            transform: scaleX(-1) skewY(2deg);
            opacity: 1;
          }
          100% {
            transform: scaleX(-1) skewY(0deg);
            opacity: 0;
          }
        }

        @keyframes steam-rise-1 {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateY(-14px) scale(1.3); opacity: 0; }
        }

        @keyframes steam-rise-2 {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-16px) scale(1.4); opacity: 0; }
        }

        @keyframes wave-arm {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-25deg); }
          75% { transform: rotate(15deg); }
        }

        .animate-head-bob {
          animation: stickman-head-bob 3.2s ease-in-out infinite;
          transform-origin: 90px 75px;
        }

        .animate-page-flip {
          animation: page-turn-flip 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: 105px 95px;
        }

        .animate-steam-1 {
          animation: steam-rise-1 2.2s ease-out infinite;
        }

        .animate-steam-2 {
          animation: steam-rise-2 2.6s ease-out infinite 0.9s;
        }

        .animate-waving-hand {
          animation: wave-arm 0.35s ease-in-out infinite alternate;
          transform-origin: 100px 75px;
        }
      `}</style>

      {/* FLOATING THOUGHT BUBBLE */}
      <div className="absolute -top-12 left-6 sm:left-10 z-20 transition-all duration-300 transform -translate-y-1">
        <div className="relative px-3 py-1.5 rounded-xl border-2 border-[#0E2233] bg-[#FED766] shadow-[3px_3px_0_#0E2233] text-[11px] font-extrabold text-[#0E2233] whitespace-nowrap flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '4s' }}>
          <span>{isHovered ? '💡 Ready to ship!' : THOUGHTS[thoughtIndex]}</span>
          {/* Small tail pointing down-left to stickman */}
          <div className="absolute -bottom-2 left-5 w-2.5 h-2.5 bg-[#FED766] border-r-2 border-b-2 border-[#0E2233] transform rotate-45" />
        </div>
      </div>

      {/* SVG STICK FIGURE WITH PRODUCT BOOKS & COFFEE */}
      <svg
        viewBox="0 0 220 162"
        className="w-44 sm:w-52 h-auto overflow-visible drop-shadow-sm cursor-pointer"
      >
        <defs>
          <filter id="stickman-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor="#0E2233" />
          </filter>
        </defs>

        {/* 1. STACK OF PRODUCT BOOKS (The seat & table) */}
        {/* Bottom Book: Strategy (Coral) */}
        <g id="book-bottom">
          <rect
            x="30"
            y="142"
            width="90"
            height="14"
            rx="3"
            fill="#FF5B22"
            stroke="#0E2233"
            strokeWidth="2.5"
          />
          <line x1="38" y1="146" x2="38" y2="152" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="44" y="152.5" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
            STRATEGY
          </text>
        </g>

        {/* Middle Book: Systems (Mint) */}
        <g id="book-middle">
          <rect
            x="34"
            y="128"
            width="82"
            height="14"
            rx="3"
            fill="#00C988"
            stroke="#0E2233"
            strokeWidth="2.5"
          />
          <line x1="42" y1="132" x2="42" y2="138" stroke="#0E2233" strokeWidth="2" strokeLinecap="round" />
          <text x="48" y="138.5" fill="#0E2233" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
            SYSTEMS
          </text>
        </g>

        {/* Top Book: PRDs (Yellow) */}
        <g id="book-top">
          <rect
            x="38"
            y="114"
            width="75"
            height="14"
            rx="3"
            fill="#FED766"
            stroke="#0E2233"
            strokeWidth="2.5"
          />
          <line x1="46" y1="118" x2="46" y2="124" stroke="#0E2233" strokeWidth="2" strokeLinecap="round" />
          <text x="52" y="124.5" fill="#0E2233" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
            PRD v2.0
          </text>
        </g>

        {/* Ground shadow / Floor line */}
        <line
          x1="20"
          y1="156"
          x2="200"
          y2="156"
          stroke="#0E2233"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 6"
          opacity="0.45"
        />

        {/* 2. STEAMING COFFEE MUG ON THE RIGHT */}
        <g id="coffee-cup" transform="translate(142, 126)">
          {/* Mug body */}
          <rect
            x="0"
            y="12"
            width="18"
            height="17"
            rx="3"
            fill="#BDF0E6"
            stroke="#0E2233"
            strokeWidth="2.5"
          />
          {/* Mug handle */}
          <path
            d="M 18 16 Q 25 16 25 21 Q 25 25 18 25"
            fill="none"
            stroke="#0E2233"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Steam wisps */}
          <path
            className="animate-steam-1"
            d="M 5 9 Q 3 4 6 0"
            fill="none"
            stroke="#08636E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            className="animate-steam-2"
            d="M 12 9 Q 15 5 12 0"
            fill="none"
            stroke="#08636E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* 3. STICK FIGURE */}
        {/* LEGS: Sitting on the book stack, knees bent */}
        <g id="stickman-legs">
          {/* Back leg */}
          <path
            d="M 68 114 L 62 135 L 75 146"
            fill="none"
            stroke="#0E2233"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Front leg */}
          <path
            d="M 72 114 L 78 136 L 94 146"
            fill="none"
            stroke="#0E2233"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cute shoes */}
          <ellipse cx="75" cy="147" rx="4" ry="2.5" fill="#0E2233" />
          <ellipse cx="94" cy="147" rx="4" ry="2.5" fill="#0E2233" />
        </g>

        {/* SPINE / TORSO: Leaning gently forward */}
        <path
          d="M 70 114 Q 74 95 82 72"
          fill="none"
          stroke="#0E2233"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* HEAD WITH GLASSES (Animated gentle nod) */}
        <g className="animate-head-bob" id="stickman-head">
          {/* Head circle */}
          <circle
            cx="89"
            cy="52"
            r="15"
            fill="#FFFFFF"
            stroke="#0E2233"
            strokeWidth="3.2"
          />
          {/* Round Glasses */}
          <circle cx="86" cy="52" r="4.2" fill="none" stroke="#0E2233" strokeWidth="2" />
          <circle cx="95" cy="52" r="4.2" fill="none" stroke="#0E2233" strokeWidth="2" />
          <line x1="90.2" y1="52" x2="90.8" y2="52" stroke="#0E2233" strokeWidth="2" />
          {/* Eyes looking down at the book */}
          <circle cx="87" cy="53" r="1.3" fill="#0E2233" />
          <circle cx="96" cy="53" r="1.3" fill="#0E2233" />
          {/* Gentle focused smile */}
          <path
            d="M 88 60 Q 92 62 95 59"
            fill="none"
            stroke="#0E2233"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* ARMS & THE OPEN READING BOOK */}
        {isWaving ? (
          // Waving arm when user hovers!
          <g>
            {/* Left arm holding book */}
            <path
              d="M 80 76 L 90 92 L 102 96"
              fill="none"
              stroke="#0E2233"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Right arm waving */}
            <path
              className="animate-waving-hand"
              d="M 80 76 L 98 62 L 108 42"
              fill="none"
              stroke="#0E2233"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Waving hand */}
            <circle cx="108" cy="42" r="3.5" fill="#FED766" stroke="#0E2233" strokeWidth="2" />
          </g>
        ) : (
          // Normal: Both arms holding the open book
          <g id="stickman-arms">
            {/* Back arm */}
            <path
              d="M 80 76 L 94 92 L 106 96"
              fill="none"
              stroke="#0E2233"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front arm */}
            <path
              d="M 78 78 L 98 94 L 115 97"
              fill="none"
              stroke="#0E2233"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* 4. THE OPEN BOOK (With turning page animation) */}
        <g id="open-reading-book" transform="translate(100, 88)">
          {/* Left Page (White with lines) */}
          <path
            d="M 12 12 L 0 6 L 0 24 L 12 28 Z"
            fill="#FFFFFF"
            stroke="#0E2233"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Left page text lines */}
          <line x1="2" y1="11" x2="9" y2="13" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />
          <line x1="2" y1="15" x2="8" y2="17" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />
          <line x1="2" y1="19" x2="10" y2="21" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />

          {/* Right Page (White with lines) */}
          <path
            d="M 12 12 L 24 6 L 24 24 L 12 28 Z"
            fill="#FFFFFF"
            stroke="#0E2233"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Right page text lines */}
          <line x1="15" y1="11" x2="22" y2="9" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />
          <line x1="15" y1="15" x2="21" y2="13" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />
          <line x1="15" y1="19" x2="22" y2="17" stroke="#0E2233" strokeWidth="1.2" opacity="0.6" />

          {/* Flipping page overlay (Dynamic turning page!) */}
          <g className="animate-page-flip">
            <path
              d="M 12 12 L 23 7 L 23 23 L 12 28 Z"
              fill="#FED766"
              stroke="#0E2233"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>

          {/* Book Spine Center */}
          <line x1="12" y1="12" x2="12" y2="28" stroke="#0E2233" strokeWidth="2.5" />

          {/* Little bookmark ribbon */}
          <path
            d="M 12 28 Q 14 34 16 38 L 19 36 L 21 39 Q 17 33 12 28"
            fill="#FF5B22"
            stroke="#0E2233"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </div>
  )
}

