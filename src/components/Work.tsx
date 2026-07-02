import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { projects, sections, type Project } from '../data/content'
import { shotFor } from '../lib/screenshots'
import { silkFor, silkShadow } from '../lib/silks'
import SectionHead from './SectionHead'

// Everything that isn't a feature race runs in the field below (posts 3+).
const selected = projects.filter((p) => !p.featured)

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead h={sections.work} />
        <ol className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const shot = shotFor(p.slug)
  const primary = p.live ?? p.repo
  // Post position continues from the feature races (posts 1–2).
  const post = projects.indexOf(p) + 1
  const silk = silkFor(post)

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="flex flex-col"
    >
      {/* Matted screenshot plate; the saddle cloth pops on as the card
          enters view and wobbles like cloth when the plate is hovered. */}
      <div className="group relative">
        <a
          href={primary}
          target={primary ? '_blank' : undefined}
          rel="noreferrer"
          aria-label={`${p.title} — open`}
          className="plate block aspect-[16/10] w-full"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-[2px]"
            style={{ background: silk.edge ?? silk.bg }}
          />
          {shot ? (
            <img
              src={shot}
              alt={`${p.title} — screenshot`}
              loading="lazy"
              decoding="async"
              width={1200}
              height={750}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="island flex h-full w-full flex-col items-center justify-center gap-1.5 bg-bg text-center">
              <span className="font-display text-2xl text-ink">{p.title}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                {p.category}
              </span>
            </div>
          )}
        </a>
        <motion.span
          className="pointer-events-none absolute -top-2 left-3 z-10"
          initial={{ scale: 0.4, rotate: -14, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 380, damping: 17, delay: 0.2 }}
          aria-hidden="true"
        >
          <span
            className="silk transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            style={{
              '--silk-size': '1.75rem',
              '--silk-fs': '0.9rem',
              background: silk.bg,
              color: silk.fg,
              boxShadow: silkShadow(silk),
            } as CSSProperties}
          >
            {post}
          </span>
        </motion.span>
      </div>

      {/* Meta — set like a past-performance line. */}
      <div className="mt-5 flex flex-1 flex-col">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
          Post {post} · {p.year} · {p.category}
        </p>

        <h3 className="font-display mt-3 text-[1.45rem] leading-tight">
          {p.title}
        </h3>

        <p className="mt-3 font-serif text-[14px] leading-[1.6] text-ink-2">
          {p.blurb}
        </p>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {p.tags.join(' · ')}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-awning"
            >
              <span className="hairline w-7 bg-line-2 transition-all group-hover:w-11 group-hover:bg-awning" />
              Visit
              <ArrowUpRight size={13} />
            </a>
          )}
          {p.repo ? (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
            >
              <Github size={13} />
              Source
            </a>
          ) : p.isPrivate ? (
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <Lock size={11} />
              Private
            </span>
          ) : null}
        </div>
      </div>
    </motion.li>
  )
}
