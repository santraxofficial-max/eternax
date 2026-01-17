"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GradientButton from "@/components/ui/button-1";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-12">

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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight text-concrete leading-none font-neue-haas"
          >
            ETERNA
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 md:mt-10 max-w-2xl mx-auto text-lg md:text-xl text-concrete-muted leading-relaxed text-center"
          >
            Partnering with brands to elevate packaging to contemporary sustainability standards.
          </motion.p>


          {/* CTA Button - Gradient Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 md:mt-16 flex justify-center"
          >
            <Link to="/start-project">
              <GradientButton
                width="auto"
                height="60px"
                onClick={() => {}}
                className="px-6 inline-block"
                style={{ width: 'fit-content' }}
              >
                Design Your Packaging
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
