/** Heading text with its closing phrase in the italic serif accent, as on the current site. */
export function Accented({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text} <span className="accent">{accent}</span>
    </>
  )
}
