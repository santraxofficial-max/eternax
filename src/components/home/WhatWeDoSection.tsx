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
        title: "Custom Fashion Packaging Design",
        meta: "From concept to closet",
        description:
            "Complete packaging solutions tailored for fashion brands. We design packaging that protects garments while enhancing your brand story.",
        icon: <Palette className="w-4 h-4 text-ash-dark" />,
        status: "Live",
        tags: ["Design", "Branding", "Fashion-Ready"],
        colSpan: 2,
        hasPersistentHover: true,
    },
    {
        title: "Sustainable Materials",
        meta: "Planet-friendly options",
        description: "Biodegradable, recyclable materials that protect fashion items while reducing environmental impact and plastic pollution.",
        icon: <Leaf className="w-4 h-4 text-ash-dark" />,
        status: "Premium",
        tags: ["Eco-Friendly", "Biodegradable"],
    },
    {
        title: "Direct Manufacturing",
        meta: "No middlemen, faster delivery",
        description: "We manufacture in-house, ensuring quality control, competitive pricing, and faster turnaround times for fashion packaging.",
        icon: <Factory className="w-4 h-4 text-ash-dark" />,
        tags: ["Manufacturing", "Quality", "Speed"],
        colSpan: 2,
    },
    {
        title: "Fashion Industry Standards",
        meta: "Quality & durability",
        description: "All packaging meets fashion industry standards for garment protection and international sustainability certifications.",
        icon: <Shield className="w-4 h-4 text-ash-dark" />,
        status: "Certified",
        tags: ["Quality", "Protection", "Compliance"],
    },
    {
        title: "Rapid Prototyping",
        meta: "Quick iterations",
        description: "Fast-track your fashion packaging development with our rapid prototyping and testing services.",
        icon: <Zap className="w-4 h-4 text-ash-dark" />,
        status: "Express",
        tags: ["Prototyping", "Testing", "Speed"],
    },
    {
        title: "Fashion Brand Partnership",
        meta: "End-to-end support",
        description: "From initial consultation to market launch, we're your dedicated fashion packaging partner.",
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
            We don't sell generic packaging from a catalog. We engineer fashion-forward solutions
            that elevate your brand and reduce your environmental footprint.
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
