import { localPhotos, type LocalPhoto } from '../assets/photos'
import './Photo.css'

/**
 * A photo is either one of Grace's own job photos (`local`, from
 * src/assets/photos) or an Unsplash stand-in (`id`) where no job photo exists yet.
 */
export type PhotoRef = { alt: string } & ({ local: LocalPhoto; id?: never } | { id: string; local?: never })

type PhotoProps = PhotoRef & {
  sizes?: string
  radius?: number | '50%'
  priority?: boolean
  className?: string
}

const WIDTHS = [480, 800, 1200, 1800, 2400]

const photoUrl = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`

export function Photo({ id, local, alt, sizes = '100vw', radius = 0, priority = false, className }: PhotoProps) {
  const source = local
    ? { src: localPhotos[local].large, srcSet: `${localPhotos[local].small} 640w, ${localPhotos[local].large} 1280w` }
    : { src: photoUrl(id!, 1200), srcSet: WIDTHS.map((w) => `${photoUrl(id!, w)} ${w}w`).join(', ') }

  return (
    <img
      className={['photo', className].filter(Boolean).join(' ')}
      {...source}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ borderRadius: radius }}
    />
  )
}
