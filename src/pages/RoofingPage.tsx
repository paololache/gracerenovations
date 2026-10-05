import { Faq } from '../components/Faq'
import { Accented } from '../components/Heading'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { company } from '../data/company'
import type { FaqItem } from '../data/faqs'
import { projects } from '../data/projects'
import { roofingFacts, roofingMethod, roofingReasons } from '../data/roofing'
import { services } from '../data/services'
import { reveal, revealStagger } from '../lib/motion'
import type { PageProps } from '../lib/router'
import './RoofingPage.css'

const roofing = services.find((s) => s.id === 'roofing')!
const roofingProjects = projects.filter((p) => p.serviceId === 'roofing')

const ROOFING_FAQS: FaqItem[] = [
  {
    question: 'Do you repair roofs, or only replace them?',
    answer: 'Both. We look at the roof first and explain plainly whether a repair or a full replacement makes more sense.',
  },
  {
    question: 'How do I know my roof needs attention?',
    answer:
      'Leaks or ceiling stains, missing or curling shingles, granules collecting in the gutters, or simply an older roof are all good reasons to have it looked at.',
  },
  {
    question: 'Do you handle gutters and flashing too?',
    answer: 'Yes. Flashing, vents, drip edge, gutters, and downspouts are part of our roofing work.',
  },
  {
    question: 'Can you do the roof along with other exterior work?',
    answer: 'Yes. One contractor can handle the roof and the rest of your renovation, with one plan and one point of contact.',
  },
  {
    question: 'How do I get started?',
    answer: `Call ${company.phone} or send the form. We will set up a free roof consultation and walk you through the next steps.`,
  },
]

export function RoofingPage({ onConsult, onOpenProject }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Roofing"
        title="Roofing that protects everything below it."
        sub={roofing.longDescription}
        photo={{ local: 'roofing-2', alt: 'Two-storey home with a new dark shingle roof by our crew' }}
      />

      {/* Intro: what we do, and the way in */}
      <section className="roof-intro">
        <div className="section roof-intro-grid">
          <div {...reveal}>
            <p className="eyebrow eyebrow-rule section-eyebrow">Roof repairs &amp; replacement</p>
            <h2 className="roof-title">
              <Accented text="A sound roof starts with" accent="a clear plan." />
            </h2>
            <p className="lede">
              Whether it is one leak or a roof at the end of its life, we start by looking at what is really there,
              explain your options plainly, and agree on the scope and timeline before any work begins.
            </p>
            <div className="roof-actions">
              <button type="button" className="btn btn-primary" onClick={onConsult}>
                {roofing.cta}
              </button>
              <a className="btn btn-outline-dark" href={company.phoneHref}>
                Call {company.phone}
              </a>
            </div>
          </div>
          <dl className="roof-facts" {...revealStagger}>
            {roofingFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Method: six steps, photo beside each */}
      <section className="roof-method" aria-labelledby="roof-method-title">
        <div className="section">
          <div className="section-head" {...reveal}>
            <div>
              <p className="eyebrow eyebrow-rule section-eyebrow">Our method</p>
              <h2 id="roof-method-title" className="section-title">
                How a Grace roof gets done.
              </h2>
            </div>
            <p className="lede roof-method-lede">Six steps, the same on every job, so you always know what comes next.</p>
          </div>

          <ol className="roof-steps">
            {roofingMethod.map((step, i) => (
              <li key={step.title} className={`roof-step ${i % 2 ? 'is-reverse' : ''}`} {...revealStagger}>
                <div className="roof-step-media">
                  <Photo {...step.photo} radius={18} sizes="(max-width: 900px) 100vw, 560px" />
                  {step.illustrative && <span className="roof-step-tag">Illustrative photo</span>}
                </div>
                <div className="roof-step-copy">
                  <span className="roof-step-number">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cases: Grace's own roofing work */}
      <section className="roof-cases" aria-labelledby="roof-cases-title" data-lead-trigger>
        <div className="section">
          <div className="section-head" {...reveal}>
            <div>
              <p className="eyebrow eyebrow-rule roof-cases-eyebrow">Our work</p>
              <h2 id="roof-cases-title" className="section-title roof-cases-title">
                Roofs we have finished.
              </h2>
            </div>
            <p className="lede roof-cases-lede">Real roofs by our crew in Central Indiana.</p>
          </div>

          {roofingProjects.map((project) => (
            <article key={project.id} className="roof-case" {...revealStagger}>
              <div className="roof-case-photos">
                {project.photos.map((photo) => (
                  <figure key={photo.alt} className="roof-case-photo fx-zoom">
                    <Photo {...photo} radius={18} sizes="(max-width: 900px) 100vw, 620px" />
                  </figure>
                ))}
              </div>
              <div className="roof-case-copy">
                <span className="badge badge-solid">{roofing.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul className="check-list roof-case-scope">
                  {project.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button type="button" className="btn btn-outline-light" onClick={() => onOpenProject(project.id)}>
                  See the full story
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Grace */}
      <section className="roof-why" aria-labelledby="roof-why-title">
        <div className="section">
          <div className="section-head" {...reveal}>
            <div>
              <p className="eyebrow eyebrow-rule section-eyebrow">Why Grace Renovations</p>
              <h2 id="roof-why-title" className="section-title">
                <Accented text="A roofer you can" accent="actually reach." />
              </h2>
            </div>
          </div>
          <div className="roof-why-grid" {...revealStagger}>
            {roofingReasons.map((reason, i) => (
              <div key={reason.title} className="roof-why-card">
                <span className="roof-why-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included / who it's for */}
      <section className="roof-scope">
        <div className="section roof-scope-grid" {...revealStagger}>
          <div className="roof-scope-photo">
            <Photo
              id="1635424824849-1b09bdcc55b1"
              alt="Roofer in a safety harness fastening shingles along a ridge"
              radius={20}
              sizes="(max-width: 900px) 100vw, 560px"
            />
            <span className="roof-step-tag">Illustrative photo</span>
          </div>
          <div>
            <p className="eyebrow eyebrow-rule section-eyebrow">What&rsquo;s included</p>
            <ul className="check-list">
              {roofing.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="eyebrow eyebrow-rule section-eyebrow roof-scope-subhead">Who it&rsquo;s for</p>
            <ul className="check-list">
              {roofing.whoFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq title="Roofing questions from homeowners." items={ROOFING_FAQS} />
      <QuoteBanner onConsult={onConsult} />
    </>
  )
}
