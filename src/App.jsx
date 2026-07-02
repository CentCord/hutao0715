import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PlumBlossoms from './components/effects/PlumBlossoms'
import Hero from './sections/Hero'

const Recruitment = lazy(() => import('./sections/Recruitment'))
const About = lazy(() => import('./sections/About'))
const OfflineEvents = lazy(() => import('./sections/OfflineEvents'))

function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper overflow-x-hidden">
      <PlumBlossoms />
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Suspense fallback={null}>
          <Recruitment />
          <About />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <OfflineEvents />
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
