import { ContactSection } from '../components/ContactSection'
import { PageHero } from '../components/PageHero'
import { company } from '../data/company'
import { revealStagger } from '../lib/motion'
import type { PageProps } from '../lib/router'
import './ContactPage.css'

export function ContactPage(_props: PageProps) {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a free consultation."
        sub="Tell us what you want to improve and we'll get back to you with next steps. Kitchens, bathrooms, sunrooms, painting, or larger renovations — we're ready to help."
        photo={{ local: 'sunroom', alt: 'Sunroom with a green feature wall and shiplap ceiling' }}
      />

      <section className="contact-reach">
        <div className="section contact-reach-grid" {...revealStagger}>
          <div>
            <p className="eyebrow contact-reach-label">Call</p>
            <a className="contact-reach-value" href={company.phoneHref}>
              {company.phone}
            </a>
          </div>
          <div>
            <p className="eyebrow contact-reach-label">Email</p>
            <a className="contact-reach-value contact-reach-email" href={company.emailHref}>
              {/* If it has to wrap, wrap after the @ */}
              {company.email.split('@')[0]}@<wbr />
              {company.email.split('@')[1]}
            </a>
          </div>
          <div>
            <p className="eyebrow contact-reach-label">Office</p>
            <p className="contact-reach-value">{company.address}</p>
          </div>
          <div>
            <p className="eyebrow contact-reach-label">Serving</p>
            <p className="contact-reach-value">
              Indianapolis, Speedway, Carmel, Fishers, Brownsburg &amp; Central Indiana
            </p>
          </div>
        </div>
        <p className="section contact-reach-note">
          For the most accurate consultation, share your project address, the room or space you&rsquo;d like to
          renovate, photos if available, and your timeline.
        </p>
      </section>

      <ContactSection source="Contact page form" />
    </>
  )
}
