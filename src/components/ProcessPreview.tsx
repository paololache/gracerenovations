import { processSteps } from '../data/process'
import { routeHref } from '../lib/router'
import './ProcessPreview.css'

export function ProcessPreview() {
  return (
    <section className="process-preview">
      <div className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow section-eyebrow">How we work</p>
            <h2 className="section-title">From two minutes online to the final walkthrough.</h2>
          </div>
          <a className="link-caps" href={routeHref('how-we-work')}>
            The full process
          </a>
        </div>

        <ol className="process-preview-grid">
          {processSteps.map((step) => (
            <li key={step.number} className="process-preview-step">
              <span className="process-preview-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
              <span className="process-preview-timing">{step.timing}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
