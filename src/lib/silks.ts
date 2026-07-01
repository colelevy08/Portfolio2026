// Saddle-cloth (post position) colors, as run at NYRA tracks: 1 red, 2 white,
// 3 royal blue, 4 yellow, 5 green, 6 black, 7 orange, 8 pink, 9 turquoise,
// 10 purple, 11 grey, 12 lime. Values are tuned slightly for legibility on
// the site's track-green field. Post = 1-based position in the project list.
export type Silk = { bg: string; fg: string; edge?: string }

const SILKS: Silk[] = [
  { bg: "#d64438", fg: "#ffffff" }, // 1 — red
  { bg: "#ece5d3", fg: "#1c1c1c" }, // 2 — white
  { bg: "#2f5fd0", fg: "#ffffff" }, // 3 — royal blue
  { bg: "#f2c53d", fg: "#1c1c1c" }, // 4 — yellow
  { bg: "#3ba55d", fg: "#ffffff" }, // 5 — green
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
