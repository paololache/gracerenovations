/**
 * Scroll-reveal presets for the site (see src/effects/reveal.css). Spread
 * them onto an element: <div {...reveal}> fades it up once it scrolls into
 * view, <div {...revealStagger}> does the same to its children one by one.
 */
export const reveal = {
  'data-fx-reveal': 'fade-up',
  'data-fx-reveal-duration': '900',
}

export const revealStagger = {
  ...reveal,
  'data-fx-reveal-stagger': '120',
}
