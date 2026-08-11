import { lazy, Suspense } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { ui } from './data/content'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import Work from './components/Work'
import ThePhoto from './components/ThePhoto'
import Testimonials from './components/Testimonials'
import Skills from './components/Skills'
import AIWorkflow from './components/AIWorkflow'
import About from './components/About'
import Path from './components/Path'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
import PortmintWidget from './components/PortmintWidget'

// Contact drags in the Formspree client, which nothing above the fold needs.
// Splitting it out keeps that weight off the first paint; the Suspense
// fallback reserves the section's height so the split can't cause a layout
// shift while the chunk arrives.
const Contact = lazy(() => import('./components/Contact'))

// Furlong-pole divider between major sections. The labels count down the
// stretch — 7F at the top of the card to 1F before the turn for home — and
// the pole stripes follow the real scheme: quarter poles red/white (even
// furlongs), eighth poles green/white (odd).
function Divider({ furlong }: { furlong: number }) {
  const quarter = furlong % 2 === 0
  return (
    <div className="px-4 sm:px-6" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="hairline flex-1" />
        <span className={`fpole ${quarter ? 'fpole-q' : 'fpole-e'}`} />
        <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
          {furlong}F
        </span>
        <div className="hairline flex-1" />
      </div>
    </div>
  )
}

// The final divider before Contact — the finish. A doubled hairline, the way
// the wire is drawn on a track diagram; a single photo-finish flash sweeps
// across it the first time it enters view.
function Wire() {
  return (
    <div className="px-4 sm:px-6" aria-hidden="true">
      <div className="relative flex items-center gap-4 overflow-hidden py-1">
        <div className="flex-1 space-y-[3px]">
          <div className="hairline" />
          <div className="hairline" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          The wire
        </span>
        <div className="flex-1 space-y-[3px]">
          <div className="hairline" />
          <div className="hairline" />
        </div>
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ left: '-12%', opacity: 0 }}
          whileInView={{ left: '108%', opacity: [0, 0.9, 0] }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    // reducedMotion="user" collapses every Framer transform animation to a
    // plain fade when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-bg text-ink">
      {/* Keyboard users can vault the sticky header straight to the program. */}
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      {/* The grandstand awning — crowns the page and scrolls away. */}
      <div className="awning-wrap" aria-hidden="true">
        <div className="awning" />
      </div>
      <Header />
      <main id="main">
        <Hero />
        <Divider furlong={8} />
        {/* The papers run first: credentials before the field, so the card is
            read by someone who already knows what's backing it. */}
        <Certifications />
        <Divider furlong={7} />
        <FeaturedWork />
        <Divider furlong={6} />
        <Work />
        <Divider furlong={5} />
        <ThePhoto />
        <Testimonials />
        <Divider furlong={4} />
        <Skills />
        <Divider furlong={3} />
        <AIWorkflow />
        <Divider furlong={2} />
        <About />
        <Divider furlong={1} />
        <Path />
        <Wire />
        <Suspense fallback={<div className="min-h-[640px]" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <PortmintWidget />
    </div>
    </MotionConfig>
  )
}
