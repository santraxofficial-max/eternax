import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { WhyEternaSection } from "@/components/home/WhyEternaSection";
import { IndustrySection } from "@/components/home/IndustrySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhatWeDoSection />
      <WhyEternaSection />
      <IndustrySection />
      <ProcessSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
