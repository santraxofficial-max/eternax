import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, DollarSign, Scale, Leaf, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/types/onboarding";

interface SustainabilityStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const priorities = [
  {
    id: "lowest-cost",
    icon: DollarSign,
    title: "Lowest Cost",
    description: "Economy materials that meet basic sustainability standards",
  },
  {
    id: "balanced",
    icon: Scale,
    title: "Balanced Eco + Cost",
    description: "Great value with genuine environmental benefits",
  },
  {
    id: "fully-compostable",
    icon: Leaf,
    title: "Fully Compostable",
    description: "Complete decomposition in industrial composting",
  },
  {
    id: "premium",
    icon: Crown,
    title: "Premium Sustainability",
    description: "Highest certifications, best materials, maximum impact",
  },
];

export const SustainabilityStep = ({
  data,
  updateData,
  onNext,
  onBack,
}: SustainabilityStepProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          What matters most to you?
        </h1>
        <p className="mt-4 text-muted-foreground">
          This helps us finalize material recommendations and optimize your quote.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {priorities.map((priority, index) => (
          <motion.button
            key={priority.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => updateData({ sustainabilityPriority: priority.id })}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-5 ${
              data.sustainabilityPriority === priority.id
                ? "border-copper bg-copper/10"
                : "border-ash/30 bg-midnight-light hover:border-ash"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                data.sustainabilityPriority === priority.id
                  ? "bg-gradient-to-br from-copper to-copper-dark"
                  : "bg-midnight border border-ash/30"
              }`}
            >
              <priority.icon
                size={24}
                className={
                  data.sustainabilityPriority === priority.id
                    ? "text-background"
                    : "text-ash"
                }
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {priority.title}
              </h3>
              <p className="text-muted-foreground mt-1">{priority.description}</p>
            </div>
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
          disabled={!data.sustainabilityPriority}
        >
          View Summary
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
