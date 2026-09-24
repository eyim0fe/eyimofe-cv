/**
 * Strict 8pt Grid Spacing System
 * Based on base unit of 8px (0.5rem) with half-step 4px (0.25rem) for micro-adjustments.
 */

export const SPACING_TOKENS = {
  0: "0px",
  1: "4px",   // 0.5 * 8pt (Micro padding, icon offsets)
  2: "8px",   // 1 * 8pt (Base unit, gap between tags)
  3: "12px",  // 1.5 * 8pt (Compact button padding)
  4: "16px",  // 2 * 8pt (Standard container padding)
  5: "20px",  // 2.5 * 8pt
  6: "24px",  // 3 * 8pt (Card padding, item spacing)
  8: "32px",  // 4 * 8pt (Section component spacing)
  10: "40px", // 5 * 8pt
  12: "48px", // 6 * 8pt (Major block spacing)
  16: "64px", // 8 * 8pt (Section margins)
  20: "80px", // 10 * 8pt
  24: "96px", // 12 * 8pt (Page hero margins)
  32: "128px" // 16 * 8pt (Large editorial breathing room)
} as const

export const GRID_CONFIG = {
  baseUnit: 8,
  containerMaxWidth: "1080px",
  containerEditorialWidth: "768px",
  dossierSidebarWidth: "340px",
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  }
} as const
