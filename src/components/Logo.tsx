import lion from '../assets/grace-lion.webp'
import './Logo.css'

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`logo ${dark ? 'logo-dark' : ''}`}>
      <img className="logo-mark" src={lion} alt="" width="64" height="33" />
      <span className="logo-word">Grace Renovations</span>
    </div>
  )
}
