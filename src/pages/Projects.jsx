import { useRef, useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Canvas } from '@react-three/fiber';
import ProjectHologram from '@/components/canvas/ProjectHologram';
import SplitHeading from '@/components/ui/SplitHeading';
import { projects } from '@/data/projects';
import './Projects.scss';

export default function Projects() {
  const pageRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const projectImages = projects.map(p => p.image);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);

    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-page__card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-page__list',
          start: 'top 85%',
          once: true,
        },
      });
    }, pageRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects | Vedant Bende</title>
        <meta name="description" content="Selected projects by Vedant Bende — full-stack applications, AI/ML systems, and progressive web apps." />
      </Helmet>

      <main ref={pageRef} className="projects-page" id="projects-page">
        {/* Hero */}
        <section className="projects-page__hero section section-full">
          <div className="container">
            <div className="projects-page__label">
              <span className="projects-page__label-line" />
              <span className="projects-page__label-text">Selected Work</span>
            </div>
            <SplitHeading
              text="Projects"
              tag="h1"
              className="projects-page__heading text-display"
              trigger={false}
              delay={0.2}
            />
          </div>
        </section>

        {/* Projects List */}
        <section className="projects-page__content section">
          <div className="container">
            <div className="projects-page__list">
              {projects.map((project, index) => (
                <article 
                  key={project.id} 
                  className="projects-page__card"
                  onMouseEnter={() => setActiveProject(index)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <div className="projects-page__card-content">
                    <div className="projects-page__card-header">
                      <span className="projects-page__card-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="projects-page__card-category">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="projects-page__card-title">{project.title}</h2>
                    <p className="projects-page__card-description">
                      {project.description}
                    </p>

                    <div className="projects-page__card-focus">
                      <span className="projects-page__card-focus-label">Focus:</span>
                      <span className="projects-page__card-focus-value">
                        {project.focus}
                      </span>
                    </div>

                    <div className="projects-page__card-highlights">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="projects-page__highlight">
                          <span className="projects-page__highlight-dot" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="projects-page__card-stack">
                      {project.stack.map((tech) => (
                        <span key={tech} className="projects-page__stack-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="projects-page__card-links">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="projects-page__link-btn" data-cursor-hover>
                          Live Demo <span className="arrow">↗</span>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects-page__link-btn" data-cursor-hover>
                          GitHub <span className="arrow">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Localized Visual Container on Right Block */}
                  <div className="projects-page__card-visual">
                    {/* Default visible Logo */}
                    {project.logo && (
                      <div className={`projects-page__card-logo-wrapper ${activeProject === index ? 'is-hidden' : ''}`}>
                        <img src={project.logo} alt={`${project.title} logo`} className="projects-page__card-logo" />
                      </div>
                    )}

                    {/* Canvas Hologram Overlay */}
                    {!isMobile && (
                      <div className="projects-page__card-canvas-container">
                        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ powerPreference: "high-performance", alpha: true }} dpr={[1, 1.3]}>
                          <Suspense fallback={null}>
                            <ProjectHologram 
                              isActive={activeProject === index} 
                              image={projectImages[index]} 
                            />
                          </Suspense>
                        </Canvas>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
