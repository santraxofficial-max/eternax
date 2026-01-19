"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, ArrowRight, CheckCircle, Box, Package, Tag, Beaker, Cookie, Pill, ShoppingBag, Archive, Sticker } from "lucide-react";
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
    },
    {
      id: "beverage-bottles",
      name: "Beverage Bottles & Containers",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
      id: "food-jars-containers",
      name: "Jars & Food Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "food-pouches-bags",
      name: "Flexible Pouches & Bags",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "food-cans-tins",
      name: "Cans & Metal Containers",
      icon: Archive,
      image: "https://images.unsplash.com/photo-1553787499-6f9133860278?w=400&h=300&fit=crop",
    },
    {
      id: "food-labels-stickers",
      name: "Labels & Stickers",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "fmcg-consumer": [
    {
      id: "consumer-packaging-boxes",
      name: "Retail Packaging Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-bottles-jars",
      name: "Bottles & Jars",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-tubes",
      name: "Tubes & Dispensers",
      icon: Pill,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-pouches",
      name: "Stand-up Pouches",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-labels",
      name: "Custom Labels",
      icon: Sticker,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "hospitality": [
    {
      id: "hospitality-takeout-containers",
      name: "Takeout & Delivery Containers",
      icon: Box,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-beverage-cups",
      name: "Beverage Cups & Lids",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-food-trays",
      name: "Food Service Trays",
      icon: Box,
      image: "https://images.unsplash.com/photo-1559329007-40df0ca76339?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-packaging-bags",
      name: "Packaging Bags",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "cosmetics-personal-care": [
    {
      id: "cosmetics-jars-containers",
      name: "Cream Jars & Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-bottles",
      name: "Bottles & Sprays",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-tubes",
      name: "Tubes & Dispensers",
      icon: Pill,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-compacts",
      name: "Compacts & Cases",
      icon: Box,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-labels",
      name: "Luxury Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "pharmaceutical-wellness": [
    {
      id: "pharma-bottles",
      name: "Medicine Bottles",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-jars",
      name: "Pill Jars & Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-blister-packs",
      name: "Blister Packs",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-tubes",
      name: "Ointment Tubes",
      icon: Pill,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-labels",
      name: "Compliance Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "luxury-lifestyle": [
    {
      id: "luxury-boxes",
      name: "Luxury Gift Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-bottles",
      name: "Designer Bottles",
      icon: Beaker,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-cases",
      name: "Luxury Cases",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-wrapping",
      name: "Premium Wrapping",
      icon: Package,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "ecommerce-logistics": [
    {
      id: "ecommerce-shipping-boxes",
      name: "Shipping Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-mailers",
      name: "Poly Mailers",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-pouches",
      name: "Bubble Pouches",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-labels",
      name: "Shipping Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "retail-supermarkets": [
    {
      id: "retail-product-boxes",
      name: "Product Display Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "retail-bulk-packs",
      name: "Bulk Packaging",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "retail-labels-tags",
      name: "Price Tags & Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    },
    {
      id: "retail-carry-bags",
      name: "Shopping Bags",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "corporate-gifting": [
    {
      id: "corporate-gift-boxes",
      name: "Corporate Gift Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "corporate-custom-packages",
      name: "Custom Packaging Sets",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "corporate-labels-stickers",
      name: "Branded Labels",
      icon: Sticker,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "agriculture-agritech": [
    {
      id: "agri-seed-packs",
      name: "Seed Packaging",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    },
    {
      id: "agri-bulk-containers",
      name: "Bulk Storage Containers",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "agri-labels-tags",
      name: "Product Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "healthcare-medical": [
    {
      id: "medical-sterile-packs",
      name: "Sterile Packaging",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "medical-sample-containers",
      name: "Sample Containers",
      icon: Cookie,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "medical-device-packs",
      name: "Device Packaging",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "medical-labels",
      name: "Medical Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "electronics-hardware": [
    {
      id: "electronics-product-boxes",
      name: "Product Boxes",
      icon: Box,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-bubble-wrap",
      name: "Protective Packaging",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-blister-packs",
      name: "Display Packs",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-labels",
      name: "Product Labels",
      icon: Tag,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ]
};

interface DesignStudioIntroStepProps {
  selectedIndustry: string;
  selectedProducts: string[];
  onStartDesigning: () => void;
}

export const DesignStudioIntroStep: React.FC<DesignStudioIntroStepProps> = ({
  selectedIndustry,
  selectedProducts,
  onStartDesigning,
}) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const industryProducts = productsByIndustry[selectedIndustry as keyof typeof productsByIndustry] || [];
  const selectedProductDetails = industryProducts.filter(product =>
    selectedProducts.includes(product.id)
  );

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

  const handleStartDesigning = () => {
    setShowAnimation(true);
    setTimeout(() => {
      onStartDesigning();
    }, 2000);
  };

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
            Let's Design Your Products Together
          </h2>
          <p className="text-concrete-muted max-w-3xl mx-auto text-lg leading-relaxed">
            Now that we've confirmed your packaging selection, it's time to bring your vision to life.
            We'll design each product one by one in our interactive design studio, where you can
            customize every detail to match your brand perfectly.
          </p>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <ShinyButton
            onClick={handleStartDesigning}
            className="px-12 py-4 text-xl font-semibold"
          >
            Start Designing Together
            <ArrowRight className="w-5 h-5 ml-2" />
          </ShinyButton>
        </motion.div>
      </div>
    </div>
  );
};
