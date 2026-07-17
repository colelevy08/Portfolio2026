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
    { label: "Races graded on record", value: "1,100+", to: "#post-2" },
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
}

// The contact form's success state — a punched pari-mutuel win ticket.
export const contactSuccess = {
  header: "Saratoga · The summer meet · Official ticket",
  headline: "Ticket punched.",
  body: "Message received — I'll get back to you shortly, usually the same day.",
  footer: "Win · Race 2026 · Post anytime",
}

// Saratoga Springs' real town motto — set as a program rubric in About and
// again in the footer. Rendered with brass middots between the words.
export const motto = ["Health", "History", "Horses"]

export const aboutParagraphs = [
  "I build the web layer for small businesses that need to look serious on day one — restaurants, insurance practices, members clubs. Three of those are on retainer right now.",
  "Before the bootcamp at Flatiron School (2023) I studied Communication at SUNY Geneseo, with semesters at La Sorbonne and Sciences Po. The communication degree is why my interfaces read clearly; the dev work is what makes them ship.",
  "When I'm off the client clock I write trading bots against prediction markets, build a horse-racing analytics PWA for the Saratoga track, and run kitchens. I currently assistant-manage Standard Fare, a restaurant I helped launch in 2025.",
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
    slug: "portmint",
    title: "Portmint",
    kind: "Personal",
    category: "Product",
    year: "2026",
    featured: true,
    blurb:
      "The MVP — a self-serve platform that lets any business build, brand, and deploy its own AI assistant in minutes, no code required.",
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
    slug: "handaicapper",
    title: "handAIcapper",
    kind: "Personal",
    category: "Quant & trading",
    year: "2025",
    featured: true,
    blurb:
      "Pro-grade horse-racing handicapping for NYRA tracks — Kelly stake sizing, pace analysis, live odds, AI race commentary. Built on the Saratoga meet.",
    description:
      "A PWA + FastAPI backend that ingests live odds and race cards, runs Kelly-fraction stake sizing on edge-positive races, and generates natural-language pace and trip analysis with AI. The hometown project: built at the track it handicaps.",
    callout:
      "Every pick is graded — the track record at handaicapper.com/record scores model vs. AI vs. blend vs. the market on official charts.",
    steward: [
      "Scoreboard: Brier score, log-loss, hit rate, flat-$2 ROI",
      "Graded against official result charts, not self-reported",
      "1,100+ graded races across 80+ tracks; nightly recalibration",
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
    slug: "fablekalshi",
    title: "FableKalshi",
    kind: "Personal",
    category: "Quant & trading",
    year: "2026",
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
    blurb:
      "Saratoga Springs' first champagne bar — a 20-seat room for sparkling wines, caviar, and charcuterie.",
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
    blurb:
      "Independent long-term-care insurance practice helping Florida families protect retirement savings.",
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
  },
  {
    kind: "Work",
    title: "Support Engineer I",
    location: "cb20 · Saratoga Springs, NY",
    date: "Dec 2024 — May 2025",
    sortYear: 2024.95,
    description:
      "Front-line IT support for managed-services customers, remote and on-site. Drove phone-answer rate from 30% to 95% and CSAT to 4.9/5.",
  },
  {
    kind: "Work",
    title: "Server",
    location: "The Whistling Kettle · Ballston Spa, NY",
    date: "Oct 2024 — May 2025",
    sortYear: 2024.85,
    description:
      "Managed and upsold gourmet tea and merchandise. Met sales goals while keeping satisfaction high.",
  },
  {
    kind: "Work",
    title: "Captain",
    location: "Navy Blue · Houston, TX",
    date: "May 2024 — Oct 2024",
    sortYear: 2024.4,
    description:
      "Fine-dining captain. Maintained POS menu updates and section flow. Strong customer-service track record.",
  },
  {
    kind: "Education",
    title: "Full Stack Development — Software Engineering",
    location: "Flatiron School",
    date: "Feb 2023 — Jul 2023",
    sortYear: 2023.2,
    description:
      "15-week intensive: Python, JavaScript, React, Flask, HTML, CSS, SQL. The pivot from communication into engineering.",
  },
  {
    kind: "Education",
    title: "BA Communication",
    location: "SUNY Geneseo",
    date: "Sep 2019 — Dec 2022",
    sortYear: 2022.95,
    description:
      "Journalism, media, and professional communication. Finished one semester early. Studied Chinese, French, and international relations alongside.",
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
  },
  {
    kind: "Education",
    title: "Study Abroad — French Language, History & Culture",
    location: "La Sorbonne · Paris, France",
    date: "Sep 2022 — Dec 2022",
    sortYear: 2022.39,
    description: "Concurrent semester at the Sorbonne. Language, history, culture.",
  },
  {
    kind: "Work",
    title: "Server",
    location: "Maggiano's",
    date: "Apr 2022 — Jun 2022",
    sortYear: 2022.35,
    description: "High-throughput Italian dining. Section management, team collaboration.",
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
  },
  {
    kind: "Work",
    title: "Teacher's Assistant — Chinese Language",
    location: "SUNY Geneseo",
    date: "Jan 2021 — May 2021",
    sortYear: 2021.1,
    description:
      "Supported the lead instructor in a virtual classroom through COVID. Lesson prep, attendance, one-on-one student support.",
  },
  {
    kind: "Work",
    title: "Expeditor & Busser",
    location: "Chianti Il Ristorante",
    date: "Aug 2018 — Sep 2019",
    sortYear: 2018.8,
    description:
      "Ran the pass. Kept tables turning. Where the hospitality habits started.",
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

export type SkillGroup = {
  group: string
  items: string[]
  // One line tying the discipline to the shipped work that proves it —
  // rendered under the chips so the section reads as evidence, not tag soup.
  proof: string
}

// The skills matrix, grouped by domain. Consumed by Skills.tsx and About.tsx.
export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind v4", "Framer Motion", "Capacitor"],
    proof: "In production on every project on this page.",
  },
  {
    group: "Backend & data",
    items: ["Python", "FastAPI", "Node.js", "Supabase", "Postgres", "SQLite", "Square"],
    proof: "Runs Portmint's platform and three client back offices.",
  },
  {
    group: "AI engineering",
    items: ["Claude Code", "Anthropic API", "OpenAI API", "MCP", "Agent fleets", "RAG / vaults"],
    proof: "Shipping inside Portmint, handAIcapper, and OpenProfile.",
  },
  {
    group: "Quant & trading",
    items: ["asyncio", "WebSockets", "Kelly sizing", "Backtesting", "Regime detection", "EV modeling"],
    proof: "Built into FableKalshi and PolyBot — the fee-aware EV/Kelly core is open source (kalshi-edge).",
  },
  {
    group: "DevOps & hosting",
    items: ["Vercel", "GitHub Pages", "GitHub Actions", "Serverless", "Edge Functions"],
    proof: "Every site in the field deploys through this stack.",
  },
  {
    group: "Native & mobile",
    items: ["Swift / SwiftUI", "Capacitor (iOS/Android)", "PWA / offline", "Service Workers"],
    proof: "Bocage Champagne Society runs iOS, Android, and web builds from one Capacitor codebase.",
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
      title: "The loop is instrumented",
      body: "Portmint Pulse charts token spend, rate limits, and per-project cost. I can tell you what any given feature cost to build.",
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
  | "contact",
  SectionHeading
> = {
  featured: {
    eyebrow: "Feature races",
    headline: "The three I'd show first.",
    subhead:
      "A self-provisioning SaaS platform, an AI handicapper with a public accuracy record, and a quant system with an open-source trading core.",
  },
  work: {
    eyebrow: "The field",
    headline: "The rest of the field.",
    subhead:
      "Eight more entries — client retainers, trading bots, developer tooling, and open source. Every post position filled.",
  },
  testimonials: {
    eyebrow: "Word of mouth",
    headline: "What the clients say.",
    subhead: "From the people whose businesses run on this work.",
  },
  skills: {
    eyebrow: "The tack room",
    headline: "The toolkit.",
    subhead: "Frontend to FastAPI, AI engineering to quant — six disciplines, saddled and ready.",
  },
  ai: {
    eyebrow: "Method",
    headline: "Claude Code is in the loop.",
    subhead: "The specs and the review stay mine.",
  },
  about: {
    eyebrow: "About",
    headline: "From hospitality to engineering.",
    subhead: "Three client retainers, one Saratoga.",
  },
  path: {
    eyebrow: "Form",
    headline: "Past performances.",
    subhead: "Kitchen pass to Paris to Flatiron, and back again.",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Got a project, role, or rabbit-hole question?",
    subhead: "Send it over.",
  },
}
