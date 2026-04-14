import { useRef, useEffect } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import './SplitHeading.scss';

/**
 * Animated heading with SplitType char reveal.
 * @param {string} text - The heading text
 * @param {string} tag - HTML tag (default: 'h2')
 * @param {string} className - Additional classes
 * @param {boolean} trigger - Whether to use ScrollTrigger (default: true)
 */
export default function SplitHeading({
  text,
  tag: Tag = 'h2',
  className = '',
  trigger = true,
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, { types: 'chars, words' });

    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        y: '100%',
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        ...(trigger && {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }),
      });
    }, ref);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={`split-heading ${className}`}>
      {text}
    </Tag>
  );
}
