import { site } from '../data/site'
import './Logo.css'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`logo ${dark ? 'logo-dark' : ''}`}>
      <span className="logo-mark" aria-hidden="true" />
      <span className="logo-word">{site.businessName}</span>
    </div>
  )
}
