import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Package, Box, Coffee, Utensils, ShoppingBag, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: Package,
    title: "Garment Bags & Hangers",
    description:
      "From individual pieces to complete collections. Our garment bags protect fabrics, maintain shape, and create that premium first impression your luxury apparel deserves.",
    features: ["Fabric protection", "Shape retention", "Brand integration"],
  },
  {
    icon: Box,
    title: "Luxury Shoe Boxes",
    description:
      "The moment your customer receives their shoes is a brand moment. Our boxes are engineered for that first impression—sturdy, elegant, unforgettable.",
    features: ["Custom closures", "Dust protection", "Brand finishing"],
  },
  {
    icon: Coffee,
    title: "Accessory Cases & Organizers",
    description:
      "Jewelry, belts, scarves, and more. Each accessory has unique protection needs. We build cases that preserve value and enhance the luxury experience.",
    features: ["Padded interiors", "Secure closures", "Display integration"],
  },
  {
    icon: Utensils,
    title: "Tissue Paper & Inserts",
    description:
      "Premium tissue, ribbons, and protective inserts. Refined enough for luxury brands, functional enough for everyday luxury apparel. No compromises.",
    features: ["Luxury textures", "Color matching", "Custom patterns"],
  },
  {
    icon: ShoppingBag,
    title: "Shopping & Carry Bags",
    description:
      "The journey from boutique to home. Our bags handle the weight of luxury purchases and arrive looking like the premium brands they represent.",
    features: ["Reinforced handles", "Brand printing", "Size options"],
  },
  {
    icon: Gift,
    title: "Gift & Presentation Packaging",
    description:
      "Unboxing luxury apparel is a ritual. For special pieces and collections—we create packaging that makes the experience unforgettable.",
    features: ["Magnetic closures", "Tissue integration", "Premium finishes"],
  },
];

const WhatWeBuild = () => {
  const heroRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-copper/5 via-transparent to-transparent" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Our Capabilities
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-foreground leading-tight">
              We don't sell products. We build solutions.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every package we create starts with understanding your product, your
              brand, and your customers. Then we engineer the perfect container.
              No catalog browsing—just custom solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section ref={capabilitiesRef} className="py-24 bg-midnight-light">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What we can build for you.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Focus on capability, not inventory. Tell us what you need—we'll make it happen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-premium p-8 h-full hover:border-copper/30 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-midnight flex items-center justify-center border border-ash/20 group-hover:border-copper/50 transition-colors mb-6">
                    <item.icon size={22} className="text-copper" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-midnight rounded-full text-ash border border-ash/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium p-10 md:p-12 border-copper/20 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              No prices. No cart. No catalog.
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every project is unique. We quote based on your specific requirements—
              materials, quantities, customization level. Start a project and get
              a tailored proposal within 48 hours.
            </p>
            <Link to="/start-project" className="inline-block mt-8">
              <Button variant="copper" size="lg" className="group">
                Start Your Project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatWeBuild;
