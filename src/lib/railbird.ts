// The railbird's seat — a console easter egg for whoever opens DevTools.
// Prints the program masthead once at idle, then leaves `race()` on the
// window: an announcer's call of the feature race, one line at a time, with
// the finish order wearing the real saddle-cloth colors from lib/silks.
//
// The race is theater — order is drawn from a seeded PRNG per run — and the
// outro says so out loud. The honest numbers stay on the tote board.
import { projects, railbird } from "../data/content"
import { silkFor } from "./silks"

// The field is the three feature races, in program order (post positions
// match the "order of finish" block in the footer).
const field = projects.filter((p) => p.featured)

// mulberry32 — a tiny, well-known 32-bit seeded PRNG. Seeded per race from
// the clock, so every call of race() runs a different trip; one seed per run
// keeps a single race internally consistent (replayable if you log the seed).
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Console styling — the site's palette, in %c form.
const CREAM = "#f7f1e3"
const INK = "#1f2a24"
const GREEN = "#175539"
const BRASS = "#a4802f"
const mast = `background:${INK};color:${CREAM};padding:3px 10px;font-family:monospace;letter-spacing:2px`
const rubric = `color:${GREEN};font-family:monospace`
const whisper = `color:${BRASS};font-family:monospace;font-style:italic`

// One line of the call, filled from the current running order.
function callLine(template: string, order: typeof field): string {
  return template
    .replace("{a}", order[0].title)
    .replace("{b}", order[1].title)
    .replace("{c}", order[2].title)
}

async function race(): Promise<void> {
  const rng = mulberry32(Date.now())

  // Running order starts as a fair shuffle (Fisher–Yates)…
  const order = [...field]
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }

  console.log(`%c${railbird.off}`, `color:${GREEN};font-weight:bold`)
  for (const segment of railbird.calls) {
    await sleep(700 + rng() * 600)
    // …and between calls the leaders trade places like a real pace duel:
    // one adjacent swap, likelier up front where the race is being run.
    if (rng() < 0.65) {
      const i = rng() < 0.7 ? 0 : 1
      ;[order[i], order[i + 1]] = [order[i + 1], order[i]]
    }
    console.log(`%c${callLine(segment, order)}`, rubric)
  }

  await sleep(900)
  console.log(`%c${railbird.photo}`, `background:${INK};color:${CREAM};padding:2px 8px;font-family:monospace`)
  await sleep(1200)

  console.log(`%c${railbird.official}`, `background:${GREEN};color:${CREAM};padding:2px 10px;font-family:monospace;letter-spacing:3px`)
  order.forEach((p, i) => {
    // Finish chips in true saddle-cloth colors, keyed to the horse's post
    // position in the field (not its finish position) — like the tote.
    const post = field.indexOf(p) + 1
    const silk = silkFor(post)
    const link = p.live ?? p.repo ?? "https://colelevy.dev"
    console.log(
      `%c ${post} %c ${i + 1}${["st", "nd", "rd"][i] ?? "th"} — ${p.title} · ${link}`,
      `background:${silk.bg};color:${silk.fg};font-family:monospace;font-weight:bold`,
      rubric,
    )
  })

  await sleep(400)
  console.log(`%c${railbird.outro}`, whisper)
}

declare global {
  interface Window {
    race?: () => Promise<void>
  }
}

let installed = false

// Prints the masthead once the main thread is idle and hangs race() on the
// window. Safe to call more than once; only the first call does anything.
export function installRailbird(): void {
  if (installed) return
  installed = true
  window.race = race

  const greet = () => {
    console.log(`%c${railbird.header}`, mast)
    console.log(`%c${railbird.sub}`, rubric)
    console.log(`%c${railbird.hint}`, whisper)
  }
  // Older Safari has no requestIdleCallback; a timeout is a fine idle proxy.
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(greet, { timeout: 4000 })
  } else {
    window.setTimeout(greet, 1500)
  }
}
