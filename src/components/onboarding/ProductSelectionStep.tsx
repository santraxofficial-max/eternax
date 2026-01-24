"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import {
  luxuryCategories,
  luxuryProducts,
  type LuxuryProduct,
} from "@/components/onboarding/luxuryProducts";

const ALL_CATEGORIES = "All categories";

interface ProductSelectionStepProps {
  selectedProducts: string[];
  onSelectProducts: (products: string[]) => void;
  onContinue: () => void;
}

export const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({
  selectedProducts,
  onSelectProducts,
  onContinue,
}) => {
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const filteredCategories = useMemo(() => {
    const query = categoryQuery.trim().toLowerCase();
    const matches = query
      ? luxuryCategories.filter((category) =>
          category.toLowerCase().includes(query)
        )
      : luxuryCategories;
    return [ALL_CATEGORIES, ...matches];
  }, [categoryQuery]);

  const filteredProducts = useMemo(() => {
    return luxuryProducts.filter((product: LuxuryProduct) =>
      selectedCategory === ALL_CATEGORIES
        ? true
        : product.category === selectedCategory
    );
  }, [selectedCategory]);

  const handleProductToggle = (productId: string) => {
    const newSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    onSelectProducts(newSelectedProducts);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-copper text-xs font-semibold uppercase tracking-widest">
            Step 1
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mt-3 mb-4">
            Select the luxury apparel products you want packaging for
          </h2>
          <p className="text-concrete-muted max-w-3xl mx-auto text-lg">
            Start by filtering the category, then choose the products you want us
            to customize one by one in the design studio.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-concrete">
              Filter by apparel category
            </h3>
            <p className="text-concrete-muted text-sm">
              Search and select a category like shirts, dresses, suits, or
              outerwear.
            </p>
          </div>

          <div className="relative mb-6 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-copper w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search categories (shirts, dresses, suits...)"
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-base bg-white border border-copper/30 rounded-lg focus:ring-2 focus:ring-copper/40 focus:border-copper transition-all duration-300 text-black placeholder:text-concrete-muted shadow-sm font-neue-haas"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filteredCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-copper text-white border-copper shadow-copper/30"
                      : "bg-white text-concrete border-copper/20 hover:border-copper hover:text-copper"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {categoryQuery.trim() && filteredCategories.length === 1 && (
            <p className="text-center text-sm text-concrete-muted mt-4">
              No categories found. Try a different keyword.
            </p>
          )}

          <div className="text-center text-sm text-concrete-muted mt-4">
            Showing{" "}
            <span className="text-copper font-semibold">
              {filteredProducts.length}
            </span>{" "}
            product{filteredProducts.length !== 1 ? "s" : ""}{" "}
            {selectedCategory === ALL_CATEGORIES
              ? "across all categories"
              : `for ${selectedCategory}`}
            .
          </div>
        </motion.div>

        {/* Modern E-commerce Style Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mb-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const isSelected = selectedProducts.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden ${
                    isSelected ? "ring-2 ring-copper shadow-copper/20" : ""
                  }`}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-copper rounded-full flex items-center justify-center z-20 shadow-lg"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  )}

                  {/* Product Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-50">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Overlay with subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Floating price badge */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-concrete shadow-lg"
                    >
                      {product.pricing}
                    </motion.div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    {/* Product Name */}
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="text-lg font-bold text-concrete mb-2 uppercase tracking-wide leading-tight"
                    >
                      {product.name}
                    </motion.h3>

                    {/* Product Description */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="text-concrete-muted text-sm mb-4 leading-relaxed"
                    >
                      {product.description}
                    </motion.p>

                    {/* Product Details Grid */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      className="grid grid-cols-2 gap-3 mb-6"
                    >
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs font-medium text-concrete-muted uppercase tracking-wide mb-1">
                          Material
                        </div>
                        <div className="text-sm font-semibold text-concrete">
                          {product.material}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs font-medium text-concrete-muted uppercase tracking-wide mb-1">
                          Use Case
                        </div>
                        <div className="text-sm font-semibold text-concrete">
                          {product.useCase}
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <motion.button
                        onClick={() => handleProductToggle(product.id)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                          isSelected
                            ? "bg-copper text-white shadow-lg shadow-copper/30 hover:bg-copper/90"
                            : "bg-gray-100 text-concrete hover:bg-copper hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected ? "✓ Selected" : "Select Product"}
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Subtle hover effect border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-copper/20 via-transparent to-copper/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state for no results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-concrete-muted text-lg">
              No products match this category. Try another selection.
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        {selectedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center"
          >
            <ShinyButton onClick={onContinue} className="px-10 py-4 text-lg font-semibold">
              Confirm {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} →
            </ShinyButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};
