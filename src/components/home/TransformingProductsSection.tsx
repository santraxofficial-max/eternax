import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Search, ChevronDown, Package, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IndustryIcons } from "@/components/ui/industry-icons";

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType;
  active: boolean;
}

const industries: Industry[] = [
  { id: "food-beverage", name: "Food & Beverage", icon: IndustryIcons["Food & Beverage"], active: true },
  { id: "fmcg", name: "FMCG / D2C Consumer Brands", icon: IndustryIcons["FMCG / D2C Consumer Brands"], active: true },
  { id: "hospitality", name: "Hospitality", icon: IndustryIcons["Hospitality"], active: true },
  { id: "cosmetics", name: "Cosmetics & Personal Care", icon: IndustryIcons["Cosmetics & Personal Care"], active: true },
  { id: "pharmaceutical", name: "Pharmaceutical & Wellness", icon: IndustryIcons["Pharmaceutical & Wellness"], active: true },
  { id: "luxury", name: "Luxury & Lifestyle Brands", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "ecommerce", name: "E-commerce & Logistics", icon: IndustryIcons["E-commerce & Logistics"], active: true },
  { id: "retail", name: "Retail Chains & Supermarkets", icon: IndustryIcons["Retail Chains & Supermarkets"], active: true },
  { id: "corporate", name: "Corporate & B2B Gifting", icon: IndustryIcons["Corporate & B2B Gifting"], active: true },
  { id: "agriculture", name: "Agriculture & Agri-tech", icon: IndustryIcons["Agriculture & Agri-tech"], active: true },
  { id: "healthcare", name: "Healthcare & Medical (Non-invasive)", icon: IndustryIcons["Healthcare & Medical (Non-invasive)"], active: true },
  { id: "electronics", name: "Electronics & Hardware", icon: IndustryIcons["Electronics & Hardware"], active: true },
];

