import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Leaf, Recycle, CheckCircle, TrendingDown, Heart, Target, Globe, Award } from "lucide-react";
import RotatingEarthGreen from "@/components/ui/wireframe-dotted-globe-green";

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

export const TheSolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            The Solution
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
              <RotatingEarthGreen width={400} height={400} />
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
              Sustainable, bio-based packaging turns responsibility into advantage.
            </motion.div>

            {/* Key Strategy Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Recycle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                    Strategic Replacement
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Plastic-heavy systems → Biodegradable materials
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Global Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Impact
              </h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Lower plastic leakage into oceans</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Reduced carbon emissions</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Recycle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">Circular economy support</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Advantages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Business Advantages
              </h3>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 2.0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm">Higher brand trust and loyalty</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Regulatory readiness</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 2.4 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Future-proof cost structures</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="text-base text-muted-foreground leading-relaxed border-l-4 border-green-500 pl-4 italic"
            >
              Sustainable packaging is no longer a compromise—it is a strategic upgrade that aligns growth with responsibility.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
