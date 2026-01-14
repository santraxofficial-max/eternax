export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  materials: string[];
  minMOQ: number;
}

export interface DesignConfig {
  type: "template" | "custom";
  templateId?: string;
  customDesignUrl?: string;
  logoUrl?: string;
  brandName?: string;
}

export interface ProductConfig {
  productId: string;
  design: DesignConfig;
  moq: number;
  quality: "standard" | "premium" | "luxury";
  estimatedPrice?: number;
}

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface OnboardingData {
  industry: string;
  selectedProducts: string[];
  productConfigs: Record<string, ProductConfig>;
  address: AddressInfo;
  contact: ContactInfo;
}

// Dummy products for Food & Beverage industry
export const dummyProducts: ProductItem[] = [
  {
    id: "meal-box-small",
    name: "Meal Box - Small",
    description: "Compact single-portion meal container, perfect for snacks and light meals. Leak-resistant design.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    category: "Meal Boxes",
    materials: ["Sugarcane Bagasse", "Kraft Paper"],
    minMOQ: 500,
  },
  {
    id: "meal-box-large",
    name: "Meal Box - Large",
    description: "Spacious meal container ideal for full-course meals. Available with compartments.",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "Meal Boxes",
    materials: ["Sugarcane Bagasse", "Bamboo Fiber"],
    minMOQ: 500,
  },
  {
    id: "bowl-round",
    name: "Round Bowl",
    description: "Versatile round bowl for soups, salads, and rice dishes. Microwave-safe options available.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    category: "Bowls",
    materials: ["Bamboo Fiber", "Cornstarch Blend"],
    minMOQ: 1000,
  },
  {
    id: "cup-hot",
    name: "Hot Beverage Cup",
    description: "Double-walled insulated cup for coffee and hot beverages. Custom sleeve printing available.",
    image: "https://images.unsplash.com/photo-1497515114889-3f6b3686c61f?w=400&h=300&fit=crop",
    category: "Cups",
    materials: ["Kraft Paper", "PLA Lining"],
    minMOQ: 1000,
  },
  {
    id: "cup-cold",
    name: "Cold Beverage Cup",
    description: "Crystal-clear cups for smoothies, juices, and iced drinks. Comes with dome or flat lids.",
    image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400&h=300&fit=crop",
    category: "Cups",
    materials: ["PLA Bio-plastic", "Cornstarch"],
    minMOQ: 1000,
  },
  {
    id: "plate-round",
    name: "Round Plate",
    description: "Sturdy round plates for all meal types. Grease and cut-resistant surface.",
    image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=400&h=300&fit=crop",
    category: "Plates",
    materials: ["Sugarcane Bagasse", "Areca Palm"],
    minMOQ: 500,
  },
  {
    id: "cutlery-set",
    name: "Cutlery Set",
    description: "Complete set with fork, knife, and spoon. Individually wrapped options available.",
    image: "https://images.unsplash.com/photo-1586191582174-77eb50fbf80e?w=400&h=300&fit=crop",
    category: "Cutlery",
    materials: ["Birch Wood", "Bamboo", "CPLA"],
    minMOQ: 2000,
  },
  {
    id: "carry-bag",
    name: "Carry Bag",
    description: "Reinforced paper bags with twisted handles. Custom printing on all sides.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Bags",
    materials: ["Kraft Paper", "Recycled Paper"],
    minMOQ: 500,
  },
  {
    id: "sauce-container",
    name: "Sauce Container",
    description: "Small leak-proof containers for sauces, dressings, and condiments. Stackable design.",
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=300&fit=crop",
    category: "Containers",
    materials: ["PLA", "Sugarcane Bagasse"],
    minMOQ: 2000,
  },
];

// Design templates
export const designTemplates = [
  { id: "minimal", name: "Minimal", preview: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&h=200&fit=crop" },
  { id: "bold", name: "Bold & Modern", preview: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
  { id: "elegant", name: "Elegant", preview: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=200&h=200&fit=crop" },
  { id: "eco", name: "Eco Natural", preview: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=200&h=200&fit=crop" },
];

// Quality tiers with pricing multipliers
export const qualityTiers = {
  standard: { name: "Standard", multiplier: 1, description: "Reliable quality for everyday use" },
  premium: { name: "Premium", multiplier: 1.4, description: "Enhanced durability and finish" },
  luxury: { name: "Luxury", multiplier: 2, description: "Top-tier materials and craftsmanship" },
};

// Base prices per product (in INR)
export const basePrices: Record<string, number> = {
  "meal-box-small": 8,
  "meal-box-large": 12,
  "bowl-round": 6,
  "cup-hot": 4,
  "cup-cold": 5,
  "plate-round": 5,
  "cutlery-set": 3,
  "carry-bag": 7,
  "sauce-container": 2,
};
