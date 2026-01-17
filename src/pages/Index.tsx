import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustrySection } from "@/components/home/IndustrySection";
import { TheProblemSection } from "@/components/home/TheProblemSection";
import { TheSolutionSection } from "@/components/home/TheSolutionSection";
import { OurProcedureSection } from "@/components/home/OurProcedureSection";
import { TransformingProductsSection } from "@/components/home/TransformingProductsSection";
import { PackagingQualitySection } from "@/components/home/PackagingQualitySection";
import { default as DemoComponents } from "@/components/ui/demo";
import { TeamSection } from "@/components/home/TeamSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <IndustrySection />
      <TheProblemSection />
      <TheSolutionSection />
      <OurProcedureSection />
      <TransformingProductsSection />
      <PackagingQualitySection />
      <DemoComponents.Testimonials />
      <DemoComponents.FAQ />
      <TeamSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
