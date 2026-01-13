import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-copper/10 blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="card-premium p-12 md:p-16 text-center border-copper/20 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-copper/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-copper/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="text-copper text-sm font-medium uppercase tracking-wider">
              Ready to Transform?
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-concrete max-w-3xl mx-auto leading-tight">
              Your customers are waiting for packaging that matches your vision.
            </h2>
            <p className="mt-6 text-lg text-concrete-muted max-w-2xl mx-auto">
              Join forward-thinking brands who've already made the switch. 
              Get a custom packaging quote in minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/start-project">
                <Button variant="hero" className="group">
                  Start a Packaging Project
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link to="/materials">
                <Button variant="hero-outline">Explore Materials</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
