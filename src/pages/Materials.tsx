import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Leaf, Shield, Recycle, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: Shield,
    title: "Food-Safe First",
    description:
      "Every material we use is certified for direct food contact. No exceptions. Your customers trust your product—we ensure the packaging is equally trustworthy.",
  },
  {
    icon: Leaf,
    title: "Biodegradable by Design",
    description:
      "Our materials break down naturally. Not in 500 years—in months. When your packaging reaches the end of its life, it returns to the earth, not a landfill.",
  },
  {
    icon: Recycle,
    title: "Recyclable & Compostable",
    description:
      "Beyond biodegradability, our packaging fits into existing recycling and composting systems. Easy for your customers, good for the planet.",
  },
  {
    icon: Award,
    title: "Performance Without Compromise",
    description:
      "Sustainable doesn't mean weak. Our materials handle heat, cold, grease, moisture, and stacking—everything your product demands.",
  },
];

const materials = [
  {
    name: "Sugarcane Bagasse",
    best_for: "Hot foods, oily dishes, high-volume restaurants",
    properties: ["Heat resistant", "Grease resistant", "Fully compostable"],
  },
  {
    name: "Kraft Paper",
    best_for: "Bakery items, dry goods, premium presentations",
    properties: ["Food-safe coatings", "Excellent printability", "Recyclable"],
  },
  {
    name: "Bamboo Fiber",
    best_for: "Premium packaging, eco-conscious brands",
    properties: ["Naturally antibacterial", "Rapid renewal", "Elegant texture"],
  },
  {
    name: "Cornstarch Blend",
    best_for: "Cold beverages, salads, transparent applications",
    properties: ["Clear appearance", "Oil resistant", "Industrial compostable"],
  },
  {
    name: "Molded Pulp",
    best_for: "Protective packaging, custom shapes",
    properties: ["Shock absorption", "Custom moldable", "100% recycled option"],
  },
  {
    name: "Recycled Board",
    best_for: "Secondary packaging, gift boxes",
    properties: ["High strength", "Excellent finish", "Circular economy"],
  },
];

const Materials = () => {
  const principlesRef = useRef(null);
  const materialsRef = useRef(null);
  const complianceRef = useRef(null);
  const principlesInView = useInView(principlesRef, { once: true, margin: "-100px" });
  const materialsInView = useInView(materialsRef, { once: true, margin: "-100px" });
  const complianceInView = useInView(complianceRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-copper/5 via-transparent to-transparent" />
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Materials & Sustainability
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Serious materials for serious brands.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our materials are chosen not just for sustainability claims—but for
              real-world performance. Every option is vetted, tested, and proven
              in actual food service conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section ref={principlesRef} className="py-24 bg-midnight-light">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our material philosophy.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We don't compromise. Every material in our portfolio meets all four criteria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-8 hover:border-copper/30 transition-all duration-500"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center flex-shrink-0">
                    <item.icon size={22} className="text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Options */}
      <section ref={materialsRef} className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={materialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Material Options
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
              The right material for every need.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <motion.div
                key={material.name}
                initial={{ opacity: 0, y: 30 }}
                animate={materialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 group hover:border-copper/30 transition-all duration-500"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-copper mb-4">
                  Best for: {material.best_for}
                </p>
                <div className="space-y-2">
                  {material.properties.map((prop) => (
                    <div key={prop} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-copper" />
                      {prop}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section ref={complianceRef} className="py-24 bg-midnight-light">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={complianceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Compliance & Certifications
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground">
              Meeting the highest standards.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Our materials and processes are certified for food safety,
              biodegradability, and environmental compliance. For ESG reporting,
              procurement requirements, or regulatory needs—we provide full
              documentation.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {["FDA Compliant", "ASTM D6400", "EN 13432", "BPI Certified", "ISO 14001"].map(
                (cert) => (
                  <span
                    key={cert}
                    className="px-4 py-2 bg-midnight rounded-full border border-ash/30 text-sm font-medium text-foreground"
                  >
                    {cert}
                  </span>
                )
              )}
            </div>

            <Link to="/start-project" className="inline-block mt-12">
              <Button variant="copper" size="lg" className="group">
                Get Documentation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Materials;
