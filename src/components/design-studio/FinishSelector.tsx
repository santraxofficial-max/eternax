"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Finish = "matte" | "glossy" | "textured";

interface FinishSelectorProps {
  value: Finish;
  onChange: (finish: Finish) => void;
}

const finishes: { type: Finish; label: string; description: string }[] = [
  { type: "matte", label: "Matte", description: "Soft, non-reflective finish" },
  { type: "glossy", label: "Glossy", description: "Shiny, reflective surface" },
  { type: "textured", label: "Textured", description: "Tactile, premium feel" },
];

export const FinishSelector: React.FC<FinishSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-concrete-muted">
        Material Finish
      </h3>
      <div className="flex gap-2">
        {finishes.map(({ type, label, description }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={cn(
              "flex-1 p-3 rounded-lg border-2 transition-all duration-200 text-center",
              value === type
                ? "border-copper bg-copper/10"
                : "border-concrete/20 bg-white/5 hover:border-copper/50 hover:bg-white/10"
            )}
          >
            <p className={cn(
              "text-sm font-medium",
              value === type ? "text-copper" : "text-concrete"
            )}>
              {label}
            </p>
            <p className="text-xs text-concrete-muted mt-0.5 hidden sm:block">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinishSelector;
