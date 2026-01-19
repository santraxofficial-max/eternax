import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { IndustrySelectionStep } from "@/components/onboarding/IndustrySelectionStep";
import { ProductSelectionStep } from "@/components/onboarding/ProductSelectionStep";
import { ProductConfirmationStep } from "@/components/onboarding/ProductConfirmationStep";
import { DesignStudioIntroStep } from "@/components/onboarding/DesignStudioIntroStep";
import { ProductDesignWorkflowStep } from "@/components/onboarding/ProductDesignWorkflowStep";
import { DesignStudioStep } from "@/components/onboarding/DesignStudioStep";
import ReactorKnob from "@/components/ui/control-knob";

export type OnboardingData = {
  industry: string;
  products: string[];
  // Add more fields as we build more steps
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    industry: "",
    products: [],
  });
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [showSecondLoadingAnimation, setShowSecondLoadingAnimation] = useState(false);
  const [showThirdLoadingAnimation, setShowThirdLoadingAnimation] = useState(false);
  const [showFourthLoadingAnimation, setShowFourthLoadingAnimation] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const handleIndustrySelect = (industry: string) => {
    setData(prev => ({ ...prev, industry }));
    // For now, just log the selection - we'll handle step progression later
    console.log("Selected industry:", industry);
  };

  const handleProductsSelect = (products: string[]) => {
    setData(prev => ({ ...prev, products }));
    console.log("Selected products:", products);
  };

  const handleContinueToProducts = () => {
    setShowLoadingAnimation(true);
    // After 3 seconds, hide loading and show step 2
    setTimeout(() => {
      setShowLoadingAnimation(false);
      setCurrentStep(2);
    }, 3000);
  };

  const handleContinueFromProducts = () => {
    setShowSecondLoadingAnimation(true);
    // After 3 seconds, hide loading and show step 3
    setTimeout(() => {
      setShowSecondLoadingAnimation(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handleBackToProducts = () => {
    setCurrentStep(2);
  };

  const handleFinalConfirmation = () => {
    setShowThirdLoadingAnimation(true);
    // After 3 seconds, hide loading and show step 3.1 (design studio intro)
    setTimeout(() => {
      setShowThirdLoadingAnimation(false);
      setCurrentStep(4); // Step 3.1 - Design Studio Intro
    }, 3000);
  };

  const handleStartDesigning = () => {
    setCurrentProductIndex(0);
    setCurrentStep(5); // Step 3.2 - Workflow step (direct transition, no animation)
  };

  const handleBridgeAutoAdvance = () => {
    setCurrentStep(6); // Step 4 - Design Studio (direct transition, no animation)
  };

  const handleConfirmDesign = () => {
    const nextProductIndex = currentProductIndex + 1;

    if (nextProductIndex < data.products.length) {
      // More products to design
      setCurrentProductIndex(nextProductIndex);
      setCurrentStep(5); // Back to bridge step for next product
    } else {
      // All products designed
      console.log("All products designed! Final data:", data);
      // For now, just log - in a real app this would navigate to next step
    }
  };

  const renderStep = () => {
    // Show loading animation between step 1 and 2
    if (showLoadingAnimation) {
      return <ReactorKnob text="PROCESSING" />;
    }

    // Show loading animation between step 2 and 3
    if (showSecondLoadingAnimation) {
      return <ReactorKnob text="ANALYZING" />;
    }

    // Show loading animation between step 3 and 3.1
    if (showThirdLoadingAnimation) {
      return <ReactorKnob text="PREPARING" />;
    }

    // Show loading animation between step 3.1 and 3.2
    if (showFourthLoadingAnimation && currentStep === 4) {
      return <ReactorKnob text="INITIALIZING" />;
    }

    switch (currentStep) {
      case 1:
        return (
          <IndustrySelectionStep
            selectedIndustry={data.industry}
            onSelectIndustry={handleIndustrySelect}
            onContinue={handleContinueToProducts}
          />
        );
      case 2:
        return (
          <ProductSelectionStep
            selectedIndustry={data.industry}
            selectedProducts={data.products}
            onSelectProducts={handleProductsSelect}
            onContinue={handleContinueFromProducts}
          />
        );
      case 3:
        return (
          <ProductConfirmationStep
            selectedIndustry={data.industry}
            selectedProducts={data.products}
            onBackToSelection={handleBackToProducts}
            onConfirm={handleFinalConfirmation}
          />
        );
      case 4: // Step 3.1 - Design Studio Intro
        return (
          <DesignStudioIntroStep
            selectedIndustry={data.industry}
            selectedProducts={data.products}
            onStartDesigning={handleStartDesigning}
          />
        );
      case 5: // Step 3.2/3.3 - Product Design Workflow
        return (
          <ProductDesignWorkflowStep
            selectedIndustry={data.industry}
            selectedProducts={data.products}
            currentProductIndex={currentProductIndex}
            onAutoAdvance={handleBridgeAutoAdvance}
          />
        );
      case 6: // Step 4 - Design Studio
        return (
          <DesignStudioStep
            selectedIndustry={data.industry}
            selectedProducts={data.products}
            currentProductIndex={currentProductIndex}
            onConfirmDesign={handleConfirmDesign}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout hideFooter={true} hideHeader={true} fullHeight={true}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showLoadingAnimation ? 'loading-1' : showSecondLoadingAnimation ? 'loading-2' : showThirdLoadingAnimation ? 'loading-3' : showFourthLoadingAnimation ? 'loading-4' : `step-${currentStep}-product-${currentProductIndex}`}
          initial={{ opacity: 0, x: (showLoadingAnimation || showSecondLoadingAnimation || showThirdLoadingAnimation || showFourthLoadingAnimation) ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: (showLoadingAnimation || showSecondLoadingAnimation || showThirdLoadingAnimation || showFourthLoadingAnimation) ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Onboarding;
