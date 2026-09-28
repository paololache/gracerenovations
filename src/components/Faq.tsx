import type { FaqItem } from '../data/faqs'
import './Faq.css'

interface FaqProps {
  title: string
  items: FaqItem[]
}

export function Faq({ title, items }: FaqProps) {
  return (
    <section className="faq">
      <div className="section faq-grid">
        <h2 className="section-title">{title}</h2>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
