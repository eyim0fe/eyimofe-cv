/**
 * Design System Typography Tokens
 *
 * Distinct font personalities configured for each direction:
 * - Variant 1 (Field Notebook): "BIZ UDPMincho", "BIZ UDPMincho Fallback", serif (As requested)
 * - Variant 2 (Navy Artisan): Plus Jakarta Sans & Space Grotesk
 * - Variant 3 (Forest Sanctuary): Fraunces (warm optical serif) & Plus Jakarta Sans
 * - Variant 4 (PM Studio): JetBrains Mono & Caveat (handwritten sticky note scribbles)
 * - Variant 5 (Swiss Monolith): Plus Jakarta Sans & Instrument Serif italic touches
 */

export const FONT_FAMILIES = {
  // Variant 1: Dedicated BIZ UDPMincho as requested
  notebook: {
    primary: '"BIZ UDPMincho", "BIZ UDPMincho Fallback", Georgia, serif',
    serif: '"Newsreader", serif',
    handwritten: '"Caveat", cursive',
    mono: '"JetBrains Mono", monospace'
  },
  // Variant 2: Precision Navy
  navy: {
    primary: '"Plus Jakarta Sans", sans-serif',
    display: '"Space Grotesk", sans-serif',
    mono: '"JetBrains Mono", monospace'
  },
  // Variant 3: Biophilic Forest
  forest: {
    primary: '"Plus Jakarta Sans", sans-serif',
    serif: '"Fraunces", serif',
    mono: '"JetBrains Mono", monospace'
  },
  // Variant 4: PM Drafting Studio
  studio: {
    primary: '"Plus Jakarta Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
    handwritten: '"Caveat", cursive'
  },
  // Variant 5: Swiss / ana.sh High-density
  swiss: {
    primary: '"Plus Jakarta Sans", sans-serif',
    serif: '"Instrument Serif", serif',
    mono: '"JetBrains Mono", monospace'
  }
} as const

export const TYPE_SCALE = {
  // Display Hero
  display: {
    size: "clamp(2rem, 4vw + 1rem, 3.25rem)",
    lineHeight: "1.15",
    letterSpacing: "-0.03em",
    weight: "700"
  },
  // Section Headings (h1)
  h1: {
    size: "clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)",
    lineHeight: "1.25",
    letterSpacing: "-0.025em",
    weight: "600"
  },
  // Subsection Headings (h2)
  h2: {
    size: "clamp(1.15rem, 1.5vw + 0.25rem, 1.5rem)",
    lineHeight: "1.35",
    letterSpacing: "-0.015em",
    weight: "600"
  },
  // Card / Item Headings (h3)
  h3: {
    size: "1.125rem",
    lineHeight: "1.4",
    letterSpacing: "-0.01em",
    weight: "500"
  },
  // Body Large (Bio, Lead paragraphs)
  bodyLg: {
    size: "1.0625rem",
    lineHeight: "1.6",
    letterSpacing: "-0.01em",
    weight: "400"
  },
  // Standard Body
  body: {
    size: "0.9375rem",
    lineHeight: "1.65",
    letterSpacing: "-0.005em",
    weight: "400"
  },
  // Secondary / Caption / Meta
  caption: {
    size: "0.8125rem",
    lineHeight: "1.5",
    letterSpacing: "0.01em",
    weight: "500"
  },
  // Code / Specs / Micro
  micro: {
    size: "0.75rem",
    lineHeight: "1.4",
    letterSpacing: "0.04em",
    weight: "600"
  }
} as const
