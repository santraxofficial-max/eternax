"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Package, Gift, Footprints, Shirt } from "lucide-react";

type BoxType = "mailer" | "gift" | "shoe" | "garment";

interface BoxTypeSelectorProps {
  value: BoxType;
  onChange: (type: BoxType) => void;
}

const boxTypes: { type: BoxType; label: string; icon: React.ElementType; description: string }[] = [
  { type: "mailer", label: "Mailer Box", icon: Package, description: "Standard shipping box" },
  { type: "gift", label: "Gift Box", icon: Gift, description: "Premium gift packaging" },
  { type: "shoe", label: "Shoe Box", icon: Footprints, description: "Footwear packaging" },
  { type: "garment", label: "Garment Box", icon: Shirt, description: "Apparel packaging" },
];

export const BoxTypeSelector: React.FC<BoxTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-concrete-muted">
        Box Type
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {boxTypes.map(({ type, label, icon: Icon, description }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={cn(
              "p-3 rounded-lg border-2 transition-all duration-200 text-left",
              value === type
                ? "border-copper bg-copper/10"
                : "border-concrete/20 bg-white/5 hover:border-copper/50 hover:bg-white/10"
            )}
          >
            <Icon className={cn(
              "w-5 h-5 mb-2",
              value === type ? "text-copper" : "text-concrete-muted"
            )} />
            <p className={cn(
              "text-sm font-medium",
              value === type ? "text-copper" : "text-concrete"
            )}>
              {label}
            </p>
            <p className="text-xs text-concrete-muted mt-0.5">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoxTypeSelector;
