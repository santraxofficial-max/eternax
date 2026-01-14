import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin, Package, Sparkles, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyProducts, qualityTiers, basePrices, ProductConfig, AddressInfo } from "@/types/onboarding";

interface ConfigurationStepProps {
  productId: string;
  currentIndex: number;
  totalProducts: number;
  config: ProductConfig;
  address: AddressInfo;
  onUpdateConfig: (config: Partial<ProductConfig>) => void;
  onUpdateAddress: (address: Partial<AddressInfo>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ConfigurationStep = ({
  productId,
  currentIndex,
  totalProducts,
  config,
  address,
  onUpdateConfig,
  onUpdateAddress,
  onNext,
  onBack,
}: ConfigurationStepProps) => {
  const product = dummyProducts.find((p) => p.id === productId);
  const [moq, setMoq] = useState(config.moq || product?.minMOQ || 500);
  const [quality, setQuality] = useState<"standard" | "premium" | "luxury">(config.quality || "standard");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Calculate price whenever MOQ or quality changes
  useEffect(() => {
    const basePrice = basePrices[productId] || 5;
    const multiplier = qualityTiers[quality].multiplier;
    const deliveryEstimate = 500; // Flat delivery estimate
    const price = Math.round(basePrice * multiplier * moq + deliveryEstimate);
    setEstimatedPrice(price);
    onUpdateConfig({ moq, quality, estimatedPrice: price });
  }, [moq, quality, productId]);

  const moqOptions = [
    { value: product?.minMOQ || 500, label: `${product?.minMOQ || 500}` },
    { value: 1000, label: "1,000" },
    { value: 2500, label: "2,500" },
    { value: 5000, label: "5,000" },
    { value: 10000, label: "10,000+" },
  ];

  const isAddressValid = address.city && address.pincode;
  const isValid = moq >= (product?.minMOQ || 500) && isAddressValid;

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-copper text-sm font-medium uppercase tracking-wider">Step 4</span>
          <span className="text-ash text-sm">•</span>
          <span className="text-ash text-sm">Product {currentIndex + 1} of {totalProducts}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-concrete">
          Configure {product?.name}
        </h1>
        <p className="mt-4 text-concrete-muted">
          Select quantity, quality, and delivery location for accurate pricing.
        </p>
      </motion.div>

      <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">
        {/* MOQ Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-midnight-light border border-ash/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-copper/20 flex items-center justify-center">
              <Package size={20} className="text-copper" />
            </div>
            <div>
              <h3 className="font-semibold text-concrete">Order Quantity</h3>
              <p className="text-sm text-ash">Minimum order: {product?.minMOQ} units</p>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {moqOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMoq(option.value)}
                disabled={option.value < (product?.minMOQ || 500)}
                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                  moq === option.value
                    ? "bg-copper text-midnight"
                    : option.value < (product?.minMOQ || 500)
                    ? "bg-midnight/50 text-ash/50 cursor-not-allowed"
                    : "bg-midnight border border-ash/20 text-concrete hover:border-ash/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quality Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-midnight-light border border-ash/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-copper/20 flex items-center justify-center">
              <Sparkles size={20} className="text-copper" />
            </div>
            <div>
              <h3 className="font-semibold text-concrete">Quality Tier</h3>
              <p className="text-sm text-ash">Choose the material quality level</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.entries(qualityTiers) as [keyof typeof qualityTiers, typeof qualityTiers.standard][]).map(([key, tier]) => (
              <button
                key={key}
                onClick={() => setQuality(key as "standard" | "premium" | "luxury")}
                className={`p-4 rounded-xl text-left transition-all ${
                  quality === key
                    ? "bg-copper/10 border-2 border-copper"
                    : "bg-midnight border-2 border-ash/20 hover:border-ash/50"
                }`}
              >
                <h4 className="font-semibold text-concrete">{tier.name}</h4>
                <p className="text-sm text-ash mt-1">{tier.description}</p>
                {key !== "standard" && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-copper/20 text-copper text-xs">
                    +{Math.round((tier.multiplier - 1) * 100)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Address Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-midnight-light border border-ash/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-copper/20 flex items-center justify-center">
              <MapPin size={20} className="text-copper" />
            </div>
            <div>
              <h3 className="font-semibold text-concrete">Delivery Location</h3>
              <p className="text-sm text-ash">For accurate delivery cost estimation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={address.city}
              onChange={(e) => onUpdateAddress({ city: e.target.value })}
              className="h-12 bg-midnight border-ash/30 text-concrete placeholder:text-ash"
            />
            <Input
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => onUpdateAddress({ pincode: e.target.value })}
              className="h-12 bg-midnight border-ash/30 text-concrete placeholder:text-ash"
            />
          </div>
        </motion.div>

        {/* Price Estimation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-copper/20 to-copper/5 border border-copper/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-copper flex items-center justify-center">
              <Calculator size={20} className="text-midnight" />
            </div>
            <div>
              <h3 className="font-semibold text-concrete">Estimated Price</h3>
              <p className="text-sm text-ash">Including delivery estimate</p>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-copper">₹{estimatedPrice.toLocaleString()}</span>
            <span className="text-ash">for {moq.toLocaleString()} units</span>
          </div>
          <p className="mt-2 text-sm text-ash">
            ≈ ₹{(estimatedPrice / moq).toFixed(2)} per unit
          </p>
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
          disabled={!isValid}
        >
          {currentIndex < totalProducts - 1 ? "Next Product" : "Review Order"}
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
