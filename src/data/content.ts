export const profile = {
  name: "Cole Levy",
  initials: "CL",
  title: "Full-stack developer",
  tagline:
    "Full-stack developer shipping for real businesses, in two languages.",
  available: "Available for client work · est. 2023",
  email: "colelevy08@gmail.com",
  phone: "+15184104999",
  phoneDisplay: "(518) 410-4999",
  location: "Saratoga Springs, NY",
  formspreeId: "xeoeyajg",
  credlyBadge:
    "https://www.credly.com/badges/42dcfd6d-fe00-422c-a891-780fb40feaa5/public_url",
  socials: {
    linkedin: "https://www.linkedin.com/in/colelevy",
    github: "https://github.com/colelevy08",
    whatsapp: "https://api.whatsapp.com/send/?phone=15184104999&text=Hello+Cole",
    telegram: "https://t.me/colelevy",
  },
}

export const aboutParagraphs = [
  "I build the web layer for small businesses that need to look serious on day one — restaurants, insurance practices, members clubs. Three of those are on retainer right now.",
  "Before the bootcamp at Flatiron School (2023) I studied Communication at SUNY Geneseo, with semesters at La Sorbonne and Sciences Po. The communication degree is why my interfaces read clearly; the dev work is what makes them ship.",
  "When I'm off the client clock I write trading bots against prediction markets, build a horse-racing analytics PWA for the Saratoga track, and run kitchens. I currently assistant-manage Standard Fare, a restaurant I helped launch in 2025.",
]

export type Project = {
  slug: string
  title: string
  kind: "Client retainer" | "Open source" | "Personal"
  year: string
  blurb: string
  description: string
  repo?: string
  isPrivate?: boolean
  live?: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: "bocage-society",
    title: "Bocage Champagne Society",
    kind: "Client retainer",
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
    year: "2025",
    blurb:
      "Marketing site for the Saratoga Springs restaurant I helped open — brunch, dinner, craft cocktails, in-house art gallery.",
    description:
      "Creative-American dining at 21 Phila St. Reservation flow, ticketed event listings, menu CMS, and a gallery rotation page. I helped launch the kitchen and I built the site.",
    repo: "https://github.com/colelevy08/standard-fare",
    live: "https://standard-fare-ten.vercel.app",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "bocage",
    title: "Bocage",
    kind: "Client retainer",
    year: "2025",
    blurb:
      "Saratoga Springs' first champagne bar — a 20-seat room for sparkling wines, caviar, and charcuterie.",
    description:
      "Marketing site for a new champagne-and-caviar concept. Reservation flow, wine list, event calendar. Shares a Supabase backend with the members app.",
    isPrivate: true,
    live: "https://bocage.vercel.app",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "legacy-path-planners",
    title: "Legacy Path Planners",
    kind: "Client retainer",
    year: "2025",
    blurb:
      "Independent long-term-care insurance practice helping Florida families protect retirement savings.",
    description:
      "Lead-gen site and back-office CRM for Norm Levy's LTC insurance practice. Quote intake, agent workflow, calendar booking. Built to read trustworthy in a regulated industry.",
    isPrivate: true,
    live: "https://legacy-path-planners.vercel.app",
    tags: ["React", "Vercel", "Supabase"],
  },
  {
    slug: "saratoga-handicapper",
    title: "Saratoga Handicapper",
    kind: "Personal",
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
    year: "2025",
    blurb:
      "Collect, trade, verify, and discover vinyl records with a global community of crate diggers.",
    description:
      "Full-stack social app for vinyl collectors. Catalog with discogs-style records, peer-to-peer trade requests, condition verification, and a discovery feed. My capstone-scale JS project.",
    repo: "https://github.com/colelevy08/groovestack",
    live: "https://groovestack.vercel.app",
    tags: ["React", "Node", "Vercel"],
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
    "React 18 · TypeScript · Vite · Tailwind v4 · Framer Motion. Deployed to GitHub Pages.",
  source: "github.com/colelevy08/Portfolio2026",
}
