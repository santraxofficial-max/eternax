"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, Home, Info, Package, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Update active tab based on current route
  useEffect(() => {
    const currentItem = items.find((item) => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname, items]);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6",
        className
      )}
    >
      <div className="flex items-center gap-1 bg-transparent backdrop-blur-sm border border-ash-dark/10 py-1.5 px-1.5 rounded-full">
        {/* Navigation Items Only */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300",
                "text-concrete-muted hover:text-concrete",
                isActive && "text-concrete"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isMobile ? (
                  <Icon size={18} strokeWidth={2.5} />
                ) : (
                  item.name
                )}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 bg-ash-dark/60 rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Tubelight glow effect - copper glow on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-2 bg-copper rounded-full blur-lg opacity-80" />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-copper-glow rounded-full blur-md opacity-60" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-copper-light/40 rounded-full blur-sm" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

// Default navigation items for Eterna - Only 4 core pages
export const eternaNavItems: NavItem[] = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: Info },
  { name: "What We Build", url: "/what-we-build", icon: Package },
  { name: "Materials", url: "/materials", icon: Leaf },
];
