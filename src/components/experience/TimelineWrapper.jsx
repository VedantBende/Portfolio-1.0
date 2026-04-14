import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import TimelineItem from './TimelineItem';
import DataSpine from '@/components/canvas/DataSpine';
import './TimelineWrapper.scss';

export default function TimelineWrapper({ items }) {
  const wrapperRef = useRef(null);
  const lineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger each timeline item
      gsap.from('.timeline-item', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={wrapperRef} className="timeline-wrapper">
      {/* 3D Spine Overlay */}
      <DataSpine activeIndex={activeIndex} itemsCount={items.length} wrapperRef={wrapperRef} />
      
      {/* Fallback CSS Line (now masked or kept as subtle backup) */}
      <div ref={lineRef} className="timeline-wrapper__line" />
      
      <div className="timeline-wrapper__items">
        {items.map((item, index) => (
          <TimelineItem 
            key={item.id} 
            data={item} 
            index={index} 
            onHover={() => setActiveIndex(index)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
