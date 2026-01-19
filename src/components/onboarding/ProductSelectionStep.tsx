"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Box, Beaker, Cookie, Pill, Archive, ShoppingBag, Tag, Sticker } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { FlippingCard } from "@/components/ui/flipping-card";

// Product data structure mapping products to industries
const productsByIndustry = {
  "food-beverage": [
    {
      id: "food-packaging-boxes",
      name: "Food Packaging Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=300&fit=crop",
      description: "Custom boxes for ready meals, desserts, and food products",
      keywords: ["boxes", "food", "packaging", "meals", "desserts"],
      material: "Cardboard",
      pricing: "₹25-₹85/piece",
      useCase: "Ready meals & desserts"
    },
    {
      id: "beverage-bottles",
      name: "Beverage Bottles & Containers",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      description: "Specialized bottles for juices, sauces, and liquid products",
      keywords: ["bottles", "beverage", "juice", "sauce", "liquid"],
      material: "PET Plastic",
      pricing: "₹15-₹45/piece",
      useCase: "Juices & sauces"
    },
    {
      id: "food-jars-containers",
      name: "Jars & Food Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      description: "Glass and plastic jars for preserves, condiments, and dry goods",
      keywords: ["jars", "containers", "preserves", "condiments", "dry goods"],
      material: "Glass/Plastic",
      pricing: "₹35-₹95/piece",
      useCase: "Preserves & condiments"
    },
    {
      id: "food-pouches-bags",
      name: "Flexible Pouches & Bags",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
      description: "Stand-up pouches and bags for snacks, powders, and convenience foods",
      keywords: ["pouches", "bags", "snacks", "powders", "convenience"],
      material: "Laminated Film",
      pricing: "₹8-₹25/piece",
      useCase: "Snacks & powders"
    },
    {
      id: "food-cans-tins",
      name: "Cans & Metal Containers",
      icon: Archive,
      image: "https://images.unsplash.com/photo-1553787499-6f9133860278?w=400&h=300&fit=crop",
      description: "Metal cans for beverages, soups, and processed foods",
      keywords: ["cans", "tins", "metal", "beverages", "soups"],
      material: "Tin/Aluminum",
      pricing: "₹12-₹40/piece",
      useCase: "Beverages & soups"
    },
    {
      id: "food-labels-stickers",
      name: "Labels & Stickers",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      description: "Custom labels and stickers for branding and information",
      keywords: ["labels", "stickers", "branding", "information"],
      material: "Paper/Film",
      pricing: "₹2-₹8/piece",
      useCase: "Branding & info"
    }
  ],
  "fmcg-consumer": [
    {
      id: "consumer-packaging-boxes",
      name: "Retail Packaging Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
      description: "Eye-catching boxes for consumer goods and retail products",
      keywords: ["retail", "boxes", "consumer", "goods", "packaging"],
      material: "Cardboard/Paper",
      pricing: "₹20-₹75/piece",
      useCase: "Retail products"
    },
    {
      id: "consumer-bottles-jars",
      name: "Bottles & Jars",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      description: "Containers for lotions, shampoos, and personal care items",
      keywords: ["bottles", "jars", "lotions", "shampoos", "personal care"],
      material: "Plastic/Glass",
      pricing: "₹18-₹65/piece",
      useCase: "Personal care"
    },
    {
      id: "consumer-tubes",
      name: "Tubes & Dispensers",
      icon: Pill,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      description: "Squeeze tubes for creams, gels, and pastes",
      keywords: ["tubes", "dispensers", "creams", "gels", "pastes"],
      material: "Plastic Tube",
      pricing: "₹12-₹35/piece",
      useCase: "Creams & pastes"
    },
    {
      id: "consumer-pouches",
      name: "Stand-up Pouches",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
      description: "Convenient pouches for powders, samples, and travel sizes",
      keywords: ["pouches", "powders", "samples", "travel"],
      material: "Laminated Film",
      pricing: "₹10-₹30/piece",
      useCase: "Samples & travel"
    },
    {
      id: "consumer-labels",
      name: "Custom Labels",
      icon: Sticker,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      description: "Branded labels and decorative stickers for product identification",
      keywords: ["labels", "branded", "decorative", "stickers"],
      material: "Paper/Film",
      pricing: "₹3-₹12/piece",
      useCase: "Product branding"
    }
  ],
  "hospitality": [
    {
      id: "hospitality-takeout-containers",
      name: "Takeout & Delivery Containers",
      icon: Box,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Durable containers for restaurant takeout and delivery services",
      keywords: ["takeout", "delivery", "containers", "restaurant"]
    },
    {
      id: "hospitality-beverage-cups",
      name: "Beverage Cups & Lids",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop",
      description: "Custom cups and lids for coffee, tea, and specialty drinks",
      keywords: ["cups", "lids", "coffee", "tea", "beverages"]
    },
    {
      id: "hospitality-food-trays",
      name: "Food Service Trays",
      icon: Box,
      image: "https://images.unsplash.com/photo-1559329007-40df0ca76339?w=400&h=300&fit=crop",
      description: "Trays for buffet service, catering, and hotel dining",
      keywords: ["trays", "buffet", "catering", "hotel"]
    },
    {
      id: "hospitality-packaging-bags",
      name: "Packaging Bags",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      description: "Custom bags for room service and amenity packaging",
      keywords: ["bags", "room service", "amenity", "packaging"]
    }
  ],
  "cosmetics-personal-care": [
    {
      id: "cosmetics-jars-containers",
      name: "Cream Jars & Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      description: "Elegant jars for creams, lotions, and beauty products",
      keywords: ["jars", "creams", "lotions", "beauty", "containers"]
    },
    {
      id: "cosmetics-bottles",
      name: "Bottles & Sprays",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      description: "Glass and plastic bottles for serums, toners, and sprays",
      keywords: ["bottles", "sprays", "serums", "toners"]
    },
    {
      id: "cosmetics-tubes",
      name: "Tubes & Dispensers",
      icon: Pill,
      description: "Squeeze tubes for foundations, moisturizers, and treatments",
      keywords: ["tubes", "foundations", "moisturizers", "treatments"]
    },
    {
      id: "cosmetics-compacts",
      name: "Compacts & Cases",
      icon: Box,
      description: "Custom compacts and cases for makeup and accessories",
      keywords: ["compacts", "cases", "makeup", "accessories"]
    },
    {
      id: "cosmetics-labels",
      name: "Luxury Labels",
      icon: Tag,
      description: "Premium labels and packaging for high-end cosmetics",
      keywords: ["luxury", "labels", "premium", "cosmetics"]
    }
  ],
  "pharmaceutical-wellness": [
    {
      id: "pharma-bottles",
      name: "Medicine Bottles",
      icon: Beaker,
      description: "Child-safe bottles for tablets, capsules, and liquid medications",
      keywords: ["bottles", "medicine", "tablets", "capsules", "medications"]
    },
    {
      id: "pharma-jars",
      name: "Pill Jars & Containers",
      icon: Cookie,
      description: "Secure containers for pills, supplements, and healthcare products",
      keywords: ["jars", "pills", "supplements", "healthcare"]
    },
    {
      id: "pharma-blister-packs",
      name: "Blister Packs",
      icon: Package,
      description: "Unit-dose packaging for pharmaceuticals and vitamins",
      keywords: ["blister", "packs", "unit-dose", "pharmaceuticals"]
    },
    {
      id: "pharma-tubes",
      name: "Ointment Tubes",
      icon: Pill,
      description: "Sterile tubes for creams, ointments, and topical treatments",
      keywords: ["tubes", "ointments", "creams", "topical"]
    },
    {
      id: "pharma-labels",
      name: "Compliance Labels",
      icon: Tag,
      description: "Regulatory-compliant labels with dosage and safety information",
      keywords: ["compliance", "labels", "regulatory", "dosage"]
    }
  ],
  "luxury-lifestyle": [
    {
      id: "luxury-boxes",
      name: "Luxury Gift Boxes",
      icon: Box,
      description: "Premium boxes for luxury goods and high-end products",
      keywords: ["luxury", "gift boxes", "premium", "high-end"]
    },
    {
      id: "luxury-bottles",
      name: "Designer Bottles",
      icon: Beaker,
      description: "Elegant bottles for perfumes, colognes, and luxury liquids",
      keywords: ["designer", "bottles", "perfumes", "colognes"]
    },
    {
      id: "luxury-cases",
      name: "Luxury Cases",
      icon: Package,
      description: "Custom cases for jewelry, accessories, and collectibles",
      keywords: ["luxury", "cases", "jewelry", "accessories"]
    },
    {
      id: "luxury-wrapping",
      name: "Premium Wrapping",
      icon: Package,
      description: "Elegant wrapping papers and ribbons for luxury presentation",
      keywords: ["premium", "wrapping", "papers", "ribbons"]
    }
  ],
  "ecommerce-logistics": [
    {
      id: "ecommerce-shipping-boxes",
      name: "Shipping Boxes",
      icon: Box,
      description: "Durable boxes for e-commerce shipping and order fulfillment",
      keywords: ["shipping", "boxes", "ecommerce", "fulfillment"]
    },
    {
      id: "ecommerce-mailers",
      name: "Poly Mailers",
      icon: ShoppingBag,
      description: "Lightweight mailers for small items and accessories",
      keywords: ["mailers", "poly", "lightweight", "accessories"]
    },
    {
      id: "ecommerce-pouches",
      name: "Bubble Pouches",
      icon: Package,
      description: "Protective pouches for fragile and valuable items",
      keywords: ["bubble", "pouches", "protective", "fragile"]
    },
    {
      id: "ecommerce-labels",
      name: "Shipping Labels",
      icon: Tag,
      description: "Custom labels for branding and shipping information",
      keywords: ["shipping", "labels", "branding", "information"]
    }
  ],
  "retail-supermarkets": [
    {
      id: "retail-product-boxes",
      name: "Product Display Boxes",
      icon: Box,
      description: "Eye-catching boxes for retail shelves and product display",
      keywords: ["display", "boxes", "retail", "shelves"]
    },
    {
      id: "retail-bulk-packs",
      name: "Bulk Packaging",
      icon: Package,
      description: "Large containers for bulk goods and wholesale products",
      keywords: ["bulk", "packaging", "containers", "wholesale"]
    },
    {
      id: "retail-labels-tags",
      name: "Price Tags & Labels",
      icon: Tag,
      description: "Custom tags and labels for pricing and product information",
      keywords: ["price tags", "labels", "pricing", "information"]
    },
    {
      id: "retail-carry-bags",
      name: "Shopping Bags",
      icon: ShoppingBag,
      description: "Reusable and paper bags for customer shopping",
      keywords: ["shopping", "bags", "reusable", "paper"]
    }
  ],
  "corporate-gifting": [
    {
      id: "corporate-gift-boxes",
      name: "Corporate Gift Boxes",
      icon: Box,
      description: "Professional boxes for corporate gifts and business presents",
      keywords: ["corporate", "gift boxes", "professional", "business"]
    },
    {
      id: "corporate-custom-packages",
      name: "Custom Packaging Sets",
      icon: Package,
      description: "Complete packaging solutions for corporate branding",
      keywords: ["custom", "packaging", "sets", "branding"]
    },
    {
      id: "corporate-labels-stickers",
      name: "Branded Labels",
      icon: Sticker,
      description: "Custom labels and stickers for corporate identity",
      keywords: ["branded", "labels", "stickers", "corporate"]
    }
  ],
  "agriculture-agritech": [
    {
      id: "agri-seed-packs",
      name: "Seed Packaging",
      icon: ShoppingBag,
      description: "Protective packaging for seeds, fertilizers, and agricultural inputs",
      keywords: ["seed", "packaging", "fertilizers", "agricultural"]
    },
    {
      id: "agri-bulk-containers",
      name: "Bulk Storage Containers",
      icon: Package,
      description: "Large containers for grain, feed, and agricultural products",
      keywords: ["bulk", "storage", "containers", "grain"]
    },
    {
      id: "agri-labels-tags",
      name: "Product Labels",
      icon: Tag,
      description: "Informational labels for agricultural products and equipment",
      keywords: ["product", "labels", "agricultural", "equipment"]
    }
  ],
  "healthcare-medical": [
    {
      id: "medical-sterile-packs",
      name: "Sterile Packaging",
      icon: Package,
      description: "Medical-grade sterile packaging for healthcare products",
      keywords: ["sterile", "packaging", "medical-grade", "healthcare"]
    },
    {
      id: "medical-sample-containers",
      name: "Sample Containers",
      icon: Cookie,
      description: "Secure containers for medical samples and specimens",
      keywords: ["sample", "containers", "medical", "specimens"]
    },
    {
      id: "medical-device-packs",
      name: "Device Packaging",
      icon: Box,
      description: "Protective packaging for medical devices and equipment",
      keywords: ["device", "packaging", "medical", "equipment"]
    },
    {
      id: "medical-labels",
      name: "Medical Labels",
      icon: Tag,
      description: "Compliant labels with medical and safety information",
      keywords: ["medical", "labels", "compliant", "safety"]
    }
  ],
  "electronics-hardware": [
    {
      id: "electronics-product-boxes",
      name: "Product Boxes",
      icon: Box,
      description: "Custom boxes for electronics, gadgets, and hardware products",
      keywords: ["product", "boxes", "electronics", "gadgets"]
    },
    {
      id: "electronics-bubble-wrap",
      name: "Protective Packaging",
      icon: Package,
      description: "Bubble wrap and foam for fragile electronic components",
      keywords: ["protective", "packaging", "bubble wrap", "foam"]
    },
    {
      id: "electronics-blister-packs",
      name: "Display Packs",
      icon: Package,
      description: "Blister packs and clamshells for retail display",
      keywords: ["display", "packs", "blister", "clamshells"]
    },
    {
      id: "electronics-labels",
      name: "Product Labels",
      icon: Tag,
      description: "Technical labels with specifications and compliance information",
      keywords: ["product", "labels", "technical", "specifications"]
    }
  ]
};

