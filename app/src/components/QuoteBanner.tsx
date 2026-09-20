import { site } from '../data/site'
import './QuoteBanner.css'

interface QuoteBannerProps {
  onStartEstimate: () => void
}

export function QuoteBanner({ onStartEstimate }: QuoteBannerProps) {
  return (
    <div className="quote-banner">
      <div className="quote-banner-inner">
        <p className="quote-banner-headline">Six questions. A range in two minutes.</p>
        <div className="quote-banner-actions">
          <button type="button" className="btn btn-primary" onClick={onStartEstimate}>
            Start the estimate
          </button>
          <a className="btn btn-outline-light" href={site.phoneHref}>
            Call {site.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
