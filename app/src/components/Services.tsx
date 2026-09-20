import { ImagePlaceholder } from './ImagePlaceholder'
import { services } from '../data/services'
import './Services.css'

export function Services() {
  return (
    <section className="services" id="services">
      <div className="section">
        <div className="services-heading">
          <h2>What we take on</h2>
          <span>Five trades, one crew</span>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.id}>
              <div className="service-card-image">
                <ImagePlaceholder shape="rounded" radius={16} caption={service.imageCaption} />
              </div>
              <div className="service-card-body">
                <div className="service-number">{service.number}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
