import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, BookOpen } from 'lucide-react'

export const ViewSwitcherPill: React.FC = () => {
  const location = useLocation()
  const isArchive = location.pathname.startsWith('/archive')
  const isProjectPage = location.pathname.includes('/work/')
  const projectId = isProjectPage ? location.pathname.split('/work/')[1] : null

  const mainTarget = projectId ? `/work/${projectId}` : '/'
  const archiveTarget = projectId ? `/archive/work/${projectId}` : '/archive'

  return (
    <aside
      aria-label="Portfolio Design Archive Switcher"
      className="hidden sm:block fixed top-4 left-4 sm:left-6 z-40"
    >
      <div className="flex items-center p-1 rounded-full border border-black/15 dark:border-white/20 bg-[#FAF7F0]/90 dark:bg-[#1C1C20]/90 backdrop-blur-md shadow-md text-xs font-sans">
        <Link
          to={mainTarget}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
            !isArchive
              ? 'bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-bold shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:opacity-100 opacity-70'
          }`}
          title="Active Main Portfolio (Chow Design)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-semibold">Main</span>
          <span className="hidden sm:inline text-[10px] opacity-75">(Chow)</span>
        </Link>

        <Link
          to={archiveTarget}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
            isArchive
              ? 'bg-[#1C1A17] text-white dark:bg-white dark:text-[#1C1A17] shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:opacity-100 opacity-70'
          }`}
          title="Switch to Archived Classic Notebook View"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="font-semibold">Archive</span>
          <span className="hidden sm:inline text-[10px] opacity-75">(Notebook)</span>
        </Link>
      </div>
    </aside>
  )
}

