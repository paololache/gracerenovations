import './QuoteBanner.css'

interface QuoteBannerProps {
  onStartEstimate: () => void
}

export function QuoteBanner({ onStartEstimate }: QuoteBannerProps) {
  return (
    <div className="quote-banner">
      <div className="quote-banner-inner">
        <p className="quote-banner-headline">Free estimate. A reply within one business day.</p>
        <div className="quote-banner-actions">
          <button type="button" className="btn btn-primary" onClick={onStartEstimate}>
            Start the estimate
          </button>
          <a className="btn btn-outline-light" href="tel:+15552104488">
            Call (555) 210-4488
          </a>
        </div>
      </div>
    </div>
  )
}
