import { Link, useLocation } from "react-router-dom";
import { NavBar, eternaNavItems } from "@/components/ui/tubelight-navbar";
import { FloatingIcons } from "@/components/ui/floating-icons";

export const Header = () => {
  const location = useLocation();
  const isOnboarding = location.pathname === "/start-project";

  return (
    <>
      {/* Fixed Logo - Top Left - Only show on onboarding */}
      {isOnboarding && (
        <div className="fixed top-6 left-6 md:left-8 z-50">
          <Link to="/" className="group">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-concrete transition-colors duration-300 group-hover:text-copper">
              ETERNA
            </span>
          </Link>
        </div>
      )}

      {/* Centered Tubelight Navbar */}
      <NavBar items={eternaNavItems} />

      {/* Floating Icons - Top Right */}
      <FloatingIcons />
    </>
  );
};
