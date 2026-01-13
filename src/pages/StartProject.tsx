import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { BusinessStep } from "@/components/onboarding/steps/BusinessStep";
import { IndustryStep } from "@/components/onboarding/steps/IndustryStep";
import { SKUSelectionStep } from "@/components/onboarding/steps/SKUSelectionStep";
import { SKUConfigStep } from "@/components/onboarding/steps/SKUConfigStep";
import { SustainabilityStep } from "@/components/onboarding/steps/SustainabilityStep";
import { SummaryStep } from "@/components/onboarding/steps/SummaryStep";
import { LeadCaptureStep } from "@/components/onboarding/steps/LeadCaptureStep";
import type { OnboardingData, SKUConfig } from "@/types/onboarding";

const totalBaseSteps = 7;

const StartProject = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSKUIndex, setCurrentSKUIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    businessName: "",
    industry: "",
    selectedSKUs: [],
    skuConfigs: {},
    sustainabilityPriority: "",
    contact: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateSKUConfig = (sku: string, config: Partial<SKUConfig>) => {
    setData((prev) => ({
      ...prev,
      skuConfigs: {
        ...prev.skuConfigs,
        [sku]: { ...prev.skuConfigs[sku], ...config },
      },
    }));
  };

  const nextStep = () => {
    // If we're in SKU selection and moving to config
    if (currentStep === 3) {
      if (data.selectedSKUs.length > 0) {
        setCurrentSKUIndex(0);
        setCurrentStep(4);
      }
      return;
    }

    // If we're in SKU config, check if there are more SKUs
    if (currentStep === 4) {
      if (currentSKUIndex < data.selectedSKUs.length - 1) {
        setCurrentSKUIndex((prev) => prev + 1);
      } else {
        setCurrentStep(5);
      }
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === 4 && currentSKUIndex > 0) {
      setCurrentSKUIndex((prev) => prev - 1);
      return;
    }

    if (currentStep === 4 && currentSKUIndex === 0) {
      setCurrentStep(3);
      return;
    }

    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Calculate progress
  const getProgress = () => {
    const skuConfigSteps = data.selectedSKUs.length || 1;
    const totalSteps = 3 + skuConfigSteps + 3; // Base steps + SKU configs

    if (currentStep <= 3) return (currentStep / totalSteps) * 100;
    if (currentStep === 4) return ((3 + currentSKUIndex + 1) / totalSteps) * 100;
    return ((3 + skuConfigSteps + (currentStep - 4)) / totalSteps) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessStep
            data={data}
            updateData={updateData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <IndustryStep
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <SKUSelectionStep
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <SKUConfigStep
            sku={data.selectedSKUs[currentSKUIndex]}
            config={data.skuConfigs[data.selectedSKUs[currentSKUIndex]] || {}}
            updateConfig={(config) =>
              updateSKUConfig(data.selectedSKUs[currentSKUIndex], config)
            }
            businessName={data.businessName}
            currentIndex={currentSKUIndex}
            totalSKUs={data.selectedSKUs.length}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <SustainabilityStep
            data={data}
            updateData={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <SummaryStep
            data={data}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <LeadCaptureStep
            data={data}
            updateData={updateData}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout hideFooter>
      <div className="min-h-screen pt-24 pb-12">
        <div className="section-container">
          <OnboardingProgress progress={getProgress()} />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStep}-${currentSKUIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default StartProject;
