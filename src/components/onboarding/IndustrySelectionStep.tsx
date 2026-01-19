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

const industries = [
  {
    id: "ready-to-wear",
    name: "Ready-to-Wear",
    icon: Crown,
    keywords: ["ready to wear", "rtw", "casual", "everyday", "contemporary", "modern", "apparel"]
  },
  {
    id: "luxury-fashion",
    name: "Luxury Fashion",
    icon: Crown,
    keywords: ["luxury", "high fashion", "couture", "designer", "premium", "high-end", "exclusive"]
  },
  {
    id: "streetwear",
    name: "Streetwear",
    icon: ShoppingBag,
    keywords: ["streetwear", "urban", "hip hop", "sneaker", "athletic", "casual", "youth"]
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Crown,
    keywords: ["accessories", "bags", "jewelry", "scarves", "belts", "hats", "watches"]
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: Crown,
    keywords: ["shoes", "sneakers", "boots", "sandals", "heels", "footwear", "shoes"]
  },
  {
    id: "denim-casual",
    name: "Denim & Casual",
    icon: ShoppingBag,
    keywords: ["denim", "jeans", "casual", "comfort", "everyday wear", "basics", "essentials"]
  },
  {
    id: "athleisure",
    name: "Athleisure",
    icon: ShoppingBag,
    keywords: ["athleisure", "activewear", "sportswear", "gym", "fitness", "performance", "lifestyle"]
  },
  {
    id: "sustainable-fashion",
    name: "Sustainable Fashion",
    icon: Crown,
    keywords: ["sustainable", "eco", "organic", "ethical", "green", "conscious", "responsible"]
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
      return industries;
    }

    const query = searchQuery.toLowerCase();
    return industries.filter(industry =>
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
            Let's create sustainable fashion packaging together
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Tell us about your fashion brand. We'll craft packaging that enhances your style and supports your sustainability goals.
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
              placeholder="Search your fashion category..."
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
