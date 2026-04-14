import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const THREAD_COUNT = 5;
const POINTS_PER_THREAD = 80;
const HEIGHT = 8; // from +4 to -4
const BASE_COLOR = new THREE.Color('#222222');
const GLOW_COLOR = new THREE.Color('#c8ff00');

function Thread({ index, activeIndex, itemsCount, wrapperRef }) {
  const lineRef = useRef();

  // Pre-allocate arrays for position and color to avoid GC overhead
  const positions = useMemo(() => new Float32Array(POINTS_PER_THREAD * 3), []);
  const colors = useMemo(() => new Float32Array(POINTS_PER_THREAD * 3), []);
  
  const tempColor = useMemo(() => new THREE.Color(), []);
  
  // Give each thread a unique phase/frequency offset
  const phaseOffset = index * Math.PI * 0.4;
  const freqOffset = 1 + index * 0.2;

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Calculate normalized scroll (0 to 1) relative to viewport center
    let normalizedScroll = 0;
    try {
      if (wrapperRef?.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const centerOffset = window.innerHeight / 2;
        normalizedScroll = -(rect.top - centerOffset) / rect.height;
        normalizedScroll = THREE.MathUtils.clamp(normalizedScroll, 0, 1);
      }
    } catch(e) {}

    const pointsPerItem = POINTS_PER_THREAD / itemsCount;

    for (let i = 0; i < POINTS_PER_THREAD; i++) {
      const p = i / (POINTS_PER_THREAD - 1);
      const y = (1 - p) * HEIGHT - (HEIGHT / 2); // Top is +4, Bottom is -4

      // Wavy math
      let x = Math.sin(p * Math.PI * 6 * freqOffset + time * 1.5 + phaseOffset) * 0.3;
      let z = Math.cos(p * Math.PI * 4 * freqOffset + time * 1.2 + phaseOffset) * 0.3;

      // Scroll Snap Logic: Straighten out when close to the scroll threshold
      const distToScroll = Math.abs(p - normalizedScroll);
      const isVisibleRange = distToScroll < 0.2;
      const smoothness = THREE.MathUtils.clamp(1 - distToScroll * 5, 0, 1);
      const easeSnap = smoothness * smoothness;
      
      // Pull X/Z to 0 based on scroll proximity
      x = THREE.MathUtils.lerp(x, 0, easeSnap);
      z = THREE.MathUtils.lerp(z, 0, easeSnap);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color Logic (Glow on hover)
      const myItemIndex = Math.floor(i / pointsPerItem);
      const isActive = activeIndex === myItemIndex;
      
      const segmentCenter = (myItemIndex + 0.5) * pointsPerItem;
      const distToCenter = Math.abs(i - segmentCenter) / (pointsPerItem / 2);
      const glowIntensity = isActive ? Math.max(0, 1 - distToCenter * 0.9) : 0;

      // Interpolate current color array toward target
      tempColor.fromArray(colors, i * 3);
      const targetColor = isActive ? GLOW_COLOR.clone().lerp(BASE_COLOR, 1 - glowIntensity) : BASE_COLOR;
      tempColor.lerp(targetColor, 0.1);
      tempColor.toArray(colors, i * 3);
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.8} linewidth={1} />
    </line>
  );
}

export default function DataSpine({ activeIndex, itemsCount, wrapperRef }) {
  // Create array of threads
  const threads = Array.from({ length: THREAD_COUNT }, (_, i) => i);

  return (
    <div className="canvas-wrapper-absolute" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {threads.map((i) => (
          <Thread 
            key={i} 
            index={i} 
            activeIndex={activeIndex} 
            itemsCount={itemsCount} 
            wrapperRef={wrapperRef} 
          />
        ))}
      </Canvas>
    </div>
  );
}
