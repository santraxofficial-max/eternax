import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import {
    Palette,
    Leaf,
    Factory,
    Shield,
    Zap,
    Users,
} from "lucide-react";

const features: BentoItem[] = [
    {
        title: "Custom Luxury Apparel Packaging",
        meta: "From atelier to wardrobe",
        description:
            "Complete packaging solutions tailored for luxury apparel brands. We design packaging that protects garments while elevating your brand story.",
        icon: <Palette className="w-4 h-4 text-ash-dark" />,
        status: "Live",
        tags: ["Design", "Branding", "Luxury-Ready"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Sustainable Materials",
        meta: "Planet-friendly options",
        description: "Biodegradable, recyclable materials that protect luxury garments while reducing environmental impact and plastic pollution.",
        icon: <Leaf className="w-4 h-4 text-ash-dark" />,
        status: "Premium",
        tags: ["Eco-Friendly", "Biodegradable"],
    },
    {
        title: "Direct Manufacturing",
        meta: "No middlemen, faster delivery",
        description: "We manufacture in-house, ensuring quality control and faster turnaround times for luxury apparel packaging.",
        icon: <Factory className="w-4 h-4 text-ash-dark" />,
        tags: ["Manufacturing", "Quality", "Speed"],
        colSpan: 2,
    },
    {
        title: "Luxury Apparel Standards",
        meta: "Quality & durability",
        description: "All packaging meets luxury apparel standards for garment protection and international sustainability certifications.",
        icon: <Shield className="w-4 h-4 text-ash-dark" />,
        status: "Certified",
        tags: ["Quality", "Protection", "Compliance"],
    },
    {
        title: "Rapid Prototyping",
        meta: "Quick iterations",
        description: "Fast-track your luxury apparel packaging with rapid prototyping and testing services.",
        icon: <Zap className="w-4 h-4 text-ash-dark" />,
        status: "Express",
        tags: ["Prototyping", "Testing", "Speed"],
    },
    {
        title: "Luxury Brand Partnership",
        meta: "End-to-end support",
        description: "From initial consultation to market launch, we're your dedicated luxury packaging partner.",
        icon: <Users className="w-4 h-4 text-ash-dark" />,
        tags: ["Consulting", "Support", "Partnership"],
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
            We don't sell generic packaging from a catalog. We engineer luxury-apparel-first
            solutions that elevate your brand and reduce your environmental footprint.
          </p>
        </motion.div>

        {/* BentoGrid Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BentoGrid items={features} />
        </motion.div>
      </div>
    </section>
  );
};
