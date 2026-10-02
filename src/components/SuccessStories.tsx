import { formatCost, projects } from '../data/projects'
import { services } from '../data/services'
import type { SuccessStory } from '../data/stories'
import { Photo } from './Photo'
import { revealStagger } from '../lib/motion'
import './SuccessStories.css'

interface SuccessStoriesProps {
  stories: SuccessStory[]
  onOpenStory: (projectId: string) => void
}

export function SuccessStoriesGrid({ stories, onOpenStory }: SuccessStoriesProps) {
  return (
    <div className="stories-grid" {...revealStagger}>
      {stories.map((story) => {
        const project = projects.find((p) => p.id === story.projectId)
        if (!project) return null
        const tag = services.find((s) => s.id === project.serviceId)?.tag

        return (
          <button
            key={story.projectId}
            type="button"
            className="story-card fx-card"
            onClick={() => onOpenStory(story.projectId)}
            aria-label={`Read the story: ${project.title}`}
          >
            <div className="story-card-media">
              <div className="story-card-photo fx-zoom">
                <Photo {...story.after.photo} sizes="(max-width: 900px) 100vw, 600px" />
              </div>
              <div className="story-card-before">
                <Photo {...story.before.photo} radius={10} sizes="160px" />
                <span>Before</span>
              </div>
            </div>
            <div className="story-card-body">
              <div className="story-card-meta">
                <span className="badge badge-outline">{tag}</span>
                <span>
                  {project.location}, {project.year}
                </span>
              </div>
              <h3 className="fx-card__title">{project.title}</h3>
              <p>{story.headline}</p>
              <div className="story-card-footer">
                <span className="story-card-cost">
                  {formatCost(project.cost)} <small>final invoice</small>
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
