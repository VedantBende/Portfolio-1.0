import './TechCard.scss';

/**
 * Individual tech item card with CSS hover effect.
 * @param {string} name - Technology name
 */
export default function TechCard({ name }) {
  return (
    <div className="tech-card" data-cursor-hover>
      <span className="tech-card__name">{name}</span>
      <span className="tech-card__glow" />
    </div>
  );
}
