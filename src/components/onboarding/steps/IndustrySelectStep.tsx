import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Cake, Coffee, ChefHat, Truck, Award, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndustrySelectStepProps {
  selectedIndustry: string;
  onSelect: (industry: string) => void;
  onNext: () => void;
}

const industries = [
  { id: "food-beverage", name: "Food & Beverage", icon: UtensilsCrossed, active: true, description: "Restaurants, takeaway, delivery" },
  { id: "bakery", name: "Bakery & Desserts", icon: Cake, active: true, description: "Bakeries, patisseries, confectioneries" },
  { id: "cloud-kitchen", name: "Cloud Kitchen", icon: Truck, active: true, description: "Virtual restaurants, ghost kitchens" },
  { id: "cafe", name: "Café / Coffee", icon: Coffee, active: true, description: "Coffee shops, tea houses" },
  { id: "fine-dining", name: "Fine Dining", icon: ChefHat, active: true, description: "Premium restaurants, catering" },
  { id: "qsr", name: "QSR / Franchise", icon: Award, active: true, description: "Quick service, fast food chains" },
  { id: "other", name: "Other Industries", icon: Lock, active: false, comingSoon: true, description: "Cosmetics, pharma, retail" },
];

export const IndustrySelectStep = ({ selectedIndustry, onSelect, onNext }: IndustrySelectStepProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-2xl"
      >
        <span className="text-copper text-sm font-medium uppercase tracking-wider">Step 1</span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold text-concrete">
          What industry is your business in?
        </h1>
        <p className="mt-4 text-lg text-concrete-muted">
          Select your industry to see packaging solutions tailored specifically for your needs.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {industries.map((industry, index) => (
          <motion.button
            key={industry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => industry.active && onSelect(industry.id)}
            disabled={!industry.active}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
              selectedIndustry === industry.id
                ? "border-copper bg-copper/10"
                : industry.active
                ? "border-ash/20 bg-midnight-light hover:border-ash/50"
                : "border-ash/10 bg-midnight-light/50 opacity-50 cursor-not-allowed"
            }`}
          >
            {industry.comingSoon && (
              <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-ash/20 text-ash">
                Coming Soon
              </span>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              selectedIndustry === industry.id 
                ? "bg-copper text-midnight" 
                : "bg-midnight border border-ash/20 group-hover:border-copper/50"
            }`}>
              <industry.icon size={24} className={selectedIndustry === industry.id ? "text-midnight" : "text-copper"} />
            </div>
            <h3 className="mt-4 font-semibold text-lg text-concrete">{industry.name}</h3>
            <p className="mt-1 text-sm text-ash">{industry.description}</p>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Button
          variant="copper"
          size="xl"
          className="group min-w-[200px]"
          onClick={onNext}
          disabled={!selectedIndustry}
        >
          Continue
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
};
