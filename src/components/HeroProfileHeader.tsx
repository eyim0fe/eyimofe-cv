import React from "react"
import { FileText, Mail, ArrowUpRight, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

interface HeroProfileHeaderProps {
  profile: {
    name: string
    title: string
    location: string
    avatar: string
    bio: {
      headline: string
      full: string[]
    }
    socials: { name: string; url: string }[]
  }
}

export const HeroProfileHeader: React.FC<HeroProfileHeaderProps> = ({
  profile
}) => {
  return (
    <header id="hero-intro" className="space-y-8 pt-4 border-b border-[#E5DFD4] dark:border-[#27272D] pb-10">
      {/* Brand Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="text-xs tracking-widest uppercase opacity-60 block mb-1">
            Personal Jotter · 2026
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">
            {profile.name}
          </h1>
          <p className="text-sm sm:text-base opacity-75 mt-1">
            {profile.title}
          </p>
        </div>
      </div>

      {/* Hero Bio Content */}
      <div className="pt-2 space-y-4 max-w-4xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal leading-snug">
          {profile.bio.headline}
        </h2>
        <div className="space-y-3 text-sm sm:text-base opacity-85 leading-relaxed">
          {profile.bio.full.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Location Meta Chip */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm opacity-80 pt-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-[#FAF7F0] dark:bg-[#1C1C22]">
            <MapPin className="w-3.5 h-3.5" /> {profile.location}
          </span>
        </div>

        {/* Social & Contact Direct Links */}
        <div className="pt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          {profile.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xs border border-[#D5CEC5] dark:border-[#38383E] bg-white dark:bg-[#1A1A1E] hover:bg-[#EFEAE0] dark:hover:bg-[#25252A] transition-colors shadow-2xs"
            >
              {s.name === "Resume" && <FileText className="w-3.5 h-3.5" />}
              {s.name === "GitHub" && <GithubIcon className="w-3.5 h-3.5" />}
              {s.name === "LinkedIn" && <LinkedinIcon className="w-3.5 h-3.5" />}
              {s.name === "Email" && <Mail className="w-3.5 h-3.5" />}
              <span>{s.name}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
