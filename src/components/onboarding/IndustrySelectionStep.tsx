"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Utensils, ShoppingBag, Hotel, Sparkles, Pill, Crown, Truck, Store, Gift, Wheat, Heart, Cpu } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { IndustryCard } from "@/components/ui/grid-feature-cards";


interface IndustrySelectionStepProps {
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
  onContinue: () => void;
}

const fashionCategories = [
  {
    id: "saree-packaging",
    name: "Saree Packaging",
    icon: Crown,
    keywords: ["saree", "traditional", "indian", "ethnic", "silk", "cotton", "wedding"]
  },
  {
    id: "bridal-wear-packaging",
    name: "Bridal Wear Packaging",
    icon: Crown,
    keywords: ["bridal", "wedding", "lehenga", "gown", "ceremony", "marriage", "special occasion"]
  },
  {
    id: "luxury-apparel-packaging",
    name: "Luxury Apparel Packaging",
    icon: Crown,
    keywords: ["luxury", "high-end", "designer", "premium", "couture", "exclusive", "bespoke"]
  },
  {
    id: "ethnic-wear-packaging",
    name: "Ethnic Wear Packaging",
    icon: Crown,
    keywords: ["ethnic", "traditional", "cultural", "festive", "regional", "heritage", "authentic"]
  },
  {
    id: "formal-wear-packaging",
    name: "Formal Wear Packaging",
    icon: ShoppingBag,
    keywords: ["formal", "business", "corporate", "suit", "blazer", "office", "professional"]
  },
  {
    id: "outerwear-packaging",
    name: "Outerwear Packaging",
    icon: ShoppingBag,
    keywords: ["outerwear", "jacket", "coat", "winter", "seasonal", "protective", "layering"]
  }
];

export const IndustrySelectionStep: React.FC<IndustrySelectionStepProps> = ({
  selectedIndustry,
  onSelectIndustry,
  onContinue,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) {
      return fashionCategories;
    }

    const query = searchQuery.toLowerCase();
    return fashionCategories.filter(industry =>
      industry.name.toLowerCase().includes(query) ||
      industry.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Select your luxury apparel packaging category
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Choose the luxury apparel segment that best describes your brand. We'll create specialized packaging solutions tailored to your unique style and market.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16 max-w-lg mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-copper w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Search luxury apparel packaging categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // The search filtering happens automatically via the filteredIndustries useMemo
                  // No additional action needed as the UI updates reactively
                }
              }}
              className="w-full pl-12 pr-4 py-3 text-base bg-white border border-copper/30 rounded-lg focus:ring-2 focus:ring-copper/40 focus:border-copper transition-all duration-300 text-black placeholder:text-concrete-muted shadow-sm font-neue-haas"
            />
          </div>
        </motion.div>

        {/* Industry Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredIndustries.map((industry, index) => {
              const isSelected = selectedIndustry === industry.id;

              return (
                <motion.div
                  key={industry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative"
                >
                  <IndustryCard
                    industry={{
                      title: industry.name,
                      icon: industry.icon,
                    }}
                    isSelected={isSelected}
                    onClick={() => onSelectIndustry(industry.id)}
                    className="h-32"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state for no results */}
        {filteredIndustries.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-concrete-muted text-lg">
              We haven't partnered with that industry yet, but we'd love to explore possibilities together.
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mt-16"
          >
            <ShinyButton onClick={onContinue} className="px-10 py-4 text-lg font-semibold">
              Let's continue building together →
            </ShinyButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};
