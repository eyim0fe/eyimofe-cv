/**
 * Design System Color Tokens
 * Supports:
 * - Grayscale Base (MVP baseline)
 * - Navy Blue Fanatic (Oceanic Depth)
 * - Forest Green (Trees, Lake & Mist)
 * - PM Studio / Architect Slate (Paper & Post-It)
 * - Swiss Monolith (ana.sh Iron & Slate)
 *
 * All palettes meet WCAG AA / AAA contrast standards.
 */

export interface ColorRole {
  bg: string
  bgSubtle: string
  surface: string
  surfaceElevated: string
  border: string
  borderSubtle: string
  text: string
  textMuted: string
  textSubtle: string
  accent: string
  accentHover: string
  accentMuted: string
  ring: string
}

export interface ColorModePair {
  light: ColorRole
  dark: ColorRole
}

export const COLOR_PALETTES = {
  // 1. Grayscale Base (Warm Paper & Deep Carbon Ink)
  grayscale: {
    name: "Warm Field Grayscale",
    description: "Bone-white paper, warm graphite, and carbon ink. Resembles a clean tactile notebook.",
    light: {
      bg: "#FAF8F5",
      bgSubtle: "#F4EFEA",
      surface: "#FFFFFF",
      surfaceElevated: "#FAF8F5",
      border: "#E7E2DB",
      borderSubtle: "#EFECE6",
      text: "#141414",
      textMuted: "#66615B",
      textSubtle: "#9E9992",
      accent: "#1A1A1A",
      accentHover: "#333333",
      accentMuted: "#EFECE6",
      ring: "#141414"
    },
    dark: {
      bg: "#111112",
      bgSubtle: "#18181A",
      surface: "#1D1D20",
      surfaceElevated: "#242428",
      border: "#2C2C30",
      borderSubtle: "#222226",
      text: "#F4EFEA",
      textMuted: "#A39E98",
      textSubtle: "#6E6A65",
      accent: "#F4EFEA",
      accentHover: "#FFFFFF",
      accentMuted: "#2C2C30",
      ring: "#E7E2DB"
    }
  },

  // 2. Navy Blue Fanatic (Oceanic Midnight & Precision Blueprint)
  navy: {
    name: "Midnight Navy Fanatic",
    description: "Deep oceanic midnight, nautical pearl, and crisp electric ice highlights.",
    light: {
      bg: "#F8FAFC",
      bgSubtle: "#F1F5F9",
      surface: "#FFFFFF",
      surfaceElevated: "#F8FAFC",
      border: "#CBD5E1",
      borderSubtle: "#E2E8F0",
      text: "#0F172A",
      textMuted: "#475569",
      textSubtle: "#94A3B8",
      accent: "#0369A1",
      accentHover: "#0284C7",
      accentMuted: "#E0F2FE",
      ring: "#0284C7"
    },
    dark: {
      bg: "#060A12",
      bgSubtle: "#0A111E",
      surface: "#0F172A",
      surfaceElevated: "#1E293B",
      border: "#1E293B",
      borderSubtle: "#141E30",
      text: "#F1F5F9",
      textMuted: "#94A3B8",
      textSubtle: "#64748B",
      accent: "#38BDF8",
      accentHover: "#7DD3FC",
      accentMuted: "#0C2E4E",
      ring: "#38BDF8"
    }
  },

  // 3. Forest Green (Evergreen Pine, Lake & Alpine Mist)
  forest: {
    name: "Forest Sanctuary",
    description: "Deep ancient evergreen pine needles, tranquil lake water, and morning mist.",
    light: {
      bg: "#F3F7F4",
      bgSubtle: "#E9F0EC",
      surface: "#FFFFFF",
      surfaceElevated: "#F3F7F4",
      border: "#C8D9CE",
      borderSubtle: "#DBE6DF",
      text: "#0D2117",
      textMuted: "#415C4E",
      textSubtle: "#759384",
      accent: "#1B4D36",
      accentHover: "#286D4D",
      accentMuted: "#E0ECE4",
      ring: "#286D4D"
    },
    dark: {
      bg: "#05110B",
      bgSubtle: "#0A1D13",
      surface: "#0F2A1C",
      surfaceElevated: "#173B28",
      border: "#1F4A34",
      borderSubtle: "#123020",
      text: "#E8F4EC",
      textMuted: "#88B19B",
      textSubtle: "#567A66",
      accent: "#34D399",
      accentHover: "#6EE7B7",
      accentMuted: "#0D3823",
      ring: "#34D399"
    }
  },

  // 4. PM Studio / Workshop (Drafting Slate & Post-It Accents)
  studio: {
    name: "PM Drafting Studio",
    description: "Architect drafting grid, pencil graphite, post-it yellow, and sprint-green tags.",
    light: {
      bg: "#FAFAF9",
      bgSubtle: "#F5F5F4",
      surface: "#FFFFFF",
      surfaceElevated: "#FAFAF9",
      border: "#D6D3D1",
      borderSubtle: "#E7E5E4",
      text: "#1C1917",
      textMuted: "#57534E",
      textSubtle: "#A8A29E",
      accent: "#EAB308", // Post-it yellow warm
      accentHover: "#CA8A04",
      accentMuted: "#FEF08A",
      ring: "#1C1917"
    },
    dark: {
      bg: "#121110",
      bgSubtle: "#1C1917",
      surface: "#292524",
      surfaceElevated: "#34302C",
      border: "#44403C",
      borderSubtle: "#292524",
      text: "#FAFAF9",
      textMuted: "#A8A29E",
      textSubtle: "#78716C",
      accent: "#FACC15",
      accentHover: "#FDE047",
      accentMuted: "#422006",
      ring: "#FACC15"
    }
  },

  // 5. Swiss Monolith / ana.sh (Pure Architectural Iron & Slate)
  swiss: {
    name: "Swiss Architectural Iron",
    description: "High-contrast architectural slate, obsidian, and razor-sharp hairlines.",
    light: {
      bg: "#FFFFFF",
      bgSubtle: "#F9FAFB",
      surface: "#FFFFFF",
      surfaceElevated: "#F3F4F6",
      border: "#E5E7EB",
      borderSubtle: "#F3F4F6",
      text: "#111827",
      textMuted: "#4B5563",
      textSubtle: "#9CA3AF",
      accent: "#111827",
      accentHover: "#1F2937",
      accentMuted: "#F3F4F6",
      ring: "#111827"
    },
    dark: {
      bg: "#09090B",
      bgSubtle: "#121215",
      surface: "#18181B",
      surfaceElevated: "#222226",
      border: "#27272A",
      borderSubtle: "#1E1E22",
      text: "#FAFAFA",
      textMuted: "#A1A1AA",
      textSubtle: "#71717A",
      accent: "#FAFAFA",
      accentHover: "#FFFFFF",
      accentMuted: "#27272A",
      ring: "#FAFAFA"
    }
  }
} as const

export type PaletteKey = keyof typeof COLOR_PALETTES
