import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductSelectionStep } from "@/components/onboarding/ProductSelectionStep";
import { DesignStudioStep } from "@/components/onboarding/DesignStudioStep";
import { ProductConfirmationStep } from "@/components/onboarding/ProductConfirmationStep";
import { ProductDesignBridgeStep } from "@/components/onboarding/ProductDesignBridgeStep";
import { getLuxuryProductById } from "@/components/onboarding/luxuryProducts";
import { ShinyButton } from "@/components/ui/shiny-button";

export type OnboardingData = {
  products: string[];
};

type OnboardingPhase = "select" | "confirm" | "bridge" | "design" | "complete";

const Onboarding = () => {
  const [currentPhase, setCurrentPhase] = useState<OnboardingPhase>("select");
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    products: [],
  });

  const handleProductsSelect = (products: string[]) => {
    setData((prev) => ({ ...prev, products }));
  };

  const handleContinueToConfirmation = () => {
    setCurrentPhase("confirm");
  };

  const handleBackToSelection = () => {
    setCurrentPhase("select");
  };

  const handleConfirmSelection = () => {
    setCurrentProductIndex(0);
    setCurrentPhase("bridge");
  };

  const handleBridgeAutoAdvance = () => {
    setCurrentPhase("design");
  };

  const handleDesignComplete = () => {
    if (currentProductIndex < data.products.length - 1) {
      setCurrentProductIndex((prev) => prev + 1);
      setCurrentPhase("bridge");
      return;
    }
    setCurrentPhase("complete");
  };

  const handleRestart = () => {
    setData({ products: [] });
    setCurrentProductIndex(0);
    setCurrentPhase("select");
  };

  useEffect(() => {
    if (!data.products.length && (currentPhase === "bridge" || currentPhase === "design")) {
      setCurrentPhase("select");
    }
  }, [currentPhase, data.products.length]);

  useEffect(() => {
    if (currentProductIndex >= data.products.length) {
      setCurrentProductIndex(0);
    }
  }, [currentProductIndex, data.products.length]);

  const currentProduct = getLuxuryProductById(data.products[currentProductIndex]);

  const renderStep = () => {
    switch (currentPhase) {
      case "select":
        return (
          <ProductSelectionStep
            selectedProducts={data.products}
            onSelectProducts={handleProductsSelect}
            onContinue={handleContinueToConfirmation}
          />
        );
      case "confirm":
        return (
          <ProductConfirmationStep
            selectedProducts={data.products}
            onBackToSelection={handleBackToSelection}
            onConfirm={handleConfirmSelection}
          />
        );
      case "bridge":
        return currentProduct ? (
          <ProductDesignBridgeStep
            selectedProducts={data.products}
            currentProductIndex={currentProductIndex}
            onAutoAdvance={handleBridgeAutoAdvance}
          />
        ) : null;
      case "design":
        return currentProduct ? (
          <DesignStudioStep
            selectedProduct={currentProduct}
            currentProductIndex={currentProductIndex}
            totalProducts={data.products.length}
            onComplete={handleDesignComplete}
          />
        ) : null;
      case "complete":
        return (
          <div className="min-h-screen flex flex-col justify-center px-8 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-4">
                All products are queued for customization
              </h2>
              <p className="text-concrete-muted text-lg mb-8">
                Your selections are saved. We'll guide you through production-ready
                packaging next.
              </p>
              <ShinyButton onClick={handleRestart} className="px-10 py-4 text-lg font-semibold">
                Start another selection
              </ShinyButton>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout hideFooter={true} hideHeader={true} fullHeight={true} disableGridBackground={true}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPhase}-${currentProductIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Onboarding;
