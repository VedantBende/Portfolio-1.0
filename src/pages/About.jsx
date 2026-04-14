import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import MarqueeButton from '@/components/ui/MarqueeButton';
import './About.scss';

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Bio text reveal
      gsap.from('.about-page__bio p', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
      });

      // Philosophy cards
      gsap.from('.about-page__philosophy-item', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-page__philosophy',
          start: 'top 80%',
          once: true,
        },
      });

      // Values section
      gsap.from('.about-page__value', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-page__values',
          start: 'top 80%',
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Vedant Bende</title>
        <meta name="description" content="Learn about Vedant Bende — background, philosophy, and approach to building scalable web and AI systems." />
      </Helmet>

      <main ref={pageRef} className="about-page" id="about-page">
        {/* Hero */}
        <section className="about-page__hero section section-full">
          <div className="container">
            <div className="about-page__label">
              <span className="about-page__label-line" />
              <span className="about-page__label-text">About Me</span>
            </div>
            <SplitHeading
              text="Building the Future of Digital"
              tag="h1"
              className="about-page__heading text-display"
              trigger={false}
              delay={0.2}
            />
          </div>
        </section>

        {/* Bio */}
        <section className="about-page__bio-section section">
          <div className="container">
            <div className="about-page__bio">
              <p>
                Computer Science undergraduate focused on building high-performance
                web and AI-driven applications. I specialize in designing scalable
                systems, integrating modern technologies, and creating reliable,
                user-centric digital experiences.
              </p>
              <p>
                My experience spans full-stack web development, applied AI/ML systems,
                and data analytics. I&apos;m driven by the challenge of solving
                real-world problems through technology — from architecting backend
                services to training convolutional neural networks.
              </p>
              <p>
                I believe in system thinking over feature thinking. Every project
                I work on prioritizes production-quality code, clean architecture,
                and long-term maintainability.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="about-page__philosophy section">
          <div className="container">
            <SplitHeading
              text="Philosophy"
              tag="h2"
              className="about-page__section-heading text-h1"
            />
            <div className="about-page__philosophy-grid">
              {[
                { title: 'Performance First', desc: 'Every millisecond matters. I optimize for speed, efficiency, and smooth user experience from the ground up.' },
                { title: 'Scalable Architecture', desc: 'Building systems designed to grow — modular, maintainable, and production-ready from day one.' },
                { title: 'User-Centric Design', desc: 'Technology should serve people. I prioritize intuitive interfaces and seamless interactions.' },
                { title: 'Continuous Learning', desc: 'Constantly evolving my skillset — exploring new frameworks, AI breakthroughs, and engineering paradigms.' },
              ].map((item, i) => (
                <div key={i} className="about-page__philosophy-item">
                  <span className="about-page__philosophy-number">0{i + 1}</span>
                  <h3 className="about-page__philosophy-title">{item.title}</h3>
                  <p className="about-page__philosophy-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-page__values section">
          <div className="container">
            <SplitHeading
              text="Core Values"
              tag="h2"
              className="about-page__section-heading text-h1"
            />
            <div className="about-page__values-list">
              {['Clean Code', 'System Thinking', 'Production Quality', 'Long-Term Maintainability', 'Real-World Impact'].map((value, i) => (
                <div key={i} className="about-page__value">
                  <span className="about-page__value-dot" />
                  <span className="about-page__value-text">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-page__cta section">
          <div className="container" style={{ textAlign: 'center' }}>
            <MarqueeButton text="View Projects" to="/projects" />
          </div>
        </section>
      </main>
    </>
  );
}
