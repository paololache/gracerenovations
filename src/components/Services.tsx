import { services } from '../data/services'
import { routeHref } from '../lib/router'
import { Photo } from './Photo'
import './Services.css'

export function Services() {
  return (
    <section className="services" id="work">
      <div className="section">
        <div className="services-heading">
          <h2>What we take on</h2>
          <a href={routeHref('services')}>Four trades, one crew</a>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <a className="service-card" key={service.id} href={routeHref('services')}>
              <div className="service-card-image">
                <Photo {...service.photo} radius={12} sizes="(max-width: 560px) 100vw, 300px" />
              </div>
              <div className="service-number">{service.number}</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="badge badge-outline">{service.priceLabel}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
