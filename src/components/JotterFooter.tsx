import React from "react"

interface JotterFooterProps {
  name: string
}

export const JotterFooter: React.FC<JotterFooterProps> = ({ name }) => {
  return (
    <footer className="border-t border-[#E5DFD4] dark:border-[#27272D] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm opacity-60 gap-4">
      <span>© {new Date().getFullYear()} {name} · Personal Lined Jotter</span>
      <div className="flex items-center gap-4">
        <a href="mailto:eyimofepinnick@gmail.com" className="hover:opacity-100 transition-opacity">
          eyimofepinnick@gmail.com
        </a>
        <span>·</span>
        <a href="#hero-intro" className="hover:opacity-100 transition-opacity">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
