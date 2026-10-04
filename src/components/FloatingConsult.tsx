import { useEffect, useState } from 'react'
import { company } from '../data/company'
import './FloatingConsult.css'

interface FloatingConsultProps {
  onConsult: () => void
  /** Id of the section that switches the button on once it scrolls into view. */
  startId: string
  /** Id of a section that hides it while on screen, e.g. the consultation form itself. */
  hideId?: string
}

/**
 * A floating "Free Consultation" button (with a call button beside it) that
 * appears once the visitor reaches `startId`, so contact is always one tap away.
 */
export function FloatingConsult({ onConsult, startId, hideId }: FloatingConsultProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const start = document.getElementById(startId)
      const hide = hideId ? document.getElementById(hideId) : null
      const vh = window.innerHeight
      const reached = !!start && start.getBoundingClientRect().top < vh * 0.75
      const formRect = hide?.getBoundingClientRect()
      const formOnScreen = !!formRect && formRect.top < vh * 0.6 && formRect.bottom > vh * 0.4
      setShown(reached && !formOnScreen)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [startId, hideId])

  return (
    <div className={`floating-consult ${shown ? 'is-shown' : ''}`} aria-hidden={!shown}>
      <button
        type="button"
        className="btn btn-primary floating-consult-main"
        onClick={onConsult}
        tabIndex={shown ? 0 : -1}
      >
        Free Consultation
      </button>
      <a
        className="floating-consult-call"
        href={company.phoneHref}
        aria-label={`Call ${company.phone}`}
        tabIndex={shown ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
          />
        </svg>
      </a>
    </div>
  )
}
