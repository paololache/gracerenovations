import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { QuoteBanner } from '../components/QuoteBanner'
import { Testimonials } from '../components/Testimonials'
import { credentials, milestones, serviceArea, stats, team, values } from '../data/company'
import type { PageProps } from '../lib/router'
import './AboutPage.css'

export function AboutPage({ onRequestEstimate }: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Nine people, one county, since 2009."
        sub="A small building company that decided the best sales pitch was to show the invoices. The same crew has been building together for more than a decade."
        photo={{ id: '1589939705384-5185137a7f0f', alt: 'Carpenter in a hard hat cutting lumber on a job site' }}
      />

      <section className="about-story">
        <div className="section about-story-grid">
          <div>
            <p className="eyebrow section-eyebrow">Our story</p>
            <h2 className="section-title about-story-title">We started with one bathroom and a promise to be straight about money.</h2>
            <p className="lede">
              Grace Alvarez founded the company in 2009 after years as a lead carpenter for larger firms, watching
              homeowners sign contracts that doubled by the end. The first job was a single bathroom in Millbrook. It
              came in eleven dollars under the proposal.
            </p>
            <p className="lede">
              We grew slowly, hiring an electrician, then a plumber, so the trades that cause most delays are on our own
              payroll. In 2021 we began publishing every finished project with its final invoice. Today that archive is
              the reason most of our clients call.
            </p>
          </div>
          <div className="about-story-images">
            <div className="about-story-image-tall">
              <Photo
                id="1504307651254-35680f356dfd"
                alt="Crew placing rebar and conduit on a job site"
                radius={20}
                sizes="(max-width: 900px) 100vw, 360px"
              />
            </div>
            <div className="about-story-image-short">
              <Photo
                id="1621905251189-08b45d6a269e"
                alt="Electrician in a hard hat wiring a panel"
                radius={20}
                sizes="(max-width: 900px) 50vw, 240px"
              />
            </div>
            <div className="about-story-image-short">
              <Photo
                id="1523413651479-597eb2da0ad6"
                alt="Close-up of white subway tile and a faucet"
                radius={20}
                sizes="(max-width: 900px) 50vw, 240px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats-band">
        <div className="section about-stats-band-grid">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="about-stats-band-value">{stat.value}</div>
              <div className="about-stats-band-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-values">
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">What we hold to</p>
              <h2 className="section-title">Four rules that have not changed since the first job.</h2>
            </div>
          </div>
          <div className="about-values-grid">
            {values.map((value, i) => (
              <div key={value.title} className="about-value">
                <span className="about-value-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team" id="crew">
        <div className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow section-eyebrow">The crew</p>
              <h2 className="section-title">The people who will be in your house.</h2>
            </div>
            <p className="about-team-note">Average time with the company: eleven years.</p>
          </div>
          <ul className="about-team-grid">
            {team.map((person) => (
              <li key={person.name} className="about-person">
                <p className="about-person-role">{person.role}</p>
                <h3>{person.name}</h3>
                <p className="about-person-since">With Grace since {person.since}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-history">
        <div className="section about-history-grid">
          <div>
            <p className="eyebrow section-eyebrow">Milestones</p>
            <h2 className="section-title">Seventeen years, one step at a time.</h2>
          </div>
          <ol className="about-timeline">
            {milestones.map((m) => (
              <li key={m.year}>
                <span className="about-timeline-year">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-credentials">
        <div className="section about-credentials-grid">
          <div className="about-credentials-card">
            <p className="eyebrow section-eyebrow">Licensed and insured</p>
            <ul className="about-credentials-list">
              {credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="about-credentials-card">
            <p className="eyebrow section-eyebrow">Where we work</p>
            <p className="lede about-area-copy">
              Everything within about thirty minutes of our shop on Mill Road, so the crew is never far from your house.
            </p>
            <div className="about-area-list">
              {serviceArea.map((town) => (
                <span key={town} className="badge badge-outline">
                  {town}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <QuoteBanner onStartEstimate={onRequestEstimate} />
    </>
  )
}
