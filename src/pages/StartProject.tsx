import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IndustrySelectStep } from "@/components/onboarding/steps/IndustrySelectStep";
import { ProductBrowseStep } from "@/components/onboarding/steps/ProductBrowseStep";
import { DesignStudioStep } from "@/components/onboarding/steps/DesignStudioStep";
import { ConfigurationStep } from "@/components/onboarding/steps/ConfigurationStep";
import { FinalReviewStep } from "@/components/onboarding/steps/FinalReviewStep";
import { CheckoutStep } from "@/components/onboarding/steps/CheckoutStep";
import type { OnboardingData, ProductConfig, DesignConfig } from "@/types/onboarding";

const StartProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [designPhase, setDesignPhase] = useState(true); // true = design, false = config
  
  const [data, setData] = useState<OnboardingData>({
    industry: "",
    selectedProducts: [],
    productConfigs: {},
    address: { street: "", city: "", state: "", pincode: "" },
    contact: { fullName: "", email: "", phone: "" },
  });

  const updateProductConfig = (productId: string, config: Partial<ProductConfig>) => {
    setData((prev) => ({
      ...prev,
      productConfigs: {
        ...prev.productConfigs,
        [productId]: { ...prev.productConfigs[productId], productId, ...config } as ProductConfig,
      },
    }));
  };

  const updateDesign = (productId: string, design: DesignConfig) => {
    updateProductConfig(productId, { design });
  };

  const handleToggleProduct = (productId: string) => {
    setData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId],
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IndustrySelectStep
            selectedIndustry={data.industry}
            onSelect={(industry) => setData((prev) => ({ ...prev, industry }))}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <ProductBrowseStep
            selectedProducts={data.selectedProducts}
            onToggleProduct={handleToggleProduct}
            onNext={() => {
              setCurrentProductIndex(0);
              setDesignPhase(true);
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        const currentProductId = data.selectedProducts[currentProductIndex];
        if (designPhase) {
          return (
            <DesignStudioStep
              productId={currentProductId}
              currentIndex={currentProductIndex}
              totalProducts={data.selectedProducts.length}
              design={data.productConfigs[currentProductId]?.design || { type: "template" }}
              onUpdateDesign={(design) => updateDesign(currentProductId, design)}
              onNext={() => setDesignPhase(false)}
              onBack={() => {
                if (currentProductIndex > 0) {
                  setCurrentProductIndex((prev) => prev - 1);
                  setDesignPhase(false);
                } else {
                  setCurrentStep(2);
                }
              }}
            />
          );
        } else {
          return (
            <ConfigurationStep
              productId={currentProductId}
              currentIndex={currentProductIndex}
              totalProducts={data.selectedProducts.length}
              config={data.productConfigs[currentProductId] || { productId: currentProductId, design: { type: "template" }, moq: 500, quality: "standard" }}
              address={data.address}
              onUpdateConfig={(config) => updateProductConfig(currentProductId, config)}
              onUpdateAddress={(address) => setData((prev) => ({ ...prev, address: { ...prev.address, ...address } }))}
              onNext={() => {
                if (currentProductIndex < data.selectedProducts.length - 1) {
                  setCurrentProductIndex((prev) => prev + 1);
                  setDesignPhase(true);
                } else {
                  setCurrentStep(4);
                }
              }}
              onBack={() => setDesignPhase(true)}
            />
          );
        }
      case 4:
        return (
          <FinalReviewStep
            selectedProducts={data.selectedProducts}
            productConfigs={data.productConfigs}
            address={data.address}
            onNext={() => setCurrentStep(5)}
            onBack={() => {
              setCurrentProductIndex(data.selectedProducts.length - 1);
              setDesignPhase(false);
              setCurrentStep(3);
            }}
          />
        );
      case 5:
        return (
          <CheckoutStep
            selectedProducts={data.selectedProducts}
            productConfigs={data.productConfigs}
            contact={data.contact}
            onUpdateContact={(contact) => setData((prev) => ({ ...prev, contact: { ...prev.contact, ...contact } }))}
            onBack={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentStep}-${currentProductIndex}-${designPhase}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StartProject;
