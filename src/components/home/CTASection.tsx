import { SecureMessageGateway } from "@/components/ui/secure-message-gateway";

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="section-container relative z-10">
        <SecureMessageGateway />
      </div>
    </section>
  );
};
