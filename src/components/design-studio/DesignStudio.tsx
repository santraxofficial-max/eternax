"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  RotateCcw, 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Palette, 
  Type, 
  Box, 
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCw,
  CheckCircle
} from "lucide-react";
import { DesignStudioCanvas } from "./DesignStudioCanvas";
import { ColorPicker } from "./ColorPicker";
import { TextEditor } from "./TextEditor";
import { BoxTypeSelector } from "./BoxTypeSelector";
import { FinishSelector } from "./FinishSelector";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type LuxuryProduct } from "@/components/onboarding/luxuryProducts";

interface DesignStudioProps {
  product: LuxuryProduct;
  currentIndex: number;
  totalProducts: number;
  onComplete: () => void;
  onBack?: () => void;
}

export interface DesignConfig {
  boxColor: string;
  textColor: string;
  logoText: string;
  taglineText: string;
  boxType: "mailer" | "gift" | "shoe" | "garment";
  finish: "matte" | "glossy" | "textured";
}

const getDefaultBoxType = (product: LuxuryProduct): "mailer" | "gift" | "shoe" | "garment" => {
  const category = product.category.toLowerCase();
  if (category.includes("footwear") || category.includes("shoe")) return "shoe";
  if (category.includes("shirt") || category.includes("dress") || category.includes("suit") || category.includes("outerwear") || category.includes("knitwear") || category.includes("lingerie")) return "garment";
  if (category.includes("handbag") || category.includes("accessor")) return "gift";
  return "mailer";
};

export const DesignStudio: React.FC<DesignStudioProps> = ({
  product,
  currentIndex,
  totalProducts,
  onComplete,
  onBack,
}) => {
  const [config, setConfig] = useState<DesignConfig>({
    boxColor: "#1a1a1a",
    textColor: "#B87333",
    logoText: "ETERNA",
    taglineText: "Luxury Packaging",
    boxType: getDefaultBoxType(product),
    finish: "matte",
  });

  const [activeTab, setActiveTab] = useState("colors");
  const [isSaving, setIsSaving] = useState(false);

  const updateConfig = useCallback(<K extends keyof DesignConfig>(
    key: K,
    value: DesignConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetDesign = useCallback(() => {
    setConfig({
      boxColor: "#1a1a1a",
      textColor: "#B87333",
      logoText: "ETERNA",
      taglineText: "Luxury Packaging",
      boxType: getDefaultBoxType(product),
      finish: "matte",
    });
  }, [product]);

  const handleSaveAndContinue = useCallback(async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    onComplete();
  }, [onComplete]);

  const isLastProduct = currentIndex + 1 === totalProducts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-charcoal-dark">
      {/* Header */}
      <div className="border-b border-concrete/10 bg-charcoal/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-concrete-muted hover:text-concrete"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-lg font-bold text-concrete">Design Studio</h1>
                <p className="text-sm text-concrete-muted">
                  Customizing: {product.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-copper bg-copper/10 px-3 py-1.5 rounded-full">
                {currentIndex + 1} of {totalProducts}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDesign}
                className="border-concrete/20 text-concrete-muted hover:text-concrete"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Preview - Takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-charcoal-light/50 rounded-2xl border border-concrete/10 overflow-hidden">
              <div className="p-4 border-b border-concrete/10 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-concrete flex items-center gap-2">
                  <Box className="w-4 h-4 text-copper" />
                  3D Preview
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-concrete-muted">
                    Drag to rotate • Scroll to zoom
                  </span>
                </div>
              </div>
              <div className="aspect-[4/3] md:aspect-[16/10]">
                <DesignStudioCanvas
                  boxColor={config.boxColor}
                  textContent={config.taglineText}
                  textColor={config.textColor}
                  logoText={config.logoText}
                  boxType={config.boxType}
                  finish={config.finish}
                />
              </div>
            </div>
          </motion.div>

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-charcoal-light/50 rounded-2xl border border-concrete/10 overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4 bg-charcoal rounded-none border-b border-concrete/10 h-12">
                  <TabsTrigger 
                    value="colors" 
                    className="data-[state=active]:bg-copper/10 data-[state=active]:text-copper rounded-none h-full"
                  >
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="text"
                    className="data-[state=active]:bg-copper/10 data-[state=active]:text-copper rounded-none h-full"
                  >
                    <Type className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="box"
                    className="data-[state=active]:bg-copper/10 data-[state=active]:text-copper rounded-none h-full"
                  >
                    <Box className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="finish"
                    className="data-[state=active]:bg-copper/10 data-[state=active]:text-copper rounded-none h-full"
                  >
                    <Sparkles className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>

                <div className="p-4">
                  <TabsContent value="colors" className="mt-0 space-y-6">
                    <ColorPicker
                      label="Box Color"
                      value={config.boxColor}
                      onChange={(color) => updateConfig("boxColor", color)}
                    />
                    <ColorPicker
                      label="Text & Accent Color"
                      value={config.textColor}
                      onChange={(color) => updateConfig("textColor", color)}
                    />
                  </TabsContent>

                  <TabsContent value="text" className="mt-0">
                    <TextEditor
                      logoText={config.logoText}
                      taglineText={config.taglineText}
                      onLogoChange={(text) => updateConfig("logoText", text)}
                      onTaglineChange={(text) => updateConfig("taglineText", text)}
                    />
                  </TabsContent>

                  <TabsContent value="box" className="mt-0">
                    <BoxTypeSelector
                      value={config.boxType}
                      onChange={(type) => updateConfig("boxType", type)}
                    />
                  </TabsContent>

                  <TabsContent value="finish" className="mt-0">
                    <FinishSelector
                      value={config.finish}
                      onChange={(finish) => updateConfig("finish", finish)}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Product Info */}
            <div className="bg-charcoal-light/50 rounded-2xl border border-concrete/10 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-concrete-muted mb-3">
                Product Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-concrete-muted">Category</span>
                  <span className="text-concrete">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-concrete-muted">Material</span>
                  <span className="text-concrete">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-concrete-muted">Use Case</span>
                  <span className="text-concrete">{product.useCase}</span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <ShinyButton
              onClick={handleSaveAndContinue}
              disabled={isSaving}
              className="w-full px-8 py-4 text-lg font-semibold"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RotateCw className="w-5 h-5" />
                  </motion.div>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {isLastProduct ? "Complete Design" : "Save & Next Product"}
                </span>
              )}
            </ShinyButton>

            {!isLastProduct && (
              <p className="text-center text-xs text-concrete-muted">
                {totalProducts - currentIndex - 1} more product{totalProducts - currentIndex - 1 !== 1 ? 's' : ''} to customize
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
