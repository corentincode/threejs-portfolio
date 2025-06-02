'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useScroll, ScrollControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function AnimatedStars() {
  const starsRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Animation de rotation lente
      starsRef.current.rotation.x += delta * 0.05;
      starsRef.current.rotation.y += delta * 0.075;
      
      // Effet de parallaxe basé sur le scroll
      const scrollOffset = scroll.offset;
      starsRef.current.rotation.z = scrollOffset * Math.PI * 2;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={300}
      depth={60}
      count={7000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7aa2ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b4d5ff" />
      <AnimatedStars />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Scene() {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Optimisation pour les écrans haute résolution
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.1}>
            <SceneContent />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
} 