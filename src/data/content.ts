// The PDF résumé lives in assets and is bundled by Vite. Importing it here
// gives every component one canonical, hashed URL to link to.
import resumePdf from "../assets/ColeLevyResume.pdf"

export const profile = {
  name: "Cole Levy",
  initials: "CL",
  title: "Full-stack & AI engineer",
  tagline:
    "Full-stack developer shipping products, trading systems, and client sites from Saratoga Springs, NY.",
  available: "Available for client work · est. 2023",
  email: "colelevy08@gmail.com",
  phone: "+15184104999",
  phoneDisplay: "(518) 410-4999",
  location: "Saratoga Springs, NY",
  formspreeId: "xeoeyajg",
  // Canonical résumé URL — bundled & hashed by Vite from src/assets.
  resumeUrl: resumePdf,
  credlyBadge:
    "https://www.credly.com/badges/42dcfd6d-fe00-422c-a891-780fb40feaa5/public_url",
  socials: {
    linkedin: "https://www.linkedin.com/in/colelevy",
    github: "https://github.com/colelevy08",
    whatsapp: "https://api.whatsapp.com/send/?phone=15184104999&text=Hello+Cole",
    telegram: "https://t.me/colelevy",
  },
}

// The one number the whole site rests on: handAIcapper's Brier score against
// the track's own morning line. It appears in the hero board, the featured
// card, the tack room, and the photo-finish section — every one of those spots
// interpolates THESE values, so the snapshot is refreshed in a single place.
// Lower is better; the margin is one thousandth of a point and recalibrates
// nightly, which is why the date ships with the figures.
export const brier = {
  model: ".777",
  line: ".778",
  races: "1,100+",
  asOf: "July 2026",
  record: "https://handaicapper.com/record",
}

// Hero copy. Lives here (not hardcoded in Hero.tsx) so all site copy stays in
// one typed file — the headline renders as three lines with an accent-italic
// middle clause.
export const hero = {
  // NBSPs keep "Saratoga Springs, NY" and "Vol. 2026" from splitting at
  // mobile widths — wraps land on the interpuncts, never inside a token.
  eyebrow: "The summer meet · Saratoga Springs, NY · Vol. 2026",
  // The serif line that runs under the big display name.
  subline:
    "Full-stack & AI engineer. Products, trading systems, and the web layer real businesses run on.",
  status: "Now building Portmint — a self-serve platform for branded AI assistants.",
  // The tote board: label + value pairs, rendered as bulb-lit board cells.
  // Every figure here must be independently checkable — that's the OFFICIAL
  // rule — so each cell links to its proof: `to` jumps to the spot on the
  // page where the number is backed up (featured posts carry #post-N ids).
  board: [
    { label: "Projects shipped", value: "15+", to: "#featured" },
    { label: "Client retainers", value: "3", to: "#work" },
    // "Lower wins" does the work a Brier score can't do for itself — and the
    // cell jumps to the photo-finish print, which shows the margin instead of
    // asserting it.
    { label: "Brier — lower wins", value: brier.model, to: "#photo" },
    { label: "Kalshi bot running", value: "24/7", to: "#post-3" },
  ],
  // The stewards' line under the board — the motif's one global statement.
  official:
    "Results official — every figure on this board is checkable on this page.",
  ctaPrimary: { label: "See the work", to: "#featured" },
  ctaResume: { label: "Résumé", to: profile.resumeUrl },
}

// Small interface strings that aren't section copy but still must live here —
// all site text stays in this one typed file.
export const ui = {
  skipToContent: "Skip to content",
  // Flashes on the header rail the moment the horse (scroll) reaches the wire.
  photoFinish: "Photo finish",
  // The bugle button on the tote board (accessible name — the button is icon-only).
  callToPost: "Sound the call to the post",
  // Lights up beside the board title while the call plays.
  postTime: "Post time",
  // Printed above the field. A morning line is the track handicapper's own
  // forecast of betting interest — so this one has to disclose the obvious
  // conflict: the handicapper setting it is also one of the entries.
  morningLine:
    "The morning line is my forecast of interest, not a grade — and I set it while standing in the field, which is exactly the conflict a program is supposed to print. Short prices ship today and are checkable now; long prices are early. Every one of them is clickable.",
  // Accessible names for the program pencil. {title} is the entry's name.
  markEntry: "Mark {title} on your program",
  eraseEntry: "Erase your mark on {title}",
}

