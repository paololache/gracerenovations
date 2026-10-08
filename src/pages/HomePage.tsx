import { useRef } from 'react'
import { About } from '../components/About'
import { ContactSection } from '../components/ContactSection'
import { Faq } from '../components/Faq'
import { FloatingConsult } from '../components/FloatingConsult'
import { GoogleReviews } from '../components/GoogleReviews'
import { Hero } from '../components/Hero'
import { ProcessPreview } from '../components/ProcessPreview'
import { ProjectMap } from '../components/ProjectMap'
import { QuoteBanner } from '../components/QuoteBanner'
import { ServicesShowcase } from '../components/ServicesShowcase'
import { SuccessStories } from '../components/SuccessStories'
import { TrustStrip } from '../components/TrustStrip'
import { WhyChoose } from '../components/WhyChoose'
import { faqs } from '../data/faqs'
import { storyProjects } from '../data/projects'
import { useCurtain } from '../effects'
import type { PageProps } from '../lib/router'

export function HomePage({ onConsult, onOpenProject }: PageProps) {
  const curtain = useRef<HTMLDivElement>(null)
  // The service-area map stays put and fades back while the consultation form slides up over it
  // A tall section still reads in full: it only pins once its bottom edge reaches the screen
  useCurtain(curtain, { minWidth: 0, maxHeight: 4 })

  return (
    <>
      <Hero onConsult={onConsult} onOpenProject={onOpenProject} />
      <TrustStrip />
      <ServicesShowcase onConsult={onConsult} />
      <SuccessStories projects={storyProjects} onOpenProject={onOpenProject} />
      <GoogleReviews />
      <WhyChoose />
      <ProcessPreview onConsult={onConsult} />
      <About onConsult={onConsult} />
      <div className="fx-curtain" ref={curtain}>
        <ProjectMap className="fx-curtain__under" />
        <ContactSection className="fx-curtain__over" />
      </div>
      <Faq title="Common questions from homeowners." items={faqs.slice(0, 5)} />
      <QuoteBanner onConsult={onConsult} />
      {/* From the success stories on, a consultation is always one tap away */}
      <FloatingConsult onConsult={onConsult} startId="projects" hideId="consultation" />
    </>
  )
}
