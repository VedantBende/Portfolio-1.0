import { Link } from 'react-router-dom';
import './MarqueeButton.scss';

/**
 * Marquee hover button — text slides left on hover, revealing duplicate text.
 * @param {string} text - Button label
 * @param {string} to - Route path (uses Link if provided)
 * @param {string} href - External URL (uses <a> if provided)
 */
export default function MarqueeButton({ text, to, href, className = '' }) {
  const inner = (
    <span className="marquee-btn__inner" data-cursor-hover>
      <span className="marquee-btn__text">{text}</span>
      <span className="marquee-btn__text marquee-btn__text--clone">{text}</span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={`marquee-btn ${className}`}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`marquee-btn ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <button className={`marquee-btn ${className}`} type="button">
      {inner}
    </button>
  );
}
