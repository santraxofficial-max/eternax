import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SKUConfig } from "@/types/onboarding";

interface SKUConfigStepProps {
  sku: string;
  config: SKUConfig;
  updateConfig: (config: Partial<SKUConfig>) => void;
  businessName: string;
  currentIndex: number;
  totalSKUs: number;
  onNext: () => void;
  onBack: () => void;
}

const skuNames: Record<string, string> = {
  "meal-boxes": "Meal Boxes",
  plates: "Plates",
  bowls: "Bowls",
  cups: "Cups",
  cutlery: "Cutlery",
  "carry-bags": "Carry Bags",
  "special-containers": "Special Containers",
};

const usageTypes = ["Dry food", "Semi-oily", "Oily", "Hot meals", "Frozen"];
const sizes = ["Small", "Medium", "Large", "Custom"];
const lidTypes = ["Attached flip lid", "Separate lid", "Window lid", "No lid"];
const materials = [
  { id: "sugarcane", name: "Sugarcane Bagasse", recommended: true },
  { id: "kraft", name: "Kraft Paper", recommended: false },
  { id: "bamboo", name: "Bamboo Fiber", recommended: false },
  { id: "cornstarch", name: "Cornstarch Blend", recommended: false },
  { id: "molded-pulp", name: "Molded Pulp", recommended: false },
];
const quantities = ["500–1,000", "1,000–5,000", "5,000–10,000", "10,000+", "Custom MOQ"];
const designOptions = ["Plain (no branding)", "Logo only", "Pattern + logo", "Full custom artwork"];
const logoPositions = ["Center", "Top-left", "Top-right", "Bottom"];

export const SKUConfigStep = ({
  sku,
  config,
  updateConfig,
  businessName,
  currentIndex,
  totalSKUs,
  onNext,
  onBack,
}: SKUConfigStepProps) => {
  const [step, setStep] = useState(1);
  const totalSubSteps = 6;

  const handleNext = () => {
    if (step < totalSubSteps) {
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const renderSubStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              What type of food will this contain?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {usageTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => updateConfig({ usageType: type })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    config.usageType === type
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              What size do you need?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => updateConfig({ size })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    config.size === size
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground font-medium">{size}</span>
                </button>
              ))}
            </div>
            {config.size === "Custom" && (
              <Input
                placeholder="Enter custom dimensions..."
                className="mt-4 bg-midnight border-ash/30"
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              What type of lid?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {lidTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => updateConfig({ lidType: type })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    config.lidType === type
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              Choose your material
            </h3>
            <div className="space-y-3">
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => updateConfig({ material: mat.id })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    config.material === mat.id
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground font-medium">{mat.name}</span>
                  {mat.recommended && (
                    <span className="flex items-center gap-1 text-xs text-copper bg-copper/20 px-2 py-1 rounded-full">
                      <Sparkles size={12} />
                      AI Recommended
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">
              How many do you need?
            </h3>
            <div className="space-y-3">
              {quantities.map((qty) => (
                <button
                  key={qty}
                  onClick={() => updateConfig({ quantity: qty })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    config.quantity === qty
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground font-medium">{qty}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground mb-4">
              Design & branding
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {designOptions.map((design) => (
                <button
                  key={design}
                  onClick={() => updateConfig({ design })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    config.design === design
                      ? "border-copper bg-copper/10"
                      : "border-ash/30 hover:border-ash"
                  }`}
                >
                  <span className="text-foreground text-sm font-medium">{design}</span>
                </button>
              ))}
            </div>

            {config.design && config.design !== "Plain (no branding)" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="p-6 border-2 border-dashed border-ash/30 rounded-xl text-center cursor-pointer hover:border-copper/50 transition-colors">
                  <Upload size={24} className="mx-auto text-ash mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload your logo (optional)
                  </p>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Logo placement
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {logoPositions.map((pos) => (
                      <button
                        key={pos}
                        onClick={() => updateConfig({ logoPlacement: pos })}
                        className={`p-2 rounded-lg text-xs transition-all ${
                          config.logoPlacement === pos
                            ? "bg-copper text-background"
                            : "bg-midnight-light text-muted-foreground hover:bg-midnight-lighter"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview Placeholder */}
                <div className="card-premium p-6">
                  <p className="text-sm text-muted-foreground mb-4">Live Preview</p>
                  <div className="aspect-video bg-midnight rounded-lg flex items-center justify-center border border-ash/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-copper mb-1">
                        {businessName || "Your Brand"}
                      </div>
                      <p className="text-xs text-ash">
                        {skuNames[sku]} • {config.material || "Material"} • {config.size || "Size"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-copper text-sm font-medium">
            Configuring: {skuNames[sku]}
          </span>
          <span className="text-sm text-muted-foreground">
            SKU {currentIndex + 1} of {totalSKUs}
          </span>
        </div>
        
        {/* Sub-step progress */}
        <div className="flex gap-1">
          {Array.from({ length: totalSubSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step ? "bg-copper" : i === step - 1 ? "bg-copper" : "bg-ash/30"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card-premium p-8"
      >
        {renderSubStep()}
      </motion.div>

      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          size="xl"
          onClick={handleBack}
          className="flex-1"
        >
          <ArrowLeft size={20} />
          Back
        </Button>
        <Button
          variant="copper"
          size="xl"
          className="flex-1 group"
          onClick={handleNext}
        >
          {step === totalSubSteps ? (
            currentIndex === totalSKUs - 1 ? "Continue to Summary" : "Next SKU"
          ) : (
            "Continue"
          )}
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
