import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { OnboardingData } from "@/types/onboarding";

interface LeadCaptureStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export const LeadCaptureStep = ({ data, updateData, onBack }: LeadCaptureStepProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const updateContact = (field: string, value: string) => {
    updateData({
      contact: { ...data.contact, [field]: value },
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.contact.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!data.contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!data.contact.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    
    if (!data.contact.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request submitted!",
      description: "Our team will reach out within 48 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-copper to-copper-dark flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={48} className="text-background" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            You're all set, {data.contact.fullName.split(" ")[0]}!
          </h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for choosing Eterna. Our packaging specialists will review your
            project and reach out within 48 hours with a custom proposal.
          </p>
          
          <div className="card-premium p-6 mt-8">
            <p className="text-sm text-muted-foreground mb-2">
              What happens next?
            </p>
            <ul className="space-y-3 text-left">
              {[
                "Our team reviews your packaging requirements",
                "We prepare a detailed quote with material samples",
                "A packaging specialist schedules a call with you",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="w-6 h-6 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0 text-xs text-copper font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Almost there! Let's connect.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Share your contact details so our team can prepare your custom quote.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-premium p-8"
      >
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <User size={16} className="text-copper" />
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Your full name"
              value={data.contact.fullName}
              onChange={(e) => updateContact("fullName", e.target.value)}
              className="h-12 bg-midnight border-ash/30 text-foreground placeholder:text-ash focus:border-copper"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Mail size={16} className="text-copper" />
              Business Email
            </label>
            <Input
              type="email"
              placeholder="you@company.com"
              value={data.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              className="h-12 bg-midnight border-ash/30 text-foreground placeholder:text-ash focus:border-copper"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Phone size={16} className="text-copper" />
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={data.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              className="h-12 bg-midnight border-ash/30 text-foreground placeholder:text-ash focus:border-copper"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <MapPin size={16} className="text-copper" />
              City
            </label>
            <Input
              type="text"
              placeholder="Your city"
              value={data.contact.city}
              onChange={(e) => updateContact("city", e.target.value)}
              className="h-12 bg-midnight border-ash/30 text-foreground placeholder:text-ash focus:border-copper"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-destructive">{errors.city}</p>
            )}
          </div>
        </div>

        <Button
          variant="copper"
          size="xl"
          className="w-full mt-8 group"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            "Submitting..."
          ) : (
            <>
              Submit & Get Quote
              <Send size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </motion.div>

      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground"
        >
          <ArrowLeft size={18} />
          Back to summary
        </Button>
      </div>
    </div>
  );
};
