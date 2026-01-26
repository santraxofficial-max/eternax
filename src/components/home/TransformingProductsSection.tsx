import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Search, ChevronDown, Package, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
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
  { id: "luxury-shirts", name: "Luxury Shirts", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "tailored-suits", name: "Tailored Suits", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "evening-dresses", name: "Evening Dresses", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "designer-outerwear", name: "Designer Outerwear", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "luxury-footwear", name: "Luxury Footwear", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "handbags-accessories", name: "Handbags & Accessories", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "cashmere-knitwear", name: "Cashmere Knitwear", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
  { id: "luxury-lingerie", name: "Luxury Lingerie", icon: IndustryIcons["Luxury & Lifestyle Brands"], active: true },
];

// Mock products data - replace with actual data later
const mockProducts = [
  {
    id: "1",
    name: "Premium Shirt Boxes",
    description: "Crisp-fold boxes with collar protection for luxury shirts and blouses.",
    industries: ["luxury-shirts", "tailored-suits"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "2",
    name: "Couture Gown Packaging",
    description: "Large-format boxes with padding for embellished eveningwear.",
    industries: ["evening-dresses", "designer-outerwear"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Luxury Footwear & Handbag Sets",
    description: "Premium boxes and dust bags for high-end footwear and handbags.",
    industries: ["luxury-footwear", "handbags-accessories"],
    image: "/api/placeholder/300/200"
  },
  {
    id: "4",
    name: "Outerwear Garment Covers",
    description: "Breathable covers that protect coats, cashmere, and statement outerwear.",
    industries: ["designer-outerwear", "cashmere-knitwear"],
    image: "/api/placeholder/300/200"
  }
];

export const TransformingProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Refs for accessibility and focus management
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const industryButtonRef = useRef<HTMLButtonElement>(null);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        industryButtonRef.current &&
        !industryButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
        setIsIndustryDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when dropdown closes
  useEffect(() => {
    if (!isSearchDropdownOpen && !isIndustryDropdownOpen) {
      setSelectedIndex(-1);
    }
  }, [isSearchDropdownOpen, isIndustryDropdownOpen]);

  // Get filtered industries for search
  const getFilteredIndustries = useCallback(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    return industries
      .filter(industry => industry.active)
      .filter(industry => {
        const name = industry.name.toLowerCase();
        const id = industry.id.toLowerCase();

        // Check if query matches any part of the name or id
        return name.includes(query) || id.includes(query) ||
               name.split(/[\s&-]+/).some(word => word.startsWith(query));
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        // Prioritize exact matches and starts-with
        const aStartsWith = aName.startsWith(query);
        const bStartsWith = bName.startsWith(query);
        const aIncludes = aName.includes(query);
        const bIncludes = bName.includes(query);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        if (aIncludes && !bIncludes) return -1;
        if (!aIncludes && bIncludes) return 1;

        return a.name.localeCompare(b.name);
      });
  }, [searchQuery]);

  const filteredIndustries = getFilteredIndustries();
  const allIndustries = industries.filter(industry => industry.active);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentList = isIndustryDropdownOpen ? allIndustries : filteredIndustries;
    const maxIndex = currentList.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < maxIndex ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : maxIndex);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex <= maxIndex) {
          const selectedIndustry = currentList[selectedIndex];
          setSelectedIndustry(selectedIndustry);
          setSearchQuery("");
          setIsSearchDropdownOpen(false);
          setIsIndustryDropdownOpen(false);
          setSelectedIndex(-1);
          searchInputRef.current?.blur();
        }
        break;
      case 'Escape':
        setSearchQuery("");
        setIsSearchDropdownOpen(false);
        setIsIndustryDropdownOpen(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  }, [filteredIndustries, allIndustries, selectedIndex, isIndustryDropdownOpen]);

  // Handle industry selection
  const handleIndustrySelect = useCallback((industry: Industry) => {
    setSelectedIndustry(industry);
    setSearchQuery("");
    setIsSearchDropdownOpen(false);
    setIsIndustryDropdownOpen(false);
    setSelectedIndex(-1);
  }, []);

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
            Luxury Apparel Packaging Solutions
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
                Find Your Luxury Packaging Fit
              </h3>
              <p className="text-ash text-sm">
                Select your luxury apparel category to view tailored packaging concepts
              </p>
            </div>

            {/* Google-style Search Bar */}
            <div className="relative" ref={searchContainerRef}>
              <div
                className="relative bg-white border border-gray-200 rounded-full overflow-hidden hover:shadow-md transition-all duration-200"
                onClick={() => searchInputRef.current?.focus()}
              >
                {/* Search Input - Always Visible */}
                <div className="flex items-center">
                  <div className="flex-1 flex items-center px-6 py-4">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0 mr-4" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={selectedIndustry ? `${selectedIndustry.name} - Click to search or change...` : "Search for a luxury apparel category..."}
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsIndustryDropdownOpen(false);
                        setIsSearchDropdownOpen(true);
                        setSelectedIndex(-1);
                      }}
                      onFocus={() => {
                        if (searchQuery.trim()) {
                          setIsSearchDropdownOpen(true);
                        }
                        setIsIndustryDropdownOpen(false);
                      }}
                      onBlur={() => {
                        // Keep dropdown open briefly to allow clicking
                        setTimeout(() => {
                          if (!isIndustryDropdownOpen) {
                            setIsSearchDropdownOpen(false);
                          }
                        }, 150);
                      }}
                      onKeyDown={handleKeyDown}
                      role="combobox"
                      aria-expanded={isSearchDropdownOpen || isIndustryDropdownOpen}
                      aria-haspopup="listbox"
                      aria-autocomplete="list"
                      aria-activedescendant={selectedIndex >= 0 ? `industry-${selectedIndex}` : undefined}
                      className="flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none text-base"
                    />
                  </div>

                  {/* Industry Button */}
                  <Button
                    ref={industryButtonRef}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsIndustryDropdownOpen(!isIndustryDropdownOpen);
                      setIsSearchDropdownOpen(false);
                      setSelectedIndex(-1);
                      if (!isIndustryDropdownOpen) {
                        setSearchQuery("");
                      }
                    }}
                    aria-label="Browse all categories"
                    className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex-shrink-0 mr-2 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Unified Dropdown - Search Results or All Industries */}
                {(isSearchDropdownOpen || isIndustryDropdownOpen) && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto"
                    role="listbox"
                  >
                    <div className="p-2">
                      {(() => {
                        const displayIndustries = isIndustryDropdownOpen ? allIndustries : filteredIndustries;
                        const showHeader = isIndustryDropdownOpen || (searchQuery.trim() && displayIndustries.length > 0);

                        return displayIndustries.length > 0 ? (
                          <>
                            {showHeader && (
                              <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                <p className="text-sm text-gray-600 font-medium">
                                  {isIndustryDropdownOpen
                                    ? "All Luxury Apparel Categories"
                                    : `${displayIndustries.length} ${displayIndustries.length === 1 ? "category" : "categories"} found`}
                                </p>
                              </div>
                            )}
                            <div className="space-y-1">
                              {displayIndustries.map((industry, index) => (
                                <button
                                  key={industry.id}
                                  id={`industry-${index}`}
                                  onClick={() => handleIndustrySelect(industry)}
                                  role="option"
                                  aria-selected={selectedIndex === index}
                                  className={`flex items-center gap-4 w-full px-4 py-3 text-left transition-colors duration-150 group rounded-lg ${
                                    selectedIndex === index
                                      ? "bg-blue-50 border border-blue-200"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    selectedIndex === index
                                      ? "bg-blue-100"
                                      : "bg-gray-100 group-hover:bg-blue-50"
                                  }`}>
                                    {React.createElement(industry.icon, { className: "w-5 h-5 text-gray-600" } as any)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-base truncate ${
                                      selectedIndex === index ? "text-blue-900" : "text-gray-900"
                                    }`}>
                                      {searchQuery.trim() && !isIndustryDropdownOpen ? highlightMatch(industry.name, searchQuery) : industry.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate mt-0.5">
                                      Luxury apparel packaging concepts
                                    </p>
                                  </div>
                                  {selectedIndex === index && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : searchQuery.trim() && !isIndustryDropdownOpen ? (
                          <div className="text-center py-8">
                            <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">
                              No categories found matching "{searchQuery}"
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Try different keywords or browse all categories
                            </p>
                          </div>
                        ) : null;
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
                  Tailored Packaging Concepts
                </h3>
                <p className="text-ash">
                  {filteredProducts.length} specialized {filteredProducts.length === 1 ? 'product' : 'products'} for your category
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
                            <ShinyButton className="px-4 py-2 text-sm font-medium group/btn">
                              Explore
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                            </ShinyButton>
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
                    We're currently developing specialized packaging solutions for this luxury category.
                    Our team is crafting concepts that match premium apparel expectations.
                  </p>
                  <ShinyButton className="mt-6 px-6 py-3">
                    Get Notified When Available
                  </ShinyButton>
                </motion.div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
