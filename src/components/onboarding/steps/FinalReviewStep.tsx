import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Package, Edit2, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyProducts, qualityTiers, ProductConfig, AddressInfo } from "@/types/onboarding";

interface FinalReviewStepProps {
  selectedProducts: string[];
  productConfigs: Record<string, ProductConfig>;
  address: AddressInfo;
  onNext: () => void;
  onBack: () => void;
}

export const FinalReviewStep = ({
  selectedProducts,
  productConfigs,
  address,
  onNext,
  onBack,
}: FinalReviewStepProps) => {
  const totalPrice = selectedProducts.reduce((sum, productId) => {
    return sum + (productConfigs[productId]?.estimatedPrice || 0);
  }, 0);

  const totalUnits = selectedProducts.reduce((sum, productId) => {
    return sum + (productConfigs[productId]?.moq || 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <span className="text-copper text-sm font-medium uppercase tracking-wider">Step 5</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-concrete">
          Review Your Order
        </h1>
        <p className="mt-4 text-concrete-muted">
          Review all products and configurations before proceeding to checkout.
        </p>
      </motion.div>

      <div className="flex-1 max-w-5xl mx-auto w-full">
        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {selectedProducts.map((productId, index) => {
            const product = dummyProducts.find((p) => p.id === productId);
            const config = productConfigs[productId];

            return (
              <motion.div
                key={productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-midnight-light border border-ash/20 flex flex-col md:flex-row gap-6"
              >
                {/* Product Image */}
                <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-concrete">{product?.name}</h3>
                      <p className="text-ash text-sm">{product?.category}</p>
                    </div>
                    <button className="p-2 rounded-lg bg-midnight border border-ash/20 hover:border-copper/50 transition-colors">
                      <Edit2 size={16} className="text-ash" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs text-ash">Quantity</span>
                      <p className="font-semibold text-concrete">{config?.moq?.toLocaleString()} units</p>
                    </div>
                    <div>
                      <span className="text-xs text-ash">Quality</span>
                      <p className="font-semibold text-concrete capitalize">
                        {config?.quality && qualityTiers[config.quality].name}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-ash">Design</span>
                      <p className="font-semibold text-concrete capitalize">
                        {config?.design?.type === "template" ? "Template" : "Custom Upload"}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-ash">Price</span>
                      <p className="font-bold text-copper">₹{config?.estimatedPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-midnight-light border border-ash/20 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-concrete">Delivery Address</h3>
            <button className="text-copper text-sm hover:underline">Edit</button>
          </div>
          <p className="text-concrete-muted">
            {address.street && `${address.street}, `}
            {address.city}, {address.state && `${address.state} - `}{address.pincode}
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 border border-copper/30"
        >
          <h3 className="font-semibold text-concrete mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-concrete-muted">
              <span>Total Products</span>
              <span>{selectedProducts.length} items</span>
            </div>
            <div className="flex justify-between text-concrete-muted">
              <span>Total Units</span>
              <span>{totalUnits.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between text-concrete-muted">
              <span>Estimated Delivery</span>
              <span>Included</span>
            </div>
            <div className="border-t border-copper/20 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-concrete">Total Estimated</span>
                <span className="text-3xl font-bold text-copper">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-midnight/50 flex items-start gap-3">
            <Star size={18} className="text-copper flex-shrink-0 mt-0.5" />
            <p className="text-sm text-concrete-muted">
              Final pricing will be confirmed after our team reviews your design files and specifications.
            </p>
          </div>
        </motion.div>
      </div>

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
        >
          Proceed to Checkout
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
