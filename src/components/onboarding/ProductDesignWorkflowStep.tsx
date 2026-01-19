"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles, Palette } from "lucide-react";

// Product data structure mapping products to industries
const productsByIndustry = {
  "ready-to-wear": [
    {
      id: "garment-bags",
      name: "Garment Bags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    },
    {
      id: "t-shirts-packaging",
      name: "T-Shirts & Tops Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    },
    {
      id: "jeans-pants-cases",
      name: "Jeans & Pants Cases",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
    },
    {
      id: "dresses-gowns-bags",
      name: "Dresses & Gowns Bags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=300&fit=crop",
    },
    {
      id: "jackets-coats-covers",
      name: "Jackets & Coats Covers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    },
    {
      id: "ready-to-wear-labels",
      name: "Brand Labels & Tags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "fmcg-consumer": [
    {
      id: "consumer-packaging-boxes",
      name: "Retail Packaging Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-bottles-jars",
      name: "Bottles & Jars",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-tubes",
      name: "Tubes & Dispensers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-pouches",
      name: "Stand-up Pouches",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "consumer-labels",
      name: "Custom Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "hospitality": [
    {
      id: "hospitality-takeout-containers",
      name: "Takeout & Delivery Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-beverage-cups",
      name: "Beverage Cups & Lids",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-food-trays",
      name: "Food Service Trays",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1559329007-40df0ca76339?w=400&h=300&fit=crop",
    },
    {
      id: "hospitality-packaging-bags",
      name: "Packaging Bags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "cosmetics-personal-care": [
    {
      id: "cosmetics-jars-containers",
      name: "Cream Jars & Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-bottles",
      name: "Bottles & Sprays",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-tubes",
      name: "Tubes & Dispensers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-compacts",
      name: "Compacts & Cases",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    },
    {
      id: "cosmetics-labels",
      name: "Luxury Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "pharmaceutical-wellness": [
    {
      id: "pharma-bottles",
      name: "Medicine Bottles",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-jars",
      name: "Pill Jars & Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-blister-packs",
      name: "Blister Packs",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-tubes",
      name: "Ointment Tubes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    },
    {
      id: "pharma-labels",
      name: "Compliance Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "luxury-lifestyle": [
    {
      id: "luxury-boxes",
      name: "Luxury Gift Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-bottles",
      name: "Designer Bottles",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-cases",
      name: "Luxury Cases",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "luxury-wrapping",
      name: "Premium Wrapping",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "ecommerce-logistics": [
    {
      id: "ecommerce-shipping-boxes",
      name: "Shipping Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-mailers",
      name: "Poly Mailers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-pouches",
      name: "Bubble Pouches",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "ecommerce-labels",
      name: "Shipping Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "retail-supermarkets": [
    {
      id: "retail-product-boxes",
      name: "Product Display Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "retail-bulk-packs",
      name: "Bulk Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "retail-labels-tags",
      name: "Price Tags & Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    },
    {
      id: "retail-carry-bags",
      name: "Shopping Bags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    }
  ],
  "corporate-gifting": [
    {
      id: "corporate-gift-boxes",
      name: "Corporate Gift Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "corporate-custom-packages",
      name: "Custom Packaging Sets",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "corporate-labels-stickers",
      name: "Branded Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "agriculture-agritech": [
    {
      id: "agri-seed-packs",
      name: "Seed Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    },
    {
      id: "agri-bulk-containers",
      name: "Bulk Storage Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "agri-labels-tags",
      name: "Product Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "healthcare-medical": [
    {
      id: "medical-sterile-packs",
      name: "Sterile Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "medical-sample-containers",
      name: "Sample Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "medical-device-packs",
      name: "Device Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "medical-labels",
      name: "Medical Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ],
  "electronics-hardware": [
    {
      id: "electronics-product-boxes",
      name: "Product Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-bubble-wrap",
      name: "Protective Packaging",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-blister-packs",
      name: "Display Packs",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "electronics-labels",
      name: "Product Labels",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    }
  ]
};

interface ProductDesignWorkflowStepProps {
  selectedIndustry: string;
  selectedProducts: string[];
  currentProductIndex: number;
  onAutoAdvance: () => void;
}

export const ProductDesignWorkflowStep: React.FC<ProductDesignWorkflowStepProps> = ({
  selectedIndustry,
  selectedProducts,
  currentProductIndex,
  onAutoAdvance,
}) => {
  const industryProducts = productsByIndustry[selectedIndustry as keyof typeof productsByIndustry] || [];
  const selectedProductDetails = industryProducts.filter(product =>
    selectedProducts.includes(product.id)
  );

  const currentProduct = selectedProductDetails[currentProductIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      onAutoAdvance();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onAutoAdvance]);

  if (!currentProduct) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20 bg-gradient-to-br from-midnight/95 to-midnight">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-copper/10 rounded-full mb-6">
            <Palette className="w-8 h-8 text-copper" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-4">
            Design Workflow
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Each product gets its own personalized design session
          </p>
        </motion.div>

        {/* Linear Progress Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          {/* Progress Bar Background */}
          <div className="relative mb-12">
            <div className="w-full h-1 bg-midnight-lighter rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentProductIndex + 1) / selectedProductDetails.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full relative"
              >
                <motion.div
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>

            {/* Progress Nodes */}
            <div className="absolute top-0 left-0 right-0 flex justify-between -mt-3">
              {selectedProductDetails.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    animate={index <= currentProductIndex ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      index < currentProductIndex
                        ? 'bg-green-500 border-green-500 text-white'
                        : index === currentProductIndex
                        ? 'bg-copper border-copper text-white ring-4 ring-copper/30'
                        : 'bg-midnight-lighter border-midnight-light text-concrete-muted'
                    }`}
                  >
                    {index < currentProductIndex ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-concrete-muted">
              {currentProductIndex + 1} of {selectedProductDetails.length} products
            </span>
            <span className="text-copper font-medium">
              {Math.round(((currentProductIndex + 1) / selectedProductDetails.length) * 100)}% Complete
            </span>
          </div>
        </motion.div>

        {/* Current Product Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative max-w-sm mx-auto mb-8"
            >
              <div className="relative">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center px-3 py-1 bg-copper/90 backdrop-blur-sm border border-copper/50 rounded-full text-white text-xs font-medium"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Currently Designing
                  </motion.div>
                </div>

                {/* Product Name */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl uppercase tracking-wide text-center">
                    {currentProduct.name}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Auto-advance Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="flex justify-center items-center space-x-6"
            >
              <div className="flex space-x-2">
                {[0, 1, 2].map((dot, index) => (
                  <motion.div
                    key={dot}
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                    className="w-2 h-2 bg-copper rounded-full"
                  />
                ))}
              </div>
              <ArrowRight className="w-5 h-5 text-copper" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
