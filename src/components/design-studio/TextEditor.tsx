"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
  logoText: string;
  taglineText: string;
  onLogoChange: (text: string) => void;
  onTaglineChange: (text: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  logoText,
  taglineText,
  onLogoChange,
  onTaglineChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-concrete-muted mb-3">
        Text & Branding
      </h3>

      <div className="space-y-2">
        <Label htmlFor="logo-text" className="text-sm text-concrete">
          Brand Name
        </Label>
        <Input
          id="logo-text"
          value={logoText}
          onChange={(e) => onLogoChange(e.target.value)}
          placeholder="Your Brand"
          maxLength={20}
          className="bg-white/5 border-concrete/20 text-concrete placeholder:text-concrete-muted focus:border-copper focus:ring-copper/30"
        />
        <p className="text-xs text-concrete-muted">{logoText.length}/20 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline-text" className="text-sm text-concrete">
          Tagline
        </Label>
        <Input
          id="tagline-text"
          value={taglineText}
          onChange={(e) => onTaglineChange(e.target.value)}
          placeholder="Luxury Packaging"
          maxLength={40}
          className="bg-white/5 border-concrete/20 text-concrete placeholder:text-concrete-muted focus:border-copper focus:ring-copper/30"
        />
        <p className="text-xs text-concrete-muted">{taglineText.length}/40 characters</p>
      </div>
    </div>
  );
};

export default TextEditor;
