import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { projects, type Project } from '../data/content'

const screenshots = import.meta.glob('../assets/screenshots/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const shotFor = (slug: string): string | undefined => {
  const match = Object.entries(screenshots).find(([path]) =>
    path.endsWith(`/${slug}.webp`),
  )
  return match?.[1]
}

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-16 grid grid-cols-12 gap-6 sm:mb-24">
          <div className="col-span-12 sm:col-span-3">
            <p className="eyebrow">§ 01 / Selected work</p>
          </div>
          <h2 className="col-span-12 font-serif text-3xl leading-[1.1] tracking-tight sm:col-span-9 sm:text-5xl lg:text-6xl balance">
            Seven projects in production —{' '}
            <span className="text-muted">restaurants, members clubs, insurance, sports analytics, and trading research.</span>
          </h2>
        </header>

        <ol className="space-y-24 sm:space-y-32">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const flip = index % 2 === 1
  const shot = shotFor(p.slug)
  const primary = p.live ?? p.repo

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="grid grid-cols-12 items-center gap-y-6 gap-x-6 sm:gap-x-10"
    >
      {/* Screenshot plate */}
      <a
        href={primary}
        target="_blank"
        rel="noreferrer"
        aria-label={`${p.title} — open`}
        className={`plate group col-span-12 aspect-[16/10] sm:col-span-7 ${
          flip ? 'sm:order-2' : ''
        }`}
      >
        {shot ? (
          <img
            src={shot}
            alt={`${p.title} — screenshot`}
            loading="lazy"
            decoding="async"
            width={1200}
            height={750}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
            {p.title}
          </div>
        )}
      </a>

      {/* Meta column */}
      <div className={`col-span-12 sm:col-span-5 ${flip ? 'sm:order-1' : ''}`}>
        <p className="eyebrow mb-4">
          {p.year} · {p.kind}
        </p>

        <h3 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl">
          {p.title}
        </h3>

        <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-ink-2">
          {p.blurb}
        </p>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {p.tags.join(' · ')}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:text-accent transition-colors"
            >
              <span className="hairline w-8 transition-all group-hover:w-12 group-hover:bg-accent" />
              Visit site
              <ArrowUpRight size={13} />
            </a>
          )}
          {p.repo ? (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted hover:text-ink transition-colors"
            >
              <Github size={13} />
              Source
            </a>
          ) : p.isPrivate ? (
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted/70">
              <Lock size={11} />
              Private source
            </span>
          ) : null}
        </div>
      </div>
    </motion.li>
  )
}
