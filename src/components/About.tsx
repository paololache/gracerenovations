import { stats } from '../data/company'
import { revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import { Photo } from './Photo'
import './About.css'

export function About() {
  return (
    <section className="about" id="about">
      <div className="section about-grid" {...revealStagger}>
        <div>
          <p className="eyebrow about-eyebrow">About</p>
          <h2 className="about-title">Nine people, one county, since 2009.</h2>
          <p className="about-copy">
            We do not subcontract the work we are known for. The person who prices your job is on site the day it
            starts, and stays until the last coat of paint.
          </p>
          <p className="about-copy">
            Licensed, bonded and insured. Written schedule before demolition, weekly updates while we are in your
            house, and a final invoice we publish next to the photos.
          </p>
          <a href={routeHref('about')} className="btn btn-primary about-cta">
            Meet the crew
          </a>

          <div className="about-stats">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-images">
          <div className="about-image">
            <Photo
              local="truck"
              alt="Grace work truck with the lion logo on the door"
              radius={16}
              sizes="(max-width: 900px) 50vw, 300px"
            />
          </div>
          <div className="about-image about-image-offset">
            <Photo
              local="exterior"
              alt="Screened garden room built by our crew"
              radius={16}
              sizes="(max-width: 900px) 50vw, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
