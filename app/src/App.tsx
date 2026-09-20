import { useState } from 'react'
import { Hero } from './components/Hero'
import { ClientStories } from './components/ClientStories'
import { QuoteBanner } from './components/QuoteBanner'
import { RecentProjects } from './components/RecentProjects'
import { Services } from './components/Services'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { QuoteFlow } from './components/QuoteFlow'

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <>
      <Hero onStartEstimate={() => setQuoteOpen(true)} />
      <ClientStories />
      <QuoteBanner onStartEstimate={() => setQuoteOpen(true)} />
      <RecentProjects />
      <Services />
      <About />
      <Footer />
      <QuoteFlow open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}

export default App