// Mock products data - replace with actual data later
const mockProducts = [
  {
    id: "1",
    name: "Eco-Friendly Takeout Boxes",
    description: "Sustainable cardboard boxes perfect for food delivery",
    industries: ["food-beverage", "fmcg"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "2",
    name: "Biodegradable Retail Bags",
    description: "Sturdy shopping bags made from recycled materials",
    industries: ["retail", "ecommerce", "fmcg"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Luxury Product Packaging",
    description: "Elegant boxes for premium brands and products",
    industries: ["luxury", "cosmetics", "corporate"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "4",
    name: "Medical Supply Containers",
    description: "Sterile and durable packaging for healthcare products",
    industries: ["healthcare", "pharmaceutical"],
    image: "/api/placeholder/300/200"
  }
];

export const TransformingProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-copper/20 text-copper font-medium">
          {part}
        </span>
      ) : part
    );
  };

  const filteredProducts = useMemo(() => {
    if (!selectedIndustry) return [];
    return mockProducts.filter(product =>
      product.industries.includes(selectedIndustry.id)
    );
  }, [selectedIndustry]);

  return (
    <section ref={ref} className="py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-concrete mb-4">
            Transforming Products for Your Business
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Industry Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-concrete mb-2">
                Find Your Perfect Packaging Solution
              </h3>
              <p className="text-ash text-sm">
                Select your industry to discover tailored sustainable packaging options
              </p>
            </div>

            {/* Google-style Search Bar */}
            <div className="relative">
              <div
                className="relative bg-midnight-light border border-ash/20 rounded-xl overflow-hidden hover:border-ash/30 transition-colors cursor-text"
                onClick={(e) => {
                  // Focus the input when clicking anywhere on the search bar
                  const input = e.currentTarget.querySelector('input');
                  if (input) input.focus();
                }}
              >
                {/* Search Input - Always Visible */}
                <div className="flex items-center">
                  <div className="flex-1 flex items-center px-4 py-3">
                    <Search className="w-4 h-4 text-ash flex-shrink-0 mr-3" />
                    <input
                      type="text"
                      placeholder={selectedIndustry ? `${selectedIndustry.name} - Click to search or change...` : "Search for your industry..."}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true); // Open dropdown when typing
                      }}
                      onFocus={() => setSearchOpen(true)}
                      onBlur={() => {
                        // Delay closing to allow clicking on dropdown items
                        setTimeout(() => setSearchOpen(false), 200);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setSearchQuery("");
                          setSearchOpen(false);
                        } else if (e.key === 'Enter' && searchQuery.trim()) {
                          // Select first matching industry on Enter
                          const filtered = industries.filter(industry =>
                            industry.active && industry.name.toLowerCase().includes(searchQuery.toLowerCase())
                          );
                          if (filtered.length > 0) {
                            setSelectedIndustry(filtered[0]);
                            setSearchQuery("");
                            setSearchOpen(false);
                          }
                        }
                      }}
                      className="flex-1 bg-transparent border-0 outline-none text-concrete placeholder-ash focus:ring-0 focus:outline-none"
                    />
                  </div>

                  {/* Industry Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the search bar click
                      setSearchOpen(!searchOpen);
                    }}
                    className="h-10 w-10 rounded-lg bg-copper hover:bg-copper/90 text-midnight flex-shrink-0 mr-2"
                  >
                    <Building2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Dropdown Results */}
                {searchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-midnight-light border border-ash/20 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {!searchQuery && (
                      <div className="p-3 border-b border-ash/10">
                        <p className="text-xs text-ash font-medium">All Industries</p>
                      </div>
                    )}
                    <div className="p-2">
                      {(() => {
                        const filteredIndustries = industries
                          .filter(industry => industry.active)
                          .filter(industry => {
                            if (!searchQuery.trim()) return true;
                            const query = searchQuery.toLowerCase();
                            const name = industry.name.toLowerCase();
                            const id = industry.id.toLowerCase();

                            // Intelligent word matching
                            const nameWords = name.split(/[\s&-]+/);
                            const queryWords = query.split(/\s+/);

                            // Check if any query word matches any industry word
                            return queryWords.some(queryWord =>
                              nameWords.some(nameWord =>
                                nameWord.startsWith(queryWord) || nameWord.includes(queryWord)
                              ) || name.includes(queryWord) || id.includes(queryWord)
                            );
                          })
                          .sort((a, b) => {
                            // Sort by relevance: exact matches first, then starts with, then contains
                            const query = searchQuery.toLowerCase();
                            const aName = a.name.toLowerCase();
                            const bName = b.name.toLowerCase();

                            const aStartsWith = aName.startsWith(query);
                            const bStartsWith = bName.startsWith(query);
                            const aContains = aName.includes(query);
                            const bContains = bName.includes(query);

                            // Prioritize exact word matches
                            const aWordMatch = aName.split(/[\s&-]+/).some(word => word.startsWith(query));
                            const bWordMatch = bName.split(/[\s&-]+/).some(word => word.startsWith(query));

                            if (aWordMatch && !bWordMatch) return -1;
                            if (!aWordMatch && bWordMatch) return 1;

                            if (aStartsWith && !bStartsWith) return -1;
                            if (!aStartsWith && bStartsWith) return 1;
                            if (aContains && !bContains) return -1;
                            if (!aContains && bContains) return 1;

                            return a.name.localeCompare(b.name);
                          });

                        return filteredIndustries.length > 0 ? (
                          <>
                            {searchQuery && (
                              <div className="px-3 py-2 text-xs text-ash border-b border-ash/10 mb-2">
                                {filteredIndustries.length} industrie{filteredIndustries.length === 1 ? 'y' : 's'} found
                              </div>
                            )}
                            <div className="space-y-1">
                              {filteredIndustries.slice(0, 10).map((industry) => (
                                <button
                                  key={industry.id}
                                  onClick={() => {
                                    setSelectedIndustry(industry);
                                    setSearchQuery("");
                                    setSearchOpen(false);
                                  }}
                                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-left hover:bg-midnight-light/50 transition-colors group ${
                                    selectedIndustry?.id === industry.id ? "bg-ash/10 border border-ash/20" : ""
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                    selectedIndustry?.id === industry.id
                                      ? "bg-copper/20"
                                      : "bg-midnight-light group-hover:bg-copper/10"
                                  }`}>
                                    <industry.icon />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-sm truncate ${
                                      selectedIndustry?.id === industry.id ? "text-concrete" : "text-concrete"
                                    }`}>
                                      {searchQuery.trim() ? highlightMatch(industry.name, searchQuery) : industry.name}
                                    </p>
                                    <p className="text-xs text-ash truncate mt-0.5">
                                      Specialized packaging solutions
                                    </p>
                                  </div>
                                  {selectedIndustry?.id === industry.id && (
                                    <div className="w-2 h-2 bg-copper rounded-full flex-shrink-0"></div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <Search className="w-8 h-8 text-ash mx-auto mb-3" />
                            <p className="text-sm text-ash">
                              No industries found matching "{searchQuery}"
                            </p>
                            <p className="text-xs text-ash/70 mt-1">
                              Try different keywords or browse all industries
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Products Display */}
          {selectedIndustry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-copper/10 border border-copper/20 mb-4">
                  <selectedIndustry.icon />
                  <span className="text-sm font-medium text-copper">
                    {selectedIndustry.name}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-concrete mb-2">
                  Tailored Packaging Solutions
                </h3>
                <p className="text-ash">
                  {filteredProducts.length} specialized {filteredProducts.length === 1 ? 'product' : 'products'} for your industry
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative bg-gradient-to-br from-midnight-light to-midnight-light/80 rounded-2xl border border-ash/20 p-6 hover:border-copper/30 hover:shadow-lg hover:shadow-copper/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-copper/20 to-copper/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Package className="w-7 h-7 text-copper" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="font-semibold text-concrete text-lg mb-1 group-hover:text-copper transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-sm text-ash leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-400 font-medium">Sustainable</span>
                            </div>
                            <Button
                              variant="copper"
                              size="sm"
                              className="group/btn"
                            >
                              Explore
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-copper/0 to-copper/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 bg-ash/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Package className="w-8 h-8 text-ash" />
                  </div>
                  <h4 className="text-lg font-semibold text-concrete mb-2">
                    Coming Soon for {selectedIndustry.name}
                  </h4>
                  <p className="text-ash max-w-md mx-auto leading-relaxed">
                    We're currently developing specialized packaging solutions for your industry.
                    Our team is working on products that perfectly match your business needs.
                  </p>
                  <Button variant="outline" className="mt-6 border-ash/20 text-ash hover:border-copper hover:text-copper">
                    Get Notified When Available
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
