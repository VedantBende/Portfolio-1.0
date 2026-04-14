import { useState, useEffect } from 'react';
import './LiveClock.scss';

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatted = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="live-clock" aria-live="polite">
      <span className="live-clock__time">{formatted}</span>
      <span className="live-clock__zone">IST</span>
    </div>
  );
}
