import { Photo } from './Photo'
import { featuredProject, formatCost, secondaryProjects } from '../data/projects'
import { services } from '../data/services'
import { routeHref } from '../lib/router'
import './RecentProjects.css'

const tagFor = (serviceId: string) => services.find((s) => s.id === serviceId)?.tag

export function RecentProjects({ onOpenStory }: { onOpenStory: (projectId: string) => void }) {
  return (
    <section className="projects" id="projects" data-lead-trigger>
      <div className="section">
        <div className="projects-heading">
          <div>
            <p className="eyebrow section-eyebrow">Success stories</p>
            <h2>How we found it, how we left it</h2>
          </div>
          <a href={routeHref('projects')}>All projects</a>
        </div>

        <div className="projects-grid">
          <div className="project-feature">
            <Photo {...featuredProject.photo} sizes="(max-width: 900px) 100vw, 760px" />
            <div className="project-feature-card">
              <span className="badge badge-solid">{tagFor(featuredProject.serviceId)}</span>
              <h3>{featuredProject.title}</h3>
              <p>
                {featuredProject.description} {featuredProject.duration}, {formatCost(featuredProject.cost)}.
              </p>
              <span className="project-story-link">Read the story</span>
            </div>
            <button
              type="button"
              className="project-story-hit"
              aria-label={`Read the story: ${featuredProject.title}`}
              onClick={() => onOpenStory(featuredProject.id)}
            />
          </div>

          <div className="project-list">
            {secondaryProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-card-image">
                  <Photo {...project.photo} radius={12} sizes="(max-width: 900px) 100vw, 170px" />
                </div>
                <div>
                  <span className="badge badge-outline">{tagFor(project.serviceId)}</span>
                  <h3>{project.title}</h3>
                  <p>
                    {project.description} {project.duration}, {formatCost(project.cost)}.
                  </p>
                  <span className="project-story-link">Read the story</span>
                </div>
                <button
                  type="button"
                  className="project-story-hit"
                  aria-label={`Read the story: ${project.title}`}
                  onClick={() => onOpenStory(project.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
