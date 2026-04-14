import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroParticles({ count = 4000 }) {
  const pointsRef = useRef();
  
  // Generate random points in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Points inside a sphere uniformly distributed
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  const [targetRot] = useState({ x: 0, y: 0 });
  
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow ambient rotation offset using native elapsedTime to avoid Drei getElapsedTime warnings
    const time = state.clock.elapsedTime;
    
    // React to pointer
    // Mouse coords are clamped between -1 and 1
    const { pointer } = state;
    targetRot.x = (pointer.y * Math.PI) / 10;
    targetRot.y = (pointer.x * Math.PI) / 10;

    // Smooth interpolation towards pointer + ambient time rotation
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRot.x + time * 0.02, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRot.y + time * 0.05, 0.05);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c1ff00"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
