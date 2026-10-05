import { Faq } from '../components/Faq'
import { Accented } from '../components/Heading'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { faqs } from '../data/faqs'
import { projects } from '../data/projects'
import { services } from '../data/services'
import { revealStagger } from '../lib/motion'
import { routeHref, type PageProps } from '../lib/router'
import './ServicesPage.css'

export function ServicesPage({ onConsult, onOpenProject }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Renovation services built around your home."
        sub="Whether you are updating one room or improving multiple areas, Grace Renovations LLC - Indiana provides practical renovation and remodeling support designed around quality, communication, and clean results."
        photo={{ local: 'hero-kitchen', alt: 'Kitchen with white shaker cabinets and a stainless French-door fridge' }}
      />

      <nav className="services-index" aria-label="Services">
        <div className="section services-index-inner">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => document.getElementById(`service-${service.id}`)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>{service.number}</span> {service.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="service-details">
        {services.map((service, index) => {
          const work = projects.filter((p) => p.serviceId === service.id)
          return (
            <section
              key={service.id}
              id={`service-${service.id}`}
              className={`section service-detail ${index % 2 === 1 ? 'service-detail-reverse' : ''}`}
              {...revealStagger}
            >
              <div className="service-detail-image">
                <Photo {...service.photo} radius={20} sizes="(max-width: 900px) 100vw, 580px" />
              </div>

              <div className="service-detail-copy">
                <p className="eyebrow eyebrow-rule section-eyebrow">
                  {service.number} · {service.name}
                </p>
                <h2 className="service-detail-title">
                  <Accented {...service.heading} />
                </h2>
                <p className="lede">{service.longDescription}</p>

                <ul className="service-detail-benefits">
                  {service.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="service-detail-columns">
                  <div>
                    <p className="eyebrow service-detail-subhead">What&rsquo;s included</p>
                    <ul className="check-list">
                      {service.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow service-detail-subhead">Who it&rsquo;s for</p>
                    <ul className="check-list">
                      {service.whoFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {work.length > 0 && (
                  <>
                    <p className="eyebrow service-detail-subhead">Our work</p>
                    <ul className="service-detail-examples">
                      {work.map((p) => (
                        <li key={p.id}>
                          <button type="button" className="fx-arrow-link" onClick={() => onOpenProject(p.id)}>
                            {p.title}
                            <span className="fx-arrow" aria-hidden="true">
                              →
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="service-detail-actions">
                  <button type="button" className="btn btn-primary service-detail-cta" onClick={onConsult}>
                    {service.cta}
                  </button>
                  {/* Roofing has its own page with the method and finished roofs */}
                  {service.id === 'roofing' && (
                    <a className="btn btn-outline-dark service-detail-cta" href={routeHref('roofing')}>
                      Explore our roofing page
                    </a>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <Faq title="Common questions from homeowners." items={faqs} />
      <QuoteBanner onConsult={onConsult} />
    </>
  )
}
