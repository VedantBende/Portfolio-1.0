import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Canvas } from '@react-three/fiber';
import SplitHeading from '@/components/ui/SplitHeading';
import StatCounter from '@/components/ui/StatCounter';
import HeroParticles from '@/components/canvas/HeroParticles';
import './Hero.scss';

export default function Hero() {
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const canvasRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkMobile);

    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Canvas fade in
      if (canvasRef.current) {
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
        });
      }

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      // Stats stagger
      gsap.from('.hero__stat', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Scroll indicator pulse
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
      });

      // Parallax on scroll
      gsap.to('.hero__content', {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

      return () => {
        window.removeEventListener('resize', checkMobile);
        ctx.revert();
      };
  }, []);

  return (
    <section ref={heroRef} className="hero section section-full" id="hero-section">
      {!isMobile && (
        <div className="hero__canvas-wrapper" ref={canvasRef}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
            <HeroParticles />
          </Canvas>
        </div>
      )}

      <div className="hero__content">
        <div className="hero__label">
          <span className="hero__label-line" />
          <span className="hero__label-text">Portfolio 2026</span>
        </div>

        <SplitHeading
          text="Vedant Bende"
          tag="h1"
          className="hero__heading text-hero"
          trigger={false}
          delay={0.2}
        />

        <p ref={subtitleRef} className="hero__subtitle">
          Computer Science undergrad focused on building high-performance
          web and AI-driven applications. Specializing in scalable systems,
          modern technologies, and user-centric digital experiences.
        </p>

        <div ref={statsRef} className="hero__stats">
          <div className="hero__stat">
            <StatCounter value={5} suffix="+" label="Internships" />
          </div>
          <div className="hero__stat">
            <StatCounter value={3} suffix="+" label="Projects" />
          </div>
          <div className="hero__stat">
            <StatCounter value={7} suffix="" label="Tech Categories" />
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
          <span className="hero__scroll-text">Scroll</span>
          <span className="hero__scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
