import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import './CustomCursor.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: '#c8ff00',
        opacity: 0.6,
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1.5, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: '#f5f5f5',
        opacity: 0.4,
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Track all interactive elements
    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        'a, button, [data-cursor-hover]'
      );
      newInteractives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
