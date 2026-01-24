"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Users, DollarSign, Phone, Mail, Globe } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

interface BusinessInfoStepProps {
  onContinue: () => void;
}

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ onContinue }) => {
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    businessType: '',
    contactPerson: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['companyName', 'contactPerson', 'phone', 'email', 'pincode'];
    const isValid = requiredFields.every(field => businessInfo[field as keyof typeof businessInfo].trim());

    if (isValid) {
      console.log('Business info submitted:', businessInfo);
      onContinue();
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-concrete mb-6">
            Tell us about your business
          </h2>
          <p className="text-concrete-muted max-w-2xl mx-auto text-lg">
            Help us understand your business better so we can provide you with the most accurate pricing and tailored solutions.
          </p>
        </motion.div>

        {/* Business Information Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-concrete mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-copper" />
                Company Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={businessInfo.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Industry
              </label>
              <select
                value={businessInfo.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
              >
                <option value="">Select your industry</option>
                <option value="fashion">Luxury Apparel</option>
                <option value="retail">Retail</option>
                <option value="ecommerce">E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Business Type
              </label>
              <select
                value={businessInfo.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
              >
                <option value="">Select business type</option>
                <option value="startup">Startup</option>
                <option value="sme">Small & Medium Enterprise</option>
                <option value="corporate">Corporate</option>
                <option value="individual">Individual Entrepreneur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-copper" />
                Number of Employees
              </label>
              <select
                value={businessInfo.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
              >
                <option value="">Select employee count</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-copper" />
                Annual Revenue
              </label>
              <select
                value={businessInfo.annualRevenue}
                onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
              >
                <option value="">Select annual revenue</option>
                <option value="under-1cr">Under ₹1 Crore</option>
                <option value="1-5cr">₹1-5 Crore</option>
                <option value="5-25cr">₹5-25 Crore</option>
                <option value="25-100cr">₹25-100 Crore</option>
                <option value="above-100cr">Above ₹100 Crore</option>
              </select>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-semibold text-concrete mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-copper" />
                Contact Information
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Contact Person *
              </label>
              <input
                type="text"
                value={businessInfo.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={businessInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-copper" />
                Website
              </label>
              <input
                type="url"
                value={businessInfo.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="https://yourwebsite.com"
              />
            </div>

            {/* Address Information */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-semibold text-concrete mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-copper" />
                Business Address
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-concrete mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={businessInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="Street address, building, landmark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                City
              </label>
              <input
                type="text"
                value={businessInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                State
              </label>
              <input
                type="text"
                value={businessInfo.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                PIN Code *
              </label>
              <input
                type="text"
                value={businessInfo.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="PIN Code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-concrete mb-2">
                GST Number (Optional)
              </label>
              <input
                type="text"
                value={businessInfo.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-copper focus:border-transparent transition-all duration-300"
                placeholder="GST Number"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <ShinyButton onClick={handleSubmit} className="px-10 py-4 text-lg font-semibold">
              Continue to Final Quote →
            </ShinyButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};



