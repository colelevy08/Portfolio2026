# Portfolio2026 — Project Instructions

> Loaded after `~/.claude/CLAUDE.md`; overrides where they conflict.
>
> **Purpose:** Cole's personal portfolio site for 2026. Static SPA, deployed to GitHub Pages.

---

## 1. Stack

- **React 18 + TypeScript 5 + Vite 5** (not CRA, not Next.js).
- **Tailwind CSS v4** via `@tailwindcss/vite`. CSS-first theming with `@theme` in `src/index.css` — no `tailwind.config.js`.
- **Framer Motion** for hero/section reveals.
- **Lucide React** icons.
- **Formspree** for the contact form (`@formspree/react`). No backend.
- **GitHub Pages** hosting via `gh-pages` branch. Live at `colelevy08.github.io/Portfolio2026/`.

`vite.config.ts` sets `base: '/Portfolio2026/'` — that base path **must** stay in sync with the GitHub Pages subpath. If the repo is ever renamed, update both.

---

## 2. Layout

```
src/
├── App.tsx              # single-page composition
├── main.tsx             # entrypoint
├── index.css            # Tailwind v4 @theme tokens + globals
├── components/          # Hero, Projects, History, Contact, Nav, Footer
├── data/content.ts      # ALL site copy in typed TS — no CMS
└── assets/
```

There is **no runtime CMS, no backend, no auth, no analytics**. Content edits = edit `src/data/content.ts` and push.

---

## 3. Commands

```bash
npm run dev        # local dev (Vite)
npm run build      # tsc -b && vite build → dist/
npm run preview    # preview the built site
npm run deploy     # gh-pages -d dist  (predeploy runs build first)
npm run lint       # eslint
```

`npm run deploy` is the production deploy. There's no Vercel here — push-to-main does NOT auto-deploy. Run `npm run deploy` explicitly.

---

## 4. Coding Rules

- TypeScript strict — no `any` without an inline justification.
- All copy lives in `src/data/content.ts`. Don't hard-code strings inside components.
- Mobile-first; verify at 375px and 1440px before declaring done.
- Animations are tasteful — no infinite loops, no parallax that hurts mobile perf.
- Accessibility: every image gets `alt`; every interactive element has an accessible name; keyboard-navigate the page once before merging.
- Tailwind v4 only — do not introduce `tailwind.config.js` or v3-style plugins.

---

## 5. Verification

- `npm run build` succeeds with no new TS errors / Vite warnings.
- `npm run preview` and click through every section + the contact form.
- Lighthouse mobile score should not regress from baseline. Hero image weight is the main risk.

---

## 6. Out of Scope (without ask)

- Adding a backend, CMS, or database.
- Switching deploy target away from GitHub Pages, or changing `base` in `vite.config.ts`.
- Adding analytics, cookies, or anything that triggers GDPR/CCPA banners.
- Migrating off Tailwind v4 or off Vite.
- Editing the Formspree form ID without confirming the new endpoint works.
