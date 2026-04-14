import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  void main() {
    vUv = uv;
    vec3 pos = position;
    // Add wave distortion based on hover intensity and time
    pos.z += sin(pos.x * 3.0 + uTime * 2.0) * 0.2 * uHover;
    pos.z += sin(pos.y * 3.0 + uTime * 1.5) * 0.2 * uHover;
    
    // Pull edges back for a floating effect
    float dist = distance(uv, vec2(0.5));
    pos.z -= dist * 0.5 * uHover;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  
  void main() {
    // Mathematical exact equivalent to CSS object-fit: cover
    float viewAspect = uResolution.x / uResolution.y;
    float imgAspect = uImageRes.x / uImageRes.y;
    
    vec2 scale = vec2(1.0, 1.0);
    if (viewAspect > imgAspect) {
      // Viewbox is proportionally wider than image
      scale.y = viewAspect / imgAspect;
    } else {
      // Image is proportionally wider than viewbox
      scale.x = imgAspect / viewAspect;
    }
    
    // Apply center crop
    vec2 coverUv = (vUv - 0.5) * scale + 0.5;
    
    // Zoom/Distort UV based on hover interaction
    vec2 distortedUv = coverUv;
    distortedUv -= 0.5;
    distortedUv *= 1.0 - (uHover * 0.05); // slight scale zoom
    distortedUv += 0.5;
    
    vec4 tex = texture2D(uTexture, distortedUv);
    
    // Add green tint multiplier and opacity fade-in
    gl_FragColor = vec4(tex.rgb * vec3(0.9, 1.0, 0.9), tex.a * uHover * 0.8);
  }
`;

export default function ProjectHologram({ isActive, image }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { viewport } = useThree();
  const texture = useTexture(image);

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    
    // Smooth lerp hover uniform (0.0 = hidden, 1.0 = visible)
    const targetHover = isActive ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      0.1
    );

    // Update time for the wave shader
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Follow mouse logic strictly within the local canvas boundaries
    const pointer = state.pointer; 
    
    if (isActive) {
      // Subtle localized movement instead of vast external tracking
      const targetX = (pointer.x * viewport.width) / 10;
      const targetY = (pointer.y * viewport.height) / 10;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -pointer.y * 0.2, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.2, 0.1);
    } else {
      // Rest softly when not active
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
    }
  });

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uImageRes: { value: new THREE.Vector2(texture.image.width, texture.image.height) }
  }), [texture, viewport]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
      materialRef.current.uniforms.uImageRes.value.set(texture.image.width, texture.image.height);
    }
  }, [texture, viewport]);

  return (
    // Scale 1.1x avoids background gaps when the tilt rotates the edges backwards
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.1}>
      {/* Exact dynamic sizing tracking the canvas physical DOM box */}
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
