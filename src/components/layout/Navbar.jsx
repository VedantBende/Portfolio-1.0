import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import NavOverlay from './NavOverlay';
import './Navbar.scss';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Navbar scroll hide/show
  useEffect(() => {
    let lastScroll = 0;
    const nav = navRef.current;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(nav, { y: -100, duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.inOut' });
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className="navbar" id="main-navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" aria-label="Home">
            <img
              src="https://res.cloudinary.com/dmhqj66m5/image/upload/v1776191013/VB_Logo_vgsxl4.png"
              alt="VB"
              className="navbar__logo-img"
              draggable="false"
            />
          </Link>

          <button
            className={`navbar__menu-btn ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            id="menu-toggle"
          >
            <span className="navbar__menu-line" />
            <span className="navbar__menu-line" />
          </button>
        </div>
      </nav>

      <NavOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
