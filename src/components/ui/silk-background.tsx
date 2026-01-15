"use client";

import React, { useEffect, useRef, useState } from "react";

interface SilkBackgroundProps {
  className?: string;
}

export const SilkBackground = ({ className }: SilkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const speed = 0.015;
    const scale = 1.5;
    const noiseIntensity = 0.6;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Simple noise function
    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;

      // Create gradient background - pitch black base
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#050505");
      gradient.addColorStop(0.3, "#0a0a0a");
      gradient.addColorStop(0.7, "#080808");
      gradient.addColorStop(1, "#050505");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create silk-like pattern
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.025 * Math.sin(6.0 * tex_x - tOffset);

          const pattern =
            0.5 +
            0.5 *
              Math.sin(
                4.0 *
                  (tex_x +
                    tex_y +
                    Math.cos(2.5 * tex_x + 4.0 * tex_y) +
                    0.015 * tOffset) +
                  Math.sin(15.0 * (tex_x + tex_y - 0.08 * tOffset))
              );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 20.0) * noiseIntensity);

          // Subtle gray silk color
          const r = Math.floor(50 * intensity);
          const g = Math.floor(50 * intensity);
          const b = Math.floor(55 * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add subtle radial overlay for depth
      const overlayGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      overlayGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      overlayGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.1)");
      overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-0 pointer-events-none ${className || ""}`}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 1s ease-out" }}
    />
  );
};
