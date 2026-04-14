import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import './Services.scss';

const services = [
  {
    id: 1,
    number: '01',
    title: 'Web Development',
    description:
      'Building performant, scalable web applications using modern frameworks like React and Vue, from architecture through deployment.',
  },
  {
    id: 2,
    number: '02',
    title: 'AI / ML Systems',
    description:
      'Designing and deploying machine learning pipelines, from model training with TensorFlow to real-time inference interfaces.',
  },
  {
    id: 3,
    number: '03',
    title: 'Data Analytics',
    description:
      'Transforming raw data into actionable insights through dashboards, DAX measures, and visualization systems.',
  },
  {
    id: 4,
    number: '04',
    title: 'API Architecture',
    description:
      'Designing RESTful APIs with clean separation of concerns, authentication, and scalable backend systems.',
  },
  {
    id: 5,
    number: '05',
    title: 'System Design',
    description:
      'Architecting production-ready systems with focus on modularity, performance optimization, and long-term maintainability.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.services__card', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // Background color scrub
      gsap.to(sectionRef.current, {
        backgroundColor: '#080808',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services section" id="services-section">
      <div className="services__content container">
        <div className="services__header">
          <div className="services__label">
            <span className="services__label-line" />
            <span className="services__label-text">What I Do</span>
          </div>
          <SplitHeading
            text="Services & Capabilities"
            tag="h2"
            className="services__heading text-display"
          />
        </div>

        <div className="services__list">
          {services.map((service) => (
            <div key={service.id} className="services__card">
              <div className="services__card-header">
                <span className="services__card-number">{service.number}</span>
                <h3 className="services__card-title">{service.title}</h3>
              </div>
              <p className="services__card-description">{service.description}</p>
              <div className="services__card-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
