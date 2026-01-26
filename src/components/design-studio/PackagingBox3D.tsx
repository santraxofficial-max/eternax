"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface PackagingBox3DProps {
  boxColor: string;
  textContent: string;
  textColor: string;
  logoText: string;
  boxType: "mailer" | "gift" | "shoe" | "garment";
  finish: "matte" | "glossy" | "textured";
}

export const PackagingBox3D: React.FC<PackagingBox3DProps> = ({
  boxColor,
  textContent,
  textColor,
  logoText,
  boxType,
  finish,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Get box dimensions based on type
  const dimensions = useMemo(() => {
    switch (boxType) {
      case "mailer":
        return { width: 3, height: 1.5, depth: 2 };
      case "gift":
        return { width: 2, height: 2, depth: 2 };
      case "shoe":
        return { width: 3.5, height: 1.2, depth: 2.2 };
      case "garment":
        return { width: 4, height: 0.8, depth: 3 };
      default:
        return { width: 3, height: 1.5, depth: 2 };
    }
  }, [boxType]);

  // Get material properties based on finish
  const materialProps = useMemo(() => {
    switch (finish) {
      case "glossy":
        return { roughness: 0.1, metalness: 0.3 };
      case "textured":
        return { roughness: 0.9, metalness: 0 };
      case "matte":
      default:
        return { roughness: 0.7, metalness: 0.1 };
    }
  }, [finish]);

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Box */}
      <RoundedBox
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        radius={0.05}
        smoothness={4}
      >
        <meshStandardMaterial
          color={boxColor}
          roughness={materialProps.roughness}
          metalness={materialProps.metalness}
        />
      </RoundedBox>

      {/* Box Lid (slightly raised) */}
      <RoundedBox
        args={[dimensions.width + 0.05, 0.15, dimensions.depth + 0.05]}
        position={[0, dimensions.height / 2 + 0.075, 0]}
        radius={0.03}
        smoothness={4}
      >
        <meshStandardMaterial
          color={boxColor}
          roughness={materialProps.roughness}
          metalness={materialProps.metalness}
        />
      </RoundedBox>

      {/* Front Text - Brand Name */}
      <Text
        position={[0, 0.1, dimensions.depth / 2 + 0.01]}
        fontSize={0.25}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={dimensions.width - 0.4}
      >
        {logoText}
      </Text>

      {/* Front Text - Tagline */}
      <Text
        position={[0, -0.2, dimensions.depth / 2 + 0.01]}
        fontSize={0.1}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={dimensions.width - 0.4}
        letterSpacing={0.1}
      >
        {textContent.toUpperCase()}
      </Text>

      {/* Top Logo */}
      <Text
        position={[0, dimensions.height / 2 + 0.16, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {logoText}
      </Text>

      {/* Decorative corner accent */}
      <mesh position={[dimensions.width / 2 - 0.15, dimensions.height / 2 + 0.16, dimensions.depth / 2 - 0.15]}>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial color={textColor} />
      </mesh>

      {/* Side branding */}
      <Text
        position={[dimensions.width / 2 + 0.01, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.15}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {logoText}
      </Text>
    </group>
  );
};

export default PackagingBox3D;
