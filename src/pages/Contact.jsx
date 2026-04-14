import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from '@/lib/gsap';
import SplitHeading from '@/components/ui/SplitHeading';
import MarqueeButton from '@/components/ui/MarqueeButton';
import { contact } from '@/data/contact';
import './Contact.scss';

export default function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-page__item', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
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
        <title>Contact | Vedant Bende</title>
        <meta name="description" content="Get in touch with Vedant Bende for collaborations, opportunities, and projects." />
      </Helmet>

      <main ref={pageRef} className="contact-page" id="contact-page">
        <section className="contact-page__hero section section-full">
          <div className="container">
            <div className="contact-page__label">
              <span className="contact-page__label-line" />
              <span className="contact-page__label-text">Get In Touch</span>
            </div>
            <SplitHeading
              text="Let's Connect"
              tag="h1"
              className="contact-page__heading text-display"
              trigger={false}
              delay={0.2}
            />
          </div>
        </section>

        <section className="contact-page__content section">
          <div className="container">
            <div className="contact-page__grid">
              <div className="contact-page__item">
                <span className="contact-page__item-label">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="contact-page__item-value contact-page__item-link"
                  data-cursor-hover
                >
                  {contact.email}
                </a>
              </div>

              <div className="contact-page__item">
                <span className="contact-page__item-label">Location</span>
                <span className="contact-page__item-value">
                  {contact.location}
                </span>
              </div>

              <div className="contact-page__item">
                <span className="contact-page__item-label">LinkedIn</span>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page__item-value contact-page__item-link"
                  data-cursor-hover
                >
                  {contact.linkedin}
                </a>
              </div>

              <div className="contact-page__item">
                <span className="contact-page__item-label">GitHub</span>
                <a
                  href={`https://${contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page__item-value contact-page__item-link"
                  data-cursor-hover
                >
                  {contact.github}
                </a>
              </div>
            </div>

            <div className="contact-page__cta">
              <h2 className="contact-page__cta-heading">
                Ready to start a project?
              </h2>
              <MarqueeButton
                text="Send an Email"
                href={`mailto:${contact.email}`}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
