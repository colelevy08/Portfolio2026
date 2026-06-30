// The PDF résumé lives in assets and is bundled by Vite. Importing it here
// gives every component one canonical, hashed URL to link to.
import resumePdf from "../assets/ColeLevyResume.pdf"

export const profile = {
  name: "Cole Levy",
  initials: "CL",
  title: "Full-stack developer & AI-native builder",
  tagline:
    "Full-stack developer shipping products, trading systems, and client sites — fast, with AI in the loop.",
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
  eyebrow: "Cole Levy · 2026",
  metaLines: ["Full-stack · AI-native", "Saratoga Springs, NY"],
  // Headline is assembled in the component: lead + accent + tail.
  headlineLead: "I build products,",
  headlineAccent: "trading systems",
  headlineTail: "and the web layer real businesses run on.",
  status: "Now building Portmint — a self-serve platform for branded AI assistants.",
  // Small front-and-center proof points.
  stats: ["15+ shipped", "900+ commits", "3 retainers"],
  ctaPrimary: { label: "See the work", to: "#featured" },
  ctaResume: { label: "Résumé", to: profile.resumeUrl },
}

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
}

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
      "Self-serve SaaS: enter your website, get a live branded AI assistant in about a minute, then pay and it provisions itself into a real client — no redeploy. Auto-install flows for Shopify, WordPress, Wix, Squarespace, Webflow and more, an official WordPress plugin, Stripe subscription tiers, and a self-serve CRM for captured leads. React + serverless front of house; a Python/FastAPI platform builds secure, least-privilege integrations into real business systems behind it.",
    live: "https://portmint.com",
    isPrivate: true,
    tags: ["React", "TypeScript", "Python", "FastAPI", "Stripe", "Vercel"],
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
      "An async Python trading system for Kalshi 15-minute and hourly crypto-binary markets. Runs four strategies plus an ensemble in parallel, shadow-trades every candidate with automatic promotion when it clears thresholds, detects volatility/trend/chop regimes to size dynamically, and gates every order through fee- and slippage-aware EV math with fractional-Kelly sizing. Automatic kill switches halt entries on drawdown, loss streaks, stale data, or reject spikes. Backtesting runs across a process pool; every decision is logged for bit-for-bit replay.",
    isPrivate: true,
    tags: ["Python", "asyncio", "WebSockets", "SQLite"],
  },
  {
    slug: "bocage-society",
    title: "Bocage Champagne Society",
    kind: "Client retainer",
    category: "Client retainer",
    year: "2026",
    blurb:
      "Members app + Admin CRM for a private champagne society, shipped to iOS, Android, and web from a single codebase.",
    description:
      "Capacitor-wrapped React + Vite app with a Supabase backend. Membership, RSVPs, ticketing, and a back-office CRM for the owner. The companion to the public-facing Bocage marketing site.",
    repo: "https://github.com/colelevy08/BocageChampagneSociety",
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
    repo: "https://github.com/colelevy08/standard-fare",
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
    slug: "saratoga-handicapper",
    title: "Saratoga Handicapper",
    kind: "Personal",
    category: "Quant & trading",
    year: "2025",
    blurb:
      "Pro-grade horse-racing handicapping for NYRA tracks — Kelly sizing, pace analysis, live odds, Claude AI commentary.",
    description:
      "A PWA + FastAPI backend that ingests live odds and race cards, runs Kelly-fraction stake sizing on edge-positive races, and uses Claude for natural-language pace and trip analysis. Built on the Saratoga meet.",
    isPrivate: true,
    live: "https://saratoga-handicapper.vercel.app",
    tags: ["React", "Vite", "FastAPI", "Claude AI"],
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
      "Python async pipeline that identifies profitable wallets on Polymarket, verifies edge against current order books, and copies positions Kelly-sized to the operator's bankroll. Real-money trading.",
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
    slug: "claude-pulseinator",
    title: "Claude Pulseinator",
    kind: "Personal",
    category: "Tooling",
    year: "2026",
    blurb:
      "A native macOS menubar app showing Claude Code usage live — rate-limit windows, today's stats, lifetime totals, and time-series charts.",
    description:
      "Swift / SwiftUI menubar app that reads Claude Code credentials from the macOS Keychain to surface 5h/7d rate-limit windows, message/session/token counts, and lifetime totals, with optional SigNoz/OpenTelemetry time-series charts for tokens, cost, and leverage ratio.",
    isPrivate: true,
    tags: ["Swift", "SwiftUI", "macOS", "OpenTelemetry"],
  },
  {
    slug: "openprofile",
    title: "OpenProfile",
    kind: "Open source",
    category: "Open source",
    year: "2026",
    blurb:
      "A directory and AI-powered sync engine for the sovereign web — personal sites keep their own domains while an AI watches for changes and drafts micro-posts.",
    description:
      "In progress. Sites verify domain ownership, an AI engine diffs their content and auto-drafts micro-posts to a feed behind an approval queue, and approved posts can sync back to the owner's repo or webhook. Next.js + shadcn/ui front end with a Python/FastAPI indexer on Supabase.",
    repo: "https://github.com/colelevy08/OpenProfile",
    tags: ["Next.js", "TypeScript", "FastAPI", "Supabase"],
  },
]

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
    "React 18 · TypeScript · Vite · Tailwind v4 · Framer Motion. Deployed on Vercel + GitHub Pages.",
  source: "github.com/colelevy08/Portfolio2026",
}

