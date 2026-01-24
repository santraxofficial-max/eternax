"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  getLuxuryProductById,
  type LuxuryProduct,
} from "@/components/onboarding/luxuryProducts";

interface ProductDesignBridgeStepProps {
  selectedProducts: string[];
  currentProductIndex: number;
  onAutoAdvance: () => void;
}

export const ProductDesignBridgeStep: React.FC<ProductDesignBridgeStepProps> = ({
  selectedProducts,
  currentProductIndex,
  onAutoAdvance,
}) => {
  const selectedProductDetails = selectedProducts
    .map((productId) => getLuxuryProductById(productId))
    .filter((product): product is LuxuryProduct => Boolean(product));

  const currentProduct = selectedProductDetails[currentProductIndex];
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentProductIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onAutoAdvance();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onAutoAdvance, currentProductIndex]);

  if (!currentProduct) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-copper text-xs font-semibold uppercase tracking-widest">
            Step 2.{currentProductIndex + 1}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mt-3 mb-4">
            Preparing {currentProduct.name}
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            We customize every selected product one by one. You're about to enter
            the design studio for{" "}
            <span className="text-copper font-semibold">
              {currentProduct.name}
            </span>
            .
          </p>
        </motion.div>

        {/* Product Preview Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/30 rounded-full">
            <Sparkles className="w-5 h-5 text-copper mr-3" />
            <span className="text-copper font-medium text-sm uppercase tracking-wide">
              Product #{currentProductIndex + 1} of {selectedProducts.length}
            </span>
          </div>
        </motion.div>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-80 object-cover rounded-xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-2xl uppercase tracking-wide text-center mb-2">
                {currentProduct.name}
              </h3>
              <div className="flex justify-center">
                <div className="inline-flex items-center px-3 py-1 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full">
                  <span className="text-white text-sm font-medium">
                    Ready for Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Auto-advance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center space-x-4 px-8 py-6 bg-white/50 backdrop-blur-sm border border-concrete/10 rounded-2xl">
            <div className="flex space-x-2">
              {[0, 1, 2].map((dot, index) => (
                <motion.div
                  key={dot}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="w-3 h-3 bg-copper rounded-full"
                />
              ))}
            </div>
            <ArrowRight className="w-6 h-6 text-copper" />
          </div>

          <p className="text-concrete-muted text-sm mt-6">
            Auto-opening design studio in {countdown} seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
