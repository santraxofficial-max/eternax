"use client";

import { cn } from "@/lib/utils";
import {
    Palette,
    Leaf,
    Factory,
    Shield,
    Zap,
    Users,
} from "lucide-react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    rowSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

const itemsSample: BentoItem[] = [
    {
        title: "Custom Food Packaging Design",
        meta: "From concept to shelf",
        description: "Complete packaging solutions tailored for food brands. We design packaging that protects products while telling your unique story.",
        icon: <Palette className="w-5 h-5 text-ash-dark" />,
        status: "Live",
        tags: ["Design", "Branding", "Food-Safe"],
        colSpan: 2,
        rowSpan: 1,
        hasPersistentHover: true,
    },
    {
        title: "Sustainable Materials",
        meta: "Planet-friendly",
        description: "Biodegradable, recyclable materials that maintain food safety while reducing environmental impact.",
        icon: <Leaf className="w-5 h-5 text-ash-dark" />,
        status: "Premium",
        tags: ["Eco-Friendly", "Biodegradable"],
    },
    {
        title: "Direct Manufacturing",
        meta: "No middlemen",
        description: "We manufacture in-house, ensuring quality control, competitive pricing, and faster turnaround times.",
        icon: <Factory className="w-5 h-5 text-ash-dark" />,
        tags: ["Manufacturing", "Quality"],
    },
    {
        title: "Food Safety Compliance",
        meta: "FDA certified",
        description: "All packaging meets stringent food safety regulations and international quality standards.",
        icon: <Shield className="w-5 h-5 text-ash-dark" />,
        status: "Certified",
        tags: ["FDA", "Safety", "Compliance"],
    },
    {
        title: "Rapid Prototyping",
        meta: "Quick iterations",
        description: "Fast-track your packaging development with our rapid prototyping and testing services.",
        icon: <Zap className="w-5 h-5 text-ash-dark" />,
        status: "Express",
        tags: ["Prototyping", "Testing"],
    },
    {
        title: "Brand Partnership",
        meta: "End-to-end support",
        description: "From initial consultation to market launch, we're your dedicated packaging partner.",
        icon: <Users className="w-5 h-5 text-ash-dark" />,
        tags: ["Consulting", "Support"],
    },
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-xl overflow-hidden transition-all duration-700 ease-out",
                        "border border-ash/20 bg-midnight hover:bg-midnight-light",
                        "hover:shadow-copper hover:border-copper/40",
                        "hover:scale-[1.02] hover:-translate-y-1 will-change-transform",
                        "cursor-pointer",
                        item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                        item.rowSpan === 2 ? "md:row-span-2" : "md:row-span-1",
                        {
                            "shadow-copper border-copper/40 scale-[1.02] -translate-y-1 bg-midnight-light":
                                item.hasPersistentHover,
                        }
                    )}
                    style={{
                        gridRow: item.rowSpan === 2 ? "span 2" : "span 1",
                        gridColumn: item.colSpan === 2 ? "span 2" : "span 1"
                    }}
                >
                    {/* Animated copper gradient background */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-xl transition-all duration-700",
                            "bg-gradient-to-br from-copper/10 via-copper/20 to-copper/10",
                            item.hasPersistentHover
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                        )}
                    />

                    {/* Animated copper border glow */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-xl transition-all duration-700",
                            "ring-1 ring-copper/20",
                            item.hasPersistentHover
                                ? "ring-copper/60"
                                : "group-hover:ring-copper/60"
                        )}
                    />

                    <div className="relative flex flex-col h-full">
                        {/* Header with icon and status */}
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700",
                                "bg-ash/15 border border-ash/30",
                                item.hasPersistentHover
                                    ? "bg-copper/20 border-copper/50 scale-110"
                                    : "group-hover:bg-copper/20 group-hover:border-copper/50 group-hover:scale-110"
                            )}>
                                {item.icon}
                            </div>
                            {item.status && (
                                <span className={cn(
                                    "text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-700",
                                    "bg-ash/10 border border-ash/20 text-ash-dark",
                                    item.hasPersistentHover
                                        ? "bg-copper/20 border-copper/40 text-copper scale-105"
                                        : "group-hover:bg-copper/20 group-hover:border-copper/40 group-hover:text-copper group-hover:scale-105",
                                    item.status === "Live" && "bg-copper/20 border-copper/40 text-copper"
                                )}>
                                    {item.status}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="font-bold text-concrete text-lg leading-tight mb-1">
                                    {item.title}
                                </h3>
                                <span className="text-xs text-ash-dark font-medium uppercase tracking-wide">
                                    {item.meta}
                                </span>
                            </div>
                            <p className="text-sm text-concrete-muted leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {/* Footer with tags and CTA */}
                        <div className="flex items-end justify-between mt-6">
                            <div className="flex flex-wrap gap-2">
                                {item.tags?.slice(0, 2).map((tag, i) => (
                                    <span
                                        key={i}
                                        className={cn(
                                            "text-xs font-medium px-2 py-1 rounded-md transition-all duration-500",
                                            "bg-ash/10 border border-ash/20 text-ash-dark",
                                            item.hasPersistentHover
                                                ? "bg-copper/15 border-copper/30 text-copper"
                                                : "hover:bg-copper/15 hover:border-copper/30 hover:text-copper"
                                        )}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className={cn(
                                "text-xs font-semibold transition-all duration-700 transform",
                                "text-ash-dark opacity-0 translate-x-2",
                                item.hasPersistentHover
                                    ? "opacity-100 translate-x-0 text-copper"
                                    : "group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-copper"
                            )}>
                                {item.cta || "Learn More →"}
                            </span>
                        </div>
                    </div>

                    {/* Subtle pattern overlay */}
                    <div className={cn(
                        "absolute inset-0 opacity-[0.02] transition-opacity duration-700",
                        item.hasPersistentHover
                            ? "opacity-[0.05]"
                            : "group-hover:opacity-[0.05]"
                    )}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { BentoGrid }
