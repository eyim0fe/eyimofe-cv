import React from 'react'
import { motion } from 'framer-motion'

// Brand and discipline SVG icons for pixel-perfect rendering in light & dark modes
function IconProductDiscovery({
  className = 'w-5 h-5',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  )
}

function IconStrategy({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconRoadmap({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
      <circle cx="7" cy="6" r="2" fill="currentColor" />
      <circle cx="14" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="18" r="2" fill="currentColor" />
    </svg>
  )
}

function IconUserStories({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  )
}

function IconSprintPlanning({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconDocumentation({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10M6 10h10M6 14h6" />
    </svg>
  )
}

function IconQADelivery({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconClickUp({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m4 16 8-7 8 7" />
      <circle cx="12" cy="18" r="2.5" fill="currentColor" />
    </svg>
  )
}

function IconAzureDevOps({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 8l10-5 6 3-4 13-12-3z" />
      <path d="M14 3v13" />
    </svg>
  )
}

function IconFigma({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  )
}

function IconNotion({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8v8l8-8v8" />
    </svg>
  )
}

function IconProjectManagement({
  className = 'w-5 h-5',
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

function IconReact({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

function IconHTML({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 3l2 16 6 2 6-2 2-16H4z" />
      <path d="M8 7h8M8 11h7l-.5 5-2.5 1-2.5-1-.2-2" />
    </svg>
  )
}

function IconCSS({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 3l2 16 6 2 6-2 2-16H4z" />
      <path d="M16 7H8v4h7l-.5 5-2.5 1-2.5-1-.2-2" />
    </svg>
  )
}

function IconPython({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2c-3.3 0-6 1.3-6 4v3h6v1H4a3 3 0 0 0-3 3c0 3.3 1.3 6 4 6h2v-3a3 3 0 0 1 3-3h6V9c0-3.9-3.7-7-7-7z" />
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <path d="M12 22c3.3 0 6-1.3 6-4v-3h-6v-1h8a3 3 0 0 0 3-3c0-3.3-1.3-6-4-6h-2v3a3 3 0 0 1-3 3h-6v2c0 3.9 3.7 7 7 7z" />
      <circle cx="15" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

function IconNodeJS({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" />
      <path d="M12 6.5v11M7 9.5l5 3 5-3" />
    </svg>
  )
}

function IconRestAPI({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4M14 12h4M12 6v12" />
      <circle cx="6" cy="12" r="1" fill="currentColor" />
      <circle cx="18" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

function IconPostgreSQL({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

interface SkillCategory {
  title: string
  items: {
    name: string
    icon: React.FC<{ className?: string }>
  }[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Product Management',
    items: [
      { name: 'Product Discovery', icon: IconProductDiscovery },
      { name: 'Product Strategy', icon: IconStrategy },
      { name: 'Roadmap Planning', icon: IconRoadmap },
      { name: 'User Stories & Backlog', icon: IconUserStories },
      { name: 'Sprint Planning', icon: IconSprintPlanning },
      { name: 'Product Documentation', icon: IconDocumentation },
      { name: 'QA & Delivery', icon: IconQADelivery },
    ],
  },
  {
    title: 'Product & Delivery',
    items: [
      { name: 'ClickUp', icon: IconClickUp },
      { name: 'Azure DevOps', icon: IconAzureDevOps },
      { name: 'Figma', icon: IconFigma },
      { name: 'Notion', icon: IconNotion },
      { name: 'Project management', icon: IconProjectManagement },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React (TypeScript)', icon: IconReact },
      { name: 'HTML', icon: IconHTML },
      { name: 'CSS', icon: IconCSS },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Python (FastAPI)', icon: IconPython },
      { name: 'NodeJS (Express + Drizzle)', icon: IconNodeJS },
      { name: 'REST APIs', icon: IconRestAPI },
      { name: 'SQL (Postgres)', icon: IconPostgreSQL },
    ],
  },
]

export function SkillsShowcase() {
  return (
    <div
      className="space-y-12"
      style={{
        fontFamily:
          '"BIZ UDPMincho", "BIZ UDPMincho Fallback", "BIZ UDMincho", Georgia, serif',
      }}
    >
      {/* SECTION TITLE */}
      <div className="flex items-baseline justify-between border-b border-[#E5DFD4] dark:border-[#27272D] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight">
              03. My Skills
            </h2>
          </div>
        </div>
      </div>

      {/* SKILLS CATEGORIES GRID WITH MEDIUM-WEIGHT PILL BADGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: catIdx * 0.05 }}
            className="space-y-4"
          >
            {/* Category Sub-Header */}
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-amber-900 dark:text-amber-300 border-b border-[#E5DFD4] dark:border-[#27272D] pb-2">
              {category.title}
            </h3>

            {/* Items Grid as Medium-Weight Pill Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.items.map((skill) => {
                const IconComponent = skill.icon
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-full border border-[#D5CEC5] dark:border-white/10 bg-white dark:bg-[#1E1E22] hover:border-amber-700/40 dark:hover:border-amber-400/40 transition-all group cursor-default shadow-2xs"
                  >
                    {/* Icon container */}
                    <div className="w-5 h-5 shrink-0 flex items-center justify-center opacity-85 group-hover:opacity-100 text-amber-900 dark:text-amber-300 transition-transform group-hover:scale-110">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Skill Label */}
                    <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-200 leading-snug truncate">
                      {skill.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
