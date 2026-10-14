import hexiArtwork from "../assets/hexi.svg";
export function Hexi({
  message,
  expression = "curious",
  artwork = hexiArtwork,
  className = "",
}: {
  message?: string;
  expression?: "curious" | "encouraging" | "sleepy";
  artwork?: string;
  className?: string;
}) {
  return (
    <figure className={`hexi ${className}`} data-expression={expression}>
      <img
        src={artwork}
        alt="Hexi, a fluffy black cat with lavender eyes and an oversized lavender witch hat"
      />
      {message && <figcaption>{message}</figcaption>}
    </figure>
  );
}
