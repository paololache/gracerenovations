import { localPhotos, type LocalPhoto } from '../assets/photos'
import { company } from '../data/company'
import { projects } from '../data/projects'
import { services, type Service } from '../data/services'
import { HeroCarousel, type HeroCarouselItem } from './ui/hero-carousel'
import './Hero.css'

const image = (name: LocalPhoto, alt: string) => ({
  src: localPhotos[name].large,
  srcSet: `${localPhotos[name].small} 640w, ${localPhotos[name].large} 1280w`,
  alt,
})

/** One slide per service, on Grace's own job photos, shown in their natural colours. */
const SLIDES: { id: Service['id']; title: string; accent: string; photo: LocalPhoto; position?: string }[] = [
  { id: 'sunroom', title: 'Sunrooms &', accent: 'interiors.', photo: 'sunroom' },
  { id: 'roofing', title: 'Roof repairs', accent: '& replacement.', photo: 'roofing-2' },
  { id: 'remodeling', title: 'Remodeling', accent: '& improvements.', photo: 'exterior' },
  { id: 'exterior', title: 'Decks &', accent: 'exteriors.', photo: 'deck' },
  { id: 'bathroom', title: 'Bathroom', accent: 'renovations.', photo: 'bathroom' },
  // The wide shot of the remodeled kitchen: ceiling to floor, so the room feels big
  { id: 'kitchen', title: 'Kitchen', accent: 'renovations.', photo: 'hero-kitchen', position: '50% 58%' },
  { id: 'painting', title: 'Interior', accent: 'painting.', photo: 'painting' },
]

const ITEMS: HeroCarouselItem[] = SLIDES.map((slide) => {
  const service = services.find((s) => s.id === slide.id)!
  return {
    id: slide.id,
    title: slide.title,
    accent: slide.accent,
    image: { ...image(slide.photo, service.photo.alt), position: slide.position },
  }
})

/** Each slide opens the success story of a project from that service. */
const PROJECT_FOR_SLIDE = SLIDES.map((slide) => projects.find((p) => p.serviceId === slide.id)?.id)

interface HeroProps {
  onConsult: () => void
  onOpenProject: (projectId: string) => void
}

export function Hero({ onConsult, onOpenProject }: HeroProps) {
  return (
    <header className="hero">
      <HeroCarousel
        items={ITEMS}
        autoplay
        selectLabel="View project"
        onSelect={(i) => {
          const id = PROJECT_FOR_SLIDE[i]
          if (id) onOpenProject(id)
        }}
        eyebrow={
          <h1 className="hero-h1">Renovation &amp; remodeling in Indianapolis, Indiana · Since {company.since}</h1>
        }
      >
        <button type="button" className="btn btn-primary" onClick={onConsult}>
          <span className="hero-cta-long">Schedule a&nbsp;</span>Free Consultation
        </button>
        <a className="btn btn-outline-light" href={company.phoneHref}>
          Call<span className="hero-cta-long">&nbsp;{company.phone}</span>
        </a>
      </HeroCarousel>
    </header>
  )
}
