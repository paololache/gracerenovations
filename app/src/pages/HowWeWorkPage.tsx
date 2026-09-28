import { Faq } from '../components/Faq'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { processFaqs } from '../data/faqs'
import { commitments, paymentSchedule, processSteps } from '../data/process'
import type { PageProps } from '../lib/router'
import './HowWeWorkPage.css'

export function HowWeWorkPage({ onStartEstimate, onRequestEstimate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A written plan before anyone picks up a hammer."
        sub="Six steps, the same on every job. You always know what happens next, what it costs, and who to call."
        photo={{ id: '1503387762-592deb58ef4e', alt: 'Hand sketching renovation plans on drafting paper' }}
      />

      <section className="process">
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">The process</p>
              <h2 className="section-title">From the first question to the final walkthrough.</h2>
            </div>
            <button type="button" className="btn btn-primary" onClick={onStartEstimate}>
              Start with step one
            </button>
          </div>

          <ol className="process-steps">
            {processSteps.map((step) => (
              <li key={step.number} className="process-step">
                <div className="process-step-number">{step.number}</div>
                <div className="process-step-body">
                  <div className="process-step-heading">
                    <h3>{step.title}</h3>
                    <span className="badge badge-outline">{step.timing}</span>
                  </div>
                  <p className="process-step-summary">{step.summary}</p>
                  <p className="process-step-detail">{step.detail}</p>
                  <p className="process-step-deliverable">
                    <span>You get</span> {step.deliverable}
                  </p>
                </div>
                <div className="process-step-image">
                  <Photo {...step.photo} radius={16} sizes="(max-width: 900px) 100vw, 320px" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="commitments">
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">In writing, on every job</p>
              <h2 className="section-title">Six things we put on paper before we start.</h2>
            </div>
          </div>
          <div className="commitments-grid">
            {commitments.map((c) => (
              <div key={c.title} className="commitment">
                <h3>{c.title}</h3>
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="payments">
        <div className="section payments-grid">
          <div>
            <p className="eyebrow section-eyebrow">Payment schedule</p>
            <h2 className="section-title payments-title">You never pay ahead of the work.</h2>
            <p className="lede">
              Payments are tied to milestones an inspector or you can see, not to dates on a calendar. The last five
              percent is held until every item on your punch list is closed.
            </p>
          </div>
          <ol className="payments-list">
            {paymentSchedule.map((p, i) => (
              <li key={p.milestone}>
                <span className="payments-step">Payment {i + 1}</span>
                <span className="payments-milestone">{p.milestone}</span>
                <span className="payments-share">{p.share}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="updates">
        <div className="section updates-grid">
          <div className="updates-image">
            <Photo
              id="1581858726788-75bc0f6a952d"
              alt="Finished hallway with oak floors and a walnut console"
              radius={20}
              sizes="(max-width: 900px) 100vw, 580px"
            />
          </div>
          <div className="updates-copy">
            <p className="eyebrow section-eyebrow">While we are in your house</p>
            <h2 className="section-title">Friday updates, every week, without asking.</h2>
            <ul className="updates-list">
              <li>
                <h3>What got done</h3>
                <p>Photos of every room we touched, and the inspections passed.</p>
              </li>
              <li>
                <h3>What comes next</h3>
                <p>Next week&rsquo;s schedule, deliveries and any days the water or power will be off.</p>
              </li>
              <li>
                <h3>Where the money is</h3>
                <p>Budget tracker with paid, due and approved change orders, down to the dollar.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Faq title="Questions about the process" items={processFaqs} />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
    </>
  )
}
