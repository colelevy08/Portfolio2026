import type { Project } from '../../data/content'
import PortmintMark from './PortmintMark'

// On-brand visual for a featured card that has no screenshot. Renders the
// product's own mark/wordmark on its brand background with a soft accent glow.
export default function BrandPlate({ p }: { p: Project }) {
  const brand = p.brand
  if (!brand) return null

  const isSans = brand.wordmarkFont === 'sans'
  // Gradient wordmark when the brand defines one; otherwise a flat accent fill.
  const wordmarkStyle = brand.gradient
    ? {
        backgroundImage: brand.gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text' as const,
        color: 'transparent',
      }
    : { color: brand.accent }

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: brand.bg }}
    >
      {/* Soft brand-color glow */}
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[120%] w-[80%] -translate-x-1/2 rounded-full blur-[80px]"
        style={{ background: brand.accent, opacity: 0.22 }}
        aria-hidden="true"
      />
      {/* Hairline grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            `linear-gradient(${brand.accent} 1px, transparent 1px), linear-gradient(90deg, ${brand.accent} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        {p.slug === 'portmint' ? (
          <PortmintMark size={60} />
        ) : (
          <QuantMark accent={brand.accent} />
        )}

        <p
          className={`${isSans ? 'font-sans font-extrabold tracking-tight' : 'font-serif'} text-4xl leading-none sm:text-5xl`}
          style={wordmarkStyle}
        >
          {p.title}
        </p>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2">
          {brand.tagline}
        </p>
      </div>
    </div>
  )
}

// A small candlestick + uptrend motif for the (un-branded) quant card.
function QuantMark({ accent }: { accent: string }) {
  // Each candle: [x, bodyTop, bodyH, wickTop, wickH]
  const candles = [
    [4, 30, 10, 26, 18],
    [16, 22, 14, 18, 22],
    [28, 26, 8, 22, 16],
    [40, 14, 18, 10, 26],
    [52, 18, 12, 14, 20],
    [64, 8, 16, 5, 24],
  ]
  return (
    <svg width="84" height="48" viewBox="0 0 76 48" fill="none" aria-hidden="true">
      {/* Uptrend line through the candles */}
      <path
        d="M4 34 L16 26 L28 28 L40 18 L52 22 L70 12"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <g stroke={accent} strokeWidth="1.5">
        {candles.map(([x, , , wickTop, wickH], i) => (
          <line key={`w${i}`} x1={x} y1={wickTop} x2={x} y2={wickTop + wickH} />
        ))}
      </g>
      <g fill={accent}>
        {candles.map(([x, top, h], i) => (
          <rect key={`c${i}`} x={x - 3} y={top} width="6" height={h} rx="1" />
        ))}
      </g>
    </svg>
  )
}
