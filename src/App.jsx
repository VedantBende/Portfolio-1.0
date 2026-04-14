import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Layout
import CustomCursor from '@/components/cursor/CustomCursor';
import GridOverlay from '@/components/layout/GridOverlay';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import IntroLoader from '@/components/layout/IntroLoader';

// Pages
import Overview from '@/pages/Overview';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Experience from '@/pages/Experience';
import TechStack from '@/pages/TechStack';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';

export default function App() {
  const location = useLocation();

  // ─── Intro Loader (one-time per session) ───
  // Use ?intro=1 to force replay during development
  const searchParams = new URLSearchParams(location.search);
  const forceIntro = searchParams.get('intro') === '1';
  const isFirstVisit = !sessionStorage.getItem('intro_seen');
  const [showIntro, setShowIntro] = useState(
    (isFirstVisit || forceIntro) && location.pathname === '/'
  );

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('intro_seen', '1');
    setShowIntro(false);
  }, []);

  // ─── Lenis + GSAP ScrollTrigger sync (initialized once at root) ───
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // ─── On route change: scroll to top + refresh ScrollTrigger ───
  useEffect(() => {
    window.scrollTo(0, 0);

    // Allow DOM to settle before refreshing triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showIntro && <IntroLoader onComplete={handleIntroComplete} />}
      <CustomCursor />
      <GridOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/tech-stack" element={<TechStack />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </>
  );
}
