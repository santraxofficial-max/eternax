import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { IndustryIcons } from "@/components/ui/industry-icons";

const industries = [
  {
    name: "Food & Bev",
    icon: IndustryIcons["Food & Beverage"],
  },
  {
    name: "FMCG/D2C",
    icon: IndustryIcons["FMCG / D2C Consumer Brands"],
  },
  {
    name: "Hospitality",
    icon: IndustryIcons["Hospitality"],
  },
  {
    name: "Beauty & Care",
    icon: IndustryIcons["Cosmetics & Personal Care"],
  },
  {
    name: "Pharma & Wellness",
    icon: IndustryIcons["Pharmaceutical & Wellness"],
  },
  {
    name: "Luxury Brands",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
  {
    name: "E-commerce",
    icon: IndustryIcons["E-commerce & Logistics"],
  },
  {
    name: "Retail",
    icon: IndustryIcons["Retail Chains & Supermarkets"],
  },
  {
    name: "Corporate",
    icon: IndustryIcons["Corporate & B2B Gifting"],
  },
  {
    name: "Agriculture",
    icon: IndustryIcons["Agriculture & Agri-tech"],
  },
  {
    name: "Healthcare",
    icon: IndustryIcons["Healthcare & Medical (Non-invasive)"],
  },
  {
    name: "Electronics",
    icon: IndustryIcons["Electronics & Hardware"],
  },
];

export const IndustrySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-6 -mt-8">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-copper text-sm font-medium uppercase tracking-wider">
            We work with
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-concrete">
            Leading Industries
          </h2>
        </motion.div>

        <div className="relative mx-auto w-full overflow-hidden">
          <InfiniteSlider gap={60} reverse speed={60} speedOnHover={25}>
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <motion.div
                  key={`industry-${industry.name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center space-y-3 p-3 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 group-hover:border-primary/20 transition-all duration-300">
                    <IconComponent />
                  </div>
                  <span className="text-xs text-center text-muted-foreground group-hover:text-primary transition-colors duration-300 font-medium">
                    {industry.name}
                  </span>
                </motion.div>
              );
            })}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
};
