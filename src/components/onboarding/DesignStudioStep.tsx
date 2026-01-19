"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, CheckCircle } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

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

interface DesignStudioStepProps {
  selectedIndustry: string;
  selectedProducts: string[];
  currentProductIndex: number;
  onConfirmDesign: () => void;
}

export const DesignStudioStep: React.FC<DesignStudioStepProps> = ({
  selectedIndustry,
  selectedProducts,
  currentProductIndex,
  onConfirmDesign,
}) => {
  const industryProducts = productsByIndustry[selectedIndustry as keyof typeof productsByIndustry] || [];
  const selectedProductDetails = industryProducts.filter(product =>
    selectedProducts.includes(product.id)
  );
  const currentProduct = selectedProductDetails[currentProductIndex];

  if (!currentProduct) {
    return null;
  }

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
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Design Studio
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Customize your <span className="text-copper font-semibold">{currentProduct.name}</span>
          </p>
        </motion.div>

        {/* Product Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-80 object-cover rounded-xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-2xl uppercase tracking-wide text-center">
                {currentProduct.name}
              </h3>
              <div className="flex justify-center mt-2">
                <div className="inline-flex items-center px-3 py-1 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full">
                  <span className="text-white text-sm font-medium">Product #{currentProductIndex + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Design Tools Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/50 backdrop-blur-sm border border-concrete/10 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-xl font-bold text-concrete mb-6 text-center">Design Tools</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Color Palette", description: "Choose brand colors" },
              { name: "Logo Integration", description: "Add your branding" },
              { name: "Material Selection", description: "Pick packaging materials" },
              { name: "Size Customization", description: "Adjust dimensions" },
              { name: "Text & Graphics", description: "Add labels and artwork" },
              { name: "Preview Mode", description: "See your design in 3D" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white/30 backdrop-blur-sm border border-concrete/20 rounded-xl p-4 text-center hover:bg-white/40 transition-colors"
              >
                <div className="w-12 h-12 bg-copper/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Palette className="w-6 h-6 text-copper" />
                </div>
                <h4 className="font-semibold text-concrete mb-2">{tool.name}</h4>
                <p className="text-concrete-muted text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-4">
            <span className="text-concrete-muted text-sm">
              Progress: {currentProductIndex + 1} of {selectedProducts.length} products
            </span>
          </div>
          <div className="w-full bg-concrete/20 rounded-full h-2 max-w-md mx-auto">
            <div
              className="bg-copper h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentProductIndex + 1) / selectedProducts.length) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <ShinyButton
            onClick={onConfirmDesign}
            className="px-12 py-4 text-xl font-semibold"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Design & Continue
          </ShinyButton>
          <p className="text-concrete-muted text-sm mt-4">
            {currentProductIndex + 1 < selectedProducts.length
              ? `Next: ${selectedProductDetails[currentProductIndex + 1]?.name || 'Next Product'}`
              : 'All products designed!'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

