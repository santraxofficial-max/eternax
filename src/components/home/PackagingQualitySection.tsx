import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, Recycle, Zap, Target, Award, CheckCircle, Star } from "lucide-react";
import CubeLoader from "@/components/ui/cube-loader";

export const PackagingQualitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ABOVE THE CUBE - Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            The Packaging Material
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Revolutionary bio-based materials engineered for unmatched strength, safety, and real-world performance.
          </p>
        </motion.div>

        {/* MAIN GRID: LEFT - CENTER - RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

          {/* LEFT SIDE OF CUBE - Material Excellence */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              Material Excellence
            </h3>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Garment-Safe Materials</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Gentle on fabrics and finishes</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Target className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Structural Integrity</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Advanced protection features</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Recycle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Environmental Resilience</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Moisture, heat & impact resistance</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER - THE CUBE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2, rotateY: 180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, type: "spring", bounce: 0.3 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
              <CubeLoader />
            </div>
          </motion.div>

          {/* RIGHT SIDE OF CUBE - Business Impact */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              Business Impact
            </h3>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Global Standards</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Safety compliance & certification</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Leaf className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Brand Perception</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Enhanced premium positioning</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Target className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">Regulatory Confidence</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Compliance & reliability assurance</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BELOW THE CUBE - Merged Technical & Certification Content */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Main Statistics Cards - Centered */}
          <div className="flex justify-center gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50 min-w-[200px]"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 mb-1">99.9%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Fashion Protection Rating</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Garment Care Certified</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50 min-w-[200px]"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Recyclable</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Zero Waste Certified</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/50 min-w-[200px]"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 mb-1">ISO</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Certified</div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Global Standards</div>
              </div>
            </motion.div>
          </div>

          {/* Technical Specifications & Certifications */}
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Temperature</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">-40°C to +120°C</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Moisture</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">IP67 Rated</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Garment Capacity</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Up to 50 garments</div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">FDA Approved</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">ISO 9001</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.9 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">EU REACH</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.0 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors min-w-[200px]"
            >
              <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">Biodegradable</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
