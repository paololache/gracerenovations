import { useCallback, useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { LeadPopup } from './components/LeadPopup'
import { QuoteFlow } from './components/QuoteFlow'
import { SiteHeader } from './components/SiteHeader'
import { StoryModal } from './components/StoryModal'
import { storyFor } from './data/stories'
import { PAGE_TITLES, useHashRoute } from './lib/router'
import { markLeadSeen, useLeadTrigger } from './lib/useLeadTrigger'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { HowWeWorkPage } from './pages/HowWeWorkPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ServicesPage } from './pages/ServicesPage'

const PAGES = {
  home: HomePage,
  services: ServicesPage,
  projects: ProjectsPage,
  about: AboutPage,
  'how-we-work': HowWeWorkPage,
}

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [storyId, setStoryId] = useState<string | null>(null)
  const [leadPending, setLeadPending] = useState(false)
  const [leadSource, setLeadSource] = useState('')
  const route = useHashRoute()
  const Page = PAGES[route]
  const openQuote = () => {
    setLeadPending(false)
    setQuoteOpen(true)
  }
  const closeStory = useCallback(() => setStoryId(null), [])
  const closeLead = useCallback(() => setLeadPending(false), [])

  const openLead = (source: string) => {
    setLeadSource(source)
    setLeadPending(true)
  }

  useLeadTrigger(route, () => openLead('Success stories popup'))
  // Wait for any open story or estimate to close before interrupting.
  const leadOpen = leadPending && !storyId && !quoteOpen

  useEffect(() => {
    document.title = PAGE_TITLES[route]
  }, [route])

  return (
    <>
      <div className="site-shell">
        <SiteHeader route={route} onStartEstimate={openQuote} />
        <main>
          <Page
            onStartEstimate={openQuote}
            onOpenStory={setStoryId}
            onRequestEstimate={() => {
              markLeadSeen()
              openLead('Start the estimate button')
            }}
          />
        </main>
      </div>
      <Footer />
      <StoryModal story={storyId ? (storyFor(storyId) ?? null) : null} onClose={closeStory} onStartEstimate={openQuote} />
      <LeadPopup open={leadOpen} source={leadSource} onClose={closeLead} />
      <QuoteFlow open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}

export default App
