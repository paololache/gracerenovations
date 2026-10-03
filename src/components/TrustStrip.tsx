import { trustPoints } from '../data/company'
import './TrustStrip.css'

/** Navy band of proof points under the hero, as on the current site. */
export function TrustStrip() {
  return (
    <div className="trust-strip">
      <ul className="trust-strip-list" data-fx-reveal="fade" data-fx-reveal-duration="700" data-fx-reveal-stagger="90" data-fx-reveal-offset="0">
        {trustPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  )
}