// The railbird's console easter egg — everything printed to DevTools lives
// here. The race call is theater and says so; the honest numbers stay on the
// tote board upstairs.
export const railbird = {
  header: "SARATOGA · THE OFFICIAL PROGRAM · COLELEVY.DEV",
  sub: "You found the railbird's seat.",
  hint: "Type race() to call the ninth — the feature race.",
  off: "🏇 And they're off at Saratoga!",
  // Announcer segments in running order. {a} {b} {c} are the current
  // 1st/2nd/3rd as the simulated field sorts itself out.
  calls: [
    "{a} breaks on top, {b} right there, {c} settles just off the pace…",
    "Into the clubhouse turn — {a} by a length, {b} saving ground on the rail…",
    "Down the backstretch, {b} is rolling on the outside, {a} digs in…",
    "They turn for home — {a} and {b} head and head at the eighth pole…",
    "Inside the sixteenth… down to the wire…",
  ],
  photo: "▚▚ PHOTO FINISH ▚▚",
  official: "OFFICIAL",
  outro:
    "The race call is theater. The numbers on the board upstairs are real — every one is checkable on the page.",
}

// "The stewards have the photo" — the site owns a photo-finish motif in five
// places and has exactly one genuine photo finish in its content: Brier .777
// against the morning line's .778. This section is that print. Because a Brier
// score is a number where LOWER wins, .777 reads like a loss to anyone who
// doesn't already know; seeing the nose in front settles it without a sentence
// of explanation.
export const thePhoto = {
  eyebrow: "The stewards have the photo",
  headline: "A nose.",
  intro: `The morning line is the track's own published forecast — a professional handicapper, paid, working from the same charts I have. Over ${brier.races} graded races my model scored ${brier.model} against his ${brier.line}. Lower wins. One thousandth of a point is the kind of margin they develop the photo for, and it is the whole difference between having an opinion about horses and having a record.`,
  scrubLabel: "Develop the photo",
  slug: "Saratoga · Wire cam",
  // The chart under the print. Post 1 is handAIcapper's own saddle cloth;
  // post 11 (grey) stands in for the track's line.
  result: [
    { place: "1", post: 1, name: "handAIcapper", figure: `Brier ${brier.model}` },
    { place: "2", post: 11, name: "The morning line", figure: `Brier ${brier.line}` },
  ],
  margin: `Margin: a nose (.001). ${brier.races} graded races, scored on official result charts.`,
  proof: { label: "See the graded record", href: brier.record },
  // Announced to screen readers as the frame slider moves; also the visible
  // corner slug's source of truth.
  frameText: (f: number, total: number) =>
    `Frame ${f} of ${total} — ${
      f === 0
        ? "undeveloped"
        : f < total
          ? "noses approaching the wire"
          : "at the wire, post 1 by a nose"
    }`,
  // The lamp beside the chart: the stewards' sign goes up at the last frame.
  lampPhoto: "Photo",
  lampOfficial: "Official",
}

// The footer's program-card block — what the pencil marks add up to.
export const footerCard = {
  yourCard: "Your card",
  marked: "marked",
  freshProgram: "Fresh program",
  orderOfFinish: "Order of finish",
  pencil:
    "Circle an entry anywhere above and it comes down here, in the order you called it. Pencil marks last for this visit only — nothing is stored, nothing leaves your browser.",
  // The one line of invitation for the site's two best-hidden things.
  invitation:
    "The bugle on the board upstairs plays the real First Call; there is a seat for railbirds in the console, if you have one open.",
}

// The contact form's success state — a punched pari-mutuel win ticket.
export const contactSuccess = {
  header: "Saratoga · The summer meet · Official ticket",
  headline: "Ticket punched.",
  body: "Message received — I'll get back to you shortly, usually the same day.",
  footer: "Win · Race 2026 · Post anytime",
}

// Saratoga Springs' real town motto — set as a program rubric in About (where
// each word is pressable and glosses itself) and again in the footer, where
// only the three words are printed. One clause of provenance turns a
// decorative rubric into a fact.
export const motto = {
  provenance: "Saratoga Springs' town motto, printed on the city seal.",
  words: [
    {
      word: "Health",
      gloss:
        "the mineral springs the town was built to sell — and the restaurant floor I still work, which is where I learned that a system beats hustle.",
    },
    {
      word: "History",
      gloss:
        "the meet has run here since 1863 — and I read Communication at Geneseo, the Sorbonne, and Sciences Po before I ever read a stack trace.",
    },
    {
      word: "Horses",
      gloss:
        "the reason this program exists — and the reason I pointed a model at every track in the world to see whether it could beat the morning line.",
    },
  ],
}

export const aboutParagraphs = [
  "I build the web layer for small businesses that need to look serious on day one — restaurants, insurance practices, members clubs. Three of those are on retainer right now.",
  "Before the bootcamp at Flatiron School (2023) I studied Communication at SUNY Geneseo, with semesters at La Sorbonne and Sciences Po. The communication degree is why my interfaces read clearly; the dev work is what makes them ship.",
  "When I'm off the client clock I write trading bots against prediction markets, point a handicapping model at every horse track in the world, and run kitchens. I assistant-manage Standard Fare — a restaurant I helped open in 2025, whose website is post 5 on this page.",
]

