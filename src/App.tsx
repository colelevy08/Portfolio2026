import Header from './components/Header'
import Hero from './components/Hero'
import Bento from './components/Bento'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-slate-100 selection:bg-accent/40">
      <Header />
      <main>
        <Hero />
        <Bento />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
