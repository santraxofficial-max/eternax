import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Cake, Coffee, ChefHat, Truck, Award } from "lucide-react";

const industries = [
  { icon: UtensilsCrossed, name: "Food & Beverage", active: true },
  { icon: Cake, name: "Bakery & Desserts", active: true },
  { icon: Coffee, name: "Café & Coffee", active: true },
  { icon: ChefHat, name: "Fine Dining", active: true },
  { icon: Truck, name: "Cloud Kitchens", active: true },
  { icon: Award, name: "QSR & Franchise", active: true },
];

export const IndustrySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-sm font-medium uppercase tracking-wider">
            Industries We Serve
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-concrete">
            Built for food brands that care.
          </h2>
          <p className="mt-4 text-concrete-muted max-w-2xl mx-auto">
            Whether you're a cloud kitchen scaling fast or a fine dining establishment
            protecting your reputation—we build packaging for your exact needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-premium p-6 text-center h-full flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-copper/30 cursor-default">
                <div className="w-12 h-12 rounded-xl bg-midnight flex items-center justify-center border border-ash/20 group-hover:border-copper/50 transition-colors">
                  <industry.icon size={22} className="text-copper" />
                </div>
                <span className="text-sm font-medium text-concrete">
                  {industry.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-ash text-sm"
        >
          More industries coming soon. Cosmetics, pharmaceuticals, and retail packaging in development.
        </motion.p>
      </div>
    </section>
  );
};
