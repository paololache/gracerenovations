import { formatCost, type Project } from '../data/projects'
import { services } from '../data/services'
import { Photo } from './Photo'
import './ProjectCard.css'

interface ProjectCardProps {
  project: Project
  onOpenStory: (projectId: string) => void
}

export function ProjectCard({ project, onOpenStory }: ProjectCardProps) {
  const tag = services.find((s) => s.id === project.serviceId)?.tag

  return (
    <article className="project-tile fx-card">
      <div className="project-tile-image fx-zoom">
        <Photo {...project.photo} radius={16} sizes="(max-width: 900px) 100vw, 400px" />
      </div>
      <span className="badge badge-outline">{tag}</span>
      <h3 className="fx-card__title">{project.title}</h3>
      <p className="project-tile-location">
        {project.location}, {project.year}
      </p>
      <p className="project-tile-description">{project.description}</p>
      <dl className="project-tile-meta">
        <div>
          <dt>Duration</dt>
          <dd>{project.duration}</dd>
        </div>
        <div>
          <dt>Final invoice</dt>
          <dd>{formatCost(project.cost)}</dd>
        </div>
      </dl>
      <span className="project-tile-story">Before &amp; after story</span>
      <button
        type="button"
        className="project-tile-hit"
        aria-label={`Read the story: ${project.title}`}
        onClick={() => onOpenStory(project.id)}
      />
    </article>
  )
}
