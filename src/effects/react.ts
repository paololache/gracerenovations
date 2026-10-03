import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { initCircleHero, type CircleHeroOptions } from './circle-hero'
import { initCurtain, type CurtainOptions } from './curtain'
import { watchHeader, type WatchHeaderOptions } from './header'
import { createImageWipe, type ImageWipe } from './image-wipe'
import { initMarquee, type MarqueeOptions } from './marquee'
import { initReveal } from './reveal'

/**
 * React wrappers. Each takes a ref to the element the effect lives on and
 * cleans up on unmount. Options are read when the effect starts; pass
 * values in `deps` to restart it when they change. Because callers choose
 * the deps, the exhaustive-deps lint is disabled on those lines on purpose.
 */

/**
 * Wires every [data-fx-reveal] inside the ref (or the whole page). Re-scans
 * when deps change. Runs before paint, so content below the fold never
 * flashes visible before it is hidden for its reveal.
 */
export function useReveal(ref?: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useLayoutEffect(() => initReveal(ref?.current ?? document), deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useHeaderWatch(
  ref: RefObject<HTMLElement | null>,
  options: Omit<WatchHeaderOptions, 'trigger'> & { trigger?: RefObject<Element | null> } = {},
  deps: unknown[] = [],
) {
  useEffect(() => {
    if (!ref.current) return
    return watchHeader(ref.current, { ...options, trigger: options.trigger?.current })
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useCircleHero(ref: RefObject<HTMLElement | null>, options: CircleHeroOptions = {}, deps: unknown[] = []) {
  useEffect(() => {
    if (!ref.current) return
    return initCircleHero(ref.current, options)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

export function useMarquee(ref: RefObject<HTMLElement | null>, options: MarqueeOptions = {}, deps: unknown[] = []) {
  useEffect(() => {
    if (!ref.current) return
    return initMarquee(ref.current, options)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

/** Pins the under section of a .fx-curtain and fades it as the over section slides across. */
export function useCurtain(ref: RefObject<HTMLElement | null>, options: CurtainOptions = {}, deps: unknown[] = []) {
  useEffect(() => {
    if (!ref.current) return
    return initCurtain(ref.current, options)
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

/** Shows item `index` of a .fx-wipe frame, wiping whenever `index` changes. */
export function useImageWipe(ref: RefObject<HTMLElement | null>, index: number) {
  const wipe = useRef<ImageWipe | null>(null)

  useEffect(() => {
    if (!ref.current) return
    wipe.current = createImageWipe(ref.current, index)
    return () => {
      wipe.current?.destroy()
      wipe.current = null
    }
  }, [ref]) // eslint-disable-line react-hooks/exhaustive-deps -- `index` is applied by the effect below

  useEffect(() => {
    wipe.current?.show(index)
  }, [index])
}
