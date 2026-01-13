import { motion } from "framer-motion";
import { ArrowRight, Leaf, Box, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-copper/5 via-transparent to-transparent" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-24 h-24 rounded-full bg-copper/5 blur-3xl"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-1/4 right-[15%] w-32 h-32 rounded-full bg-copper/10 blur-3xl"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
      />

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-light border border-ash/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span className="text-sm text-concrete-muted">
              Now serving Food & Beverage brands
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-concrete leading-[1.1] tracking-tight"
          >
            Premium packaging,{" "}
            <span className="text-gradient-copper">built for tomorrow.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-concrete-muted max-w-2xl mx-auto leading-relaxed"
          >
            We manufacture biodegradable packaging that protects your product,
            elevates your brand, and respects the planet. No compromises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/start-project">
              <Button variant="hero" className="group">
                Start a Packaging Project
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link to="/what-we-build">
              <Button variant="hero-outline">Explore Capabilities</Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Box,
                label: "Custom Design",
                description: "Tailored to your brand identity",
              },
              {
                icon: Leaf,
                label: "100% Biodegradable",
                description: "Zero waste, full impact",
              },
              {
                icon: Factory,
                label: "Manufacturer-Led",
                description: "Factory-direct execution",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-midnight-light border border-ash/20 flex items-center justify-center mb-4 group-hover:border-copper/50 transition-colors duration-300">
                  <item.icon size={24} className="text-copper" />
                </div>
                <h3 className="text-concrete font-semibold">{item.label}</h3>
                <p className="text-sm text-ash mt-1">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
