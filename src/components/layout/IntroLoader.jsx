import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import './IntroLoader.scss';

// ─── VB Logo from Cloudinary ───
const VB_LOGO_URL =
  'https://res.cloudinary.com/dmhqj66m5/image/upload/v1776191013/VB_Logo_vgsxl4.png';

export default function IntroLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const logoRef = useRef(null);
  const meshRef = useRef(null);
  const tlRef = useRef(null);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!loaderRef.current) return;

    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    // ─── Master GSAP Timeline ───
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });
    tlRef.current = tl;

    // ─── Phase 1: Entrance ───
    // Mesh grid fades in
    tl.fromTo(
        meshRef.current,
        { opacity: 0 },
        { opacity: 0.15, duration: 1, ease: 'power2.inOut' },
        0
      )

      // Logo scales in from nothing
      .fromTo(
        logoRef.current,
        { scale: 0.6, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        0.3
      )

      // ─── Phase 2: Counter (0 → 100) ───
      .to(
        { val: 0 },
        {
          val: 100,
          duration: 3.5,
          ease: 'power2.inOut',
          roundProps: 'val',
          onUpdate: function () {
            const v = Math.round(this.targets()[0].val);
            setCounter(v);
          },
        },
        0.5
      )

      // ─── Phase 3: Flash + Exit ───
      // Brief "flash" on the counter at 100%
      .to(counterRef.current, {
        scale: 1.08,
        duration: 0.15,
        ease: 'power2.in',
      })
      .to(counterRef.current, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      })

      // Pause briefly at 100
      .to({}, { duration: 0.4 })

      // Lift the whole pane vertically — the signature brutalist exit
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
      });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="intro-loader" aria-hidden="true">
      {/* Curved grid mesh background */}
      <div ref={meshRef} className="intro-loader__mesh" />

      {/* VB Logo — center */}
      <div ref={logoRef} className="intro-loader__logo">
        <img src={VB_LOGO_URL} alt="VB" draggable="false" />
      </div>

      {/* Percentage counter — bottom right */}
      <div ref={counterRef} className="intro-loader__counter">
        <span className="intro-loader__counter-value">{counter}</span>
        <span className="intro-loader__counter-percent">%</span>
      </div>

      {/* Subtle bottom label */}
      <div className="intro-loader__label">
        <span>PORTFOLIO 2026</span>
      </div>
    </div>
  );
}