export type ProjectCategory =
  | "Product"
  | "Quant & trading"
  | "Client retainer"
  | "Tooling"
  | "Open source"

// A featured project can carry its product's brand so its case-study card
// renders an on-brand visual plate instead of a generic placeholder.
export type ProjectBrand = {
  tagline: string
  accent: string // primary brand color (hex)
  bg: string // plate background (hex)
  gradient?: string // optional CSS gradient for the wordmark
  wordmarkFont?: "sans" | "serif"
  // Which mark the plate draws above the wordmark. Defaults to the quant
  // candlesticks; "none" for products where that motif would mislead.
  mark?: "quant" | "none"
}

export type Project = {
  slug: string
  title: string
  // `kind` is the legacy badge label (kept for backward-compat); `category`
  // is the new grouping used for featured/grid logic and filtering.
  kind: "Client retainer" | "Open source" | "Personal"
  category: ProjectCategory
  year: string
  // Morning line — my own forecast of interest in each entry, not a grade.
  // Short prices ship and are checkable today; long prices are early. Both
  // fields are REQUIRED so no entry can join the field without a price.
  odds: string
  // The handicapper's one-clause comment, printed under the price.
  line: string
  blurb: string
  description: string
  repo?: string
  isPrivate?: boolean
  live?: string
  tags: string[]
  // Featured projects render as large case-study cards above the grid.
  featured?: boolean
  brand?: ProjectBrand
  // A one-line proof point pulled out of the description and set as a
  // highlighted program notice on the featured card (e.g. "try it live").
  callout?: string
  // "Steward's notes" — the architecture/risk story in 3-4 short mono
  // bullets, rendered on featured cards only.
  steward?: string[]
  // The OFFICIAL rail — independently checkable links a skeptic can click
  // to verify the card's claims (public repos, live scoreboards, products).
  proof?: ProofLink[]
}

export type ProofLink = { label: string; href: string }

