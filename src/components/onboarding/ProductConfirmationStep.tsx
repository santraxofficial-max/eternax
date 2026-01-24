"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { FlippingCard } from "@/components/ui/flipping-card";
import {
  getLuxuryProductById,
  type LuxuryProduct,
} from "@/components/onboarding/luxuryProducts";

interface ProductConfirmationStepProps {
  selectedProducts: string[];
  onBackToSelection: () => void;
  onConfirm: () => void;
}

export const ProductConfirmationStep: React.FC<ProductConfirmationStepProps> = ({
  selectedProducts,
  onBackToSelection,
  onConfirm,
}) => {
  const selectedProductDetails = selectedProducts
    .map((productId) => getLuxuryProductById(productId))
    .filter((product): product is LuxuryProduct => Boolean(product));

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
            Step 2
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mt-3 mb-4">
            Confirm your selected products
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Review the luxury apparel products you chose. We'll customize each one
            in the design studio, one by one.
          </p>
        </motion.div>

        {/* Selected Products Count Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/30 rounded-full">
            <CheckCircle className="w-5 h-5 text-copper mr-3" />
            <span className="text-copper font-medium text-sm uppercase tracking-wide">
              {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
            </span>
          </div>
        </motion.div>

        {/* Selected Products Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-8 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {selectedProductDetails.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative"
              >
                <FlippingCard
                  width={300}
                  height={340}
                  className="ring-2 ring-copper/80 scale-105"
                  frontContent={
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                      {/* Confirmation indicator */}
                      <div className="absolute top-3 right-3 w-5 h-5 bg-copper rounded-full flex items-center justify-center z-20">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>

                      {/* Product Image */}
                      <div className="relative h-full w-full">
                        <img
                          src={product.image || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
                      </div>

                      {/* Product Name - Always at bottom center */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wide text-center leading-tight">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: '0.75rem' }}>
                      {/* Background Layer - Isolated Grid */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          background: '#000000',
                          backgroundImage: `
                            repeating-linear-gradient(
                              0deg,
                              rgba(210, 105, 30, 0.08),
                              rgba(210, 105, 30, 0.08) 1px,
                              transparent 1px,
                              transparent 20px
                            ),
                            repeating-linear-gradient(
                              90deg,
                              rgba(210, 105, 30, 0.08),
                              rgba(210, 105, 30, 0.08) 1px,
                              transparent 1px,
                              transparent 20px
                            )
                          `,
                          borderRadius: '0.75rem',
                          zIndex: 0
                        }}
                      />
                      {/* Content Layer */}
                      <div className="relative z-10 flex flex-col h-full w-full p-6">
                      {/* Product Name Badge - Black background */}
                      <div className="mb-6 text-center">
                        <span className="inline-block px-4 py-2 bg-black text-white text-sm font-bold rounded-full border border-gray-700 uppercase tracking-wide">
                          {product.name}
                        </span>
                      </div>

                      {/* Professional Information Display */}
                      <div className="flex-1 space-y-4">
                        {/* Material */}
                        <div className="text-center">
                          <div className="text-concrete-muted text-xs font-medium uppercase tracking-wide mb-1">Material</div>
                          <div className="text-concrete text-sm font-semibold">{product.material || "Various"}</div>
                        </div>

                        {/* Pricing */}
                        <div className="text-center">
                          <div className="text-concrete-muted text-xs font-medium uppercase tracking-wide mb-1">Pricing</div>
                          <div className="text-concrete text-sm font-semibold">{product.pricing || "Contact for quote"}</div>
                        </div>

                        {/* Use Case */}
                        <div className="text-center">
                          <div className="text-concrete-muted text-xs font-medium uppercase tracking-wide mb-1">Use Case</div>
                          <div className="text-concrete text-sm font-semibold">{product.useCase || "Multiple applications"}</div>
                        </div>
                      </div>

                      {/* Confirmed Status */}
                      <div className="mt-auto text-center">
                        <div className="inline-flex items-center px-3 py-2 bg-copper text-black text-xs font-bold rounded-full uppercase tracking-wide">
                          ✓ Confirmed
                        </div>
                      </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto"
        >
          {/* Back to Selection Button */}
          <button
            onClick={onBackToSelection}
            className="flex items-center justify-center px-6 py-3 text-copper border-2 border-copper/30 rounded-lg hover:bg-copper/10 transition-all duration-300 font-semibold uppercase tracking-wide text-sm group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Reselect Products
          </button>

          {/* Confirm Selection Button */}
          <ShinyButton
            onClick={onConfirm}
            className="px-8 py-4 text-lg font-semibold"
          >
            Confirm Selection & Continue →
          </ShinyButton>
        </motion.div>
      </div>
    </div>
  );
};
