import { initials, testimonials } from '../data/testimonials'
import './Testimonials.css'

export function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section">
        <p className="eyebrow testimonials-eyebrow">What owners said afterwards</p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <figure key={t.id} className="testimonial">
              <blockquote className="testimonial-quote">{t.quote}</blockquote>
              <figcaption className="testimonial-attribution">
                <div className="testimonial-avatar" aria-hidden="true">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.meta}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
