import { useCallback, useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { LeadPopup } from './components/LeadPopup'
import { SiteHeader } from './components/SiteHeader'
import { StoryModal } from './components/StoryModal'
import { projectById } from './data/projects'
import { initTouchActive, useReveal } from './effects'
import { PAGE_TITLES, useHashRoute } from './lib/router'
import { markLeadSeen, useLeadTrigger } from './lib/useLeadTrigger'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { RoofingPage } from './pages/RoofingPage'
import { ServicesPage } from './pages/ServicesPage'

const PAGES = {
  home: HomePage,
  services: ServicesPage,
  roofing: RoofingPage,
  gallery: GalleryPage,
  about: AboutPage,
  contact: ContactPage,
}

function App() {
  const [projectId, setProjectId] = useState<string | null>(null)
  const [leadPending, setLeadPending] = useState(false)
  const [leadSource, setLeadSource] = useState('')
  const route = useHashRoute()
  const Page = PAGES[route]
  const closeProject = useCallback(() => setProjectId(null), [])
  const closeLead = useCallback(() => setLeadPending(false), [])

  const openLead = (source: string) => {
    setLeadSource(source)
    setLeadPending(true)
  }

  /** Every "Schedule a free consultation" button opens the form popup. */
  const consult = () => {
    markLeadSeen()
    openLead('Consultation button')
  }

  useLeadTrigger(route, () => openLead('Success stories popup'))
  // Wait for an open project to close before interrupting.
  const leadOpen = leadPending && !projectId

  useEffect(() => {
    document.title = PAGE_TITLES[route]
  }, [route])

  // Wire the scroll reveals of whichever page is showing
  useReveal(undefined, [route])
  // Touch screens: card hover effects play while a card is centred on screen
  useEffect(() => initTouchActive(), [route])

  return (
    <>
      <div className="site-shell">
        <SiteHeader route={route} onConsult={consult} />
        <main>
          <Page onConsult={consult} onOpenProject={setProjectId} />
        </main>
      </div>
      <Footer />
      <StoryModal
        project={projectId ? (projectById(projectId) ?? null) : null}
        onClose={closeProject}
        onConsult={consult}
      />
      <LeadPopup open={leadOpen} source={leadSource} onClose={closeLead} />
    </>
  )
}

export default App
