// Portmint's official logo mark — a mint-framed "porthole" (a window into deep
// ocean water). Markup mirrors Portmint's own /public/logo-mark.svg so the
// brand reads exactly on this portfolio. Decorative here (aria-hidden); the
// surrounding card already names Portmint.
export default function PortmintMark({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pm-mint"
          x1="14"
          y1="12"
          x2="50"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5cf0c4" />
          <stop offset="1" stopColor="#2bd3a6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="23.5" fill="#07182c" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke="url(#pm-mint)" strokeWidth="5" />
      <g fill="#34e0b3">
        <circle cx="48" cy="32" r="2" />
        <circle cx="43.3" cy="43.3" r="2" />
        <circle cx="32" cy="48" r="2" />
        <circle cx="20.7" cy="43.3" r="2" />
        <circle cx="16" cy="32" r="2" />
        <circle cx="20.7" cy="20.7" r="2" />
        <circle cx="32" cy="16" r="2" />
        <circle cx="43.3" cy="20.7" r="2" />
      </g>
    </svg>
  )
}
