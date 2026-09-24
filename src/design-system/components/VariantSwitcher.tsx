import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  BookOpen,
  Compass,
  Trees,
  PenTool,
  LayoutGrid,
  Newspaper,
  Bookmark,
  Palette
} from "lucide-react"

export interface VariantSwitcherProps {
  currentPath?: string
}

export const VariantSwitcher: React.FC<VariantSwitcherProps> = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const variants = [
    {
      path: "/variant-6",
      label: "6. Newspaper",
      badge: "NEW",
      sub: "The Daily Pinnick · Broadsheet",
      icon: Newspaper,
      accent: "hover:text-amber-800 dark:hover:text-amber-300"
    },
    {
      path: "/variant-7",
      label: "7. Classic Jotter",
      badge: "NEW",
      sub: "Lined Paper · Side Drawer",
      icon: Bookmark,
      accent: "hover:text-amber-800 dark:hover:text-amber-300"
    },
    {
      path: "/variant-1",
      label: "1. Notebook",
      sub: "BIZ UDPMincho · Paper",
      icon: BookOpen,
      accent: "hover:text-amber-800 dark:hover:text-amber-300"
    },
    {
      path: "/variant-2",
      label: "2. Navy Fanatic",
      sub: "Midnight · Celestial Horizon",
      icon: Compass,
      accent: "hover:text-sky-600 dark:hover:text-sky-400"
    },
    {
      path: "/variant-3",
      label: "3. Forest",
      sub: "Pine · Lake · Mist",
      icon: Trees,
      accent: "hover:text-emerald-700 dark:hover:text-emerald-400"
    },
    {
      path: "/variant-4",
      label: "4. PM Studio",
      sub: "Sticky Notes · Pen Mode",
      icon: PenTool,
      accent: "hover:text-amber-600 dark:hover:text-amber-400"
    },
    {
      path: "/variant-5",
      label: "5. Swiss",
      sub: "ana.sh · Split Dossier",
      icon: LayoutGrid,
      accent: "hover:text-neutral-900 dark:hover:text-white"
    },
    {
      path: "/design-system",
      label: "Design System",
      sub: "Tokens & Component Matrix",
      icon: Palette,
      accent: "hover:text-indigo-600 dark:hover:text-indigo-400"
    }
  ]

  return (
    <aside aria-label="Variant Switcher Dock" className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] overflow-x-auto scrollbar-none py-1">
      <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-xl whitespace-nowrap">
        {variants.map((v) => {
          const isActive =
            location.pathname === v.path ||
            (v.path === "/variant-6" && location.pathname === "/")
          const Icon = v.icon

          return (
            <button
              key={v.path}
              type="button"
              onClick={() => navigate(v.path)}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs font-semibold"
                  : `text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${v.accent}`
              }`}
              title={`${v.label}: ${v.sub}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="inline whitespace-nowrap">{v.label}</span>
              {v.badge && (
                <span className="hidden sm:inline text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500 text-neutral-950 font-extrabold">
                  {v.badge}
                </span>
              )}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 ml-0.5" />
              )}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
