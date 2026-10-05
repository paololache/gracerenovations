import { company, serviceArea } from '../data/company'
import { services } from '../data/services'
import { NAV_ITEMS, routeHref, serviceHref } from '../lib/router'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="section footer-top">
        <div className="footer-about">
          <Logo dark />
          <p>
            {company.legalName} helps homeowners across Indianapolis and Central Indiana transform outdated spaces with
            reliable renovation, remodeling, painting, and home improvement services. Since {company.since}.
          </p>
          <p className="footer-contact">
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={company.emailHref}>{company.email}</a>
            <span>{company.address}</span>
          </p>
        </div>

        <div className="footer-columns">
          <div>
            <p className="eyebrow footer-heading">Navigate</p>
            {NAV_ITEMS.filter((item) => item.route !== 'home').map((item) => (
              <div key={item.route}>
                <a href={routeHref(item.route)}>{item.label}</a>
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow footer-heading">Services</p>
            {services.map((service) => (
              <div key={service.id}>
                <a href={serviceHref(service.id)}>{service.name}</a>
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow footer-heading">Service areas</p>
            {serviceArea.map((area) => (
              <div key={area}>{area}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="section footer-bottom">
        <span>© 2026 {company.legalName}. All rights reserved.</span>
        <span>
          Kitchen renovations, bathroom renovations, sunrooms &amp; interiors, interior painting, remodeling, and home improvements in
          Indianapolis and Central Indiana.
        </span>
      </div>
    </footer>
  )
}
