/**
 * The prominent "Visit live site" row. Opens the external product in a new
 * tab and says so, visibly (↗) and to screen readers.
 */
export default function LiveLink({
  href,
  display,
  product,
  className = "",
}: {
  href: string;
  display: string;
  product: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`live-link ${className}`}>
      <span>
        Visit live site <span aria-hidden="true">↗</span>
        <span className="sr-only">: {product} (external site, opens in a new tab)</span>
      </span>
      <small aria-hidden="true">{display} · external</small>
    </a>
  );
}
