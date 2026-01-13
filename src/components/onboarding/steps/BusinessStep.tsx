import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { OnboardingData } from "@/types/onboarding";

interface BusinessStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export const BusinessStep = ({ data, updateData, onNext }: BusinessStepProps) => {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!data.businessName.trim()) {
      setError("Please enter your business name");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center mx-auto mb-6">
          <Building2 size={28} className="text-background" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Let's start with your brand.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your brand name will appear on live design previews throughout this process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-premium p-8"
      >
        <label className="block text-sm font-medium text-foreground mb-2">
          Business / Brand Name
        </label>
        <Input
          type="text"
          placeholder="e.g., Urban Bites, Fresh & Fast"
          value={data.businessName}
          onChange={(e) => {
            updateData({ businessName: e.target.value });
            if (error) setError("");
          }}
          className="h-14 text-lg bg-midnight border-ash/30 text-foreground placeholder:text-ash focus:border-copper"
        />
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}

        <Button
          variant="copper"
          size="xl"
          className="w-full mt-8 group"
          onClick={handleSubmit}
        >
          Continue
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
};
