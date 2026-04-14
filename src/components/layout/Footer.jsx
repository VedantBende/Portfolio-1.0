import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import LiveClock from '@/components/ui/LiveClock';
import { contact } from '@/data/contact';
import './Footer.scss';

const footerLinks = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Tech Stack', path: '/tech-stack' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy', path: '/privacy' },
];

const socialLinks = [
  { label: 'LinkedIn', href: contact.linkedinUrl },
  { label: 'GitHub', href: `https://${contact.github}` },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.footer__content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer" id="site-footer">
      <div className="footer__content">
        {/* Top: CTA */}
        <div className="footer__cta">
          <h2 className="footer__cta-heading">
            Let&apos;s work<br />
            <span className="text-accent">together</span>
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="footer__cta-email"
            data-cursor-hover
          >
            {contact.email}
          </a>
        </div>

        <div className="divider" />

        {/* Middle: Links + Info */}
        <div className="footer__grid">
          <div className="footer__col">
            <span className="footer__col-label">Navigation</span>
            <nav className="footer__nav">
              {footerLinks.map((link) => (
                <Link key={link.path} to={link.path} className="footer__nav-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer__col">
            <span className="footer__col-label">Socials</span>
            <div className="footer__nav">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <span className="footer__col-label">Local Time</span>
            <LiveClock />
          </div>

          <div className="footer__col">
            <span className="footer__col-label">Location</span>
            <span className="footer__location">{contact.location}</span>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom: Copyright */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Vedant Bende. All rights reserved.
          </span>
          <span className="footer__credit">
            Designed & Developed with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
