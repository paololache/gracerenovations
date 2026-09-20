import { ImagePlaceholder } from './ImagePlaceholder'
import { site } from '../data/site'
import './About.css'

export function About() {
  return (
    <section className="about" id="about">
      <div className="section about-grid">
        <div>
          <p className="eyebrow about-eyebrow">About</p>
          <h2 className="about-title">A local crew that treats your home like the job site it is.</h2>
          <p className="about-copy">
            We do not subcontract the work we are known for. The person who prices your job is on site the day it
            starts, and stays until the last coat of paint.
          </p>
          <p className="about-copy">
            Written schedule before demolition, and clear updates while we are in your house — from the first
            estimate through the final walkthrough.
          </p>
          <a href="#crew" className="btn btn-primary about-cta">
            Meet the crew
          </a>

          <div className="about-stats">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-images">
          <div className="about-image">
            <ImagePlaceholder shape="rounded" radius={16} caption="Crew on site" />
          </div>
          <div className="about-image about-image-offset">
            <ImagePlaceholder shape="rounded" radius={16} caption="Detail shot" />
          </div>
        </div>
      </div>
    </section>
  )
}