export type SkillGroup = {
  group: string
  items: string[]
}

// The skills matrix, grouped by domain. Consumed by Skills.tsx and About.tsx.
export const skills: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Vite", "Tailwind v4", "Framer Motion", "Capacitor"],
  },
  {
    group: "Backend & data",
    items: ["Python", "FastAPI", "Node.js", "Supabase", "Postgres", "SQLite", "Stripe"],
  },
  {
    group: "AI engineering",
    items: ["Claude Code", "Anthropic API", "OpenAI API", "MCP", "Agent fleets", "RAG / vaults"],
  },
  {
    group: "Quant & trading",
    items: ["asyncio", "WebSockets", "Kelly sizing", "Backtesting", "Regime detection", "EV modeling"],
  },
  {
    group: "DevOps & hosting",
    items: ["Vercel", "GitHub Pages", "GitHub Actions", "Serverless", "Edge Functions"],
  },
  {
    group: "Native & mobile",
    items: ["Swift / SwiftUI", "Capacitor (iOS/Android)", "PWA / offline", "Service Workers"],
  },
]

// "AI in the loop" section copy. This is Cole's OWN engineering workflow —
// deliberately distinct from the (un-named) AI engine behind Portmint.
export const aiWorkflow = {
  lead:
    "I'm an AI-native developer. Claude Code is my daily engineering partner — I architect, review, and ship with it in the loop, which is how a solo developer keeps 15+ projects and three client retainers moving at once.",
  points: [
    {
      title: "Spec → ship velocity",
      body: "Agentic workflows turn a clear spec into reviewed, tested code fast — without skipping the read-the-whole-file, find-the-root-cause discipline.",
    },
    {
      title: "AI features in my own products",
      body: "I wire Anthropic and OpenAI APIs into real apps — natural-language pace analysis in Saratoga Handicapper, agent fleets for content, and more.",
    },
    {
      title: "Tooling for the workflow itself",
      body: "I build the instruments too: Portmint Pulse and Claude Pulseinator track usage, cost, and leverage so the AI loop stays measurable, not magical.",
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
  "featured" | "work" | "skills" | "ai" | "about" | "path" | "contact",
  SectionHeading
> = {
  featured: {
    eyebrow: "§ 01 / Flagship",
    headline: "An MVP and a quant platform —",
    subhead: "the two builds I'd put my name on first.",
  },
  work: {
    eyebrow: "§ 02 / Selected work",
    headline: "Twelve projects in production —",
    subhead:
      "products, client retainers, trading systems, sports analytics, and developer tooling.",
  },
  skills: {
    eyebrow: "§ 03 / Skills",
    headline: "The toolkit.",
    subhead: "Frontend to FastAPI, AI engineering to quant.",
  },
  ai: {
    eyebrow: "§ 04 / AI in the loop",
    headline: "Built with AI as a partner —",
    subhead: "not a gimmick, a force multiplier.",
  },
  about: {
    eyebrow: "§ 05 / About",
    headline: "From hospitality to engineering —",
    subhead: "three client retainers, one Saratoga.",
  },
  path: {
    eyebrow: "§ 06 / Path",
    headline: "How I got here.",
    subhead: "Kitchen pass to Paris to Flatiron, and back again.",
  },
  contact: {
    eyebrow: "§ 07 / Contact",
    headline: "Got a project, role, or rabbit-hole question?",
    subhead: "Send it over.",
  },
}