export const projects: Project[] = [
  {
    slug: "handaicapper",
    title: "handAIcapper",
    kind: "Personal",
    category: "Quant & trading",
    year: "2025",
    odds: "6-5",
    line: `Favorite. A nose in front of the track's own line over ${brier.races} graded races.`,
    featured: true,
    blurb:
      "The magnum opus — a quantitative handicapping engine covering every horse track in the world, running with its nose in front of the track's own morning line.",
    description: `A PWA + FastAPI backend that ingests entries, odds, and result charts worldwide, ranks every field first to last, and stores every prediction for grading. On the graded record the model's Brier score is ${brier.model} to the morning line's ${brier.line} (lower is better) — a photo-finish margin over the benchmark the tracks themselves publish, and improving with nightly recalibration. Kelly-fraction stake sizing and AI pace-and-trip analysis ride on top. The hometown project: born at the Saratoga track.`,
    callout: `Every pick is graded — the track record at handaicapper.com/record scores the model against the morning line on official charts. Brier ${brier.model} vs ${brier.line} as of ${brier.asOf}.`,
    steward: [
      `Nose in front of the morning line — Brier ${brier.model} vs ${brier.line} (${brier.asOf})`,
      "Every field ranked first to last; predictions stored in full",
      "Graded against official result charts, not self-reported",
      `${brier.races} graded races on the record; nightly recalibration`,
    ],
    proof: [
      { label: "Track record (free account)", href: "https://handaicapper.com/record" },
    ],
    isPrivate: true,
    live: "https://handaicapper.com",
    tags: ["React", "Vite", "FastAPI", "Claude AI"],
    // handAIcapper runs in the site's own colors — awning red on infield
    // green, the Saratoga project wearing the Saratoga silks.
    brand: {
      tagline: "The program, computed.",
      accent: "#c03428",
      bg: "#0b1d15",
      wordmarkFont: "serif",
    },
  },
  {
    slug: "portmint",
    title: "Portmint",
    kind: "Personal",
    category: "Product",
    year: "2026",
    odds: "5-2",
    line: "Provisions itself end to end. No human in the loop, no redeploy.",
    featured: true,
    blurb:
      "The venture — a self-serve platform that lets any business build, brand, and deploy its own AI assistant in minutes, no code required.",
    description:
      "Self-serve SaaS: enter your website and get a live, branded AI assistant in about a minute. Built so a subscription provisions itself end to end — tier selected, assistant built, deployed — no human in the loop, no redeploy. Auto-install flows for Shopify, WordPress, Wix, Squarespace, and Webflow, a WordPress plugin, Square subscription tiers, and a self-serve CRM for captured leads. React + serverless front of house; a Python/FastAPI platform builds least-privilege integrations into real business systems behind it.",
    callout:
      "Try it live — the assistant in the corner of this page is a Portmint deployment. Open it and ask about my work.",
    steward: [
      "Subscribe → provision → deploy: no human in the loop, no redeploy",
      "Self-serve tiers at $49 / $149 / $249 monthly",
      "Least-privilege integration builder on Python/FastAPI",
    ],
    proof: [{ label: "Live product", href: "https://portmint.com" }],
    live: "https://portmint.com",
    isPrivate: true,
    tags: ["React", "TypeScript", "Python", "FastAPI", "Square", "Vercel"],
    // Portmint's real brand: mint primary, mint→sky gradient, deep-ocean bg.
    brand: {
      tagline: "Your business's own AI.",
      accent: "#34e0b3",
      bg: "#06090f",
      gradient: "linear-gradient(115deg, #5cf0c4, #34e0b3 45%, #0ea5e9)",
      wordmarkFont: "sans",
    },
  },
  {
    slug: "fablekalshi",
    title: "FableKalshi",
    kind: "Personal",
    category: "Quant & trading",
    year: "2026",
    odds: "7-2",
    line: "Real money, nine kill switches. Passes far more races than it bets.",
    featured: true,
    blurb:
      "A multi-strategy quant platform trading Kalshi crypto-binary markets — shadow trading, regime detection, fractional-Kelly sizing, and hard kill switches.",
    description:
      "An async Python system trading Kalshi's 15-minute and hourly crypto-binary markets. Four strategies plus an ensemble run in parallel; every candidate shadow-trades until it clears promotion thresholds, and every order passes fee- and slippage-aware EV math with fractional-Kelly sizing. Kill switches halt entries on drawdown, loss streaks, stale data, or reject spikes.",
    callout:
      "The fee/EV/Kelly core it trades under is open source — kalshi-edge, the linked repo.",
    steward: [
      "Every order gated by fee- and slippage-aware EV math",
      "Fractional-Kelly sizing; strategies shadow-trade until promoted",
      "Nine hard kill switches — drawdown, loss streaks, stale data, reject spikes",
      "Every decision logged for bit-for-bit replay",
    ],
    proof: [
      {
        label: "kalshi-edge — the open-source core (MIT, tested)",
        href: "https://github.com/colelevy08/kalshi-edge",
      },
    ],
    isPrivate: true,
    repo: "https://github.com/colelevy08/kalshi-edge",
    tags: ["Python", "asyncio", "WebSockets", "SQLite"],
    // FableKalshi has no public brand — give it a quant-themed visual in the
    // portfolio's own tote-amber accent so the card reads intentional, not empty.
    brand: {
      tagline: "Automated quant trading on Kalshi.",
      accent: "#f0a63d",
      bg: "#091a12",
      wordmarkFont: "serif",
    },
  },
  {
    slug: "bocage-society",
    title: "Bocage Champagne Society",
    kind: "Client retainer",
    category: "Client retainer",
    year: "2026",
    odds: "8-1",
    line: "Three platforms off one codebase. Runs back every month.",
    blurb:
      "Members app + Admin CRM for a private champagne society — one React + Capacitor codebase built for iOS, Android, and the web.",
    description:
      "Capacitor-wrapped React + Vite app with a Supabase backend. Membership, RSVPs, ticketing, and a back-office CRM for the owner. The companion to the public-facing Bocage marketing site.",
    isPrivate: true,
    live: "https://bocage-champagne-society.vercel.app",
    tags: ["React", "Vite", "Capacitor", "Supabase"],
  },
  {
    slug: "standard-fare",
    title: "Standard Fare",
    kind: "Client retainer",
    category: "Client retainer",
    year: "2025",
    odds: "8-1",
    line: "Built the site in 2025. Manages the floor now.",
    blurb:
      "Marketing site for the Saratoga Springs restaurant I helped open — brunch, dinner, craft cocktails, in-house art gallery.",
    description:
      "Creative-American dining at 21 Phila St. Reservation flow, ticketed event listings, menu CMS, and a gallery rotation page. I helped launch the kitchen and I built the site.",
    isPrivate: true,
    live: "https://standardfaresaratoga.com",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "bocage",
    title: "Bocage",
    kind: "Client retainer",
    category: "Client retainer",
    year: "2025",
    odds: "10-1",
    line: "Twenty seats to fill, and a reservation flow that has to hold all of them.",
    blurb:
      "Saratoga Springs' first champagne bar — a 20-seat room for sparkling wines, caviar, and charcuterie. I built the room's entire web presence: reservations, wine list, event calendar.",
    description:
      "Marketing site for a new champagne-and-caviar concept. Reservation flow, wine list, event calendar. Shares a Supabase backend with the members app.",
    isPrivate: true,
    live: "https://bocagechampagnebar.com",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "legacy-path-planners",
    title: "Legacy Path Planners",
    kind: "Client retainer",
    category: "Client retainer",
    year: "2025",
    odds: "10-1",
    line: "Family stable — Norm Levy's practice. Same surname, first client.",
    blurb:
      "Independent long-term-care insurance practice helping Florida families protect retirement savings. I built the site and the CRM the practice runs on.",
    description:
      "Lead-gen site and back-office CRM for Norm Levy's LTC insurance practice. Quote intake, agent workflow, calendar booking. Built to read trustworthy in a regulated industry.",
    isPrivate: true,
    live: "https://www.legacypathplanners.com/",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "polybot",
    title: "PolyBot",
    kind: "Open source",
    category: "Quant & trading",
    year: "2026",
    odds: "12-1",
    line: "Copies the wallets that win, under a hard bankroll cap. Copying is not conviction.",
    blurb:
      "High-speed Polymarket copy-trading bot — whale identification, edge-verified Kelly sizing, WebSocket execution.",
    description:
      "Python async pipeline that identifies profitable wallets on Polymarket, verifies edge against current order books, and copies positions Kelly-sized to the operator's bankroll. Built for real-money copy-trading under hard bankroll caps.",
    repo: "https://github.com/colelevy08/PolyBot",
    tags: ["Python", "asyncio", "WebSockets", "Trading"],
  },
  {
    slug: "groovestack",
    title: "GrooveStack",
    kind: "Open source",
    category: "Open source",
    year: "2025",
    odds: "15-1",
    line: "The maiden win. Capstone-scale, and still up.",
    blurb:
      "Collect, trade, verify, and discover vinyl records with a global community of crate diggers.",
    description:
      "Full-stack social app for vinyl collectors. Catalog with discogs-style records, peer-to-peer trade requests, condition verification, and a discovery feed. My capstone-scale JS project.",
    repo: "https://github.com/colelevy08/groovestack",
    live: "https://groovestack.vercel.app",
    tags: ["React", "Node", "Vercel"],
  },
  {
    slug: "portmint-pulse",
    title: "Portmint Pulse",
    kind: "Open source",
    category: "Tooling",
    year: "2026",
    odds: "12-1",
    line: "How I know what this page cost to build.",
    blurb:
      "A private, local-first dashboard for Claude Code usage — live rate limits, token & cost trends, per-model and per-project breakdowns. Zero config, no telemetry.",
    description:
      "Cross-platform Python (stdlib only — no build, no cloud) dashboard that reads local Claude Code stats and the live rate-limit API to chart daily/weekly/lifetime token and cost usage, leverage ratio, and per-model/per-project splits across any window from a day to five years.",
    repo: "https://github.com/colelevy08/portmint-pulse",
    live: "https://colelevy08.github.io/portmint-pulse/",
    tags: ["Python", "CLI", "Observability"],
  },
  {
    slug: "openprofile",
    title: "OpenProfile",
    kind: "Personal",
    category: "Product",
    year: "2026",
    odds: "20-1",
    line: "First-time starter. Nothing to show yet that would be honest.",
    blurb:
      "A directory and AI-powered sync engine for the sovereign web — personal sites keep their own domains while an AI watches for changes and drafts micro-posts.",
    description:
      "In progress. Sites verify domain ownership, an AI engine diffs their content and auto-drafts micro-posts to a feed behind an approval queue, and approved posts can sync back to the owner's repo or webhook. Next.js + shadcn/ui front end with a Python/FastAPI indexer on Supabase.",
    isPrivate: true,
    tags: ["Next.js", "TypeScript", "FastAPI", "Supabase"],
    // No screenshot yet (in progress) — a branded plate keeps the grid's
    // win-photo rhythm instead of a bare text box.
    brand: {
      tagline: "The sovereign web, indexed.",
      accent: "#2f5fd0",
      bg: "#0a1120",
      wordmarkFont: "sans",
      mark: "none",
    },
  },
]

