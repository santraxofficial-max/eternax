"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

// Product data structure mapping products to industries
const productsByIndustry = {
  "food-beverage": [
    {
      id: "food-packaging-boxes",
      name: "Food Packaging Boxes",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=300&fit=crop",
    },
    {
      id: "beverage-bottles",
      name: "Beverage Bottles & Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
      id: "food-jars-containers",
      name: "Jars & Food Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    },
    {
      id: "food-pouches-bags",
      name: "Flexible Pouches & Bags",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    },
    {
      id: "food-cans-tins",
      name: "Cans & Metal Containers",
      icon: React.Fragment,
      image: "https://images.unsplash.com/photo-1553787499-6f9133860278?w=400&h=300&fit=crop",
    },
    {
      id: "food-labels-stickers",
      name: "Labels & Stickers",
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

interface ProductDesignBridgeStepProps {
  selectedIndustry: string;
  selectedProducts: string[];
  currentProductIndex: number;
  onAutoAdvance: () => void;
}

export const ProductDesignBridgeStep: React.FC<ProductDesignBridgeStepProps> = ({
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
            {currentProductIndex === 0 ? "Let's Start Designing" : "Next Product"}
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            We're preparing to design{" "}
            <span className="text-copper font-semibold">{currentProduct.name}</span>{" "}
            in our interactive design studio.
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
                  <span className="text-white text-sm font-medium">Ready for Design</span>
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
            Opening design studio in a few seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
