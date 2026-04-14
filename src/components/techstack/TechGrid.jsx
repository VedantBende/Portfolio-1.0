import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import CategorySection from './CategorySection';
import './TechGrid.scss';

/**
 * Responsive grid of tech categories.
 * Renders one CategorySection per techStack key.
 */
export default function TechGrid({ data }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Batch stagger all tech cards for performance
      ScrollTrigger.batch('.tech-card', {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            scale: 0.9,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
        start: 'top 95%',
        once: true,
      });
    }, gridRef);

    return () => ctx.revert();
  }, [data]);

  const categories = Object.entries(data);

  return (
    <div ref={gridRef} className="tech-grid">
      {categories.map(([category, items]) => (
        <CategorySection key={category} category={category} items={items} />
      ))}
    </div>
  );
}
