export interface SKUConfig {
  usageType?: string;
  size?: string;
  lidType?: string;
  material?: string;
  quantity?: string;
  design?: string;
  logoFile?: File | null;
  logoPlacement?: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  city: string;
}

export interface OnboardingData {
  businessName: string;
  industry: string;
  selectedSKUs: string[];
  skuConfigs: Record<string, SKUConfig>;
  sustainabilityPriority: string;
  contact: ContactInfo;
}
