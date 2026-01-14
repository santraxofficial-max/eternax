import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Shield, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { dummyProducts, ProductConfig, ContactInfo } from "@/types/onboarding";

interface CheckoutStepProps {
  selectedProducts: string[];
  productConfigs: Record<string, ProductConfig>;
  contact: ContactInfo;
  onUpdateContact: (contact: Partial<ContactInfo>) => void;
  onBack: () => void;
}

export const CheckoutStep = ({
  selectedProducts,
  productConfigs,
  contact,
  onUpdateContact,
  onBack,
}: CheckoutStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = selectedProducts.reduce((sum, productId) => {
    return sum + (productConfigs[productId]?.estimatedPrice || 0);
  }, 0);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!contact.fullName.trim()) newErrors.fullName = "Name is required";
    if (!contact.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contact.email)) newErrors.email = "Invalid email format";
    if (!contact.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Order submitted successfully!");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 rounded-full bg-copper flex items-center justify-center mb-8"
        >
          <Check size={48} className="text-midnight" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-concrete">
            Order Confirmed!
          </h1>
          <p className="mt-4 text-lg text-concrete-muted">
            Thank you for choosing Eterna. Our team will review your order and 
            contact you within 24-48 hours with final pricing and next steps.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-midnight-light border border-ash/20">
            <h3 className="font-semibold text-concrete mb-4">What's Next?</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-copper text-xs font-bold">1</span>
                </div>
                <p className="text-concrete-muted">Design review by our packaging experts</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-copper text-xs font-bold">2</span>
                </div>
                <p className="text-concrete-muted">Final quote with production timeline</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-copper text-xs font-bold">3</span>
                </div>
                <p className="text-concrete-muted">Sample approval before bulk production</p>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a href="/">
              <Button variant="copper" size="xl">
                Back to Home
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl mx-auto"
      >
        <span className="text-copper text-sm font-medium uppercase tracking-wider">Final Step</span>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-concrete">
          Complete Your Order
        </h1>
        <p className="mt-4 text-concrete-muted">
          Enter your contact details to submit your order for review.
        </p>
      </motion.div>

      <div className="flex-1 max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-midnight-light border border-ash/20">
            <h3 className="font-semibold text-concrete mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-ash mb-2">Full Name *</label>
                <Input
                  placeholder="Your full name"
                  value={contact.fullName}
                  onChange={(e) => {
                    onUpdateContact({ fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  className={`h-12 bg-midnight border-ash/30 text-concrete placeholder:text-ash ${
                    errors.fullName ? "border-destructive" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-ash mb-2">Email Address *</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={contact.email}
                  onChange={(e) => {
                    onUpdateContact({ email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`h-12 bg-midnight border-ash/30 text-concrete placeholder:text-ash ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-ash mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contact.phone}
                  onChange={(e) => {
                    onUpdateContact({ phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: "" });
                  }}
                  className={`h-12 bg-midnight border-ash/30 text-concrete placeholder:text-ash ${
                    errors.phone ? "border-destructive" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-midnight border border-ash/20">
            <Shield size={18} className="text-copper flex-shrink-0 mt-0.5" />
            <p className="text-sm text-concrete-muted">
              Your information is secure and will only be used to process your order.
            </p>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 rounded-2xl bg-midnight-light border border-ash/20 sticky top-24">
            <h3 className="font-semibold text-concrete mb-6">Order Summary</h3>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {selectedProducts.map((productId) => {
                const product = dummyProducts.find((p) => p.id === productId);
                const config = productConfigs[productId];

                return (
                  <div key={productId} className="flex gap-3 pb-4 border-b border-ash/10 last:border-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-concrete truncate">{product?.name}</h4>
                      <p className="text-xs text-ash">{config?.moq?.toLocaleString()} units</p>
                    </div>
                    <span className="text-copper font-medium">₹{config?.estimatedPrice?.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-ash/20 pt-4 mt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-concrete">Total</span>
                <span className="text-2xl font-bold text-copper">₹{totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-ash mt-1">*Final price after design review</p>
            </div>

            <Button
              variant="copper"
              size="xl"
              className="w-full mt-6"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Submit Order
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full mt-3"
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ArrowLeft size={18} />
              Back to Review
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
