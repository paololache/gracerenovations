import { ImagePlaceholder } from './ImagePlaceholder'
import { featuredProject, secondaryProjects } from '../data/projects'
import './RecentProjects.css'

export function RecentProjects() {
  return (
    <section className="projects" id="projects">
      <div className="section">
        <div className="projects-heading">
          <h2>Recent projects</h2>
          <a href="#projects">View our work</a>
        </div>

        <div className="projects-grid">
          <div className="project-feature">
            <ImagePlaceholder shape="rect" caption={featuredProject.caption} />
            <div className="project-feature-card">
              <span className="badge badge-solid">{featuredProject.tag}</span>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.description}</p>
            </div>
          </div>

          <div className="project-list">
            {secondaryProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-card-image">
                  <ImagePlaceholder shape="rounded" radius={12} caption={project.caption} />
                </div>
                <div>
                  <span className="badge badge-outline">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
