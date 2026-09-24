/**
 * Motion & Animation Tokens
 *
 * Rule: Motion that eases like physics and settles.
 * Strictly NO bouncy or rubbery springs that overshoot their mark.
 */

export const MOTION_TOKENS = {
  // Easing curves
  easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  easePhysics: "cubic-bezier(0.16, 1, 0.3, 1)", // Quick start, graceful physical deceleration
  easeInOutSmooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeSnappy: "cubic-bezier(0.2, 0, 0, 1)",

  // Durations
  durations: {
    instant: "80ms",
    micro: "150ms",     // Hover states, button clicks, icon rotations
    standard: "240ms",  // Disclosures, accordion fold, tabs
    dramatic: "400ms",  // Page transitions, theme shifts
    ambient: "3000ms"   // Slow subtle pulse or celestial movement
  },

  // Transition shortcuts
  transitions: {
    micro: "all 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "all 240ms cubic-bezier(0.16, 1, 0.3, 1)",
    colors: "background-color 200ms ease, border-color 200ms ease, color 200ms ease"
  }
} as const
