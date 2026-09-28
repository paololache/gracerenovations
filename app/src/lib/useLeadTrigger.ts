import { useEffect, useRef } from 'react'

const SEEN_KEY = 'grace-lead-popup-seen'
/** How long a trigger section must stay in view before the popup opens. */
const DWELL_MS = 1200

const hasSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/** Stops the scroll trigger, e.g. once the visitor has opened the form themselves. */
export const markLeadSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Storage blocked — the popup may show again on the next page load.
  }
}

/**
 * Calls `onTrigger` once per browser session, when any element marked with
 * `data-lead-trigger` has been in view for a moment. Re-scans on route change.
 */
export function useLeadTrigger(route: string, onTrigger: () => void) {
  const onTriggerRef = useRef(onTrigger)

  useEffect(() => {
    onTriggerRef.current = onTrigger
  })

  useEffect(() => {
    if (hasSeen()) return
    const targets = document.querySelectorAll('[data-lead-trigger]')
    if (!targets.length) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting)
        window.clearTimeout(timer)
        if (!visible) return
        timer = window.setTimeout(() => {
          markLeadSeen()
          observer.disconnect()
          onTriggerRef.current()
        }, DWELL_MS)
      },
      // Fires once the section reaches the top 60% of the screen. A visibility
      // ratio would never be met on phones, where the section is several screens tall.
      { rootMargin: '0px 0px -40% 0px' },
    )
    targets.forEach((t) => observer.observe(t))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [route])
}
