# Vedant Bende — Portfolio 2026

A high-performance, immersive portfolio built with an architectural and brutalist aesthetic. This project leverages cutting-edge WebGL graphics and procedural animations to create a unique digital experience.

---

## 🏗️ The Vision
The design is centered around **"Architectural Brutalism"** — combining massive typographic elements, distinct grid systems, and complex 3D visualizations to showcase technical depth and creative precision.

---

## ⚡ Technical Core (The Stack)
*   **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (High-speed development & HMR)
*   **3D Engine**: [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmnd.rs/drei)
*   **Animation**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
*   **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
*   **Styling**: Vanilla SCSS (Modular & Token-based)

---

## 🎨 Key Experiences & Animations

### 1. Brutalist Intro Sequence
A custom-built entry sequence synchronized with session storage:
- **Visuals**: A procedural CSS grid-mesh with a subtle curved 3D mask.
- **Counter**: A massive percentage counter (0% → 100%) in signature **Brand Green (#c8ff00)**.
- **Orchestration**: A single GSAP master timeline handles the transition from loading to the Hero reveal with a vertical "curtain" lift effect.

### 2. The 3D Galactic Hero
A procedural Spiral Galaxy simulation replacing standard background particles:
- **Math**: Logarithmic spiral distribution using a power-law density model.
- **Scale**: 15,000 individually rendered particles with vertex colors.
- **Aesthetic**: A "Hubble-style" palette transitioning from a hot white/orange core to deep nebula blues.
- **Interaction**: Gentle continuous rotation with subtle mouse-parallax tilt.

### 3. Kinetic "Data Wires" (Experience Section)
A vertical 3D visualization that runs alongside the career timeline:
- **Logic**: Thousands of procedural points forming thin threads/wires.
- **Scroll Sync**: The geometry reacts to your scroll position, making the career history feel "wired together" and architectural.
- **Material**: Glowing additive blending for a high-end digital feel.

### 4. Holographic Project Cards
Projects are presented with a technical hologram effect:
- **Mesh**: Floating geometric primitives.
- **Effect**: Custom GLSL shaders providing a "scanning" or "hologram" flicker on hover.

---

## 📱 Mobile Optimization
The site underwent a full responsiveness audit for the **393x873 (iPhone 14)** viewport:
- **Fluid Typography**: Uses CSS `clamp()` for nearly all text elements.
- **Performance**: High-cost WebGL canvases are conditionally hidden or simplified on mobile to ensure smooth 60FPS scrolling.
- **Layout**: Grid systems collapse intelligently while maintaining the brutalist visual weight.

---

## 📂 Project Structure
```text
src/
├── components/
│   ├── canvas/       # Three.js / WebGL Components (Galaxy, Wires, etc.)
│   ├── ui/           # Reusable UI elements (Buttons, SplitHeadings)
│   ├── sections/     # Modular Page Sections (Hero, About, Services)
│   └── layout/       # Layout wrappers (Navbar, Footer, GridOverlay)
├── styles/           # Global SCSS (Variables, Mixins, Typography)
├── lib/              # Library configurations (GSAP, Lenis)
├── pages/            # Page templates (Overview, TechStack, Projects)
└── data/             # Content data (experience.js, projects.js)
```

---

## 🚀 Getting Started

1.  **Clone the Repo**:
    ```bash
    git clone [repository-url]
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
4.  **Special Commands**:
    - **Force Intro Replay**: Access `http://localhost:5173/?intro=1` to see the preloader again.

---

Built with ⚡ by **Vedant Bende**
