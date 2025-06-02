'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, OrbitControls, useCursor, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// Composant pour représenter un projet en 3D (un simple Plane avec texte et interaction)
function ProjectCard({ position, name, id }: { position: [number, number, number]; name: string; id: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Changer le curseur au survol
  useCursor(hovered);

  // Animer la carte au survol avec GSAP
  const hoverTween = useRef<gsap.core.Tween | null>(null);

  const handlePointerOver = () => {
    setHovered(true);
    if (meshRef.current) {
        hoverTween.current = gsap.to(meshRef.current.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.3 });
        gsap.to(meshRef.current.position, { z: 0.2, duration: 0.3 });
    }
    if (textRef.current) {
      gsap.to(textRef.current.position, { z: 0.3, duration: 0.3 });
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
     if (meshRef.current) {
        if(hoverTween.current) hoverTween.current.reverse();
         gsap.to(meshRef.current.position, { z: 0, duration: 0.3 });
     }
    if (textRef.current) {
      gsap.to(textRef.current.position, { z: 0.1, duration: 0.3 });
    }
  };

  const handleClick = () => {
    router.push(`/projects/${id}`);
  };

  // Animation subtile continue
  useFrame(() => {
    if (meshRef.current && !hovered) {
        meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group position={position} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
      <Plane
        ref={meshRef}
        args={[2, 1.5]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>

      <group position={[0, 0, 0.1]} ref={textRef}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Montserrat-Bold.ttf"
          outlineWidth={0.02}
          outlineColor="#000000"
          outlineBlur={0.02}
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

export default function ProjectsScene() {
  // Données de projets avec positions circulaires (exemple - ajustez avec vos vrais projets et dates)
  const projects = [
    { id: 1, name: 'Portfolio 3D', position: [3, 0, 0] },
    { id: 2, name: 'Application Web', position: [0, 0, 3] },
    { id: 3, name: 'Jeu Vidéo', position: [-3, 0, 0] },
    { id: 4, name: 'Bot Discord', position: [0, 0, -3] },
  ];

   // Calculer le centre approximatif du cercle pour le target d'OrbitControls
   const centerX = projects.reduce((sum, p) => sum + p.position[0], 0) / projects.length;
   const centerY = projects.reduce((sum, p) => sum + p.position[1], 0) / projects.length;
   const centerZ = projects.reduce((sum, p) => sum + p.position[2], 0) / projects.length;
   const center = [centerX, centerY, centerZ] as [number, number, number];

  return (
    <Canvas camera={{ position: [centerX, centerY + 5, centerZ + 5], fov: 75 }}>
      {/* Lumière d'ambiance pour éclairer la scène */}
      <ambientLight intensity={0.5} />

      {/* Lumière directionnelle */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
       {/* Lumière supplémentaire */}
      <pointLight position={[0, 5, 0]} intensity={0.5} />

      {/* Rendre les cartes de projets */}
      {projects.map((project) => (
        <ProjectCard key={project.id} id={project.id} position={project.position as [number, number, number]} name={project.name} />
      ))}

      {/* Contrôles pour naviguer dans la scène */}
      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        enableZoom={true}
        enablePan={false}
        target={center}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
} 