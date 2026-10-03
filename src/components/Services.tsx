import { services } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import { serviceHref } from '../lib/router'
import { Accented } from './Heading'
import { Photo } from './Photo'
import './Services.css'

export function Services({ onConsult }: { onConsult: () => void }) {
  return (
    <section className="services" id="work">
      <div className="section">
        <div className="services-heading" {...reveal}>
          <p className="eyebrow eyebrow-rule section-eyebrow">Our services</p>
          <h2 className="section-title">
            <Accented text="Renovation services built around" accent="your home." />
          </h2>
          <p className="lede">
            Whether you are updating one room or improving multiple areas of your home, Grace Renovations provides
            practical renovation and remodeling support designed around quality, communication, and clean results.
          </p>
        </div>

        <div className="services-grid" {...revealStagger}>
          {services.map((service) => (
            <a className="service-card fx-card" key={service.id} href={serviceHref(service.id)}>
              <div className="service-card-image fx-zoom">
                <Photo {...service.photo} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 400px" />
              </div>
              <div className="service-card-body">
                <span className="service-number">{service.number}</span>
                <h3 className="fx-card__title">{service.name}</h3>
                <p>{service.description}</p>
                <span className="service-link">
                  View service{' '}
                  <span className="fx-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="services-close" {...reveal}>
          <p>Have a renovation project in mind? Tell us what you need and request a free consultation.</p>
          <button type="button" className="btn btn-primary" onClick={onConsult}>
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
