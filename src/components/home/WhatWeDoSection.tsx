import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Leaf, Factory } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Custom Food Packaging",
    description:
      "From concept to production—we design packaging that tells your brand story while protecting what matters.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "Every material we use is sourced for performance and planet. Biodegradable, recyclable, and food-safe.",
  },
  {
    icon: Factory,
    title: "Manufacturer-Led Execution",
    description:
      "We're not middlemen. We manufacture, which means faster timelines, better prices, and guaranteed quality.",
  },
];

export const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-sm font-medium uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-concrete">
            Built different. Built better.
          </h2>
          <p className="mt-4 text-concrete-muted max-w-2xl mx-auto">
            We don't sell boxes from a catalog. We engineer packaging solutions
            that grow with your brand.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="card-premium p-8 h-full transition-all duration-500 hover:border-copper/30">
                {/* Icon - Copper border, dark inside */}
                <div className="w-14 h-14 rounded-xl bg-midnight-light border border-copper/50 flex items-center justify-center mb-6 group-hover:border-copper transition-colors duration-500">
                  <feature.icon size={24} className="text-copper" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-concrete mb-3">
                  {feature.title}
                </h3>
                <p className="text-concrete-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-copper/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
