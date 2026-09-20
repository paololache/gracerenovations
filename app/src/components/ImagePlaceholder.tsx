import { useState } from 'react'
import type { CSSProperties } from 'react'
import './ImagePlaceholder.css'

type Shape = 'rect' | 'rounded' | 'circle'

interface ImagePlaceholderProps {
  shape?: Shape
  radius?: number
  caption: string
  className?: string
  style?: CSSProperties
  /** Real photo URL. Omit to keep showing the neutral placeholder frame. */
  src?: string
  srcSet?: string
  sizes?: string
  /** Above-the-fold images (hero) should load eagerly at high priority;
   *  everything else — cards, avatars, grids — lazy-loads by default so
   *  off-screen photos never compete with first paint. */
  priority?: boolean
}

/**
 * Photo slot with a built-in loading strategy: pass `src` once a real photo
 * is available and it lazy-loads with a fade-in, no further changes needed
 * at the call site. Without `src` it renders the neutral placeholder frame
 * used while sourcing real photography.
 */
export function ImagePlaceholder({
  shape = 'rounded',
  radius = 12,
  caption,
  className,
  style,
  src,
  srcSet,
  sizes,
  priority = false,
}: ImagePlaceholderProps) {
  const [loaded, setLoaded] = useState(false)
  const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? `${radius}px` : 0

  return (
    <div
      className={['image-placeholder', className].filter(Boolean).join(' ')}
      style={{ ...style, borderRadius }}
      role="img"
      aria-label={caption}
    >
      {src && (
        <img
          className={`image-placeholder-photo ${loaded ? 'image-placeholder-photo-loaded' : ''}`}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={caption}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
        />
      )}
      {!src && (
        <>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="image-placeholder-caption">{caption}</span>
        </>
      )}
    </div>
  )
}