// Client testimonials. REAL QUOTES ONLY — this section renders nothing while
// the array is empty, and no placeholder/invented quote may ever ship. Add a
// quote only with the client's permission, verbatim or lightly trimmed.
//
// THE ASK (send to each retainer client, then paste their reply verbatim):
//   "Could you give me one or two sentences on what it's like working with
//    me, for my portfolio site (colelevy.dev)? I'll quote you verbatim with
//    your name and role — happy to show you the section before it goes up."
//
// Then add, e.g.:
//   {
//     quote: "…their exact words…",
//     name: "First Last",
//     role: "Owner, Standard Fare",
//     project: "standard-fare",
//   }
// The section (with its silk chip + card styling) un-gates automatically.
export type Testimonial = {
  quote: string
  name: string
  role: string // e.g. "Owner, Bocage Champagne Bar"
  project: string // slug of the related project, for the silk chip
}

export const testimonials: Testimonial[] = []

export type PathEvent = {
  kind: "Work" | "Education"
  title: string
  location: string
  date: string
  sortYear: number
  description: string
  // The chart comment — the one clipped clause a form guide prints under a
  // running line. Optional on purpose: a start with nothing true to say gets
  // none. Uniform comments on every line are worse than none at all.
  comment?: string
}

export const path: PathEvent[] = [
  {
    kind: "Work",
    title: "Assistant Manager",
    location: "Standard Fare · Saratoga Springs, NY",
    date: "Jul 2025 — present",
    sortYear: 2025.7,
    description:
      "Helped launch the Standard Fare location. Managed POS updates, cash-outs, and end-of-shift financial processes. Led top guest-satisfaction metrics. Trained and supervised new staff.",
    comment: "Built this room's website in 2025. Manage its floor now.",
  },
  {
    kind: "Work",
    title: "Support Engineer I",
    location: "cb20 · Saratoga Springs, NY",
    date: "Dec 2024 — May 2025",
    sortYear: 2024.95,
    description:
      "Front-line IT support for managed-services customers, remote and on-site. Drove phone-answer rate from 30% to 95% and CSAT to 4.9/5.",
    comment: "30% to 95% on phone answer. Best number in this column.",
  },
  {
    kind: "Work",
    title: "Server",
    location: "The Whistling Kettle · Ballston Spa, NY",
    date: "Oct 2024 — May 2025",
    sortYear: 2024.85,
    description:
      "Sold tea to people who came in for tea, then sold them the pot. Retail attachment on top of a full service section.",
  },
  {
    kind: "Work",
    title: "Captain",
    location: "Navy Blue · Houston, TX",
    date: "May 2024 — Oct 2024",
    sortYear: 2024.4,
    description:
      "Fine-dining captain. A section in a busy room is a scheduling problem with people in it — POS menu updates, section flow, and the timing that holds both together.",
  },
  {
    kind: "Education",
    title: "Full Stack Development — Software Engineering",
    location: "Flatiron School",
    date: "Feb 2023 — Jul 2023",
    sortYear: 2023.2,
    description:
      "15-week intensive: Python, JavaScript, React, Flask, HTML, CSS, SQL. The pivot from communication into engineering.",
    comment: "Class rise. Everything above this line runs off it.",
  },
  {
    kind: "Education",
    title: "BA Communication",
    location: "SUNY Geneseo",
    date: "Sep 2019 — Dec 2022",
    sortYear: 2022.95,
    description:
      "Journalism, media, and professional communication. Finished one semester early. Studied Chinese, French, and international relations alongside.",
    comment: "Finished a semester early to go abroad.",
  },
  {
    kind: "Work",
    title: "Server",
    location: "The Daily Catch",
    date: "May 2022 — Jul 2022",
    sortYear: 2022.5,
    description:
      "Quick, efficient service in a high-volume room. Tight kitchen communication, fast table turns.",
  },
  {
    kind: "Education",
    title: "Study Abroad — International Relations",
    location: "Sciences Po Saint-Germain-en-Laye · France",
    date: "Sep 2022 — Dec 2022",
    sortYear: 2022.4,
    description: "One-semester exchange. International relations coursework in French.",
    comment: "Coupled entry — same term as the Sorbonne. Two schools, one interest.",
  },
  {
    kind: "Education",
    title: "Study Abroad — French Language, History & Culture",
    location: "La Sorbonne · Paris, France",
    date: "Sep 2022 — Dec 2022",
    sortYear: 2022.39,
    description: "Concurrent semester at the Sorbonne. Language, history, culture.",
    comment: "Coupled entry — see above. Both semesters carried in French.",
  },
  {
    kind: "Work",
    title: "Server",
    location: "Maggiano's",
    date: "Apr 2022 — Jun 2022",
    sortYear: 2022.35,
    description:
      "Volume house. Where I learned that a system beats hustle — section management, and a team that has to move as one.",
  },
  {
    kind: "Work",
    title: "Food Runner & Seafood Prep Chef",
    location: "The Atlantic Seafood and Chophouse",
    date: "May 2021 — Aug 2021",
    sortYear: 2021.5,
    description:
      "Ran food and prepped seafood line-side with the head chef and owner. Kept service speed without sacrificing accuracy.",
  },
  {
    kind: "Work",
    title: "Bellhop & Night Auditor",
    location: "The Harborside Inn",
    date: "May 2021 — Aug 2021",
    sortYear: 2021.49,
    description:
      "Guest services by day, accounting by night. Reconciled guest ledgers, oversaw nightly revenue reporting.",
    comment: "Two jobs, one building, opposite ends of the clock.",
  },
  {
    kind: "Work",
    title: "Teacher's Assistant — Chinese Language",
    location: "SUNY Geneseo",
    date: "Jan 2021 — May 2021",
    sortYear: 2021.1,
    description:
      "Supported the lead instructor in a virtual classroom through COVID. Lesson prep, attendance, one-on-one student support.",
    comment: "Taught a language I was still learning, over video, mid-COVID.",
  },
  {
    kind: "Work",
    title: "Expeditor & Busser",
    location: "Chianti Il Ristorante",
    date: "Aug 2018 — Sep 2019",
    sortYear: 2018.8,
    description: "Ran the pass. Kept tables turning.",
    comment: "First line on the card. Where the hospitality habits started.",
  },
  {
    kind: "Education",
    title: "AS Entrepreneurship & Sustainable Technologies",
    location: "Hudson Valley Community College (early college)",
    date: "Sep 2015 — Jun 2019",
    sortYear: 2015.9,
    description:
      "Early-college program: computer science, sustainable technologies, renewable energy, entrepreneurship.",
  },
  {
    kind: "Education",
    title: "Saratoga Springs High School",
    location: "Saratoga Springs, NY",
    date: "Sep 2015 — Jun 2019",
    sortYear: 2015.89,
    description: "New York Regents Diploma.",
  },
]

