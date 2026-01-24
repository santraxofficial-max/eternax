"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, CheckCircle } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { type LuxuryProduct } from "@/components/onboarding/luxuryProducts";

interface DesignStudioStepProps {
  selectedProduct: LuxuryProduct;
  currentProductIndex: number;
  totalProducts: number;
  onComplete: () => void;
}

export const DesignStudioStep: React.FC<DesignStudioStepProps> = ({
  selectedProduct,
  currentProductIndex,
  totalProducts,
  onComplete,
}) => {
  const isLastProduct = currentProductIndex + 1 === totalProducts;

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-copper/10 rounded-full mb-6">
            <Palette className="w-10 h-10 text-copper" />
          </div>
          <span className="text-copper text-xs font-semibold uppercase tracking-widest">
            Step 3
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Design Studio
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            This is the design studio placeholder. We're customizing{" "}
            <span className="text-copper font-semibold">
              {selectedProduct.name}
            </span>{" "}
            right now.
          </p>
        </motion.div>

        {/* Selected Products Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-5 py-2 bg-copper/10 border border-copper/30 rounded-full">
              <span className="text-copper font-medium text-sm uppercase tracking-wide">
                Product {currentProductIndex + 1} of {totalProducts}
              </span>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-sm border border-concrete/20 rounded-xl p-8 text-center">
            <div className="w-12 h-12 bg-copper/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-copper" />
            </div>
            <h3 className="text-2xl font-bold text-concrete mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-concrete-muted text-sm mb-6">
              {selectedProduct.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs uppercase tracking-wide text-concrete-muted mb-1">
                  Category
                </div>
                <div className="font-semibold text-concrete">
                  {selectedProduct.category}
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs uppercase tracking-wide text-concrete-muted mb-1">
                  Material
                </div>
                <div className="font-semibold text-concrete">
                  {selectedProduct.material}
                </div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs uppercase tracking-wide text-concrete-muted mb-1">
                  Use Case
                </div>
                <div className="font-semibold text-concrete">
                  {selectedProduct.useCase}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <ShinyButton
            onClick={onComplete}
            className="px-12 py-4 text-xl font-semibold"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {isLastProduct ? "Finish customization" : "Save & continue"}
          </ShinyButton>
          <p className="text-concrete-muted text-sm mt-4">
            {isLastProduct
              ? "You've customized all selected products."
              : "You'll move to the next product automatically."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};