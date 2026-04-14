# Vedant Bende | Digital Portfolio v1.0

[![Portfolio Status](https://img.shields.io/badge/Status-Live-c8ff00?style=for-the-badge)](#)
[![Stack](https://img.shields.io/badge/Stack-React_|_Three.js_|_GSAP-blue?style=for-the-badge)](#)
[![Performance](https://img.shields.io/badge/Performance-60FPS-orange?style=for-the-badge)](#)

A high-fidelity digital portfolio engineering showcase. This project bridges the gap between modern full-stack web development and immersive WebGL creative coding, featuring a custom-built 3D engine and a brutalist design system.

---

## 🛠️ Technical Ecosystem

### **The Core Stack**
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/) as the build orchestrator.
- **3D Engine**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) and [@react-three/drei](https://github.com/pmnd.rs/drei).
- **Animation System**: [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/) for scroll-bound cinematic timelines.
- **Motion**: [Lenis](https://github.com/studio-freight/lenis) for smooth, decoupled kinetic scrolling.
- **Styles**: Modular [SCSS](https://sass-lang.com/) leveraging a deep token system and fluid `clamp()` math.

---

## 🌌 High-Performance Visuals

The portfolio utilizes 100% custom-built 3D visualizations rather than simple textures:

### **1. Spherical Cloud Core (Hero)**
- **System**: Randomized 4,000-particle spherical distribution. 
- **Physics**: Ambient rotation mixed with pointer-parallax lerping for depth perception.
- **Rendering**: Additive blending with a specific `#c1ff00` brand-green tint for high-contrast visibility.

### **2. The Kinetic "DataSpine" (Experience)**
- **Architecture**: A multi-threaded system consisting of 5 independent wires, each containing 80 procedural points.
- **Dynamic Logic**: As the user scrolls, the wires calculate their proximity to the viewport center and "straighten" out via `lerp()` logic, symbolizing clarity and data alignment.
- **Active States**: High-precision hover tracking glows the `#c8ff00` accent color specifically on segments related to the active career item.

### **3. Mathematical Hologram Card (Projects)**
- **Shaders**: Custom GLSL Vertex and Fragment shaders.
- **Vertex Logic**: Real-time wave distortion using `sin()` math linked to hover intensity.
- **Fragment Logic**: A mathematical implementation of `object-fit: cover` logic executed directly on the GPU for zero-latency image scaling.
- **Effects**: Spectral green tinting and pointer-reactive rotation.

---

## 🏗️ Design System & Responsiveness

- **Typographic Scale**: Fluid headings (`Barlow Condensed`) and body text (`Inter`) scaling seamlessly from mobile to wide displays using `clamp()` logic.
- **Tone**: Brutalist architectural aesthetic featuring heavy borders, massive headings, and subtle grain effects.
- **Mobile-First Audit**: Optimized for the iPhone 14 (393x873) viewport. WebGL canvases conditionally scale resolution or particle counts to preserve battery and maintain 60FPS on mobile devices.

---

## 📂 Project Anatomy

```text
src/
├── components/
│   ├── canvas/       # 3D Engines (DataSpine, HeroParticles, Shaders)
│   ├── layout/       # Frame logic (IntroLoader, Navbar, NavOverlay)
│   ├── sections/     # Content modules (Hero, About, Projects, Experience)
│   └── ui/           # Atomic Design elements (StatCounter, SplitHeading)
├── data/             # Project & Career source of truth
├── hooks/            # Physics and event-tracking hooks
├── lib/              # GSAP / Lenis singletons
└── styles/           # SCSS Design Tokens (_variables.scss)
```

---

## 🚀 Development & Deployment

### **Installation**
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/VedantBende/Portfolio-1.0.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Dev Server**:
    ```bash
    npm run dev
    ```

### **Production Build**
To generate a highly optimized production bundle:
```bash
npm run build
```

---

## 🤝 Creative Credits
- **Smooth Scroll**: [Studio Freight / Lenis](https://lenis.darkroom.engineering/)
- **Animation Framework**: [GreenSock (GSAP)](https://greensock.com/)
- **3D Render System**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Asset Hosting**: [Cloudinary](https://cloudinary.com/)

---

<p align="center">
  Designed & Engineered with ❤️ by <strong>Vedant Bende</strong><br/>
  <em>Portfolio 2026 — Version 1.0.0</em>
</p>