import { reasons } from '../data/company'
import { reveal, revealStagger } from '../lib/motion'
import { Accented } from './Heading'
import './WhyChoose.css'

export function WhyChoose() {
  return (
    <section className="why on-dark">
      <div className="section">
        <div className="why-head" {...reveal}>
          <p className="eyebrow eyebrow-rule why-eyebrow">Why choose us</p>
          <h2 className="section-title">
            <Accented text="Why homeowners choose" accent="Grace Renovations." />
          </h2>
        </div>
        <ul className="why-grid" {...revealStagger}>
          {reasons.map((reason, i) => (
            <li key={reason.title} className="why-item">
              <span className="why-number">{String(i + 1).padStart(2, '0')}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
