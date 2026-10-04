import { localPhotos, type LocalPhoto } from '../assets/photos'
import { company } from '../data/company'
import { services, type Service } from '../data/services'
import { serviceHref } from '../lib/router'
import { HeroCarousel, type HeroCarouselItem } from './ui/hero-carousel'
import './Hero.css'

const image = (name: LocalPhoto, alt: string) => ({
  src: localPhotos[name].large,
  srcSet: `${localPhotos[name].small} 640w, ${localPhotos[name].large} 1280w`,
  alt,
})

/** One slide per service, on Grace's own job photos; each backdrop takes a tone of the brand navy. */
const SLIDES: { id: Service['id']; title: string; accent: string; photo: LocalPhoto; tint: string }[] = [
  { id: 'kitchen', title: 'Kitchen', accent: 'renovations.', photo: 'kitchen', tint: '#1f3566' },
  { id: 'bathroom', title: 'Bathroom', accent: 'renovations.', photo: 'bathroom', tint: '#1a2d57' },
  { id: 'sunroom', title: 'Sunrooms &', accent: 'interiors.', photo: 'sunroom', tint: '#24396b' },
  { id: 'painting', title: 'Interior', accent: 'painting.', photo: 'painting', tint: '#1f3566' },
  { id: 'exterior', title: 'Decks &', accent: 'exteriors.', photo: 'deck', tint: '#1c3160' },
  { id: 'remodeling', title: 'Remodeling', accent: '& improvements.', photo: 'exterior', tint: '#223868' },
  { id: 'roofing', title: 'Roof repairs', accent: '& replacement.', photo: 'roofing-2', tint: '#1a2d57' },
]

const ITEMS: HeroCarouselItem[] = SLIDES.map((slide) => {
  const service = services.find((s) => s.id === slide.id)!
  return {
    id: slide.id,
    title: slide.title,
    accent: slide.accent,
    image: image(slide.photo, service.photo.alt),
    credit: `Service ${service.number}`,
    link: { href: serviceHref(slide.id), label: `View ${service.tag}` },
    tint: slide.tint,
  }
})

export function Hero({ onConsult }: { onConsult: () => void }) {
  return (
    <header className="hero">
      <HeroCarousel
        items={ITEMS}
        autoplay
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
