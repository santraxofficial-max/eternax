import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, PenTool, PackageCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Share Your Vision",
    description:
      "Tell us about your brand, your products, and your packaging goals. We'll guide you through material options and design possibilities.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Custom Design & Sampling",
    description:
      "Our team creates custom designs tailored to your brand. Review 3D mockups and approve physical samples before production.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Production & Delivery",
    description:
      "We manufacture at scale with rigorous quality control. Your packaging ships on schedule, ready to impress your customers.",
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-copper text-sm font-medium uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-concrete">
            From vision to reality.
          </h2>
          <p className="mt-4 text-concrete-muted max-w-2xl mx-auto">
            A streamlined process designed for busy founders and procurement teams.
            No complexity, just results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-transparent via-ash/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-midnight border border-ash/20 flex items-center justify-center relative z-10">
                      <step.icon size={32} className="text-copper" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-copper flex items-center justify-center text-xs font-bold text-midnight">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-concrete mb-3">
                    {step.title}
                  </h3>
                  <p className="text-concrete-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link to="/start-project">
            <Button variant="copper" size="xl" className="group">
              Start Your Project Today
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
