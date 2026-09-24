/**
 * Elevation & Border Radius Tokens
 *
 * Guardrail: Avoid "rounded-everything" bubbly friendliness.
 * Use crisp, deliberate radii and architectural hairline borders.
 */

export const BORDER_RADIUS = {
  none: "0px",
  xs: "2px",    // Sharp technical tags, indicators
  sm: "4px",    // Small buttons, badges
  md: "6px",    // Standard input fields, cards
  lg: "8px",    // Contained surfaces
  xl: "12px",   // Modal / drawer dialogs
  pill: "9999px" // Status badges, theme toggles only
} as const

export const ELEVATION_TOKENS = {
  none: "none",
  // Crisp hairline border + micro shadow (not blurry SaaS glow)
  hairline: "0 0 0 1px var(--color-border)",
  low: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  medium: "0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
  high: "0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.04)",
  // Physical paper tactile elevation
  paper: "0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px -6px rgba(0, 0, 0, 0.06)",
  // Sticky note shadow
  stickyNote: "2px 4px 12px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)"
} as const
