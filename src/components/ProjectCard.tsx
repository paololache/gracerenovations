import type { Project } from '../data/projects'
import { services } from '../data/services'
import { Photo } from './Photo'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  onOpenProject: (projectId: string) => void
}

export function ProjectCard({ project, onOpenProject }: ProjectCardProps) {
  const tag = services.find((s) => s.id === project.serviceId)?.tag

  return (
    <article className="project-tile fx-card">
      <div className="project-tile-image fx-zoom">
        <Photo {...project.photos[0]} radius={16} sizes="(max-width: 900px) 100vw, 400px" />
      </div>
      <span className="badge badge-outline">{tag}</span>
      <h3 className="fx-card__title">{project.title}</h3>
      <p className="project-tile-description">{project.summary}</p>
      <span className="project-tile-story">
        See the project{' '}
        <span className="fx-arrow" aria-hidden="true">
          →
        </span>
      </span>
      <button
        type="button"
        className="project-tile-hit"
        aria-label={`See the project: ${project.title}`}
        onClick={() => onOpenProject(project.id)}
      />
    </article>
  )
}
