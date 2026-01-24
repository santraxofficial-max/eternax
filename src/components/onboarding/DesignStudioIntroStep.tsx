"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Sparkles, CheckCircle } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";
import {
  getLuxuryProductById,
  type LuxuryProduct,
} from "@/components/onboarding/luxuryProducts";

interface DesignStudioIntroStepProps {
  selectedIndustry?: string;
  selectedProducts: string[];
  onStartDesigning: () => void;
}

export const DesignStudioIntroStep: React.FC<DesignStudioIntroStepProps> = ({
  selectedProducts,
  onStartDesigning,
}) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const selectedProductDetails = selectedProducts
    .map((productId) => getLuxuryProductById(productId))
    .filter((product): product is LuxuryProduct => Boolean(product));

  // Auto-cycle through products for visual engagement
  useEffect(() => {
    if (selectedProductDetails.length > 1) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % selectedProductDetails.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedProductDetails.length]);

  const currentProduct = selectedProductDetails[currentProductIndex] || selectedProductDetails[0];

  // Auto-advance after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
      setTimeout(() => {
        onStartDesigning();
      }, 2000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onStartDesigning]);

  if (showAnimation) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-8 py-20 bg-gradient-to-br from-concrete/5 to-copper/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Palette className="w-full h-full text-copper" />
          </motion.div>
          <h2 className="text-2xl font-bold text-concrete mb-4">
            Opening Design Studio...
          </h2>
          <p className="text-concrete-muted">
            Preparing your personalized design experience
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-copper/10 rounded-full mb-6">
            <Palette className="w-10 h-10 text-copper" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Let's Design Your Luxury Products Together
          </h2>
          <p className="text-concrete-muted max-w-3xl mx-auto text-lg leading-relaxed">
            Now that we've confirmed your packaging selection, it's time to bring your vision to life.
            We'll design each product one by one in our interactive design studio, where you can
            customize every detail to match your brand perfectly.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/30 rounded-full">
            <div className="w-2 h-2 bg-copper rounded-full animate-pulse mr-3"></div>
            <span className="text-copper text-sm font-medium">Preparing your design studio...</span>
          </div>
        </motion.div>

        {/* Interactive Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-concrete mb-2">
              Your Selected Products
            </h3>
            <p className="text-concrete-muted">
              We'll customize each one individually in the design studio
            </p>
          </div>

          {/* Current Product Display */}
          <div className="flex justify-center mb-8">
            <motion.div
              key={currentProduct?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <FlippingCard
                width={350}
                height={400}
                className="ring-2 ring-copper/50"
                frontContent={
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <div className="absolute top-4 right-4 w-6 h-6 bg-copper rounded-full flex items-center justify-center z-20">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>

                    <div className="relative h-full w-full">
                      <img
                        src={currentProduct?.image || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"}
                        alt={currentProduct?.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-xl" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-xl font-bold text-white uppercase tracking-wide text-center leading-tight mb-2">
                        {currentProduct?.name}
                      </h4>
                      <div className="flex justify-center">
                        <div className="inline-flex items-center px-3 py-1 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full">
                          <CheckCircle className="w-3 h-3 text-copper mr-2" />
                          <span className="text-white text-xs font-medium uppercase tracking-wide">
                            Ready for Design
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                backContent={
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-concrete/5 to-copper/5 p-6 flex flex-col">
                    <div className="text-center mb-6">
                      <span className="inline-block px-4 py-2 bg-copper text-white text-sm font-bold rounded-full uppercase tracking-wide">
                        {currentProduct?.name}
                      </span>
                    </div>

                    <div className="flex-1 space-y-4 text-center">
                      <div>
                        <div className="text-concrete-muted text-xs font-medium uppercase tracking-wide mb-2">Design Process</div>
                        <div className="text-concrete text-sm">
                          • Color customization<br/>
                          • Logo integration<br/>
                          • Material selection<br/>
                          • Size optimization<br/>
                          • Branding elements
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-copper/10 border border-copper/30 rounded-full">
                        <Sparkles className="w-4 h-4 text-copper mr-2" />
                        <span className="text-copper text-sm font-medium">Interactive Design Studio</span>
                      </div>
                    </div>
                  </div>
                }
              />
            </motion.div>
          </div>

          {/* Product Navigation Dots */}
          {selectedProductDetails.length > 1 && (
            <div className="flex justify-center space-x-2 mb-8">
              {selectedProductDetails.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProductIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProductIndex
                      ? 'bg-copper scale-125'
                      : 'bg-concrete-muted/30 hover:bg-concrete-muted/50'
                  }`}
                />
              ))}
            </div>
          )}

        </motion.div>

      </div>
    </div>
  );
};
