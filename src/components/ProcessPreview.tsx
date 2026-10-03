import { processSteps } from '../data/process'
import { reveal, revealStagger } from '../lib/motion'
import { Accented } from './Heading'
import './ProcessPreview.css'

export function ProcessPreview({ onConsult }: { onConsult: () => void }) {
  return (
    <section className="process-preview">
      <div className="section">
        <div className="section-head" {...reveal}>
          <div>
            <p className="eyebrow eyebrow-rule section-eyebrow">How it works</p>
            <h2 className="section-title">
              <Accented text="A simple path from idea to" accent="finished space." />
            </h2>
          </div>
          <button type="button" className="btn btn-primary" onClick={onConsult}>
            Schedule a Free Consultation
          </button>
        </div>

        <ol className="process-preview-grid" {...revealStagger}>
          {processSteps.map((step) => (
            <li key={step.number} className="process-preview-step">
              <span className="process-preview-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
