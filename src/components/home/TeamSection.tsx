import React from "react";
import { TeamSection as NewTeamSection } from "@/components/ui/team-section";
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Linkedin,
} from "lucide-react";
import rakshaImage from "@/assets/team/raksha-h.png";

export const TeamSection = () => {
  const teamMembers = [
    {
      name: "RAKSHA H",
      designation: "Chief Product Officer (CPO)",
      imageSrc: rakshaImage,
      socialLinks: [
        { icon: Twitter, href: "#" },
        { icon: Linkedin, href: "#" },
      ],
    },
    {
      name: "RAJEEV SHUKLA",
      designation: "Chief Technology Officer (CTO)",
      imageSrc: "", // Keep blank until image is provided
      socialLinks: [
        { icon: Github, href: "#" },
        { icon: Twitter, href: "#" },
      ],
    },
  ];

  const mainSocialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <NewTeamSection
      title="BUILDERS BEHIND ETERNA"
      description="Meet the visionary leaders driving innovation in sustainable packaging solutions. Our experienced team combines deep industry knowledge with cutting-edge technology to revolutionize luxury apparel packaging for a better tomorrow."
      members={teamMembers}
      socialLinksMain={mainSocialLinks}
    />
  );
};
