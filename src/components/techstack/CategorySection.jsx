import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import TechCard from './TechCard';
import './CategorySection.scss';

/**
 * Labeled category group with a flex-wrap grid of TechCards.
 * @param {string} category - Category name
 * @param {string[]} items - Array of technology names
 */
export default function CategorySection({ category, items }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="category-section">
      <div className="category-section__header">
        <span className="category-section__line" />
        <h3 className="category-section__title">{category}</h3>
      </div>
      <div className="category-section__grid">
        {items.map((tech) => (
          <TechCard key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
}
