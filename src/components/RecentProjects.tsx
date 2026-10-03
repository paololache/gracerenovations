import { Photo } from './Photo'
import { featuredProject, secondaryProjects } from '../data/projects'
import { services } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import { Accented } from './Heading'
import './RecentProjects.css'

const tagFor = (serviceId: string) => services.find((s) => s.id === serviceId)?.tag

const StoryLink = () => (
  <span className="project-story-link">
    See the project{' '}
    <span className="fx-arrow" aria-hidden="true">
      →
    </span>
  </span>
)

export function RecentProjects({ onOpenProject }: { onOpenProject: (projectId: string) => void }) {
  return (
    <section className="projects" id="projects" data-lead-trigger>
      <div className="section">
        <div className="projects-heading" {...reveal}>
          <div>
            <p className="eyebrow eyebrow-rule section-eyebrow">Recent work</p>
            <h2>
              <Accented text="See the kind of transformation" accent="renovation work delivers." />
            </h2>
          </div>
          <a href={routeHref('gallery')}>View the gallery</a>
        </div>

        <div className="projects-grid" {...revealStagger}>
          <div className="project-feature fx-card fx-zoom">
            <Photo {...featuredProject.photos[0]} sizes="(max-width: 900px) 100vw, 760px" />
            <div className="project-feature-card">
              <span className="badge badge-solid">{tagFor(featuredProject.serviceId)}</span>
              <h3 className="fx-card__title">{featuredProject.title}</h3>
              <p>{featuredProject.summary}</p>
              <StoryLink />
            </div>
            <button
              type="button"
              className="project-story-hit"
              aria-label={`See the project: ${featuredProject.title}`}
              onClick={() => onOpenProject(featuredProject.id)}
            />
          </div>

          <div className="project-list">
            {secondaryProjects.map((project) => (
              <div className="project-card fx-card" key={project.id}>
                <div className="project-card-image fx-zoom">
                  <Photo {...project.photos[0]} radius={12} sizes="(max-width: 900px) 100vw, 170px" />
                </div>
                <div>
                  <span className="badge badge-outline">{tagFor(project.serviceId)}</span>
                  <h3 className="fx-card__title">{project.title}</h3>
                  <p>{project.summary}</p>
                  <StoryLink />
                </div>
                <button
                  type="button"
                  className="project-story-hit"
                  aria-label={`See the project: ${project.title}`}
                  onClick={() => onOpenProject(project.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
