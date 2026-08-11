import { useSyncExternalStore, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock } from 'lucide-react'
import { projects, sections, type Project } from '../data/content'
import { shotFor } from '../lib/screenshots'
import { silkFor, silkShadow } from '../lib/silks'
import { getMarks, subscribe } from '../lib/program'
import { useTilt } from '../lib/useTilt'
import SectionHead from './SectionHead'
import BrandPlate from './brand/BrandPlate'
import PortmintMark from './brand/PortmintMark'
import ProgramPencil, { InkLoop } from './ProgramPencil'

const featured = projects.filter((p) => p.featured)
// The favorite (post 1) runs alone on a full-width card; posts 2–3 pair up
// beneath it — a win-place-show hierarchy instead of an even grid.
const [lead, ...rest] = featured

export default function FeaturedWork() {
  return (
    <section id="featured" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <SectionHead h={sections.featured} />
        <div className="space-y-10">
          {lead && <FeaturedCard p={lead} index={0} wide />}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {rest.map((p, i) => (
              <FeaturedCard key={p.slug} p={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({
  p,
  index,
  wide = false,
}: {
  p: Project
  index: number
  // Wide cards lay the plate and body side by side at lg — the lead card.
  wide?: boolean
}) {
  const shot = shotFor(p.slug)
  const primary = p.live ?? p.repo
  const tilt = useTilt()
  const accent = p.brand?.accent
  // Post position = place in the full field (featured cards are posts 1–3).
  const post = projects.indexOf(p) + 1
  const silk = silkFor(post)
  const marked = useSyncExternalStore(subscribe, getMarks, getMarks).includes(post)
  const cardStyle = accent
    ? ({ '--card-accent': accent } as CSSProperties)
    : undefined
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
      // #post-N anchors let the tote board's cells jump straight to the card
      // that proves their number; scroll-mt clears the sticky header.
      id={`post-${post}`}
      className={`lift-brand flex scroll-mt-24 flex-col overflow-hidden rounded-lg border border-line bg-bg-2 ${
        wide ? 'lg:flex-row' : ''
      }`}
    >
      {/* Matted plate — the win photo. Saddle cloth hangs over the top-left
          corner; a 2px silk-colored rule runs along the plate's top edge
          (light cloths fall back to their edge color so the rule reads on
          the white mat). */}
      <div
        className={`group relative mx-5 mt-7 sm:mx-6 ${
          wide ? 'lg:my-8 lg:ml-8 lg:mr-0 lg:w-[52%] lg:flex-none lg:self-center' : ''
        }`}
      >
        {/* The plate is a link only when there is somewhere to go — an <a>
            with no href is unreachable by keyboard and flagged by audits. */}
        {(() => {
          const plateInner = (
            <>
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
              ) : p.brand ? (
                <div className="island h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  <BrandPlate p={p} />
                </div>
              ) : (
                <div className="island flex h-full w-full items-center justify-center bg-bg">
                  <span className="font-display text-4xl text-ink">{p.title}</span>
                </div>
              )}
            </>
          )
          return primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} — open`}
              className="plate block aspect-[16/10]"
              {...tilt}
            >
              {plateInner}
            </a>
          ) : (
            <div className="plate block aspect-[16/10]" {...tilt}>
              {plateInner}
            </div>
          )
        })()}
        <motion.span
          className="pointer-events-none absolute -top-2.5 left-4 z-10"
          initial={{ scale: 0.4, rotate: -14, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          // Vertical-only margin: an all-sides inset would exclude the tiny
          // scaled-down chip near the viewport's left edge and never fire.
          viewport={{ once: true, margin: '-60px 0px' }}
          transition={{ type: 'spring', stiffness: 380, damping: 17, delay: 0.25 }}
          aria-hidden="true"
        >
          <span
            className="silk transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
            style={{
              background: silk.bg,
              color: silk.fg,
              boxShadow: silkShadow(silk),
            }}
          >
            {post}
          </span>
          <InkLoop marked={marked} />
        </motion.span>
        <ProgramPencil post={post} title={p.title} />
      </div>

      {/* Body */}
      <div
        className={`flex flex-1 flex-col p-6 sm:p-8 ${
          wide ? 'lg:justify-center lg:p-10' : ''
        }`}
      >
        {/* The running line: who this is on the left, what I make it on the
            right. "The favorite" on post 1 is what teaches a reader who has
            never opened a program what 6-5 means. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            Post {post} · {p.year} · {p.category}
            {post === 1 && ' · The favorite'}
          </p>
          {/* what I make this entry — the price, set off to the right */}
          <p className="font-mono text-[13px] tracking-[0.08em] text-ink">
            {p.odds}
          </p>
        </div>

        {/* the handicapper's one-clause comment */}
        <p className="mt-2 max-w-[52ch] font-serif text-[13px] italic leading-snug text-muted">
          {p.line}
        </p>

        <h3
          className={`font-display mt-4 flex items-center gap-3 text-3xl leading-tight sm:text-4xl ${
            wide ? 'lg:text-5xl' : ''
          }`}
        >
          {isPortmint && <PortmintMark size={30} />}
          {p.title}
        </h3>

        <p className="mt-4 max-w-[68ch] font-serif text-[15px] leading-[1.65] text-ink-2">
          {p.blurb}
        </p>

        <p className="mt-4 max-w-[68ch] font-serif text-[14px] leading-[1.7] text-muted">
          {p.description}
        </p>

        {/* The live-demo callout — the strongest proof line gets pulled out
            of the paragraph and set like a program notice. */}
        {p.callout && (
          <p className="mt-5 max-w-[60ch] border-l-2 border-accent pl-3 font-mono text-[12px] leading-relaxed text-accent">
            ▸ {p.callout}
          </p>
        )}

        {/* Steward's notes — the architecture/risk story, set like the
            stewards' remarks under a chart line. */}
        {p.steward && p.steward.length > 0 && (
          <div className="mt-5 max-w-[60ch] border-l-2 border-line-2 pl-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Steward's notes
            </p>
            <ul className="mt-2 space-y-1.5">
              {p.steward.map((note) => (
                <li
                  key={note}
                  className="font-mono text-[12px] leading-relaxed text-ink-2"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* The OFFICIAL rail — results aren't real until the stewards post
            the sign; every link here is independently checkable. */}
        {p.proof && p.proof.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="rounded border border-brass/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
              Official
            </span>
            {p.proof.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-[0.06em] text-accent transition-colors hover:text-awning"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* NBSP binds each dot to its tag so a wrap never leads with '·';
            mt-auto bottom-anchors the tag+link rows so the place/show pair
            stays level (the wide lead card keeps its centered flow). */}
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.16em] text-muted ${
            wide ? 'mt-6' : 'mt-auto pt-6'
          }`}
        >
          {p.tags.join(' · ')}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent transition-colors hover:text-awning"
            >
              <span className="hairline w-8 bg-line-2 transition-all group-hover:w-12 group-hover:bg-awning" />
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
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <Lock size={11} />
              Private source
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
