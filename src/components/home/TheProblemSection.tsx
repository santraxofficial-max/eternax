import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AlertTriangle, TrendingUp, DollarSign, Waves, Mountain, Zap, Users, Shield } from "lucide-react";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (startOnView && isInView) {
      setIsVisible(true);
    }
  }, [isInView, startOnView]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, ref };
};

export const TheProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { count: plasticCount, ref: plasticRef } = useAnimatedCounter(40, 2000, true);

  return (
    <section ref={ref} className="py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-concrete mb-4">
            The Problem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Globe Component - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-md">
              <RotatingEarth width={400} height={400} />
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Opening Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Luxury apparel packaging practices are a major contributor to environmental damage and brand reputation risk.
            </motion.div>

            {/* Statistics Card */}
            <motion.div
              ref={plasticRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-red-200/50 dark:border-red-800/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-1">
                    {plasticCount}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    of luxury apparel packaging contributes to plastic pollution
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Environmental Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Luxury Apparel Impact
              </h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Waves className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Plastic garment bags pollute oceans</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Mountain className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Overproduction waste degrades ecosystems</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">High carbon footprint from shipping packaging</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Risks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-destructive flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Luxury Brand Risks
              </h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 2.0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <DollarSign className="w-5 h-5 text-red-500" />
                  <span className="text-sm">EU packaging regulations and sustainable material costs</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Luxury buyers demanding sustainable packaging</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="text-base text-muted-foreground leading-relaxed border-l-4 border-destructive pl-4 italic"
            >
              Traditional luxury apparel packaging is becoming a liability in an era where consumers demand sustainable practices from their favorite brands.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
