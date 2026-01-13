import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, TrendingUp, Globe } from "lucide-react";

export const WhyEternaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-midnight-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(24, 70%, 50%) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              The Problem
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-concrete leading-tight">
              The future of food won't be packaged in plastic.
            </h2>
            <p className="mt-6 text-lg text-concrete-muted leading-relaxed">
              Consumers demand sustainability. Regulations are tightening. Your
              competitors are already switching. The question isn't whether to go
              sustainable—it's how fast you can get there.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: AlertTriangle,
                  stat: "8M+ tons",
                  text: "of plastic enters oceans yearly",
                },
                {
                  icon: TrendingUp,
                  stat: "73%",
                  text: "of consumers prefer sustainable packaging",
                },
                {
                  icon: Globe,
                  stat: "2025+",
                  text: "New regulations banning single-use plastics",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.stat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-midnight flex items-center justify-center border border-ash/20">
                    <item.icon size={20} className="text-copper" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-copper">
                      {item.stat}
                    </span>
                    <p className="text-concrete-muted">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="card-premium p-10 border-copper/20">
              <div className="absolute -top-3 -right-3 px-4 py-1.5 bg-gradient-copper rounded-full text-sm font-medium text-midnight">
                The Solution
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-concrete mt-4">
                Eterna partners with brands ready to lead.
              </h3>
              
              <p className="mt-4 text-concrete-muted leading-relaxed">
                We manufacture premium, biodegradable packaging that doesn't just
                meet regulations—it exceeds customer expectations and sets you
                apart from competitors still stuck in the past.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "100% biodegradable & compostable materials",
                  "Custom design for your brand identity",
                  "Competitive pricing through direct manufacturing",
                  "Dedicated support from concept to delivery",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-concrete"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-copper" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-copper/10 blur-2xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-copper/5 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
