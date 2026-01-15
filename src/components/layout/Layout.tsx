import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SilkBackground } from "@/components/ui/silk-background";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global Silk Background Animation */}
      <SilkBackground />

      <Header />
      <main className="flex-1 pt-0 sm:pt-24 pb-20 sm:pb-0 relative z-10">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
