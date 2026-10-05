import { Accented } from '../components/Heading'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { WhyChoose } from '../components/WhyChoose'
import { company, serviceArea } from '../data/company'
import { revealStagger } from '../lib/motion'
import type { PageProps } from '../lib/router'
import './AboutPage.css'

const POINTS = [
  'Locally based in Indianapolis, Indiana',
  'Renovation experience since 2018',
  'Kitchen, bathroom, and sunroom & interior focus',
  'Practical solutions for outdated spaces',
  'Clear communication throughout the project',
]

export function AboutPage({ onConsult }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A local renovation contractor for Central Indiana homeowners."
        sub="Grace Renovations LLC - Indiana helps homeowners transform outdated spaces with reliable renovation, remodeling, painting, and home improvement services."
        photo={{ local: 'truck', alt: 'Grace Renovations work truck with the orange lion logo on the door' }}
      />

      <section className="about-story">
        <div className="section about-story-grid" {...revealStagger}>
          <div>
            <p className="eyebrow eyebrow-rule section-eyebrow">Who we are</p>
            <h2 className="section-title about-story-title">
              <Accented text="Built around communication &" accent="craftsmanship." />
            </h2>
            <p className="lede">
              {company.legalName} is a local renovation and remodeling contractor based in Indianapolis, serving
              homeowners across Central Indiana since {company.since}. We focus on the work that helps your home function
              better and feel finished — kitchens, bathrooms, sunrooms &amp; interiors, interior painting, and broader renovation
              projects.
            </p>
            <p className="lede">
              Our goal is simple: clear communication, practical planning, and clean finish work you can be proud of.
              Whether you&rsquo;re updating a single room or improving multiple areas of your home, we&rsquo;ll walk
              through the project with you so you know what to expect before work begins.
            </p>
            <ul className="check-list about-points">
              {POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="about-story-images">
            <div className="about-story-image-tall">
              <Photo local="painting" alt="Living room repainted in slate blue with white trim" radius={20} sizes="(max-width: 900px) 100vw, 560px" />
            </div>
            <div>
              <Photo local="bathroom" alt="Bathroom with botanical wallpaper and a gold arched mirror" radius={20} sizes="(max-width: 900px) 50vw, 270px" />
            </div>
            <div>
              <Photo local="sunroom" alt="Sunroom with a green feature wall and shiplap ceiling" radius={20} sizes="(max-width: 900px) 50vw, 270px" />
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />

      <section className="about-credentials">
        <div className="section about-credentials-grid" {...revealStagger}>
          <div className="about-credentials-card">
            <p className="eyebrow eyebrow-rule section-eyebrow">Contact</p>
            <p className="lede">Call or request a free consultation — we respond promptly.</p>
            <ul className="about-credentials-list">
              <li>
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <a href={company.emailHref}>{company.email}</a>
              </li>
              <li>{company.address}</li>
            </ul>
          </div>
          <div className="about-credentials-card">
            <p className="eyebrow eyebrow-rule section-eyebrow">Service areas</p>
            <p className="lede about-area-copy">
              Serving Indianapolis, Speedway, Carmel, Fishers, Brownsburg, and surrounding Central Indiana communities.
            </p>
            <div className="about-area-list">
              {serviceArea.map((area) => (
                <span key={area} className="badge badge-outline">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteBanner onConsult={onConsult} />
    </>
  )
}
