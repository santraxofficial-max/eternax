"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { PackagingBox3D } from "./PackagingBox3D";

interface DesignStudioCanvasProps {
  boxColor: string;
  textContent: string;
  textColor: string;
  logoText: string;
  boxType: "mailer" | "gift" | "shoe" | "garment";
  finish: "matte" | "glossy" | "textured";
}

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#8B7355" wireframe />
  </mesh>
);

export const DesignStudioCanvas: React.FC<DesignStudioCanvasProps> = ({
  boxColor,
  textContent,
  textColor,
  logoText,
  boxType,
  finish,
}) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [4, 3, 5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#B87333" />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Presentation Controls for mobile-friendly interaction */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0.3, 0.1, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Suspense fallback={<LoadingFallback />}>
            <PackagingBox3D
              boxColor={boxColor}
              textContent={textContent}
              textColor={textColor}
              logoText={logoText}
              boxType={boxType}
              finish={finish}
            />
          </Suspense>
        </PresentationControls>

        {/* Shadow */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Orbit Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={4}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
};

export default DesignStudioCanvas;
