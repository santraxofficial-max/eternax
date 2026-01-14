import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyProducts, ProductItem } from "@/types/onboarding";

interface ProductBrowseStepProps {
  selectedProducts: string[];
  onToggleProduct: (productId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProductBrowseStep = ({ selectedProducts, onToggleProduct, onNext, onBack }: ProductBrowseStepProps) => {
  const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...new Set(dummyProducts.map(p => p.category))];
  const filteredProducts = activeCategory === "all" 
    ? dummyProducts 
    : dummyProducts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <span className="text-copper text-sm font-medium uppercase tracking-wider">Step 2</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-concrete">
          Browse & Select Products
        </h1>
        <p className="mt-4 text-concrete-muted">
          Explore our packaging solutions. Click to view details and add products you want to customize.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-copper text-midnight"
                : "bg-midnight-light text-concrete-muted hover:text-concrete border border-ash/20"
            }`}
          >
            {cat === "all" ? "All Products" : cat}
          </button>
        ))}
      </motion.div>

      {/* Selected Count */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/30">
            <Check size={16} className="text-copper" />
            <span className="text-copper font-medium">{selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected</span>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isSelected = selectedProducts.includes(product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                  isSelected ? "border-copper bg-copper/5" : "border-ash/20 bg-midnight-light hover:border-ash/40"
                }`}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60" />
                  
                  {/* Quick View Button */}
                  <button
                    onClick={() => setViewingProduct(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-midnight/80 text-concrete opacity-0 group-hover:opacity-100 transition-opacity hover:bg-copper hover:text-midnight"
                  >
                    <Eye size={16} />
                  </button>

                  {/* Category Badge */}
                  <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-midnight/80 text-xs text-concrete-muted">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-concrete">{product.name}</h3>
                  <p className="mt-1 text-sm text-ash line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-xs text-copper">Min MOQ: {product.minMOQ} units</p>

                  {/* Add/Remove Button */}
                  <button
                    onClick={() => onToggleProduct(product.id)}
                    className={`mt-4 w-full py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-copper text-midnight hover:bg-copper-light"
                        : "bg-midnight border border-ash/30 text-concrete hover:border-copper/50"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={16} />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add to Project
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-12 max-w-md mx-auto w-full">
        <Button variant="outline" size="xl" onClick={onBack} className="flex-1">
          <ArrowLeft size={20} />
          Back
        </Button>
        <Button
          variant="copper"
          size="xl"
          className="flex-1 group"
          onClick={onNext}
          disabled={selectedProducts.length === 0}
        >
          Continue
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {viewingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-midnight/80 backdrop-blur-sm"
            onClick={() => setViewingProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-midnight-light border border-ash/30 rounded-3xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={viewingProduct.image}
                  alt={viewingProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setViewingProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-midnight/80 text-concrete hover:bg-copper hover:text-midnight transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <span className="text-copper text-sm font-medium">{viewingProduct.category}</span>
                <h2 className="mt-2 text-2xl font-bold text-concrete">{viewingProduct.name}</h2>
                <p className="mt-3 text-concrete-muted">{viewingProduct.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-midnight border border-ash/20">
                    <span className="text-ash text-sm">Available Materials</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {viewingProduct.materials.map((mat) => (
                        <span key={mat} className="px-2 py-1 rounded-full bg-ash/10 text-xs text-concrete">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight border border-ash/20">
                    <span className="text-ash text-sm">Minimum Order</span>
                    <p className="mt-2 text-xl font-bold text-copper">{viewingProduct.minMOQ} units</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onToggleProduct(viewingProduct.id);
                    setViewingProduct(null);
                  }}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    selectedProducts.includes(viewingProduct.id)
                      ? "bg-copper text-midnight hover:bg-copper-light"
                      : "bg-copper text-midnight hover:bg-copper-light"
                  }`}
                >
                  {selectedProducts.includes(viewingProduct.id) ? (
                    <>
                      <Check size={18} />
                      Already Selected
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Add to Project
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
