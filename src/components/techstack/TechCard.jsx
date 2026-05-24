import './TechCard.scss';

/**
 * Individual tech item card with CSS hover effect.
 * @param {string} name - Technology name
 * @param {string} Icon - URL string for the tech logo
 */
export default function TechCard({ name, Icon }) {
  return (
    <div className="tech-card" data-cursor-hover>
      <div className="tech-card__content">
        {Icon && <img src={Icon} alt={`${name} logo`} className="tech-card__icon" />}
        <span className="tech-card__name">{name}</span>
      </div>
      <span className="tech-card__glow" />
    </div>
  );
}
