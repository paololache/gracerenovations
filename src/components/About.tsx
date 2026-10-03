import { company } from '../data/company'
import { revealStagger } from '../lib/motion'
import { Accented } from './Heading'
import { Photo } from './Photo'
import './About.css'

const FACTS = [
  { value: '2018', label: 'Serving homeowners since' },
  { value: 'Free', label: 'Consultations' },
  { value: 'Local', label: 'Indianapolis based' },
]

/** "On the road": the marked work truck, from the current site. */
export function About({ onConsult }: { onConsult: () => void }) {
  return (
    <section className="about" id="about">
      <div className="section about-grid" {...revealStagger}>
        <div>
          <p className="eyebrow eyebrow-rule about-eyebrow">On the road</p>
          <h2 className="about-title">
            <Accented text="Look for the" accent="orange lion" /> in your neighborhood.
          </h2>
          <p className="about-copy">
            Our marked work truck is out across Central Indiana every week — full interior and exterior renovations,
            handled by the same crew that shows up at your door. If you see it on your street, a neighbor is already
            getting their project done.
          </p>
          <div className="about-actions">
            <a href={company.phoneHref} className="btn btn-primary">
              Call {company.phone}
            </a>
            <button type="button" className="btn btn-outline-dark" onClick={onConsult}>
              Request a Free Estimate
            </button>
          </div>

          <div className="about-stats">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <div className="about-stat-value">{fact.value}</div>
                <div className="about-stat-label">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-images">
          <div className="about-image">
            <Photo
              local="truck"
              alt="Grace Renovations work truck with the orange lion logo on the door"
              radius={16}
              sizes="(max-width: 900px) 50vw, 300px"
            />
          </div>
          <div className="about-image about-image-offset">
            <Photo local="sunroom" alt="Sunroom finished by our crew" radius={16} sizes="(max-width: 900px) 50vw, 300px" />
          </div>
        </div>
      </div>
    </section>
  )
}
