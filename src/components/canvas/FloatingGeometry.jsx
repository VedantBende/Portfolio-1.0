import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingGeometry() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Ambient slow rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Scroll-based rotation overlay
    const scrollY = window.scrollY;
    
    // Add some reactive spin based on scroll
    meshRef.current.rotation.z = scrollY * 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#c1ff00" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
      
      <Icosahedron ref={meshRef} args={[2.5, 1]}>
        <meshStandardMaterial 
          color="#c1ff00" 
          wireframe={true} 
          transparent 
          opacity={0.4} 
        />
      </Icosahedron>
    </Float>
  );
}
