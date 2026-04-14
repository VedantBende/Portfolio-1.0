import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import TimelineWrapper from '@/components/experience/TimelineWrapper';
import { experience } from '@/data/experience';
import './Experience.scss';

export default function Experience() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Intro text
      gsap.from('.experience-page__intro', {
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
        <title>Experience | Vedant Bende</title>
        <meta name="description" content="Professional experience and internships of Vedant Bende — Power BI, LLMs, Frontend, AI, and Prompt Engineering." />
      </Helmet>

      <main ref={pageRef} className="experience-page" id="experience-page">
        {/* Hero */}
        <section className="experience-page__hero section section-full">
          <div className="container">
            <div className="experience-page__label">
              <span className="experience-page__label-line" />
              <span className="experience-page__label-text">Career</span>
            </div>
            <SplitHeading
              text="Experience"
              tag="h1"
              className="experience-page__heading text-display"
              trigger={false}
              delay={0.2}
            />
            <p className="experience-page__intro">
              A timeline of professional roles, internships, and training programs
              that have shaped my skills in web development, AI, and data analytics.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="experience-page__timeline section">
          <div className="container">
            <TimelineWrapper items={experience} />
          </div>
        </section>
      </main>
    </>
  );
}
