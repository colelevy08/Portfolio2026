// Saddle-cloth (post position) colors, as run at NYRA tracks: 1 red, 2 white,
// 3 royal blue, 4 yellow, 5 green, 6 black, 7 orange, 8 pink, 9 turquoise,
// 10 purple, 11 grey, 12 lime. Values are tuned slightly for legibility on
// the site's program-cream field — reds and greens run a shade deep so the
// white numbers clear WCAG AA. Post = 1-based position in the project list.
export type Silk = { bg: string; fg: string; edge?: string }

const SILKS: Silk[] = [
  { bg: "#c93a2e", fg: "#ffffff" }, // 1 — red (5.1:1 with white)
  { bg: "#ffffff", fg: "#1c1c1c", edge: "#c9bda0" }, // 2 — white (sand edge so it reads on cream)
  { bg: "#2f5fd0", fg: "#ffffff" }, // 3 — royal blue
  { bg: "#f2c53d", fg: "#1c1c1c" }, // 4 — yellow
  { bg: "#2a7f46", fg: "#ffffff" }, // 5 — green (5.0:1 with white)
  { bg: "#191919", fg: "#ffffff", edge: "#4a4a44" }, // 6 — black
  { bg: "#e8842c", fg: "#1c1c1c" }, // 7 — orange
  { bg: "#f094b8", fg: "#1c1c1c" }, // 8 — pink
  { bg: "#41bfc1", fg: "#1c1c1c" }, // 9 — turquoise
  { bg: "#7d4fc9", fg: "#ffffff" }, // 10 — purple
  { bg: "#9aa0a6", fg: "#1c1c1c" }, // 11 — grey
  { bg: "#b6d24b", fg: "#1c1c1c" }, // 12 — lime
]

// Posts past 12 (if the field ever grows) wrap around.
export const silkFor = (post: number): Silk =>
  SILKS[((post - 1) % SILKS.length + SILKS.length) % SILKS.length]

// Inline box-shadow override for a chip whose silk defines an edge ring:
// keeps the ring AND the saddle-cloth bottom lip the .silk class provides.
// Undefined lets the class's default keyline apply.
export const silkShadow = (s: Silk): string | undefined =>
  s.edge
    ? `inset 0 0 0 1px ${s.edge}, inset 0 -2px 0 rgba(0, 0, 0, 0.18)`
    : undefined
