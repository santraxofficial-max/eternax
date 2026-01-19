import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { IndustryIcons } from "@/components/ui/industry-icons";

const industries = [
  {
    name: "READY-TO-WEAR",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
  {
    name: "LUXURY FASHION",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
  {
    name: "STREETWEAR",
    icon: IndustryIcons["FMCG / D2C Consumer Brands"],
  },
  {
    name: "ACCESSORIES",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
  {
    name: "FOOTWEAR",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
  {
    name: "DENIM & CASUAL",
    icon: IndustryIcons["FMCG / D2C Consumer Brands"],
  },
  {
    name: "ATHLEISURE",
    icon: IndustryIcons["FMCG / D2C Consumer Brands"],
  },
  {
    name: "SUSTAINABLE FASHION",
    icon: IndustryIcons["Luxury & Lifestyle Brands"],
  },
];

export const IndustrySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-8 -mt-4">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-copper text-sm font-medium uppercase tracking-wider">
            Fashion segments we serve
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">
            Clothing & Fashion Industry
          </h2>
        </motion.div>

        {/* Horizontal slider with thin top/bottom borders */}
        <div className="relative mx-auto w-full">
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
          
          <div className="py-6 overflow-hidden">
            <InfiniteSlider gap={48} duration={40} durationOnHover={80} reverse>
              {industries.map((industry) => {
                const IconComponent = industry.icon;
                return (
                  <motion.div
                    key={`industry-${industry.name}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 px-4 group cursor-default"
                  >
                    <div className="flex-shrink-0 text-copper/70 group-hover:text-copper transition-colors duration-300">
                      <IconComponent />
                    </div>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                      {industry.name}
                    </span>
                  </motion.div>
                );
              })}
            </InfiniteSlider>
          </div>

          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};
