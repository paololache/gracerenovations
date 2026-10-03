import { About } from '../components/About'
import { Hero } from '../components/Hero'
import { ProcessPreview } from '../components/ProcessPreview'
import { ProjectMap } from '../components/ProjectMap'
import { QuoteBanner } from '../components/QuoteBanner'
import { RecentProjects } from '../components/RecentProjects'
import { Services } from '../components/Services'
import { Testimonials } from '../components/Testimonials'
import type { PageProps } from '../lib/router'

export function HomePage({ onStartEstimate, onOpenStory, onRequestEstimate }: PageProps) {
  return (
    <>
      <Hero onStartEstimate={onStartEstimate} />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
      <RecentProjects onOpenStory={onOpenStory} />
      <Services />
      <ProcessPreview />
      <About />
      <ProjectMap onOpenStory={onOpenStory} />
      <Testimonials />
    </>
  )
}