export const stack = {
  build:
    "React 18 · TypeScript · Vite · Tailwind v4 · Framer Motion. Deployed on Vercel.",
  source: "github.com/colelevy08/Portfolio2026",
}

export type CertGroup = {
  issuer: string
  meta: string
  items: string[]
}

// Licenses & certifications, grouped by issuer, with every course printed as
// its own line. The résumé compresses the Anthropic block into three bundled
// phrases ("MCP: Intro & Advanced Topics", the Intros, the AI Fluency series);
// here they're unpacked so the 21 in the meta line can actually be counted on
// the page. 7 Claude/platform + 2 MCP + 3 Intros + 9 AI Fluency = 21.
// Consumed by Certifications.tsx.
export const certifications: CertGroup[] = [
  {
    issuer: "CompTIA",
    meta: "Issued Apr 2025 · expires Apr 2028",
    items: ["A+ ce"],
  },
  {
    issuer: "IBM",
    meta: "Issued Aug 2026",
    items: ["Introduction to Artificial Intelligence (AI)"],
  },
  {
    issuer: "Anthropic",
    meta: "21 certifications · Jul–Aug 2026",
    items: [
      "Claude 101",
      "Claude Code 101",
      "Claude Code in Action",
      "Claude Platform 101",
      "Building with the Claude API",
      "Claude in Amazon Bedrock",
      "Claude on Google Cloud",
      "MCP: Introduction",
      "MCP: Advanced Topics",
      "Introduction to Subagents",
      "Introduction to Agent Skills",
      "Introduction to Claude Cowork",
      "AI Fluency: Framework & Foundations",
      "AI Fluency: Capabilities & Limitations",
      "AI Fluency for Builders",
      "AI Fluency for Students",
      "AI Fluency for Educators",
      "AI Fluency for K-12 Educators",
      "AI Fluency for Small Businesses",
      "AI Fluency for Nonprofits",
      "AI Fluency: Teaching the Framework",
    ],
  },
]

