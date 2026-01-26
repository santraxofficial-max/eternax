"use client";

import React from "react";
import { DesignStudio } from "@/components/design-studio/DesignStudio";
import { type LuxuryProduct } from "@/components/onboarding/luxuryProducts";

interface DesignStudioStepProps {
  selectedProduct: LuxuryProduct;
  currentProductIndex: number;
  totalProducts: number;
  onComplete: () => void;
}

export const DesignStudioStep: React.FC<DesignStudioStepProps> = ({
  selectedProduct,
  currentProductIndex,
  totalProducts,
  onComplete,
}) => {
  return (
    <DesignStudio
      product={selectedProduct}
      currentIndex={currentProductIndex}
      totalProducts={totalProducts}
      onComplete={onComplete}
    />
  );
};

export default DesignStudioStep;
