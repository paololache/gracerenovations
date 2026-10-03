import { useEffect, useState, type CSSProperties } from 'react'
import { formatCost } from '../data/projects'
import { services } from '../data/services'
import { MAP_HEIGHT, MAP_WIDTH, OFFICE_TOWN, mapTowns } from '../data/serviceMap'
import { revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import './ProjectMap.css'

const tagFor = (serviceId: string) => services.find((s) => s.id === serviceId)?.tag
const pct = (value: number, of: number) => `${(value / of) * 100}%`
const published = mapTowns.reduce((n, town) => n + town.projects.length, 0)

/**
 * On wide screens the project panel opens beside the selected pin, on the
 * side with more room, so it never covers it. On phones it sits below the map.
 */
function panelPlacement(town: { x: number; y: number }) {
  const side = town.x > MAP_WIDTH / 2 ? 'is-left-of' : 'is-right-of'
  const align = town.y > MAP_HEIGHT / 2 ? 'is-above' : 'is-below'
  return {
    className: `${side} ${align}`,
    style: { '--pin-x': pct(town.x, MAP_WIDTH), '--pin-y': pct(town.y, MAP_HEIGHT) } as CSSProperties,
  }
}

/** Illustrated, not to scale: roads, river and parks only frame where the towns sit. */
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

      {/* Parks */}
      <ellipse cx="196" cy="300" rx="44" ry="26" className="map-park" />
      <rect x="378" y="176" width="70" height="40" rx="10" transform="rotate(-18 413 196)" className="map-park" />
      <ellipse cx="520" cy="430" rx="52" ry="30" className="map-park" />
      <ellipse cx="78" cy="96" rx="40" ry="22" className="map-park" />

      {/* Water */}
      <path
        id="map-river"
        d="M470 -20C420 80 340 150 345 250S392 380 342 520"
        className="map-river"
      />
      <ellipse cx="146" cy="430" rx="34" ry="18" className="map-lake" />
      <text className="map-water-label">
        <textPath href="#map-river" startOffset="34%">
          Mill River
        </textPath>
      </text>

      {/* Highways: pale edge, then white road */}
      {[
        'M-20 120C120 150 250 210 282 262S420 330 620 300',
        'M300 -20C300 100 270 180 282 262S250 420 220 520',
      ].map((d) => (
        <g key={d}>
          <path d={d} className="map-highway-edge" />
          <path d={d} className="map-highway" />
        </g>
      ))}

      {/* Local roads */}
      {[
        'M40 430C160 360 200 300 282 262',
        'M470 128C420 200 380 240 345 250',
        'M150 190C200 120 260 90 330 92',
        'M540 262C500 320 470 350 438 372',
        'M112 382C160 396 200 408 236 414',
        'M330 92C390 96 430 110 470 128',
        'M150 190C136 260 120 330 112 382',
      ].map((d) => (
        <path key={d} d={d} className="map-road" />
      ))}
    </svg>
  )
}

interface ProjectMapProps {
  onOpenStory: (projectId: string) => void
  className?: string
}

export function ProjectMap({ onOpenStory, className = '' }: ProjectMapProps) {
  const [openTown, setOpenTown] = useState<string | null>(null)
  const selected = mapTowns.find((t) => t.name === openTown)

  useEffect(() => {
    if (!openTown) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenTown(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openTown])

  return (
    <section className={`project-map-section ${className}`} aria-labelledby="project-map-title">
      <div className="project-map-layout">
        <div className="project-map-copy" {...revealStagger}>
          <h2 id="project-map-title" className="project-map-title">
            Built across eight towns, close to home.
          </h2>
          <p className="project-map-lede">
            Our shop is on Mill Road in Millbrook, and every job is within about thirty minutes of it. Tap a pin to see
            what we built there.
          </p>
          <a className="project-map-card fx-arrow-link" href={routeHref('projects')}>
            <span className="project-map-card-title">View Project Gallery</span>
            <span className="project-map-card-link">
              Browse the map
              <svg className="fx-arrow" width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
                <path d="M0 6h24M19 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </a>
        </div>

        <div className="project-map-frame" data-fx-reveal="fade-left" data-fx-reveal-duration="1000">
          <div
            className="project-map-stage"
            onClick={(e) => {
              // A click anywhere on the map that isn't a pin or the panel closes the panel
              if (!(e.target as Element).closest('.project-map-pin, .project-map-panel')) setOpenTown(null)
            }}
          >
            <div className="project-map-canvas">
              <MapArt />

              <ul className="project-map-pins" {...revealStagger} data-fx-reveal-stagger="90">
                {mapTowns.map((town) => {
                  const count = town.projects.length
                  const isOpen = town.name === openTown
                  return (
                    <li
                      key={town.name}
                      className={`project-map-town ${count ? 'has-projects' : ''} ${town.labelLeft || town.x > MAP_WIDTH * 0.75 ? 'label-left' : ''}`}
                      style={{ left: pct(town.x, MAP_WIDTH), top: pct(town.y, MAP_HEIGHT) }}
                    >
                      {count ? (
                        <button
                          type="button"
                          className={`project-map-pin ${isOpen ? 'is-open' : ''}`}
                          aria-expanded={isOpen}
                          aria-controls="project-map-panel"
                          aria-label={`${town.name}: ${count} published ${count === 1 ? 'project' : 'projects'}`}
                          onClick={() => setOpenTown(isOpen ? null : town.name)}
                        >
                          {count}
                        </button>
                      ) : (
                        <span className="project-map-dot" aria-hidden="true" />
                      )}
                      <span className="project-map-label">
                        {town.name}
                        {town.name === OFFICE_TOWN && <small>Our shop</small>}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div
              id="project-map-panel"
              className={`project-map-panel ${selected ? panelPlacement(selected).className : ''}`}
              style={selected ? panelPlacement(selected).style : undefined}
              role="region"
              aria-live="polite"
              hidden={!selected}
            >
              {selected && (
                <>
                  <div className="project-map-panel-head">
                    <p className="eyebrow">
                      {selected.name} · {selected.projects.length} projects
                    </p>
                    <button type="button" className="project-map-panel-close" aria-label="Close" onClick={() => setOpenTown(null)}>
                      ×
                    </button>
                  </div>
                  <ul>
                    {selected.projects.map((project) => (
                      <li key={project.id}>
                        <button type="button" className="project-map-project fx-arrow-link" onClick={() => onOpenStory(project.id)}>
                          <span>
                            <strong>{project.title}</strong>
                            <small>
                              {tagFor(project.serviceId)} · {project.year} · {formatCost(project.cost)}
                            </small>
                          </span>
                          <span className="fx-arrow" aria-hidden="true">
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <p className="project-map-note">
            Illustrated map, not to scale. Showing the {published} projects published on this site.
          </p>
        </div>
      </div>
    </section>
  )
}