// Helper function to get industry name from ID
const getIndustryName = (industryId: string): string => {
  const industryMap: Record<string, string> = {
    "food-beverage": "Food & Beverage",
    "fmcg-consumer": "FMCG / D2C Consumer Brands",
    "hospitality": "Hospitality",
    "cosmetics-personal-care": "Cosmetics & Personal Care",
    "pharmaceutical-wellness": "Pharmaceutical & Wellness",
    "luxury-lifestyle": "Luxury & Lifestyle Brands",
    "ecommerce-logistics": "E-commerce & Logistics",
    "retail-supermarkets": "Retail Chains & Supermarkets",
    "corporate-gifting": "Corporate & B2B Gifting",
    "agriculture-agritech": "Agriculture & Agri-tech",
    "healthcare-medical": "Healthcare & Medical (Non-invasive)",
    "electronics-hardware": "Electronics & Hardware"
  };
  return industryMap[industryId] || industryId;
};

interface ProductSelectionStepProps {
  selectedIndustry: string;
  selectedProducts: string[];
  onSelectProducts: (products: string[]) => void;
  onContinue: () => void;
}

export const ProductSelectionStep: React.FC<ProductSelectionStepProps> = ({
  selectedIndustry,
  selectedProducts,
  onSelectProducts,
  onContinue,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const industryProducts = productsByIndustry[selectedIndustry as keyof typeof productsByIndustry] || [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return industryProducts;
    }

    const query = searchQuery.toLowerCase();
    return industryProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [searchQuery, industryProducts]);

  const handleProductToggle = (productId: string) => {
    const newSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            What products do you need packaged?
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Select the packaging solutions that will showcase your products and delight your customers.
          </p>
        </motion.div>

        {/* Industry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-copper/10 border border-copper/30 rounded-full">
            <span className="text-copper font-medium text-sm uppercase tracking-wide">
              Into selecting products for {getIndustryName(selectedIndustry)}
            </span>
          </div>
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // The search filtering happens automatically via the filteredProducts useMemo
                }
              }}
              className="w-full pl-12 pr-4 py-3 text-base bg-white border border-copper/30 rounded-lg focus:ring-2 focus:ring-copper/40 focus:border-copper transition-all duration-300 text-black placeholder:text-concrete-muted shadow-sm font-neue-haas"
            />
          </div>
        </motion.div>


        {/* Product Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-8 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const isSelected = selectedProducts.includes(product.id);

              return (
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
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-copper/80 scale-105'
                        : 'hover:scale-105'
                    }`}
                    frontContent={
                      <div
                        className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl"
                        onClick={() => handleProductToggle(product.id)}
                      >
                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-copper rounded-full flex items-center justify-center z-20">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}

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

                        {/* Smaller Select button */}
                        <div className="mt-auto">
                          <ShinyButton
                            animated={false}
                            onClick={() => handleProductToggle(product.id)}
                            className={`w-full py-2 px-3 text-xs font-semibold uppercase tracking-wide ${
                              isSelected
                                ? 'bg-black text-white'
                                : 'bg-black/80 text-white hover:bg-black'
                            }`}
                          >
                            {isSelected ? 'Selected ✓' : 'Select Package'}
                          </ShinyButton>
                        </div>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state for no results */}
        {filteredProducts.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-concrete-muted text-lg">
              No products found matching your search. Try different keywords.
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
              Continue with {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} →
            </ShinyButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};
