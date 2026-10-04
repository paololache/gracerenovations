import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import './zoom-parallax.css'

interface Image {
  src: string
  /** Optional higher-resolution source for wide screens (the centre image ends up full screen). */
  srcSet?: string
  alt?: string
}

interface ZoomParallaxProps {
  /** Images for the collage, max 7. The first one is the centre image that grows to fill the screen. */
  images: Image[]
  /** Shown over the centre image once it has filled the screen. */
  children?: ReactNode
}

/**
 * Scroll-driven zoom collage (adapted from the 21st.dev ZoomParallax, with
 * plain CSS instead of Tailwind). A sticky screen holds up to seven photos;
 * as the section scrolls, each one scales up at its own rate until the
 * centre photo fills the viewport. With reduced motion the collage is static.
 */
export function ZoomParallax({ images, children }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  // The caption fades in over the last stretch, when the centre image fills the screen
  const captionOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.78, 0.95], [24, 0])

  return (
    <div ref={container} className={`zp ${reduceMotion ? 'zp--static' : ''}`}>
      <div className="zp-sticky">
        {images.slice(0, 7).map(({ src, srcSet, alt }, index) => (
          <motion.div
            key={src}
            className={`zp-layer zp-layer-${index}`}
            style={reduceMotion ? undefined : { scale: scales[index % scales.length] }}
          >
            <div className="zp-frame">
              <img
                src={src}
                srcSet={srcSet}
                sizes={index === 0 ? '100vw' : '50vw'}
                alt={alt ?? `Parallax image ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </motion.div>
        ))}

        {children && (
          <motion.div className="zp-caption" style={reduceMotion ? undefined : { opacity: captionOpacity, y: captionY }}>
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}
