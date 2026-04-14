import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Creates a GSAP context scoped to a ref element.
 * Automatically cleans up on unmount.
 * @param {Function} callback - animation setup function receiving (context, ref)
 * @param {Array} deps - dependency array
 */
export function useScrollTrigger(callback, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      callback(ref.current);
    }, ref);

    // Refresh triggers after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, deps);

  return ref;
}
