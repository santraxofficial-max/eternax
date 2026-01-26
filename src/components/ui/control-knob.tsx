"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useMotionValueEvent, animate } from "framer-motion";

interface ReactorKnobProps {
  text?: string;
}

export default function ReactorKnob({ text = "FILTERING" }: ReactorKnobProps) {
  const MIN_DEG = -135;
  const MAX_DEG = 135;
  const TOTAL_TICKS = 40;

  const [isAnimating, setIsAnimating] = useState(true);

  const rotation = useMotionValue(-135);

  const smoothRotation = useSpring(rotation, {
    stiffness: 400,
    damping: 35,
    mass: 0.8
  });

  const displayValue = useTransform(smoothRotation, [MIN_DEG, MAX_DEG], [0, 100]);

  const lightOpacity = useTransform(rotation, [MIN_DEG, MAX_DEG], [0.05, 0.5]);

  const lightBlur = useTransform(rotation, [MIN_DEG, MAX_DEG], ["0px", "20px"]);

  useEffect(() => {
    const animation = animate(rotation, MAX_DEG, {
      duration: 3,
      ease: "easeInOut",
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    return () => animation.stop();
  }, [rotation]);

  const ticks = Array.from({ length: TOTAL_TICKS + 1 });

  return (
    <div className="fixed inset-0 w-full h-full bg-neutral-950 flex flex-col items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      <div className="relative z-10 scale-125 md:scale-150">

        <div className="relative w-64 h-64 select-none">

          <motion.div
              className="absolute inset-0 bg-orange-500 rounded-full blur-3xl transition-opacity duration-75"
              style={{ opacity: lightOpacity }}
          />

          <div className="absolute inset-0 pointer-events-none">
          {ticks.map((_, i) => {
              const angle = (i / TOTAL_TICKS) * (MAX_DEG - MIN_DEG) + MIN_DEG;
              return (
              <div
                  key={i}
                  className="absolute top-0 left-1/2 w-1 h-full -translate-x-1/2"
                  style={{ transform: `rotate(${angle}deg)` }}
              >
                  <TickMark currentRotation={smoothRotation} angle={angle} />
              </div>
              );
          })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
              <motion.div
                  className="relative w-full h-full rounded-full touch-none z-20"
                  style={{ rotate: smoothRotation }}
              >
                  <div className="w-full h-full rounded-full bg-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-neutral-800 flex items-center justify-center relative overflow-hidden">

                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%),conic-gradient(from_0deg,transparent_0deg,#000_360deg)]" />

                      <div className="relative w-24 h-24 rounded-full bg-neutral-950 shadow-[inset_0_2px_5px_rgba(0,0,0,1)] border border-neutral-800/50 flex items-center justify-center">

                          <motion.div
                              className="absolute top-3 w-1.5 h-5 bg-orange-500 rounded-full"
                              style={{ boxShadow: useTransform(rotation, (r: number) => `0 0 ${Math.max(5, (r + 135) / 10)}px orange`) }}
                          />

                          <div className="flex flex-col items-center mt-4 opacity-50">
                              <span className="font-mono text-[10px] text-neutral-500 tracking-widest">PROGRESS</span>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-[10px] text-neutral-600 font-mono tracking-[0.2em] mb-1">{text}</span>
              <DisplayValue value={displayValue} />
          </div>

        </div>
      </div>
    </div>
  );
}

function TickMark({ currentRotation, angle }: { currentRotation: any, angle: number }) {
    const opacity = useTransform(currentRotation, (r: number) => {
        return r >= angle ? 1 : 0.2;
    });
    const color = useTransform(currentRotation, (r: number) => {
        return r >= angle ? "#f97316" : "#404040";
    });
    const boxShadow = useTransform(currentRotation, (r: number) => {
        return r >= angle ? "0 0 8px rgba(249, 115, 22, 0.6)" : "none";
    });

    return (
        <motion.div
            style={{ backgroundColor: color, opacity, boxShadow }}
            className="w-1 h-2.5 rounded-full transition-colors duration-75"
        />
    );
}

function DisplayValue({ value }: { value: any }) {
    const [display, setDisplay] = useState(0);
    useMotionValueEvent(value, "change", (latest: number) => setDisplay(Math.round(latest)));

    return (
        <div className="relative">
            <span className="absolute inset-0 blur-sm text-orange-500/50 font-mono text-3xl font-black tabular-nums tracking-widest">
                {display.toString().padStart(3, '0')}
            </span>
            <span className="relative font-mono text-3xl text-orange-500 font-black tabular-nums tracking-widest">
                {display.toString().padStart(3, '0')}
                <span className="text-sm text-neutral-600 ml-1">%</span>
            </span>
        </div>
    );
}
