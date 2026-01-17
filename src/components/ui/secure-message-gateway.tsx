import React from "react";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/ui/shiny-button";

export const SecureMessageGateway = () => {
  return (
    <div className="flex items-center justify-center w-full p-4">
      <div
        className="relative w-full max-w-4xl text-center border border-primary/30 border-dashed p-8 md:p-12 shadow-[0_0_20px_rgba(210,105,30,0.1)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      >

        {/* Partnership Statement */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-concrete mb-4">
            Partner with Eterna to elevate your packaging
          </h2>
          <p className="text-lg text-concrete-muted max-w-2xl mx-auto leading-relaxed">
            Join forward-thinking brands who've chosen Eterna for sustainable, innovative packaging solutions
            that match your vision and exceed customer expectations.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link to="/start-project">
            <ShinyButton className="px-8 py-4 text-lg font-semibold">
              Partner with Eterna
            </ShinyButton>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SecureMessageGateway;
