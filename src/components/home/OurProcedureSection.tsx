import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Package, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/ui/shiny-button";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Industry Selection",
    description: "Choose your business sector to get tailored packaging recommendations and product categories that match your industry needs."
  },
  {
    number: "02",
    icon: Package,
    title: "Product Selection",
    description: "Select the specific products that require sustainable packaging solutions from our curated collection of eco-friendly options."
  },
  {
    number: "03",
    icon: Palette,
    title: "Custom Design",
    description: "Design and customize your packaging to perfectly align with your brand identity, colors, and messaging requirements."
  }
];

export const OurProcedureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  // Looping animation that moves through steps
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Simple. Straightforward. Sustainable.
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Transform your packaging in just three easy steps. We handle the complexity while you focus on your business.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Animated Connection Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="hidden lg:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-transparent via-copper/40 to-transparent"
            style={{ transformOrigin: "center" }}
          />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.25,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                <div className="text-center">
                  {/* Step Number Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="relative inline-block mb-8"
                  >
                    <motion.div
                      animate={activeStep === index ? {
                        scale: [1, 1.15, 1],
                        borderColor: "hsl(var(--copper) / 0.6)"
                      } : { scale: 1, borderColor: "hsl(var(--ash) / 0.2)" }}
                      transition={{
                        duration: 1.5,
                        repeat: activeStep === index ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="w-20 h-20 rounded-2xl bg-midnight border flex items-center justify-center relative z-10 transition-colors duration-300"
                    >
                      <motion.div
                        animate={activeStep === index ? {
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        } : { rotate: 0, scale: 1 }}
                        transition={{
                          duration: 2,
                          repeat: activeStep === index ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <step.icon size={32} className={`transition-colors duration-300 ${
                          activeStep === index ? 'text-copper-light' : 'text-copper'
                        }`} />
                      </motion.div>
                    </motion.div>

                    {/* Animated Step Number */}
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.8 + index * 0.2,
                        type: "spring"
                      }}
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-midnight shadow-lg z-20 ${
                        activeStep === index
                          ? 'bg-gradient-to-r from-copper to-copper-light shadow-copper/50'
                          : 'bg-gradient-to-r from-ash to-ash-light'
                      }`}
                    >
                      {index + 1}
                    </motion.span>

                    {/* Enhanced Pulsing Glow Effect */}
                    <motion.div
                      animate={activeStep === index ? {
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.5, 0.2]
                      } : {
                        scale: 1,
                        opacity: 0.1
                      }}
                      transition={{
                        duration: 2,
                        repeat: activeStep === index ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-2xl bg-copper/20 blur-sm -z-10"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  >
                    <motion.h3
                      animate={activeStep === index ? {
                        color: "hsl(var(--copper))"
                      } : {
                        color: "hsl(var(--concrete))"
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-xl md:text-2xl font-semibold mb-4 transition-colors duration-300"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      animate={activeStep === index ? {
                        opacity: 1,
                        scale: [1, 1.02, 1]
                      } : {
                        opacity: 0.7,
                        scale: 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-concrete-muted leading-relaxed max-w-sm mx-auto transition-opacity duration-300"
                    >
                      {step.description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 text-center"
        >

          <Link to="/start-project">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShinyButton className="px-8 py-4 text-lg font-semibold">
                Start Your Packaging Journey
              </ShinyButton>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
