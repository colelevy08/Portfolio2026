import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import History from './components/History'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-slate-100 selection:bg-accent/40">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <History />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
