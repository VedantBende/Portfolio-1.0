import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import resumePDF from '@/assets/Vedant_Bende_Resume.pdf';
import './NavOverlay.scss';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Tech Stack', path: '/tech-stack' },
  { label: 'Contact', path: '/contact' },
];

export default function NavOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current;

    if (isOpen) {
      // Open animation
      gsap.set(overlay, { display: 'flex' });
      gsap.to(overlay, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.from(links, {
        y: 80,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out',
      });
    } else {
      // Close animation
      gsap.to(overlay, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="nav-overlay" id="nav-overlay">
      <div className="nav-overlay__content">
        <nav className="nav-overlay__links">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              ref={(el) => (linksRef.current[i] = el)}
              className={`nav-overlay__link ${
                location.pathname === link.path ? 'is-active' : ''
              }`}
              onClick={onClose}
            >
              <span className="nav-overlay__link-text">{link.label}</span>
              <span className="nav-overlay__link-arrow">→</span>
            </Link>
          ))}

          {/* Download Resume — styled identically to nav links */}
          <a
            href={resumePDF}
            download="Vedant_Bende_Resume.pdf"
            ref={(el) => (linksRef.current[navLinks.length] = el)}
            className="nav-overlay__link"
          >
            <span className="nav-overlay__link-text">Download Resume</span>
            <span className="nav-overlay__link-arrow">↓</span>
          </a>
        </nav>

        <div className="nav-overlay__footer">
          <div className="nav-overlay__info">
            <span className="nav-overlay__info-label">Email</span>
            <a href="mailto:vedantbende.dev@gmail.com" className="nav-overlay__info-value">
              vedantbende.dev@gmail.com
            </a>
          </div>
          <div className="nav-overlay__info">
            <span className="nav-overlay__info-label">Location</span>
            <span className="nav-overlay__info-value">Nagpur, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
