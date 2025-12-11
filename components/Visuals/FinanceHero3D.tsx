
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define local constants for intrinsic elements using PascalCase to bypass JSX type errors.
// Tags starting with uppercase are treated as component references rather than intrinsic DOM/SVG/R3F elements by the TS/React parser.
const Mesh = 'mesh' as any;
const OctahedronGeometry = 'octahedronGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const FloatingPrism = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Use local Mesh constant to avoid intrinsic element type issues */}
      <Mesh ref={meshRef}>
        {/* Use local OctahedronGeometry constant to avoid intrinsic element type issues */}
        <OctahedronGeometry args={[2, 0]} />
        <MeshDistortMaterial
          color="#13ec5b"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#13ec5b"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Mesh>
    </Float>
  );
};

const BackgroundParticles = () => {
  return (
    <Sphere args={[1, 100, 100]} scale={10}>
      <MeshWobbleMaterial
        color="#1c2e21"
        side={THREE.BackSide}
        factor={0.4}
        speed={1}
      />
    </Sphere>
  );
};

export const FinanceHero3D = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Use local AmbientLight constant to avoid intrinsic element type issues */}
        <AmbientLight intensity={0.5} />
        {/* Use local PointLight constant to avoid intrinsic element type issues */}
        <PointLight position={[10, 10, 10]} color="#13ec5b" intensity={2} />
        <FloatingPrism />
        <BackgroundParticles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#102216]/20 to-[#102216]"></div>
    </div>
  );
};
