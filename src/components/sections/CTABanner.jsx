import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import MarqueeButton from '@/components/ui/MarqueeButton';
import './CTABanner.scss';

export default function CTABanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.cta-banner__button', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Background color transition
      gsap.to(sectionRef.current, {
        backgroundColor: '#111111',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta-banner section section-full" id="cta-section">
      <div className="cta-banner__content container">
        <SplitHeading
          text="Let's Build Something Great"
          tag="h2"
          className="cta-banner__heading text-display"
        />
        <p className="cta-banner__sub">
          I&apos;m open to new opportunities, collaborations, and challenging projects.
        </p>
        <div className="cta-banner__button">
          <MarqueeButton text="Get In Touch" to="/contact" />
        </div>
      </div>
    </section>
  );
}
