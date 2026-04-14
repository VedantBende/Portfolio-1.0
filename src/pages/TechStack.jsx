import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import TechGrid from '@/components/techstack/TechGrid';
import { techStack } from '@/data/techstack';
import './TechStack.scss';

export default function TechStack() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.techstack-page__intro', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tech Stack | Vedant Bende</title>
        <meta name="description" content="Technologies used by Vedant Bende — React, Node.js, TensorFlow, Python, and more across frontend, backend, AI/ML, and tools." />
      </Helmet>

      <main ref={pageRef} className="techstack-page" id="techstack-page">
        {/* Hero */}
        <section className="techstack-page__hero section section-full">
          <div className="container">
            <div className="techstack-page__label">
              <span className="techstack-page__label-line" />
              <span className="techstack-page__label-text">Technologies</span>
            </div>
            <SplitHeading
              text="Tech Stack"
              tag="h1"
              className="techstack-page__heading text-display"
              trigger={false}
              delay={0.2}
            />
            <p className="techstack-page__intro">
              A comprehensive overview of the technologies, frameworks, and tools
              I use across frontend, backend, AI/ML, and development workflows.
            </p>
          </div>
        </section>

        {/* Tech Grid */}
        <section className="techstack-page__grid section">
          <div className="container">
            <TechGrid data={techStack} />
          </div>
        </section>
      </main>
    </>
  );
}
