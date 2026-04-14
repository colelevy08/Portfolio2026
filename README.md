<div align="center">

<img src="./public/favicon.svg" alt="Cole Levy" width="88" height="88" />

# `<Cole Levy />` — Portfolio 2026

**Full Stack Developer** · Saratoga Springs, NY

_A fast, animated, fully-responsive personal portfolio built from the ground up for 2026._

[![Website](https://img.shields.io/badge/Live-colelevy08.github.io-7c3aed?style=for-the-badge&logo=githubpages&logoColor=white)](https://colelevy08.github.io/Portfolio2026/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](#license)

[**Live site**](https://colelevy08.github.io/Portfolio2026/) ·
[**LinkedIn**](https://www.linkedin.com/in/colelevy) ·
[**GitHub**](https://github.com/colelevy08) ·
[**Email**](mailto:colelevy08@gmail.com)

</div>

---

## About

This is the 2026 rebuild of my personal portfolio — a complete re-imagining of [Portfolio25](https://github.com/colelevy08/Portfolio25) on a modern Vite + React + Tailwind stack.

It's designed to be fast, accessible, and animated without feeling heavy — a single-page journey through who I am, what I've built, and how to reach me.

## Highlights

- **Animated hero** with aurora-glow background and staggered reveal timing
- **Projects grid** with gradient borders and hover lift
- **Interactive history timeline** with tabbed Work / Education views
- **Formspree-powered contact** with validation and a success state
- **Mobile-first responsive layout** — collapsible nav, adaptive grid
- **Tailwind v4** — no separate config file, CSS-first theming via `@theme`
- **Framer Motion** page-section reveals
- **Zero runtime CMS** — content lives in typed TypeScript (`src/data/content.ts`)

## Tech stack

| Layer        | Tools                                              |
| ------------ | -------------------------------------------------- |
| Framework    | React 18 · TypeScript 5 · Vite 5                   |
| Styling      | Tailwind CSS 4 · custom CSS aurora/gradient borders |
| Animation    | Framer Motion                                      |
| Icons        | Lucide React                                       |
| Forms        | @formspree/react                                   |
| Deployment   | GitHub Pages (via `gh-pages`)                      |

## Project structure

```
Portfolio2026/
├─ public/               # static assets (favicon)
├─ src/
│  ├─ assets/            # profile pic, resume PDF, illustration, Hello.gif
│  ├─ components/        # Header, Hero, About, Projects, History, Contact, Footer
│  ├─ data/
│  │  └─ content.ts      # all portfolio content (profile, projects, history)
│  ├─ App.tsx            # section composition
│  ├─ main.tsx           # entry point
│  └─ index.css          # Tailwind + theme tokens + aurora styles
├─ index.html
├─ vite.config.ts
└─ tsconfig.json
```

## Getting started

**Requirements:** Node `20+` (Tailwind v4 / Vite 5 support), npm.

```bash
# clone
git clone https://github.com/colelevy08/Portfolio2026.git
cd Portfolio2026

# install
npm install

# start the dev server at http://localhost:5173
npm run dev
```

### Build & preview

```bash
npm run build      # type-check + production bundle into dist/
npm run preview    # preview the production build locally
```

### Deploy to GitHub Pages

The `homepage` field in `package.json` and `base` in `vite.config.ts` are already wired for GitHub Pages.

```bash
npm run deploy
```

## Customizing

All content — profile info, about paragraphs, skills, project list, and history — is in **`src/data/content.ts`**. Update it in one place and every section re-renders automatically.

- **Theme colors:** `src/index.css` inside the `@theme {}` block
- **Contact form:** `profile.formspreeId` in `src/data/content.ts`
- **Resume PDF:** replace `src/assets/ColeLevyResume.pdf`

## Credits

- Built by **Cole Levy** — [colelevy08](https://github.com/colelevy08)
- Icons: [Lucide](https://lucide.dev)
- Fonts: [Inter](https://rsms.me/inter/), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

## License

MIT © Cole Levy

---

<div align="center">

_Designed, built, and caffeinated in Saratoga Springs, NY._

</div>
