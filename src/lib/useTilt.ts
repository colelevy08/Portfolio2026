import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { PointerEvent } from 'react'

// Pointer-tilt for the win-photo plates: the card leans toward the cursor a
// few degrees and a soft glare follows it, like a photo print catching the
// light. Values ride CSS custom properties consumed by `.plate` in index.css.
//
// Guards: only fine pointers (mouse/trackpad — touch never tilts) and only
// when the visitor hasn't asked for reduced motion. Handlers attach to the
// element that OWNS the `.plate` styles.
const MAX_DEG = 3.5

export function useTilt() {
  const reduce = useReducedMotion()

  return useMemo(() => {
    const finePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches
    if (reduce || !finePointer) return {}

    return {
      onPointerMove: (e: PointerEvent<HTMLElement>) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width // 0..1 across the plate
        const py = (e.clientY - r.top) / r.height
        el.style.setProperty('--tilt-y', `${(px - 0.5) * 2 * MAX_DEG}deg`)
        el.style.setProperty('--tilt-x', `${(0.5 - py) * 2 * MAX_DEG}deg`)
        el.style.setProperty('--glare-x', `${px * 100}%`)
        el.style.setProperty('--glare-y', `${py * 100}%`)
        el.style.setProperty('--glare-o', '1')
      },
      onPointerLeave: (e: PointerEvent<HTMLElement>) => {
        const el = e.currentTarget
        el.style.setProperty('--tilt-x', '0deg')
        el.style.setProperty('--tilt-y', '0deg')
        el.style.setProperty('--glare-o', '0')
      },
    }
  }, [reduce])
}
