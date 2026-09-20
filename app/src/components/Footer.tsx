import { Logo } from './Logo'
import { site } from '../data/site'
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
            <p className="eyebrow footer-heading">Contact</p>
            <div>{site.phone}</div>
            <div>{site.email}</div>
          </div>
          <div>
            <p className="eyebrow footer-heading">Office</p>
            <div>{site.address.line1}</div>
            <div>{site.address.hours}</div>
          </div>
        </div>
      </div>

      <div className="section footer-bottom">
        <span>© {new Date().getFullYear()} {site.businessName}</span>
        {site.license && <span>{site.license}</span>}
      </div>
    </footer>
  )
}
