import React from 'react'
import { ArrowUpRight, MapPin, Building2, Briefcase } from 'lucide-react'

interface CareerTimelineSectionProps {
  experience: {
    role: string
    company: string
    companyUrl?: string
    location?: string
    period: string
  }[]
}

export const CareerTimelineSection: React.FC<CareerTimelineSectionProps> = ({
  experience,
}) => {
  return (
    <section id="career-history" className="space-y-8">
      <div className="flex items-baseline justify-between border-b border-[#E5DFD4] dark:border-[#27272D] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight">
              02. Career
            </h2>
          </div>
        </div>
      </div>

      {/* Timeline List Container */}
      <div className="relative pl-6 sm:pl-10 space-y-8">
        {/* Continuous Vertical Connecting Spine Line */}
        <div className="absolute left-[9px] sm:left-[17px] top-3 bottom-3 w-[2px] bg-amber-700/35 dark:bg-amber-400/40 rounded-full pointer-events-none z-0" />

        {experience.map((exp, idx) => (
          <div key={`${exp.company}-${idx}`} className="relative group z-10">
            {/* Timeline Pin Node Dot */}
            <div className="absolute -left-[20px] sm:-left-[28px] top-5 w-3.5 h-3.5 rounded-full bg-amber-700 dark:bg-amber-400 border-2 border-[#FAF7F0] dark:border-[#141416] group-hover:scale-125 transition-transform shadow-xs z-10" />

            <div className="p-5 sm:p-6 rounded-xs border border-[#D5CEC5] dark:border-white/10 bg-white dark:bg-[#1E1E22] shadow-sm space-y-3">
              {/* Header: Company, Role & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD4] dark:border-[#27272D] pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-bold hover:underline inline-flex items-center gap-1 text-amber-900 dark:text-amber-300"
                    >
                      <span>{exp.company}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    <Briefcase className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                    <span>{exp.role}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs shrink-0">
                  <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300 font-medium">
                    <MapPin className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                    <span>{exp.location}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xs border border-[#D5CEC5] dark:border-white/15 bg-[#FAF7F0] dark:bg-[#25252B] font-semibold text-amber-900 dark:text-amber-300">
                    {exp.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
