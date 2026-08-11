import { useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
import { thePhoto } from '../data/content'
import { silkFor, silkShadow } from '../lib/silks'

// "The stewards have the photo."
//
// The site's one genuine photo finish: handAIcapper's Brier score against the
// track's own morning line, separated by a thousandth of a point. A Brier
// score is a number where LOWER wins, so ".777" reads like a loss to anybody
// who doesn't already know — seeing the red nose come out in front settles it
// without a sentence of explanation.
//
// The print is a strip-camera crop: two extended necks and noses at the wire,
// no legs and no jockeys, because that is what a real photo-finish image looks
// like. Dragging the frame slider develops the print and walks the runners to
// the wire. The result chart underneath is ALWAYS in the DOM — the payoff is
// never gated behind the control, and a reader who never touches the slider
// still gets the whole thing.
//
// CONTRAST NOTE: this whole component sits inside `.island` (#0b1d15). Every
// string here uses ink / ink-2 / chalk / amber. NEVER text-muted — #8b9080
// fails WCAG AA on the island (same reason .board-title uses ink-2).

const FRAMES = 12

// The print opens part-developed rather than black: two runners are already
// on it and roughly half the paper has come up, which is the invitation to
// drag. A blank rectangle is not an invitation, and an opening frame much
// earlier than this leaves most of a 1340px-wide print as empty dark field.
const OPENING_FRAME = 5

// The wire, in viewBox units.
const WIRE_X = 980

// Where each runner's NOSE sits, per frame. The grey (the track's line) breaks
// on top and leads most of the way; the red runs it down and gets there by 28
// units — one muzzle, which is exactly what "a nose" means. Both are AT the
// wire at the last frame, because a photo finish that stops short of the wire
// isn't a photo finish.
const noseX = (frame: number, model: boolean) =>
  model ? -120 + frame * 94 : -40 + frame * 85

export default function ThePhoto() {
  const reduce = useReducedMotion()
  // Reduced-motion readers open on the developed print: the payoff is data,
  // not decoration, so it shouldn't be withheld from someone who asked for
  // less movement. Everyone else gets an undeveloped frame to open up.
  const [frame, setFrame] = useState(() => (reduce ? FRAMES : OPENING_FRAME))
  const developed = frame >= FRAMES

  return (
    <section
      id="photo"
      className="relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Same rubric shape as SectionHead, but this section earns the drawn
          Scotch rule the hero has — it is the page's one photo finish. */}
      <header className="mb-10 sm:mb-12">
        <p className="eyebrow">{thePhoto.eyebrow}</p>
        <h2 className="font-display mt-4 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
          {thePhoto.headline}
        </h2>
        <div className="scotch scotch-draw mt-5 w-16" />
        <p className="mt-5 max-w-[64ch] font-serif text-base leading-relaxed text-ink-2 sm:text-lg">
          {thePhoto.intro}
        </p>
      </header>

      {/* bg-bg is required, not decorative: .island only re-tokenizes the
          custom properties, so without it the caption's light ink would sit
          on program cream and fail contrast outright. */}
      <figure className="island mt-10 overflow-hidden rounded-md border border-line bg-bg">
        {/* The print. A shade taller below sm than the desktop strip so the
            two lanes stay legible on a phone. */}
        <div className="relative aspect-[16/7] w-full sm:aspect-[16/5]">
          <svg
            viewBox="0 0 1200 375"
            // `meet`, not `slice`: a slice crop anchored at the wire hides the
            // whole left of the strip on a phone, so at the opening frame the
            // runners hadn't entered the visible crop yet and the print looked
            // broken. Letterboxing is invisible here — the bands are the same
            // colour as the print's own background.
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            <rect width="1200" height="375" fill="var(--color-bg)" />

            {/* the strip camera's frame gridlines */}
            <g stroke="var(--color-line)" strokeWidth="1">
              {Array.from({ length: FRAMES }, (_, i) => (
                <line
                  key={i}
                  x1={(i + 1) * 100}
                  y1="0"
                  x2={(i + 1) * 100}
                  y2="375"
                />
              ))}
            </g>

            {/* the wire */}
            <line
              x1={WIRE_X}
              y1="0"
              x2={WIRE_X}
              y2="375"
              stroke="var(--color-chalk)"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* The grey runs first in paint order, in the lane below. */}
            <Runner post={11} nose={noseX(frame, false)} y={250} />
            <Runner post={1} nose={noseX(frame, true)} y={108} />
          </svg>

          {/* The developer: an opaque sheet that slides off the print as the
              frame advances. Transform-only, so it stays on the compositor. */}
          <div
            aria-hidden="true"
            className="photo-develop absolute inset-0"
            style={{ '--f': frame / FRAMES } as CSSProperties}
          />

          {/* corner slug, the way a wire-cam print is stamped */}
          <p className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-2">
            {thePhoto.slug} · Frame {frame}/{FRAMES}
          </p>
        </div>

        {/* The control */}
        <div className="border-t border-line px-4 py-4 sm:px-6">
          <label
            htmlFor="photo-scrub"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-2"
          >
            {thePhoto.scrubLabel}
          </label>
          <input
            id="photo-scrub"
            type="range"
            min={0}
            max={FRAMES}
            step={1}
            value={frame}
            onChange={(e) => setFrame(Number(e.target.value))}
            aria-valuetext={thePhoto.frameText(frame, FRAMES)}
            className="photo-scrub mt-3 w-full"
          />
        </div>

        {/* The chart. Static markup — no JS and no scrubbing required to read
            the result; the only thing the slider changes is the lamp. */}
        <figcaption className="border-t border-line px-4 py-5 sm:px-6">
          <ol className="space-y-3">
            {thePhoto.result.map((row) => {
              const silk = silkFor(row.post)
              return (
                <li
                  key={row.name}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1"
                >
                  <span className="w-4 font-mono text-[12px] text-ink-2">
                    {row.place}
                  </span>
                  <span
                    className="silk"
                    style={
                      {
                        '--silk-size': '1.5rem',
                        '--silk-fs': '0.75rem',
                        background: silk.bg,
                        color: silk.fg,
                        boxShadow: silkShadow(silk),
                      } as CSSProperties
                    }
                  >
                    {row.post}
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.06em] text-ink">
                    {row.name}
                  </span>
                  <span className="basis-full pl-7 font-mono text-[12px] text-ink-2 sm:basis-auto sm:pl-0">
                    {row.figure}
                  </span>
                </li>
              )
            })}
          </ol>

          <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-2">
            {thePhoto.margin}
          </p>

          {/* The stewards' sign — the one thing the slider changes. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              aria-live="polite"
              className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${
                developed
                  ? 'photo-lamp border-amber/60 text-amber'
                  : 'border-brass/60 text-ink-2'
              }`}
            >
              {developed ? thePhoto.lampOfficial : thePhoto.lampPhoto}
            </span>
            <a
              href={thePhoto.proof.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] tracking-[0.06em] text-accent transition-colors hover:text-accent-2"
            >
              {thePhoto.proof.label} ↗
            </a>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}

// One runner, drawn the way a strip camera actually sees one at the wire:
// an extended head and neck and nothing else — no legs, no jockey, no eye.
//
// The whole shape is authored with the NOSE at local (0, 0) and the body
// running back and down from there, so positioning a runner is a single
// statement about where its nose is — which is the only measurement this
// picture is making.
//
// Driven by the SVG transform attribute rather than CSS: React re-renders only
// when the slider moves, so there is no rAF loop, no scroll listener, and no
// animation library involved in the whole set piece.
function Runner({
  post,
  nose,
  y,
}: {
  post: number
  nose: number
  y: number
}) {
  const silk = silkFor(post)
  const edge = silk.edge ?? 'rgba(0, 0, 0, 0.3)'

  return (
    <g transform={`translate(${nose} ${y})`}>
      {/* Nose → up over the bridge of the face to the poll → back along the
          crest of the neck to the shoulder → down → forward under the throat
          → the jaw → the chin → back to the nose. */}
      <path
        d="M0 0
           L -100 -31
           C -146 -31, -200 4, -250 55
           L -250 118
           C -198 98, -146 68, -110 44
           L -99 25
           C -88 32, -78 35, -70 34
           C -54 27, -34 15, -18 7
           C -11 4, -5 2, 0 0 Z"
        fill={silk.bg}
        stroke={edge}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* the ear, pricked just behind the poll */}
      <path
        d="M-96 -31 C -100 -42, -102 -48, -100 -52 C -94 -47, -88 -39, -84 -33 Z"
        fill={silk.bg}
        stroke={edge}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* The muzzle — a shade darker so the actual nose reads as a distinct
          tip and not just the blunt end of a shape. This is the part of the
          picture the margin is measured to. */}
      <path
        d="M0 0 L -40 -12 C -44 -3, -46 6, -44 14 C -28 8, -12 3, 0 0 Z"
        fill="rgba(0, 0, 0, 0.28)"
      />
      {/* the saddle cloth, riding at the base of the neck */}
      <g transform="translate(-248 60)">
        <rect
          width="44"
          height="36"
          rx="3"
          fill={silk.bg}
          stroke={edge}
          strokeWidth="1.5"
        />
        <text
          x="22"
          y="26"
          textAnchor="middle"
          fill={silk.fg}
          fontSize="21"
          fontWeight="600"
          fontFamily="var(--font-mono)"
        >
          {post}
        </text>
      </g>
    </g>
  )
}
