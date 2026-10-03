import { company, serviceArea } from '../data/company'
import { MAP_HEIGHT, MAP_WIDTH, OFFICE_TOWN, mapTowns } from '../data/serviceMap'
import { revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import { Accented } from './Heading'
import './ProjectMap.css'

const pct = (value: number, of: number) => `${(value / of) * 100}%`

/** Illustrated, not to scale: the ring road, highways and river only frame where the towns sit. */
function MapArt() {
  return (
    <svg className="project-map-art" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
      <defs>
        <pattern id="map-streets" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <path d="M0 0H13M0 0V13" className="map-street" />
        </pattern>
        <pattern id="map-streets-b" width="19" height="19" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0H19M0 0V19" className="map-street" />
        </pattern>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} className="map-land" />
      <rect width="330" height={MAP_HEIGHT} fill="url(#map-streets)" />
      <rect x="330" width="270" height={MAP_HEIGHT} fill="url(#map-streets-b)" />

      {/* Parks and a reservoir */}
      <ellipse cx="190" cy="390" rx="44" ry="26" className="map-park" />
      <ellipse cx="520" cy="420" rx="52" ry="30" className="map-park" />
      <ellipse cx="80" cy="110" rx="40" ry="22" className="map-park" />
      <ellipse cx="520" cy="250" rx="36" ry="58" transform="rotate(-20 520 250)" className="map-lake" />

      {/* A river running through the city, north-east to south-west */}
      <path id="map-river" d="M430 -20C410 90 390 170 350 250S270 400 230 520" className="map-river" />
      <text className="map-water-label">
        <textPath href="#map-river" startOffset="84%">
          White River
        </textPath>
      </text>

      {/* Ring road around the city, then highways out to the suburbs */}
      <ellipse cx="330" cy="300" rx="128" ry="112" className="map-highway-edge" />
      <ellipse cx="330" cy="300" rx="128" ry="112" className="map-highway" />
      {['M-20 228C120 240 240 280 330 300S500 330 620 360', 'M330 -20C326 120 330 220 330 300S320 440 300 520', 'M330 300C380 240 430 180 520 40'].map(
        (d) => (
          <g key={d}>
            <path d={d} className="map-highway-edge" />
            <path d={d} className="map-highway" />
          </g>
        ),
      )}
    </svg>
  )
}

/** "Serving Indianapolis & Central Indiana": service areas over an illustrated map, plus a link to the gallery. */
export function ProjectMap({ className = '' }: { className?: string }) {
  return (
    <section className={`project-map-section ${className}`} aria-labelledby="project-map-title">
      <div className="project-map-layout">
        <div className="project-map-copy" {...revealStagger}>
          <p className="eyebrow eyebrow-rule section-eyebrow">Service areas</p>
          <h2 id="project-map-title" className="project-map-title">
            <Accented text="Serving Indianapolis &" accent="Central Indiana." />
          </h2>
          <p className="project-map-lede">
            {company.legalName} proudly serves homeowners throughout Indianapolis, Speedway, Carmel, Fishers, Brownsburg,
            and surrounding Central Indiana communities.
          </p>
          <ul className="project-map-chips">
            {serviceArea.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="project-map-note-text">
            Not sure if we serve your area? Call <a href={company.phoneHref}>{company.phone}</a> and tell us where your
            project is located.
          </p>
          <a className="project-map-card fx-arrow-link" href={routeHref('gallery')}>
            <span className="project-map-card-title">View Project Gallery</span>
            <span className="project-map-card-link">
              See our work
              <svg className="fx-arrow" width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
                <path d="M0 6h24M19 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </a>
        </div>

        <div className="project-map-frame" data-fx-reveal="fade-left" data-fx-reveal-duration="1000">
          <div className="project-map-stage">
            <div className="project-map-canvas">
              <MapArt />

              <ul className="project-map-pins" {...revealStagger} data-fx-reveal-stagger="90">
                {mapTowns.map((town) => {
                  const isOffice = town.name === OFFICE_TOWN
                  return (
                    <li
                      key={town.name}
                      className={`project-map-town ${isOffice ? 'has-projects' : ''} ${town.labelLeft ? 'label-left' : ''}`}
                      style={{ left: pct(town.x, MAP_WIDTH), top: pct(town.y, MAP_HEIGHT) }}
                    >
                      {isOffice ? (
                        <span className="project-map-pin" aria-hidden="true">
                          <img src="/grace-lion.webp" alt="" />
                        </span>
                      ) : (
                        <span className="project-map-dot" aria-hidden="true" />
                      )}
                      <span className="project-map-label">
                        {town.name}
                        {isOffice && <small>Based here</small>}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <p className="project-map-note">Illustrated map, not to scale.</p>
        </div>
      </div>
    </section>
  )
}
