"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import rakshaImage from "@/assets/team/raksha-h.png";

/* ---------- Types ---------- */
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

/* ---------- Data ---------- */
const TEAM: TeamMember[] = [
  {
    id: "01",
    name: "Raksha H",
    role: "Chief Product Officer (CPO)",
    image: rakshaImage,
  },
  {
    id: "02",
    name: "Rajeev Shukla",
    role: "Chief Technology Officer (CTO)",
    // Placeholder until image is provided
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
];

/* ---------- Main Component ---------- */
export const TeamSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse position for the floating card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the floating card
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <section
      className="relative min-h-screen bg-background overflow-hidden py-24"
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-midnight-light/20 to-background" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(24, 70%, 50%, 0.05), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-copper text-sm tracking-widest uppercase mb-4"
            >
              Leadership
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-concrete tracking-tight"
            >
              Designing the Future
              <br />
              of Food Packaging
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-concrete-muted tracking-widest uppercase"
          >
            Meet Our Team
          </motion.p>
        </div>

        {/* The List */}
        <div className="relative">
          {TEAM.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: Global Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-50"
          style={{ x: cursorX, y: cursorY }}
        >
          <AnimatePresence>
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="relative h-72 w-56 overflow-hidden rounded-2xl border border-ash-dark/30 shadow-lg"
              >
                <img
                  src={TEAM.find((t) => t.id === activeId)?.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                {/* Overlay Metadata */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-copper" />
                    <span className="text-xs text-concrete-muted">Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

/* ---------- Row Component ---------- */
function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : data.id)}
      className={`group relative border-t border-ash-dark/30 transition-colors duration-500 last:border-b ${
        isMobile ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div
        className={`flex items-center justify-between py-8 md:py-10 transition-opacity duration-500 ${
          isDimmed ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Name & Index Section */}
        <div className="flex items-center gap-6 md:gap-10">
          <span className="text-sm text-copper font-medium">
            0{index + 1}
          </span>
          <h3
            className={`text-2xl md:text-4xl lg:text-5xl font-light tracking-tight transition-colors duration-300 ${
              isActive ? "text-concrete" : "text-concrete-muted"
            } group-hover:text-concrete`}
          >
            {data.name}
          </h3>
        </div>

        {/* Role & Icon Section */}
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:block text-sm text-concrete-muted tracking-wide">
            {data.role}
          </span>

          {/* Mobile Toggle Icon */}
          <div className="md:hidden text-copper">
            {isActive ? <Minus size={20} /> : <Plus size={20} />}
          </div>

          {/* Desktop Arrow */}
          <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-ash-dark/30 text-copper transition-all duration-300 group-hover:border-copper group-hover:bg-copper/10">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion Image */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              <div className="relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl">
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                  <p className="text-sm text-concrete-muted mb-2">{data.role}</p>
                  <button className="inline-flex items-center gap-2 text-concrete text-sm border border-copper rounded-full px-4 py-2 bg-midnight-light/50 hover:bg-midnight-light transition-colors">
                    View Profile
                    <ArrowUpRight size={14} className="text-copper" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
