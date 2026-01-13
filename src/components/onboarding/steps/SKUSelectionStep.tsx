import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Package, Circle, Coffee, Utensils, ShoppingBag, Box, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/types/onboarding";

interface SKUSelectionStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const skuOptions = [
  { id: "meal-boxes", name: "Meal Boxes", icon: Package, description: "Complete meal containers" },
  { id: "plates", name: "Plates", icon: Circle, description: "Flat serving containers" },
  { id: "bowls", name: "Bowls", icon: Coffee, description: "Deep containers for soups & salads" },
  { id: "cups", name: "Cups", icon: Coffee, description: "Hot & cold beverages" },
  { id: "cutlery", name: "Cutlery", icon: Utensils, description: "Forks, spoons, knives" },
  { id: "carry-bags", name: "Carry Bags", icon: ShoppingBag, description: "Delivery & takeaway bags" },
  { id: "special-containers", name: "Special Containers", icon: Box, description: "Sauces, desserts, specialty items" },
];

export const SKUSelectionStep = ({ data, updateData, onNext, onBack }: SKUSelectionStepProps) => {
  const toggleSKU = (id: string) => {
    const current = data.selectedSKUs;
    if (current.includes(id)) {
      updateData({ selectedSKUs: current.filter((s) => s !== id) });
    } else {
      updateData({ selectedSKUs: [...current, id] });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          What do you want to package?
        </h1>
        <p className="mt-4 text-muted-foreground">
          Select all the packaging types you need. You'll configure each one individually.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {skuOptions.map((sku, index) => {
          const isSelected = data.selectedSKUs.includes(sku.id);
          return (
            <motion.button
              key={sku.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => toggleSKU(sku.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left flex items-start gap-4 ${
                isSelected
                  ? "border-copper bg-copper/10"
                  : "border-ash/30 bg-midnight-light hover:border-ash"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-gradient-to-br from-copper to-copper-dark"
                    : "bg-midnight border border-ash/30"
                }`}
              >
                <sku.icon size={22} className={isSelected ? "text-background" : "text-ash"} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{sku.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{sku.description}</p>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-copper flex items-center justify-center">
                  <Check size={14} className="text-background" />
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {data.selectedSKUs.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 text-copper font-medium"
        >
          {data.selectedSKUs.length} item{data.selectedSKUs.length > 1 ? "s" : ""} selected
        </motion.p>
      )}

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
          disabled={data.selectedSKUs.length === 0}
        >
          Configure Selected Items
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