export type SkillGroup = {
  group: string
  items: string[]
  // The receipt: one line tying the discipline to the shipped work that proves
  // it, plus a link a skeptic can actually click. Rendered under the chips so
  // the section reads as evidence, not tag soup.
  proof: { text: string; label: string; href: string }
}

// The skills matrix, grouped by domain. Consumed by Skills.tsx and About.tsx.
export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind v4", "Framer Motion", "Capacitor"],
    proof: {
      text: "This page is the sample: a hand-drawn horse on the rail, a tote board, and a Victorian race program, in React and Tailwind v4.",
      label: "Read the source",
      href: `https://${stack.source}`,
    },
  },
  {
    group: "Backend & data",
    items: ["Python", "FastAPI", "Node.js", "Supabase", "Postgres", "SQLite", "Square"],
    proof: {
      text: "Portmint's platform takes a subscription and returns a deployed assistant with nobody in the loop.",
      label: "See it live",
      href: "https://portmint.com",
    },
  },
  {
    group: "AI engineering",
    items: ["Claude Code", "Anthropic API", "OpenAI API", "MCP", "Agent fleets", "RAG / vaults"],
    proof: {
      text: "handAIcapper writes its own pace-and-trip notes in plain English, and the track record grades them.",
      label: "The graded record",
      href: brier.record,
    },
  },
  {
    group: "Quant & trading",
    items: ["asyncio", "WebSockets", "Kelly sizing", "Backtesting", "Regime detection", "EV modeling"],
    proof: {
      text: "The fee-aware EV and Kelly core FableKalshi trades under is open source, MIT, and tested.",
      label: "kalshi-edge",
      href: "https://github.com/colelevy08/kalshi-edge",
    },
  },
  {
    group: "DevOps & hosting",
    items: ["Vercel", "GitHub Pages", "GitHub Actions", "Serverless", "Edge Functions"],
    proof: {
      text: "Every entry on this page deploys on a push. This one included.",
      label: "This site's deploys",
      href: `https://${stack.source}`,
    },
  },
  {
    group: "Native & mobile",
    items: ["Swift / SwiftUI", "Capacitor (iOS/Android)", "PWA / offline", "Service Workers"],
    proof: {
      text: "Bocage Champagne Society ships iOS, Android, and web from one Capacitor codebase.",
      label: "Open the app",
      href: "https://bocage-champagne-society.vercel.app",
    },
  },
]

