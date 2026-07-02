import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import Work from './components/Work'
import Testimonials from './components/Testimonials'
import Skills from './components/Skills'
import AIWorkflow from './components/AIWorkflow'
import About from './components/About'
import Path from './components/Path'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PortmintWidget from './components/PortmintWidget'

// Thin centered divider rendered between major sections.
function Divider() {
  return (
    <div className="mx-auto max-w-[1200px] px-6">
      <div className="hairline" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header />
      <main>
        <Hero />
        <Divider />
        <FeaturedWork />
        <Divider />
        <Work />
        <Testimonials />
        <Divider />
        <Skills />
        <Divider />
        <AIWorkflow />
        <Divider />
        <About />
        <Divider />
        <Path />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <PortmintWidget />
    </div>
  )
}
