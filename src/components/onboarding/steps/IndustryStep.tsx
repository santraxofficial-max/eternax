import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, UtensilsCrossed, Cake, Coffee, ChefHat, Truck, Award, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/types/onboarding";

interface IndustryStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const industries = [
  { id: "food-beverage", name: "Food & Beverage", icon: UtensilsCrossed, active: true },
  { id: "bakery", name: "Bakery & Desserts", icon: Cake, active: true },
  { id: "cloud-kitchen", name: "Cloud Kitchen", icon: Truck, active: true },
  { id: "cafe", name: "Café / Coffee", icon: Coffee, active: true },
  { id: "fine-dining", name: "Fine Dining", icon: ChefHat, active: true },
  { id: "qsr", name: "QSR / Franchise", icon: Award, active: true },
  { id: "other", name: "Other", icon: Lock, active: false, comingSoon: true },
];

export const IndustryStep = ({ data, updateData, onNext, onBack }: IndustryStepProps) => {
  const handleSelect = (id: string, active: boolean) => {
    if (!active) return;
    updateData({ industry: id });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Which industry best describes your business?
        </h1>
        <p className="mt-4 text-muted-foreground">
          This helps us tailor packaging options and recommendations for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {industries.map((industry, index) => (
          <motion.button
            key={industry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => handleSelect(industry.id, industry.active)}
            disabled={!industry.active}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              data.industry === industry.id
                ? "border-copper bg-copper/10"
                : industry.active
                ? "border-ash/30 bg-midnight-light hover:border-ash"
                : "border-ash/10 bg-midnight-light/50 opacity-60 cursor-not-allowed"
            }`}
          >
            {industry.comingSoon && (
              <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-ash/20 text-ash">
                Coming Soon
              </span>
            )}
            <industry.icon
              size={28}
              className={data.industry === industry.id ? "text-copper" : "text-ash"}
            />
            <h3 className="mt-4 font-semibold text-foreground">{industry.name}</h3>
          </motion.button>
        ))}
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
          disabled={!data.industry}
        >
          Continue
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
