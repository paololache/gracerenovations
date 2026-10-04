import type { Project } from '../data/projects'
import { services } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import { routeHref } from '../lib/router'
import { Photo } from './Photo'
import './SuccessStories.css'

interface SuccessStoriesProps {
  projects: Project[]
  onOpenProject: (projectId: string) => void
}

/** Home page section: before-and-after success stories, each opening the full story. */
export function SuccessStories({ projects, onOpenProject }: SuccessStoriesProps) {
  return (
    <section className="projects-stories" id="projects" data-lead-trigger>
      <div className="section">
        <div className="section-head" {...reveal}>
          <div>
            <p className="eyebrow section-eyebrow">Success stories</p>
            <h2 className="section-title">How we found it, and how we left it.</h2>
          </div>
          <p className="lede projects-stories-lede">
            Real projects by our crew across Central Indiana, one for every service. Open any one to see the before, the
            after, and what we did. <a href={routeHref('gallery')}>View the gallery</a>
          </p>
        </div>
        <SuccessStoriesGrid projects={projects} onOpenProject={onOpenProject} />
      </div>
    </section>
  )
}

export function SuccessStoriesGrid({ projects, onOpenProject }: SuccessStoriesProps) {
  return (
    <div className="stories-grid" {...revealStagger}>
      {projects.map((project) => {
        const tag = services.find((s) => s.id === project.serviceId)?.tag
        // The inset shows the before photo; until a job has one, a second after photo
        const inset = project.before?.photo
          ? { photo: project.before.photo, label: 'Before' }
          : project.photos[1] && { photo: project.photos[1], label: 'After' }

        return (
          <button
            key={project.id}
            type="button"
            className="story-card fx-card"
            onClick={() => onOpenProject(project.id)}
            aria-label={`Read the story: ${project.title}`}
          >
            <div className="story-card-media">
              <div className="story-card-photo fx-zoom">
                <Photo {...project.photos[0]} sizes="(max-width: 900px) 100vw, 600px" />
              </div>
              {inset && (
                <div className="story-card-before">
                  <Photo {...inset.photo} radius={10} sizes="160px" />
                  <span>{inset.label}</span>
                </div>
              )}
            </div>
            <div className="story-card-body">
              <div className="story-card-meta">
                <span className="badge badge-outline">{tag}</span>
                <span>
                  {project.before?.example ? 'Central Indiana · Before photo is an example' : 'Central Indiana'}
                </span>
              </div>
              <h3 className="fx-card__title">{project.title}</h3>
              <p>{project.summary}</p>
              <div className="story-card-footer">
                <span className="story-card-cost">
                  {project.scope.length} <small>items in scope</small>
                </span>
                <span className="story-card-link">
                  Read the story{' '}
                  <span className="fx-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
