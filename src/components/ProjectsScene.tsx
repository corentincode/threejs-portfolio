'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useCursor, useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

const MODEL_URL = '/Computer.glb';

// Composant pour représenter un projet en 3D (un simple Plane avec texte et interaction)
function ProjectCard({ position, id }: { position: [number, number, number]; id: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  // Charger le modèle GLB avec useGLTF
  const { scene } = useGLTF(MODEL_URL);

  // Cloner la scène du modèle pour chaque carte si elles doivent être indépendantes
  const clonedScene = scene.clone();

  useCursor(hovered);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    router.push(`/projects/${id}`);
  };

  // Animation subtile continue (rotation sur l'axe Y local)
  useFrame(() => {
    if (groupRef.current && !hovered) {
       groupRef.current.rotation.y += 0.003; // Vitesse de rotation ajustée pour être fluide
    }
  });

  // Ajuster la position initiale du modèle une fois chargé et son orientation de base
   useEffect(() => {
    if (groupRef.current && clonedScene) {
        // Centrer le modèle si nécessaire (dépend du point d'origine du modèle GLB)
        const box = new THREE.Box3().setFromObject(clonedScene);
        box.getCenter(clonedScene.position).multiplyScalar(-1);

        // Orientation de base : par défaut le modèle doit faire face à l'extérieur du cercle depuis sa position
        // Si le modèle est créé avec l'avant (face Z négative) orienté vers l'avant,
        // alors aucune rotation initiale complexe n'est nécessaire ici si le groupRef est déjà bien positionné.
        // Laisser le modèle dans son orientation par défaut après centrage.

        // Ajuster la taille initiale
        // Laisser l'échelle définie directement sur la primitive pour un contrôle plus direct

    }
   }, [clonedScene]);


  return (
    <group position={position} ref={groupRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
      {/* Utiliser la primitive avec la scène clonée et échelle ajustée */}
      <primitive object={clonedScene} scale={[0.002, 0.002, 0.002]} /> {/* Échelle ajustée à 0.002 */}
    </group>
  );
}

export default function ProjectsScene() {
  const projects = [
    { id: 1, position: [5, 0, 0] },
    { id: 2, position: [3.5, 0, 3.5] },
    { id: 3, position: [0, 0, 5] },
    { id: 4, position: [-3.5, 0, 3.5] },
    { id: 5, position: [-5, 0, 0] },
    { id: 6, position: [-3.5, 0, -3.5] },
    { id: 7, position: [0, 0, -5] },
    { id: 8, position: [3.5, 0, -3.5] }
  ];

  return (
    <Canvas camera={{ position: [0, 5, 8], fov: 75 }}> {/* Position initiale de la caméra pour orbiter */}
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 25]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[0, 5, 0]} intensity={1.0} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        castShadow
      />

      {projects.map((project) => (
        <ProjectCard key={project.id} id={project.id} position={project.position as [number, number, number]} />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.25}
        enableZoom={true}
        enablePan={true} // Autoriser le déplacement
        target={[0, 0, 0]} // Cibler le centre du cercle
        minDistance={4} // Limite de zoom minimum (près du centre du cercle)
        maxDistance={20} // Limite de zoom maximum (loin du cercle)
        rotateSpeed={0.7} // Vitesse de rotation ajustée
        // Aucune restriction d'angle polaire pour permettre la rotation complète
      />
    </Canvas>
  );
} 