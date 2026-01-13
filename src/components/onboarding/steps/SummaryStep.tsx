import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Package, CheckCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/types/onboarding";

interface SummaryStepProps {
  data: OnboardingData;
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

const materialNames: Record<string, string> = {
  sugarcane: "Sugarcane Bagasse",
  kraft: "Kraft Paper",
  bamboo: "Bamboo Fiber",
  cornstarch: "Cornstarch Blend",
  "molded-pulp": "Molded Pulp",
};

const priorityNames: Record<string, string> = {
  "lowest-cost": "Lowest Cost",
  balanced: "Balanced Eco + Cost",
  "fully-compostable": "Fully Compostable",
  premium: "Premium Sustainability",
};

export const SummaryStep = ({ data, onNext, onBack }: SummaryStepProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-background" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Your packaging project summary
        </h1>
        <p className="mt-4 text-muted-foreground">
          Review your selections before getting your quote
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        {/* Business Info */}
        <div className="card-premium p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Business
          </h3>
          <p className="text-2xl font-bold text-copper">{data.businessName}</p>
        </div>

        {/* SKU Summary */}
        <div className="card-premium p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Selected Packaging ({data.selectedSKUs.length} items)
          </h3>
          <div className="space-y-4">
            {data.selectedSKUs.map((sku) => {
              const config = data.skuConfigs[sku] || {};
              return (
                <div
                  key={sku}
                  className="flex items-start gap-4 p-4 bg-midnight rounded-xl border border-ash/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-copper/20 flex items-center justify-center flex-shrink-0">
                    <Package size={18} className="text-copper" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {skuNames[sku]}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {config.material && (
                        <span className="text-xs px-2 py-1 bg-midnight-lighter rounded-full text-muted-foreground">
                          {materialNames[config.material] || config.material}
                        </span>
                      )}
                      {config.size && (
                        <span className="text-xs px-2 py-1 bg-midnight-lighter rounded-full text-muted-foreground">
                          {config.size}
                        </span>
                      )}
                      {config.quantity && (
                        <span className="text-xs px-2 py-1 bg-midnight-lighter rounded-full text-muted-foreground">
                          {config.quantity}
                        </span>
                      )}
                      {config.design && (
                        <span className="text-xs px-2 py-1 bg-midnight-lighter rounded-full text-muted-foreground">
                          {config.design}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainability */}
        <div className="card-premium p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Sustainability Priority
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-copper/20 flex items-center justify-center">
              <Leaf size={18} className="text-copper" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {priorityNames[data.sustainabilityPriority] || data.sustainabilityPriority}
            </p>
          </div>
        </div>

        {/* Production Status */}
        <div className="card-premium p-6 border-copper/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-copper animate-pulse" />
            <p className="text-foreground font-medium">
              Production-ready configuration
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your packaging specifications are complete and can proceed to manufacturing.
          </p>
        </div>
      </motion.div>

      <div className="flex gap-4 mt-12">
        <Button
          variant="outline"
          size="xl"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft size={20} />
          Back
        </Button>
        <Button
          variant="copper"
          size="xl"
          className="flex-1 group"
          onClick={onNext}
        >
          Get Your Quote
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
