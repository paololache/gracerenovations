# fx — motion effects

Reusable motion and interaction effects. They set **how things move**, never what they look like: colors come from `--fx-*` variables that default to `currentColor` or the system colors `Canvas` / `CanvasText`, and fonts, sizes and spacing are left to your own classes.

- No dependencies. GSAP, ScrollTrigger, SplitText and Swiper are replaced by CSS, `IntersectionObserver` and a few small helpers.
- `prefers-reduced-motion` is respected everywhere. Effects jump to their end state, loops stop, and the scroll-driven parts switch off.
- Base layout rules use `:where()`, so they have zero specificity and any of your own classes override them.

## Setup

```ts
// once, e.g. in main.tsx
import './effects/effects.css'
```

Or import single modules, always with `tokens.css` first:

```ts
import './effects/tokens.css'
import './effects/links.css'
```

The TypeScript helpers come from `./effects` (React hooks) or from each module file (plain DOM).

## Modules

| File | What it does | JS needed |
|---|---|---|
| `tokens.css` | Easing curves, durations, reduced-motion switch | – |
| `header.css` · `header.ts` | Header background slides down on scroll, hairline draws in, children change color in a cascade | `watchHeader` / `useHeaderWatch` |
| `links.css` | Underline that grows from the right; tab underline that draws in left → right; arrow nudge; icon gap; pagination shift | – |
| `menu.css` | Dropdown (slow open, fast close); burger → X; off-canvas drawer | toggle a class / `aria-expanded` |
| `reveal.css` · `reveal.ts` | Scroll reveals: fade, fade up/down/left/right, rise out of a mask, line-by-line text, stagger | `initReveal` / `useReveal` |
| `circle-hero.css` · `circle-hero.ts` | Pinned hero: ring draws itself, fill closes in to a circle as you scroll (≥768px) | `initCircleHero` / `useCircleHero` |
| `accordion.css` | Separator line that draws in, sweep on hover, + that wiggles and turns into − | – |
| `image-wipe.css` · `image-wipe.ts` | Image swap: new image wipes in from the left inside a rounded frame and zooms 1.5 → 1 | `createImageWipe` / `useImageWipe` |
| `media.css` | Image zoom on hover (with the Safari rounded-corner fix), card hover, slanted clip-path shapes | – |
| `buttons.css` | Fill ↔ outline swap, press-in, round icon button, pulse ring | – |
| `curtain.css` · `curtain.ts` | A section stays pinned and fades back while the next one slides up over it | `initCurtain` / `useCurtain` |
| `marquee.css` · `marquee.ts` | Endless scrolling row, either direction, optional pause on hover | `initMarquee` / `useMarquee` |
| `misc.css` | Pop-in, fade-in, spinner | – |

Each CSS file starts with a comment listing its classes and variables.

## Examples

**Header**

```tsx
const header = useRef<HTMLElement>(null)
const hero = useRef<HTMLElement>(null)
useHeaderWatch(header, { trigger: hero })

<header ref={header} className="fx-header site-header"
  style={{ '--fx-header-bg': 'var(--color-cream)', '--fx-header-fg-active': 'var(--color-carbon)' } as React.CSSProperties}>
  <Logo data-fx-step="1" />
  <nav data-fx-step="2">…</nav>
  <button data-fx-step="3" className="btn">Get a cost range</button>
</header>
```

**Reveals** — call `useReveal()` once per page:

```tsx
useReveal()

<h2 className="fx-mask"><span data-fx-reveal="up" data-fx-reveal-duration="1000" style={{ display: 'block' }}>Our values</span></h2>
<p data-fx-reveal="up" data-fx-reveal-lines data-fx-reveal-duration="800" data-fx-reveal-stagger="120">Plain text that rises line by line…</p>
<div data-fx-reveal="fade-up" data-fx-reveal-duration="1000" data-fx-reveal-stagger="300" data-fx-reveal-offset="200">
  <article data-fx-reveal-item>…</article>
  <article data-fx-reveal-item>…</article>
</div>
```

**Image wipe**

```tsx
const frame = useRef<HTMLDivElement>(null)
const [active, setActive] = useState(0)
useImageWipe(frame, active)

<div ref={frame} className="fx-wipe" style={{ aspectRatio: '4 / 3' }}>
  {images.map((img) => <div key={img.id} className="fx-wipe__item"><img src={img.src} alt={img.alt} /></div>)}
</div>
```

**Card hover**

```tsx
<a className="fx-card" href="…" style={{ '--fx-card-accent': 'var(--color-terracotta)' } as React.CSSProperties}>
  <div className="fx-zoom" style={{ borderRadius: 16 }}><img src="…" alt="…" /></div>
  <h3 className="fx-card__title">Oak Street</h3>
  <span className="fx-arrow-link">Read the story <span className="fx-arrow" aria-hidden>→</span></span>
</a>
```

**Buttons** — colors come from your tokens:

```tsx
<button className="btn fx-btn-swap fx-press"
  style={{ '--fx-btn-color': 'var(--color-terracotta)', '--fx-btn-contrast': '#fff' } as React.CSSProperties}>
  Start the estimate
</button>
```

## Known limits

- `data-fx-reveal-lines` works on plain text. Links or bold text inside the element are flattened to text.
- The circle hero only runs at 768px and wider, a breakpoint fixed in `circle-hero.css` and the `minWidth` option. On narrow screens it is a normal section.
- `up` and `down` reveals need a clipping parent (`.fx-mask`); line reveals add their own.
