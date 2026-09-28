import { NAV_ITEMS, routeHref } from '../lib/router'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="section footer-top">
        <div className="footer-about">
          <Logo dark />
          <p>Estimates are free and there is no visit until you ask for one.</p>
        </div>

        <div className="footer-columns">
          <div>
            <p className="eyebrow footer-heading">Pages</p>
            {NAV_ITEMS.map((item) => (
              <div key={item.route}>
                <a href={routeHref(item.route)}>{item.label}</a>
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow footer-heading">Contact</p>
            <div>
              <a href="tel:+15552104488">(555) 210-4488</a>
            </div>
            <div>
              <a href="mailto:hello@gracebuildingco.com">hello@gracebuildingco.com</a>
            </div>
          </div>
          <div>
            <p className="eyebrow footer-heading">Office</p>
            <div>418 Mill Road, Suite 2</div>
            <div>Millbrook</div>
            <div>Mon–Fri, 7am–5pm</div>
          </div>
        </div>
      </div>

      <div className="section footer-bottom">
        <span>© 2026 Grace Building Co.</span>
        <span>License #CB-104772</span>
      </div>
    </footer>
  )
}
