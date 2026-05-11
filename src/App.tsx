import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Path from './components/Path'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="hairline" />
        </div>
        <Work />
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="hairline" />
        </div>
        <About />
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="hairline" />
        </div>
        <Path />
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="hairline" />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
