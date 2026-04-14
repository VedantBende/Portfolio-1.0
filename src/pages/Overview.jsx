import { Helmet } from 'react-helmet-async';
import Hero from '@/components/sections/Hero';
import AboutSection from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Disciplines from '@/components/sections/Disciplines';
import CTABanner from '@/components/sections/CTABanner';
import './Overview.scss';

export default function Overview() {
  return (
    <>
      <Helmet>
        <title>Vedant Bende | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Vedant Bende — Computer Science undergraduate specializing in full-stack web development and applied AI/ML systems."
        />
      </Helmet>

      <main className="overview-page" id="overview-page">
        <Hero />
        <AboutSection />
        <Services />
        <Disciplines />
        <CTABanner />
      </main>
    </>
  );
}
