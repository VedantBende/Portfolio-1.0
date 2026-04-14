import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Canvas } from '@react-three/fiber';
import SplitHeading from '@/components/ui/SplitHeading';
import MarqueeButton from '@/components/ui/MarqueeButton';
import FloatingGeometry from '@/components/canvas/FloatingGeometry';
import './About.scss';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Canvas fade in
      if (canvasRef.current) {
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          }
        });
      }

      gsap.from('.about-section__text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from('.about-section__cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      // Background color transition on scroll
      gsap.to(sectionRef.current, {
        backgroundColor: '#0d0d0d',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section section" id="about-section">
      <div className="about-section__content container">
        {!isMobile && (
          <div className="about-section__canvas-wrapper" ref={canvasRef}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
              <FloatingGeometry />
            </Canvas>
          </div>
        )}
        
        <div className="about-section__label">
          <span className="about-section__label-line" />
          <span className="about-section__label-text">About</span>
        </div>

        <SplitHeading
          text="Building Digital Experiences"
          tag="h2"
          className="about-section__heading text-display"
        />

        <div className="about-section__text">
          <p>
            Strong focus on performance, scalability, and clean architecture.
            Experience across full-stack web development and applied AI/ML
            systems. Driven by the challenge of solving real-world problems
            through technology.
          </p>
          <p>
            Committed to system thinking, production-quality code, and
            long-term maintainability.
          </p>
        </div>

        <div className="about-section__cta">
          <MarqueeButton text="Learn More" to="/about" />
        </div>
      </div>
    </section>
  );
}
