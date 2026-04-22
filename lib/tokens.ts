// Design tokens mirroring DESIGN.md. Source of truth remains the CSS variables
// declared in app/globals.css — these TS constants exist so TypeScript code
// can reference the same values without re-typing hex literals.

export const ink = {
  100: "var(--ink-100)",
  60: "var(--ink-60)",
  30: "var(--ink-30)",
} as const;

export const paper = {
  default: "var(--paper)",
  pure: "var(--paper-pure)",
} as const;

export const najeon = {
  teal: "var(--najeon-teal)",
  violet: "var(--najeon-violet)",
  amber: "var(--najeon-amber)",
} as const;

export const text = {
  xs: "var(--text-xs)",
  sm: "var(--text-sm)",
  base: "var(--text-base)",
  lg: "var(--text-lg)",
  xl: "var(--text-xl)",
  "2xl": "var(--text-2xl)",
  "3xl": "var(--text-3xl)",
  "4xl": "var(--text-4xl)",
  "5xl": "var(--text-5xl)",
} as const;

export const motion = {
  easeOut: "var(--ease-out)",
  easeInOut: "var(--ease-in-out)",
  durFast: "var(--dur-fast)",
  durBase: "var(--dur-base)",
  durSlow: "var(--dur-slow)",
  durHero: "var(--dur-hero)",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
