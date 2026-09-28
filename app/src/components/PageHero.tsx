import { Photo, type PhotoRef } from './Photo'
import './PageHero.css'

interface PageHeroProps {
  eyebrow: string
  title: string
  sub: string
  photo: PhotoRef
}

export function PageHero({ eyebrow, title, sub, photo }: PageHeroProps) {
  return (
    <header className="page-hero">
      <div className="page-hero-media">
        <Photo {...photo} priority />
      </div>
      <div className="page-hero-scrim" aria-hidden="true" />
      <div className="section page-hero-copy">
        <p className="eyebrow page-hero-eyebrow">{eyebrow}</p>
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-sub">{sub}</p>
      </div>
    </header>
  )
}
