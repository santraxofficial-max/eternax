"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24">

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-concrete leading-none"
          >
            eterna
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8 text-sm md:text-base tracking-widest text-concrete-muted uppercase"
          >
            <span>sustainable</span>
            <span className="text-copper">•</span>
            <span>premium</span>
            <span className="text-copper">•</span>
            <span>packaging</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 md:mt-10 max-w-xl mx-auto text-base md:text-lg text-concrete-muted leading-relaxed"
          >
            Biodegradable packaging engineered for modern food brands. 
            Protect your product, elevate your brand, respect the planet.
          </motion.p>

          {/* CTA Button - Shimmer Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 md:mt-12"
          >
            <Link to="/start-project">
              <ShimmerButton className="group">
                Start a Packaging Project
                <ChevronRight
                  size={18}
                  className="text-copper transition-transform group-hover:translate-x-1 ml-2"
                />
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
