import { Link } from "react-router-dom";
import { NavBar, eternaNavItems } from "@/components/ui/tubelight-navbar";

export const Header = () => {
  return (
    <>
      {/* Fixed Logo - Top Left */}
      <div className="fixed top-6 left-6 md:left-8 z-50">
        <Link to="/" className="group">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-concrete transition-colors duration-300 group-hover:text-copper">
            ETERNA
          </span>
        </Link>
      </div>
      
      {/* Centered Tubelight Navbar */}
      <NavBar items={eternaNavItems} />
    </>
  );
};
