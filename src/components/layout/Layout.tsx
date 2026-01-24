import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CommitsGrid } from "@/components/ui/commits-grid";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideHeader?: boolean;
  fullHeight?: boolean;
  disableGridBackground?: boolean;
}

export const Layout = ({ children, hideFooter = false, hideHeader = false, fullHeight = false, disableGridBackground = false }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col relative ${disableGridBackground ? 'bg-black' : ''}`}>
      {!hideHeader && <Header />}
      <main className={`flex-1 ${fullHeight ? 'pt-0 pb-0' : 'pt-0 sm:pt-24 pb-20 sm:pb-0'} relative z-10`}>{children}</main>
      {!hideFooter && <Footer />}
      {/* Commits Grid Animation - Below Footer */}
      {!fullHeight && (
        <div className="flex justify-center py-8 px-4">
          <CommitsGrid text="ETERNA" />
        </div>
      )}
    </div>
  );
};
