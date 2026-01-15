import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import Component from "@/components/ui/bento-grid-01";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { WhyEternaSection } from "@/components/home/WhyEternaSection";
import { IndustrySection } from "@/components/home/IndustrySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TeamSection } from "@/components/home/TeamSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <Component />
      <WhatWeDoSection />
      <WhyEternaSection />
      <IndustrySection />
      <ProcessSection />
      <TeamSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
