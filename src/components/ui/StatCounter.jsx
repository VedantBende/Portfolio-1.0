import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import './StatCounter.scss';

/**
 * Animated stat counter with GSAP counting animation.
 * @param {number} value - Target number
 * @param {string} suffix - Suffix text (e.g., '+', '%')
 * @param {string} label - Descriptive label
 */
export default function StatCounter({ value, suffix = '', label = '' }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || !numRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };

      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = Math.round(obj.val);
              }
            },
            onComplete: () => setHasAnimated(true),
          });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={ref} className="stat-counter">
      <div className="stat-counter__value">
        <span ref={numRef} className="stat-counter__number">0</span>
        <span className="stat-counter__suffix">{suffix}</span>
      </div>
      {label && <span className="stat-counter__label">{label}</span>}
    </div>
  );
}
