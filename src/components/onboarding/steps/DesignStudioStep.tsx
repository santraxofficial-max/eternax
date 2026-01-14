import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Upload, Palette, Image, Check, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyProducts, designTemplates, DesignConfig } from "@/types/onboarding";

interface DesignStudioStepProps {
  productId: string;
  currentIndex: number;
  totalProducts: number;
  design: DesignConfig;
  onUpdateDesign: (design: DesignConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DesignStudioStep = ({
  productId,
  currentIndex,
  totalProducts,
  design,
  onUpdateDesign,
  onNext,
  onBack,
}: DesignStudioStepProps) => {
  const [designType, setDesignType] = useState<"template" | "custom">(design.type || "template");
  const [selectedTemplate, setSelectedTemplate] = useState(design.templateId || "");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = dummyProducts.find((p) => p.id === productId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      onUpdateDesign({
        type: "custom",
        customDesignUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onUpdateDesign({
      type: "template",
      templateId,
    });
  };

  const handleContinue = () => {
    if (designType === "template" && selectedTemplate) {
      onUpdateDesign({ type: "template", templateId: selectedTemplate });
    }
    onNext();
  };

  const isValid = (designType === "template" && selectedTemplate) || (designType === "custom" && uploadedFile);

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-copper text-sm font-medium uppercase tracking-wider">Step 3</span>
          <span className="text-ash text-sm">•</span>
          <span className="text-ash text-sm">Product {currentIndex + 1} of {totalProducts}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-concrete">
          Design Your {product?.name}
        </h1>
        <p className="mt-4 text-concrete-muted">
          Choose a template or upload your custom design. Your branding makes all the difference.
        </p>
      </motion.div>

      {/* Product Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto w-full mb-8"
      >
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-concrete">{product?.name}</h3>
            <p className="text-concrete-muted text-sm">{product?.category}</p>
          </div>
        </div>
      </motion.div>

      {/* Design Type Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-4 mb-8"
      >
        <button
          onClick={() => setDesignType("template")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            designType === "template"
              ? "bg-copper text-midnight"
              : "bg-midnight-light border border-ash/30 text-concrete hover:border-ash/50"
          }`}
        >
          <Palette size={18} />
          Choose Template
        </button>
        <button
          onClick={() => setDesignType("custom")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            designType === "custom"
              ? "bg-copper text-midnight"
              : "bg-midnight-light border border-ash/30 text-concrete hover:border-ash/50"
          }`}
        >
          <Upload size={18} />
          Upload Design
        </button>
      </motion.div>

      {/* Design Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        {designType === "template" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {designTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all group ${
                  selectedTemplate === template.id
                    ? "border-copper"
                    : "border-ash/20 hover:border-ash/50"
                }`}
              >
                <div className="aspect-square">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  selectedTemplate === template.id ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="w-12 h-12 rounded-full bg-copper flex items-center justify-center">
                    <Check size={24} className="text-midnight" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-midnight to-transparent">
                  <span className="text-sm font-medium text-concrete">{template.name}</span>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf,.ai,.psd"
              className="hidden"
            />
            
            {uploadedFile ? (
              <div className="w-full max-w-md">
                <div className="relative rounded-2xl overflow-hidden border-2 border-copper bg-copper/10">
                  <div className="aspect-video flex items-center justify-center">
                    {uploadedFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Uploaded design"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <Image size={48} className="mx-auto text-copper mb-4" />
                        <p className="text-concrete font-medium">{uploadedFile.name}</p>
                        <p className="text-ash text-sm mt-1">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-copper flex items-center justify-center">
                      <Check size={16} className="text-midnight" />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full py-3 rounded-xl border border-ash/30 text-concrete hover:border-copper/50 transition-colors"
                >
                  Replace File
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-md aspect-video rounded-2xl border-2 border-dashed border-ash/30 hover:border-copper/50 transition-all flex flex-col items-center justify-center gap-4 bg-midnight-light/50"
              >
                <div className="w-16 h-16 rounded-full bg-midnight border border-ash/20 flex items-center justify-center">
                  <Upload size={28} className="text-copper" />
                </div>
                <div className="text-center">
                  <p className="text-concrete font-medium">Drag & drop or click to upload</p>
                  <p className="text-ash text-sm mt-1">Supports PNG, JPG, PDF, AI, PSD</p>
                </div>
              </button>
            )}

            {/* AI Suggestion */}
            <div className="mt-8 p-4 rounded-xl bg-midnight-light border border-ash/20 max-w-md w-full">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-copper/20 flex items-center justify-center flex-shrink-0">
                  <Wand2 size={18} className="text-copper" />
                </div>
                <div>
                  <h4 className="font-medium text-concrete">Need design help?</h4>
                  <p className="text-sm text-ash mt-1">
                    Upload your logo and we'll create professional packaging designs for you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-12 max-w-md mx-auto w-full">
        <Button variant="outline" size="xl" onClick={onBack} className="flex-1">
          <ArrowLeft size={20} />
          Back
        </Button>
        <Button
          variant="copper"
          size="xl"
          className="flex-1 group"
          onClick={handleContinue}
          disabled={!isValid}
        >
          {currentIndex < totalProducts - 1 ? "Next Product" : "Continue"}
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
