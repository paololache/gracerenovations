import { useRef } from 'react'
import { About } from '../components/About'
import { ContactSection } from '../components/ContactSection'
import { Hero } from '../components/Hero'
import { ProcessPreview } from '../components/ProcessPreview'
import { ProjectMap } from '../components/ProjectMap'
import { QuoteBanner } from '../components/QuoteBanner'
import { RecentProjects } from '../components/RecentProjects'
import { Services } from '../components/Services'
import { Testimonials } from '../components/Testimonials'
import { useCurtain } from '../effects'
import type { PageProps } from '../lib/router'

export function HomePage({ onStartEstimate, onOpenStory, onRequestEstimate }: PageProps) {
  const curtain = useRef<HTMLDivElement>(null)
  // The project map stays put and fades back while the contact section slides up over it
  useCurtain(curtain)

  return (
    <>
      <Hero onStartEstimate={onStartEstimate} />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
      <RecentProjects onOpenStory={onOpenStory} />
      <Services />
      <ProcessPreview />
      <About />
      <div className="fx-curtain" ref={curtain}>
        <ProjectMap onOpenStory={onOpenStory} className="fx-curtain__under" />
        <ContactSection className="fx-curtain__over" />
      </div>
      <Testimonials />
    </>
  )
}
