import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import './Disciplines.scss';

const disciplines = [
  {
    id: 1,
    title: 'Design',
    description: 'Crafting intuitive interfaces with attention to detail, typography, and visual hierarchy.',
    tags: ['UI/UX', 'Typography', 'Layout'],
  },
  {
    id: 2,
    title: 'Engineering',
    description: 'Building robust systems with clean architecture, optimized performance, and scalable codebases.',
    tags: ['Frontend', 'Backend', 'APIs'],
  },
  {
    id: 3,
    title: 'Intelligence',
    description: 'Applying AI/ML to solve real-world problems — from CNNs to prompt engineering pipelines.',
    tags: ['ML', 'Deep Learning', 'NLP'],
  },
];

export default function Disciplines() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.disciplines__item', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="disciplines section" id="disciplines-section">
      <div className="disciplines__content container">
        <div className="disciplines__label">
          <span className="disciplines__label-line" />
          <span className="disciplines__label-text">Core Focus</span>
        </div>

        <SplitHeading
          text="Disciplines"
          tag="h2"
          className="disciplines__heading text-display"
        />

        <div className="disciplines__grid">
          {disciplines.map((item) => (
            <div key={item.id} className="disciplines__item">
              <span className="disciplines__item-number">0{item.id}</span>
              <h3 className="disciplines__item-title">{item.title}</h3>
              <p className="disciplines__item-description">{item.description}</p>
              <div className="disciplines__item-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="disciplines__tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
