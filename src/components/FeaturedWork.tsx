import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { projects, sections, type Project } from '../data/content'
import { shotFor } from '../lib/screenshots'
import { silkFor } from '../lib/silks'
import SectionHead from './SectionHead'
import BrandPlate from './brand/BrandPlate'
import PortmintMark from './brand/PortmintMark'

const featured = projects.filter((p) => p.featured)

export default function FeaturedWork() {
  return (
    <section id="featured" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <SectionHead h={sections.featured} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ p, index }: { p: Project; index: number }) {
  const shot = shotFor(p.slug)
  const primary = p.live ?? p.repo
  const accent = p.brand?.accent
  // Post position = place in the full field (featured cards are posts 1–2).
  const post = projects.indexOf(p) + 1
  const silk = silkFor(post)
  const cardStyle = accent
    ? ({ '--card-accent': accent } as CSSProperties)
    : undefined
  const accentStyle = accent ? { color: accent } : undefined
  const isPortmint = p.slug === 'portmint'

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.2),
        ease: [0.2, 0.8, 0.2, 1],
      }}
      style={cardStyle}
      className="lift-brand flex flex-col overflow-hidden rounded-lg border border-line bg-bg-2"
    >
      {/* Visual plate — real screenshot if present, else the on-brand plate. */}
      <a
        href={primary}
        target={primary ? '_blank' : undefined}
        rel="noreferrer"
        aria-label={`${p.title} — open`}
        className="group block aspect-[16/10] overflow-hidden border-b border-line bg-bg-3"
      >
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
        ) : p.brand ? (
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <BrandPlate p={p} />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl text-ink">{p.title}</span>
          </div>
        )}
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="silk"
            style={{
              background: silk.bg,
              color: silk.fg,
              boxShadow: silk.edge ? `inset 0 0 0 1px ${silk.edge}` : undefined,
            }}
            aria-label={`Post ${post}`}
          >
            {post}
          </span>
          <p className="eyebrow" style={accentStyle}>
            {p.year} · {p.category}
          </p>
        </div>

        <h3 className="font-display flex items-center gap-3 text-4xl font-bold leading-none sm:text-5xl">
          {isPortmint && <PortmintMark size={34} />}
          {p.title}
        </h3>

        <p className="mt-5 font-serif text-[15px] leading-[1.65] text-ink-2">
          {p.blurb}
        </p>

        <p className="mt-4 font-serif text-[14px] leading-[1.7] text-muted">
          {p.description}
        </p>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {p.tags.join(' · ')}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              style={accentStyle}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-70"
            >
              <span
                className="hairline w-8 transition-all group-hover:w-12"
                style={accent ? { background: accent } : undefined}
              />
              Visit site
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
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted/70">
              <Lock size={11} />
              Private source
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
