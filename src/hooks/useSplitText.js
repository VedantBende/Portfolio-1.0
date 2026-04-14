import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Split text into chars/words and animate with GSAP ScrollTrigger.
 * @param {Object} options
 * @param {string} options.types - 'chars', 'words', 'lines', or combo
 * @param {Object} options.from - GSAP from vars
 * @param {Object} options.scrollTrigger - ScrollTrigger config overrides
 * @param {number} options.stagger - stagger value
 * @param {number} options.duration - animation duration
 */
export function useSplitText(options = {}) {
  const ref = useRef(null);
  const splitRef = useRef(null);

  const {
    types = 'chars',
    from = { y: '100%', opacity: 0 },
    scrollTrigger = {},
    stagger = 0.03,
    duration = 0.8,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Create split instance
    const split = new SplitType(ref.current, { types });
    splitRef.current = split;

    const elements = split[types] || split.chars;

    if (elements && elements.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(elements, {
          ...from,
          stagger,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
            ...scrollTrigger,
          },
        });
      }, ref);

      return () => {
        ctx.revert();
        if (splitRef.current) {
          splitRef.current.revert();
        }
      };
    }

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, []);

  return ref;
}
