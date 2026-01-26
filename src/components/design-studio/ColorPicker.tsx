"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

const defaultPresetColors = [
  "#1a1a1a", // Black
  "#ffffff", // White
  "#B87333", // Copper
  "#C9A961", // Gold
  "#C0C0C0", // Silver
  "#8B4513", // Brown
  "#2C3E50", // Navy
  "#7B3F00", // Chocolate
  "#D4AF37", // Metallic Gold
  "#722F37", // Burgundy
  "#355E3B", // Hunter Green
  "#E8DCC4", // Cream
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presetColors = defaultPresetColors,
}) => {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-concrete-muted">
        {label}
      </label>
      
      <div className="grid grid-cols-6 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={cn(
              "w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center",
              value === color
                ? "border-copper ring-2 ring-copper/30"
                : "border-transparent hover:border-copper/50"
            )}
            style={{ backgroundColor: color }}
            title={color}
          >
            {value === color && (
              <Check 
                className={cn(
                  "w-4 h-4",
                  color === "#ffffff" || color === "#E8DCC4" || color === "#C0C0C0"
                    ? "text-black"
                    : "text-white"
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Custom Color Input */}
      <div className="flex items-center gap-3 mt-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-concrete/20 hover:border-copper/50 transition-colors"
          />
        </div>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          className="flex-1 bg-white/5 border border-concrete/20 rounded-lg px-3 py-2 text-sm font-mono text-concrete focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper/30"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
