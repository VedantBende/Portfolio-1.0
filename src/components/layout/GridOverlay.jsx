import './GridOverlay.scss';

export default function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="grid-line" />
      ))}
    </div>
  );
}