// "AI in the loop" section copy. This is Cole's OWN engineering workflow —
// deliberately distinct from the (un-named) AI engine behind Portmint.
export const aiWorkflow = {
  lead:
    "Claude Code sits in my terminal all day. I write the spec, read every diff, and own everything that ships — that loop is how one developer keeps fifteen projects and three client retainers moving at once.",
  points: [
    {
      title: "Spec before code",
      body: "Features start as a written spec: constraints, edge cases, what done means. The agent works against the spec, and nothing lands until I've read the whole diff.",
    },
    {
      title: "AI inside the products",
      body: "Anthropic and OpenAI APIs run in shipping software — natural-language pace and trip analysis in handAIcapper, an AI drafting engine in OpenProfile.",
    },
    {
      // The old copy ended on "I can tell you what any feature cost" — a dare
      // with nothing behind it, on the one page whose governing rule is that
      // every claim is checkable. It now points at the tool instead, which is
      // public, stdlib-only, and will say the same about your own machine.
      title: "The loop is instrumented",
      body: "Portmint Pulse charts token spend, rate limits, and per-project cost — this page included. It's open source and reads your local stats, so you can run the same numbers on your own work.",
    },
  ],
}

// Headings for each top-level section. The `headline` is the bold lead; the
// `subhead` renders in muted grey on the same line. Editing copy = edit here.
export type SectionHeading = {
  eyebrow: string
  headline: string
  subhead: string
}

export const sections: Record<
  | "featured"
  | "work"
  | "testimonials"
  | "skills"
  | "ai"
  | "about"
  | "path"
  | "certifications"
  | "contact",
  SectionHeading
> = {
  featured: {
    eyebrow: "Feature races",
    headline: "The three I'd show first.",
    subhead:
      "An AI handicapper a nose in front of the morning line worldwide, a self-provisioning SaaS platform, and a quant system with an open-source trading core.",
  },
  work: {
    eyebrow: "The field",
    headline: "Eight more, all of them live.",
    subhead:
      "Client retainers, trading bots, developer tooling, and open source. Every post position filled.",
  },
  testimonials: {
    eyebrow: "Word of mouth",
    headline: "What the clients say.",
    subhead: "From the people whose businesses run on this work.",
  },
  skills: {
    eyebrow: "The tack room",
    headline: "Everything on this page came out of this room.",
    subhead: "Six disciplines, and a receipt under each one.",
  },
  ai: {
    eyebrow: "Conditions",
    headline: "Claude Code is in the loop.",
    subhead: "The specs and the review stay mine. The instrumentation is public.",
  },
  about: {
    eyebrow: "The connections",
    headline: "Saratoga Springs is a racetrack.",
    subhead:
      "Three client retainers, one town — and the oldest sporting venue in the country at the end of it.",
  },
  path: {
    eyebrow: "Form",
    headline: "Past performances.",
    subhead:
      "Sixteen starts, kitchen pass to Paris to Flatiron and back. Chart comments where there is something to say.",
  },
  certifications: {
    eyebrow: "Papers",
    headline: "Licensed and certified.",
    subhead:
      "A trade license and 22 vendor courses — 21 of them Anthropic's, earned building this page and handAIcapper with Claude Code in the loop.",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Got a project, role, or rabbit-hole question?",
    subhead: "Send it over.",
  },
}
