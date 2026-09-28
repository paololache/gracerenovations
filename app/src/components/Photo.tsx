import './Photo.css'

export interface PhotoRef {
  /** Unsplash photo id, e.g. "1600585152220-90363fe7e115". */
  id: string
  alt: string
}

interface PhotoProps extends PhotoRef {
  sizes?: string
  radius?: number | '50%'
  priority?: boolean
  className?: string
}

const WIDTHS = [480, 800, 1200, 1800, 2400]

const photoUrl = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`

/**
 * Reference photography served from Unsplash. These are stand-ins for the
 * crew's own job photos — swap the ids in `src/data/*` once those exist.
 */
export function Photo({ id, alt, sizes = '100vw', radius = 0, priority = false, className }: PhotoProps) {
  return (
    <img
      className={['photo', className].filter(Boolean).join(' ')}
      src={photoUrl(id, 1200)}
      srcSet={WIDTHS.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ borderRadius: radius }}
    />
  )
}
