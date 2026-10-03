import { Faq } from '../components/Faq'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { serviceFaqs } from '../data/faqs'
import { formatCost, projects } from '../data/projects'
import { otherTrades, services } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import type { PageProps } from '../lib/router'
import './ServicesPage.css'

export function ServicesPage({ onRequestEstimate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four trades, one crew, prices on the page."
        sub="Kitchens, bathrooms, whole homes and additions. Each one below shows what is included, how long we are on site and what our last jobs actually cost."
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
          const examples = projects.filter((p) => p.serviceId === service.id).slice(0, 2)
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
                <p className="eyebrow section-eyebrow">{service.number}</p>
                <h2 className="service-detail-title">{service.name}</h2>
                <p className="lede">{service.longDescription}</p>

                <div className="service-detail-facts">
                  <div>
                    <span className="service-detail-fact-label">Typical cost</span>
                    <span className="service-detail-fact-value">{service.priceLabel}</span>
                  </div>
                  <div>
                    <span className="service-detail-fact-label">Time on site</span>
                    <span className="service-detail-fact-value">{service.timeline}</span>
                  </div>
                </div>

                <p className="eyebrow service-detail-subhead">What is included</p>
                <ul className="service-detail-list">
                  {service.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="eyebrow service-detail-subhead">Recent examples</p>
                <ul className="service-detail-examples">
                  {examples.map((p) => (
                    <li key={p.id}>
                      <a href={routeHref('projects')}>{p.title}</a>
                      <span>
                        {p.duration}, {formatCost(p.cost)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </div>

      <section className="other-trades">
        <div className="section">
          <div className="section-head" {...reveal}>
            <div>
              <p className="eyebrow section-eyebrow">In-house trades</p>
              <h2 className="section-title">Everything the big jobs need, done by the same crew.</h2>
            </div>
          </div>
          <div className="other-trades-grid" {...revealStagger}>
            {otherTrades.map((trade) => (
              <div key={trade.name} className="other-trade">
                <h3>{trade.name}</h3>
                <p>{trade.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Questions about the work" items={serviceFaqs} />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
    </>
  )
}
