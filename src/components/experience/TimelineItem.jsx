import './TimelineItem.scss';

/**
 * Individual timeline entry — job/role card.
 * @param {Object} data - experience entry
 * @param {number} index - position in timeline
 */
export default function TimelineItem({ data, index, onHover, onLeave }) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`timeline-item ${isEven ? 'timeline-item--left' : 'timeline-item--right'}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Date / Company side */}
      <div className="timeline-item__meta">
        <span className="timeline-item__period">{data.period}</span>
        <span className="timeline-item__company">{data.company}</span>
        <span className="timeline-item__type">{data.type}</span>
      </div>

      {/* Node dot */}
      <div className="timeline-item__node">
        <div className="timeline-item__dot" />
      </div>

      {/* Role + Description card */}
      <div className="timeline-item__card">
        <h3 className="timeline-item__role">{data.role}</h3>
        <p className="timeline-item__description">{data.description}</p>
        <div className="timeline-item__stack">
          {data.stack.map((tech) => (
            <span key={tech} className="timeline-item__tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
