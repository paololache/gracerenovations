import { company } from '../data/company'
import { Accented } from './Heading'
import './QuoteBanner.css'

/** Closing call to action, as on the current site. */
export function QuoteBanner({ onConsult }: { onConsult: () => void }) {
  return (
    <section className="quote-banner on-dark">
      <div className="quote-banner-inner" data-fx-reveal="fade-up" data-fx-reveal-duration="900" data-fx-reveal-stagger="120">
        <div>
          <p className="eyebrow eyebrow-rule quote-banner-eyebrow">Ready when you are</p>
          <h2 className="quote-banner-headline">
            <Accented text="Ready to fall in love with" accent="your home again?" />
          </h2>
          <p className="quote-banner-sub">
            From kitchens and bathrooms to painting, sunrooms, and interior renovations, Grace Renovations helps turn
            outdated spaces into functional, finished areas.
          </p>
        </div>
        <div className="quote-banner-actions">
          <button type="button" className="btn btn-primary" onClick={onConsult}>
            Schedule a Free Consultation
          </button>
          <a className="btn btn-outline-light" href={company.phoneHref}>
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
