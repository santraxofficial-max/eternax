import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, Recycle, Zap, Target, Award, CheckCircle, Star } from "lucide-react";
import CubeLoader from "@/components/ui/cube-loader";

export const PackagingQualitySection = () => {
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
            The Packaging Material
          </h2>
        </motion.div>

        {/* CubeLoader Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="w-full max-w-2xl">
            <CubeLoader />
          </div>
        </motion.div>

        {/* Content Grid - Compact Horizontal Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Opening Statement & Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <p className="text-xl text-ash leading-relaxed mb-8 max-w-3xl mx-auto">
              High-quality, bio-based materials engineered for strength, safety, and real-world performance.
            </p>

            <div className="inline-block bg-gradient-to-r from-copper/10 to-copper/5 dark:from-copper/20 dark:to-copper/10 rounded-2xl p-6 border border-copper/20 dark:border-copper/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-copper/20 dark:bg-copper/30 rounded-xl">
                  <Zap className="w-8 h-8 text-copper" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-copper mb-1">
                    Performance First
                  </p>
                  <p className="text-sm text-ash">
                    Sustainability without compromise
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Material Excellence Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-concrete flex items-center gap-3">
                <div className="p-2 bg-copper/20 rounded-lg">
                  <Star className="w-6 h-6 text-copper" />
                </div>
                Material Excellence
              </h3>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                >
                  <Shield className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Food-Safe Materials</p>
                    <p className="text-sm text-ash">Certified for direct food contact</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <Target className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Structural Integrity</p>
                    <p className="text-sm text-ash">Advanced protection features</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                >
                  <Recycle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Environmental Resilience</p>
                    <p className="text-sm text-ash">Moisture, heat & impact resistance</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Impact Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-concrete flex items-center gap-3">
                <div className="p-2 bg-copper/20 rounded-lg">
                  <Award className="w-6 h-6 text-copper" />
                </div>
                Business Impact
              </h3>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Global Standards</p>
                    <p className="text-sm text-ash">Safety compliance & certification</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                >
                  <Leaf className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Brand Perception</p>
                    <p className="text-sm text-ash">Enhanced premium positioning</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <Target className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-concrete">Regulatory Confidence</p>
                    <p className="text-sm text-ash">Compliance & reliability assurance</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-midnight-light to-midnight-light/80 border border-ash/20 rounded-2xl p-8 backdrop-blur-sm max-w-4xl">
              <p className="text-lg text-concrete font-medium leading-relaxed">
                Each material is chosen based on your{" "}
                <span className="text-copper font-semibold">industry • product • operations</span>{" "}
                —delivering sustainable packaging that performs at the highest level.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
